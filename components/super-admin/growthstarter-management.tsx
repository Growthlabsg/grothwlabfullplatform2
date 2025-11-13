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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  DollarSign, 
  Edit, 
  Save, 
  Eye, 
  RefreshCw, 
  Plus,
  Trash2,
  Copy,
  Globe,
  Settings,
  TrendingUp,
  Users,
  Shield,
  Filter,
  Hash,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Target,
  Calendar,
  Percent,
  Award,
  Building2,
  Rocket
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Campaign {
  id: string
  title: string
  startup: string
  startupId: string
  category: string
  status: "draft" | "pending" | "live" | "funded" | "closed" | "rejected"
  targetAmount: number
  currentAmount: number
  investors: number
  daysLeft: number
  description: string
  equity: number
  minInvestment: number
  maxInvestment: number
  createdAt: string
  endDate: string
  isFeatured: boolean
  isVerified: boolean
  tags: string[]
  documents: string[]
  updates: CampaignUpdate[]
}

interface CampaignUpdate {
  id: string
  title: string
  content: string
  date: string
  type: "milestone" | "update" | "announcement"
}

interface Investor {
  id: string
  name: string
  email: string
  type: "individual" | "angel" | "vc" | "corporate"
  totalInvested: number
  activeInvestments: number
  verificationStatus: "pending" | "verified" | "rejected"
  kycStatus: "pending" | "completed" | "failed"
  createdAt: string
}

interface PlatformSettings {
  minCampaignAmount: number
  maxCampaignAmount: number
  platformFee: number
  verificationRequired: boolean
  kycRequired: boolean
  autoApproval: boolean
  maxEquity: number
  minEquity: number
  campaignDuration: number
  withdrawalDelay: number
}

export function GrowthStarterManagement() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("campaigns")
  const [isEditing, setIsEditing] = useState(false)

  // Campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "1",
      title: "AI-Powered Healthcare Platform",
      startup: "MedTech Innovations",
      startupId: "startup1",
      category: "Healthcare",
      status: "live",
      targetAmount: 500000,
      currentAmount: 320000,
      investors: 45,
      daysLeft: 23,
      description: "Revolutionary AI platform for early disease detection",
      equity: 15,
      minInvestment: 1000,
      maxInvestment: 50000,
      createdAt: "2024-01-01T00:00:00Z",
      endDate: "2024-02-15T00:00:00Z",
      isFeatured: true,
      isVerified: true,
      tags: ["AI", "Healthcare", "Innovation"],
      documents: ["pitch-deck.pdf", "financial-model.xlsx"],
      updates: [
        {
          id: "1",
          title: "Milestone Reached: 50% Funding",
          content: "We've reached 50% of our funding goal! Thank you to all our supporters.",
          date: "2024-01-20T00:00:00Z",
          type: "milestone"
        }
      ]
    },
    {
      id: "2",
      title: "Sustainable Energy Solutions",
      startup: "GreenPower",
      startupId: "startup2",
      category: "Clean Energy",
      status: "pending",
      targetAmount: 750000,
      currentAmount: 0,
      investors: 0,
      daysLeft: 60,
      description: "Next-generation renewable energy technology",
      equity: 20,
      minInvestment: 500,
      maxInvestment: 100000,
      createdAt: "2024-01-15T00:00:00Z",
      endDate: "2024-03-15T00:00:00Z",
      isFeatured: false,
      isVerified: false,
      tags: ["Clean Energy", "Sustainability", "Technology"],
      documents: ["business-plan.pdf"],
      updates: []
    }
  ])

  // Investors state
  const [investors, setInvestors] = useState<Investor[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      type: "angel",
      totalInvested: 150000,
      activeInvestments: 3,
      verificationStatus: "verified",
      kycStatus: "completed",
      createdAt: "2023-06-01T00:00:00Z"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      type: "individual",
      totalInvested: 25000,
      activeInvestments: 1,
      verificationStatus: "pending",
      kycStatus: "pending",
      createdAt: "2024-01-01T00:00:00Z"
    }
  ])

  // Platform settings state
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    minCampaignAmount: 10000,
    maxCampaignAmount: 5000000,
    platformFee: 5,
    verificationRequired: true,
    kycRequired: true,
    autoApproval: false,
    maxEquity: 25,
    minEquity: 5,
    campaignDuration: 60,
    withdrawalDelay: 7
  })

  const handleSave = (section: string) => {
    toast({
      title: "Changes Saved",
      description: `${section} has been updated successfully.`,
    })
    setIsEditing(false)
  }

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "All GrowthStarter changes have been published.",
    })
  }

  const handleRevert = () => {
    toast({
      title: "Reverted",
      description: "All changes have been reverted to the last published version.",
    })
    setIsEditing(false)
  }

  const approveCampaign = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId ? { ...campaign, status: "live" } : campaign
    ))
    toast({
      title: "Campaign Approved",
      description: "Campaign has been published to the platform.",
    })
  }

  const rejectCampaign = (campaignId: string) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId ? { ...campaign, status: "rejected" } : campaign
    ))
    toast({
      title: "Campaign Rejected",
      description: "Campaign has been rejected.",
    })
  }

  const toggleCampaignStatus = (campaignId: string, status: Campaign["status"]) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === campaignId ? { ...campaign, status } : campaign
    ))
  }

  const addNewCampaign = () => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      title: "New Campaign",
      startup: "New Startup",
      startupId: "new",
      category: "Technology",
      status: "draft",
      targetAmount: 100000,
      currentAmount: 0,
      investors: 0,
      daysLeft: 60,
      description: "Campaign description",
      equity: 10,
      minInvestment: 1000,
      maxInvestment: 50000,
      createdAt: new Date().toISOString(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      isFeatured: false,
      isVerified: false,
      tags: [],
      documents: [],
      updates: []
    }
    setCampaigns([...campaigns, newCampaign])
  }

  const removeCampaign = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id))
  }

  const addNewInvestor = () => {
    const newInvestor: Investor = {
      id: Date.now().toString(),
      name: "New Investor",
      email: "new@example.com",
      type: "individual",
      totalInvested: 0,
      activeInvestments: 0,
      verificationStatus: "pending",
      kycStatus: "pending",
      createdAt: new Date().toISOString()
    }
    setInvestors([...investors, newInvestor])
  }

  const removeInvestor = (id: string) => {
    setInvestors(investors.filter(i => i.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <DollarSign className="w-6 h-6" />
            GrowthStarter Management
          </h2>
          <p className="text-muted-foreground">
            Control all aspects of the crowdfunding platform including campaigns, investors, and platform settings
          </p>
        </div>
        <div className="flex items-center gap-3">
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

      {/* GrowthStarter Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{campaigns.length}</div>
            <p className="text-xs text-muted-foreground">
              {campaigns.filter(c => c.status === "live").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${campaigns.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Raised across all campaigns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{investors.filter(i => i.verificationStatus === "verified").length}</div>
            <p className="text-xs text-muted-foreground">
              Verified investors
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((campaigns.filter(c => c.status === "funded").length / campaigns.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Funded campaigns
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Campaign Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewCampaign}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Campaign
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage and moderate all crowdfunding campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign, index) => (
                  <div key={campaign.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={
                          campaign.status === "live" ? "default" : 
                          campaign.status === "funded" ? "default" :
                          campaign.status === "pending" ? "secondary" :
                          campaign.status === "rejected" ? "destructive" : "outline"
                        }>
                          {campaign.status}
                        </Badge>
                        {campaign.isFeatured && <Badge variant="outline">⭐ Featured</Badge>}
                        {campaign.isVerified && <Badge variant="outline">✓ Verified</Badge>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </span>
                        {isEditing && (
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => toggleCampaignStatus(campaign.id, "live")}>
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => toggleCampaignStatus(campaign.id, "rejected")}>
                              <XCircle className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => removeCampaign(campaign.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{campaign.title}</h4>
                        <Badge variant="outline">{campaign.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{campaign.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center">
                          <div className="text-lg font-bold">${campaign.targetAmount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Target</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">${campaign.currentAmount.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Raised</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{campaign.investors}</div>
                          <div className="text-xs text-muted-foreground">Investors</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold">{campaign.daysLeft}</div>
                          <div className="text-xs text-muted-foreground">Days Left</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>💰 Min: ${campaign.minInvestment.toLocaleString()}</span>
                        <span>💰 Max: ${campaign.maxInvestment.toLocaleString()}</span>
                        <span>📊 Equity: {campaign.equity}%</span>
                        <span>🏢 {campaign.startup}</span>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Status</Label>
                          <Select
                            value={campaign.status}
                            onValueChange={(value: Campaign["status"]) => 
                              toggleCampaignStatus(campaign.id, value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="live">Live</SelectItem>
                              <SelectItem value="funded">Funded</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Featured</Label>
                          <Switch
                            checked={campaign.isFeatured}
                            onCheckedChange={(checked) => {
                              const newCampaigns = [...campaigns]
                              (newCampaigns[index] ? newCampaigns[index].isFeatured : undefined) = checked
                              setCampaigns(newCampaigns)
                            }}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Verified</Label>
                          <Switch
                            checked={campaign.isVerified}
                            onCheckedChange={(checked) => {
                              const newCampaigns = [...campaigns]
                              (newCampaigns[index] ? newCampaigns[index].isVerified : undefined) = checked
                              setCampaigns(newCampaigns)
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Campaigns")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Investors Tab */}
        <TabsContent value="investors" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Investor Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewInvestor}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Investor
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage investor accounts and verification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investors.map((investor, index) => (
                  <div key={investor.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={investor.verificationStatus === "verified" ? "default" : "secondary"}>
                          {investor.verificationStatus}
                        </Badge>
                        <Badge variant={investor.kycStatus === "completed" ? "default" : "secondary"}>
                          KYC: {investor.kycStatus}
                        </Badge>
                        <div>
                          <h4 className="font-medium">{investor.name}</h4>
                          <p className="text-sm text-muted-foreground">{investor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{investor.type}</Badge>
                        {isEditing && (
                          <Button variant="outline" size="sm" onClick={() => removeInvestor(investor.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-bold">${investor.totalInvested.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">Total Invested</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{investor.activeInvestments}</div>
                        <div className="text-xs text-muted-foreground">Active Investments</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Joined: {new Date(investor.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Verification Status</Label>
                          <Select
                            value={investor.verificationStatus}
                            onValueChange={(value: "pending" | "verified" | "rejected") => {
                              const newInvestors = [...investors]
                              (newInvestors[index] ? newInvestors[index].verificationStatus : undefined) = value
                              setInvestors(newInvestors)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="verified">Verified</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">KYC Status</Label>
                          <Select
                            value={investor.kycStatus}
                            onValueChange={(value: "pending" | "completed" | "failed") => {
                              const newInvestors = [...investors]
                              (newInvestors[index] ? newInvestors[index].kycStatus : undefined) = value
                              setInvestors(newInvestors)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Investor Type</Label>
                          <Select
                            value={investor.type}
                            onValueChange={(value: "individual" | "angel" | "vc" | "corporate") => {
                              const newInvestors = [...investors]
                              (newInvestors[index] ? newInvestors[index].type : undefined) = value
                              setInvestors(newInvestors)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="angel">Angel</SelectItem>
                              <SelectItem value="vc">VC</SelectItem>
                              <SelectItem value="corporate">Corporate</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Investors")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
              <CardDescription>Configure GrowthStarter platform settings and rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Campaign Settings</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="min-amount">Minimum Campaign Amount</Label>
                      <Input
                        id="min-amount"
                        type="number"
                        value={platformSettings.minCampaignAmount}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          minCampaignAmount: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="max-amount">Maximum Campaign Amount</Label>
                      <Input
                        id="max-amount"
                        type="number"
                        value={platformSettings.maxCampaignAmount}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          maxCampaignAmount: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="platform-fee">Platform Fee (%)</Label>
                      <Input
                        id="platform-fee"
                        type="number"
                        value={platformSettings.platformFee}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          platformFee: parseFloat(e.target.value)
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="campaign-duration">Campaign Duration (days)</Label>
                      <Input
                        id="campaign-duration"
                        type="number"
                        value={platformSettings.campaignDuration}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          campaignDuration: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Equity & Investment</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="min-equity">Minimum Equity (%)</Label>
                      <Input
                        id="min-equity"
                        type="number"
                        value={platformSettings.minEquity}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          minEquity: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="max-equity">Maximum Equity (%)</Label>
                      <Input
                        id="max-equity"
                        type="number"
                        value={platformSettings.maxEquity}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          maxEquity: parseInt(e.target.value)
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="withdrawal-delay">Withdrawal Delay (days)</Label>
                      <Input
                        id="withdrawal-delay"
                        type="number"
                        value={platformSettings.withdrawalDelay}
                        onChange={(e) => setPlatformSettings({
                          ...platformSettings,
                          withdrawalDelay: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Security & Verification</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="verification-required">Verification Required</Label>
                    <Switch
                      id="verification-required"
                      checked={platformSettings.verificationRequired}
                      onCheckedChange={(checked) => setPlatformSettings({
                        ...platformSettings,
                        verificationRequired: checked
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="kyc-required">KYC Required</Label>
                    <Switch
                      id="kyc-required"
                      checked={platformSettings.kycRequired}
                      onCheckedChange={(checked) => setPlatformSettings({
                        ...platformSettings,
                        kycRequired: checked
                      })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-approval">Auto Approval</Label>
                    <Switch
                      id="auto-approval"
                      checked={platformSettings.autoApproval}
                      onCheckedChange={(checked) => setPlatformSettings({
                        ...platformSettings,
                        autoApproval: checked
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button onClick={handlePublish} className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Update Platform Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>GrowthStarter Analytics</CardTitle>
              <CardDescription>Platform performance and campaign insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Funding Trends</h4>
                  <div className="text-2xl font-bold text-green-600">
                    +{Math.round((campaigns.reduce((sum, c) => sum + c.currentAmount, 0) / campaigns.reduce((sum, c) => sum + c.targetAmount, 0)) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Average funding success rate</p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Top Categories</h4>
                  <div className="space-y-1">
                    {Array.from(new Set(campaigns.map(c => c.category))).slice(0, 3).map(category => (
                      <div key={category} className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span className="font-medium">
                          {campaigns.filter(c => c.category === category).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Investor Activity</h4>
                  <div className="text-2xl font-bold">
                    {investors.filter(i => i.verificationStatus === "verified").length}
                  </div>
                  <p className="text-sm text-muted-foreground">Active verified investors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
