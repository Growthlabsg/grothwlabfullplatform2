"use client"

import { useAuth } from "@/contexts/auth-context"
import { trackEvent } from "@/lib/real-time-analytics"
import { updateReputation } from "@/lib/reputation-system"
import { updateConnectionStrength } from "@/lib/connection-service"
import { useCallback } from "react"

export function useUserActivity() {
  const { user } = useAuth()

  // Track post view
  const trackPostView = useCallback(
    (postId: string, authorId: string) => {
      if (!user) return

      // Track analytics event
      trackEvent({
        eventType: "post_view",
        userId: user.id,
        timestamp: new Date(),
        properties: {
          postId,
          authorId,
        },
      })

      // Update connection strength if viewing a connection's post
      if (authorId !== user.id) {
        updateConnectionStrength(user.id, authorId, 0.5)
      }
    },
    [user],
  )

  // Track post engagement
  const trackPostEngagement = useCallback(
    (postId: string, engagementType: "like" | "comment" | "share" | "save", authorId: string) => {
      if (!user) return

      // Track analytics event
      trackEvent({
        eventType: "post_engagement",
        userId: user.id,
        timestamp: new Date(),
        properties: {
          postId,
          engagementType,
          authorId,
        },
      })

      // Update user reputation based on engagement type
      if (engagementType === "like") {
        updateReputation({
          type: "post_like_received",
          userId: authorId,
          targetId: postId,
          timestamp: new Date(),
        })
      } else if (engagementType === "comment") {
        updateReputation({
          type: "post_comment_received",
          userId: authorId,
          targetId: postId,
          timestamp: new Date(),
        })
      } else if (engagementType === "share") {
        updateReputation({
          type: "post_share_received",
          userId: authorId,
          targetId: postId,
          timestamp: new Date(),
        })
      }

      // Update connection strength if engaging with a connection's post
      if (authorId !== user.id) {
        const strengthValues = {
          like: 1,
          comment: 2,
          share: 3,
          save: 0.5,
        }
        updateConnectionStrength(user.id, authorId, strengthValues[engagementType])
      }
    },
    [user],
  )

  // Track profile view
  const trackProfileView = useCallback(
    (profileId: string) => {
      if (!user) return

      // Track analytics event
      trackEvent({
        eventType: "profile_view",
        userId: user.id,
        timestamp: new Date(),
        properties: {
          profileId,
        },
      })

      // Update connection strength if viewing a connection's profile
      if (profileId !== user.id) {
        updateConnectionStrength(user.id, profileId, 1)
      }
    },
    [user],
  )

  return {
    trackPostView,
    trackPostEngagement,
    trackProfileView,
  }
}
