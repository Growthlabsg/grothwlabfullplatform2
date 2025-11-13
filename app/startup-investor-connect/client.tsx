"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Building, DollarSign, Users, Briefcase, Search, Filter, ArrowRight } from "lucide-react"

// Mock data for startups
const MOCK_STARTUPS = [
  {
    id: "startup-1",
    name: "EcoTech Solutions",
    logo: "/extraterrestrial-encounter.png",
    industry: "CleanTech",
    stage: "Seed",
    location: "Singapore",
    fundingGoal: "$500K",
    description: "Developing sustainable energy solutions for urban environments.",
    tags: ["Sustainability", "Energy", "B2B"],
    matchScore: 92,
  },
  {
    id: "startup-2",
    name: "HealthAI",
    logo: "/chemical-structure-hyaluronic-acid.png",
    industry: "HealthTech",
    stage: "Series A",
    location: "Singapore",
    fundingGoal: "$2M",
    description: "AI-powered diagnostics for early disease detection.",
    tags: ["Healthcare", "AI", "B2B2C"],
    matchScore: 87,
  },
  {
    id: "startup-3",
    name: "FinFlow",
    logo: "/intertwined-foliage.png",
    industry: "FinTech",
    stage: "Pre-seed",
    location: "Singapore",
    fundingGoal: "$300K",
    description: "Streamlining financial operations for SMEs in Southeast Asia.",
    tags: ["Finance", "SME", "B2B"],
    matchScore: 78,
  },
  {
    id: "startup-4",
    name: "EduSpark",
    logo: "/abstract-geometric-shapes.png",
    industry: "EdTech",
    stage: "Seed",
    location: "Singapore",
    fundingGoal: "$750K",
    description: "Personalized learning platform for K-12 students.",
    tags: ["Education", "SaaS", "B2C"],
    matchScore: 65,
  },
]

// Mock data for investors
const MOCK_INVESTORS = [
  {
    id: "investor-1",
    name: "Horizon Ventures",
    logo: "/abstract-hv.png",
    type: "Venture Capital",
    focus: ["CleanTech", "HealthTech"],
    stage: ["Seed", "Series A"],
    location: "Singapore",
    investmentRange: "$250K - $2M",
    description: "Early-stage investor focused on sustainable technologies and healthcare innovations.",
    portfolio: 24,
    matchScore: 94,
  },
  {
    id: "investor-2",
    name: "SG Angels",
    logo: "/placeholder.svg?height=80&width=80&query=SGA",
    type: "Angel Group",
    focus: ["FinTech", "EdTech"],
    stage: ["Pre-seed", "Seed"],
    location: "Singapore",
    investmentRange: "$50K - $500K",
    description: "Angel investor network supporting early-stage startups in Singapore.",
    portfolio: 35,
    matchScore: 89,
  },
  {
    id: "investor-3",
    name: "Digital Futures Fund",
    logo: "/placeholder.svg?height=80&width=80&query=DFF",
    type: "Corporate VC",
    focus: ["FinTech", "AI", "SaaS"],
    stage: ["Series A", "Series B"],
    location: "Singapore",
    investmentRange: "$1M - $5M",
    description: "Corporate venture arm investing in digital transformation technologies.",
    portfolio: 18,
    matchScore: 76,
  },
  {
    id: "investor-4",
    name: "ASEAN Growth Partners",
    logo: "/placeholder.svg?height=80&width=80&query=AGP",
    type: "Growth Equity",
    focus: ["E-commerce", "Logistics", "FinTech"],
    stage: ["Series B", "Series C"],
    location: "Singapore",
    investmentRange: "$5M - $20M",
    description: "Growth equity firm focused on scaling businesses across Southeast Asia.",
    portfolio: 12,
    matchScore: 62,
  },
]

export default function StartupInvestorConnectClient() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<string>("find-investors")
  const [isLoading, setIsLoading] = useState(true)
  const [startups, setStartups] = useState(MOCK_STARTUPS)
  const [investors, setInvestors] = useState(MOCK_INVESTORS)
  const [industryFilter, setIndustryFilter] = useState<string>("")
  const [stageFilter, setStageFilter] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Set the active tab based on user role
  useEffect(() => {
    if (user) {
      if (user.role === "investor") {
        setActiveTab("find-startups")
      } else if (user.role === "startup") {
        setActiveTab("find-investors")
      }
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [user])

  // Handle connection request
  const handleConnect = (id: string, type: "startup" | "investor") => {
    toast({
      title: "Connection request sent",
      description: `Your connection request has been sent to ${type === "startup" ? "startup" : "investor"} #${id}.`,
    })
  }

  // Filter startups based on search and filters
  const filteredStartups = startups.filter((startup) => {
    const matchesSearch =
      searchQuery === "" ||
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesIndustry = industryFilter === "" || startup.industry === industryFilter
    const matchesStage = stageFilter === "" || startup.stage === stageFilter

    return matchesSearch && matchesIndustry && matchesStage
  })

  // Filter investors based on search and filters
  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch =
      searchQuery === "" ||
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.focus.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesIndustry = industryFilter === "" || investor.focus.includes(industryFilter)
    const matchesStage = stageFilter === "" || investor.stage.includes(stageFilter)

    return matchesSearch && matchesIndustry && matchesStage
  })

  return (
    <div>
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="find-investors">Find Investors</TabsTrigger>
          <TabsTrigger value="find-startups">Find Startups</TabsTrigger>
        </TabsList>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, industry, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <div className="w-40">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="CleanTech">CleanTech</SelectItem>
                  <SelectItem value="HealthTech">HealthTech</SelectItem>
                  <SelectItem value="FinTech">FinTech</SelectItem>
                  <SelectItem value="EdTech">EdTech</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-40">
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B">Series B</SelectItem>
                  <SelectItem value="Series C">Series C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSearchQuery("")
                setIndustryFilter("")
                setStageFilter("")
              }}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="find-investors" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {filteredInvestors.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No investors found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredInvestors.map((investor) => (
                    <Card key={investor.id} className="overflow-hidden">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                          <img
                            src={investor.logo || "/placeholder.svg"}
                            alt={investor.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{investor.name}</CardTitle>
                          <CardDescription>
                            {investor.type} • {investor.location}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {investor.matchScore}% Match
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{investor.description}</p>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{investor.investmentRange}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{investor.portfolio} Companies</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{investor.focus.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{investor.stage.join(", ")}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleConnect(investor.id, "investor")}>
                          Connect with Investor
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="find-startups" className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-40 mb-2" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {filteredStartups.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No startups found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredStartups.map((startup) => (
                    <Card key={startup.id} className="overflow-hidden">
                      <CardHeader className="flex flex-row items-center gap-4">
                        <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                          <img
                            src={startup.logo || "/placeholder.svg"}
                            alt={startup.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{startup.name}</CardTitle>
                          <CardDescription>
                            {startup.industry} • {startup.location}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {startup.matchScore}% Match
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{startup.description}</p>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{startup.stage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{startup.fundingGoal}</span>
                          </div>
                          <div className="flex items-center gap-2 col-span-2">
                            <div className="flex flex-wrap gap-1 mt-2">
                              {startup.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" onClick={() => handleConnect(startup.id, "startup")}>
                          Connect with Startup
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
