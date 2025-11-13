"use client"

/**
 * Custom hook for accessing startup resources
 *
 * This hook provides access to the additional startup resources
 * without changing any UI/UX components.
 */

import { useState, useEffect } from "react"
import {
  getAllResources,
  getResourcesByType,
  getResourcesByCategory,
  getResourcesByTopic,
  getFeaturedResources,
  getPopularResources,
  getAllResourceCategories,
  getAllResourceTopics,
  searchResources,
} from "../lib/resource-service"

export function useResources() {
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

        const allResources = getAllResources()
        setResources(allResources as any)
        setError(null)
      } catch (err) {
        setError((err as any).message)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  const getByType = (type: any) => {
    return getResourcesByType(type)
  }

  const getByCategory = (category: any) => {
    return getResourcesByCategory(category)
  }

  const getByTopic = (topic: any) => {
    return getResourcesByTopic(topic)
  }

  const getFeatured = () => {
    return getFeaturedResources()
  }

  const getPopular = () => {
    return getPopularResources()
  }

  const getCategories = () => {
    return getAllResourceCategories()
  }

  const getTopics = () => {
    return getAllResourceTopics()
  }

  const search = (query: any) => {
    return searchResources(query)
  }

  return {
    loading,
    resources,
    error,
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
