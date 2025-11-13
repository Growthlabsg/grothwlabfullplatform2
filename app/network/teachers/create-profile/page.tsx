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
  Headphones,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  StopCircle,
  Record,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Copy,
  Edit,
  Trash2,
  Archive,
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
  Glasses,
  HardHat,
  Construction,
  Wrench,
  Hammer,
  Drill,
  Ruler,
  Compass as CompassIcon,
  Map,
  Navigation,
  Route,
  MapPin as MapPinIcon,
  Pin,
  Flag as FlagIcon2,
  Crosshair,
  Target as TargetIcon2,
  Focus,
  ZoomIn,
  ZoomOut,
  Move,
  Move3D,
  Rotate3D,
  Scale,
  Expand,
  Plus as PlusIcon,
  Minus,
  Percent,
  Infinity,
  Pi,
  Sigma,
  Book,
  PenTool,
  Pencil,
  Eraser,
  Highlighter,
  Ruler as RulerIcon,
  Calculator,
  Microscope,
  FlaskConical,
  Atom,
  Dna,
  TestTube,
  Beaker,
  Flask,
  Pipette,
  Thermometer,
  Gauge,
  BarChart,
  LineChart,
  PieChart as PieChartIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon,
  Zap as ZapIcon2,
  Lightbulb as LightbulbIcon,
  Target as TargetIcon3,
  Compass as CompassIcon2,
  Rocket as RocketIcon,
  Shield as ShieldIcon2,
  Sparkles as SparklesIcon,
  Trophy as TrophyIcon,
  UserCheck as UserCheckIcon,
  Workflow as WorkflowIcon,
  Headphones as HeadphonesIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  StopCircle as StopCircleIcon,
  Record as RecordIcon,
  Download as DownloadIcon2,
  Upload as UploadIcon2,
  Copy as CopyIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Archive as ArchiveIcon,
  Flag as FlagIcon3,
  MoreHorizontal as MoreHorizontalIcon,
  MoreVertical as MoreVerticalIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowUp as ArrowUpIcon,
  ArrowDown as ArrowDownIcon,
  Maximize2 as Maximize2Icon,
  Minimize2 as Minimize2Icon,
  RotateCcw as RotateCcwIcon,
  Grid as GridIcon,
  List as ListIcon,
  Layout as LayoutIcon,
  Sidebar as SidebarIcon,
  PanelLeft as PanelLeftIcon,
  PanelRight as PanelRightIcon,
  Split as SplitIcon,
  Columns as ColumnsIcon,
  Rows as RowsIcon,
  Square as SquareIcon,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Hexagon as HexagonIcon,
  Octagon as OctagonIcon,
  Diamond as DiamondIcon,
  Star as StarIcon2,
  Heart as HeartIcon2,
  Smile as SmileIcon,
  Frown as FrownIcon,
  Meh as MehIcon,
  Laugh as LaughIcon,
  Angry as AngryIcon,
  Glasses as GlassesIcon,
  HardHat as HardHatIcon,
  Construction as ConstructionIcon,
  Wrench as WrenchIcon,
  Hammer as HammerIcon,
  Drill as DrillIcon,
  Ruler as RulerIcon2,
  Compass as CompassIcon3,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Route as RouteIcon,
  MapPin as MapPinIcon2,
  Pin as PinIcon,
  Flag as FlagIcon4,
  Crosshair as CrosshairIcon,
  Target as TargetIcon4,
  Focus as FocusIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  Move3D as Move3DIcon,
  Rotate3D as Rotate3DIcon,
  Scale as ScaleIcon,
  Expand as ExpandIcon,
  Plus as PlusIcon2,
  Minus as MinusIcon,
  Percent as PercentIcon,
  Infinity as InfinityIcon,
  Pi as PiIcon,
  Sigma as SigmaIcon
} from "lucide-react"
import Link from "next/link"

const TEACHER_TYPES = [
  "University Professor", "Industry Expert", "Online Instructor", "Corporate Trainer", 
  "Workshop Facilitator", "Course Creator", "Educational Consultant", "Academic Advisor",
  "Research Mentor", "Thesis Supervisor", "Guest Lecturer", "Visiting Professor"
]

const SUBJECT_AREAS = [
  "Computer Science", "Business Administration", "Engineering", "Mathematics", "Physics", 
  "Chemistry", "Biology", "Economics", "Psychology", "Sociology", "Literature", "History",
  "Art & Design", "Music", "Languages", "Philosophy", "Political Science", "Law",
  "Medicine", "Nursing", "Education", "Architecture", "Environmental Science", "Data Science",
  "Artificial Intelligence", "Machine Learning", "Cybersecurity", "Software Engineering",
  "Digital Marketing", "Finance", "Accounting", "Management", "Entrepreneurship"
]

const TEACHING_METHODS = [
  "Lecture-based", "Interactive Discussion", "Case Study Analysis", "Project-based Learning",
  "Hands-on Workshops", "Online Learning", "Blended Learning", "Flipped Classroom",
  "Peer Learning", "Mentorship", "One-on-One Tutoring", "Group Projects"
]

const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 years)", "Mid Level (3-5 years)", "Senior Level (6-10 years)",
  "Expert Level (11-15 years)", "Master Level (16+ years)", "Retired Professor"
]

const TIME_COMMITMENTS = [
  "1-2 hours per week", "3-5 hours per week", "6-10 hours per week",
  "11-20 hours per week", "20+ hours per week", "As needed", "Course-based"
]

const EDUCATION_LEVELS = [
  "High School", "Associate Degree", "Bachelor's Degree", "Master's Degree",
  "Doctorate (PhD)", "Professional Degree", "Certificate Program", "Continuing Education"
]

export default function CreateTeacherProfilePage() {
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
    institution: "",
    website: "",
    linkedin: "",
    bio: "",
    profileImage: "",
    
    // Professional Background
    teacherType: "",
    subjectAreas: [],
    teachingMethods: [],
    experienceLevel: "",
    yearsTeaching: "",
    currentPosition: "",
    previousPositions: [],
    education: [],
    certifications: [],
    achievements: [],
    
    // Teaching Profile
    teachingPhilosophy: "",
    teachingGoals: [],
    studentLevels: [],
    classSizes: [],
    timeCommitment: "",
    hourlyRate: "",
    availability: [],
    sessionTypes: [],
    maxStudents: "",
    
    // Skills & Expertise
    technicalSkills: [],
    softSkills: [],
    languages: [],
    tools: [],
    methodologies: [],
    researchAreas: [],
    
    // Teaching Approach
    teachingStyle: "",
    valueProposition: "",
    teachingProcess: "",
    expectations: "",
    communicationStyle: "",
    assessmentMethods: [],
    
    // Availability & Preferences
    timeSlots: [],
    preferredDays: [],
    sessionDuration: "",
    meetingFormat: [],
    responseTime: "",
    timezone: "",
    
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
    { id: 2, title: "Professional Background", description: "Your teaching career and experience" },
    { id: 3, title: "Teaching Profile", description: "Your teaching approach and style" },
    { id: 4, title: "Skills & Expertise", description: "Your skills and areas of expertise" },
    { id: 5, title: "Teaching Approach", description: "Your teaching philosophy and process" },
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
      description: "Your teacher profile has been saved as draft.",
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
      description: "Your teacher profile has been submitted for verification.",
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
          <Link href="/network/teachers" className="flex items-center text-[#0F7377] hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create Teacher Profile</h1>
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
              <Link href="/network/teachers" className="flex items-center text-[#0F7377] hover:underline mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Teachers
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Create Your Teacher Profile</h1>
              <p className="text-[#334155] mt-2">
                Share your knowledge and help others learn by becoming a teacher
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
              {currentStep === 3 && <BookOpen className="h-5 w-5" />}
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
                      placeholder="Professor, Lecturer, Instructor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="institution">Institution *</Label>
                    <Input
                      id="institution"
                      value={profile.institution}
                      onChange={(e) => handleInputChange('institution', e.target.value)}
                      placeholder="National University of Singapore"
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
                    placeholder="Tell us about your background, experience, and what makes you a great teacher..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Professional Background */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="teacherType">Teacher Type *</Label>
                  <Select value={profile.teacherType} onValueChange={(value) => handleInputChange('teacherType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your teacher type" />
                    </SelectTrigger>
                    <SelectContent>
                      {TEACHER_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Subject Areas *</Label>
                  <p className="text-sm text-gray-500 mb-3">What subjects do you teach?</p>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECT_AREAS.map((subject) => (
                      <Badge
                        key={subject}
                        variant={profile.subjectAreas.includes(subject) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('subjectAreas', subject, profile.subjectAreas.includes(subject) ? 'remove' : 'add')}
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Teaching Methods *</Label>
                  <p className="text-sm text-gray-500 mb-3">How do you prefer to teach?</p>
                  <div className="flex flex-wrap gap-2">
                    {TEACHING_METHODS.map((method) => (
                      <Badge
                        key={method}
                        variant={profile.teachingMethods.includes(method) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('teachingMethods', method, profile.teachingMethods.includes(method) ? 'remove' : 'add')}
                      >
                        {method}
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
                    <Label htmlFor="yearsTeaching">Years of Teaching *</Label>
                    <Input
                      id="yearsTeaching"
                      value={profile.yearsTeaching}
                      onChange={(e) => handleInputChange('yearsTeaching', e.target.value)}
                      placeholder="e.g., 10+ years"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentPosition">Current Position *</Label>
                  <Input
                    id="currentPosition"
                    value={profile.currentPosition}
                    onChange={(e) => handleInputChange('currentPosition', e.target.value)}
                    placeholder="e.g., Associate Professor of Computer Science"
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education Background</Label>
                  <Textarea
                    id="education"
                    value={profile.education.join('\n')}
                    onChange={(e) => handleInputChange('education', e.target.value.split('\n').filter(item => item.trim() !== ''))}
                    placeholder="List your educational qualifications, one per line..."
                    rows={4}
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

            {/* Step 3: Teaching Profile */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="teachingPhilosophy">Teaching Philosophy *</Label>
                  <Textarea
                    id="teachingPhilosophy"
                    value={profile.teachingPhilosophy}
                    onChange={(e) => handleInputChange('teachingPhilosophy', e.target.value)}
                    placeholder="Describe your approach to teaching and learning..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Student Levels *</Label>
                  <p className="text-sm text-gray-500 mb-3">What levels do you teach?</p>
                  <div className="flex flex-wrap gap-2">
                    {EDUCATION_LEVELS.map((level) => (
                      <Badge
                        key={level}
                        variant={profile.studentLevels.includes(level) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('studentLevels', level, profile.studentLevels.includes(level) ? 'remove' : 'add')}
                      >
                        {level}
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
                      placeholder="e.g., $50/hour"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxStudents">Maximum Students</Label>
                    <Input
                      id="maxStudents"
                      value={profile.maxStudents}
                      onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                      placeholder="e.g., 30 students"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sessionDuration">Session Duration</Label>
                    <Input
                      id="sessionDuration"
                      value={profile.sessionDuration}
                      onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
                      placeholder="e.g., 90 minutes"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="teachingGoals">Teaching Goals</Label>
                  <Textarea
                    id="teachingGoals"
                    value={profile.teachingGoals.join('\n')}
                    onChange={(e) => handleInputChange('teachingGoals', e.target.value.split('\n').filter(item => item.trim() !== ''))}
                    placeholder="What do you hope to achieve through teaching? What impact do you want to make?"
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
