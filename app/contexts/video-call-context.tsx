"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

// Define types for the video call context
interface Meeting {
  id: string
  title: string
  description?: string
  startTime: Date
  duration: number // in minutes
  participants: MeetingParticipant[]
  roomId: string
  template?: string
  recordingEnabled?: boolean
  breakoutRoomsEnabled?: boolean
  whiteboardEnabled?: boolean
  translationEnabled?: boolean
  aiAssistantEnabled?: boolean
}

interface MeetingParticipant {
  id: string
  name: string
  role: "Host" | "Co-host" | "Participant" | "Observer"
  avatar: string
  email?: string
  organization?: string
  isConnected?: boolean
  hasAudio?: boolean
  hasVideo?: boolean
  isScreenSharing?: boolean
  breakoutRoomId?: string
}

interface CallSettings {
  audio: boolean
  video: boolean
  screenShare: boolean
  virtualBackground: string | null
  blurBackground: boolean
  noiseReduction: boolean
  autoFraming: boolean
  lowLightEnhancement: boolean
}

interface VideoCallContextType {
  isCallActive: boolean
  currentMeeting: Meeting | null
  participants: MeetingParticipant[]
  callSettings: CallSettings
  scheduledMeetings: Meeting[]
  recordings: { id: string; meetingId: string; date: Date; duration: number; url: string }[]
  connectToCall: (callId: string) => void
  disconnectFromCall: () => void
  toggleMute: () => void
  toggleVideo: () => void
  startScreenShare: () => void
  stopScreenShare: () => void
  startRecording: (callId: string) => void
  stopRecording: () => void
}

const defaultCallSettings: CallSettings = {
  audio: true,
  video: true,
  screenShare: false,
  virtualBackground: null,
  blurBackground: false,
  noiseReduction: true,
  autoFraming: true,
  lowLightEnhancement: true,
}

const defaultContext: VideoCallContextType = {
  isCallActive: false,
  currentMeeting: null,
  participants: [],
  callSettings: defaultCallSettings,
  scheduledMeetings: [],
  recordings: [],
  connectToCall: () => {},
  disconnectFromCall: () => {},
  toggleMute: () => {},
  toggleVideo: () => {},
  startScreenShare: () => {},
  stopScreenShare: () => {},
  startRecording: () => {},
  stopRecording: () => {},
}

const VideoCallContext = createContext<VideoCallContextType>(defaultContext)

export const useVideoCallContext = () => {
  const context = useContext(VideoCallContext)
  if (!context) {
    throw new Error("useVideoCallContext must be used within a VideoCallProvider")
  }
  return context
}

export const VideoCallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCallActive, setIsCallActive] = useState(false)
  const [currentMeeting, setCurrentMeeting] = useState<Meeting | null>(null)
  const [participants, setParticipants] = useState<MeetingParticipant[]>([])
  const [callSettings, setCallSettings] = useState<CallSettings>(defaultCallSettings)
  const [scheduledMeetings, setScheduledMeetings] = useState<Meeting[]>([])
  const [recordings, setRecordings] = useState<
    { id: string; meetingId: string; date: Date; duration: number; url: string }[]
  >([])

  const connectToCall = (callId: string) => {
    // In a real app, this would connect to the video call service
    console.log("Connecting to call:", callId)
    setIsCallActive(true)
  }

  const disconnectFromCall = () => {
    // In a real app, this would disconnect from the video call service
    console.log("Disconnecting from call")
    setIsCallActive(false)
    setCurrentMeeting(null)
  }

  const toggleMute = () => {
    setCallSettings((prev) => ({ ...prev, audio: !prev.audio }))
  }

  const toggleVideo = () => {
    setCallSettings((prev) => ({ ...prev, video: !prev.video }))
  }

  const startScreenShare = () => {
    // In a real app, this would start screen sharing
    console.log("Starting screen share")
    setCallSettings((prev) => ({ ...prev, screenShare: true }))
  }

  const stopScreenShare = () => {
    // In a real app, this would stop screen sharing
    console.log("Stopping screen share")
    setCallSettings((prev) => ({ ...prev, screenShare: false }))
  }

  const startRecording = (callId: string) => {
    // In a real app, this would start recording the call
    console.log("Starting recording for call:", callId)
  }

  const stopRecording = () => {
    // In a real app, this would stop recording the call
    console.log("Stopping recording")
  }

  const value = {
    isCallActive,
    currentMeeting,
    participants,
    callSettings,
    scheduledMeetings,
    recordings,
    connectToCall,
    disconnectFromCall,
    toggleMute,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    startRecording,
    stopRecording,
  }

  return <VideoCallContext.Provider value={value}>{children}</VideoCallContext.Provider>
}
