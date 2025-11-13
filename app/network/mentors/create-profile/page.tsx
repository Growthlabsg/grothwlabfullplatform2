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
  CheckCircle,
  AlertCircle,
  Building,
  CreditCard,
  Handshake,
  Lightbulb,
  Target as TargetIcon,
  Zap as ZapIcon,
  GraduationCap,
  BookOpen,
  Brain,
  Compass,
  Rocket,
  Shield as ShieldIcon,
  Sparkles,
  Trophy,
  UserCheck,
  Workflow,
  MessageSquare,
  Video,
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  StopCircle,
  Record,
  Download,
  Upload as UploadIcon,
  Share2,
  Copy,
  Edit,
  Trash2,
  Archive,
  Flag,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Flag as FlagIcon,
  MoreHorizontal,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize2,
  Minimize2,
  RotateCcw,
  RefreshCw,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  Split,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Star as StarIcon,
  Heart as HeartIcon,
  Smile,
  Frown,
  Meh,
  Laugh,
  Angry,
  Surprised,
  Confused,
  Wink,
  Tongue,
  Kiss,
  Wink2,
  Dizzy,
  Expressionless,
  RollingEyes,
  Thinking,
  Sleeping,
  Mask,
  Sunglasses,
  Glasses,
  Monocle,
  EyePatch,
  Blindfold,
  Goggles,
  Safety,
  HardHat,
  Construction,
  Wrench,
  Hammer,
  Screwdriver,
  Saw,
  Drill,
  Level,
  Ruler,
  Compass as CompassIcon,
  Map,
  Navigation,
  Route,
  MapPin as MapPinIcon,
  Location,
  Pin,
  Flag as FlagIcon2,
  Marker,
  Crosshair,
  Target as TargetIcon2,
  Bullseye,
  Aim,
  Focus,
  Zoom,
  ZoomIn,
  ZoomOut,
  Move,
  Move3D,
  Rotate,
  Flip,
  Mirror,
  Reflect,
  Transform,
  Resize,
  Scale,
  Stretch,
  Squash,
  Squeeze,
  Expand,
  Contract,
  Grow,
  Shrink,
  Enlarge,
  Reduce,
  Increase,
  Decrease,
  Add,
  Subtract,
  Multiply,
  Divide,
  Equals,
  NotEqual,
  GreaterThan,
  LessThan,
  GreaterThanOrEqual,
  LessThanOrEqual,
  Plus as PlusIcon,
  Minus,
  Times,
  Divide as DivideIcon,
  Percent,
  Infinity,
  Pi,
  Sigma,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega
} from "lucide-react"
import Link from "next/link"

const MENTOR_TYPES = [
  "Business Mentor", "Technical Mentor", "Career Coach", "Industry Expert", 
  "Startup Advisor", "Leadership Coach", "Marketing Expert", "Sales Coach",
  "Finance Advisor", "Legal Advisor", "Product Mentor", "Design Mentor",
  "Operations Expert", "HR Specialist", "Growth Hacker", "Investment Advisor"
]

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance", "Education", "E-commerce", "SaaS", "AI/ML", 
  "Blockchain", "Fintech", "Edtech", "Healthtech", "Cleantech", "Agtech", "PropTech",
  "Food & Beverage", "Fashion", "Entertainment", "Gaming", "Sports", "Travel", "Real Estate",
  "Manufacturing", "Logistics", "Transportation", "Energy", "Sustainability", "Social Impact"
]

const EXPERTISE_AREAS = [
  "Product Strategy", "Go-to-Market", "Fundraising", "Team Building", "Leadership",
  "Marketing", "Sales", "Operations", "Finance", "Legal", "Technology", "Design",
  "Customer Success", "Business Development", "Partnerships", "International Expansion",
  "Mergers & Acquisitions", "IPO Preparation", "Crisis Management", "Digital Transformation"
]

const MENTORING_STYLES = [
  "One-on-One Sessions", "Group Workshops", "Online Mentoring", "In-Person Meetings",
  "Phone Calls", "Video Calls", "Email Support", "Document Review", "Project Guidance",
  "Career Counseling", "Skill Development", "Goal Setting", "Accountability Partner"
]

const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 years)", "Mid Level (3-5 years)", "Senior Level (6-10 years)",
  "Executive Level (11-15 years)", "C-Level (16+ years)", "Retired Executive"
]

const TIME_COMMITMENTS = [
  "1-2 hours per week", "3-5 hours per week", "6-10 hours per week",
  "11-20 hours per week", "20+ hours per week", "As needed", "Project-based"
]

export default function CreateMentorProfilePage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  
  const [profile, setProfile] = useState({
    // Personal Information
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
    
    // Professional Background
    mentorType: "",
    industryExperience: [],
    expertiseAreas: [],
    experienceLevel: "",
    yearsExperience: "",
    currentRole: "",
    previousRoles: [],
    achievements: [],
    certifications: [],
    
    // Mentoring Profile
    mentoringStyle: [],
    timeCommitment: "",
    hourlyRate: "",
    availability: [],
    sessionTypes: [],
    maxMentees: "",
    mentoringGoals: "",
    successStories: [],
    
    // Skills & Expertise
    technicalSkills: [],
    softSkills: [],
    languages: [],
    tools: [],
    methodologies: [],
    
    // Mentoring Approach
    mentoringPhilosophy: "",
    valueProposition: "",
    mentoringProcess: "",
    expectations: "",
    communicationStyle: "",
    
    // Availability & Preferences
    timeSlots: [],
    preferredDays: [],
    sessionDuration: "",
    meetingFormat: [],
    responseTime: "",
    
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
    { id: 2, title: "Professional Background", description: "Your career and experience" },
    { id: 3, title: "Mentoring Profile", description: "Your mentoring approach and style" },
    { id: 4, title: "Skills & Expertise", description: "Your skills and areas of expertise" },
    { id: 5, title: "Mentoring Approach", description: "Your mentoring philosophy and process" },
    { id: 6, title: "Availability", description: "When and how you're available" },
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
      description: "Your mentor profile has been saved as draft.",
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
      description: "Your mentor profile has been submitted for verification.",
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
          <Link href="/network/mentors" className="flex items-center text-[#0F7377] hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create Mentor Profile</h1>
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
              <Link href="/network/mentors" className="flex items-center text-[#0F7377] hover:underline mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Mentors
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Create Your Mentor Profile</h1>
              <p className="text-[#334155] mt-2">
                Share your expertise and help others grow by becoming a mentor
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
              {currentStep === 3 && <GraduationCap className="h-5 w-5" />}
              {currentStep === 4 && <Target className="h-5 w-5" />}
              {currentStep === 5 && <Lightbulb className="h-5 w-5" />}
              {currentStep === 6 && <Calendar className="h-5 w-5" />}
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
                      placeholder="Senior Product Manager, CTO"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Current Company *</Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Google, Microsoft"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Personal Website</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.johndoe.com"
                    />
                </div>

                <div>
                  <Label htmlFor="bio">Professional Bio *</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about your background, experience, and what makes you a great mentor..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="mentorType">Mentor Type *</Label>
                  <Select value={profile.mentorType} onValueChange={(value) => handleInputChange('mentorType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your mentor type" />
                    </SelectTrigger>
                    <SelectContent>
                      {MENTOR_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Industry Experience *</Label>
                  <p className="text-sm text-gray-500 mb-3">What industries have you worked in?</p>
                  <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((industry) => (
                      <Badge
                        key={industry}
                        variant={profile.industryExperience.includes(industry) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('industryExperience', industry, profile.industryExperience.includes(industry) ? 'remove' : 'add')}
                      >
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Expertise Areas *</Label>
                  <p className="text-sm text-gray-500 mb-3">What areas can you mentor in?</p>
                  <div className="flex flex-wrap gap-2">
                    {EXPERTISE_AREAS.map((area) => (
                      <Badge
                        key={area}
                        variant={profile.expertiseAreas.includes(area) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('expertiseAreas', area, profile.expertiseAreas.includes(area) ? 'remove' : 'add')}
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experienceLevel">Experience Level *</Label>
                    <Select value={profile.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience *</Label>
                    <Input
                      id="yearsExperience"
                      value={profile.yearsExperience}
                      onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                      placeholder="e.g., 10+ years"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentRole">Current Role *</Label>
                  <Input
                    id="currentRole"
                    value={profile.currentRole}
                    onChange={(e) => handleInputChange('currentRole', e.target.value)}
                    placeholder="e.g., Senior Product Manager at Google"
                  />
                </div>

                <div>
                  <Label htmlFor="achievements">Key Achievements</Label>
                  <Textarea
                    id="achievements"
                    value={profile.achievements.join('\n')}
                    onChange={(e) => handleInputChange('achievements', e.target.value.split('\n').filter(item => item.trim() !== ''))}
                    placeholder="List your key achievements, one per line..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Mentoring Profile */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Mentoring Style *</Label>
                  <p className="text-sm text-gray-500 mb-3">How do you prefer to mentor?</p>
                  <div className="flex flex-wrap gap-2">
                    {MENTORING_STYLES.map((style) => (
                      <Badge
                        key={style}
                        variant={profile.mentoringStyle.includes(style) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('mentoringStyle', style, profile.mentoringStyle.includes(style) ? 'remove' : 'add')}
                      >
                        {style}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeCommitment">Time Commitment *</Label>
                    <Select value={profile.timeCommitment} onValueChange={(value) => handleInputChange('timeCommitment', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time commitment" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_COMMITMENTS.map((commitment) => (
                          <SelectItem key={commitment} value={commitment}>{commitment}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (Optional)</Label>
                    <Input
                      id="hourlyRate"
                      value={profile.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      placeholder="e.g., $100/hour"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxMentees">Maximum Mentees</Label>
                    <Input
                      id="maxMentees"
                      value={profile.maxMentees}
                      onChange={(e) => handleInputChange('maxMentees', e.target.value)}
                      placeholder="e.g., 5 mentees"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionDuration">Session Duration</Label>
                    <Input
                      id="sessionDuration"
                      value={profile.sessionDuration}
                      onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
                      placeholder="e.g., 60 minutes"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mentoringGoals">Mentoring Goals</Label>
                  <Textarea
                    id="mentoringGoals"
                    value={profile.mentoringGoals}
                    onChange={(e) => handleInputChange('mentoringGoals', e.target.value)}
                    placeholder="What do you hope to achieve through mentoring? What impact do you want to make?"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="successStories">Success Stories</Label>
                  <Textarea
                    id="successStories"
                    value={profile.successStories.join('\n')}
                    onChange={(e) => handleInputChange('successStories', e.target.value.split('\n').filter(item => item.trim() !== ''))}
                    placeholder="Share stories of mentees you've helped succeed, one per line..."
                    rows={4}
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
