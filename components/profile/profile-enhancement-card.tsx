"use client"

import { useState } from "react"
import { Sparkles, CheckCircle, Linkedin, ArrowRight, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { LinkedInImportButton } from "@/components/profile/linkedin-import-button"
import { useAuth } from "@/contexts/auth-context"

interface ProfileEnhancementCardProps {
  className?: string
}

export function ProfileEnhancementCard({ className }: ProfileEnhancementCardProps) {
  const { user } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (dismissed || user?.linkedInImported) {
    return null
  }

  // Calculate profile completion percentage (mock data for now)
  const profileCompletion = user ? 65 : 30 // If user exists but hasn't imported LinkedIn

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <CardTitle className="text-lg">Enhance Your Profile</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setDismissed(true)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
        </div>
        <CardDescription>Complete your profile to increase visibility and networking opportunities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Profile completion</span>
              <span className="font-medium">{profileCompletion}%</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
          </div>

          <div className="border rounded-lg divide-y">
            <div className="p-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                <span>Import LinkedIn Profile</span>
              </div>
              <LinkedInImportButton variant="secondary" size="sm" />
            </div>
            <div className="p-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Add Profile Picture</span>
              </div>
              <Button variant="ghost" size="sm" disabled>
                Complete
              </Button>
            </div>
            <div className="p-3 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Fill Basic Information</span>
              </div>
              <Button variant="ghost" size="sm" disabled>
                Complete
              </Button>
            </div>
          </div>

          <Button variant="link" className="w-full" asChild>
            <a href="/profile/edit">
              View all profile recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
