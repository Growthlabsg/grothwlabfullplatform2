import { useSubscription } from "@/contexts/subscription-context"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function useFeatureAccess() {
  const { 
    canUseFeature, 
    getFeatureLimit, 
    getCurrentUsage, 
    getRemainingUsage,
    incrementUsage,
    showUpgradePrompt,
    currentTier 
  } = useSubscription()
  
  const { toast } = useToast()
  const router = useRouter()

  const checkFeatureAccess = (
    feature: string, 
    requiredTier: "free" | "premium" | "enterprise" = "free",
    showUpgradeMessage: boolean = true
  ) => {
    const hasAccess = canUseFeature(feature, requiredTier)
    
    if (!hasAccess && showUpgradeMessage) {
      toast({
        title: "Feature Requires Upgrade",
        description: `This feature requires a ${requiredTier} subscription. Upgrade now to unlock it!`,
      })
      
      // Navigate to subscription plans
      router.push("/subscription/plans")
    }
    
    return hasAccess
  }

  const useFeatureWithLimit = (
    feature: string,
    requiredTier: "free" | "premium" | "enterprise" = "free"
  ) => {
    const hasAccess = checkFeatureAccess(feature, requiredTier)
    const currentUsage = getCurrentUsage(feature)
    const limit = getFeatureLimit(feature)
    const remaining = getRemainingUsage(feature)
    const isUnlimited = limit === -1

    const executeFeature = (callback: () => void) => {
      if (!hasAccess) return false
      
      if (isUnlimited) {
        callback()
        return true
      }
      
      if (remaining > 0) {
        incrementUsage(feature)
        callback()
        return true
      } else {
        showUpgradePrompt(feature, currentUsage, limit)
        toast({
          title: "Feature Limit Reached",
          description: `You've reached your ${feature} limit. Upgrade to Premium for unlimited access!`,
        })
        
        // Navigate to subscription plans
        router.push("/subscription/plans")
        return false
      }
    }

    return {
      hasAccess,
      currentUsage,
      limit,
      remaining,
      isUnlimited,
      executeFeature,
      canExecute: hasAccess && (isUnlimited || remaining > 0)
    }
  }

  const getFeatureRestrictionMessage = (feature: string, requiredTier: "free" | "premium" | "enterprise" = "free") => {
    if (currentTier === "free" && requiredTier !== "free") {
      return `Upgrade to ${requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)} to access this feature`
    }
    
    if (currentTier === "premium" && requiredTier === "enterprise") {
      return "Upgrade to Enterprise to access this feature"
    }
    
    return null
  }

  const showUpgradeModal = (feature: string, requiredTier: "free" | "premium" | "enterprise" = "free") => {
    const message = getFeatureRestrictionMessage(feature, requiredTier)
    if (message) {
      toast({
        title: "Feature Locked",
        description: message,
      })
      
      // Navigate to subscription plans
      router.push("/subscription/plans")
    }
  }

  return {
    checkFeatureAccess,
    useFeatureWithLimit,
    getFeatureRestrictionMessage,
    showUpgradeModal,
    currentTier,
    canUseFeature,
    getFeatureLimit,
    getCurrentUsage,
    getRemainingUsage
  }
}
