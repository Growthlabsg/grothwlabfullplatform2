"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Download,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Target,
  Users,
  Building2,
  Globe,
  Shield,
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
  Lightbulb,
  Zap,
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
  MessageSquare,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Code2,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function PortfolioPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPeriod, setSelectedPeriod] = useState("1y")

  const portfolioStats = [
    { label: "Total Invested", value: "$45.2M", icon: DollarSign, change: "+12.5%", trend: "up" },
    { label: "Current Value", value: "$78.4M", icon: TrendingUp, change: "+18.3%", trend: "up" },
    { label: "Total Return", value: "$33.2M", icon: Award, change: "+73.5%", trend: "up" },
    { label: "IRR", value: "24.8%", icon: Target, change: "+2.1%", trend: "up" },
    { label: "Active Investments", value: "12", icon: Building2, change: "+2", trend: "up" },
    { label: "Exits", value: "8", icon: Trophy, change: "+3", trend: "up" }
  ]

  const portfolioCompanies = [
    {
      id: 1,
      name: "DataFlow Analytics",
      stage: "Series B",
      investmentDate: "2022-03-15",
      investmentAmount: "$5M",
      currentValuation: "$45M",
      ownership: "12.5%",
      currentValue: "$5.6M",
      multiple: "1.12x",
      status: "Active",
      sector: "Data Analytics",
      location: "Seattle, WA",
      employees: 65,
      revenue: "$8.2M ARR",
      growth: "+180% YoY",
      lastUpdate: "2024-01-15"
    },
    {
      id: 2,
      name: "CloudSecure",
      stage: "Growth",
      investmentDate: "2021-08-20",
      investmentAmount: "$8M",
      currentValuation: "$120M",
      ownership: "8.3%",
      currentValue: "$10M",
      multiple: "1.25x",
      status: "Active",
      sector: "Cybersecurity",
      location: "San Francisco, CA",
      employees: 95,
      revenue: "$18.5M ARR",
      growth: "+220% YoY",
      lastUpdate: "2024-01-10"
    },
    {
      id: 3,
      name: "EcoTech Solutions",
      stage: "Exit",
      investmentDate: "2020-05-10",
      investmentAmount: "$3M",
      exitValuation: "$85M",
      ownership: "15%",
      exitValue: "$12.75M",
      multiple: "4.25x",
      status: "Exited",
      sector: "CleanTech",
      location: "Denver, CO",
      employees: 45,
      revenue: "$12.3M ARR",
      growth: "+150% YoY",
      lastUpdate: "2023-12-20"
    },
    {
      id: 4,
      name: "HealthTech Innovations",
      stage: "Series A",
      investmentDate: "2023-01-15",
      investmentAmount: "$4M",
      currentValuation: "$25M",
      ownership: "16%",
      currentValue: "$4M",
      multiple: "1.0x",
      status: "Active",
      sector: "HealthTech",
      location: "Boston, MA",
      employees: 28,
      revenue: "$2.1M ARR",
      growth: "+320% YoY",
      lastUpdate: "2024-01-20"
    },
    {
      id: 5,
      name: "FinTech Pro",
      stage: "Exit",
      investmentDate: "2019-11-20",
      investmentAmount: "$2M",
      exitValuation: "$50M",
      ownership: "20%",
      exitValue: "$10M",
      multiple: "5.0x",
      status: "Exited",
      sector: "FinTech",
      location: "New York, NY",
      employees: 35,
      revenue: "$5.8M ARR",
      growth: "+280% YoY",
      lastUpdate: "2023-08-15"
    }
  ]

  const performanceMetrics = [
    {
      period: "1 Year",
      totalReturn: "+73.5%",
      irr: "24.8%",
      bestPerformer: "EcoTech Solutions (4.25x)",
      worstPerformer: "HealthTech Innovations (1.0x)",
      newInvestments: 2,
      exits: 3
    },
    {
      period: "3 Years",
      totalReturn: "+156.2%",
      irr: "28.4%",
      bestPerformer: "FinTech Pro (5.0x)",
      worstPerformer: "DataFlow Analytics (1.12x)",
      newInvestments: 8,
      exits: 5
    },
    {
      period: "5 Years",
      totalReturn: "+289.7%",
      irr: "31.2%",
      bestPerformer: "FinTech Pro (5.0x)",
      worstPerformer: "CloudSecure (1.25x)",
      newInvestments: 15,
      exits: 8
    }
  ]

  const sectorBreakdown = [
    { sector: "Data Analytics", count: 3, percentage: 25, value: "$15.2M" },
    { sector: "Cybersecurity", count: 2, percentage: 17, value: "$12.8M" },
    { sector: "CleanTech", count: 2, percentage: 17, value: "$18.5M" },
    { sector: "HealthTech", count: 2, percentage: 17, value: "$8.9M" },
    { sector: "FinTech", count: 2, percentage: 17, value: "$15.6M" },
    { sector: "Other", count: 1, percentage: 7, value: "$7.4M" }
  ]

  const stageBreakdown = [
    { stage: "Seed", count: 2, percentage: 17, value: "$4.2M" },
    { stage: "Series A", count: 4, percentage: 33, value: "$12.8M" },
    { stage: "Series B", count: 3, percentage: 25, value: "$15.6M" },
    { stage: "Growth", count: 2, percentage: 17, value: "$18.5M" },
    { stage: "Late Stage", count: 1, percentage: 8, value: "$8.1M" }
  ]

  const handleExportPortfolio = () => {
    toast({
      title: "Exporting Portfolio",
      description: "Portfolio data export started...",
    })
  }

  const handleRefreshData = () => {
    toast({
      title: "Refreshing Data",
      description: "Portfolio data is being updated...",
    })
  }

  const handleViewCompany = (companyId: number) => {
    toast({
      title: "Viewing Company",
      description: "Opening company details...",
    })
  }

  const handleEditInvestment = (companyId: number) => {
    toast({
      title: "Editing Investment",
      description: "Opening investment edit form...",
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
                <Link href="/resources/for-investors">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to For Investors
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Portfolio Analytics</h1>
                <p className="text-sm text-gray-600">Track your investment performance and portfolio metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleRefreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPortfolio}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {portfolioStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-2 bg-[#0F7377]/10 rounded-lg">
                    <stat.icon className="h-6 w-6 text-[#0F7377]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>Value growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Performance chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Best performing investments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolioCompanies
                    .filter(company => company.status === 'Exited')
                    .sort((a, b) => parseFloat(b.multiple) - parseFloat(a.multiple))
                    .slice(0, 3)
                    .map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{company.name}</h4>
                        <p className="text-sm text-gray-600">{company.sector}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{company.stage}</span>
                          <span>{company.multiple} multiple</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{company.multiple}</p>
                        <p className="text-xs text-gray-500">Multiple</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators across different time periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Period</th>
                        <th className="text-left py-3 px-4">Total Return</th>
                        <th className="text-left py-3 px-4">IRR</th>
                        <th className="text-left py-3 px-4">Best Performer</th>
                        <th className="text-left py-3 px-4">Worst Performer</th>
                        <th className="text-left py-3 px-4">New Investments</th>
                        <th className="text-left py-3 px-4">Exits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {performanceMetrics.map((metric, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{metric.period}</td>
                          <td className="py-3 px-4 text-green-600 font-semibold">{metric.totalReturn}</td>
                          <td className="py-3 px-4 text-green-600 font-semibold">{metric.irr}</td>
                          <td className="py-3 px-4 text-sm">{metric.bestPerformer}</td>
                          <td className="py-3 px-4 text-sm">{metric.worstPerformer}</td>
                          <td className="py-3 px-4">{metric.newInvestments}</td>
                          <td className="py-3 px-4">{metric.exits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Companies</CardTitle>
                <CardDescription>Detailed view of all portfolio companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Company</th>
                        <th className="text-left py-3 px-4">Stage</th>
                        <th className="text-left py-3 px-4">Investment</th>
                        <th className="text-left py-3 px-4">Current Value</th>
                        <th className="text-left py-3 px-4">Multiple</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioCompanies.map((company) => (
                        <tr key={company.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{company.name}</p>
                              <p className="text-sm text-gray-600">{company.sector}</p>
                              <p className="text-xs text-gray-500">{company.location}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">{company.stage}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{company.investmentAmount}</p>
                              <p className="text-xs text-gray-600">{company.ownership} ownership</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{company.currentValue}</p>
                              <p className="text-xs text-gray-600">{company.currentValuation} valuation</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{company.multiple}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{ width: `${Math.min(parseFloat(company.multiple) * 20, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={company.status === 'Active' ? 'default' : 'secondary'}>
                              {company.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewCompany(company.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditInvestment(company.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
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

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sector Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Sector Breakdown</CardTitle>
                  <CardDescription>Portfolio distribution by sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sectorBreakdown.map((sector, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{sector.sector}</span>
                            <span className="text-sm text-gray-600">{sector.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#0F7377] h-2 rounded-full" 
                              style={{ width: `${sector.percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{sector.count} companies</span>
                            <span>{sector.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stage Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Stage Breakdown</CardTitle>
                  <CardDescription>Portfolio distribution by investment stage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stageBreakdown.map((stage, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{stage.stage}</span>
                            <span className="text-sm text-gray-600">{stage.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#F59E0B] h-2 rounded-full" 
                              style={{ width: `${stage.percentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{stage.count} companies</span>
                            <span>{stage.value}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center py-12">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-500 mb-4">Detailed portfolio analytics and insights</p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
