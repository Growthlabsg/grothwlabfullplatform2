import { Signal, BatteryCharging, Battery, Wifi, Plus, Download, Link } from 'lucide-react';
"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Video,
  Phone,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  ScreenShare,
  Settings,
} from "lucide-react"

interface Meeting {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  participants: MeetingParticipant[]
  type: "audio" | "video" | "screen-share"
  status: "scheduled" | "ongoing" | "completed" | "cancelled"
  meetingLink?: string
  calendarEvent?: CalendarEvent
  recordingUrl?: string
  transcriptUrl?: string
}

interface MeetingParticipant {
  id: string
  name: string
  email: string
  avatar?: string
  role: "host" | "co-host" | "participant"
  status: "invited" | "accepted" | "declined" | "joined" | "left"
  joinTime?: Date
  leaveTime?: Date
  isMuted: boolean
  isVideoOff: boolean
  isScreenSharing: boolean
  networkQuality: "excellent" | "good" | "fair" | "poor"
  deviceType: "desktop" | "mobile" | "tablet"
}

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  location?: string
  attendees: MeetingParticipant[]
  isRecurring?: boolean
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly"
    interval: number
    endDate?: Date
  }
  reminders?: {
    type: "email" | "notification" | "sms"
    minutes: number
  }[]
}

interface GoogleMeetIntegrationProps {
  account: string
  onClose?: () => void
}

export function GoogleMeetIntegration({ account, onClose }: GoogleMeetIntegrationProps) {
  const [activeTab, setActiveTab] = useState<"meetings" | "calendar" | "recordings" | "settings">("meetings")
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCompleted, setShowCompleted] = useState(false)
  const [autoCreateMeetings, setAutoCreateMeetings] = useState(true)
  const [defaultDuration, setDefaultDuration] = useState(30)
  const [enableRecording, setEnableRecording] = useState(true)
  const [enableTranscription, setEnableTranscription] = useState(true)
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [networkQuality, setNetworkQuality] = useState<"excellent" | "good" | "fair" | "poor">("excellent")
  const [batteryLevel, setBatteryLevel] = useState(85)
  const [isCharging, setIsCharging] = useState(false)

  // Mock meeting data
  const meetings: Meeting[] = [
    {
      id: "meeting1",
      title: "Weekly Team Standup",
      description: "Discuss progress and plan for the week",
      startTime: new Date(Date.now() + 1000 * 60 * 30),
      endTime: new Date(Date.now() + 1000 * 60 * 90),
      participants: [
        {
          id: "user1",
          name: "John Doe",
          email: "john.doe@company.com",
          avatar: "/john-doe.png",
          role: "host",
          status: "accepted",
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: false,
          networkQuality: "excellent",
          deviceType: "desktop",
        },
        {
          id: "user2",
          name: "Jane Smith",
          email: "jane.smith@company.com",
          avatar: "/jane-smith.png",
          role: "participant",
          status: "accepted",
          isMuted: true,
          isVideoOff: false,
          isScreenSharing: false,
          networkQuality: "good",
          deviceType: "mobile",
        },
        {
          id: "user3",
          name: "Mike Johnson",
          email: "mike.johnson@company.com",
          avatar: "/mike-johnson.png",
          role: "participant",
          status: "invited",
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: false,
          networkQuality: "excellent",
          deviceType: "desktop",
        },
      ],
      type: "video",
      status: "scheduled",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "meeting2",
      title: "Project Review",
      description: "Review the latest project milestones",
      startTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      endTime: new Date(Date.now() - 1000 * 60 * 60),
      participants: [
        {
          id: "user1",
          name: "John Doe",
          email: "john.doe@company.com",
          avatar: "/john-doe.png",
          role: "host",
          status: "joined",
          joinTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
          leaveTime: new Date(Date.now() - 1000 * 60 * 60),
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: true,
          networkQuality: "excellent",
          deviceType: "desktop",
        },
        {
          id: "user2",
          name: "Jane Smith",
          email: "jane.smith@company.com",
          avatar: "/jane-smith.png",
          role: "participant",
          status: "joined",
          joinTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
          leaveTime: new Date(Date.now() - 1000 * 60 * 60),
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: false,
          networkQuality: "good",
          deviceType: "mobile",
        },
      ],
      type: "video",
      status: "completed",
      meetingLink: "https://meet.google.com/xyz-uvw-rst",
      recordingUrl: "/recordings/project-review.mp4",
      transcriptUrl: "/transcripts/project-review.txt",
    },
  ]

  const renderMeetingItem = (meeting: Meeting) => (
    <div
      key={meeting.id}
      className={cn(
        "flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors",
        selectedMeeting === meeting.id && "bg-gray-100 dark:bg-gray-800"
      )}
      onClick={() => setSelectedMeeting(meeting.id)}
    >
      <div className="relative">
        <div className={cn(
          "h-10 w-10 rounded flex items-center justify-center",
          meeting.status === "ongoing" && "bg-green-100 text-green-600",
          meeting.status === "scheduled" && "bg-blue-100 text-blue-600",
          meeting.status === "completed" && "bg-gray-100 text-gray-600",
          meeting.status === "cancelled" && "bg-red-100 text-red-600",
        )}>
          <Video className="h-5 w-5" />
        </div>
        {meeting.status === "ongoing" && (
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium truncate">{meeting.title}</h3>
          <Badge variant={
            meeting.status === "ongoing" ? "default" :
            meeting.status === "scheduled" ? "secondary" :
            meeting.status === "completed" ? "outline" : "destructive"
          }>
            {meeting.status}
          </Badge>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {format(meeting.startTime, "MMM d, yyyy 'at' HH:mm")} • {meeting.participants.length} participants
        </p>
      </div>
    </div>
  )

  const renderParticipantItem = (participant: MeetingParticipant) => (
    <div key={participant.id} className="flex items-center space-x-3 p-2">
      <div className="relative">
        <Avatar className="h-8 w-8">
          <AvatarImage src={participant.avatar} />
          <AvatarFallback className="text-xs">
            {participant.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className={cn(
          "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900",
          participant.status === "joined" && "bg-green-500",
          participant.status === "invited" && "bg-yellow-500",
          participant.status === "left" && "bg-gray-400",
        )} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium truncate">{participant.name}</h3>
          <div className="flex items-center space-x-1">
            {participant.isMuted && <MicOff className="h-3 w-3 text-red-500" />}
            {participant.isVideoOff && <CameraOff className="h-3 w-3 text-red-500" />}
            {participant.isScreenSharing && <ScreenShare className="h-3 w-3 text-blue-500" />}
            <Badge variant="outline" className="text-xs">{participant.role}</Badge>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {participant.email} • {participant.deviceType}
        </p>
      </div>
    </div>
  )

  const renderMeetingControls = () => (
    <div className="flex items-center justify-center space-x-4 p-4 bg-gray-900 text-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMuted(!isMuted)}
        className={cn(
          "rounded-full h-12 w-12",
          isMuted && "bg-red-500 hover:bg-red-600"
        )}
      >
        {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVideoOff(!isVideoOff)}
        className={cn(
          "rounded-full h-12 w-12",
          isVideoOff && "bg-red-500 hover:bg-red-600"
        )}
      >
        {isVideoOff ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsScreenSharing(!isScreenSharing)}
        className={cn(
          "rounded-full h-12 w-12",
          isScreenSharing && "bg-blue-500 hover:bg-blue-600"
        )}
      >
        <ScreenShare className="h-5 w-5" />
      </Button>
      
      <Button
        variant="destructive"
        size="sm"
        className="rounded-full h-12 w-12"
      >
        <Phone className="h-5 w-5" />
      </Button>
    </div>
  )

  const renderNetworkStatus = () => (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-800 rounded">
      <div className="flex items-center space-x-1">
        <Signal className={cn(
          "h-4 w-4",
          networkQuality === "excellent" && "text-green-500",
          networkQuality === "good" && "text-yellow-500",
          networkQuality === "fair" && "text-orange-500",
          networkQuality === "poor" && "text-red-500",
        )} />
        <span className="text-xs">{networkQuality}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        {isCharging ? (
          <BatteryCharging className="h-4 w-4 text-green-500" />
        ) : (
          <Battery className="h-4 w-4" />
        )}
        <span className="text-xs">{batteryLevel}%</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <Wifi className="h-4 w-4 text-green-500" />
        <span className="text-xs">Connected</span>
      </div>
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center">
            <Video className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Google Meet</h1>
            <p className="text-xs text-gray-500">{account}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isInMeeting && renderNetworkStatus()}
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r dark:border-gray-800 flex flex-col">
          <div className="p-4 border-b dark:border-gray-800">
            <Input
              placeholder="Search meetings or participants"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="meetings">Meetings</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="recordings">Recordings</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {activeTab === "meetings" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Meetings</h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {meetings
                    .filter(meeting => 
                      (showCompleted || meeting.status !== "completed") &&
                      meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(renderMeetingItem)}
                </>
              )}
              
              {activeTab === "calendar" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Calendar Integration</h3>
                  <div className="text-xs text-gray-500">
                    Calendar events will appear here when integrated with Google Calendar.
                  </div>
                </div>
              )}
              
              {activeTab === "recordings" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Recordings</h3>
                  {meetings
                    .filter(meeting => meeting.recordingUrl)
                    .map(meeting => (
                      <div key={meeting.id} className="p-3 border rounded">
                        <h4 className="text-sm font-medium">{meeting.title}</h4>
                        <p className="text-xs text-gray-500">
                          {format(meeting.startTime, "MMM d, yyyy")}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button variant="outline" size="sm">
                            <Video className="h-3 w-3 mr-1" />
                            Play
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              
              {activeTab === "settings" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Meeting Settings</CardTitle>
                      <CardDescription>Configure meeting preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-create">Auto-create meetings</Label>
                        <Switch
                          id="auto-create"
                          checked={autoCreateMeetings}
                          onCheckedChange={setAutoCreateMeetings}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="default-duration">Default duration (minutes)</Label>
                        <Input
                          id="default-duration"
                          type="number"
                          value={defaultDuration}
                          onChange={(e) => setDefaultDuration(parseInt(e.target.value))}
                          min={15}
                          max={480}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enable-recording">Enable recording</Label>
                        <Switch
                          id="enable-recording"
                          checked={enableRecording}
                          onCheckedChange={setEnableRecording}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enable-transcription">Enable transcription</Label>
                        <Switch
                          id="enable-transcription"
                          checked={enableTranscription}
                          onCheckedChange={setEnableTranscription}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedMeeting ? (
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      {meetings.find(m => m.id === selectedMeeting)?.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {meetings.find(m => m.id === selectedMeeting)?.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Link className="h-4 w-4 mr-1" />
                      Copy Link
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex">
                {/* Video Area */}
                <div className="flex-1 bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Meeting in Progress</p>
                    <p className="text-sm text-gray-400">
                      {meetings.find(m => m.id === selectedMeeting)?.participants.length} participants
                    </p>
                  </div>
                </div>
                
                {/* Participants Panel */}
                <div className="w-80 border-l dark:border-gray-800">
                  <div className="p-4 border-b dark:border-gray-800">
                    <h3 className="text-sm font-medium">Participants</h3>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-2">
                      {meetings.find(m => m.id === selectedMeeting)?.participants.map(renderParticipantItem)}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              {/* Meeting Controls */}
              {renderMeetingControls()}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Meeting</h3>
                <p className="text-gray-500">Choose a meeting to join or view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 