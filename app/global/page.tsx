"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  MapPin,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Building2,
  Award,
  TrendingUp,
  Target,
  Lightbulb,
  Zap,
  Clock,
  DollarSign
} from "lucide-react"
import Link from "next/link"

export default function GlobalPage() {
  const globalLocations = [
    {
      name: "Singapore",
      flag: "🇸🇬",
      description: "Our headquarters and main hub for Southeast Asia operations",
      startups: "500+",
      investors: "150+",
      programs: ["Accelerator", "Co-founder Matching", "Funding"],
      features: ["Co-working space", "Government support", "Tax incentives"],
      timezone: "SGT (UTC+8)"
    },
    {
      name: "Hong Kong",
      flag: "🇭🇰",
      description: "Gateway to China and Asia-Pacific financial markets",
      startups: "300+",
      investors: "100+",
      programs: ["Mentorship", "Funding", "Networking"],
      features: ["Financial hub", "International access", "English-friendly"],
      timezone: "HKT (UTC+8)"
    },
    {
      name: "Tokyo",
      flag: "🇯🇵",
      description: "Leading innovation hub in Japan with deep tech focus",
      startups: "400+",
      investors: "80+",
      programs: ["Deep Tech", "Innovation", "Research"],
      features: ["Tech innovation", "Research facilities", "Corporate partnerships"],
      timezone: "JST (UTC+9)"
    },
    {
      name: "Seoul",
      flag: "🇰🇷",
      description: "Dynamic startup ecosystem with strong government support",
      startups: "350+",
      investors: "70+",
      programs: ["K-Startup", "Government Grants", "Mentorship"],
      features: ["Government backing", "Tech talent", "Innovation labs"],
      timezone: "KST (UTC+9)"
    },
    {
      name: "Manila",
      flag: "🇵🇭",
      description: "Growing startup scene in the Philippines with English-speaking talent",
      startups: "200+",
      investors: "40+",
      programs: ["Outsourcing", "E-commerce", "FinTech"],
      features: ["English talent", "Cost-effective", "Growing market"],
      timezone: "PHT (UTC+8)"
    },
    {
      name: "Bangkok",
      flag: "🇹🇭",
      description: "Emerging startup hub in Southeast Asia with growing tech scene",
      startups: "150+",
      investors: "30+",
      programs: ["E-commerce", "Tourism Tech", "AgTech"],
      features: ["Growing ecosystem", "Tourism tech", "AgTech focus"],
      timezone: "ICT (UTC+7)"
    }
  ]

  const globalPrograms = [
    {
      name: "Global Accelerator",
      description: "12-week program across multiple cities with international mentors",
      locations: ["Singapore", "Hong Kong", "Tokyo"],
      duration: "12 weeks",
      funding: "SGD 500K",
      participants: "50 startups"
    },
    {
      name: "Cross-Border Mentorship",
      description: "Connect with mentors from different countries and cultures",
      locations: ["All locations"],
      duration: "6 months",
      funding: "Free",
      participants: "200+ mentors"
    },
    {
      name: "International Funding",
      description: "Access to investors and funding opportunities across Asia",
      locations: ["All locations"],
      duration: "Ongoing",
      funding: "SGD 1M+",
      participants: "100+ investors"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Global Expansion</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Expand your startup across Asia with our global network and resources
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">12+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Countries</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">1,500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Startups</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#10B981]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Investors</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Global Locations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Global Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {globalLocations.map((location, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{location.flag}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{location.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{location.timezone}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {location.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#0F7377]" />
                      <span className="text-gray-600 dark:text-gray-300">{location.startups} startups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#0F7377]" />
                      <span className="text-gray-600 dark:text-gray-300">{location.investors} investors</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Programs</h4>
                    <div className="flex flex-wrap gap-1">
                      {location.programs.map((program, programIndex) => (
                        <Badge key={programIndex} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {location.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-3 w-3 text-[#0F7377]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
                    Explore {location.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Programs */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Global Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {globalPrograms.map((program, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{program.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#0F7377]" />
                      <span>{program.locations.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#0F7377]" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-[#0F7377]" />
                      <span>{program.funding}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#0F7377]" />
                      <span>{program.participants}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Go Global?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join our global network and expand your startup across Asia with our comprehensive support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                <Link href="/accelerator/apply">
                  Apply for Global Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
