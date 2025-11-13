"use client"

import { useState, useEffect } from "react"
import { User, ImageIcon, FileText, Video, Smile, Calendar, MapPin, Briefcase, Building } from "lucide-react"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { EnhancedPost } from "@/components/feed/enhanced-post"
import { useAuth } from "@/contexts/auth-context"
import { BusinessPageService } from "@/lib/business-page-service"
import type { Post } from "@/types/feed"
import type { BusinessPage } from "@/types/business-page"

// Mock posts data
const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      id: "user1",
      name: "John Chen",
      headline: "Founder & CEO at TechStartup",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: true,
    },
    content:
      "Excited to announce that we've just secured our seed funding round! 🚀 Thanks to all our investors and mentors who believed in our vision. We're now looking to expand our team - if you're a passionate developer or product designer, check out our careers page!",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    likes: 128,
    comments: 32,
    reposts: 18,
    tags: ["startup", "funding", "entrepreneurship"],
  },
  {
    id: "2",
    author: {
      id: "bp1",
      name: "GrowthLab",
      headline: "Business Development",
      avatar: "/images/GrowthLab Icon (1).png",
      verified: true,
    },
    content:
      "Join us for our upcoming Startup Pitch Competition on May 24th! This is your chance to showcase your innovative ideas and connect with potential investors. Limited spots available - register now at growthlab.sg/pitch-competition",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    likes: 45,
    comments: 12,
    reposts: 8,
    tags: ["startup", "pitching", "funding", "singapore"],
    images: ["/startup-pitch-competition.png"],
  },
  {
    id: "3",
    author: {
      id: "user2",
      name: "Sarah Wong",
      headline: "Product Manager at TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    content:
      "Just finished reading 'Zero to One' by Peter Thiel for the third time. Key insight: it's better to be a monopoly in a small market than to have a small share in a competitive market. What business books have had the biggest impact on your thinking?",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    likes: 76,
    comments: 43,
    reposts: 5,
  },
  {
    id: "4",
    author: {
      id: "user3",
      name: "David Lim",
      headline: "Software Engineer at StartupX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    },
    content:
      "Just deployed our new microservices architecture to production. Reduced API response times by 60% and cut our AWS bill in half! 💪 \n\nTech stack: Node.js, Docker, Kubernetes, and AWS. Happy to share more details if anyone's interested.",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    likes: 92,
    comments: 27,
    reposts: 14,
    tags: ["tech", "microservices", "aws", "performance"],
  },
  {
    id: "5",
    author: {
      id: "bp2",
      name: "Tech Innovators Hub",
      headline: "Information Technology",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      verified: true,
    },
    content:
      "We're excited to announce our new AI Workshop Series starting next month! Learn practical applications of AI for your business from industry experts. Early bird registration now open with 25% discount!",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    likes: 67,
    comments: 23,
    reposts: 19,
    images: ["/startup-workshop.png"],
  },
]

export function EnhancedFeedContent() {
  const { user } = useAuth()
  const [postContent, setPostContent] = useState("")
  const [activeTab, setActiveTab] = useState("personal")
  const [businessPages, setBusinessPages] = useState<BusinessPage[]>([])
  const [selectedPostingAs, setSelectedPostingAs] = useState<{ id: string; name: string; avatar?: string }>({
    id: user?.id || "user1",
    name: user?.displayName || "John Chen",
    avatar: user?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  })
  const [showPostingAsMenu, setShowPostingAsMenu] = useState(false)

  useEffect(() => {
    const fetchBusinessPages = async () => {
      if (!user) return

      try {
        const pages = await BusinessPageService.getUserBusinessPages(user.id)
        setBusinessPages(pages)
      } catch (error) {
        console.error("Error fetching business pages:", error)
      }
    }

    fetchBusinessPages()
  }, [user])

  const handleCreatePost = () => {
    if (!postContent.trim()) return

    // Here you would typically call an API to create the post
    console.log("Creating post as:", selectedPostingAs)
    console.log("Post content:", postContent)

    // Reset the form
    setPostContent("")
  }

  const selectPostingAs = (id: string, name: string, avatar?: string) => {
    setSelectedPostingAs({ id, name, avatar })
    setShowPostingAsMenu(false)
  }

  return (
    <div className="space-y-4">
      {/* Create Post Card */}
      <Card>
        <CardHeader className="p-4 pb-0">
          <div className="flex space-x-3">
            <Avatar>
              <AvatarImage src={selectedPostingAs.avatar || "/placeholder.svg"} alt={selectedPostingAs.name} />
              <AvatarFallback>{selectedPostingAs.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder={`What's on your mind, ${user?.displayName?.split(" ")[0] || "there"}?`}
                className="resize-none min-h-[80px] focus-visible:ring-0 border-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardFooter className="p-4 flex-col">
          <Separator className="mb-4" />
          <div className="flex justify-between items-center w-full">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700">
                <ImageIcon className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700">
                <FileText className="h-4 w-4 mr-2" />
                Document
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-500 hover:text-neutral-700">
                <Smile className="h-4 w-4 mr-2" />
                Feeling
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {/* Posting as dropdown */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPostingAsMenu(!showPostingAsMenu)}
                  className="flex items-center gap-2"
                >
                  {selectedPostingAs.id === user?.id ? <User className="h-4 w-4" /> : <Building className="h-4 w-4" />}
                  <span className="max-w-[100px] truncate">{selectedPostingAs.name}</span>
                </Button>

                {showPostingAsMenu && (
                  <div className="absolute right-0 mt-1 w-64 bg-background border rounded-md shadow-lg z-10">
                    <div className="p-2 text-sm font-medium text-muted-foreground">Post as</div>
                    <Separator />

                    <ScrollArea className="h-auto max-h-[200px]">
                      <div className="p-2">
                        <button type="button"
                          className={`flex items-center gap-3 w-full p-2 rounded-md ${
                            selectedPostingAs.id === user?.id ? "bg-muted" : "hover:bg-muted"
                          } transition-colors text-left`}
                          onClick={() =>
                            selectPostingAs(user?.id || "user1", user?.displayName || "John Chen", user?.avatarUrl)
                          }
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"}
                              alt={user?.displayName || "John Chen"}
                            />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user?.displayName || "John Chen"}</p>
                            <p className="text-xs text-muted-foreground">Personal Profile</p>
                          </div>
                        </button>

                        {businessPages.map((page) => (
                          <button type="button"
                            key={page.id}
                            className={`flex items-center gap-3 w-full p-2 rounded-md mt-1 ${
                              selectedPostingAs.id === page.id ? "bg-muted" : "hover:bg-muted"
                            } transition-colors text-left`}
                            onClick={() => selectPostingAs(page.id, page.name, page.logo)}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={page.logo || "/placeholder.svg"} alt={page.name} />
                              <AvatarFallback>
                                <Building className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{page.name}</p>
                              <p className="text-xs text-muted-foreground">Business Page</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>

              <Button size="sm" disabled={!postContent.trim()} onClick={handleCreatePost}>
                Post
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Feed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="personal" className="flex-1">
            <User className="h-4 w-4 mr-2" />
            For You
          </TabsTrigger>
          <TabsTrigger value="following" className="flex-1">
            <Building className="h-4 w-4 mr-2" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="events" className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Events
          </TabsTrigger>
          <TabsTrigger value="nearby" className="flex-1">
            <MapPin className="h-4 w-4 mr-2" />
            Nearby
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex-1">
            <Briefcase className="h-4 w-4 mr-2" />
            Jobs
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Feed Posts */}
      <div className="space-y-4">
        {mockPosts
          .filter((post) => {
            if (activeTab === "personal") return true
            if (activeTab === "following") return false
            return true // For now, show all posts in other tabs
          })
          .map((post) => (
            <EnhancedPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  )
}
