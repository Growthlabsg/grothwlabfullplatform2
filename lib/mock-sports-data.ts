import type {
  AttendanceRecord,
  ParticipationRecord,
  Sport,
  SportEvent,
  SportsAnalytics,
  Team,
  UserAttendanceStats,
  UserSportInterest,
} from "@/types/sports-club"

export const mockSportEvents: SportEvent[] = [
  {
    id: "event-1",
    title: "Saturday Soccer Showdown",
    description:
      "Join us for a friendly soccer match at Clarke Quay Central. All skill levels welcome! We'll form balanced teams on the spot.",
    sport: "soccer",
    location: "Clarke Quay Central Field",
    date: "2023-06-10",
    time: "10:00 AM",
    duration: "2 hours",
    capacity: 22,
    registered: 18,
    image: "/football-field.png",
    organizer: {
      id: "user-1",
      name: "David Chen",
      avatar: "/professional-chinese-man.png",
      role: "founder",
    },
    isRegistered: true,
    teamsAllowed: true,
    teamSize: 5,
    teams: [
      {
        id: "team-1",
        name: "Tech Titans",
        sport: "soccer",
        captain: {
          id: "user-1",
          name: "David Chen",
          avatar: "/professional-chinese-man.png",
        },
        members: [
          {
            id: "user-1",
            name: "David Chen",
            avatar: "/professional-chinese-man.png",
            position: "Forward",
          },
          {
            id: "user-4",
            name: "Lisa Zhang",
            avatar: "/diverse-woman-portrait.png",
            position: "Midfielder",
          },
          {
            id: "user-5",
            name: "James Lim",
            avatar: "/thoughtful-man.png",
            position: "Defender",
          },
        ],
        logo: "/double-t-typography.png",
        description: "A team of tech entrepreneurs who love soccer",
        createdAt: "2023-05-01",
      },
      {
        id: "team-2",
        name: "Startup Strikers",
        sport: "soccer",
        captain: {
          id: "user-2",
          name: "Sarah Tan",
          avatar: "/professional-chinese-woman-business-casual.png",
        },
        members: [
          {
            id: "user-2",
            name: "Sarah Tan",
            avatar: "/professional-chinese-woman-business-casual.png",
            position: "Striker",
          },
          {
            id: "user-3",
            name: "Michael Wong",
            avatar: "/team-member-2.png",
            position: "Goalkeeper",
          },
        ],
        logo: "/stylized-letter-ss.png",
        description: "Founders who kick goals on and off the field",
        createdAt: "2023-05-15",
      },
    ],
  },
  {
    id: "event-2",
    title: "Basketball Networking",
    description: "Network with fellow entrepreneurs while playing basketball. Great way to make connections!",
    sport: "basketball",
    location: "Kallang Community Center",
    date: "2023-06-15",
    time: "6:30 PM",
    duration: "1.5 hours",
    capacity: 15,
    registered: 10,
    image: "/outdoor-basketball-court.png",
    organizer: {
      id: "user-2",
      name: "Sarah Tan",
      avatar: "/professional-chinese-woman-business-casual.png",
      role: "investor",
    },
    teamsAllowed: false,
    audienceRoles: ["founder", "investor", "mentor"],
    rsvpType: "playing",
    networking: { enabled: true, time: "7:45 PM", theme: "Pitch & Play" },
  },
  {
    id: "event-3",
    title: "Tennis Tournament",
    description: "Semi-competitive tennis tournament for startup founders. Prizes sponsored by local businesses.",
    sport: "tennis",
    location: "Singapore Sports Hub",
    date: "2023-06-20",
    time: "9:00 AM",
    duration: "4 hours",
    capacity: 16,
    registered: 12,
    image: "/outdoor-tennis-court.png",
    organizer: {
      id: "user-3",
      name: "Michael Wong",
      avatar: "/team-member-2.png",
      role: "mentor",
    },
    teamsAllowed: false,
    audienceRoles: ["founder", "mentor"],
    rsvpType: "spectating",
    networking: { enabled: true, time: "1:00 PM", theme: "Doubles & Deals" },
  },
  {
    id: "event-4",
    title: "Morning Run Club",
    description: "Start your day with a refreshing run with fellow entrepreneurs. All paces welcome!",
    sport: "running",
    location: "East Coast Park",
    date: "2023-06-12",
    time: "7:00 AM",
    duration: "1 hour",
    capacity: 30,
    registered: 22,
    image: "/woman-runner.png",
    organizer: {
      id: "user-4",
      name: "Lisa Zhang",
      avatar: "/diverse-woman-portrait.png",
      role: "operator",
    },
    teamsAllowed: false,
    audienceRoles: ["founder", "investor", "mentor"],
    rsvpType: "playing",
  },
  {
    id: "event-5",
    title: "Volleyball at the Beach",
    description: "Casual beach volleyball games at Sentosa. Great for team building and networking.",
    sport: "volleyball",
    location: "Siloso Beach, Sentosa",
    date: "2023-06-18",
    time: "4:00 PM",
    duration: "3 hours",
    capacity: 24,
    registered: 16,
    image: "/beach-volleyball-game.png",
    organizer: {
      id: "user-5",
      name: "James Lim",
      avatar: "/thoughtful-man.png",
      role: "founder",
    },
    teamsAllowed: true,
    teamSize: 6,
    teams: [],
    audienceRoles: ["founder", "investor", "mentor"],
    rsvpType: "playing",
    networking: { enabled: true, time: "5:30 PM", theme: "Sunset Social" },
  },
  {
    id: "event-6",
    title: "Weekend Cycling Expedition",
    description: "Group cycling around Singapore. Great way to explore the city and build endurance.",
    sport: "cycling",
    location: "Meeting at Marina Barrage",
    date: "2023-06-17",
    time: "8:00 AM",
    duration: "3 hours",
    capacity: 20,
    registered: 14,
    image: "/cycling-group.png",
    organizer: {
      id: "user-6",
      name: "Thomas Goh",
      avatar: "/tech-professional.png",
      role: "investor",
    },
    teamsAllowed: false,
    audienceRoles: ["founder", "investor"],
    rsvpType: "spectating",
  },
]

export const mockUserSportInterests: UserSportInterest[] = [
  {
    sport: "soccer",
    level: "intermediate",
    frequency: "regular",
    notes: "Played in college, enjoy both casual and competitive matches",
    preferredPositions: ["Forward", "Midfielder"],
    achievements: ["College team player", "5-a-side league winner 2022"],
  },
  {
    sport: "basketball",
    level: "beginner",
    frequency: "casual",
    notes: "Learning the basics, enjoy playing for fun",
    preferredPositions: ["Guard"],
  },
  {
    sport: "running",
    level: "advanced",
    frequency: "competitive",
    notes: "Completed several half-marathons, training for full marathon",
    achievements: ["Half marathon PB: 1:45:30", "10K PB: 45:20"],
  },
]

export const mockParticipationHistory: ParticipationRecord[] = [
  {
    id: "participation-1",
    eventId: "past-event-1",
    eventTitle: "Founders Football Friday",
    sport: "soccer",
    date: "2023-05-12",
    status: "attended",
    checkInTime: "15:45",
    feedback: "Great organization and friendly atmosphere",
    rating: 5,
    team: "Tech Titans",
  },
  {
    id: "participation-2",
    eventId: "past-event-2",
    eventTitle: "Startup Tennis Tournament",
    sport: "tennis",
    date: "2023-05-20",
    status: "attended",
    checkInTime: "09:05",
    feedback: "Good competition level, would join again",
    rating: 4,
  },
  {
    id: "participation-3",
    eventId: "past-event-3",
    eventTitle: "Early Entrepreneur Cycling",
    sport: "cycling",
    date: "2023-05-27",
    status: "missed",
  },
  {
    id: "participation-4",
    eventId: "event-1",
    eventTitle: "Saturday Soccer Showdown",
    sport: "soccer",
    date: "2023-06-10",
    status: "upcoming",
    team: "Tech Titans",
  },
]

export const mockTeams: Team[] = [
  {
    id: "team-1",
    name: "Tech Titans",
    sport: "soccer",
    captain: {
      id: "user-1",
      name: "David Chen",
      avatar: "/professional-chinese-man.png",
    },
    members: [
      {
        id: "user-1",
        name: "David Chen",
        avatar: "/professional-chinese-man.png",
        position: "Forward",
      },
      {
        id: "user-4",
        name: "Lisa Zhang",
        avatar: "/diverse-woman-portrait.png",
        position: "Midfielder",
      },
      {
        id: "user-5",
        name: "James Lim",
        avatar: "/thoughtful-man.png",
        position: "Defender",
      },
    ],
    logo: "/double-t-typography.png",
    description: "A team of tech entrepreneurs who love soccer",
    achievements: ["2nd place in Startup League 2022"],
    createdAt: "2023-05-01",
    eventIds: ["event-1", "past-event-1"],
  },
  {
    id: "team-2",
    name: "Startup Strikers",
    sport: "soccer",
    captain: {
      id: "user-2",
      name: "Sarah Tan",
      avatar: "/professional-chinese-woman-business-casual.png",
    },
    members: [
      {
        id: "user-2",
        name: "Sarah Tan",
        avatar: "/professional-chinese-woman-business-casual.png",
        position: "Striker",
      },
      {
        id: "user-3",
        name: "Michael Wong",
        avatar: "/team-member-2.png",
        position: "Goalkeeper",
      },
    ],
    logo: "/stylized-letter-ss.png",
    description: "Founders who kick goals on and off the field",
    createdAt: "2023-05-15",
    eventIds: ["event-1"],
  },
  {
    id: "team-3",
    name: "Venture Volleyballers",
    sport: "volleyball",
    captain: {
      id: "user-5",
      name: "James Lim",
      avatar: "/thoughtful-man.png",
    },
    members: [
      {
        id: "user-5",
        name: "James Lim",
        avatar: "/thoughtful-man.png",
        position: "Setter",
      },
      {
        id: "user-6",
        name: "Thomas Goh",
        avatar: "/tech-professional.png",
        position: "Middle Blocker",
      },
    ],
    logo: "/placeholder-mxy9g.png",
    description: "Venture capitalists who love volleyball",
    createdAt: "2023-05-10",
    eventIds: [],
  },
]

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    userId: "user-1",
    userName: "David Chen",
    eventId: "past-event-1",
    eventTitle: "Founders Football Friday",
    checkInTime: "2023-05-12T15:45:00",
    status: "attended",
  },
  {
    userId: "user-1",
    userName: "David Chen",
    eventId: "past-event-2",
    eventTitle: "Startup Tennis Tournament",
    checkInTime: "2023-05-20T09:05:00",
    status: "attended",
  },
  {
    userId: "user-1",
    userName: "David Chen",
    eventId: "past-event-3",
    eventTitle: "Early Entrepreneur Cycling",
    checkInTime: "",
    status: "missed",
  },
]

export const mockUserAttendanceStats: UserAttendanceStats = {
  userId: "user-1",
  totalEvents: 3,
  attended: 2,
  missed: 1,
  late: 0,
  attendanceRate: 66.7,
  missedConsecutively: 1,
  isBlacklisted: false,
  warnings: 1,
}

export const mockSportsAnalytics: SportsAnalytics = {
  popularSports: [
    { sport: "soccer", count: 25, percentage: 30 },
    { sport: "basketball", count: 18, percentage: 22 },
    { sport: "tennis", count: 15, percentage: 18 },
    { sport: "running", count: 12, percentage: 14 },
    { sport: "volleyball", count: 8, percentage: 10 },
    { sport: "cycling", count: 5, percentage: 6 },
  ],
  participationByMonth: [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 15 },
    { month: "Mar", count: 18 },
    { month: "Apr", count: 22 },
    { month: "May", count: 28 },
    { month: "Jun", count: 24 },
  ],
  topEvents: [
    {
      id: "past-event-1",
      title: "Founders Football Friday",
      sport: "soccer",
      attendance: 20,
      capacity: 22,
      percentage: 91,
    },
    {
      id: "past-event-2",
      title: "Startup Tennis Tournament",
      sport: "tennis",
      attendance: 14,
      capacity: 16,
      percentage: 88,
    },
    {
      id: "past-event-3",
      title: "Early Entrepreneur Cycling",
      sport: "cycling",
      attendance: 15,
      capacity: 20,
      percentage: 75,
    },
  ],
  userParticipation: [
    {
      userId: "user-1",
      userName: "David Chen",
      avatar: "/professional-chinese-man.png",
      eventsRegistered: 6,
      eventsAttended: 5,
      attendanceRate: 83,
    },
    {
      userId: "user-2",
      userName: "Sarah Tan",
      avatar: "/professional-chinese-woman-business-casual.png",
      eventsRegistered: 4,
      eventsAttended: 4,
      attendanceRate: 100,
    },
    {
      userId: "user-3",
      userName: "Michael Wong",
      avatar: "/team-member-2.png",
      eventsRegistered: 8,
      eventsAttended: 6,
      attendanceRate: 75,
    },
  ],
  attendanceRate: 82.5,
  teamParticipation: [
    { teamId: "team-1", teamName: "Tech Titans", sport: "soccer", eventsParticipated: 3 },
    { teamId: "team-2", teamName: "Startup Strikers", sport: "soccer", eventsParticipated: 2 },
    { teamId: "team-3", teamName: "Venture Volleyballers", sport: "volleyball", eventsParticipated: 1 },
  ],
}

export const availableSports: Sport[] = [
  "soccer",
  "basketball",
  "tennis",
  "badminton",
  "volleyball",
  "running",
  "cycling",
  "swimming",
  "golf",
  "table-tennis",
  "cricket",
  "rugby",
  "hockey",
  "baseball",
  "frisbee",
]

export const sportLevelDescriptions = {
  beginner: "Just starting out or have minimal experience",
  intermediate: "Have played regularly and understand the game well",
  advanced: "Highly skilled with extensive experience",
}

export const sportFrequencyDescriptions = {
  casual: "Occasionally, for fun",
  regular: "Consistently, as part of routine",
  competitive: "Regularly participate in competitions",
}

export function getSportEmoji(sport: Sport): string {
  const emojiMap: Record<Sport, string> = {
    soccer: "⚽",
    basketball: "🏀",
    tennis: "🎾",
    badminton: "🏸",
    volleyball: "🏐",
    running: "🏃",
    cycling: "🚴",
    swimming: "🏊",
    golf: "⛳",
    "table-tennis": "🏓",
    cricket: "🏏",
    rugby: "🏉",
    hockey: "🏑",
    baseball: "⚾",
    frisbee: "🥏",
  }

  return emojiMap[sport] || "🏆"
}

// Blacklist rules
export const ATTENDANCE_RULES = {
  MISSED_THRESHOLD: 3, // Number of missed events before blacklisting
  BLACKLIST_DURATION_DAYS: 30, // Days a user is blacklisted
  WARNING_THRESHOLD: 2, // Number of misses before warning
  LATE_COUNTS_AS_FRACTION_MISSED: 0.5, // How much a late check-in counts towards a miss
  CONSECUTIVE_MISSES_MULTIPLIER: 1.5, // Penalty multiplier for consecutive misses
  GRACE_PERIOD_MINUTES: 15, // Minutes after event start time considered on-time
  RESET_GOOD_BEHAVIOR_EVENTS: 5, // Number of consecutive attended events to reset warnings
}

// Function to check if a user is blacklisted
export function isUserBlacklisted(userId: string): boolean {
  // In a real app, this would check against a database
  return mockUserAttendanceStats.isBlacklisted
}

// Function to get user attendance warnings
export function getUserWarnings(userId: string): number {
  // In a real app, this would check against a database
  return mockUserAttendanceStats.warnings
}

// Function to check in a user for an event
export function checkInUser(userId: string, eventId: string, method: "qr" | "name"): AttendanceRecord | null {
  // In a real app, this would update a database
  const now = new Date()
  const event = mockSportEvents.find((e) => e.id === eventId)

  if (!event) return null

  // Check if event date is today
  const eventDate = new Date(event.date)
  const isToday = eventDate.toDateString() === now.toDateString()

  if (!isToday) return null

  // Check if event time is within range
  const [hours, minutes] = event.time.split(":").map((part) => {
    if (part.includes("AM")) {
      return Number.parseInt(part.replace("AM", "").trim())
    } else if (part.includes("PM")) {
      return Number.parseInt(part.replace("PM", "").trim()) + 12
    }
    return Number.parseInt(part.trim())
  })

  const eventTime = new Date()
  eventTime.setHours(hours, minutes, 0, 0)

  // Determine if user is late
  const lateThreshold = new Date(eventTime.getTime() + ATTENDANCE_RULES.GRACE_PERIOD_MINUTES * 60000)
  const isLate = now > lateThreshold

  const record: AttendanceRecord = {
    userId,
    userName: "Current User", // In a real app, get from user profile
    eventId,
    eventTitle: event.title,
    checkInTime: now.toISOString(),
    status: isLate ? "late" : "attended",
  }

  return record
}
