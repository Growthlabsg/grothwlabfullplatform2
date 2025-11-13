"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, BookmarkCheck, Calendar, Users } from "lucide-react"
import { FounderProfileCard } from "@/components/investor/founder-profile"
import { TeamCompatibilityChart } from "@/components/investor/team-compatibility"
import type { FounderTeam, TeamCompatibility } from "@/types/co-founder-matching"

interface TeamDetailsProps {
  team: FounderTeam
  compatibility: TeamCompatibility
  className?: string
}

export function TeamDetails({ team, compatibility, className }: TeamDetailsProps) {
  const [isSaved, setIsSaved] = useState(team.savedByInvestor || false)

  // Toggle saved status
  const toggleSaved = () => {
    // In a real app, this would call an API to save/unsave the team
    setIsSaved(!isSaved)
  }

  // Add to deal pipeline
  const addToDealPipeline = () => {
    // In a real app, this would call an API to add the team to the deal pipeline
    console.log(`Add team ${team.id} to deal pipeline`)
  }

  // Schedule meeting
  const scheduleMeeting = () => {
    // In a real app, this would open a meeting scheduler
    console.log(`Schedule meeting with team ${team.id}`)
  }

  // Get stage label
  const getStageLabel = (stage: string): string => {
    switch (stage) {
      case "ideation":
        return "Ideation"
      case "mvp":
        return "MVP"
      case "validation":
        return "Validation"
      case "scaling":
        return "Scaling"
      default:
        return stage
    }
  }

  // Get stage color
  const getStageColor = (stage: string): string => {
    switch (stage) {
      case "ideation":
        return "bg-blue-100 text-blue-800"
      case "mvp":
        return "bg-purple-100 text-purple-800"
      case "validation":
        return "bg-amber-100 text-amber-800"
      case "scaling":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className={className}>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>
              {team.name || `${team.industry.charAt(0).toUpperCase() + team.industry.slice(1)} Team`}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getStageColor(team.stage)}>{getStageLabel(team.stage)}</Badge>
              <Badge variant="outline">{team.industry}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="mb-2 font-medium text-[#1E293B]">Business Idea</h3>
            <p className="text-[#334155]">{team.idea}</p>
          </div>

          <div className="mb-6">
            <h3 className="mb-2 font-medium text-[#1E293B]">Team Members</h3>
            <div className="flex flex-wrap gap-2">
              {team.founders.map((founder) => (
                <div key={founder.id} className="flex items-center gap-2 rounded-lg border p-2">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src={founder.avatar || "/placeholder.svg?height=32&width=32"}
                      alt={founder.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[#1E293B]">{founder.name}</p>
                    <p className="text-xs text-muted-foreground">{founder.skills.slice(0, 2).join(", ")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(team.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.founders.length} Founders</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={toggleSaved} className={isSaved ? "text-[#F59E0B]" : ""}>
                {isSaved ? (
                  <>
                    <BookmarkCheck className="mr-2 h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
              <Button onClick={scheduleMeeting}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={addToDealPipeline}>
                Add to Pipeline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <TeamCompatibilityChart teamId={team.id} compatibility={compatibility} />

        <Tabs defaultValue={(team.founders[0] ? team.founders[0].id : undefined)} className="w-full">
          <TabsList className="w-full justify-start">
            {team.founders.map((founder) => (
              <TabsTrigger key={founder.id} value={founder.id}>
                {founder.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {team.founders.map((founder) => (
            <TabsContent key={founder.id} value={founder.id} className="mt-6">
              <FounderProfileCard founder={founder} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
