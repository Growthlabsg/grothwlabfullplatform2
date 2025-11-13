"use client"

import type React from "react"

import { useState } from "react"
import { ShieldCheck, Lock, ShieldAlert, Info, Check } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type SecurityLevel = "standard" | "confidential" | "restricted"

interface FilePermissionSelectorProps {
  value: SecurityLevel
  onChange: (value: SecurityLevel) => void
  className?: string
  compact?: boolean
  showBadgeOnly?: boolean
}

export function FilePermissionSelector({
  value,
  onChange,
  className,
  compact = false,
  showBadgeOnly = false,
}: FilePermissionSelectorProps) {
  // If we only want to show the badge (for display purposes)
  if (showBadgeOnly) {
    return <SecurityLevelBadge level={value} />
  }

  // If we want a compact version (for inline use)
  if (compact) {
    return <CompactSecuritySelector value={value} onChange={onChange} className={className} />
  }

  // Full version for the file sharing dialog
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Security Level</h3>
        <SecurityLevelBadge level={value} />
      </div>

      <RadioGroup value={value} onValueChange={(val) => onChange(val as SecurityLevel)} className="gap-3">
        <SecurityLevelOption
          value="standard"
          currentValue={value}
          icon={<ShieldCheck className="h-5 w-5 text-green-500" />}
          title="Standard"
          description="Basic protection for non-sensitive files"
          details={[
            "Basic access controls",
            "Recipients can download, share and edit",
            "Basic tracking of file access",
          ]}
          color="green"
        />

        <SecurityLevelOption
          value="confidential"
          currentValue={value}
          icon={<Lock className="h-5 w-5 text-amber-500" />}
          title="Confidential"
          description="Enhanced protection with comprehensive tracking"
          details={[
            "Enhanced access controls",
            "Comprehensive tracking and logging",
            "All file interactions are recorded",
            "Detailed audit trails with user identities",
            "Downloads and views are tracked",
          ]}
          color="amber"
        />

        <SecurityLevelOption
          value="restricted"
          currentValue={value}
          icon={<ShieldAlert className="h-5 w-5 text-red-500" />}
          title="Restricted"
          description="Maximum protection with strict access controls"
          details={[
            "Maximum security controls",
            "Prevents downloads or actions outside the platform",
            "Watermarking and document protection",
            "Time-limited access with auto-expiration",
            "Comprehensive audit logging",
            "Requires authentication for every access",
          ]}
          color="red"
        />
      </RadioGroup>

      {value === "confidential" && (
        <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800 border border-amber-200">
          <div className="flex">
            <Info className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Confidential mode enabled</p>
              <p className="mt-1">
                All file interactions will be comprehensively tracked and logged. Users will be notified that their
                actions are being monitored.
              </p>
            </div>
          </div>
        </div>
      )}

      {value === "restricted" && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
          <div className="flex">
            <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Restricted mode enabled</p>
              <p className="mt-1">
                Recipients cannot download files or perform actions outside the platform. All access is strictly
                controlled and heavily audited.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Component for displaying just the security level badge
export function SecurityLevelBadge({ level }: { level: SecurityLevel }) {
  const badgeStyles = {
    standard: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    confidential: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    restricted: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
  }

  const icons = {
    standard: <ShieldCheck className="h-3 w-3 mr-1" />,
    confidential: <Lock className="h-3 w-3 mr-1" />,
    restricted: <ShieldAlert className="h-3 w-3 mr-1" />,
  }

  return (
    <Badge variant="outline" className={cn("capitalize flex items-center", badgeStyles[level])}>
      {icons[level]}
      {level}
    </Badge>
  )
}

// Compact selector for inline use
function CompactSecuritySelector({
  value,
  onChange,
  className,
}: {
  value: SecurityLevel
  onChange: (value: SecurityLevel) => void
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    {
      value: "standard" as SecurityLevel,
      icon: <ShieldCheck className="h-4 w-4 text-green-500" />,
      label: "Standard",
      description: "Basic protection",
    },
    {
      value: "confidential" as SecurityLevel,
      icon: <Lock className="h-4 w-4 text-amber-500" />,
      label: "Confidential",
      description: "Enhanced tracking",
    },
    {
      value: "restricted" as SecurityLevel,
      icon: <ShieldAlert className="h-4 w-4 text-red-500" />,
      label: "Restricted",
      description: "Maximum protection",
    },
  ]

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className="flex items-center">
          {selectedOption?.icon}
          <span className="ml-2">{selectedOption?.label}</span>
        </div>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md border shadow-lg z-10">
          <div className="p-1">
            {options.map((option) => (
              <button type="button"
                key={option.value}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded-sm flex items-center justify-between",
                  option.value === value ? "bg-muted" : "hover:bg-muted/50",
                )}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center">
                  {option.icon}
                  <div className="ml-2">
                    <div>{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </div>
                {option.value === value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Individual security level option
function SecurityLevelOption({
  value,
  currentValue,
  icon,
  title,
  description,
  details,
  color,
}: {
  value: SecurityLevel
  currentValue: SecurityLevel
  icon: React.ReactNode
  title: string
  description: string
  details: string[]
  color: "green" | "amber" | "red"
}) {
  const isSelected = value === currentValue
  const colorStyles = {
    green: {
      selected: "border-green-500 bg-green-50",
      hover: "hover:border-green-200",
    },
    amber: {
      selected: "border-amber-500 bg-amber-50",
      hover: "hover:border-amber-200",
    },
    red: {
      selected: "border-red-500 bg-red-50",
      hover: "hover:border-red-200",
    },
  }

  return (
    <div
      className={cn(
        "flex items-start space-x-3 rounded-lg border p-3 transition-colors",
        isSelected ? (colorStyles[color] ? colorStyles[color].selected : undefined) : (colorStyles[color] ? colorStyles[color].hover : undefined),
      )}
    >
      <RadioGroupItem value={value} id={value} className="mt-1" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <Label htmlFor={value} className="flex items-center font-medium">
            {icon}
            <span className="ml-2">{title}</span>
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="w-80">
                <div className="space-y-2">
                  <p className="font-medium">{title} Protection</p>
                  <ul className="list-disc pl-4 text-sm space-y-1">
                    {details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
