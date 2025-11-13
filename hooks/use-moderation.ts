"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { moderateText, moderateImage } from "@/lib/ai-moderation-service"
import type { ReportReason } from "@/types/feed"

export function useModeration() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Function to moderate text content
  const moderateTextContent = async (
    text: string,
  ): Promise<{
    isApproved: boolean
    reason?: string
    score?: number
  }> => {
    setIsLoading(true)
    try {
      const result = await moderateText(text)
      return result
    } catch (error) {
      console.error("Text moderation error:", error)
      toast({
        title: "Moderation Error",
        description: "Failed to moderate text content. Please try again.",
        variant: "destructive",
      })
      return { isApproved: true } // Default to approved on error
    } finally {
      setIsLoading(false)
    }
  }

  // Function to moderate image content
  const moderateImageContent = async (
    imageUrl: string,
  ): Promise<{
    isApproved: boolean
    reason?: string
    score?: number
  }> => {
    setIsLoading(true)
    try {
      const result = await moderateImage(imageUrl)
      return result
    } catch (error) {
      console.error("Image moderation error:", error)
      toast({
        title: "Moderation Error",
        description: "Failed to moderate image content. Please try again.",
        variant: "destructive",
      })
      return { isApproved: true } // Default to approved on error
    } finally {
      setIsLoading(false)
    }
  }

  // Function to report content
  const reportContent = async (
    contentId: string,
    contentType: "post" | "comment" | "message" | "profile",
    reason: ReportReason,
    details?: string,
  ): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In a real app, this would make an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`[Moderation] Reported ${contentType} ${contentId} for ${reason}`, { details })

      return true
    } catch (error) {
      console.error("Report content error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    moderateTextContent,
    moderateImageContent,
    reportContent,
  }
}
