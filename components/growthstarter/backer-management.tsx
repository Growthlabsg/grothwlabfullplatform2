"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Gift,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  Filter,
  Search,
  Download,
  Send,
  Reply,
  Edit,
  Eye,
  Heart,
  Share2,
  Bell,
  Settings,
  User,
  Shield,
  Award,
  Zap,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  MoreHorizontal,
  Trash2,
  Copy,
  ExternalLink,
  Truck,
  X
} from "lucide-react"

interface Backer {
  id: string
  name: string
  email: string
  avatar: string
  pledgeAmount: number
  reward: string
  pledgeDate: string
  status: 'active' | 'pending' | 'cancelled'
  location: string
  isAnonymous: boolean
  isFirstTime: boolean
  communication: {
    emailsSent: number
    lastContact: string
    preferences: string[]
  }
  fulfillment: {
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
    trackingNumber?: string
    estimatedDelivery?: string
    actualDelivery?: string
    notes?: string
  }
  engagement: {
    comments: number
    shares: number
    likes: number
    lastActivity: string
  }
}

export function BackerManagement() {
  const [selectedBacker, setSelectedBacker] = useState<Backer | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterReward, setFilterReward] = useState("all")
  const [showAnonymous, setShowAnonymous] = useState(true)

  const backers: Backer[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "/avatars/sarah.jpg",
      pledgeAmount: 200,
      reward: "Complete Smart Home Kit",
      pledgeDate: "2024-01-15",
      status: "active",
      location: "San Francisco, CA",
      isAnonymous: false,
      isFirstTime: true,
      communication: {
        emailsSent: 3,
        lastContact: "2024-01-20",
        preferences: ["email", "updates"]
      },
      fulfillment: {
        status: "pending",
        estimatedDelivery: "2024-03-15",
        notes: "Customer requested expedited shipping"
      },
      engagement: {
        comments: 5,
        shares: 12,
        likes: 8,
        lastActivity: "2024-01-22"
      }
    },
    {
      id: "2",
      name: "Anonymous Backer",
      email: "anonymous@email.com",
      avatar: "",
      pledgeAmount: 50,
      reward: "Early Bird - Basic Monitor",
      pledgeDate: "2024-01-14",
      status: "active",
      location: "Unknown",
      isAnonymous: true,
      isFirstTime: false,
      communication: {
        emailsSent: 1,
        lastContact: "2024-01-14",
        preferences: ["email"]
      },
      fulfillment: {
        status: "shipped",
        trackingNumber: "1Z999AA1234567890",
        estimatedDelivery: "2024-03-10",
        actualDelivery: "2024-03-08"
      },
      engagement: {
        comments: 0,
        shares: 0,
        likes: 0,
        lastActivity: "2024-01-14"
      }
    },
    {
      id: "3",
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar: "/avatars/michael.jpg",
      pledgeAmount: 100,
      reward: "Premium Monitor + App Access",
      pledgeDate: "2024-01-13",
      status: "active",
      location: "New York, NY",
      isAnonymous: false,
      isFirstTime: false,
      communication: {
        emailsSent: 2,
        lastContact: "2024-01-18",
        preferences: ["email", "sms"]
      },
      fulfillment: {
        status: "delivered",
        trackingNumber: "1Z999AA1234567891",
        estimatedDelivery: "2024-03-05",
        actualDelivery: "2024-03-03"
      },
      engagement: {
        comments: 3,
        shares: 7,
        likes: 4,
        lastActivity: "2024-01-21"
      }
    },
    {
      id: "4",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      avatar: "/avatars/emily.jpg",
      pledgeAmount: 150,
      reward: "Premium Monitor + App Access",
      pledgeDate: "2024-01-12",
      status: "pending",
      location: "Austin, TX",
      isAnonymous: false,
      isFirstTime: true,
      communication: {
        emailsSent: 1,
        lastContact: "2024-01-12",
        preferences: ["email"]
      },
      fulfillment: {
        status: "pending",
        estimatedDelivery: "2024-03-20"
      },
      engagement: {
        comments: 1,
        shares: 2,
        likes: 1,
        lastActivity: "2024-01-12"
      }
    }
  ]

  const rewards = [
    { id: "all", name: "All Rewards" },
    { id: "basic", name: "Early Bird - Basic Monitor" },
    { id: "premium", name: "Premium Monitor + App Access" },
    { id: "complete", name: "Complete Smart Home Kit" }
  ]

  const statuses = [
    { id: "all", name: "All Status" },
    { id: "active", name: "Active" },
    { id: "pending", name: "Pending" },
    { id: "cancelled", name: "Cancelled" }
  ]

  const filteredBackers = backers.filter(backer => {
    const matchesSearch = backer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         backer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || backer.status === filterStatus
    const matchesReward = filterReward === "all" || backer.reward.includes(filterReward)
    const matchesAnonymous = showAnonymous || !backer.isAnonymous
    return matchesSearch && matchesStatus && matchesReward && matchesAnonymous
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getFulfillmentColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800"
      case "shipped": return "bg-blue-100 text-blue-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getFulfillmentIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="w-4 h-4" />
      case "shipped": return <Truck className="w-4 h-4" />
      case "pending": return <Clock className="w-4 h-4" />
      case "cancelled": return <X className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const renderBackerCard = (backer: Backer) => (
    <Card 
      key={backer.id} 
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
        selectedBacker?.id === backer.id ? 'ring-2 ring-[#0F7377]' : ''
      }`}
      onClick={() => setSelectedBacker(backer)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              {backer.isAnonymous ? (
                <AvatarFallback>?</AvatarFallback>
              ) : (
                <>
                  <AvatarImage src={backer.avatar} />
                  <AvatarFallback>{backer.name.charAt(0)}</AvatarFallback>
                </>
              )}
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  {backer.isAnonymous ? "Anonymous Backer" : backer.name}
                </h3>
                {backer.isFirstTime && (
                  <Badge variant="secondary" className="text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    First Time
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{backer.email}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3" />
                {backer.location}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">{formatCurrency(backer.pledgeAmount)}</div>
            <Badge className={getStatusColor(backer.status)}>
              {backer.status.charAt(0).toUpperCase() + backer.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reward:</span>
            <span className="font-medium">{backer.reward}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Pledged:</span>
            <span>{backer.pledgeDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Fulfillment:</span>
            <Badge className={getFulfillmentColor(backer.fulfillment.status)}>
              {getFulfillmentIcon(backer.fulfillment.status)}
              {backer.fulfillment.status.charAt(0).toUpperCase() + backer.fulfillment.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Engagement:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs">{backer.engagement.comments} comments</span>
              <span className="text-xs">{backer.engagement.shares} shares</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderBackerDetails = (backer: Backer) => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-16 h-16">
            {backer.isAnonymous ? (
              <AvatarFallback className="text-lg">?</AvatarFallback>
            ) : (
              <>
                <AvatarImage src={backer.avatar} />
                <AvatarFallback className="text-lg">{backer.name.charAt(0)}</AvatarFallback>
              </>
            )}
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">
              {backer.isAnonymous ? "Anonymous Backer" : backer.name}
            </h2>
            <p className="text-muted-foreground">{backer.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{backer.location}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-[#0F7377]">
            {formatCurrency(backer.pledgeAmount)}
          </div>
          <Badge className={getStatusColor(backer.status)}>
            {backer.status.charAt(0).toUpperCase() + backer.status.slice(1)}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="fulfillment">Fulfillment</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pledge Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reward:</span>
                  <span className="font-medium">{backer.reward}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pledge Date:</span>
                  <span>{backer.pledgeDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">First Time:</span>
                  <span>{backer.isFirstTime ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Anonymous:</span>
                  <span>{backer.isAnonymous ? "Yes" : "No"}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Engagement Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Comments:</span>
                  <span className="font-medium">{backer.engagement.comments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shares:</span>
                  <span className="font-medium">{backer.engagement.shares}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Likes:</span>
                  <span className="font-medium">{backer.engagement.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Activity:</span>
                  <span>{backer.engagement.lastActivity}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Communication History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Emails Sent</p>
                  <p className="text-sm text-muted-foreground">{backer.communication.emailsSent} emails</p>
                </div>
                <div>
                  <p className="font-medium">Last Contact</p>
                  <p className="text-sm text-muted-foreground">{backer.communication.lastContact}</p>
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">Communication Preferences</p>
                <div className="flex gap-2">
                  {backer.communication.preferences.map((pref) => (
                    <Badge key={pref} variant="secondary">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Send Message</label>
                  <Textarea 
                    placeholder="Type your message to this backer..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send SMS
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fulfillment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Fulfillment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Status</p>
                  <Badge className={getFulfillmentColor(backer.fulfillment.status)}>
                    {getFulfillmentIcon(backer.fulfillment.status)}
                    {backer.fulfillment.status.charAt(0).toUpperCase() + backer.fulfillment.status.slice(1)}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">
                    {backer.fulfillment.estimatedDelivery || "TBD"}
                  </p>
                </div>
              </div>

              {backer.fulfillment.trackingNumber && (
                <div>
                  <p className="font-medium mb-2">Tracking Information</p>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={backer.fulfillment.trackingNumber}
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {backer.fulfillment.actualDelivery && (
                <div>
                  <p className="font-medium">Actual Delivery</p>
                  <p className="text-sm text-muted-foreground">{backer.fulfillment.actualDelivery}</p>
                </div>
              )}

              <div>
                <label className="text-sm font-medium">Update Status</label>
                <Select defaultValue={backer.fulfillment.status}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea 
                  placeholder="Add fulfillment notes..."
                  className="mt-1"
                  rows={3}
                  defaultValue={backer.fulfillment.notes}
                />
              </div>

              <div className="flex gap-2">
                <Button>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Update Status
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Engagement Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#0F7377]">{backer.engagement.comments}</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0F7377]">{backer.engagement.shares}</div>
                  <div className="text-sm text-muted-foreground">Shares</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#0F7377]">{backer.engagement.likes}</div>
                  <div className="text-sm text-muted-foreground">Likes</div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="font-medium mb-2">Last Activity</p>
                <p className="text-sm text-muted-foreground">{backer.engagement.lastActivity}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Backer Management</h1>
          <p className="text-[#64748B]">Manage your project backers and fulfillment</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Backers
          </Button>
          <Button>
            <MessageCircle className="w-4 h-4 mr-2" />
            Send Update
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search backers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterReward} onValueChange={setFilterReward}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rewards.map((reward) => (
                  <SelectItem key={reward.id} value={reward.id}>
                    {reward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showAnonymous"
                checked={showAnonymous}
                onChange={(e) => setShowAnonymous(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="showAnonymous" className="text-sm">Show Anonymous</label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">{filteredBackers.length}</div>
              <div className="text-sm text-muted-foreground">Total Backers</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {formatCurrency(filteredBackers.reduce((sum, b) => sum + b.pledgeAmount, 0))}
              </div>
              <div className="text-sm text-muted-foreground">Total Pledged</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {filteredBackers.filter(b => b.fulfillment.status === 'delivered').length}
              </div>
              <div className="text-sm text-muted-foreground">Fulfilled</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0F7377]">
                {filteredBackers.filter(b => b.isFirstTime).length}
              </div>
              <div className="text-sm text-muted-foreground">First Time</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Backer List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Backers ({filteredBackers.length})</h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredBackers.map(renderBackerCard)}
          </div>
        </div>

        {/* Backer Details */}
        <div className="lg:col-span-2">
          {selectedBacker ? (
            renderBackerDetails(selectedBacker)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    Select a Backer
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a backer from the list to view their details and manage their pledge.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
} 