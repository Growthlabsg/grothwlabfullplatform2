"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import type { 
  SubscriptionTier, 
  SubscriptionStatus, 
  SubscriptionPlan, 
  UserSubscription, 
  FeatureUsage, 
  UpgradePrompt,
  FeatureLimits 
} from "@/types/subscription"
import { DEFAULT_SUBSCRIPTION_PLANS } from "@/types/subscription"

interface SubscriptionContextType {
  // Current subscription state
  currentSubscription: UserSubscription | null
  currentTier: SubscriptionTier
  isLoading: boolean
  
  // Feature access and limits
  canUseFeature: (feature: string, requiredTier?: SubscriptionTier) => boolean
  getFeatureLimit: (feature: string) => number
  getCurrentUsage: (feature: string) => number
  isFeatureUnlimited: (feature: string) => boolean
  
  // Usage tracking
  incrementUsage: (feature: string) => void
  resetUsage: () => void
  
  // Upgrade prompts
  upgradePrompts: UpgradePrompt[]
  showUpgradePrompt: (feature: string, currentUsage: number, limit: number) => void
  dismissUpgradePrompt: (promptId: string) => void
  
  // Subscription management
  upgradeSubscription: (planId: string) => Promise<void>
  cancelSubscription: () => Promise<void>
  getAvailablePlans: () => SubscriptionPlan[]
  
  // Utility functions
  getRemainingUsage: (feature: string) => number
  getUsagePercentage: (feature: string) => number
  shouldShowUpgradePrompt: (feature: string) => boolean
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

// Mock user subscription data
const mockUserSubscription: UserSubscription = {
  id: "sub_1",
  userId: "user1",
  planId: "free",
  tier: "free",
  status: "active",
  startDate: new Date().toISOString(),
  endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  autoRenew: true,
  usage: {
    connectionRequests: 3,
    messagesToUnconnected: 2,
    jobApplications: 1,
    cofounderMatches: 0,
    eventRegistrations: 1,
    downloadableTemplates: 0,
    callMinutes: 15,
    lastResetDate: new Date().toISOString()
  },
  features: (DEFAULT_SUBSCRIPTION_PLANS[0] ? DEFAULT_SUBSCRIPTION_PLANS[0].features : undefined)
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [currentSubscription, setCurrentSubscription] = useState<UserSubscription | null>(mockUserSubscription)
  const [upgradePrompts, setUpgradePrompts] = useState<UpgradePrompt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const currentTier = currentSubscription?.tier || "free"

  // Load user subscription on mount
  useEffect(() => {
    const loadSubscription = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setCurrentSubscription(mockUserSubscription)
      } catch (error) {
        console.error("Failed to load subscription:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSubscription()
  }, [])

  // Check if user can use a specific feature
  const canUseFeature = useCallback((feature: string, requiredTier: SubscriptionTier = "free"): boolean => {
    if (!currentSubscription) return false
    
    const tierOrder = { free: 0, premium: 1, enterprise: 2 }
    const userTierLevel = tierOrder[currentSubscription.tier]
    const requiredTierLevel = tierOrder[requiredTier]
    
    return userTierLevel >= requiredTierLevel
  }, [currentSubscription])

  // Get feature limit for current subscription
  const getFeatureLimit = useCallback((feature: string): number => {
    if (!currentSubscription) return 0
    
    const plan = DEFAULT_SUBSCRIPTION_PLANS.find(p => p.id === currentSubscription.planId)
    if (!plan) return 0
    
    switch (feature) {
      case "connectionRequests":
        return plan.limits.connectionRequests
      case "messagesToUnconnected":
        return plan.limits.messagesToUnconnected
      case "jobApplications":
        return plan.limits.jobApplications
      case "cofounderMatches":
        return plan.limits.cofounderMatches
      case "eventRegistrations":
        return plan.limits.eventRegistrations
      case "downloadableTemplates":
        return plan.limits.downloadableTemplates
      case "callMinutes":
        return plan.limits.callMinutes
      default:
        return 0
    }
  }, [currentSubscription])

  // Get current usage for a feature
  const getCurrentUsage = useCallback((feature: string): number => {
    if (!currentSubscription) return 0
    
    switch (feature) {
      case "connectionRequests":
        return currentSubscription.usage.connectionRequests
      case "messagesToUnconnected":
        return currentSubscription.usage.messagesToUnconnected
      case "jobApplications":
        return currentSubscription.usage.jobApplications
      case "cofounderMatches":
        return currentSubscription.usage.cofounderMatches
      case "eventRegistrations":
        return currentSubscription.usage.eventRegistrations
      case "downloadableTemplates":
        return currentSubscription.usage.downloadableTemplates
      case "callMinutes":
        return currentSubscription.usage.callMinutes
      default:
        return 0
    }
  }, [currentSubscription])

  // Check if feature is unlimited
  const isFeatureUnlimited = useCallback((feature: string): boolean => {
    const limit = getFeatureLimit(feature)
    return limit === -1
  }, [getFeatureLimit])

  // Increment usage for a feature
  const incrementUsage = useCallback((feature: string) => {
    if (!currentSubscription) return
    
    setCurrentSubscription(prev => {
      if (!prev) return prev
      
      const newUsage = { ...prev.usage }
      switch (feature) {
        case "connectionRequests":
          newUsage.connectionRequests += 1
          break
        case "messagesToUnconnected":
          newUsage.messagesToUnconnected += 1
          break
        case "jobApplications":
          newUsage.jobApplications += 1
          break
        case "cofounderMatches":
          newUsage.cofounderMatches += 1
          break
        case "eventRegistrations":
          newUsage.eventRegistrations += 1
          break
        case "downloadableTemplates":
          newUsage.downloadableTemplates += 1
          break
        case "callMinutes":
          newUsage.callMinutes += 1
          break
      }
      
      return { ...prev, usage: newUsage }
    })
  }, [currentSubscription])

  // Reset usage (monthly reset)
  const resetUsage = useCallback(() => {
    if (!currentSubscription) return
    
    setCurrentSubscription(prev => {
      if (!prev) return prev
      
      return {
        ...prev,
        usage: {
          connectionRequests: 0,
          messagesToUnconnected: 0,
          jobApplications: 0,
          cofounderMatches: 0,
          eventRegistrations: 0,
          downloadableTemplates: 0,
          callMinutes: 0,
          lastResetDate: new Date().toISOString()
        }
      }
    })
  }, [currentSubscription])

  // Show upgrade prompt when feature limit is reached
  const showUpgradePrompt = useCallback((feature: string, currentUsage: number, limit: number) => {
    if (currentUsage < limit) return
    
    const prompt: UpgradePrompt = {
      id: `prompt_${Date.now()}`,
      userId: currentSubscription?.userId || "",
      feature,
      currentLimit: limit,
      currentUsage,
      premiumLimit: -1, // unlimited
      message: `You've reached your ${limit} ${feature} limit. Upgrade to Premium for unlimited access!`,
      ctaText: "Upgrade to Premium",
      priority: currentUsage >= limit ? "high" : "medium",
      isDismissed: false,
      createdAt: new Date().toISOString()
    }
    
    setUpgradePrompts(prev => [...prev, prompt])
  }, [currentSubscription])

  // Dismiss upgrade prompt
  const dismissUpgradePrompt = useCallback((promptId: string) => {
    setUpgradePrompts(prev => prev.map(prompt => 
      prompt.id === promptId ? { ...prompt, isDismissed: true } : prompt
    ))
  }, [])

  // Upgrade subscription
  const upgradeSubscription = useCallback(async (planId: string) => {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newPlan = DEFAULT_SUBSCRIPTION_PLANS.find(p => p.id === planId)
      if (!newPlan) throw new Error("Plan not found")
      
      setCurrentSubscription(prev => {
        if (!prev) return prev
        
        return {
          ...prev,
          planId,
          tier: newPlan.tier,
          features: newPlan.features,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
      })
      
      // Clear upgrade prompts
      setUpgradePrompts([])
      
    } catch (error) {
      console.error("Failed to upgrade subscription:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Cancel subscription
  const cancelSubscription = useCallback(async () => {
    try {
      setIsLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCurrentSubscription(prev => {
        if (!prev) return prev
        
        return {
          ...prev,
          status: "cancelled" as SubscriptionStatus,
          autoRenew: false
        }
      })
      
    } catch (error) {
      console.error("Failed to cancel subscription:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Get available subscription plans
  const getAvailablePlans = useCallback((): SubscriptionPlan[] => {
    return DEFAULT_SUBSCRIPTION_PLANS
  }, [])

  // Get remaining usage for a feature
  const getRemainingUsage = useCallback((feature: string): number => {
    const limit = getFeatureLimit(feature)
    if (limit === -1) return -1 // unlimited
    
    const current = getCurrentUsage(feature)
    return Math.max(0, limit - current)
  }, [getFeatureLimit, getCurrentUsage])

  // Get usage percentage for a feature
  const getUsagePercentage = useCallback((feature: string): number => {
    const limit = getFeatureLimit(feature)
    if (limit === -1) return 0 // unlimited
    
    const current = getCurrentUsage(feature)
    return Math.min(100, (current / limit) * 100)
  }, [getFeatureLimit, getCurrentUsage])

  // Check if upgrade prompt should be shown
  const shouldShowUpgradePrompt = useCallback((feature: string): boolean => {
    const limit = getFeatureLimit(feature)
    if (limit === -1) return false // unlimited
    
    const current = getCurrentUsage(feature)
    const percentage = (current / limit) * 100
    
    // Show prompt at 80% usage and above
    return percentage >= 80
  }, [getFeatureLimit, getCurrentUsage])

  const value: SubscriptionContextType = {
    currentSubscription,
    currentTier,
    isLoading,
    canUseFeature,
    getFeatureLimit,
    getCurrentUsage,
    isFeatureUnlimited,
    incrementUsage,
    resetUsage,
    upgradePrompts,
    showUpgradePrompt,
    dismissUpgradePrompt,
    upgradeSubscription,
    cancelSubscription,
    getAvailablePlans,
    getRemainingUsage,
    getUsagePercentage,
    shouldShowUpgradePrompt
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider")
  }
  return context
}
