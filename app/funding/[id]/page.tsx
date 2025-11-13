"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, CheckCircle, Globe, Mail } from "lucide-react"
import { formatCurrency } from "@/utils/format"
import { Footer } from "@/components/layout/footer"
import type { FundingOpportunity } from "@/types/funding"

// Sample data for the funding opportunity
const opportunity: FundingOpportunity = {
  id: "fund-1",
  title: "GrowthLab Seed Fund",
  organization: "GrowthLab Ventures",
  logo: "/placeholder.svg?height=48&width=48",
  type: "vc",
  stage: ["pre-seed", "seed"],
  minAmount: 250000,
  maxAmount: 1000000,
  industries: ["fintech", "healthtech", "saas", "ai"],
  description:
    "GrowthLab Ventures is looking to invest in early-stage startups with strong founding teams and innovative solutions in our focus areas. We provide not just capital, but also mentorship, connections, and strategic guidance to help our portfolio companies scale rapidly across Southeast Asia.",
  requirements: [
    "Strong founding team with technical expertise",
    "MVP with some traction",
    "Addressing a large market opportunity",
    "Based in Southeast Asia",
  ],
  applicationDeadline: "Rolling basis",
  location: "Singapore",
  contactEmail: "investments@growthlabventures.com",
  website: "https://growthlabventures.com",
  featured: true,
}

// Sample portfolio companies
const portfolioCompanies = [
  {
    name: "PayNow",
    description: "Digital payment platform for Southeast Asian SMEs",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "FinTech",
  },
  {
    name: "HealthTech AI",
    description: "AI-powered diagnostic tools for healthcare providers",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "HealthTech",
  },
  {
    name: "EduLearn",
    description: "Personalized learning platform for K-12 students",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "EdTech",
  },
  {
    name: "LogisticsX",
    description: "Last-mile delivery optimization for e-commerce",
    logo: "/placeholder.svg?height=48&width=48",
    industry: "Logistics",
  },
]

// Sample team members
const teamMembers = [
  {
    name: "Sarah Chen",
    title: "Managing Partner",
    bio: "Sarah is a seasoned investor with over 15 years of experience in venture capital and startup ecosystems across Asia.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Michael Tan",
    title: "Investment Director",
    bio: "Michael specializes in Series A and B investments in enterprise software and B2B startups.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Priya Sharma",
    title: "Associate",
    bio: "Priya focuses on investments in healthtech, biotech, and sustainability.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
]

export default function FundingOpportunityPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  const getFundingTypeLabel = (type: string) => {
    switch (type) {
      case "vc":
        return "Venture Capital"
      case "angel":
        return "Angel Investment"
      case "grant":
        return "Grant"
      case "accelerator":
        return "Accelerator"
      case "corporate":
        return "Corporate Investment"
      case "debt":
        return "Debt Financing"
      default:
        return type
    }
  }

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case "pre-seed":
        return "Pre-Seed"
      case "seed":
        return "Seed"
      case "series-a":
        return "Series A"
      case "series-b":
        return "Series B"
      case "series-c":
        return "Series C"
      case "growth":
        return "Growth"
      case "late-stage":
        return "Late Stage"
      default:
        return stage
    }
  }

  return (
    <div>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <Link href="/funding" className="mb-4 inline-flex items-center text-[#0F7377] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Funding Marketplace
          </Link>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-md">
                <Image
                  src={opportunity.logo || "/placeholder.svg"}
                  alt={opportunity.organization}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">{opportunity.title}</h1>
                <p className="text-lg text-[#334155]">{opportunity.organization}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <a href={opportunity.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit Website
                </a>
              </Button>
              {opportunity.contactEmail && (
                <Button variant="outline" asChild>
                  <a href={`mailto:${opportunity.contactEmail}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </a>
                </Button>
              )}
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                <Link href={`/funding/${opportunity.id}/apply`}>Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>About {opportunity.organization}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-6 text-[#334155]">{opportunity.description}</p>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h3 className="mb-2 font-medium text-[#1E293B]">Investment Focus</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Type:</span> {getFundingTypeLabel(opportunity.type)}
                          </p>
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Stages:</span>{" "}
                            {opportunity.stage.map((s) => getStageLabel(s)).join(", ")}
                          </p>
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Funding Range:</span> {formatCurrency(opportunity.minAmount)}{" "}
                            - {formatCurrency(opportunity.maxAmount)}
                          </p>
                          <p className="text-sm text-[#334155]">
                            <span className="font-medium">Location:</span> {opportunity.location}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium text-[#1E293B]">Industries</h3>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.industries.map((industry) => (
                            <Badge key={industry} variant="secondary">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <h3 className="mb-4 font-medium text-[#1E293B]">What We Look For</h3>
                      <ul className="space-y-2">
                        {opportunity.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="mt-1 h-4 w-4 shrink-0 text-[#0F7377]" />
                            <span className="text-[#334155]">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-4 font-medium text-[#1E293B]">Application Process</h3>
                      <ol className="list-inside list-decimal space-y-4 text-[#334155]">
                        <li>
                          <span className="font-medium">Initial Application:</span> Submit your company information,
                          pitch deck, and financial projections through our online form.
                        </li>
                        <li>
                          <span className="font-medium">Screening:</span> Our investment team reviews applications and
                          selects promising startups for further evaluation.
                        </li>
                        <li>
                          <span className="font-medium">First Meeting:</span> Selected startups are invited for an
                          initial meeting to discuss their business in more detail.
                        </li>
                        <li>
                          <span className="font-medium">Due Diligence:</span> For startups that progress, we conduct a
                          thorough due diligence process.
                        </li>
                        <li>
                          <span className="font-medium">Investment Committee:</span> Final decision is made by our
                          investment committee.
                        </li>
                        <li>
                          <span className="font-medium">Term Sheet & Closing:</span> If approved, we issue a term sheet
                          and proceed to legal documentation and closing.
                        </li>
                      </ol>
                    </div>

                    {opportunity.applicationDeadline && (
                      <div className="flex items-center gap-2 rounded-md bg-[#F8FAFC] p-4">
                        <Calendar className="h-5 w-5 text-[#0F7377]" />
                        <span className="font-medium text-[#1E293B]">
                          Application Deadline: {opportunity.applicationDeadline}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Companies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {portfolioCompanies.map((company) => (
                        <div key={company.name} className="flex items-start gap-4">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                            <Image
                              src={company.logo || "/placeholder.svg"}
                              alt={company.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#1E293B]">{company.name}</h3>
                            <p className="text-sm text-[#334155]">{company.description}</p>
                            <Badge variant="outline" className="mt-2 text-xs">
                              {company.industry}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      {teamMembers.map((member) => (
                        <div key={member.name} className="flex items-start gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                            <Image
                              src={member.avatar || "/placeholder.svg"}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-[#1E293B]">{member.name}</h3>
                            <p className="text-sm text-[#334155]">{member.title}</p>
                            <p className="mt-2 text-sm text-[#334155]">{member.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Funding Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">Funding Type</p>
                    <p className="text-[#334155]">{getFundingTypeLabel(opportunity.type)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">Funding Range</p>
                    <p className="text-[#334155]">
                      {formatCurrency(opportunity.minAmount)} - {formatCurrency(opportunity.maxAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">Stages</p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.stage.map((stage) => (
                        <Badge key={stage} variant="outline">
                          {getStageLabel(stage)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">Industries</p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.industries.map((industry) => (
                        <Badge key={industry} variant="secondary">
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1E293B]">Location</p>
                    <p className="text-[#334155]">{opportunity.location}</p>
                  </div>
                  {opportunity.applicationDeadline && (
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">Application Deadline</p>
                      <p className="text-[#334155]">{opportunity.applicationDeadline}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to Apply?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#334155]">
                  If your startup meets the requirements and you're ready to take the next step, apply now to connect
                  with {opportunity.organization}.
                </p>
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                  <Link href={`/funding/${opportunity.id}/apply`}>Apply for Funding</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-[#334155]">
                  Not sure if this opportunity is right for you? Schedule a consultation with our funding advisors.
                </p>
                <Button variant="outline" className="w-full">
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
