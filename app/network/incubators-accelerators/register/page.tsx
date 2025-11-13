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
  EyeOff
} from "lucide-react"
import Link from "next/link"

const PROGRAM_TYPES = [
  "Accelerator", "Incubator", "Pre-Accelerator", "Corporate Accelerator", 
  "University Incubator", "Government Program", "Private Program", "Hybrid Program"
]

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce", "SaaS", "AI/ML", 
  "Blockchain", "Fintech", "Edtech", "Healthtech", "Cleantech", "Agtech", "PropTech",
  "Food & Beverage", "Fashion", "Entertainment", "Gaming", "Sports", "Travel", "Real Estate",
  "Manufacturing", "Logistics", "Transportation", "Energy", "Sustainability", "Social Impact"
]

const FUNDING_TYPES = [
  "Equity Investment", "Grant Funding", "Convertible Note", "Revenue Share", 
  "No Funding", "Mentorship Only", "Hybrid Model", "Other"
]

const DURATION_OPTIONS = [
  "1-3 months", "3-6 months", "6-9 months", "9-12 months", 
  "12+ months", "Ongoing", "Flexible", "Cohort-based"
]

const STAGE_FOCUS = [
  "Idea Stage", "MVP Development", "Early Stage", "Growth Stage", 
  "Scale Stage", "All Stages", "Pre-Seed", "Seed", "Series A+"
]

export default function RegisterProgramPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  
  const [program, setProgram] = useState({
    // Basic Information
    programName: "",
    organizationName: "",
    programType: "",
    website: "",
    email: "",
    phone: "",
    location: "",
    timezone: "",
    foundedYear: "",
    description: "",
    logo: "",
    
    // Program Details
    programDuration: "",
    cohortSize: "",
    applicationDeadline: "",
    programStartDate: "",
    programEndDate: "",
    targetIndustries: [],
    stageFocus: [],
    fundingType: "",
    fundingAmount: "",
    equityPercentage: "",
    grantAmount: "",
    
    // Program Structure
    programObjectives: "",
    curriculum: [],
    mentorshipProgram: "",
    networkingOpportunities: "",
    demoDay: false,
    pitchCompetition: false,
    investorConnections: false,
    
    // Success Metrics
    successMetrics: [],
    alumniCount: "",
    fundingRaised: "",
    successRate: "",
    notableAlumni: [],
    caseStudies: [],
    
    // Team & Resources
    teamSize: "",
    keyPersonnel: [],
    mentors: [],
    partners: [],
    resources: [],
    
    // Application Process
    applicationRequirements: [],
    selectionCriteria: "",
    applicationProcess: "",
    interviewProcess: "",
    acceptanceRate: "",
    
    // Communication & Support
    communicationChannels: [],
    supportProvided: [],
    postProgramSupport: "",
    alumniNetwork: "",
    
    // Legal & Compliance
    legalStructure: "",
    complianceRequirements: [],
    intellectualProperty: "",
    confidentiality: "",
    
    // Additional Information
    socialMedia: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
      youtube: "",
      other: []
    },
    documents: [],
    references: [],
    testimonials: [],
    
    // Vetting Status
    status: "draft", // draft, submitted, under_review, approved, rejected
    submittedAt: null as Date | null,
    reviewedBy: null as string | null,
    reviewNotes: "",
    approvedAt: null as Date | null
  })

  const steps = [
    { id: 1, title: "Basic Information", description: "Program and organization details" },
    { id: 2, title: "Program Details", description: "Duration, funding, and focus areas" },
    { id: 3, title: "Program Structure", description: "Curriculum and program offerings" },
    { id: 4, title: "Success Metrics", description: "Track record and achievements" },
    { id: 5, title: "Team & Resources", description: "Team and available resources" },
    { id: 6, title: "Application Process", description: "How startups apply and get selected" },
    { id: 7, title: "Communication", description: "Support and communication channels" },
    { id: 8, title: "Legal & Compliance", description: "Legal structure and requirements" },
    { id: 9, title: "Review & Submit", description: "Final review and submission" }
  ]

  const handleInputChange = (field: string, value: any) => {
    setProgram(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field: string, value: string, action: 'add' | 'remove') => {
    setProgram(prev => ({
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
      title: "Program Saved",
      description: "Your program registration has been saved as draft.",
    })
  }

  const handleSubmit = () => {
    setProgram(prev => ({
      ...prev,
      status: "submitted",
      submittedAt: new Date()
    }))
    
    toast({
      title: "Program Submitted",
      description: "Your program has been submitted for review. A GrowthLab employee will vet and approve it before it goes live.",
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
          <Link href="/network/incubators-accelerators" className="flex items-center text-[#0F7377] hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Register Program</h1>
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
              <Link href="/network/incubators-accelerators" className="flex items-center text-[#0F7377] hover:underline mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Incubators & Accelerators
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Register Your Program</h1>
              <p className="text-[#334155] mt-2">
                Create a comprehensive profile for your incubator or accelerator program
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
              {currentStep === 1 && <Building2 className="h-5 w-5" />}
              {currentStep === 2 && <Target className="h-5 w-5" />}
              {currentStep === 3 && <FileText className="h-5 w-5" />}
              {currentStep === 4 && <TrendingUp className="h-5 w-5" />}
              {currentStep === 5 && <Users className="h-5 w-5" />}
              {currentStep === 6 && <Calendar className="h-5 w-5" />}
              {currentStep === 7 && <MessageCircle className="h-5 w-5" />}
              {currentStep === 8 && <Shield className="h-5 w-5" />}
              {currentStep === 9 && <Check className="h-5 w-5" />}
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="programName">Program Name *</Label>
                    <Input
                      id="programName"
                      value={program.programName}
                      onChange={(e) => handleInputChange('programName', e.target.value)}
                      placeholder="e.g., GrowthLab Accelerator"
                    />
                  </div>
                  <div>
                    <Label htmlFor="organizationName">Organization Name *</Label>
                    <Input
                      id="organizationName"
                      value={program.organizationName}
                      onChange={(e) => handleInputChange('organizationName', e.target.value)}
                      placeholder="e.g., GrowthLab Pte Ltd"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="programType">Program Type *</Label>
                    <Select value={program.programType} onValueChange={(value) => handleInputChange('programType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select program type" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROGRAM_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                      id="foundedYear"
                      value={program.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      placeholder="e.g., 2020"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website *</Label>
                    <Input
                      id="website"
                      value={program.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://yourprogram.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Contact Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={program.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contact@yourprogram.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={program.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={program.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={program.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
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

                <div>
                  <Label htmlFor="description">Program Description *</Label>
                  <Textarea
                    id="description"
                    value={program.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your program, its mission, and what makes it unique..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Program Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="programDuration">Program Duration *</Label>
                    <Select value={program.programDuration} onValueChange={(value) => handleInputChange('programDuration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATION_OPTIONS.map((duration) => (
                          <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="cohortSize">Cohort Size</Label>
                    <Input
                      id="cohortSize"
                      value={program.cohortSize}
                      onChange={(e) => handleInputChange('cohortSize', e.target.value)}
                      placeholder="e.g., 10-15 startups"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="applicationDeadline">Application Deadline</Label>
                    <Input
                      id="applicationDeadline"
                      type="date"
                      value={program.applicationDeadline}
                      onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="programStartDate">Program Start Date</Label>
                    <Input
                      id="programStartDate"
                      type="date"
                      value={program.programStartDate}
                      onChange={(e) => handleInputChange('programStartDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Target Industries *</Label>
                  <p className="text-sm text-gray-500 mb-3">Select industries your program focuses on</p>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((industry) => (
                      <Badge
                        key={industry}
                        variant={program.targetIndustries.includes(industry) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('targetIndustries', industry, program.targetIndustries.includes(industry) ? 'remove' : 'add')}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Stage Focus *</Label>
                  <p className="text-sm text-gray-500 mb-3">What stage of startups do you focus on?</p>
                  <div className="flex flex-wrap gap-2">
                    {STAGE_FOCUS.map((stage) => (
                      <Badge
                        key={stage}
                        variant={program.stageFocus.includes(stage) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('stageFocus', stage, program.stageFocus.includes(stage) ? 'remove' : 'add')}
                      >
                        {stage}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="fundingType">Funding Type *</Label>
                  <Select value={program.fundingType} onValueChange={(value) => handleInputChange('fundingType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding type" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUNDING_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fundingAmount">Funding Amount</Label>
                    <Input
                      id="fundingAmount"
                      value={program.fundingAmount}
                      onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
                      placeholder="e.g., $50,000 - $100,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="equityPercentage">Equity Percentage</Label>
                    <Input
                      id="equityPercentage"
                      value={program.equityPercentage}
                      onChange={(e) => handleInputChange('equityPercentage', e.target.value)}
                      placeholder="e.g., 5-10%"
                    />
                  </div>
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
                    Submit for Review
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