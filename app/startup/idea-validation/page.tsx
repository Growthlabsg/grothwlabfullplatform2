"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronLeft,
  Download,
  Share2,
  Save,
  Sparkles,
  Lightbulb,
  Target,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  TrendingUp,
  BarChart3,
  FileText,
  Plus,
  Trash2,
  Edit,
  Eye,
  Copy,
  Globe,
  Mail,
  Phone,
  Calendar,
  Star,
} from "lucide-react"

export default function IdeaValidationPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("problem-validation")
  const [showAIDialog, setShowAIDialog] = useState(false)

  const handleSave = () => {
    toast({
      title: "Validation Plan Saved",
      description: "Your idea validation plan has been saved successfully.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Validation Report Downloaded",
      description: "Your idea validation report has been downloaded as PDF.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Validation Plan Shared",
      description: "Your idea validation plan has been shared with your team.",
    })
  }

  const handleAIAssist = () => {
    setShowAIDialog(true)
  }

  return (
          <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Startup Resources
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Idea Validation Toolkit</h1>
              <p className="text-lg text-gray-600">
                Test and validate your startup idea before investing significant time and resources
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleDownload} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button onClick={handleShare} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Problem Validation</p>
                  <p className="text-2xl font-bold">75%</p>
                </div>
                <Target className="h-8 w-8 text-[#0F7377]" />
              </div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Solution Testing</p>
                  <p className="text-2xl font-bold">50%</p>
                </div>
                <Lightbulb className="h-8 w-8 text-[#0F7377]" />
              </div>
              <Progress value={50} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Landing Page</p>
                  <p className="text-2xl font-bold">Ready</p>
                </div>
                <Globe className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">MVP Plan</p>
                  <p className="text-2xl font-bold">4 Features</p>
                </div>
                <BarChart3 className="h-8 w-8 text-[#0F7377]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="problem-validation">Problem Validation</TabsTrigger>
            <TabsTrigger value="solution-testing">Solution Testing</TabsTrigger>
            <TabsTrigger value="landing-page">Landing Page Builder</TabsTrigger>
            <TabsTrigger value="mvp-planning">MVP Planning</TabsTrigger>
          </TabsList>

          {/* Problem Validation */}
          <TabsContent value="problem-validation" className="space-y-6">
            <h2 className="text-2xl font-bold">Problem Validation</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Problem Definition</CardTitle>
                  <CardDescription>Clearly define the problem you're solving</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Problem Statement</Label>
                    <Textarea 
                      placeholder="Describe the problem you're solving..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div>
                    <Label>Target Audience</Label>
                    <Input 
                      placeholder="Who experiences this problem?"
                    />
                  </div>

                  <div>
                    <Label>Problem Severity</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical - Immediate attention required</SelectItem>
                        <SelectItem value="High">High - Significant impact</SelectItem>
                        <SelectItem value="Medium">Medium - Moderate impact</SelectItem>
                        <SelectItem value="Low">Low - Minor inconvenience</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Validation Methods</CardTitle>
                  <CardDescription>Track your problem validation progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { method: "Customer Interviews", completed: true },
                      { method: "Online Surveys", completed: false },
                      { method: "Social Media Research", completed: true },
                      { method: "Competitor Analysis", completed: false }
                    ].map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Checkbox checked={method.completed} />
                          <div>
                            <p className="font-medium">{method.method}</p>
                            <p className="text-sm text-gray-600">
                              {method.completed ? "Completed" : "Not started"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Solution Testing */}
          <TabsContent value="solution-testing" className="space-y-6">
            <h2 className="text-2xl font-bold">Solution Testing</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Solution Definition</CardTitle>
                <CardDescription>Define your proposed solution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Solution Description</Label>
                  <Textarea 
                    placeholder="Describe your solution..."
                    className="min-h-[100px]"
                  />
                </div>

                <div>
                  <Label>Unique Value Proposition</Label>
                  <Textarea 
                    placeholder="What makes your solution unique?"
                  />
                </div>

                <div>
                  <Label>Pricing Model</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pricing model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="one-time">One-time Purchase</SelectItem>
                      <SelectItem value="freemium">Freemium</SelectItem>
                      <SelectItem value="marketplace">Marketplace Commission</SelectItem>
                      <SelectItem value="advertising">Advertising</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Landing Page Builder */}
          <TabsContent value="landing-page" className="space-y-6">
            <h2 className="text-2xl font-bold">Landing Page Builder</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Create compelling headlines and descriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Headline</Label>
                  <Input 
                    placeholder="Your compelling headline"
                  />
                </div>

                <div>
                  <Label>Subheadline</Label>
                  <Input 
                    placeholder="Supporting subtitle"
                  />
                </div>

                <div>
                  <Label>Hero Description</Label>
                  <Textarea 
                    placeholder="Describe your solution in detail..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MVP Planning */}
          <TabsContent value="mvp-planning" className="space-y-6">
            <h2 className="text-2xl font-bold">MVP Planning</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Core Features</CardTitle>
                <CardDescription>Define the essential features for your MVP</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { feature: "User Authentication", priority: "High", effort: "Medium", status: "Planned" },
                  { feature: "Basic Dashboard", priority: "High", effort: "High", status: "Planned" },
                  { feature: "Data Import", priority: "Medium", effort: "High", status: "Planned" },
                  { feature: "Basic Reporting", priority: "Medium", effort: "Medium", status: "Planned" }
                ].map((feature, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div>
                      <Label>Feature Name</Label>
                      <Input 
                        value={feature.feature}
                        placeholder="Enter feature name"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label>Priority</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Effort</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Planned">Planned</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Assistance Dialog */}
        {showAIDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl mx-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#0F7377]" />
                  AI Idea Validation Assistant
                </CardTitle>
                <CardDescription>
                  Get AI-powered insights and recommendations for validating your startup idea
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>What's your startup idea?</Label>
                  <Textarea 
                    placeholder="Describe your startup idea and the problem you're solving..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setShowAIDialog(false)} variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                    Cancel
                  </Button>
                  <Button onClick={() => setShowAIDialog(false)} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
}
