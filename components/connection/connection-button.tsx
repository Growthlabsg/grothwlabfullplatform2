"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus, Check, Loader2, Lock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { connectionService } from "@/lib/connection-service"
import { useFeatureAccess } from "@/hooks/use-feature-access"
import { UpgradeModal } from "@/components/subscription/upgrade-modal"

interface ConnectionButtonProps {
  userId: string
  isConnected?: boolean
  isPending?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function ConnectionButton({
  userId,
  isConnected = false,
  isPending = false,
  variant = "default",
  size = "default",
  className,
}: ConnectionButtonProps) {
  const [status, setStatus] = useState({
    isConnected,
    isPending,
    isLoading: false,
  })
  const { toast } = useToast()
  const { useFeatureWithLimit } = useFeatureAccess()
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  
  // Check connection request limits
  const connectionFeature = useFeatureWithLimit("connectionRequests", "free")

  const handleConnection = async () => {
    // Don't do anything if already loading
    if (status.isLoading) return

    // Check if user can send connection requests
    if (!connectionFeature.canExecute) {
      setShowUpgradeModal(true)
      return
    }

    setStatus((prev) => ({ ...prev, isLoading: true }))

    try {
      // Simulate API call
      await connectionService.sendConnectionRequest("current-user", userId)

      if (status.isConnected) {
        // Remove connection
        setStatus({
          isConnected: false,
          isPending: false,
          isLoading: false,
        })

        toast({
          title: "Connection removed",
          description: "You are no longer connected with this user.",
        })
      } else if (status.isPending) {
        // Cancel pending request
        setStatus({
          isConnected: false,
          isPending: false,
          isLoading: false,
        })

        toast({
          title: "Request cancelled",
          description: "Your connection request has been cancelled.",
        })
      } else {
        // Send connection request
        setStatus({
          isConnected: false,
          isPending: true,
          isLoading: false,
        })

        toast({
          title: "Request sent",
          description: "Your connection request has been sent.",
        })
        
        // Increment usage for connection requests
        connectionFeature.executeFeature(() => {})
      }
    } catch (error) {
      console.error("Connection error:", error)
      setStatus((prev) => ({ ...prev, isLoading: false }))

      toast({
        title: "Connection error",
        description: "There was a problem processing your request. Please try again.",
        variant: "destructive",
      })
    }
  }

  let buttonText = "Connect"
  let icon = <UserPlus className="mr-2 h-4 w-4" />
  let buttonVariant = variant

  if (status.isLoading) {
    buttonText = "Processing"
    icon = <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  } else if (status.isConnected) {
    buttonText = "Connected"
    icon = <Check className="mr-2 h-4 w-4" />
    buttonVariant = "outline"
  } else if (status.isPending) {
    buttonText = "Pending"
    icon = <UserPlus className="mr-2 h-4 w-4" />
    buttonVariant = "outline"
  }

  return (
    <>
      <Button
        variant={buttonVariant as any}
        size={size}
        className={className}
        onClick={handleConnection}
        disabled={status.isLoading}
      >
        {icon}
        {buttonText}
      </Button>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="connectionRequests"
        requiredTier="premium"
        currentUsage={connectionFeature.currentUsage}
        limit={connectionFeature.limit}
        message="You've reached your connection request limit. Upgrade to Premium for unlimited connection requests and accelerate your networking."
      />
    </>
  )
}
