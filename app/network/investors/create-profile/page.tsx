"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { 
  ChevronLeft,
  ChevronRight,
  Save,
  Eye,
  Check,
  Plus,
  X,
  Building2,
  Target,
  Clock,
  DollarSign,
  Users,
  Award,
  Globe,
  FileText,
  Calendar,
  TrendingUp,
  Shield,
  Star,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
  Upload,
  Camera,
  LinkIcon,
  BarChart3,
  Zap,
  Heart,
  MapPin,
  Settings,
  Lock,
  Eye as EyeIcon,
  EyeOff,
  Briefcase,
  PieChart,
  TrendingDown,
  Activity,
  User,
  CheckCircle,
  AlertCircle,
  Building,
  CreditCard,
  Handshake,
  Lightbulb,
  Target as TargetIcon,
  Zap as ZapIcon
} from "lucide-react"
import Link from "next/link"

const INVESTOR_TYPES = [
  "Venture Capital", "Angel Investor", "Private Equity", "Corporate VC", 
  "Family Office", "Sovereign Wealth Fund", "Hedge Fund", "Crowdfunding Platform",
  "Accelerator/Incubator", "Government Fund", "Impact Investor", "Crypto/Web3 Investor"
]

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce", "SaaS", "AI/ML", 
  "Blockchain", "Fintech", "Edtech", "Healthtech", "Cleantech", "Agtech", "PropTech",
  "Food & Beverage", "Fashion", "Entertainment", "Gaming", "Sports", "Travel", "Real Estate",
  "Manufacturing", "Logistics", "Transportation", "Energy", "Sustainability", "Social Impact"
]

const STAGE_FOCUS = [
  "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth Stage", 
  "Late Stage", "All Stages", "Early Stage", "Scale Stage"
]

const GEOGRAPHIC_FOCUS = [
  "Southeast Asia", "North America", "Europe", "Asia Pacific", "Latin America",
  "Middle East", "Africa", "Global", "Singapore", "Indonesia", "Malaysia",
  "Thailand", "Philippines", "Vietnam", "India", "China", "Japan", "Australia"
]

const INVESTMENT_SIZES = [
  "$10K - $50K", "$50K - $100K", "$100K - $500K", "$500K - $1M", 
  "$1M - $5M", "$5M - $10M", "$10M - $50M", "$50M+", "Flexible"
]

export default function CreateInvestorProfilePage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  
  const [profile, setProfile] = useState({
    // Basic Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    timezone: "",
    title: "",
    company: "",
    website: "",
    linkedin: "",
    bio: "",
    profileImage: "",
    
    // Investment Profile
    investorType: "",
    investmentSize: "",
    stageFocus: [],
    industryFocus: [],
    geographicFocus: [],
    investmentCriteria: "",
    typicalDealSize: "",
    checkSize: "",
    portfolioSize: "",
    yearsInvesting: "",
    
    // Investment Philosophy
    investmentPhilosophy: "",
    valueAdd: [],
    mentorshipAreas: [],
    boardParticipation: false,
    followOnInvestments: false,
    coInvestmentPreferences: "",
    
    // Track Record
    totalInvestments: "",
    successfulExits: "",
    currentPortfolio: "",
    notableInvestments: [],
    successStories: [],
    failureLearnings: "",
    
    // Investment Process
    dueDiligenceProcess: "",
    decisionTimeline: "",
    investmentCommittee: false,
    leadInvestor: false,
    followOnCapacity: "",
    
    // Communication Preferences
    communicationChannels: [],
    meetingPreferences: "",
    responseTime: "",
    languagePreferences: [],
    
    // Social Media & Links
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      youtube: "",
      other: []
    },
    
    // Verification Status
    status: "draft", // draft, submitted, verified, rejected
    submittedAt: null as Date | null,
    verifiedAt: null as Date | null,
    verificationNotes: ""
  })

  const steps = [
    { id: 1, title: "Personal Information", description: "Basic personal and contact details" },
    { id: 2, title: "Investment Profile", description: "Investment type, size, and focus areas" },
    { id: 3, title: "Investment Philosophy", description: "Your approach and value proposition" },
    { id: 4, title: "Track Record", description: "Investment history and achievements" },
    { id: 5, title: "Investment Process", description: "How you evaluate and make investments" },
    { id: 6, title: "Communication", description: "How you prefer to communicate" },
    { id: 7, title: "Social Links", description: "Professional and social media presence" },
    { id: 8, title: "Review & Submit", description: "Final review and submission" }
  ]

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field: string, value: string, action: 'add' | 'remove') => {
    setProfile(prev => ({
      ...prev,
      [field]: action === 'add' 
        ? [...(prev[field as keyof typeof prev] as string[] || []), value]
        : (prev[field as keyof typeof prev] as string[] || []).filter(item => item !== value)
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    toast({
      title: "Profile Saved",
      description: "Your investor profile has been saved as draft.",
    })
  }

  const handleSubmit = () => {
    setProfile(prev => ({
      ...prev,
      status: "submitted",
      submittedAt: new Date()
    }))
    
    toast({
      title: "Profile Submitted",
      description: "Your investor profile has been submitted for verification.",
    })
  }

  const getProgress = () => {
    return (currentStep / steps.length) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/network/investors" className="flex items-center text-[#0F7377] hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create Investor Profile</h1>
          <Button variant="ghost" size="sm" onClick={() => setIsPreviewMode(!isPreviewMode)}>
            <EyeIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-6 lg:py-8">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/network/investors" className="flex items-center text-[#0F7377] hover:underline mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Investors
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Create Your Investor Profile</h1>
              <p className="text-[#334155] mt-2">
                Build a comprehensive profile to connect with startups and showcase your investment focus
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsPreviewMode(!isPreviewMode)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </span>
              <span className="text-sm text-gray-500">{Math.round(getProgress())}% Complete</span>
            </div>
            <Progress value={getProgress()} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex space-x-1 mb-8">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 p-3 rounded-lg text-center cursor-pointer transition-colors ${
                  step.id === currentStep
                    ? 'bg-[#0F7377] text-white'
                    : step.id < currentStep
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className="font-medium text-sm">{step.title}</div>
                <div className="text-xs mt-1">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Progress */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <User className="h-5 w-5" />}
              {currentStep === 2 && <DollarSign className="h-5 w-5" />}
              {currentStep === 3 && <Lightbulb className="h-5 w-5" />}
              {currentStep === 4 && <TrendingUp className="h-5 w-5" />}
              {currentStep === 5 && <TargetIcon className="h-5 w-5" />}
              {currentStep === 6 && <MessageCircle className="h-5 w-5" />}
              {currentStep === 7 && <Globe className="h-5 w-5" />}
              {currentStep === 8 && <Check className="h-5 w-5" />}
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Singapore"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={profile.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GMT-8">GMT-8 (PST)</SelectItem>
                        <SelectItem value="GMT-5">GMT-5 (EST)</SelectItem>
                        <SelectItem value="GMT+0">GMT+0 (GMT)</SelectItem>
                        <SelectItem value="GMT+1">GMT+1 (CET)</SelectItem>
                        <SelectItem value="GMT+8">GMT+8 (SGT)</SelectItem>
                        <SelectItem value="GMT+9">GMT+9 (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Professional Title *</Label>
                    <Input
                      id="title"
                      value={profile.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Managing Partner, Investment Director"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company/Organization *</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Golden Gate Ventures"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Company Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.goldengate.vc"
                    />
                </div>

                <div>
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about your background, experience, and investment focus..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Investment Profile */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="investorType">Investor Type *</Label>
                  <Select value={profile.investorType} onValueChange={(value) => handleInputChange('investorType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      {INVESTOR_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investmentSize">Typical Investment Size *</Label>
                    <Select value={profile.investmentSize} onValueChange={(value) => handleInputChange('investmentSize', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select investment size" />
                      </SelectTrigger>
                      <SelectContent>
                        {INVESTMENT_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="checkSize">Check Size Range</Label>
                    <Input
                      id="checkSize"
                      value={profile.checkSize}
                      onChange={(e) => handleInputChange('checkSize', e.target.value)}
                      placeholder="e.g., $25K - $100K"
                    />
                  </div>
                </div>

                <div>
                  <Label>Stage Focus *</Label>
                  <p className="text-sm text-gray-500 mb-3">What stages do you typically invest in?</p>
                  <div className="flex flex-wrap gap-2">
                    {STAGE_FOCUS.map((stage) => (
                      <Badge
                        key={stage}
                        variant={profile.stageFocus.includes(stage) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('stageFocus', stage, profile.stageFocus.includes(stage) ? 'remove' : 'add')}
                      >
                        {stage}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Industry Focus *</Label>
                  <p className="text-sm text-gray-500 mb-3">What industries are you most interested in?</p>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((industry) => (
                      <Badge
                        key={industry}
                        variant={profile.industryFocus.includes(industry) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('industryFocus', industry, profile.industryFocus.includes(industry) ? 'remove' : 'add')}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Geographic Focus *</Label>
                  <p className="text-sm text-gray-500 mb-3">What regions do you invest in?</p>
                  <div className="flex flex-wrap gap-2">
                    {GEOGRAPHIC_FOCUS.map((region) => (
                      <Badge
                        key={region}
                        variant={profile.geographicFocus.includes(region) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('geographicFocus', region, profile.geographicFocus.includes(region) ? 'remove' : 'add')}
                      >
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="investmentCriteria">Investment Criteria</Label>
                  <Textarea
                    id="investmentCriteria"
                    value={profile.investmentCriteria}
                    onChange={(e) => handleInputChange('investmentCriteria', e.target.value)}
                    placeholder="Describe what you look for in potential investments..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentStep === steps.length ? (
                  <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-2" />
                    Submit Profile
                  </Button>
                ) : (
                  <Button onClick={nextStep}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={currentStep === steps.length ? handleSubmit : nextStep}
              className="flex-1"
            >
              {currentStep === steps.length ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Submit
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Bottom padding for mobile navigation */}
        <div className="lg:hidden h-20"></div>
      </div>
    </div>
  )
}
