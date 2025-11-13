"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Users,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Mail,
  Send,
  Eye,
  MousePointer,
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
  Zap,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles,
  Target,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  Heart,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Settings,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
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
  MessageCircle,
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
  XCircle,
  CheckCircle2,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function NewsletterSubscribersPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSegment, setSelectedSegment] = useState("all")
  const [showAddSubscriber, setShowAddSubscriber] = useState(false)
  const [showImportSubscribers, setShowImportSubscribers] = useState(false)
  const [showExportSubscribers, setShowExportSubscribers] = useState(false)

  const segments = [
    { id: "all", name: "All Subscribers", count: 12547 },
    { id: "active", name: "Active", count: 8920 },
    { id: "inactive", name: "Inactive", count: 1215 },
    { id: "unsubscribed", name: "Unsubscribed", count: 2412 },
    { id: "bounced", name: "Bounced", count: 0 }
  ]

  const subscribers = [
    {
      id: 1,
      email: "john.doe@example.com",
      name: "John Doe",
      status: "active",
      subscribedDate: "2024-01-15",
      lastOpened: "2024-01-20",
      openRate: 85.2,
      clickRate: 12.3,
      source: "Website",
      tags: ["VIP", "Premium"],
      location: "United States",
      timezone: "America/New_York"
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      name: "Jane Smith",
      status: "active",
      subscribedDate: "2024-01-10",
      lastOpened: "2024-01-19",
      openRate: 92.1,
      clickRate: 18.7,
      source: "Social Media",
      tags: ["Engaged"],
      location: "United Kingdom",
      timezone: "Europe/London"
    },
    {
      id: 3,
      email: "bob.wilson@example.com",
      name: "Bob Wilson",
      status: "inactive",
      subscribedDate: "2023-12-20",
      lastOpened: "2024-01-05",
      openRate: 45.6,
      clickRate: 3.2,
      source: "Referral",
      tags: ["Old Subscriber"],
      location: "Canada",
      timezone: "America/Toronto"
    },
    {
      id: 4,
      email: "alice.brown@example.com",
      name: "Alice Brown",
      status: "unsubscribed",
      subscribedDate: "2023-11-15",
      lastOpened: "2024-01-10",
      openRate: 0,
      clickRate: 0,
      source: "Email Campaign",
      tags: ["Unsubscribed"],
      location: "Australia",
      timezone: "Australia/Sydney"
    }
  ]

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subscriber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subscriber.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSegment = selectedSegment === "all" || subscriber.status === selectedSegment
    return matchesSearch && matchesSegment
  })

  const handleAddSubscriber = () => {
    toast({
      title: "Adding Subscriber",
      description: "Opening add subscriber form...",
    })
  }

  const handleImportSubscribers = () => {
    toast({
      title: "Importing Subscribers",
      description: "Opening import dialog...",
    })
  }

  const handleExportSubscribers = () => {
    toast({
      title: "Exporting Subscribers",
      description: "Preparing subscriber data for download...",
    })
  }

  const handleEditSubscriber = (subscriberId: number) => {
    toast({
      title: "Editing Subscriber",
      description: "Opening subscriber edit form...",
    })
  }

  const handleDeleteSubscriber = (subscriberId: number) => {
    toast({
      title: "Deleting Subscriber",
      description: "Subscriber removed from list.",
    })
  }

  const handleSendEmail = (subscriberId: number) => {
    toast({
      title: "Sending Email",
      description: "Opening email composer...",
    })
  }

  const handleViewProfile = (subscriberId: number) => {
    toast({
      title: "Viewing Profile",
      description: "Opening subscriber profile...",
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
                <h1 className="text-xl font-bold text-gray-900">Subscriber Management</h1>
                <p className="text-sm text-gray-600">Manage your newsletter subscribers and segments</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleImportSubscribers}>
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportSubscribers}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" onClick={handleAddSubscriber}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscriber
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {segments.map((segment) => (
            <Card key={segment.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{segment.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{segment.count.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                    <Users className="h-6 w-6 text-[#0F7377]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Subscribers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
          </TabsList>

          {/* All Subscribers Tab */}
          <TabsContent value="all" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search subscribers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {segments.map((segment) => (
                    <option key={segment.id} value={segment.id}>
                      {segment.name} ({segment.count})
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Subscribers Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4">Subscriber</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Subscribed</th>
                        <th className="text-left py-3 px-4">Last Opened</th>
                        <th className="text-left py-3 px-4">Open Rate</th>
                        <th className="text-left py-3 px-4">Click Rate</th>
                        <th className="text-left py-3 px-4">Source</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{subscriber.name}</p>
                              <p className="text-sm text-gray-600">{subscriber.email}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {subscriber.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                              {subscriber.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {subscriber.subscribedDate}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {subscriber.lastOpened}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{subscriber.openRate}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${subscriber.openRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">{subscriber.clickRate}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${subscriber.clickRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {subscriber.source}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewProfile(subscriber.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditSubscriber(subscriber.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleSendEmail(subscriber.id)}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSubscriber(subscriber.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Subscribers Tab */}
          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Subscribers</CardTitle>
                <CardDescription>Subscribers who have opened emails in the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Active Subscribers</h3>
                  <p className="text-gray-500 mb-4">View and manage your active subscriber base</p>
                  <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Users className="h-4 w-4 mr-2" />
                    View Active Subscribers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inactive Subscribers Tab */}
          <TabsContent value="inactive" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Subscribers</CardTitle>
                <CardDescription>Subscribers who haven't opened emails in 90+ days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Inactive Subscribers</h3>
                  <p className="text-gray-500 mb-4">Re-engage with inactive subscribers</p>
                  <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <UserX className="h-4 w-4 mr-2" />
                    View Inactive Subscribers
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Segments</CardTitle>
                <CardDescription>Create and manage subscriber segments for targeted campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Subscriber Segments</h3>
                  <p className="text-gray-500 mb-4">Create targeted segments for better engagement</p>
                  <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Target className="h-4 w-4 mr-2" />
                    Manage Segments
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
