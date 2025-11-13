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
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  Heart,
  Share2,
  Eye,
  ArrowLeft,
  Star,
  CheckCircle,
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
  Send,
  X,
  Plus,
  Check,
  Upload,
  Image as ImageIcon,
  Video,
  FileText as FileTextIcon,
  Link as LinkIcon,
  Globe,
  Building2,
  Lightbulb,
  ArrowRight,
  Target,
  BarChart3,
  Trophy as TrophyIcon,
  Sparkles as SparklesIcon,
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
  Download as DownloadIcon2,
  Upload as UploadIcon2,
  Copy as CopyIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Archive as ArchiveIcon,
  Flag as FlagIcon3,
  MoreVertical as MoreVerticalIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
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
  Compass as CompassIcon2,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Route as RouteIcon,
  MapPin as MapPinIcon2,
  Pin as PinIcon,
  Flag as FlagIcon4,
  Crosshair as CrosshairIcon,
  Target as TargetIcon3,
  Focus as FocusIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  Move3D as Move3DIcon,
  Rotate3D as Rotate3DIcon,
  Scale as ScaleIcon2,
  Expand as ExpandIcon,
  Plus as PlusIcon2,
  Minus as MinusIcon,
  Percent as PercentIcon,
  Infinity as InfinityIcon,
  Pi as PiIcon,
  Sigma as SigmaIcon,
  Handshake,
  Mail,
  Phone,
  MessageSquare
} from "lucide-react"

export default function CollaborateEventPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Organization Information
    organizationName: "",
    organizationType: "",
    website: "",
    description: "",
    industry: "",
    size: "",
    
    // Contact Information
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    
    // Event Collaboration Details
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventType: "",
    proposedDate: "",
    proposedLocation: "",
    expectedAttendees: "",
    targetAudience: "",
    
    // Collaboration Requirements
    collaborationType: "",
    resourcesNeeded: "",
    supportRequired: "",
    budget: "",
    timeline: "",
    
    // Additional Information
    previousEvents: "",
    marketingReach: "",
    uniqueValue: "",
    additionalInfo: "",
    
    // Terms and Conditions
    termsAccepted: false,
    privacyAccepted: false,
    marketingAccepted: false
  })

  const totalSteps = 5

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
      title: "Collaboration Request Submitted",
      description: "Your collaboration request has been submitted successfully. We'll review it and get back to you within 3-5 business days.",
    })
    // Here you would typically submit the form data to your backend
  }

  const steps = [
    { number: 1, title: "Organization", description: "Your organization details" },
    { number: 2, title: "Event Details", description: "Proposed event information" },
    { number: 3, title: "Collaboration", description: "Collaboration requirements" },
    { number: 4, title: "Additional", description: "Additional information" },
    { number: 5, title: "Review", description: "Review and submit" }
  ]

  const organizationTypes = [
    "Startup",
    "Corporation",
    "Government Agency",
    "Non-Profit",
    "Educational Institution",
    "Media Company",
    "Event Organizer",
    "Other"
  ]

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Real Estate",
    "Energy",
    "Transportation",
    "Other"
  ]

  const eventCategories = [
    "Demo Day",
    "Networking",
    "Workshop",
    "Pitch Night",
    "Hackathon",
    "Fireside Chat",
    "Conference",
    "Meetup",
    "Training",
    "Other"
  ]

  const collaborationTypes = [
    "Co-Host Event",
    "Sponsor Event",
    "Provide Venue",
    "Provide Speakers",
    "Marketing Partnership",
    "Content Collaboration",
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
              <h1 className="text-lg font-bold text-gray-900">Collaborate on Event</h1>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Collaborate on Event</h1>
              <p className="text-xl text-gray-600">
                Partner with GrowthLab to host events and reach the startup community
              </p>
            </div>
            <Link
              href="/events"
              className="flex items-center gap-2 text-[#0F7377] hover:text-[#0F7377]/80"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Collaboration Request Progress</h2>
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
              {steps[currentStep - 1]?.title || 'Step'}
            </CardTitle>
            <CardDescription>
              {steps[currentStep - 1]?.description || 'Description'}
            </CardDescription>
              </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    placeholder="Enter your organization name"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="organizationType">Organization Type *</Label>
                    <select
                      id="organizationType"
                      value={formData.organizationType}
                      onChange={(e) => handleInputChange('organizationType', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select type</option>
                      {organizationTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <select
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourorganization.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Organization Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your organization"
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="size">Organization Size</Label>
                  <select
                    id="size"
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
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
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="eventTitle">Proposed Event Title *</Label>
                  <Input
                    id="eventTitle"
                    value={formData.eventTitle}
                    onChange={(e) => handleInputChange('eventTitle', e.target.value)}
                    placeholder="Enter proposed event title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="eventDescription">Event Description *</Label>
                  <Textarea
                    id="eventDescription"
                    value={formData.eventDescription}
                    onChange={(e) => handleInputChange('eventDescription', e.target.value)}
                    placeholder="Describe the proposed event"
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="eventCategory">Event Category *</Label>
                    <select
                      id="eventCategory"
                      value={formData.eventCategory}
                      onChange={(e) => handleInputChange('eventCategory', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select category</option>
                      {eventCategories.map(category => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="eventType">Event Type *</Label>
                    <select
                      id="eventType"
                      value={formData.eventType}
                      onChange={(e) => handleInputChange('eventType', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select type</option>
                      <option value="In-Person">In-Person</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="proposedDate">Proposed Date</Label>
                    <Input
                      id="proposedDate"
                      type="date"
                      value={formData.proposedDate}
                      onChange={(e) => handleInputChange('proposedDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="proposedLocation">Proposed Location</Label>
                    <Input
                      id="proposedLocation"
                      value={formData.proposedLocation}
                      onChange={(e) => handleInputChange('proposedLocation', e.target.value)}
                      placeholder="Singapore"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                    <Input
                      id="expectedAttendees"
                      type="number"
                      value={formData.expectedAttendees}
                      onChange={(e) => handleInputChange('expectedAttendees', e.target.value)}
                      placeholder="100"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                      placeholder="Startups, Investors, Entrepreneurs"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="collaborationType">Collaboration Type *</Label>
                  <select
                    id="collaborationType"
                    value={formData.collaborationType}
                    onChange={(e) => handleInputChange('collaborationType', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select collaboration type</option>
                    {collaborationTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="resourcesNeeded">Resources Needed</Label>
                  <Textarea
                    id="resourcesNeeded"
                    value={formData.resourcesNeeded}
                    onChange={(e) => handleInputChange('resourcesNeeded', e.target.value)}
                    placeholder="What resources do you need from GrowthLab?"
                    rows={3}
                    className="mt-1"
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
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">Budget (SGD)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      placeholder="10000"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Timeline</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      placeholder="3-6 months"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="previousEvents">Previous Events</Label>
                  <Textarea
                    id="previousEvents"
                    value={formData.previousEvents}
                    onChange={(e) => handleInputChange('previousEvents', e.target.value)}
                    placeholder="Tell us about your previous events or experience"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="marketingReach">Marketing Reach</Label>
                  <Textarea
                    id="marketingReach"
                    value={formData.marketingReach}
                    onChange={(e) => handleInputChange('marketingReach', e.target.value)}
                    placeholder="Describe your marketing reach and audience"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                  <Textarea
                    id="uniqueValue"
                    value={formData.uniqueValue}
                    onChange={(e) => handleInputChange('uniqueValue', e.target.value)}
                    placeholder="What unique value can you bring to the collaboration?"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="Any additional information you'd like to share"
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Ready to Submit</span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Please review your collaboration request before submitting. You can go back to previous steps to make changes.
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
            <span className="text-xs font-semibold">Collaborate</span>
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