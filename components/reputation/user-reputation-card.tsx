"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Loader2, Award, TrendingUp, Info } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import {
  getUserReputation,
  getReputationLevelDetails,
  getProgressToNextLevel,
  type UserReputation,
} from "@/lib/reputation-system"

export function UserReputationCard() {
  const [reputation, setReputation] = useState<UserReputation | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState({ current: 0, required: 0, percentage: 0 })
  const [levelDetails, setLevelDetails] = useState<{ name: string; benefits: string[]; icon: string } | null>(null)

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      setLoading(true)
      try {
        // Get user reputation
        const userReputation = getUserReputation(user.id)
        setReputation(userReputation)

        // Get level details
        const details = getReputationLevelDetails(userReputation.level)
        if (details) {
          setLevelDetails({
            name: details.name,
            benefits: details.benefits,
            icon: details.icon,
          })
        }

        // Get progress to next level
        const progressData = getProgressToNextLevel(user.id)
        setProgress(progressData)
      } catch (error) {
        console.error("Error loading reputation:", error)
      } finally {
        setLoading(false)
      }
    }
  }, [user])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!reputation || !levelDetails) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Reputation data not available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Award className="h-5 w-5 mr-2 text-primary" />
          Your Reputation
        </CardTitle>
        <CardDescription>Level: {levelDetails.name}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">{reputation.points}</span>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
            <TrendingUp className="h-3 w-3 mr-1" />+
            {reputation.actions.slice(-5).reduce((sum, action) => {
              const actionType = action.type as keyof typeof REPUTATION_POINTS
              return sum + (REPUTATION_POINTS[actionType] || 0)
            }, 0)}{" "}
            recent
          </Badge>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress to next level</span>
            <span>
              {progress.current} / {progress.required}
            </span>
          </div>
          <Progress value={progress.percentage} className="h-2" />
        </div>

        <div>
          <h4 className="text-sm font-medium mb-1">Level Benefits:</h4>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {levelDetails.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        {reputation.badges.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Badges Earned:</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {reputation.badges.map((badge) => (
                <Badge key={badge} variant="outline" className="bg-primary/5">
                  <Award className="h-3 w-3 mr-1 text-primary" />
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground flex items-center">
          <Info className="h-3 w-3 mr-1" />
          Earn points by creating quality content and engaging with the community
        </p>
      </CardFooter>
    </Card>
  )
}

// Reputation points for different actions (copied from reputation-system.ts)
const REPUTATION_POINTS = {
  post_create: 5,
  post_like_received: 2,
  post_comment_received: 3,
  post_share_received: 5,
  comment_create: 2,
  comment_like_received: 1,
  connection_request_accepted: 3,
  report_submitted: 1,
  report_upheld: 5,
  content_flagged: -10,
  content_removed: -20,
  community_guideline_violation: -30,
  mentor_session_completed: 15,
  event_hosted: 20,
  resource_shared: 10,
  question_answered: 5,
  profile_completed: 10,
  daily_login: 1,
}
