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
  Building,
  Building2,
  Factory,
  Warehouse,
  Store,
  ShoppingCart,
  CreditCard,
  Banknote,
  Coins,
  PiggyBank,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart,
  LineChart,
  PieChart as PieChartIcon,
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
  Ruler as RulerIcon,
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
  Sigma as SigmaIcon,
  Gavel,
  Landmark,
  Scale,
  FileText as FileTextIcon,
  Users2,
  CheckCircle,
  AlertCircle,
  Info,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Building as BuildingIcon,
  Shield as ShieldIcon3,
  Award as AwardIcon,
  Star as StarIcon3,
  MessageSquare as MessageSquareIcon,
  Send,
  Plus as PlusIcon3,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoreHorizontal as MoreHorizontalIcon2,
  ThumbsUp,
  ThumbsDown,
  Flag as FlagIcon5,
  Bookmark,
  Share2,
  PieChart as PieChartIcon2,
  TrendingDown as TrendingDownIcon,
  Activity as ActivityIcon2,
  Handshake as HandshakeIcon,
  Lightbulb as LightbulbIcon2,
  Target as TargetIcon5,
  Zap as ZapIcon3,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Brain as BrainIcon,
  Compass as CompassIcon4,
  Rocket as RocketIcon2,
  Shield as ShieldIcon4,
  Sparkles as SparklesIcon2,
  Trophy as TrophyIcon2,
  UserCheck as UserCheckIcon2,
  Workflow as WorkflowIcon2,
  Headphones as HeadphonesIcon2,
  Mic as MicIcon2,
  MicOff as MicOffIcon2,
  Volume2 as Volume2Icon2,
  VolumeX as VolumeXIcon2,
  Play as PlayIcon2,
  Pause as PauseIcon2,
  StopCircle as StopCircleIcon2,
  Record as RecordIcon2,
  Download as DownloadIcon3,
  Upload as UploadIcon3,
  Copy as CopyIcon2,
  Edit as EditIcon2,
  Trash2 as Trash2Icon2,
  Archive as ArchiveIcon2,
  Flag as FlagIcon6,
  MoreVertical as MoreVerticalIcon2,
  ChevronDown as ChevronDownIcon2,
  ChevronUp as ChevronUpIcon2,
  ArrowRight as ArrowRightIcon2,
  ArrowLeft as ArrowLeftIcon2,
  ArrowUp as ArrowUpIcon2,
  ArrowDown as ArrowDownIcon2,
  Maximize2 as Maximize2Icon2,
  Minimize2 as Minimize2Icon2,
  RotateCcw as RotateCcwIcon2,
  Grid as GridIcon2,
  List as ListIcon2,
  Layout as LayoutIcon2,
  Sidebar as SidebarIcon2,
  PanelLeft as PanelLeftIcon2,
  PanelRight as PanelRightIcon2,
  Split as SplitIcon2,
  Columns as ColumnsIcon2,
  Rows as RowsIcon2,
  Square as SquareIcon2,
  Circle as CircleIcon2,
  Triangle as TriangleIcon2,
  Hexagon as HexagonIcon2,
  Octagon as OctagonIcon2,
  Diamond as DiamondIcon2,
  Star as StarIcon4,
  Heart as HeartIcon2,
  Smile as SmileIcon2,
  Frown as FrownIcon2,
  Meh as MehIcon2,
  Laugh as LaughIcon2,
  Angry as AngryIcon2,
  Glasses as GlassesIcon2,
  HardHat as HardHatIcon2,
  Construction as ConstructionIcon2,
  Wrench as WrenchIcon2,
  Hammer as HammerIcon2,
  Drill as DrillIcon2,
  Ruler as RulerIcon2,
  Compass as CompassIcon5,
  Map as MapIcon2,
  Navigation as NavigationIcon2,
  Route as RouteIcon2,
  MapPin as MapPinIcon3,
  Pin as PinIcon2,
  Flag as FlagIcon7,
  Crosshair as CrosshairIcon2,
  Target as TargetIcon6,
  Focus as FocusIcon2,
  ZoomIn as ZoomInIcon2,
  ZoomOut as ZoomOutIcon2,
  Move as MoveIcon2,
  Move3D as Move3DIcon2,
  Rotate3D as Rotate3DIcon2,
  Scale as ScaleIcon2,
  Expand as ExpandIcon2,
  Plus as PlusIcon4,
  Minus as MinusIcon2,
  Percent as PercentIcon2,
  Infinity as InfinityIcon2,
  Pi as PiIcon2,
  Sigma as SigmaIcon2
} from "lucide-react"
import Link from "next/link"

const AGENCY_TYPES = [
  "Federal Agency", "State Agency", "Local Government", "Municipal Agency", 
  "Regulatory Body", "Economic Development Agency", "Innovation Hub", "Research Institute",
  "Policy Institute", "Advisory Board", "Commission", "Department",
  "Ministry", "Bureau", "Office", "Authority"
]

const SECTORS = [
  "Technology & Innovation", "Economic Development", "Healthcare", "Education", 
  "Environment & Sustainability", "Transportation", "Housing", "Finance & Banking",
  "Agriculture", "Manufacturing", "Energy", "Telecommunications", "Defense & Security",
  "Social Services", "Public Safety", "Tourism", "Sports & Recreation", "Culture & Arts"
]

const PROGRAMS_TYPES = [
  "Grant Programs", "Loan Programs", "Tax Incentives", "Regulatory Support",
  "Technical Assistance", "Training Programs", "Mentorship Programs", "Incubation Programs",
  "Acceleration Programs", "Research Funding", "Pilot Programs", "Demonstration Projects",
  "Partnership Programs", "Export Assistance", "Import Support", "Market Development"
]

const FUNDING_LEVELS = [
  "Under $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "$100,000 - $500,000",
  "$500,000 - $1,000,000", "$1,000,000 - $5,000,000", "$5,000,000+", "Variable"
]

const ELIGIBILITY_CRITERIA = [
  "Startup Stage", "Revenue Requirements", "Employee Count", "Geographic Location",
  "Industry Focus", "Technology Type", "Innovation Level", "Social Impact",
  "Environmental Impact", "Export Potential", "Job Creation", "R&D Investment"
]

const APPLICATION_PROCESSES = [
  "Online Application", "Document Submission", "Review Process", "Interview Process",
  "Due Diligence", "Approval Process", "Disbursement", "Monitoring & Reporting"
]

export default function CreateGovernmentAgencyProfilePage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  
  const [profile, setProfile] = useState({
    // Agency Information
    agencyName: "",
    agencyType: "",
    parentOrganization: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    timezone: "",
    description: "",
    logo: "",
    
    // Contact Information
    primaryContact: {
      name: "",
      title: "",
      email: "",
      phone: "",
      department: ""
    },
    secondaryContact: {
      name: "",
      title: "",
      email: "",
      phone: "",
      department: ""
    },
    
    // Agency Profile
    sectors: [],
    programs: [],
    fundingLevels: [],
    eligibilityCriteria: [],
    applicationProcess: [],
    targetAudience: [],
    geographicScope: "",
    operatingHours: "",
    responseTime: "",
    
    // Programs & Services
    programDetails: [],
    serviceTypes: [],
    successStories: [],
    caseStudies: [],
    statistics: [],
    
    // Compliance & Regulations
    regulations: [],
    complianceRequirements: [],
    reportingRequirements: [],
    auditProcess: [],
    legalFramework: "",
    
    // Partnerships & Collaboration
    partnerships: [],
    collaborationTypes: [],
    networkConnections: [],
    stakeholderEngagement: [],
    
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
    { id: 1, title: "Agency Information", description: "Basic agency and contact details" },
    { id: 2, title: "Contact Information", description: "Primary and secondary contacts" },
    { id: 3, title: "Agency Profile", description: "Sectors, programs, and services" },
    { id: 4, title: "Programs & Services", description: "Detailed program information" },
    { id: 5, title: "Compliance & Regulations", description: "Regulatory and compliance details" },
    { id: 6, title: "Partnerships", description: "Partnership and collaboration information" },
    { id: 7, title: "Social Links", description: "Social media and online presence" },
    { id: 8, title: "Review & Submit", description: "Final review and submission" }
  ]

  const handleInputChange = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNestedInputChange = (parentField: string, childField: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField as keyof typeof prev],
        [childField]: value
      }
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
      description: "Your government agency profile has been saved as draft.",
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
      description: "Your government agency profile has been submitted for verification.",
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
          <Link href="/network/government-agencies" className="flex items-center text-[#0F7377] hover:underline">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Create Agency Profile</h1>
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
              <Link href="/network/government-agencies" className="flex items-center text-[#0F7377] hover:underline mb-4">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Government Agencies
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Create Your Government Agency Profile</h1>
              <p className="text-[#334155] mt-2">
                Connect with startups and entrepreneurs by showcasing your agency's programs and services
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
              {currentStep === 1 && <Building className="h-5 w-5" />}
              {currentStep === 2 && <Users className="h-5 w-5" />}
              {currentStep === 3 && <Target className="h-5 w-5" />}
              {currentStep === 4 && <FileText className="h-5 w-5" />}
              {currentStep === 5 && <Shield className="h-5 w-5" />}
              {currentStep === 6 && <Handshake className="h-5 w-5" />}
              {currentStep === 7 && <Globe className="h-5 w-5" />}
              {currentStep === 8 && <Check className="h-5 w-5" />}
              {steps[currentStep - 1].title}
            </CardTitle>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </CardHeader>
          <CardContent>
            {/* Step 1: Agency Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="agencyName">Agency Name *</Label>
                  <Input
                    id="agencyName"
                    value={profile.agencyName}
                    onChange={(e) => handleInputChange('agencyName', e.target.value)}
                    placeholder="e.g., Department of Economic Development"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agencyType">Agency Type *</Label>
                    <Select value={profile.agencyType} onValueChange={(value) => handleInputChange('agencyType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agency type" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGENCY_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="parentOrganization">Parent Organization</Label>
                    <Input
                      id="parentOrganization"
                      value={profile.parentOrganization}
                      onChange={(e) => handleInputChange('parentOrganization', e.target.value)}
                      placeholder="e.g., Ministry of Trade and Industry"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="website">Website *</Label>
                    <Input
                      id="website"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://www.agency.gov.sg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="contact@agency.gov.sg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+65 6123 4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={profile.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      placeholder="Singapore"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Government Building, Central District"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={profile.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Singapore"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={profile.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Central Region"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={profile.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="123456"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Agency Description *</Label>
                  <Textarea
                    id="description"
                    value={profile.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your agency's mission, vision, and key responsibilities..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Primary Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="primaryContactName">Name *</Label>
                      <Input
                        id="primaryContactName"
                        value={profile.primaryContact.name}
                        onChange={(e) => handleNestedInputChange('primaryContact', 'name', e.target.value)}
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <Label htmlFor="primaryContactTitle">Title *</Label>
                      <Input
                        id="primaryContactTitle"
                        value={profile.primaryContact.title}
                        onChange={(e) => handleNestedInputChange('primaryContact', 'title', e.target.value)}
                        placeholder="Director of Programs"
                      />
                    </div>
                    <div>
                      <Label htmlFor="primaryContactEmail">Email *</Label>
                      <Input
                        id="primaryContactEmail"
                        type="email"
                        value={profile.primaryContact.email}
                        onChange={(e) => handleNestedInputChange('primaryContact', 'email', e.target.value)}
                        placeholder="john.smith@agency.gov.sg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="primaryContactPhone">Phone *</Label>
                      <Input
                        id="primaryContactPhone"
                        value={profile.primaryContact.phone}
                        onChange={(e) => handleNestedInputChange('primaryContact', 'phone', e.target.value)}
                        placeholder="+65 6123 4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="primaryContactDepartment">Department</Label>
                      <Input
                        id="primaryContactDepartment"
                        value={profile.primaryContact.department}
                        onChange={(e) => handleNestedInputChange('primaryContact', 'department', e.target.value)}
                        placeholder="Economic Development Division"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Secondary Contact (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="secondaryContactName">Name</Label>
                      <Input
                        id="secondaryContactName"
                        value={profile.secondaryContact.name}
                        onChange={(e) => handleNestedInputChange('secondaryContact', 'name', e.target.value)}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryContactTitle">Title</Label>
                      <Input
                        id="secondaryContactTitle"
                        value={profile.secondaryContact.title}
                        onChange={(e) => handleNestedInputChange('secondaryContact', 'title', e.target.value)}
                        placeholder="Program Manager"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryContactEmail">Email</Label>
                      <Input
                        id="secondaryContactEmail"
                        type="email"
                        value={profile.secondaryContact.email}
                        onChange={(e) => handleNestedInputChange('secondaryContact', 'email', e.target.value)}
                        placeholder="jane.doe@agency.gov.sg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryContactPhone">Phone</Label>
                      <Input
                        id="secondaryContactPhone"
                        value={profile.secondaryContact.phone}
                        onChange={(e) => handleNestedInputChange('secondaryContact', 'phone', e.target.value)}
                        placeholder="+65 6123 4568"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="secondaryContactDepartment">Department</Label>
                      <Input
                        id="secondaryContactDepartment"
                        value={profile.secondaryContact.department}
                        onChange={(e) => handleNestedInputChange('secondaryContact', 'department', e.target.value)}
                        placeholder="Innovation Support Division"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Agency Profile */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label>Sectors *</Label>
                  <p className="text-sm text-gray-500 mb-3">What sectors does your agency focus on?</p>
                  <div className="flex flex-wrap gap-2">
                    {SECTORS.map((sector) => (
                      <Badge
                        key={sector}
                        variant={profile.sectors.includes(sector) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('sectors', sector, profile.sectors.includes(sector) ? 'remove' : 'add')}
                      >
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Program Types *</Label>
                  <p className="text-sm text-gray-500 mb-3">What types of programs do you offer?</p>
                  <div className="flex flex-wrap gap-2">
                    {PROGRAMS_TYPES.map((type) => (
                      <Badge
                        key={type}
                        variant={profile.programs.includes(type) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('programs', type, profile.programs.includes(type) ? 'remove' : 'add')}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Funding Levels</Label>
                  <p className="text-sm text-gray-500 mb-3">What funding levels do you typically provide?</p>
                  <div className="flex flex-wrap gap-2">
                    {FUNDING_LEVELS.map((level) => (
                      <Badge
                        key={level}
                        variant={profile.fundingLevels.includes(level) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('fundingLevels', level, profile.fundingLevels.includes(level) ? 'remove' : 'add')}
                      >
                        {level}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Eligibility Criteria</Label>
                  <p className="text-sm text-gray-500 mb-3">What are your main eligibility criteria?</p>
                  <div className="flex flex-wrap gap-2">
                    {ELIGIBILITY_CRITERIA.map((criteria) => (
                      <Badge
                        key={criteria}
                        variant={profile.eligibilityCriteria.includes(criteria) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleArrayChange('eligibilityCriteria', criteria, profile.eligibilityCriteria.includes(criteria) ? 'remove' : 'add')}
                      >
                        {criteria}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="geographicScope">Geographic Scope *</Label>
                    <Input
                      id="geographicScope"
                      value={profile.geographicScope}
                      onChange={(e) => handleInputChange('geographicScope', e.target.value)}
                      placeholder="e.g., Singapore, Southeast Asia, Global"
                    />
                  </div>
                  <div>
                    <Label htmlFor="responseTime">Typical Response Time</Label>
                    <Input
                      id="responseTime"
                      value={profile.responseTime}
                      onChange={(e) => handleInputChange('responseTime', e.target.value)}
                      placeholder="e.g., 5-7 business days"
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
