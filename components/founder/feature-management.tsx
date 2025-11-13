"use client"

import { useState, useEffect } from "react"
import { useFounderAuth } from "@/contexts/founder-auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ToggleLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Zap,
  Users,
  MessageSquare,
  Calendar,
  Building,
  DollarSign,
  BookOpen,
  Video,
  Phone,
  QrCode,
  Globe,
  Shield,
  Bell,
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  Award,
  Heart,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Save,
  RefreshCw,
  Download,
  Upload,
  Rocket,
  Lightbulb,
  Gauge,
  Lock,
  Unlock,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { PlatformFeature } from "@/types/founder"

export default function FeatureManagement() {
  const { founder, getPlatformFeatures, toggleFeature, updateFeaturePhase, createFeature, deleteFeature } = useFounderAuth()
  const { toast } = useToast()
  
  const [features, setFeatures] = useState<PlatformFeature[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedPhase, setSelectedPhase] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<PlatformFeature | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Mock features data - replace with actual API calls
  const mockFeatures: PlatformFeature[] = [
    {
      id: "user-authentication",
      name: "User Authentication",
      description: "Core user authentication and authorization system",
      category: "core",
      status: "live",
      phase: "phase1",
      launchDate: "2024-01-01",
      targetAudience: ["all"],
      dependencies: [],
      metrics: ["login_success_rate", "session_duration"],
      isEnabled: true,
      isPublic: true,
      requiresAuth: false,
      permissions: ["founder:all"],
      config: {},
      priority: "critical",
      complexity: "moderate",
      developmentCost: 50000,
      maintenanceCost: 5000,
      expectedROI: 200,
      riskLevel: "low",
      complianceRequirements: ["GDPR", "SOC2"],
      technicalDebt: 0,
      lastModified: "2024-01-15",
      modifiedBy: "founder",
      version: "1.0.0",
      changelog: ["Initial release"],
      rolloutStrategy: "immediate",
      targetPercentage: 100,
      rolloutSchedule: {
        startDate: "2024-01-01",
        endDate: "2024-01-01",
        milestones: []
      },
      performance: {
        loadTime: 200,
        errorRate: 0.1,
        userSatisfaction: 95,
        adoptionRate: 98,
        retentionRate: 95
      }
    },
    {
      id: "communication-hub",
      name: "Communication Hub",
      description: "Advanced communication and collaboration tools",
      category: "communication",
      status: "beta",
      phase: "phase2",
      launchDate: "2024-03-01",
      targetAudience: ["startup", "investor", "mentor"],
      dependencies: ["user-authentication"],
      metrics: ["message_count", "response_time", "engagement_rate"],
      isEnabled: true,
      isPublic: false,
      requiresAuth: true,
      permissions: ["founder:communication"],
      config: {},
      priority: "high",
      complexity: "complex",
      developmentCost: 75000,
      maintenanceCost: 8000,
      expectedROI: 150,
      riskLevel: "medium",
      complianceRequirements: ["GDPR", "HIPAA"],
      technicalDebt: 15,
      lastModified: "2024-02-15",
      modifiedBy: "founder",
      version: "0.9.0",
      changelog: ["Beta release", "Enhanced security"],
      rolloutStrategy: "beta-test",
      targetPercentage: 25,
      rolloutSchedule: {
        startDate: "2024-03-01",
        endDate: "2024-04-01",
        milestones: [
          { date: "2024-03-01", percentage: 10, description: "Internal testing" },
          { date: "2024-03-15", percentage: 25, description: "Beta users" }
        ]
      },
      performance: {
        loadTime: 350,
        errorRate: 0.5,
        userSatisfaction: 88,
        adoptionRate: 75,
        retentionRate: 82
      }
    },
    {
      id: "ai-powered-matching",
      name: "AI-Powered Matching",
      description: "Intelligent matching for startups, investors, and mentors",
      category: "growth",
      status: "development",
      phase: "phase3",
      launchDate: "2024-06-01",
      targetAudience: ["startup", "investor", "mentor"],
      dependencies: ["user-authentication", "communication-hub"],
      metrics: ["match_accuracy", "conversion_rate", "user_satisfaction"],
      isEnabled: false,
      isPublic: false,
      requiresAuth: true,
      permissions: ["founder:all"],
      config: {},
      priority: "high",
      complexity: "very-complex",
      developmentCost: 120000,
      maintenanceCost: 15000,
      expectedROI: 300,
      riskLevel: "high",
      complianceRequirements: ["GDPR", "AI Ethics"],
      technicalDebt: 0,
      lastModified: "2024-02-01",
      modifiedBy: "founder",
      version: "0.3.0",
      changelog: ["Initial development", "ML model training"],
      rolloutStrategy: "gradual",
      targetPercentage: 50,
      rolloutSchedule: {
        startDate: "2024-06-01",
        endDate: "2024-08-01",
        milestones: [
          { date: "2024-06-01", percentage: 10, description: "Early adopters" },
          { date: "2024-07-01", percentage: 30, description: "Expanded rollout" },
          { date: "2024-08-01", percentage: 50, description: "Full rollout" }
        ]
      },
      performance: {
        loadTime: 0,
        errorRate: 0,
        userSatisfaction: 0,
        adoptionRate: 0,
        retentionRate: 0
      }
    }
  ]

  useEffect(() => {
    loadFeatures()
  }, [])

  const loadFeatures = async () => {
    setIsLoading(true)
    try {
      // Replace with actual API call
      const featuresData = await getPlatformFeatures()
      setFeatures(featuresData.length > 0 ? featuresData : mockFeatures)
    } catch (error) {
      console.error("Failed to load features:", error)
      setFeatures(mockFeatures)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleFeature = async (featureId: string, enabled: boolean) => {
    try {
      await toggleFeature(featureId, enabled)
      setFeatures(prev => prev.map(f => 
        f.id === featureId ? { ...f, isEnabled: enabled } : f
      ))
      toast({
        title: "Feature Updated",
        description: `Feature ${enabled ? 'enabled' : 'disabled'} successfully`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature",
        variant: "destructive",
      })
    }
  }

  const handleToggleVisibility = async (featureId: string, visible: boolean) => {
    try {
      setFeatures(prev => prev.map(f => 
        f.id === featureId ? { ...f, isPublic: visible } : f
      ))
      toast({
        title: "Visibility Updated",
        description: `Feature ${visible ? 'made public' : 'made private'}`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature visibility",
        variant: "destructive",
      })
    }
  }

  const handleUpdatePhase = async (featureId: string, phase: string) => {
    try {
      await updateFeaturePhase(featureId, phase)
      setFeatures(prev => prev.map(f => 
        f.id === featureId ? { ...f, phase: phase as any } : f
      ))
      toast({
        title: "Phase Updated",
        description: `Feature moved to ${phase}`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature phase",
        variant: "destructive",
      })
    }
  }

  const handleCreateFeature = async (featureData: Omit<PlatformFeature, 'id'>) => {
    try {
      const newFeature = await createFeature(featureData)
      setFeatures(prev => [...prev, newFeature])
      setIsCreateDialogOpen(false)
      toast({
        title: "Feature Created",
        description: "New feature created successfully",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create feature",
        variant: "destructive",
      })
    }
  }

  const handleDeleteFeature = async (featureId: string) => {
    try {
      await deleteFeature(featureId)
      setFeatures(prev => prev.filter(f => f.id !== featureId))
      toast({
        title: "Feature Deleted",
        description: "Feature removed successfully",
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete feature",
        variant: "destructive",
      })
    }
  }

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || feature.category === selectedCategory
    const matchesPhase = selectedPhase === "all" || feature.phase === selectedPhase
    return matchesSearch && matchesCategory && matchesPhase
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "live": return <CheckCircle className="h-4 w-4 text-green-400" />
      case "beta": return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      case "development": return <Clock className="h-4 w-4 text-blue-400" />
      case "testing": return <Gauge className="h-4 w-4 text-purple-400" />
      case "deprecated": return <AlertTriangle className="h-4 w-4 text-red-400" />
      default: return <Info className="h-4 w-4 text-gray-400" />
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "phase1": return "bg-blue-500/20 text-blue-400 border-blue-500/50"
      case "phase2": return "bg-green-500/20 text-green-400 border-green-500/50"
      case "phase3": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "phase4": return "bg-purple-500/20 text-purple-400 border-purple-500/50"
      case "phase5": return "bg-red-500/20 text-red-400 border-red-500/50"
      case "future": return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "core": return <Shield className="h-4 w-4" />
      case "communication": return <MessageSquare className="h-4 w-4" />
      case "growth": return <TrendingUp className="h-4 w-4" />
      case "engagement": return <Heart className="h-4 w-4" />
      case "monetization": return <DollarSign className="h-4 w-4" />
      case "analytics": return <BarChart3 className="h-4 w-4" />
      case "security": return <Lock className="h-4 w-4" />
      case "social": return <Users className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Feature Management</h2>
          <p className="text-slate-300">
            Complete control over platform features and rollout strategy
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Feature
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Search Features</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="monetization">Monetization</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Launch Phase</Label>
              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Phases</SelectItem>
                  <SelectItem value="phase1">Phase 1</SelectItem>
                  <SelectItem value="phase2">Phase 2</SelectItem>
                  <SelectItem value="phase3">Phase 3</SelectItem>
                  <SelectItem value="phase4">Phase 4</SelectItem>
                  <SelectItem value="phase5">Phase 5</SelectItem>
                  <SelectItem value="future">Future</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Actions</Label>
              <Button
                variant="outline"
                onClick={loadFeatures}
                disabled={isLoading}
                className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredFeatures.map((feature) => (
          <Card key={feature.id} className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(feature.category)}
                  <div>
                    <CardTitle className="text-white text-lg">{feature.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className={getPhaseColor(feature.phase)}>
                        {feature.phase.replace('phase', 'Phase ')}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-white">
                        {getStatusIcon(feature.status)}
                        <span className="ml-1 capitalize">{feature.status}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={feature.isEnabled}
                    onCheckedChange={(enabled) => handleToggleFeature(feature.id, enabled)}
                    className="data-[state=checked]:bg-yellow-400"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleVisibility(feature.id, !feature.isPublic)}
                    className="text-slate-300 hover:text-white"
                  >
                    {feature.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-slate-300 text-sm">{feature.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Priority:</span>
                  <Badge variant="outline" className="border-white/20 text-white capitalize">
                    {feature.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Complexity:</span>
                  <Badge variant="outline" className="border-white/20 text-white capitalize">
                    {feature.complexity}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">ROI:</span>
                  <span className="text-white font-medium">{feature.expectedROI}%</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-white/20">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Rollout:</span>
                  <span className="text-white font-medium">{feature.rolloutStrategy}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Target:</span>
                  <span className="text-white font-medium">{feature.targetPercentage}%</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingFeature(feature)
                    setIsEditDialogOpen(true)
                  }}
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                
                <Select
                  value={feature.phase}
                  onValueChange={(phase) => handleUpdatePhase(feature.id, phase)}
                >
                  <SelectTrigger className="flex-1 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phase1">Phase 1</SelectItem>
                    <SelectItem value="phase2">Phase 2</SelectItem>
                    <SelectItem value="phase3">Phase 3</SelectItem>
                    <SelectItem value="phase4">Phase 4</SelectItem>
                    <SelectItem value="phase5">Phase 5</SelectItem>
                    <SelectItem value="future">Future</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteFeature(feature.id)}
                  className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Feature Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Feature</DialogTitle>
            <DialogDescription>
              Define a new platform feature with complete configuration
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Feature Name</Label>
                <Input placeholder="Enter feature name" className="bg-white/10 border-white/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">Core</SelectItem>
                    <SelectItem value="communication">Communication</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                    <SelectItem value="monetization">Monetization</SelectItem>
                    <SelectItem value="analytics">Analytics</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Describe the feature and its purpose" 
                className="bg-white/10 border-white/20 text-white" 
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Launch Phase</Label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select phase" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phase1">Phase 1</SelectItem>
                    <SelectItem value="phase2">Phase 2</SelectItem>
                    <SelectItem value="phase3">Phase 3</SelectItem>
                    <SelectItem value="phase4">Phase 4</SelectItem>
                    <SelectItem value="phase5">Phase 5</SelectItem>
                    <SelectItem value="future">Future</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Development Cost ($)</Label>
                <Input type="number" placeholder="50000" className="bg-white/10 border-white/20 text-white" />
              </div>
              <div className="space-y-2">
                <Label>Expected ROI (%)</Label>
                <Input type="number" placeholder="200" className="bg-white/10 border-white/20 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Rollout Strategy</Label>
              <Select>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="gradual">Gradual</SelectItem>
                  <SelectItem value="beta-test">Beta Test</SelectItem>
                  <SelectItem value="a-b-test">A/B Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle feature creation
                setIsCreateDialogOpen(false)
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
            >
              Create Feature
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Feature Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Feature: {editingFeature?.name}</DialogTitle>
            <DialogDescription>
              Modify feature configuration and rollout settings
            </DialogDescription>
          </DialogHeader>
          
          {editingFeature && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={editingFeature.status}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                      <SelectItem value="beta">Beta</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Phase</Label>
                  <Select value={editingFeature.phase}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase1">Phase 1</SelectItem>
                      <SelectItem value="phase2">Phase 2</SelectItem>
                      <SelectItem value="phase3">Phase 3</SelectItem>
                      <SelectItem value="phase4">Phase 4</SelectItem>
                      <SelectItem value="phase5">Phase 5</SelectItem>
                      <SelectItem value="future">Future</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Percentage</Label>
                  <Input 
                    type="number" 
                    value={editingFeature.targetPercentage}
                    className="bg-white/10 border-white/20 text-white" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Launch Date</Label>
                  <Input 
                    type="date" 
                    value={editingFeature.launchDate}
                    className="bg-white/10 border-white/20 text-white" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Configuration</Label>
                <Textarea 
                  placeholder="Feature configuration (JSON)" 
                  className="bg-white/10 border-white/20 text-white" 
                  rows={4}
                  defaultValue={JSON.stringify(editingFeature.config, null, 2)}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-white/20 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle feature update
                setIsEditDialogOpen(false)
              }}
              className="bg-yellow-400 hover:bg-yellow-500 text-slate-900"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
