"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowRight, CheckCircle, FileText, Upload, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FileUpload {
  id: string
  name: string
  type: string
  size: number
  progress: number
  status: "uploading" | "complete" | "error"
  error?: string
}

export function VerificationForm() {
  const [step, setStep] = useState(1)
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    website: "",
    industry: "",
    stage: "",
    foundingDate: "",
    description: "",
  })
  const [founderInfo, setFounderInfo] = useState([
    {
      name: "",
      email: "",
      role: "",
    },
  ])
  const [uploads, setUploads] = useState<FileUpload[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Add or remove founders
  const addFounder = () => {
    setFounderInfo([...founderInfo, { name: "", email: "", role: "" }])
  }

  const removeFounder = (index: number) => {
    setFounderInfo(founderInfo.filter((_, i) => i !== index))
  }

  // Update founder info
  const updateFounder = (index: number, field: string, value: string) => {
    const updatedFounders = [...founderInfo]
    updatedFounders[index] = { ...updatedFounders[index], [field]: value }
    setFounderInfo(updatedFounders)
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newUploads: FileUpload[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      newUploads.push({
        id: `upload-${Date.now()}-${i}`,
        name: file.name,
        type: file.type,
        size: file.size,
        progress: 0,
        status: "uploading",
      })
    }

    setUploads([...uploads, ...newUploads])

    // Simulate upload progress
    newUploads.forEach((upload) => {
      const interval = setInterval(() => {
        setUploads((current) =>
          current.map((u) => {
            if (u.id === upload.id) {
              const progress = u.progress + 10
              if (progress >= 100) {
                clearInterval(interval)
                return { ...u, progress: 100, status: "complete" }
              }
              return { ...u, progress }
            }
            return u
          }),
        )
      }, 300)
    })
  }

  // Remove upload
  const removeUpload = (id: string) => {
    setUploads(uploads.filter((upload) => upload.id !== id))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // Form validation
  const isStepOneValid = () => {
    return (
      companyInfo.name.trim() !== "" &&
      companyInfo.website.trim() !== "" &&
      companyInfo.industry !== "" &&
      companyInfo.stage !== ""
    )
  }

  const isStepTwoValid = () => {
    return founderInfo.every((founder) => founder.name.trim() !== "" && founder.email.trim() !== "")
  }

  const isStepThreeValid = () => {
    return uploads.length > 0 && uploads.every((upload) => upload.status === "complete")
  }

  // Render form steps
  if (isSubmitted) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Verification Request Submitted</CardTitle>
          <CardDescription className="text-center">
            Your verification request has been submitted successfully and is now under review
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <div className="rounded-full bg-green-100 p-4 mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h3 className="text-xl font-medium mb-2">Thank You!</h3>
          <p className="text-center text-muted-foreground mb-4">
            We've received your verification request. Our team will review the information and documents you've provided
            and get back to you within 2-3 business days.
          </p>
          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              You may be contacted for additional information or clarification if needed. Please check your email
              regularly.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <a href="/dashboard">Return to Dashboard</a>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Startup Verification</CardTitle>
        <CardDescription>
          Get your startup verified to unlock premium features and build trust with investors and partners
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              1
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <div className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-muted"}`}></div>
            <div
              className={`flex items-center justify-center h-10 w-10 rounded-full ${
                step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company Information</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name *</Label>
                  <Input
                    id="company-name"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-website">Company Website *</Label>
                  <Input
                    id="company-website"
                    type="url"
                    value={companyInfo.website}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, website: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select
                    value={companyInfo.industry}
                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, industry: value })}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="healthtech">Healthtech</SelectItem>
                      <SelectItem value="edtech">Edtech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="ai">AI/ML</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                      <SelectItem value="cleantech">Cleantech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">Stage *</Label>
                  <Select
                    value={companyInfo.stage}
                    onValueChange={(value) => setCompanyInfo({ ...companyInfo, stage: value })}
                  >
                    <SelectTrigger id="stage">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="idea">Idea/Concept</SelectItem>
                      <SelectItem value="mvp">MVP</SelectItem>
                      <SelectItem value="pre-seed">Pre-seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="series-b">Series B+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="founding-date">Founding Date</Label>
                <Input
                  id="founding-date"
                  type="date"
                  value={companyInfo.foundingDate}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, foundingDate: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description *</Label>
                <Textarea
                  id="description"
                  value={companyInfo.description}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, description: e.target.value })}
                  rows={4}
                  placeholder="Briefly describe your company, product, and target market"
                  required
                />
              </div>

              <div className="flex justify-end mt-6">
                <Button type="button" onClick={() => setStep(2)} disabled={!isStepOneValid()}>
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Founding Team</h3>
              <p className="text-sm text-muted-foreground">
                Please provide information about all co-founders and key team members
              </p>

              <div className="space-y-6">
                {founderInfo.map((founder, index) => (
                  <div key={index} className="p-4 border rounded-md relative">
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => removeFounder(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`founder-name-${index}`}>Full Name *</Label>
                          <Input
                            id={`founder-name-${index}`}
                            value={founder.name}
                            onChange={(e) => updateFounder(index, "name", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`founder-email-${index}`}>Email *</Label>
                          <Input
                            id={`founder-email-${index}`}
                            type="email"
                            value={founder.email}
                            onChange={(e) => updateFounder(index, "email", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`founder-role-${index}`}>Role</Label>
                        <Input
                          id={`founder-role-${index}`}
                          value={founder.role}
                          onChange={(e) => updateFounder(index, "role", e.target.value)}
                          placeholder="e.g., CEO, CTO, COO"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <Button type="button" variant="outline" onClick={addFounder}>
                  Add Another Co-Founder
                </Button>
              </div>

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Previous Step
                </Button>
                <Button type="button" onClick={() => setStep(3)} disabled={!isStepTwoValid()}>
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Documents</h3>
              <p className="text-sm text-muted-foreground">
                Please upload the required documents to verify your startup
              </p>

              <Tabs defaultValue="required">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="required">Required Documents</TabsTrigger>
                  <TabsTrigger value="additional">Additional Documents</TabsTrigger>
                </TabsList>
                <TabsContent value="required" className="space-y-4 py-4">
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <div>
                          <h4 className="text-sm font-medium">Business Registration Certificate</h4>
                          <p className="text-xs text-muted-foreground">
                            Official business registration document from your country
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                        <div>
                          <h4 className="text-sm font-medium">Founding Team ID</h4>
                          <p className="text-xs text-muted-foreground">
                            Government-issued IDs for all founding team members
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="additional" className="space-y-4 py-4">
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Pitch Deck</h4>
                          <p className="text-xs text-muted-foreground">
                            Your startup's pitch deck or company presentation
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Financial Statements</h4>
                          <p className="text-xs text-muted-foreground">Financial statements or projections</p>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <h4 className="text-sm font-medium">Product Demo</h4>
                          <p className="text-xs text-muted-foreground">Video or screenshots of your product</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.mp4"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm font-medium mb-1">Drag & drop files here or click to browse</p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, JPG, PNG, DOC, DOCX, MP4 (max 20MB each)
                  </p>
                </Label>
              </div>

              {uploads.length > 0 && (
                <div className="space-y-3 mt-4">
                  <h4 className="text-sm font-medium">Uploaded Files</h4>
                  {uploads.map((upload) => (
                    <div key={upload.id} className="bg-muted p-2 rounded-md flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{upload.name}</p>
                        <div className="w-full bg-background h-1.5 rounded-full mt-1">
                          <div
                            className={`h-1.5 rounded-full ${upload.status === "error" ? "bg-red-500" : "bg-primary"}`}
                            style={{ width: `${upload.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs">
                        {upload.status === "uploading"
                          ? `${upload.progress}%`
                          : upload.status === "complete"
                            ? "Complete"
                            : "Error"}
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => removeUpload(upload.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  Previous Step
                </Button>
                <Button type="submit" disabled={isSubmitting || !isStepThreeValid()}>
                  {isSubmitting ? "Submitting..." : "Submit Verification Request"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
