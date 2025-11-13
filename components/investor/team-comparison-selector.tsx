"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import type { FounderTeam } from "@/types/co-founder-matching"

interface TeamComparisonSelectorProps {
  teams: FounderTeam[]
  selectedTeams: string[]
  onTeamSelect: (teamId: string) => void
  onTeamRemove: (teamId: string) => void
  className?: string
  maxTeams?: number
}

export function TeamComparisonSelector({
  teams,
  selectedTeams,
  onTeamSelect,
  onTeamRemove,
  className,
  maxTeams = 3,
}: TeamComparisonSelectorProps) {
  const [open, setOpen] = useState(false)

  // Format team name
  const formatTeamName = (team: FounderTeam): string => {
    return team.name || `${team.industry.charAt(0).toUpperCase() + team.industry.slice(1)} Team`
  }

  // Get team by ID
  const getTeamById = (teamId: string): FounderTeam | undefined => {
    return teams.find((team) => team.id === teamId)
  }

  // Check if team is already selected
  const isSelected = (teamId: string): boolean => {
    return selectedTeams.includes(teamId)
  }

  // Check if we've reached the maximum number of teams
  const isMaxTeamsSelected = selectedTeams.length >= maxTeams

  // Available teams (not already selected)
  const availableTeams = teams.filter((team) => !selectedTeams.includes(team.id))

  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">Select teams to compare (max {maxTeams})</p>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              aria-expanded={open}
              aria-label="Select teams to compare"
              disabled={isMaxTeamsSelected}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Add Team</span>
              <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="end">
            <Command>
              <CommandInput placeholder="Search teams..." className="h-9" />
              <CommandList>
                <CommandEmpty>No teams found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-60">
                    {availableTeams.map((team) => (
                      <CommandItem
                        key={team.id}
                        value={team.id}
                        onSelect={() => {
                          onTeamSelect(team.id)
                          setOpen(false)
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <span className="font-medium">{formatTeamName(team)}</span>
                            <div className="flex text-xs text-muted-foreground">
                              <span className="mr-2">{team.industry}</span>
                              <span>{team.stage}</span>
                            </div>
                          </div>
                          <Badge variant="outline">{team.matchScore}%</Badge>
                        </div>
                        <Check className={`ml-auto h-4 w-4 ${isSelected(team.id) ? "opacity-100" : "opacity-0"}`} />
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedTeams.map((teamId) => {
          const team = getTeamById(teamId)
          if (!team) return null

          return (
            <Badge key={teamId} variant="secondary" className="flex items-center gap-1 py-1 pl-2">
              {formatTeamName(team)}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 rounded-full p-0 ml-1"
                onClick={() => onTeamRemove(teamId)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {formatTeamName(team)}</span>
              </Button>
            </Badge>
          )
        })}
      </div>
    </div>
  )
}
