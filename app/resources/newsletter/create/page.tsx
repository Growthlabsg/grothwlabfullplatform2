"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Save,
  Send,
  Eye,
  Settings,
  Image,
  Link as LinkIcon,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Quote,
  Code,
  Table,
  Plus,
  Trash2,
  Copy,
  Undo,
  Redo,
  Palette,
  Type,
  Layout,
  Zap,
  Target,
  Users,
  Calendar,
  Clock,
  Globe,
  Lock,
  Unlock,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Lightbulb,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function CreateNewsletterPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("content")
  const [newsletterData, setNewsletterData] = useState({
    title: "",
    subject: "",
    description: "",
    content: "",
    category: "weekly",
    status: "draft",
    scheduledDate: "",
    targetAudience: "all",
    tags: [] as string[],
    isPublic: false,
    allowComments: true,
    sendToSegments: [] as string[]
  })

  const categories = [
    { id: "weekly", name: "Weekly Updates" },
    { id: "monthly", name: "Monthly Reports" },
    { id: "special", name: "Special Events" },
    { id: "product", name: "Product Updates" },
    { id: "industry", name: "Industry News" },
    { id: "tips", name: "Tips & Tricks" },
    { id: "announcements", name: "Announcements" }
  ]

  const segments = [
    { id: "all", name: "All Subscribers" },
    { id: "active", name: "Active Subscribers" },
    { id: "premium", name: "Premium Members" },
    { id: "new", name: "New Subscribers" },
    { id: "inactive", name: "Inactive Subscribers" }
  ]

  const handleSave = () => {
    toast({
      title: "Saved",
      description: "Newsletter saved as draft.",
    })
  }

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "Newsletter published successfully.",
    })
  }

  const handleSchedule = () => {
    toast({
      title: "Scheduled",
      description: "Newsletter scheduled for publication.",
    })
  }

  const handlePreview = () => {
    toast({
      title: "Preview",
      description: "Opening newsletter preview...",
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
                <Link href="/resources/newsletter">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Newsletters
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Create Newsletter</h1>
                <p className="text-sm text-gray-600">Design and publish your newsletter</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handlePublish}>
                <Send className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Content</CardTitle>
                    <CardDescription>Write and format your newsletter content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Newsletter Title</Label>
                      <Input
                        id="title"
                        placeholder="Enter newsletter title..."
                        value={newsletterData.title}
                        onChange={(e) => setNewsletterData({...newsletterData, title: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Email Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter email subject line..."
                        value={newsletterData.subject}
                        onChange={(e) => setNewsletterData({...newsletterData, subject: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter newsletter description..."
                        value={newsletterData.description}
                        onChange={(e) => setNewsletterData({...newsletterData, description: e.target.value})}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Content</Label>
                      <div className="border rounded-lg">
                        {/* Toolbar */}
                        <div className="border-b p-2 flex items-center gap-2 flex-wrap">
                          <Button variant="outline" size="sm">
                            <Bold className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Italic className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Underline className="h-4 w-4" />
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1" />
                          <Button variant="outline" size="sm">
                            <AlignLeft className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlignCenter className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <AlignRight className="h-4 w-4" />
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1" />
                          <Button variant="outline" size="sm">
                            <List className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Quote className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Code className="h-4 w-4" />
                          </Button>
                          <div className="w-px h-6 bg-gray-300 mx-1" />
                          <Button variant="outline" size="sm">
                            <Image className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <LinkIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Table className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Editor */}
                        <Textarea
                          placeholder="Write your newsletter content here..."
                          value={newsletterData.content}
                          onChange={(e) => setNewsletterData({...newsletterData, content: e.target.value})}
                          className="border-0 resize-none min-h-[400px] focus:ring-0"
                          rows={20}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Design & Layout</CardTitle>
                    <CardDescription>Customize the visual appearance of your newsletter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold">Templates</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border rounded-lg p-4 cursor-pointer hover:border-[#0F7377] transition-colors">
                            <div className="w-full h-24 bg-gray-100 rounded mb-2"></div>
                            <p className="text-sm font-medium">Clean & Simple</p>
                          </div>
                          <div className="border rounded-lg p-4 cursor-pointer hover:border-[#0F7377] transition-colors">
                            <div className="w-full h-24 bg-gray-100 rounded mb-2"></div>
                            <p className="text-sm font-medium">Modern</p>
                          </div>
                          <div className="border rounded-lg p-4 cursor-pointer hover:border-[#0F7377] transition-colors">
                            <div className="w-full h-24 bg-gray-100 rounded mb-2"></div>
                            <p className="text-sm font-medium">Professional</p>
                          </div>
                          <div className="border rounded-lg p-4 cursor-pointer hover:border-[#0F7377] transition-colors">
                            <div className="w-full h-24 bg-gray-100 rounded mb-2"></div>
                            <p className="text-sm font-medium">Creative</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-semibold">Color Scheme</h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#0F7377] rounded border"></div>
                            <span className="text-sm">Primary Color</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#F59E0B] rounded border"></div>
                            <span className="text-sm">Accent Color</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-600 rounded border"></div>
                            <span className="text-sm">Text Color</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Settings</CardTitle>
                    <CardDescription>Configure newsletter preferences and targeting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <select
                            id="category"
                            value={newsletterData.category}
                            onChange={(e) => setNewsletterData({...newsletterData, category: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="scheduledDate">Schedule Date</Label>
                          <Input
                            id="scheduledDate"
                            type="datetime-local"
                            value={newsletterData.scheduledDate}
                            onChange={(e) => setNewsletterData({...newsletterData, scheduledDate: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="targetAudience">Target Audience</Label>
                          <select
                            id="targetAudience"
                            value={newsletterData.targetAudience}
                            onChange={(e) => setNewsletterData({...newsletterData, targetAudience: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {segments.map((segment) => (
                              <option key={segment.id} value={segment.id}>
                                {segment.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Tags</Label>
                          <div className="flex flex-wrap gap-2">
                            {newsletterData.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                {tag}
                                <button
                                  onClick={() => setNewsletterData({
                                    ...newsletterData,
                                    tags: newsletterData.tags.filter((_, i) => i !== index)
                                  })}
                                  className="ml-1 text-gray-500 hover:text-gray-700"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add tag..."
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.target as HTMLInputElement
                                  if (input.value.trim()) {
                                    setNewsletterData({
                                      ...newsletterData,
                                      tags: [...newsletterData.tags, input.value.trim()]
                                    })
                                    input.value = ''
                                  }
                                }
                              }}
                            />
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="isPublic">Public Newsletter</Label>
                            <input
                              id="isPublic"
                              type="checkbox"
                              checked={newsletterData.isPublic}
                              onChange={(e) => setNewsletterData({...newsletterData, isPublic: e.target.checked})}
                              className="rounded"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="allowComments">Allow Comments</Label>
                            <input
                              id="allowComments"
                              type="checkbox"
                              checked={newsletterData.allowComments}
                              onChange={(e) => setNewsletterData({...newsletterData, allowComments: e.target.checked})}
                              className="rounded"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Preview Tab */}
              <TabsContent value="preview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Preview</CardTitle>
                    <CardDescription>Preview how your newsletter will appear to subscribers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-6 bg-white">
                      <div className="max-w-2xl mx-auto">
                        <h1 className="text-2xl font-bold mb-4">{newsletterData.title || "Newsletter Title"}</h1>
                        <p className="text-gray-600 mb-6">{newsletterData.description || "Newsletter description..."}</p>
                        <div className="prose max-w-none">
                          {newsletterData.content ? (
                            <div dangerouslySetInnerHTML={{ __html: newsletterData.content.replace(/\n/g, '<br>') }} />
                          ) : (
                            <p className="text-gray-500 italic">Your newsletter content will appear here...</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handlePreview}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleSchedule}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button className="w-full justify-start bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handlePublish}>
                  <Send className="h-4 w-4 mr-2" />
                  Publish Now
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Newsletter Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium">{newsletterData.status}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{categories.find(c => c.id === newsletterData.category)?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target</span>
                  <span className="font-medium">{segments.find(s => s.id === newsletterData.targetAudience)?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tags</span>
                  <span className="font-medium">{newsletterData.tags.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
