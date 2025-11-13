"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import {
  User,
  Mail,
  Linkedin,
  MapPin,
  Video,
  Award,
  Briefcase,
  Code,
  Calendar,
  Twitter,
  Instagram,
  Globe,
  Users,
  Target,
  Lightbulb,
  Building,
  Clock,
  Share2,
  Save,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  ExternalLink,
  Upload,
  Play,
  Plus,
  X,
  Star,
  TrendingUp,
  Zap,
  Heart,
  MessageSquare,
  Bookmark,
  Eye,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

const INDUSTRIES = [
  "Agriculture/Agtech",
  "Artificial Intelligence",
  "Augmented Reality/Virtual Reality",
  "B2B/Enterprise",
  "Biomedical/Biotech",
  "Blockchain",
  "Climate/Sustainability",
  "Consumer",
  "E-Commerce",
  "Developer Tools",
  "Education/Edtech",
  "Energy",
  "Entertainment",
  "Financial/Fintech",
  "Food/Beverage",
  "Gaming",
  "Government",
  "Hardware",
  "Hard Tech",
  "Health/Wellness",
  "Healthcare",
  "Marketplace",
  "Non-Profit",
  "Real Estate/Proptech",
  "Robotics",
  "Security",
  "Travel/Tourism"
]

const RESPONSIBILITY_AREAS = [
  "Product",
  "Engineering",
  "Design",
  "Sales & Marketing",
  "Operations",
  "Finance",
  "Strategy",
  "Customer Success"
]

export default function CreateCoFounderProfile() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Details
    firstName: "",
    lastName: "",
    email: "",
    linkedinUrl: "",
    noLinkedin: false,
    location: "",
    introduction: "",
    videoUrl: "",
    accomplishment1: "",
    accomplishment2: "",
    employment: "",
    isTechnical: "",
    calendlyUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    heardFrom: "",

    // Additional Details
    hasStartup: "",
    companyName: "",
    companyDescription: "",
    progress: "",
    funding: "",
    hasCoFounder: "",
    fullTimeTiming: "",
    responsibilities: [] as string[],
    interests: [] as string[],
    equityExpectations: "",
    freeTime: "",
    lifePath: "",
    additionalInfo: "",

    // Co-founder Preferences
    lookingFor: "",
    ideaPreference: "",
    ideaImportance: "",
    technicalPreference: "",
    technicalImportance: "",
    timingPreference: "",
    locationPreference: "",
    locationImportance: "",
    agePreference: "",
    ageImportance: "",
    preferredResponsibilities: [] as string[],
    responsibilityImportance: "",
    interestMatching: "",
    alertNewProfiles: false
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
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
      title: "Profile Created Successfully!",
      description: "Your co-founder profile has been created and is now visible to potential matches.",
    })
    // Here you would typically save to database
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Basic Details"
      case 2: return "Additional Details"
      case 3: return "Co-founder Preferences"
      default: return ""
    }
  }

  return (
          <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-[#0F7377] flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Create Your Co-Founder Profile</h1>
          </div>
          <p className="text-[#334155] mb-6">
            Build a comprehensive profile to find your ideal co-founder. This information will be used by our advanced matching algorithm.
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-[#334155]">{getStepTitle(currentStep)}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{getStepTitle(currentStep)}</span>
                  {currentStep === 1 && <Badge variant="outline" className="bg-blue-50 text-blue-700">Required</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentStep === 1 && (
                  <>
                    {/* Basic Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="linkedinUrl"
                          value={formData.linkedinUrl}
                          onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                          placeholder="https://linkedin.com/in/yourprofile"
                          disabled={formData.noLinkedin}
                        />
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="noLinkedin"
                            checked={formData.noLinkedin}
                            onCheckedChange={(checked) => handleInputChange("noLinkedin", checked)}
                          />
                          <Label htmlFor="noLinkedin" className="text-sm">I don't have a LinkedIn profile</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="City, Country (e.g., San Francisco, USA)"
                      />
                    </div>

                    <div>
                      <Label htmlFor="introduction">Introduce yourself! *</Label>
                      <Textarea
                        id="introduction"
                        value={formData.introduction}
                        onChange={(e) => handleInputChange("introduction", e.target.value)}
                        placeholder="Write a paragraph or two about your background and what you're looking for. Cover your professional accomplishments and interests, but it's ok to get a little personal here as well!"
                        rows={4}
                      />
                      <p className="text-sm text-[#334155] mt-1">
                        {formData.introduction.length}/500 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="videoUrl">(Optional) 1-minute video introducing yourself</Label>
                      <Input
                        id="videoUrl"
                        value={formData.videoUrl}
                        onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                        placeholder="YouTube, Vimeo, or other video URL"
                      />
                    </div>

                    <div>
                      <Label htmlFor="accomplishment1">Impressive accomplishment *</Label>
                      <Textarea
                        id="accomplishment1"
                        value={formData.accomplishment1}
                        onChange={(e) => handleInputChange("accomplishment1", e.target.value)}
                        placeholder="For example, an academic or professional achievement, an award you've won, or something impressive you've built."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="accomplishment2">Another impressive accomplishment</Label>
                      <Textarea
                        id="accomplishment2"
                        value={formData.accomplishment2}
                        onChange={(e) => handleInputChange("accomplishment2", e.target.value)}
                        placeholder="For example, an academic or professional achievement, an award you've won, or something impressive you've built."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="employment">Employment: employers, position/titles, and dates *</Label>
                      <Textarea
                        id="employment"
                        value={formData.employment}
                        onChange={(e) => handleInputChange("employment", e.target.value)}
                        placeholder="Use a separate line for each job, most recent first. Example:&#10;Senior Engineer at Google (2020-2023)&#10;Software Engineer at Microsoft (2018-2020)"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Are you technical? *</Label>
                      <RadioGroup
                        value={formData.isTechnical}
                        onValueChange={(value) => handleInputChange("isTechnical", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="technical-yes" />
                          <Label htmlFor="technical-yes">Yes - I am a programmer, scientist or engineer who can build the product without outside assistance</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="technical-no" />
                          <Label htmlFor="technical-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="calendlyUrl">(Optional) Scheduling URL (Calendly, Cal, or Google Calendar)</Label>
                      <Input
                        id="calendlyUrl"
                        value={formData.calendlyUrl}
                        onChange={(e) => handleInputChange("calendlyUrl", e.target.value)}
                        placeholder="https://calendly.com/your-link"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="twitterUrl">(Optional) Twitter URL</Label>
                        <Input
                          id="twitterUrl"
                          value={formData.twitterUrl}
                          onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
                          placeholder="https://twitter.com/yourhandle"
                        />
                      </div>
                      <div>
                        <Label htmlFor="instagramUrl">(Optional) Instagram URL</Label>
                        <Input
                          id="instagramUrl"
                          value={formData.instagramUrl}
                          onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                          placeholder="https://instagram.com/yourhandle"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="heardFrom">How did you hear about GrowthLab Co-Founder Matching?</Label>
                      <Select value={formData.heardFrom} onValueChange={(value) => handleInputChange("heardFrom", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social-media">Social Media</SelectItem>
                          <SelectItem value="friend">Friend/Colleague</SelectItem>
                          <SelectItem value="search">Search Engine</SelectItem>
                          <SelectItem value="event">Event/Conference</SelectItem>
                          <SelectItem value="newsletter">Newsletter</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    {/* Additional Details */}
                    <div>
                      <Label>Do you already have a startup or idea that you're set on? *</Label>
                      <RadioGroup
                        value={formData.hasStartup}
                        onValueChange={(value) => handleInputChange("hasStartup", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="committed" id="startup-committed" />
                          <Label htmlFor="startup-committed">Yes, I'm committed to an idea and I want a co-founder who can help me build it</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="open" id="startup-open" />
                          <Label htmlFor="startup-open">I have some ideas, but I'm also open to exploring other ideas</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="help" id="startup-help" />
                          <Label htmlFor="startup-help">No, I could help a co-founder with their existing idea or explore new ideas together</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.hasStartup !== "help" && (
                      <>
                        <div>
                          <Label htmlFor="companyName">What is the name of your company or project? *</Label>
                          <Input
                            id="companyName"
                            value={formData.companyName}
                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                            placeholder="Enter your company or project name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="companyDescription">Describe your company or project in a few sentences *</Label>
                          <Textarea
                            id="companyDescription"
                            value={formData.companyDescription}
                            onChange={(e) => handleInputChange("companyDescription", e.target.value)}
                            placeholder="Describe what your company does, the problem it solves, and your vision..."
                            rows={4}
                          />
                          <p className="text-sm text-[#334155] mt-1">
                            {formData.companyDescription.length}/500 characters (minimum 10)
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="progress">(Optional) How long have you been working on this and what progress have you made?</Label>
                          <Textarea
                            id="progress"
                            value={formData.progress}
                            onChange={(e) => handleInputChange("progress", e.target.value)}
                            placeholder="Describe your progress, milestones achieved, and current status..."
                            rows={3}
                          />
                          <p className="text-sm text-[#334155] mt-1">
                            {formData.progress.length}/500 characters
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="funding">(Optional) If you've already raised funding for this startup, who invested and how much have you raised?</Label>
                          <Textarea
                            id="funding"
                            value={formData.funding}
                            onChange={(e) => handleInputChange("funding", e.target.value)}
                            placeholder="List investors, funding rounds, and amounts raised..."
                            rows={3}
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <Label>Do you already have a co-founder? *</Label>
                      <RadioGroup
                        value={formData.hasCoFounder}
                        onValueChange={(value) => handleInputChange("hasCoFounder", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="cofounder-yes" />
                          <Label htmlFor="cofounder-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="cofounder-no" />
                          <Label htmlFor="cofounder-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>When do you want to start working on a startup full-time? *</Label>
                      <RadioGroup
                        value={formData.fullTimeTiming}
                        onValueChange={(value) => handleInputChange("fullTimeTiming", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="already" id="timing-already" />
                          <Label htmlFor="timing-already">I'm already full-time on my startup</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ready" id="timing-ready" />
                          <Label htmlFor="timing-ready">I'm ready to go full-time as soon as I meet the right co-founder</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="next-year" id="timing-next-year" />
                          <Label htmlFor="timing-next-year">I'm planning to go full-time in the next year</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-plans" id="timing-no-plans" />
                          <Label htmlFor="timing-no-plans">I don't have any specific plans yet</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Which areas of a startup are you willing to take responsibility for? *</Label>
                      <div className="grid md:grid-cols-2 gap-2 mt-2">
                        {RESPONSIBILITY_AREAS.map((area) => (
                          <div key={area} className="flex items-center space-x-2">
                            <Checkbox
                              id={area}
                              checked={formData.responsibilities.includes(area)}
                              onCheckedChange={(checked) => handleArrayChange("responsibilities", area, checked as boolean)}
                            />
                            <Label htmlFor={area} className="text-sm">{area}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Which topics and industries are you interested in? *</Label>
                      <div className="grid md:grid-cols-2 gap-2 mt-2">
                        {INDUSTRIES.map((industry) => (
                          <div key={industry} className="flex items-center space-x-2">
                            <Checkbox
                              id={industry}
                              checked={formData.interests.includes(industry)}
                              onCheckedChange={(checked) => handleArrayChange("interests", industry, checked as boolean)}
                            />
                            <Label htmlFor={industry} className="text-sm">{industry}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="equityExpectations">What are your expectations for splitting equity?</Label>
                      <Textarea
                        id="equityExpectations"
                        value={formData.equityExpectations}
                        onChange={(e) => handleInputChange("equityExpectations", e.target.value)}
                        placeholder="GrowthLab strongly recommends an equal split. Share your thoughts on equity distribution..."
                        rows={3}
                      />
                      <p className="text-sm text-[#334155] mt-1">
                        {formData.equityExpectations.length}/250 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="freeTime">What do you do with your free time?</Label>
                      <Textarea
                        id="freeTime"
                        value={formData.freeTime}
                        onChange={(e) => handleInputChange("freeTime", e.target.value)}
                        placeholder="What are your hobbies and interests?"
                        rows={3}
                      />
                      <p className="text-sm text-[#334155] mt-1">
                        {formData.freeTime.length}/500 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="lifePath">How did your life path lead to where you are now?</Label>
                      <Textarea
                        id="lifePath"
                        value={formData.lifePath}
                        onChange={(e) => handleInputChange("lifePath", e.target.value)}
                        placeholder="How have your experiences shaped your values?"
                        rows={4}
                      />
                      <p className="text-sm text-[#334155] mt-1">
                        {formData.lifePath.length}/500 characters
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="additionalInfo">Anything else you would like to add about yourself?</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        placeholder="Feel free to write anything else that you'd like a co-founder to know about you."
                        rows={4}
                      />
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    {/* Co-founder Preferences */}
                    <div>
                      <Label htmlFor="lookingFor">What are you looking for in a co-founder?</Label>
                      <Textarea
                        id="lookingFor"
                        value={formData.lookingFor}
                        onChange={(e) => handleInputChange("lookingFor", e.target.value)}
                        placeholder="Describe the ideal co-founder you're looking for..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Are you looking for a co-founder who already has a specific idea, or are you open to exploring new ideas together? *</Label>
                      <RadioGroup
                        value={formData.ideaPreference}
                        onValueChange={(value) => handleInputChange("ideaPreference", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="specific" id="idea-specific" />
                          <Label htmlFor="idea-specific">I want to see co-founders who have a specific idea</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="open" id="idea-open" />
                          <Label htmlFor="idea-open">I want to see co-founders who are not set on a specific idea</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-preference" id="idea-no-preference" />
                          <Label htmlFor="idea-no-preference">No preference</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>How important is this to you? *</Label>
                      <RadioGroup
                        value={formData.ideaImportance}
                        onValueChange={(value) => handleInputChange("ideaImportance", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="preferred" id="idea-importance-preferred" />
                          <Label htmlFor="idea-importance-preferred">Preferred but not required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="required" id="idea-importance-required" />
                          <Label htmlFor="idea-importance-required">Required</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Do you prefer either technical or non-technical profiles? *</Label>
                      <RadioGroup
                        value={formData.technicalPreference}
                        onValueChange={(value) => handleInputChange("technicalPreference", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="technical" id="tech-technical" />
                          <Label htmlFor="tech-technical">Technical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="non-technical" id="tech-non-technical" />
                          <Label htmlFor="tech-non-technical">Non-technical</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-preference" id="tech-no-preference" />
                          <Label htmlFor="tech-no-preference">No preference</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>How important is this to you? *</Label>
                      <RadioGroup
                        value={formData.technicalImportance}
                        onValueChange={(value) => handleInputChange("technicalImportance", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="preferred" id="tech-importance-preferred" />
                          <Label htmlFor="tech-importance-preferred">Preferred but not required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="required" id="tech-importance-required" />
                          <Label htmlFor="tech-importance-required">Required</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Do you prefer to see co-founders who match up with your timing? *</Label>
                      <RadioGroup
                        value={formData.timingPreference}
                        onValueChange={(value) => handleInputChange("timingPreference", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="only-match" id="timing-only-match" />
                          <Label htmlFor="timing-only-match">I only want to see co-founders who match my timing</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="prefer-match" id="timing-prefer-match" />
                          <Label htmlFor="timing-prefer-match">I prefer to see co-founders who match my timing, but it's not required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-preference" id="timing-no-preference" />
                          <Label htmlFor="timing-no-preference">No preference</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Do you have a location preference? *</Label>
                      <RadioGroup
                        value={formData.locationPreference}
                        onValueChange={(value) => handleInputChange("locationPreference", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="distance" id="location-distance" />
                          <Label htmlFor="location-distance">Within a certain distance of me</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="country" id="location-country" />
                          <Label htmlFor="location-country">In my country</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="region" id="location-region" />
                          <Label htmlFor="location-region">In my region</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-preference" id="location-no-preference" />
                          <Label htmlFor="location-no-preference">No preference</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>How important is this to you? *</Label>
                      <RadioGroup
                        value={formData.locationImportance}
                        onValueChange={(value) => handleInputChange("locationImportance", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="preferred" id="location-importance-preferred" />
                          <Label htmlFor="location-importance-preferred">Preferred but not required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="required" id="location-importance-required" />
                          <Label htmlFor="location-importance-required">Required</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Do you have an age preference? *</Label>
                      <RadioGroup
                        value={formData.agePreference}
                        onValueChange={(value) => handleInputChange("agePreference", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="age-range" id="age-range" />
                          <Label htmlFor="age-range">Within a certain age range</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-preference" id="age-no-preference" />
                          <Label htmlFor="age-no-preference">No preference</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Which areas would you like a co-founder to take responsibility for? *</Label>
                      <div className="grid md:grid-cols-2 gap-2 mt-2">
                        {RESPONSIBILITY_AREAS.map((area) => (
                          <div key={area} className="flex items-center space-x-2">
                            <Checkbox
                              id={`pref-${area}`}
                              checked={formData.preferredResponsibilities.includes(area)}
                              onCheckedChange={(checked) => handleArrayChange("preferredResponsibilities", area, checked as boolean)}
                            />
                            <Label htmlFor={`pref-${area}`} className="text-sm">{area}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Do you prefer to match candidates who share your interests? *</Label>
                      <RadioGroup
                        value={formData.interestMatching}
                        onValueChange={(value) => handleInputChange("interestMatching", value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="only-share" id="interest-only-share" />
                          <Label htmlFor="interest-only-share">I only want to match with co-founders who share my interests</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="prefer-share" id="interest-prefer-share" />
                          <Label htmlFor="interest-prefer-share">I prefer to match with co-founders who share my interests, but it's not required</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no-preference" id="interest-no-preference" />
                          <Label htmlFor="interest-no-preference">No preference</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="alertNewProfiles"
                        checked={formData.alertNewProfiles}
                        onCheckedChange={(checked) => handleInputChange("alertNewProfiles", checked)}
                      />
                      <Label htmlFor="alertNewProfiles">Alert me when a new profile that matches all my preferences joins</Label>
                    </div>
                  </>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      <Save className="h-4 w-4 mr-2" />
                      Create Profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Profile Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Profile Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#0F7377] flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {formData.firstName && formData.lastName 
                            ? `${formData.firstName} ${formData.lastName}`
                            : "Your Name"
                          }
                        </h3>
                        <p className="text-sm text-[#334155]">
                          {formData.location || "Location"}
                        </p>
                      </div>
                    </div>
                    
                    {formData.introduction && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Introduction</h4>
                        <p className="text-sm text-[#334155] line-clamp-3">
                          {formData.introduction}
                        </p>
                      </div>
                    )}

                    {formData.interests.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Interests</h4>
                        <div className="flex flex-wrap gap-1">
                          {formData.interests.slice(0, 3).map((interest) => (
                            <Badge key={interest} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                          {formData.interests.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{formData.interests.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.responsibilities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-1">Responsibilities</h4>
                        <div className="flex flex-wrap gap-1">
                          {formData.responsibilities.slice(0, 3).map((resp) => (
                            <Badge key={resp} variant="outline" className="text-xs">
                              {resp}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Tips for Success
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <p className="text-sm">Be authentic and honest about your experience level</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <p className="text-sm">Include specific examples of your accomplishments</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <p className="text-sm">Be clear about what you're looking for in a co-founder</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <p className="text-sm">Add a video introduction to stand out</p>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Matching Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Candidates</span>
                    <span className="text-sm font-medium">8,613</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Matching Preferences</span>
                    <span className="text-sm font-medium text-green-600">32</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Response Rate</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
}