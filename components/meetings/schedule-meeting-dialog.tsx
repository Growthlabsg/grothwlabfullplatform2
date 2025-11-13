"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"

interface ScheduleMeetingDialogProps {
  isOpen: boolean
  onClose: () => void
}

// Sample data for contacts
const contacts = [
  {
    id: "user1",
    name: "Sarah Wong",
    avatar: "/abstract-southwest.png",
    role: "Investor",
    company: "Horizon Ventures",
  },
  {
    id: "user2",
    name: "David Kumar",
    avatar: "/abstract-geometric-dk.png",
    role: "Mentor",
    company: "TechStars",
  },
  {
    id: "user3",
    name: "Emily Nguyen",
    avatar: "/ancient-forest-path.png",
    role: "Founder",
    company: "EduSmart",
  },
  {
    id: "user4",
    name: "Michael Zhang",
    avatar: "/Abstract Monochromatic Zenith.png",
    role: "Investor",
    company: "Blockchain Capital",
  },
  {
    id: "user5",
    name: "Lisa Lim",
    avatar: "/abstract-geometric-ll.png",
    role: "Mentor",
    company: "MediHealth AI",
  },
]

// Sample meeting templates
const meetingTemplates = [
  {
    id: "template1",
    name: "Quick Check-in",
    duration: 15,
    description: "A brief 15-minute check-in meeting",
  },
  {
    id: "template2",
    name: "Standard Meeting",
    duration: 30,
    description: "A standard 30-minute meeting",
  },
  {
    id: "template3",
    name: "Extended Discussion",
    duration: 60,
    description: "A comprehensive 60-minute discussion",
  },
  {
    id: "template4",
    name: "Investor Pitch",
    duration: 45,
    description: "A 45-minute investor pitch presentation",
  },
]

export function ScheduleMeetingDialog({ isOpen, onClose }: ScheduleMeetingDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [startTime, setStartTime] = useState("09:00")
  const [duration, setDuration] = useState("30")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [enableRecording, setEnableRecording] = useState(false)
  const [enableTranscription, setEnableTranscription] = useState(false)
  const [enableVirtualBackground, setEnableVirtualBackground] = useState(false)

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle template selection
  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId)
    const template = meetingTemplates.find((t) => t.id === templateId)
    if (template) {
      setTitle(template.name)
      setDescription(template.description)
      setDuration(template.duration.toString())
    }
  }

  // Toggle participant selection
  const toggleParticipant = (participantId: string) => {
    if (selectedParticipants.includes(participantId)) {
      setSelectedParticipants(selectedParticipants.filter((id) => id !== participantId))
    } else {
      setSelectedParticipants([...selectedParticipants, participantId])
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would save the meeting data here
    console.log({
      title,
      description,
      date,
      startTime,
      duration,
      selectedParticipants,
      enableRecording,
      enableTranscription,
      enableVirtualBackground,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Schedule a New Meeting</DialogTitle>
          <DialogDescription>Fill in the details to schedule your meeting.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="template">Meeting Template (Optional)</Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-template">No Template</SelectItem>
                    {meetingTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name} ({template.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Meeting Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Meeting Options</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable Recording</span>
                  <Switch checked={enableRecording} onCheckedChange={setEnableRecording} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable Transcription</span>
                  <Switch checked={enableTranscription} onCheckedChange={setEnableTranscription} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable Virtual Background</span>
                  <Switch checked={enableVirtualBackground} onCheckedChange={setEnableVirtualBackground} />
                </div>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Participants</Label>
              <div className="relative mb-2">
                <Input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <Label className="text-sm text-muted-foreground">Selected: {selectedParticipants.length}</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedParticipants.map((id) => {
                    const contact = contacts.find((c) => c.id === id)
                    if (!contact) return null
                    return (
                      <Badge key={id} variant="secondary" className="flex items-center gap-1">
                        <span>{contact.name}</span>
                        <button
                          type="button"
                          onClick={() => toggleParticipant(id)}
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                        >
                          ×
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <ScrollArea className="h-[300px] border rounded-md p-2">
                <div className="space-y-2">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100",
                        selectedParticipants.includes(contact.id) && "bg-gray-100",
                      )}
                      onClick={() => toggleParticipant(contact.id)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                          <AvatarFallback>{contact.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {contact.role} at {contact.company}
                          </div>
                        </div>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedParticipants.includes(contact.id)}
                          onChange={() => {}}
                          className="h-4 w-4"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Schedule Meeting</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
