"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Rocket, ArrowRight, Users, TrendingUp, Award, Globe, 
  MessageSquare, Calendar, FileText, Zap, Star, CheckCircle,
  Building, DollarSign, Target, Lightbulb, BarChart3,
  GraduationCap, User, Shield, Heart, Plus, ChevronRight,
  MapPin, ThumbsUp, Share2, Clock, Activity, Briefcase,
  Gift, AlertCircle, Play, Pause, Volume2, Video, Phone,
  Monitor, Download, Eye, EyeOff, X
} from "lucide-react"
import Link from "next/link"
import { CommunicationHubButton } from "@/components/communication/communication-hub-button"
// Ensure only the new floating hub is mounted; legacy hubs remain in codebase but are not rendered
import { useState, useEffect } from "react"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("ecosystem")
  const [counts, setCounts] = useState({ members: 0, startups: 0, deals: 0, investments: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    try {
      setIsVisible(true)
      
      // Animate counters
      const animateCounters = () => {
        const targets = { members: 2847, startups: 156, deals: 47.2, investments: 89 }
        const duration = 2000
        const steps = 60
        const stepDuration = duration / steps

        let step = 0
        const timer = setInterval(() => {
          step++
          const progress = step / steps
          
          setCounts({
            members: Math.floor(targets.members * progress),
            startups: Math.floor(targets.startups * progress),
            deals: parseFloat((targets.deals * progress).toFixed(1)),
            investments: Math.floor(targets.investments * progress)
          })

          if (step >= steps) {
            clearInterval(timer)
            setCounts(targets)
          }
        }, stepDuration)

        return () => clearInterval(timer)
      }

      const timer = setTimeout(animateCounters, 500)
      return () => clearTimeout(timer)
    } catch (error) {
      console.error('Error in homepage useEffect:', error)
      setHasError(true)
      return undefined
    }
  }, [])

  // Error boundary
  if (hasError) {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">We're experiencing some issues. Please refresh the page.</p>
          <button type="button" 
            onClick={() => window.location.reload()} 
            className="bg-[#0F7377] text-white px-4 py-2 rounded-lg hover:bg-[#0F7377]/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0F7377] via-[#1E293B] to-[#0F7377] dark:from-[#0F7377] dark:via-[#0C5C5F] dark:to-[#0F7377] py-20 md:py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F7377]/20 to-[#1E293B]/20 dark:from-[#0F7377]/30 dark:to-[#0C5C5F]/30"></div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#F59E0B]/20 dark:bg-[#F59E0B]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#0F7377]/20 dark:bg-[#0F7377]/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 dark:bg-white/20 rounded-full blur-lg animate-bounce"></div>
        
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div className="flex flex-col justify-center">
              <Badge className="mb-6 w-fit bg-white/20 text-white border border-white/20 animate-fade-in">
                <Rocket className="w-3 h-3 mr-2" />
                Applications Open for Cohort 5
              </Badge>
              <h1 className="mb-8 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl leading-tight animate-slide-up">
                Powering Asia's Next{" "}
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 bg-clip-text text-transparent">
                  Unicorns
                </span>
              </h1>
              <p className="mb-10 text-xl text-white/90 md:text-2xl leading-relaxed animate-fade-in-delay">
                Where founders, investors, and mentors connect to build the next generation of unicorns. Join our
                vibrant community and accelerate your startup journey.
              </p>
              
              {/* Enhanced Stats Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
                <div className="text-center p-2 sm:p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-lg sm:text-2xl font-bold text-white">2,847+</div>
                  <div className="text-xs text-white/80">Active Members</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-lg sm:text-2xl font-bold text-white">156+</div>
                  <div className="text-xs text-white/80">Startups</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-lg sm:text-2xl font-bold text-white">$47.2M</div>
                  <div className="text-xs text-white/80">Deals Closed</div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/90 text-white hover:from-[#F59E0B]/90 hover:to-[#F59E0B] shadow-lg transform hover:scale-105 transition-all duration-300" 
                  asChild
                >
                  <Link href="/accelerator/apply" className="flex items-center">
                    Apply to GrowthLab
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-300" 
                  asChild
                >
                  <Link href="/network/find-cofounder" className="flex items-center">
                    Find a Co-Founder
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full max-w-lg overflow-hidden rounded-2xl md:h-[450px] shadow-2xl border border-white/20">
                <img 
                  src="/startup-team-collaboration.png" 
                  alt="Startup team collaboration and innovation" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F7377]/20 to-[#1E293B]/20"></div>
                
                {/* Floating Elements Overlay */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <div className="absolute top-8 right-6 w-6 h-6 bg-[#0F7377] rounded-full flex items-center justify-center animate-bounce delay-500 shadow-lg">
                  <TrendingUp className="h-3 w-3 text-white" />
                </div>
                <div className="absolute bottom-8 left-8 w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center animate-bounce delay-1000 shadow-lg">
                  <Award className="h-2.5 w-2.5 text-white" />
                </div>
                
                {/* Bottom Overlay with Text */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1E293B]/90 to-transparent p-6">
                  <div className="text-center text-white">
                    <p className="text-lg font-bold mb-2">Startup Ecosystem</p>
                    <p className="text-sm text-white/80">Where innovation meets collaboration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Navigation */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-2">Quick Access</h2>
            <p className="text-gray-600 dark:text-gray-300">Navigate to key sections of our platform</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-[#0F7377]/10 hover:border-[#0F7377]" asChild>
              <Link href="/network/find-cofounder">
                <Users className="h-6 w-6" />
                <span className="text-xs">Find Co-Founder</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-[#0F7377]/10 hover:border-[#0F7377]" asChild>
              <Link href="/jobs/find-startup-jobs">
                <Briefcase className="h-6 w-6" />
                <span className="text-xs">Find Jobs</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-[#0F7377]/10 hover:border-[#0F7377]" asChild>
              <Link href="/events">
                <Calendar className="h-6 w-6" />
                <span className="text-xs">Events</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-[#0F7377]/10 hover:border-[#0F7377]" asChild>
              <Link href="/sports-club">
                <Target className="h-6 w-6" />
                <span className="text-xs">Sports Club</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-[#0F7377]/10 hover:border-[#0F7377]" asChild>
              <Link href="/network/investors">
                <DollarSign className="h-6 w-6" />
                <span className="text-xs">Investors</span>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col gap-2 hover:bg-[#0F7377]/10 hover:border-[#0F7377]" asChild>
              <Link href="/accelerator">
                <Rocket className="h-6 w-6" />
                <span className="text-xs">Accelerator</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Live Stats Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Platform Statistics</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">Real-time data from our growing community</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                <Users className="h-8 w-8 text-white" />
                  </div>
              <div className="text-4xl font-bold text-[#0F7377] mb-2 group-hover:scale-110 transition-transform duration-300">
                {counts.members.toLocaleString()}
                  </div>
              <div className="text-sm text-[#64748B] dark:text-gray-300 font-medium">Active Members</div>
              <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% this month
                  </div>
                </div>
            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0F7377] mb-2 group-hover:scale-110 transition-transform duration-300">
                {counts.startups}
              </div>
              <div className="text-sm text-[#64748B] dark:text-gray-300 font-medium">Startups</div>
              <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8 new this week
              </div>
            </div>
            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0F7377] mb-2 group-hover:scale-110 transition-transform duration-300">
                ${counts.deals}M
              </div>
              <div className="text-sm text-[#64748B] dark:text-gray-300 font-medium">Deals Closed</div>
              <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23% this quarter
              </div>
            </div>
            <div className="group text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-[#0F7377] mb-2 group-hover:scale-110 transition-transform duration-300">
                {counts.investments}
              </div>
              <div className="text-sm text-[#64748B] dark:text-gray-300 font-medium">Latest Investments</div>
              <div className="text-xs text-green-600 dark:text-green-400 flex items-center justify-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5 this month
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Latest News & Updates</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-3xl mx-auto">
              Stay updated with the latest happenings in our startup ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/startup-workshop.png" 
                  alt="Cohort 5 Applications Open" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#0F7377] text-white">Featured</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Cohort 5 Applications Now Open</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Join our next accelerator cohort and accelerate your startup journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Dec 15, 2024</span>
                  <span>5 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/startup-team-collaboration.png" 
                  alt="New Sports Club Launch" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#F59E0B] text-white">New</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Sports Club Launched</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Connect with fellow entrepreneurs through sports and networking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Dec 12, 2024</span>
                  <span>3 min read</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/mentorship-session.png" 
                  alt="Investment Round Success" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600 text-white">Success</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">$2M Investment Round Closed</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Three portfolio companies successfully raised their Series A rounds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Dec 10, 2024</span>
                  <span>4 min read</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/news" className="flex items-center">
                View All News
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Featured Programs</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-3xl mx-auto">
              Discover our most popular programs designed to accelerate your startup journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/startup-workshop.png" 
                  alt="Startup workshop and accelerator program" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#F59E0B] text-white">Popular</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Accelerator Program</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">12-week intensive program for early-stage startups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Duration</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">12 weeks</span>
                    </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Cohort Size</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">20 startups</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Success Rate</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">85%</span>
                  </div>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                  <Link href="/accelerator/apply">Apply Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/mentorship-session.png" 
                  alt="Startup school and mentorship program" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#0F7377] text-white">New</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Startup School</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Comprehensive education for entrepreneurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Duration</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">8 weeks</span>
                    </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Format</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Online + Live</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Modules</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">12</span>
                  </div>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button className="w-full bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                  <Link href="/programs">Enroll Now</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/funding-meeting.png" 
                  alt="Funding navigator and investor connections" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#F59E0B] text-white">Limited</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Funding Navigator</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Connect with investors and secure funding</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Investors</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">500+</span>
                    </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Success Rate</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#64748B] dark:text-gray-400">Avg. Funding</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">$2.5M</span>
                  </div>
                </div>
              </CardContent>
              <CardContent className="pt-0">
                <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                  <Link href="/funding">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[#0F7377] to-[#1E293B] dark:from-[#0F7377] dark:to-[#0C5C5F]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Community Says</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Hear from successful entrepreneurs who have grown with GrowthLab
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/testimonial-1.jpg" alt="Sarah Chen" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Sarah Chen</h4>
                    <p className="text-sm text-white/80">Founder, TechFlow</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "GrowthLab connected me with my co-founder and helped us raise our Series A. The community and resources here are invaluable."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/testimonial-2.jpg" alt="Marcus Johnson" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Marcus Johnson</h4>
                    <p className="text-sm text-white/80">CEO, DataVault</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "The accelerator program transformed our business. We went from idea to $10M ARR in just 18 months."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="/testimonial-3.jpg" alt="Priya Sharma" />
                    <AvatarFallback>PS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">Priya Sharma</h4>
                    <p className="text-sm text-white/80">CTO, GreenTech</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "The mentorship program connected me with industry experts who guided our technical strategy. Game changer!"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
              <Link href="/testimonials" className="flex items-center">
                Read More Stories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ecosystem Overview */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Complete Startup Ecosystem</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to build, scale, and succeed in the startup world
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="ecosystem" className="text-sm">Ecosystem</TabsTrigger>
              <TabsTrigger value="programs" className="text-sm">Programs</TabsTrigger>
              <TabsTrigger value="tools" className="text-sm">Tools</TabsTrigger>
              <TabsTrigger value="community" className="text-sm">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ecosystem" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="/professional-connections.png" 
                        alt="Professional networking" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Network & Connect</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Connect with founders, investors, and mentors from across Asia
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Co-founder matching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Investor introductions
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Mentor mentorship
                      </li>
                    </ul>
              </CardContent>
            </Card>

                                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="/startup-team-collaboration.png" 
                        alt="Startup growth and collaboration" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Accelerate Growth</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Access resources and programs to scale your startup
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Funding opportunities
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Business development
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Market expansion
                      </li>
                    </ul>
              </CardContent>
            </Card>

                                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg overflow-hidden mb-4">
                      <img 
                        src="/mentorship-session.png" 
                        alt="Expert mentorship and guidance" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Expert Guidance</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Learn from industry experts and successful entrepreneurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Mentorship programs
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Workshops & training
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Expert consultations
                      </li>
                    </ul>
              </CardContent>
            </Card>
              </div>
            </TabsContent>

            <TabsContent value="programs" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <Rocket className="h-6 w-6 text-white" />
              </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Accelerator Program</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      12-week intensive program for early-stage startups
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Mentorship & coaching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Funding opportunities
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Demo day showcase
                      </li>
                    </ul>
              </CardContent>
            </Card>

                                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-lg flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-white" />
          </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Startup School</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Comprehensive education for entrepreneurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Business fundamentals
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Technical skills
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Industry insights
                      </li>
                    </ul>
              </CardContent>
            </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-white" />
                  </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Funding Navigator</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Connect with investors and secure funding
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Investor matching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Pitch deck builder
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Valuation tools
                      </li>
                    </ul>
                </CardContent>
              </Card>
          </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <BarChart3 className="h-6 w-6 text-white" />
        </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Analytics Dashboard</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Track your startup's performance and growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Real-time metrics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Performance insights
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Growth tracking
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-lg flex items-center justify-center mb-4">
                      <MessageSquare className="h-6 w-6 text-white" />
          </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Communication Hub</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Integrated messaging and collaboration tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Real-time messaging
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Video conferencing
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        File sharing
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-white" />
            </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">AI Tools</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      AI-powered insights and automation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Market analysis
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Content generation
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Predictive insights
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-white" />
                  </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Founder Network</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Connect with fellow entrepreneurs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Peer support groups
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Experience sharing
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Collaboration opportunities
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-lg flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-white" />
                  </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Events & Meetups</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Regular networking and learning events
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Industry meetups
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Workshops & seminars
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Demo days
                      </li>
                    </ul>
                </CardContent>
              </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg flex items-center justify-center mb-4">
                      <Globe className="h-6 w-6 text-white" />
            </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">Global Network</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Connect across Asia and beyond
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        International markets
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Cross-border partnerships
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        Global investors
                      </li>
                    </ul>
                  </CardContent>
                </Card>
          </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Experience GrowthLab</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300">See our platform in action</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-6">Communication Hub Demo</h3>
              <p className="text-lg text-[#64748B] dark:text-gray-300 mb-8">
                Experience our integrated communication platform that combines messaging, video calls, 
                file sharing, and team collaboration in one seamless interface.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#0F7377] rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#1E293B] font-medium">Real-time messaging with status indicators</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                    <Video className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#1E293B] font-medium">HD video conferencing with screen sharing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#0F7377] rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#1E293B] font-medium">Secure file sharing and collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-[#1E293B] font-medium">Multi-language translation support</span>
                </div>
          </div>

              <Button className="mt-8 bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                <Link href="/communication" className="flex items-center">
                  Try Communication Hub
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#0F7377] rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
            <div>
                      <h4 className="font-semibold text-[#1E293B] dark:text-white">GrowthLab Chat</h4>
                      <p className="text-sm text-[#64748B] dark:text-gray-400">Online • 2,847 members</p>
                    </div>
                  </div>
                                    <div className="flex space-x-2">
                    <Button size="sm" className="h-8 w-8 p-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
                      <Phone className="h-4 w-4" />
                      </Button>
                    <Button size="sm" className="h-8 w-8 p-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
                      <Video className="h-4 w-4" />
                      </Button>
                    <Button size="sm" className="h-8 w-8 p-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
                      <Monitor className="h-4 w-4" />
                      </Button>
                  </div>
            </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#0F7377] text-white text-xs">SC</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-[#1E293B] dark:text-white">Hi team! How's the project going?</p>
                      <p className="text-xs text-[#64748B] dark:text-gray-400 mt-1">2:34 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 justify-end">
                    <div className="bg-[#0F7377] rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-white">Great progress! We're on track for the deadline 🚀</p>
                      <p className="text-xs text-white/70 mt-1">2:35 PM</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#F59E0B] text-white text-xs">AW</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[#0F7377] text-white text-xs">MJ</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                      <p className="text-sm text-[#1E293B] dark:text-white">Perfect! Let's schedule a call to discuss the next steps</p>
                      <p className="text-xs text-[#64748B] dark:text-gray-400 mt-1">2:36 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="h-8 w-8 p-0 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="bg-transparent outline-none text-sm w-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                  <Button size="sm" className="h-8 w-8 p-0 bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Live Community Activity</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">See what's happening in real-time across our platform</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-6">Recent Activities</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/sarah-chen.png" 
                      alt="Sarah Chen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1E293B] dark:text-white font-medium">Sarah Chen joined GrowthLab</p>
                    <p className="text-xs text-[#64748B] dark:text-gray-400">2 minutes ago</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="/startup-team-collaboration.png" 
                      alt="TechFlow funding" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1E293B] dark:text-white font-medium">TechFlow secured $2.5M funding</p>
                    <p className="text-xs text-[#64748B] dark:text-gray-400">15 minutes ago</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="w-8 h-8 bg-[#0F7377] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1E293B] dark:text-white font-medium">New message in #startup-community</p>
                    <p className="text-xs text-[#64748B] dark:text-gray-400">32 minutes ago</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="w-8 h-8 bg-[#F59E0B] rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1E293B] dark:text-white font-medium">InnovateLab won Pitch Competition</p>
                    <p className="text-xs text-[#64748B] dark:text-gray-400">1 hour ago</p>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1E293B] dark:text-white mb-6">Trending Topics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#0F7377]/10 to-[#1E293B]/10 dark:from-[#0F7377]/20 dark:to-[#1E293B]/20 rounded-lg">
                  <span className="text-sm font-medium text-[#1E293B] dark:text-white">#AI-Startups</span>
                  <Badge className="bg-[#0F7377] text-white">Trending</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 dark:from-[#F59E0B]/20 dark:to-[#F59E0B]/10 rounded-lg">
                  <span className="text-sm font-medium text-[#1E293B] dark:text-white">#Funding-Round</span>
                  <Badge className="bg-[#F59E0B] text-white">Hot</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#0F7377]/10 to-[#1E293B]/10 dark:from-[#0F7377]/20 dark:to-[#1E293B]/20 rounded-lg">
                  <span className="text-sm font-medium text-[#1E293B] dark:text-white">#Mentorship</span>
                  <Badge className="bg-green-500 text-white">New</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 dark:from-[#F59E0B]/20 dark:to-[#F59E0B]/10 rounded-lg">
                  <span className="text-sm font-medium text-[#1E293B] dark:text-white">#Co-Founder-Matching</span>
                  <Badge className="bg-purple-500 text-white">Popular</Badge>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-lg text-white">
                <h4 className="font-semibold mb-2">Join the Conversation</h4>
                <p className="text-sm text-white/80 mb-3">Connect with 2,847+ members and share your insights</p>
                <Button size="sm" className="bg-white text-[#0F7377] hover:bg-gray-100" asChild>
                  <Link href="/community">Join Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Success Stories</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">Hear from our community members who have achieved remarkable success</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="h-32 bg-gradient-to-br from-[#0F7377] to-[#1E293B]"></div>
                <div className="absolute -bottom-6 left-6">
                  <Avatar className="h-12 w-12 border-4 border-white">
                    <AvatarImage src="/sarah-chen.png" alt="Sarah Chen" />
                    <AvatarFallback className="bg-[#0F7377] text-white">SC</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="p-6 pt-8">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Sarah Chen</h4>
                  <p className="text-sm text-[#64748B] dark:text-gray-400">Founder, TechFlow</p>
                </div>
                <p className="text-[#64748B] dark:text-gray-300 mb-4 italic">
                  "GrowthLab connected me with the perfect co-founder and helped us secure our first round of funding. The community is incredible!"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 font-medium">$2.5M Raised</Badge>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B] dark:text-gray-400">Joined</span>
                    <span className="font-medium text-gray-900 dark:text-white">2023</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B] dark:text-gray-400">Team Size</span>
                    <span className="font-medium text-gray-900 dark:text-white">15 employees</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="h-32 bg-gradient-to-br from-[#F59E0B] to-[#F59E0B]/80"></div>
                <div className="absolute -bottom-6 left-6">
                  <Avatar className="h-12 w-12 border-4 border-white">
                    <AvatarImage src="/alex-wong.png" alt="Alex Wong" />
                    <AvatarFallback className="bg-[#F59E0B] text-white">AW</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="p-6 pt-8">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Alex Wong</h4>
                  <p className="text-sm text-[#64748B] dark:text-gray-400">Investor, Venture Capital</p>
                </div>
                <p className="text-[#64748B] dark:text-gray-300 mb-4 italic">
                  "I've found some of my best investments through GrowthLab. The quality of startups here is exceptional."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 font-medium">15 Investments</Badge>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B] dark:text-gray-400">Portfolio</span>
                    <span className="font-medium text-gray-900 dark:text-white">$50M+ AUM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B] dark:text-gray-400">Success Rate</span>
                    <span className="font-medium text-green-600 dark:text-green-400">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
              <div className="relative">
                <div className="h-32 bg-gradient-to-br from-[#0F7377] to-[#1E293B]"></div>
                <div className="absolute -bottom-6 left-6">
                  <Avatar className="h-12 w-12 border-4 border-white">
                    <AvatarImage src="/maria-garcia.png" alt="Maria Johnson" />
                    <AvatarFallback className="bg-[#0F7377] text-white">MJ</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <CardContent className="p-6 pt-8">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg text-gray-900 dark:text-white">Maria Johnson</h4>
                  <p className="text-sm text-[#64748B] dark:text-gray-400">Mentor, Startup Advisor</p>
                </div>
                <p className="text-[#64748B] dark:text-gray-300 mb-4 italic">
                  "Being a mentor on GrowthLab has been incredibly rewarding. The platform makes it easy to connect and share knowledge."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 font-medium">50+ Mentees</Badge>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B] dark:text-gray-400">Experience</span>
                    <span className="font-medium text-gray-900 dark:text-white">15+ years</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B] dark:text-gray-400">Success Rate</span>
                    <span className="font-medium text-green-600 dark:text-green-400">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Features Showcase */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Platform Features</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">Experience the tools that power successful startups</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
                        <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/network-event.png" 
                  alt="Communication hub and networking" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F7377]/20 to-[#1E293B]/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold">Communication Hub</h3>
                    <p className="text-sm text-white/80">WhatsApp-style messaging</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#F59E0B] text-white">Live</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time messaging
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Video conferencing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    File sharing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Translation support
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                  <Link href="/communication">Try Now</Link>
                </Button>
              </CardContent>
            </Card>

                        <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/fintech-flow.png" 
                  alt="Analytics dashboard and insights" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                    <p className="text-sm text-white/80">Real-time insights</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#0F7377] text-white">Pro</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Performance metrics
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Growth tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Custom reports
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI insights
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                  <Link href="/dashboard">Explore</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/machine-learning-concept.png" 
                  alt="AI tools and machine learning" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F7377]/20 to-[#1E293B]/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold">AI Tools</h3>
                    <p className="text-sm text-white/80">Smart automation</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-[#F59E0B] text-white">AI</Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-[#64748B] dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Content generation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Market analysis
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Predictive insights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Smart recommendations
                  </li>
                </ul>
                <Button className="w-full mt-4 bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                  <Link href="/dashboard">Discover</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest News & Events */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E293B] dark:text-white mb-4">Latest News & Events</h2>
            <p className="text-xl text-[#64748B] dark:text-gray-300 max-w-2xl mx-auto">Stay updated with the latest happenings in our community</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/startup-workshop.png" 
                  alt="Demo Day 2024 event" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#F59E0B] text-white">Event</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Demo Day 2024</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Watch our latest cohort present their innovations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-[#64748B] dark:text-gray-400">
                  <span>March 15, 2024</span>
                  <span>Virtual Event</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/network-event.png" 
                  alt="Founder meetup networking event" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#0F7377] text-white">Networking</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Founder Meetup</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Connect with fellow entrepreneurs in Singapore</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-[#64748B] dark:text-gray-400">
                  <span>March 22, 2024</span>
                  <span>Singapore</span>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <div className="relative">
                <img 
                  src="/mentorship-session.png" 
                  alt="Pitch Perfect workshop" 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#F59E0B] text-white">Workshop</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">Pitch Perfect</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">Master the art of pitching to investors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-[#64748B] dark:text-gray-400">
                  <span>March 29, 2024</span>
                  <span>Online</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
              <Link href="/events" className="flex items-center mx-auto">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Call-to-Action */}
      <section className="py-20 bg-gradient-to-r from-[#0F7377] to-[#1E293B] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#F59E0B]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container relative mx-auto max-w-7xl px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border border-white/20">
              <Rocket className="w-3 h-3 mr-2 animate-spin-slow" />
              Join 2,847+ Members
            </Badge>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Build the Next{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 bg-clip-text text-transparent">
                Unicorn?
              </span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Start your journey today and connect with Asia's most innovative entrepreneurs, investors, and mentors. 
              Join our community and accelerate your startup's growth.
            </p>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">85%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$47.2M</div>
                <div className="text-sm text-white/80">Total Funding</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">156+</div>
                <div className="text-sm text-white/80">Startups</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/90 hover:from-[#F59E0B]/90 hover:to-[#F59E0B] text-white shadow-lg transform hover:scale-105 transition-all duration-300" 
                asChild
              >
                <Link href="/signup" className="flex items-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm transform hover:scale-105 transition-all duration-300" 
                asChild
              >
                <Link href="/about" className="flex items-center">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-white/70 mt-6">
              No credit card required • Free forever • Join instantly
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-[#1E293B] text-white py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">GrowthLab</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Powering Asia's next unicorns through community, connection, and innovation. Join 2,847+ entrepreneurs building the future.
              </p>
              <div className="flex space-x-4 mb-6">
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-[#0F7377] hover:border-[#0F7377]">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discord
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-[#0F7377] hover:border-[#0F7377]">
                  <Globe className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-[#0F7377] hover:border-[#0F7377]">
                  <Users className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
              <div className="text-sm text-gray-400">
                <p>📧 hello@growthlab.asia</p>
                <p>📞 +65 1234 5678</p>
                <p>📍 Singapore, Hong Kong, Tokyo</p>
              </div>
            </div>
            
            {/* Platform */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Platform</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link href="/accelerator" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Accelerator</Link></li>
                <li><Link href="/network/find-cofounder" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Find Co-founder</Link></li>
                <li><Link href="/jobs/find-startup-jobs" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Find Jobs</Link></li>
                <li><Link href="/network/investors" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Investors</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Events</Link></li>
                <li><Link href="/sports-club" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Sports Club</Link></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link href="/startup-school" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Startup School</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Resources</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Blog</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />News</Link></li>
                <li><Link href="/testimonials" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Testimonials</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />FAQ</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link href="/about" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />About</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Team</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2" />Terms</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="max-w-2xl mx-auto text-center">
              <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-300 mb-6">Get the latest startup news, events, and opportunities delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                />
                <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300">
            <p>&copy; 2024 GrowthLab. All rights reserved. | Made with ❤️ in Asia</p>
          </div>
        </div>
      </footer>



      {/* Communication Hub */}
      {isVisible && <CommunicationHubButton />}
    </div>
  )
}