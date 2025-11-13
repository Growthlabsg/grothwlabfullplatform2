"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Home, 
  Edit, 
  Save, 
  Eye, 
  RefreshCw, 
  Upload, 
  Image as ImageIcon,
  Plus,
  Trash2,
  Copy,
  Globe,
  TrendingUp,
  Users,
  Award,
  Star
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface HomepageSection {
  id: string
  name: string
  enabled: boolean
  lastModified: string
  status: "published" | "draft" | "archived"
}

interface HeroContent {
  title: string
  subtitle: string
  description: string
  primaryButton: string
  secondaryButton: string
  backgroundImage: string
  videoUrl?: string
}

interface StatItem {
  id: string
  value: string
  label: string
  icon: string
  trend: "up" | "down" | "stable"
  change: string
}

interface FeatureItem {
  id: string
  title: string
  description: string
  icon: string
  enabled: boolean
  order: number
}

interface TestimonialItem {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  enabled: boolean
}

export function HomepageDataManager() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("hero")
  const [isEditing, setIsEditing] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Homepage sections
  const [sections] = useState<HomepageSection[]>([
    { id: "hero", name: "Hero Section", enabled: true, lastModified: "2024-01-20", status: "published" },
    { id: "stats", name: "Statistics", enabled: true, lastModified: "2024-01-20", status: "published" },
    { id: "features", name: "Features", enabled: true, lastModified: "2024-01-19", status: "published" },
    { id: "testimonials", name: "Testimonials", enabled: true, lastModified: "2024-01-18", status: "published" },
    { id: "cta", name: "Call to Action", enabled: true, lastModified: "2024-01-17", status: "published" },
    { id: "newsletter", name: "Newsletter", enabled: false, lastModified: "2024-01-15", status: "draft" }
  ])

  // Hero content state
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Empower Your Startup Journey",
    subtitle: "Join GrowthLab",
    description: "Access world-class mentorship, funding opportunities, and a global network of entrepreneurs and investors.",
    primaryButton: "Get Started",
    secondaryButton: "Learn More",
    backgroundImage: "/hero-background.jpg",
    videoUrl: ""
  })

  // Stats state
  const [stats, setStats] = useState<StatItem[]>([
    { id: "1", value: "500K", label: "SGD Funding", icon: "DollarSign", trend: "up", change: "+15%" },
    { id: "2", value: "100+", label: "Startups Funded", icon: "Users", trend: "up", change: "+8%" },
    { id: "3", value: "$2B+", label: "Total Valuation", icon: "TrendingUp", trend: "up", change: "+23%" },
    { id: "4", value: "95%", label: "Success Rate", icon: "Award", trend: "stable", change: "0%" }
  ])

  // Features state
  const [features, setFeatures] = useState<FeatureItem[]>([
    { id: "1", title: "SGD 500K Investment", description: "Direct investment in your startup", icon: "DollarSign", enabled: true, order: 1 },
    { id: "2", title: "Expert Mentorship", description: "Access to industry experts and successful entrepreneurs", icon: "Users", enabled: true, order: 2 },
    { id: "3", title: "Global Network", description: "Connect with investors, partners, and customers worldwide", icon: "Globe", enabled: true, order: 3 },
    { id: "4", title: "Co-working Space", description: "Premium office space in Singapore's startup hub", icon: "Building2", enabled: true, order: 4 },
    { id: "5", title: "Strategic Support", description: "Legal, accounting, marketing, and technical support", icon: "Target", enabled: true, order: 5 },
    { id: "6", title: "Growth Acceleration", description: "Intensive 6-month program", icon: "TrendingUp", enabled: true, order: 6 }
  ])

  // Testimonials state
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([
    {
      id: "1",
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      company: "FinFlow",
      content: "GrowthLab helped us scale from 10K to 1M users in 6 months. The mentorship was invaluable.",
      rating: 5,
      avatar: "/testimonials/sarah-chen.jpg",
      enabled: true
    },
    {
      id: "2",
      name: "Alex Wong",
      role: "CTO",
      company: "HealthAI",
      content: "The network we built through GrowthLab opened doors we never thought possible.",
      rating: 5,
      avatar: "/testimonials/alex-wong.jpg",
      enabled: true
    },
    {
      id: "3",
      name: "Mei Lin",
      role: "Founder",
      company: "EduTech Pro",
      content: "GrowthLab's strategic guidance helped us pivot and find our product-market fit.",
      rating: 5,
      avatar: "/testimonials/mei-lin.jpg",
      enabled: true
    }
  ])

  const handleSave = (section: string) => {
    toast({
      title: "Changes Saved",
      description: `${section} content has been updated successfully.`,
    })
    setIsEditing(false)
  }

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode)
    toast({
      title: "Preview Mode",
      description: isPreviewMode ? "Preview mode disabled" : "Preview mode enabled",
    })
  }

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "All homepage changes have been published to production.",
    })
  }

  const handleRevert = () => {
    toast({
      title: "Reverted",
      description: "All changes have been reverted to the last published version.",
    })
    setIsEditing(false)
  }

  const addNewFeature = () => {
    const newFeature: FeatureItem = {
      id: Date.now().toString(),
      title: "New Feature",
      description: "Feature description",
      icon: "Star",
      enabled: true,
      order: features.length + 1
    }
    setFeatures([...features, newFeature])
  }

  const removeFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const addNewTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: Date.now().toString(),
      name: "New Person",
      role: "Role",
      company: "Company",
      content: "Testimonial content",
      rating: 5,
      avatar: "/testimonials/default.jpg",
      enabled: true
    }
    setTestimonials([...testimonials, newTestimonial])
  }

  const removeTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Home className="w-6 h-6" />
            Homepage Data Manager
          </h2>
          <p className="text-muted-foreground">
            Control and customize all homepage content, sections, and data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreviewMode ? "Exit Preview" : "Preview"}
          </Button>
          <Button variant="outline" onClick={handleRevert}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Revert
          </Button>
          <Button onClick={handlePublish}>
            <Globe className="w-4 h-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Section Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Section Status</CardTitle>
          <CardDescription>Overview of all homepage sections and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sections.map((section) => (
              <div key={section.id} className="text-center p-4 border rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Switch checked={section.enabled} />
                </div>
                <h4 className="font-medium text-sm">{section.name}</h4>
                <Badge variant={section.status === "published" ? "default" : "secondary"} className="text-xs mt-1">
                  {section.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  {section.lastModified}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Hero Section Content</CardTitle>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
              <CardDescription>Main hero section content and configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Main Title</Label>
                  <Input
                    id="hero-title"
                    value={heroContent.title}
                    onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtitle</Label>
                  <Input
                    id="hero-subtitle"
                    value={heroContent.subtitle}
                    onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-description">Description</Label>
                <Textarea
                  id="hero-description"
                  value={heroContent.description}
                  onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-primary-btn">Primary Button Text</Label>
                  <Input
                    id="hero-primary-btn"
                    value={heroContent.primaryButton}
                    onChange={(e) => setHeroContent({...heroContent, primaryButton: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-secondary-btn">Secondary Button Text</Label>
                  <Input
                    id="hero-secondary-btn"
                    value={heroContent.secondaryButton}
                    onChange={(e) => setHeroContent({...heroContent, secondaryButton: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-bg-image">Background Image URL</Label>
                  <Input
                    id="hero-bg-image"
                    value={heroContent.backgroundImage}
                    onChange={(e) => setHeroContent({...heroContent, backgroundImage: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-video">Video URL (Optional)</Label>
                  <Input
                    id="hero-video"
                    value={heroContent.videoUrl || ""}
                    onChange={(e) => setHeroContent({...heroContent, videoUrl: e.target.value})}
                    disabled={!isEditing}
                    placeholder="https://..."
                  />
                </div>
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Hero section")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Statistics & Metrics</CardTitle>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
              <CardDescription>Configure homepage statistics and key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.id} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label>Stat {index + 1}</Label>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Value</Label>
                        <Input
                          value={stat.value}
                          onChange={(e) => {
                            const newStats = [...stats]
                            (newStats[index] ? newStats[index].value : undefined) = e.target.value
                            setStats(newStats)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={stat.label}
                          onChange={(e) => {
                            const newStats = [...stats]
                            (newStats[index] ? newStats[index].label : undefined) = e.target.value
                            setStats(newStats)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label className="text-xs">Icon</Label>
                        <Input
                          value={stat.icon}
                          onChange={(e) => {
                            const newStats = [...stats]
                            (newStats[index] ? newStats[index].icon : undefined) = e.target.value
                            setStats(newStats)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Change</Label>
                        <Input
                          value={stat.change}
                          onChange={(e) => {
                            const newStats = [...stats]
                            (newStats[index] ? newStats[index].change : undefined) = e.target.value
                            setStats(newStats)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Statistics")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Features Section</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewFeature}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Feature
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage homepage features and their content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={feature.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">#{feature.order}</span>
                        <Switch
                          checked={feature.enabled}
                          onCheckedChange={(checked) => {
                            const newFeatures = [...features]
                            (newFeatures[index] ? newFeatures[index].enabled : undefined) = checked
                            setFeatures(newFeatures)
                          }}
                        />
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" onClick={() => removeFeature(feature.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...features]
                            (newFeatures[index] ? newFeatures[index].title : undefined) = e.target.value
                            setFeatures(newFeatures)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Icon</Label>
                        <Input
                          value={feature.icon}
                          onChange={(e) => {
                            const newFeatures = [...features]
                            (newFeatures[index] ? newFeatures[index].icon : undefined) = e.target.value
                            setFeatures(newFeatures)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Order</Label>
                        <Input
                          type="number"
                          value={feature.order}
                          onChange={(e) => {
                            const newFeatures = [...features]
                            (newFeatures[index] ? newFeatures[index].order : undefined) = parseInt(e.target.value)
                            setFeatures(newFeatures)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-xs">Description</Label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => {
                          const newFeatures = [...features]
                          (newFeatures[index] ? newFeatures[index].description : undefined) = e.target.value
                          setFeatures(newFeatures)
                        }}
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Features")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Testimonials</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewTestimonial}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage customer testimonials and reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={testimonial.enabled}
                          onCheckedChange={(checked) => {
                            const newTestimonials = [...testimonials]
                            (newTestimonials[index] ? newTestimonials[index].enabled : undefined) = checked
                            setTestimonials(newTestimonials)
                          }}
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" onClick={() => removeTestimonial(testimonial.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Name</Label>
                        <Input
                          value={testimonial.name}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials]
                            (newTestimonials[index] ? newTestimonials[index].name : undefined) = e.target.value
                            setTestimonials(newTestimonials)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Role</Label>
                        <Input
                          value={testimonial.role}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials]
                            (newTestimonials[index] ? newTestimonials[index].role : undefined) = e.target.value
                            setTestimonials(newTestimonials)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Company</Label>
                        <Input
                          value={testimonial.company}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials]
                            (newTestimonials[index] ? newTestimonials[index].company : undefined) = e.target.value
                            setTestimonials(newTestimonials)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Avatar URL</Label>
                        <Input
                          value={testimonial.avatar}
                          onChange={(e) => {
                            const newTestimonials = [...testimonials]
                            (newTestimonials[index] ? newTestimonials[index].avatar : undefined) = e.target.value
                            setTestimonials(newTestimonials)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-xs">Content</Label>
                      <Textarea
                        value={testimonial.content}
                        onChange={(e) => {
                          const newTestimonials = [...testimonials]
                          (newTestimonials[index] ? newTestimonials[index].content : undefined) = e.target.value
                          setTestimonials(newTestimonials)
                        }}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Testimonials")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Settings</CardTitle>
              <CardDescription>Global homepage configuration and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Display Options</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-video">Show Hero Video</Label>
                      <Switch id="show-video" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-stats">Show Statistics</Label>
                      <Switch id="show-stats" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-features">Show Features</Label>
                      <Switch id="show-features" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-testimonials">Show Testimonials</Label>
                      <Switch id="show-testimonials" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="lazy-load">Lazy Load Images</Label>
                      <Switch id="lazy-load" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="optimize-images">Optimize Images</Label>
                      <Switch id="optimize-images" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cache-content">Cache Content</Label>
                      <Switch id="cache-content" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button onClick={handlePublish} className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Publish All Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
