// Types for moderation results
export interface ModerationResult {
  isApproved: boolean
  reason?: string
  score?: number
  categories?: Record<string, number>
  flagged?: boolean
  categoryScores?: Record<string, number>
  confidence?: number
}

// Mock moderation function for text
export async function moderateText(text: string): Promise<ModerationResult> {
  // In a real app, this would call an AI moderation API
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Simple mock implementation that flags certain keywords
  const flaggedKeywords = [
    "hate",
    "violence",
    "attack",
    "kill",
    "threat",
    "racist",
    "sexist",
    "offensive",
    "explicit",
    "nude",
    "porn",
  ]

  const lowerText = text.toLowerCase()
  const flaggedWords = flaggedKeywords.filter((word) => lowerText.includes(word))

  if (flaggedWords.length > 0) {
    return {
      isApproved: false,
      reason: `Content contains potentially inappropriate terms: ${flaggedWords.join(", ")}`,
      score: 0.8,
      categories: {
        hate: flaggedWords.includes("hate") ? 0.9 : 0,
        violence: flaggedWords.includes("violence") || flaggedWords.includes("attack") ? 0.8 : 0,
        sexual: flaggedWords.includes("explicit") || flaggedWords.includes("nude") ? 0.9 : 0,
      },
    }
  }

  return {
    isApproved: true,
    score: 0.1,
    categories: {
      hate: 0.05,
      violence: 0.02,
      sexual: 0.01,
    },
  }
}

// Mock moderation function for images
export async function moderateImage(imageUrl: string): Promise<ModerationResult> {
  // In a real app, this would call an AI image moderation API
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Simple mock implementation that approves most images
  // In a real app, this would analyze the image content

  // For demo purposes, we'll flag images with certain keywords in the URL
  const flaggedKeywords = ["explicit", "nude", "violence", "gore", "nsfw"]
  const hasFlag = flaggedKeywords.some((keyword) => imageUrl.toLowerCase().includes(keyword))

  if (hasFlag) {
    return {
      isApproved: false,
      reason: "Image may contain inappropriate content",
      score: 0.85,
      categories: {
        explicit: 0.9,
        suggestive: 0.7,
        violence: 0.3,
      },
    }
  }

  return {
    isApproved: true,
    score: 0.05,
    categories: {
      explicit: 0.01,
      suggestive: 0.03,
      violence: 0.02,
    },
  }
}

// Function to check if content needs human review
export function needsHumanReview(result: ModerationResult): boolean {
  // Content with scores in the middle range might need human review
  return !result.isApproved && (result.score || 0) < 0.7
}

// Mock function to moderate content
export async function moderateContent(content: string, userId?: string): Promise<ModerationResult> {
  // In a real app, this would call an AI service like OpenAI's moderation API
  // For now, we'll use a simple keyword-based approach

  const contentLower = content.toLowerCase()

  // Define problematic terms for each category
  const categoryTerms = {
    sexual: ["nsfw", "explicit", "porn", "sex"],
    hate: ["hate", "racist", "bigot"],
    harassment: ["stupid", "idiot", "loser"],
    selfHarm: ["suicide", "kill myself", "self harm"],
    violence: ["kill", "attack", "murder", "hurt"],
    spam: ["buy now", "click here", "free money", "lottery"],
    profanity: ["damn", "hell", "ass"],
    misinformation: ["fake news", "conspiracy", "hoax"],
  }

  // Check content against each category
  const categories = {
    sexual: categoryTerms.sexual.some((term) => contentLower.includes(term)),
    hate: categoryTerms.hate.some((term) => contentLower.includes(term)),
    harassment: categoryTerms.harassment.some((term) => contentLower.includes(term)),
    selfHarm: categoryTerms.selfHarm.some((term) => contentLower.includes(term)),
    violence: categoryTerms.violence.some((term) => contentLower.includes(term)),
    spam: categoryTerms.spam.some((term) => contentLower.includes(term)),
    profanity: categoryTerms.profanity.some((term) => contentLower.includes(term)),
    misinformation: categoryTerms.misinformation.some((term) => contentLower.includes(term)),
  }

  // Calculate scores (simplified)
  const categoryScores = {
    sexual: categories.sexual ? 0.8 : 0,
    hate: categories.hate ? 0.9 : 0,
    harassment: categories.harassment ? 0.7 : 0,
    selfHarm: categories.selfHarm ? 0.95 : 0,
    violence: categories.violence ? 0.85 : 0,
    spam: categories.spam ? 0.6 : 0,
    profanity: categories.profanity ? 0.5 : 0,
    misinformation: categories.misinformation ? 0.75 : 0,
  }

  // Determine if content should be flagged
  const flagged = Object.values(categories).some((value) => value)

  // Determine reason if flagged
  let reason: string | undefined
  if (flagged) {
    const flaggedCategories = Object.entries(categories)
      .filter(([_, value]) => value)
      .map(([key, _]) => key)

    reason = `Content flagged for: ${flaggedCategories.join(", ")}`
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    isApproved: !flagged,
    flagged,
    categories,
    categoryScores,
    confidence: flagged ? 0.85 : 0.15,
    reason,
  }
}
