export type CallStatus = "idle" | "ringing" | "ongoing" | "ended"
export type CallType = "audio" | "video"
export type RecordingStatus = "inactive" | "recording" | "paused" | "processing"
export type AnnotationTool = "pen" | "rectangle" | "circle" | "text" | "arrow" | "highlighter" | "eraser"
export type WhiteboardTool = "pen" | "rectangle" | "circle" | "text" | "arrow" | "image" | "eraser" | "selection"

export interface VideoCall {
  id: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  title: string
  description?: string
  startTime: string
  endTime?: string
  duration?: number // in minutes
  hostId: string
  hostName: string
  participants: VideoCallParticipant[]
  isGroupCall: boolean
  recordingUrl?: string
  transcriptUrl?: string
  meetingNotes?: string
  templateId?: string
  createdAt: string
  updatedAt: string
}

export interface VideoCallParticipant {
  id: string
  userId: string
  name: string
  email: string
  role: string
  status: "invited" | "accepted" | "declined" | "joined" | "left"
  joinedAt?: string
  leftAt?: string
  duration?: number // in seconds
  isHost: boolean
}

export interface Annotation {
  id: string
  participantId: string
  tool: AnnotationTool
  color: string
  width: number
  points: { x: number; y: number }[]
  text?: string
}

export interface WhiteboardElement {
  id: string
  participantId: string
  tool: WhiteboardTool
  color: string
  width: number
  points?: { x: number; y: number }[]
  text?: string
  position?: { x: number; y: number }
  size?: { width: number; height: number }
  imageUrl?: string
  rotation?: number
  createdAt: Date
  updatedAt: Date
}

export interface Whiteboard {
  id: string
  name: string
  elements: WhiteboardElement[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface BreakoutRoom {
  id: string
  name: string
  participants: VideoCallParticipant[]
  createdAt: Date
  isActive: boolean
  duration?: number
  endTime?: Date
}

export interface TranscriptEntry {
  id: string
  participantId: string
  participantName: string
  text: string
  timestamp: Date
  confidence: number
  language: string
  translation?: { [key: string]: string }
}

export interface ActionItem {
  id: string
  text: string
  assignee?: string
  dueDate?: Date
  completed: boolean
  createdAt: Date
  transcriptEntryId?: string
}

export interface MeetingInsight {
  id: string
  type: "sentiment" | "topic" | "question" | "decision" | "suggestion"
  text: string
  timestamp: Date
  confidence: number
  relatedTranscriptIds: string[]
}

export interface MeetingSummary {
  id: string
  meetingId: string
  summary: string
  keyPoints: string[]
  actionItems: ActionItem[]
  topics: { name: string; duration: number }[]
  sentimentScore: number
  createdAt: Date
}

export interface ParticipationMetrics {
  participantId: string
  speakingTime: number
  messageCount: number
  reactionCount: number
  handRaiseCount: number
  joinTime: Date
  leaveTime?: Date
  attentiveness: number // 0-100
  breakoutRoomTime?: { [roomId: string]: number }
}

export interface MeetingAnalytics {
  meetingId: string
  duration: number
  participantCount: number
  averageParticipantCount: number
  peakParticipantCount: number
  participantMetrics: ParticipationMetrics[]
  topSpeakers: string[]
  engagementScore: number
  topicDistribution: { [topic: string]: number }
}

export interface MeetingTemplate {
  id: string
  name: string
  description: string
  duration: number // in minutes
  agendaItems: {
    title: string
    duration: number // in minutes
    description?: string
  }[]
  isDefault: boolean
  createdBy: string

  defaultTitle: string
  defaultDuration: number // in minutes
  defaultParticipants?: string[] // participant IDs
  defaultAgenda?: string[]
  defaultSettings: {
    enableRecording: boolean
    enableAnnotations: boolean
    enableVirtualBackgrounds: boolean
    enableGroupCall: boolean
    enableTranscription: boolean
    enableWhiteboard: boolean
    enableBreakoutRooms: boolean
    enableLiveTranslation: boolean
    maxParticipants?: number
  }
}

export interface ScheduledMeeting {
  id: string
  title: string
  description?: string
  scheduledTime: Date
  duration: number // in minutes
  participants: {
    id: string
    name: string
    avatar?: string
    email?: string
    role?: string
  }[]
  hostId: string
  joinUrl: string
  agenda?: string[]
  templateId?: string
  settings: {
    enableRecording: boolean
    enableAnnotations: boolean
    enableVirtualBackgrounds: boolean
    enableGroupCall: boolean
    enableTranscription: boolean
    enableWhiteboard: boolean
    enableBreakoutRooms: boolean
    enableLiveTranslation: boolean
    maxParticipants?: number
  }
}

export interface RecordingMetadata {
  id: string
  callId: string
  startTime: Date
  endTime?: Date
  duration?: number
  url?: string
  size?: number
  status: RecordingStatus
  participantCount: number
  title: string
  transcript?: TranscriptEntry[]
  summary?: MeetingSummary
}

export interface VirtualBackground {
  id: string
  name: string
  type: "image" | "blur" | "color"
  url?: string
  color?: string
  blurAmount?: number
  thumbnail?: string
}

export interface SupportedLanguage {
  code: string
  name: string
  nativeName: string
  flag: string
}

export interface Meeting {
  id: string
  title: string
  description: string
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

export interface MeetingParticipant {
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

export interface CallSettings {
  audio: boolean
  video: boolean
  screenShare: boolean
  virtualBackground: string | null
  blurBackground: boolean
  noiseReduction: boolean
  autoFraming: boolean
  lowLightEnhancement: boolean
}

export interface MeetingTemplate {
  id: string
  name: string
  description: string
  duration: number
  features: {
    recording: boolean
    breakoutRooms: boolean
    whiteboard: boolean
    translation: boolean
    aiAssistant: boolean
  }
  agenda: string[]
}

export interface MeetingRecording {
  id: string
  meetingId: string
  title: string
  date: Date
  duration: number // in seconds
  url: string
  participants: string[]
  transcriptUrl?: string
  highlights?: {
    timestamp: number
    text: string
  }[]
}

export interface WhiteboardData {
  id: string
  meetingId: string
  elements: WhiteboardElement[]
  background: string
}

export interface TranslationSettings {
  enabled: boolean
  sourceLanguage: string
  targetLanguage: string
  showSubtitles: boolean
  translateChat: boolean
}

export interface AIAssistantSettings {
  enabled: boolean
  features: {
    transcription: boolean
    summarization: boolean
    actionItems: boolean
    questionAnswering: boolean
  }
}

export interface MeetingAnalytics {
  meetingId: string
  duration: number
  participantCount: number
  speakingTime: Record<string, number> // user ID to seconds
  engagement: Record<string, number> // user ID to engagement score
  topics: {
    name: string
    duration: number
    sentiment: "positive" | "neutral" | "negative"
  }[]
  actionItems: {
    text: string
    assignee: string
    timestamp: number
  }[]
}

export interface BreakoutRoom {
  id: string
  name: string
  participants: string[] // participant IDs
  duration?: number // in minutes
  task?: string
}

export interface WhiteboardElement {
  id: string
  type: "text" | "shape" | "line" | "freehand" | "image"
  x: number
  y: number
  width?: number
  height?: number
  content?: string
  color?: string
  points?: { x: number; y: number }[]
  createdBy: string // user ID
  createdAt: Date
}
