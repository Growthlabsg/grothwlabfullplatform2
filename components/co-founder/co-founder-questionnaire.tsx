"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle } from "lucide-react"

export function CoFounderQuestionnaire() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNext = () => {
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevious = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setStep(4) // Success step
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Co-Founder Matching Questionnaire</CardTitle>
          <CardDescription>
            Help us find your ideal co-founder by sharing information about yourself and what you're looking for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Current Location</Label>
                <Select>
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select your location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="singapore">Singapore</SelectItem>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="indonesia">Indonesia</SelectItem>
                    <SelectItem value="thailand">Thailand</SelectItem>
                    <SelectItem value="vietnam">Vietnam</SelectItem>
                    <SelectItem value="philippines">Philippines</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Are you willing to relocate?</Label>
                <RadioGroup defaultValue="yes">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="relocate-yes" />
                    <Label htmlFor="relocate-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="relocate-no" />
                    <Label htmlFor="relocate-no">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="remote" id="relocate-remote" />
                    <Label htmlFor="relocate-remote">Prefer Remote Collaboration</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="background">Professional Background</Label>
                <Select>
                  <SelectTrigger id="background">
                    <SelectValue placeholder="Select your background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical (Engineering/Development)</SelectItem>
                    <SelectItem value="business">Business (Sales/Marketing)</SelectItem>
                    <SelectItem value="design">Design (UX/UI/Product)</SelectItem>
                    <SelectItem value="operations">Operations/Finance</SelectItem>
                    <SelectItem value="domain">Domain Expert</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills (comma separated)</Label>
                <Textarea id="skills" placeholder="e.g., Python, React, Product Management, UX Design" />
              </div>

              <div className="space-y-2">
                <Label>Previous Startup Experience</Label>
                <RadioGroup defaultValue="yes">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="startup-yes" />
                    <Label htmlFor="startup-yes">Yes, as a founder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employee" id="startup-employee" />
                    <Label htmlFor="startup-employee">Yes, as an employee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="startup-no" />
                    <Label htmlFor="startup-no">No previous startup experience</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievements">Notable Achievements</Label>
                <Textarea
                  id="achievements"
                  placeholder="Share your professional achievements or projects you're proud of"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="idea">Do you have a startup idea?</Label>
                <RadioGroup defaultValue="yes">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="idea-yes" />
                    <Label htmlFor="idea-yes">Yes, I have a specific idea</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="idea-flexible" />
                    <Label htmlFor="idea-flexible">I'm flexible and open to ideas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="idea-no" />
                    <Label htmlFor="idea-no">No, I want to join someone with an idea</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Preferred Industry</Label>
                <Select>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select preferred industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fintech">FinTech</SelectItem>
                    <SelectItem value="healthtech">HealthTech</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="edtech">EdTech</SelectItem>
                    <SelectItem value="ai">AI/ML</SelectItem>
                    <SelectItem value="sustainability">Sustainability</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="looking-for">What are you looking for in a co-founder?</Label>
                <Textarea
                  id="looking-for"
                  placeholder="Describe the skills, experience, and qualities you're looking for"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="commitment">Time Commitment</Label>
                <Select>
                  <SelectTrigger id="commitment">
                    <SelectValue placeholder="Select time commitment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time (20+ hours/week)</SelectItem>
                    <SelectItem value="evenings">Evenings and weekends</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="values">Your Core Values</Label>
                <Textarea id="values" placeholder="What values are important to you in a business partnership?" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="py-6 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[#1E293B]">Questionnaire Submitted!</h3>
              <p className="mb-6 text-[#334155]">
                Thank you for completing the co-founder matching questionnaire. We'll analyze your responses and suggest
                potential matches within 48 hours.
              </p>
              <div className="space-y-4">
                <p className="font-medium text-[#1E293B]">Next steps:</p>
                <ol className="mx-auto max-w-md list-decimal space-y-2 text-left text-[#334155]">
                  <li>We'll email you when potential matches are available</li>
                  <li>Review suggested profiles and express interest in those you'd like to connect with</li>
                  <li>If there's mutual interest, we'll facilitate an introduction</li>
                  <li>Start a trial project to test compatibility before committing</li>
                </ol>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step < 4 && (
            <>
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={handleNext}>Next</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              )}
              {step === 1 && <div></div>}
            </>
          )}
          {step === 4 && (
            <Button className="mx-auto" onClick={() => (window.location.href = "/dashboard")}>
              Go to Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
