"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Users,
  Search,
  Filter,
  MessageCircle,
  UserPlus,
  UserCheck,
  UserX,
  Star,
  Heart,
  Eye,
  Share2,
  Bookmark,
  BookmarkCheck,
  MoreHorizontal,
  Settings,
  HelpCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Zap,
  Rocket,
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
  Bell,
  BellOff,
  Lock,
  Unlock,
  ExternalLink,
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
  X
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CollaboratePage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("find")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const skills = [
    { id: "all", name: "All Skills", count: 1247 },
    { id: "ai-ml", name: "AI & Machine Learning", count: 234 },
    { id: "blockchain", name: "Blockchain", count: 156 },
    { id: "frontend", name: "Frontend Development", count: 345 },
    { id: "backend", name: "Backend Development", count: 298 },
    { id: "mobile", name: "Mobile Development", count: 189 },
    { id: "design", name: "UI/UX Design", count: 267 },
    { id: "marketing", name: "Marketing", count: 178 },
    { id: "business", name: "Business Development", count: 145 },
    { id: "data", name: "Data Science", count: 123 }
  ]

  const collaborators = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "AI Research Scientist",
      company: "TechFlow AI",
      location: "San Francisco, CA",
      skills: ["AI/ML", "Python", "TensorFlow", "Research"],
      experience: "8+ years",
      rating: 4.9,
      projects: 23,
      availability: "Available",
      hourlyRate: "$150",
      bio: "Passionate AI researcher with expertise in machine learning, deep learning, and computer vision. Led multiple AI projects from research to production.",
      isBookmarked: false,
      verified: true,
      languages: ["English", "Mandarin"],
      timezone: "PST"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Full-Stack Developer",
      company: "Freelance",
      location: "New York, NY",
      skills: ["React", "Node.js", "Python", "AWS"],
      experience: "6+ years",
      rating: 4.8,
      projects: 45,
      availability: "Available",
      hourlyRate: "$120",
      bio: "Full-stack developer with expertise in modern web technologies. Built scalable applications for startups and enterprises.",
      isBookmarked: true,
      verified: true,
      languages: ["English", "Spanish"],
      timezone: "EST"
    },
    {
      id: 3,
      name: "Lisa Wang",
      title: "UI/UX Designer",
      company: "Design Studio",
      location: "Los Angeles, CA",
      skills: ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping"],
      experience: "5+ years",
      rating: 4.7,
      projects: 67,
      availability: "Limited",
      hourlyRate: "$100",
      bio: "Creative UI/UX designer with a passion for user-centered design. Specialized in mobile and web applications.",
      isBookmarked: false,
      verified: true,
      languages: ["English", "Mandarin"],
      timezone: "PST"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Blockchain Developer",
      company: "CryptoCorp",
      location: "Austin, TX",
      skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"],
      experience: "4+ years",
      rating: 4.6,
      projects: 34,
      availability: "Available",
      hourlyRate: "$180",
      bio: "Blockchain developer with expertise in smart contracts and DeFi protocols. Built multiple successful DeFi applications.",
      isBookmarked: true,
      verified: true,
      languages: ["English", "Korean"],
      timezone: "CST"
    },
    {
      id: 5,
      name: "Jennifer Martinez",
      title: "Data Scientist",
      company: "DataCorp",
      location: "Boston, MA",
      skills: ["Python", "R", "SQL", "Machine Learning"],
      experience: "7+ years",
      rating: 4.8,
      projects: 28,
      availability: "Available",
      hourlyRate: "$140",
      bio: "Data scientist with expertise in statistical analysis, machine learning, and big data processing. PhD in Statistics.",
      isBookmarked: false,
      verified: true,
      languages: ["English", "Spanish"],
      timezone: "EST"
    },
    {
      id: 6,
      name: "Robert Johnson",
      title: "Marketing Specialist",
      company: "GrowthLab",
      location: "Chicago, IL",
      skills: ["Digital Marketing", "SEO", "Social Media", "Analytics"],
      experience: "9+ years",
      rating: 4.5,
      projects: 89,
      availability: "Available",
      hourlyRate: "$90",
      bio: "Marketing specialist with expertise in digital marketing, growth hacking, and brand development. Helped scale multiple startups.",
      isBookmarked: false,
      verified: true,
      languages: ["English"],
      timezone: "CST"
    }
  ]

  const collaborationProjects = [
    {
      id: 1,
      title: "AI-Powered E-commerce Platform",
      description: "Building an intelligent e-commerce platform with AI recommendations and automated customer service.",
      skills: ["AI/ML", "Frontend", "Backend", "Design"],
      budget: "$50,000",
      timeline: "6 months",
      team: 5,
      status: "Recruiting",
      postedBy: "Alex Chen",
      postedDate: "2024-01-15",
      applicants: 23,
      isBookmarked: false
    },
    {
      id: 2,
      title: "Blockchain Supply Chain Solution",
      description: "Developing a transparent supply chain tracking system using blockchain technology.",
      skills: ["Blockchain", "Backend", "Mobile", "Design"],
      budget: "$75,000",
      timeline: "8 months",
      team: 6,
      status: "Active",
      postedBy: "Maria Garcia",
      postedDate: "2024-01-10",
      applicants: 45,
      isBookmarked: true
    },
    {
      id: 3,
      title: "Mobile Health App",
      description: "Creating a comprehensive health tracking app with AI-powered insights and telemedicine features.",
      skills: ["Mobile", "AI/ML", "Backend", "Design"],
      budget: "$40,000",
      timeline: "4 months",
      team: 4,
      status: "Recruiting",
      postedBy: "James Wilson",
      postedDate: "2024-01-20",
      applicants: 18,
      isBookmarked: false
    }
  ]

  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collaborator.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         collaborator.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSkill = selectedSkill === "all" || collaborator.skills.some(skill => 
      skills.find(s => s.id === selectedSkill)?.name.toLowerCase().includes(skill.toLowerCase())
    )
    return matchesSearch && matchesSkill
  })

  const handleConnect = (collaboratorId: number) => {
    toast({
      title: "Connection Request Sent",
      description: "Your connection request has been sent to the collaborator.",
    })
  }

  const handleBookmark = (collaboratorId: number) => {
    toast({
      title: "Collaborator Bookmarked",
      description: "Collaborator added to your bookmarks.",
    })
  }

  const handleMessage = (collaboratorId: number) => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the collaborator.",
    })
  }

  const handleViewProfile = (collaboratorId: number) => {
    toast({
      title: "Opening Profile",
      description: "Loading collaborator profile...",
    })
  }

  const handleApplyProject = (projectId: number) => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted for the project.",
    })
  }

  const handleBookmarkProject = (projectId: number) => {
    toast({
      title: "Project Bookmarked",
      description: "Project added to your bookmarks.",
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
                <h1 className="text-xl font-bold text-gray-900">Collaborate</h1>
                <p className="text-sm text-gray-600">Find collaborators and join innovative projects</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Post Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search collaborators by name, skills, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg border">
              <div>
                <label className="text-sm font-medium text-gray-700">Skills</label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name} ({skill.count})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="san-francisco">San Francisco</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Availability</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Availability</option>
                  <option value="available">Available Now</option>
                  <option value="limited">Limited</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="find">Find Collaborators</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="my-network">My Network</TabsTrigger>
          </TabsList>

          {/* Find Collaborators Tab */}
          <TabsContent value="find" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollaborators.map((collaborator) => (
                <Card key={collaborator.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-[#0F7377] rounded-full flex items-center justify-center relative">
                          <User className="h-8 w-8 text-white" />
                          {collaborator.verified && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                            {collaborator.name}
                          </h3>
                          <p className="text-[#0F7377] font-medium text-sm">{collaborator.title}</p>
                          <p className="text-gray-600 text-sm">{collaborator.company}</p>
                          <p className="text-gray-500 text-xs">{collaborator.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={collaborator.availability === 'Available' ? 'default' : 'secondary'}>
                          {collaborator.availability}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => handleBookmark(collaborator.id)}>
                          {collaborator.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{collaborator.bio}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Experience</span>
                        <span>{collaborator.experience}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span>{collaborator.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Projects</span>
                        <span>{collaborator.projects}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Hourly Rate</span>
                        <span className="font-semibold text-green-600">{collaborator.hourlyRate}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {collaborator.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleConnect(collaborator.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Connect
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewProfile(collaborator.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Profile
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMessage(collaborator.id)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collaborationProjects.map((project) => (
                <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-[#0F7377] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-3">{project.description}</p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {project.status}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800">
                            {project.team} members
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleBookmarkProject(project.id)}>
                          {project.isBookmarked ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Budget</span>
                        <span className="font-semibold text-green-600">{project.budget}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Timeline</span>
                        <span>{project.timeline}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Applicants</span>
                        <span>{project.applicants}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Posted by</span>
                        <span>{project.postedBy}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                        onClick={() => handleApplyProject(project.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
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

          {/* My Network Tab */}
          <TabsContent value="my-network" className="space-y-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your Network</h3>
              <p className="text-gray-500 mb-4">
                Connect with collaborators to build your network and discover new opportunities.
              </p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <UserPlus className="h-4 w-4 mr-2" />
                Start Connecting
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
