"use client"

import { useSubscription } from "@/contexts/subscription-context"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Zap, Users, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SubscriptionStatus() {
  const { 
    currentTier, 
    getCurrentUsage, 
    getFeatureLimit, 
    getUsagePercentage,
    shouldShowUpgradePrompt 
  } = useSubscription()

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "enterprise":
        return <Crown className="w-4 h-4 text-purple-600" />
      case "premium":
        return <Zap className="w-4 h-4 text-[#F59E0B]" />
      default:
        return <Users className="w-4 h-4 text-[#0F7377]" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "enterprise":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "premium":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
      default:
        return "bg-[#0F7377]/10 text-[#0F7377] border-[#0F7377]/20"
    }
  }

  const features = [
    { key: "connectionRequests", label: "Connection Requests", icon: Users },
    { key: "jobApplications", label: "Job Applications", icon: Users },
    { key: "cofounderMatches", label: "Co-founder Matches", icon: Users },
    { key: "eventRegistrations", label: "Event Registrations", icon: Users }
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Subscription Status</CardTitle>
          <Badge className={`${getTierColor(currentTier)} flex items-center gap-1`}>
            {getTierIcon(currentTier)}
            {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Usage Overview */}
        <div className="space-y-3">
          {features.map((feature) => {
            const current = getCurrentUsage(feature.key)
            const limit = getFeatureLimit(feature.key)
            const percentage = getUsagePercentage(feature.key)
            const isUnlimited = limit === -1
            const shouldUpgrade = shouldShowUpgradePrompt(feature.key)
            
            return (
              <div key={feature.key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <feature.icon className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{feature.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {isUnlimited ? (
                      <Badge variant="secondary" className="text-green-700 bg-green-100">
                        Unlimited
                      </Badge>
                    ) : (
                      <span className="text-gray-600">
                        {current}/{limit}
                      </span>
                    )}
                  </div>
                </div>
                
                {!isUnlimited && (
                  <div className="space-y-1">
                    <Progress value={percentage} className="h-2" />
                    {shouldUpgrade && (
                      <div className="flex items-center gap-2 text-xs text-orange-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>Consider upgrading for unlimited access</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Upgrade CTA */}
        {currentTier === "free" && (
          <div className="pt-3 border-t border-gray-200">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Unlock unlimited access with Premium
              </p>
              <Button 
                size="sm" 
                className="w-full bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white"
                asChild
              >
                <Link href="/subscription/plans">
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
