"use client"

import { useState } from "react"
import { Users, X, Plus, Search } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface CreateGroupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGroupDialog({ open, onOpenChange }: CreateGroupDialogProps) {
  const [groupName, setGroupName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])

  // Mock contacts data
  const contacts = [
    {
      id: "1",
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&query=JD",
      role: "Founder",
      company: "TechStart",
    },
    {
      id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&query=JS",
      role: "Investor",
      company: "VC Partners",
    },
    {
      id: "3",
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=40&width=40&query=MJ",
      role: "Mentor",
      company: "Growth Advisors",
    },
    {
      id: "4",
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&query=SW",
      role: "Founder",
      company: "HealthTech",
    },
    {
      id: "5",
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40&query=DC",
      role: "Investor",
      company: "Angel Group",
    },
    {
      id: "6",
      name: "Emily Wong",
      avatar: "/placeholder.svg?height=40&width=40&query=EW",
      role: "Founder",
      company: "EduTech",
    },
    {
      id: "7",
      name: "Robert Kim",
      avatar: "/placeholder.svg?height=40&width=40&query=RK",
      role: "Mentor",
      company: "Startup Mentor",
    },
    {
      id: "8",
      name: "Lisa Park",
      avatar: "/placeholder.svg?height=40&width=40&query=LP",
      role: "Investor",
      company: "Growth Capital",
    },
  ]

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleContact = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId))
    } else {
      setSelectedContacts([...selectedContacts, contactId])
    }
  }

  const handleCreateGroup = () => {
    // Logic to create the group
    console.log("Creating group:", {
      name: groupName,
      members: selectedContacts.map((id) => contacts.find((contact) => contact.id === id)),
    })

    // Reset form and close dialog
    setGroupName("")
    setSearchQuery("")
    setSelectedContacts([])
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Create New Group
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          {selectedContacts.length > 0 && (
            <div className="flex flex-wrap gap-2 p-2 border rounded-md">
              {selectedContacts.map((id) => {
                const contact = contacts.find((c) => c.id === id)
                if (!contact) return null

                return (
                  <Badge key={id} variant="secondary" className="flex items-center gap-1 pl-1">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{contact.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent"
                      onClick={() => toggleContact(id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )
              })}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="search-contacts">Add Members</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="search-contacts"
                placeholder="Search contacts"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[200px] border rounded-md">
            <div className="p-2 space-y-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`flex items-center p-2 rounded-lg cursor-pointer ${
                    selectedContacts.includes(contact.id) ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onClick={() => toggleContact(contact.id)}
                >
                  <div className="flex items-center flex-1">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contact.role} at {contact.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-5 w-5 rounded-full border">
                    {selectedContacts.includes(contact.id) && <Plus className="h-4 w-4 text-primary rotate-45" />}
                  </div>
                </div>
              ))}

              {filteredContacts.length === 0 && (
                <div className="p-4 text-center text-muted-foreground">No contacts found</div>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} disabled={!groupName || selectedContacts.length === 0}>
            Create Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
