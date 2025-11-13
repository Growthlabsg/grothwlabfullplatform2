"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Trophy, Calendar, Users, Target, Award, BarChart3, Play, Clock,
  MapPin, Star, TrendingUp, Zap, CheckCircle, XCircle, Minus, UserPlus,
  Search, Filter, MoreHorizontal, Medal, Flag, Timer, Users2, Info
} from "lucide-react"

interface Tournament {
  id: string
  name: string
  sport: string
  type: "single-elimination" | "double-elimination" | "round-robin" | "league"
  status: "upcoming" | "registration" | "active" | "completed"
  startDate: string
  endDate: string
  location: string
  maxTeams: number
  currentTeams: number
  entryFee: number
  prizePool: number
  description: string
  rules: string[]
  schedule: {
    round: string
    date: string
    time: string
    teams: string[]
    venue: string
  }[]
  teams: TournamentTeam[]
  organizer: string
  contactEmail: string
  contactPhone: string
  registrationDeadline: string
  category: "beginner" | "intermediate" | "advanced" | "open"
}

interface TournamentTeam {
  id: string
  name: string
  logo: string
  captain: string
  members: number
  wins: number
  losses: number
  points: number
  status: "registered" | "confirmed" | "eliminated" | "winner"
}

interface TournamentBracket {
  round: string
  matches: TournamentMatch[]
}

interface TournamentMatch {
  id: string
  team1: string
  team2: string
  score1?: number
  score2?: number
  winner?: string
  status: "scheduled" | "in-progress" | "completed"
  date: string
  time: string
  venue: string
}

export function TournamentManagement() {
  const [activeTab, setActiveTab] = useState("available")
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSport, setFilterSport] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Enhanced mock data with realistic tournament information
  const tournaments: Tournament[] = [
    {
      id: "t1",
      name: "Startup Cup 2024",
      sport: "Soccer",
      type: "single-elimination",
      status: "registration",
      startDate: "2024-06-15",
      endDate: "2024-06-30",
      location: "Singapore Sports Hub",
      maxTeams: 16,
      currentTeams: 12,
      entryFee: 200,
      prizePool: 5000,
      description: "The premier soccer tournament for startup founders and entrepreneurs. Network, compete, and showcase your team's skills in this exciting single-elimination tournament.",
      rules: [
        "11 players per team (7 on field, 4 substitutes)",
        "25-minute halves with 5-minute break",
        "FIFA rules apply with startup-friendly modifications",
        "Fair play and sportsmanship required"
      ],
      schedule: [
        {
          round: "Group Stage",
          date: "2024-06-15",
          time: "9:00 AM",
          teams: ["Group A: 4 teams", "Group B: 4 teams"],
          venue: "Field 1 & 2"
        },
        {
          round: "Quarter Finals",
          date: "2024-06-22",
          time: "2:00 PM",
          teams: ["8 teams"],
          venue: "Main Field"
        },
        {
          round: "Semi Finals",
          date: "2024-06-28",
          time: "3:00 PM",
          teams: ["4 teams"],
          venue: "Main Field"
        },
        {
          round: "Finals",
          date: "2024-06-30",
          time: "4:00 PM",
          teams: ["2 teams"],
          venue: "Main Field"
        }
      ],
      teams: [
        { id: "team1", name: "Startup Strikers", logo: "⚽", captain: "Alex Wong", members: 18, wins: 0, losses: 0, points: 0, status: "registered" },
        { id: "team2", name: "Tech Titans", logo: "⚽", captain: "Sarah Chen", members: 16, wins: 0, losses: 0, points: 0, status: "registered" },
        { id: "team3", name: "Innovation United", logo: "⚽", captain: "David Kumar", members: 20, wins: 0, losses: 0, points: 0, status: "registered" }
      ],
      organizer: "GrowthLab Sports Club",
      contactEmail: "tournaments@growthlab.sg",
      contactPhone: "+65 6789 0123",
      registrationDeadline: "2024-06-10",
      category: "intermediate"
    },
    {
      id: "t2",
      name: "Basketball Innovation League",
      sport: "Basketball",
      type: "league",
      status: "active",
      startDate: "2024-05-01",
      endDate: "2024-07-31",
      location: "Bishan Sports Hall",
      maxTeams: 8,
      currentTeams: 8,
      entryFee: 150,
      prizePool: 3000,
      description: "A competitive league format basketball tournament running over 3 months. Teams play each other twice for a total of 14 games per team.",
      rules: [
        "5 players per team (3 substitutes allowed)",
        "4 quarters of 10 minutes each",
        "FIBA rules apply",
        "Top 4 teams advance to playoffs"
      ],
      schedule: [
        {
          round: "Week 1-8",
          date: "2024-05-01 to 2024-06-26",
          time: "7:00 PM - 10:00 PM",
          teams: ["All 8 teams"],
          venue: "Bishan Sports Hall"
        },
        {
          round: "Playoffs",
          date: "2024-07-01 to 2024-07-31",
          time: "7:00 PM - 10:00 PM",
          teams: ["Top 4 teams"],
          venue: "Bishan Sports Hall"
        }
      ],
      teams: [
        { id: "team4", name: "Tech Titans", logo: "🏀", captain: "Mei Lin", members: 12, wins: 8, losses: 2, points: 16, status: "confirmed" },
        { id: "team5", name: "Startup Sprinters", logo: "🏀", captain: "James Lee", members: 10, wins: 6, losses: 4, points: 12, status: "confirmed" },
        { id: "team6", name: "Innovation Hoops", logo: "🏀", captain: "Emma Wilson", members: 11, wins: 5, losses: 5, points: 10, status: "confirmed" }
      ],
      organizer: "Bishan Sports Club",
      contactEmail: "basketball@bishansports.sg",
      contactPhone: "+65 6789 0124",
      registrationDeadline: "2024-04-25",
      category: "advanced"
    },
    {
      id: "t3",
      name: "Founder's Fitness Challenge",
      sport: "Multi-Sport",
      type: "round-robin",
      status: "upcoming",
      startDate: "2024-08-01",
      endDate: "2024-08-15",
      location: "Various Venues",
      maxTeams: 20,
      currentTeams: 0,
      entryFee: 100,
      prizePool: 2000,
      description: "A unique multi-sport challenge combining running, swimming, and cycling. Teams compete in different disciplines over 2 weeks.",
      rules: [
        "4 members per team",
        "Each member must participate in at least one discipline",
        "Combined time determines winner",
        "Safety equipment mandatory"
      ],
      schedule: [
        {
          round: "Running Challenge",
          date: "2024-08-01",
          time: "7:00 AM",
          teams: ["All teams"],
          venue: "Marina Bay"
        },
        {
          round: "Swimming Challenge",
          date: "2024-08-08",
          time: "9:00 AM",
          teams: ["All teams"],
          venue: "Singapore Sports Hub Pool"
        },
        {
          round: "Cycling Challenge",
          date: "2024-08-15",
          time: "6:00 AM",
          teams: ["All teams"],
          venue: "East Coast Park"
        }
      ],
      teams: [],
      organizer: "Fitness First Singapore",
      contactEmail: "challenge@fitnessfirst.sg",
      contactPhone: "+65 6789 0125",
      registrationDeadline: "2024-07-25",
      category: "open"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800 border-blue-200"
      case "registration": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "active": return "bg-green-100 text-green-800 border-green-200"
      case "completed": return "bg-gray-100 text-gray-800 border-gray-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "single-elimination": return <Trophy className="h-4 w-4 text-yellow-600" />
      case "double-elimination": return <Award className="h-4 w-4 text-purple-600" />
      case "round-robin": return <BarChart3 className="h-4 w-4 text-blue-600" />
      case "league": return <Users2 className="h-4 w-4 text-green-600" />
      default: return <Trophy className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginner": return "bg-green-100 text-green-800 border-green-200"
      case "intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "advanced": return "bg-red-100 text-red-800 border-red-200"
      case "open": return "bg-purple-100 text-purple-800 border-purple-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = filterSport === "all" || tournament.sport.toLowerCase() === filterSport.toLowerCase()
    const matchesStatus = filterStatus === "all" || tournament.status === filterStatus
    return matchesSearch && matchesSport && matchesStatus
  })

  const myTournaments = tournaments.filter(t => 
    t.teams.some(team => team.status === "registered" || team.status === "confirmed")
  )

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tournaments</h2>
          <p className="text-gray-600 mt-2">Compete in tournaments, track your progress, and win prizes</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Trophy className="h-4 w-4 mr-2" />
          Create Tournament
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tournaments by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterSport} onValueChange={setFilterSport}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="soccer">Soccer</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="multi-sport">Multi-Sport</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="registration">Registration</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("available")}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "available"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Trophy className="h-4 w-4 mr-2 inline" />
          Available ({filteredTournaments.length})
        </button>
        <button
          onClick={() => setActiveTab("my-tournaments")}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "my-tournaments"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Users className="h-4 w-4 mr-2 inline" />
          My Tournaments ({myTournaments.length})
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === "results"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <BarChart3 className="h-4 w-4 mr-2 inline" />
          Results & History
        </button>
      </div>

      {/* Content */}
      {activeTab === "available" && (
        <div className="space-y-6">
          {filteredTournaments.map((tournament) => (
            <Card key={tournament.id} className="border-2 border-gray-100 hover:border-blue-200 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{tournament.sport === "Soccer" ? "⚽" : tournament.sport === "Basketball" ? "🏀" : "🏃‍♂️"}</div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{tournament.name}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">
                        {tournament.sport} • {tournament.location}
                      </CardDescription>
                      <p className="text-gray-700 mt-2 max-w-3xl">{tournament.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className={getStatusColor(tournament.status)}>
                          {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {getTypeIcon(tournament.type)}
                          {tournament.type.replace("-", " ")}
                        </Badge>
                        <Badge className={getCategoryColor(tournament.category)}>
                          {tournament.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">${tournament.prizePool}</div>
                    <div className="text-sm text-gray-600">Prize Pool</div>
                    <div className="text-lg font-semibold text-blue-600 mt-2">${tournament.entryFee}</div>
                    <div className="text-sm text-gray-600">Entry Fee</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tournament Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{tournament.currentTeams}/{tournament.maxTeams}</div>
                    <div className="text-sm text-blue-600">Teams</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{tournament.startDate}</div>
                    <div className="text-sm text-green-600">Start Date</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{tournament.endDate}</div>
                    <div className="text-sm text-purple-600">End Date</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{tournament.registrationDeadline}</div>
                    <div className="text-sm text-orange-600">Registration Deadline</div>
                  </div>
                </div>

                {/* Schedule Preview */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Tournament Schedule
                  </h4>
                  <div className="grid gap-2">
                    {tournament.schedule.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">{item.round}</span>
                        <span className="text-sm text-gray-600">{item.date}</span>
                        <span className="text-sm text-gray-600">{item.time}</span>
                        <span className="text-sm text-gray-600">{item.venue}</span>
                      </div>
                    ))}
                    {tournament.schedule.length > 3 && (
                      <div className="text-center text-sm text-gray-500">
                        +{tournament.schedule.length - 3} more rounds
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {tournament.status === "registration" && (
                    <Button className="bg-green-600 hover:bg-green-700 flex-1">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Register Team
                    </Button>
                  )}
                  {tournament.status === "upcoming" && (
                    <Button variant="outline" className="flex-1">
                      <Clock className="h-4 w-4 mr-2" />
                      Get Notified
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    <Info className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "my-tournaments" && (
        <div className="space-y-6">
          {myTournaments.map((tournament) => (
            <Card key={tournament.id} className="border-2 border-green-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{tournament.sport === "Soccer" ? "⚽" : tournament.sport === "Basketball" ? "🏀" : "🏃‍♂️"}</div>
                    <div>
                      <CardTitle className="text-2xl text-gray-900">{tournament.name}</CardTitle>
                      <CardDescription className="text-lg text-gray-600">
                        {tournament.sport} • {tournament.location}
                      </CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(tournament.status)}>
                          {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Registered
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">${tournament.prizePool}</div>
                    <div className="text-sm text-gray-600">Prize Pool</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{tournament.currentTeams}/{tournament.maxTeams}</div>
                    <div className="text-sm text-blue-600">Total Teams</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{tournament.startDate}</div>
                    <div className="text-sm text-green-600">Start Date</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{tournament.endDate}</div>
                    <div className="text-sm text-purple-600">End Date</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">$0</div>
                    <div className="text-sm text-orange-600">Entry Fee Paid</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "results" && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Yet</h3>
          <p className="text-gray-600">Tournament results and history will appear here once you participate in tournaments.</p>
        </div>
      )}
    </div>
  )
}

