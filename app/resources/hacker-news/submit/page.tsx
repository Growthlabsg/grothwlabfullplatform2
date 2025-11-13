"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft,
  Send,
  Link as LinkIcon,
  FileText,
  Image,
  Code,
  Zap,
  Globe,
  Tag,
  User,
  Calendar,
  Clock,
  Save,
  Preview,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  Check,
  X,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Bookmark,
  Share2,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Archive,
  Settings,
  Bell,
  BellOff,
  Lock,
  Unlock,
  Download,
  Upload,
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
  Quote,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  PlusCircle,
  MinusCircle,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Target,
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
  MousePointer,
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  FileText as FileTextIcon,
  Image as ImageIcon,
  Video,
  Mail,
  Send as SendIcon
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function SubmitStoryPage() {
  const { toast } = useToast()
  const [storyType, setStoryType] = useState("link")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [tags, setTags] = useState("")
  const [category, setCategory] = useState("")
  const [isDraft, setIsDraft] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const categories = [
    { id: "general", name: "General" },
    { id: "technology", name: "Technology" },
    { id: "programming", name: "Programming" },
    { id: "startup", name: "Startup" },
    { id: "ai", name: "AI/ML" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile" },
    { id: "security", name: "Security" },
    { id: "data", name: "Data Science" },
    { id: "design", name: "Design" },
    { id: "business", name: "Business" },
    { id: "science", name: "Science" }
  ]

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your story.",
        variant: "destructive"
      })
      return
    }

    if (storyType === "link" && !url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter a URL for your story.",
        variant: "destructive"
      })
      return
    }

    if (storyType === "text" && !text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter text content for your story.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Story Submitted",
      description: "Your story has been submitted for review.",
    })
  }

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your story has been saved as a draft.",
    })
    setIsDraft(true)
  }

  const handlePreview = () => {
    setShowPreview(!showPreview)
  }

  const handleClear = () => {
    setTitle("")
    setUrl("")
    setText("")
    setTags("")
    setCategory("")
    setIsDraft(false)
    toast({
      title: "Form Cleared",
      description: "All fields have been cleared.",
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
                <Link href="/resources/hacker-news">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Hacker News
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Submit Story</h1>
                <p className="text-sm text-gray-600">Share your story with the community</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveDraft}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Story</CardTitle>
              <CardDescription>
                Share interesting links, ask questions, or show off your projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Story Type Selection */}
              <div className="space-y-2">
                <Label>Story Type</Label>
                <div className="flex space-x-4">
                  <Button
                    variant={storyType === "link" ? "default" : "outline"}
                    onClick={() => setStoryType("link")}
                    className="flex items-center space-x-2"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span>Link</span>
                  </Button>
                  <Button
                    variant={storyType === "text" ? "default" : "outline"}
                    onClick={() => setStoryType("text")}
                    className="flex items-center space-x-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Text</span>
                  </Button>
                  <Button
                    variant={storyType === "ask" ? "default" : "outline"}
                    onClick={() => setStoryType("ask")}
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Ask HN</span>
                  </Button>
                  <Button
                    variant={storyType === "show" ? "default" : "outline"}
                    onClick={() => setStoryType("show")}
                    className="flex items-center space-x-2"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Show HN</span>
                  </Button>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                />
              </div>

              {/* URL (for link stories) */}
              {storyType === "link" && (
                <div className="space-y-2">
                  <Label htmlFor="url">URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
              )}

              {/* Text Content (for text/ask/show stories) */}
              {(storyType === "text" || storyType === "ask" || storyType === "show") && (
                <div className="space-y-2">
                  <Label htmlFor="text">Content *</Label>
                  <Textarea
                    id="text"
                    placeholder={
                      storyType === "ask" 
                        ? "Ask your question to the community..."
                        : storyType === "show"
                        ? "Describe what you've built or created..."
                        : "Enter your text content..."
                    }
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>
              )}

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas (e.g., javascript, react, webdev)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Separate multiple tags with commas
                </p>
              </div>

              {/* Preview */}
              {showPreview && (
                <div className="space-y-2">
                  <Label>Preview</Label>
                  <Card className="p-4 bg-gray-50">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{title || "Your title will appear here"}</h3>
                      {url && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">({new URL(url).hostname})</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Visit
                          </Button>
                        </div>
                      )}
                      {text && (
                        <p className="text-sm text-gray-600 whitespace-pre-wrap">{text}</p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {tags.split(',').map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-200 text-xs rounded">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Guidelines */}
              <div className="space-y-2">
                <Label>Submission Guidelines</Label>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Be respectful and constructive in your submissions</p>
                  <p>• Use descriptive titles that clearly explain the content</p>
                  <p>• Don't submit duplicate stories</p>
                  <p>• Follow the community guidelines and terms of service</p>
                  <p>• Use appropriate tags to help others find your content</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={handleClear}>
                    <X className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <Button variant="outline" onClick={handleSaveDraft}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={handlePreview}>
                    <Eye className="h-4 w-4 mr-2" />
                    {showPreview ? 'Hide Preview' : 'Preview'}
                  </Button>
                  <Button 
                    className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                    onClick={handleSubmit}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Story
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
