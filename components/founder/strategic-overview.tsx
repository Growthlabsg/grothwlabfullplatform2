"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Users, 
  DollarSign, 
  BarChart3, 
  Globe, 
  Rocket, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Calendar,
  MapPin,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Award,
  Trophy,
  Flag
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useFounderAuth } from "@/contexts/founder-auth-context"

// Mock strategic data
const mockStrategicData = {
  businessMetrics: {
    totalUsers: 15420,
    activeUsers: 12890,
    userGrowth: 23.5,
    revenueGrowth: 34.2,
    marketShare: 12.8,
    customerSatisfaction: 4.6,
    churnRate: 2.1,
    ltv: 1250
  },
  marketPosition: {
    competitors: [
      { name: "Competitor A", marketShare: 18.5, strength: "high", threat: "medium" },
      { name: "Competitor B", marketShare: 15.2, strength: "medium", threat: "low" },
      { name: "Competitor C", marketShare: 22.1, strength: "high", threat: "high" }
    ],
    marketSize: 2.4, // billion USD
    marketGrowth: 8.7,
    ourPosition: "challenger"
  },
  strategicInitiatives: [
    { id: "1", name: "International Expansion", status: "in-progress", priority: "high", progress: 65, targetDate: "2024-Q3", budget: 500000, roi: 320 },
    { id: "2", name: "AI Integration", status: "planning", priority: "critical", progress: 25, targetDate: "2024-Q4", budget: 750000, roi: 450 },
    { id: "3", name: "Enterprise Sales", status: "completed", priority: "medium", progress: 100, targetDate: "2024-Q2", budget: 300000, roi: 280 },
    { id: "4", name: "Mobile App Launch", status: "in-progress", priority: "high", progress: 80, targetDate: "2024-Q3", budget: 400000, roi: 380 }
  ],
  risks: [
    { id: "1", category: "Market", description: "Economic downturn affecting B2B spending", probability: "medium", impact: "high", mitigation: "Diversify revenue streams", status: "monitoring" },
    { id: "2", category: "Technology", description: "Data security vulnerabilities", probability: "low", impact: "critical", mitigation: "Enhanced security protocols", status: "mitigated" },
    { id: "3", category: "Competition", description: "New market entrants with deep pockets", probability: "high", impact: "medium", mitigation: "Accelerate innovation", status: "active" }
  ],
  opportunities: [
    { id: "1", category: "Market", description: "Untapped Asian markets", potential: "high", effort: "medium", timeline: "12-18 months", estimatedValue: 2000000 },
    { id: "2", category: "Partnership", description: "Strategic alliance with enterprise software company", potential: "high", effort: "low", timeline: "6-9 months", estimatedValue: 1500000 },
    { id: "3", category: "Product", description: "AI-powered analytics features", potential: "medium", effort: "high", timeline: "18-24 months", estimatedValue: 3000000 }
  ],
  kpis: {
    userAcquisition: { current: 1250, target: 1500, trend: "increasing" },
    revenuePerUser: { current: 89, target: 95, trend: "stable" },
    customerRetention: { current: 94.2, target: 95, trend: "improving" },
    marketPenetration: { current: 12.8, target: 15, trend: "increasing" }
  }
}

export default function StrategicOverview() {
  const { toast } = useToast()
  const [strategicData, setStrategicData] = useState(mockStrategicData)
  const [isInitiativeDialogOpen, setIsInitiativeDialogOpen] = useState(false)
  const [isRiskDialogOpen, setIsRiskDialogOpen] = useState(false)
  const [isOpportunityDialogOpen, setIsOpportunityDialogOpen] = useState(false)
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null)
  const [newInitiative, setNewInitiative] = useState({ name: "", priority: "medium", targetDate: "", budget: 0 })

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing": return <TrendingUp className="h-4 w-4 text-green-600" />
      case "decreasing": return <TrendingDown className="h-4 w-4 text-red-600" />
      case "stable": return <Activity className="h-4 w-4 text-blue-600" />
      case "improving": return <TrendingUp className="h-4 w-4 text-green-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-red-600"
      case "high": return "text-orange-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-blue-600"
      default: return "text-gray-600"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed": return "default"
      case "in-progress": return "secondary"
      case "planning": return "outline"
      case "on-hold": return "destructive"
      default: return "secondary"
    }
  }

  const getThreatLevel = (threat: string) => {
    switch (threat) {
      case "high": return "text-red-600"
      case "medium": return "text-yellow-600"
      case "low": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const handleCreateInitiative = () => {
    if (!newInitiative.name || !newInitiative.targetDate) return
    
    const initiative = {
      id: Date.now().toString(),
      ...newInitiative,
      status: "planning",
      progress: 0,
      roi: 0
    }
    
    setStrategicData(prev => ({
      ...prev,
      strategicInitiatives: [...prev.strategicInitiatives, initiative]
    }))
    
    setNewInitiative({ name: "", priority: "medium", targetDate: "", budget: 0 })
    setIsInitiativeDialogOpen(false)
    toast({ title: "Initiative Created", description: "New strategic initiative has been added" })
  }

  const handleUpdateInitiativeProgress = (initiativeId: string, progress: number) => {
    setStrategicData(prev => ({
      ...prev,
      strategicInitiatives: prev.strategicInitiatives.map(initiative => 
        initiative.id === initiativeId 
          ? { ...initiative, progress: Math.min(100, Math.max(0, progress)) }
          : initiative
      )
    }))
    
    toast({ title: "Progress Updated", description: `Initiative progress updated to ${progress}%` })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Strategic Overview</h2>
          <p className="text-gray-300">High-level business metrics, market position, and strategic initiatives</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isInitiativeDialogOpen} onOpenChange={setIsInitiativeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Rocket className="h-4 w-4 mr-2" />
                New Initiative
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Strategic Initiative</DialogTitle>
                <DialogDescription>Add a new strategic initiative to the roadmap</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initiative-name">Initiative Name</Label>
                  <Input
                    id="initiative-name"
                    value={newInitiative.name}
                    onChange={(e) => setNewInitiative(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter initiative name..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="initiative-priority">Priority</Label>
                    <Select value={newInitiative.priority} onValueChange={(value) => setNewInitiative(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="initiative-budget">Budget (USD)</Label>
                    <Input
                      id="initiative-budget"
                      type="number"
                      value={newInitiative.budget}
                      onChange={(e) => setNewInitiative(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="initiative-date">Target Date</Label>
                  <Input
                    id="initiative-date"
                    type="date"
                    value={newInitiative.targetDate}
                    onChange={(e) => setNewInitiative(prev => ({ ...prev, targetDate: e.target.value }))}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsInitiativeDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateInitiative}>Create Initiative</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Key Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-white">{formatNumber(strategicData.businessMetrics.totalUsers)}</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <ArrowUpRight className="h-3 w-3" />
              {strategicData.businessMetrics.userGrowth}%
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-white">{strategicData.businessMetrics.revenueGrowth}%</div>
            <div className="flex items-center gap-1 text-sm text-green-500">
              <TrendingUp className="h-3 w-3" />
              YoY
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-white">{strategicData.businessMetrics.marketShare}%</div>
            <div className="flex items-center gap-1 text-sm text-blue-500">
              <Target className="h-3 w-3" />
              Target: 15%
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-white">{strategicData.businessMetrics.customerSatisfaction}/5</div>
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <Star className="h-3 w-3" />
              {formatNumber(strategicData.businessMetrics.totalUsers * strategicData.businessMetrics.customerSatisfaction / 5)} happy users
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-white/10 border-white/20">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="risks">Risks</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* KPI Progress */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(strategicData.kpis).map(([key, kpi]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white font-medium">
                        {key === 'customerRetention' || key === 'marketPenetration' ? `${kpi.current}%` : 
                         key === 'revenuePerUser' ? `$${kpi.current}` : formatNumber(kpi.current)}
                      </span>
                    </div>
                    <Progress value={(kpi.current / kpi.target) * 100} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Target: {key === 'customerRetention' || key === 'marketPenetration' ? `${kpi.target}%` : 
                                   key === 'revenuePerUser' ? `$${kpi.target}` : formatNumber(kpi.target)}</span>
                      {getTrendIcon(kpi.trend)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Position */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Market Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 rounded bg-white/5">
                  <div className="text-2xl font-bold text-white capitalize">{strategicData.marketPosition.ourPosition}</div>
                  <div className="text-sm text-gray-300">Current Position</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 rounded bg-white/5">
                    <div className="text-lg font-semibold text-white">${strategicData.marketPosition.marketSize}B</div>
                    <div className="text-gray-300">Market Size</div>
                  </div>
                  <div className="text-center p-2 rounded bg-white/5">
                    <div className="text-lg font-semibold text-white">{strategicData.marketPosition.marketGrowth}%</div>
                    <div className="text-gray-300">Market Growth</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Initiatives Tab */}
        <TabsContent value="initiatives" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Strategic Initiatives</CardTitle>
              <CardDescription>Track progress of key strategic initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicData.strategicInitiatives.map((initiative) => (
                  <div key={initiative.id} className="p-4 rounded bg-white/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-white font-medium">{initiative.name}</h4>
                        <Badge variant={getStatusBadgeVariant(initiative.status)}>
                          {initiative.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(initiative.priority)}`}>
                          {initiative.priority}
                        </span>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-white font-medium">{formatCurrency(initiative.budget)}</div>
                        <div className="text-gray-400">Budget</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Progress</span>
                        <span className="text-white">{initiative.progress}%</span>
                      </div>
                      <Progress value={initiative.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                      <span>Target: {initiative.targetDate}</span>
                      <span>ROI: {initiative.roi}%</span>
                    </div>
                    {initiative.status === "in-progress" && (
                      <div className="mt-3 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateInitiativeProgress(initiative.id, initiative.progress + 10)}
                        >
                          +10% Progress
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUpdateInitiativeProgress(initiative.id, initiative.progress - 10)}
                        >
                          -10% Progress
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Market Tab */}
        <TabsContent value="market" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Competitive Landscape</CardTitle>
              <CardDescription>Analysis of key competitors and market dynamics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strategicData.marketPosition.competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded bg-white/5">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{competitor.name}</span>
                      <Badge variant="outline">{competitor.marketShare}% market share</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-gray-300">
                        <span className="text-gray-500">Strength:</span> {competitor.strength}
                      </div>
                      <div className="text-gray-300">
                        <span className={`${getThreatLevel(competitor.threat)}`}>Threat: {competitor.threat}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risks Tab */}
        <TabsContent value="risks" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Risk Assessment</CardTitle>
              <CardDescription>Monitor and manage strategic risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategicData.risks.map((risk) => (
                  <div key={risk.id} className="p-3 rounded bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{risk.description}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{risk.category}</Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(risk.probability)}`}>
                          {risk.probability} probability
                        </span>
                        <span className={`text-sm font-medium ${getPriorityColor(risk.impact)}`}>
                          {risk.impact} impact
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      <div><span className="text-gray-500">Mitigation:</span> {risk.mitigation}</div>
                      <div><span className="text-gray-500">Status:</span> {risk.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Growth Opportunities</CardTitle>
              <CardDescription>Identify and prioritize growth opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {strategicData.opportunities.map((opportunity) => (
                  <div key={opportunity.id} className="p-3 rounded bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{opportunity.description}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{opportunity.category}</Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(opportunity.potential)}`}>
                          {opportunity.potential} potential
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                      <div><span className="text-gray-500">Effort:</span> {opportunity.effort}</div>
                      <div><span className="text-gray-500">Timeline:</span> {opportunity.timeline}</div>
                      <div><span className="text-gray-500">Value:</span> {formatCurrency(opportunity.estimatedValue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
