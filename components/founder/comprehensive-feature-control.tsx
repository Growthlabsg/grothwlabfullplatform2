"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit, DollarSign, Users, Settings, CheckCircle, AlertTriangle, Rocket, Filter, Download, Upload, RefreshCw, Search, Save, X, CheckSquare, Square, Lightbulb, Activity, TrendingUp, Target, BarChart3, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ComprehensiveFeatureControl() {
  const [activeTab, setActiveTab] = useState("features")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [editingItem, setEditingItem] = useState<string | null>(null)
  
  const [features, setFeatures] = useState([
    {
      id: "1",
      name: "User Management",
      description: "Control all user accounts and permissions",
      status: "active",
      isVisible: true,
      isEnabled: true,
      pricing: { free: true, basic: 0, premium: 10, enterprise: 50 }
    }
  ])

  const [contents, setContents] = useState([
    {
      id: "1",
      title: "Startup Guide",
      type: "article",
      status: "published",
      visibility: "public",
      pricing: { free: true, basic: 0, premium: 5, enterprise: 25 }
    }
  ])

  const [resources, setResources] = useState([
    {
      id: "1",
      name: "API Documentation",
      type: "documentation",
      status: "active",
      accessLevel: "Public",
      pricing: { free: true, basic: 0, premium: 10, enterprise: 50 }
    }
  ])

  const [monetization, setMonetization] = useState([
    {
      id: "1",
      name: "Subscription Plan",
      description: "Basic monthly subscription",
      status: "active",
      type: "subscription",
      pricing: { free: true, basic: 0, premium: 10, enterprise: 50 }
    }
  ])

  const [integrations, setIntegrations] = useState([
    {
      id: "1",
      name: "Stripe Payment",
      type: "payment",
      provider: "Stripe",
      description: "Payment processing integration",
      status: "active",
      apiKey: "sk_test_...",
      webhookUrl: "https://yourdomain.com/webhooks/stripe"
    }
  ])

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      status: "active",
      permissions: ["read", "write", "delete", "admin"],
      lastLogin: "2024-01-15T10:30:00Z",
      subscription: "premium"
    }
  ])

  const [permissions, setPermissions] = useState([
    { id: "read", name: "Read Access", description: "Can view platform data" },
    { id: "write", name: "Write Access", description: "Can modify platform data" },
    { id: "delete", name: "Delete Access", description: "Can remove platform data" },
    { id: "admin", name: "Admin Access", description: "Full platform control" },
    { id: "billing", name: "Billing Access", description: "Can manage billing and payments" },
    { id: "analytics", name: "Analytics Access", description: "Can view platform analytics" }
  ])

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    sessionTimeout: 3600,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPasswords: true,
    apiRateLimit: 1000,
    webhookVerification: true,
    auditLogging: true
  })

  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API Key",
      key: "pk_live_...",
      permissions: ["read", "write"],
      status: "active",
      lastUsed: "2024-01-15T10:30:00Z",
      rateLimit: 1000
    }
  ])

  const addFeature = () => {
    const newFeature = {
      id: Date.now().toString(),
      name: "New Feature",
      description: "Description for new feature",
      status: "development",
      isVisible: true,
      isEnabled: false,
      pricing: { free: true, basic: 0, premium: 10, enterprise: 50 }
    }
    setFeatures([...features, newFeature])
  }

  const removeFeature = (id: string) => {
    setFeatures(features.filter(f => f.id !== id))
  }

  const addContent = () => {
    const newContent = {
      id: Date.now().toString(),
      title: "New Content",
      type: "article",
      status: "draft",
      visibility: "public",
      pricing: { free: true, basic: 0, premium: 5, enterprise: 25 }
    }
    setContents([...contents, newContent])
  }

  const removeContent = (id: string) => {
    setContents(contents.filter(c => c.id !== id))
  }

  const addResource = () => {
    const newResource = {
      id: Date.now().toString(),
      name: "New Resource",
      type: "documentation",
      status: "inactive",
      accessLevel: "Private",
      pricing: { free: true, basic: 0, premium: 10, enterprise: 50 }
    }
    setResources([...resources, newResource])
  }

  const removeResource = (id: string) => {
    setResources(resources.filter(r => r.id !== id))
  }

  const addMonetization = () => {
    const newMonetization = {
      id: Date.now().toString(),
      name: "New Revenue Stream",
      description: "Description for new revenue stream",
      status: "inactive",
      type: "subscription",
      pricing: { free: true, basic: 0, premium: 10, enterprise: 50 }
    }
    setMonetization([...monetization, newMonetization])
  }

  const removeMonetization = (id: string) => {
    setMonetization(monetization.filter(m => m.id !== id))
  }

  const addIntegration = () => {
    const newIntegration = {
      id: Date.now().toString(),
      name: "New Integration",
      type: "custom",
      provider: "Custom",
      description: "Description for new integration",
      status: "inactive",
      apiKey: "",
      webhookUrl: ""
    }
    setIntegrations([...integrations, newIntegration])
  }

  const removeIntegration = (id: string) => {
    setIntegrations(integrations.filter(i => i.id !== id))
  }

  const addUser = () => {
    const newUser = {
      id: Date.now().toString(),
      name: "New User",
      email: "user@example.com",
      role: "user",
      status: "inactive",
      permissions: ["read"],
      lastLogin: new Date().toISOString(),
      subscription: "free"
    }
    setUsers([...users, newUser])
  }

  const removeUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const updateUser = (id: string, updates: any) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...updates } : u))
  }

  const toggleUserPermission = (userId: string, permission: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        const newPermissions = u.permissions.includes(permission)
          ? u.permissions.filter(p => p !== permission)
          : [...u.permissions, permission]
        return { ...u, permissions: newPermissions }
      }
      return u
    }))
  }

  const addApiKey = () => {
    const newApiKey = {
      id: Date.now().toString(),
      name: "New API Key",
      key: `pk_${Math.random().toString(36).substr(2, 9)}_...`,
      permissions: ["read"],
      status: "inactive",
      lastUsed: new Date().toISOString(),
      rateLimit: 100
    }
    setApiKeys([...apiKeys, newApiKey])
  }

  const removeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id))
  }

  const updateSecuritySetting = (setting: string, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [setting]: value }))
  }

  const regenerateApiKey = (id: string) => {
    setApiKeys(apiKeys.map(k => 
      k.id === id ? { ...k, key: `pk_${Math.random().toString(36).substr(2, 9)}_...` } : k
    ))
  }

  // Bulk Operations
  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const selectAllItems = () => {
    const currentItems = getCurrentTabItems()
    setSelectedItems(currentItems.map(item => item.id))
  }

  const deselectAllItems = () => {
    setSelectedItems([])
  }

  const bulkDelete = () => {
    const currentItems = getCurrentTabItems()
    const itemsToDelete = currentItems.filter(item => selectedItems.includes(item.id))
    
    if (activeTab === "features") {
      setFeatures(features.filter(f => !selectedItems.includes(f.id)))
    } else if (activeTab === "content") {
      setContents(contents.filter(c => !selectedItems.includes(c.id)))
    } else if (activeTab === "resources") {
      setResources(resources.filter(r => !selectedItems.includes(r.id)))
    } else if (activeTab === "monetization") {
      setMonetization(monetization.filter(m => !selectedItems.includes(m.id)))
    } else if (activeTab === "integrations") {
      setIntegrations(integrations.filter(i => !selectedItems.includes(i.id)))
    }
    
    setSelectedItems([])
  }

  const bulkEnable = () => {
    if (activeTab === "features") {
      setFeatures(features.map(f => 
        selectedItems.includes(f.id) ? { ...f, isEnabled: true } : f
      ))
    }
  }

  const bulkDisable = () => {
    if (activeTab === "features") {
      setFeatures(features.map(f => 
        selectedItems.includes(f.id) ? { ...f, isEnabled: false } : f
      ))
    }
  }

  const getCurrentTabItems = () => {
    switch (activeTab) {
      case "features": return features
      case "content": return contents
      case "resources": return resources
      case "monetization": return monetization
      case "integrations": return integrations
      default: return []
    }
  }

  // Enhanced Editing
  const startEditing = (id: string) => {
    setEditingItem(id)
  }

  const stopEditing = () => {
    setEditingItem(null)
  }

  const updateFeature = (id: string, updates: any) => {
    setFeatures(features.map(f => f.id === id ? { ...f, ...updates } : f))
    stopEditing()
  }

  const updateContent = (id: string, updates: any) => {
    setContents(contents.map(c => c.id === id ? { ...c, ...updates } : c))
    stopEditing()
  }

  const updateResource = (id: string, updates: any) => {
    setResources(resources.map(r => r.id === id ? { ...r, ...updates } : r))
    stopEditing()
  }

  const updateMonetization = (id: string, updates: any) => {
    setMonetization(monetization.map(m => m.id === id ? { ...m, ...updates } : m))
    stopEditing()
  }

  const updateIntegration = (id: string, updates: any) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, ...updates } : i))
    stopEditing()
  }

  // Export/Import Functionality
  const exportData = () => {
    const data = {
      features,
      contents,
      resources,
      monetization,
      integrations,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `platform-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.features) setFeatures(data.features)
        if (data.contents) setContents(data.contents)
        if (data.resources) setResources(data.resources)
        if (data.monetization) setMonetization(data.monetization)
        if (data.integrations) setIntegrations(data.integrations)
      } catch (error) {
        console.error('Error importing data:', error)
        alert('Error importing data. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  // Enhanced Search and Filtering
  const filteredFeatures = features.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredContents = contents.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredResources = resources.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredMonetization = monetization.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredIntegrations = integrations.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.provider.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Refresh functionality
  const refreshData = () => {
    // In a real app, this would fetch fresh data from the server
    // For now, we'll just reset the search and show a success message
    setSearchTerm("")
    setSelectedItems([])
    setEditingItem(null)
    // You could add a toast notification here
    console.log("Data refreshed successfully")
  }

  // Enhanced pricing controls
  const updatePricing = (itemId: string, itemType: string, pricing: any) => {
    switch (itemType) {
      case 'feature':
        setFeatures(features.map(f => f.id === itemId ? { ...f, pricing } : f))
        break
      case 'content':
        setContents(contents.map(c => c.id === itemId ? { ...c, pricing } : c))
        break
      case 'resource':
        setResources(resources.map(r => r.id === itemId ? { ...r, pricing } : r))
        break
      case 'monetization':
        setMonetization(monetization.map(m => m.id === itemId ? { ...m, pricing } : m))
        break
    }
  }

  // Advanced Analytics and Metrics
  const getPlatformMetrics = () => {
    const totalRevenue = monetization.reduce((sum, item) => {
      if (item.status === 'active') {
        return sum + (item.pricing?.premium || 0) + (item.pricing?.enterprise || 0)
      }
      return sum
    }, 0)

    const activeFeatures = features.filter(f => f.isEnabled && f.status === 'active').length
    const publishedContent = contents.filter(c => c.status === 'published').length
    const activeUsers = users.filter(u => u.status === 'active').length
    const premiumUsers = users.filter(u => u.subscription === 'premium' || u.subscription === 'enterprise').length

    return {
      totalRevenue,
      activeFeatures,
      publishedContent,
      activeUsers,
      premiumUsers,
      conversionRate: activeUsers > 0 ? (premiumUsers / activeUsers) * 100 : 0
    }
  }

  // Advanced Customization Options
  const [customizationSettings, setCustomizationSettings] = useState({
    theme: 'default',
    layout: 'standard',
    dashboardWidgets: ['metrics', 'charts', 'activity', 'quickActions'],
    notifications: {
      email: true,
      push: true,
      slack: false,
      webhook: false
    },
    automation: {
      autoBackup: true,
      autoScaling: false,
      autoMonitoring: true,
      autoUpdates: false
    }
  })

  const updateCustomizationSetting = (category: string, setting: string, value: any) => {
    setCustomizationSettings(prev => {
      const categoryData = prev[category as keyof typeof prev] as Record<string, any>
      return {
        ...prev,
        [category]: {
          ...categoryData,
          [setting]: value
        }
      }
    })
  }

  // Help System State
  const [showHelp, setShowHelp] = useState(false)
  const [helpSection, setHelpSection] = useState('overview')

  // Advanced Search and AI Suggestions
  const [aiSuggestions, setAiSuggestions] = useState([
    "Consider adding a referral program to increase user acquisition",
    "Your premium features have high engagement - consider raising prices",
    "User feedback suggests adding more video content",
    "API usage is increasing - consider implementing rate limiting tiers"
  ])

  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    if (term && !searchHistory.includes(term)) {
      setSearchHistory([term, ...searchHistory.slice(0, 9)])
    }
  }

  // Advanced Export Options
  const exportDataAdvanced = (format: 'json' | 'csv' | 'pdf') => {
    const data = {
      features,
      contents,
      resources,
      monetization,
      integrations,
      users,
      securitySettings,
      apiKeys,
      customizationSettings,
      exportDate: new Date().toISOString(),
      exportFormat: format
    }
    
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `platform-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } else if (format === 'csv') {
      // Convert to CSV format
      const csvContent = convertToCSV(data)
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `platform-data-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const convertToCSV = (data: any) => {
    // Simple CSV conversion - in a real app, you'd use a proper CSV library
    const headers = ['Type', 'Name', 'Status', 'Created Date']
    const rows: string[][] = []
    
    data.features.forEach((f: any) => rows.push(['Feature', f.name, f.status, new Date().toISOString()]))
    data.contents.forEach((c: any) => rows.push(['Content', c.title, c.status, new Date().toISOString()]))
    
    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  // Platform Health Scoring
  const getPlatformHealthScore = () => {
    const metrics = getPlatformMetrics()
    let score = 100
    
    if (metrics.activeFeatures < 3) score -= 20
    if (metrics.publishedContent < 2) score -= 15
    if (metrics.activeUsers < 5) score -= 25
    if (metrics.conversionRate < 10) score -= 20
    
    return Math.max(0, score)
  }

  // Advanced Monitoring
  const [systemAlerts, setSystemAlerts] = useState([
    { id: '1', type: 'warning', message: 'Database connection pool at 80% capacity', timestamp: new Date().toISOString() },
    { id: '2', type: 'info', message: 'New user registration rate increased by 25%', timestamp: new Date().toISOString() },
    { id: '3', type: 'success', message: 'All payment integrations are functioning normally', timestamp: new Date().toISOString() }
  ])

  const addSystemAlert = (type: string, message: string) => {
    const newAlert = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toISOString()
    }
    setSystemAlerts([newAlert, ...systemAlerts])
  }

  const removeSystemAlert = (id: string) => {
    setSystemAlerts(systemAlerts.filter(alert => alert.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Notification System */}
      <div className="space-y-3 mb-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>System Notice</AlertTitle>
          <AlertDescription>
            New security updates available. Please review and apply when convenient.
          </AlertDescription>
        </Alert>
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Platform Status</AlertTitle>
          <AlertDescription>
            All systems operational. Platform running at 99.9% uptime.
          </AlertDescription>
        </Alert>
      </div>

      {/* Comprehensive Platform Overview Dashboard */}
      <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-800 text-2xl">
            <Rocket className="h-6 w-6" />
            Platform Control Center - Complete Overview
          </CardTitle>
          <CardDescription className="text-indigo-700 text-lg">
            Your comprehensive command center for controlling every aspect of the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Platform Health Score */}
            <div className="p-4 bg-white rounded-lg border border-indigo-200 text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {getPlatformHealthScore()}/100
              </div>
              <div className="text-sm text-indigo-700 mb-2">Platform Health</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${getPlatformHealthScore()}%` }}
                ></div>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="p-4 bg-white rounded-lg border border-indigo-200 text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">
                ${getPlatformMetrics().totalRevenue.toLocaleString()}
              </div>
              <div className="text-sm text-indigo-700">Monthly Revenue</div>
              <div className="text-xs text-green-600 mt-1">+12% from last month</div>
            </div>

            {/* Active Users */}
            <div className="p-4 bg-white rounded-lg border border-indigo-200 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {getPlatformMetrics().activeUsers}
              </div>
              <div className="text-sm text-indigo-700">Active Users</div>
              <div className="text-xs text-blue-600 mt-1">+8% from last week</div>
            </div>

            {/* Feature Count */}
            <div className="p-4 bg-white rounded-lg border border-indigo-200 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {getPlatformMetrics().activeFeatures}
              </div>
              <div className="text-sm text-indigo-700">Active Features</div>
              <div className="text-xs text-purple-600 mt-1">All systems operational</div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Content Management</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Content
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Existing Content
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Content Analytics
                </Button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">Revenue Control</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Set Pricing
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Revenue Analytics
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <Users className="h-4 w-4 mr-2" />
                  User Subscriptions
                </Button>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-3">System Control</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <Activity className="h-4 w-4 mr-2" />
                  Monitor Health
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start text-indigo-600">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Platform Status Summary */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-indigo-200">
            <h4 className="font-semibold text-indigo-800 mb-3">Platform Status Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-indigo-700">Features: {getPlatformMetrics().activeFeatures} Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-indigo-700">Content: {getPlatformMetrics().publishedContent} Published</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-indigo-700">Users: {getPlatformMetrics().activeUsers} Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-indigo-700">Revenue: ${getPlatformMetrics().totalRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Controls */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search features, content, resources, users..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={exportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="import-file"
                  />
                  <Button variant="outline" size="sm" asChild>
                    <label htmlFor="import-file">
                      <Upload className="h-4 w-4 mr-2" />
                      Import
                    </label>
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={refreshData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                onClick={() => setShowHelp(!showHelp)}
              >
                <Users className="h-4 w-4 mr-2" />
                Help
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comprehensive Help System */}
      {showHelp && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Users className="h-5 w-5" />
              Platform Control Help & Documentation
            </CardTitle>
            <CardDescription className="text-blue-700">
              Complete guide to controlling every aspect of your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={helpSection} onValueChange={setHelpSection}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-800">Quick Start Guide</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <p>• <strong>Features Tab:</strong> Control all platform features, pricing, and visibility</p>
                      <p>• <strong>Content Tab:</strong> Manage articles, videos, courses, and templates</p>
                      <p>• <strong>Resources Tab:</strong> Control access to documentation and tools</p>
                      <p>• <strong>Monetization Tab:</strong> Set up revenue streams and pricing tiers</p>
                      <p>• <strong>Integrations Tab:</strong> Manage external service connections</p>
                      <p>• <strong>Users Tab:</strong> Control user accounts and permissions</p>
                      <p>• <strong>Security Tab:</strong> Configure authentication and API access</p>
                      <p>• <strong>Analytics Tab:</strong> View platform performance metrics</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-800">Key Capabilities</h4>
                    <div className="space-y-2 text-sm text-blue-700">
                      <p>• <strong>Bulk Operations:</strong> Select multiple items for mass actions</p>
                      <p>• <strong>Inline Editing:</strong> Click edit to modify items directly</p>
                      <p>• <strong>Advanced Search:</strong> Find items across all categories</p>
                      <p>• <strong>Data Export:</strong> Download platform data in multiple formats</p>
                      <p>• <strong>Real-time Monitoring:</strong> Track system health and performance</p>
                      <p>• <strong>Customization:</strong> Personalize your dashboard and settings</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-800">Feature Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-sm text-blue-700">
                      <p><strong>Adding Features:</strong> Click "Add Feature" to create new platform capabilities</p>
                      <p><strong>Pricing Control:</strong> Set different prices for free, basic, premium, and enterprise tiers</p>
                      <p><strong>Status Management:</strong> Control feature lifecycle (development, active, inactive)</p>
                      <p><strong>Visibility Control:</strong> Show/hide features from different user groups</p>
                    </div>
                    <div className="space-y-2 text-sm text-blue-700">
                      <p><strong>Bulk Operations:</strong> Select multiple features for mass enable/disable</p>
                      <p><strong>Inline Editing:</strong> Click the edit button to modify feature details</p>
                      <p><strong>Search & Filter:</strong> Use the search bar to find specific features</p>
                      <p><strong>Export Data:</strong> Download feature data for analysis</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-800">Advanced Controls</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-sm text-blue-700">
                      <p><strong>API Management:</strong> Generate and manage API keys with specific permissions</p>
                      <p><strong>Security Settings:</strong> Configure 2FA, password policies, and rate limiting</p>
                      <p><strong>User Permissions:</strong> Granular control over user access levels</p>
                      <p><strong>System Monitoring:</strong> Real-time health checks and performance metrics</p>
                    </div>
                    <div className="space-y-2 text-sm text-blue-700">
                      <p><strong>Customization:</strong> Personalize themes, layouts, and dashboard widgets</p>
                      <p><strong>Automation:</strong> Set up automatic backups, scaling, and monitoring</p>
                      <p><strong>Integration Webhooks:</strong> Connect external services and automate workflows</p>
                      <p><strong>Advanced Analytics:</strong> Deep insights into platform usage and revenue</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="troubleshooting" className="space-y-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-800">Common Issues & Solutions</h4>
                  <div className="space-y-3 text-sm text-blue-700">
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">Feature not showing to users?</p>
                      <p>Check: Status is "active", isVisible is true, and user has proper access level</p>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">Payment integration not working?</p>
                      <p>Verify: API keys are valid, webhook URLs are correct, and integration status is "active"</p>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">User can't access premium features?</p>
                      <p>Check: User subscription level, feature pricing settings, and user permissions</p>
                    </div>
                    <div className="p-3 bg-white rounded border">
                      <p className="font-medium">System performance issues?</p>
                      <p>Monitor: System health dashboard, check for high resource usage, review recent changes</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Advanced Customization Panel */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Settings className="h-5 w-5" />
            Advanced Customization & Control
          </CardTitle>
          <CardDescription className="text-purple-700">
            Personalize every aspect of your platform control experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Theme & Layout Customization */}
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-800">Appearance & Layout</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-purple-700">Theme</label>
                  <Select value={customizationSettings.theme} onValueChange={(value) => updateCustomizationSetting('theme', 'theme', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="dark">Dark Mode</SelectItem>
                      <SelectItem value="light">Light Mode</SelectItem>
                      <SelectItem value="high-contrast">High Contrast</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-700">Layout</label>
                  <Select value={customizationSettings.layout} onValueChange={(value) => updateCustomizationSetting('layout', 'layout', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                      <SelectItem value="sidebar">Sidebar Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Dashboard Widgets */}
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-800">Dashboard Widgets</h4>
              <div className="space-y-2">
                {['metrics', 'charts', 'activity', 'quickActions'].map((widget) => (
                  <div key={widget} className="flex items-center space-x-2">
                    <Checkbox
                      checked={customizationSettings.dashboardWidgets.includes(widget)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateCustomizationSetting('dashboardWidgets', 'dashboardWidgets', [...customizationSettings.dashboardWidgets, widget])
                        } else {
                          updateCustomizationSetting('dashboardWidgets', 'dashboardWidgets', customizationSettings.dashboardWidgets.filter(w => w !== widget))
                        }
                      }}
                    />
                    <span className="text-sm text-purple-700 capitalize">{widget.replace(/([A-Z])/g, ' $1')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Automation Settings */}
            <div className="space-y-4">
              <h4 className="font-semibold text-purple-800">Automation & Monitoring</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Auto Backup</p>
                    <p className="text-xs text-purple-600">Automatic data backups</p>
                  </div>
                  <Switch 
                    checked={customizationSettings.automation.autoBackup}
                    onCheckedChange={(checked) => updateCustomizationSetting('automation', 'autoBackup', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Auto Scaling</p>
                    <p className="text-xs text-purple-600">Automatic resource scaling</p>
                  </div>
                  <Switch 
                    checked={customizationSettings.automation.autoScaling}
                    onCheckedChange={(checked) => updateCustomizationSetting('automation', 'autoScaling', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Auto Monitoring</p>
                    <p className="text-xs text-purple-600">Real-time system monitoring</p>
                  </div>
                  <Switch 
                    checked={customizationSettings.automation.autoMonitoring}
                    onCheckedChange={(checked) => updateCustomizationSetting('automation', 'autoMonitoring', checked)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI-Powered Insights & Suggestions */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Rocket className="h-5 w-5" />
            AI-Powered Platform Insights & Recommendations
          </CardTitle>
          <CardDescription className="text-green-700">
            Intelligent suggestions to optimize your platform performance and revenue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Suggestions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-green-800">Smart Recommendations</h4>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 bg-white rounded border border-green-200">
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-700">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Health Score */}
            <div className="space-y-4">
              <h4 className="font-semibold text-green-800">Platform Health Score</h4>
              <div className="text-center p-6 bg-white rounded border border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {getPlatformHealthScore()}/100
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${getPlatformHealthScore()}%` }}
                  ></div>
                </div>
                <p className="text-sm text-green-700">
                  {getPlatformHealthScore() >= 80 ? 'Excellent' : 
                   getPlatformHealthScore() >= 60 ? 'Good' : 
                   getPlatformHealthScore() >= 40 ? 'Fair' : 'Needs Attention'}
                </p>
              </div>
              
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>Active Features:</span>
                  <span className="font-medium">{getPlatformMetrics().activeFeatures}</span>
                </div>
                <div className="flex justify-between">
                  <span>Published Content:</span>
                  <span className="font-medium">{getPlatformMetrics().publishedContent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conversion Rate:</span>
                  <span className="font-medium">{getPlatformMetrics().conversionRate.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Search & History */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <Search className="h-5 w-5" />
            Enhanced Search & Analytics
          </CardTitle>
          <CardDescription className="text-orange-700">
            Advanced search capabilities with AI-powered suggestions and search history
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search History */}
            <div className="space-y-4">
              <h4 className="font-semibold text-orange-800">Recent Searches</h4>
              <div className="space-y-2">
                {searchHistory.length > 0 ? (
                  searchHistory.map((term, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm text-orange-700">{term}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSearch(term)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <Search className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-orange-600">No recent searches</p>
                )}
              </div>
            </div>

            {/* Advanced Export Options */}
            <div className="space-y-4">
              <h4 className="font-semibold text-orange-800">Advanced Data Export</h4>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => exportDataAdvanced('json')}
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as JSON (Complete Data)
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => exportDataAdvanced('csv')}
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV (Spreadsheet)
                </Button>
                <div className="text-xs text-orange-600">
                  <p>• JSON: Complete platform data with all settings</p>
                  <p>• CSV: Tabular data for analysis in Excel/Sheets</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-Time System Monitoring & Alerts Dashboard */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Activity className="h-5 w-5" />
            Real-Time System Monitoring & Performance Dashboard
          </CardTitle>
          <CardDescription className="text-red-700">
            Live monitoring of all system components, performance metrics, and instant alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* System Health Overview */}
            <div className="space-y-4">
              <h4 className="font-semibold text-red-800">System Health Overview</h4>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-700">Overall Status</span>
                    <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                      Healthy
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-medium">45ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CPU Usage:</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Usage:</span>
                      <span className="font-medium">67%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="space-y-4">
              <h4 className="font-semibold text-red-800">Active System Alerts</h4>
              <div className="space-y-2">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-white rounded border border-red-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant={alert.type === 'warning' ? 'destructive' : 
                                   alert.type === 'success' ? 'default' : 'secondary'}
                            className={alert.type === 'warning' ? 'bg-red-100 text-red-800 border-red-200' :
                                     alert.type === 'success' ? 'bg-green-100 text-green-800 border-green-200' :
                                     'bg-blue-100 text-blue-800 border-blue-200'}
                          >
                            {alert.type}
                          </Badge>
                          <span className="text-xs text-red-600">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-red-700">{alert.message}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSystemAlert(alert.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addSystemAlert('info', 'Manual alert created at ' + new Date().toLocaleTimeString())}
                  className="w-full text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Alert
                </Button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h4 className="font-semibold text-red-800">Performance Metrics</h4>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-medium text-red-700 mb-3">API Performance</h5>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="flex justify-between">
                      <span>Requests/min:</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Response:</span>
                      <span className="font-medium">45ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error Rate:</span>
                      <span className="font-medium">0.02%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="font-medium">99.98%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-medium text-red-700 mb-3">Database Performance</h5>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="flex justify-between">
                      <span>Query Time:</span>
                      <span className="font-medium">12ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Connections:</span>
                      <span className="font-medium">24/50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cache Hit:</span>
                      <span className="font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Optimization & Business Intelligence Dashboard */}
      <Card className="border-emerald-200 bg-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <TrendingUp className="h-5 w-5" />
            Revenue Optimization & Business Intelligence Dashboard
          </CardTitle>
          <CardDescription className="text-emerald-700">
            Advanced analytics, revenue forecasting, and business optimization tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Analytics */}
            <div className="space-y-4">
              <h4 className="font-semibold text-emerald-800">Revenue Analytics & Forecasting</h4>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-medium text-emerald-700 mb-3">Current Revenue Metrics</h5>
                  <div className="space-y-2 text-sm text-emerald-700">
                    <div className="flex justify-between">
                      <span>Monthly Recurring Revenue:</span>
                      <span className="font-medium">${getPlatformMetrics().totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium Subscriptions:</span>
                      <span className="font-medium">{getPlatformMetrics().premiumUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate:</span>
                      <span className="font-medium">{getPlatformMetrics().conversionRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Revenue Per User:</span>
                      <span className="font-medium">${getPlatformMetrics().activeUsers > 0 ? (getPlatformMetrics().totalRevenue / getPlatformMetrics().activeUsers).toFixed(2) : '0.00'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-medium text-emerald-700 mb-3">Revenue Optimization Suggestions</h5>
                  <div className="space-y-2 text-sm text-emerald-700">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p>Consider implementing tiered pricing for premium features</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p>Add referral program to increase user acquisition</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p>Bundle popular features into premium packages</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Intelligence */}
            <div className="space-y-4">
              <h4 className="font-semibold text-emerald-800">Business Intelligence & Insights</h4>
              <div className="space-y-3">
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-medium text-emerald-700 mb-3">User Behavior Analysis</h5>
                  <div className="space-y-2 text-sm text-emerald-700">
                    <div className="flex justify-between">
                      <span>Most Active Features:</span>
                      <span className="font-medium">Content Management</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Usage Time:</span>
                      <span className="font-medium">2:00 PM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Retention Rate:</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Feature Adoption Rate:</span>
                      <span className="font-medium">73%</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-white rounded border">
                  <h5 className="font-medium text-emerald-700 mb-3">Market Opportunities</h5>
                  <div className="space-y-2 text-sm text-emerald-700">
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p>High demand for video content creation tools</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p>Enterprise customers requesting advanced analytics</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <p>Mobile app integration highly requested</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Items */}
          <div className="mt-6 p-4 bg-white rounded border">
            <h5 className="font-medium text-emerald-700 mb-3">Recommended Actions</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                <TrendingUp className="h-4 w-4 mr-2" />
                Optimize Pricing
              </Button>
              <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                <Users className="h-4 w-4 mr-2" />
                Launch Referral Program
              </Button>
              <Button variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Revenue Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Platform Control Center
          </CardTitle>
          <CardDescription>
            Manage all aspects of your platform - features, content, resources, and monetization
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Bulk Operations Toolbar */}
          {selectedItems.length > 0 && (
            <Card className="mb-4 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-blue-800">
                      {selectedItems.length} item(s) selected
                    </span>
                    <Button variant="outline" size="sm" onClick={deselectAllItems}>
                      <X className="h-4 w-4 mr-2" />
                      Deselect All
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    {activeTab === "features" && (
                      <>
                        <Button variant="outline" size="sm" onClick={bulkEnable}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Enable All
                        </Button>
                        <Button variant="outline" size="sm" onClick={bulkDisable}>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Disable All
                        </Button>
                      </>
                    )}
                    <Button variant="destructive" size="sm" onClick={bulkDelete}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Selected
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="monetization">Monetization</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Platform Features</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={selectAllItems}>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Select All
                  </Button>
                  <Button onClick={addFeature} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {filteredFeatures.map((feature) => (
                  <Card key={feature.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Checkbox
                            checked={selectedItems.includes(feature.id)}
                            onCheckedChange={() => toggleItemSelection(feature.id)}
                          />
                          <div className="flex-1">
                            {editingItem === feature.id ? (
                              <div className="space-y-2">
                                <Input
                                  value={feature.name}
                                  onChange={(e) => updateFeature(feature.id, { name: e.target.value })}
                                  className="font-medium"
                                />
                                <Textarea
                                  value={feature.description}
                                  onChange={(e) => updateFeature(feature.id, { description: e.target.value })}
                                  className="text-sm"
                                  rows={2}
                                />
                                <div className="flex gap-2">
                                  <Select value={feature.status} onValueChange={(value) => updateFeature(feature.id, { status: value })}>
                                    <SelectTrigger className="w-32">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="development">Development</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Button size="sm" onClick={() => stopEditing()}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                {/* Pricing Controls */}
                                <div className="border-t pt-3 mt-3">
                                  <h5 className="text-sm font-medium mb-2">Pricing Control</h5>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        checked={feature.pricing.free}
                                        onCheckedChange={(checked) => updatePricing(feature.id, 'feature', { ...feature.pricing, free: checked })}
                                      />
                                      <span className="text-xs">Free</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Input
                                        type="number"
                                        placeholder="Basic"
                                        value={feature.pricing.basic}
                                        onChange={(e) => updatePricing(feature.id, 'feature', { ...feature.pricing, basic: parseFloat(e.target.value) || 0 })}
                                        className="w-20 text-xs"
                                      />
                                      <span className="text-xs">Basic</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Input
                                        type="number"
                                        placeholder="Premium"
                                        value={feature.pricing.premium}
                                        onChange={(e) => updatePricing(feature.id, 'feature', { ...feature.pricing, premium: parseFloat(e.target.value) || 0 })}
                                        className="w-20 text-xs"
                                      />
                                      <span className="text-xs">Premium</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Input
                                        type="number"
                                        placeholder="Enterprise"
                                        value={feature.pricing.enterprise}
                                        onChange={(e) => updatePricing(feature.id, 'feature', { ...feature.pricing, enterprise: parseFloat(e.target.value) || 0 })}
                                        className="w-20 text-xs"
                                      />
                                      <span className="text-xs">Enterprise</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <>
                                <h4 className="font-medium">{feature.name}</h4>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant={feature.status === 'active' ? 'default' : 'secondary'}>
                                    {feature.status}
                                  </Badge>
                                  <Badge variant={feature.isVisible ? 'default' : 'secondary'}>
                                    {feature.isVisible ? 'Visible' : 'Hidden'}
                                  </Badge>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={feature.isEnabled} />
                          {editingItem !== feature.id ? (
                            <Button variant="outline" size="sm" onClick={() => startEditing(feature.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          ) : null}
                          <Button variant="outline" size="sm" onClick={() => removeFeature(feature.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Platform Content</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={selectAllItems}>
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Select All
                  </Button>
                  <Button onClick={addContent} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Content
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {filteredContents.map((content) => (
                  <Card key={content.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Checkbox
                            checked={selectedItems.includes(content.id)}
                            onCheckedChange={() => toggleItemSelection(content.id)}
                          />
                          <div className="flex-1">
                            {editingItem === content.id ? (
                              <div className="space-y-2">
                                <Input
                                  value={content.title}
                                  onChange={(e) => updateContent(content.id, { title: e.target.value })}
                                  className="font-medium"
                                />
                                <Select value={content.type} onValueChange={(value) => updateContent(content.id, { type: value })}>
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="article">Article</SelectItem>
                                    <SelectItem value="video">Video</SelectItem>
                                    <SelectItem value="course">Course</SelectItem>
                                    <SelectItem value="template">Template</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Select value={content.status} onValueChange={(value) => updateContent(content.id, { status: value })}>
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => stopEditing()}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <h4 className="font-medium">{content.title}</h4>
                                <p className="text-sm text-gray-600">Type: {content.type}</p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                                    {content.status}
                                  </Badge>
                                  <Badge variant={content.visibility === 'public' ? 'default' : 'secondary'}>
                                    {content.visibility}
                                  </Badge>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {editingItem !== content.id ? (
                            <Button variant="outline" size="sm" onClick={() => startEditing(content.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          ) : null}
                          <Button variant="outline" size="sm" onClick={() => removeContent(content.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Platform Resources</h3>
                <Button onClick={addResource} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </div>
              <div className="space-y-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.name}</h4>
                          <p className="text-sm text-gray-600">Type: {resource.type}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={resource.status === 'active' ? 'default' : 'secondary'}>
                              {resource.status}
                            </Badge>
                            <Badge variant="outline">{resource.accessLevel}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeResource(resource.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="monetization" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Revenue Streams</h3>
                <Button onClick={addMonetization} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Revenue Stream
                </Button>
              </div>
              <div className="space-y-3">
                {filteredMonetization.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                              {item.status}
                            </Badge>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeMonetization(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">External Integrations</h3>
                <Button onClick={addIntegration} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </div>
              <div className="space-y-3">
                {filteredIntegrations.map((integration) => (
                  <Card key={integration.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={integration.status === 'active' ? 'default' : 'secondary'}>
                              {integration.status}
                            </Badge>
                            <Badge variant="outline">{integration.type}</Badge>
                            <Badge variant="outline">{integration.provider}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeIntegration(integration.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">User Management</h3>
                <Button onClick={addUser} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
              <div className="space-y-3">
                {filteredUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-gray-600">Email: {user.email}</p>
                          <p className="text-sm text-gray-600">Role: {user.role}</p>
                          <p className="text-sm text-gray-600">Status: {user.status}</p>
                          <p className="text-sm text-gray-600">Last Login: {new Date(user.lastLogin).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">Subscription: {user.subscription}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge variant="outline">{user.subscription}</Badge>
                          </div>
                          {/* Permissions Display */}
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Permissions:</p>
                            <div className="flex flex-wrap gap-1">
                              {user.permissions.map(permission => (
                                <Badge key={permission} variant="secondary" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => startEditing(user.id)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => removeUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Security Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Security Settings</CardTitle>
                    <CardDescription>Configure platform security and authentication</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-600">Require 2FA for all users</p>
                      </div>
                      <Switch 
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) => updateSecuritySetting('twoFactorAuth', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Strong Passwords</p>
                        <p className="text-xs text-gray-600">Enforce strong password requirements</p>
                      </div>
                      <Switch 
                        checked={securitySettings.requireStrongPasswords}
                        onCheckedChange={(checked) => updateSecuritySetting('requireStrongPasswords', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Audit Logging</p>
                        <p className="text-xs text-gray-600">Log all platform activities</p>
                      </div>
                      <Switch 
                        checked={securitySettings.auditLogging}
                        onCheckedChange={(checked) => updateSecuritySetting('auditLogging', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Webhook Verification</p>
                        <p className="text-xs text-gray-600">Verify webhook signatures</p>
                      </div>
                      <Switch 
                        checked={securitySettings.webhookVerification}
                        onCheckedChange={(checked) => updateSecuritySetting('webhookVerification', checked)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Session Timeout (seconds)</label>
                      <Input
                        type="number"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => updateSecuritySetting('sessionTimeout', parseInt(e.target.value) || 3600)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Login Attempts</label>
                      <Input
                        type="number"
                        value={securitySettings.maxLoginAttempts}
                        onChange={(e) => updateSecuritySetting('maxLoginAttempts', parseInt(e.target.value) || 5)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Rate Limit (requests/hour)</label>
                      <Input
                        type="number"
                        value={securitySettings.apiRateLimit}
                        onChange={(e) => updateSecuritySetting('apiRateLimit', parseInt(e.target.value) || 1000)}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* API Key Management */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">API Key Management</CardTitle>
                    <CardDescription>Manage API keys and access permissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">API Keys</h3>
                      <Button onClick={addApiKey} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Key
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {apiKeys.map((apiKey) => (
                        <Card key={apiKey.id} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{apiKey.name}</h4>
                                <p className="text-xs text-gray-600 font-mono">{apiKey.key}</p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                                    {apiKey.status}
                                  </Badge>
                                  <Badge variant="outline">Rate: {apiKey.rateLimit}/hr</Badge>
                                </div>
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500 mb-1">Permissions:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {apiKey.permissions.map(permission => (
                                      <Badge key={permission} variant="secondary" className="text-xs">
                                        {permission}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => regenerateApiKey(apiKey.id)}>
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => removeApiKey(apiKey.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Platform Overview */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Platform Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Features</span>
                        <span className="font-medium">{features.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Features</span>
                        <span className="font-medium text-green-600">
                          {features.filter(f => f.status === 'active').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Content Items</span>
                        <span className="font-medium">{contents.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Published Content</span>
                        <span className="font-medium text-green-600">
                          {contents.filter(c => c.status === 'published').length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Metrics */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Revenue Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Revenue Streams</span>
                        <span className="font-medium">{monetization.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Streams</span>
                        <span className="font-medium text-green-600">
                          {monetization.filter(m => m.status === 'active').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Integrations</span>
                        <span className="font-medium">{integrations.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Integrations</span>
                        <span className="font-medium text-green-600">
                          {integrations.filter(i => i.status === 'active').length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* System Health */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Overall Status</span>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Features Enabled</span>
                        <span className="font-medium text-green-600">
                          {features.filter(f => f.isEnabled).length}/{features.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Resources Available</span>
                        <span className="font-medium text-green-600">
                          {resources.filter(r => r.status === 'active').length}/{resources.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("features")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Features
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("content")}>
                      <Edit className="h-4 w-4 mr-2" />
                      Manage Content
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("monetization")}>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Revenue Settings
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("integrations")}>
                      <Rocket className="h-4 w-4 mr-2" />
                      Integrations
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* User Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">User Analytics & Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{users.length}</div>
                      <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {users.filter(u => u.status === 'active').length}
                      </div>
                      <div className="text-sm text-gray-600">Active Users</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {users.filter(u => u.role === 'admin').length}
                      </div>
                      <div className="text-sm text-gray-600">Admin Users</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {users.filter(u => u.subscription === 'premium').length}
                      </div>
                      <div className="text-sm text-gray-600">Premium Users</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">User Roles Distribution</h5>
                      <div className="space-y-2">
                        {['admin', 'user', 'moderator'].map(role => {
                          const count = users.filter(u => u.role === role).length
                          const percentage = users.length > 0 ? Math.round((count / users.length) * 100) : 0
                          return (
                            <div key={role} className="flex justify-between items-center">
                              <span className="text-sm capitalize">{role}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">{count}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2">Subscription Distribution</h5>
                      <div className="space-y-2">
                        {['free', 'basic', 'premium', 'enterprise'].map(sub => {
                          const count = users.filter(u => u.subscription === sub).length
                          const percentage = users.length > 0 ? Math.round((count / users.length) * 100) : 0
                          return (
                            <div key={sub} className="flex justify-between items-center">
                              <span className="text-sm capitalize">{sub}</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-600 h-2 rounded-full" 
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">{count}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Health Dashboard */}
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">System Health & Performance</CardTitle>
                  <CardDescription>Real-time monitoring of platform performance and health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">45ms</div>
                      <div className="text-sm text-gray-600">Avg Response</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600">1.2K</div>
                      <div className="text-sm text-gray-600">Requests/min</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">2.1GB</div>
                      <div className="text-sm text-gray-600">Memory Usage</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* System Status */}
                    <div>
                      <h5 className="text-sm font-medium mb-3">System Components Status</h5>
                      <div className="space-y-2">
                        {[
                          { name: 'Database', status: 'healthy', color: 'green' },
                          { name: 'API Gateway', status: 'healthy', color: 'green' },
                          { name: 'Payment Processor', status: 'healthy', color: 'green' },
                          { name: 'File Storage', status: 'warning', color: 'yellow' },
                          { name: 'Email Service', status: 'healthy', color: 'green' }
                        ].map((component) => (
                          <div key={component.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{component.name}</span>
                            <Badge 
                              variant={component.status === 'healthy' ? 'default' : 'secondary'}
                              className={`bg-${component.color}-100 text-${component.color}-800`}
                            >
                              {component.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div>
                      <h5 className="text-sm font-medium mb-3">Recent System Activity</h5>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {[
                          { action: 'User login', user: 'john@example.com', time: '2 min ago', type: 'info' },
                          { action: 'Feature updated', user: 'admin', time: '5 min ago', type: 'success' },
                          { action: 'API key generated', user: 'system', time: '10 min ago', type: 'info' },
                          { action: 'Payment processed', user: 'user123', time: '15 min ago', type: 'success' },
                          { action: 'Content published', user: 'editor', time: '20 min ago', type: 'success' }
                        ].map((activity, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-xs">
                            <div className={`w-2 h-2 rounded-full bg-${activity.type === 'success' ? 'green' : 'blue'}-500`}></div>
                            <span className="font-medium">{activity.action}</span>
                            <span className="text-gray-500">by {activity.user}</span>
                            <span className="text-gray-400 ml-auto">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
