/**
 * Resource integration utilities
 *
 * These utilities help integrate the new resources with existing components
 * without changing any UI/UX.
 */

import { getAllEnhancedResources } from "./enhanced-resource-service"

// This function can be used to integrate the new resources with existing data
// without changing any UI/UX components
export const integrateWithExistingResources = (existingResources = []) => {
  const enhancedResources = getAllEnhancedResources()

  // Combine resources while avoiding duplicates
  const combinedResources = [...existingResources]

  enhancedResources.forEach((newResource) => {
    // Check if resource with same ID already exists
    const exists = combinedResources.some((existing) => existing.id === newResource.id)
    if (!exists) {
      combinedResources.push(newResource)
    }
  })

  return combinedResources
}

// This function adapts the new resources to match any existing data structure
// without changing any UI/UX components
export const adaptToExistingDataStructure = (existingDataStructure = {}, newResources = []) => {
  // Clone the existing data structure to avoid mutations
  const adaptedData = JSON.parse(JSON.stringify(existingDataStructure))

  // Add new resources to the appropriate categories in the existing data structure
  if (adaptedData.resources) {
    adaptedData.resources = integrateWithExistingResources(adaptedData.resources)
  } else {
    adaptedData.resources = newResources
  }

  // Update counts if they exist in the data structure
  if (adaptedData.counts) {
    adaptedData.counts.total = adaptedData.resources.length

    // Update type counts
    const typeCounts = {}
    adaptedData.resources.forEach((resource) => {
      typeCounts[resource.type] = (typeCounts[resource.type] || 0) + 1
    })
    adaptedData.counts.byType = typeCounts

    // Update category counts
    const categoryCounts = {}
    adaptedData.resources.forEach((resource) => {
      if (resource.categories) {
        resource.categories.forEach((category) => {
          categoryCounts[category] = (categoryCounts[category] || 0) + 1
        })
      }
    })
    adaptedData.counts.byCategory = categoryCounts
  }

  return adaptedData
}

// This function can be used to filter resources by user type
// without changing any UI/UX components
export const filterResourcesByUserType = (resources = [], userType = "startup") => {
  if (userType === "startup" || userType === "startups") {
    return resources.filter((resource) => !resource.targetAudience || resource.targetAudience.includes("startups"))
  }

  if (userType === "investor" || userType === "investors") {
    return resources.filter((resource) => !resource.targetAudience || resource.targetAudience.includes("investors"))
  }

  if (userType === "student" || userType === "students") {
    return resources.filter((resource) => !resource.targetAudience || resource.targetAudience.includes("students"))
  }

  return resources
}
