"use client"

import { useState, useEffect } from "react"
import { Search, Users, Briefcase, Lightbulb, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type DiscoveryItem = {
  id: string
  type: "person" | "startup" | "investor" | "job" | "event" | "insight"
  title: string
  description: string
  image?: string
  tags: string[]
  relevanceScore: number
  date?: string
}

const mockDiscoveryData: DiscoveryItem[] = [
  {
    id: "1",
    type: "person",
    title: "Sarah Chen",
    description: "AI Research Lead at TechVision • Previously at Stanford AI Lab",
    image: "/abstract-aj.png",
    tags: ["AI", "Machine Learning", "Research"],
    relevanceScore: 92,
  },
  {
    id: "2",
    type: "startup",
    title: "GreenPath Logistics",
    description: "Sustainable last-mile delivery solutions using electric vehicles",
    image: "/green-path-logistics.png",
    tags: ["Logistics", "Sustainability", "Series A"],
    relevanceScore: 88,
  },
  {
    id: "3",
    type: "investor",
    title: "Horizon Ventures",
    description: "Early-stage VC firm focusing on deep tech and sustainability",
    image: "/abstract-hv.png",
    tags: ["Venture Capital", "Deep Tech", "Sustainability"],
    relevanceScore: 85,
  },
  {
    id: "4",
    type: "job",
    title: "Senior Full Stack Developer",
    description: "Join FinTech Flow to build the future of financial inclusion",
    image: "/fintech-flow.png",
    tags: ["Remote", "Full Stack", "React", "Node.js"],
    relevanceScore: 90,
    date: "2 days ago",
  },
  {
    id: "5",
    type: "event",
    title: "Singapore Startup Summit",
    description: "Annual gathering of the brightest minds in the startup ecosystem",
    image: "/singapore-startup-collaboration.png",
    tags: ["Networking", "Pitching", "Workshops"],
    relevanceScore: 82,
    date: "May 15-17, 2023",
  },
  {
    id: "6",
    type: "insight",
    title: "AI Funding Trends in Southeast Asia",
    description: "Analysis of investment patterns in AI startups across the region",
    image: "/AI-Healthcare-Integration.png",
    tags: ["Market Research", "AI", "Investment"],
    relevanceScore: 87,
    date: "Updated weekly",
  },
]

export function SmartDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [discoveryItems, setDiscoveryItems] = useState<DiscoveryItem[]>(mockDiscoveryData)

  useEffect(() => {
    // Filter items based on search query and active tab
    let filtered = mockDiscoveryData

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (activeTab !== "all") {
      filtered = filtered.filter((item) => item.type === activeTab)
    }

    // Sort by relevance score
    filtered = filtered.sort((a, b) => b.relevanceScore - a.relevanceScore)

    setDiscoveryItems(filtered)
  }, [searchQuery, activeTab])

  const getIconForType = (type: string) => {
    switch (type) {
      case "person":
        return <Users className="h-4 w-4" />
      case "startup":
      case "investor":
        return <TrendingUp className="h-4 w-4" />
      case "job":
        return <Briefcase className="h-4 w-4" />
      case "event":
      case "insight":
        return <Lightbulb className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Smart Discovery</h2>
        <p className="text-muted-foreground">
          Discover relevant connections, opportunities, and insights tailored to your profile and interests.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for people, startups, jobs, events, and more..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="person">People</TabsTrigger>
          <TabsTrigger value="startup">Startups</TabsTrigger>
          <TabsTrigger value="investor">Investors</TabsTrigger>
          <TabsTrigger value="job">Jobs</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {discoveryItems.length > 0 ? (
          discoveryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.image || "/placeholder.svg"} alt={item.title} />
                      <AvatarFallback>{item.title.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-1">{item.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    {getIconForType(item.type)}
                    <span className="capitalize">{item.type}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                {item.date && <span className="text-xs text-muted-foreground">{item.date}</span>}
                <Button variant="ghost" size="sm" className="ml-auto">
                  Connect
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <p className="text-muted-foreground">No results found. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
