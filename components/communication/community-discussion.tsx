"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  MessageSquare,
  ThumbsUp,
  Share,
  Flag,
  Bookmark,
  Heart,
  Send,
  Filter,
  TrendingUp,
  Clock,
  Users,
  Tag,
  MoreVertical,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CommunityDiscussionProps {
  communityId?: string
  className?: string
}

// Mock community data
const mockCommunities = [
  {
    id: "founders",
    name: "Founder Community",
    members: 1450,
    posts: 324,
    topics: ["Fundraising", "Growth", "Product"],
  },
  { id: "investors", name: "Investor Network", members: 580, posts: 156, topics: ["Deals", "Due Diligence", "Exits"] },
  { id: "mentors", name: "Mentor Circle", members: 420, posts: 210, topics: ["Advice", "Coaching", "Leadership"] },
]

// Mock discussion posts
const mockPosts = [
  {
    id: "post1",
    author: {
      id: "user1",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      role: "Founder @ HealthTech",
    },
    content:
      "Has anyone used AI tools for customer feedback analysis? Looking for recommendations on what works best for early-stage startups.",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    tags: ["AI", "Customer Feedback", "Tools"],
    isLiked: false,
    isBookmarked: false,
    commentsList: [
      {
        id: "comment1",
        author: {
          id: "user2",
          name: "Alex Wong",
          avatar: "/abstract-geometric-aw.png",
          role: "CTO @ TechStart",
        },
        content: "We've been using Viable for this and it's been great for summarizing themes from customer feedback.",
        timestamp: "1 hour ago",
        likes: 5,
      },
      {
        id: "comment2",
        author: {
          id: "user3",
          name: "Mei Lin",
          avatar: "/machine-learning-concept.png",
          role: "Product @ DataCo",
        },
        content: "I recommend trying out Dovetail. It's a bit pricey but the insights are worth it for us.",
        timestamp: "45 minutes ago",
        likes: 3,
      },
    ],
  },
  {
    id: "post2",
    author: {
      id: "user4",
      name: "David Lee",
      avatar: "/thoughtful-portrait.png",
      role: "Investor @ Sequoia",
    },
    content:
      "Just published a new blog post on what we're looking for in pre-seed companies in 2023. The landscape has changed significantly since last year. Happy to answer any questions!",
    timestamp: "5 hours ago",
    likes: 56,
    comments: 12,
    tags: ["Venture Capital", "Pre-Seed", "Fundraising"],
    isLiked: true,
    isBookmarked: true,
    commentsList: [
      {
        id: "comment3",
        author: {
          id: "user5",
          name: "Lisa Park",
          avatar: "/abstract-geometric-shapes.png",
          role: "Founder @ EdTech",
        },
        content: "This was super helpful! Would love to know more about your thoughts on solo founders vs. teams.",
        timestamp: "4 hours ago",
        likes: 8,
      },
    ],
  },
]

export function CommunityDiscussion({ communityId = "founders", className }: CommunityDiscussionProps) {
  const [activeTab, setActiveTab] = useState("trending")
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [posts, setPosts] = useState(mockPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")

  const community = mockCommunities.find((c) => c.id === communityId) || mockCommunities[0]

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleBookmarkPost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isBookmarked: !post.isBookmarked,
          }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId: string) => {
    if (!commentInputs[postId]?.trim()) return

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [
              {
                id: `comment-${Date.now()}`,
                author: {
                  id: "current-user",
                  name: "You",
                  avatar: "/vibrant-street-market.png",
                  role: "Founder @ YourStartup",
                },
                content: commentInputs[postId],
                timestamp: "Just now",
                likes: 0,
              },
              ...post.commentsList,
            ],
          }
        }
        return post
      }),
    )

    setCommentInputs({
      ...commentInputs,
      [postId]: "",
    })
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        id: "current-user",
        name: "You",
        avatar: "/vibrant-street-market.png",
        role: "Founder @ YourStartup",
      },
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      tags: [],
      isLiked: false,
      isBookmarked: false,
      commentsList: [],
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
  }

  const toggleExpandComments = (postId: string) => {
    setExpandedComments({
      ...expandedComments,
      [postId]: !expandedComments[postId],
    })
  }

  const filteredPosts = searchQuery
    ? posts.filter(
        (post) =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : posts

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">{community.name}</h2>
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-1" />
              <span>{community.members} members</span>
              <span className="mx-2">•</span>
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{community.posts} posts</span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Join Community
          </Button>
        </div>

        <div className="relative">
          <Input
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
          <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
            <TabsTrigger value="trending" className="text-sm py-1 px-2 h-8">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="recent" className="text-sm py-1 px-2 h-8">
              <Clock className="h-4 w-4 mr-2" />
              Recent
            </TabsTrigger>
            <TabsTrigger value="topics" className="text-sm py-1 px-2 h-8">
              <Tag className="h-4 w-4 mr-2" />
              Topics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="trending" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Create Post</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Share your thoughts with the community..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Add Tags
                    </Button>
                    <Button variant="outline" size="sm">
                      Attach
                    </Button>
                  </div>
                  <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                    Post
                  </Button>
                </CardFooter>
              </Card>

              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{post.author.name}</CardTitle>
                          <CardDescription>{post.author.role}</CardDescription>
                          <CardDescription>{post.timestamp}</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="whitespace-pre-wrap">{post.content}</p>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-stretch pt-0">
                    <div className="flex items-center justify-between py-2 border-t border-b">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1 h-8 px-2"
                          onClick={() => handleLikePost(post.id)}
                        >
                          {post.isLiked ? (
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                          ) : (
                            <ThumbsUp className="h-4 w-4" />
                          )}
                          <span>{post.likes}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center space-x-1 h-8 px-2"
                          onClick={() => toggleExpandComments(post.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1 h-8 px-2">
                          <Share className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleBookmarkPost(post.id)}
                        >
                          <Bookmark className={cn("h-4 w-4", post.isBookmarked && "fill-current")} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {(expandedComments[post.id] || post.commentsList.length <= 2) && post.commentsList.length > 0 && (
                      <div className="py-2 space-y-3">
                        {post.commentsList.map((comment) => (
                          <div key={comment.id} className="flex space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={comment.author.avatar || "/placeholder.svg"}
                                alt={comment.author.name}
                              />
                              <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted p-2 rounded-md">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <span className="font-medium text-sm">{comment.author.name}</span>
                                    <span className="text-xs text-muted-foreground ml-2">{comment.timestamp}</span>
                                  </div>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-sm mt-1">{comment.content}</p>
                              </div>
                              <div className="flex items-center mt-1 space-x-2">
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  <span>{comment.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {post.commentsList.length > 2 && !expandedComments[post.id] && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => toggleExpandComments(post.id)}
                          >
                            View all {post.comments} comments
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="flex items-center space-x-2 pt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/vibrant-street-market.png" alt="You" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs({
                              ...commentInputs,
                              [post.id]: e.target.value,
                            })
                          }
                          className="pr-10"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {filteredPosts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                  <h3 className="font-medium">No discussions found</h3>
                  <p className="text-sm">Be the first to start a discussion!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="recent" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Recent Discussions</h3>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {/* Same content as trending but sorted by recency */}
              <div className="space-y-4">
                {filteredPosts
                  .sort((a, b) => {
                    // Sort by timestamp (newest first)
                    if (a.timestamp === "Just now") return -1
                    if (b.timestamp === "Just now") return 1
                    return Number.parseInt(a.timestamp) < Number.parseInt(b.timestamp) ? 1 : -1
                  })
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      {/* Same card content as above */}
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <Avatar>
                              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{post.author.name}</CardTitle>
                              <CardDescription>{post.author.role}</CardDescription>
                              <CardDescription>{post.timestamp}</CardDescription>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="whitespace-pre-wrap">{post.content}</p>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex flex-col items-stretch pt-0">
                        <div className="flex items-center justify-between py-2 border-t border-b">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-1 h-8 px-2"
                              onClick={() => handleLikePost(post.id)}
                            >
                              {post.isLiked ? (
                                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                              ) : (
                                <ThumbsUp className="h-4 w-4" />
                              )}
                              <span>{post.likes}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-1 h-8 px-2"
                              onClick={() => toggleExpandComments(post.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center space-x-1 h-8 px-2">
                              <Share className="h-4 w-4" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="topics" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {community.topics.map((topic) => (
                  <Card key={topic} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-base">{topic}</CardTitle>
                      <CardDescription>Discussions related to {topic.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100)} posts</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 50)} contributors
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View Topic
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
