/**
 * Enhanced resource service for fetching and managing startup resources
 *
 * This service integrates all the additional startup resources for
 * startups, investors, and students without changing any UI/UX components.
 */

import { startupSpecificResources } from "./startup-specific-resources"
import { investorSpecificResources } from "./investor-specific-resources"
import { studentSpecificResources } from "./student-specific-resources"
import { crossAudienceResources } from "./cross-audience-resources"

// Combine all resources
export const getAllEnhancedResources = () => {
  return [
    ...startupSpecificResources,
    ...investorSpecificResources,
    ...studentSpecificResources,
    ...crossAudienceResources,
  ]
}

// Get resources by audience type without changing UI/UX
export const getResourcesByAudience = (audience: string) => {
  const allResources = getAllEnhancedResources()
  return allResources.filter((resource) => resource.targetAudience && resource.targetAudience.includes(audience))
}

// Get resources for startups without changing UI/UX
export const getStartupResources = () => {
  return getResourcesByAudience("startups")
}

// Get resources for investors without changing UI/UX
export const getInvestorResources = () => {
  return getResourcesByAudience("investors")
}

// Get resources for students without changing UI/UX
export const getStudentResources = () => {
  return getResourcesByAudience("students")
}

// Get resources by type and audience without changing UI/UX
export const getResourcesByTypeAndAudience = (type: string, audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  return audienceResources.filter((resource) => resource.type === type)
}

// Get resources by category and audience without changing UI/UX
export const getResourcesByCategoryAndAudience = (category: string, audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  return audienceResources.filter((resource) => resource.categories && resource.categories.includes(category))
}

// Get resources by topic and audience without changing UI/UX
export const getResourcesByTopicAndAudience = (topic: string, audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  return audienceResources.filter((resource) => resource.topics && resource.topics.includes(topic))
}

// Get featured resources by audience without changing UI/UX
export const getFeaturedResourcesByAudience = (audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  return audienceResources.filter((resource) => resource.featured)
}

// Get popular resources by audience without changing UI/UX
export const getPopularResourcesByAudience = (audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  return audienceResources.filter((resource) => resource.popular)
}

// Search resources by audience without changing UI/UX
export const searchResourcesByAudience = (query: string, audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  const lowerCaseQuery = query.toLowerCase()

  return audienceResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerCaseQuery) ||
      resource.description.toLowerCase().includes(lowerCaseQuery) ||
      resource.author.toLowerCase().includes(lowerCaseQuery) ||
      (resource.categories && resource.categories.some((cat) => cat.toLowerCase().includes(lowerCaseQuery))) ||
      (resource.topics && resource.topics.some((topic) => topic.toLowerCase().includes(lowerCaseQuery))),
  )
}

// Get all audience-specific categories without changing UI/UX
export const getAudienceSpecificCategories = (audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  const categories = new Set<string>()

  audienceResources.forEach((resource) => {
    if (resource.categories) {
      resource.categories.forEach((category) => categories.add(category))
    }
  })

  return Array.from(categories)
}

// Get all audience-specific topics without changing UI/UX
export const getAudienceSpecificTopics = (audience: string) => {
  const audienceResources = getResourcesByAudience(audience)
  const topics = new Set<string>()

  audienceResources.forEach((resource) => {
    if (resource.topics) {
      resource.topics.forEach((topic) => topics.add(topic))
    }
  })

  return Array.from(topics)
}
