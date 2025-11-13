"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle } from "lucide-react"
import type { FundingOpportunity, FundingStage, Industry } from "@/types/funding"

interface FundingApplicationFormProps {
  opportunity: FundingOpportunity
  className?: string
}

export function FundingApplicationForm({ opportunity, className }: FundingApplicationFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
      setIsSubmitted(true)
    }, 1500)
  }

  const stageOptions: { value: FundingStage; label: string }[] = [
    { value: "pre-seed", label: "Pre-Seed" },
    { value: "seed", label: "Seed" },
    { value: "series-a", label: "Series A" },
    { value: "series-b", label: "Series B" },
    { value: "series-c", label: "Series C" },
    { value: "growth", label: "Growth" },
    { value: "late-stage", label: "Late Stage" },
  ]

  const industryOptions: { value: Industry; label: string }[] = [
    { value: "fintech", label: "FinTech" },
    { value: "healthtech", label: "HealthTech" },
    { value: "edtech", label: "EdTech" },
    { value: "ecommerce", label: "E-Commerce" },
    { value: "saas", label: "SaaS" },
    { value: "ai", label: "AI/ML" },
    { value: "blockchain", label: "Blockchain" },
    { value: "cleantech", label: "CleanTech" },
    { value: "hardware", label: "Hardware" },
    { value: "consumer", label: "Consumer" },
    { value: "enterprise", label: "Enterprise" },
    { value: "other", label: "Other" },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Apply for Funding</CardTitle>
        <CardDescription>
          {isSubmitted
            ? "Your application has been submitted successfully."
            : `Apply for funding from ${opportunity.organization}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-[#1E293B]">Application Submitted!</h3>
            <p className="mb-6 text-[#334155]">
              Thank you for submitting your application to {opportunity.organization}. We'll review your application and
              get back to you within 7-10 business days.
            </p>
            <div className="space-y-4">
              <p className="font-medium text-[#1E293B]">Next steps:</p>
              <ol className="mx-auto max-w-md list-decimal space-y-2 text-left text-[#334155]">
                <li>Our team will review your application</li>
                <li>If there's a potential match, we'll schedule an initial call</li>
                <li>You'll be invited to pitch to the investment team</li>
                <li>Due diligence process will begin if there's interest</li>
              </ol>
            </div>
          </div>
        ) : (
          <Tabs value={`step-${step}`} className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="step-1" disabled>
                Company Information
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled>
                Funding Details
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled>
                Documents
              </TabsTrigger>
            </TabsList>

            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Your company name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" type="url" placeholder="https://yourcompany.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Contact Name</Label>
                    <Input id="contact-name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" placeholder="you@yourcompany.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input id="contact-phone" type="tel" placeholder="+65 1234 5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="founding-date">Founding Date</Label>
                    <Input id="founding-date" type="date" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="team-size">Team Size</Label>
                    <Input id="team-size" type="number" placeholder="5" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Singapore" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-description">Company Description</Label>
                  <Textarea
                    id="company-description"
                    placeholder="Briefly describe your company, product, and mission..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stage">Current Stage</Label>
                    <Select>
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Select your company stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {stageOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="funding-amount">Funding Amount Requested (SGD)</Label>
                  <Input
                    id="funding-amount"
                    type="number"
                    placeholder="500000"
                    min={opportunity.minAmount}
                    max={opportunity.maxAmount}
                  />
                  <p className="text-xs text-muted-foreground">
                    Range: {opportunity.minAmount.toLocaleString()} - {opportunity.maxAmount.toLocaleString()} SGD
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="previous-funding">Previous Funding (if any)</Label>
                  <Textarea
                    id="previous-funding"
                    placeholder="Describe any previous funding rounds, investors, and amounts..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="use-of-funds">Use of Funds</Label>
                  <Textarea id="use-of-funds" placeholder="Explain how you plan to use the funding..." rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-model">Business Model</Label>
                  <Textarea
                    id="business-model"
                    placeholder="Describe your business model and revenue streams..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="market-size">Target Market & Size</Label>
                  <Textarea id="market-size" placeholder="Describe your target market and its size..." rows={3} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pitch-deck">Pitch Deck</Label>
                  <Input id="pitch-deck" type="file" accept=".pdf,.pptx,.ppt" />
                  <p className="text-xs text-muted-foreground">Upload your pitch deck (PDF or PowerPoint, max 10MB)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business-plan">Business Plan</Label>
                  <Input id="business-plan" type="file" accept=".pdf,.docx,.doc" />
                  <p className="text-xs text-muted-foreground">Upload your business plan (PDF or Word, max 10MB)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financials">Financial Projections</Label>
                  <Input id="financials" type="file" accept=".pdf,.xlsx,.xls" />
                  <p className="text-xs text-muted-foreground">
                    Upload your financial projections (PDF or Excel, max 10MB)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any additional information you'd like to share..."
                    rows={4}
                  />
                </div>
              </div>
            )}
          </Tabs>
        )}
      </CardContent>
      {!isSubmitted && (
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
          {step === 1 && <div></div>}
        </CardFooter>
      )}
    </Card>
  )
}
