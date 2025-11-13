"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Rocket,
  Lightbulb,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Building2,
  DollarSign,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Star,
  Heart,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  Mail,
  Send,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  MessageSquare,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  RefreshCw,
  Save,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  Grid,
  List,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  PlusCircle,
  MinusCircle,
  XCircle as XCircleIcon,
  CheckCircle2,
  AlertTriangle,
  User,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Bell,
  BellOff,
  Lock,
  Unlock,
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  Globe,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  ChevronUp,
  X,
  Users,
  MessageCircle as MessageCircleIcon,
  Search,
  Filter
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function InnovationLabPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("create")
  const [projectType, setProjectType] = useState("")
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    category: "",
    stage: "",
    funding: "",
    team: "",
    timeline: "",
    market: "",
    tags: [],
    goals: [],
    challenges: [],
    resources: []
  })

  const projectTypes = [
    { id: "startup", name: "Startup Project", description: "Build a new startup from scratch" },
    { id: "innovation", name: "Innovation Project", description: "Develop innovative solutions" },
    { id: "research", name: "Research Project", description: "Conduct research and development" },
    { id: "collaboration", name: "Collaboration Project", description: "Work with others on shared goals" }
  ]

  const categories = [
    "AI & Machine Learning",
    "Blockchain",
    "IoT & Hardware",
    "Biotech & Health",
    "Fintech",
    "Clean Tech",
    "EdTech",
    "Other"
  ]

  const stages = [
    "Idea",
    "Concept",
    "Prototype",
    "MVP",
    "Beta",
    "Launch",
    "Scale"
  ]

  const fundingOptions = [
    "Bootstrapped",
    "Angel Investment",
    "Seed Funding",
    "Series A",
    "Series B+",
    "Government Grant",
    "Crowdfunding",
    "Other"
  ]

  const markets = [
    "B2B",
    "B2C",
    "B2B2C",
    "Enterprise",
    "SMB",
    "Consumer",
    "Government",
    "Non-profit"
  ]

  const commonGoals = [
    "Solve a Problem",
    "Create Value",
    "Generate Revenue",
    "Improve Efficiency",
    "Reduce Costs",
    "Increase Accessibility",
    "Enhance User Experience",
    "Drive Innovation"
  ]

  const commonChallenges = [
    "Technical Complexity",
    "Market Validation",
    "Funding",
    "Team Building",
    "Competition",
    "Regulatory Compliance",
    "Scalability",
    "User Adoption"
  ]

  const commonResources = [
    "Technical Expertise",
    "Design Skills",
    "Marketing Knowledge",
    "Business Development",
    "Legal Advice",
    "Financial Planning",
    "Mentorship",
    "Networking"
  ]

  const handleInputChange = (field: string, value: any) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (field: string, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleCreateProject = () => {
    if (!projectData.title || !projectData.description) {
      toast({
        title: "Required Fields",
        description: "Please fill in the title and description.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Project Created",
      description: "Your innovation project has been created successfully!",
    })
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your project draft has been saved.",
    })
  }

  const handlePublishProject = () => {
    toast({
      title: "Project Published",
      description: "Your project has been published and is now visible to the community.",
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
                <Link href="/resources/innovation">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Innovation Hub
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Innovation Lab</h1>
                <p className="text-sm text-gray-600">Create, develop, and launch innovative projects</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handlePublishProject}>
                <Rocket className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="create">Create Project</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Create Project Tab */}
            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Innovation Project</CardTitle>
                  <CardDescription>Start building your next innovative project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Project Type Selection */}
                  <div className="space-y-4">
                    <Label>Project Type</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            projectType === type.id
                              ? 'border-[#0F7377] bg-[#0F7377]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setProjectType(type.id)}
                        >
                          <h3 className="font-semibold">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Project Title *</Label>
                        <Input
                          id="title"
                          value={projectData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          placeholder="Enter your project title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={projectData.category} onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        value={projectData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe your project, its goals, and how it will make an impact"
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stage">Current Stage</Label>
                        <Select value={projectData.stage} onValueChange={(value) => handleInputChange("stage", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage} value={stage}>
                                {stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="funding">Funding Status</Label>
                        <Select value={projectData.funding} onValueChange={(value) => handleInputChange("funding", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select funding status" />
                          </SelectTrigger>
                          <SelectContent>
                            {fundingOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="team">Team Size</Label>
                        <Input
                          id="team"
                          value={projectData.team}
                          onChange={(e) => handleInputChange("team", e.target.value)}
                          placeholder="e.g., 5 members"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Timeline</Label>
                        <Input
                          id="timeline"
                          value={projectData.timeline}
                          onChange={(e) => handleInputChange("timeline", e.target.value)}
                          placeholder="e.g., 6 months"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="market">Target Market</Label>
                      <Select value={projectData.market} onValueChange={(value) => handleInputChange("market", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select target market" />
                        </SelectTrigger>
                        <SelectContent>
                          {markets.map((market) => (
                            <SelectItem key={market} value={market}>
                              {market}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Goals</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {commonGoals.map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={goal}
                            checked={projectData.goals.includes(goal)}
                            onChange={() => handleArrayToggle("goals", goal)}
                            className="rounded"
                          />
                          <Label htmlFor={goal} className="text-sm">
                            {goal}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Expected Challenges</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {commonChallenges.map((challenge) => (
                        <div key={challenge} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={challenge}
                            checked={projectData.challenges.includes(challenge)}
                            onChange={() => handleArrayToggle("challenges", challenge)}
                            className="rounded"
                          />
                          <Label htmlFor={challenge} className="text-sm">
                            {challenge}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resources Needed */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Resources Needed</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {commonResources.map((resource) => (
                        <div key={resource} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={resource}
                            checked={projectData.resources.includes(resource)}
                            onChange={() => handleArrayToggle("resources", resource)}
                            className="rounded"
                          />
                          <Label htmlFor={resource} className="text-sm">
                            {resource}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {projectData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{tag}</span>
                          <button
                            onClick={() => setProjectData(prev => ({
                              ...prev,
                              tags: prev.tags.filter((_, i) => i !== index)
                            }))}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            const value = e.currentTarget.value.trim()
                            if (value && !projectData.tags.includes(value)) {
                              setProjectData(prev => ({
                                ...prev,
                                tags: [...prev.tags, value]
                              }))
                              e.currentTarget.value = ''
                            }
                          }
                        }}
                      />
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-4">
                    <Button variant="outline" onClick={handleSaveDraft}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button onClick={handleCreateProject} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      <Rocket className="h-4 w-4 mr-2" />
                      Create Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Templates Tab */}
            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Startup Project Template",
                    description: "Complete template for building a startup from idea to launch",
                    category: "Startup",
                    features: ["Business Plan", "Financial Projections", "Market Analysis", "Team Structure"]
                  },
                  {
                    title: "Innovation Project Template",
                    description: "Template for developing innovative solutions and products",
                    category: "Innovation",
                    features: ["Problem Definition", "Solution Design", "Prototype Planning", "Testing Strategy"]
                  },
                  {
                    title: "Research Project Template",
                    description: "Template for conducting research and development projects",
                    category: "Research",
                    features: ["Research Questions", "Methodology", "Data Collection", "Analysis Framework"]
                  },
                  {
                    title: "Collaboration Project Template",
                    description: "Template for collaborative projects with multiple stakeholders",
                    category: "Collaboration",
                    features: ["Stakeholder Map", "Communication Plan", "Milestones", "Resource Allocation"]
                  }
                ].map((template, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{template.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                          <Badge variant="outline">{template.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium text-sm">Features:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {template.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <Button size="sm" className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                          <Download className="h-4 w-4 mr-2" />
                          Use Template
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Business Model Canvas",
                    description: "Visual tool for developing and documenting business models",
                    icon: <Building2 className="h-8 w-8 text-blue-500" />,
                    category: "Planning"
                  },
                  {
                    title: "SWOT Analysis",
                    description: "Analyze strengths, weaknesses, opportunities, and threats",
                    icon: <BarChart3 className="h-8 w-8 text-green-500" />,
                    category: "Analysis"
                  },
                  {
                    title: "Value Proposition Canvas",
                    description: "Design and test value propositions for your product",
                    icon: <Target className="h-8 w-8 text-purple-500" />,
                    category: "Design"
                  },
                  {
                    title: "Lean Canvas",
                    description: "One-page business plan for startups",
                    icon: <FileText className="h-8 w-8 text-orange-500" />,
                    category: "Planning"
                  },
                  {
                    title: "Customer Journey Map",
                    description: "Map the customer experience from awareness to advocacy",
                    icon: <Users className="h-8 w-8 text-red-500" />,
                    category: "Design"
                  },
                  {
                    title: "Competitive Analysis",
                    description: "Analyze competitors and market positioning",
                    icon: <TrendingUp className="h-8 w-8 text-yellow-500" />,
                    category: "Analysis"
                  }
                ].map((tool, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="flex-shrink-0">
                          {tool.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{tool.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{tool.description}</p>
                          <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button size="sm" className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                          <Play className="h-4 w-4 mr-2" />
                          Use Tool
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Innovation Guide 2024",
                    description: "Comprehensive guide to innovation methodologies and best practices",
                    type: "Guide",
                    downloads: 1247,
                    rating: 4.8
                  },
                  {
                    title: "Startup Toolkit",
                    description: "Essential tools and resources for building successful startups",
                    type: "Toolkit",
                    downloads: 892,
                    rating: 4.7
                  },
                  {
                    title: "Design Thinking Framework",
                    description: "Step-by-step framework for human-centered design",
                    type: "Framework",
                    downloads: 567,
                    rating: 4.9
                  },
                  {
                    title: "Market Research Template",
                    description: "Template for conducting comprehensive market research",
                    type: "Template",
                    downloads: 743,
                    rating: 4.6
                  },
                  {
                    title: "Pitch Deck Template",
                    description: "Professional pitch deck template for investors",
                    type: "Template",
                    downloads: 456,
                    rating: 4.5
                  },
                  {
                    title: "Innovation Metrics Dashboard",
                    description: "Track and measure innovation performance",
                    type: "Dashboard",
                    downloads: 234,
                    rating: 4.4
                  }
                ].map((resource, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{resource.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{resource.description}</p>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>Downloads</span>
                          <span>{resource.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button size="sm" className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
