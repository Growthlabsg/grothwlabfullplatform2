"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { Star, Crown, Zap, ChevronDown, Settings, CreditCard, BarChart3 } from "lucide-react"
import { useSubscription } from "@/contexts/subscription-context"
import { useFeatureAccess } from "@/hooks/use-feature-access"
import Link from "next/link"

export function SubscriptionIndicator() {
  const { currentTier, getCurrentUsage, getFeatureLimit, getUsagePercentage } = useSubscription()
  const [isOpen, setIsOpen] = useState(false)

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

  const getTierName = (tier: string) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1)
  }

  // Get key usage metrics
  const connectionUsage = getCurrentUsage("connectionRequests")
  const connectionLimit = getFeatureLimit("connectionRequests")
  const connectionPercentage = getUsagePercentage("connectionRequests")

  const messageUsage = getCurrentUsage("messagesToUnconnected")
  const messageLimit = getFeatureLimit("messagesToUnconnected")
  const messagePercentage = getUsagePercentage("messagesToUnconnected")

  const isFreeTier = currentTier === "free"
  const hasReachedLimit = (usage: number, limit: number) => limit !== -1 && usage >= limit

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className={`w-2 h-2 rounded-full ${getTierColor(currentTier)}`} />
          <span className="hidden sm:inline text-sm font-medium">
            {getTierName(currentTier)}
          </span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getTierColor(currentTier)}`} />
          <span className="font-semibold">
            {getTierName(currentTier)} Plan
          </span>
          {isFreeTier && (
            <Badge variant="outline" size="sm" className="ml-auto">
              Free
            </Badge>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Usage Overview */}
        <div className="px-2 py-2">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Usage This Month</h4>
          
          {/* Connection Requests */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Connection Requests</span>
              <span className="font-medium">
                {connectionUsage}/{connectionLimit === -1 ? "∞" : connectionLimit}
              </span>
            </div>
            {connectionLimit !== -1 && (
              <Progress 
                value={connectionPercentage} 
                className="h-2"
                
              />
            )}
          </div>

          {/* Messages */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Messages to Unconnected</span>
              <span className="font-medium">
                {messageUsage}/{messageLimit === -1 ? "∞" : messageLimit}
              </span>
            </div>
            {messageLimit !== -1 && (
              <Progress 
                value={messagePercentage} 
                className="h-2"
                
              />
            )}
          </div>

          {/* Warning for free users approaching limits */}
          {isFreeTier && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-xs text-yellow-800">
                {hasReachedLimit(connectionUsage, connectionLimit) || hasReachedLimit(messageUsage, messageLimit)
                  ? "You've reached some limits. Upgrade to Premium for unlimited access!"
                  : "You're approaching some limits. Consider upgrading to Premium for unlimited access."}
              </p>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Plan Features */}
        <div className="px-2 py-2">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Plan Features</h4>
          <div className="space-y-1 text-xs text-gray-600">
            {currentTier === "free" && (
              <>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span>Basic search and networking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span>Limited connections and messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-blue-500" />
                  <span>Basic course access</span>
                </div>
              </>
            )}
            {currentTier === "premium" && (
              <>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>Unlimited connections and messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>Advanced search filters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>Full course access</span>
                </div>
              </>
            )}
            {currentTier === "enterprise" && (
              <>
                <div className="flex items-center gap-2">
                  <Crown className="w-3 h-3 text-purple-500" />
                  <span>Everything in Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-3 h-3 text-purple-500" />
                  <span>AI-powered features</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-3 h-3 text-purple-500" />
                  <span>Dedicated support</span>
                </div>
              </>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Actions */}
        <div className="px-2 py-2 space-y-2">
          {isFreeTier && (
            <Link href="/subscription/plans">
              <DropdownMenuItem className="cursor-pointer">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Upgrade to Premium
              </DropdownMenuItem>
            </Link>
          )}
          
          <Link href="/subscription/plans">
            <DropdownMenuItem className="cursor-pointer">
              <CreditCard className="w-4 h-4 mr-2" />
              Manage Subscription
            </DropdownMenuItem>
          </Link>
          
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Usage Analytics
            </DropdownMenuItem>
          </Link>
          
          <Link href="/settings/subscription">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Subscription Settings
            </DropdownMenuItem>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
