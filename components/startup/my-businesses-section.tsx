"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Building2, 
  Plus, 
  Settings, 
  Globe, 
  Eye, 
  Users, 
  TrendingUp,
  MapPin,
  Calendar,
  Edit,
  BarChart3,
  Share2,
  MessageSquare,
  Image,
  Video,
  Link as LinkIcon,
  Mail,
  ArrowUpRight,
  Award,
  Target,
  Lightbulb,
  Building
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// BusinessPage interface
interface BusinessPage {
  id: string
  name: string
  handle: string
  description: string
  industry: string
  location: string
  logo: string
  coverImage?: string
  followers: number
  views: number
  size: string
  growthRate: number
  status: "active" | "draft" | "archived"
  isFeatured: boolean
  funding?: string
  stage?: string
  employees?: number
  website?: string
  email?: string
  tags?: string[]
  verified?: boolean
  hiring?: boolean
  openPositions?: number
  partnerships?: boolean
  visaSponsorship?: boolean
}

// Mock data for business pages
const MOCK_BUSINESS_PAGES: BusinessPage[] = [
  {
    id: "1",
    name: "TechNova Solutions",
    handle: "technova-solutions",
    description: "AI-powered solutions for enterprise workflow automation and productivity enhancement.",
    industry: "Artificial Intelligence",
    location: "Singapore",
    logo: "/Tennessee_Landscape.png",
    coverImage: "/abstract-geometric-shapes.png",
    followers: 1240,
    views: 8900,
    size: "11-50",
    growthRate: 45,
    status: "active",
    isFeatured: true,
    funding: "$2.5M",
    stage: "Series A",
    employees: 25,
    website: "https://technova.ai",
    email: "contact@technova.ai",
    tags: ["AI", "Enterprise", "SaaS"],
    verified: true,
    hiring: true,
    openPositions: 8,
    partnerships: true,
    visaSponsorship: false
  },
  {
    id: "2",
    name: "FinFlow Pro",
    handle: "finflow-pro",
    description: "Next-generation financial technology for SMEs and startups.",
    industry: "Financial Technology",
    location: "Singapore",
    logo: "/fintech-flow.png",
    coverImage: "/interconnected-world.png",
    followers: 890,
    views: 5600,
    size: "1-10",
    growthRate: 120,
    status: "active",
    isFeatured: false,
    funding: "$500K",
    stage: "Seed",
    employees: 8,
    website: "https://finflow.pro",
    email: "hello@finflow.pro",
    tags: ["FinTech", "SME", "Payments"],
    verified: false,
    hiring: false,
    openPositions: 0,
    partnerships: false,
    visaSponsorship: true
  },
  {
    id: "3",
    name: "HealthAI Diagnostics",
    handle: "healthai-diagnostics",
    description: "AI-powered healthcare diagnostics and patient monitoring solutions.",
    industry: "Healthcare Technology",
    location: "Singapore",
    logo: "/chemical-structure-hyaluronic-acid.png",
    coverImage: "/abstract-geometric-shapes.png",
    followers: 2100,
    views: 12000,
    size: "11-50",
    growthRate: 85,
    status: "active",
    isFeatured: true,
    funding: "$3.2M",
    stage: "Series A",
    employees: 35,
    website: "https://healthai.diagnostics",
    email: "info@healthai.diagnostics",
    tags: ["Healthcare", "AI", "Diagnostics"],
    verified: true,
    hiring: true,
    openPositions: 12,
    partnerships: true,
    visaSponsorship: true
  }
]

export function MyBusinessesSection() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [businessPages, setBusinessPages] = useState<BusinessPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showPostDialog, setShowPostDialog] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessPage | null>(null)
  const [postContent, setPostContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [postType, setPostType] = useState<"text" | "image" | "video" | "link">("text")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setBusinessPages(MOCK_BUSINESS_PAGES)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "✅"
      case "draft":
        return "📝"
      case "archived":
        return "📁"
      default:
        return "📄"
    }
  }

  const handlePostToFeed = (business: BusinessPage) => {
    setSelectedBusiness(business)
    setPostContent("")
    setPostType("text")
    setShowPostDialog(true)
  }

  const handleSubmitPost = async () => {
    if (!selectedBusiness || !postContent.trim()) return

    setIsPosting(true)
    try {
      // Simulate posting to feed
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Post published!",
        description: `Your post from ${selectedBusiness.name} has been published to the feed.`,
      })
      
      setShowPostDialog(false)
      setSelectedBusiness(null)
      setPostContent("")
    } catch (error) {
      console.error("Error posting to feed:", error)
      toast({
        title: "Error",
        description: "Failed to post to feed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPosting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">My Businesses</h2>
            <p className="text-muted-foreground">Manage your business pages and showcase them in the network</p>
          </div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="h-16 w-16 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0 animate-pulse bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mr-2"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-2"></div>
                    <div className="flex flex-wrap gap-4 mt-3">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">My Businesses</h2>
          <p className="text-muted-foreground">Manage your business pages and showcase them in the network directory</p>
        </div>
        <Button asChild>
          <Link href="/business">
            <Plus className="mr-2 h-4 w-4" /> Create Business Page
          </Link>
        </Button>
      </div>

      {businessPages.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Building2 className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">No business pages yet</h3>
              <p className="text-muted-foreground mt-1">
                Create your first business page to showcase your startup in the network directory.
              </p>
            </div>
            <Button asChild>
              <Link href="/business">
                <Plus className="mr-2 h-4 w-4" /> Create Business Page
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-lg font-semibold">Your Business Pages ({businessPages.length})</h3>
              <Badge variant="secondary" className="text-xs">
                {businessPages.filter(b => b.isFeatured).length} Featured
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Total Followers: {businessPages.reduce((sum, b) => sum + b.followers, 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            {businessPages.map((business) => (
              <Card key={business.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="h-16 w-16 relative rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="object-cover w-full h-full"
                       alt="" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold mr-2">{business.name}</h3>
                          {business.verified && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {business.isFeatured && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs ml-2">
                              ⭐ Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handlePostToFeed(business)}>
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Post
                          </Button>
                          <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                            <Link href={`/business/${business.handle}`}>
                              View Page
                              <ArrowUpRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <p className="text-[#334155] mt-1">{business.description}</p>
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#334155]">
                        <div className="flex items-center">
                          <Building className="h-3 w-3 mr-1" />
                          {business.industry}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {business.location}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {business.funding} Funding
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {business.followers.toLocaleString()} followers
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {business.views.toLocaleString()} views
                        </div>
                        <div className="flex items-center">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          {business.size} employees
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/business/${business.handle}/analytics`}>
                              <BarChart3 className="h-3 w-3 mr-1" />
                              Analytics
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/business/${business.handle}/settings`}>
                              <Settings className="h-3 w-3 mr-1" />
                              Settings
                            </Link>
                          </Button>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/business/${business.handle}/edit`}>
                              <Edit className="h-3 w-3 mr-1" />
                              Edit
                            </Link>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          {business.hiring && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 text-xs">
                              <Target className="h-3 w-3 mr-1" />
                              {business.openPositions} positions
                            </Badge>
                          )}
                          {business.partnerships && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100 text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              Partnerships
                            </Badge>
                          )}
                          {business.visaSponsorship && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              Visa Sponsorship
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-[#0F7377]/10 to-[#0F7377]/5 rounded-lg border border-[#0F7377]/20">
            <div className="flex items-start gap-4">
              <div className="bg-[#0F7377]/10 p-3 rounded-lg">
                <Globe className="h-6 w-6 text-[#0F7377]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Network Directory Benefits</h3>
                <p className="text-[#334155] mb-4">
                  Your business pages are automatically featured in the GrowthLab startup directory, making them discoverable by investors, partners, and potential customers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-[#0F7377]" />
                    <span className="text-sm">Increased visibility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#0F7377]" />
                    <span className="text-sm">Network connections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[#0F7377]" />
                    <span className="text-sm">Growth opportunities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Post to Feed Dialog */}
      <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Post to Feed from {selectedBusiness?.name}</DialogTitle>
            <DialogDescription>
              Create a post that will appear in the GrowthLab feed from your business page.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Post Type Selection */}
            <div className="flex gap-2">
              <Button
                variant={postType === "text" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType("text")}
              >
                <MessageSquare className="mr-2 h-4 w-4" /> Text
              </Button>
              <Button
                variant={postType === "image" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType("image")}
              >
                <Image className="mr-2 h-4 w-4" /> Image
              </Button>
              <Button
                variant={postType === "video" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType("video")}
              >
                <Video className="mr-2 h-4 w-4" /> Video
              </Button>
              <Button
                variant={postType === "link" ? "default" : "outline"}
                size="sm"
                onClick={() => setPostType("link")}
              >
                <LinkIcon className="mr-2 h-4 w-4" /> Link
              </Button>
            </div>

            {/* Business Page Info */}
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={selectedBusiness?.logo} alt={selectedBusiness?.name} />
                <AvatarFallback>{selectedBusiness?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedBusiness?.name}</p>
                <p className="text-sm text-muted-foreground">Business Page</p>
              </div>
              <Badge variant="secondary">Business Post</Badge>
            </div>

            {/* Content Input */}
            <div className="space-y-2">
              <Textarea
                placeholder={`What's happening at ${selectedBusiness?.name}? Share updates, announcements, or insights...`}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[120px]"
                maxLength={1000}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Posting as {selectedBusiness?.name}</span>
                <span>{postContent.length}/1000</span>
              </div>
            </div>

            {/* Additional Options */}
            {postType === "image" && (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload image</p>
              </div>
            )}

            {postType === "video" && (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload video</p>
              </div>
            )}

            {postType === "link" && (
              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="Enter URL..."
                  className="w-full px-3 py-2 border border-input rounded-md"
                />
                <p className="text-xs text-muted-foreground">The link preview will be automatically generated</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPostDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitPost} 
              disabled={!postContent.trim() || isPosting}
            >
              {isPosting ? "Publishing..." : "Publish to Feed"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
