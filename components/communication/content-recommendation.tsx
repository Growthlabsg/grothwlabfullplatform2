"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Calendar,
  FileText,
  Lightbulb,
  Link,
  MessageSquare,
  ThumbsUp,
  TrendingUp,
  Users,
  Video,
  Star,
  Bookmark,
  Share2,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentRecommendationProps {
  userId?: string
  className?: string
}

// Mock recommendation data
const mockRecommendations = {
  articles: [
    {
      id: "article1",
      title: "10 Strategies for Startup Growth in Southeast Asia",
      description: "Learn how successful startups are scaling in the ASEAN region",
      author: "Sarah Chen",
      authorAvatar: "/abstract-geometric-shapes.png",
      date: "2 days ago",
      readTime: "8 min read",
      category: "Growth",
      likes: 124,
      comments: 18,
      relevanceScore: 0.92,
      image: "/singapore-startup-collaboration.png",
    },
    {
      id: "article2",
      title: "Fundraising Essentials for Early-Stage Founders",
      description: "A comprehensive guide to raising your first round",
      author: "David Lee",
      authorAvatar: "/thoughtful-portrait.png",
      date: "1 week ago",
      readTime: "12 min read",
      category: "Fundraising",
      likes: 89,
      comments: 24,
      relevanceScore: 0.87,
      image: "/growth-funding.png",
    },
  ],
  events: [
    {
      id: "event1",
      title: "Startup Pitch Night: FinTech Edition",
      description: "10 promising FinTech startups pitch to investors",
      date: "Tomorrow, 6:30 PM",
      location: "GrowthLab HQ",
      attendees: 78,
      category: "Networking",
      relevanceScore: 0.95,
      image: "/startup-demo-day.png",
    },
    {
      id: "event2",
      title: "Founder Fireside Chat: Scaling Challenges",
      description: "Learn from founders who successfully scaled their startups",
      date: "Next Tuesday, 12:00 PM",
      location: "Virtual Event",
      attendees: 120,
      category: "Learning",
      relevanceScore: 0.88,
      image: "/vibrant-startup-gathering.png",
    },
  ],
  people: [
    {
      id: "person1",
      name: "Alex Wong",
      role: "CTO @ TechStart",
      avatar: "/abstract-geometric-aw.png",
      mutualConnections: 12,
      expertise: ["Technical Leadership", "AI", "Product Development"],
      relevanceScore: 0.91,
    },
    {
      id: "person2",
      name: "Mei Lin",
      role: "Investor @ Sequoia",
      avatar: "/machine-learning-concept.png",
      mutualConnections: 5,
      expertise: ["Venture Capital", "FinTech", "SaaS"],
      relevanceScore: 0.89,
    },
  ],
  resources: [
    {
      id: "resource1",
      title: "Startup Financial Model Template",
      description: "Comprehensive Excel template for financial projections",
      author: "GrowthLab Finance Team",
      downloads: 1245,
      category: "Finance",
      type: "Template",
      relevanceScore: 0.94,
      icon: "FileText",
    },
    {
      id: "resource2",
      title: "Investor Pitch Deck Workshop",
      description: "Learn how to create a compelling pitch deck",
      author: "David Lee",
      views: 3420,
      category: "Fundraising",
      type: "Video",
      relevanceScore: 0.86,
      icon: "Video",
    },
  ],
}

export function ContentRecommendation({ userId = "current-user", className }: ContentRecommendationProps) {
  const [activeTab, setActiveTab] = useState("articles")
  const [recommendations, setRecommendations] = useState(mockRecommendations)
  const [isLoading, setIsLoading] = useState(false)
  const [savedItems, setSavedItems] = useState<string[]>([])

  // Simulate loading recommendations based on user activity
  useEffect(() => {
    setIsLoading(true)
    // In a real app, this would fetch personalized recommendations from an API
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const handleSaveItem = (itemId: string) => {
    setSavedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "FileText":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "Video":
        return <Video className="h-10 w-10 text-purple-500" />
      default:
        return <FileText className="h-10 w-10 text-blue-500" />
    }
  }

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <p className="text-sm text-muted-foreground">Personalized content based on your interests and activity</p>
          </div>
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
            <TabsTrigger value="articles" className="text-sm py-1 px-2 h-8">
              <BookOpen className="h-4 w-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="events" className="text-sm py-1 px-2 h-8">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="people" className="text-sm py-1 px-2 h-8">
              <Users className="h-4 w-4 mr-2" />
              People
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-sm py-1 px-2 h-8">
              <FileText className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="articles" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {recommendations.articles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary/90">{article.category}</Badge>
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={article.authorAvatar || "/placeholder.svg"} alt={article.author} />
                              <AvatarFallback>{article.author.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm text-muted-foreground">
                              {article.author} • {article.date}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {article.readTime}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">{article.title}</CardTitle>
                        <CardDescription>{article.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <div className="flex items-center mr-4">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span>{article.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{article.comments}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{Math.round(article.relevanceScore * 100)}% relevant to you</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleSaveItem(article.id)}>
                            <Bookmark
                              className={cn("h-4 w-4", savedItems.includes(article.id) && "fill-current text-primary")}
                            />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="events" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {recommendations.events.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-48 md:h-auto relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-primary/90">{event.category}</Badge>
                    </div>
                    <div className="md:w-2/3 flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 flex-1">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{Math.round(event.relevanceScore * 100)}% relevant to you</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            RSVP
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="people" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.people.map((person) => (
                <Card key={person.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                        <AvatarFallback>{person.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{person.name}</CardTitle>
                        <CardDescription>{person.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{person.mutualConnections} mutual connections</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Expertise:</p>
                        <div className="flex flex-wrap gap-1">
                          {person.expertise.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Lightbulb className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{Math.round(person.relevanceScore * 100)}% match</span>
                    </div>
                    <Button>Connect</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="resources" className="flex-1 p-0 m-0">
          <ScrollArea className="flex-1">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.resources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{resource.type}</Badge>
                      <Badge variant="secondary">{resource.category}</Badge>
                    </div>
                    <div className="flex items-start space-x-4 mt-2">
                      {renderIcon(resource.icon)}
                      <div>
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {resource.author}</span>
                      <span>
                        {resource.downloads ? <>{resource.downloads} downloads</> : <>{resource.views} views</>}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 mr-1 text-amber-500" />
                      <span>4.8/5 (24 ratings)</span>
                    </div>
                    <Button>{resource.type === "Video" ? "Watch" : "Download"}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
