import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Linkedin, Mail, Twitter } from "lucide-react"
import { formatCurrency } from "@/utils/format"
import { Footer } from "@/components/layout/footer"
import type { Investor } from "@/types/funding"

// Sample data for the investor
const investor: Investor = {
  id: "investor-1",
  name: "Sarah Chen",
  organization: "GrowthLab Ventures",
  title: "Managing Partner",
  avatar: "/placeholder.svg?height=64&width=64",
  bio: "Sarah is a seasoned investor with over 15 years of experience in venture capital and startup ecosystems across Asia. She focuses on early-stage investments in technology-enabled businesses with the potential to scale across Southeast Asia. Prior to joining GrowthLab Ventures, Sarah was a founding partner at a regional VC firm and held senior roles at global investment banks.",
  investmentFocus: {
    stages: ["pre-seed", "seed", "series-a"],
    industries: ["fintech", "saas", "ai", "ecommerce"],
    ticketSize: {
      min: 250000,
      max: 1000000,
    },
  },
  portfolio: ["PayNow", "HealthTech AI", "EduLearn", "LogisticsX"],
  location: "Singapore",
  linkedin: "https://linkedin.com/in/sarahchen",
  twitter: "https://twitter.com/sarahchen",
}

export default function InvestorProfilePage({ params }: { params: { id: string } }) {
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

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row">
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={investor.avatar || "/placeholder.svg"}
                    alt={investor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">{investor.name}</h1>
                  <p className="text-lg text-[#334155]">
                    {investor.title}, {investor.organization}
                  </p>
                  <p className="text-[#334155]">{investor.location}</p>
                  <div className="mt-4 flex gap-3">
                    {investor.linkedin && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={investor.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                    )}
                    {investor.twitter && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={investor.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </a>
                      </Button>
                    )}
                    {investor.contactEmail && (
                      <Button variant="outline" size="icon" asChild>
                        <a href={`mailto:${investor.contactEmail}`}>
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#334155]">{investor.bio}</p>
                </CardContent>
              </Card>

              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Investment Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 font-medium text-[#1E293B]">Stages</h3>
                      <div className="flex flex-wrap gap-2">
                        {investor.investmentFocus.stages.map((stage) => (
                          <Badge key={stage} variant="outline">
                            {getStageLabel(stage)}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium text-[#1E293B]">Industries</h3>
                      <div className="flex flex-wrap gap-2">
                        {investor.investmentFocus.industries.map((industry) => (
                          <Badge key={industry} variant="secondary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium text-[#1E293B]">Ticket Size</h3>
                      <p className="text-[#334155]">
                        {formatCurrency(investor.investmentFocus.ticketSize.min)} -{" "}
                        {formatCurrency(investor.investmentFocus.ticketSize.max)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {investor.portfolio && investor.portfolio.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Companies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {investor.portfolio.map((company) => (
                        <Badge key={company} variant="outline">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect with {investor.name.split(" ")[0]}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#334155]">
                    Interested in pitching your startup to {investor.name}? Request a connection through GrowthLab.
                  </p>
                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                    <Link href={`/funding/investors/${investor.id}/connect`}>Request Connection</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-[#1E293B]">What {investor.name.split(" ")[0]} Looks For</p>
                      <ul className="mt-2 space-y-2 text-sm text-[#334155]">
                        <li>• Strong founding team with domain expertise</li>
                        <li>• Clear product-market fit</li>
                        <li>• Scalable business model</li>
                        <li>• Potential for regional/global expansion</li>
                        <li>• Innovative solution to a significant problem</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Investments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-md bg-[#F8FAFC] p-3">
                      <p className="font-medium text-[#1E293B]">PayNow</p>
                      <p className="text-sm text-[#334155]">
                        Led $1.2M seed round in digital payment platform for Southeast Asian SMEs
                      </p>
                    </div>
                    <div className="rounded-md bg-[#F8FAFC] p-3">
                      <p className="font-medium text-[#1E293B]">HealthTech AI</p>
                      <p className="text-sm text-[#334155]">
                        Participated in $3M Series A for AI-powered diagnostic tools
                      </p>
                    </div>
                    <div className="rounded-md bg-[#F8FAFC] p-3">
                      <p className="font-medium text-[#1E293B]">EduLearn</p>
                      <p className="text-sm text-[#334155]">
                        Seed investment in personalized learning platform for K-12 students
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
