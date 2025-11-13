"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Code,
  Download,
  FileStack,
  Globe,
  HelpCircle,
  MapPin,
  Plus,
  Scale,
  Star,
  Users,
  X,
} from "lucide-react"
import { TeamComparisonSelector } from "@/components/investor/team-comparison-selector"
import type { FounderTeam, TeamCompatibility } from "@/types/co-founder-matching"

interface TeamComparisonViewProps {
  teams: FounderTeam[]
  teamCompatibility: Record<string, TeamCompatibility>
  className?: string
}

export function TeamComparisonView({ teams, teamCompatibility, className }: TeamComparisonViewProps) {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([])
  const [comparisonData, setComparisonData] = useState<FounderTeam[]>([])

  // Update comparison data when selected teams change
  useEffect(() => {
    const newComparisonData = selectedTeams
      .map((teamId) => teams.find((team) => team.id === teamId))
      .filter((team): team is FounderTeam => team !== undefined)

    setComparisonData(newComparisonData)
  }, [selectedTeams, teams])

  // Handle team selection
  const handleTeamSelect = (teamId: string) => {
    if (!selectedTeams.includes(teamId)) {
      setSelectedTeams([...selectedTeams, teamId])
    }
  }

  // Handle team removal
  const handleTeamRemove = (teamId: string) => {
    setSelectedTeams(selectedTeams.filter((id) => id !== teamId))
  }

  // Format team name
  const formatTeamName = (team: FounderTeam): string => {
    return team.name || `${team.industry.charAt(0).toUpperCase() + team.industry.slice(1)} Team`
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

  // Get all unique skills from the founders
  const getAllSkills = (): string[] => {
    const skillsSet = new Set<string>()

    comparisonData.forEach((team) => {
      team.founders.forEach((founder) => {
        founder.skills.forEach((skill) => skillsSet.add(skill))
      })
    })

    return Array.from(skillsSet)
  }

  // Check if team has a specific skill
  const hasSkill = (team: FounderTeam, skill: string): boolean => {
    return team.founders.some((founder) => founder.skills.includes(skill))
  }

  // Get formatted skill label
  const getSkillLabel = (skill: string): string => {
    return skill.charAt(0).toUpperCase() + skill.slice(1).replace("-", " ")
  }

  // Calculate average years of experience for a team
  const getAverageExperience = (team: FounderTeam): number => {
    const totalExperience = team.founders.reduce((sum, founder) => sum + founder.experience, 0)
    return totalExperience / team.founders.length
  }

  // Determine the best team for a category
  const getBestTeamForCategory = (
    category: "matchScore" | "skillsCompleteness" | "experienceLevel" | "industryAlignment" | "locationProximity",
  ): string[] => {
    if (comparisonData.length === 0) return []

    let maxValue = 0
    let bestTeams: string[] = []

    if (category === "matchScore") {
      // For match score, use the team's overall match score
      maxValue = Math.max(...comparisonData.map((team) => team.matchScore))
      bestTeams = comparisonData.filter((team) => team.matchScore === maxValue).map((team) => team.id)
    } else {
      // For other categories, use the team compatibility data
      maxValue = Math.max(...comparisonData.map((team) => teamCompatibility[team.id]?.[category] || 0))
      bestTeams = comparisonData
        .filter((team) => (teamCompatibility[team.id]?.[category] || 0) === maxValue)
        .map((team) => team.id)
    }

    return bestTeams
  }

  // Save to comparison report (dummy function for now)
  const saveToReport = () => {
    console.log("Saving comparison to report:", comparisonData)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>Team Comparison</CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={saveToReport}
            disabled={comparisonData.length === 0}
          >
            <Download className="h-4 w-4" />
            <span>Export Comparison</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TeamComparisonSelector
          teams={teams}
          selectedTeams={selectedTeams}
          onTeamSelect={handleTeamSelect}
          onTeamRemove={handleTeamRemove}
          className="mb-6"
        />

        {comparisonData.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <Users className="mb-4 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No Teams Selected</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Select up to three teams to compare their strengths and compatibility scores.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => {
                // Add a default team selection if available
                if (teams.length > 0) {
                  handleTeamSelect((teams[0] ? teams[0].id : undefined))
                }
              }}
              disabled={teams.length === 0}
            >
              <Plus className="h-4 w-4" />
              <span>Add First Team</span>
            </Button>
          </div>
        ) : (
          <ScrollArea className="w-full">
            <div className="relative min-w-max">
              <div className="sticky left-0 z-10 mb-4 grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))] bg-white">
                <div className="pr-4"></div>
                {comparisonData.map((team) => (
                  <div key={team.id} className="px-2">
                    <div className="flex h-full flex-col rounded-lg border p-3">
                      <div className="mb-2 flex items-start justify-between">
                        <h3 className="font-medium truncate" title={formatTeamName(team)}>
                          {formatTeamName(team)}
                        </h3>
                        <Badge className={getStageColor(team.stage)}>{getStageLabel(team.stage)}</Badge>
                      </div>
                      <p className="mb-2 text-xs line-clamp-2" title={team.idea}>
                        {team.idea}
                      </p>
                      <div className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span>{team.founders.length} founders</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Match Score Section */}
              <div className="mb-8 rounded-lg border">
                <div className="border-b bg-slate-50 p-4 sm:sticky sm:left-0">
                  <h3 className="font-medium">Match Score & Compatibility</h3>
                  <p className="text-xs text-muted-foreground">Overall assessment of team strength and compatibility</p>
                </div>

                <div className="divide-y">
                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-[#0F7377]" />
                        <span>Overall Match Score</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => {
                      const isBest = getBestTeamForCategory("matchScore").includes(team.id)
                      return (
                        <div key={`${team.id}-match-score`} className={`p-4 ${isBest ? "bg-[#0F7377]/5" : ""}`}>
                          <div className="flex items-center gap-2">
                            <div className="relative h-8 w-8 rounded-full bg-[#0F7377]/10 flex items-center justify-center">
                              <span className="text-xs font-bold text-[#0F7377]">{team.matchScore}%</span>
                            </div>
                            {isBest && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="border-[#0F7377] text-[#0F7377]">
                                      Best
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Highest match score among compared teams</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-[#0F7377]" />
                        <span>Skills Completeness</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => {
                      const score = teamCompatibility[team.id]?.skillsCompleteness || 0
                      const isBest = getBestTeamForCategory("skillsCompleteness").includes(team.id)
                      return (
                        <div key={`${team.id}-skills-completeness`} className={`p-4 ${isBest ? "bg-[#0F7377]/5" : ""}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">{score}%</span>
                            {isBest && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="border-[#0F7377] text-[#0F7377]">
                                      Best
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Best skills coverage among compared teams</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-[#0F7377]" />
                        <span>Experience Level</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => {
                      const score = teamCompatibility[team.id]?.experienceLevel || 0
                      const isBest = getBestTeamForCategory("experienceLevel").includes(team.id)
                      return (
                        <div key={`${team.id}-experience-level`} className={`p-4 ${isBest ? "bg-[#0F7377]/5" : ""}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">{score}%</span>
                            {isBest && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="border-[#0F7377] text-[#0F7377]">
                                      Best
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Highest team experience level among compared teams</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#0F7377]" />
                        <span>Industry Alignment</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => {
                      const score = teamCompatibility[team.id]?.industryAlignment || 0
                      const isBest = getBestTeamForCategory("industryAlignment").includes(team.id)
                      return (
                        <div key={`${team.id}-industry-alignment`} className={`p-4 ${isBest ? "bg-[#0F7377]/5" : ""}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">{score}%</span>
                            {isBest && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="border-[#0F7377] text-[#0F7377]">
                                      Best
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Best industry alignment among compared teams</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#0F7377]" />
                        <span>Location Proximity</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => {
                      const score = teamCompatibility[team.id]?.locationProximity || 0
                      const isBest = getBestTeamForCategory("locationProximity").includes(team.id)
                      return (
                        <div key={`${team.id}-location-proximity`} className={`p-4 ${isBest ? "bg-[#0F7377]/5" : ""}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">{score}%</span>
                            {isBest && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="border-[#0F7377] text-[#0F7377]">
                                      Best
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Best location proximity among compared teams</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Team Composition Section */}
              <div className="mb-8 rounded-lg border">
                <div className="border-b bg-slate-50 p-4 sm:sticky sm:left-0">
                  <h3 className="font-medium">Team Composition</h3>
                  <p className="text-xs text-muted-foreground">Details about founding team members and skills</p>
                </div>

                <div className="divide-y">
                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-[#0F7377]" />
                        <span>Team Size</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => (
                      <div key={`${team.id}-team-size`} className="p-4">
                        <span className="text-sm">{team.founders.length} members</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <BriefcaseBusiness className="h-4 w-4 text-[#0F7377]" />
                        <span>Avg. Experience</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => {
                      const avgExperience = getAverageExperience(team)
                      return (
                        <div key={`${team.id}-avg-experience`} className="p-4">
                          <span className="text-sm">{avgExperience.toFixed(1)} years</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <Scale className="h-4 w-4 text-[#0F7377]" />
                        <span>Co-founder Balance</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => {
                      // Simple assessment of co-founder skill balance
                      const isBalanced =
                        team.founders.length >= 2 && new Set(team.founders.flatMap((f) => f.skills)).size >= 4

                      return (
                        <div key={`${team.id}-balance`} className="p-4">
                          <div className="flex items-center gap-2">
                            {isBalanced ? (
                              <>
                                <Check className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-green-600">Well balanced</span>
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-4 w-4 text-amber-600" />
                                <span className="text-sm text-amber-600">Skill gaps</span>
                              </>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <FileStack className="h-4 w-4 text-[#0F7377]" />
                        <span>Key Team Members</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => (
                      <div key={`${team.id}-members`} className="p-4">
                        <div className="flex flex-col gap-2">
                          {team.founders.map((founder) => (
                            <div key={founder.id} className="flex items-center gap-2">
                              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                <Image
                                  src={founder.avatar || "/placeholder.svg?height=24&width=24"}
                                  alt={founder.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-xs font-medium">{founder.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {founder.skills.slice(0, 2).map(getSkillLabel).join(", ")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills Coverage Section */}
              <div className="mb-8 rounded-lg border">
                <div className="border-b bg-slate-50 p-4 sm:sticky sm:left-0">
                  <h3 className="font-medium">Skills Coverage</h3>
                  <p className="text-xs text-muted-foreground">Comparison of skills represented in each team</p>
                </div>

                <div className="divide-y">
                  {getAllSkills().map((skill) => (
                    <div key={skill} className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                      <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-[#0F7377]" />
                          <span>{getSkillLabel(skill)}</span>
                        </div>
                      </div>
                      {comparisonData.map((team) => {
                        const hasThisSkill = hasSkill(team, skill)
                        return (
                          <div key={`${team.id}-${skill}`} className="p-4">
                            {hasThisSkill ? (
                              <Check className="h-5 w-5 text-green-600" />
                            ) : (
                              <X className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Business & Stage Section */}
              <div className="mb-8 rounded-lg border">
                <div className="border-b bg-slate-50 p-4 sm:sticky sm:left-0">
                  <h3 className="font-medium">Business & Stage</h3>
                  <p className="text-xs text-muted-foreground">
                    Information about business focus and development stage
                  </p>
                </div>

                <div className="divide-y">
                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-[#0F7377]" />
                        <span>Industry</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => (
                      <div key={`${team.id}-industry`} className="p-4">
                        <Badge variant="outline">{team.industry}</Badge>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4 text-[#0F7377]" />
                        <span>Business Idea</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => (
                      <div key={`${team.id}-idea`} className="p-4">
                        <p className="text-sm line-clamp-3">{team.idea}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                    <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-[#0F7377]" />
                        <span>Stage</span>
                      </div>
                    </div>
                    {comparisonData.map((team) => (
                      <div key={`${team.id}-stage`} className="p-4">
                        <Badge className={getStageColor(team.stage)}>{getStageLabel(team.stage)}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="grid grid-cols-[220px_repeat(auto-fill,minmax(200px,1fr))]">
                <div className="flex items-center bg-slate-50 p-4 font-medium sm:sticky sm:left-0">
                  <div className="flex items-center gap-2">
                    <span>Actions</span>
                  </div>
                </div>
                {comparisonData.map((team) => (
                  <div key={`${team.id}-actions`} className="p-4">
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90 w-full"
                        onClick={() => console.log(`Add team ${team.id} to deal pipeline`)}
                      >
                        Add to Pipeline
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => console.log(`View team ${team.id} details`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
