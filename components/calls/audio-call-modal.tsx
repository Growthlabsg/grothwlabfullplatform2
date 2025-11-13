"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mic, MicOff, Phone, ChevronDown, Share2, StopCircle, Volume2, VolumeX, Archive, X } from "lucide-react"

import { transcribeAudio, type TranscriptionResult } from "@/lib/transcription-service"
import { generateMeetingSummary, type MeetingSummary } from "@/lib/summary-generator"
import { RecordingConsentDialog } from "../video-call/recording-consent-dialog"
import { ShareContentDialog } from "../video-call/share-content-dialog"
import { archiveMeeting } from "@/lib/meeting-archive-service"

interface AudioCallModalProps {
  isOpen: boolean
  onClose: () => void
  callId: string
  participant: {
    id: string
    name: string
    avatar: string
    role: string
  }
}

export function AudioCallModal({ isOpen, onClose, callId, participant }: AudioCallModalProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOff, setIsSpeakerOff] = useState(false)
  const [callStatus, setCallStatus] = useState<"connecting" | "ongoing" | "ended">("connecting")
  const [callDuration, setCallDuration] = useState(0)
  const [callTimer, setCallTimer] = useState<NodeJS.Timeout | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [screenShareStream, setScreenShareStream] = useState<MediaStream | null>(null)
  const [selectedMicrophone, setSelectedMicrophone] = useState("default")
  const [selectedSpeaker, setSelectedSpeaker] = useState("default")

  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null)
  const [meetingSummary, setMeetingSummary] = useState<MeetingSummary | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [showConsentDialog, setShowConsentDialog] = useState(false)
  const [recordingConsent, setRecordingConsent] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [shareContentType, setShareContentType] = useState<"recording" | "transcript" | "summary">("recording")
  const [meetingArchived, setMeetingArchived] = useState(false)

  const screenShareRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mock microphone and speaker options
  const microphoneOptions = [
    { id: "default", label: "Use system setting (MacBook Pro Microphone)" },
    { id: "external", label: "External Microphone" },
    { id: "airpods", label: "AirPods Pro" },
  ]

  const speakerOptions = [
    { id: "default", label: "Use system setting (MacBook Pro Speakers)" },
    { id: "external", label: "External Speakers" },
    { id: "airpods", label: "AirPods Pro" },
  ]

  // Simulate call connection
  useEffect(() => {
    if (isOpen && callStatus === "connecting") {
      // Simulate connection delay
      setTimeout(() => {
        setCallStatus("ongoing")
        startCallTimer()
      }, 1500)
    }

    return () => {
      if (callTimer) {
        clearInterval(callTimer)
      }

      // Clean up screen share
      if (screenShareStream) {
        screenShareStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [isOpen, callStatus])

  // Start call timer
  const startCallTimer = () => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)
    setCallTimer(timer as any)
  }

  // Format call duration as MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleToggleSpeaker = () => {
    setIsSpeakerOff(!isSpeakerOff)
  }

  const handleToggleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing
      if (screenShareStream) {
        screenShareStream.getTracks().forEach((track) => track.stop())
        setScreenShareStream(null)
      }
      setIsScreenSharing(false)
    } else {
      // Start screen sharing
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })

        setScreenShareStream(stream)

        if (screenShareRef.current) {
          screenShareRef.current.srcObject = stream
        }

        setIsScreenSharing(true)

        // Handle the end of screen sharing
        if (stream?.getVideoTracks()?.[0]) {
          stream.getVideoTracks()[0].onended = () => {
            setIsScreenSharing(false)
            setScreenShareStream(null)
          }
        }
      } catch (error) {
        console.error("Error sharing screen:", error)
      }
    }
  }

  const handleStartRecording = () => {
    // Show consent dialog before starting recording
    setShowConsentDialog(true)
  }

  const handleRecordingConsent = (consented: boolean) => {
    setShowConsentDialog(false)

    if (consented) {
      setRecordingConsent(true)
      setIsRecording(true)
      console.log("Starting recording...")
      // In a real implementation, this would start capturing the audio
    }
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    console.log("Stopping recording...")

    // Mock recorded audio blob
    const mockAudioBlob = new Blob(["mock audio data"], { type: "audio/webm" })
    setRecordedAudio(mockAudioBlob)
  }

  const handleEndCall = () => {
    setCallStatus("ended")
    if (callTimer) {
      clearInterval(callTimer)
    }

    // Stop recording if it's active
    if (isRecording) {
      handleStopRecording()
    }

    // If recording was done, process transcription
    if (recordedAudio) {
      setIsTranscribing(true)

      // Process transcription
      transcribeAudio(recordedAudio)
        .then((result) => {
          setTranscription(result)
          return generateMeetingSummary(result, `Call with ${participant.name}`)
        })
        .then((summary) => {
          setMeetingSummary(summary)
          setShowSummary(true)
          setIsTranscribing(false)
        })
        .catch((error) => {
          console.error("Error processing transcription:", error)
          setIsTranscribing(false)
        })
    }

    setTimeout(() => {
      if (!isTranscribing && !showSummary) {
        onClose()
      }
    }, 1000)
  }

  const handleShare = (contentType: "recording" | "transcript" | "summary") => {
    setShareContentType(contentType)
    setShowShareDialog(true)
  }

  const handleArchiveMeeting = async () => {
    if (meetingArchived) return

    try {
      // Archive the meeting
      await archiveMeeting(
        `Call with ${participant.name}`,
        callDuration,
        [participant],
        undefined, // No video for audio calls
        transcription || undefined,
        meetingSummary || undefined,
      )

      setMeetingArchived(true)
    } catch (error) {
      console.error("Error archiving meeting:", error)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-md p-0 overflow-hidden" ref={containerRef}>
          <div className="flex flex-col h-full">
            {/* Main content area */}
            <div className="flex-1 bg-black p-6 flex flex-col items-center justify-center relative">
              {isScreenSharing ? (
                <video ref={screenShareRef} autoPlay className="w-full h-full object-contain" />
              ) : (
                <>
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                    <AvatarFallback className="text-2xl">{participant.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-white">{participant.name}</h3>
                  <p className="text-gray-300 mb-2">{participant.role}</p>

                  {callStatus === "ongoing" && (
                    <div className="flex items-center text-sm mt-2 text-gray-300">
                      <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Call in progress: {formatDuration(callDuration)}
                    </div>
                  )}

                  {callStatus === "connecting" && (
                    <div className="flex items-center text-sm mt-2 text-gray-300">
                      <span className="animate-pulse inline-block h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                      Connecting...
                    </div>
                  )}

                  {callStatus === "ended" && (
                    <div className="flex items-center text-sm mt-2 text-gray-300">
                      <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      Call ended
                    </div>
                  )}
                </>
              )}

              {/* Status badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {isRecording && (
                  <Badge variant="destructive" className="animate-pulse">
                    Recording
                  </Badge>
                )}
                {isScreenSharing && <Badge variant="secondary">Screen Sharing</Badge>}
              </div>
            </div>

            {/* Bottom control bar - FaceTime style */}
            <div className="bg-black p-4 flex items-center justify-center">
              <div className="flex items-center justify-between w-full max-w-xs">
                {/* Microphone control */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`rounded-full h-14 w-14 bg-zinc-800 border-0 hover:bg-zinc-700 ${isMuted ? "bg-red-500 hover:bg-red-600" : ""}`}
                    >
                      <div className="flex flex-col items-center">
                        {isMuted ? <MicOff className="h-6 w-6 text-white" /> : <Mic className="h-6 w-6 text-white" />}
                        <ChevronDown className="h-3 w-3 text-white mt-1" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-zinc-800 border-zinc-700 text-white p-0" align="center">
                    <div className="p-2 border-b border-zinc-700">
                      <h3 className="font-medium text-sm">Microphone</h3>
                    </div>
                    <RadioGroup value={selectedMicrophone} onValueChange={setSelectedMicrophone} className="p-2">
                      {microphoneOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 py-1">
                          <RadioGroupItem id={`mic-${option.id}`} value={option.id} className="text-white" />
                          <Label htmlFor={`mic-${option.id}`} className="text-white">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </PopoverContent>
                </Popover>

                <div className="flex items-center gap-2">
                  {/* Screen sharing button - Prominent like in FaceTime */}
                  <Button
                    variant="outline"
                    className={`rounded-full h-12 w-12 ${isScreenSharing ? "bg-green-500 hover:bg-green-600" : "bg-zinc-800 hover:bg-zinc-700"} border-0`}
                    onClick={handleToggleScreenShare}
                  >
                    <Share2 className="h-5 w-5 text-white" />
                  </Button>

                  {/* Recording button */}
                  <Button
                    variant="outline"
                    className={`rounded-full h-12 w-12 ${isRecording ? "bg-red-500 hover:bg-red-600" : "bg-zinc-800 hover:bg-zinc-700"} border-0`}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                  >
                    {isRecording ? (
                      <StopCircle className="h-5 w-5 text-white" />
                    ) : (
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                    )}
                  </Button>
                </div>

                {/* Speaker control */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`rounded-full h-14 w-14 bg-zinc-800 border-0 hover:bg-zinc-700 ${isSpeakerOff ? "bg-red-500 hover:bg-red-600" : ""}`}
                    >
                      <div className="flex flex-col items-center">
                        {isSpeakerOff ? (
                          <VolumeX className="h-6 w-6 text-white" />
                        ) : (
                          <Volume2 className="h-6 w-6 text-white" />
                        )}
                        <ChevronDown className="h-3 w-3 text-white mt-1" />
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 bg-zinc-800 border-zinc-700 text-white p-0" align="center">
                    <div className="p-2 border-b border-zinc-700">
                      <h3 className="font-medium text-sm">Speaker</h3>
                    </div>
                    <RadioGroup value={selectedSpeaker} onValueChange={setSelectedSpeaker} className="p-2">
                      {speakerOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 py-1">
                          <RadioGroupItem id={`speaker-${option.id}`} value={option.id} className="text-white" />
                          <Label htmlFor={`speaker-${option.id}`} className="text-white">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* End call button - Centered at bottom */}
            <div className="bg-black pb-4 flex justify-center">
              <Button
                variant="destructive"
                className="rounded-full h-14 w-14 bg-red-500 hover:bg-red-600"
                onClick={handleEndCall}
              >
                <Phone className="h-6 w-6 text-white" />
              </Button>
            </div>
          </div>

          {/* Chat sidebar */}
          {showChat && (
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-zinc-900 border-l border-gray-200 dark:border-gray-800 z-10">
              <div className="p-3 border-b font-medium flex justify-between items-center">
                <span>Chat</span>
                <Button variant="ghost" size="icon" onClick={() => setShowChat(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3">
                <p className="text-center text-sm text-muted-foreground">No messages yet. Start the conversation!</p>
              </div>
            </div>
          )}

          {/* Summary dialog */}
          {showSummary && meetingSummary && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col overflow-auto">
              <div className="p-6 mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">{meetingSummary.title} Summary</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleShare("summary")}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleArchiveMeeting} disabled={meetingArchived}>
                      <Archive className="h-4 w-4 mr-2" />
                      {meetingArchived ? "Archived" : "Archive"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setShowSummary(false)
                        onClose()
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Summary content - abbreviated for brevity */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold mb-2">Key Points</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {meetingSummary.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading state */}
          {isTranscribing && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-lg font-medium">Processing transcript...</p>
                <p className="text-sm text-muted-foreground mt-2">This may take a moment</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Recording Consent Dialog */}
      <RecordingConsentDialog
        isOpen={showConsentDialog}
        onClose={handleRecordingConsent}
        callId={callId}
        recordingType="audio"
      />

      {/* Share Content Dialog */}
      {meetingSummary && (
        <ShareContentDialog
          isOpen={showShareDialog}
          onClose={() => setShowShareDialog(false)}
          contentId={
            shareContentType === "summary"
              ? meetingSummary.id
              : shareContentType === "transcript"
                ? transcription?.id || ""
                : callId
          }
          contentType={shareContentType}
          title={meetingSummary.title}
        />
      )}
    </>
  )
}
