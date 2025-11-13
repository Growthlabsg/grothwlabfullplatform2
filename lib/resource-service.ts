/**
 * Resource service for fetching and managing startup resources
 *
 * This service integrates the additional startup resources without
 * changing any UI/UX components.
 */

import {
  additionalGuides,
  additionalTemplates,
  additionalVideos,
  additionalWebinars,
  additionalResourceCategories,
  additionalResourceTopics,
} from "./additional-startup-resources"

// Mock existing resources (these would normally come from an API or database)
const existingResources = [
  // Existing resources would be here
]

// Merge existing and additional resources without changing UI/UX
export const getAllResources = () => {
  return [...existingResources, ...additionalGuides, ...additionalTemplates, ...additionalVideos, ...additionalWebinars]
}

// Get resources by type without changing UI/UX
export const getResourcesByType = (type: string) => {
  const allResources = getAllResources()
  return allResources.filter((resource) => resource.type === type)
}

// Get resources by category without changing UI/UX
export const getResourcesByCategory = (category: string) => {
  const allResources = getAllResources()
  return allResources.filter((resource) => resource.categories && resource.categories.includes(category))
}

// Get resources by topic without changing UI/UX
export const getResourcesByTopic = (topic: string) => {
  const allResources = getAllResources()
  return allResources.filter((resource) => resource.topics && resource.topics.includes(topic))
}

// Get featured resources without changing UI/UX
export const getFeaturedResources = () => {
  const allResources = getAllResources()
  return allResources.filter((resource) => resource.featured)
}

// Get popular resources without changing UI/UX
export const getPopularResources = () => {
  const allResources = getAllResources()
  return allResources.filter((resource) => resource.popular)
}

// Get all resource categories without changing UI/UX
export const getAllResourceCategories = () => {
  // Merge with existing categories if needed
  return additionalResourceCategories
}

// Get all resource topics without changing UI/UX
export const getAllResourceTopics = () => {
  // Merge with existing topics if needed
  return additionalResourceTopics
}

// Search resources without changing UI/UX
export const searchResources = (query: string) => {
  const allResources = getAllResources()
  const lowerCaseQuery = query.toLowerCase()

  return allResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(lowerCaseQuery) ||
      resource.description.toLowerCase().includes(lowerCaseQuery) ||
      resource.author.toLowerCase().includes(lowerCaseQuery) ||
      (resource.categories && resource.categories.some((cat) => cat.toLowerCase().includes(lowerCaseQuery))) ||
      (resource.topics && resource.topics.some((topic) => topic.toLowerCase().includes(lowerCaseQuery))),
  )
}
