"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Phone } from "lucide-react"
import type { Channel } from "@/types/communication"

interface AudioCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipient: Channel
}

export function AudioCallDialog({ open, onOpenChange, recipient }: AudioCallDialogProps) {
  const [callState, setCallState] = useState<"dialing" | "connected" | "ended">("dialing")
  const [isMuted, setIsMuted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)

  // Handle call timer
  useEffect(() => {
    let interval: number | null = null

    if (callState === "connected") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [callState])

  // Simulate call connection after 2 seconds
  useEffect(() => {
    if (open && callState === "dialing") {
      const timer = setTimeout(() => {
        setCallState("connected")
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [open, callState])

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Handle ending the call
  const handleEndCall = () => {
    setCallState("ended")
    setTimeout(() => {
      onOpenChange(false)
      // Reset state for next call
      setCallState("dialing")
      setCallDuration(0)
      setIsMuted(false)
    }, 500)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) handleEndCall()
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 flex flex-col items-center justify-center">
          <Avatar className="h-24 w-24 mb-4 border-4 border-background">
            <AvatarImage src={recipient.avatar || "/placeholder.svg"} alt={recipient.name} />
            <AvatarFallback>{recipient.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <h2 className="text-xl font-bold mb-2">{recipient.name}</h2>

          {callState === "dialing" && <p className="text-muted-foreground mb-8 animate-pulse">Calling...</p>}

          {callState === "connected" && <p className="text-muted-foreground mb-8">{formatDuration(callDuration)}</p>}

          {callState === "ended" && <p className="text-muted-foreground mb-8">Call ended</p>}

          <div className="flex gap-4">
            {callState === "connected" && (
              <Button
                variant={isMuted ? "secondary" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
              </Button>
            )}

            <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full" onClick={handleEndCall}>
              <Phone className="h-5 w-5 rotate-135" />
              <span className="sr-only">End call</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
