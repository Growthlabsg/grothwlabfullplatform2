"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building, Plus, Settings, Trash2, BarChart, MessageSquare, Image, Video, Link as LinkIcon, Users, ArrowUpRight, MapPin, Eye, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CreateBusinessPageDialog } from "@/components/business/create-business-page-dialog"
import { BusinessPageService } from "@/lib/business-page-service"
import { useAuth } from "@/contexts/auth-context"
import type { BusinessPage } from "@/types/business-page"

export function BusinessPageManager() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [businessPages, setBusinessPages] = useState<BusinessPage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [pageToDelete, setPageToDelete] = useState<BusinessPage | null>(null)
  const [showPostDialog, setShowPostDialog] = useState(false)
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessPage | null>(null)
  const [postContent, setPostContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [postType, setPostType] = useState<"text" | "image" | "video" | "link">("text")

  useEffect(() => {
    const fetchBusinessPages = async () => {
      if (!user) {
        // For testing purposes, show mock data when no user is logged in
        try {
          const mockPages = await BusinessPageService.getAllBusinessPages()
          setBusinessPages(mockPages.slice(0, 2)) // Show first 2 pages as examples
        } catch (error) {
          console.error("Error fetching mock business pages:", error)
          // Fallback to static mock data if service fails
          setBusinessPages([
            {
              id: "mock-1",
              name: "TechCorp Solutions",
              handle: "techcorp",
              description: "Leading technology solutions provider",
              industry: "Technology",
              size: "51-200",
              location: "San Francisco, CA",
              foundedYear: 2020,
              logo: "/images/techcorp-logo.png",
              coverImage: "/images/techcorp-cover.jpg",
              website: "https://techcorp.com",
              contactInfo: {
                email: "contact@techcorp.com",
                phone: "+1 (555) 123-4567",
                address: "123 Tech Street, San Francisco, CA 94105"
              },
              followers: 1250,
              admins: ["demo-user"],
              employees: 150,
              verified: true,
              featured: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tagline: "Innovating the future of technology",
              mission: "To empower businesses with cutting-edge technology solutions",
              vision: "A world where technology seamlessly integrates with human potential",
              values: ["Innovation", "Integrity", "Excellence", "Collaboration"],
              specialties: ["AI/ML", "Cloud Computing", "Cybersecurity", "Data Analytics"],
              services: ["Software Development", "Consulting", "Support", "Training"],
              targetAudience: "Enterprise businesses",
              businessModel: "B2B SaaS",
              fundingStage: "Series A",
              revenue: "$2.5M ARR",
              socialMedia: {
                linkedin: "https://linkedin.com/company/techcorp",
                twitter: "https://twitter.com/techcorp",
                facebook: "https://facebook.com/techcorp",
                instagram: "https://instagram.com/techcorp"
              },
              certifications: ["ISO 27001", "SOC 2 Type II"],
              awards: ["Best Tech Startup 2023", "Innovation Award 2022"],
              partnerships: ["Microsoft", "AWS", "Google Cloud"],
              keyMetrics: {
                customers: 150,
                revenue: 2500000,
                growth: 45
              },
              companyStage: "Growth",
              legalStructure: "Corporation",
              headquarters: "San Francisco, CA",
              remoteWork: true,
              languages: ["English", "Spanish"],
              timezone: "PST",
              longDescription: "TechCorp Solutions is a leading provider of innovative technology solutions that help businesses transform their operations and achieve their digital goals.",
              tags: ["Technology", "AI", "Cloud", "Enterprise"],
              funding: "Series A - $5M raised from Sequoia Capital, Andreessen Horowitz",
              founders: [
                {
                  name: "John Smith",
                  title: "CEO & Co-Founder",
                  bio: "Former Google engineer with 10+ years in tech",
                  avatar: "/images/john-smith.jpg",
                  linkedin: "https://linkedin.com/in/johnsmith"
                }
              ],
              investors: [
                {
                  name: "Sequoia Capital",
                  type: "VC",
                  logo: "/images/sequoia-logo.png"
                }
              ],
              team: [
                {
                  name: "Jane Doe",
                  role: "CTO",
                  department: "Engineering",
                  avatar: "/images/jane-doe.jpg"
                }
              ],
              jobs: [
                {
                  id: "job-1",
                  title: "Senior Software Engineer",
                  department: "Engineering",
                  type: "Full-time",
                  location: "San Francisco, CA",
                  description: "Join our engineering team to build cutting-edge solutions",
                  requirements: ["5+ years experience", "React, Node.js", "AWS"],
                  posted: "2024-01-15"
                }
              ],
              updates: [
                {
                  id: "update-1",
                  title: "Series A Funding Announcement",
                  content: "We're excited to announce our $5M Series A funding round!",
                  author: "John Smith",
                  date: "2024-01-10"
                }
              ],
              milestones: [
                {
                  title: "Company Founded",
                  date: "2020-01-01",
                  description: "TechCorp Solutions was officially founded"
                }
              ]
            },
            {
              id: "mock-2",
              name: "InnovateLab",
              handle: "innovatelab",
              description: "Creative innovation hub for startups",
              industry: "Innovation",
              size: "11-50",
              location: "Austin, TX",
              foundedYear: 2019,
              logo: "/images/innovatelab-logo.png",
              coverImage: "/images/innovatelab-cover.jpg",
              website: "https://innovatelab.com",
              contactInfo: {
                email: "hello@innovatelab.com",
                phone: "+1 (555) 987-6543",
                address: "456 Innovation Drive, Austin, TX 78701"
              },
              followers: 890,
              admins: ["demo-user"],
              employees: 25,
              verified: true,
              featured: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              tagline: "Where ideas become reality",
              mission: "To accelerate innovation and support the next generation of entrepreneurs",
              vision: "A world where every great idea has the opportunity to succeed",
              values: ["Creativity", "Collaboration", "Impact", "Growth"],
              specialties: ["Startup Incubation", "Design Thinking", "Product Development", "Mentorship"],
              services: ["Incubation", "Mentoring", "Workshops", "Networking"],
              targetAudience: "Early-stage startups",
              businessModel: "B2B Services",
              fundingStage: "Bootstrapped",
              revenue: "$500K ARR",
              socialMedia: {
                linkedin: "https://linkedin.com/company/innovatelab",
                twitter: "https://twitter.com/innovatelab",
                facebook: "https://facebook.com/innovatelab",
                instagram: "https://instagram.com/innovatelab"
              },
              certifications: ["B-Corp Certified"],
              awards: ["Best Incubator 2023"],
              partnerships: ["UT Austin", "Austin Chamber"],
              keyMetrics: {
                customers: 75,
                revenue: 500000,
                growth: 30
              },
              companyStage: "Growth",
              legalStructure: "LLC",
              headquarters: "Austin, TX",
              remoteWork: true,
              languages: ["English"],
              timezone: "CST",
              longDescription: "InnovateLab is a creative innovation hub that provides comprehensive support for startups and entrepreneurs looking to bring their ideas to life.",
              tags: ["Innovation", "Startups", "Incubation", "Mentorship"],
              funding: "Bootstrapped - Self-funded",
              founders: [
                {
                  name: "Sarah Johnson",
                  title: "Founder & CEO",
                  bio: "Serial entrepreneur and innovation expert",
                  avatar: "/images/sarah-johnson.jpg",
                  linkedin: "https://linkedin.com/in/sarahjohnson"
                }
              ],
              investors: [],
              team: [
                {
                  name: "Mike Chen",
                  role: "Head of Operations",
                  department: "Operations",
                  avatar: "/images/mike-chen.jpg"
                }
              ],
              jobs: [
                {
                  id: "job-2",
                  title: "Program Manager",
                  department: "Programs",
                  type: "Full-time",
                  location: "Austin, TX",
                  description: "Manage our startup incubation programs",
                  requirements: ["3+ years experience", "Startup experience", "Project management"],
                  posted: "2024-01-20"
                }
              ],
              updates: [
                {
                  id: "update-2",
                  title: "New Cohort Announced",
                  content: "Applications are now open for our Spring 2024 cohort!",
                  author: "Sarah Johnson",
                  date: "2024-01-15"
                }
              ],
              milestones: [
                {
                  title: "First Cohort Graduated",
                  date: "2020-06-01",
                  description: "Successfully graduated our first cohort of 10 startups"
                }
              ]
            }
          ])
        }
        setIsLoading(false)
        return
      }

      try {
        const pages = await BusinessPageService.getUserBusinessPages(user.id)
        setBusinessPages(pages)
      } catch (error) {
        console.error("Error fetching business pages:", error)
        toast({
          title: "Error",
          description: "Failed to load your business pages. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessPages()
  }, [user, toast])

  const handleDeletePage = async () => {
    if (!pageToDelete) return

    try {
      const success = await BusinessPageService.deleteBusinessPage(pageToDelete.id)

      if (success) {
        setBusinessPages((prevPages) => prevPages.filter((page) => page.id !== pageToDelete.id))
        toast({
          title: "Business page deleted",
          description: `${pageToDelete.name} has been deleted successfully.`,
        })
      } else {
        throw new Error("Failed to delete business page")
      }
    } catch (error) {
      console.error("Error deleting business page:", error)
      toast({
        title: "Error",
        description: "Failed to delete business page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPageToDelete(null)
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
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Business Pages</h2>
          <Button onClick={() => setShowCreateDialog(true)} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Business Page
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-0">
                <Skeleton className="h-32 w-full" />
              </CardHeader>
              <CardContent className="pt-6 pb-2">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Your Business Pages</h2>
            <p className="text-white/90 text-sm sm:text-base">
              Manage and showcase your business presence on GrowthLab
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateDialog(true)}
            className="bg-white text-[#0F7377] hover:bg-white/90 shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Business Page
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Pages</p>
              <p className="text-2xl font-bold">{businessPages.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold">
                {businessPages.reduce((sum, page) => sum + page.followers, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Eye className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-2xl font-bold">
                {businessPages.reduce((sum, page) => sum + (page.followers || 0), 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BarChart className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg. Engagement</p>
              <p className="text-2xl font-bold">12.5%</p>
            </div>
          </div>
        </Card>
      </div>

      {businessPages.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Building className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-medium">No business pages yet</h3>
              <p className="text-muted-foreground mt-1">
                Create a business page to showcase your company and connect with customers.
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Business Page
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {businessPages.map((page) => (
            <Card key={page.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="h-20 w-20 relative rounded-xl overflow-hidden border border-gray-200 bg-white flex-shrink-0 shadow-sm">
                    <img
                      src={page.logo || "/placeholder.svg"}
                      alt={page.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold truncate">{page.name}</h3>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 text-xs">
                          Active
                        </Badge>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant="outline" onClick={() => handlePostToFeed(page)} className="text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Post
                        </Button>
                        <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-xs" asChild>
                          <Link href={`/business/${page.handle}`}>
                            View
                            <ArrowUpRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">{page.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Building className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{page.industry}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{page.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{page.followers.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{(page.followers || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Lightbulb className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{page.size}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-4">
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" asChild className="text-xs">
                          <Link href={`/business/${page.handle}/analytics`}>
                            <BarChart className="h-3 w-3 mr-1" />
                            Analytics
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild className="text-xs">
                          <Link href={`/business/${page.handle}/settings`}>
                            <Settings className="h-3 w-3 mr-1" />
                            Settings
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild className="text-xs">
                          <Link href={`/business/${page.handle}/edit`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                        onClick={() => setPageToDelete(page)}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateBusinessPageDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />

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

      <AlertDialog open={!!pageToDelete} onOpenChange={(open) => !open && setPageToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the business page "{pageToDelete?.name}" and all its content. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePage} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
