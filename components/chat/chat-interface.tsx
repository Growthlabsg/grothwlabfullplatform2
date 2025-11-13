"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Send, Paperclip, MoreHorizontal, MessageSquare, Plus, Trash2, Archive } from "lucide-react"
import { VerificationBadge } from "../verification/verification-badge"
import { LinkedInProfile } from "./linkedin-profile"
import { EmailIntegration } from "./email-integration"
import { ConnectionRequest } from "./connection-request"

// Define message type
interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  status: "sent" | "delivered" | "read"
  attachments?: {
    id: string
    type: "image" | "document" | "link"
    url: string
    name: string
  }[]
}

// Define conversation type
interface Conversation {
  id: string
  participants: {
    id: string
    name: string
    avatar?: string
    role: string
    company?: string
    isVerified?: boolean
    isOnline?: boolean
    lastActive?: Date
  }[]
  messages: Message[]
  unreadCount: number
  lastMessageTimestamp: Date
  topic?: string
  intent?: "investment" | "mentorship" | "partnership" | "general"
}

// Define user type
interface User {
  id: string
  name: string
  avatar?: string
  role: string
  company?: string
  isVerified?: boolean
  isOnline?: boolean
  lastActive?: Date
  email?: string
  linkedInProfile?: string
  bio?: string
  interests?: string[]
  connections?: number
}

// Sample conversations data
const sampleConversations: Conversation[] = [
  {
    id: "conv-001",
    participants: [
      {
        id: "user-002",
        name: "Sarah Wong",
        avatar: "/sarah-wong.jpg",
        role: "Investor",
        company: "Horizon Ventures",
        isVerified: true,
        isOnline: true,
      },
    ],
    messages: [
      {
        id: "msg-001",
        senderId: "user-001", // Current user
        content: "Hi Sarah, I'm interested in discussing potential investment opportunities for my fintech startup.",
        timestamp: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
        status: "read",
      },
      {
        id: "msg-002",
        senderId: "user-002",
        content:
          "Hello! I'd be happy to discuss. Could you share more details about your startup and current traction?",
        timestamp: new Date(Date.now() - 3600000 * 24 * 1.5), // 1.5 days ago
        status: "read",
      },
      {
        id: "msg-003",
        senderId: "user-001",
        content:
          "Of course! We're building a B2B payment solution for SMEs in Southeast Asia. We've processed over $2M in transactions in the last quarter and have 150+ businesses using our platform.",
        timestamp: new Date(Date.now() - 3600000 * 24), // 1 day ago
        status: "read",
      },
      {
        id: "msg-004",
        senderId: "user-002",
        content:
          "That sounds promising. I'd like to learn more about your growth strategy and revenue model. Would you be available for a call next week?",
        timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
        status: "read",
      },
    ],
    unreadCount: 0,
    lastMessageTimestamp: new Date(Date.now() - 3600000 * 2),
    topic: "Investment Opportunity",
    intent: "investment",
  },
  {
    id: "conv-002",
    participants: [
      {
        id: "user-003",
        name: "David Kumar",
        avatar: "/david-kumar.jpg",
        role: "Mentor",
        company: "TechStars",
        isVerified: true,
        isOnline: false,
        lastActive: new Date(Date.now() - 3600000 * 5), // 5 hours ago
      },
    ],
    messages: [
      {
        id: "msg-005",
        senderId: "user-003",
        content:
          "Hi there! I saw your startup profile and I think I could offer some guidance on your go-to-market strategy.",
        timestamp: new Date(Date.now() - 3600000 * 48), // 48 hours ago
        status: "read",
      },
      {
        id: "msg-006",
        senderId: "user-001",
        content: "That would be incredibly helpful! I've been struggling with defining our target segments.",
        timestamp: new Date(Date.now() - 3600000 * 47), // 47 hours ago
        status: "read",
      },
      {
        id: "msg-007",
        senderId: "user-003",
        content:
          "Let's schedule a mentoring session to discuss this in detail. I have some frameworks that might help.",
        timestamp: new Date(Date.now() - 3600000 * 24), // 24 hours ago
        status: "read",
      },
    ],
    unreadCount: 0,
    lastMessageTimestamp: new Date(Date.now() - 3600000 * 24),
    topic: "Mentorship Session",
    intent: "mentorship",
  },
  {
    id: "conv-003",
    participants: [
      {
        id: "user-004",
        name: "Emily Nguyen",
        avatar: "/emily-nguyen.jpg",
        role: "Founder",
        company: "EduSmart",
        isVerified: false,
        isOnline: true,
      },
    ],
    messages: [
      {
        id: "msg-008",
        senderId: "user-004",
        content: "Hello! I'm looking for potential partnership opportunities in the edtech space.",
        timestamp: new Date(Date.now() - 3600000 * 12), // 12 hours ago
        status: "read",
      },
      {
        id: "msg-009",
        senderId: "user-001",
        content: "Hi Emily, I'd be interested in exploring synergies between our platforms.",
        timestamp: new Date(Date.now() - 3600000 * 10), // 10 hours ago
        status: "read",
      },
      {
        id: "msg-010",
        senderId: "user-004",
        content:
          "Great! I think there could be interesting integration possibilities. Our platform focuses on K-12 personalized learning.",
        timestamp: new Date(Date.now() - 3600000 * 1), // 1 hour ago
        status: "delivered",
      },
    ],
    unreadCount: 1,
    lastMessageTimestamp: new Date(Date.now() - 3600000 * 1),
    topic: "Partnership Discussion",
    intent: "partnership",
  },
]

// Sample suggested connections
const suggestedConnections: User[] = [
  {
    id: "user-005",
    name: "Michael Zhang",
    avatar: "/michael-zhang.jpg",
    role: "Investor",
    company: "Blockchain Capital",
    isVerified: true,
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000 * 2),
    email: "michael@blockchaincapital.com",
    linkedInProfile: "linkedin.com/in/michaelzhang",
    bio: "Investor focused on blockchain and fintech startups in Southeast Asia.",
    interests: ["Blockchain", "Fintech", "Crypto", "Web3"],
    connections: 342,
  },
  {
    id: "user-006",
    name: "Lisa Lim",
    avatar: "/lisa-lim.jpg",
    role: "Mentor",
    company: "MediHealth AI",
    isVerified: true,
    isOnline: true,
    email: "lisa@medihealthai.com",
    linkedInProfile: "linkedin.com/in/lisalim",
    bio: "Healthcare entrepreneur with 15+ years of experience in the medical technology sector.",
    interests: ["Healthtech", "AI", "Medical Devices", "Digital Health"],
    connections: 521,
  },
  {
    id: "user-007",
    name: "Robert Lee",
    avatar: "/robert-lee.jpg",
    role: "Founder",
    company: "GreenPath Logistics",
    isVerified: false,
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000 * 24),
    email: "robert@greenpathlogistics.com",
    linkedInProfile: "linkedin.com/in/robertlee",
    bio: "Building sustainable logistics solutions for the future of transportation.",
    interests: ["Logistics", "Sustainability", "Electric Vehicles", "Supply Chain"],
    connections: 187,
  },
]

// Sample conversation templates
const conversationTemplates = [
  {
    id: "template-001",
    title: "Investment Inquiry",
    content:
      "Hi [Name], I'm [Your Name], founder of [Company]. I noticed your investment focus on [Industry] and would love to discuss potential opportunities for my startup. We're currently [Brief description of traction/stage]. Would you be open to a conversation?",
    intent: "investment",
  },
  {
    id: "template-002",
    title: "Mentorship Request",
    content:
      "Hello [Name], I admire your experience in [Area of Expertise]. I'm currently facing challenges with [Specific Challenge] at my startup, and I believe your guidance would be invaluable. Would you be willing to schedule a mentoring session?",
    intent: "mentorship",
  },
  {
    id: "template-003",
    title: "Partnership Proposal",
    content:
      "Hi [Name], I'm reaching out because I see potential synergies between [Your Company] and [Their Company]. Specifically, I think we could collaborate on [Specific Area]. Would you be interested in exploring partnership opportunities?",
    intent: "partnership",
  },
]

export function ChatInterface() {
  const router = useRouter()
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [conversations, setConversations] = useState<Conversation[]>(sampleConversations)
  const [messageInput, setMessageInput] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewMessageDialogOpen, setIsNewMessageDialogOpen] = useState(false)
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [isConnectionRequestOpen, setIsConnectionRequestOpen] = useState(false)
  const [isLinkedInProfileOpen, setIsLinkedInProfileOpen] = useState(false)
  const [isEmailIntegrationOpen, setIsEmailIntegrationOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    (conversation) =>
      conversation.participants.some((participant) =>
        participant.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ) ||
      conversation.messages.some((message) => message.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (conversation.topic && conversation.topic.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Scroll to bottom of messages when active conversation changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeConversation])

  // Mark messages as read when conversation becomes active
  useEffect(() => {
    if (activeConversation) {
      setConversations(
        conversations.map((conversation) => {
          if (conversation.id === activeConversation.id) {
            return {
              ...conversation,
              unreadCount: 0,
              messages: conversation.messages.map((message) => ({
                ...message,
                status: message.senderId !== "user-001" ? "read" : message.status,
              })),
            }
          }
          return conversation
        }),
      )
    }
  }, [activeConversation])

  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: "user-001", // Current user
      content: messageInput,
      timestamp: new Date(),
      status: "sent",
    }

    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage],
      lastMessageTimestamp: new Date(),
    }

    setConversations(
      conversations.map((conversation) =>
        conversation.id === activeConversation.id ? updatedConversation : conversation,
      ),
    )
    setActiveConversation(updatedConversation)
    setMessageInput("")

    // Simulate reply after a delay
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const replyMessage: Message = {
          id: `msg-${Date.now()}`,
          senderId: activeConversation?.participants?.[0]?.id,
          content: `Thanks for your message. I'll get back to you soon.`,
          timestamp: new Date(),
          status: "delivered",
        }

        const updatedWithReply = {
          ...updatedConversation,
          messages: [...updatedConversation.messages, replyMessage],
          lastMessageTimestamp: new Date(),
          unreadCount: activeConversation.unreadCount + 1,
        }

        setConversations(
          conversations.map((conversation) =>
            conversation.id === activeConversation.id ? updatedWithReply : conversation,
          ),
        )
        setActiveConversation(updatedWithReply)
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Conversations List */}
      <div className="w-80 border-r bg-gray-50 dark:bg-gray-900 dark:border-gray-700 flex flex-col">
        {/* Search Bar */}
        <div className="p-4">
          <Input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* New Message Button */}
        <div className="p-4">
          <Button variant="outline" className="w-full" onClick={() => setIsNewMessageDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1">
          <div className="py-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center space-x-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${
                  activeConversation?.id === conversation.id ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <Avatar>
                  <AvatarImage
                    src={conversation?.participants?.[0]?.avatar || "/placeholder-avatar.jpg"}
                    alt={conversation?.participants?.[0]?.name}
                  />
                  <AvatarFallback>{conversation?.participants?.[0]?.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{conversation?.participants?.[0]?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {conversation?.messages?.[conversation?.messages?.length - 1]?.content.substring(0, 30)}
                    {conversation?.messages?.[conversation?.messages?.length - 1]?.content.length > 30 ? "..." : ""}
                  </div>
                </div>
                {conversation.unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {conversation.unreadCount}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Section - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeConversation ? (
          <div className="border-b p-4 flex items-center space-x-4 dark:border-gray-700">
            <Avatar>
              <AvatarImage
                src={activeConversation?.participants?.[0]?.avatar || "/placeholder-avatar.jpg"}
                alt={activeConversation?.participants?.[0]?.name}
              />
              <AvatarFallback>{activeConversation?.participants?.[0]?.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{activeConversation?.participants?.[0]?.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {activeConversation?.participants?.[0]?.role} at {activeConversation?.participants?.[0]?.company}
                {activeConversation?.participants?.[0]?.isVerified && <VerificationBadge status="verified" />}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open user menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(activeConversation?.participants?.[0] || null)
                    setIsProfileSheetOpen(true)
                  }}
                >
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsConnectionRequestOpen(true)}>
                  Send Connection Request
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsLinkedInProfileOpen(true)}>
                  View LinkedIn Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsEmailIntegrationOpen(true)}>Email Integration</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Conversation
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="border-b p-4 dark:border-gray-700">Select a conversation to start messaging.</div>
        )}

        {/* Chat Messages */}
        {activeConversation ? (
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex flex-col ${message.senderId === "user-001" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.senderId === "user-001"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {message.content}
                    {message.attachments && (
                      <div className="mt-2">
                        {message.attachments.map((attachment) => (
                          <a key={attachment.id} href={attachment.url} target="_blank" rel="noopener noreferrer">
                            {attachment.type === "image" ? (
                              <img
                                src={attachment.url || "/placeholder.svg"}
                                alt={attachment.name}
                                className="max-w-xs rounded-md"
                              />
                            ) : (
                              <Button variant="secondary">{attachment.name}</Button>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    {message.status === "sent" && " (Sent)"}
                    {message.status === "delivered" && " (Delivered)"}
                    {message.status === "read" && " (Read)"}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <MessageSquare className="h-16 w-16 text-gray-400 dark:text-gray-600" />
            <p className="ml-4 text-gray-400 dark:text-gray-600">Select a conversation to view messages</p>
          </div>
        )}

        {/* Chat Input */}
        {activeConversation && (
          <div className="border-t p-4 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach files</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage()
                  }
                }}
                className="flex-1"
              />
              <Button onClick={handleSendMessage}>
                Send
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* New Message Dialog */}
      <Dialog open={isNewMessageDialogOpen} onOpenChange={setIsNewMessageDialogOpen}>
        <DialogTrigger asChild>
          {/* This trigger is not needed as the dialog is opened programmatically */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>Start a new conversation with someone.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                To:
              </label>
              <Input id="name" value="Search for user..." className="col-span-3" />
            </div>
          </div>
          <p className="mb-2">Suggested Connections:</p>
          <div className="flex space-x-4">
            {suggestedConnections.map((user) => (
              <div key={user.id} className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder-avatar.jpg"} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{user.name}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user)
                    setIsProfileSheetOpen(true)
                  }}
                >
                  View Profile
                </Button>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Start Conversation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Sheet */}
      <Sheet open={isProfileSheetOpen} onOpenChange={setIsProfileSheetOpen}>
        <SheetTrigger asChild>{/* This trigger is not needed as the sheet is opened programmatically */}</SheetTrigger>
        <SheetContent className="sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>User Profile</SheetTitle>
            <SheetDescription>View detailed information about the user.</SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedUser.avatar || "/placeholder-avatar.jpg"} alt={selectedUser.name} />
                  <AvatarFallback>{selectedUser.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-center">
                <div className="font-medium">{selectedUser.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedUser.role} at {selectedUser.company}
                  {selectedUser.isVerified && <VerificationBadge status="verified" />}
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-bold">Contact Information</div>
                <div className="text-sm">Email: {selectedUser.email || "N/A"}</div>
                <div className="text-sm">LinkedIn: {selectedUser.linkedInProfile || "N/A"}</div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-bold">Bio</div>
                <div className="text-sm">{selectedUser.bio || "N/A"}</div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-bold">Interests</div>
                <div className="text-sm">{selectedUser.interests?.join(", ") || "N/A"}</div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-bold">Connections</div>
                <div className="text-sm">{selectedUser.connections || 0} connections</div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Conversation Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Conversation Templates</DialogTitle>
            <DialogDescription>Select a template to start a conversation.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {conversationTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-4 border rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  selectedTemplate === template.id ? "bg-gray-100 dark:bg-gray-800" : ""
                }`}
                onClick={() => {
                  setSelectedTemplate(template.id)
                  setMessageInput(template.content)
                  setIsTemplateDialogOpen(false)
                }}
              >
                <div className="font-medium">{template.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{template.content.substring(0, 50)}...</div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Use Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Connection Request Component */}
      <ConnectionRequest isOpen={isConnectionRequestOpen} onClose={() => setIsConnectionRequestOpen(false)} />

      {/* LinkedIn Profile Component */}
      <LinkedInProfile isOpen={isLinkedInProfileOpen} onClose={() => setIsLinkedInProfileOpen(false)} />

      {/* Email Integration Component */}
      <EmailIntegration isOpen={isEmailIntegrationOpen} onClose={() => setIsEmailIntegrationOpen(false)} />
    </div>
  )
}
