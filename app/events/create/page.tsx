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
  Sigma as SigmaIcon
} from "lucide-react"

export default function CreateEventPage() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    description: "",
    category: "",
    eventType: "",
    featured: false,
    
    // Date and Time
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timezone: "SGT",
    
    // Location
    location: "",
    address: "",
    city: "",
    country: "Singapore",
    isOnline: false,
    onlineLink: "",
    
    // Capacity and Pricing
    maxAttendees: "",
    price: "",
    currency: "SGD",
    isFree: true,
    
    // Additional Details
    tags: "",
    requirements: "",
    whatToBring: "",
    agenda: "",
    speakers: "",
    sponsors: "",
    
    // Contact Information
    organizerName: "",
    organizerEmail: "",
    organizerPhone: "",
    website: "",
    
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
      title: "Event Created Successfully",
      description: "Your event has been created and is pending approval. You'll receive an email confirmation shortly.",
    })
    // Here you would typically submit the form data to your backend
  }

  const steps = [
    { number: 1, title: "Basic Info", description: "Event title and description" },
    { number: 2, title: "Date & Time", description: "When and where" },
    { number: 3, title: "Details", description: "Capacity and pricing" },
    { number: 4, title: "Additional", description: "Tags and requirements" },
    { number: 5, title: "Review", description: "Review and submit" }
  ]

  const categories = [
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

  const eventTypes = [
    "In-Person",
    "Online",
    "Hybrid"
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
              <h1 className="text-lg font-bold text-gray-900">Create Event</h1>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Event</h1>
              <p className="text-xl text-gray-600">
                Host your own event and connect with the GrowthLab community
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
            <h2 className="text-lg font-semibold text-gray-900">Event Creation Progress</h2>
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
              <Calendar className="h-5 w-5 text-[#0F7377]" />
              {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>
              {steps[currentStep - 1].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter event title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your event"
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select category</option>
                      {categories.map(category => (
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
                      {eventTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Featured Event (requires approval)</Label>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange('startTime', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange('endTime', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={formData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="SGT">Singapore Time (SGT)</option>
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="GMT">Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isOnline"
                    checked={formData.isOnline}
                    onCheckedChange={(checked) => handleInputChange('isOnline', checked)}
                  />
                  <Label htmlFor="isOnline">Online Event</Label>
                </div>
                {formData.isOnline ? (
                  <div>
                    <Label htmlFor="onlineLink">Online Link *</Label>
                    <Input
                      id="onlineLink"
                      value={formData.onlineLink}
                      onChange={(e) => handleInputChange('onlineLink', e.target.value)}
                      placeholder="https://zoom.us/j/..."
                      className="mt-1"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location">Location Name *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="e.g., GrowthLab HQ"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Full address"
                        rows={2}
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Singapore"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="Singapore"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    value={formData.maxAttendees}
                    onChange={(e) => handleInputChange('maxAttendees', e.target.value)}
                    placeholder="100"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isFree"
                    checked={formData.isFree}
                    onCheckedChange={(checked) => handleInputChange('isFree', checked)}
                  />
                  <Label htmlFor="isFree">Free Event</Label>
                </div>
                {!formData.isFree && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="50"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="SGD">SGD</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="startup, networking, pitch"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    placeholder="Any requirements for attendees"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="whatToBring">What to Bring</Label>
                  <Textarea
                    id="whatToBring"
                    value={formData.whatToBring}
                    onChange={(e) => handleInputChange('whatToBring', e.target.value)}
                    placeholder="Laptop, notebook, business cards"
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="agenda">Event Agenda</Label>
                  <Textarea
                    id="agenda"
                    value={formData.agenda}
                    onChange={(e) => handleInputChange('agenda', e.target.value)}
                    placeholder="6:00 PM - Registration&#10;6:30 PM - Welcome&#10;7:00 PM - Presentations"
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="speakers">Speakers</Label>
                    <Textarea
                      id="speakers"
                      value={formData.speakers}
                      onChange={(e) => handleInputChange('speakers', e.target.value)}
                      placeholder="Speaker names and titles"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sponsors">Sponsors</Label>
                    <Textarea
                      id="sponsors"
                      value={formData.sponsors}
                      onChange={(e) => handleInputChange('sponsors', e.target.value)}
                      placeholder="Sponsor names"
                      rows={3}
                      className="mt-1"
                    />
                  </div>
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
                    Please review your event details before submitting. You can go back to previous steps to make changes.
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
              Create Event
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
            <Calendar className="w-5 h-5" />
            <span className="text-xs font-semibold">Create</span>
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
