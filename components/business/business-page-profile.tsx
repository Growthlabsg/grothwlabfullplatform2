"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Building, 
  Globe, 
  MapPin, 
  Calendar, 
  Users, 
  Edit, 
  Share2, 
  Bell, 
  BellOff,
  ChevronLeft,
  Star,
  MessageSquare,
  ExternalLink,
  Briefcase,
  TrendingUp,
  Layers,
  Award,
  BarChart3,
  Clock,
  Mail,
  Phone,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { BusinessPageService } from "@/lib/business-page-service"
import { useAuth } from "@/contexts/auth-context"
import { Post } from "@/components/feed/linkedin-style/post"
import type { BusinessPage, BusinessPageRole } from "@/types/business-page"
import type { Post as PostType } from "@/types/feed"
import Image from "next/image"

// Mock posts for the business page
const mockPosts: PostType[] = [
  {
    id: "bp-post-1",
    author: {
      id: "bp1",
      name: "GrowthLab",
      headline: "Business Development",
      avatar: "/images/GrowthLab Icon (1).png",
      verified: true,
    },
    content:
      "Excited to announce our upcoming Startup Pitch Competition! Join us on May 24th to showcase your innovative ideas and connect with potential investors. Register now at growthlab.sg/pitch-competition",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    likes: 45,
    comments: 12,
    reposts: 8,
    tags: ["startup", "pitching", "funding", "singapore"],
    image: "/startup-pitch-competition.png",
  },
  {
    id: "bp-post-2",
    author: {
      id: "bp1",
      name: "GrowthLab",
      headline: "Business Development",
      avatar: "/images/GrowthLab Icon (1).png",
      verified: true,
    },
    content:
      "Our Virtual Networking Event last week was a huge success! Thank you to all 200+ participants who joined us from across Southeast Asia. The connections made and insights shared were truly valuable. Looking forward to hosting more such events in the future!",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    likes: 78,
    comments: 23,
    reposts: 15,
    image: "/virtual-networking-event.png",
  },
]

// Mock data for business page details
const mockBusinessData = {
  id: "1",
  name: "GrowthLab",
  handle: "growthlab",
  logo: "/images/GrowthLab Icon (1).png",
  description: "Empowering startups and entrepreneurs across Southeast Asia with comprehensive support, resources, and networking opportunities.",
  longDescription:
    "GrowthLab is a leading startup ecosystem builder in Southeast Asia, dedicated to fostering innovation and entrepreneurship. We provide comprehensive support to startups at every stage of their journey, from ideation to scale-up. Our platform connects founders with mentors, investors, and resources needed to build successful businesses. With a network of over 2,000+ startups and 500+ mentors, we've helped companies raise over $50M in funding and create thousands of jobs across the region.",
  industry: "Startup Ecosystem",
  location: "Singapore",
  founded: "2020",
  funding: "$2.5M",
  employees: "25-50",
  stage: "Series A",
  website: "https://growthlab.sg",
  email: "hello@growthlab.sg",
  phone: "+65 6789 0123",
  tags: ["Startup Ecosystem", "Mentorship", "Networking", "Funding"],
  featured: true,
  verified: true,
  followers: 1240,
  views: 8900,
  founders: [
    {
      name: "Sarah Chen",
      title: "CEO & Founder",
      bio: "Former Google Product Manager with 10+ years in startup ecosystem building",
      avatar: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/sarahchen",
    },
    {
      name: "Michael Tan",
      title: "CTO & Co-founder",
      bio: "Ex-Microsoft engineer with expertise in scalable platforms",
      avatar: "/placeholder.svg",
      linkedin: "https://linkedin.com/in/michaeltan",
    },
  ],
  investors: [
    {
      name: "Temasek Holdings",
      type: "Sovereign Wealth Fund",
      logo: "/placeholder.svg",
    },
    {
      name: "Sequoia Capital",
      type: "Venture Capital",
      logo: "/placeholder.svg",
    },
  ],
  milestones: [
    {
      title: "Series A Funding",
      date: "2024-01-15",
      description: "Raised $2.5M in Series A funding to expand across Southeast Asia",
    },
    {
      title: "10,000+ Startups Supported",
      date: "2023-12-01",
      description: "Reached milestone of supporting over 10,000 startups across the region",
    },
    {
      title: "Regional Expansion",
      date: "2023-06-20",
      description: "Expanded operations to Malaysia, Indonesia, and Thailand",
    },
  ],
  team: [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      department: "Leadership",
      avatar: "/placeholder.svg",
    },
    {
      name: "Michael Tan",
      role: "CTO",
      department: "Engineering",
      avatar: "/placeholder.svg",
    },
    {
      name: "Priya Patel",
      role: "Head of Operations",
      department: "Operations",
      avatar: "/placeholder.svg",
    },
  ],
  jobs: [
    {
      id: "job-1",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Singapore",
      type: "Full-time",
      posted: "2024-01-20",
      applications: 45,
    },
    {
      id: "job-2",
      title: "Business Development Manager",
      department: "Sales",
      location: "Singapore",
      type: "Full-time",
      posted: "2024-01-18",
      applications: 32,
    },
  ],
  updates: [
    {
      id: "update-1",
      title: "New Mentorship Program Launch",
      content: "We're excited to announce our new AI-focused mentorship program, connecting startups with industry experts in artificial intelligence and machine learning.",
      date: "2024-01-25",
      likes: 45,
      comments: 12,
    },
    {
      id: "update-2",
      title: "Regional Expansion to Vietnam",
      content: "GrowthLab is expanding to Vietnam! We're opening our first office in Ho Chi Minh City to better serve the growing startup ecosystem in Vietnam.",
      date: "2024-01-20",
      likes: 78,
      comments: 23,
    },
  ],
}

interface BusinessPageProfileProps {
  handle: string
}

export function BusinessPageProfile({ handle }: BusinessPageProfileProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [businessPage, setBusinessPage] = useState<BusinessPage | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userRole, setUserRole] = useState<BusinessPageRole | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchBusinessPage = async () => {
      try {
        // For demo purposes, use mock data
        setBusinessPage(mockBusinessData as any)
        setIsFollowing(Math.random() > 0.5)
      } catch (error) {
        console.error("Error fetching business page:", error)
        toast({
          title: "Error",
          description: "Failed to load business page. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessPage()
  }, [handle, toast])

  const toggleFollow = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to follow a business page.",
        variant: "destructive",
      })
      return
    }

    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing
        ? `You are no longer following ${businessPage?.name}`
        : `You are now following ${businessPage?.name}`,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-lg" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!businessPage) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Business Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The business page you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/business">Back to My Businesses</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <Link href="/business" className="flex items-center text-[#0F7377] hover:underline mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to My Businesses
        </Link>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="h-24 w-24 md:h-32 md:w-32 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
            <Image src={businessPage?.logo || "/placeholder.svg"} alt={businessPage?.name} fill className="object-contain p-2" />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{businessPage?.name}</h1>
              {businessPage?.verified && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                  Verified
                </Badge>
              )}
              {businessPage?.featured && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-xl text-[#334155] mb-4">{businessPage?.description}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-sm text-[#334155]">
                <Briefcase className="h-4 w-4 mr-2" />
                {businessPage?.industry}
              </div>
              <div className="flex items-center text-sm text-[#334155]">
                <MapPin className="h-4 w-4 mr-2" />
                {businessPage?.location}
              </div>
              <div className="flex items-center text-sm text-[#334155]">
                <Calendar className="h-4 w-4 mr-2" />
                Founded {businessPage?.founded}
              </div>
              <div className="flex items-center text-sm text-[#334155]">
                <TrendingUp className="h-4 w-4 mr-2" />
                {businessPage?.funding || 0} Funding
              </div>
              <div className="flex items-center text-sm text-[#334155]">
                <Users className="h-4 w-4 mr-2" />
                {businessPage?.employees} employees
              </div>
              <div className="flex items-center text-sm text-[#334155]">
                <Layers className="h-4 w-4 mr-2" />
                {businessPage?.stage || "Unknown"}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {businessPage?.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact
              </Button>
              <Button variant="outline" onClick={toggleFollow}>
                <Star className={`h-4 w-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              {businessPage?.website && (
                <Button variant="outline" asChild>
                  <a href={businessPage?.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </a>
                </Button>
              )}
              {userRole === "owner" || userRole === "Owner" && (
                <Button variant="outline" asChild>
                  <Link href={`/business/${businessPage?.handle}/edit`}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>About {businessPage?.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#334155] leading-relaxed">{businessPage?.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Milestones</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {businessPage?.milestones?.map((milestone, index) => (
                      <div key={index} className="relative pl-8">
                        <div className="absolute left-0 top-1 h-5 w-5 rounded-full bg-[#0F7377] flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-white"></div>
                        </div>
                        <div className="border-l-2 border-gray-200 pl-6 pb-6">
                          <h4 className="font-semibold text-lg">{milestone.title}</h4>
                          <p className="text-sm text-[#334155] mb-2">{milestone.date}</p>
                          <p className="text-[#334155]">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{businessPage?.email || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{businessPage?.phone || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <a href={businessPage?.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {businessPage?.website}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Followers</span>
                    <span className="font-semibold">{businessPage?.followers?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile Views</span>
                    <span className="font-semibold">{businessPage?.views?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team Size</span>
                    <span className="font-semibold">{businessPage?.employees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funding Stage</span>
                    <span className="font-semibold">{businessPage?.stage || "Unknown"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
              <CardDescription>Meet the people behind {businessPage?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {businessPage?.team?.map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-xs text-muted-foreground">{member.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Open Positions</CardTitle>
              <CardDescription>Join the team at {businessPage?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {businessPage?.jobs?.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.department}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </span>
                          <span>{job.type}</span>
                          <span>{job.applications} applications</span>
                        </div>
                      </div>
                      <Button size="sm">Apply</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates">
          <div className="space-y-4">
            {businessPage?.updates?.map((update) => (
              <Card key={update.id}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={businessPage?.logo} alt={businessPage?.name} />
                      <AvatarFallback>{businessPage?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{businessPage?.name}</p>
                      <p className="text-xs text-muted-foreground">{update.date}</p>
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{update.title}</h4>
                  <p className="text-[#334155] leading-relaxed">{update.content}</p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investors">
          <Card>
            <CardHeader>
              <CardTitle>Investors</CardTitle>
              <CardDescription>Companies and individuals backing {businessPage?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {businessPage?.investors?.map((investor, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="h-12 w-12 relative rounded-lg overflow-hidden bg-white border border-gray-200">
                      <Image
                        src={investor.logo || "/placeholder.svg"}
                        alt={investor.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{investor.name}</h4>
                      <p className="text-sm text-[#334155]">{investor.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
