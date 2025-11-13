"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star, Zap, Crown, Lock, X } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { DEFAULT_SUBSCRIPTION_PLANS } from "@/types/subscription"
import Link from "next/link"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature: string
  requiredTier: "free" | "premium" | "enterprise"
  currentUsage?: number
  limit?: number
  message?: string
}

export function UpgradeModal({ 
  isOpen, 
  onClose, 
  feature, 
  requiredTier, 
  currentUsage, 
  limit, 
  message 
}: UpgradeModalProps) {
  const { currentTier, upgradeSubscription } = useSubscription()
  const [upgrading, setUpgrading] = useState(false)

  const featureDisplayName = feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  
  const getFeatureIcon = (tier: string) => {
    switch (tier) {
      case "premium": return <Star className="w-5 h-5 text-yellow-500" />
      case "enterprise": return <Crown className="w-5 h-5 text-purple-500" />
      default: return <Zap className="w-5 h-5 text-blue-500" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "premium": return "bg-yellow-500"
      case "enterprise": return "bg-purple-500"
      default: return "bg-blue-500"
    }
  }

  const handleUpgrade = async (planId: string) => {
    try {
      setUpgrading(true)
      await upgradeSubscription(planId)
      onClose()
    } catch (error) {
      console.error("Upgrade failed:", error)
    } finally {
      setUpgrading(false)
    }
  }

  const recommendedPlan = DEFAULT_SUBSCRIPTION_PLANS.find(plan => plan.tier === requiredTier)
  const currentPlan = DEFAULT_SUBSCRIPTION_PLANS.find(plan => plan.tier === currentTier)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-[#0F7377]">
              Unlock {featureDisplayName}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feature Lock Message */}
          <div className="bg-gradient-to-r from-[#0F7377]/10 to-[#1E293B]/10 rounded-xl p-6 border border-[#0F7377]/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-[#0F7377]/20 rounded-full">
                <Lock className="w-6 h-6 text-[#0F7377]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#0F7377]">
                  {featureDisplayName} Requires {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)} Plan
                </h3>
                <p className="text-gray-600">
                  {message || `Upgrade to access ${featureDisplayName} and unlock your startup's full potential.`}
                </p>
              </div>
            </div>

            {currentUsage !== undefined && limit !== undefined && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Current Usage</span>
                  <span className="text-sm text-gray-500">
                    {currentUsage}/{limit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getTierColor(requiredTier)}`}
                    style={{ width: `${Math.min((currentUsage / limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Current vs Required Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-gray-500">Current Plan</span>
                  {getFeatureIcon(currentTier)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-700 mb-2">
                  {currentPlan?.name || "Free"}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {currentPlan?.tier === "free" ? "Basic access" : `${currentPlan?.tier} features`}
                </div>
                <Badge variant="outline" className="text-gray-500">
                  {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#0F7377] bg-gradient-to-r from-[#0F7377]/5 to-[#1E293B]/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-[#0F7377]">Required Plan</span>
                  {getFeatureIcon(requiredTier)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0F7377] mb-2">
                  {recommendedPlan?.name || requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {requiredTier === "premium" ? "Advanced features" : "Enterprise features"}
                </div>
                <Badge className="bg-[#0F7377] text-white">
                  {requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)}
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Plan */}
          {recommendedPlan && (
            <Card className="border-2 border-[#0F7377] bg-gradient-to-r from-[#0F7377]/5 to-[#1E293B]/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-[#0F7377]">
                    Recommended: {recommendedPlan.name}
                  </CardTitle>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-[#0F7377]">
                      ${recommendedPlan.price}
                    </div>
                    <div className="text-sm text-gray-600">
                      per {recommendedPlan.billingCycle}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Key Benefits</h4>
                    <ul className="space-y-2">
                      {recommendedPlan.features.slice(0, 5).map((feature) => (
                        <li key={feature.id} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Feature Limits</h4>
                    <ul className="space-y-2">
                      {Object.entries(recommendedPlan.limits).slice(0, 5).map(([key, value]) => (
                        <li key={key} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className="font-medium">
                            {value === -1 ? "∞" : value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => handleUpgrade(recommendedPlan.id)}
                    disabled={upgrading}
                    className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                  >
                    {upgrading ? "Upgrading..." : `Upgrade to ${recommendedPlan.name}`}
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Maybe Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* View All Plans */}
          <div className="text-center">
            <p className="text-gray-600 mb-3">
              Want to see all available plans?
            </p>
            <Link href="/subscription/plans">
              <Button variant="outline" className="w-full sm:w-auto">
                View All Plans
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
