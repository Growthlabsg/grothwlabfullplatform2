"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, X, Save, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface CoFounderProfile {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    timezone: string
    bio: string
  }
  professional: {
    currentRole: string
    company: string
    experience: string
    industry: string
    skills: string[]
    achievements: string
  }
  startup: {
    vision: string
    problems: string[]
    targetMarket: string
    businessModel: string
    fundingStage: string
    equityExpectation: string
  }
  workingStyle: {
    workPreference: string
    timeCommitment: string
    communicationStyle: string
    leadershipStyle: string
    conflictResolution: string
  }
  expectations: {
    cofounderRole: string
    responsibilities: string[]
    qualities: string[]
    dealBreakers: string[]
  }
  social: {
    linkedin: string
    github: string
    twitter: string
    website: string
    portfolio: string
  }
  availability: {
    startDate: string
    timezone: string
    schedule: string
  }
}

export default function CreateCoFounderProfile() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<CoFounderProfile>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      timezone: "",
      bio: ""
    },
    professional: {
      currentRole: "",
      company: "",
      experience: "",
      industry: "",
      skills: [],
      achievements: ""
    },
    startup: {
      vision: "",
      problems: [],
      targetMarket: "",
      businessModel: "",
      fundingStage: "",
      equityExpectation: ""
    },
    workingStyle: {
      workPreference: "",
      timeCommitment: "",
      communicationStyle: "",
      leadershipStyle: "",
      conflictResolution: ""
    },
    expectations: {
      cofounderRole: "",
      responsibilities: [],
      qualities: [],
      dealBreakers: []
    },
    social: {
      linkedin: "",
      github: "",
      twitter: "",
      website: "",
      portfolio: ""
    },
    availability: {
      startDate: "",
      timezone: "",
      schedule: ""
    }
  })

  const [newSkill, setNewSkill] = useState("")
  const [newProblem, setNewProblem] = useState("")
  const [newResponsibility, setNewResponsibility] = useState("")
  const [newQuality, setNewQuality] = useState("")
  const [newDealBreaker, setNewDealBreaker] = useState("")

  const steps = [
    { id: 1, title: "Personal Information", description: "Basic details about yourself" },
    { id: 2, title: "Professional Background", description: "Your work experience and skills" },
    { id: 3, title: "Startup Vision", description: "What you want to build" },
    { id: 4, title: "Working Style", description: "How you prefer to work" },
    { id: 5, title: "Expectations", description: "What you're looking for" },
    { id: 6, title: "Social Links", description: "Your online presence" },
    { id: 7, title: "Availability", description: "When you can start" }
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = () => {
    toast({
      title: "Profile Saved",
      description: "Your co-founder profile has been saved successfully.",
    })
  }

  const handleSubmit = () => {
    toast({
      title: "Profile Created",
      description: "Your co-founder profile has been created and is now live!",
    })
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfile(prev => ({
        ...prev,
        professional: {
          ...prev.professional,
          skills: [...prev.professional.skills, newSkill.trim()]
        }
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setProfile(prev => ({
      ...prev,
      professional: {
        ...prev.professional,
        skills: prev.professional.skills.filter((_, i) => i !== index)
      }
    }))
  }

  const addProblem = () => {
    if (newProblem.trim()) {
      setProfile(prev => ({
        ...prev,
        startup: {
          ...prev.startup,
          problems: [...prev.startup.problems, newProblem.trim()]
        }
      }))
      setNewProblem("")
    }
  }

  const removeProblem = (index: number) => {
    setProfile(prev => ({
      ...prev,
      startup: {
        ...prev.startup,
        problems: prev.startup.problems.filter((_, i) => i !== index)
      }
    }))
  }

  const addResponsibility = () => {
    if (newResponsibility.trim()) {
      setProfile(prev => ({
        ...prev,
        expectations: {
          ...prev.expectations,
          responsibilities: [...prev.expectations.responsibilities, newResponsibility.trim()]
        }
      }))
      setNewResponsibility("")
    }
  }

  const removeResponsibility = (index: number) => {
    setProfile(prev => ({
      ...prev,
      expectations: {
        ...prev.expectations,
        responsibilities: prev.expectations.responsibilities.filter((_, i) => i !== index)
      }
    }))
  }

  const addQuality = () => {
    if (newQuality.trim()) {
      setProfile(prev => ({
        ...prev,
        expectations: {
          ...prev.expectations,
          qualities: [...prev.expectations.qualities, newQuality.trim()]
        }
      }))
      setNewQuality("")
    }
  }

  const removeQuality = (index: number) => {
    setProfile(prev => ({
      ...prev,
      expectations: {
        ...prev.expectations,
        qualities: prev.expectations.qualities.filter((_, i) => i !== index)
      }
    }))
  }

  const addDealBreaker = () => {
    if (newDealBreaker.trim()) {
      setProfile(prev => ({
        ...prev,
        expectations: {
          ...prev.expectations,
          dealBreakers: [...prev.expectations.dealBreakers, newDealBreaker.trim()]
        }
      }))
      setNewDealBreaker("")
    }
  }

  const removeDealBreaker = (index: number) => {
    setProfile(prev => ({
      ...prev,
      expectations: {
        ...prev.expectations,
        dealBreakers: prev.expectations.dealBreakers.filter((_, i) => i !== index)
      }
    }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={profile.personalInfo.name}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.personalInfo.email}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.personalInfo.phone}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={profile.personalInfo.location}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, location: e.target.value }
                  }))}
                  placeholder="City, Country"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={profile.personalInfo.timezone} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, timezone: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                  <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                  <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                  <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                  <SelectItem value="UTC+8">UTC+8 (SGT)</SelectItem>
                  <SelectItem value="UTC+9">UTC+9 (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={profile.personalInfo.bio}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, bio: e.target.value }
                }))}
                placeholder="Tell us about yourself, your background, and what makes you unique..."
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentRole">Current Role *</Label>
                <Input
                  id="currentRole"
                  value={profile.professional.currentRole}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    professional: { ...prev.professional, currentRole: e.target.value }
                  }))}
                  placeholder="e.g., Software Engineer, Product Manager"
                />
              </div>
              <div>
                <Label htmlFor="company">Current Company</Label>
                <Input
                  id="company"
                  value={profile.professional.company}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    professional: { ...prev.professional, company: e.target.value }
                  }))}
                  placeholder="Your current company"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Years of Experience *</Label>
                <Select value={profile.professional.experience} onValueChange={(value) => setProfile(prev => ({
                  ...prev,
                  professional: { ...prev.professional, experience: value }
                }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="2-5">2-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select value={profile.professional.industry} onValueChange={(value) => setProfile(prev => ({
                  ...prev,
                  professional: { ...prev.professional, industry: value }
                }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="skills">Skills & Expertise *</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button type="button" onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.professional.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="achievements">Key Achievements</Label>
              <Textarea
                id="achievements"
                value={profile.professional.achievements}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  professional: { ...prev.professional, achievements: e.target.value }
                }))}
                placeholder="Describe your key achievements, awards, or notable projects..."
                rows={3}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="vision">Startup Vision *</Label>
              <Textarea
                id="vision"
                value={profile.startup.vision}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  startup: { ...prev.startup, vision: e.target.value }
                }))}
                placeholder="Describe your vision for the startup you want to build..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="problems">Problems You Want to Solve *</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newProblem}
                    onChange={(e) => setNewProblem(e.target.value)}
                    placeholder="Add a problem you're passionate about solving"
                    onKeyPress={(e) => e.key === 'Enter' && addProblem()}
                  />
                  <Button type="button" onClick={addProblem} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.startup.problems.map((problem, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {problem}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeProblem(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetMarket">Target Market</Label>
                <Input
                  id="targetMarket"
                  value={profile.startup.targetMarket}
                  onChange={(e) => setProfile(prev => ({
                    ...prev,
                    startup: { ...prev.startup, targetMarket: e.target.value }
                  }))}
                  placeholder="Who is your target audience?"
                />
              </div>
              <div>
                <Label htmlFor="businessModel">Business Model</Label>
                <Select value={profile.startup.businessModel} onValueChange={(value) => setProfile(prev => ({
                  ...prev,
                  startup: { ...prev.startup, businessModel: value }
                }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="marketplace">Marketplace</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="advertising">Advertising</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fundingStage">Funding Stage</Label>
                <Select value={profile.startup.fundingStage} onValueChange={(value) => setProfile(prev => ({
                  ...prev,
                  startup: { ...prev.startup, fundingStage: value }
                }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Idea Stage</SelectItem>
                    <SelectItem value="mvp">MVP Stage</SelectItem>
                    <SelectItem value="seed">Seed Stage</SelectItem>
                    <SelectItem value="series-a">Series A</SelectItem>
                    <SelectItem value="series-b">Series B+</SelectItem>
                    <SelectItem value="bootstrapped">Bootstrapped</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="equityExpectation">Equity Expectation</Label>
                <Select value={profile.startup.equityExpectation} onValueChange={(value) => setProfile(prev => ({
                  ...prev,
                  startup: { ...prev.startup, equityExpectation: value }
                }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equity expectation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equal">Equal split (50/50)</SelectItem>
                    <SelectItem value="founder-majority">Founder majority (60/40)</SelectItem>
                    <SelectItem value="cofounder-majority">Co-founder majority (40/60)</SelectItem>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="workPreference">Work Preference *</Label>
              <Select value={profile.workingStyle.workPreference} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                workingStyle: { ...prev.workingStyle, workPreference: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select work preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="in-person">In-person</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timeCommitment">Time Commitment *</Label>
              <Select value={profile.workingStyle.timeCommitment} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                workingStyle: { ...prev.workingStyle, timeCommitment: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time commitment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time (20-30 hours/week)</SelectItem>
                  <SelectItem value="weekend">Weekend warrior</SelectItem>
                  <SelectItem value="evening">Evening hours</SelectItem>
                  <SelectItem value="flexible">Flexible schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="communicationStyle">Communication Style</Label>
              <Select value={profile.workingStyle.communicationStyle} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                workingStyle: { ...prev.workingStyle, communicationStyle: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select communication style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct and straightforward</SelectItem>
                  <SelectItem value="collaborative">Collaborative and consultative</SelectItem>
                  <SelectItem value="analytical">Analytical and data-driven</SelectItem>
                  <SelectItem value="creative">Creative and innovative</SelectItem>
                  <SelectItem value="supportive">Supportive and encouraging</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="leadershipStyle">Leadership Style</Label>
              <Select value={profile.workingStyle.leadershipStyle} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                workingStyle: { ...prev.workingStyle, leadershipStyle: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select leadership style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visionary">Visionary leader</SelectItem>
                  <SelectItem value="hands-on">Hands-on manager</SelectItem>
                  <SelectItem value="delegator">Delegator</SelectItem>
                  <SelectItem value="collaborative">Collaborative leader</SelectItem>
                  <SelectItem value="mentor">Mentor and coach</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="conflictResolution">Conflict Resolution Style</Label>
              <Select value={profile.workingStyle.conflictResolution} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                workingStyle: { ...prev.workingStyle, conflictResolution: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select conflict resolution style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="direct">Direct confrontation</SelectItem>
                  <SelectItem value="mediation">Mediation and compromise</SelectItem>
                  <SelectItem value="avoidance">Avoidance until necessary</SelectItem>
                  <SelectItem value="collaborative">Collaborative problem-solving</SelectItem>
                  <SelectItem value="data-driven">Data-driven decisions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="cofounderRole">Preferred Co-founder Role *</Label>
              <Select value={profile.expectations.cofounderRole} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                expectations: { ...prev.expectations, cofounderRole: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Co-founder</SelectItem>
                  <SelectItem value="business">Business Co-founder</SelectItem>
                  <SelectItem value="marketing">Marketing Co-founder</SelectItem>
                  <SelectItem value="operations">Operations Co-founder</SelectItem>
                  <SelectItem value="finance">Finance Co-founder</SelectItem>
                  <SelectItem value="product">Product Co-founder</SelectItem>
                  <SelectItem value="flexible">Flexible/Open</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="responsibilities">Key Responsibilities</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    placeholder="Add a responsibility"
                    onKeyPress={(e) => e.key === 'Enter' && addResponsibility()}
                  />
                  <Button type="button" onClick={addResponsibility} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.expectations.responsibilities.map((responsibility, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {responsibility}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeResponsibility(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="qualities">Desired Qualities in Co-founder</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newQuality}
                    onChange={(e) => setNewQuality(e.target.value)}
                    placeholder="Add a quality"
                    onKeyPress={(e) => e.key === 'Enter' && addQuality()}
                  />
                  <Button type="button" onClick={addQuality} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.expectations.qualities.map((quality, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {quality}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeQuality(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="dealBreakers">Deal Breakers</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={newDealBreaker}
                    onChange={(e) => setNewDealBreaker(e.target.value)}
                    placeholder="Add a deal breaker"
                    onKeyPress={(e) => e.key === 'Enter' && addDealBreaker()}
                  />
                  <Button type="button" onClick={addDealBreaker} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.expectations.dealBreakers.map((dealBreaker, index) => (
                    <Badge key={index} variant="destructive" className="flex items-center gap-1">
                      {dealBreaker}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeDealBreaker(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input
                id="linkedin"
                value={profile.social.linkedin}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social: { ...prev.social, linkedin: e.target.value }
                }))}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <Label htmlFor="github">GitHub Profile</Label>
              <Input
                id="github"
                value={profile.social.github}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social: { ...prev.social, github: e.target.value }
                }))}
                placeholder="https://github.com/yourusername"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter Profile</Label>
              <Input
                id="twitter"
                value={profile.social.twitter}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social: { ...prev.social, twitter: e.target.value }
                }))}
                placeholder="https://twitter.com/yourusername"
              />
            </div>
            <div>
              <Label htmlFor="website">Personal Website</Label>
              <Input
                id="website"
                value={profile.social.website}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social: { ...prev.social, website: e.target.value }
                }))}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio/Work Samples</Label>
              <Input
                id="portfolio"
                value={profile.social.portfolio}
                onChange={(e) => setProfile(prev => ({
                  ...prev,
                  social: { ...prev.social, portfolio: e.target.value }
                }))}
                placeholder="Link to your portfolio or work samples"
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="startDate">When can you start? *</Label>
              <Select value={profile.availability.startDate} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                availability: { ...prev.availability, startDate: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select start date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                  <SelectItem value="3-months">Within 3 months</SelectItem>
                  <SelectItem value="6-months">Within 6 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Preferred Timezone</Label>
              <Select value={profile.availability.timezone} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                availability: { ...prev.availability, timezone: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                  <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                  <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                  <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                  <SelectItem value="UTC+8">UTC+8 (SGT)</SelectItem>
                  <SelectItem value="UTC+9">UTC+9 (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="schedule">Preferred Schedule</Label>
              <Select value={profile.availability.schedule} onValueChange={(value) => setProfile(prev => ({
                ...prev,
                availability: { ...prev.availability, schedule: value }
              }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-5">9 AM - 5 PM</SelectItem>
                  <SelectItem value="flexible">Flexible hours</SelectItem>
                  <SelectItem value="evening">Evening hours</SelectItem>
                  <SelectItem value="weekend">Weekend work</SelectItem>
                  <SelectItem value="as-needed">As needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" asChild>
              <Link href="/network/find-cofounder">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Find Co-founder
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Create Co-founder Profile</h1>
          <p className="text-gray-600 mt-2">
            Build a comprehensive profile to find the perfect co-founder match
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-[#0F7377] text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id}
                </div>
                <div className="ml-3 hidden md:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-[#0F7377]' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-[#0F7377]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-2 rounded cursor-pointer ${
                        currentStep === step.id
                          ? 'bg-[#0F7377]/10 text-[#0F7377]'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <p className="text-sm font-medium">{step.title}</p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                <p className="text-gray-600">{steps[currentStep - 1].description}</p>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                {currentStep === steps.length ? (
                  <Button onClick={handleSubmit} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    Create Profile
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
