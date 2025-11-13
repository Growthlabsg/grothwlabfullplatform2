"use client"

import { useState } from "react"
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  MessageSquare,
  Users,
  Settings,
  Monitor,
  MoreVertical,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Participant = {
  id: string
  name: string
  avatar?: string
  isSpeaking: boolean
  isMuted: boolean
  isVideoOn: boolean
  isScreenSharing: boolean
}

const mockParticipants: Participant[] = [
  {
    id: "1",
    name: "You",
    avatar: "/abstract-aj.png",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "/abstract-geometric-aw.png",
    isSpeaking: true,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
  },
  {
    id: "3",
    name: "Michael Wong",
    avatar: "/abstract-ms-flow.png",
    isSpeaking: false,
    isMuted: true,
    isVideoOn: false,
    isScreenSharing: false,
  },
  {
    id: "4",
    name: "Jessica Tan",
    avatar: "/abstract-sgi.png",
    isSpeaking: false,
    isMuted: false,
    isVideoOn: true,
    isScreenSharing: false,
  },
]

export function VideoCall() {
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants)
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false)
  const [volume, setVolume] = useState(75)
  const [activeTab, setActiveTab] = useState("gallery")

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted)
    // Update your participant
    setParticipants((prev) => prev.map((p) => (p.id === "1" ? { ...p, isMuted: !isAudioMuted } : p)))
  }

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff)
    // Update your participant
    setParticipants((prev) => prev.map((p) => (p.id === "1" ? { ...p, isVideoOn: !isVideoOff } : p)))
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    // Update your participant
    setParticipants((prev) => prev.map((p) => (p.id === "1" ? { ...p, isScreenSharing: !isScreenSharing } : p)))
  }

  const endCall = () => {
    // Handle ending the call
    alert("Call ended")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-hidden relative">
        {activeTab === "gallery" ? (
          <div className="grid grid-cols-2 gap-2 p-2 h-full">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className={`relative rounded-lg overflow-hidden ${
                  participant.isScreenSharing ? "col-span-2 row-span-2" : ""
                } ${participant.isSpeaking ? "ring-2 ring-primary" : ""}`}
              >
                {participant.isVideoOn ? (
                  <div className="bg-muted h-full w-full flex items-center justify-center">
                    {participant.isScreenSharing ? (
                      <div className="w-full h-full bg-black flex items-center justify-center text-white">
                        <Monitor className="h-16 w-16 opacity-50" />
                        <span className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">
                          {participant.name} is sharing their screen
                        </span>
                      </div>
                    ) : (
                      <img
                        src={participant.avatar || `/placeholder.svg?height=300&width=300&query=person`}
                        alt={participant.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  <div className="bg-muted h-full w-full flex items-center justify-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  </div>
                )}

                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <span className="bg-black/50 px-2 py-1 rounded text-xs text-white">
                    {participant.name} {participant.id === "1" ? "(You)" : ""}
                  </span>
                  {participant.isMuted && (
                    <span className="bg-black/50 p-1 rounded-full">
                      <MicOff className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-3xl h-full max-h-[80vh]">
              {participants.find((p) => p.isSpeaking)?.isVideoOn ? (
                <img
                  src={
                    participants.find((p) => p.isSpeaking)?.avatar ||
                    `/placeholder.svg?height=600&width=800&query=person`
                  }
                  alt="Speaker"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="bg-muted h-full w-full flex items-center justify-center rounded-lg">
                  <Avatar className="h-32 w-32">
                    <AvatarImage
                      src={participants.find((p) => p.isSpeaking)?.avatar || "/placeholder.svg"}
                      alt={participants.find((p) => p.isSpeaking)?.name || "Speaker"}
                    />
                    <AvatarFallback>
                      {participants.find((p) => p.isSpeaking)?.name.substring(0, 2) || "SP"}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              <div className="absolute bottom-4 right-4 flex gap-2">
                {participants
                  .filter((p) => !p.isSpeaking)
                  .map((participant) => (
                    <Avatar
                      key={participant.id}
                      className={`h-16 w-16 border-2 ${participant.isVideoOn ? "" : "bg-muted"} ${participant.id === "1" ? "border-primary" : "border-transparent"}`}
                    >
                      {participant.isVideoOn ? (
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      ) : null}
                      <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t flex items-center justify-between bg-background">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" side="top">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Speaker Volume</h4>
                      <Slider value={[volume]} max={100} step={1} onValueChange={(value) => setVolume(value[0])} />
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Speaker Volume</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="h-9">
              <TabsTrigger value="gallery" className="text-xs px-2">
                Gallery View
              </TabsTrigger>
              <TabsTrigger value="speaker" className="text-xs px-2">
                Speaker View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isAudioMuted ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={toggleAudio}
                >
                  {isAudioMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isAudioMuted ? "Unmute" : "Mute"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isVideoOff ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={toggleVideo}
                >
                  {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isVideoOff ? "Start Video" : "Stop Video"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isScreenSharing ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={toggleScreenShare}
                >
                  <Monitor className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{isScreenSharing ? "Stop Sharing" : "Share Screen"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isChatOpen ? "default" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <MessageSquare className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isParticipantsOpen ? "default" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsParticipantsOpen(!isParticipantsOpen)}
                >
                  <Users className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Participants ({participants.length})</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" side="top" align="end">
                    <div className="grid gap-1">
                      <Button variant="ghost" className="justify-start" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button variant="ghost" className="justify-start" size="sm">
                        <span className="mr-2">👋</span>
                        Reactions
                      </Button>
                      <Button variant="ghost" className="justify-start" size="sm">
                        <span className="mr-2">🎮</span>
                        Virtual Background
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>More Options</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="destructive" size="icon" className="rounded-full ml-2" onClick={endCall}>
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </div>

      {isChatOpen && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-background border-l shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Chat</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/abstract-geometric-aw.png" alt="Sarah Chen" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-2 text-sm max-w-[80%]">
                  <p className="font-medium text-xs">Sarah Chen</p>
                  <p>Can everyone see my screen?</p>
                  <p className="text-xs text-muted-foreground mt-1">10:42 AM</p>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <div className="bg-primary/10 rounded-lg p-2 text-sm max-w-[80%]">
                  <p className="font-medium text-xs">You</p>
                  <p>Yes, we can see it clearly.</p>
                  <p className="text-xs text-muted-foreground mt-1">10:43 AM</p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/abstract-aj.png" alt="You" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full rounded-full border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
              <Button size="sm" className="absolute right-1 top-1 h-6 w-6 rounded-full p-0">
                <span className="sr-only">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}

      {isParticipantsOpen && (
        <div className="absolute right-0 top-0 bottom-0 w-80 bg-background border-l shadow-lg p-4 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Participants ({participants.length})</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsParticipantsOpen(false)}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-2">
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                      <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {participant.name} {participant.id === "1" ? "(You)" : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {participant.isSpeaking ? "Speaking" : "Not speaking"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {participant.isMuted && <MicOff className="h-3 w-3 text-muted-foreground" />}
                    {!participant.isVideoOn && <VideoOff className="h-3 w-3 text-muted-foreground" />}
                    {participant.isScreenSharing && <Monitor className="h-3 w-3 text-primary" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Invite Others
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
