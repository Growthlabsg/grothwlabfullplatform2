"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Rocket, 
  Users, 
  Target, 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Lightbulb, 
  Globe, 
  Building2, 
  Zap, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  BookOpen, 
  Handshake, 
  DollarSign, 
  BarChart3, 
  MessageCircle,
  MapPin,
  Clock3,
  Users2,
  Trophy,
  Shield,
  Network,
  GraduationCap,
  Briefcase,
  Heart,
  Eye,
  Share2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Video,
  FileText,
  Download,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Timer,
  Brain,
  Code,
  Megaphone,
  Building,
  Compass,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Search
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function WhatHappensPage() {
  const [activePhase, setActivePhase] = useState(1)
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const phases = [
    {
      id: 1,
      title: "Application & Selection",
      duration: "2-4 weeks",
      icon: <Target className="w-8 h-8" />,
      description: "Rigorous selection process to identify high-potential startups with strong market potential and dedicated founding teams",
      activities: [
        "Submit comprehensive application with business plan",
        "Initial screening and video interviews",
        "Due diligence and market validation",
        "Final selection panel and onboarding",
        "Legal documentation and program agreement"
      ],
      detailedActivities: [
        {
          title: "Application Review",
          description: "Our team reviews your application for market potential, team strength, and innovation",
          duration: "3-5 days",
          requirements: ["Business plan", "Financial projections", "Team bios", "Market analysis"]
        },
        {
          title: "Initial Interview",
          description: "15-minute video call to discuss your startup and answer key questions",
          duration: "15 minutes",
          requirements: ["Pitch deck", "Demo video", "Team availability"]
        },
        {
          title: "Due Diligence",
          description: "Deep dive into your business model, market opportunity, and competitive landscape",
          duration: "1-2 weeks",
          requirements: ["Financial statements", "Customer testimonials", "Technical documentation"]
        },
        {
          title: "Final Selection",
          description: "Panel interview with our selection committee and successful alumni",
          duration: "30 minutes",
          requirements: ["Live pitch", "Q&A session", "Reference checks"]
        }
      ],
      stats: { applications: "500+", selected: "15-20", acceptance: "3-4%", avgFunding: "$2.5M" },
      timeline: [
        { week: 1, activity: "Application submission deadline" },
        { week: 2, activity: "Initial screening and interviews" },
        { week: 3, activity: "Due diligence and market research" },
        { week: 4, activity: "Final selection and onboarding" }
      ]
    },
    {
      id: 2,
      title: "Pre-Accelerator Preparation",
      duration: "2 weeks",
      icon: <Rocket className="w-8 h-8" />,
      description: "Comprehensive preparation phase to maximize your accelerator experience and set clear growth objectives",
      activities: [
        "Goal setting and milestone planning",
        "Team preparation and role clarification",
        "Initial mentor matching and introductions",
        "Workspace and resource setup",
        "Baseline metrics establishment"
      ],
      detailedActivities: [
        {
          title: "Strategic Planning Session",
          description: "Work with our team to set 12-week goals and key performance indicators",
          duration: "4 hours",
          requirements: ["Current metrics", "Growth targets", "Resource needs"]
        },
        {
          title: "Mentor Matching",
          description: "Connect with 3-5 industry experts who will guide your journey",
          duration: "2 hours",
          requirements: ["Team preferences", "Industry focus", "Communication style"]
        },
        {
          title: "Workspace Setup",
          description: "Get access to our premium co-working space and all necessary resources",
          duration: "1 day",
          requirements: ["Team member access", "Equipment needs", "Schedule preferences"]
        },
        {
          title: "Baseline Assessment",
          description: "Establish current metrics and performance benchmarks",
          duration: "2 hours",
          requirements: ["Financial data", "User metrics", "Product metrics"]
        }
      ],
      stats: { mentors: "5+", resources: "Unlimited", preparation: "100%", workshops: "8+" },
      timeline: [
        { week: 1, activity: "Goal setting and strategic planning" },
        { week: 2, activity: "Mentor matching and workspace setup" }
      ]
    },
    {
      id: 3,
      title: "12-Week Intensive Program",
      duration: "12 weeks",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "The core accelerator experience with intensive support, expert guidance, and comprehensive resources to scale your startup",
      activities: [
        "Weekly expert workshops and masterclasses",
        "One-on-one mentoring sessions with industry leaders",
        "Investor networking events and pitch practice",
        "Progress tracking, pivots, and strategic adjustments",
        "Peer learning and cohort collaboration"
      ],
      detailedActivities: [
        {
          title: "Weekly Workshops",
          description: "Expert-led sessions on fundraising, product development, marketing, and scaling",
          duration: "3 hours/week",
          requirements: ["Active participation", "Pre-workshop preparation", "Post-workshop action items"]
        },
        {
          title: "Mentor Sessions",
          description: "Regular one-on-one meetings with your assigned mentors",
          duration: "2 hours/week",
          requirements: ["Progress updates", "Specific challenges", "Action plans"]
        },
        {
          title: "Investor Events",
          description: "Monthly networking events with VCs, angels, and strategic investors",
          duration: "4 hours/month",
          requirements: ["Elevator pitch", "Business cards", "Follow-up strategy"]
        },
        {
          title: "Progress Reviews",
          description: "Bi-weekly check-ins to track progress and adjust strategies",
          duration: "1 hour/bi-weekly",
          requirements: ["Metrics dashboard", "Achievement reports", "Challenge identification"]
        }
      ],
      stats: { workshops: "48+", mentoring: "20+ hours", events: "15+", pivots: "2-3 avg" },
      timeline: [
        { week: 1, activity: "Program kickoff and team building" },
        { week: 2-4, activity: "Foundation building and market validation" },
        { week: 5-8, activity: "Product development and customer acquisition" },
        { week: 9-11, activity: "Scaling and fundraising preparation" },
        { week: 12, activity: "Demo Day preparation and final presentations" }
      ]
    },
    {
      id: 4,
      title: "Demo Day & Showcase",
      duration: "1 week",
      icon: <Award className="w-8 h-8" />,
      description: "The culminating event where you present your startup to 200+ investors, partners, and industry leaders",
      activities: [
        "Final pitch preparation and rehearsal",
        "Demo Day presentation to investor audience",
        "One-on-one investor meetings and Q&A",
        "Partnership discussions and deal negotiations",
        "Media interviews and press coverage"
      ],
      detailedActivities: [
        {
          title: "Pitch Preparation",
          description: "Intensive coaching to perfect your 5-minute investor pitch",
          duration: "8 hours",
          requirements: ["Pitch deck", "Demo video", "Financial projections"]
        },
        {
          title: "Demo Day Presentation",
          description: "Present to 200+ investors, VCs, and industry leaders",
          duration: "5 minutes",
          requirements: ["Live demo", "Q&A preparation", "Follow-up materials"]
        },
        {
          title: "Investor Meetings",
          description: "Scheduled meetings with interested investors and partners",
          duration: "2-3 days",
          requirements: ["Meeting requests", "Due diligence materials", "Term sheets"]
        },
        {
          title: "Media Coverage",
          description: "Press interviews and media coverage of your startup",
          duration: "1 day",
          requirements: ["Press kit", "Media training", "Key messages"]
        }
      ],
      stats: { investors: "200+", media: "20+", partnerships: "Unlimited", deals: "15+ avg" },
      timeline: [
        { week: 1, activity: "Pitch preparation and rehearsal" },
        { week: 2, activity: "Demo Day presentation and investor meetings" },
        { week: 3, activity: "Follow-up meetings and deal negotiations" }
      ]
    },
    {
      id: 5,
      title: "Post-Program Support",
      duration: "Ongoing",
      icon: <Users className="w-8 h-8" />,
      description: "Lifetime access to our alumni network, continued mentorship, and exclusive opportunities for growth",
      activities: [
        "Follow-on funding support and investor introductions",
        "Alumni network access and peer collaboration",
        "Ongoing mentorship and advisory support",
        "Exclusive events, workshops, and opportunities",
        "Strategic partnerships and business development"
      ],
      detailedActivities: [
        {
          title: "Funding Support",
          description: "Continued support for Series A and beyond fundraising",
          duration: "Ongoing",
          requirements: ["Updated pitch deck", "Financial statements", "Growth metrics"]
        },
        {
          title: "Alumni Network",
          description: "Access to 200+ successful alumni for collaboration and support",
          duration: "Lifetime",
          requirements: ["Active participation", "Knowledge sharing", "Mentoring others"]
        },
        {
          title: "Exclusive Events",
          description: "Monthly alumni events, workshops, and networking opportunities",
          duration: "Monthly",
          requirements: ["Event registration", "Active participation", "Follow-up networking"]
        },
        {
          title: "Strategic Partnerships",
          description: "Introduction to potential partners, customers, and strategic investors",
          duration: "Ongoing",
          requirements: ["Partnership proposals", "Business development", "Relationship building"]
        }
      ],
      stats: { alumni: "200+", funding: "$50M+", events: "Monthly", partnerships: "50+ active" },
      timeline: [
        { month: "1", activity: "Alumni onboarding and network introduction" },
        { month: "2-6", activity: "Ongoing mentorship and funding support" },
        { month: "6+", activity: "Long-term strategic partnerships and growth" }
      ]
    }
  ]

  const keyFeatures = [
    {
      icon: <Users2 className="w-6 h-6" />,
      title: "Expert Mentorship",
      description: "Access to 100+ successful entrepreneurs, investors, and industry experts who have built and scaled companies",
      stats: "20+ hours per startup",
      details: [
        "One-on-one mentoring sessions",
        "Industry-specific expertise",
        "Network introductions",
        "Strategic guidance"
      ]
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Premium Workspace",
      description: "Modern co-working space in the heart of Singapore's business district with all amenities",
      stats: "24/7 access",
      details: [
        "Private meeting rooms",
        "High-speed internet",
        "Coffee and refreshments",
        "Event spaces"
      ]
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Funding Support",
      description: "Direct access to our network of 200+ investors and VCs across Asia-Pacific and Silicon Valley",
      stats: "$50M+ raised by alumni",
      details: [
        "Investor introductions",
        "Pitch deck reviews",
        "Term sheet negotiations",
        "Due diligence support"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Network",
      description: "Connect with startups and partners across Asia-Pacific and beyond through our international network",
      stats: "15+ countries",
      details: [
        "International partnerships",
        "Market expansion support",
        "Cross-border opportunities",
        "Cultural exchange programs"
      ]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Resources",
      description: "Comprehensive library of startup guides, templates, and tools curated by industry experts",
      stats: "500+ resources",
      details: [
        "Business plan templates",
        "Financial models",
        "Legal document templates",
        "Marketing playbooks"
      ]
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Community Events",
      description: "Regular networking events, workshops, and industry meetups to build lasting relationships",
      stats: "50+ events annually",
      details: [
        "Monthly networking events",
        "Industry workshops",
        "Alumni reunions",
        "Investor meetups"
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Technical Support",
      description: "Access to technical mentors, development resources, and technology partnerships",
      stats: "Unlimited support",
      details: [
        "Technical architecture review",
        "Code quality assessment",
        "Technology stack guidance",
        "Development team referrals"
      ]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Marketing & Sales",
      description: "Expert guidance on go-to-market strategy, customer acquisition, and sales optimization",
      stats: "10+ experts",
      details: [
        "Marketing strategy development",
        "Sales process optimization",
        "Customer acquisition tactics",
        "Brand positioning"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Legal & Compliance",
      description: "Access to legal experts for IP protection, contracts, and regulatory compliance",
      stats: "5+ legal partners",
      details: [
        "IP protection strategy",
        "Contract reviews",
        "Regulatory compliance",
        "Legal document templates"
      ]
    }
  ]

  const successMetrics = [
    { metric: "Startups Accelerated", value: "200+", icon: <Rocket className="w-5 h-5" /> },
    { metric: "Total Funding Raised", value: "$50M+", icon: <DollarSign className="w-5 h-5" /> },
    { metric: "Jobs Created", value: "1,500+", icon: <Users className="w-5 h-5" /> },
    { metric: "Investor Network", value: "200+", icon: <Building2 className="w-5 h-5" /> },
    { metric: "Success Rate", value: "85%", icon: <Trophy className="w-5 h-5" /> },
    { metric: "Alumni Companies", value: "180+", icon: <Star className="w-5 h-5" /> }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      company: "EcoTech Solutions",
      role: "Founder & CEO",
      content: "GrowthLab transformed our startup completely. The mentorship and network access helped us secure $2M in funding within 6 months of graduating. The program structure and expert guidance were exactly what we needed to scale.",
      image: "👩‍💼",
      funding: "$2M raised",
      status: "Series A",
      year: "2023",
      industry: "CleanTech",
      metrics: "300% growth in 6 months"
    },
    {
      name: "David Kumar",
      company: "FinFlow",
      role: "Co-Founder",
      content: "The 12-week program was intense but incredibly valuable. We learned more in those weeks than in our first year of business. The investor connections and mentorship were game-changing for our fintech startup.",
      image: "👨‍💼",
      funding: "$1.5M raised",
      status: "Seed Round",
      year: "2023",
      industry: "FinTech",
      metrics: "500% user growth"
    },
    {
      name: "Mei Lin",
      company: "HealthTech Pro",
      role: "Founder",
      content: "GrowthLab's investor network is unmatched. We connected with the right partners who understood our vision and market. The technical mentorship and go-to-market guidance were invaluable.",
      image: "👩‍🔬",
      funding: "$3M raised",
      status: "Series A",
      year: "2022",
      industry: "HealthTech",
      metrics: "10x revenue growth"
    },
    {
      name: "Alex Rodriguez",
      company: "DataFlow AI",
      role: "Founder & CTO",
      content: "The technical mentorship and product development guidance at GrowthLab were exceptional. We went from MVP to enterprise-ready product in just 12 weeks with their support.",
      image: "👨‍💻",
      funding: "$4.2M raised",
      status: "Series A",
      year: "2023",
      industry: "AI/ML",
      metrics: "50+ enterprise customers"
    },
    {
      name: "Priya Sharma",
      company: "EduTech Innovations",
      role: "Co-Founder",
      content: "GrowthLab helped us navigate the complex education market and connect with the right investors. The alumni network continues to provide value even after graduation.",
      image: "👩‍🏫",
      funding: "$2.8M raised",
      status: "Series A",
      year: "2022",
      industry: "EdTech",
      metrics: "100K+ students reached"
    },
    {
      name: "James Wilson",
      company: "LogiTech Solutions",
      role: "Founder & CEO",
      content: "The program's focus on operational excellence and scaling strategies was exactly what we needed. We've grown from 5 to 50 employees since graduating.",
      image: "👨‍💼",
      funding: "$5M raised",
      status: "Series B",
      year: "2021",
      industry: "Logistics",
      metrics: "10x team growth"
    }
  ]

  const programHighlights = [
    {
      title: "Weekly Masterclasses",
      description: "Expert-led sessions on fundraising, product development, marketing, and scaling",
      icon: <GraduationCap className="w-6 h-6" />,
      frequency: "Every Tuesday",
      duration: "3 hours",
      topics: ["Fundraising", "Product Strategy", "Marketing", "Operations", "Legal", "Technology"]
    },
    {
      title: "Investor Networking",
      description: "Monthly events connecting startups with VCs, angels, and strategic investors",
      icon: <Handshake className="w-6 h-6" />,
      frequency: "Monthly",
      duration: "4 hours",
      topics: ["Pitch Practice", "Investor Meetings", "Deal Negotiations", "Due Diligence"]
    },
    {
      title: "Peer Learning",
      description: "Collaborative sessions with other cohort members for knowledge sharing and support",
      icon: <Users className="w-6 h-6" />,
      frequency: "Weekly",
      duration: "2 hours",
      topics: ["Problem Solving", "Best Practices", "Resource Sharing", "Collaboration"]
    },
    {
      title: "Demo Day Prep",
      description: "Intensive preparation for the culminating Demo Day presentation",
      icon: <Award className="w-6 h-6" />,
      frequency: "Final 2 weeks",
      duration: "20+ hours",
      topics: ["Pitch Deck", "Live Demo", "Q&A Practice", "Media Training"]
    }
  ]

  const applicationProcess = [
    {
      step: 1,
      title: "Submit Application",
      description: "Complete our comprehensive application form with your business plan and team information",
      duration: "30-45 minutes",
      requirements: ["Business plan", "Team bios", "Financial projections", "Market analysis"],
      icon: <FileText className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Initial Screening",
      description: "Our team reviews your application and conducts initial screening calls",
      duration: "1-2 weeks",
      requirements: ["Video interview", "Pitch deck", "Demo video"],
      icon: <Phone className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Due Diligence",
      description: "Deep dive into your business model, market opportunity, and competitive landscape",
      duration: "1-2 weeks",
      requirements: ["Financial statements", "Customer testimonials", "Technical documentation"],
      icon: <Search className="w-6 h-6" />
    },
    {
      step: 4,
      title: "Final Selection",
      description: "Panel interview with our selection committee and successful alumni",
      duration: "30 minutes",
      requirements: ["Live pitch", "Q&A session", "Reference checks"],
      icon: <Award className="w-6 h-6" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F7377] to-[#0F7377]/90 py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-lg leading-tight">
              What Happens at GrowthLab
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 drop-shadow-md leading-relaxed px-2">
              Discover the transformative journey that turns promising startups into successful, scalable companies
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
              <Button 
                size="lg" 
                className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto" 
                onClick={() => document.getElementById('phases')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                Explore Our Program
              </Button>
              <Link href="/about/apply" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F7377] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full" 
                >
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-4 md:py-8 bg-white border-b">
        <div className="container mx-auto max-w-7xl px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm py-2 px-2">Overview</TabsTrigger>
              <TabsTrigger value="phases" className="text-xs sm:text-sm py-2 px-2">Phases</TabsTrigger>
              <TabsTrigger value="features" className="text-xs sm:text-sm py-2 px-2">Features</TabsTrigger>
              <TabsTrigger value="stories" className="text-xs sm:text-sm py-2 px-2">Stories</TabsTrigger>
              <TabsTrigger value="process" className="text-xs sm:text-sm py-2 px-2">Apply</TabsTrigger>
              <TabsTrigger value="highlights" className="text-xs sm:text-sm py-2 px-2">Highlights</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Tab Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-12">
            {/* Success Metrics */}
            <section>
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-3 md:mb-4">
              Our Impact in Numbers
            </h2>
                <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              GrowthLab has been transforming startups across Asia-Pacific with proven results and measurable success
            </p>
          </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
            {successMetrics.map((item, index) => (
              <div key={index} className="text-center group">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg md:rounded-xl p-3 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100">
                      <div className="text-[#0F7377] mb-2 md:mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-5 h-5 md:w-6 md:h-6">
                    {item.icon}
                        </div>
                      </div>
                      <div className="text-lg md:text-2xl font-bold text-[#0F7377] mb-1 md:mb-2">{item.value}</div>
                      <div className="text-xs md:text-sm text-gray-600 font-medium leading-tight">{item.metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Program Overview */}
            <section className="bg-gradient-to-r from-[#0F7377]/5 to-[#0F7377]/10 rounded-xl md:rounded-2xl p-4 md:p-8">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-[#0F7377] mb-3 md:mb-4">Program Overview</h3>
                <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto px-2">
                  Our comprehensive 12-week accelerator program is designed to transform promising startups into successful, scalable companies through intensive mentorship, expert guidance, and access to our extensive network.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center">
                  <div className="bg-[#0F7377] text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Calendar className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h4 className="font-semibold text-base md:text-lg mb-2">12-Week Program</h4>
                  <p className="text-sm md:text-base text-gray-600">Intensive accelerator experience with structured curriculum and milestones</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#0F7377] text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Users className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h4 className="font-semibold text-base md:text-lg mb-2">15-20 Startups</h4>
                  <p className="text-sm md:text-base text-gray-600">Carefully selected cohort of high-potential startups per batch</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#0F7377] text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Award className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <h4 className="font-semibold text-base md:text-lg mb-2">85% Success Rate</h4>
                  <p className="text-sm md:text-base text-gray-600">Proven track record of helping startups achieve their goals</p>
          </div>
        </div>
      </section>
          </TabsContent>

          {/* Program Phases Tab */}
          <TabsContent value="phases" className="space-y-6 md:space-y-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-3 md:mb-4">
              Your GrowthLab Journey
            </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              From application to alumni success, follow the structured path that has helped hundreds of startups scale
            </p>
          </div>
          
            <div className="space-y-4 md:space-y-8">
            {phases.map((phase, index) => (
                <Card key={phase.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] md:hover:scale-[1.02]">
                  <CardHeader className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80 text-white p-4 md:p-6">
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                        <div className="bg-white/20 p-2 md:p-3 rounded-full flex-shrink-0">
                          <div className="w-6 h-6 md:w-8 md:h-8">
                        {phase.icon}
                      </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg md:text-2xl leading-tight">{phase.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1 md:mt-2">
                            <Clock3 className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            <span className="text-white/90 text-sm md:text-base">{phase.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className="bg-white text-[#0F7377] text-xs md:text-lg px-2 md:px-4 py-1 md:py-2">
                          Phase {phase.id}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                          className="text-white hover:bg-white/20 p-1 md:p-2"
                        >
                          {expandedPhase === phase.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      </div>
                  </div>
                </CardHeader>
                  <CardContent className="p-4 md:p-6">
                    <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">{phase.description}</p>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                        <h4 className="font-semibold text-[#0F7377] mb-2 md:mb-3 text-base md:text-lg">Key Activities</h4>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                              <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-semibold text-[#0F7377] mb-2 md:mb-3 text-base md:text-lg">Program Stats</h4>
                        <div className="space-y-2 md:space-y-3">
                        {Object.entries(phase.stats).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center p-2 md:p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-600 capitalize text-xs md:text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="font-semibold text-[#0F7377] text-sm md:text-base">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                    {expandedPhase === phase.id && (
                      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div>
                            <h4 className="font-semibold text-[#0F7377] mb-2 md:mb-3 text-base md:text-lg">Detailed Activities</h4>
                            <div className="space-y-3 md:space-y-4">
                              {phase.detailedActivities.map((activity, idx) => (
                                <div key={idx} className="border rounded-lg p-3 md:p-4">
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-sm md:text-base">{activity.title}</h5>
                                    <Badge variant="outline" className="text-xs">{activity.duration}</Badge>
                                  </div>
                                  <p className="text-xs md:text-sm text-gray-600 mb-2 leading-relaxed">{activity.description}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {activity.requirements.map((req, reqIdx) => (
                                      <Badge key={reqIdx} variant="secondary" className="text-xs">{req}</Badge>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-[#0F7377] mb-2 md:mb-3 text-base md:text-lg">Timeline</h4>
                            <div className="space-y-2 md:space-y-3">
                              {phase.timeline.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg">
                                  <div className="bg-[#0F7377] text-white rounded-full w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold flex-shrink-0">
                                    {idx + 1}
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-medium text-xs md:text-sm text-gray-900 leading-tight">{item.activity}</div>
                                    <div className="text-xs text-gray-500">{item.week || item.month}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            ))}
          </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6 md:space-y-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-3 md:mb-4">
              What You Get at GrowthLab
            </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive support and resources designed to accelerate your startup's growth and success
            </p>
          </div>
          
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {keyFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-l-4 border-l-[#0F7377]">
                  <CardContent className="p-4 md:p-6">
                    <div className="text-[#0F7377] mb-3 md:mb-4">
                      <div className="w-6 h-6 md:w-8 md:h-8">
                    {feature.icon}
                  </div>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3">{feature.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">{feature.description}</p>
                    <div className="bg-[#0F7377]/10 text-[#0F7377] font-semibold px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm mb-3 md:mb-4">
                    {feature.stats}
                  </div>
                    <div className="space-y-1 md:space-y-2">
                      {feature.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
          </TabsContent>

          {/* Success Stories Tab */}
          <TabsContent value="stories" className="space-y-6 md:space-y-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-3 md:mb-4">
              Success Stories
            </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Hear from our alumni about their GrowthLab experience and the impact it had on their startups
            </p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-gray-100 flex items-center justify-center text-lg md:text-2xl">
                          {testimonial.image}
                        </div>
                      <div className="absolute -top-1 -right-1 bg-[#0F7377] text-white rounded-full p-1">
                          <CheckCircle className="w-2 h-2 md:w-3 md:h-3" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-gray-600">{testimonial.company}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                    <p className="text-gray-700 mb-3 md:mb-4 leading-relaxed italic text-sm md:text-base">&ldquo;{testimonial.content}&rdquo;</p>
                  
                    <div className="space-y-2 mb-3 md:mb-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <Badge className="bg-green-100 text-green-800 text-xs">
                      {testimonial.funding}
                    </Badge>
                        <Badge variant="outline" className="border-[#0F7377] text-[#0F7377] text-xs">
                      {testimonial.status}
                    </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                        <span>{testimonial.industry}</span>
                        <span>{testimonial.year}</span>
                      </div>
                      <div className="text-xs md:text-sm font-medium text-[#0F7377]">
                        {testimonial.metrics}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Application Process Tab */}
          <TabsContent value="process" className="space-y-6 md:space-y-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-3 md:mb-4">
                Application Process
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Our streamlined application process is designed to identify the most promising startups while being efficient for applicants
              </p>
            </div>
            
            <div className="space-y-4 md:space-y-8">
              {applicationProcess.map((step, index) => (
                <Card key={step.step} className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="bg-[#0F7377] text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-sm md:text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-900">{step.title}</h3>
                          <Badge variant="outline" className="border-[#0F7377] text-[#0F7377] text-xs">
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4 leading-relaxed">{step.description}</p>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Requirements:</h4>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {step.requirements.map((req, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-[#0F7377] flex-shrink-0">
                        <div className="w-6 h-6 md:w-8 md:h-8">
                          {step.icon}
                        </div>
                      </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

            <div className="bg-gradient-to-r from-[#0F7377]/5 to-[#0F7377]/10 rounded-xl md:rounded-2xl p-4 md:p-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-[#0F7377] mb-3 md:mb-4">Ready to Apply?</h3>
              <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 px-2">
                Join the next cohort of innovative founders and take your startup to the next level
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/about/apply" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-[#0F7377] text-white hover:bg-[#0F7377]/90 font-bold px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                    Start Application
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full sm:w-auto">
                  <Download className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                  Download Guide
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Program Highlights Tab */}
          <TabsContent value="highlights" className="space-y-6 md:space-y-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-3 md:mb-4">
                Program Highlights
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Key activities and experiences that make our program unique and effective
              </p>
        </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {programHighlights.map((highlight, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                      <div className="bg-[#0F7377] text-white rounded-lg p-2 md:p-3 flex-shrink-0">
                        <div className="w-6 h-6 md:w-8 md:h-8">
                          {highlight.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                        <p className="text-sm md:text-base text-gray-600 mb-2 md:mb-3 leading-relaxed">{highlight.description}</p>
                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            {highlight.frequency}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            {highlight.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2 text-sm md:text-base">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-1 md:gap-2">
                        {highlight.topics.map((topic, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>


      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Ready to Transform Your Startup?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2 leading-relaxed">
            Join the next cohort of innovative founders and take your startup to the next level with GrowthLab
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link href="/about/apply" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full" 
              >
                <Rocket className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                Apply for Next Cohort
              </Button>
            </Link>
            <Link href="/about/people" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F7377] font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg w-full" 
              >
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
