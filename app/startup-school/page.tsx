"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Play, 
  CheckCircle, 
  GraduationCap,
  FileText,
  Video,
  Download,
  Share2,
  MessageSquare,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronRight,
  Rocket,
  DollarSign,
  Building2,
  Code,
  BarChart3,
  Globe,
  Shield,
  Heart,
  Eye,
  ThumbsUp,
  Trophy
} from "lucide-react"
import Link from "next/link"

export default function StartupSchoolPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-8 bg-[#0F7377] rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">GrowthLab</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-[#0F7377]">Home</Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-[#0F7377]">Dashboard</Link>
              <Link href="/resources/startup-school" className="text-gray-600 hover:text-[#0F7377]">Resources</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F7377] via-[#1E293B] to-[#0F7377] py-16 md:py-24">
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <Badge className="mb-6 w-fit bg-white/20 text-white hover:bg-white/30">
                <GraduationCap className="w-3 h-3 mr-2" />
                Free Learning Platform
              </Badge>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                Startup School
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Master the fundamentals of building and scaling successful startups. Learn from industry experts, 
                connect with fellow founders, and accelerate your entrepreneurial journey.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="/resources/startup-school">Explore Courses</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/resources/startup-school">View Learning Paths</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full max-w-md overflow-hidden rounded-lg md:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F7377]/20 to-[#1E293B]/20 rounded-lg"></div>
                <div className="relative h-full w-full flex items-center justify-center">
                  <GraduationCap className="h-32 w-32 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0F7377] md:text-4xl mb-2">50+</div>
              <div className="text-sm text-gray-600">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0F7377] md:text-4xl mb-2">200+</div>
              <div className="text-sm text-gray-600">Course Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0F7377] md:text-4xl mb-2">5,000+</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0F7377] md:text-4xl mb-2">95%</div>
              <div className="text-sm text-gray-600">Completion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#1E293B] md:text-4xl">Why Choose Startup School?</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#334155]">
              Everything you need to build and scale your startup
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#0F7377]/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#0F7377]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Expert Instructors</h3>
                <p className="text-sm text-gray-600">
                  Learn from successful founders, investors, and industry experts who have been there and done that.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#0F7377]/10 flex items-center justify-center">
                  <Play className="h-6 w-6 text-[#0F7377]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Practical Content</h3>
                <p className="text-sm text-gray-600">
                  Real-world examples, case studies, and actionable strategies you can implement immediately.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-[#0F7377]/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-[#0F7377]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Certification</h3>
                <p className="text-sm text-gray-600">
                  Earn certificates upon completion to showcase your skills to investors and partners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0F7377] py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Start Your Journey?</h2>
            <p className="mb-8 text-lg text-white/90">
              Join thousands of founders who have already accelerated their startup journey with GrowthLab Startup School.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                <Link href="/resources/startup-school">Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 