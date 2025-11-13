"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Edit, 
  Save, 
  Plus, 
  X, 
  MapPin, 
  Clock, 
  Target, 
  Award,
  GraduationCap,
  Briefcase,
  Globe,
  Building2,
  Users,
  TrendingUp,
  Heart,
  Zap,
  CheckCircle,
  AlertCircle,
  Star,
  Calendar,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Globe as GlobeIcon
} from "lucide-react"
import { User as UserType, MentorProfile, MenteeProfile, StartupProfile } from "@/lib/mentor-connect-service"

interface UserProfileBuilderProps {
  user?: UserType
  onSave?: (user: UserType) => void
}

export function UserProfileBuilder({ user, onSave }: UserProfileBuilderProps) {
  const [currentUser, setCurrentUser] = useState<UserType>(
    user || {
      id: "",
      name: "",
      email: "",
      avatar: "",
      userType: "mentee",
      bio: "",
      location: "",
      timezone: "",
      availability: [],
      expertise: [],
      industries: [],
      interests: [],
      goals: [],
      experience: [],
      education: [],
      languages: ["English"],
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      isAvailable: true,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }
  )

  const [activeStep, setActiveStep] = useState(1)
  const [newExpertise, setNewExpertise] = useState("")
  const [newIndustry, setNewIndustry] = useState("")
  const [newGoal, setNewGoal] = useState("")
  const [newInterest, setNewInterest] = useState("")

  const handleInputChange = (field: keyof UserType, value: any) => {
    setCurrentUser(prev => ({ ...prev, [field]: value }))
  }

  const handleAddExpertise = () => {
    if (newExpertise && !currentUser.expertise.includes(newExpertise)) {
      handleInputChange("expertise", [...currentUser.expertise, newExpertise])
      setNewExpertise("")
    }
  }

  const handleRemoveExpertise = (expertise: string) => {
    handleInputChange("expertise", currentUser.expertise.filter(e => e !== expertise))
  }

  const handleAddIndustry = () => {
    if (newIndustry && !currentUser.industries.includes(newIndustry)) {
      handleInputChange("industries", [...currentUser.industries, newIndustry])
      setNewIndustry("")
    }
  }

  const handleRemoveIndustry = (industry: string) => {
    handleInputChange("industries", currentUser.industries.filter(i => i !== industry))
  }

  const handleAddGoal = () => {
    if (newGoal && !currentUser.goals.includes(newGoal)) {
      handleInputChange("goals", [...currentUser.goals, newGoal])
      setNewGoal("")
    }
  }

  const handleRemoveGoal = (goal: string) => {
    handleInputChange("goals", currentUser.goals.filter(g => g !== goal))
  }

  const handleAddInterest = () => {
    if (newInterest && !currentUser.interests.includes(newInterest)) {
      handleInputChange("interests", [...currentUser.interests, newInterest])
      setNewInterest("")
    }
  }

  const handleRemoveInterest = (interest: string) => {
    handleInputChange("interests", currentUser.interests.filter(i => i !== interest))
  }

  const handleSave = () => {
    onSave?.(currentUser)
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <User className="h-4 w-4" />
      case 2: return <Target className="h-4 w-4" />
      case 3: return <Briefcase className="h-4 w-4" />
      case 4: return <Clock className="h-4 w-4" />
      case 5: return <CheckCircle className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Basic Information"
      case 2: return "Expertise & Goals"
      case 3: return "Experience & Education"
      case 4: return "Availability & Preferences"
      case 5: return "Review & Save"
      default: return ""
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label>Full Name</Label>
          <Input
            value={currentUser.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div className="space-y-3">
          <Label>Email</Label>
          <Input
            type="email"
            value={currentUser.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>User Type</Label>
        <Select value={currentUser.userType} onValueChange={(value) => handleInputChange("userType", value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mentor">Mentor</SelectItem>
            <SelectItem value="mentee">Mentee</SelectItem>
            <SelectItem value="startup">Startup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <Label>Bio</Label>
        <Textarea
          value={currentUser.bio}
          onChange={(e) => handleInputChange("bio", e.target.value)}
          placeholder="Tell us about yourself, your background, and what you're looking for..."
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label>Location</Label>
          <Input
            value={currentUser.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="City, Country"
          />
        </div>
        <div className="space-y-3">
          <Label>Timezone</Label>
          <Select value={currentUser.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PST">PST (Pacific)</SelectItem>
              <SelectItem value="MST">MST (Mountain)</SelectItem>
              <SelectItem value="CST">CST (Central)</SelectItem>
              <SelectItem value="EST">EST (Eastern)</SelectItem>
              <SelectItem value="GMT">GMT (UTC)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Expertise */}
      <div className="space-y-3">
        <Label>Areas of Expertise</Label>
        <div className="flex gap-2">
          <Input
            value={newExpertise}
            onChange={(e) => setNewExpertise(e.target.value)}
            placeholder="Add expertise area"
            onKeyPress={(e) => e.key === 'Enter' && handleAddExpertise()}
          />
          <Button onClick={handleAddExpertise} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentUser.expertise.map((exp) => (
            <Badge key={exp} variant="secondary" className="flex items-center gap-1">
              {exp}
              <button type="button" onClick={() => handleRemoveExpertise(exp)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Industries */}
      <div className="space-y-3">
        <Label>Industries</Label>
        <div className="flex gap-2">
          <Input
            value={newIndustry}
            onChange={(e) => setNewIndustry(e.target.value)}
            placeholder="Add industry"
            onKeyPress={(e) => e.key === 'Enter' && handleAddIndustry()}
          />
          <Button onClick={handleAddIndustry} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentUser.industries.map((ind) => (
            <Badge key={ind} variant="outline" className="flex items-center gap-1">
              {ind}
              <button type="button" onClick={() => handleRemoveIndustry(ind)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Goals */}
      <div className="space-y-3">
        <Label>Goals</Label>
        <div className="flex gap-2">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add a goal"
            onKeyPress={(e) => e.key === 'Enter' && handleAddGoal()}
          />
          <Button onClick={handleAddGoal} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentUser.goals.map((goal) => (
            <Badge key={goal} variant="default" className="flex items-center gap-1">
              {goal}
              <button type="button" onClick={() => handleRemoveGoal(goal)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <Label>Interests</Label>
        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="Add an interest"
            onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
          />
          <Button onClick={handleAddInterest} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map((interest) => (
            <Badge key={interest} variant="secondary" className="flex items-center gap-1">
              {interest}
              <button type="button" onClick={() => handleRemoveInterest(interest)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Experience</Label>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
        <div className="space-y-3">
          {currentUser.experience.map((exp, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company</Label>
                    <Input value={exp.company} placeholder="Company name" />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <Input value={exp.position} placeholder="Job title" />
                  </div>
                  <div>
                    <Label>Industry</Label>
                    <Input value={exp.industry} placeholder="Industry" />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <div className="flex gap-2">
                      <Input value={exp.startDate} placeholder="Start date" />
                      <Input value={exp.endDate || ""} placeholder="End date" />
                    </div>
                  </div>
                </div>
                <Textarea
                  value={exp.description}
                  placeholder="Description of your role and achievements"
                  className="mt-4"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-medium">Education</Label>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
        <div className="space-y-3">
          {currentUser.education.map((edu, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Institution</Label>
                    <Input value={edu.institution} placeholder="University/College" />
                  </div>
                  <div>
                    <Label>Degree</Label>
                    <Input value={edu.degree} placeholder="Degree type" />
                  </div>
                  <div>
                    <Label>Field of Study</Label>
                    <Input value={edu.field} placeholder="Major/Field" />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <div className="flex gap-2">
                      <Input value={edu.startDate} placeholder="Start date" />
                      <Input value={edu.endDate} placeholder="End date" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-medium">Availability</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
            <Card key={day}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Label className="capitalize">{day}</Label>
                  <Checkbox />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-xs">Start Time</Label>
                    <Input type="time" />
                  </div>
                  <div>
                    <Label className="text-xs">End Time</Label>
                    <Input type="time" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <Label>Languages</Label>
        <div className="flex flex-wrap gap-2">
          {currentUser.languages.map((lang) => (
            <Badge key={lang} variant="secondary">
              {lang}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="available"
            checked={currentUser.isAvailable}
            onCheckedChange={(checked) => handleInputChange("isAvailable", checked)}
          />
          <Label htmlFor="available">Available for mentoring sessions</Label>
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{currentUser.name}</h3>
              <p className="text-muted-foreground capitalize">{currentUser.userType}</p>
              <p className="text-sm text-muted-foreground">{currentUser.location}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Bio</h4>
            <p className="text-muted-foreground">{currentUser.bio}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-1">
                {currentUser.expertise.map((exp) => (
                  <Badge key={exp} variant="secondary" className="text-xs">
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Industries</h4>
              <div className="flex flex-wrap gap-1">
                {currentUser.industries.map((ind) => (
                  <Badge key={ind} variant="outline" className="text-xs">
                    {ind}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Goals</h4>
            <div className="flex flex-wrap gap-1">
              {currentUser.goals.map((goal) => (
                <Badge key={goal} variant="default" className="text-xs">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCurrentStep = () => {
    switch (activeStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      default: return renderStep1()
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              step <= activeStep ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-muted-foreground'
            }`}>
              {getStepIcon(step)}
            </div>
            {step < 5 && (
              <div className={`w-16 h-0.5 mx-2 ${
                step < activeStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{getStepTitle(activeStep)}</h2>
        <p className="text-muted-foreground">Step {activeStep} of 5</p>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
          disabled={activeStep === 1}
        >
          Previous
        </Button>
        
        {activeStep < 5 ? (
          <Button onClick={() => setActiveStep(activeStep + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Profile
          </Button>
        )}
      </div>
    </div>
  )
} 