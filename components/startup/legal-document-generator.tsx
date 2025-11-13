"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import {
  ChevronLeft,
  FileText,
  Download,
  Share2,
  Save,
  Scale,
  Users,
  Shield,
  FileCheck,
  Sparkles,
  Check,
} from "lucide-react"

export function LegalDocumentGenerator() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("founder-agreement")
  const [documentType, setDocumentType] = useState("founder-agreement")
  const [companyName, setCompanyName] = useState("")
  const [companyType, setCompanyType] = useState("")
  const [founders, setFounders] = useState([
    { name: "", title: "", equity: "", responsibilities: "" },
    { name: "", title: "", equity: "", responsibilities: "" },
  ])
  const [generatingDocument, setGeneratingDocument] = useState(false)
  const [documentGenerated, setDocumentGenerated] = useState(false)

  const handleFounderChange = (index: number, field: string, value: string) => {
    const newFounders = [...founders]
    newFounders[index] = { ...newFounders[index], [field]: value }
    setFounders(newFounders)
  }

  const handleAddFounder = () => {
    setFounders([...founders, { name: "", title: "", equity: "", responsibilities: "" }])
  }

  const handleRemoveFounder = (index: number) => {
    if (founders.length <= 2) return
    const newFounders = [...founders]
    newFounders.splice(index, 1)
    setFounders(newFounders)
  }

  const generateDocument = () => {
    setGeneratingDocument(true)
    setDocumentGenerated(false)

    // Simulate document generation
    setTimeout(() => {
      setGeneratingDocument(false)
      setDocumentGenerated(true)
      toast({
        title: "Document Generated",
        description: "Your legal document has been generated successfully.",
      })
    }, 2000)
  }

  const handleSave = () => {
    toast({
      title: "Document Saved",
      description: "Your legal document has been saved to your account.",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Document Downloaded",
      description: "Your legal document has been downloaded as a PDF.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share Link Generated",
      description: "A shareable link to your legal document has been copied to your clipboard.",
    })
  }

  return (
    <GrowthLabLayout>
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Resources
          </Link>
          <h1 className="text-3xl font-bold mb-4">Legal Document Generator</h1>
          <p className="text-[#334155] max-w-3xl">
            Create essential legal documents for your startup with customizable templates. Our document generator helps
            you create professional legal agreements tailored to your specific needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Document Generator</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleSave} disabled={!documentGenerated}>
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload} disabled={!documentGenerated}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare} disabled={!documentGenerated}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Create customized legal documents for your startup by filling out the form below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="founder-agreement">Founder Agreement</TabsTrigger>
                    <TabsTrigger value="employment">Employment</TabsTrigger>
                    <TabsTrigger value="privacy-policy">Privacy Policy</TabsTrigger>
                    <TabsTrigger value="terms-of-service">Terms of Service</TabsTrigger>
                  </TabsList>

                  <TabsContent value="founder-agreement" className="space-y-6">
                    <div>
                      <Label htmlFor="company-name">Company Name*</Label>
                      <Input
                        id="company-name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. TechNova Solutions"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company-type">Company Type*</Label>
                      <Select value={companyType} onValueChange={setCompanyType}>
                        <SelectTrigger id="company-type">
                          <SelectValue placeholder="Select company type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Founders*</Label>
                      {founders.map((founder, index) => (
                        <div key={index} className="border rounded-md p-4 mt-2 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">Founder {index + 1}</h4>
                            {founders.length > 2 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFounder(index)}
                                className="text-destructive"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label htmlFor={`founder-name-${index}`}>Full Name</Label>
                              <Input
                                id={`founder-name-${index}`}
                                value={founder.name}
                                onChange={(e) => handleFounderChange(index, "name", e.target.value)}
                                placeholder="e.g. John Doe"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`founder-title-${index}`}>Title/Position</Label>
                              <Input
                                id={`founder-title-${index}`}
                                value={founder.title}
                                onChange={(e) => handleFounderChange(index, "title", e.target.value)}
                                placeholder="e.g. CEO"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label htmlFor={`founder-equity-${index}`}>Equity Percentage</Label>
                              <Input
                                id={`founder-equity-${index}`}
                                value={founder.equity}
                                onChange={(e) => handleFounderChange(index, "equity", e.target.value)}
                                placeholder="e.g. 50%"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`founder-responsibilities-${index}`}>Key Responsibilities</Label>
                              <Input
                                id={`founder-responsibilities-${index}`}
                                value={founder.responsibilities}
                                onChange={(e) => handleFounderChange(index, "responsibilities", e.target.value)}
                                placeholder="e.g. Product Development"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" onClick={handleAddFounder}>
                        Add Another Founder
                      </Button>
                    </div>

                    <div>
                      <Label htmlFor="vesting-schedule">Vesting Schedule</Label>
                      <Select defaultValue="4-1">
                        <SelectTrigger id="vesting-schedule">
                          <SelectValue placeholder="Select vesting schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4-1">4 years with 1 year cliff</SelectItem>
                          <SelectItem value="3-1">3 years with 1 year cliff</SelectItem>
                          <SelectItem value="4-0">4 years with no cliff</SelectItem>
                          <SelectItem value="custom">Custom Schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="intellectual-property">Intellectual Property Assignment</Label>
                      <Select defaultValue="full">
                        <SelectTrigger id="intellectual-property">
                          <SelectValue placeholder="Select IP assignment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Assignment to Company</SelectItem>
                          <SelectItem value="limited">Limited Assignment with Exceptions</SelectItem>
                          <SelectItem value="custom">Custom IP Agreement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="non-compete" />
                      <Label htmlFor="non-compete">Include Non-Compete Clause</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="confidentiality" defaultChecked />
                      <Label htmlFor="confidentiality">Include Confidentiality Clause</Label>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={generateDocument}
                        disabled={!companyName || !companyType || founders.some((f) => !f.name)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Founder Agreement
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="employment" className="space-y-6">
                    <div>
                      <Label htmlFor="employer-name">Employer Name*</Label>
                      <Input
                        id="employer-name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. TechNova Solutions"
                      />
                    </div>

                    <div>
                      <Label htmlFor="employee-name">Employee Name*</Label>
                      <Input id="employee-name" placeholder="e.g. Jane Smith" />
                    </div>

                    <div>
                      <Label htmlFor="position">Position/Title*</Label>
                      <Input id="position" placeholder="e.g. Senior Software Engineer" />
                    </div>

                    <div>
                      <Label htmlFor="employment-type">Employment Type*</Label>
                      <Select defaultValue="full-time">
                        <SelectTrigger id="employment-type">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-Time</SelectItem>
                          <SelectItem value="part-time">Part-Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="intern">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="start-date">Start Date*</Label>
                      <Input id="start-date" type="date" />
                    </div>

                    <div>
                      <Label htmlFor="compensation">Compensation*</Label>
                      <Input id="compensation" placeholder="e.g. $120,000 per year" />
                    </div>

                    <div>
                      <Label htmlFor="benefits">Benefits</Label>
                      <Textarea id="benefits" placeholder="Describe the benefits package..." rows={3} />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="at-will" defaultChecked />
                      <Label htmlFor="at-will">At-Will Employment</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="ip-assignment" defaultChecked />
                      <Label htmlFor="ip-assignment">Intellectual Property Assignment</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="confidentiality-emp" defaultChecked />
                      <Label htmlFor="confidentiality-emp">Confidentiality Agreement</Label>
                    </div>

                    <div className="pt-4">
                      <Button onClick={generateDocument} disabled={!companyName}>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Employment Contract
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="privacy-policy" className="space-y-6">
                    <div>
                      <Label htmlFor="company-name-privacy">Company Name*</Label>
                      <Input
                        id="company-name-privacy"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. TechNova Solutions"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website-url">Website URL*</Label>
                      <Input id="website-url" placeholder="e.g. https://technova.com" />
                    </div>

                    <div>
                      <Label htmlFor="business-type">Business Type*</Label>
                      <Select defaultValue="saas">
                        <SelectTrigger id="business-type">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saas">SaaS/Software</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="content">Content/Media</SelectItem>
                          <SelectItem value="marketplace">Marketplace</SelectItem>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Data Collection</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="collect-personal" defaultChecked />
                          <Label htmlFor="collect-personal">Personal Information</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="collect-payment" defaultChecked />
                          <Label htmlFor="collect-payment">Payment Information</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="collect-usage" defaultChecked />
                          <Label htmlFor="collect-usage">Usage Data</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="collect-cookies" defaultChecked />
                          <Label htmlFor="collect-cookies">Cookies</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="collect-location" />
                          <Label htmlFor="collect-location">Location Data</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Third-Party Sharing</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="share-service-providers" defaultChecked />
                          <Label htmlFor="share-service-providers">Service Providers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="share-analytics" defaultChecked />
                          <Label htmlFor="share-analytics">Analytics Providers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="share-marketing" />
                          <Label htmlFor="share-marketing">Marketing Partners</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="share-affiliates" />
                          <Label htmlFor="share-affiliates">Affiliates</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="contact-email">Contact Email*</Label>
                      <Input id="contact-email" placeholder="e.g. privacy@technova.com" />
                    </div>

                    <div className="pt-4">
                      <Button onClick={generateDocument} disabled={!companyName}>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Privacy Policy
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="terms-of-service" className="space-y-6">
                    <div>
                      <Label htmlFor="company-name-tos">Company Name*</Label>
                      <Input
                        id="company-name-tos"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. TechNova Solutions"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website-url-tos">Website/Service URL*</Label>
                      <Input id="website-url-tos" placeholder="e.g. https://technova.com" />
                    </div>

                    <div>
                      <Label htmlFor="service-description">Service Description*</Label>
                      <Textarea id="service-description" placeholder="Describe your service or product..." rows={3} />
                    </div>

                    <div>
                      <Label htmlFor="user-eligibility">User Eligibility*</Label>
                      <Select defaultValue="13-plus">
                        <SelectTrigger id="user-eligibility">
                          <SelectValue placeholder="Select user eligibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="13-plus">13 years or older</SelectItem>
                          <SelectItem value="16-plus">16 years or older</SelectItem>
                          <SelectItem value="18-plus">18 years or older</SelectItem>
                          <SelectItem value="21-plus">21 years or older</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Terms to Include</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="term-account" defaultChecked />
                          <Label htmlFor="term-account">User Accounts</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="term-content" defaultChecked />
                          <Label htmlFor="term-content">User Content</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="term-payment" />
                          <Label htmlFor="term-payment">Payment Terms</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="term-subscription" />
                          <Label htmlFor="term-subscription">Subscription Terms</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="term-refund" />
                          <Label htmlFor="term-refund">Refund Policy</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="term-limitation" defaultChecked />
                          <Label htmlFor="term-limitation">Limitation of Liability</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="term-termination" defaultChecked />
                          <Label htmlFor="term-termination">Termination</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="governing-law">Governing Law*</Label>
                      <Select defaultValue="california">
                        <SelectTrigger id="governing-law">
                          <SelectValue placeholder="Select governing law" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="california">California</SelectItem>
                          <SelectItem value="delaware">Delaware</SelectItem>
                          <SelectItem value="new-york">New York</SelectItem>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="contact-email-tos">Contact Email*</Label>
                      <Input id="contact-email-tos" placeholder="e.g. legal@technova.com" />
                    </div>

                    <div className="pt-4">
                      <Button onClick={generateDocument} disabled={!companyName}>
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Terms of Service
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {generatingDocument && (
                  <div className="mt-8 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#0F7377]"></div>
                    <p className="mt-2 text-muted-foreground">Generating your document...</p>
                  </div>
                )}

                {documentGenerated && (
                  <div className="mt-8 border rounded-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Document Preview</h3>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                        <Check className="h-3 w-3 mr-1" />
                        Generated
                      </Badge>
                    </div>

                    <div className="bg-muted p-4 rounded-md mb-4">
                      <h4 className="font-bold text-center mb-4 text-lg">
                        {activeTab === "founder-agreement"
                          ? "FOUNDER AGREEMENT"
                          : activeTab === "employment"
                            ? "EMPLOYMENT CONTRACT"
                            : activeTab === "privacy-policy"
                              ? "PRIVACY POLICY"
                              : "TERMS OF SERVICE"}
                      </h4>

                      <p className="text-sm text-muted-foreground mb-2">
                        This{" "}
                        {activeTab === "founder-agreement"
                          ? "Founder Agreement"
                          : activeTab === "employment"
                            ? "Employment Contract"
                            : activeTab === "privacy-policy"
                              ? "Privacy Policy"
                              : "Terms of Service"}{" "}
                        (the "Agreement") is made and entered into as of [Date], by and between{" "}
                        {activeTab === "employment" ? "the parties identified below" : `the founders of ${companyName}`}
                        .
                      </p>

                      <p className="text-sm text-muted-foreground">
                        [Document preview with placeholder text. The full document will be available for download.]
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save to My Documents
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Document Types</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "founder-agreement" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("founder-agreement")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Users className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Founder Agreement</h3>
                      <p className="text-sm text-muted-foreground">Define founder roles and equity</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "employment" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("employment")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <FileCheck className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Employment Contract</h3>
                      <p className="text-sm text-muted-foreground">Hire employees and contractors</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "privacy-policy" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("privacy-policy")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Shield className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Privacy Policy</h3>
                      <p className="text-sm text-muted-foreground">Explain how you handle user data</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                      activeTab === "terms-of-service" ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setActiveTab("terms-of-service")}
                  >
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Scale className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Terms of Service</h3>
                      <p className="text-sm text-muted-foreground">Set rules for using your service</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">NDA</h3>
                      <p className="text-sm text-muted-foreground">Protect confidential information</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <FileText className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">SAFE Agreement</h3>
                      <p className="text-sm text-muted-foreground">Simple agreement for future equity</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Legal Assistant</CardTitle>
                <CardDescription>Get AI-powered help with your legal documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder="Ask a question about legal documents..." rows={3} />
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Assistance
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Legal Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The documents generated by this tool are templates and should not be considered as legal advice. We
                  recommend having all legal documents reviewed by a qualified attorney before use. Laws vary by
                  jurisdiction and may change over time.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Connect with a Legal Expert
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </GrowthLabLayout>
  )
}
