"use client"

import { useState, useEffect } from "react"
import { Star, Settings, Users, Phone, MessageSquare, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarSearch } from "../communication/sidebar-search"
import { FavoritesSection } from "../communication/favorites-section"
// Legacy chat button hidden (kept source, not rendered)
// import { CommunicationHubButton } from "../communication/communication-hub-button"
import { CommunicationSettingsDialog } from "../communication/communication-settings-dialog"
import { CreateGroupDialog } from "../communication/create-group-dialog"

export function EnhancedSidebar() {
  const [activeTab, setActiveTab] = useState("chats")
  const [showSettings, setShowSettings] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredItems, setFilteredItems] = useState<any[]>([])

  // Mock data for demonstration
  const chats = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&query=JD",
      lastMessage: "Hey, how are you?",
      time: "10:30 AM",
      unread: 2,
      favorite: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&query=JS",
      lastMessage: "Let's meet tomorrow",
      time: "Yesterday",
      unread: 0,
      favorite: true,
    },
    {
      id: "3",
      name: "Startup Founders",
      avatar: "/placeholder.svg?height=40&width=40&query=SF",
      lastMessage: "Alice: I found a great investor!",
      time: "2d ago",
      unread: 5,
      isGroup: true,
      favorite: false,
    },
    {
      id: "4",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40&query=MJ",
      lastMessage: "Thanks for the introduction",
      time: "3d ago",
      unread: 0,
      favorite: false,
    },
    {
      id: "5",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&query=SW",
      lastMessage: "The pitch deck looks great",
      time: "1w ago",
      unread: 0,
      favorite: false,
    },
  ]

  const contacts = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&query=JD",
      role: "Founder",
      company: "TechStart",
      favorite: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&query=JS",
      role: "Investor",
      company: "VC Partners",
      favorite: true,
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40&query=MJ",
      role: "Mentor",
      company: "Growth Advisors",
      favorite: false,
    },
    {
      id: "4",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&query=SW",
      role: "Founder",
      company: "HealthTech",
      favorite: false,
    },
    {
      id: "5",
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40&query=DC",
      role: "Investor",
      company: "Angel Group",
      favorite: false,
    },
  ]

  const calls = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&query=JD",
      time: "10:30 AM",
      type: "incoming",
      duration: "15m",
      status: "completed",
      favorite: true,
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&query=JS",
      time: "Yesterday",
      type: "outgoing",
      duration: "30m",
      status: "completed",
      favorite: true,
    },
    {
      id: "3",
      name: "Startup Founders",
      avatar: "/placeholder.svg?height=40&width=40&query=SF",
      time: "2d ago",
      type: "incoming",
      duration: "45m",
      status: "missed",
      isGroup: true,
      favorite: false,
    },
    {
      id: "4",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40&query=MJ",
      time: "3d ago",
      type: "outgoing",
      duration: "10m",
      status: "completed",
      favorite: false,
    },
    {
      id: "5",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&query=SW",
      time: "1w ago",
      type: "incoming",
      duration: "20m",
      status: "completed",
      favorite: false,
    },
  ]

  useEffect(() => {
    // Filter items based on search query and active tab
    if (searchQuery) {
      switch (activeTab) {
        case "chats":
          setFilteredItems(
            chats.filter(
              (chat) =>
                chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          )
          break
        case "contacts":
          setFilteredItems(
            contacts.filter(
              (contact) =>
                contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
            ),
          )
          break
        case "calls":
          setFilteredItems(calls.filter((call) => call.name.toLowerCase().includes(searchQuery.toLowerCase())))
          break
        case "favorites":
          const favoriteChats = chats.filter(
            (chat) =>
              chat.favorite &&
              (chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())),
          )
          const favoriteContacts = contacts.filter(
            (contact) =>
              contact.favorite &&
              (contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                contact.role.toLowerCase().includes(searchQuery.toLowerCase())),
          )
          const favoriteCalls = calls.filter(
            (call) => call.favorite && call.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          setFilteredItems([...favoriteChats, ...favoriteContacts, ...favoriteCalls])
          break
      }
    } else {
      switch (activeTab) {
        case "chats":
          setFilteredItems(chats)
          break
        case "contacts":
          setFilteredItems(contacts)
          break
        case "calls":
          setFilteredItems(calls)
          break
        case "favorites":
          const favoriteChats = chats.filter((chat) => chat.favorite)
          const favoriteContacts = contacts.filter((contact) => contact.favorite)
          const favoriteCalls = calls.filter((call) => call.favorite)
          setFilteredItems([...favoriteChats, ...favoriteContacts, ...favoriteCalls])
          break
      }
    }
  }, [searchQuery, activeTab])

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Communications</h2>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowCreateGroup(true)}>
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <SidebarSearch onSearch={setSearchQuery} />
      </div>

      <Tabs defaultValue="chats" className="flex-1 flex flex-col" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 px-4 py-2">
          <TabsTrigger value="chats">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chats
          </TabsTrigger>
          <TabsTrigger value="contacts">
            <Users className="h-4 w-4 mr-2" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="calls">
            <Phone className="h-4 w-4 mr-2" />
            Calls
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Star className="h-4 w-4 mr-2" />
            Favorites
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="chats" className="m-0">
            <div className="p-4 space-y-2">
              {filteredItems.map((chat) => (
                <div key={chat.id} className="flex items-center p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                    <AvatarFallback>
                      {chat.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">
                        {chat.name}
                        {chat.isGroup && (
                          <Badge variant="outline" className="ml-2">
                            Group
                          </Badge>
                        )}
                      </p>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && <Badge className="ml-2">{chat.unread}</Badge>}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="m-0">
            <div className="p-4 space-y-2">
              {filteredItems.map((contact) => (
                <div key={contact.id} className="flex items-center p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contact.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {contact.role} at {contact.company}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calls" className="m-0">
            <div className="p-4 space-y-2">
              {filteredItems.map((call) => (
                <div key={call.id} className="flex items-center p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={call.avatar || "/placeholder.svg"} alt={call.name} />
                    <AvatarFallback>
                      {call.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">
                        {call.name}
                        {call.isGroup && (
                          <Badge variant="outline" className="ml-2">
                            Group
                          </Badge>
                        )}
                      </p>
                      <span className="text-xs text-muted-foreground">{call.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {call.type === "incoming" ? (
                        <Phone className="h-3 w-3 mr-1 rotate-90" />
                      ) : (
                        <Phone className="h-3 w-3 mr-1 -rotate-90" />
                      )}
                      <span className={call.status === "missed" ? "text-red-500" : ""}>
                        {call.status === "missed" ? "Missed" : `${call.duration} call`}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="m-0">
            <FavoritesSection
              favoriteChats={chats.filter((chat) => chat.favorite)}
              favoriteContacts={contacts.filter((contact) => contact.favorite)}
              favoriteCalls={calls.filter((call) => call.favorite)}
              filteredItems={filteredItems}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>

      {/* Floating action button for legacy communication hub hidden */}
      {/* <CommunicationHubButton /> */}

      {/* Dialogs */}
      <CommunicationSettingsDialog open={showSettings} onOpenChange={setShowSettings} />
      <CreateGroupDialog open={showCreateGroup} onOpenChange={setShowCreateGroup} />
    </div>
  )
}
