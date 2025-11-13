"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Users,
  MessageSquare,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
  BookmarkCheck,
  Star,
  Award,
  Clock,
  Globe,
  Lock,
  Unlock,
  TrendingUp,
  Heart,
  Reply,
  Flag,
  MoreHorizontal,
  Send,
  Image,
  Link as LinkIcon,
  Video,
  FileText,
  Calendar,
  MapPin,
  Building2,
  Target,
  Zap
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CommunityPage() {
  const { toast } = useToast()
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")
  const [newPost, setNewPost] = useState("")
  const [showCreatePost, setShowCreatePost] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const discussions = [
    {
      id: 1,
      title: "Best practices for startup pitch decks",
      content: "I'm working on my pitch deck and would love to hear from others who have successfully raised funding. What are the key slides that investors really care about?",
      author: {
        name: "Sarah Johnson",
        avatar: "/professional-woman-diverse.png",
        title: "Founder at TechStart",
        verified: true
      },
      category: "Funding",
      tags: ["Pitch Deck", "Fundraising", "Investors"],
      likes: 24,
      comments: 8,
      views: 156,
      timeAgo: "2 hours ago",
      isLiked: false,
      isBookmarked: false,
      isPinned: true
    },
    {
      id: 2,
      title: "Marketing strategies for early-stage startups",
      content: "We're a B2B SaaS startup with limited budget. What are the most effective marketing channels we should focus on? Looking for practical advice from fellow founders.",
      author: {
        name: "Mike Chen",
        avatar: "/tech-professional.png",
        title: "CMO at DataFlow",
        verified: false
      },
      category: "Marketing",
      tags: ["Marketing", "B2B", "SaaS"],
      likes: 18,
      comments: 12,
      views: 89,
      timeAgo: "4 hours ago",
      isLiked: true,
      isBookmarked: false,
      isPinned: false
    },
    {
      id: 3,
      title: "Product development methodology recommendations",
      content: "We're transitioning from waterfall to agile development. Any recommendations for tools and processes that work well for startup teams?",
      author: {
        name: "Alex Kim",
        avatar: "/product-manager.png",
        title: "Product Director",
        verified: true
      },
      category: "Product",
      tags: ["Product Development", "Agile", "Tools"],
      likes: 15,
      comments: 6,
      views: 67,
      timeAgo: "6 hours ago",
      isLiked: false,
      isBookmarked: true,
      isPinned: false
    }
  ]

  const events = [
    {
      id: 1,
      title: "Startup Networking Mixer",
      description: "Join us for an evening of networking with fellow entrepreneurs and investors",
      date: "2024-01-25",
      time: "18:00",
      location: "San Francisco, CA",
      attendees: 45,
      maxAttendees: 100,
      type: "Networking",
      isRegistered: false
    },
    {
      id: 2,
      title: "Pitch Practice Session",
      description: "Practice your pitch and get feedback from experienced founders",
      date: "2024-01-28",
      time: "14:00",
      location: "Online",
      attendees: 23,
      maxAttendees: 30,
      type: "Workshop",
      isRegistered: true
    }
  ]

  const members = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/professional-woman-diverse.png",
      title: "Venture Capital Partner",
      company: "TechVentures",
      location: "San Francisco, CA",
      skills: ["Venture Capital", "Startup Investing", "Mentoring"],
      isOnline: true,
      mutualConnections: 12
    },
    {
      id: 2,
      name: "David Wong",
      avatar: "/tech-professional.png",
      title: "Startup Advisor",
      company: "GrowthLab",
      location: "New York, NY",
      skills: ["Strategy", "Growth", "Operations"],
      isOnline: false,
      mutualConnections: 8
    },
    {
      id: 3,
      name: "Maya Singh",
      avatar: "/marketing-professional.png",
      title: "Growth Marketing Expert",
      company: "ScaleUp Inc",
      location: "Austin, TX",
      skills: ["Marketing", "Growth", "Digital Strategy"],
      isOnline: true,
      mutualConnections: 15
    }
  ]

  const handleLike = (discussionId: number) => {
    toast({
      title: "Liked",
      description: "You liked this discussion.",
    })
  }

  const handleBookmark = (discussionId: number) => {
    toast({
      title: "Bookmarked",
      description: "Discussion added to your bookmarks.",
    })
  }

  const handleShare = (discussionId: number) => {
    toast({
      title: "Shared",
      description: "Discussion link copied to clipboard.",
    })
  }

  const handleCreatePost = () => {
    if (newPost.trim()) {
      toast({
        title: "Post Created",
        description: "Your discussion post has been published.",
      })
      setNewPost("")
      setShowCreatePost(false)
    }
  }

  const handleRegisterEvent = (eventId: number) => {
    toast({
      title: "Registered",
      description: "You have been registered for this event.",
    })
  }

  const handleConnect = (memberId: number) => {
    toast({
      title: "Connection Request Sent",
      description: "Your connection request has been sent.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Community</h1>
                <p className="text-sm text-gray-600">Connect with fellow entrepreneurs and learn together</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreatePost(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Events
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search discussions, events, or members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            {/* Create Post */}
            {showCreatePost && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Discussion</CardTitle>
                  <CardDescription>Start a conversation with the community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Discussion title" />
                  <Textarea
                    placeholder="What would you like to discuss?"
                    rows={4}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                  />
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePost}>
                      <Send className="h-4 w-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={discussion.author.avatar} />
                          <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{discussion.author.name}</h3>
                            {discussion.author.verified && (
                              <Badge variant="outline" className="text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{discussion.author.title}</p>
                          <p className="text-xs text-gray-500">{discussion.timeAgo}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {discussion.isPinned && (
                          <Badge variant="outline" className="text-xs">
                            Pinned
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">{discussion.title}</h4>
                      <p className="text-gray-700">{discussion.content}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">{discussion.category}</Badge>
                      {discussion.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(discussion.id)}
                          className={discussion.isLiked ? "text-blue-600" : ""}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {discussion.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {discussion.comments}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          {discussion.views}
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(discussion.id)}
                        >
                          {discussion.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(discussion.id)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees}/{event.maxAttendees} attendees
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {event.isRegistered ? "Registered" : "Not registered"}
                      </div>
                      <Button
                        size="sm"
                        variant={event.isRegistered ? "outline" : "default"}
                        onClick={() => handleRegisterEvent(event.id)}
                      >
                        {event.isRegistered ? "Unregister" : "Register"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <Card key={member.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          {member.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-gray-600">{member.title}</p>
                          <p className="text-xs text-gray-500">{member.company}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {member.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {member.mutualConnections} mutual connections
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleConnect(member.id)}
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
