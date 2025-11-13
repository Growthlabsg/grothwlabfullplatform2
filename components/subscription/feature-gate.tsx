"use client"

import { useState, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Star, Crown, Zap } from "lucide-react"
import { useFeatureAccess } from "@/hooks/use-feature-access"
import { UpgradeModal } from "./upgrade-modal"

interface FeatureGateProps {
  feature: string
  requiredTier: "free" | "premium" | "enterprise"
  children: ReactNode
  fallback?: ReactNode
  showUpgradeButton?: boolean
  className?: string
}

export function FeatureGate({ 
  feature, 
  requiredTier, 
  children, 
  fallback,
  showUpgradeButton = true,
  className = ""
}: FeatureGateProps) {
  const { checkFeatureAccess, getFeatureLimit, getCurrentUsage } = useFeatureAccess()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const hasAccess = checkFeatureAccess(feature, requiredTier, false)
  const currentUsage = getCurrentUsage(feature)
  const limit = getFeatureLimit(feature)

  if (hasAccess) {
    return <>{children}</>
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "premium": return <Star className="w-4 h-4 text-yellow-500" />
      case "enterprise": return <Crown className="w-4 h-4 text-purple-500" />
      default: return <Zap className="w-4 h-4 text-blue-500" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "premium": return "bg-yellow-500"
      case "enterprise": return "bg-purple-500"
      default: return "bg-blue-500"
    }
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <>
      <div className={`bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center ${className}`}>
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gray-200 rounded-full">
            <Lock className="w-6 h-6 text-gray-500" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Requires Upgrade
        </h3>
        
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          This feature is available with the {requiredTier} plan. Upgrade to unlock advanced capabilities and accelerate your startup's growth.
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="outline" className="text-gray-500">
            Current: Free
          </Badge>
          <span className="text-gray-400">→</span>
          <Badge className={`${getTierColor(requiredTier)} text-white flex items-center gap-1`}>
            {getTierIcon(requiredTier)}
            {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
          </Badge>
        </div>

        {showUpgradeButton && (
          <Button 
            onClick={() => setShowUpgradeModal(true)}
            className="bg-[#0F7377] hover:bg-[#0F7377]/90"
          >
            Upgrade to {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
          </Button>
        )}
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature={feature}
        requiredTier={requiredTier}
        currentUsage={currentUsage}
        limit={limit}
        message={`Upgrade to ${requiredTier} to access ${feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} and unlock your startup's full potential.`}
      />
    </>
  )
}

// Feature gate with usage tracking
interface FeatureGateWithUsageProps extends FeatureGateProps {
  onUse?: () => void
  showUsageInfo?: boolean
}

export function FeatureGateWithUsage({ 
  feature, 
  requiredTier, 
  children, 
  onUse,
  showUsageInfo = true,
  ...props 
}: FeatureGateWithUsageProps) {
  const { useFeatureWithLimit } = useFeatureAccess()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  const featureAccess = useFeatureWithLimit(feature, requiredTier)

  if (!featureAccess.hasAccess) {
    return (
      <FeatureGate 
        feature={feature} 
        requiredTier={requiredTier} 
        {...props}
      />
    )
  }

  if (!featureAccess.canExecute) {
    return (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-yellow-200 rounded-full">
            <Lock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Feature Limit Reached
        </h3>
        
        <p className="text-yellow-700 mb-4">
          You've reached your limit for {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}. 
          Upgrade to Premium for unlimited access.
        </p>

        {showUsageInfo && (
          <div className="bg-white rounded-lg p-4 border border-yellow-200 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-yellow-800">Usage</span>
              <span className="text-sm text-yellow-600">
                {featureAccess.currentUsage}/{featureAccess.limit}
              </span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-yellow-500"
                style={{ width: `${Math.min((featureAccess.currentUsage / featureAccess.limit) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}

        <Button 
          onClick={() => setShowUpgradeModal(true)}
          className="bg-[#0F7377] hover:bg-[#0F7377]/90"
        >
          Upgrade to Premium
        </Button>

        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          feature={feature}
          requiredTier="premium"
          currentUsage={featureAccess.currentUsage}
          limit={featureAccess.limit}
          message={`You've reached your ${feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} limit. Upgrade to Premium for unlimited access.`}
        />
      </div>
    )
  }

  const handleUse = () => {
    if (onUse) {
      featureAccess.executeFeature(onUse)
    }
  }

  return (
    <div onClick={handleUse}>
      {children}
    </div>
  )
}
