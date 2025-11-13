"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, CheckCircle2, MapPin, Clock, Briefcase, Upload, FileText } from "lucide-react"
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
} from "@/components/ui/stepper"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"

export default function TestJobApplicationFlow() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    resume: null as File | null,
    coverLetter: null as File | null,
    linkedIn: "",
    portfolio: "",
    additionalInfo: "",
  })
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (!formData.resume) {
        toast({
          title: "Resume required",
          description: "Please upload your resume before proceeding.",
          variant: "destructive",
        })
        return
      }
    }

    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the data to an API
    console.log("Submitting application:", formData)

    // Simulate API call
    setTimeout(() => {
      setStep(4) // Move to success step
      window.scrollTo(0, 0)
    }, 1500)
  }

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/jobs/find-startup-jobs" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold mb-4">Apply for Job - Test Flow</h1>
          <p className="text-[#334155] max-w-3xl">
            This is a test flow for applying to a job on GrowthLab. Follow the steps to submit your application.
          </p>
        </div>

        <Stepper className="mb-10">
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Personal Information</StepTitle>
            <StepDescription>Contact details</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Resume & Documents</StepTitle>
            <StepDescription>Upload your resume</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Additional Information</StepTitle>
            <StepDescription>Links and other details</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Review & Submit</StepTitle>
            <StepDescription>Finalize your application</StepDescription>
          </Step>
        </Stepper>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Personal Information"}
                  {step === 2 && "Resume & Documents"}
                  {step === 3 && "Additional Information"}
                  {step === 4 && "Application Submitted!"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="full-name">Full Name*</Label>
                      <Input
                        id="full-name"
                        placeholder="e.g. John Smith"
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g. john.smith@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input
                        id="phone"
                        placeholder="e.g. +65 9123 4567"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="resume">Resume/CV*</Label>
                      <div className="mt-2 border-2 border-dashed rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your resume here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Supported formats: PDF, DOCX, RTF (Max 5MB)
                        </p>
                        <Input
                          id="resume"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.rtf"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            handleFileChange("resume", file)
                          }}
                        />
                        <Button variant="outline" onClick={() => document.getElementById("resume")?.click()}>
                          Browse Files
                        </Button>
                        {formData.resume && (
                          <div className="mt-4 text-left bg-muted p-3 rounded-md flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-[#0F7377]" />
                            <span className="text-sm">{formData.resume.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cover-letter">Cover Letter (Optional)</Label>
                      <div className="mt-2 border-2 border-dashed rounded-md p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your cover letter here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          Supported formats: PDF, DOCX, RTF (Max 5MB)
                        </p>
                        <Input
                          id="cover-letter"
                          type="file"
                          className="hidden"
                          accept=".pdf,.docx,.rtf"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null
                            handleFileChange("coverLetter", file)
                          }}
                        />
                        <Button variant="outline" onClick={() => document.getElementById("cover-letter")?.click()}>
                          Browse Files
                        </Button>
                        {formData.coverLetter && (
                          <div className="mt-4 text-left bg-muted p-3 rounded-md flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-[#0F7377]" />
                            <span className="text-sm">{formData.coverLetter.name}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn Profile (Optional)</Label>
                      <Input
                        id="linkedin"
                        placeholder="e.g. https://linkedin.com/in/johnsmith"
                        value={formData.linkedIn}
                        onChange={(e) => handleChange("linkedIn", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
                      <Input
                        id="portfolio"
                        placeholder="e.g. https://johnsmith.com"
                        value={formData.portfolio}
                        onChange={(e) => handleChange("portfolio", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="additional-info">Additional Information (Optional)</Label>
                      <Textarea
                        id="additional-info"
                        placeholder="Share anything else that might be relevant to your application..."
                        rows={4}
                        value={formData.additionalInfo}
                        onChange={(e) => handleChange("additionalInfo", e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleSubmit} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Submit Application
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="py-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Application Submitted Successfully!</h2>
                    <p className="text-[#334155] mb-6">
                      Your application has been submitted. The employer will review your application and contact you if
                      they're interested.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild>
                        <Link href="/jobs/applications/tracking">Track Your Applications</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/jobs/find-startup-jobs">Browse More Jobs</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-lg">Senior Full Stack Developer</h3>
                      <p className="text-[#334155]">TechNova Solutions</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center text-sm text-[#334155]">
                        <MapPin className="h-4 w-4 mr-1" />
                        Singapore
                      </div>
                      <div className="flex items-center text-sm text-[#334155]">
                        <Clock className="h-4 w-4 mr-1" />
                        Full-time
                      </div>
                      <div className="flex items-center text-sm text-[#334155]">
                        <Briefcase className="h-4 w-4 mr-1" />
                        3-5 years
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-1">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">Node.js</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">AWS</Badge>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <Link href="/jobs/find-startup-jobs/1">View Full Job Description</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </span>
                      <span>Tailor your resume to highlight relevant experience for this role.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </span>
                      <span>Include specific examples of projects that demonstrate your skills.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </span>
                      <span>Make sure your contact information is up-to-date and professional.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        4
                      </span>
                      <span>Proofread all materials before submitting your application.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
}
