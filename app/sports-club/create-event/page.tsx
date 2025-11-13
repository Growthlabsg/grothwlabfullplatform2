"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Target,
  Plus,
  Save,
  X
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useSharedEvents } from "@/contexts/SharedEventsContext"

const SPORTS = [
  { value: "soccer", label: "Soccer", emoji: "⚽" },
  { value: "basketball", label: "Basketball", emoji: "🏀" },
  { value: "tennis", label: "Tennis", emoji: "🎾" },
  { value: "volleyball", label: "Volleyball", emoji: "🏐" },
  { value: "running", label: "Running", emoji: "🏃" },
  { value: "swimming", label: "Swimming", emoji: "🏊" },
  { value: "badminton", label: "Badminton", emoji: "🏸" },
  { value: "table-tennis", label: "Table Tennis", emoji: "🏓" },
  { value: "golf", label: "Golf", emoji: "⛳" },
  { value: "cycling", label: "Cycling", emoji: "🚴" },
  { value: "yoga", label: "Yoga", emoji: "🧘" },
  { value: "fitness", label: "Fitness", emoji: "💪" }
]

const DIFFICULTY_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "all-levels", label: "All Levels" }
]

export default function CreateSportsEventPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { addEvent } = useSharedEvents()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sport: "",
    location: "",
    date: "",
    time: "",
    duration: "2 hours",
    capacity: 20,
    price: "Free",
    difficulty: "all-levels",
    teamsAllowed: false,
    teamSize: 5,
    networkingEnabled: false,
    networkingTheme: "",
    networkingTime: "",
    requirements: "",
    tags: [] as string[],
    virtual: false,
    language: "English"
  })

  const [newTag, setNewTag] = useState("")

  const steps = [
    { number: 1, title: "Basic Info", description: "Event title and description" },
    { number: 2, title: "Details", description: "Date, time, and location" },
    { number: 3, title: "Sports Info", description: "Sport type and capacity" },
    { number: 4, title: "Networking", description: "Networking and team settings" },
    { number: 5, title: "Review", description: "Review and create event" }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.sport || !formData.location || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const newEvent = {
        id: `sports-event-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        category: "Sports",
        price: formData.price,
        attendees: `${formData.capacity}+`,
        featured: false,
        image: `/sports-${formData.sport}.png`,
        organizer: {
          id: "current-user",
          name: "You",
          avatar: "/placeholder.svg"
        },
        eventType: 'sports' as const,
        sport: formData.sport,
        duration: formData.duration,
        capacity: formData.capacity,
        registered: 0,
        teamsAllowed: formData.teamsAllowed,
        networking: formData.networkingEnabled ? {
          enabled: true,
          theme: formData.networkingTheme || undefined,
          time: formData.networkingTime || undefined
        } : { enabled: false },
        tags: formData.tags,
        virtual: formData.virtual,
        language: formData.language,
        difficulty: formData.difficulty,
        requirements: formData.requirements,
        status: "Open for Registration"
      }

      addEvent(newEvent)

      toast({
        title: "Event Created Successfully!",
        description: `${formData.title} has been created and will appear in both the sports club and main events calendar.`,
      })

      router.push("/sports-club")
    } catch (error) {
      toast({
        title: "Error Creating Event",
        description: "There was an error creating your event. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sports-club">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sports Club
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Sports Event</h1>
                <p className="text-gray-600">Create a new sports event for the Founders Sports Club</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-[#0F7377] border-[#0F7377] text-white' 
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <Trophy className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-[#0F7377]' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                {steps[currentStep - 1].title}
              </CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Founder's Football Match"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your sports event..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sport">Sport Type *</Label>
                    <Select value={formData.sport} onValueChange={(value) => handleInputChange('sport', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sport" />
                      </SelectTrigger>
                      <SelectContent>
                        {SPORTS.map((sport) => (
                          <SelectItem key={sport.value} value={sport.value}>
                            <span className="flex items-center">
                              <span className="mr-2">{sport.emoji}</span>
                              {sport.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 hour">1 hour</SelectItem>
                        <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                        <SelectItem value="2 hours">2 hours</SelectItem>
                        <SelectItem value="3 hours">3 hours</SelectItem>
                        <SelectItem value="4 hours">4 hours</SelectItem>
                        <SelectItem value="All day">All day</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Singapore Sports Hub"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="virtual"
                      checked={formData.virtual}
                      onCheckedChange={(checked) => handleInputChange('virtual', checked)}
                    />
                    <Label htmlFor="virtual">Virtual Event</Label>
                  </div>
                </div>
              )}

              {/* Step 3: Sports Info */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Capacity *</Label>
                      <Input
                        id="capacity"
                        type="number"
                        min="1"
                        value={formData.capacity}
                        onChange={(e) => handleInputChange('capacity', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        placeholder="e.g., Free, $10, $20"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleInputChange('difficulty', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {DIFFICULTY_LEVELS.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="e.g., Bring your own equipment, wear appropriate attire..."
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {formData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Networking */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="teamsAllowed"
                      checked={formData.teamsAllowed}
                      onCheckedChange={(checked) => handleInputChange('teamsAllowed', checked)}
                    />
                    <Label htmlFor="teamsAllowed">Allow Teams</Label>
                  </div>

                  {formData.teamsAllowed && (
                    <div>
                      <Label htmlFor="teamSize">Team Size</Label>
                      <Input
                        id="teamSize"
                        type="number"
                        min="2"
                        max="20"
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value))}
                      />
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="networkingEnabled"
                      checked={formData.networkingEnabled}
                      onCheckedChange={(checked) => handleInputChange('networkingEnabled', checked)}
                    />
                    <Label htmlFor="networkingEnabled">Enable Networking Session</Label>
                  </div>

                  {formData.networkingEnabled && (
                    <div className="space-y-4 pl-6">
                      <div>
                        <Label htmlFor="networkingTheme">Networking Theme</Label>
                        <Input
                          id="networkingTheme"
                          placeholder="e.g., Startup Pitches & Pickleball"
                          value={formData.networkingTheme}
                          onChange={(e) => handleInputChange('networkingTheme', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="networkingTime">Networking Time</Label>
                        <Input
                          id="networkingTime"
                          placeholder="e.g., 30 minutes after the game"
                          value={formData.networkingTime}
                          onChange={(e) => handleInputChange('networkingTime', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Malay">Malay</SelectItem>
                        <SelectItem value="Tamil">Tamil</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Event Preview</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Title:</span> {formData.title}
                      </div>
                      <div>
                        <span className="font-medium">Sport:</span> {SPORTS.find(s => s.value === formData.sport)?.label || formData.sport}
                      </div>
                      <div>
                        <span className="font-medium">Date & Time:</span> {formData.date} at {formData.time}
                      </div>
                      <div>
                        <span className="font-medium">Location:</span> {formData.location}
                      </div>
                      <div>
                        <span className="font-medium">Duration:</span> {formData.duration}
                      </div>
                      <div>
                        <span className="font-medium">Capacity:</span> {formData.capacity} participants
                      </div>
                      <div>
                        <span className="font-medium">Price:</span> {formData.price}
                      </div>
                      {formData.teamsAllowed && (
                        <div>
                          <span className="font-medium">Teams:</span> Allowed (Size: {formData.teamSize})
                        </div>
                      )}
                      {formData.networkingEnabled && (
                        <div>
                          <span className="font-medium">Networking:</span> {formData.networkingTheme || 'General networking'}
                        </div>
                      )}
                      {formData.tags.length > 0 && (
                        <div>
                          <span className="font-medium">Tags:</span> {formData.tags.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                
                {currentStep < steps.length ? (
                  <Button onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Create Event
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
