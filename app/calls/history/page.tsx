"use client"

import { useEffect, useState } from "react"
import { Phone, VideoIcon, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { CallHistory } from "@/components/calls/call-history"

interface CallHistoryItem {
  id: string
  contactName: string
  contactAvatar?: string
  type: "incoming" | "outgoing" | "missed" | "video"
  timestamp: string
  date: string
  duration?: string
  isFavorite?: boolean
}

// Mock data for call history
const mockCallHistory = {
  incoming: [
    {
      id: "in1",
      contactName: "Jane Cooper",
      contactAvatar: "/confident-professional.png",
      timestamp: new Date(2023, 5, 15, 14, 30),
      duration: "12:45",
      status: "completed",
      type: "audio",
    },
    {
      id: "in2",
      contactName: "Robert Fox",
      contactAvatar: "/thoughtful-artist.png",
      timestamp: new Date(2023, 5, 14, 11, 15),
      duration: "08:22",
      status: "completed",
      type: "video",
    },
    {
      id: "in3",
      contactName: "Esther Howard",
      contactAvatar: "/diverse-office-admin.png",
      timestamp: new Date(2023, 5, 13, 16, 45),
      duration: "03:51",
      status: "missed",
      type: "audio",
    },
    {
      id: "in4",
      contactName: "Leslie Alexander",
      contactAvatar: "/professional-connections.png",
      timestamp: new Date(2023, 5, 12, 9, 30),
      duration: "15:07",
      status: "completed",
      type: "video",
    },
  ],
  outgoing: [
    {
      id: "out1",
      contactName: "Cameron Williamson",
      contactAvatar: "/vibrant-startup-gathering.png",
      timestamp: new Date(2023, 5, 15, 10, 0),
      duration: "05:33",
      status: "completed",
      type: "audio",
    },
    {
      id: "out2",
      contactName: "Brooklyn Simmons",
      contactAvatar: "/diverse-professional-profiles.png",
      timestamp: new Date(2023, 5, 14, 15, 45),
      duration: "21:18",
      status: "completed",
      type: "video",
    },
    {
      id: "out3",
      contactName: "Dianne Russell",
      contactAvatar: "/confident-professional.png",
      timestamp: new Date(2023, 5, 13, 12, 30),
      duration: "00:45",
      status: "no-answer",
      type: "audio",
    },
  ],
  missed: [
    {
      id: "miss1",
      contactName: "Esther Howard",
      contactAvatar: "/diverse-office-admin.png",
      timestamp: new Date(2023, 5, 13, 16, 45),
      status: "missed",
      type: "audio",
    },
    {
      id: "miss2",
      contactName: "Dianne Russell",
      contactAvatar: "/confident-professional.png",
      timestamp: new Date(2023, 5, 11, 8, 15),
      status: "missed",
      type: "video",
    },
    {
      id: "miss3",
      contactName: "Jenny Wilson",
      contactAvatar: "/professional-connections.png",
      timestamp: new Date(2023, 5, 10, 17, 30),
      status: "missed",
      type: "audio",
    },
  ],
}

export default function CallHistoryPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all-time")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedCalls, setSelectedCalls] = useState<string[]>([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [callHistory, setCallHistory] = useState(mockCallHistory)

  useEffect(() => {
    // Simulate API call to fetch call history
    const timer = setTimeout(() => {
      setCallHistory(mockCallHistory)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Filter calls based on search query, tab, and time filter
  const filteredCalls = [...callHistory.incoming, ...callHistory.outgoing, ...callHistory.missed].filter(
    (call: any) => {
      // Search filter
      const matchesSearch = call.contactName.toLowerCase().includes(searchQuery.toLowerCase())

      // Tab filter
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "incoming" && call.type === "incoming") ||
        (activeTab === "outgoing" && call.type === "outgoing") ||
        (activeTab === "missed" && call.type === "missed") ||
        (activeTab === "video" && call.type === "video")

      // Time filter (simplified for demo)
      const matchesTimeFilter = timeFilter === "all-time" || true

      return matchesSearch && matchesTab && matchesTimeFilter
    },
  )

  // Group calls by date
  const groupedCalls = filteredCalls.reduce<Record<string, any[]>>((groups, call) => {
    const date = call.timestamp.toLocaleDateString()
    if (!groups[date]) {
      groups[date] = []
    }
      groups[date].push(call)
    return groups
  }, {})

  // Toggle call selection
  const toggleCallSelection = (callId: string) => {
    if (selectedCalls.includes(callId)) {
      setSelectedCalls(selectedCalls.filter((id) => id !== callId))
    } else {
      setSelectedCalls([...selectedCalls, callId])
    }
  }

  // Toggle favorite status
  const toggleFavorite = (callId: string) => {
    // In a real app, this would call an API to update the favorite status
    toast({
      title: "Favorite updated",
      description: "Call has been added to favorites",
    })
  }

  // Delete selected calls
  const deleteSelectedCalls = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Calls deleted",
        description: `${selectedCalls.length} call(s) have been deleted from history`,
      })

      // Reset selection and close dialog
      setSelectedCalls([])
      setShowDeleteDialog(false)
    } catch (error) {
      toast({
        title: "Failed to delete calls",
        description: "There was an error deleting the calls. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Get call type icon and color
  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <Phone className="h-4 w-4 text-green-500 rotate-90" />
      case "outgoing":
        return <Phone className="h-4 w-4 text-blue-500 rotate-[135deg]" />
      case "missed":
        return <Phone className="h-4 w-4 text-red-500 rotate-90" />
      case "video":
        return <VideoIcon className="h-4 w-4 text-purple-500" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  // Get call type label
  const getCallTypeLabel = (type: string) => {
    switch (type) {
      case "incoming":
        return "Incoming"
      case "outgoing":
        return "Outgoing"
      case "missed":
        return "Missed"
      case "video":
        return "Video"
      default:
        return type
    }
  }

  // Get call type badge variant
  const getCallTypeBadgeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "incoming":
        return "default"
      case "outgoing":
        return "secondary"
      case "missed":
        return "destructive"
      case "video":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Call History</h1>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="all">All Calls</TabsTrigger>
          <TabsTrigger value="incoming">Incoming</TabsTrigger>
          <TabsTrigger value="outgoing">Outgoing</TabsTrigger>
          <TabsTrigger value="missed">Missed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Calls</CardTitle>
              <CardDescription>View all your recent calls in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <CallHistory
                calls={[...callHistory.incoming, ...callHistory.outgoing, ...callHistory.missed].map(call => ({
                  ...call,
                  status: call.status === "missed" ? "missed" : "completed"
                })).sort(
                  (a: any, b: any) => b.timestamp.getTime() - a.timestamp.getTime(),
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incoming">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Calls</CardTitle>
              <CardDescription>Calls you've received</CardDescription>
            </CardHeader>
            <CardContent>
              <CallHistory calls={callHistory.incoming} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outgoing">
          <Card>
            <CardHeader>
              <CardTitle>Outgoing Calls</CardTitle>
              <CardDescription>Calls you've made</CardDescription>
            </CardHeader>
            <CardContent>
              <CallHistory calls={callHistory.outgoing} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missed">
          <Card>
            <CardHeader>
              <CardTitle>Missed Calls</CardTitle>
              <CardDescription>Calls you didn't answer</CardDescription>
            </CardHeader>
            <CardContent>
              <CallHistory calls={callHistory.missed} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
