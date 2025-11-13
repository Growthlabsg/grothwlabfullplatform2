"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { 
  Handshake, 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  BarChart3,
  Target,
  Star,
  Zap,
  Shield,
  Briefcase,
  GraduationCap,
  Link2,
  Network,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Heart,
  Share2,
  Bookmark,
  Eye,
  Download,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Send,
  X,
  Plus,
  Check,
  AlertCircle,
  Info,
  Settings,
  Bell,
  BookOpen,
  User,
  Users2,
  Building,
  Landmark,
  Scale,
  FileText,
  TrendingUp,
  Activity,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Bookmark as BookmarkIcon,
  PieChart,
  TrendingDown,
  Activity as ActivityIcon,
  Handshake as HandshakeIcon,
  Lightbulb as LightbulbIcon,
  Target as TargetIcon,
  Zap as ZapIcon,
  GraduationCap as GraduationCapIcon,
  BookOpen as BookOpenIcon,
  Brain,
  Compass,
  Rocket as RocketIcon,
  Shield as ShieldIcon2,
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
  Download as DownloadIcon,
  Upload as UploadIcon,
  Copy,
  Edit,
  Trash2,
  Archive,
  Flag as FlagIcon,
  MoreVertical,
  ChevronDown,
  ChevronUp,
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
  Scale as ScaleIcon,
  Expand,
  Plus as PlusIcon,
  Minus,
  Percent,
  Infinity,
  Pi,
  Sigma,
  Globe,
  Building2,
  Lightbulb,
  Award
} from "lucide-react"

export default function ExplorePartnershipPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    website: "",
    foundedYear: "",
    location: "",
    industry: "",
    companySize: "",
    
    // Partnership Information
    partnershipType: "",
    targetPartners: "",
    partnershipGoals: "",
    expectedOutcomes: "",
    timeline: "",
    budget: "",
    
    // Business Information
    problem: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    revenue: "",
    customers: "",
    competitors: "",
    differentiation: "",
    
    // Partnership Requirements
    partnerRequirements: "",
    resourcesNeeded: "",
    supportRequired: "",
    collaborationAreas: "",
    successMetrics: "",
    
    // Additional Information
    challenges: "",
    goals: "",
    whyPartnership: "",
    additionalInfo: "",
    
    // Terms and Conditions
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false
  })

  const totalSteps = 6

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    toast({
      title: "Partnership Exploration Submitted",
      description: "Your partnership exploration request has been submitted successfully. We'll review it and get back to you within 3-5 business days.",
    })
    // Here you would typically submit the form data to your backend
  }

  const steps = [
    { number: 1, title: "Company Info", description: "Basic company information" },
    { number: 2, title: "Partnership", description: "Partnership requirements" },
    { number: 3, title: "Business", description: "Business model and market" },
    { number: 4, title: "Requirements", description: "Partnership requirements" },
    { number: 5, title: "Goals", description: "Partnership goals and challenges" },
    { number: 6, title: "Review", description: "Review and submit" }
  ]

  const partnershipTypes = [
    "Corporate Innovation",
    "Academic Collaboration",
    "International Expansion",
    "Technology Transfer",
    "Market Access",
    "Joint Development",
    "Strategic Alliance",
    "Distribution Partnership"
  ]

  const industries = [
    "Fintech",
    "Healthtech",
    "Edtech",
    "SaaS",
    "E-commerce",
    "Marketplace",
    "AI/ML",
    "Blockchain",
    "Clean Energy",
    "Manufacturing",
    "Logistics",
    "Retail",
    "Other"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Explore Partnerships</h1>
              <p className="text-xs text-gray-500">Step {currentStep} of {totalSteps}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Desktop Header */}
        <div className="hidden lg:block mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Partnerships</h1>
              <p className="text-xl text-gray-600">
                Connect with our network of partners and unlock new opportunities for growth
              </p>
            </div>
            <Link
              href="/programmes/partnership"
              className="flex items-center gap-2 text-[#0F7377] hover:text-[#0F7377]/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Programmes
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Partnership Exploration Progress</h2>
            <span className="text-sm text-gray-500">{currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#0F7377] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="hidden lg:block mb-8">
          <div className="flex justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'bg-[#0F7377] text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="h-4 w-4" /> : step.number}
                </div>
                <div className="text-center mt-2">
                  <div className={`text-xs font-medium ${
                    currentStep >= step.number ? 'text-[#0F7377]' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Handshake className="h-5 w-5 text-[#0F7377]" />
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="foundedYear">Founded Year *</Label>
                    <Input
                      id="foundedYear"
                      type="number"
                      value={formData.foundedYear}
                      onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Singapore"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="companySize">Company Size</Label>
                    <select
                      id="companySize"
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="partnershipType">Partnership Type *</Label>
                  <select
                    id="partnershipType"
                    value={formData.partnershipType}
                    onChange={(e) => handleInputChange('partnershipType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select partnership type</option>
                    {partnershipTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="targetPartners">Target Partners *</Label>
                  <Textarea
                    id="targetPartners"
                    value={formData.targetPartners}
                    onChange={(e) => handleInputChange('targetPartners', e.target.value)}
                    placeholder="Describe the type of partners you're looking for"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="partnershipGoals">Partnership Goals *</Label>
                  <Textarea
                    id="partnershipGoals"
                    value={formData.partnershipGoals}
                    onChange={(e) => handleInputChange('partnershipGoals', e.target.value)}
                    placeholder="What do you hope to achieve through partnerships?"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      placeholder="3-6 months"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget (SGD)</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      placeholder="100000"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="problem">What problem are you solving? *</Label>
                  <Textarea
                    id="problem"
                    value={formData.problem}
                    onChange={(e) => handleInputChange('problem', e.target.value)}
                    placeholder="Describe the problem your startup is solving"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="solution">What is your solution? *</Label>
                  <Textarea
                    id="solution"
                    value={formData.solution}
                    onChange={(e) => handleInputChange('solution', e.target.value)}
                    placeholder="Describe your solution and how it works"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="targetMarket">Target Market *</Label>
                  <Textarea
                    id="targetMarket"
                    value={formData.targetMarket}
                    onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                    placeholder="Describe your target market and customer segments"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="businessModel">Business Model *</Label>
                  <Textarea
                    id="businessModel"
                    value={formData.businessModel}
                    onChange={(e) => handleInputChange('businessModel', e.target.value)}
                    placeholder="How do you plan to make money?"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="revenue">Current Revenue (SGD)</Label>
                    <Input
                      id="revenue"
                      value={formData.revenue}
                      onChange={(e) => handleInputChange('revenue', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customers">Number of Customers</Label>
                    <Input
                      id="customers"
                      value={formData.customers}
                      onChange={(e) => handleInputChange('customers', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="partnerRequirements">Partner Requirements *</Label>
                  <Textarea
                    id="partnerRequirements"
                    value={formData.partnerRequirements}
                    onChange={(e) => handleInputChange('partnerRequirements', e.target.value)}
                    placeholder="What specific requirements do you have for potential partners?"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="resourcesNeeded">Resources Needed</Label>
                  <Textarea
                    id="resourcesNeeded"
                    value={formData.resourcesNeeded}
                    onChange={(e) => handleInputChange('resourcesNeeded', e.target.value)}
                    placeholder="What resources do you need from partners?"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="supportRequired">Support Required</Label>
                  <Textarea
                    id="supportRequired"
                    value={formData.supportRequired}
                    onChange={(e) => handleInputChange('supportRequired', e.target.value)}
                    placeholder="What kind of support do you need?"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="collaborationAreas">Collaboration Areas</Label>
                  <Textarea
                    id="collaborationAreas"
                    value={formData.collaborationAreas}
                    onChange={(e) => handleInputChange('collaborationAreas', e.target.value)}
                    placeholder="What areas would you like to collaborate on?"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="successMetrics">Success Metrics</Label>
                  <Textarea
                    id="successMetrics"
                    value={formData.successMetrics}
                    onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                    placeholder="How will you measure partnership success?"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="challenges">Current Challenges</Label>
                  <Textarea
                    id="challenges"
                    value={formData.challenges}
                    onChange={(e) => handleInputChange('challenges', e.target.value)}
                    placeholder="What are your biggest challenges right now?"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="goals">12-Month Goals</Label>
                  <Textarea
                    id="goals"
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    placeholder="What do you want to achieve in the next 12 months?"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="whyPartnership">Why Partnership? *</Label>
                  <Textarea
                    id="whyPartnership"
                    value={formData.whyPartnership}
                    onChange={(e) => handleInputChange('whyPartnership', e.target.value)}
                    placeholder="Why are you looking for partnerships specifically?"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any additional information you'd like to share"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Ready to Submit</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Please review your partnership exploration request before submitting. You can go back to previous steps to make changes.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => handleInputChange('termsAccepted', checked)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the <Link href="/terms" className="text-[#0F7377] hover:underline">Terms and Conditions</Link> *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked)}
                    />
                    <Label htmlFor="privacy" className="text-sm">
                      I agree to the <Link href="/privacy" className="text-[#0F7377] hover:underline">Privacy Policy</Link> *
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketingAccepted}
                      onCheckedChange={(checked) => handleInputChange('marketingAccepted', checked)}
                    />
                    <Label htmlFor="marketing" className="text-sm">
                      I agree to receive marketing communications from GrowthLab
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-[#0F7377] hover:bg-[#0F7377]/90"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.termsAccepted || !formData.privacyAccepted}
              className="flex items-center gap-2 bg-[#0F7377] hover:bg-[#0F7377]/90"
            >
              <Send className="h-4 w-4" />
              Submit Request
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around py-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-[#0F7377] hover:bg-[#0F7377]/10 active:bg-[#0F7377]/20"
          >
            <Handshake className="w-5 h-5" />
            <span className="text-xs font-semibold">Explore</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-xs font-semibold">Previous</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={nextStep}
            disabled={currentStep === totalSteps}
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-xs font-semibold">Next</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
            onClick={() => setCurrentStep(1)}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs font-semibold">Reset</span>
          </Button>
        </div>
      </div>

      {/* Bottom padding for mobile navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  )
}
