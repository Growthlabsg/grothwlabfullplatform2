"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff, Phone, Video, VideoOff, Monitor } from "lucide-react"
import type { Channel } from "@/types/communication"

interface VideoCallDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipient: Channel
}

export function VideoCallDialog({ open, onOpenChange, recipient }: VideoCallDialogProps) {
  const [callState, setCallState] = useState<"dialing" | "connected" | "ended">("dialing")
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
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
      setIsVideoOff(false)
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
      <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden">
        <div className="relative h-[500px] bg-black flex items-center justify-center">
          {/* Video display area */}
          {callState === "connected" && !isVideoOff ? (
            <>
              {/* Simulate video feed with a background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/modern-office-space.png')` }}
              />

              {/* Self view */}
              <div className="absolute bottom-20 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('/startup-pitch-competition.png')` }}
                />
              </div>
            </>
          ) : (
            <>
              {/* Show avatar when video is off or during dialing */}
              <div className="flex flex-col items-center justify-center">
                <Avatar className="h-24 w-24 mb-4 border-4 border-gray-800">
                  <AvatarImage src={recipient.avatar || "/placeholder.svg"} alt={recipient.name} />
                  <AvatarFallback>{recipient.name.substring(0, 2)}</AvatarFallback>
                </Avatar>

                <h2 className="text-xl font-bold mb-2 text-white">{recipient.name}</h2>

                {callState === "dialing" && <p className="text-gray-300 mb-8 animate-pulse">Calling...</p>}

                {callState === "connected" && <p className="text-gray-300 mb-8">{formatDuration(callDuration)}</p>}

                {callState === "ended" && <p className="text-gray-300 mb-8">Call ended</p>}
              </div>
            </>
          )}

          {/* Call controls */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            {callState === "connected" && (
              <>
                <Button
                  variant={isMuted ? "secondary" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gray-800 border-gray-700"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                </Button>

                <Button
                  variant={isVideoOff ? "secondary" : "outline"}
                  size="icon"
                  className="h-12 w-12 rounded-full bg-gray-800 border-gray-700"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  <span className="sr-only">{isVideoOff ? "Turn on video" : "Turn off video"}</span>
                </Button>

                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full bg-gray-800 border-gray-700">
                  <Monitor className="h-5 w-5" />
                  <span className="sr-only">Share screen</span>
                </Button>
              </>
            )}

            <Button variant="destructive" size="icon" className="h-12 w-12 rounded-full" onClick={handleEndCall}>
              <Phone className="h-5 w-5 rotate-135" />
              <span className="sr-only">End call</span>
            </Button>
          </div>

          {/* Call duration display */}
          {callState === "connected" && (
            <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
              <p className="text-sm text-white">{formatDuration(callDuration)}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
