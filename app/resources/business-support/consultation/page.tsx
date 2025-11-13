"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building2,
  Target,
  MessageCircle,
  CheckCircle,
  X,
  AlertCircle,
  Info,
  HelpCircle,
  Settings,
  Save,
  Send,
  Download,
  Upload,
  Plus,
  Minus,
  Edit,
  Trash2,
  MoreHorizontal,
  RefreshCw,
  Copy,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Move,
  Grid,
  List,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  Link2,
  Unlink,
  Table,
  Columns,
  Rows,
  PlusCircle,
  MinusCircle,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Star,
  Heart,
  Eye,
  MousePointer,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  MessageSquare,
  Reply,
  Flag,
  Archive,
  Tag,
  Folder,
  FolderOpen,
  FileText,
  Image,
  Video,
  Link as LinkIcon,
  Globe,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Rocket,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  Lock,
  Unlock,
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Award,
  Trophy,
  Medal,
  Crown,
  Gem,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export default function ConsultationPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    website: "",
    
    // Business Information
    businessStage: "",
    industry: "",
    businessDescription: "",
    challenges: [],
    goals: [],
    
    // Consultation Preferences
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    duration: "",
    urgency: "",
    budget: "",
    
    // Additional Information
    additionalInfo: "",
    howDidYouHear: "",
    newsletterSignup: false,
    termsAccepted: false
  })

  const businessStages = [
    "Idea Stage",
    "Early Stage (0-2 years)",
    "Growth Stage (2-5 years)",
    "Established (5+ years)",
    "Looking to Scale",
    "Pre-Exit"
  ]

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "E-commerce",
    "Manufacturing",
    "Education",
    "Real Estate",
    "Consulting",
    "Other"
  ]

  const consultationTypes = [
    { id: "strategy", name: "Business Strategy", duration: "60 min", price: "$200" },
    { id: "funding", name: "Funding Strategy", duration: "90 min", price: "$300" },
    { id: "marketing", name: "Marketing Strategy", duration: "60 min", price: "$200" },
    { id: "operations", name: "Operations Review", duration: "90 min", price: "$300" },
    { id: "legal", name: "Legal Consultation", duration: "60 min", price: "$250" },
    { id: "comprehensive", name: "Comprehensive Review", duration: "120 min", price: "$500" }
  ]

  const challenges = [
    "Funding & Investment",
    "Market Entry Strategy",
    "Product Development",
    "Marketing & Sales",
    "Operations & Scaling",
    "Team Building",
    "Financial Management",
    "Legal & Compliance",
    "Technology Implementation",
    "Competition Analysis"
  ]

  const goals = [
    "Secure Funding",
    "Scale Operations",
    "Enter New Markets",
    "Improve Profitability",
    "Build Strategic Partnerships",
    "Develop New Products",
    "Optimize Operations",
    "Build Strong Team",
    "Increase Market Share",
    "Prepare for Exit"
  ]

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleChallengeToggle = (challenge: string) => {
    setFormData(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }))
  }

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Consultation Booked",
      description: "Your consultation has been scheduled. We'll contact you soon with confirmation details.",
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange("position", e.target.value)}
                  placeholder="Enter your position"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="Enter your website URL"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Business Stage *</Label>
                <Select value={formData.businessStage} onValueChange={(value) => handleInputChange("businessStage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessStages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Industry *</Label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                placeholder="Describe your business, products/services, and target market"
                rows={4}
              />
            </div>
            
            <div className="space-y-4">
              <Label>What are your main business challenges? (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {challenges.map((challenge) => (
                  <div key={challenge} className="flex items-center space-x-2">
                    <Checkbox
                      id={challenge}
                      checked={formData.challenges.includes(challenge)}
                      onCheckedChange={() => handleChallengeToggle(challenge)}
                    />
                    <Label htmlFor={challenge} className="text-sm">
                      {challenge}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>What are your main business goals? (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {goals.map((goal) => (
                  <div key={goal} className="flex items-center space-x-2">
                    <Checkbox
                      id={goal}
                      checked={formData.goals.includes(goal)}
                      onCheckedChange={() => handleGoalToggle(goal)}
                    />
                    <Label htmlFor={goal} className="text-sm">
                      {goal}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Consultation Type *</Label>
              <RadioGroup value={formData.consultationType} onValueChange={(value) => handleInputChange("consultationType", value)}>
                {consultationTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <div className="flex-1">
                      <Label htmlFor={type.id} className="font-medium">{type.name}</Label>
                      <p className="text-sm text-gray-600">{type.duration} • {type.price}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange("preferredDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred Time *</Label>
                <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Urgency</Label>
                <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Within 2 weeks</SelectItem>
                    <SelectItem value="medium">Medium - Within 1 week</SelectItem>
                    <SelectItem value="high">High - Within 3 days</SelectItem>
                    <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-500">Under $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                    <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                    <SelectItem value="over-5000">Over $5,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                placeholder="Any additional information you'd like to share about your business or specific questions you have"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label>How did you hear about us?</Label>
              <Select value={formData.howDidYouHear} onValueChange={(value) => handleInputChange("howDidYouHear", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="event">Event/Conference</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newsletter"
                  checked={formData.newsletterSignup}
                  onCheckedChange={(checked) => handleInputChange("newsletterSignup", checked)}
                />
                <Label htmlFor="newsletter" className="text-sm">
                  Subscribe to our newsletter for business tips and updates
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the <Link href="/terms" className="text-[#0F7377] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#0F7377] hover:underline">Privacy Policy</Link> *
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/business-support">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Business Support
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Book Consultation</h1>
                <p className="text-sm text-gray-600">Schedule a consultation with our experts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-[#0F7377] text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      currentStep > step ? 'bg-[#0F7377]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Personal Info</span>
              <span>Business Info</span>
              <span>Consultation</span>
              <span>Additional</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && "Personal Information"}
                {currentStep === 2 && "Business Information"}
                {currentStep === 3 && "Consultation Preferences"}
                {currentStep === 4 && "Additional Information"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "Tell us about your business"}
                {currentStep === 3 && "Choose your consultation type and preferences"}
                {currentStep === 4 && "Any additional information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepContent()}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Send className="h-4 w-4 mr-2" />
                Book Consultation
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
