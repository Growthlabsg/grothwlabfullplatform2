"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Rocket, 
  Camera, 
  Video, 
  Image, 
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  DollarSign,
  Gift,
  Users,
  Globe,
  MapPin,
  Calendar,
  FileText,
  Link,
  Plus,
  Trash2,
  Edit,
  Eye,
  Star,
  Zap,
  Heart,
  Award,
  Building2,
  X,
  Settings
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProjectData {
  basicInfo: {
    title: string
    category: string
    description: string
    shortDescription: string
    location: string
    tags: string[]
  }
  funding: {
    goal: number
    currency: string
    duration: number
    startDate: string
  }
  media: {
    coverImage: string
    videoUrl: string
    gallery: string[]
  }
  rewards: Array<{
    id: string
    title: string
    description: string
    amount: number
    quantity: number
    claimed: number
    estimatedDelivery: string
    includes: string[]
  }>
  story: {
    problem: string
    solution: string
    team: string
    timeline: string
    risks: string
  }
  settings: {
    isPublic: boolean
    allowComments: boolean
    featured: boolean
  }
}

export function ProjectCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState<ProjectData>({
    basicInfo: {
      title: "",
      category: "",
      description: "",
      shortDescription: "",
      location: "",
      tags: []
    },
    funding: {
      goal: 0,
      currency: "USD",
      duration: 30,
      startDate: ""
    },
    media: {
      coverImage: "",
      videoUrl: "",
      gallery: []
    },
    rewards: [],
    story: {
      problem: "",
      solution: "",
      team: "",
      timeline: "",
      risks: ""
    },
    settings: {
      isPublic: true,
      allowComments: true,
      featured: false
    }
  })

  const [newTag, setNewTag] = useState("")
  const [newReward, setNewReward] = useState({
    title: "",
    description: "",
    amount: 0,
    quantity: 0,
    estimatedDelivery: "",
    includes: []
  })

  const { toast } = useToast()

  const categories = [
    { id: "tech", name: "Technology", icon: <Zap className="w-4 h-4" /> },
    { id: "creative", name: "Creative", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "social", name: "Social Impact", icon: <Heart className="w-4 h-4" /> },
    { id: "business", name: "Business", icon: <Target className="w-4 h-4" /> },
    { id: "education", name: "Education", icon: <Award className="w-4 h-4" /> },
    { id: "health", name: "Health & Wellness", icon: <Heart className="w-4 h-4" /> },
    { id: "environment", name: "Environment", icon: <Globe className="w-4 h-4" /> },
    { id: "food", name: "Food & Agriculture", icon: <Award className="w-4 h-4" /> }
  ]

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
    { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
    { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" }
  ]

  const steps = [
    { id: 1, title: "Basic Info", icon: <Rocket className="w-4 h-4" /> },
    { id: 2, title: "Funding", icon: <DollarSign className="w-4 h-4" /> },
    { id: 3, title: "Media", icon: <Camera className="w-4 h-4" /> },
    { id: 4, title: "Rewards", icon: <Gift className="w-4 h-4" /> },
    { id: 5, title: "Story", icon: <FileText className="w-4 h-4" /> },
    { id: 6, title: "Settings", icon: <Settings className="w-4 h-4" /> }
  ]

  const updateProjectData = (section: keyof ProjectData, data: any) => {
    setProjectData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !projectData.basicInfo.tags.includes(newTag.trim())) {
      updateProjectData("basicInfo", {
        tags: [...projectData.basicInfo.tags, newTag.trim()]
      })
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    updateProjectData("basicInfo", {
      tags: projectData.basicInfo.tags.filter(t => t !== tag)
    })
  }

  const addReward = () => {
    if (newReward.title && newReward.description && newReward.amount > 0) {
      const reward = {
        id: Date.now().toString(),
        ...newReward,
        claimed: 0
      }
      setProjectData(prev => ({
        ...prev,
        rewards: [...prev.rewards, reward]
      }))
      setNewReward({
        title: "",
        description: "",
        amount: 0,
        quantity: 0,
        estimatedDelivery: "",
        includes: []
      })
    }
  }

  const removeReward = (id: string) => {
    setProjectData(prev => ({
      ...prev,
      rewards: prev.rewards.filter(r => r.id !== id)
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!projectData.basicInfo.title || !projectData.basicInfo.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    // Submit project
    toast({
      title: "Project Created!",
      description: "Your project has been successfully created and is now live.",
    })
  }

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id 
                ? "bg-[#0F7377] border-[#0F7377] text-white" 
                : "border-gray-300 text-gray-500"
            }`}>
              {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.icon}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= step.id ? "text-[#0F7377]" : "text-gray-500"
            }`}>
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                currentStep > step.id ? "bg-[#0F7377]" : "bg-gray-300"
              }`} />
            )}
          </div>
        ))}
      </div>
      <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
    </div>
  )

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Project Title *</Label>
        <Input
          id="title"
          value={projectData.basicInfo.title}
          onChange={(e) => updateProjectData("basicInfo", { title: e.target.value })}
          placeholder="Enter your project title"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Category *</Label>
        <Select 
          value={projectData.basicInfo.category} 
          onValueChange={(value) => updateProjectData("basicInfo", { category: value })}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="shortDescription">Short Description *</Label>
        <Textarea
          id="shortDescription"
          value={projectData.basicInfo.shortDescription}
          onChange={(e) => updateProjectData("basicInfo", { shortDescription: e.target.value })}
          placeholder="Brief description (max 140 characters)"
          maxLength={140}
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          {projectData.basicInfo.shortDescription.length}/140 characters
        </p>
      </div>

      <div>
        <Label htmlFor="description">Full Description *</Label>
        <Textarea
          id="description"
          value={projectData.basicInfo.description}
          onChange={(e) => updateProjectData("basicInfo", { description: e.target.value })}
          placeholder="Tell your story..."
          rows={6}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <div className="flex gap-2 mt-1">
          <MapPin className="w-4 h-4 text-muted-foreground mt-3" />
          <Input
            id="location"
            value={projectData.basicInfo.location}
            onChange={(e) => updateProjectData("basicInfo", { location: e.target.value })}
            placeholder="City, Country"
          />
        </div>
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
          />
          <Button onClick={addTag} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {projectData.basicInfo.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="cursor-pointer">
              {tag}
              <X className="w-3 h-3 ml-1" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFunding = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="goal">Funding Goal *</Label>
          <Input
            id="goal"
            type="number"
            value={projectData.funding.goal}
            onChange={(e) => updateProjectData("funding", { goal: Number(e.target.value) })}
            placeholder="0"
            className="mt-1"
          />
        </div>
        <div>
          <Label>Currency</Label>
          <Select 
            value={projectData.funding.currency} 
            onValueChange={(value) => updateProjectData("funding", { currency: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Campaign Duration (days) *</Label>
          <Input
            id="duration"
            type="number"
            value={projectData.funding.duration}
            onChange={(e) => updateProjectData("funding", { duration: Number(e.target.value) })}
            placeholder="30"
            min="1"
            max="60"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={projectData.funding.startDate}
            onChange={(e) => updateProjectData("funding", { startDate: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Funding Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-[#F59E0B] mt-0.5" />
            <p className="text-sm">Set a realistic goal based on your project's needs</p>
          </div>
          <div className="flex items-start gap-2">
            <Target className="w-4 h-4 text-[#F59E0B] mt-0.5" />
            <p className="text-sm">30-45 days is the optimal campaign duration</p>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#F59E0B] mt-0.5" />
            <p className="text-sm">Plan your launch date carefully</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderMedia = () => (
    <div className="space-y-6">
      <div>
        <Label>Cover Image *</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">Upload your project cover image</p>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Choose Image
          </Button>
        </div>
      </div>

      <div>
        <Label>Video URL</Label>
        <Input
          value={projectData.media.videoUrl}
          onChange={(e) => updateProjectData("media", { videoUrl: e.target.value })}
          placeholder="https://youtube.com/..."
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Add a video to increase engagement
        </p>
      </div>

      <div>
        <Label>Gallery Images</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">Add more images to your gallery</p>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Add Images
          </Button>
        </div>
      </div>
    </div>
  )

  const renderRewards = () => (
    <div className="space-y-6">
      <div className="grid gap-4">
        {projectData.rewards.map((reward) => (
          <Card key={reward.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{reward.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeReward(reward.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Amount:</span> ${reward.amount}
                </div>
                <div>
                  <span className="font-medium">Quantity:</span> {reward.quantity}
                </div>
                <div>
                  <span className="font-medium">Delivery:</span> {reward.estimatedDelivery}
                </div>
                <div>
                  <span className="font-medium">Claimed:</span> {reward.claimed}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{reward.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Reward</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                value={newReward.title}
                onChange={(e) => setNewReward(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Reward title"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                value={newReward.amount}
                onChange={(e) => setNewReward(prev => ({ ...prev, amount: Number(e.target.value) }))}
                placeholder="0"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={newReward.description}
              onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what backers will receive"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={newReward.quantity}
                onChange={(e) => setNewReward(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Estimated Delivery</Label>
              <Input
                type="date"
                value={newReward.estimatedDelivery}
                onChange={(e) => setNewReward(prev => ({ ...prev, estimatedDelivery: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
          <Button onClick={addReward} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Reward
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderStory = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="problem">The Problem</Label>
        <Textarea
          id="problem"
          value={projectData.story.problem}
          onChange={(e) => updateProjectData("story", { problem: e.target.value })}
          placeholder="What problem are you solving?"
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="solution">The Solution</Label>
        <Textarea
          id="solution"
          value={projectData.story.solution}
          onChange={(e) => updateProjectData("story", { solution: e.target.value })}
          placeholder="How does your project solve this problem?"
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="team">About the Team</Label>
        <Textarea
          id="team"
          value={projectData.story.team}
          onChange={(e) => updateProjectData("story", { team: e.target.value })}
          placeholder="Tell us about your team and experience"
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="timeline">Project Timeline</Label>
        <Textarea
          id="timeline"
          value={projectData.story.timeline}
          onChange={(e) => updateProjectData("story", { timeline: e.target.value })}
          placeholder="What's your project timeline?"
          rows={4}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="risks">Risks & Challenges</Label>
        <Textarea
          id="risks"
          value={projectData.story.risks}
          onChange={(e) => updateProjectData("story", { risks: e.target.value })}
          placeholder="What challenges might you face?"
          rows={4}
          className="mt-1"
        />
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Public Project</Label>
              <p className="text-sm text-muted-foreground">Anyone can view your project</p>
            </div>
            <input
              type="checkbox"
              checked={projectData.settings.isPublic}
              onChange={(e) => updateProjectData("settings", { isPublic: e.target.checked })}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Comments</Label>
              <p className="text-sm text-muted-foreground">Backers can comment on your project</p>
            </div>
            <input
              type="checkbox"
              checked={projectData.settings.allowComments}
              onChange={(e) => updateProjectData("settings", { allowComments: e.target.checked })}
              className="w-4 h-4"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Featured Project</Label>
              <p className="text-sm text-muted-foreground">Apply for featured placement</p>
            </div>
            <input
              type="checkbox"
              checked={projectData.settings.featured}
              onChange={(e) => updateProjectData("settings", { featured: e.target.checked })}
              className="w-4 h-4"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{projectData.basicInfo.title || "Project Title"}</h3>
                <p className="text-sm text-muted-foreground">{projectData.basicInfo.shortDescription || "Project description"}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Goal: ${projectData.funding.goal || 0}</span>
              <span>{projectData.funding.duration || 30} days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return renderBasicInfo()
      case 2: return renderFunding()
      case 3: return renderMedia()
      case 4: return renderRewards()
      case 5: return renderStory()
      case 6: return renderSettings()
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {renderStepIndicator()}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {steps[currentStep - 1].icon}
            {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        {currentStep === steps.length ? (
          <Button onClick={handleSubmit} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
            <Rocket className="w-4 h-4 mr-2" />
            Launch Project
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
} 