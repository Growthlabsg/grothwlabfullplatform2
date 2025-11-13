"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, UserPlus, Users, MessageSquare, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { connectionService } from "@/lib/connection-service"
import type { Connection } from "@/lib/connection-service"
import { ConnectionRequestsDialog } from "@/components/connection/connection-requests-dialog"
import { QRCodeScannerDialog } from "@/components/connection/qr-code-scanner-dialog"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState("connections")
  const [connections, setConnections] = useState<Connection[]>([])
  const [filteredConnections, setFilteredConnections] = useState<Connection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await connectionService.getConnections("current-user")
        setConnections(data)
        setFilteredConnections(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching connections:", error)
        toast({
          title: "Error",
          description: "Failed to load connections. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchConnections()
  }, [toast])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredConnections(connections)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = connections.filter(
        (conn) =>
          conn.name.toLowerCase().includes(query) ||
          conn.role.toLowerCase().includes(query) ||
          conn.company.toLowerCase().includes(query),
      )
      setFilteredConnections(filtered)
    }
  }, [searchQuery, connections])

  const handleQRScan = (userId: string) => {
    router.push(`/connect/${userId}`)
  }

  // Render content based on tab
  const renderTabContent = () => {
    if (activeTab === "connections") {
      if (loading) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        )
      }

      if (filteredConnections.length === 0) {
        return (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No connections found</h3>
            <p className="text-muted-foreground mt-1">
              {searchQuery ? "Try a different search term" : "Start connecting with other users"}
            </p>
            {!searchQuery && (
              <Button className="mt-4">
                <UserPlus className="mr-2 h-4 w-4" />
                Find connections
              </Button>
            )}
          </div>
        )
      }

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredConnections.map((connection) => (
            <div
              key={connection.id}
              className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => router.push(`/profile/${connection.id}`)}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                  <AvatarFallback>
                    {connection.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {connection.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                )}
              </div>
              <div>
                <h4 className="font-medium">{connection.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {connection.role} at {connection.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (activeTab === "pending") {
      return (
        <div className="text-center py-12">
          <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No pending requests</h3>
          <p className="text-muted-foreground mt-1">You don't have any pending connection requests</p>
        </div>
      )
    }

    if (activeTab === "suggestions") {
      const suggestions = [
        {
          id: "1",
          name: "Sarah Chen",
          role: "Product Manager",
          company: "TechCorp",
          avatar: "/placeholder.svg?height=40&width=40&text=SC",
          mutualConnections: 3,
          interests: ["Product Management", "Startups", "AI"],
          reason: "Based on your interest in product development",
        },
        {
          id: "2",
          name: "Michael Rodriguez",
          role: "Software Engineer",
          company: "InnovateLab",
          avatar: "/placeholder.svg?height=40&width=40&text=MR",
          mutualConnections: 2,
          interests: ["React", "TypeScript", "Open Source"],
          reason: "Similar technical background",
        },
        {
          id: "3",
          name: "Emily Watson",
          role: "Marketing Director",
          company: "GrowthFirst",
          avatar: "/placeholder.svg?height=40&width=40&text=EW",
          mutualConnections: 5,
          interests: ["Digital Marketing", "Growth Hacking", "Analytics"],
          reason: "Based on your marketing interests",
        },
        {
          id: "4",
          name: "David Kim",
          role: "Investment Associate",
          company: "Venture Capital Partners",
          avatar: "/placeholder.svg?height=40&width=40&text=DK",
          mutualConnections: 1,
          interests: ["Venture Capital", "Startups", "Fintech"],
          reason: "Based on your startup focus",
        },
      ]

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Suggested Connections</h3>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
          
          <div className="grid gap-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                    <AvatarFallback>
                      {suggestion.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{suggestion.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.role} at {suggestion.company}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {suggestion.mutualConnections} mutual connections • {suggestion.reason}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {suggestion.interests.slice(0, 2).map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Network</h1>
          <p className="text-muted-foreground">Manage your professional connections</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ConnectionRequestsDialog />
          <Button variant="outline" onClick={() => setQrDialogOpen(true)}>
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Find Connections
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="connections" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="connections">
                <Users className="mr-2 h-4 w-4" />
                Connections
              </TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              placeholder="Search connections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>

          {/* Render content based on active tab */}
          {renderTabContent()}
        </CardContent>
      </Card>

      <QRCodeScannerDialog open={qrDialogOpen} onOpenChange={setQrDialogOpen} onConnectionRequest={handleQRScan} />
    </div>
  )
}
