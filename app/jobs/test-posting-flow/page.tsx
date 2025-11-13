"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, CheckCircle2 } from "lucide-react"
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

export default function TestJobPostingFlow() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobType: "",
    location: "",
    experience: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    applicationMethod: "platform",
    applicationUrl: "",
    postingType: "standard",
  })
  const { toast } = useToast()

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!formData.jobTitle || !formData.companyName || !formData.jobType || !formData.location) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive",
        })
        return
      }
    } else if (step === 2) {
      if (!formData.description || !formData.requirements) {
        toast({
          title: "Missing information",
          description: "Please provide a job description and requirements.",
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
    console.log("Submitting job posting:", formData)

    // Simulate API call
    setTimeout(() => {
      setStep(4) // Move to success step
      window.scrollTo(0, 0)
    }, 1500)
  }

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/jobs" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold mb-4">Post a Job - Test Flow</h1>
          <p className="text-[#334155] max-w-3xl">
            This is a test flow for posting a job on GrowthLab. Follow the steps to create a job posting.
          </p>
        </div>

        <Stepper className="mb-10">
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Basic Information</StepTitle>
            <StepDescription>Job title, company, and type</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Job Details</StepTitle>
            <StepDescription>Description and requirements</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Posting Options</StepTitle>
            <StepDescription>Visibility and application method</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Review & Submit</StepTitle>
            <StepDescription>Finalize your job posting</StepDescription>
          </Step>
        </Stepper>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Basic Information"}
                  {step === 2 && "Job Details"}
                  {step === 3 && "Posting Options"}
                  {step === 4 && "Success!"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="job-title">Job Title*</Label>
                      <Input
                        id="job-title"
                        placeholder="e.g. Senior Full Stack Developer"
                        value={formData.jobTitle}
                        onChange={(e) => handleChange("jobTitle", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="company-name">Company Name*</Label>
                      <Input
                        id="company-name"
                        placeholder="e.g. TechNova Solutions"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="job-type">Job Type*</Label>
                        <Select value={formData.jobType} onValueChange={(value) => handleChange("jobType", value)}>
                          <SelectTrigger id="job-type">
                            <SelectValue placeholder="Select job type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="location">Location*</Label>
                        <Select value={formData.location} onValueChange={(value) => handleChange("location", value)}>
                          <SelectTrigger id="location">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="singapore">Singapore</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="experience">Experience Level</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => handleChange("experience", value)}
                        >
                          <SelectTrigger id="experience">
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level (1-3 years)</SelectItem>
                            <SelectItem value="senior">Senior (3-5 years)</SelectItem>
                            <SelectItem value="expert">Expert (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="salary-range">Salary Range</Label>
                        <Select value={formData.salary} onValueChange={(value) => handleChange("salary", value)}>
                          <SelectTrigger id="salary-range">
                            <SelectValue placeholder="Select salary range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="negotiable">Negotiable</SelectItem>
                            <SelectItem value="range1">$3,000 - $5,000</SelectItem>
                            <SelectItem value="range2">$5,000 - $8,000</SelectItem>
                            <SelectItem value="range3">$8,000 - $12,000</SelectItem>
                            <SelectItem value="range4">$12,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                      <Label htmlFor="job-description">Job Description*</Label>
                      <Textarea
                        id="job-description"
                        placeholder="Describe the role, responsibilities, and ideal candidate..."
                        rows={6}
                        value={formData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="requirements">Requirements*</Label>
                      <Textarea
                        id="requirements"
                        placeholder="List the skills, qualifications, and experience required..."
                        rows={4}
                        value={formData.requirements}
                        onChange={(e) => handleChange("requirements", e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="benefits">Benefits</Label>
                      <Textarea
                        id="benefits"
                        placeholder="Describe the benefits, perks, and company culture..."
                        rows={4}
                        value={formData.benefits}
                        onChange={(e) => handleChange("benefits", e.target.value)}
                      />
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
                      <Label>Application Method</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="flex items-start space-x-2">
                          <input
                            type="radio"
                            id="apply-platform"
                            name="apply-method"
                            className="mt-1"
                            checked={formData.applicationMethod === "platform"}
                            onChange={() => handleChange("applicationMethod", "platform")}
                          />
                          <div>
                            <Label htmlFor="apply-platform" className="font-normal">
                              Apply through GrowthLab
                            </Label>
                            <p className="text-sm text-[#334155]">
                              Candidates will apply directly through our platform
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <input
                            type="radio"
                            id="apply-external"
                            name="apply-method"
                            className="mt-1"
                            checked={formData.applicationMethod === "external"}
                            onChange={() => handleChange("applicationMethod", "external")}
                          />
                          <div>
                            <Label htmlFor="apply-external" className="font-normal">
                              External Application
                            </Label>
                            <p className="text-sm text-[#334155]">Redirect candidates to your website or email</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.applicationMethod === "external" && (
                      <div>
                        <Label htmlFor="application-url">Application URL or Email*</Label>
                        <Input
                          id="application-url"
                          placeholder="e.g. https://yourcompany.com/careers or hr@company.com"
                          value={formData.applicationUrl}
                          onChange={(e) => handleChange("applicationUrl", e.target.value)}
                        />
                      </div>
                    )}

                    <div>
                      <Label>Posting Type</Label>
                      <div className="space-y-4 mt-2">
                        <div className="flex items-start space-x-2">
                          <input
                            type="radio"
                            id="standard-post"
                            name="post-type"
                            className="mt-1"
                            checked={formData.postingType === "standard"}
                            onChange={() => handleChange("postingType", "standard")}
                          />
                          <div>
                            <Label htmlFor="standard-post" className="font-normal">
                              Standard Post
                            </Label>
                            <p className="text-sm text-[#334155]">30-day listing, included in search results</p>
                            <p className="text-sm font-medium">SGD 199</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <input
                            type="radio"
                            id="featured-post"
                            name="post-type"
                            className="mt-1"
                            checked={formData.postingType === "featured"}
                            onChange={() => handleChange("postingType", "featured")}
                          />
                          <div>
                            <Label htmlFor="featured-post" className="font-normal">
                              Featured Post
                            </Label>
                            <p className="text-sm text-[#334155]">
                              30-day listing, highlighted in search results and homepage
                            </p>
                            <p className="text-sm font-medium">SGD 299</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <input
                            type="radio"
                            id="premium-post"
                            name="post-type"
                            className="mt-1"
                            checked={formData.postingType === "premium"}
                            onChange={() => handleChange("postingType", "premium")}
                          />
                          <div>
                            <Label htmlFor="premium-post" className="font-normal">
                              Premium Post
                            </Label>
                            <p className="text-sm text-[#334155]">
                              60-day listing, featured placement, included in newsletter
                            </p>
                            <p className="text-sm font-medium">SGD 499</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleSubmit} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Submit Job Posting
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="py-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Job Posted Successfully!</h2>
                    <p className="text-[#334155] mb-6">
                      Your job has been posted and is now visible to potential candidates.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild>
                        <Link href="/jobs/manage">Manage Your Jobs</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/jobs">Back to Jobs</Link>
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
                  <CardTitle>Job Posting Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        1
                      </span>
                      <span>Use a clear, specific job title that candidates are likely to search for.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        2
                      </span>
                      <span>Be specific about requirements to attract qualified candidates.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        3
                      </span>
                      <span>Highlight your company culture and benefits to stand out.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        4
                      </span>
                      <span>Include salary information to attract more applicants.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-[#0F7377]/10 text-[#0F7377] rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                        5
                      </span>
                      <span>Keep the application process simple to increase completion rates.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#334155] mb-4">
                    Our team is here to help you create an effective job posting that attracts the right candidates.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
}
