"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Check, Download, FileText, ImageIcon, Loader2, PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ReportSection {
  id: string
  title: string
  description: string
  included: boolean
}

export function ValuationReportGenerator() {
  const { toast } = useToast()
  const [reportName, setReportName] = useState("June 2023 Valuation Report")
  const [companyName, setCompanyName] = useState("My Startup")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [includeLogo, setIncludeLogo] = useState(true)
  const [includeExecutiveSummary, setIncludeExecutiveSummary] = useState(true)
  const [executiveSummary, setExecutiveSummary] = useState("")
  const [generating, setGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const [reportSections, setReportSections] = useState<ReportSection[]>([
    {
      id: "valuation_summary",
      title: "Valuation Summary",
      description: "Overview of current valuation and methods used",
      included: true,
    },
    {
      id: "methods_comparison",
      title: "Methods Comparison",
      description: "Comparison of different valuation methods",
      included: true,
    },
    {
      id: "historical_trend",
      title: "Historical Trend Analysis",
      description: "Analysis of valuation changes over time",
      included: true,
    },
    {
      id: "industry_benchmarks",
      title: "Industry Benchmarks",
      description: "Comparison with industry averages",
      included: true,
    },
    {
      id: "assumptions",
      title: "Assumptions & Methodology",
      description: "Details on calculations and assumptions",
      included: true,
    },
    {
      id: "financials",
      title: "Financial Projections",
      description: "5-year financial forecasts",
      included: true,
    },
    {
      id: "appendix",
      title: "Appendix",
      description: "Additional supporting data and charts",
      included: false,
    },
  ])

  const handleSectionToggle = (id: string) => {
    setReportSections((prev) =>
      prev.map((section) => (section.id === id ? { ...section, included: !section.included } : section)),
    )
  }

  const handleGenerateReport = () => {
    if (!reportName || !companyName) {
      toast({
        title: "Missing Information",
        description: "Please provide both a report name and company name.",
        variant: "destructive",
      })
      return
    }

    setGenerating(true)

    // Simulate report generation process
    setTimeout(() => {
      setGenerating(false)
      setReportGenerated(true)

      toast({
        title: "Report Generated Successfully",
        description: "Your valuation report has been created and is ready to download.",
      })
    }, 2500)
  }

  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: `Your report '${reportName}' is downloading.`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Valuation Report Generator</CardTitle>
        <CardDescription>Create professional valuation reports for investors and stakeholders</CardDescription>
      </CardHeader>
      <CardContent>
        {reportGenerated ? (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 flex items-center">
              <Check className="h-6 w-6 mr-3 text-green-700" />
              <div>
                <h3 className="font-medium">Report Generated Successfully</h3>
                <p className="text-sm text-green-700 mt-1">
                  Your valuation report has been created and is ready to download.
                </p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted p-6 flex items-center justify-between">
                <div className="flex items-center">
                  {reportFormat === "pdf" ? (
                    <div className="bg-red-100 rounded p-2 mr-4">
                      <FileText className="h-8 w-8 text-red-700" />
                    </div>
                  ) : (
                    <div className="bg-green-100 rounded p-2 mr-4">
                      <FileText className="h-8 w-8 text-green-700" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{reportName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {reportFormat.toUpperCase()} report • Created June 5, 2023 •{" "}
                      {includeLogo ? "With logo" : "No logo"}
                    </p>
                  </div>
                </div>

                <Button onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-medium">Report Details</h4>
                  <ul className="mt-2 space-y-1">
                    <li className="text-sm text-muted-foreground">Company: {companyName}</li>
                    <li className="text-sm text-muted-foreground">Valuation Date: June 5, 2023</li>
                    <li className="text-sm text-muted-foreground">Created By: Current User</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium">Included Sections</h4>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {reportSections
                      .filter((s) => s.included)
                      .map((section) => (
                        <div key={section.id} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          <span className="text-sm">{section.title}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <Separator />

                {includeExecutiveSummary && executiveSummary && (
                  <div>
                    <h4 className="font-medium">Executive Summary Preview</h4>
                    <p className="text-sm text-muted-foreground mt-2 italic">
                      "{executiveSummary.length > 150 ? executiveSummary.substring(0, 150) + "..." : executiveSummary}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setReportGenerated(false)}>
                Create Another Report
              </Button>
              <div className="space-x-2">
                <Button variant="outline">Share Report</Button>
                <Button onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input
                    id="report-name"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="e.g., June 2023 Valuation Report"
                  />
                </div>

                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., My Startup Inc."
                  />
                </div>

                <div>
                  <Label htmlFor="report-format">Report Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger id="report-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                      <SelectItem value="pptx">PowerPoint Presentation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="include-logo"
                    checked={includeLogo}
                    onCheckedChange={() => setIncludeLogo(!includeLogo)}
                  />
                  <div>
                    <Label htmlFor="include-logo" className="cursor-pointer">
                      Include Company Logo
                    </Label>
                    <p className="text-sm text-muted-foreground">Add your company logo to the report header</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="include-executive-summary"
                    checked={includeExecutiveSummary}
                    onCheckedChange={() => setIncludeExecutiveSummary(!includeExecutiveSummary)}
                  />
                  <div>
                    <Label htmlFor="include-executive-summary" className="cursor-pointer">
                      Include Executive Summary
                    </Label>
                    <p className="text-sm text-muted-foreground">Add a custom executive summary to the report</p>
                  </div>
                </div>

                {includeLogo && (
                  <div className="border rounded-lg p-4 mt-2 flex justify-center items-center h-24">
                    <Button variant="outline" className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                )}

                {includeExecutiveSummary && (
                  <div className="mt-2">
                    <Label htmlFor="executive-summary">Executive Summary</Label>
                    <Textarea
                      id="executive-summary"
                      value={executiveSummary}
                      onChange={(e) => setExecutiveSummary(e.target.value)}
                      placeholder="Provide a brief summary of the valuation results and key insights..."
                      rows={4}
                    />
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Report Sections</h3>
              <div className="space-y-3">
                {reportSections.map((section) => (
                  <div key={section.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={section.id}
                      checked={section.included}
                      onCheckedChange={() => handleSectionToggle(section.id)}
                    />
                    <div>
                      <Label htmlFor={section.id} className="cursor-pointer">
                        {section.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    </div>
                  </div>
                ))}

                <Button variant="ghost" className="mt-2">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Custom Section
                </Button>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Reports are generated using the latest valuation data in your account. Make sure your valuation
                    information is up-to-date before generating a report.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={handleGenerateReport} disabled={generating}>
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
