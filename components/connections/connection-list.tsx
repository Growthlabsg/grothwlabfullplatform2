"use client"

import { useState, useEffect } from "react"
import { type Connection, connectionService } from "@/lib/connection-service"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Filter, MessageSquare, MoreHorizontal } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ConnectionListProps {
  userId: string
}

export function ConnectionList({ userId }: ConnectionListProps) {
  const [connections, setConnections] = useState<Connection[]>([])
  const [filteredConnections, setFilteredConnections] = useState<Connection[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await connectionService.getConnections(userId)
        setConnections(data)
        setFilteredConnections(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching connections:", error)
        toast({
          title: "Error",
          description: "Failed to load connections. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    }

    fetchConnections()
  }, [userId, toast])

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

  const handleRemoveConnection = async (connectionId: string) => {
    try {
      await connectionService.removeConnection(connectionId)
      setConnections((prev) => prev.filter((conn) => conn.id !== connectionId))
      setFilteredConnections((prev) => prev.filter((conn) => conn.id !== connectionId))
      toast({
        title: "Connection removed",
        description: "The connection has been removed from your network.",
      })
    } catch (error) {
      console.error("Error removing connection:", error)
      toast({
        title: "Error",
        description: "Failed to remove connection. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleMessage = (connectionId: string) => {
    // In a real app, this would open a chat with the connection
    toast({
      title: "Message",
      description: "Opening chat with this connection.",
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-full" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="online">
            Online
            <Badge variant="secondary" className="ml-2">
              {connections.filter((c) => c.isOnline).length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {filteredConnections.length === 0 ? (
            <div className="text-center py-8">
              <UserPlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
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
          ) : (
            <div className="space-y-3">
              {filteredConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
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
                      <h4 className="font-medium text-sm">{connection.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {connection.role} at {connection.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleMessage(connection.id)}>
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Message</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Add to Group</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleRemoveConnection(connection.id)}
                        >
                          Remove Connection
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-4">
          {filteredConnections
            .sort((a, b) => new Date(b.connectionDate).getTime() - new Date(a.connectionDate).getTime())
            .slice(0, 5)
            .map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors mb-3"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={connection.avatar || "/placeholder.svg"} alt={connection.name} />
                    <AvatarFallback>
                      {connection.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-sm">{connection.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {connection.role} at {connection.company}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Connected {new Date(connection.connectionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleMessage(connection.id)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            ))}
        </TabsContent>

        <TabsContent value="online" className="mt-4">
          {filteredConnections
            .filter((connection) => connection.isOnline)
            .map((connection) => (
              <div
                key={connection.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors mb-3"
              >
                <div className="flex items-center space-x-3">
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
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{connection.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {connection.role} at {connection.company}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleMessage(connection.id)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
