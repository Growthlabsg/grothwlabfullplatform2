"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  FileText,
  Download,
  Eye,
  Star,
  Heart,
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
  Image,
  Video,
  Link as LinkIcon,
  ChevronUp,
  X,
  Users,
  MessageCircle as MessageCircleIcon,
  TrendingDown,
  PieChart,
  Activity,
  LineChart,
  BarChart,
  TrendingUp as TrendingUpIcon,
  Search,
  Filter
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CreateReportPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("basic")
  const [reportData, setReportData] = useState({
    // Basic Information
    title: "",
    description: "",
    category: "",
    type: "",
    author: "",
    publishDate: "",
    language: "English",
    
    // Content
    summary: "",
    keyFindings: [],
    methodology: "",
    dataSources: [],
    conclusions: "",
    recommendations: [],
    
    // Settings
    isPublic: true,
    isPremium: false,
    allowComments: true,
    allowDownloads: true,
    tags: [],
    
    // Files
    attachments: [],
    charts: [],
    images: []
  })

  const categories = [
    "Financial Reports",
    "Market Analysis",
    "Startup Reports",
    "Industry Insights",
    "Research Papers",
    "Trend Analysis"
  ]

  const reportTypes = [
    "Quarterly Report",
    "Annual Report",
    "Market Analysis",
    "Research Paper",
    "White Paper",
    "Industry Report",
    "Trend Analysis",
    "Case Study"
  ]

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Portuguese",
    "Italian"
  ]

  const commonKeyFindings = [
    "Market growth increased by 25%",
    "Consumer behavior shifted significantly",
    "Technology adoption accelerated",
    "Regulatory changes impacted the industry",
    "Competition intensified in key segments",
    "New opportunities emerged in emerging markets",
    "Cost structures optimized across sectors",
    "Sustainability became a key driver"
  ]

  const commonRecommendations = [
    "Invest in digital transformation",
    "Focus on customer experience",
    "Expand into new markets",
    "Optimize operational efficiency",
    "Develop strategic partnerships",
    "Enhance data analytics capabilities",
    "Improve supply chain resilience",
    "Invest in talent development"
  ]

  const handleInputChange = (field: string, value: any) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayToggle = (field: string, value: string) => {
    setReportData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleAddTag = (tag: string) => {
    if (tag && !reportData.tags.includes(tag)) {
      setReportData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const handleRemoveTag = (index: number) => {
    setReportData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your report draft has been saved successfully.",
    })
  }

  const handlePreviewReport = () => {
    toast({
      title: "Opening Preview",
      description: "Loading report preview...",
    })
  }

  const handlePublishReport = () => {
    if (!reportData.title || !reportData.description) {
      toast({
        title: "Required Fields",
        description: "Please fill in the title and description.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Report Published",
      description: "Your report has been published successfully!",
    })
  }

  const renderBasicTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Report Title *</Label>
          <Input
            id="title"
            value={reportData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter report title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author *</Label>
          <Input
            id="author"
            value={reportData.author}
            onChange={(e) => handleInputChange("author", e.target.value)}
            placeholder="Enter author name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={reportData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Enter report description"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={reportData.category} onValueChange={(value) => handleInputChange("category", value)}>
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
        <div className="space-y-2">
          <Label htmlFor="type">Report Type</Label>
          <Select value={reportData.type} onValueChange={(value) => handleInputChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="publishDate">Publish Date</Label>
          <Input
            id="publishDate"
            type="date"
            value={reportData.publishDate}
            onChange={(e) => handleInputChange("publishDate", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={reportData.language} onValueChange={(value) => handleInputChange("language", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {reportData.tags.map((tag, index) => (
            <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded">
              <span className="text-sm">{tag}</span>
              <button
                onClick={() => handleRemoveTag(index)}
                className="hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Add a tag"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTag(e.currentTarget.value.trim())
                e.currentTarget.value = ''
              }
            }}
          />
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderContentTab = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="summary">Executive Summary</Label>
        <Textarea
          id="summary"
          value={reportData.summary}
          onChange={(e) => handleInputChange("summary", e.target.value)}
          placeholder="Enter executive summary"
          rows={6}
        />
      </div>

      <div className="space-y-4">
        <Label>Key Findings</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {commonKeyFindings.map((finding) => (
            <div key={finding} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={finding}
                checked={reportData.keyFindings.includes(finding)}
                onChange={() => handleArrayToggle("keyFindings", finding)}
                className="rounded"
              />
              <Label htmlFor={finding} className="text-sm">
                {finding}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Add custom finding"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const value = e.currentTarget.value.trim()
                if (value) {
                  handleArrayToggle("keyFindings", value)
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

      <div className="space-y-2">
        <Label htmlFor="methodology">Methodology</Label>
        <Textarea
          id="methodology"
          value={reportData.methodology}
          onChange={(e) => handleInputChange("methodology", e.target.value)}
          placeholder="Describe the research methodology used"
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dataSources">Data Sources</Label>
        <div className="space-y-2">
          {reportData.dataSources.map((source, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={source}
                onChange={(e) => {
                  const newSources = [...reportData.dataSources]
                  newSources[index] = e.target.value
                  handleInputChange("dataSources", newSources)
                }}
                placeholder="Enter data source"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newSources = reportData.dataSources.filter((_, i) => i !== index)
                  handleInputChange("dataSources", newSources)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleInputChange("dataSources", [...reportData.dataSources, ""])}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Data Source
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="conclusions">Conclusions</Label>
        <Textarea
          id="conclusions"
          value={reportData.conclusions}
          onChange={(e) => handleInputChange("conclusions", e.target.value)}
          placeholder="Enter key conclusions"
          rows={4}
        />
      </div>

      <div className="space-y-4">
        <Label>Recommendations</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {commonRecommendations.map((recommendation) => (
            <div key={recommendation} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={recommendation}
                checked={reportData.recommendations.includes(recommendation)}
                onChange={() => handleArrayToggle("recommendations", recommendation)}
                className="rounded"
              />
              <Label htmlFor={recommendation} className="text-sm">
                {recommendation}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Add custom recommendation"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const value = e.currentTarget.value.trim()
                if (value) {
                  handleArrayToggle("recommendations", value)
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
    </div>
  )

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Visibility Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Public Report</Label>
              <p className="text-sm text-gray-500">Make this report visible to all users</p>
            </div>
            <input
              type="checkbox"
              checked={reportData.isPublic}
              onChange={(e) => handleInputChange("isPublic", e.target.checked)}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Premium Report</Label>
              <p className="text-sm text-gray-500">Require premium subscription to access</p>
            </div>
            <input
              type="checkbox"
              checked={reportData.isPremium}
              onChange={(e) => handleInputChange("isPremium", e.target.checked)}
              className="rounded"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interaction Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Comments</Label>
              <p className="text-sm text-gray-500">Users can comment on this report</p>
            </div>
            <input
              type="checkbox"
              checked={reportData.allowComments}
              onChange={(e) => handleInputChange("allowComments", e.target.checked)}
              className="rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Downloads</Label>
              <p className="text-sm text-gray-500">Users can download this report</p>
            </div>
            <input
              type="checkbox"
              checked={reportData.allowDownloads}
              onChange={(e) => handleInputChange("allowDownloads", e.target.checked)}
              className="rounded"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">File Attachments</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-2">Upload files to attach to your report</p>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Charts and Visualizations</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-sm text-gray-500 mb-2">Add charts and visualizations to your report</p>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Chart
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/reports">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Reports
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create Report</h1>
                <p className="text-sm text-gray-600">Create and publish your research report</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm" onClick={handlePreviewReport}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handlePublishReport}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details of your report</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderBasicTab()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Content</CardTitle>
                  <CardDescription>Add the main content and findings of your report</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderContentTab()}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Report Settings</CardTitle>
                  <CardDescription>Configure visibility and interaction settings</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderSettingsTab()}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
