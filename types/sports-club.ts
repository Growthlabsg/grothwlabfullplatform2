export interface SportEvent {
  id: string
  title: string
  description: string
  sport: Sport
  location: string
  date: string
  time: string
  duration: string
  capacity: number
  registered: number
  image?: string
  organizer: {
    id: string
    name: string
    avatar?: string
    role?: UserRole
  }
  isRegistered?: boolean
  isWaitlisted?: boolean
  teamsAllowed?: boolean
  teamSize?: number
  teams?: Team[]
  audienceRoles?: UserRole[]
  rsvpType?: RSVPType
  networking?: {
    enabled: boolean
    time?: string
    theme?: string
  }
  waitlistCount?: number
}

export type Sport =
  | "soccer"
  | "basketball"
  | "tennis"
  | "badminton"
  | "volleyball"
  | "running"
  | "cycling"
  | "swimming"
  | "golf"
  | "table-tennis"
  | "cricket"
  | "rugby"
  | "hockey"
  | "baseball"
  | "frisbee"

export interface UserSportInterest {
  sport: Sport
  level: "beginner" | "intermediate" | "advanced"
  frequency?: "casual" | "regular" | "competitive"
  notes?: string
  preferredPositions?: string[]
  achievements?: string[]
}

export type UserRole = "founder" | "investor" | "mentor" | "operator" | "student" | "community" | "other"

export type RSVPType = "playing" | "spectating" | "organizing"

export interface ParticipationRecord {
  id: string
  eventId: string
  eventTitle: string
  sport: Sport
  date: string
  status: "attended" | "missed" | "upcoming" | "late"
  checkInTime?: string
  feedback?: string
  rating?: number
  team?: string
}

export interface Team {
  id: string
  name: string
  sport: Sport
  captain: {
    id: string
    name: string
    avatar?: string
  }
  members: {
    id: string
    name: string
    avatar?: string
    position?: string
  }[]
  logo?: string
  description?: string
  achievements?: string[]
  createdAt: string
  eventIds?: string[] // Events this team is participating in
}

export interface AttendanceRecord {
  userId: string
  userName: string
  eventId: string
  eventTitle: string
  checkInTime: string
  status: "attended" | "missed" | "late"
}

export interface UserAttendanceStats {
  userId: string
  totalEvents: number
  attended: number
  missed: number
  late: number
  attendanceRate: number
  missedConsecutively: number
  isBlacklisted: boolean
  blacklistReason?: string
  blacklistedUntil?: string
  warnings: number
}

export interface CheckInMethod {
  type: "qr" | "name" | "id"
  value: string
}

export interface SportsAnalytics {
  popularSports: {
    sport: Sport
    count: number
    percentage: number
  }[]
  participationByMonth: {
    month: string
    count: number
  }[]
  topEvents: {
    id: string
    title: string
    sport: Sport
    attendance: number
    capacity: number
    percentage: number
  }[]
  userParticipation: {
    userId: string
    userName: string
    avatar?: string
    eventsRegistered: number
    eventsAttended: number
    attendanceRate: number
  }[]
  attendanceRate: number
  teamParticipation: {
    teamId: string
    teamName: string
    sport: Sport
    eventsParticipated: number
  }[]
}
