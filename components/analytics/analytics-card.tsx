"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface AnalyticsCardProps {
  title: string
  description?: string
  tooltip?: string
  className?: string
  children: React.ReactNode
  isLoading?: boolean
}

export function AnalyticsCard({
  title,
  description,
  tooltip,
  className,
  children,
  isLoading = false,
}: AnalyticsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {description && <CardDescription className="text-xs text-muted-foreground">{description}</CardDescription>}
        </div>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoCircledIcon className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[120px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}
