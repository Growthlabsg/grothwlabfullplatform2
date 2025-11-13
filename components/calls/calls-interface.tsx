"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Phone, Video, Clock, User, Search, Plus, History } from "lucide-react"
import { VideoCallModal } from "@/components/video-call/video-call-modal"
import { AudioCallModal } from "@/components/calls/audio-call-modal"

// Sample data for recent calls
const recentCalls = [
  {
    id: "call1",
    type: "video",
    participants: [
      {
        id: "user1",
        name: "Sarah Wong",
        avatar: "/abstract-southwest.png",
        role: "Investor",
      },
    ],
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    duration: 45, // minutes
    status: "completed",
  },
  {
    id: "call2",
    type: "audio",
    participants: [
      {
        id: "user2",
        name: "David Kumar",
        avatar: "/abstract-geometric-dk.png",
        role: "Mentor",
      },
    ],
    timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
    duration: 30, // minutes
    status: "completed",
  },
  {
    id: "call3",
    type: "video",
    participants: [
      {
        id: "user3",
        name: "Emily Nguyen",
        avatar: "/ancient-forest-path.png",
        role: "Founder",
      },
      {
        id: "user4",
        name: "Michael Zhang",
        avatar: "/Abstract Monochromatic Zenith.png",
        role: "Investor",
      },
    ],
    timestamp: new Date(Date.now() - 3600000 * 48), // 2 days ago
    duration: 60, // minutes
    status: "completed",
  },
]

// Sample data for contacts
const contacts = [
  {
    id: "user1",
    name: "Sarah Wong",
    avatar: "/abstract-southwest.png",
    role: "Investor",
    company: "Horizon Ventures",
    isOnline: true,
  },
  {
    id: "user2",
    name: "David Kumar",
    avatar: "/abstract-geometric-dk.png",
    role: "Mentor",
    company: "TechStars",
    isOnline: false,
  },
  {
    id: "user3",
    name: "Emily Nguyen",
    avatar: "/ancient-forest-path.png",
    role: "Founder",
    company: "EduSmart",
    isOnline: true,
  },
  {
    id: "user4",
    name: "Michael Zhang",
    avatar: "/Abstract Monochromatic Zenith.png",
    role: "Investor",
    company: "Blockchain Capital",
    isOnline: true,
  },
  {
    id: "user5",
    name: "Lisa Lim",
    avatar: "/abstract-geometric-ll.png",
    role: "Mentor",
    company: "MediHealth AI",
    isOnline: false,
  },
]

export function CallsInterface() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false)
  const [isAudioCallModalOpen, setIsAudioCallModalOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<any>(null)

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const initiateVideoCall = (contact: any) => {
    setSelectedContact(contact)
    setIsVideoCallModalOpen(true)
  }

  const initiateAudioCall = (contact: any) => {
    setSelectedContact(contact)
    setIsAudioCallModalOpen(true)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold">Calls</h1>
        <p className="text-muted-foreground">Make audio and video calls with your connections</p>
      </div>

      <Tabs defaultValue="contacts" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="w-full">
            <TabsTrigger value="contacts" className="flex-1">
              <User className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex-1">
              <History className="h-4 w-4 mr-2" />
              Recent Calls
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search contacts..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="contacts" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Badge variant={contact.isOnline ? "default" : "outline"}>
                        {contact.isOnline ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription>
                      {contact.role} at {contact.company}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="icon" onClick={() => initiateAudioCall(contact)}>
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => initiateVideoCall(contact)}>
                      <Video className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="recent" className="flex-1 mt-0">
          <ScrollArea className="h-[calc(100vh-220px)]">
            <div className="space-y-4 p-4">
              {recentCalls.map((call) => (
                <Card key={call.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {call.type === "video" ? (
                          <Video className="h-5 w-5 mr-2 text-blue-500" />
                        ) : (
                          <Phone className="h-5 w-5 mr-2 text-green-500" />
                        )}
                        <div>
                          <h3 className="font-medium">
                            {call.participants.length > 1
                              ? `Group Call (${call.participants.length})`
                              : (call.participants[0] ? call.participants[0].name : undefined)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {call.timestamp.toLocaleDateString()} at{" "}
                            {call.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{call.duration} min</span>
                      </div>
                    </div>

                    {call.participants.length > 1 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-1">Participants:</p>
                        <div className="flex flex-wrap gap-2">
                          {call.participants.map((participant) => (
                            <div key={participant.id} className="flex items-center">
                              <Avatar className="h-6 w-6 mr-1">
                                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                                <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="text-xs">{participant.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end mt-4 gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Again
                      </Button>
                      {call.type === "video" && (
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Video Call
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t">
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          New Call
        </Button>
      </div>

      {/* Video Call Modal */}
      {selectedContact && (
        <VideoCallModal
          isOpen={isVideoCallModalOpen}
          onClose={() => setIsVideoCallModalOpen(false)}
          callId={`video-${Date.now()}`}
          participants={[
            {
              id: selectedContact.id,
              name: selectedContact.name,
              avatar: selectedContact.avatar,
              role: selectedContact.role,
            },
          ]}
        />
      )}

      {/* Audio Call Modal */}
      {selectedContact && (
        <AudioCallModal
          isOpen={isAudioCallModalOpen}
          onClose={() => setIsAudioCallModalOpen(false)}
          callId={`audio-${Date.now()}`}
          participant={{
            id: selectedContact.id,
            name: selectedContact.name,
            avatar: selectedContact.avatar,
            role: selectedContact.role,
          }}
        />
      )}
    </div>
  )
}
