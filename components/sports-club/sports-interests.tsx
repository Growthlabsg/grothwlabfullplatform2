"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Activity,
  Plus,
  Edit,
  Star,
  Users,
  Bell,
  BellOff,
  Search,
  Calendar,
  Trash2,
  X,
  MapPin,
  Clock,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { getSportEmoji, mockSportEvents, mockTeams } from "@/lib/mock-sports-data"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import type { UserSportInterest, Sport, Team } from "@/types/sports-club"

// Form schema for adding/editing sport interests
const sportInterestSchema = z.object({
  sport: z.string().min(1, "Please select a sport"),
  level: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your skill level",
  }),
  frequency: z.enum(["casual", "regular", "competitive"], {
    required_error: "Please select how often you play",
  }),
  preferredPositions: z.array(z.string()).optional(),
  receiveNotifications: z.boolean().default(true),
  notes: z.string().max(500, "Notes must be less than 500 characters").optional(),
})

type SportInterestFormValues = z.infer<typeof sportInterestSchema>

// Team following schema
const teamFollowingSchema = z.object({
  teamId: z.string().min(1, "Please select a team"),
  notificationLevel: z.enum(["all", "important", "none"], {
    required_error: "Please select notification preference",
  }),
})

type TeamFollowingFormValues = z.infer<typeof teamFollowingSchema>

export function SportsInterests() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("mySports")
  const [interests, setInterests] = useState<UserSportInterest[]>([
    {
      sport: "soccer",
      level: "intermediate",
      frequency: "regular",
      preferredPositions: ["Midfielder", "Forward"],
      receiveNotifications: true,
      notes: "Played for 5 years in college, enjoy both recreational and competitive matches.",
    },
    {
      sport: "basketball",
      level: "beginner",
      frequency: "casual",
      receiveNotifications: true,
    },
    {
      sport: "tennis",
      level: "advanced",
      frequency: "competitive",
      preferredPositions: ["Singles"],
      receiveNotifications: true,
      notes: "Played competitively for 8 years. Looking for challenging matches.",
    },
  ])

  const [followedTeams, setFollowedTeams] = useState<
    {
      teamId: string
      team: Team
      notificationLevel: "all" | "important" | "none"
      following: boolean
    }[]
  >([
    {
      teamId: "team-1",
      team: mockTeams[0],
      notificationLevel: "all",
      following: true,
    },
    {
      teamId: "team-3",
      team: mockTeams[2],
      notificationLevel: "important",
      following: true,
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [teamSearchQuery, setTeamSearchQuery] = useState("")
  const [filterLevel, setFilterLevel] = useState<string | null>(null)

  // For new position input in the dialog
  const [newPosition, setNewPosition] = useState("")

  // All available sports and teams
  const availableSports: Sport[] = [
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
  ]

  const allTeams = mockTeams

  // Form for adding/editing sport interests
  const form = useForm<SportInterestFormValues>({
    resolver: zodResolver(sportInterestSchema),
    defaultValues: {
      sport: "soccer",
      level: "beginner",
      frequency: "casual",
      preferredPositions: [],
      receiveNotifications: true,
      notes: "",
    },
  })

  // Form for following teams
  const teamForm = useForm<TeamFollowingFormValues>({
    resolver: zodResolver(teamFollowingSchema),
    defaultValues: {
      teamId: "",
      notificationLevel: "all",
    },
  })

  // Reset form when dialog closes
  useEffect(() => {
    if (!isAddDialogOpen) {
      form.reset({
        sport: "soccer",
        level: "beginner",
        frequency: "casual",
        preferredPositions: [],
        receiveNotifications: true,
        notes: "",
      })
      setEditingIndex(null)
    }
  }, [isAddDialogOpen, form])

  // Reset team form when dialog closes
  useEffect(() => {
    if (!isTeamDialogOpen) {
      teamForm.reset({
        teamId: "",
        notificationLevel: "all",
      })
    }
  }, [isTeamDialogOpen, teamForm])

  // For editing existing interest
  const editInterest = (index: number) => {
    const interest = interests[index]
    form.reset({
      sport: interest.sport,
      level: interest.level,
      frequency: interest.frequency || "casual",
      preferredPositions: interest.preferredPositions || [],
      receiveNotifications: interest.receiveNotifications !== false,
      notes: interest.notes || "",
    })
    setEditingIndex(index)
    setIsAddDialogOpen(true)
  }

  // For deleting interest
  const deleteInterest = (index: number) => {
    const updatedInterests = [...interests]
    updatedInterests.splice(index, 1)
    setInterests(updatedInterests)

    toast({
      title: "Sport interest removed",
      description: "Your sport interest has been successfully deleted.",
    })
  }

  // Handle form submission for adding/editing sport interests
  const onSubmit = (values: SportInterestFormValues) => {
    if (editingIndex !== null) {
      // Update existing interest
      const updatedInterests = [...interests]
      updatedInterests[editingIndex] = values
      setInterests(updatedInterests)

      toast({
        title: "Interest updated",
        description: "Your sport interest has been successfully updated.",
      })
    } else {
      // Check if interest already exists
      const existingIndex = interests.findIndex((i) => i.sport === values.sport)
      if (existingIndex >= 0) {
        toast({
          variant: "destructive",
          title: "Already exists",
          description: "You already have this sport in your interests.",
        })
        return
      }

      // Add new interest
      setInterests([...interests, values])

      toast({
        title: "Interest added",
        description: "Your new sport interest has been successfully added.",
      })
    }

    setIsAddDialogOpen(false)
    setEditingIndex(null)
  }

  // Handle team following
  const onSubmitTeam = (values: TeamFollowingFormValues) => {
    // Check if already following
    const existingIndex = followedTeams.findIndex((t) => t.teamId === values.teamId)

    if (existingIndex >= 0) {
      // Update existing followed team
      const updatedTeams = [...followedTeams]
      updatedTeams[existingIndex] = {
        ...updatedTeams[existingIndex],
        notificationLevel: values.notificationLevel,
        following: true,
      }
      setFollowedTeams(updatedTeams)

      toast({
        title: "Team updated",
        description: "Your team following preferences have been updated.",
      })
    } else {
      // Add new followed team
      const team = allTeams.find((t) => t.id === values.teamId)
      if (team) {
        setFollowedTeams([
          ...followedTeams,
          {
            teamId: values.teamId,
            team,
            notificationLevel: values.notificationLevel,
            following: true,
          },
        ])

        toast({
          title: "Team followed",
          description: `You are now following ${team.name}.`,
        })
      }
    }

    setIsTeamDialogOpen(false)
  }

  // Toggle team following status
  const toggleTeamFollowing = (teamId: string) => {
    const updatedTeams = followedTeams.map((team) => {
      if (team.teamId === teamId) {
        return { ...team, following: !team.following }
      }
      return team
    })

    setFollowedTeams(updatedTeams)

    const team = updatedTeams.find((t) => t.teamId === teamId)
    if (team) {
      toast({
        title: team.following ? "Following resumed" : "Following paused",
        description: team.following
          ? `You will now receive updates about ${team.team.name}.`
          : `You will no longer receive updates about ${team.team.name}.`,
      })
    }
  }

  // Remove team from followed list
  const removeFollowedTeam = (teamId: string) => {
    const team = followedTeams.find((t) => t.teamId === teamId)
    const updatedTeams = followedTeams.filter((t) => t.teamId !== teamId)
    setFollowedTeams(updatedTeams)

    if (team) {
      toast({
        title: "Team unfollowed",
        description: `You are no longer following ${team.team.name}.`,
      })
    }
  }

  // Add a new position field to the form
  const addPosition = () => {
    if (!newPosition.trim()) return

    const currentPositions = form.getValues("preferredPositions") || []
    if (currentPositions.includes(newPosition.trim())) {
      toast({
        variant: "destructive",
        title: "Position already added",
        description: "This position is already in your list.",
      })
      return
    }

    form.setValue("preferredPositions", [...currentPositions, newPosition.trim()])
    setNewPosition("")
  }

  // Remove a position
  const removePosition = (position: string) => {
    const currentPositions = form.getValues("preferredPositions") || []
    form.setValue(
      "preferredPositions",
      currentPositions.filter((p) => p !== position),
    )
  }

  // Filter interests based on search and filters
  const filteredInterests = interests.filter((interest) => {
    const matchesSearch = interest.sport.toLowerCase().includes(searchQuery.toLowerCase())
    let matchesFilter = true

    if (filterLevel) {
      matchesFilter = interest.level === filterLevel
    }

    return matchesSearch && matchesFilter
  })

  // Filter teams based on search
  const filteredTeams = followedTeams.filter((teamItem) => {
    return teamItem.team.name.toLowerCase().includes(teamSearchQuery.toLowerCase())
  })

  // Get available teams for the select dropdown (excluding already followed teams)
  const availableTeams = allTeams.filter(
    (team) => !followedTeams.some((followedTeam) => followedTeam.teamId === team.id && followedTeam.following),
  )

  // Get matching events count for a sport
  const getMatchingEventsCount = (sport: Sport): number => {
    return mockSportEvents.filter((event) => event.sport === sport).length
  }

  // Get upcoming events for a team
  const getTeamUpcomingEvents = (teamId: string): number => {
    const team = allTeams.find((t) => t.id === teamId)
    if (!team || !team.eventIds) return 0

    // Count future events only
    return team.eventIds.filter((eventId) => {
      const event = mockSportEvents.find((e) => e.id === eventId)
      if (!event) return false

      const eventDate = new Date(event.date)
      return eventDate >= new Date()
    }).length
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mySports" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>My Sports</span>
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Followed Teams</span>
          </TabsTrigger>
        </TabsList>

        {/* My Sports Tab */}
        <TabsContent value="mySports" className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">My Sports Interests</h2>
              <p className="text-muted-foreground">
                Manage your sports preferences to find events that match your interests
              </p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sport Interest
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingIndex !== null ? "Edit Sport Interest" : "Add New Sport Interest"}</DialogTitle>
                  <DialogDescription>
                    {editingIndex !== null
                      ? "Update your preferences for this sport"
                      : "Select a sport and your experience level to help us match you with appropriate events"}
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="sport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sport</FormLabel>
                          <Select
                            disabled={editingIndex !== null}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a sport" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Available Sports</SelectLabel>
                                {availableSports.map((sport) => (
                                  <SelectItem key={sport} value={sport}>
                                    <span className="flex items-center">
                                      <span className="mr-2">{getSportEmoji(sport)}</span>
                                      <span>{sport.charAt(0).toUpperCase() + sport.slice(1)}</span>
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {field.value === "beginner" && "Just starting out or have minimal experience"}
                            {field.value === "intermediate" && "Have played regularly and understand the game well"}
                            {field.value === "advanced" && "Highly skilled with extensive experience"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Participation Frequency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="regular">Regular</SelectItem>
                              <SelectItem value="competitive">Competitive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {field.value === "casual" && "Occasionally, just for fun"}
                            {field.value === "regular" && "Consistently, as part of routine"}
                            {field.value === "competitive" && "Regularly participate in competitions"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Preferred Positions */}
                    <FormField
                      control={form.control}
                      name="preferredPositions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Positions (Optional)</FormLabel>
                          <div className="flex gap-2">
                            <FormControl>
                              <Input
                                placeholder="Add a position (e.g. Goalkeeper)"
                                value={newPosition}
                                onChange={(e) => setNewPosition(e.target.value)}
                              />
                            </FormControl>
                            <Button type="button" variant="secondary" size="sm" onClick={addPosition}>
                              Add
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {field.value?.map((position) => (
                              <Badge key={position} variant="secondary" className="px-2 py-1">
                                {position}
                                <button
                                  type="button"
                                  onClick={() => removePosition(position)}
                                  className="ml-2 hover:text-destructive focus:outline-none"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                          <FormDescription>Add any positions or roles you prefer to play in this sport</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Add any additional information about your experience or preferences..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This helps event organizers match you with appropriate activities
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="receiveNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Receive notifications</FormLabel>
                            <FormDescription>
                              Get notified about new events, team updates, and activity related to this sport
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="submit">{editingIndex !== null ? "Save Changes" : "Add Interest"}</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search and filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search your sports..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterLevel || "all"} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sports interests grid */}
          {filteredInterests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInterests.map((interest, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getSportEmoji(interest.sport)}</span>
                        <CardTitle>{interest.sport.charAt(0).toUpperCase() + interest.sport.slice(1)}</CardTitle>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => editInterest(interests.indexOf(interest))}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteInterest(interests.indexOf(interest))}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          {interest.level.charAt(0).toUpperCase() + interest.level.slice(1)}
                        </Badge>
                        {interest.frequency && (
                          <Badge variant="outline">
                            {interest.frequency.charAt(0).toUpperCase() + interest.frequency.slice(1)}
                          </Badge>
                        )}
                        {interest.receiveNotifications !== false && (
                          <Badge variant="outline" className="bg-primary/5">
                            <Bell className="h-3 w-3 mr-1" /> Notifications On
                          </Badge>
                        )}
                      </div>

                      {interest.preferredPositions && interest.preferredPositions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium">Preferred Positions:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {interest.preferredPositions.map((position, i) => (
                              <Badge key={i} variant="outline" className="bg-primary/5">
                                {position}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {interest.notes && (
                        <div>
                          <p className="text-sm font-medium">Notes:</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{interest.notes}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{getMatchingEventsCount(interest.sport)} matching events</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-primary">
                      View events
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              {searchQuery || filterLevel ? (
                <>
                  <h3 className="text-lg font-medium">No matching interests</h3>
                  <p className="text-muted-foreground mb-4">Try changing your search or filter criteria</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterLevel(null)
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium">No sports interests yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add your sports interests to see relevant events and connect with like-minded founders.
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Sport
                  </Button>
                </>
              )}
            </Card>
          )}

          {/* Recommendations section */}
          {interests.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Recommended Events</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockSportEvents.slice(0, 3).map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="relative h-36 bg-muted">
                      <img
                        src={event.image || `/placeholder.svg?height=144&width=400&query=${event.sport}+event`}
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-black/70 text-white hover:bg-black/80">
                          {event.sport.charAt(0).toUpperCase() + event.sport.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="flex gap-2 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Capacity</span>
                          <span>
                            {event.registered}/{event.capacity}
                          </span>
                        </div>
                        <Progress value={(event.registered / event.capacity) * 100} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <div className="flex items-center text-sm">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>By {event.organizer.name}</span>
                      </div>
                      <Button size="sm" variant={event.isRegistered ? "secondary" : "default"}>
                        {event.isRegistered ? "Registered" : "Register"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">My Teams</h2>
              <p className="text-muted-foreground">Follow teams to stay updated on their activities and events</p>
            </div>

            <Dialog open={isTeamDialogOpen} onOpenChange={setIsTeamDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Follow Team
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Follow a Team</DialogTitle>
                  <DialogDescription>
                    Select a team to follow and receive updates about their events and activities
                  </DialogDescription>
                </DialogHeader>

                <Form {...teamForm}>
                  <form onSubmit={teamForm.handleSubmit(onSubmitTeam)} className="space-y-4 py-4">
                    <FormField
                      control={teamForm.control}
                      name="teamId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Team</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a team" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableTeams.length > 0 ? (
                                availableTeams.map((team) => (
                                  <SelectItem key={team.id} value={team.id}>
                                    <div className="flex items-center">
                                      <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={team.logo || "/placeholder.svg"} alt={team.name} />
                                        <AvatarFallback>{getSportEmoji(team.sport)}</AvatarFallback>
                                      </Avatar>
                                      <span>{team.name}</span>
                                    </div>
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="no-teams" disabled>
                                  No available teams to follow
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={teamForm.control}
                      name="notificationLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notification Preferences</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select notification level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all">
                                <div className="flex items-center">
                                  <Bell className="h-4 w-4 mr-2" />
                                  <span>All updates</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="important">
                                <div className="flex items-center">
                                  <Bell className="h-4 w-4 mr-2" />
                                  <span>Important updates only</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="none">
                                <div className="flex items-center">
                                  <BellOff className="h-4 w-4 mr-2" />
                                  <span>No notifications</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose how often you want to receive notifications about this team
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="submit" disabled={availableTeams.length === 0}>
                        Follow Team
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search teams */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search followed teams..."
              className="pl-9"
              value={teamSearchQuery}
              onChange={(e) => setTeamSearchQuery(e.target.value)}
            />
          </div>

          {/* Followed teams list */}
          {filteredTeams.length > 0 ? (
            <div className="space-y-4">
              {filteredTeams.map((teamItem) => (
                <Card
                  key={teamItem.teamId}
                  className={cn("overflow-hidden transition-all", !teamItem.following && "opacity-75")}
                >
                  <CardHeader className="p-4 flex flex-row items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={teamItem.team.logo || "/placeholder.svg"} alt={teamItem.team.name} />
                      <AvatarFallback>{getSportEmoji(teamItem.team.sport)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{teamItem.team.name}</CardTitle>
                        {teamItem.following && (
                          <Badge variant="outline" className="bg-primary/5">
                            <Star className="h-3 w-3 mr-1 fill-yellow-500 text-yellow-500" />
                            Following
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <span>{getSportEmoji(teamItem.team.sport)}</span>
                        <span>{teamItem.team.sport.charAt(0).toUpperCase() + teamItem.team.sport.slice(1)}</span>
                        <span>•</span>
                        <span>{teamItem.team.members.length} Members</span>
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => toggleTeamFollowing(teamItem.teamId)}>
                        {teamItem.following ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                        <span className="sr-only">{teamItem.following ? "Pause following" : "Resume following"}</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeFollowedTeam(teamItem.teamId)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Unfollow</span>
                      </Button>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Team captain */}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-2">Team Captain</h4>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={teamItem.team.captain.avatar || "/placeholder.svg"}
                              alt={teamItem.team.captain.name}
                            />
                            <AvatarFallback>{teamItem.team.captain.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{teamItem.team.captain.name}</p>
                          </div>
                        </div>
                      </div>

                      {/* Team stats */}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-2">Team Stats</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-muted rounded-md p-2">
                            <p className="text-xs text-muted-foreground">Members</p>
                            <p className="text-lg font-medium">{teamItem.team.members.length}</p>
                          </div>
                          <div className="bg-muted rounded-md p-2">
                            <p className="text-xs text-muted-foreground">Upcoming Events</p>
                            <p className="text-lg font-medium">{getTeamUpcomingEvents(teamItem.teamId)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Notification settings */}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-2">Notification Settings</h4>
                        <Select
                          defaultValue={teamItem.notificationLevel}
                          onValueChange={(value) => {
                            const updatedTeams = followedTeams.map((team) => {
                              if (team.teamId === teamItem.teamId) {
                                return {
                                  ...team,
                                  notificationLevel: value as "all" | "important" | "none",
                                }
                              }
                              return team
                            })
                            setFollowedTeams(updatedTeams)
                          }}
                          disabled={!teamItem.following}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Notification level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All updates</SelectItem>
                            <SelectItem value="important">Important updates only</SelectItem>
                            <SelectItem value="none">No notifications</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Team description if available */}
                    {teamItem.team.description && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-1">About</h4>
                        <p className="text-sm text-muted-foreground">{teamItem.team.description}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between border-t">
                    <Button variant="outline" size="sm">
                      View Members
                    </Button>
                    <Button size="sm">View Events</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              {teamSearchQuery ? (
                <>
                  <h3 className="text-lg font-medium">No matching teams</h3>
                  <p className="text-muted-foreground mb-4">Try changing your search criteria</p>
                  <Button variant="outline" onClick={() => setTeamSearchQuery("")}>
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium">No teams followed yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Follow teams to stay updated on their activities and events
                  </p>
                  <Button onClick={() => setIsTeamDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Follow Your First Team
                  </Button>
                </>
              )}
            </Card>
          )}

          {/* Discover teams section */}
          {followedTeams.length > 0 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Discover More Teams</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {allTeams
                  .filter((team) => !followedTeams.some((ft) => ft.teamId === team.id))
                  .slice(0, 3)
                  .map((team) => (
                    <Card key={team.id} className="overflow-hidden">
                      <CardHeader className="pb-2 flex flex-row items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={team.logo || "/placeholder.svg"} alt={team.name} />
                          <AvatarFallback>{getSportEmoji(team.sport)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{team.name}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <span>{getSportEmoji(team.sport)}</span>
                            <span>{team.sport.charAt(0).toUpperCase() + team.sport.slice(1)}</span>
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="flex gap-2 flex-wrap">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-3.5 w-3.5 mr-1" />
                            <span>{team.members.length} members</span>
                          </div>
                          {team.eventIds && team.eventIds.length > 0 && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              <span>{team.eventIds.length} events</span>
                            </div>
                          )}
                        </div>
                        {team.description && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{team.description}</p>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            teamForm.reset({
                              teamId: team.id,
                              notificationLevel: "all",
                            })
                            setIsTeamDialogOpen(true)
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Follow Team
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
