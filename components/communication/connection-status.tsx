"use client"

import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConnectionStatusProps {
  user: any
  className?: string
}

export function ConnectionStatus({ user, className }: ConnectionStatusProps) {
  const isConnected = user?.isConnected || user?.connectionStatus === 'connected'
  const isPending = user?.isPending || user?.connectionStatus === 'pending'

  if (isConnected) {
    return (
      <Badge 
        variant="default" 
        className={cn("bg-green-100 text-green-800 border-green-200", className)}
      >
        <CheckCircle className="h-3 w-3 mr-1" />
        Connected
      </Badge>
    )
  }

  if (isPending) {
    return (
      <Badge 
        variant="secondary" 
        className={cn("bg-yellow-100 text-yellow-800 border-yellow-200", className)}
      >
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    )
  }

  return (
    <Badge 
      variant="outline" 
      className={cn("bg-gray-100 text-gray-600 border-gray-200", className)}
    >
      <UserPlus className="h-3 w-3 mr-1" />
      Not Connected
    </Badge>
  )
}
