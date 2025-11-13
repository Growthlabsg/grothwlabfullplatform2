"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getArchivedMeetings,
  getMeetingFolders,
  searchMeetings,
  type ArchivedMeeting,
} from "@/lib/meeting-archive-service"
import { Calendar, Clock, File, Folder, Play, Search, Share2, Star } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShareContentDialog } from "./share-content-dialog"

interface CallArchiveProps {
  onViewMeeting?: (meetingId: string) => void
}

export function CallArchive({ onViewMeeting }: CallArchiveProps) {
  const [meetings, setMeetings] = useState<ArchivedMeeting[]>([])
  const [folders, setFolders] = useState<{ id: string; name: string; meetingCount: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<{
    id: string
    type: "recording" | "transcript" | "summary"
    title: string
  } | null>(null)

  // Load meetings and folders
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [meetingsData, foldersData] = await Promise.all([getArchivedMeetings(), getMeetingFolders()])
        setMeetings(meetingsData)
        setFolders(foldersData)
      } catch (error) {
        console.error("Error loading archive data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const meetings = await getArchivedMeetings()
      setMeetings(meetings)
      return
    }

    setIsLoading(true)
    try {
      const results = await searchMeetings(searchQuery)
      setMeetings(results)
    } catch (error) {
      console.error("Error searching meetings:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter meetings based on active tab
  const filteredMeetings = meetings.filter((meeting) => {
    if (activeTab === "all") return true
    if (activeTab === "starred") return meeting.isStarred
    if (activeTab === "recordings") return !!meeting.recordingUrl
    if (activeTab === "transcripts") return !!meeting.transcriptId
    if (activeTab.startsWith("folder-")) return meeting.folderId === activeTab.replace("folder-", "")
    return true
  })

  // Handle share button click
  const handleShare = (meeting: ArchivedMeeting, contentType: "recording" | "transcript" | "summary") => {
    let contentId = ""

    switch (contentType) {
      case "recording":
        if (!meeting.recordingUrl) return
        contentId = meeting.id
        break
      case "transcript":
        if (!meeting.transcriptId) return
        contentId = meeting.transcriptId
        break
      case "summary":
        if (!meeting.summaryId) return
        contentId = meeting.summaryId
        break
    }

    setSelectedContent({
      id: contentId,
      type: contentType,
      title: meeting.title,
    })

    setShareDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h2 className="text-2xl font-bold">Meeting Archive</h2>

        <div className="flex w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Search meetings..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button className="ml-2" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 overflow-x-auto flex flex-nowrap max-w-full justify-start">
          <TabsTrigger value="all">All Meetings</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
          <TabsTrigger value="transcripts">Transcripts</TabsTrigger>

          {folders.map((folder) => (
            <TabsTrigger key={folder.id} value={`folder-${folder.id}`}>
              <Folder className="h-4 w-4 mr-1" />
              {folder.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
              <p>Loading meetings...</p>
            </div>
          ) : filteredMeetings.length > 0 ? (
            <ScrollArea className="h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMeetings.map((meeting) => (
                  <Card key={meeting.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{meeting.title}</CardTitle>
                        {meeting.isStarred && <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />}
                      </div>
                      <CardDescription className="flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        {new Date(meeting.date).toLocaleDateString()}
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3" />
                        {meeting.duration} min
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-1 mb-3">
                        {meeting.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {meeting.participants.slice(0, 3).map((participant) => (
                          <Avatar key={participant.id} className="h-6 w-6">
                            <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                            <AvatarFallback>{participant.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}

                        {meeting.participants.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{meeting.participants.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="pt-1 flex flex-wrap gap-2">
                      {meeting.recordingUrl && (
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 px-2">
                            <Play className="h-3 w-3 mr-1" />
                            <span className="text-xs">Play</span>
                          </Button>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleShare(meeting, "recording")}
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      {meeting.transcriptId && (
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 px-2">
                            <File className="h-3 w-3 mr-1" />
                            <span className="text-xs">Transcript</span>
                          </Button>

                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleShare(meeting, "transcript")}
                          >
                            <Share2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}

                      {meeting.summaryId && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => handleShare(meeting, "summary")}
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          <span className="text-xs">Summary</span>
                        </Button>
                      )}

                      <Button
                        variant="default"
                        size="sm"
                        className="h-7 px-2 ml-auto"
                        onClick={() => onViewMeeting?.(meeting.id)}
                      >
                        <span className="text-xs">View</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No meetings found</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      {selectedContent && (
        <ShareContentDialog
          isOpen={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          contentId={selectedContent.id}
          contentType={selectedContent.type}
          title={selectedContent.title}
        />
      )}
    </div>
  )
}
