"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PollOptionProps {
  option: {
    id: string
    text: string
    votes: number
    percentage: number
  }
  totalVotes: number
  isVoted: boolean
  isSelected?: boolean
  onVote: () => void
}

export function PollOption({ option, totalVotes, isVoted, isSelected, onVote }: PollOptionProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "relative overflow-hidden border rounded-md",
        isSelected ? "border-primary" : "border-input",
        isVoted ? "cursor-default" : "cursor-pointer hover:border-primary/50",
      )}
      onClick={() => !isVoted && onVote()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background progress bar */}
      {isVoted && (
        <div
          className={cn("absolute top-0 left-0 h-full bg-primary/10", isSelected && "bg-primary/20")}
          style={{ width: `${option.percentage}%` }}
        />
      )}

      <div className="relative flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          {isVoted ? (
            <div
              className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center",
                isSelected ? "border-primary bg-primary text-primary-foreground" : "border-input",
              )}
            >
              {isSelected && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ) : (
            <div
              className={cn(
                "w-5 h-5 rounded-full border flex items-center justify-center",
                isHovered && "border-primary",
              )}
            />
          )}
          <span className="text-sm">{option.text}</span>
        </div>
        {isVoted && <span className="text-sm font-medium">{option.percentage}%</span>}
      </div>
    </div>
  )
}
