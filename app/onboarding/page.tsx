"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react"
import type { UserRole } from "@/types/auth"

const ROLES: { label: string; value: UserRole }[] = [
  { label: "Founder", value: "startup" },
  { label: "Angel Investor", value: "investor" },
  { label: "Mentor", value: "mentor" },
  { label: "VC", value: "investor" },
  { label: "Student", value: "startup" },
]

const AFFILIATIONS: string[] = [
  "Startup",
  "Accelerator",
  "Incubator",
  "Venture Builder",
  "VC Firm",
  "Corporate",
  "Government",
  "Other Investors",
  "Others",
]

const GOALS: string[] = [
  "Discover new collaboration, investment, and mentorship opportunities",
  "Find Incubators/Accelerators",
  "Find Investees",
  "Find Investors",
  "Find Mentees",
  "Find Mentors",
  "Partner with Corporates",
  "Partner with Intermediaries",
  "Partner with Startups",
]

const INTERESTS: string[] = [
  "AI",
  "Big Data",
  "Data Analysis",
  "E-Commerce",
  "Education",
  "Enterprise Solutions",
  "Fintech",
  "IoT",
  "Lifestyle",
  "SaaS",
]

export default function OnboardingPage() {
  const { user, completeProfile, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [activeStep, setActiveStep] = useState(0)
  const [displayName, setDisplayName] = useState("")
  const [designation, setDesignation] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([])
  const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>([])
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [customInterest, setCustomInterest] = useState("")
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true)
  const [error, setError] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  // Only run client-side code after mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const steps = [
    { title: "Basic Information", description: "Tell us about yourself" },
    { title: "Role & Affiliation", description: "Select your roles and affiliations" },
    { title: "Goals", description: "What would you like to do on the platform?" },
    { title: "Interests", description: "Select your sector interests" },
  ]

  const progress = ((activeStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (activeStep === 0) {
      if (!displayName || !designation) {
        setError("Display name and designation are required")
        return
      }
    } else if (activeStep === 1) {
      if (selectedRoles.length === 0) {
        setError("Please select at least one role")
        return
      }
    } else if (activeStep === 2) {
      if (selectedGoals.length === 0) {
        setError("Please select at least one goal")
        return
      }
    } else if (activeStep === 3) {
      if (selectedInterests.length === 0 && !customInterest) {
        setError("Please select at least one interest or add a custom one")
        return
      }
    }

    setError("")
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!displayName || !designation) {
      setError("Display name and designation are required")
      setActiveStep(0)
      return
    }

    if (selectedRoles.length === 0) {
      setError("Please select at least one role")
      setActiveStep(1)
      return
    }

    if (selectedGoals.length === 0) {
      setError("Please select at least one goal")
      setActiveStep(2)
      return
    }

    if (selectedInterests.length === 0 && !customInterest) {
      setError("Please select at least one interest or add a custom one")
      setActiveStep(3)
      return
    }

    try {
      // Add custom interest if provided
      const interests = [...selectedInterests]
      if (customInterest && !interests.includes(customInterest)) {
        interests.push(customInterest)
      }

      await completeProfile({
        displayName,
        designation,
        linkedinUrl,
        roles: selectedRoles,
        affiliations: selectedAffiliations,
        goals: selectedGoals,
        interests,
        newsletterSubscribed,
      })

      toast({
        title: "Profile completed",
        description: "Your profile has been successfully updated.",
      })

      // Use router.push instead of directly accessing location
      router.push("/dashboard")
    } catch (error) {
      console.error("Profile update error:", error)
      setError("Failed to update profile. Please try again.")
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleRole = (role: UserRole) => {
    setSelectedRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]))
  }

  const toggleAffiliation = (affiliation: string) => {
    setSelectedAffiliations((prev) =>
      prev.includes(affiliation) ? prev.filter((a) => a !== affiliation) : [...prev, affiliation],
    )
  }

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  // Only render the component on the client side
  if (!isMounted) {
    return null
  }

  if (!user) {
    // Use router.push instead of directly accessing location
    router.push("/login")
    return null
  }

  return (
      <div className="container mx-auto max-w-4xl py-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Help Us Know You Better</CardTitle>
            <CardDescription>Complete your profile to get the most out of GrowthLab</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">
                  Step {activeStep + 1} of {steps.length}
                </span>
                <span className="text-sm font-medium">{steps[activeStep]?.title}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeStep === 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Basic Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name *</Label>
                      <Input
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Input
                        id="designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Role Selection</h3>
                  <p className="text-sm text-muted-foreground">Select all that apply</p>
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {ROLES.map((role) => (
                      <div key={role.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`role-${role.value}`}
                          checked={selectedRoles.includes(role.value)}
                          onCheckedChange={() => toggleRole(role.value)}
                        />
                        <Label htmlFor={`role-${role.value}`}>{role.label}</Label>
                      </div>
                    ))}
                  </div>

                  <h3 className="mt-6 text-lg font-medium">Affiliation</h3>
                  <p className="text-sm text-muted-foreground">Select all that apply</p>
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    {AFFILIATIONS.map((affiliation) => (
                      <div key={affiliation} className="flex items-center space-x-2">
                        <Checkbox
                          id={`affiliation-${affiliation}`}
                          checked={selectedAffiliations.includes(affiliation)}
                          onCheckedChange={() => toggleAffiliation(affiliation)}
                        />
                        <Label htmlFor={`affiliation-${affiliation}`}>{affiliation}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">What would you like to do on the platform?</h3>
                  <p className="text-sm text-muted-foreground">Select all that apply</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {GOALS.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox
                          id={`goal-${goal}`}
                          checked={selectedGoals.includes(goal)}
                          onCheckedChange={() => toggleGoal(goal)}
                        />
                        <Label htmlFor={`goal-${goal}`}>{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sector Interests</h3>
                  <p className="text-sm text-muted-foreground">Select all that apply</p>
                  <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {INTERESTS.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${interest}`}
                          checked={selectedInterests.includes(interest)}
                          onCheckedChange={() => toggleInterest(interest)}
                        />
                        <Label htmlFor={`interest-${interest}`}>{interest}</Label>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customInterest">Other Interest</Label>
                    <Input
                      id="customInterest"
                      placeholder="Enter a custom sector interest"
                      value={customInterest}
                      onChange={(e) => setCustomInterest(e.target.value)}
                    />
                  </div>

                  <div className="mt-6 flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={newsletterSubscribed}
                      onCheckedChange={(checked) => setNewsletterSubscribed(!!checked)}
                    />
                    <Label htmlFor="newsletter">Subscribe to our newsletter for updates on events and news</Label>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleBack} disabled={activeStep === 0 || isLoading}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {activeStep < steps.length - 1 ? (
              <Button
                type="button"
                className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                onClick={handleNext}
                disabled={isLoading}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
  )
}
