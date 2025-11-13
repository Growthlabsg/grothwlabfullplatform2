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
import { Calendar, DollarSign, Users, Target, AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LaunchPhase, PlatformFeature } from "@/types/founder"
import { useFounderAuth } from "@/contexts/founder-auth-context"

// Mock launch phases data
const mockLaunchPhases: LaunchPhase[] = [
  {
    id: "phase1",
    name: "Phase 1: Foundation Launch",
    description: "Core platform features and essential user experience",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    budget: 150000,
    spentBudget: 120000,
    targetUsers: 1000,
    currentUsers: 850,
    status: "active",
    priority: "high",
    riskLevel: "medium",
    riskFactors: ["Technical debt", "User adoption"],
    mitigationStrategies: ["Code reviews", "User feedback loops"],
    features: ["user-authentication", "basic-profile", "core-dashboard"],
    successMetrics: ["User registration", "Daily active users", "Feature usage"],
    teamSize: 8,
    dependencies: [],
    notes: "Focus on stability and core user journey"
  },
  {
    id: "phase2",
    name: "Phase 2: Growth & Engagement",
    description: "Advanced features and user engagement tools",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    budget: 200000,
    spentBudget: 45000,
    targetUsers: 5000,
    currentUsers: 1200,
    status: "planning",
    priority: "high",
    riskLevel: "low",
    riskFactors: ["Scalability challenges"],
    mitigationStrategies: ["Load testing", "Infrastructure scaling"],
    features: ["advanced-analytics", "social-features", "mobile-app"],
    successMetrics: ["User retention", "Engagement time", "Feature adoption"],
    teamSize: 12,
    dependencies: ["phase1"],
    notes: "Build on stable foundation, focus on user growth"
  },
  {
    id: "phase3",
    name: "Phase 3: Monetization & Scale",
    description: "Revenue features and enterprise capabilities",
    startDate: "2024-07-01",
    endDate: "2024-12-31",
    budget: 300000,
    spentBudget: 0,
    targetUsers: 15000,
    currentUsers: 0,
    status: "future",
    priority: "medium",
    riskLevel: "high",
    riskFactors: ["Market competition", "Revenue model validation"],
    mitigationStrategies: ["Market research", "Pilot programs", "Partnerships"],
    features: ["subscription-plans", "enterprise-features", "api-access"],
    successMetrics: ["Revenue growth", "Customer acquisition cost", "Lifetime value"],
    teamSize: 18,
    dependencies: ["phase1", "phase2"],
    notes: "Critical for business sustainability, requires careful planning"
  }
]

// Mock features data for reference
const mockFeatures: PlatformFeature[] = [
  { id: "user-authentication", name: "User Authentication", status: "active", phase: "phase1" },
  { id: "basic-profile", name: "Basic Profile", status: "active", phase: "phase1" },
  { id: "core-dashboard", name: "Core Dashboard", status: "active", phase: "phase1" },
  { id: "advanced-analytics", name: "Advanced Analytics", status: "development", phase: "phase2" },
  { id: "social-features", name: "Social Features", status: "planning", phase: "phase2" },
  { id: "mobile-app", name: "Mobile App", status: "planning", phase: "phase2" },
  { id: "subscription-plans", name: "Subscription Plans", status: "future", phase: "phase3" },
  { id: "enterprise-features", name: "Enterprise Features", status: "future", phase: "phase3" },
  { id: "api-access", name: "API Access", status: "future", phase: "phase3" }
]

const statusColors = {
  active: "bg-green-100 text-green-800",
  planning: "bg-blue-100 text-blue-800",
  future: "bg-gray-100 text-gray-800",
  completed: "bg-purple-100 text-purple-800",
  delayed: "bg-red-100 text-red-800"
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
}

const riskColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
}

export default function LaunchPhases() {
  const { toast } = useToast()
  const [phases, setPhases] = useState<LaunchPhase[]>(mockLaunchPhases)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedPhase, setSelectedPhase] = useState<LaunchPhase | null>(null)
  const [newPhase, setNewPhase] = useState<Partial<LaunchPhase>>({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    budget: 0,
    targetUsers: 0,
    priority: "medium",
    riskLevel: "medium"
  })

  const getPhaseProgress = (phase: LaunchPhase) => {
    const start = new Date(phase.startDate).getTime()
    const end = new Date(phase.endDate).getTime()
    const now = new Date().getTime()
    
    if (phase.status === "completed") return 100
    if (phase.status === "future") return 0
    
    const total = end - start
    const elapsed = now - start
    
    return Math.min(Math.max((elapsed / total) * 100, 0), 100)
  }

  const getBudgetProgress = (phase: LaunchPhase) => {
    return (phase.spentBudget / phase.budget) * 100
  }

  const getUserProgress = (phase: LaunchPhase) => {
    return (phase.currentUsers / phase.targetUsers) * 100
  }

  const handleAddPhase = () => {
    if (!newPhase.name || !newPhase.description || !newPhase.startDate || !newPhase.endDate) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const phase: LaunchPhase = {
      id: `phase${Date.now()}`,
      name: newPhase.name!,
      description: newPhase.description!,
      startDate: newPhase.startDate!,
      endDate: newPhase.endDate!,
      budget: newPhase.budget || 0,
      spentBudget: 0,
      targetUsers: newPhase.targetUsers || 0,
      currentUsers: 0,
      status: "future",
      priority: newPhase.priority as any || "medium",
      riskLevel: newPhase.riskLevel as any || "medium",
      riskFactors: [],
      mitigationStrategies: [],
      features: [],
      successMetrics: [],
      teamSize: 0,
      dependencies: [],
      notes: ""
    }

    setPhases([...phases, phase])
    setNewPhase({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      budget: 0,
      targetUsers: 0,
      priority: "medium",
      riskLevel: "medium"
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "Launch Phase Added",
      description: `${phase.name} has been added to the roadmap`,
    })
  }

  const handleUpdatePhase = (phaseId: string, updates: Partial<LaunchPhase>) => {
    setPhases(phases.map(phase => 
      phase.id === phaseId ? { ...phase, ...updates } : phase
    ))
    
    toast({
      title: "Phase Updated",
      description: "Launch phase has been updated successfully",
    })
  }

  const handleStatusChange = (phaseId: string, newStatus: LaunchPhase["status"]) => {
    handleUpdatePhase(phaseId, { status: newStatus })
  }

  const getPhaseFeatures = (phaseId: string) => {
    return mockFeatures.filter(feature => feature.phase === phaseId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Launch Phases</h2>
          <p className="text-muted-foreground">
            Plan and manage feature rollouts in phases with budgets, timelines, and risk assessments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Launch Phase</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Launch Phase</DialogTitle>
              <DialogDescription>
                Create a new phase for your feature rollout strategy
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Phase Name *</Label>
                <Input
                  id="name"
                  value={newPhase.name}
                  onChange={(e) => setNewPhase({...newPhase, name: e.target.value})}
                  placeholder="e.g., Phase 1: Foundation Launch"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Input
                  id="description"
                  value={newPhase.description}
                  onChange={(e) => setNewPhase({...newPhase, description: e.target.value})}
                  placeholder="Brief description of this phase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newPhase.startDate}
                    onChange={(e) => setNewPhase({...newPhase, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newPhase.endDate}
                    onChange={(e) => setNewPhase({...newPhase, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={newPhase.budget}
                    onChange={(e) => setNewPhase({...newPhase, budget: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetUsers">Target Users</Label>
                  <Input
                    id="targetUsers"
                    type="number"
                    value={newPhase.targetUsers}
                    onChange={(e) => setNewPhase({...newPhase, targetUsers: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newPhase.priority} onValueChange={(value) => setNewPhase({...newPhase, priority: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="riskLevel">Risk Level</Label>
                  <Select value={newPhase.riskLevel} onValueChange={(value) => setNewPhase({...newPhase, riskLevel: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddPhase}>Add Phase</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Phase Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Phases</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{phases.length}</div>
            <p className="text-xs text-muted-foreground">
              {phases.filter(p => p.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${phases.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              ${phases.reduce((sum, p) => sum + p.spentBudget, 0).toLocaleString()} spent
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {phases.reduce((sum, p) => sum + p.targetUsers, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {phases.reduce((sum, p) => sum + p.currentUsers, 0).toLocaleString()} current
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Launch Phases List */}
      <div className="space-y-4">
        {phases.map((phase) => (
          <Card key={phase.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{phase.name}</CardTitle>
                  <CardDescription>{phase.description}</CardDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={statusColors[phase.status]}>
                      {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                    </Badge>
                    <Badge className={priorityColors[phase.priority]}>
                      {phase.priority.charAt(0).toUpperCase() + phase.priority.slice(1)} Priority
                    </Badge>
                    <Badge className={riskColors[phase.riskLevel]}>
                      {phase.riskLevel.charAt(0).toUpperCase() + phase.riskLevel.slice(1)} Risk
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPhase(phase)
                      setIsEditDialogOpen(true)
                    }}
                  >
                    Edit
                  </Button>
                  <Select value={phase.status} onValueChange={(value) => handleStatusChange(phase.id, value as any)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="future">Future</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Timeline Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Timeline Progress</span>
                  <span>{Math.round(getPhaseProgress(phase))}%</span>
                </div>
                <Progress value={getPhaseProgress(phase)} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(phase.startDate).toLocaleDateString()}</span>
                  <span>{new Date(phase.endDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium">${phase.budget.toLocaleString()}</p>
                  <Progress value={getBudgetProgress(phase)} className="h-1" />
                  <p className="text-xs text-muted-foreground">
                    ${phase.spentBudget.toLocaleString()} spent
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Users</p>
                  <p className="font-medium">{phase.currentUsers.toLocaleString()}</p>
                  <Progress value={getUserProgress(phase)} className="h-1" />
                  <p className="text-xs text-muted-foreground">
                    {phase.targetUsers.toLocaleString()} target
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="font-medium">{phase.teamSize}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Features</p>
                  <p className="font-medium">{getPhaseFeatures(phase.id).length}</p>
                </div>
              </div>

              {/* Features List */}
              {getPhaseFeatures(phase.id).length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Features in this phase:</p>
                  <div className="flex flex-wrap gap-2">
                    {getPhaseFeatures(phase.id).map((feature) => (
                      <Badge key={feature.id} variant="outline">
                        {feature.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Risk Assessment */}
              {phase.riskFactors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm font-medium">Risk Factors</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.riskFactors.map((risk, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {risk}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Metrics */}
              {phase.successMetrics.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium">Success Metrics</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {phase.successMetrics.map((metric, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Phase Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Edit Launch Phase: {selectedPhase?.name}</DialogTitle>
            <DialogDescription>
              Update phase details, timeline, and risk assessment
            </DialogDescription>
          </DialogHeader>
          {selectedPhase && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={selectedPhase.startDate}
                    onChange={(e) => setSelectedPhase({...selectedPhase, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={selectedPhase.endDate}
                    onChange={(e) => setSelectedPhase({...selectedPhase, endDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Budget ($)</Label>
                  <Input
                    type="number"
                    value={selectedPhase.budget}
                    onChange={(e) => setSelectedPhase({...selectedPhase, budget: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Spent Budget ($)</Label>
                  <Input
                    type="number"
                    value={selectedPhase.spentBudget}
                    onChange={(e) => setSelectedPhase({...selectedPhase, spentBudget: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Target Users</Label>
                  <Input
                    type="number"
                    value={selectedPhase.targetUsers}
                    onChange={(e) => setSelectedPhase({...selectedPhase, targetUsers: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Current Users</Label>
                  <Input
                    type="number"
                    value={selectedPhase.currentUsers}
                    onChange={(e) => setSelectedPhase({...selectedPhase, currentUsers: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Team Size</Label>
                  <Input
                    type="number"
                    value={selectedPhase.teamSize}
                    onChange={(e) => setSelectedPhase({...selectedPhase, teamSize: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={selectedPhase.priority} onValueChange={(value) => setSelectedPhase({...selectedPhase, priority: value as any})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input
                  value={selectedPhase.notes}
                  onChange={(e) => setSelectedPhase({...selectedPhase, notes: e.target.value})}
                  placeholder="Add notes about this phase..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              if (selectedPhase) {
                handleUpdatePhase(selectedPhase.id, selectedPhase)
                setIsEditDialogOpen(false)
              }
            }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
