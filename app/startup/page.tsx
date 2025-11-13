"use client"

import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  BarChart,
  Users,
  BookOpen,
  Target,
  ArrowRight,
  Calendar,
  DollarSign,
  Sparkles,
  Check,
  FileSearch,
  Scale,
  Users2,
  Lightbulb,
  Building2,
  Plus,
  Settings,
  Globe,
  Eye,
  Shield,
  Rocket,
  Zap,
  TrendingUp,
  Globe2,
  Database,
  Code,
  Palette,
  Megaphone,
  CreditCard,
  FileCheck,
  Award,
  BookOpenCheck,
  Building,
} from "lucide-react"
import { EnhancedResourceLibrary, FeaturedResources, PopularResources } from "@/components/resources/enhanced-resource-library"
import { StartupDirectory } from "@/components/startup/startup-directory"

export default function StartupHubPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-900">Startup Hub</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-6 lg:py-12">
        {/* Hero Section */}
        <div className="mb-8 lg:mb-12 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0F7377] to-[#1E293B] bg-clip-text text-transparent">
            Startup Resources Hub
          </h1>
          <p className="text-lg sm:text-xl text-[#334155] max-w-4xl mx-auto lg:mx-0">
            Everything you need to build, launch, and grow your startup. Access tools, guides, and resources designed to
            help founders at every stage of their journey.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-[#0F7377]">50+</div>
              <div className="text-sm text-gray-600">Tools & Resources</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-[#0F7377]">1000+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-[#0F7377]">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-2xl font-bold text-[#0F7377]">Free</div>
              <div className="text-sm text-gray-600">To Start</div>
            </div>
          </div>
        </div>

        {/* Enhanced Tools Section */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold">Essential Startup Tools</h2>
            <div className="hidden lg:flex items-center space-x-2">
              <Badge variant="secondary" className="bg-[#0F7377]/10 text-[#0F7377]">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Check className="w-3 h-3 mr-1" />
                Free to Use
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <FileText className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Pitch Deck Builder</CardTitle>
                </div>
                <CardDescription>
                  Create professional pitch decks that impress investors and communicate your vision effectively.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">10+</span> Templates
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">AI</span> Assistance
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Multiple</span> Exports
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Easy</span> Sharing
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                  <Link href="/startup/pitch-deck-builder" className="flex-1">
                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold shadow-lg">
                      <FileText className="w-4 h-4 mr-2" />
                      Standard Builder
                    </Button>
                  </Link>
                  <Link href="/startup/pitch-deck-builder/enhanced-page" className="flex-1">
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10 font-semibold">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhanced Builder
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <FileText className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Business Plan Generator</CardTitle>
                </div>
                <CardDescription>
                  Create comprehensive business plans to guide your startup's strategy and secure funding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Step-by-step</span> Guide
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Industry</span> Templates
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Financial</span> Projections
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Expert</span> Tips
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/business-plan" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold shadow-lg">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Business Plan
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BarChart className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Financial Projections</CardTitle>
                </div>
                <CardDescription>
                  Build realistic financial models with AI-driven insights, scenario analysis, and market intelligence for accurate forecasting.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Revenue</span> Forecasting
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Expense</span> Planning
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Cash Flow</span> Analysis
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Break-even</span> Calculator
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                  <Link href="/startup/financial-projections" className="flex-1">
                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold shadow-lg">
                      <BarChart className="w-4 h-4 mr-2" />
                      Standard Model
                    </Button>
                  </Link>
                  <Link href="/startup/financial-projections/enhanced" className="flex-1">
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10 font-semibold">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Enhanced
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BookOpen className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Startup Guides Hub</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Comprehensive guides covering all aspects of launching and managing a startup with real-world examples and case studies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Market</span> Research
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Business</span> Planning
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Funding</span> Strategies
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Marketing</span> & Scaling
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/guides" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Explore Guides</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Mentor Connect</CardTitle>
                  </div>
                </div>
                <CardDescription>
                  Connect with experienced mentors and advisors who can guide your startup journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">1-on-1</span> Sessions
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Industry</span> Experts
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Feedback</span> Sessions
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Networking</span> Events
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/mentorship" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Find a Mentor</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Market Research Tools</CardTitle>
                  </div>
                </div>
                <CardDescription>
                  Research your market with AI-powered competitive intelligence, market sizing, and strategic insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Competitor</span> Analysis
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Market</span> Sizing
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Customer</span> Surveys
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Trend</span> Analysis
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2 w-full">
                  <Link href="/startup/market-research" className="flex-1">
                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Standard Research</Button>
                  </Link>
                  <Link href="/startup/market-research/enhanced" className="flex-1">
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Enhanced
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            {/* New Tools with Original Styling */}
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Scale className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Legal Document Generator</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Create essential legal documents for your startup with customizable templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Founder</span> Agreements
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Employment</span> Contracts
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Privacy</span> Policies
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Terms of</span> Service
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/legal-documents" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Generate Documents</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <DollarSign className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Funding Navigator</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Explore funding options and connect with investors that match your startup's needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Funding</span> Readiness
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Investor</span> Matching
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Grant</span> Opportunities
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Pitch</span> Preparation
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/funding-navigator" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Find Funding</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Customer Discovery Tool</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Conduct user research, collect feedback, and validate your product with real users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Survey</span> Builder
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">User</span> Interviews
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Feedback</span> Analysis
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Persona</span> Creation
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/customer-discovery" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Start Discovery</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BarChart className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Valuation Calculator</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Estimate your startup's valuation using multiple methodologies and industry benchmarks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Multiple</span> Methods
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Industry</span> Benchmarks
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Investor</span> Perspective
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Scenario</span> Analysis
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/valuation-calculator" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Calculate Valuation</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Lightbulb className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Idea Validation Toolkit</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Test and validate your startup idea before investing significant time and resources.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Problem</span> Validation
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Solution</span> Testing
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Landing Page</span> Builder
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">MVP</span> Planning
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/idea-validation" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Validate Your Idea</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <FileSearch className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Startup Checklist</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Track your progress with comprehensive checklists for each stage of your startup journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Idea</span> Stage
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Launch</span> Preparation
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Growth</span> Milestones
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Funding</span> Readiness
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/checklist" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">View Checklists</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Enhanced Resource Library Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Comprehensive Resource Library</h2>
          <p className="text-lg text-gray-600 mb-8">
            Access our complete collection of startup resources, guides, templates, and tools designed to support your startup journey.
          </p>
          
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
              <EnhancedResourceLibrary />
            </TabsContent>

            <TabsContent value="featured" className="space-y-8">
              <FeaturedResources />
            </TabsContent>

            <TabsContent value="popular" className="space-y-8">
              <PopularResources />
            </TabsContent>

            <TabsContent value="search" className="space-y-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Search Resources</h3>
                <p className="text-gray-600">
                  Use advanced search and filtering to find exactly what you need for your startup journey.
                </p>
              </div>
              <EnhancedResourceLibrary />
            </TabsContent>
          </Tabs>
        </div>

        {/* Original Featured Resources Section - Preserved */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Resources</h2>

          <Tabs defaultValue="guides">
            <TabsList className="mb-6">
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="relative h-40">
                    <Image src="/placeholder-logo.png" alt="Funding Guide" fill className="object-cover" />
                    <Badge className="absolute top-2 right-2 bg-orange-500">Popular</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Startup Funding Options: A Comprehensive Guide</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Oct 5, 2023</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      Explore various funding options available to startups, from bootstrapping to venture capital.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/startup/guides/funding-options" className="w-full">
                      <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="relative h-40">
                    <Image
                      src="/placeholder-logo.png"
                      alt="Legal Structure Guide"
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-500">Featured</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Choosing the Right Legal Structure for Your Startup</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Sep 15, 2023</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      Learn about the different legal structures available for startups and how to choose the best one
                      for your business.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/startup/guides/startup-legal-structure" className="w-full">
                      <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="relative h-40">
                    <Image src="/placeholder-logo.png" alt="Market Research Guide" fill className="object-cover" />
                    <Badge className="absolute top-2 right-2 bg-green-500">New</Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Conducting Effective Market Research</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Nov 2, 2023</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      Learn how to conduct market research to validate your business idea and understand your target
                      audience.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href="/startup/guides/market-research" className="w-full">
                      <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <CardTitle>Investor Update Template</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      A professional template for keeping your investors informed about your startup's progress.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Free</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      Download Template
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      <CardTitle>Financial Model Template</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      A comprehensive Excel template for creating financial projections for your startup.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Free</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      Download Template
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-purple-500" />
                      <CardTitle>Pitch Deck Template</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      A professionally designed pitch deck template with 12 essential slides.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>Free</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      Download Template
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <div className="relative h-40">
                    <Image src="/placeholder-logo.png" alt="Pitch Competition" fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>Startup Pitch Competition</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Dec 15, 2023</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Pitch your startup to a panel of investors and win funding and mentorship opportunities.
                    </p>
                    <Badge>In-Person</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      Register
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="relative h-40">
                    <Image
                      src="/placeholder-logo.png"
                      alt="Networking Event"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Founder Networking Mixer</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Jan 20, 2024</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Connect with other founders, investors, and mentors in a casual networking environment.
                    </p>
                    <Badge>Virtual</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      Register
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <div className="relative h-40">
                    <Image src="/placeholder-logo.png" alt="Workshop" fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>Fundraising Workshop</CardTitle>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Feb 5, 2024</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Learn effective fundraising strategies from successful founders and investors.
                    </p>
                    <Badge>Hybrid</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Enhanced AI-Powered Tools Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">AI-Powered Startup Tools</h2>
          <p className="text-lg text-gray-600 mb-8">
            Leverage artificial intelligence to accelerate your startup journey with smart tools and insights.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5 border-[#0F7377]/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-[#0F7377]" />
                  <CardTitle>AI Pitch Deck Assistant</CardTitle>
                </div>
                <CardDescription>Let AI help you create compelling content for your pitch deck slides.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Our AI assistant analyzes successful pitch decks and helps you craft persuasive content tailored to
                  your startup and industry.
                </p>
                <div className="bg-white/50 rounded-md p-4 border border-[#0F7377]/20 mb-4">
                  <p className="text-sm italic text-gray-600">
                    "The AI assistant helped me create a pitch deck that secured $500K in seed funding. It saved me
                    hours of work and improved my messaging significantly."
                  </p>
                  <p className="text-sm font-medium mt-2">— Sarah Chen, Founder at TechNova</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/pitch-deck-builder" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Try AI Assistant
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5 border-[#0F7377]/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-[#0F7377]" />
                  <CardTitle>AI Financial Projections</CardTitle>
                </div>
                <CardDescription>
                  Generate realistic financial projections based on your industry and business model.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Our AI analyzes thousands of startup financial models to help you create accurate projections with
                  industry-specific benchmarks.
                </p>
                <div className="bg-white/50 rounded-md p-4 border border-[#0F7377]/20 mb-4">
                  <p className="text-sm italic text-gray-600">
                    "The AI financial projections tool helped me create realistic forecasts that impressed investors and
                    gave me confidence in my business planning."
                  </p>
                  <p className="text-sm font-medium mt-2">— Michael Rodriguez, Founder at FinanceSimple</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex space-x-2 w-full">
                  <Link href="/startup/financial-projections" className="flex-1">
                    <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                      Standard Model
                    </Button>
                  </Link>
                  <Link href="/startup/financial-projections/enhanced" className="flex-1">
                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Enhanced
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5 border-[#0F7377]/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-6 w-6 text-[#0F7377]" />
                  <CardTitle>AI Market Intelligence</CardTitle>
                </div>
                <CardDescription>
                  Get AI-powered market insights and competitive analysis for your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Our AI scans market data, competitor websites, and industry reports to provide actionable insights
                  for your business strategy.
                </p>
                <div className="bg-white/50 rounded-md p-4 border border-[#0F7377]/20 mb-4">
                  <p className="text-sm italic text-gray-600">
                    "The AI market intelligence helped me identify a gap in the market that became our competitive advantage."
                  </p>
                  <p className="text-sm font-medium mt-2">— Lisa Wang, Founder at DataFlow</p>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/market-research/enhanced" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Insights
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Advanced Tools Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Advanced Startup Tools</h2>
          <p className="text-lg text-gray-600 mb-8">
            Professional-grade tools for scaling startups and managing complex operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Building2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Team Management Hub</CardTitle>
                    <Badge className="ml-2 bg-blue-500">Pro</Badge>
                  </div>
                </div>
                <CardDescription>
                  Manage your startup team with advanced HR tools, performance tracking, and collaboration features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Employee</span> Onboarding
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Performance</span> Reviews
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Goal</span> Tracking
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Team</span> Analytics
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/team-management" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Manage Team</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Globe className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>International Expansion</CardTitle>
                    <Badge className="ml-2 bg-purple-500">Global</Badge>
                  </div>
                </div>
                <CardDescription>
                  Plan and execute your global expansion with market entry strategies and compliance tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Market</span> Entry
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Legal</span> Compliance
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Currency</span> Management
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Local</span> Partnerships
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/international-expansion" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Go Global</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Settings className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <div className="flex items-center">
                    <CardTitle>Operations Dashboard</CardTitle>
                    <Badge className="ml-2 bg-green-500">New</Badge>
                  </div>
                </div>
                <CardDescription>
                  Monitor and optimize your startup's operations with real-time analytics and automation tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Process</span> Automation
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">KPI</span> Tracking
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Resource</span> Planning
                  </div>
                  <div className="bg-gray-100 rounded-md p-2 text-center text-sm">
                    <span className="font-medium">Quality</span> Control
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/operations-dashboard" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">View Dashboard</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Learning & Development Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Learning & Development</h2>
          <p className="text-lg text-gray-600 mb-8">
            Continuous learning resources to help you and your team grow and stay ahead of the competition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BookOpen className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Startup Academy</CardTitle>
                </div>
                <CardDescription>
                  Comprehensive courses covering all aspects of building and scaling a startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>50+ Video Courses</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Expert Instructors</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Certificates</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/academy" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Start Learning</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Leadership Training</CardTitle>
                </div>
                <CardDescription>
                  Develop essential leadership skills for startup founders and team leaders.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Team Building</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Decision Making</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Communication</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/leadership-training" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Enroll Now</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Technical Skills</CardTitle>
                </div>
                <CardDescription>
                  Learn essential technical skills for modern startups and digital businesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Web Development</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Data Analysis</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>AI & ML</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/technical-skills" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Learn Tech</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <DollarSign className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Financial Literacy</CardTitle>
                </div>
                <CardDescription>
                  Master financial concepts essential for startup success and growth.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Accounting Basics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Investment Strategies</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Risk Management</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/financial-literacy" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Learn Finance</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Community & Networking Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Community & Networking</h2>
          <p className="text-lg text-gray-600 mb-8">
            Connect with fellow entrepreneurs, share experiences, and build valuable relationships in the startup ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Founder Forums</CardTitle>
                </div>
                <CardDescription>
                  Join discussions with other founders, share challenges, and get advice from the community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Industry-specific Groups</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Q&A Sessions</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Resource Sharing</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/community/founder-forums" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Join Forums</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Calendar className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Networking Events</CardTitle>
                </div>
                <CardDescription>
                  Attend virtual and in-person events to meet investors, mentors, and potential partners.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Monthly Meetups</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Pitch Events</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Workshop Series</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/events" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">View Events</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Mentor Matching</CardTitle>
                </div>
                <CardDescription>
                  Find the perfect mentor based on your industry, stage, and specific needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>AI-Powered Matching</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>1-on-1 Sessions</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Group Mentoring</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/mentor-connect" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Find Mentor</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Industry-Specific Resources Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Industry-Specific Resources</h2>
          <p className="text-lg text-gray-600 mb-8">
            Specialized tools and resources tailored to different industries and business models.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Tech Startups</CardTitle>
                </div>
                <CardDescription>
                  Resources for software, SaaS, and technology companies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Product Development</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Technical Architecture</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Scaling Infrastructure</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tech-resources" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Explore Tech</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <DollarSign className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Fintech</CardTitle>
                </div>
                <CardDescription>
                  Specialized resources for financial technology startups.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Regulatory Compliance</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Payment Systems</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Security Standards</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/fintech-resources" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Explore Fintech</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Building2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>E-commerce</CardTitle>
                </div>
                <CardDescription>
                  Tools and guides for online retail and marketplace businesses.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Platform Setup</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Inventory Management</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Marketing Strategies</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/ecommerce-resources" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Explore E-commerce</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Lightbulb className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>HealthTech</CardTitle>
                </div>
                <CardDescription>
                  Resources for healthcare technology and medical startups.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>HIPAA Compliance</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Clinical Trials</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Medical Device Regulations</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/healthtech-resources" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Explore HealthTech</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Success Stories & Case Studies Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Success Stories & Case Studies</h2>
          <p className="text-lg text-gray-600 mb-8">
            Learn from real startup journeys and discover what it takes to build a successful company.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <div className="relative h-40">
                <Image src="/startup-success-1.jpg" alt="Startup Success Story" fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-green-500">Featured</Badge>
              </div>
              <CardHeader>
                <CardTitle>From Idea to $10M Series A</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Dec 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2">
                  How TechFlow raised their Series A funding in just 18 months using our platform tools and resources.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/startup/success-stories/techflow" className="w-full">
                  <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                    Read Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <div className="relative h-40">
                <Image src="/startup-success-2.jpg" alt="Startup Success Story" fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-blue-500">Case Study</Badge>
              </div>
              <CardHeader>
                <CardTitle>Bootstrapping to Profitability</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Nov 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2">
                  Learn how DataViz achieved profitability without external funding using our financial planning tools.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/startup/success-stories/dataviz" className="w-full">
                  <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                    Read Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <div className="relative h-40">
                <Image src="/startup-success-3.jpg" alt="Startup Success Story" fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-purple-500">Interview</Badge>
              </div>
              <CardHeader>
                <CardTitle>International Expansion Success</CardTitle>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Oct 2023</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2">
                  How EcoTech expanded to 5 countries using our international expansion tools and mentorship program.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/startup/success-stories/ecotech" className="w-full">
                  <Button variant="outline" className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10">
                    Read Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Startup Stage Journey Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Startup Journey by Stage</h2>
          <p className="text-lg text-gray-600 mb-8">
            Navigate your startup journey with stage-specific resources and guidance tailored to where you are in your entrepreneurial path.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Lightbulb className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Idea Stage</CardTitle>
                  <Badge className="ml-2 bg-yellow-500">Stage 1</Badge>
                </div>
                <CardDescription>
                  Validate your idea and build a solid foundation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Idea Validation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Market Research</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>MVP Planning</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Team Formation</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/stage/idea" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Start Here</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Launch Stage</CardTitle>
                  <Badge className="ml-2 bg-blue-500">Stage 2</Badge>
                </div>
                <CardDescription>
                  Build and launch your product to market.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Product Development</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Go-to-Market Strategy</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Customer Acquisition</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Legal Setup</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/stage/launch" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Launch Now</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BarChart className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Growth Stage</CardTitle>
                  <Badge className="ml-2 bg-green-500">Stage 3</Badge>
                </div>
                <CardDescription>
                  Scale your business and expand operations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Scaling Operations</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Team Expansion</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Market Expansion</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Series A Funding</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/stage/growth" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Scale Up</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Building2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Scale Stage</CardTitle>
                  <Badge className="ml-2 bg-purple-500">Stage 4</Badge>
                </div>
                <CardDescription>
                  Build a sustainable, profitable business.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>International Expansion</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Advanced Funding</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Exit Strategy</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>IPO Preparation</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/stage/scale" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Scale Global</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Funding & Investment Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Funding & Investment Resources</h2>
          <p className="text-lg text-gray-600 mb-8">
            Comprehensive funding resources to help you secure the capital you need to grow your startup.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <DollarSign className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Funding Readiness Assessment</CardTitle>
                </div>
                <CardDescription>
                  Evaluate your startup's readiness for different types of funding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Financial Health Check</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Investor Readiness Score</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Funding Strategy Recommendations</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/funding/readiness" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Assess Readiness</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Investor Database</CardTitle>
                </div>
                <CardDescription>
                  Connect with investors who match your startup's profile and stage.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>500+ Active Investors</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Industry & Stage Filtering</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Direct Contact Information</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/funding/investors" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Find Investors</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <FileText className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Grant Opportunities</CardTitle>
                </div>
                <CardDescription>
                  Discover government grants and non-dilutive funding opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Government Grants</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Corporate Innovation Programs</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Application Assistance</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/funding/grants" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Find Grants</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Technology & Development Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Technology & Development</h2>
          <p className="text-lg text-gray-600 mb-8">
            Technical resources and tools to help you build, deploy, and scale your startup's technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Settings className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Tech Stack Builder</CardTitle>
                </div>
                <CardDescription>
                  Choose the right technology stack for your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Frontend Frameworks</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Backend Technologies</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Database Solutions</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tech/stack-builder" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Build Stack</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Globe className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Cloud Infrastructure</CardTitle>
                </div>
                <CardDescription>
                  Set up scalable cloud infrastructure for your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>AWS/Azure/GCP Setup</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Cost Optimization</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Security Best Practices</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tech/cloud" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Setup Cloud</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Eye className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>DevOps & Deployment</CardTitle>
                </div>
                <CardDescription>
                  Implement CI/CD and deployment best practices.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>CI/CD Pipelines</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Monitoring & Logging</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Automated Testing</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tech/devops" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Setup DevOps</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Sparkles className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>AI & ML Integration</CardTitle>
                </div>
                <CardDescription>
                  Integrate artificial intelligence into your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>AI Model Selection</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Data Pipeline Setup</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>MLOps Implementation</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tech/ai-ml" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Integrate AI</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Marketing & Sales Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Marketing & Sales</h2>
          <p className="text-lg text-gray-600 mb-8">
            Comprehensive marketing and sales resources to help you acquire customers and grow your revenue.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Digital Marketing Strategy</CardTitle>
                </div>
                <CardDescription>
                  Build a comprehensive digital marketing strategy for your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>SEO & Content Marketing</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Social Media Strategy</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Paid Advertising</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/marketing/strategy" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Build Strategy</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Sales Process Builder</CardTitle>
                </div>
                <CardDescription>
                  Create and optimize your sales process and pipeline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Lead Generation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Sales Funnel Design</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>CRM Setup</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/sales/process" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Build Process</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BarChart className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Growth Analytics</CardTitle>
                </div>
                <CardDescription>
                  Track and analyze your marketing and sales performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>KPI Dashboard</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Conversion Tracking</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>ROI Analysis</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/marketing/analytics" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Track Growth</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Legal & Compliance Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Legal & Compliance</h2>
          <p className="text-lg text-gray-600 mb-8">
            Essential legal resources to ensure your startup is compliant and protected.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Scale className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Legal Structure Setup</CardTitle>
                </div>
                <CardDescription>
                  Choose and set up the right legal structure for your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Entity Formation</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Tax Registration</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Business Licenses</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/legal/structure" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Setup Legal</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <FileText className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>IP Protection</CardTitle>
                </div>
                <CardDescription>
                  Protect your intellectual property and innovations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Patent Applications</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Trademark Registration</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Copyright Protection</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/legal/ip-protection" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Protect IP</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Employment Law</CardTitle>
                </div>
                <CardDescription>
                  Navigate employment law and HR compliance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Employment Contracts</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Labor Law Compliance</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Equity Distribution</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/legal/employment" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">HR Compliance</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Shield className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Data Privacy & Security</CardTitle>
                </div>
                <CardDescription>
                  Ensure compliance with data protection regulations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>GDPR Compliance</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Privacy Policies</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Security Audits</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/legal/privacy" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Ensure Privacy</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Startup Accelerator Programs Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Startup Accelerator Programs</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join our comprehensive accelerator programs designed to fast-track your startup's growth and success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Rocket className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Pre-Seed Accelerator</CardTitle>
                  <Badge className="ml-2 bg-green-500">3 Months</Badge>
                </div>
                <CardDescription>
                  Perfect for early-stage startups looking to validate their idea and build an MVP.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>$25K Funding</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Mentorship Program</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Workshop Series</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Demo Day Access</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold">5%</span>
                  <span className="text-sm text-gray-500"> equity</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/accelerator/pre-seed" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Seed Accelerator</CardTitle>
                  <Badge className="ml-2 bg-blue-500">6 Months</Badge>
                </div>
                <CardDescription>
                  For startups with validated products ready to scale and raise Series A funding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>$100K Funding</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>1-on-1 Mentorship</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Investor Network</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Co-working Space</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold">7%</span>
                  <span className="text-sm text-gray-500"> equity</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/accelerator/seed" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Building2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Scale Accelerator</CardTitle>
                  <Badge className="ml-2 bg-purple-500">12 Months</Badge>
                </div>
                <CardDescription>
                  For growth-stage startups looking to expand internationally and prepare for Series B+.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>$500K Funding</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Executive Coaching</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Global Expansion</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>IPO Preparation</span>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold">10%</span>
                  <span className="text-sm text-gray-500"> equity</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/accelerator/scale" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Apply Now</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Startup Tools & Software Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recommended Tools & Software</h2>
          <p className="text-lg text-gray-600 mb-8">
            Curated list of essential tools and software that successful startups use to build, grow, and scale their businesses.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Settings className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Productivity Tools</CardTitle>
                </div>
                <CardDescription>
                  Essential tools for team collaboration and productivity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Slack, Notion, Asana</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Google Workspace</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Zoom, Calendly</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tools/productivity" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">View Tools</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BarChart className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Analytics & Data</CardTitle>
                </div>
                <CardDescription>
                  Tools for tracking performance and making data-driven decisions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Google Analytics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Mixpanel, Amplitude</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Tableau, Looker</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tools/analytics" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">View Tools</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Marketing Tools</CardTitle>
                </div>
                <CardDescription>
                  Comprehensive marketing and growth tools for customer acquisition.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>HubSpot, Mailchimp</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Hootsuite, Buffer</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Canva, Figma</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tools/marketing" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">View Tools</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <DollarSign className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Financial Tools</CardTitle>
                </div>
                <CardDescription>
                  Essential financial management and accounting tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>QuickBooks, Xero</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Stripe, PayPal</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Expensify, Receipt Bank</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/startup/tools/financial" className="w-full">
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">View Tools</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Comprehensive Startup Resources Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Comprehensive Startup Resources</h2>
          <p className="text-lg text-gray-600 mb-8">
            Everything you need to build, launch, and scale your startup successfully. From idea validation to IPO preparation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Idea Validation & Market Research */}
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Lightbulb className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Idea Validation & Market Research</CardTitle>
                </div>
                <CardDescription>
                  Validate your startup idea and conduct thorough market research.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Discovery</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Market Size Analysis</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Competitor Analysis</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SWOT Analysis Tool</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Start Validation
                </Button>
              </CardFooter>
            </Card>

            {/* Business Model Canvas */}
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Target className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Business Model Canvas</CardTitle>
                </div>
                <CardDescription>
                  Design and refine your business model with our interactive canvas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Value Proposition Design</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Revenue Streams</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer Segments</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Key Partnerships</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Create Canvas
                </Button>
              </CardFooter>
            </Card>

            {/* MVP Development */}
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Code className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>MVP Development</CardTitle>
                </div>
                <CardDescription>
                  Build your minimum viable product with guided development tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Feature Prioritization</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tech Stack Selection</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Development Timeline</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Testing Framework</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Build MVP
                </Button>
              </CardFooter>
            </Card>

            {/* Brand & Design */}
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Palette className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Brand & Design</CardTitle>
                </div>
                <CardDescription>
                  Create a compelling brand identity and design system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Logo Design</span>
                    <Badge variant="outline">$99</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Brand Guidelines</span>
                    <Badge variant="outline">$199</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">UI/UX Design</span>
                    <Badge variant="outline">$499</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Marketing Materials</span>
                    <Badge variant="outline">$299</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Start Design
                </Button>
              </CardFooter>
            </Card>

            {/* Marketing & Growth */}
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Megaphone className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Marketing & Growth</CardTitle>
                </div>
                <CardDescription>
                  Launch effective marketing campaigns and drive growth.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Content Strategy</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Social Media Management</span>
                    <Badge variant="outline">$199/mo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">SEO Optimization</span>
                    <Badge variant="outline">$299/mo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Growth Hacking</span>
                    <Badge variant="outline">$499/mo</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Launch Marketing
                </Button>
              </CardFooter>
            </Card>

            {/* Financial Management */}
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <CreditCard className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Financial Management</CardTitle>
                </div>
                <CardDescription>
                  Manage your startup's finances and track key metrics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Financial Planning</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cash Flow Management</span>
                    <Badge variant="outline">$99/mo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Tax Preparation</span>
                    <Badge variant="outline">$299</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Investor Reporting</span>
                    <Badge variant="outline">$199/mo</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Manage Finances
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Startup Templates & Documents Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Startup Templates & Documents</h2>
          <p className="text-lg text-gray-600 mb-8">
            Professional templates and documents to accelerate your startup's development.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <FileCheck className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Legal Documents</CardTitle>
                </div>
                <CardDescription>
                  Essential legal templates for your startup.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Founder Agreements</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Employment Contracts</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Privacy Policy</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Terms of Service</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Download Templates
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BarChart className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Financial Templates</CardTitle>
                </div>
                <CardDescription>
                  Financial models and projection templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Financial Projections</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>P&L Statements</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Cash Flow Models</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Valuation Models</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Download Templates
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Users className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>HR Templates</CardTitle>
                </div>
                <CardDescription>
                  Human resources and team management templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Job Descriptions</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Employee Handbooks</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Performance Reviews</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Equity Agreements</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Download Templates
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Award className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Pitch Templates</CardTitle>
                </div>
                <CardDescription>
                  Professional pitch deck and presentation templates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Investor Pitch Decks</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Product Demos</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Sales Presentations</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Conference Talks</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Download Templates
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* New Learning & Education Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Learning & Education</h2>
          <p className="text-lg text-gray-600 mb-8">
            Comprehensive learning resources to develop your entrepreneurial skills and knowledge.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <BookOpenCheck className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Startup Courses</CardTitle>
                </div>
                <CardDescription>
                  Comprehensive courses covering all aspects of startup building.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Startup Fundamentals</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Advanced Growth</span>
                    <Badge variant="outline">$299</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Fundraising Mastery</span>
                    <Badge variant="outline">$499</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Leadership & Management</span>
                    <Badge variant="outline">$399</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Browse Courses
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <TrendingUp className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Webinars & Workshops</CardTitle>
                </div>
                <CardDescription>
                  Live sessions with industry experts and successful entrepreneurs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Weekly Webinars</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Masterclass Series</span>
                    <Badge variant="outline">$99</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Industry Workshops</span>
                    <Badge variant="outline">$199</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">1-on-1 Mentoring</span>
                    <Badge variant="outline">$299/hr</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  View Schedule
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-[#0F7377]/20 hover:border-[#0F7377] transition-all">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <div className="bg-[#0F7377]/10 p-2 rounded-md">
                    <Globe2 className="h-6 w-6 text-[#0F7377]" />
                  </div>
                  <CardTitle>Global Network</CardTitle>
                </div>
                <CardDescription>
                  Connect with entrepreneurs and experts worldwide.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Founder Network</span>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Investor Network</span>
                    <Badge variant="outline">$99/mo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Mentor Matching</span>
                    <Badge variant="outline">$199/mo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Co-founder Matching</span>
                    <Badge variant="outline">$299/mo</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                  Join Network
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Original Expert Help Section - Preserved */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Get Expert Help</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pitch Deck Review</CardTitle>
                <CardDescription>
                  Get professional feedback on your pitch deck from experienced investors and pitch experts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Detailed slide-by-slide feedback</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Content and design recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Investor perspective insights</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold">$199</span>
                  <span className="text-sm text-gray-500"> / review</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Request Review</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Plan Consultation</CardTitle>
                <CardDescription>
                  Work with a business advisor to refine your business plan and strategy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>90-minute consultation session</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Business model validation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Strategic recommendations</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold">$299</span>
                  <span className="text-sm text-gray-500"> / session</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Book Consultation</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Modeling Help</CardTitle>
                <CardDescription>
                  Get expert assistance with your financial projections and fundraising strategy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Custom financial model creation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Fundraising amount guidance</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span>Valuation methodology</span>
                  </li>
                </ul>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold">$399</span>
                  <span className="text-sm text-gray-500"> / model</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Get Financial Help</Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Startup Directory Section */}
        <div className="mt-16">
          <StartupDirectory />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          <div className="grid grid-cols-4 gap-2">
            <Link href="/startup" className="flex flex-col items-center space-y-1 p-2 rounded-lg bg-[#0F7377]/10">
              <Rocket className="w-5 h-5 text-[#0F7377]" />
              <span className="text-xs font-medium text-[#0F7377]">Hub</span>
            </Link>
            <Link href="/startup/guides" className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-100">
              <BookOpen className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">Guides</span>
            </Link>
            <Link href="/startup/profile" className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-100">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">Profile</span>
            </Link>
            <Link href="/startup/checklist" className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-gray-100">
              <Check className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">Checklist</span>
            </Link>
          </div>
        </div>

        {/* Bottom padding for mobile navigation */}
        <div className="lg:hidden h-20"></div>
      </div>
    </div>
  )
}
