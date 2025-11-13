import type { Sport, SportEvent, Team, UserAttendanceStats } from "@/types/sports-club"

// Mock sport events data
export const mockSportEvents: SportEvent[] = [
  {
    id: "event1",
    title: "Founder's Football Match",
    description: "A friendly football match for startup founders to network and have fun",
    sport: "soccer",
    location: "Singapore Sports Hub, 1 Stadium Drive",
    date: "2025-05-25",
    time: "6:00 PM",
    duration: "2 hours",
    capacity: 22,
    registered: 16,
    image: "/soccer-field.png",
    organizer: {
      id: "user1",
      name: "Alex Wong",
      avatar: "/portrait-alex.png",
    },
    isRegistered: false,
  },
  {
    id: "event2",
    title: "Startup Basketball Tournament",
    description: "Compete with other startup teams in this exciting basketball tournament",
    sport: "basketball",
    location: "OCBC Arena, Singapore Sports Hub",
    date: "2025-06-10",
    time: "2:00 PM",
    duration: "4 hours",
    capacity: 30,
    registered: 28,
    image: "/outdoor-basketball-court.png",
    organizer: {
      id: "user2",
      name: "Sarah Chen",
      avatar: "/portrait-of-sarah.png",
    },
    isRegistered: true,
    teamsAllowed: true,
    teamSize: 5,
  },
  {
    id: "event3",
    title: "Tennis Networking Session",
    description: "Network with other entrepreneurs while playing tennis",
    sport: "tennis",
    location: "Kallang Tennis Centre",
    date: "2025-06-05",
    time: "9:00 AM",
    duration: "3 hours",
    capacity: 16,
    registered: 10,
    image: "/outdoor-tennis-court.png",
    organizer: {
      id: "user3",
      name: "David Kumar",
      avatar: "/professional-chinese-man.png",
    },
    isRegistered: false,
  },
  {
    id: "event4",
    title: "Founder's Run Club",
    description: "Weekly running session for entrepreneurs to stay fit and network",
    sport: "running",
    location: "East Coast Park",
    date: "2025-05-28",
    time: "7:00 AM",
    duration: "1 hour",
    capacity: 20,
    registered: 12,
    image: "/woman-runner.png",
    organizer: {
      id: "user4",
      name: "Mei Lin",
      avatar: "/professional-chinese-woman-business-casual.png",
    },
    isRegistered: false,
  },
  {
    id: "event5",
    title: "Beach Volleyball Networking",
    description: "Play volleyball at the beach with fellow entrepreneurs",
    sport: "volleyball",
    location: "Siloso Beach, Sentosa",
    date: "2025-06-15",
    time: "4:00 PM",
    duration: "3 hours",
    capacity: 24,
    registered: 20,
    image: "/beach-volleyball-game.png",
    organizer: {
      id: "user5",
      name: "Samantha Tan",
      avatar: "/portrait-of-sarah.png",
    },
    isRegistered: true,
    teamsAllowed: true,
    teamSize: 6,
  },
  {
    id: "event6",
    title: "Entrepreneur Cycling Tour",
    description: "Join other founders for a scenic cycling tour of Singapore",
    sport: "cycling",
    location: "Starting at Marina Bay Sands",
    date: "2025-06-20",
    time: "8:00 AM",
    duration: "4 hours",
    capacity: 15,
    registered: 8,
    image: "/cycling-group.png",
    organizer: {
      id: "user6",
      name: "Ryan Zhang",
      avatar: "/portrait-alex.png",
    },
    isRegistered: false,
  },
]

// Mock teams data
export const mockTeams: Team[] = [
  {
    id: "team1",
    name: "Tech Titans",
    sport: "basketball",
    captain: {
      id: "user1",
      name: "Alex Wong",
      avatar: "/portrait-alex.png",
    },
    members: [
      {
        id: "user1",
        name: "Alex Wong",
        avatar: "/portrait-alex.png",
        position: "Point Guard",
      },
      {
        id: "user7",
        name: "Michael Lee",
        avatar: "/portrait-alex.png",
        position: "Shooting Guard",
      },
      {
        id: "user8",
        name: "Jason Tan",
        avatar: "/portrait-alex.png",
        position: "Center",
      },
      {
        id: "user9",
        name: "Kevin Lim",
        avatar: "/portrait-alex.png",
        position: "Power Forward",
      },
      {
        id: "user10",
        name: "Andrew Ng",
        avatar: "/portrait-alex.png",
        position: "Small Forward",
      },
    ],
    logo: "/abstract-aj.png",
    description: "A team of tech founders passionate about basketball",
    achievements: ["2024 Startup League Champions"],
    createdAt: "2024-01-15",
  },
  {
    id: "team2",
    name: "VC Volleyers",
    sport: "volleyball",
    captain: {
      id: "user2",
      name: "Sarah Chen",
      avatar: "/portrait-of-sarah.png",
    },
    members: [
      {
        id: "user2",
        name: "Sarah Chen",
        avatar: "/portrait-of-sarah.png",
        position: "Setter",
      },
      {
        id: "user4",
        name: "Mei Lin",
        avatar: "/professional-chinese-woman-business-casual.png",
        position: "Outside Hitter",
      },
      {
        id: "user11",
        name: "Jessica Wong",
        avatar: "/portrait-of-sarah.png",
        position: "Middle Blocker",
      },
      {
        id: "user12",
        name: "Sophia Tan",
        avatar: "/portrait-of-sarah.png",
        position: "Libero",
      },
      {
        id: "user13",
        name: "Emily Lim",
        avatar: "/portrait-of-sarah.png",
        position: "Outside Hitter",
      },
      {
        id: "user14",
        name: "Olivia Ng",
        avatar: "/portrait-of-sarah.png",
        position: "Middle Blocker",
      },
    ],
    logo: "/abstract-sgi.png",
    description: "Venture capitalists who love volleyball",
    achievements: ["2nd place in Founders Cup 2024"],
    createdAt: "2024-02-20",
  },
  {
    id: "team3",
    name: "Startup Strikers",
    sport: "soccer",
    captain: {
      id: "user3",
      name: "David Kumar",
      avatar: "/professional-chinese-man.png",
    },
    members: [
      {
        id: "user3",
        name: "David Kumar",
        avatar: "/professional-chinese-man.png",
        position: "Forward",
      },
      {
        id: "user1",
        name: "Alex Wong",
        avatar: "/portrait-alex.png",
        position: "Goalkeeper",
      },
      {
        id: "user15",
        name: "Daniel Lee",
        avatar: "/portrait-alex.png",
        position: "Defender",
      },
      {
        id: "user16",
        name: "Matthew Tan",
        avatar: "/portrait-alex.png",
        position: "Midfielder",
      },
      {
        id: "user17",
        name: "Christopher Lim",
        avatar: "/portrait-alex.png",
        position: "Defender",
      },
      {
        id: "user18",
        name: "John Ng",
        avatar: "/portrait-alex.png",
        position: "Midfielder",
      },
      {
        id: "user19",
        name: "Richard Goh",
        avatar: "/portrait-alex.png",
        position: "Forward",
      },
    ],
    logo: "/abstract-geometric-shapes.png",
    description: "A team of startup founders with a passion for soccer",
    createdAt: "2024-03-10",
  },
]

// Mock user attendance stats
const mockUserAttendanceStats: Record<string, UserAttendanceStats> = {
  "user-1": {
    userId: "user-1",
    totalEvents: 10,
    attended: 8,
    missed: 2,
    late: 0,
    attendanceRate: 80,
    missedConsecutively: 0,
    isBlacklisted: false,
    warnings: 0,
  },
  "user-2": {
    userId: "user-2",
    totalEvents: 5,
    attended: 2,
    missed: 3,
    late: 0,
    attendanceRate: 40,
    missedConsecutively: 3,
    isBlacklisted: true,
    blacklistReason: "Missed 3 consecutive events without notification",
    blacklistedUntil: "2025-07-01",
    warnings: 2,
  },
}

// Helper functions
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

export function isUserBlacklisted(userId: string): boolean {
  return mockUserAttendanceStats[userId]?.isBlacklisted || false
}

export function getBlacklistReason(userId: string): string | undefined {
  return mockUserAttendanceStats[userId]?.blacklistReason
}

export function getBlacklistedUntil(userId: string): string | undefined {
  return mockUserAttendanceStats[userId]?.blacklistedUntil
}

// Function to get recommended events based on user interests
export function getRecommendedEvents(): SportEvent[] {
  // In a real app, this would filter based on user preferences
  // Here we'll just return future events sorted by date
  const today = new Date()
  return mockSportEvents
    .filter((event) => new Date(event.date) > today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3)
}

// Function to get user participation stats
export function getUserParticipationStats() {
  return {
    total: 8,
    upcoming: 2,
    attended: 5,
    missed: 1,
    rate: "87%",
  }
}

// Function to get upcoming events for a user
export function getUserUpcomingEvents(userId: string): SportEvent[] {
  // In a real app, this would filter based on the user's registrations
  return mockSportEvents
    .filter((event) => event.isRegistered)
    .filter((event) => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
}
