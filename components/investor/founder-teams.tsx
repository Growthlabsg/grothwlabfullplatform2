"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Bookmark, BookmarkCheck, Filter, Search, Star } from "lucide-react"
import type { FounderTeam, FounderIndustry } from "@/types/co-founder-matching"

interface FounderTeamsProps {
  teams: FounderTeam[]
  className?: string
}

export function FounderTeams({ teams, className }: FounderTeamsProps) {
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState<FounderIndustry | "all">("all")
  const [stageFilter, setStageFilter] = useState<string>("all")

  // Toggle saved status
  const toggleSaved = (teamId: string) => {
    // In a real app, this would call an API to save/unsave the team
    console.log(`Toggle saved status for team ${teamId}`)
  }

  // Add to deal pipeline
  const addToDealPipeline = (teamId: string) => {
    // In a real app, this would call an API to add the team to the deal pipeline
    console.log(`Add team ${teamId} to deal pipeline`)
  }

  // Filter teams based on search query and filters
  const filteredTeams = teams.filter((team) => {
    // Filter by tab
    if (activeTab === "saved" && !team.savedByInvestor) return false

    // Filter by search query
    if (
      searchQuery &&
      !team.idea.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !team.industry.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !team.founders.some(
        (founder) =>
          founder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          founder.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    ) {
      return false
    }

    // Filter by industry
    if (industryFilter !== "all" && team.industry !== industryFilter) return false

    // Filter by stage
    if (stageFilter !== "all" && team.stage !== stageFilter) return false

    return true
  })

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
    <Card className={className}>
      <CardHeader>
        <CardTitle>Founder Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "all" | "saved")}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <TabsList>
              <TabsTrigger value="all">All Teams</TabsTrigger>
              <TabsTrigger value="saved">Saved Teams</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search teams..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select
                value={industryFilter}
                onValueChange={(value) => setIndustryFilter(value as FounderIndustry | "all")}
              >
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Industry</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>
                  <SelectItem value="healthtech">HealthTech</SelectItem>
                  <SelectItem value="edtech">EdTech</SelectItem>
                  <SelectItem value="ecommerce">E-Commerce</SelectItem>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="ai">AI/ML</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="cleantech">CleanTech</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="consumer">Consumer</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[130px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <span>Stage</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="ideation">Ideation</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="validation">Validation</SelectItem>
                  <SelectItem value="scaling">Scaling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            {filteredTeams.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">No founder teams found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTeams.map((team) => (
                  <div key={team.id} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <h3 className="font-medium text-[#1E293B]">
                            {team.name || `${team.industry.charAt(0).toUpperCase() + team.industry.slice(1)} Team`}
                          </h3>
                          <Badge className={getStageColor(team.stage)}>{getStageLabel(team.stage)}</Badge>
                          <Badge variant="outline">{team.industry}</Badge>
                        </div>
                        <p className="text-sm text-[#334155]">{team.idea}</p>

                        <div className="mt-4">
                          <p className="mb-2 text-xs font-medium text-muted-foreground">Founding Team:</p>
                          <div className="flex flex-wrap gap-2">
                            {team.founders.map((founder) => (
                              <div
                                key={founder.id}
                                className="flex items-center gap-2 rounded-full bg-slate-100 px-2 py-1"
                              >
                                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                  <Image
                                    src={founder.avatar || "/placeholder.svg?height=24&width=24"}
                                    alt={founder.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <span className="text-xs">{founder.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 rounded-full bg-[#0F7377]/10 px-2 py-1 text-xs text-[#0F7377]">
                          <Star className="h-3 w-3 fill-[#0F7377] text-[#0F7377]" />
                          <span>Match Score: {team.matchScore}%</span>
                        </div>

                        <div className="mt-2 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleSaved(team.id)}
                            className={team.savedByInvestor ? "text-[#F59E0B]" : ""}
                          >
                            {team.savedByInvestor ? (
                              <>
                                <BookmarkCheck className="mr-1 h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                                Saved
                              </>
                            ) : (
                              <>
                                <Bookmark className="mr-1 h-4 w-4" />
                                Save
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                            onClick={() => addToDealPipeline(team.id)}
                          >
                            Add to Pipeline
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
