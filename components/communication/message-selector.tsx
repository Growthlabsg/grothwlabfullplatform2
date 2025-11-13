"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, ImageIcon, FileArchive, File, Hash, Calendar, Filter, Download, Share } from "lucide-react"

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
  attachments?: {
    id: string
    name: string
    type: string
    size: string
    hash: string
  }[]
  hash: string
}

export function MessageSelector() {
  const [selectedTab, setSelectedTab] = useState("attachment")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAttachmentType, setSelectedAttachmentType] = useState("all")
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  // Mock messages with attachments
  const mockMessages: Message[] = [
    {
      id: "msg1",
      senderId: "user1",
      senderName: "Sarah Chen",
      content: "Here's the pitch deck for our startup",
      timestamp: "2023-10-15T14:30:00",
      attachments: [
        {
          id: "att1",
          name: "GrowthLab_Pitch_Deck.pdf",
          type: "pdf",
          size: "2.4 MB",
          hash: "8f7d56a12e9b4c31b5f7d56a12e9b4c31b5",
        },
      ],
      hash: "msg_8f7d56a12e9b4c31b5f",
    },
    {
      id: "msg2",
      senderId: "user2",
      senderName: "Alex Wong",
      content: "Check out these product mockups",
      timestamp: "2023-10-16T09:15:00",
      attachments: [
        {
          id: "att2",
          name: "Product_Mockup_1.png",
          type: "image",
          size: "1.8 MB",
          hash: "3a9c87b2d5e6f1g4h7j8k9l0m1n2o3p4q5r6",
        },
        {
          id: "att3",
          name: "Product_Mockup_2.png",
          type: "image",
          size: "2.1 MB",
          hash: "7z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j",
        },
      ],
      hash: "msg_3a9c87b2d5e6f1g4h7j",
    },
    {
      id: "msg3",
      senderId: "user3",
      senderName: "Mei Lin",
      content: "Here's the financial projection spreadsheet",
      timestamp: "2023-10-17T16:45:00",
      attachments: [
        {
          id: "att4",
          name: "Financial_Projections_2023.xlsx",
          type: "spreadsheet",
          size: "1.2 MB",
          hash: "2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s",
        },
      ],
      hash: "msg_2b3c4d5e6f7g8h9i0j",
    },
    {
      id: "msg4",
      senderId: "user4",
      senderName: "David Lee",
      content: "Source code for the prototype",
      timestamp: "2023-10-18T11:20:00",
      attachments: [
        {
          id: "att5",
          name: "prototype_source_v1.zip",
          type: "archive",
          size: "5.7 MB",
          hash: "1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9",
        },
      ],
      hash: "msg_1a2b3c4d5e6f7g8h9i",
    },
    {
      id: "msg5",
      senderId: "user1",
      senderName: "Sarah Chen",
      content: "Updated market research document",
      timestamp: "2023-10-19T15:10:00",
      attachments: [
        {
          id: "att6",
          name: "Market_Research_2023.docx",
          type: "document",
          size: "3.2 MB",
          hash: "9s8r7q6p5o4n3m2l1k0j9i8h7g6f5e4d3c2b1a",
        },
      ],
      hash: "msg_9s8r7q6p5o4n3m2l1k",
    },
  ]

  // Filter messages based on search query and selected attachment type
  const filteredMessages = mockMessages.filter((message) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.attachments?.some((att) => att.name.toLowerCase().includes(searchQuery.toLowerCase()))

    // Filter by attachment type
    const matchesType =
      selectedAttachmentType === "all" ||
      message.attachments?.some((att) => {
        if (selectedAttachmentType === "document") {
          return ["pdf", "document", "docx", "txt"].includes(att.type)
        } else if (selectedAttachmentType === "image") {
          return ["image", "png", "jpg", "jpeg", "gif"].includes(att.type)
        } else if (selectedAttachmentType === "spreadsheet") {
          return ["spreadsheet", "xlsx", "csv"].includes(att.type)
        } else if (selectedAttachmentType === "archive") {
          return ["archive", "zip", "rar"].includes(att.type)
        }
        return att.type === selectedAttachmentType
      })

    // Filter by date range
    const messageDate = new Date(message.timestamp)
    const fromDate = dateRange.from ? new Date(dateRange.from) : null
    const toDate = dateRange.to ? new Date(dateRange.to) : null
    const matchesDateRange = (!fromDate || messageDate >= fromDate) && (!toDate || messageDate <= toDate)

    return matchesSearch && matchesType && matchesDateRange
  })

  // Toggle message selection
  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId],
    )
  }

  // Get attachment icon based on type
  const getAttachmentIcon = (type: string) => {
    if (["pdf", "document", "docx", "txt"].includes(type)) {
      return <FileText className="h-5 w-5 text-blue-500" />
    } else if (["image", "png", "jpg", "jpeg", "gif"].includes(type)) {
      return <ImageIcon className="h-5 w-5 text-purple-500" />
    } else if (["spreadsheet", "xlsx", "csv"].includes(type)) {
      return <FileText className="h-5 w-5 text-green-500" />
    } else if (["archive", "zip", "rar"].includes(type)) {
      return <FileArchive className="h-5 w-5 text-amber-500" />
    }
    return <File className="h-5 w-5 text-gray-500" />
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Message Selector</CardTitle>
        <CardDescription>Find and select messages by attachment type or message hash</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="attachment">Select by Attachment</TabsTrigger>
            <TabsTrigger value="hash">Select by Hash</TabsTrigger>
          </TabsList>

          <TabsContent value="attachment" className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search messages or attachments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={selectedAttachmentType} onValueChange={setSelectedAttachmentType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="File type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="spreadsheet">Spreadsheets</SelectItem>
                  <SelectItem value="archive">Archives</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="from-date" className="text-sm">
                From:
              </Label>
              <Input
                id="from-date"
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="w-[150px]"
              />
              <Label htmlFor="to-date" className="text-sm">
                To:
              </Label>
              <Input
                id="to-date"
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="w-[150px]"
              />
              <Button variant="outline" size="sm" onClick={() => setDateRange({ from: "", to: "" })}>
                Clear
              </Button>
            </div>

            <div className="rounded-md border">
              <div className="flex items-center justify-between border-b px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {filteredMessages.length} {filteredMessages.length === 1 ? "result" : "results"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedMessages.length === 0}
                    onClick={() => console.log("Download selected", selectedMessages)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={selectedMessages.length === 0}
                    onClick={() => console.log("Share selected", selectedMessages)}
                  >
                    <Share className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-[300px]">
                <div className="space-y-1 p-1">
                  {filteredMessages.map((message) => (
                    <div key={message.id} className="flex items-start space-x-2 rounded-md p-2 hover:bg-muted">
                      <Checkbox
                        checked={selectedMessages.includes(message.id)}
                        onCheckedChange={() => toggleMessageSelection(message.id)}
                        id={`msg-${message.id}`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`msg-${message.id}`} className="text-sm font-medium cursor-pointer">
                            {message.senderName}
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{message.content}</p>
                        <div className="mt-1 space-y-1">
                          {message.attachments?.map((attachment) => (
                            <div key={attachment.id} className="flex items-center rounded-md bg-muted p-1">
                              {getAttachmentIcon(attachment.type)}
                              <div className="ml-2 flex-1">
                                <p className="text-xs font-medium">{attachment.name}</p>
                                <div className="flex items-center">
                                  <span className="text-xs text-muted-foreground">{attachment.size}</span>
                                  <Badge variant="outline" className="ml-2 text-[10px]">
                                    {attachment.type.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredMessages.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Search className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm font-medium">No messages found</p>
                      <p className="text-xs text-muted-foreground">Try adjusting your search or filters</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="hash" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hash-input">Message or Attachment Hash</Label>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Hash className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="hash-input" placeholder="Enter message or attachment hash..." className="pl-8" />
                </div>
                <Button>Search</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter a message hash or attachment hash to find specific content. Hashes are unique identifiers that
                help locate exact messages or files.
              </p>
            </div>

            <div className="rounded-md border p-4 text-center">
              <Hash className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-sm font-medium">Hash-Based Message Lookup</h3>
              <p className="text-xs text-muted-foreground mt-1">
                This feature allows you to find messages using their unique hash identifiers. Useful for locating
                specific messages in compliance or audit scenarios.
              </p>
              <div className="mt-4 space-y-2">
                <div className="rounded-md bg-muted p-2 text-xs">
                  <p className="font-mono">Example: 8f7d56a12e9b4c31b5f7d56a12e9b4c31b5</p>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Browse Message History
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
