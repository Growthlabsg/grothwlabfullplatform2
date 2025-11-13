/**
 * Resource recommendation engine
 *
 * This engine provides personalized resource recommendations
 * without changing any UI/UX components.
 */

import { startupSpecificResources } from "./startup-specific-resources"
import { investorSpecificResources } from "./investor-specific-resources"
import { studentSpecificResources } from "./student-specific-resources"
import { crossAudienceResources } from "./cross-audience-resources"

// Get recommended resources based on user type and interests
export const getRecommendedResources = (userType = "startup", interests = [], previouslyViewed = []) => {
  // Determine which resource pool to use based on user type
  let resourcePool = []

  if (userType === "startup" || userType === "startups") {
    resourcePool = [...startupSpecificResources, ...crossAudienceResources]
  } else if (userType === "investor" || userType === "investors") {
    resourcePool = [...investorSpecificResources, ...crossAudienceResources]
  } else if (userType === "student" || userType === "students") {
    resourcePool = [...studentSpecificResources, ...crossAudienceResources]
  } else {
    resourcePool = [
      ...startupSpecificResources,
      ...investorSpecificResources,
      ...studentSpecificResources,
      ...crossAudienceResources,
    ]
  }

  // Filter out previously viewed resources
  const newResources = resourcePool.filter((resource) => !previouslyViewed.includes(resource.id))

  // Score resources based on interests
  const scoredResources = newResources.map((resource) => {
    let score = 0

    // Increase score for featured resources
    if (resource.featured) score += 2

    // Increase score for popular resources
    if (resource.popular) score += 1

    // Increase score based on matching categories and topics
    if (resource.categories) {
      resource.categories.forEach((category) => {
        if (interests.includes(category)) score += 2
      })
    }

    if (resource.topics) {
      resource.topics.forEach((topic) => {
        if (interests.includes(topic)) score += 3
      })
    }

    return { ...resource, score }
  })

  // Sort by score (highest first) and return top resources
  return scoredResources.sort((a, b) => b.score - a.score).slice(0, 10)
}

// Get related resources based on a specific resource
export const getRelatedResources = (resourceId, limit = 4) => {
  // Find the source resource
  const allResources = [
    ...startupSpecificResources,
    ...investorSpecificResources,
    ...studentSpecificResources,
    ...crossAudienceResources,
  ]

  const sourceResource = allResources.find((resource) => resource.id === resourceId)

  if (!sourceResource) return []

  // Score other resources based on similarity
  const scoredResources = allResources
    .filter((resource) => resource.id !== resourceId)
    .map((resource) => {
      let score = 0

      // Same type
      if (resource.type === sourceResource.type) score += 1

      // Same author
      if (resource.author === sourceResource.author) score += 2

      // Matching categories
      if (resource.categories && sourceResource.categories) {
        resource.categories.forEach((category) => {
          if (sourceResource.categories.includes(category)) score += 2
        })
      }

      // Matching topics
      if (resource.topics && sourceResource.topics) {
        resource.topics.forEach((topic) => {
          if (sourceResource.topics.includes(topic)) score += 3
        })
      }

      // Same target audience
      if (
        resource.targetAudience &&
        sourceResource.targetAudience &&
        resource.targetAudience.some((audience) => sourceResource.targetAudience.includes(audience))
      ) {
        score += 2
      }

      return { ...resource, score }
    })

  // Sort by score (highest first) and return top related resources
  return scoredResources.sort((a, b) => b.score - a.score).slice(0, limit)
}
