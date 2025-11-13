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
  User,
  Briefcase,
  Target,
  Clock,
  DollarSign,
  Globe,
  MessageSquare,
  Star,
  Award,
  Building,
  Users,
  Lightbulb,
  Zap,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Settings,
  Upload,
  Camera,
  FileText,
  BarChart3,
  TrendingUp,
  Shield,
  Lock,
  Eye as EyeIcon,
  EyeOff
} from "lucide-react"
import Link from "next/link"

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce", "SaaS", "AI/ML", 
  "Blockchain", "Fintech", "Edtech", "Healthtech", "Cleantech", "Agtech", "PropTech",
  "Food & Beverage", "Fashion", "Entertainment", "Gaming", "Sports", "Travel", "Real Estate",
  "Manufacturing", "Logistics", "Transportation", "Energy", "Sustainability", "Social Impact"
]

const SKILLS = [
  "Product Management", "Software Development", "Data Science", "AI/ML", "UI/UX Design", 
  "Marketing", "Sales", "Business Development", "Operations", "Finance", "Accounting",
  "Legal", "HR", "Customer Success", "Growth Hacking", "Content Creation", "Branding",
  "Project Management", "Strategy", "Analytics", "Research", "Writing", "Public Speaking",
  "Leadership", "Team Building", "Fundraising", "Investor Relations", "Partnerships"
]

const WORK_STYLES = [
  "Remote-first", "Hybrid", "Office-based", "Flexible hours", "Fixed schedule", 
  "Part-time", "Full-time", "Contract", "Freelance"
]

const COMMITMENT_LEVELS = [
  "5-10 hours/week", "10-20 hours/week", "20-30 hours/week", "30-40 hours/week", 
  "40+ hours/week", "Full-time", "Part-time", "Weekends only", "Evenings only"
]

const EQUITY_PREFERENCES = [
  "Equal split (50/50)", "Based on contribution", "Based on investment", "Based on experience",
  "Based on time commitment", "Negotiable", "Open to discussion"
]

const FUNDING_EXPERIENCE = [
  "No experience", "Bootstrapped", "Angel investors", "Seed funding", "Series A", 
  "Series B+", "IPO", "Exit experience", "Multiple rounds"
]

export default function CreateCoFounderProfilePage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [profile, setProfile] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    timezone: "",
    linkedin: "",
    website: "",
    bio: "",
    profileImage: "",
    
    // Professional Background
    currentRole: "",
    company: "",
    experience: "",
    education: "",
    previousStartups: 0,
    fundingExperience: "",
    achievements: [],
    certifications: [],
    
    // Skills & Expertise
    primarySkills: [],
    secondarySkills: [],
    technicalSkills: [],
    softSkills: [],
    languages: [],
    
    // Business Interests
    interestedIndustries: [],
    problemAreas: [],
    targetMarket: "",
    businessModel: "",
    stagePreference: "",
    
    // Vision & Goals
    startupVision: "",
    problemsToSolve: "",
    longTermGoals: "",
    successMetrics: "",
    
    // Working Style
    workStyle: "",
    commitmentLevel: "",
    availability: "",
    timezone: "",
    communicationStyle: "",
    
    // Co-founder Expectations
    idealCoFounderRole: "",
    responsibilities: [],
    equityExpectations: "",
    investmentCapacity: "",
    riskTolerance: "",
    
    // Additional Information
    references: [],
    portfolio: [],
    socialMedia: {
      linkedin: "",
      twitter: "",
      github: "",
      website: "",
      instagram: "",
      facebook: "",
      youtube: "",
      tiktok: "",
      behance: "",
      dribbble: "",
      medium: "",
      substack: "",
      discord: "",
      telegram: "",
      whatsapp: "",
      skype: "",
      zoom: "",
      calendly: "",
      other: []
    },
    privacySettings: {
      showContact: true,
      showLocation: true,
      showCompany: true,
      showFunding: true,
      showSocialMedia: true
    }
  })

  const steps = [
    { id: 1, title: "Personal Info", description: "Basic information and contact details" },
    { id: 2, title: "Professional Background", description: "Experience and achievements" },
    { id: 3, title: "Skills & Expertise", description: "Technical and soft skills" },
    { id: 4, title: "Business Interests", description: "Industries and problem areas" },
    { id: 5, title: "Vision & Goals", description: "Startup vision and objectives" },
    { id: 6, title: "Working Style", description: "Preferences and availability" },
    { id: 7, title: "Co-founder Expectations", description: "What you're looking for" },
    { id: 8, title: "Social Links", description: "LinkedIn and social media profiles" },
    { id: 9, title: "Review & Publish", description: "Final review and publish" }
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
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
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
      description: "Your co-founder profile has been saved successfully!",
    })
  }

  const handlePublish = () => {
    // Save profile to localStorage (in a real app, this would be saved to a database)
    localStorage.setItem('coFounderProfile', JSON.stringify(profile))
    
    toast({
      title: "Profile Published",
      description: "Your co-founder profile is now live and discoverable!",
    })
    
    // Redirect to find cofounder page after a short delay
    setTimeout(() => {
      window.location.href = '/network/find-cofounder'
    }, 2000)
  }

  const getProgress = () => {
    return (currentStep / steps.length) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <Link href="/network/find-cofounder" className="flex items-center text-[#0F7377] hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create Profile</h1>
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
              <Link href="/network/find-cofounder" className="flex items-center text-[#0F7377] hover:underline mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Find Co-founder
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Create Your Co-founder Profile</h1>
              <p className="text-[#334155] mt-2">
                Build a comprehensive profile to find the perfect co-founder match
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
              {currentStep === 2 && <Briefcase className="h-5 w-5" />}
              {currentStep === 3 && <Target className="h-5 w-5" />}
              {currentStep === 4 && <Lightbulb className="h-5 w-5" />}
              {currentStep === 5 && <Star className="h-5 w-5" />}
              {currentStep === 6 && <Clock className="h-5 w-5" />}
              {currentStep === 7 && <Users className="h-5 w-5" />}
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
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
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
                      placeholder="City, Country"
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
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Personal Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself, your background, and what makes you unique..."
                    rows={4}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This will be the first thing potential co-founders see about you.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentRole">Current Role *</Label>
                    <Input
                      id="currentRole"
                      value={profile.currentRole}
                      onChange={(e) => handleInputChange('currentRole', e.target.value)}
                      placeholder="e.g., Software Engineer, Product Manager"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Current Company</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="e.g., Google, Microsoft, Startup Inc."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Select value={profile.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="2-3">2-3 years</SelectItem>
                      <SelectItem value="4-6">4-6 years</SelectItem>
                      <SelectItem value="7-10">7-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    value={profile.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="e.g., Stanford University - Computer Science"
                  />
                </div>

                <div>
                  <Label htmlFor="previousStartups">Previous Startups</Label>
                  <Select value={profile.previousStartups.toString()} onValueChange={(value) => handleInputChange('previousStartups', parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of previous startups" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fundingExperience">Funding Experience</Label>
                  <Select value={profile.fundingExperience} onValueChange={(value) => handleInputChange('fundingExperience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding experience" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUNDING_EXPERIENCE.map((exp) => (
                        <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Key Achievements</Label>
                  <div className="space-y-2">
                    {profile.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = [...profile.achievements]
                            newAchievements[index] = e.target.value
                            handleInputChange('achievements', newAchievements)
                          }}
                          placeholder="e.g., Forbes 30 Under 30, TechCrunch Disrupt Winner"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newAchievements = profile.achievements.filter((_, i) => i !== index)
                            handleInputChange('achievements', newAchievements)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('achievements', [...profile.achievements, ''])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Achievement
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Skills & Expertise */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Primary Skills *</Label>
                  <p className="text-sm text-gray-500 mb-3">Select your top 3-5 core competencies</p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((skill) => (
                      <Badge
                        key={skill}
                        variant={profile.primarySkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('primarySkills', skill, profile.primarySkills.includes(skill) ? 'remove' : 'add')}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Selected: {profile.primarySkills.length}/5</p>
                  </div>
                </div>

                <div>
                  <Label>Secondary Skills</Label>
                  <p className="text-sm text-gray-500 mb-3">Additional skills you possess</p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.filter(skill => !profile.primarySkills.includes(skill)).map((skill) => (
                      <Badge
                        key={skill}
                        variant={profile.secondarySkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('secondarySkills', skill, profile.secondarySkills.includes(skill) ? 'remove' : 'add')}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Technical Skills</Label>
                  <div className="space-y-2">
                    {profile.technicalSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...profile.technicalSkills]
                            newSkills[index] = e.target.value
                            handleInputChange('technicalSkills', newSkills)
                          }}
                          placeholder="e.g., React, Python, AWS, Docker"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newSkills = profile.technicalSkills.filter((_, i) => i !== index)
                            handleInputChange('technicalSkills', newSkills)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('technicalSkills', [...profile.technicalSkills, ''])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Technical Skill
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Soft Skills</Label>
                  <div className="space-y-2">
                    {profile.softSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={skill}
                          onChange={(e) => {
                            const newSkills = [...profile.softSkills]
                            newSkills[index] = e.target.value
                            handleInputChange('softSkills', newSkills)
                          }}
                          placeholder="e.g., Leadership, Communication, Problem Solving"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newSkills = profile.softSkills.filter((_, i) => i !== index)
                            handleInputChange('softSkills', newSkills)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('softSkills', [...profile.softSkills, ''])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Soft Skill
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Languages</Label>
                  <div className="space-y-2">
                    {profile.languages.map((language, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={language}
                          onChange={(e) => {
                            const newLanguages = [...profile.languages]
                            newLanguages[index] = e.target.value
                            handleInputChange('languages', newLanguages)
                          }}
                          placeholder="e.g., English (Native), Spanish (Fluent), French (Conversational)"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newLanguages = profile.languages.filter((_, i) => i !== index)
                            handleInputChange('languages', newLanguages)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('languages', [...profile.languages, ''])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Language
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Business Interests */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label>Industries of Interest *</Label>
                  <p className="text-sm text-gray-500 mb-3">Select industries you're passionate about</p>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((industry) => (
                      <Badge
                        key={industry}
                        variant={profile.interestedIndustries.includes(industry) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('interestedIndustries', industry, profile.interestedIndustries.includes(industry) ? 'remove' : 'add')}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Problem Areas You Want to Solve</Label>
                  <p className="text-sm text-gray-500 mb-3">What problems are you passionate about solving?</p>
                  <div className="space-y-2">
                    {profile.problemAreas.map((problem, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={problem}
                          onChange={(e) => {
                            const newProblems = [...profile.problemAreas]
                            newProblems[index] = e.target.value
                            handleInputChange('problemAreas', newProblems)
                          }}
                          placeholder="e.g., Climate change, Healthcare accessibility, Education inequality"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newProblems = profile.problemAreas.filter((_, i) => i !== index)
                            handleInputChange('problemAreas', newProblems)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('problemAreas', [...profile.problemAreas, ''])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Problem Area
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="targetMarket">Target Market</Label>
                  <Input
                    id="targetMarket"
                    value={profile.targetMarket}
                    onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                    placeholder="e.g., Small businesses, Enterprise, Consumers, B2B, B2C"
                  />
                </div>

                <div>
                  <Label htmlFor="businessModel">Preferred Business Model</Label>
                  <Select value={profile.businessModel} onValueChange={(value) => handleInputChange('businessModel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SaaS">SaaS (Software as a Service)</SelectItem>
                      <SelectItem value="Marketplace">Marketplace</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Freemium">Freemium</SelectItem>
                      <SelectItem value="Subscription">Subscription</SelectItem>
                      <SelectItem value="Advertising">Advertising</SelectItem>
                      <SelectItem value="Transaction">Transaction-based</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stagePreference">Startup Stage Preference</Label>
                  <Select value={profile.stagePreference} onValueChange={(value) => handleInputChange('stagePreference', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Idea">Idea Stage</SelectItem>
                      <SelectItem value="MVP">MVP Development</SelectItem>
                      <SelectItem value="Early">Early Stage</SelectItem>
                      <SelectItem value="Growth">Growth Stage</SelectItem>
                      <SelectItem value="Scale">Scale Stage</SelectItem>
                      <SelectItem value="Any">Any Stage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 5: Vision & Goals */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="startupVision">Your Startup Vision *</Label>
                  <Textarea
                    id="startupVision"
                    value={profile.startupVision}
                    onChange={(e) => handleInputChange('startupVision', e.target.value)}
                    placeholder="Describe your vision for the startup you want to build..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="problemsToSolve">Problems You Want to Solve *</Label>
                  <Textarea
                    id="problemsToSolve"
                    value={profile.problemsToSolve}
                    onChange={(e) => handleInputChange('problemsToSolve', e.target.value)}
                    placeholder="What specific problems are you passionate about solving? Why do these problems matter to you?"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="longTermGoals">Long-term Goals</Label>
                  <Textarea
                    id="longTermGoals"
                    value={profile.longTermGoals}
                    onChange={(e) => handleInputChange('longTermGoals', e.target.value)}
                    placeholder="Where do you see yourself and your startup in 5-10 years?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="successMetrics">Success Metrics</Label>
                  <Textarea
                    id="successMetrics"
                    value={profile.successMetrics}
                    onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                    placeholder="How do you measure success? (e.g., revenue, users, impact, exit)"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 6: Working Style */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="workStyle">Preferred Working Style *</Label>
                  <Select value={profile.workStyle} onValueChange={(value) => handleInputChange('workStyle', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select working style" />
                    </SelectTrigger>
                    <SelectContent>
                      {WORK_STYLES.map((style) => (
                        <SelectItem key={style} value={style}>{style}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="commitmentLevel">Time Commitment *</Label>
                  <Select value={profile.commitmentLevel} onValueChange={(value) => handleInputChange('commitmentLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select commitment level" />
                    </SelectTrigger>
                    <SelectContent>
                      {COMMITMENT_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={profile.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    placeholder="e.g., Weekdays 9-5, Evenings, Weekends, Flexible"
                  />
                </div>

                <div>
                  <Label htmlFor="communicationStyle">Communication Style</Label>
                  <Select value={profile.communicationStyle} onValueChange={(value) => handleInputChange('communicationStyle', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select communication style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Direct">Direct and straightforward</SelectItem>
                      <SelectItem value="Collaborative">Collaborative and inclusive</SelectItem>
                      <SelectItem value="Analytical">Analytical and data-driven</SelectItem>
                      <SelectItem value="Creative">Creative and innovative</SelectItem>
                      <SelectItem value="Supportive">Supportive and encouraging</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 7: Co-founder Expectations */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="idealCoFounderRole">Ideal Co-founder Role *</Label>
                  <Input
                    id="idealCoFounderRole"
                    value={profile.idealCoFounderRole}
                    onChange={(e) => handleInputChange('idealCoFounderRole', e.target.value)}
                    placeholder="e.g., Technical Co-founder, Business Co-founder, Marketing Co-founder"
                  />
                </div>

                <div>
                  <Label>Key Responsibilities You're Looking For</Label>
                  <div className="space-y-2">
                    {profile.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={responsibility}
                          onChange={(e) => {
                            const newResponsibilities = [...profile.responsibilities]
                            newResponsibilities[index] = e.target.value
                            handleInputChange('responsibilities', newResponsibilities)
                          }}
                          placeholder="e.g., Product development, Sales, Marketing, Operations"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newResponsibilities = profile.responsibilities.filter((_, i) => i !== index)
                            handleInputChange('responsibilities', newResponsibilities)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('responsibilities', [...profile.responsibilities, ''])}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Responsibility
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="equityExpectations">Equity Expectations *</Label>
                  <Select value={profile.equityExpectations} onValueChange={(value) => handleInputChange('equityExpectations', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equity preference" />
                    </SelectTrigger>
                    <SelectContent>
                      {EQUITY_PREFERENCES.map((pref) => (
                        <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="investmentCapacity">Investment Capacity</Label>
                  <Select value={profile.investmentCapacity} onValueChange={(value) => handleInputChange('investmentCapacity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="None">No investment capacity</SelectItem>
                      <SelectItem value="1K-5K">$1K - $5K</SelectItem>
                      <SelectItem value="5K-25K">$5K - $25K</SelectItem>
                      <SelectItem value="25K-100K">$25K - $100K</SelectItem>
                      <SelectItem value="100K+">$100K+</SelectItem>
                      <SelectItem value="Open">Open to discussion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Select value={profile.riskTolerance} onValueChange={(value) => handleInputChange('riskTolerance', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low - Prefer stable, proven models</SelectItem>
                      <SelectItem value="Medium">Medium - Open to calculated risks</SelectItem>
                      <SelectItem value="High">High - Comfortable with high-risk, high-reward</SelectItem>
                      <SelectItem value="Very High">Very High - Thrive on uncertainty and disruption</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 8: Social Links */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">Connect Your Social Profiles</h3>
                  <p className="text-gray-600 text-sm">
                    Add your social media links to help others connect with you across platforms
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LinkedIn */}
                  <div>
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">in</span>
                      </div>
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      value={profile.socialMedia.linkedin}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="mt-1"
                    />
                  </div>

                  {/* Twitter */}
                  <div>
                    <Label htmlFor="twitter" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">𝕏</span>
                      </div>
                      Twitter/X Profile
                    </Label>
                    <Input
                      id="twitter"
                      value={profile.socialMedia.twitter}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, twitter: e.target.value})}
                      placeholder="https://twitter.com/yourprofile"
                      className="mt-1"
                    />
                  </div>

                  {/* GitHub */}
                  <div>
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">GH</span>
                      </div>
                      GitHub Profile
                    </Label>
                    <Input
                      id="github"
                      value={profile.socialMedia.github}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, github: e.target.value})}
                      placeholder="https://github.com/yourprofile"
                      className="mt-1"
                    />
                  </div>

                  {/* Website */}
                  <div>
                    <Label htmlFor="website" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center">
                        <Globe className="w-3 h-3 text-white" />
                      </div>
                      Personal Website
                    </Label>
                    <Input
                      id="website"
                      value={profile.socialMedia.website}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, website: e.target.value})}
                      placeholder="https://yourwebsite.com"
                      className="mt-1"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <Label htmlFor="instagram" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">IG</span>
                      </div>
                      Instagram
                    </Label>
                    <Input
                      id="instagram"
                      value={profile.socialMedia.instagram}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, instagram: e.target.value})}
                      placeholder="https://instagram.com/yourprofile"
                      className="mt-1"
                    />
                  </div>

                  {/* YouTube */}
                  <div>
                    <Label htmlFor="youtube" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">YT</span>
                      </div>
                      YouTube Channel
                    </Label>
                    <Input
                      id="youtube"
                      value={profile.socialMedia.youtube}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, youtube: e.target.value})}
                      placeholder="https://youtube.com/@yourchannel"
                      className="mt-1"
                    />
                  </div>

                  {/* Medium */}
                  <div>
                    <Label htmlFor="medium" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-700 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      Medium Profile
                    </Label>
                    <Input
                      id="medium"
                      value={profile.socialMedia.medium}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, medium: e.target.value})}
                      placeholder="https://medium.com/@yourprofile"
                      className="mt-1"
                    />
                  </div>

                  {/* Discord */}
                  <div>
                    <Label htmlFor="discord" className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">D</span>
                      </div>
                      Discord
                    </Label>
                    <Input
                      id="discord"
                      value={profile.socialMedia.discord}
                      onChange={(e) => handleInputChange('socialMedia', {...profile.socialMedia, discord: e.target.value})}
                      placeholder="YourDiscord#1234"
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Additional Social Links */}
                <div>
                  <Label>Additional Social Links</Label>
                  <p className="text-sm text-gray-500 mb-3">Add any other social media profiles or professional links</p>
                  <div className="space-y-2">
                    {profile.socialMedia.other.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={link}
                          onChange={(e) => {
                            const newOther = [...profile.socialMedia.other]
                            newOther[index] = e.target.value
                            handleInputChange('socialMedia', {...profile.socialMedia, other: newOther})
                          }}
                          placeholder="https://example.com/yourprofile"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newOther = profile.socialMedia.other.filter((_, i) => i !== index)
                            handleInputChange('socialMedia', {...profile.socialMedia, other: newOther})
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('socialMedia', {...profile.socialMedia, other: [...profile.socialMedia.other, '']})}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Social Link
                    </Button>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Social Media Privacy Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showSocialMedia">Show social media links to other users</Label>
                        <p className="text-sm text-gray-500">Allow potential co-founders to see your social profiles</p>
                      </div>
                      <Checkbox
                        id="showSocialMedia"
                        checked={profile.privacySettings.showSocialMedia}
                        onCheckedChange={(checked) => 
                          handleInputChange('privacySettings', {...profile.privacySettings, showSocialMedia: checked})
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 9: Review & Publish */}
            {currentStep === 9 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Review Your Profile</h3>
                  <p className="text-gray-600">Please review your information before publishing</p>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Name</p>
                          <p className="text-gray-600">{profile.firstName} {profile.lastName}</p>
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-gray-600">{profile.location}</p>
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-gray-600">{profile.email}</p>
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-gray-600">{profile.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-medium">Bio</p>
                        <p className="text-gray-600">{profile.bio}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Professional Background</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Current Role</p>
                          <p className="text-gray-600">{profile.currentRole}</p>
                        </div>
                        <div>
                          <p className="font-medium">Experience</p>
                          <p className="text-gray-600">{profile.experience} years</p>
                        </div>
                        <div>
                          <p className="font-medium">Previous Startups</p>
                          <p className="text-gray-600">{profile.previousStartups}</p>
                        </div>
                        <div>
                          <p className="font-medium">Funding Experience</p>
                          <p className="text-gray-600">{profile.fundingExperience}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Skills & Expertise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">Primary Skills</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profile.primarySkills.map((skill) => (
                              <Badge key={skill} variant="default">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Secondary Skills</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profile.secondarySkills.map((skill) => (
                              <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Business Interests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">Industries</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {profile.interestedIndustries.map((industry) => (
                              <Badge key={industry} variant="secondary">{industry}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Target Market</p>
                          <p className="text-gray-600">{profile.targetMarket}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Working Style</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium">Work Style</p>
                          <p className="text-gray-600">{profile.workStyle}</p>
                        </div>
                        <div>
                          <p className="font-medium">Commitment Level</p>
                          <p className="text-gray-600">{profile.commitmentLevel}</p>
                        </div>
                        <div>
                          <p className="font-medium">Availability</p>
                          <p className="text-gray-600">{profile.availability}</p>
                        </div>
                        <div>
                          <p className="font-medium">Communication Style</p>
                          <p className="text-gray-600">{profile.communicationStyle}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Co-founder Expectations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">Ideal Co-founder Role</p>
                          <p className="text-gray-600">{profile.idealCoFounderRole}</p>
                        </div>
                        <div>
                          <p className="font-medium">Equity Expectations</p>
                          <p className="text-gray-600">{profile.equityExpectations}</p>
                        </div>
                        <div>
                          <p className="font-medium">Investment Capacity</p>
                          <p className="text-gray-600">{profile.investmentCapacity}</p>
                        </div>
                        <div>
                          <p className="font-medium">Risk Tolerance</p>
                          <p className="text-gray-600">{profile.riskTolerance}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Social Media & Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {profile.socialMedia.linkedin && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">in</span>
                            </div>
                            <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              LinkedIn Profile
                            </a>
                          </div>
                        )}
                        {profile.socialMedia.twitter && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-400 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">𝕏</span>
                            </div>
                            <a href={profile.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Twitter/X Profile
                            </a>
                          </div>
                        )}
                        {profile.socialMedia.github && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">GH</span>
                            </div>
                            <a href={profile.socialMedia.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              GitHub Profile
                            </a>
                          </div>
                        )}
                        {profile.socialMedia.website && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                              <Globe className="w-3 h-3 text-white" />
                            </div>
                            <a href={profile.socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Personal Website
                            </a>
                          </div>
                        )}
                        {profile.socialMedia.instagram && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">IG</span>
                            </div>
                            <a href={profile.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Instagram
                            </a>
                          </div>
                        )}
                        {profile.socialMedia.youtube && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">YT</span>
                            </div>
                            <a href={profile.socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              YouTube Channel
                            </a>
                          </div>
                        )}
                        {profile.socialMedia.medium && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">M</span>
                            </div>
                            <a href={profile.socialMedia.medium} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Medium Profile
                            </a>
                          </div>
                        )}
                        {profile.socialMedia.discord && (
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">D</span>
                            </div>
                            <span className="text-gray-600">{profile.socialMedia.discord}</span>
                          </div>
                        )}
                        {profile.socialMedia.other.filter(link => link.trim()).map((link, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center">
                              <Globe className="w-3 h-3 text-white" />
                            </div>
                            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {link}
                            </a>
                          </div>
                        ))}
                        {Object.values(profile.socialMedia).every(value => !value || (Array.isArray(value) && value.length === 0)) && (
                          <p className="text-gray-500 text-sm">No social media links added</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
                  <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-2" />
                    Publish Profile
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
              onClick={currentStep === steps.length ? handlePublish : nextStep}
              className="flex-1"
            >
              {currentStep === steps.length ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Publish
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
