"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  UserPlus, 
  Crown, 
  Trophy, 
  Target, 
  Calendar, 
  MapPin, 
  Star,
  Edit,
  Trash2,
  Settings,
  MessageSquare,
  BarChart3,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react"

interface TeamMember {
  id: string
  name: string
  avatar: string
  role: "captain" | "vice-captain" | "member"
  position: string
  skillLevel: "beginner" | "intermediate" | "advanced"
  joinedDate: string
  eventsAttended: number
  availability: string[]
  email: string
  phone: string
  achievements: string[]
}

interface Team {
  id: string
  name: string
  sport: string
  logo: string
  description: string
  captain: TeamMember
  members: TeamMember[]
  maxMembers: number
  achievements: string[]
  upcomingEvents: string[]
  stats: {
    totalEvents: number
    wins: number
    losses: number
    winRate: number
    totalPoints: number
  }
  createdAt: string
  location: string
  practiceSchedule: string[]
  teamColor: string
}

export function TeamManagement() {
  const [activeTab, setActiveTab] = useState("my-teams")
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSport, setFilterSport] = useState("all")

  // Enhanced mock data with better variety and realistic information
  const myTeams: Team[] = [
    {
      id: "team1",
      name: "Startup Strikers",
      sport: "Soccer",
      logo: "⚽",
      description: "A competitive soccer team for startup founders and entrepreneurs. We focus on building teamwork, leadership skills, and networking through sports.",
      captain: {
        id: "user1",
        name: "Alex Wong",
        avatar: "👨‍💼",
        role: "captain",
        position: "Forward",
        skillLevel: "advanced",
        joinedDate: "2024-01-15",
        eventsAttended: 12,
        availability: ["Monday", "Wednesday", "Saturday"],
        email: "alex.wong@startup.com",
        phone: "+65 9123 4567",
        achievements: ["Top Scorer 2024", "Team Captain", "Leadership Award"]
      },
      members: [
        {
          id: "user2",
          name: "Sarah Chen",
          avatar: "👩‍💼",
          role: "vice-captain",
          position: "Midfielder",
          skillLevel: "advanced",
          joinedDate: "2024-01-20",
          eventsAttended: 10,
          availability: ["Tuesday", "Thursday", "Saturday"],
          email: "sarah.chen@startup.com",
          phone: "+65 9123 4568",
          achievements: ["Best Midfielder", "Most Improved Player"]
        },
        {
          id: "user3",
          name: "David Kumar",
          avatar: "👨‍💼",
          role: "member",
          position: "Defender",
          skillLevel: "intermediate",
          joinedDate: "2024-02-01",
          eventsAttended: 8,
          availability: ["Monday", "Friday", "Sunday"],
          email: "david.kumar@startup.com",
          phone: "+65 9123 4569",
          achievements: ["Defensive Player of the Month"]
        }
      ],
      maxMembers: 22,
      achievements: ["League Champions 2024", "Fair Play Award", "Community Service Award"],
      upcomingEvents: ["Friendly Match vs Tech Titans", "League Game vs Innovation United", "Training Camp"],
      stats: {
        totalEvents: 24,
        wins: 18,
        losses: 4,
        winRate: 75,
        totalPoints: 1250
      },
      createdAt: "2024-01-15",
      location: "Singapore Sports Hub",
      practiceSchedule: ["Monday 7-9 PM", "Wednesday 7-9 PM", "Saturday 9-11 AM"],
      teamColor: "blue"
    },
    {
      id: "team2",
      name: "Tech Titans Basketball",
      sport: "Basketball",
      logo: "🏀",
      description: "High-energy basketball team for tech professionals. We emphasize speed, agility, and strategic thinking both on and off the court.",
      captain: {
        id: "user4",
        name: "Mei Lin",
        avatar: "👩‍💼",
        role: "captain",
        position: "Point Guard",
        skillLevel: "advanced",
        joinedDate: "2024-01-10",
        eventsAttended: 15,
        availability: ["Tuesday", "Thursday", "Saturday"],
        email: "mei.lin@tech.com",
        phone: "+65 9123 4570",
        achievements: ["MVP 2024", "Best Point Guard", "Team Leader Award"]
      },
      members: [
        {
          id: "user5",
          name: "Samantha Tan",
          avatar: "👩‍💼",
          role: "vice-captain",
          position: "Shooting Guard",
          skillLevel: "advanced",
          joinedDate: "2024-01-12",
          eventsAttended: 14,
          availability: ["Monday", "Wednesday", "Friday"],
          email: "samantha.tan@tech.com",
          phone: "+65 9123 4571",
          achievements: ["Top Scorer", "Best Shooter"]
        }
      ],
      maxMembers: 15,
      achievements: ["Tournament Winners", "Sportsmanship Award", "Most Improved Team"],
      upcomingEvents: ["Basketball Tournament", "Skills Workshop", "Team Building"],
      stats: {
        totalEvents: 20,
        wins: 15,
        losses: 3,
        winRate: 83,
        totalPoints: 980
      },
      createdAt: "2024-01-10",
      location: "Bishan Sports Hall",
      practiceSchedule: ["Tuesday 8-10 PM", "Thursday 8-10 PM", "Saturday 2-4 PM"],
      teamColor: "orange"
    }
  ]

  const availableTeams: Team[] = [
    {
      id: "team3",
      name: "Innovation United",
      sport: "Soccer",
      logo: "⚽",
      description: "New team looking for passionate players. Great opportunity for networking and skill development.",
      captain: {
        id: "user6",
        name: "James Lee",
        avatar: "👨‍💼",
        role: "captain",
        position: "Midfielder",
        skillLevel: "intermediate",
        joinedDate: "2024-03-01",
        eventsAttended: 5,
        availability: ["Tuesday", "Thursday", "Sunday"],
        email: "james.lee@innovation.com",
        phone: "+65 9123 4572",
        achievements: ["Team Founder", "Community Builder"]
      },
      members: [
        {
          id: "user7",
          name: "Emma Wilson",
          avatar: "👩‍💼",
          role: "member",
          position: "Forward",
          skillLevel: "beginner",
          joinedDate: "2024-03-05",
          eventsAttended: 3,
          availability: ["Monday", "Wednesday", "Saturday"],
          email: "emma.wilson@innovation.com",
          phone: "+65 9123 4573",
          achievements: ["Newcomer Award"]
        }
      ],
      maxMembers: 20,
      achievements: ["New Team Award"],
      upcomingEvents: ["Recruitment Drive", "First Practice", "Team Meeting"],
      stats: {
        totalEvents: 5,
        wins: 2,
        losses: 2,
        winRate: 50,
        totalPoints: 150
      },
      createdAt: "2024-03-01",
      location: "Kallang Practice Field",
      practiceSchedule: ["Tuesday 6-8 PM", "Thursday 6-8 PM", "Sunday 10-12 AM"],
      teamColor: "green"
    },
    {
      id: "team4",
      name: "Startup Sprinters",
      sport: "Running",
      logo: "🏃‍♂️",
      description: "Running club for startup founders. We organize regular runs, marathons, and fitness challenges.",
      captain: {
        id: "user8",
        name: "Rachel Kim",
        avatar: "👩‍💼",
        role: "captain",
        position: "Pacer",
        skillLevel: "advanced",
        joinedDate: "2024-02-15",
        eventsAttended: 20,
        availability: ["Monday", "Wednesday", "Friday", "Sunday"],
        email: "rachel.kim@startup.com",
        phone: "+65 9123 4574",
        achievements: ["Marathon Finisher", "Pace Leader", "Motivation Award"]
      },
      members: [
        {
          id: "user9",
          name: "Tom Anderson",
          avatar: "👨‍💼",
          role: "member",
          position: "Runner",
          skillLevel: "intermediate",
          joinedDate: "2024-02-20",
          eventsAttended: 12,
          availability: ["Tuesday", "Thursday", "Saturday"],
          email: "tom.anderson@startup.com",
          phone: "+65 9123 4575",
          achievements: ["Most Improved Runner", "Consistency Award"]
        }
      ],
      maxMembers: 50,
      achievements: ["Marathon Team Award", "Community Fitness Award", "Endurance Challenge Winners"],
      upcomingEvents: ["Marina Bay Run", "Training Program", "Fitness Challenge"],
      stats: {
        totalEvents: 30,
        wins: 25,
        losses: 2,
        winRate: 93,
        totalPoints: 2100
      },
      createdAt: "2024-02-15",
      location: "Marina Bay",
      practiceSchedule: ["Monday 6-7 AM", "Wednesday 6-7 AM", "Friday 6-7 AM", "Sunday 7-9 AM"],
      teamColor: "purple"
    }
  ]

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "advanced": return "bg-green-100 text-green-800 border-green-200"
      case "intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "beginner": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "captain": return <Crown className="h-4 w-4 text-yellow-600" />
      case "vice-captain": return <Star className="h-4 w-4 text-blue-600" />
      default: return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredAvailableTeams = availableTeams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = filterSport === "all" || team.sport.toLowerCase() === filterSport.toLowerCase()
    return matchesSearch && matchesSport
  })

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600 mt-2">Manage your teams, join new ones, and build your sports network</p>
        </div>
        <Button 
          onClick={() => setShowCreateTeam(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Team
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search teams by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterSport} onValueChange={setFilterSport}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="soccer">Soccer</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
            <SelectItem value="swimming">Swimming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("my-teams")}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "my-teams"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Users className="h-4 w-4 mr-2 inline" />
          My Teams ({myTeams.length})
        </button>
        <button
          onClick={() => setActiveTab("available")}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "available"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <UserPlus className="h-4 w-4 mr-2 inline" />
          Available Teams ({filteredAvailableTeams.length})
        </button>
        <button
          onClick={() => setActiveTab("requests")}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "requests"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <MessageSquare className="h-4 w-4 mr-2 inline" />
          Join Requests (2)
        </button>
      </div>

      {/* Content */}
      {activeTab === "my-teams" && (
        <div className="space-y-6">
          {myTeams.map((team) => (
            <Card key={team.id} className="border-2 border-gray-100 hover:border-blue-200 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{team.logo}</div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{team.name}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">
                        {team.sport} • {team.location}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {team.members.length}/{team.maxMembers} Members
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {team.stats.winRate}% Win Rate
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Team Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{team.stats.totalEvents}</div>
                    <div className="text-sm text-blue-600">Total Events</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{team.stats.wins}</div>
                    <div className="text-sm text-green-600">Wins</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{team.stats.totalPoints}</div>
                    <div className="text-sm text-purple-600">Points</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{team.achievements.length}</div>
                    <div className="text-sm text-orange-600">Achievements</div>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Team Members
                  </h4>
                  <div className="grid gap-3">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{member.avatar}</div>
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {member.name}
                              {getRoleIcon(member.role)}
                            </div>
                            <div className="text-sm text-gray-600">{member.position}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getSkillLevelColor(member.skillLevel)}>
                                {member.skillLevel}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                Joined {new Date(member.joinedDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{member.eventsAttended} events</div>
                          <div className="text-xs text-gray-500">{member.achievements.length} achievements</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Events */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Upcoming Events
                  </h4>
                  <div className="space-y-2">
                    {team.upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-blue-800">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practice Schedule */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Practice Schedule
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {team.practiceSchedule.map((schedule, index) => (
                      <div key={index} className="p-2 bg-green-50 rounded-lg text-center">
                        <span className="text-sm text-green-800 font-medium">{schedule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "available" && (
        <div className="space-y-6">
          {filteredAvailableTeams.map((team) => (
            <Card key={team.id} className="border-2 border-gray-100 hover:border-green-200 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{team.logo}</div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{team.name}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">
                        {team.sport} • {team.location}
                      </CardDescription>
                      <p className="text-gray-700 mt-2 max-w-2xl">{team.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {team.members.length}/{team.maxMembers} Members
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {team.stats.winRate}% Win Rate
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {team.stats.totalEvents} Events
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join Team
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{team.stats.totalEvents}</div>
                    <div className="text-sm text-blue-600">Events</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{team.stats.wins}</div>
                    <div className="text-sm text-green-600">Wins</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{team.stats.totalPoints}</div>
                    <div className="text-sm text-purple-600">Points</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{team.achievements.length}</div>
                    <div className="text-sm text-orange-600">Achievements</div>
                  </div>
                </div>

                {/* Practice Schedule */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Practice Schedule
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {team.practiceSchedule.map((schedule, index) => (
                      <div key={index} className="p-2 bg-green-50 rounded-lg text-center">
                        <span className="text-sm text-green-800 font-medium">{schedule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "requests" && (
        <div className="space-y-4">
          <Card className="border-2 border-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">👨‍💼</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Join Request: Startup Strikers</h4>
                  <p className="text-gray-600">Michael Chen wants to join your soccer team</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">Forward</Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Intermediate
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl">👩‍💼</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Join Request: Tech Titans Basketball</h4>
                  <p className="text-gray-600">Lisa Park wants to join your basketball team</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">Center</Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Beginner
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    Accept
                  </Button>
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Create Team Modal */}
      {showCreateTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Create New Team</CardTitle>
              <CardDescription>
                Start a new sports team and invite members to join
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input id="teamName" placeholder="Enter team name" />
                </div>
                <div>
                  <Label htmlFor="sport">Sport</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soccer">Soccer</SelectItem>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                      <SelectItem value="swimming">Swimming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Describe your team's goals and values" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Practice/meeting location" />
                </div>
                <div>
                  <Label htmlFor="maxMembers">Max Members</Label>
                  <Input id="maxMembers" type="number" placeholder="Maximum team size" />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setShowCreateTeam(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Create Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
