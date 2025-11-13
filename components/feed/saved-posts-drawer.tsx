"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Search, Filter, Grid3X3, List, Clock, ThumbsUp, MessageSquare, Share2, Folder } from "lucide-react"

interface SavedPostsDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock data for saved posts
const SAVED_POSTS = [
  {
    id: 1,
    author: {
      name: "Jane Cooper",
      role: "Co-Founder at TechStart",
      avatar: "/serene-woman-gaze.png",
    },
    content:
      "Just secured our seed funding round! Excited to share that TechStart has raised $1.2M to build the future of AI-powered customer service.",
    image: "/champagne-toast-success.png",
    likes: 128,
    comments: 32,
    shares: 14,
    savedAt: "2023-10-15T14:30:00Z",
    folder: "Funding",
  },
  {
    id: 2,
    author: {
      name: "Alex Morgan",
      role: "Venture Partner at Sequoia",
      avatar: "/thoughtful-man-profile.png",
    },
    content:
      "Looking for early-stage startups in the fintech space. If you're building something innovative, let's connect!",
    image: null,
    likes: 89,
    comments: 45,
    shares: 7,
    savedAt: "2023-10-12T09:15:00Z",
    folder: "Investors",
  },
  {
    id: 3,
    author: {
      name: "Sarah Williams",
      role: "CEO at HealthTech Solutions",
      avatar: "/confident-executive.png",
    },
    content:
      "Sharing our latest case study on how we helped a healthcare provider reduce patient wait times by 40% using our platform.",
    image: "/interconnected-healthcare.png",
    likes: 215,
    comments: 28,
    shares: 42,
    savedAt: "2023-10-08T16:45:00Z",
    folder: "Case Studies",
  },
  {
    id: 4,
    author: {
      name: "David Chen",
      role: "Product Manager at Google",
      avatar: "/thoughtful-urban-man.png",
    },
    content: "We're hiring! Looking for talented engineers to join our team. Remote positions available.",
    image: "/modern-tech-workspace.png",
    likes: 176,
    comments: 53,
    shares: 31,
    savedAt: "2023-10-05T11:20:00Z",
    folder: "Jobs",
  },
]

// Mock data for folders
const FOLDERS = [
  { id: 1, name: "All", count: SAVED_POSTS.length },
  { id: 2, name: "Funding", count: 1 },
  { id: 3, name: "Investors", count: 1 },
  { id: 4, name: "Case Studies", count: 1 },
  { id: 5, name: "Jobs", count: 1 },
]

export function SavedPostsDrawer({ open, onOpenChange }: SavedPostsDrawerProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [view, setView] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("All")

  const filteredPosts = SAVED_POSTS.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFolder = selectedFolder === "All" || post.folder === selectedFolder
    return matchesSearch && matchesFolder
  })

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bookmark className="h-5 w-5" />
            Saved Posts
          </SheetTitle>
        </SheetHeader>

        <div className="flex items-center gap-2 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved posts"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("grid")}
            className={view === "grid" ? "bg-muted" : ""}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("list")}
            className={view === "list" ? "bg-muted" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex mt-4 gap-4">
          <div className="w-1/3">
            <h3 className="text-sm font-medium mb-2">Folders</h3>
            <div className="space-y-1">
              {FOLDERS.map((folder) => (
                <Button
                  key={folder.id}
                  variant="ghost"
                  className={`w-full justify-start ${selectedFolder === folder.name ? "bg-muted" : ""}`}
                  onClick={() => setSelectedFolder(folder.name)}
                >
                  <Folder className="h-4 w-4 mr-2" />
                  <span className="flex-1 text-left">{folder.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {folder.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          <div className="w-2/3">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{post.author.name}</div>
                              <div className="text-sm text-muted-foreground">{post.author.role}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                Saved {new Date(post.savedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm mb-3">{post.content}</p>
                          {post.image && (
                            <div className="rounded-md overflow-hidden mb-3">
                              <img
                                src={post.image || "/placeholder.svg"}
                                alt="Post content"
                                className="w-full h-auto"
                              />
                            </div>
                          )}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span className="flex items-center">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {post.likes}
                              </span>
                              <span className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                {post.comments}
                              </span>
                              <span className="flex items-center">
                                <Share2 className="h-4 w-4 mr-1" />
                                {post.shares}
                              </span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Bookmark className="h-4 w-4 mr-1 fill-current" />
                              Unsave
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No saved posts found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {searchQuery
                          ? "Try a different search term"
                          : "You haven't saved any posts yet. Click the bookmark icon on posts to save them for later."}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-0">
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No saved articles</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You haven't saved any articles yet. Click the bookmark icon on articles to save them for later.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="jobs" className="mt-0">
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No saved jobs</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You haven't saved any jobs yet. Click the bookmark icon on job posts to save them for later.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="media" className="mt-0">
                <div className="text-center py-8">
                  <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No saved media</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You haven't saved any media yet. Click the bookmark icon on media posts to save them for later.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
