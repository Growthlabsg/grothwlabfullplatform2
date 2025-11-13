"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Clock,
  Star,
  ExternalLink,
  ArrowUpDown,
  CalendarIcon,
  List,
  BarChart3,
  Download,
  Filter,
  ChevronDown,
  Users,
  Trophy,
} from "lucide-react"
import { getSportEmoji } from "@/lib/mock-sports-data"
import { ResponsiveCard } from "@/components/ui/responsive-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataVisualization } from "@/components/dashboard/data-visualization"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import type { ParticipationRecord } from "@/types/sports-club"

export function ParticipationHistory() {
  const [participationView, setParticipationView] = useState<"upcoming" | "past" | "analytics">("past")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "sport">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)
  const [filterSport, setFilterSport] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  // Mock participation data
  const upcomingEvents: ParticipationRecord[] = [
    {
      id: "up1",
      eventId: "e1",
      eventTitle: "Founder's Football Match",
      sport: "soccer",
      date: "2025-05-25",
      status: "upcoming",
    },
    {
      id: "up2",
      eventId: "e2",
      eventTitle: "Startup Tennis Tournament",
      sport: "tennis",
      date: "2025-06-03",
      status: "upcoming",
    },
    {
      id: "up3",
      eventId: "e3",
      eventTitle: "Tech Basketball League - Week 5",
      sport: "basketball",
      date: "2025-05-30",
      status: "upcoming",
    },
  ]

  const pastEvents: ParticipationRecord[] = [
    {
      id: "p1",
      eventId: "pe1",
      eventTitle: "Tech Basketball League",
      sport: "basketball",
      date: "2025-05-10",
      status: "attended",
      checkInTime: "09:45 AM",
      feedback: "Great competitive game!",
      rating: 5,
      team: "Code Crushers",
    },
    {
      id: "p2",
      eventId: "pe2",
      eventTitle: "Venture Volleyball",
      sport: "volleyball",
      date: "2025-04-22",
      status: "attended",
      checkInTime: "02:30 PM",
      feedback: "Well organized event",
      rating: 4,
    },
    {
      id: "p3",
      eventId: "pe3",
      eventTitle: "Entrepreneur's Running Club",
      sport: "running",
      date: "2025-04-15",
      status: "missed",
    },
    {
      id: "p4",
      eventId: "pe4",
      eventTitle: "Cycling for Startups",
      sport: "cycling",
      date: "2025-03-28",
      status: "attended",
      checkInTime: "07:15 AM",
      rating: 3,
    },
    {
      id: "p5",
      eventId: "pe5",
      eventTitle: "Badminton Networking",
      sport: "badminton",
      date: "2025-03-12",
      status: "attended",
      checkInTime: "06:00 PM",
      feedback: "Met some great connections",
      rating: 5,
    },
    {
      id: "p6",
      eventId: "pe6",
      eventTitle: "Founder's Football Match",
      sport: "soccer",
      date: "2025-02-18",
      status: "attended",
      checkInTime: "04:30 PM",
      feedback: "Great team building experience",
      rating: 5,
      team: "Startup Strikers",
    },
    {
      id: "p7",
      eventId: "pe7",
      eventTitle: "Table Tennis Tournament",
      sport: "table-tennis",
      date: "2025-02-05",
      status: "attended",
      checkInTime: "01:00 PM",
      rating: 4,
    },
    {
      id: "p8",
      eventId: "pe8",
      eventTitle: "Swimming Meetup",
      sport: "swimming",
      date: "2025-01-20",
      status: "missed",
    },
  ]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get unique sports for filtering
  const uniqueSports = [...new Set([...pastEvents, ...upcomingEvents].map((event) => event.sport))]
    .sort()
    .map((sport) => ({
      value: sport,
      label: sport.charAt(0).toUpperCase() + sport.slice(1),
    }))

  // Filter and sort the data
  const filteredUpcoming = upcomingEvents.filter((event) => {
    const matchesSearch =
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.sport.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = filterSport ? event.sport === filterSport : true

    return matchesSearch && matchesSport
  })

  const filteredPast = pastEvents.filter((event) => {
    const matchesSearch =
      event.eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.sport.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSport = filterSport ? event.sport === filterSport : true
    const matchesStatus = filterStatus ? event.status === filterStatus : true

    return matchesSearch && matchesSport && matchesStatus
  })

  const sortedUpcoming = [...filteredUpcoming].sort((a, b) => {
    if (sortBy === "date") {
      const comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      return sortOrder === "asc" ? comparison : -comparison
    } else {
      const comparison = a.sport.localeCompare(b.sport)
      return sortOrder === "asc" ? comparison : -comparison
    }
  })

  const sortedPast = [...filteredPast].sort((a, b) => {
    if (sortBy === "date") {
      const comparison = new Date(a.date).getTime() - new Date(b.date).getTime()
      return sortOrder === "asc" ? comparison : -comparison
    } else {
      const comparison = a.sport.localeCompare(b.sport)
      return sortOrder === "asc" ? comparison : -comparison
    }
  })

  // Calculate stats
  const totalEvents = pastEvents.length
  const attendedEvents = pastEvents.filter((e) => e.status === "attended").length
  const missedEvents = pastEvents.filter((e) => e.status === "missed").length
  const attendanceRate = totalEvents > 0 ? Math.round((attendedEvents / totalEvents) * 100) : 0

  // Average rating
  const ratings = pastEvents.filter((e) => e.rating !== undefined).map((e) => e.rating as number)
  const averageRating =
    ratings.length > 0 ? Math.round((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length) * 10) / 10 : 0

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "attended":
        return "success" as const
      case "missed":
        return "destructive" as const
      case "late":
        return "warning" as const
      case "upcoming":
        return "outline" as const
      default:
        return "secondary" as const
    }
  }

  // Calculate participation by sport for analytics
  const participationBySport = uniqueSports
    .map((sport) => {
      const count = pastEvents.filter((event) => event.sport === sport.value && event.status === "attended").length
      return {
        name: sport.label,
        value: count,
      }
    })
    .sort((a, b) => b.value - a.value)

  // Calculate monthly participation
  const monthlyParticipation = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const currentYear = new Date().getFullYear()

    const data = months.map((month) => {
      const monthIndex = months.indexOf(month)
      const count = pastEvents.filter((event) => {
        const eventDate = new Date(event.date)
        return (
          eventDate.getMonth() === monthIndex && eventDate.getFullYear() === currentYear && event.status === "attended"
        )
      }).length

      return { name: month, value: count }
    })

    // Only include months with data and the current month
    const currentMonth = new Date().getMonth()
    return data.slice(0, currentMonth + 1)
  }

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("")
    setFilterSport(null)
    setFilterStatus(null)
    setSortBy("date")
    setSortOrder("desc")
  }

  // Export participation history
  const exportHistory = () => {
    // In a real app, this would generate a CSV or PDF
    toast({
      title: "Export Started",
      description: "Your participation history is being exported.",
    })
  }

  // Mock toast function
  const toast = (props: { title: string; description: string }) => {
    console.log(props.title, props.description)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Participation History</h2>
          <p className="text-muted-foreground">Track your sports participation and achievements</p>
        </div>

        <Tabs
          value={participationView}
          onValueChange={(value) => setParticipationView(value as "upcoming" | "past" | "analytics")}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Upcoming</span>
              {filteredUpcoming.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {filteredUpcoming.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">Past</span>
              {filteredPast.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {filteredPast.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search events"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Sport</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterSport(null)} className={!filterSport ? "bg-accent" : ""}>
                  All Sports
                </DropdownMenuItem>
                {uniqueSports.map((sport) => (
                  <DropdownMenuItem
                    key={sport.value}
                    onClick={() => setFilterSport(sport.value)}
                    className={filterSport === sport.value ? "bg-accent" : ""}
                  >
                    <span className="mr-2">{getSportEmoji(sport.value)}</span>
                    {sport.label}
                  </DropdownMenuItem>
                ))}

                {participationView === "past" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setFilterStatus(null)}
                      className={!filterStatus ? "bg-accent" : ""}
                    >
                      All Statuses
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus("attended")}
                      className={filterStatus === "attended" ? "bg-accent" : ""}
                    >
                      Attended
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setFilterStatus("missed")}
                      className={filterStatus === "missed" ? "bg-accent" : ""}
                    >
                      Missed
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={resetFilters}>Reset All Filters</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => {
                if (sortBy === "date") {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                } else {
                  setSortBy("date")
                  setSortOrder("desc")
                }
              }}
              title="Sort by date"
              aria-label="Sort by date"
            >
              <CalendarIcon className={`h-4 w-4 ${sortBy === "date" ? "text-primary" : ""}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => {
                if (sortBy === "sport") {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                } else {
                  setSortBy("sport")
                  setSortOrder("asc")
                }
              }}
              title="Sort by sport"
              aria-label="Sort by sport"
            >
              <ArrowUpDown className={`h-4 w-4 ${sortBy === "sport" ? "text-primary" : ""}`} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={exportHistory}
              title="Export history"
              aria-label="Export participation history"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex items-center justify-center p-4 sm:p-6 bg-primary/5 w-full sm:w-auto sm:min-w-[100px]">
                      <Skeleton className="h-16 w-16 rounded-full" />
                    </div>
                    <CardContent className="flex-grow p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-5 w-20 mt-1 sm:mt-0" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="upcoming" className="m-0">
                {sortedUpcoming.length === 0 ? (
                  <Card className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">No upcoming events</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any upcoming sports events yet.
                    </p>
                    <Button variant="outline" className="mx-auto">
                      Browse Events
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {sortedUpcoming.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex items-center justify-center p-4 sm:p-6 bg-primary/5 w-full sm:w-auto sm:min-w-[100px]">
                            <span className="text-4xl" aria-hidden="true">
                              {getSportEmoji(event.sport)}
                            </span>
                          </div>
                          <CardContent className="flex-grow p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                              <h3 className="font-bold text-lg">{event.eventTitle}</h3>
                              <Badge variant="outline" className="w-fit mt-1 sm:mt-0">
                                Upcoming
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="secondary" className="mr-2 font-normal">
                                  {event.sport.charAt(0).toUpperCase() + event.sport.slice(1)}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <Button variant="outline" size="sm">
                                Cancel Registration
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                <span>View Event</span>
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="m-0">
                {sortedPast.length === 0 ? (
                  <Card className="p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <List className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium">No participation history</h3>
                    <p className="text-muted-foreground mb-4">You haven't participated in any sports events yet.</p>
                    <Button variant="outline" className="mx-auto">
                      Browse Events
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {sortedPast.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex items-center justify-center p-4 sm:p-6 bg-primary/5 w-full sm:w-auto sm:min-w-[100px]">
                            <span className="text-4xl" aria-hidden="true">
                              {getSportEmoji(event.sport)}
                            </span>
                          </div>
                          <CardContent className="flex-grow p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                              <h3 className="font-bold text-lg">{event.eventTitle}</h3>
                              <Badge variant={getStatusBadgeVariant(event.status)} className="w-fit mt-1 sm:mt-0">
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" aria-hidden="true" />
                                <span>{formatDate(event.date)}</span>
                              </div>
                              {event.checkInTime && (
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2" aria-hidden="true" />
                                  <span>Checked in at {event.checkInTime}</span>
                                </div>
                              )}
                              <div className="flex items-center flex-wrap gap-2">
                                <Badge variant="secondary" className="font-normal">
                                  {event.sport.charAt(0).toUpperCase() + event.sport.slice(1)}
                                </Badge>
                                {event.team && (
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" aria-hidden="true" />
                                    <span>Team: {event.team}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            {event.rating && (
                              <div
                                className="mt-2 flex items-center gap-1"
                                aria-label={`Rated ${event.rating} out of 5 stars`}
                              >
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < event.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            )}
                            {event.feedback && (
                              <div className="mt-2 text-sm border-l-2 border-primary/20 pl-2 italic text-muted-foreground">
                                "{event.feedback}"
                              </div>
                            )}
                            <div className="flex justify-end mt-4">
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                <span>View Event</span>
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="analytics" className="m-0">
                <div className="space-y-6">
                  <DataVisualization
                    title="Participation by Sport"
                    description="Number of events attended by sport type"
                    type="bar"
                    data={participationBySport}
                  />

                  <DataVisualization
                    title="Monthly Participation"
                    description="Your sports activity over time"
                    type="area"
                    data={monthlyParticipation()}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Attendance Rate</CardTitle>
                        <CardDescription>Your event attendance over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Overall Rate</span>
                            <span className="font-semibold">{attendanceRate}%</span>
                          </div>
                          <Progress
                            value={attendanceRate}
                            className="h-2"
                            aria-label={`Attendance rate: ${attendanceRate}%`}
                          />

                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground">Attended</div>
                              <div className="text-xl font-bold text-green-600 dark:text-green-400">
                                {attendedEvents}
                              </div>
                            </div>
                            <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                              <div className="text-xs text-muted-foreground">Missed</div>
                              <div className="text-xl font-bold text-red-600 dark:text-red-400">{missedEvents}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Event Ratings</CardTitle>
                        <CardDescription>Your feedback on attended events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Average Rating</span>
                            <div className="flex items-center gap-1">
                              <span className="font-semibold">{averageRating}</span>
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < Math.floor(averageRating)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : i < averageRating
                                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                                          : "text-gray-300"
                                    }`}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => {
                              const count = ratings.filter((r) => Math.floor(r) === rating).length
                              const percentage = ratings.length > 0 ? Math.round((count / ratings.length) * 100) : 0

                              return (
                                <div key={rating} className="flex items-center gap-2">
                                  <div className="flex items-center w-12">
                                    <span className="text-sm">{rating}</span>
                                    <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                                  </div>
                                  <Progress
                                    value={percentage}
                                    className="h-2 flex-grow"
                                    aria-label={`${rating} stars: ${percentage}%`}
                                  />
                                  <span className="text-xs text-muted-foreground w-8 text-right">{percentage}%</span>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </>
          )}
        </div>

        <div className="w-full md:w-1/3 space-y-6">
          <ResponsiveCard className="bg-primary/5 border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Participation Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Events</span>
                    <span className="font-semibold">{totalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Attended</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">{attendedEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Missed</span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{missedEvents}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Attendance Rate</span>
                    <span className="font-semibold">{attendanceRate}%</span>
                  </div>

                  <div className="w-full bg-background rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        attendanceRate > 75 ? "bg-green-600" : attendanceRate > 50 ? "bg-yellow-500" : "bg-red-600"
                      }`}
                      style={{ width: `${attendanceRate}%` }}
                      aria-label={`Attendance rate: ${attendanceRate}%`}
                      role="progressbar"
                      aria-valuenow={attendanceRate}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>

                  {averageRating > 0 && (
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">{averageRating}</span>
                        <div className="flex" aria-label={`Average rating: ${averageRating} out of 5 stars`}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(averageRating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : i < averageRating
                                    ? "text-yellow-400 fill-yellow-400 opacity-50"
                                    : "text-gray-300"
                              }`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </ResponsiveCard>

          <ResponsiveCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Most Active Participants</CardTitle>
              <CardDescription>Founders with highest attendance</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-5 w-16 ml-auto" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { name: "Alex Wong", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", events: 12 },
                    { name: "Sarah Chen", avatar: "/portrait-of-sarah.png", events: 10 },
                    { name: "David Kumar", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", events: 8 },
                    { name: "Mei Lin", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face", events: 7 },
                  ].map((person, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                          <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{person.name}</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/5">
                        {person.events} events
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </ResponsiveCard>

          <ResponsiveCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Achievements</CardTitle>
              <CardDescription>Sports milestones and badges</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    {
                      title: "Sports Enthusiast",
                      description: "Participated in 5+ different sports",
                      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
                    },
                    {
                      title: "Perfect Attendance",
                      description: "Attended 5 consecutive events",
                      icon: <Calendar className="h-5 w-5 text-green-500" />,
                    },
                    {
                      title: "Team Player",
                      description: "Joined 3+ team events",
                      icon: <Users className="h-5 w-5 text-blue-500" />,
                    },
                  ].map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" className="w-full mt-2">
                    View All Achievements
                  </Button>
                </div>
              )}
            </CardContent>
          </ResponsiveCard>
        </div>
      </div>
    </div>
  )
}

// Import the Search icon locally since it wasn't included in the initial imports
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
