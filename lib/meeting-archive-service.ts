import type { MeetingSummary } from "./summary-generator"
import type { TranscriptionResult } from "./transcription-service"

export interface ArchivedMeeting {
  id: string
  title: string
  date: Date
  duration: number
  participants: {
    id: string
    name: string
    email?: string
    role?: string
    avatar?: string
  }[]
  tags: string[]
  recordingUrl?: string
  transcriptId?: string
  summaryId?: string
  isStarred?: boolean
  folderId?: string
  viewCount: number
  lastViewedAt?: Date
}

export interface MeetingFolder {
  id: string
  name: string
  meetingCount: number
  createdAt: Date
  updatedAt: Date
}

// Mock function to save a meeting to the archive
export async function archiveMeeting(
  meetingTitle: string,
  duration: number,
  participants: any[],
  recording?: Blob,
  transcript?: TranscriptionResult,
  summary?: MeetingSummary,
): Promise<ArchivedMeeting> {
  console.log("Archiving meeting:", meetingTitle)

  // In a real implementation, this would save the meeting data to a database
  // and upload recordings to storage

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock archived meeting
  const archivedMeeting: ArchivedMeeting = {
    id: `meeting-${Date.now()}`,
    title: meetingTitle,
    date: new Date(),
    duration,
    participants: participants.map((p) => ({
      id: p.id,
      name: p.name,
      role: p.role,
      avatar: p.avatar,
    })),
    tags: ["meeting", "call"],
    recordingUrl: recording ? "/mock-recording-url" : undefined,
    transcriptId: transcript ? transcript.id : undefined,
    summaryId: summary ? summary.id : undefined,
    viewCount: 0,
  }

  return archivedMeeting
}

// Mock function to get archived meetings
export async function getArchivedMeetings(limit = 20, offset = 0): Promise<ArchivedMeeting[]> {
  // In a real implementation, this would fetch meetings from a database

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock archived meetings
  return [
    {
      id: "meeting-1",
      title: "Weekly Team Sync",
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      duration: 45,
      participants: [
        { id: "user1", name: "Sarah Wong", role: "Investor", avatar: "/abstract-southwest.png" },
        { id: "user2", name: "David Kumar", role: "Mentor", avatar: "/abstract-geometric-dk.png" },
      ],
      tags: ["team", "weekly", "sync"],
      recordingUrl: "/mock-recording-url",
      transcriptId: "transcript-1",
      summaryId: "summary-1",
      isStarred: true,
      viewCount: 5,
      lastViewedAt: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "meeting-2",
      title: "Project Kickoff",
      date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      duration: 60,
      participants: [
        { id: "user3", name: "Emily Nguyen", role: "Founder", avatar: "/ancient-forest-path.png" },
        { id: "user4", name: "Michael Zhang", role: "Investor", avatar: "/Abstract Monochromatic Zenith.png" },
      ],
      tags: ["project", "kickoff"],
      recordingUrl: "/mock-recording-url",
      transcriptId: "transcript-2",
      summaryId: "summary-2",
      viewCount: 3,
      lastViewedAt: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "meeting-3",
      title: "Investor Update",
      date: new Date(Date.now() - 86400000 * 10), // 10 days ago
      duration: 30,
      participants: [{ id: "user5", name: "Lisa Lim", role: "Mentor", avatar: "/abstract-geometric-ll.png" }],
      tags: ["investor", "update"],
      recordingUrl: "/mock-recording-url",
      transcriptId: "transcript-3",
      summaryId: "summary-3",
      folderId: "folder-1",
      viewCount: 8,
      lastViewedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
    },
  ]
}

// Mock function to get meeting folders
export async function getMeetingFolders(): Promise<MeetingFolder[]> {
  // In a real implementation, this would fetch folders from a database

  return [
    {
      id: "folder-1",
      name: "Investor Meetings",
      meetingCount: 5,
      createdAt: new Date(Date.now() - 86400000 * 30),
      updatedAt: new Date(),
    },
    {
      id: "folder-2",
      name: "Team Syncs",
      meetingCount: 12,
      createdAt: new Date(Date.now() - 86400000 * 60),
      updatedAt: new Date(),
    },
    {
      id: "folder-3",
      name: "Client Calls",
      meetingCount: 8,
      createdAt: new Date(Date.now() - 86400000 * 45),
      updatedAt: new Date(),
    },
  ]
}

// Mock function to search archived meetings
export async function searchMeetings(query: string): Promise<ArchivedMeeting[]> {
  console.log("Searching meetings for:", query)

  // In a real implementation, this would search the database

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return filtered mock data
  const meetings = await getArchivedMeetings()
  return meetings.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
      m.participants.some((p) => p.name.toLowerCase().includes(query.toLowerCase())),
  )
}
