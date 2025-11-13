"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Check, X } from 'lucide-react'
import type { User } from "@/types/auth"
import type { ConnectionRequest as ConnectionRequestType } from "@/lib/connection-service"
import { acceptConnectionRequest, rejectConnectionRequest } from "@/lib/connection-service"

interface ConnectionRequestProps {
  request: ConnectionRequestType
  sender: User
  onAccept: () => void
  onReject: () => void
}

export function ConnectionRequest({ request, sender, onAccept, onReject }: ConnectionRequestProps) {
  const [loading, setLoading] = useState<"accept" | "reject" | null>(null)

  const handleAccept = async () => {
    setLoading("accept")
    try {
      acceptConnectionRequest(request.id)
      onAccept()
    } catch (error) {
      console.error("Error accepting connection request:", error)
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async () => {
    setLoading("reject")
    try {
      rejectConnectionRequest(request.id)
      onReject()
    } catch (error) {
      console.error("Error rejecting connection request:", error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={sender.avatarUrl || "/placeholder.svg"} alt={sender.displayName || sender.email} />
          <AvatarFallback>
            {sender.displayName ? sender.displayName.charAt(0) : sender.email.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{sender.displayName || sender.email}</p>
          <p className="text-sm text-muted-foreground">{sender.designation || "GrowthLab Member"}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleReject}
          disabled={loading !== null}
          className="text-destructive border-destructive hover:bg-destructive/10"
        >
          {loading === "reject" ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
        </Button>
        <Button variant="default" size="sm" onClick={handleAccept} disabled={loading !== null}>
          {loading === "accept" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
