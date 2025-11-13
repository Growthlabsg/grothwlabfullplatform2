"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { 
  Crown, 
  Settings, 
  Users, 
  Rocket, 
  BarChart3, 
  Shield, 
  Database, 
  Globe,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Play,
  Pause,
  Zap
} from "lucide-react"
import type { PlatformFeature, Employee, LaunchPhase } from "@/types/auth"

export function FounderDashboard() {
  const { user, getPlatformFeatures, toggleFeature, updateFeaturePhase, getEmployees, updateEmployeePermissions, createEmployee } = useAuth()
  const { toast } = useToast()
  
  const [features, setFeatures] = useState<PlatformFeature[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [activeTab, setActiveTab] = useState("overview")
  
  // Form states
  const [newFeature, setNewFeature] = useState<Partial<PlatformFeature>>({})
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({})
  const [editingFeature, setEditingFeature] = useState<string | null>(null)
  const [editingEmployee, setEditingEmployee] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  
  }, [])

  const loadData = async () => {
    try {
      const [featuresData, employeesData] = await Promise.all([
        getPlatformFeatures(),
        getEmployees()
      ])
      setFeatures(featuresData)
      setEmployees(employeesData)
    } catch (error) {
      toast({
        title: "Error loading data",
        description: "Failed to load platform data",
        variant: "destructive"
      })
    }
  }

  const handleToggleFeature = async (featureId: string, enabled: boolean) => {
    try {
      await toggleFeature(featureId, enabled)
      setFeatures(prev => prev.map(f => 
        f.id === featureId ? { ...f, isEnabled: enabled } : f
      ))
      toast({
        title: "Feature updated",
        description: `Feature ${enabled ? 'enabled' : 'disabled'} successfully`
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature",
        variant: "destructive"
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
        title: "Phase updated",
        description: "Feature phase updated successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature phase",
        variant: "destructive"
      })
    }
  }

  const handleCreateFeature = async () => {
    try {
      // This would typically create in your backend
      const feature: PlatformFeature = {
        id: `feature_${Date.now()}`,
        name: newFeature.name || "New Feature",
        description: newFeature.description || "",
        category: newFeature.category || "core",
        status: "development",
        phase: "phase1",
        targetAudience: [],
        dependencies: [],
        metrics: [],
        isEnabled: false,
        isPublic: false,
        requiresAuth: true,
        permissions: [],
        config: {}
      }
      
      setFeatures(prev => [...prev, feature])
      setNewFeature({})
      toast({
        title: "Feature created",
        description: "New feature created successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create feature",
        variant: "destructive"
      })
    }
  }

  const handleCreateEmployee = async () => {
    try {
      const employee = await createEmployee({
        email: newEmployee.email || "",
        displayName: newEmployee.displayName || "",
        role: newEmployee.role || "employee",
        department: newEmployee.department || "",
        position: newEmployee.position || "",
        hireDate: new Date().toISOString(),
        permissions: [],
        isActive: true,
        performance: {
          rating: 0,
          lastReview: new Date().toISOString(),
          notes: "New employee"
        },
        access: {
          canManageUsers: false,
          canManageContent: false,
          canViewAnalytics: false,
          canManageFeatures: false,
          canManageEmployees: false
        }
      })
      
      setEmployees(prev => [...prev, employee])
      setNewEmployee({})
      toast({
        title: "Employee created",
        description: "New employee created successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create employee",
        variant: "destructive"
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-green-100 text-green-800"
      case "beta": return "bg-blue-100 text-blue-800"
      case "testing": return "bg-yellow-100 text-yellow-800"
      case "development": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "phase1": return "bg-purple-100 text-purple-800"
      case "phase2": return "bg-blue-100 text-blue-800"
      case "phase3": return "bg-green-100 text-green-800"
      case "phase4": return "bg-yellow-100 text-yellow-800"
      case "phase5": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown className="h-8 w-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Founder Dashboard</h1>
              <p className="text-gray-600">Complete control over GrowthLab platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Shield className="h-4 w-4 mr-2" />
              Founder Access
            </Badge>
            <Badge variant="outline" className="text-sm">
              <Zap className="h-4 w-4 mr-2" />
              Platform Control
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Features</CardTitle>
              <Rocket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{features.length}</div>
              <p className="text-xs text-muted-foreground">
                {features.filter(f => f.isEnabled).length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">
                {employees.filter(e => e.isActive).length} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Live Features</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {features.filter(f => f.status === "live").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {features.filter(f => f.status === "beta").length} in beta
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98%</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="phases">Launch Phases</TabsTrigger>
            <TabsTrigger value="settings">Platform Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform changes and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">AI Co-founder Matching enabled</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New employee Sarah Johnson added</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">GrowthStarter moved to Phase 2</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common founder tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Feature
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Hire Employee
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Rocket className="h-4 w-4 mr-2" />
                      Launch Phase
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      Platform Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Platform Features</CardTitle>
                    <CardDescription>Manage all platform features and their launch phases</CardDescription>
                  </div>
                  <Button onClick={() => setActiveTab("features")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {features.map((feature) => (
                    <div key={feature.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{feature.name}</h3>
                          <Badge className={getStatusColor(feature.status)}>
                            {feature.status}
                          </Badge>
                          <Badge className={getPhaseColor(feature.phase)}>
                            {feature.phase}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={feature.isEnabled}
                            onCheckedChange={(enabled) => handleToggleFeature(feature.id, enabled)}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingFeature(feature.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span>Category: {feature.category}</span>
                        <span>Target: {feature.targetAudience.join(", ")}</span>
                        <span>Auth: {feature.requiresAuth ? "Required" : "Optional"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Management</CardTitle>
                    <CardDescription>Manage employees, permissions, and access levels</CardDescription>
                  </div>
                  <Button onClick={() => setActiveTab("employees")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            {employee.displayName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{employee.displayName}</h3>
                            <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={employee.isActive ? "default" : "secondary"}>
                            {employee.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingEmployee(employee.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Role:</span> {employee.role}
                        </div>
                        <div>
                          <span className="font-medium">Performance:</span> {employee.performance.rating}/5
                        </div>
                        <div>
                          <span className="font-medium">Hired:</span> {new Date(employee.hireDate).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Permissions:</span> {employee.permissions.length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Launch Phases Tab */}
          <TabsContent value="phases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Launch Phases</CardTitle>
                <CardDescription>Control feature rollout and platform evolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Phase 1: Foundation</CardTitle>
                        <CardDescription>Core platform features</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Social Feed</span>
                            <Badge className="bg-green-100 text-green-800">Live</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">User Profiles</span>
                            <Badge className="bg-green-100 text-green-800">Live</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Basic Networking</span>
                            <Badge className="bg-green-100 text-green-800">Live</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Phase 2: Growth</CardTitle>
                        <CardDescription>Monetization & expansion</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">GrowthStarter</span>
                            <Badge className="bg-blue-100 text-blue-800">Beta</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Premium Features</span>
                            <Badge className="bg-yellow-100 text-yellow-800">Testing</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Analytics Dashboard</span>
                            <Badge className="bg-gray-100 text-gray-800">Development</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Phase 3: Innovation</CardTitle>
                        <CardDescription>AI & advanced features</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">AI Matching</span>
                            <Badge className="bg-gray-100 text-gray-800">Development</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Predictive Analytics</span>
                            <Badge className="bg-gray-100 text-gray-800">Planning</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Advanced AI</span>
                            <Badge className="bg-gray-100 text-gray-800">Planning</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platform Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Configuration</CardTitle>
                <CardDescription>Global platform settings and configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Security Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <Switch id="two-factor" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                          <Input id="session-timeout" type="number" defaultValue={24} className="w-20" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
                          <Input id="max-login-attempts" type="number" defaultValue={5} className="w-20" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Performance Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="cache-enabled">Enable Caching</Label>
                          <Switch id="cache-enabled" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="cdn-enabled">CDN Enabled</Label>
                          <Switch id="cdn-enabled" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="rate-limit">Rate Limiting</Label>
                          <Switch id="rate-limit" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Business Rules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="max-users">Max Users</Label>
                        <Input id="max-users" type="number" defaultValue={100000} />
                      </div>
                      <div>
                        <Label htmlFor="max-startups">Max Startups</Label>
                        <Input id="max-startups" type="number" defaultValue={10000} />
                      </div>
                      <div>
                        <Label htmlFor="max-investors">Max Investors</Label>
                        <Input id="max-investors" type="number" defaultValue={5000} />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button>Save Settings</Button>
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button variant="outline">Export Configuration</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
