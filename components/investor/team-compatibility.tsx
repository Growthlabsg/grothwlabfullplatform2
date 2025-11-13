"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Briefcase, Code, MapPin, Users } from "lucide-react"
import type { TeamCompatibility } from "@/types/co-founder-matching"

interface TeamCompatibilityProps {
  teamId: string
  compatibility: TeamCompatibility
  className?: string
}

export function TeamCompatibilityChart({ teamId, compatibility, className }: TeamCompatibilityProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Team Compatibility</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-8 border-[#0F7377]">
            <span className="text-3xl font-bold text-[#0F7377]">{compatibility.score}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-[#0F7377]" />
                <span className="text-sm font-medium">Skills Completeness</span>
              </div>
              <span className="text-sm font-medium">{compatibility.skillsCompleteness}%</span>
            </div>
            <Progress value={compatibility.skillsCompleteness} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#0F7377]" />
                <span className="text-sm font-medium">Experience Level</span>
              </div>
              <span className="text-sm font-medium">{compatibility.experienceLevel}%</span>
            </div>
            <Progress value={compatibility.experienceLevel} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#0F7377]" />
                <span className="text-sm font-medium">Industry Alignment</span>
              </div>
              <span className="text-sm font-medium">{compatibility.industryAlignment}%</span>
            </div>
            <Progress value={compatibility.industryAlignment} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#0F7377]" />
                <span className="text-sm font-medium">Location Proximity</span>
              </div>
              <span className="text-sm font-medium">{compatibility.locationProximity}%</span>
            </div>
            <Progress value={compatibility.locationProximity} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
