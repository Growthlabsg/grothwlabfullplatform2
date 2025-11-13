export interface MentorProfile {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  title: string
  company: string
  expertise: string[]
  industries: string[]
  languages: string[]
  location: string
  linkedIn?: string
  twitter?: string
  website?: string
  availabilityHours: number
  yearsOfExperience: number
  startupExperience: string[]
  joinedDate: string
  rating: number
  testimonials: MentorTestimonial[]
  sessions: MentorSession[]
  mentees: Mentee[]
  goals?: string[]
  resources?: MentorResource[]
}

export interface MentorTestimonial {
  id: string
  menteeId: string
  menteeName: string
  menteeAvatar: string
  rating: number
  text: string
  date: string
}

export interface MentorSession {
  id: string
  menteeId: string
  menteeName: string
  menteeAvatar: string
  menteeCompany?: string
  status: "scheduled" | "completed" | "cancelled"
  type: "one-on-one" | "group" | "workshop"
  topic: string
  description: string
  date: string
  time: string
  duration: number
  notes?: string
  feedback?: {
    rating: number
    comments: string
  }
  goals?: string[]
  followUp?: string
}

export interface Mentee {
  id: string
  name: string
  avatar: string
  company: string
  title: string
  industry: string
  stage: string
  goals: string[]
  challenges: string[]
  sessionsCompleted: number
  activeSession?: string
  joinedDate: string
}

export interface MentorResource {
  id: string
  title: string
  description: string
  type: "article" | "video" | "book" | "template" | "tool" | "other"
  url: string
  tags: string[]
  dateAdded: string
  visibility: "public" | "mentees" | "private"
}

export interface SessionAvailability {
  id: string
  mentorId: string
  date: string
  timeSlots: {
    startTime: string
    endTime: string
    isBooked: boolean
    sessionId?: string
  }[]
}
