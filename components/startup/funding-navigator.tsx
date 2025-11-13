"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { GrowthLabLayout } from "@/components/layout/growthlab-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import {
  ChevronLeft,
  DollarSign,
  Users,
  BarChart4,
  ArrowRight,
  Sparkles,
  Check,
  Calendar,
  Download,
  Search,
  Filter,
  Megaphone,
  Building,
  Briefcase,
  Rocket,
  Lightbulb,
  FileText,
} from "lucide-react"

export function FundingNavigator() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("assessment")
  const [fundingType, setFundingType] = useState("")
  const [stage, setStage] = useState("")
  const [industry, setIndustry] = useState("")
  const [revenue, setRevenue] = useState([0])
  const [fundingNeeded, setFundingNeeded] = useState([0])
  const [equity, setEquity] = useState([0])
  const [assessmentComplete, setAssessmentComplete] = useState(false)
  const [matchResults, setMatchResults] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRegion, setFilterRegion] = useState("all")

  const handleAssessmentSubmit = () => {
    if (!stage || !industry || revenue[0] === 0 || fundingNeeded[0] === 0) {
      toast({
        title: "Incomplete Information",
        description: "Please fill out all required fields to get funding recommendations.",
        variant: "destructive",
      })
      return
    }

    setAssessmentComplete(true)
    setActiveTab("recommendations")

    toast({
      title: "Assessment Complete",
      description: "We've analyzed your startup and found funding options that match your needs.",
    })
  }

  const handleFindInvestors = () => {
    setMatchResults(true)

    toast({
      title: "Investors Found",
      description: "We've found investors that match your criteria.",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getRecommendedFundingTypes = () => {
    // This would be more sophisticated in a real app
    if (stage === "idea") {
      return ["bootstrapping", "friends-family", "grants", "accelerators"]
    } else if (stage === "mvp") {
      return ["angel", "accelerators", "crowdfunding", "grants"]
    } else if (stage === "early-traction") {
      return ["angel", "seed-vc", "crowdfunding"]
    } else if (stage === "growth") {
      return ["series-a", "strategic", "venture-debt"]
    } else if (stage === "expansion") {
      return ["series-b", "series-c", "strategic", "venture-debt"]
    }
    return ["bootstrapping", "angel", "seed-vc", "crowdfunding"]
  }

  const recommendedTypes = getRecommendedFundingTypes()

  return (
    <GrowthLabLayout>
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/startup" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Startup Resources
          </Link>
          <h1 className="text-3xl font-bold mb-4">Funding Navigator</h1>
          <p className="text-[#334155] max-w-3xl">
            Explore funding options and connect with investors that match your startup's needs. Our funding navigator
            helps you find the right funding sources based on your startup's stage, industry, and requirements.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Funding Navigator</CardTitle>
                <CardDescription>
                  Find the right funding options for your startup based on your specific needs and stage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-8">
                    <TabsTrigger value="assessment">Assessment</TabsTrigger>
                    <TabsTrigger value="recommendations" disabled={!assessmentComplete}>
                      Recommendations
                    </TabsTrigger>
                    <TabsTrigger value="investors">Find Investors</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="assessment" className="space-y-6">
                    <div>
                      <Label htmlFor="startup-stage">Startup Stage*</Label>
                      <Select value={stage} onValueChange={setStage}>
                        <SelectTrigger id="startup-stage">
                          <SelectValue placeholder="Select your startup stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="idea">Idea Stage</SelectItem>
                          <SelectItem value="mvp">MVP/Prototype</SelectItem>
                          <SelectItem value="early-traction">Early Traction</SelectItem>
                          <SelectItem value="growth">Growth Stage</SelectItem>
                          <SelectItem value="expansion">Expansion Stage</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry*</Label>
                      <Select value={industry} onValueChange={setIndustry}>
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology/Software</SelectItem>
                          <SelectItem value="ecommerce">E-commerce/Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Financial Services</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="services">Professional Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="current-revenue">Current Annual Revenue*</Label>
                      <div className="space-y-3">
                        <Slider
                          id="current-revenue"
                          min={0}
                          max={10000000}
                          step={50000}
                          value={revenue}
                          onValueChange={setRevenue}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">$0</span>
                          <span className="text-sm font-medium">{formatCurrency(revenue[0])}</span>
                          <span className="text-sm text-muted-foreground">$10M+</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="funding-needed">Funding Amount Needed*</Label>
                      <div className="space-y-3">
                        <Slider
                          id="funding-needed"
                          min={10000}
                          max={10000000}
                          step={10000}
                          value={fundingNeeded}
                          onValueChange={setFundingNeeded}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">$10K</span>
                          <span className="text-sm font-medium">{formatCurrency(fundingNeeded[0])}</span>
                          <span className="text-sm text-muted-foreground">$10M+</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="equity-willing">Equity Willing to Give (%)</Label>
                      <div className="space-y-3">
                        <Slider
                          id="equity-willing"
                          min={0}
                          max={49}
                          step={1}
                          value={equity}
                          onValueChange={setEquity}
                        />
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">0%</span>
                          <span className="text-sm font-medium">{equity[0]}%</span>
                          <span className="text-sm text-muted-foreground">49%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Funding Timeline</Label>
                      <RadioGroup defaultValue="1-3-months" className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="immediate" id="immediate" />
                          <Label htmlFor="immediate">Immediate (within 1 month)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1-3-months" id="1-3-months" />
                          <Label htmlFor="1-3-months">1-3 months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3-6-months" id="3-6-months" />
                          <Label htmlFor="3-6-months">3-6 months</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="6-plus-months" id="6-plus-months" />
                          <Label htmlFor="6-plus-months">6+ months</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label htmlFor="funding-purpose">Purpose of Funding</Label>
                      <Textarea
                        id="funding-purpose"
                        placeholder="Describe how you plan to use the funding..."
                        rows={3}
                      />
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleAssessmentSubmit}>
                        <BarChart4 className="h-4 w-4 mr-2" />
                        Get Funding Recommendations
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="recommendations" className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <h3 className="text-lg font-medium mb-2">Funding Recommendation Summary</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on your{" "}
                        {stage === "idea"
                          ? "idea stage"
                          : stage === "mvp"
                            ? "MVP stage"
                            : stage === "early-traction"
                              ? "early traction"
                              : stage === "growth"
                                ? "growth stage"
                                : "expansion stage"}{" "}
                        {industry} startup with {formatCurrency(revenue[0])} in annual revenue, we recommend the
                        following funding options:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recommendedTypes.includes("bootstrapping") && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Bootstrapping</Badge>
                        )}
                        {recommendedTypes.includes("friends-family") && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Friends & Family</Badge>
                        )}
                        {recommendedTypes.includes("angel") && (
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Angel Investors</Badge>
                        )}
                        {recommendedTypes.includes("seed-vc") && (
                          <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Seed VC</Badge>
                        )}
                        {recommendedTypes.includes("series-a") && (
                          <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">Series A</Badge>
                        )}
                        {recommendedTypes.includes("series-b") && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Series B+</Badge>
                        )}
                        {recommendedTypes.includes("crowdfunding") && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Crowdfunding</Badge>
                        )}
                        {recommendedTypes.includes("grants") && (
                          <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">Grants</Badge>
                        )}
                        {recommendedTypes.includes("accelerators") && (
                          <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Accelerators</Badge>
                        )}
                        {recommendedTypes.includes("strategic") && (
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Strategic Partners</Badge>
                        )}
                        {recommendedTypes.includes("venture-debt") && (
                          <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">Venture Debt</Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      {recommendedTypes.includes("angel") && (
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>Angel Investors</CardTitle>
                                <CardDescription>Individual investors who fund early-stage startups</CardDescription>
                              </div>
                              <Badge className="bg-purple-100 text-purple-800">Recommended</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Typical Amount</h4>
                                  <p className="text-sm text-muted-foreground">$25K - $500K</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Equity Required</h4>
                                  <p className="text-sm text-muted-foreground">5% - 25%</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Timeline</h4>
                                  <p className="text-sm text-muted-foreground">1-6 months</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Best For</h4>
                                  <p className="text-sm text-muted-foreground">Early-stage startups with MVP</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Pros</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Mentorship and guidance from experienced entrepreneurs</li>
                                  <li>Access to valuable networks and connections</li>
                                  <li>Faster decision-making than institutional investors</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Cons</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Limited capital compared to venture capital</li>
                                  <li>May have less experience with later funding rounds</li>
                                  <li>Potential for more hands-on involvement than desired</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" onClick={() => setActiveTab("investors")}>
                              Find Angel Investors
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {recommendedTypes.includes("seed-vc") && (
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>Seed Venture Capital</CardTitle>
                                <CardDescription>VC firms specializing in early-stage investments</CardDescription>
                              </div>
                              <Badge className="bg-indigo-100 text-indigo-800">Recommended</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Typical Amount</h4>
                                  <p className="text-sm text-muted-foreground">$250K - $2M</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Equity Required</h4>
                                  <p className="text-sm text-muted-foreground">10% - 25%</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Timeline</h4>
                                  <p className="text-sm text-muted-foreground">3-6 months</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Best For</h4>
                                  <p className="text-sm text-muted-foreground">Startups with early traction</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Pros</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Larger funding amounts than angel investors</li>
                                  <li>Access to extensive networks and resources</li>
                                  <li>Potential for follow-on funding in later rounds</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Cons</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Longer due diligence process</li>
                                  <li>Higher expectations for growth and returns</li>
                                  <li>May require board seats and more formal governance</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" onClick={() => setActiveTab("investors")}>
                              Find Seed VC Firms
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {recommendedTypes.includes("crowdfunding") && (
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>Crowdfunding</CardTitle>
                                <CardDescription>Raising small amounts from many individuals</CardDescription>
                              </div>
                              <Badge className="bg-yellow-100 text-yellow-800">Recommended</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Typical Amount</h4>
                                  <p className="text-sm text-muted-foreground">$10K - $1M</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Equity Required</h4>
                                  <p className="text-sm text-muted-foreground">0% - 20% (varies by type)</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Timeline</h4>
                                  <p className="text-sm text-muted-foreground">1-3 months</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Best For</h4>
                                  <p className="text-sm text-muted-foreground">Consumer products, B2C startups</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Pros</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Marketing and validation benefits</li>
                                  <li>Access to non-traditional investors</li>
                                  <li>Multiple types: rewards, equity, or pre-sales</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Cons</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Requires significant marketing effort</li>
                                  <li>Public exposure of your idea and progress</li>
                                  <li>Managing many small investors can be challenging</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" onClick={() => setActiveTab("resources")}>
                              Explore Crowdfunding Platforms
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {recommendedTypes.includes("accelerators") && (
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>Accelerator Programs</CardTitle>
                                <CardDescription>Fixed-term programs with mentorship and funding</CardDescription>
                              </div>
                              <Badge className="bg-orange-100 text-orange-800">Recommended</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Typical Amount</h4>
                                  <p className="text-sm text-muted-foreground">$20K - $150K</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Equity Required</h4>
                                  <p className="text-sm text-muted-foreground">5% - 10%</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Timeline</h4>
                                  <p className="text-sm text-muted-foreground">3-6 months program</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Best For</h4>
                                  <p className="text-sm text-muted-foreground">Early-stage startups seeking guidance</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Pros</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Structured mentorship and education</li>
                                  <li>Access to investor networks</li>
                                  <li>Community of fellow founders</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Cons</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Highly competitive application process</li>
                                  <li>May require relocation</li>
                                  <li>Intense time commitment</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" onClick={() => setActiveTab("resources")}>
                              Find Accelerator Programs
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      )}

                      {recommendedTypes.includes("grants") && (
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle>Grants</CardTitle>
                                <CardDescription>
                                  Non-dilutive funding from government or private organizations
                                </CardDescription>
                              </div>
                              <Badge className="bg-teal-100 text-teal-800">Recommended</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Typical Amount</h4>
                                  <p className="text-sm text-muted-foreground">$5K - $500K</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Equity Required</h4>
                                  <p className="text-sm text-muted-foreground">0%</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Timeline</h4>
                                  <p className="text-sm text-muted-foreground">3-12 months</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Best For</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Research, social impact, specific industries
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Pros</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Non-dilutive funding (no equity required)</li>
                                  <li>Credibility and validation</li>
                                  <li>Can be combined with other funding sources</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Cons</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                                  <li>Lengthy application process</li>
                                  <li>Specific requirements and restrictions</li>
                                  <li>Reporting and compliance obligations</li>
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full" onClick={() => setActiveTab("resources")}>
                              Explore Grant Opportunities
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      )}
                    </div>

                    <div className="pt-4 flex justify-between">
                      <Button variant="outline" onClick={() => setActiveTab("assessment")}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Back to Assessment
                      </Button>
                      <Button onClick={() => setActiveTab("investors")}>
                        Find Investors
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="investors" className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1">
                        <Label htmlFor="investor-search" className="sr-only">
                          Search Investors
                        </Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="investor-search"
                            placeholder="Search investors by name, industry, or location..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Label htmlFor="region-filter" className="sr-only">
                          Filter by Region
                        </Label>
                        <Select value={filterRegion} onValueChange={setFilterRegion}>
                          <SelectTrigger id="region-filter" className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Filter by Region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Regions</SelectItem>
                            <SelectItem value="north-america">North America</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="asia-pacific">Asia-Pacific</SelectItem>
                            <SelectItem value="singapore">Singapore</SelectItem>
                            <SelectItem value="southeast-asia">Southeast Asia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleFindInvestors}>Find Matches</Button>
                    </div>

                    {matchResults ? (
                      <div className="space-y-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                                  <Building className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <CardTitle>Horizon Ventures</CardTitle>
                                  <CardDescription>Seed & Series A VC Firm</CardDescription>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-800">92% Match</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Investment Range</h4>
                                  <p className="text-sm text-muted-foreground">$250K - $2M</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Industries</h4>
                                  <p className="text-sm text-muted-foreground">Technology, Healthcare, Fintech</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Location</h4>
                                  <p className="text-sm text-muted-foreground">Singapore, Southeast Asia</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Portfolio Companies</h4>
                                <p className="text-sm text-muted-foreground">
                                  TechNova, HealthAI, FinanceSimple, DataFlow
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">View Profile</Button>
                            <Button>Connect</Button>
                          </CardFooter>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                                  <Users className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                  <CardTitle>Sarah Chen</CardTitle>
                                  <CardDescription>Angel Investor</CardDescription>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-800">87% Match</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Investment Range</h4>
                                  <p className="text-sm text-muted-foreground">$50K - $250K</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Industries</h4>
                                  <p className="text-sm text-muted-foreground">E-commerce, Technology, Consumer</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Location</h4>
                                  <p className="text-sm text-muted-foreground">Singapore</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Background</h4>
                                <p className="text-sm text-muted-foreground">
                                  Former CEO of RetailTech, advisor to multiple startups
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">View Profile</Button>
                            <Button>Connect</Button>
                          </CardFooter>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                                  <Rocket className="h-6 w-6 text-indigo-600" />
                                </div>
                                <div>
                                  <CardTitle>Startup Accelerator SG</CardTitle>
                                  <CardDescription>Accelerator Program</CardDescription>
                                </div>
                              </div>
                              <Badge className="bg-green-100 text-green-800">85% Match</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <h4 className="text-sm font-medium">Investment</h4>
                                  <p className="text-sm text-muted-foreground">$75K for 6%</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Industries</h4>
                                  <p className="text-sm text-muted-foreground">All tech industries</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium">Location</h4>
                                  <p className="text-sm text-muted-foreground">Singapore</p>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Program Details</h4>
                                <p className="text-sm text-muted-foreground">
                                  3-month program, mentorship, office space, demo day
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Next Cohort</h4>
                                <p className="text-sm text-muted-foreground">Applications due July 15, 2023</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button variant="outline">View Program</Button>
                            <Button>Apply Now</Button>
                          </CardFooter>
                        </Card>

                        <div className="text-center pt-4">
                          <Button variant="outline">Load More Matches</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="inline-block p-3 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Find Your Perfect Investor Match</h3>
                        <p className="text-muted-foreground max-w-md mx-auto mb-6">
                          Use our investor matching tool to find investors that align with your startup's industry,
                          stage, and funding needs.
                        </p>
                        <Button onClick={handleFindInvestors}>Find Investor Matches</Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="resources" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Pitch Deck Templates</CardTitle>
                          <CardDescription>
                            Professional templates to create compelling investor presentations
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="relative h-40 rounded-md overflow-hidden">
                              <Image
                                src="/pitch-deck-template.png"
                                alt="Pitch Deck Template"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Access professionally designed pitch deck templates tailored for different funding stages
                              and industries.
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download Templates
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Funding Readiness Checklist</CardTitle>
                          <CardDescription>Ensure you're prepared before approaching investors</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm">
                                  <span className="font-medium">Business Plan:</span> Comprehensive business plan with
                                  clear market opportunity
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm">
                                  <span className="font-medium">Financial Projections:</span> 3-5 year projections with
                                  realistic assumptions
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm">
                                  <span className="font-medium">Pitch Deck:</span> Compelling presentation that tells
                                  your story
                                </span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                <span className="text-sm">
                                  <span className="font-medium">Legal Structure:</span> Proper legal entity and
                                  agreements in place
                                </span>
                              </li>
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Download Full Checklist
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Investor Meeting Preparation</CardTitle>
                          <CardDescription>Resources to help you prepare for investor meetings</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <div className="bg-muted p-2 rounded-md">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Common Investor Questions</h4>
                                <p className="text-xs text-muted-foreground">PDF Guide</p>
                              </div>
                              <Button variant="ghost" size="icon" className="ml-auto">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="bg-muted p-2 rounded-md">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Due Diligence Checklist</h4>
                                <p className="text-xs text-muted-foreground">PDF Guide</p>
                              </div>
                              <Button variant="ghost" size="icon" className="ml-auto">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="bg-muted p-2 rounded-md">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Pitch Meeting Script Template</h4>
                                <p className="text-xs text-muted-foreground">DOCX Template</p>
                              </div>
                              <Button variant="ghost" size="icon" className="ml-auto">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">View All Resources</Button>
                        </CardFooter>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Funding Events</CardTitle>
                          <CardDescription>Pitch competitions, investor meetups, and networking events</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                              <div className="bg-muted p-2 rounded-md shrink-0">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Singapore Startup Pitch Competition</h4>
                                <p className="text-xs text-muted-foreground mb-1">June 15, 2023 • Marina Bay Sands</p>
                                <Badge variant="outline" className="text-xs">
                                  In-Person
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4">
                              <div className="bg-muted p-2 rounded-md shrink-0">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Virtual Investor Meetup: Seed Stage</h4>
                                <p className="text-xs text-muted-foreground mb-1">July 5, 2023 • Online</p>
                                <Badge variant="outline" className="text-xs">
                                  Virtual
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-start space-x-4">
                              <div className="bg-muted p-2 rounded-md shrink-0">
                                <Calendar className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">Funding Workshop: Series A Readiness</h4>
                                <p className="text-xs text-muted-foreground mb-1">July 20, 2023 • BASH, Singapore</p>
                                <Badge variant="outline" className="text-xs">
                                  Hybrid
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">View All Events</Button>
                        </CardFooter>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Funding Guides & Articles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                          <div className="relative h-40">
                            <Image
                              src="/angel-investor-guide.png"
                              alt="Angel Investor Guide"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-base">How to Find and Pitch Angel Investors</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              Learn how to identify, approach, and successfully pitch to angel investors for your
                              early-stage startup.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              Read Guide
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>

                        <Card>
                          <div className="relative h-40">
                            <Image src="/term-sheet-guide.png" alt="Term Sheet Guide" fill className="object-cover" />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-base">Understanding Term Sheets: A Founder's Guide</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              Decode the complex language of term sheets and understand key terms that can impact your
                              startup's future.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              Read Guide
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>

                        <Card>
                          <div className="relative h-40">
                            <Image src="/valuation-guide.png" alt="Valuation Guide" fill className="object-cover" />
                          </div>
                          <CardHeader>
                            <CardTitle className="text-base">Startup Valuation Methods Explained</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              Learn different approaches to valuing your startup at various stages and how to negotiate
                              with investors.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              Read Guide
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Funding Types</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Users className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Angel Investors</h3>
                      <p className="text-sm text-muted-foreground">Individual investors for early-stage</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Building className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Venture Capital</h3>
                      <p className="text-sm text-muted-foreground">Institutional funding for high growth</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Megaphone className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Crowdfunding</h3>
                      <p className="text-sm text-muted-foreground">Raise from many small investors</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Rocket className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Accelerators</h3>
                      <p className="text-sm text-muted-foreground">Programs with mentorship and funding</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <Briefcase className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Bootstrapping</h3>
                      <p className="text-sm text-muted-foreground">Self-funding your startup</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="bg-[#0F7377]/10 p-2 rounded-md mr-3">
                      <DollarSign className="h-5 w-5 text-[#0F7377]" />
                    </div>
                    <div>
                      <h3 className="font-medium">Grants</h3>
                      <p className="text-sm text-muted-foreground">Non-dilutive funding options</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Readiness Score</CardTitle>
                <CardDescription>
                  Complete the assessment to see how ready you are for different funding types
                </CardDescription>
              </CardHeader>
              <CardContent>
                {assessmentComplete ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Angel Investment</h4>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Seed VC</h4>
                        <span className="text-sm font-medium">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Accelerators</h4>
                        <span className="text-sm font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Crowdfunding</h4>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-sm font-medium">Grants</h4>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete the funding assessment to see your readiness score for different funding types.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("assessment")}>
                      Start Assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding Calendar</CardTitle>
                <CardDescription>Upcoming deadlines and events</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">GrowthLab</h4>
                      <Badge variant="outline">Jun 12</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Application deadline for Winter 2023 batch</p>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">Startup SG Founder</h4>
                      <Badge variant="outline">Jul 15</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Grant application deadline</p>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">SLINGSHOT 2023</h4>
                      <Badge variant="outline">Aug 5</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Pitch competition registration closes</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full Calendar
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Funding Assistant</CardTitle>
                <CardDescription>Get personalized funding advice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea placeholder="Ask a question about startup funding..." rows={3} />
                  <Button className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get AI Assistance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Expert Funding Advice</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="relative h-40">
                <Image src="/funding-expert-1.png" alt="Funding Expert" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Pitch Deck Review</CardTitle>
                <CardDescription>
                  Get professional feedback on your pitch deck from experienced investors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our experts will review your pitch deck and provide detailed feedback to help you improve your
                  presentation and increase your chances of securing funding.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Starting at $199</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book a Review</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                <Image src="/funding-expert-2.png" alt="Funding Expert" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Investor Matching Service</CardTitle>
                <CardDescription>Get introduced to investors that match your startup</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our investor matching service connects you with pre-vetted investors who are actively looking for
                  startups in your industry and stage.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Starting at $499</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Matched</Button>
              </CardFooter>
            </Card>

            <Card>
              <div className="relative h-40">
                <Image src="/funding-expert-3.png" alt="Funding Expert" fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>Funding Strategy Session</CardTitle>
                <CardDescription>Develop a customized funding roadmap for your startup</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Work with a funding expert to develop a comprehensive funding strategy tailored to your startup's
                  unique needs and goals.
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Starting at $349</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book a Session</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </GrowthLabLayout>
  )
}
