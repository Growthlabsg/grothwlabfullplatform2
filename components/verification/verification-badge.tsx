import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BadgeCheck, AlertCircle, Clock } from "lucide-react"

export type VerificationStatus = "verified" | "pending" | "unverified"

interface VerificationBadgeProps {
  status: VerificationStatus
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  className?: string
}

export function VerificationBadge({ status, size = "md", showTooltip = true, className = "" }: VerificationBadgeProps) {
  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    md: "h-4.5 w-4.5",
    lg: "h-5.5 w-5.5",
  }

  const renderBadge = () => {
    switch (status) {
      case "verified":
        return <BadgeCheck className={`text-green-600 ${sizeClasses[size]} ${className}`} />
      case "pending":
        return <Clock className={`text-yellow-600 ${sizeClasses[size]} ${className}`} />
      case "unverified":
        return <AlertCircle className={`text-gray-400 ${sizeClasses[size]} ${className}`} />
    }
  }

  const getTooltipText = () => {
    switch (status) {
      case "verified":
        return "This startup has been verified by GrowthLab"
      case "pending":
        return "Verification in progress"
      case "unverified":
        return "This startup has not been verified"
    }
  }

  if (!showTooltip) {
    return renderBadge()
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex cursor-help">{renderBadge()}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
