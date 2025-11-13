"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Rocket, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Target,
  FileText,
  Upload,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

export default function AcceleratorApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    website: "",
    foundedYear: "",
    industry: "",
    stage: "",
    
    // Team Information
    founderName: "",
    founderEmail: "",
    founderPhone: "",
    coFounderName: "",
    teamSize: "",
    
    // Business Information
    description: "",
    problem: "",
    solution: "",
    targetMarket: "",
    businessModel: "",
    revenue: "",
    funding: "",
    
    // Program Selection
    program: "accelerator",
    timeline: "",
    expectations: "",
    
    // Additional Information
    previousPrograms: "",
    referrals: "",
    additionalInfo: "",
    
    // Terms and Conditions
    termsAccepted: false,
    privacyAccepted: false
  })

  const steps = [
    { id: 1, title: "Company Info", description: "Basic company information" },
    { id: 2, title: "Team Details", description: "Founder and team information" },
    { id: 3, title: "Business Model", description: "Your business and market" },
    { id: 4, title: "Program Details", description: "Program selection and timeline" },
    { id: 5, title: "Review & Submit", description: "Review and submit application" }
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Application submitted:", formData)
    alert("Application submitted successfully! We'll review your application and get back to you within 5 business days.")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Rocket className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Apply to GrowthLab Accelerator
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join our flagship accelerator program and transform your startup with SGD 500K investment, 
            world-class mentorship, and global connections.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-[#0F7377] border-[#0F7377] text-white' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-[#0F7377]' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`hidden md:block w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-[#0F7377]' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Application Form</CardTitle>
              <CardDescription className="text-center">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Company Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Company Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          placeholder="Enter your company name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="https://yourcompany.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="foundedYear">Year Founded *</Label>
                        <Input
                          id="foundedYear"
                          type="number"
                          value={formData.foundedYear}
                          onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                          placeholder="2020"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry *</Label>
                        <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fintech">Fintech</SelectItem>
                            <SelectItem value="healthtech">Healthtech</SelectItem>
                            <SelectItem value="edtech">Edtech</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                            <SelectItem value="saas">SaaS</SelectItem>
                            <SelectItem value="ai-ml">AI/ML</SelectItem>
                            <SelectItem value="blockchain">Blockchain</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="stage">Company Stage *</Label>
                      <Select value={formData.stage} onValueChange={(value) => handleInputChange('stage', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Idea Stage</SelectItem>
                          <SelectItem value="mvp">MVP Stage</SelectItem>
                          <SelectItem value="early-traction">Early Traction</SelectItem>
                          <SelectItem value="growth">Growth Stage</SelectItem>
                          <SelectItem value="scale">Scale Stage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Team Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Team Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="founderName">Founder Name *</Label>
                        <Input
                          id="founderName"
                          value={formData.founderName}
                          onChange={(e) => handleInputChange('founderName', e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="founderEmail">Email Address *</Label>
                        <Input
                          id="founderEmail"
                          type="email"
                          value={formData.founderEmail}
                          onChange={(e) => handleInputChange('founderEmail', e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="founderPhone">Phone Number *</Label>
                        <Input
                          id="founderPhone"
                          value={formData.founderPhone}
                          onChange={(e) => handleInputChange('founderPhone', e.target.value)}
                          placeholder="+65 1234 5678"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="coFounderName">Co-founder Name</Label>
                        <Input
                          id="coFounderName"
                          value={formData.coFounderName}
                          onChange={(e) => handleInputChange('coFounderName', e.target.value)}
                          placeholder="Co-founder's full name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="teamSize">Team Size *</Label>
                      <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select team size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 person</SelectItem>
                          <SelectItem value="2-5">2-5 people</SelectItem>
                          <SelectItem value="6-10">6-10 people</SelectItem>
                          <SelectItem value="11-20">11-20 people</SelectItem>
                          <SelectItem value="20+">20+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Business Model */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Business Information</h3>
                    
                    <div>
                      <Label htmlFor="description">Company Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describe your company in 2-3 sentences"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="problem">Problem You're Solving *</Label>
                      <Textarea
                        id="problem"
                        value={formData.problem}
                        onChange={(e) => handleInputChange('problem', e.target.value)}
                        placeholder="What problem does your product/service solve?"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="solution">Your Solution *</Label>
                      <Textarea
                        id="solution"
                        value={formData.solution}
                        onChange={(e) => handleInputChange('solution', e.target.value)}
                        placeholder="How do you solve this problem?"
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="targetMarket">Target Market *</Label>
                        <Input
                          id="targetMarket"
                          value={formData.targetMarket}
                          onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                          placeholder="Who are your customers?"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="businessModel">Business Model *</Label>
                        <Input
                          id="businessModel"
                          value={formData.businessModel}
                          onChange={(e) => handleInputChange('businessModel', e.target.value)}
                          placeholder="How do you make money?"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="revenue">Current Revenue (SGD)</Label>
                        <Input
                          id="revenue"
                          value={formData.revenue}
                          onChange={(e) => handleInputChange('revenue', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="funding">Previous Funding (SGD)</Label>
                        <Input
                          id="funding"
                          value={formData.funding}
                          onChange={(e) => handleInputChange('funding', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Program Details */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Program Details</h3>
                    
                    <div>
                      <Label htmlFor="timeline">Expected Timeline *</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you want to start?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediately</SelectItem>
                          <SelectItem value="1-month">Within 1 month</SelectItem>
                          <SelectItem value="3-months">Within 3 months</SelectItem>
                          <SelectItem value="6-months">Within 6 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="expectations">What do you hope to achieve? *</Label>
                      <Textarea
                        id="expectations"
                        value={formData.expectations}
                        onChange={(e) => handleInputChange('expectations', e.target.value)}
                        placeholder="Describe your goals and what you hope to achieve through the program"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="previousPrograms">Previous Accelerator/Program Experience</Label>
                      <Textarea
                        id="previousPrograms"
                        value={formData.previousPrograms}
                        onChange={(e) => handleInputChange('previousPrograms', e.target.value)}
                        placeholder="List any previous accelerator programs or startup competitions you've participated in"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="referrals">How did you hear about us?</Label>
                      <Input
                        id="referrals"
                        value={formData.referrals}
                        onChange={(e) => handleInputChange('referrals', e.target.value)}
                        placeholder="Social media, referral, website, etc."
                      />
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold mb-4">Review Your Application</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                      <div>
                        <h4 className="font-semibold">Company: {formData.companyName}</h4>
                        <p className="text-sm text-gray-600">Founded: {formData.foundedYear} | Industry: {formData.industry}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Founder: {formData.founderName}</h4>
                        <p className="text-sm text-gray-600">{formData.founderEmail} | {formData.founderPhone}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Description:</h4>
                        <p className="text-sm text-gray-600">{formData.description}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.termsAccepted}
                          onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the <Link href="/terms" className="text-[#0F7377] hover:underline">Terms and Conditions</Link> *
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="privacy"
                          checked={formData.privacyAccepted}
                          onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked as boolean)}
                        />
                        <Label htmlFor="privacy" className="text-sm">
                          I agree to the <Link href="/privacy" className="text-[#0F7377] hover:underline">Privacy Policy</Link> *
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                      disabled={!formData.termsAccepted || !formData.privacyAccepted}
                    >
                      Submit Application
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Program Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <DollarSign className="w-8 h-8 text-[#0F7377] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">SGD 500K Investment</h3>
              <p className="text-sm text-gray-600">Direct investment in your startup</p>
            </Card>
            <Card className="text-center p-6">
              <Users className="w-8 h-8 text-[#0F7377] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Expert Mentorship</h3>
              <p className="text-sm text-gray-600">Access to 100+ industry experts</p>
            </Card>
            <Card className="text-center p-6">
              <Target className="w-8 h-8 text-[#0F7377] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Global Network</h3>
              <p className="text-sm text-gray-600">Connect with investors worldwide</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}