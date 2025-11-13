import type { UserInterests } from "@/lib/recommendation-engine"

// Enhanced recommendation engine with collaborative filtering and content-based filtering

interface UserSimilarity {
  userId: string
  similarityScore: number
}

interface ContentFeatures {
  id: string
  type: string
  features: number[]
  tags: string[]
  createdAt: Date
}

// In-memory storage for user interactions
const userInteractions: Record<string, Record<string, number>> = {}

// In-memory storage for content features
const contentFeatures: Record<string, ContentFeatures> = {}

// In-memory storage for user feature vectors
const userFeatureVectors: Record<string, number[]> = {}

// Track user interaction with content
export function trackInteraction(
  userId: string,
  contentId: string,
  contentType: string,
  interactionType: "view" | "like" | "comment" | "share" | "save" | "follow",
  metadata?: Record<string, any>,
): void {
  // Initialize user interactions if not exists
  if (!userInteractions[userId]) {
    userInteractions[userId] = {}
  }

  // Calculate interaction weight based on type
  let weight = 0
  switch (interactionType) {
    case "view":
      weight = 1
      break
    case "like":
      weight = 3
      break
    case "comment":
      weight = 5
      break
    case "share":
      weight = 7
      break
    case "save":
      weight = 10
      break
    case "follow":
      weight = 15
      break
  }

  // Add interaction weight
  const key = `${contentType}:${contentId}`
  userInteractions[userId][key] = (userInteractions[userId][key] || 0) + weight

  // Update user feature vector
  updateUserFeatureVector(userId)
}

// Add or update content features
export function updateContentFeatures(
  contentId: string,
  contentType: string,
  tags: string[],
  textContent?: string,
  metadata?: Record<string, any>,
): void {
  // In a real implementation, we would extract features from the content
  // For now, we'll use a simple approach with random feature vectors

  // Generate a feature vector (in a real system, this would be based on content analysis)
  const featureVector = Array(10)
    .fill(0)
    .map(() => Math.random())

  contentFeatures[contentId] = {
    id: contentId,
    type: contentType,
    features: featureVector,
    tags,
    createdAt: new Date(),
  }
}

// Update user feature vector based on interactions
function updateUserFeatureVector(userId: string): void {
  if (!userInteractions[userId] || Object.keys(userInteractions[userId]).length === 0) {
    userFeatureVectors[userId] = Array(10).fill(0)
    return
  }

  // Initialize feature vector
  const featureVector = Array(10).fill(0)
  let totalWeight = 0

  // Calculate weighted average of content features
  Object.entries(userInteractions[userId]).forEach(([key, weight]) => {
    const [contentType, contentId] = key.split(":")

    if (contentFeatures[contentId]) {
      // Add weighted features
      (contentFeatures[contentId] ? contentFeatures[contentId].features : undefined).forEach((feature, index) => {
        featureVector[index] += feature * weight
      })

      totalWeight += weight
    }
  })

  // Normalize feature vector
  if (totalWeight > 0) {
    userFeatureVectors[userId] = featureVector.map((value) => value / totalWeight)
  } else {
    userFeatureVectors[userId] = featureVector
  }
}

// Calculate similarity between two feature vectors (cosine similarity)
function calculateSimilarity(vector1: number[], vector2: number[]): number {
  if (vector1.length !== vector2.length) {
    return 0
  }

  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i]
    magnitude1 += vector1[i] * vector1[i]
    magnitude2 += vector2[i] * vector2[i]
  }

  magnitude1 = Math.sqrt(magnitude1)
  magnitude2 = Math.sqrt(magnitude2)

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0
  }

  return dotProduct / (magnitude1 * magnitude2)
}

// Find similar users
function findSimilarUsers(userId: string, limit = 10): UserSimilarity[] {
  if (!userFeatureVectors[userId]) {
    return []
  }

  const similarities: UserSimilarity[] = []

  // Calculate similarity with all other users
  Object.entries(userFeatureVectors).forEach(([otherUserId, otherVector]) => {
    if (otherUserId !== userId) {
      const similarityScore = calculateSimilarity(userFeatureVectors[userId], otherVector)

      similarities.push({
        userId: otherUserId,
        similarityScore,
      })
    }
  })

  // Sort by similarity score and limit
  return similarities.sort((a, b) => b.similarityScore - a.similarityScore).slice(0, limit)
}

// Get content recommendations based on collaborative filtering
function getCollaborativeFilteringRecommendations(userId: string, contentType: string, limit = 10): string[] {
  // Find similar users
  const similarUsers = findSimilarUsers(userId)

  if (similarUsers.length === 0) {
    return []
  }

  // Get content interactions from similar users
  const contentScores: Record<string, number> = {}
  const userInteractionKeys = userInteractions[userId] ? Object.keys(userInteractions[userId]) : []

  similarUsers.forEach(({ userId: similarUserId, similarityScore }) => {
    if (userInteractions[similarUserId]) {
      Object.entries(userInteractions[similarUserId]).forEach(([key, weight]) => {
        // Only consider content of the requested type
        if (key.startsWith(`${contentType}:`)) {
          // Skip content the user has already interacted with
          if (!userInteractionKeys.includes(key)) {
            const contentId = key.split(":")[1]
            contentScores[contentId] = (contentScores[contentId] || 0) + weight * similarityScore
          }
        }
      })
    }
  })

  // Sort by score and limit
  return Object.entries(contentScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([contentId]) => contentId)
}

// Get content recommendations based on content similarity
function getContentBasedRecommendations(userId: string, contentType: string, limit = 10): string[] {
  if (!userFeatureVectors[userId]) {
    return []
  }

  const userVector = userFeatureVectors[userId]
  const contentScores: Record<string, number> = {}
  const userInteractionKeys = userInteractions[userId] ? Object.keys(userInteractions[userId]) : []

  // Calculate similarity with all content of the requested type
  Object.entries(contentFeatures).forEach(([contentId, content]) => {
    if (content.type === contentType) {
      // Skip content the user has already interacted with
      const key = `${contentType}:${contentId}`
      if (!userInteractionKeys.includes(key)) {
        const similarityScore = calculateSimilarity(userVector, content.features)
        contentScores[contentId] = similarityScore
      }
    }
  })

  // Sort by score and limit
  return Object.entries(contentScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([contentId]) => contentId)
}

// Get personalized content recommendations
export async function getPersonalizedRecommendations(
  userId: string,
  contentType: string,
  limit = 10,
  userInterests?: UserInterests,
): Promise<string[]> {
  // Get recommendations from both approaches
  const collaborativeRecs = getCollaborativeFilteringRecommendations(userId, contentType, limit)
  const contentBasedRecs = getContentBasedRecommendations(userId, contentType, limit)

  // Combine recommendations with weights
  const combinedScores: Record<string, number> = {}

  // Add collaborative filtering recommendations with weight 0.7
  collaborativeRecs.forEach((contentId, index) => {
    combinedScores[contentId] = (combinedScores[contentId] || 0) + (0.7 * (limit - index)) / limit
  })

  // Add content-based recommendations with weight 0.3
  contentBasedRecs.forEach((contentId, index) => {
    combinedScores[contentId] = (combinedScores[contentId] || 0) + (0.3 * (limit - index)) / limit
  })

  // Sort by score and limit
  return Object.entries(combinedScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([contentId]) => contentId)
}

// Get recommended connections for a user
export async function getRecommendedConnections(userId: string, limit = 10): Promise<string[]> {
  // Find similar users
  const similarUsers = findSimilarUsers(userId, limit * 2)

  // Filter out users that are already connected
  // In a real implementation, we would check against actual connections
  // For now, we'll just return the similar users
  return similarUsers.slice(0, limit).map((user) => user.userId)
}

// Initialize with some sample data
export function initializeRecommendationEngine(): void {
  // Generate sample user interactions and content features
  const userIds = Array(50)
    .fill(0)
    .map((_, i) => `user${i + 1}`)
  const contentIds = Array(200)
    .fill(0)
    .map((_, i) => `content${i + 1}`)
  const contentTypes = ["post", "article", "event", "group"]
  const tags = [
    "startup",
    "funding",
    "technology",
    "ai",
    "blockchain",
    "marketing",
    "growth",
    "product",
    "design",
    "leadership",
  ]

  // Generate content features
  contentIds.forEach((contentId) => {
    const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)]
    const contentTags = Array(Math.floor(Math.random() * 5) + 1)
      .fill(0)
      .map(() => tags[Math.floor(Math.random() * tags.length)])
      .filter((tag, index, self) => self.indexOf(tag) === index) // Remove duplicates

    updateContentFeatures(contentId, contentType, contentTags)
  })

  // Generate user interactions
  userIds.forEach((userId) => {
    const interactionCount = Math.floor(Math.random() * 50) + 5

    for (let i = 0; i < interactionCount; i++) {
      const contentId = contentIds[Math.floor(Math.random() * contentIds.length)]
      const contentType = (contentFeatures[contentId] ? contentFeatures[contentId].type : undefined)
      const interactionTypes: ("view" | "like" | "comment" | "share" | "save" | "follow")[] = [
        "view",
        "like",
        "comment",
        "share",
        "save",
        "follow",
      ]
      const interactionType = interactionTypes[Math.floor(Math.random() * interactionTypes.length)]

      trackInteraction(userId, contentId, contentType, interactionType)
    }
  })
}

// Initialize the recommendation engine
initializeRecommendationEngine()
