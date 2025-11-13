"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { Bookmark, Search, Filter, Grid3X3, List, Clock, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

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
  },
]

export function SavedPostsCollection() {
  const [view, setView] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = SAVED_POSTS.filter(
    (post) =>
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              Saved Posts
            </CardTitle>
            <CardDescription>Posts you've saved to revisit later</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("grid")}
              className={view === "grid" ? "bg-muted" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView("list")}
              className={view === "list" ? "bg-muted" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved posts"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
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
                          <img src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
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
                          <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto" />
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
                    {searchQuery ? "Try a different search term" : "Start saving posts to see them here"}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="mt-0">
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No saved articles</h3>
              <p className="mt-1 text-sm text-muted-foreground">Articles you save will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="jobs" className="mt-0">
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No saved jobs</h3>
              <p className="mt-1 text-sm text-muted-foreground">Jobs you save will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="media" className="mt-0">
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No saved media</h3>
              <p className="mt-1 text-sm text-muted-foreground">Media posts you save will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline">Load more</Button>
      </CardFooter>
    </Card>
  )
}
