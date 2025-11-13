"use client"

/**
 * Custom hook for accessing audience-specific startup resources
 *
 * This hook provides access to resources for startups, investors, and students
 * without changing any UI/UX components.
 */

import { useState, useEffect } from "react"
import {
  getAllEnhancedResources,
  getResourcesByAudience,
  getStartupResources,
  getInvestorResources,
  getStudentResources,
  getResourcesByTypeAndAudience,
  getResourcesByCategoryAndAudience,
  getResourcesByTopicAndAudience,
  getFeaturedResourcesByAudience,
  getPopularResourcesByAudience,
  searchResourcesByAudience,
  getAudienceSpecificCategories,
  getAudienceSpecificTopics,
} from "../lib/enhanced-resource-service"

export function useAudienceResources(audience = "all") {
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Simulate API call to get resources
    const fetchResources = async () => {
      try {
        setLoading(true)
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        let fetchedResources = []

        if (audience === "all") {
          fetchedResources = getAllEnhancedResources()
        } else {
          fetchedResources = getResourcesByAudience(audience)
        }

        setResources(fetchedResources as any)
        setError(null)
      } catch (err) {
        setError((err as any).message)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [audience])

  const getForStartups = () => {
    return getStartupResources()
  }

  const getForInvestors = () => {
    return getInvestorResources()
  }

  const getForStudents = () => {
    return getStudentResources()
  }

  const getByType = (type: any) => {
    return audience === "all"
      ? getAllEnhancedResources().filter((r) => r.type === type)
      : getResourcesByTypeAndAudience(type, audience)
  }

  const getByCategory = (category: any) => {
    return audience === "all"
      ? getAllEnhancedResources().filter((r) => r.categories && r.categories.includes(category))
      : getResourcesByCategoryAndAudience(category, audience)
  }

  const getByTopic = (topic: any) => {
    return audience === "all"
      ? getAllEnhancedResources().filter((r) => r.topics && r.topics.includes(topic))
      : getResourcesByTopicAndAudience(topic, audience)
  }

  const getFeatured = () => {
    return audience === "all"
      ? getAllEnhancedResources().filter((r) => r.featured)
      : getFeaturedResourcesByAudience(audience)
  }

  const getPopular = () => {
    return audience === "all"
      ? getAllEnhancedResources().filter((r) => r.popular)
      : getPopularResourcesByAudience(audience)
  }

  const getCategories = () => {
    return audience === "all"
      ? Array.from(new Set(getAllEnhancedResources().flatMap((r) => r.categories || [])))
      : getAudienceSpecificCategories(audience)
  }

  const getTopics = () => {
    return audience === "all"
      ? Array.from(new Set(getAllEnhancedResources().flatMap((r) => r.topics || [])))
      : getAudienceSpecificTopics(audience)
  }

  const search = (query: any) => {
    return audience === "all"
      ? getAllEnhancedResources().filter(
          (r) =>
            r.title.toLowerCase().includes(query.toLowerCase()) ||
            r.description.toLowerCase().includes(query.toLowerCase()) ||
            (r.categories && r.categories.some((c) => c.toLowerCase().includes(query.toLowerCase()))) ||
            (r.topics && r.topics.some((t) => t.toLowerCase().includes(query.toLowerCase()))),
        )
      : searchResourcesByAudience(query, audience)
  }

  return {
    loading,
    resources,
    error,
    getForStartups,
    getForInvestors,
    getForStudents,
    getByType,
    getByCategory,
    getByTopic,
    getFeatured,
    getPopular,
    getCategories,
    getTopics,
    search,
  }
}
