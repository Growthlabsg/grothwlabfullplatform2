"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, X, Check, ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RecipientSelectorProps {
  onSelect: (recipientId: string, recipientType: "individual" | "group") => void
  onCancel: () => void
}

// Mock contacts data
const mockContacts = [
  {
    id: "user-1",
    name: "Sarah Chen",
    avatar: "/abstract-geometric-shapes.png",
    email: "sarah.chen@example.com",
    department: "Design",
    isOnline: true,
  },
  {
    id: "user-2",
    name: "Alex Wong",
    avatar: "/abstract-geometric-aw.png",
    email: "alex.wong@example.com",
    department: "Engineering",
    isOnline: false,
  },
  {
    id: "user-3",
    name: "Mei Lin",
    avatar: "/machine-learning-concept.png",
    email: "mei.lin@example.com",
    department: "Product",
    isOnline: true,
  },
  {
    id: "user-4",
    name: "David Lee",
    avatar: "/placeholder.svg?height=40&width=40&query=DL",
    email: "david.lee@example.com",
    department: "Marketing",
    isOnline: false,
  },
  {
    id: "user-5",
    name: "Lisa Park",
    avatar: "/placeholder.svg?height=40&width=40&query=LP",
    email: "lisa.park@example.com",
    department: "Sales",
    isOnline: true,
  },
]

// Mock groups data
const mockGroups = [
  {
    id: "group-1",
    name: "Product Team",
    avatar: "/physical-therapy-session.png",
    memberCount: 8,
  },
  {
    id: "group-2",
    name: "Marketing Strategy",
    avatar: "/abstract-ms-flow.png",
    memberCount: 5,
  },
  {
    id: "group-3",
    name: "Design Review",
    avatar: "/placeholder.svg?height=40&width=40&query=DR",
    memberCount: 6,
  },
]

export function RecipientSelector({ onSelect, onCancel }: RecipientSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<"individual" | "group">("individual")
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [groupName, setGroupName] = useState("")

  // Filter contacts based on search query
  const filteredContacts = mockContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter groups based on search query
  const filteredGroups = mockGroups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Toggle contact selection
  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  // Handle individual chat selection
  const handleIndividualSelect = (contactId: string) => {
    onSelect(contactId, "individual")
  }

  // Handle group chat selection
  const handleGroupSelect = (groupId: string) => {
    onSelect(groupId, "group")
  }

  // Handle creating a new group
  const handleCreateGroup = () => {
    if (selectedContacts.length === 0) return

    if (isCreatingGroup) {
      // In a real app, this would create the group on the server
      console.log("Creating group:", {
        name: groupName || "New Group",
        members: selectedContacts,
      })

      // For now, just simulate creating a group
      onSelect("new-group", "group")
    } else {
      setIsCreatingGroup(true)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          {isCreatingGroup && (
            <Button variant="ghost" size="icon" onClick={() => setIsCreatingGroup(false)} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          )}
          <h2 className="text-xl font-bold">{isCreatingGroup ? "Create Group" : "New Conversation"}</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
          <span className="sr-only">Cancel</span>
        </Button>
      </div>

      {isCreatingGroup ? (
        <div className="p-4">
          <div className="mb-4">
            <label htmlFor="group-name" className="block text-sm font-medium mb-1">
              Group Name
            </label>
            <Input
              id="group-name"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Selected Contacts ({selectedContacts.length})</label>
            <div className="flex flex-wrap gap-2">
              {selectedContacts.map((contactId) => {
                const contact = mockContacts.find((c) => c.id === contactId)
                if (!contact) return null

                return (
                  <Badge key={contactId} variant="secondary" className="flex items-center gap-1 pl-1">
                    <Avatar className="h-4 w-4">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{contact.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 p-0 hover:bg-transparent"
                      onClick={() => toggleContactSelection(contactId)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {contact.name}</span>
                    </Button>
                  </Badge>
                )
              })}
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted transition-colors",
                    selectedContacts.includes(contact.id) ? "bg-muted" : "",
                  )}
                  onClick={() => toggleContactSelection(contact.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-5 w-5 rounded-full border">
                    {selectedContacts.includes(contact.id) && <Check className="h-3 w-3" />}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 flex justify-end">
            <Button onClick={handleCreateGroup} disabled={selectedContacts.length === 0}>
              Create Group
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search contacts or groups..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs
              defaultValue="individual"
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as "individual" | "group")}
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="group">Groups</TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="space-y-4">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-2">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleIndividualSelect(contact.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                              <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            {contact.isOnline && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedContacts([])}>
                    Clear Selection
                  </Button>
                  <Button onClick={() => setIsCreatingGroup(true)} disabled={selectedContacts.length === 0}>
                    <Users className="h-4 w-4 mr-2" />
                    Create Group Chat
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="group" className="space-y-4">
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-2">
                    {filteredGroups.map((group) => (
                      <div
                        key={group.id}
                        className="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted transition-colors"
                        onClick={() => handleGroupSelect(group.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={group.avatar || "/placeholder.svg"} alt={group.name} />
                            <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{group.name}</p>
                            <p className="text-sm text-muted-foreground">{group.memberCount} members</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Button onClick={() => setIsCreatingGroup(true)}>
                  <Users className="h-4 w-4 mr-2" />
                  Create New Group
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  )
}
