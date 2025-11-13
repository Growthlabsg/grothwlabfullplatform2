"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  DollarSign, 
  Users, 
  Star, 
  BookOpen,
  Calculator,
  Target,
  TrendingUp,
  Database
} from "lucide-react"

interface StartupResource {
  id: string
  name: string
  description: string
  category: string
  type: string
  pricing: string
  price?: number
  validationRequired: boolean
  validationPrice?: number
  consultationAvailable: boolean
  consultationPrice?: number
  status: string
  featured: boolean
  tags: string[]
  url: string
  usageCount: number
  rating: number
}

interface ProfessionalConsultant {
  id: string
  name: string
  expertise: string[]
  experience: number
  hourlyRate: number
  availability: string
  rating: number
  completedProjects: number
  bio: string
  contact: {
    email: string
    phone: string
  }
  status: string
}

const mockResources: StartupResource[] = [
  {
    id: "1",
    name: "Business Model Canvas",
    description: "Strategic management template for developing new business models",
    category: "Strategy",
    type: "template",
    pricing: "free",
    validationRequired: true,
    validationPrice: 99,
    consultationAvailable: true,
    consultationPrice: 150,
    status: "active",
    featured: true,
    tags: ["strategy", "business-model", "planning"],
    url: "/resources/business-model-canvas",
    usageCount: 1247,
    rating: 4.8
  },
  {
    id: "2",
    name: "Financial Projection Calculator",
    description: "Advanced financial modeling tool for startup projections",
    category: "Finance",
    type: "calculator",
    pricing: "paid",
    price: 199,
    validationRequired: true,
    validationPrice: 149,
    consultationAvailable: true,
    consultationPrice: 250,
    status: "active",
    featured: true,
    tags: ["finance", "projections", "modeling"],
    url: "/resources/financial-calculator",
    usageCount: 856,
    rating: 4.9
  }
]

const mockConsultants: ProfessionalConsultant[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    expertise: ["Business Strategy", "Market Entry", "Growth Planning"],
    experience: 15,
    hourlyRate: 200,
    availability: "available",
    rating: 4.9,
    completedProjects: 127,
    bio: "Senior business consultant with 15+ years experience in startup strategy and growth",
    contact: {
      email: "sarah.chen@growthlab.sg",
      phone: "+65 9123 4567"
    },
    status: "active"
  }
]

export function StartupResourcesManagement() {
  const [resources, setResources] = useState<StartupResource[]>(mockResources)
  const [consultants, setConsultants] = useState<ProfessionalConsultant[]>(mockConsultants)
  const [editingResource, setEditingResource] = useState<StartupResource | null>(null)
  const [showAddResource, setShowAddResource] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["Strategy", "Finance", "Research", "Marketing", "Operations", "Legal", "Technology"]
  const resourceTypes = ["tool", "template", "guide", "calculator", "database", "service"]
  const pricingOptions = ["free", "paid", "freemium", "subscription"]

  const filteredResources = resources.filter(resource => 
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSaveResource = (resource: StartupResource) => {
    if (editingResource) {
      setResources(prev => prev.map(r => r.id === resource.id ? resource : r))
      setEditingResource(null)
    } else {
      setResources(prev => [...prev, { ...resource, id: Date.now().toString() }])
      setShowAddResource(false)
    }
  }

  const handleDeleteResource = (id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }

  const toggleResourceStatus = (id: string) => {
    setResources(prev => prev.map(r => 
      r.id === id ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'free': return 'bg-green-100 text-green-800'
      case 'paid': return 'bg-blue-100 text-blue-800'
      case 'freemium': return 'bg-purple-100 text-purple-800'
      case 'subscription': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Startup Resources Management</h1>
          <p className="text-muted-foreground">
            Complete control over all startup resources, pricing, and professional consultation services
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowAddResource(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resources.length}</div>
            <p className="text-xs text-muted-foreground">
              {resources.filter(r => r.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Resources</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources.filter(r => r.pricing !== 'free').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Revenue generating
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {consultants.filter(c => c.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Professional services
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resources.reduce((sum, r) => sum + r.usageCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Resource interactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="resources" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="consultants">Professional Consultants</TabsTrigger>
        </TabsList>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-4">
          {/* Search */}
          <div className="flex-1">
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(resource => (
              <Card key={resource.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        <CardDescription className="text-sm">{resource.category}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={resource.status === 'active'}
                        onCheckedChange={() => toggleResourceStatus(resource.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingResource(resource)}
                      >
                        <Star className={`w-4 h-4 ${resource.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getPricingColor(resource.pricing)}>
                      {resource.pricing === 'free' ? 'Free' : 
                       resource.pricing === 'paid' ? `$${resource.price}` :
                       resource.pricing === 'subscription' ? `$${resource.price}/mo` : 'Freemium'}
                    </Badge>
                    <Badge className={getStatusColor(resource.status)}>
                      {resource.status}
                    </Badge>
                    {resource.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                    )}
                  </div>

                  {resource.validationRequired && (
                    <div className="text-sm">
                      <span className="font-medium">Validation:</span> ${resource.validationPrice} SGD
                    </div>
                  )}

                  {resource.consultationAvailable && (
                    <div className="text-sm">
                      <span className="font-medium">Consultation:</span> ${resource.consultationPrice} SGD
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Used {resource.usageCount.toLocaleString()} times</span>
                    <span>★ {resource.rating}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingResource(resource)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteResource(resource.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Consultants Tab */}
        <TabsContent value="consultants" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {consultants.map(consultant => (
              <Card key={consultant.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{consultant.name}</CardTitle>
                      <CardDescription>{consultant.expertise.join(', ')}</CardDescription>
                    </div>
                    <Badge className={consultant.availability === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {consultant.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p><span className="font-medium">Experience:</span> {consultant.experience} years</p>
                    <p><span className="font-medium">Rate:</span> ${consultant.hourlyRate}/hour</p>
                    <p><span className="font-medium">Rating:</span> ★ {consultant.rating}</p>
                    <p><span className="font-medium">Projects:</span> {consultant.completedProjects}</p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{consultant.bio}</p>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Resource Dialog */}
      <Dialog open={showAddResource || !!editingResource} onOpenChange={() => {
        setShowAddResource(false)
        setEditingResource(null)
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingResource ? 'Edit Resource' : 'Add New Resource'}
            </DialogTitle>
            <DialogDescription>
              Configure all aspects of the startup resource including pricing, validation, and consultation options
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Resource Name</Label>
                <Input
                  id="name"
                  placeholder="Enter resource name"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter resource description"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="pricing">Pricing Model</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing" />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Price (if applicable)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="validationRequired" />
                <Label htmlFor="validationRequired">Require Result Validation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="consultationAvailable" />
                <Label htmlFor="consultationAvailable">Professional Consultation Available</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              setShowAddResource(false)
              setEditingResource(null)
            }}>
              Cancel
            </Button>
            <Button type="submit">
              {editingResource ? 'Update Resource' : 'Create Resource'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
