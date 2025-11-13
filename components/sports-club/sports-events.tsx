"use client"

import type React from "react"

import { useState, useEffect } from "react"
import QRCode from "react-qr-code"
import Image from "next/image"
import { Calendar, Clock, MapPin, Users, Filter, Search, ChevronDown, Trophy, UserPlus, Check, QrCode, Share2, Plus, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockSportEvents, getSportEmoji, isUserBlacklisted, mockTeams } from "@/lib/mock-sports-data"
import { useToast } from "@/components/ui/use-toast"
import { useSharedEvents } from "@/contexts/SharedEventsContext"
import type { SportEvent, Team } from "@/types/sports-club"

export function SportsEvents() {
  const { toast } = useToast()
  const { getSportsEvents, addEvent } = useSharedEvents()
  const [events, setEvents] = useState<SportEvent[]>(mockSportEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [sportFilter, setSportFilter] = useState<string>("all")
  const [showRegisteredOnly, setShowRegisteredOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState<"date-asc" | "date-desc" | "popularity">("date-asc")
  const [roleFilter, setRoleFilter] = useState<"all" | "founder" | "investor" | "mentor">("all")
  const [rsvpFilter, setRsvpFilter] = useState<"all" | "playing" | "spectating">("all")
  const [selectedEvent, setSelectedEvent] = useState<SportEvent | null>(null)
  const [showTeamDialog, setShowTeamDialog] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")
  const [newTeamMembers, setNewTeamMembers] = useState("")
  const [teams, setTeams] = useState<Team[]>(mockTeams)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [inviteCopiedId, setInviteCopiedId] = useState<string | null>(null)
  const [showEventQrForId, setShowEventQrForId] = useState<string | null>(null)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventSport, setNewEventSport] = useState("")
  const [newEventLocation, setNewEventLocation] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventTime, setNewEventTime] = useState("")
  const [newEventCapacity, setNewEventCapacity] = useState<string>("")
  const [newEventNetworkingTheme, setNewEventNetworkingTheme] = useState("")

  // Load sports events from shared context
  useEffect(() => {
    const sharedSportsEvents = getSportsEvents()
    if (sharedSportsEvents.length > 0) {
      setEvents(sharedSportsEvents as SportEvent[])
    }
  }, [getSportsEvents])

  // Filter events based on search, sport, registration status, role, and RSVP type
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.sport.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSport = sportFilter === "all" || event.sport === sportFilter
    const matchesRegistration = showRegisteredOnly ? event.isRegistered : true

    const matchesRole =
      roleFilter === "all" || (event.audienceRoles ? event.audienceRoles.includes(roleFilter as any) : true)

    const matchesRsvp =
      rsvpFilter === "all" || (event.rsvpType ? event.rsvpType === rsvpFilter : true)

    return matchesSearch && matchesSport && matchesRegistration && matchesRole && matchesRsvp
  })

  // Sort events based on selected order
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortOrder === "date-asc") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortOrder === "date-desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOrder === "popularity") {
      return b.registered / b.capacity - a.registered / a.capacity
    }
    return 0
  })

  const handleRegister = (eventId: string) => {
    // Check if user is blacklisted
    if (isUserBlacklisted("user-1")) {
      toast({
        title: "Registration Blocked",
        description:
          "You are currently unable to register for events due to multiple missed check-ins. Please contact the administrator.",
        variant: "destructive",
      })
      return
    }

    // Handle registration
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id !== eventId) return event
        const willRegister = !event.isRegistered
        const hasCapacity = event.registered < event.capacity
        if (willRegister && !hasCapacity) {
          return { ...event, isWaitlisted: true }
        }
        return {
          ...event,
          isRegistered: !event.isRegistered,
          registered: event.isRegistered ? event.registered - 1 : event.registered + 1,
          isWaitlisted: false,
        }
      }),
    )

    const event = events.find((e) => e.id === eventId)
    if (event) {
      const willRegister = !event.isRegistered
      const wasFull = event.registered >= event.capacity
      toast({
        title: willRegister && wasFull ? "Added to Waitlist" : event.isRegistered ? "Registration Cancelled" : "Successfully Registered",
        description: willRegister && wasFull
          ? `The event is full. You've been added to the waitlist for ${event.title}.`
          : event.isRegistered
            ? `You have cancelled your registration for ${event.title}`
            : `You have registered for ${event.title}. See you there!`,
        variant: event.isRegistered ? "destructive" : "default",
      })
    }
  }

  const shareOrCopyInvite = async (eventId: string) => {
    const link = `${window.location.origin}/sports-club?event=${eventId}`
    try {
      if (navigator.share) {
        await navigator.share({ title: "Join Sports Event", text: "Join me at this event on GrowthLab", url: link })
        toast({ title: "Invite shared" })
        return
      }
      await navigator.clipboard.writeText(link)
      setInviteCopiedId(eventId)
      setTimeout(() => setInviteCopiedId(null), 1500)
      toast({ title: "Invite link copied", description: "Share it with founders, investors, and mentors." })
    } catch {
      toast({ title: "Share failed", description: "Unable to share or copy invite.", variant: "destructive" })
    }
  }

  const downloadIcsForEvent = (event: SportEvent) => {
    const startDate = new Date(`${event.date} ${event.time}`)
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
    const toIcsDate = (d: Date) =>
      d
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\..+/, "")
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//GrowthLab//Founders Sports Club//EN",
      "BEGIN:VEVENT",
      `UID:${event.id}@growthlab`,
      `DTSTAMP:${toIcsDate(new Date())}Z`,
      `DTSTART:${toIcsDate(startDate)}Z`,
      `DTEND:${toIcsDate(endDate)}Z`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n")

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${event.title.replace(/\s+/g, "_")}.ics`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast({ title: "Calendar event downloaded" })
  }

  const handleTeamSelect = (team: Team) => {
    setSelectedTeam(team)
    toast({
      title: "Team Selected",
      description: `You will join this event with team "${team.name}"`,
    })
    setShowTeamDialog(false)
  }

  const handleViewTeams = (event: SportEvent) => {
    setSelectedEvent(event)
    setShowTeamDialog(true)
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Sports Events</h2>
          <p className="text-muted-foreground">Join sports activities with fellow founders and entrepreneurs</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Sport</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSportFilter("all")}>
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>All Sports</span>
                  {sportFilter === "all" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSportFilter("soccer")}>
                  <span className="mr-2">⚽</span>
                  <span>Soccer</span>
                  {sportFilter === "soccer" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSportFilter("basketball")}>
                  <span className="mr-2">🏀</span>
                  <span>Basketball</span>
                  {sportFilter === "basketball" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSportFilter("tennis")}>
                  <span className="mr-2">🎾</span>
                  <span>Tennis</span>
                  {sportFilter === "tennis" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSportFilter("volleyball")}>
                  <span className="mr-2">🏐</span>
                  <span>Volleyball</span>
                  {sportFilter === "volleyball" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSportFilter("running")}>
                  <span className="mr-2">🏃</span>
                  <span>Running</span>
                  {sportFilter === "running" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Audience</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setRoleFilter("all")}>
                    <span className="mr-2">👥</span>
                    <span>All Members</span>
                    {roleFilter === "all" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("founder")}>
                    <span className="mr-2">🚀</span>
                    <span>Founders</span>
                    {roleFilter === "founder" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("investor")}>
                    <span className="mr-2">💼</span>
                    <span>Investors</span>
                    {roleFilter === "investor" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter("mentor")}>
                    <span className="mr-2">🧭</span>
                    <span>Mentors</span>
                    {roleFilter === "mentor" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">RSVP Type</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setRsvpFilter("all")}>
                    <span className="mr-2">📝</span>
                    <span>All</span>
                    {rsvpFilter === "all" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRsvpFilter("playing")}>
                    <span className="mr-2">🏃</span>
                    <span>Playing</span>
                    {rsvpFilter === "playing" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRsvpFilter("spectating")}>
                    <span className="mr-2">👀</span>
                    <span>Spectating</span>
                    {rsvpFilter === "spectating" && <Check className="ml-auto h-4 w-4" />}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Registration</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setShowRegisteredOnly(!showRegisteredOnly)}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>My Registered Events</span>
                  {showRegisteredOnly && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs">Sort By</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSortOrder("date-asc")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Date (Ascending)</span>
                  {sortOrder === "date-asc" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("date-desc")}>
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Date (Descending)</span>
                  {sortOrder === "date-desc" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder("popularity")}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Popularity</span>
                  {sortOrder === "popularity" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="default" className="w-full sm:w-auto" onClick={() => setShowCreateEvent(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground">Try changing your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={event.image || `/placeholder.svg?width=400&height=200&text=${event.sport}`}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <Badge className="absolute top-2 right-2 text-xs" variant="secondary">
                  {getSportEmoji(event.sport)} {event.sport.charAt(0).toUpperCase() + event.sport.slice(1)}
                </Badge>

                {event.teamsAllowed && (
                  <Badge className="absolute top-2 left-2 text-xs bg-background/80" variant="outline">
                    <Users className="h-3 w-3 mr-1" />
                    Teams
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{event.title}</CardTitle>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-8 w-8 border">
                          <AvatarImage src={event.organizer.avatar || "/placeholder.svg"} alt={event.organizer.name} />
                          <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Organized by {event.organizer.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pb-2 flex-grow">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {event.time} · {event.duration}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{event.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {event.registered} / {event.capacity} participants
                  </span>
                  <div className="ml-auto flex-grow bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        event.registered / event.capacity > 0.8
                          ? "bg-red-500"
                          : event.registered / event.capacity > 0.5
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                </div>
                {event.networking?.enabled && (
                  <div className="text-xs text-muted-foreground">
                    🤝 Networking {event.networking.time ? `· ${event.networking.time}` : "session"}
                    {event.networking.theme ? ` · ${event.networking.theme}` : ""}
                  </div>
                )}
                {event.isWaitlisted && (
                  <div className="text-xs text-amber-600 dark:text-amber-400">You are on the waitlist</div>
                )}
              </CardContent>
              <CardFooter className="pt-0 flex flex-col gap-2">
                {event.teamsAllowed ? (
                  <div className="flex gap-2 w-full">
                    <Button
                      className="flex-1"
                      variant={event.isRegistered ? "outline" : "default"}
                      onClick={() => handleRegister(event.id)}
                      disabled={!event.isRegistered && event.registered >= event.capacity}
                    >
                      {event.isRegistered
                        ? "Cancel Registration"
                        : event.registered >= event.capacity
                          ? "Event Full"
                          : "Register Now"}
                    </Button>
                     <Button variant="secondary" className="flex-none" onClick={() => handleViewTeams(event)} aria-label="View teams">
                      <Users className="h-4 w-4" />
                    </Button>
                     <Button variant="outline" className="flex-none" onClick={() => shareOrCopyInvite(event.id)} title="Share or copy invite link">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                     <Button variant="outline" className="flex-none" title="Add to calendar" onClick={() => downloadIcsForEvent(event)}>
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full"
                    variant={event.isRegistered ? "outline" : "default"}
                    onClick={() => handleRegister(event.id)}
                    disabled={!event.isRegistered && event.registered >= event.capacity}
                  >
                    {event.isRegistered
                      ? "Cancel Registration"
                      : event.registered >= event.capacity
                        ? "Event Full"
                        : "Register Now"}
                  </Button>
                )}
                <div className="flex gap-2 w-full">
                  <Button variant="secondary" className="flex-1" onClick={() => setShowEventQrForId(event.id)}>
                    <QrCode className="h-4 w-4 mr-2" />
                    Event QR
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => shareOrCopyInvite(event.id)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    {inviteCopiedId === event.id ? "Copied" : "Invite"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Team Selection Dialog */}
      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select a Team</DialogTitle>
            <DialogDescription>Join {selectedEvent?.title} with your team or create a new one</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            {mockTeams
              .filter((team) => team.sport === selectedEvent?.sport)
              .map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => handleTeamSelect(team)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md overflow-hidden relative">
                      <Image
                        src={team.logo || `/placeholder.svg?height=40&width=40&text=${team.name.substring(0, 2)}`}
                        alt={team.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{team.name}</h4>
                      <p className="text-xs text-muted-foreground">{team.members.length} members</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {team.id === selectedTeam?.id && <Check className="h-5 w-5 text-primary" />}
                  </div>
                </div>
              ))}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowTeamDialog(false)
                setShowCreateTeamDialog(true)
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create New Team
            </Button>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowTeamDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedTeam && selectedEvent) {
                  handleRegister(selectedEvent.id)
                  setShowTeamDialog(false)
                } else {
                  toast({
                    title: "No team selected",
                    description: "Please select a team or create a new one",
                    variant: "destructive",
                  })
                }
              }}
              disabled={!selectedTeam}
            >
              Register with Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create New Team Dialog */}
      <Dialog open={showCreateTeamDialog} onOpenChange={setShowCreateTeamDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
            <DialogDescription>Create a new team for {selectedEvent?.title}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-muted-foreground">
                Team Name
              </label>
              <Input 
                id="teamName" 
                placeholder="e.g., The Code Crusaders"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="teamMembers" className="block text-sm font-medium text-muted-foreground">
                Team Members (comma-separated)
              </label>
              <Input 
                id="teamMembers" 
                placeholder="e.g., John Doe, Jane Smith"
                value={newTeamMembers}
                onChange={(e) => setNewTeamMembers(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCreateTeamDialog(false)}>
              Cancel
            </Button>
                         <Button
               onClick={() => {
                 if (!newTeamName.trim()) {
                   toast({
                     title: "Team Name Required",
                     description: "Please enter a team name.",
                     variant: "destructive",
                   })
                   return
                 }

                 const members = newTeamMembers.split(",").map((name: string) => name.trim()).filter(Boolean)

                 const newTeam: Team = {
                   id: `team-${teams.length + 1}`,
                   name: newTeamName,
                   sport: selectedEvent?.sport || "soccer",
                   captain: {
                     id: "user-1",
                     name: "Team Captain",
                     avatar: "/placeholder.svg?height=40&width=40&text=TC",
                   },
                   members: members.map((name: string, index: number) => ({
                     id: `member-${index + 1}`,
                     name: name,
                     avatar: `/placeholder.svg?height=40&width=40&text=${name.substring(0, 2)}`,
                   })),
                   logo: `/placeholder.svg?height=40&width=40&text=${newTeamName.substring(0, 2)}`,
                   createdAt: new Date().toISOString(),
                 }

                 setTeams((prev: Team[]) => [...prev, newTeam])
                 setNewTeamName("")
                 setNewTeamMembers("")
                 toast({
                   title: "Team Created",
                   description: `Team "${newTeam.name}" created for ${selectedEvent?.title}!`,
                 })
                 setShowCreateTeamDialog(false)
               }}
             >
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Event Dialog */}
      <Dialog open={showCreateEvent} onOpenChange={setShowCreateEvent}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Sports Event</DialogTitle>
            <DialogDescription>Plan a founder-friendly sports session with clear capacity and networking time.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
            <div>
              <label className="block text-sm text-muted-foreground">Title</label>
              <Input placeholder="e.g., Sunrise Tennis Social" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground">Sport</label>
              <Input placeholder="e.g., tennis" value={newEventSport} onChange={(e) => setNewEventSport(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground">Location</label>
              <Input placeholder="Venue" value={newEventLocation} onChange={(e) => setNewEventLocation(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground">Date</label>
              <Input type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground">Time</label>
              <Input placeholder="10:00 AM" value={newEventTime} onChange={(e) => setNewEventTime(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-muted-foreground">Capacity</label>
              <Input type="number" placeholder="e.g., 20" value={newEventCapacity} onChange={(e) => setNewEventCapacity(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-muted-foreground">Networking Theme (optional)</label>
              <Input placeholder="e.g., Pitches & Pickleball" value={newEventNetworkingTheme} onChange={(e) => setNewEventNetworkingTheme(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowCreateEvent(false)}>Cancel</Button>
            <Button onClick={() => {
              if (!newEventTitle.trim() || !newEventSport.trim() || !newEventLocation.trim() || !newEventDate || !newEventTime || !newEventCapacity) {
                toast({ title: "Missing details", description: "Please fill all required fields.", variant: "destructive" })
                return
              }
              const newEvent: SportEvent = {
                id: `event-${Date.now()}`,
                title: newEventTitle.trim(),
                description: "Community-created event",
                sport: newEventSport.trim() as any,
                location: newEventLocation.trim(),
                date: newEventDate,
                time: newEventTime.trim(),
                duration: "2 hours",
                capacity: Number(newEventCapacity),
                registered: 0,
                organizer: { id: "current-user", name: "You" },
                teamsAllowed: false,
                audienceRoles: ["founder", "investor", "mentor"],
                rsvpType: "playing",
                networking: { enabled: !!newEventNetworkingTheme.trim(), theme: newEventNetworkingTheme.trim() || undefined },
              }
              // Add to shared events context
              addEvent({
                id: newEvent.id,
                title: newEvent.title,
                description: newEvent.description,
                date: newEvent.date,
                time: newEvent.time,
                location: newEvent.location,
                category: "Sports",
                price: "Free",
                attendees: `${newEvent.capacity}+`,
                featured: false,
                image: `/sports-${newEvent.sport}.png`,
                organizer: newEvent.organizer,
                eventType: 'sports',
                sport: newEvent.sport,
                duration: newEvent.duration,
                capacity: newEvent.capacity,
                registered: newEvent.registered,
                teamsAllowed: newEvent.teamsAllowed,
                networking: newEvent.networking,
                status: "Open for Registration"
              })
              
              setEvents((prev) => [newEvent, ...prev])
              setShowCreateEvent(false)
              setNewEventTitle("")
              setNewEventSport("")
              setNewEventLocation("")
              setNewEventDate("")
              setNewEventTime("")
              setNewEventCapacity("")
              setNewEventNetworkingTheme("")
              toast({ title: "Event created", description: `${newEvent.title} has been added.` })
            }}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event QR Dialog */}
      <Dialog open={!!showEventQrForId} onOpenChange={(open) => !open && setShowEventQrForId(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Event QR</DialogTitle>
            <DialogDescription>Share this QR so others can open the event quickly.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4">
            {showEventQrForId && (
              <div className="bg-white p-4 rounded-lg">
                <QRCode value={`${typeof window !== 'undefined' ? window.location.origin : ''}/sports-club?event=${showEventQrForId}`} size={200} level="H" />
              </div>
            )}
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={() => showEventQrForId && shareOrCopyInvite(showEventQrForId)}>
                Share Link
              </Button>
              <Button className="flex-1" onClick={() => setShowEventQrForId(null)}>Done</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


