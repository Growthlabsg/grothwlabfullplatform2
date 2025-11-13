"use client"

import Link from "next/link"
import { useState } from "react"
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Globe, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Calendar,
  Award,
  Building2,
  Lightbulb,
  ArrowRight,
  Clock,
  FileText,
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
  Zap,
  BookOpen,
  Handshake,
  BarChart3,
  Briefcase,
  GraduationCap,
  Brain,
  Code,
  Heart,
  Leaf,
  Smartphone,
  Database,
  Cloud,
  Lock,
  Eye,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Download,
  Play,
  MessageCircle,
  UserCheck,
  Timer,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info
} from "lucide-react"

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showApplicationForm, setShowApplicationForm] = useState(false)

  const programBenefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "SGD 500K Investment",
      description: "Direct investment in exchange for 6-8% equity to fuel your growth",
      details: ["No dilution until Series A", "Flexible funding structure", "Follow-on investment opportunities"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Mentorship",
      description: "Access to 100+ successful entrepreneurs and industry experts",
      details: ["1-on-1 mentoring sessions", "Industry-specific advisors", "Network introductions"]
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Network",
      description: "Connect with investors, partners, and customers worldwide",
      details: ["Asia-Pacific expansion", "International partnerships", "Global market access"]
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Premium Workspace",
      description: "State-of-the-art co-working space in Singapore's startup hub",
      details: ["24/7 access", "Meeting rooms", "Event spaces", "Networking areas"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Strategic Support",
      description: "Comprehensive support from our partner network",
      details: ["Legal & compliance", "Accounting & finance", "Marketing & PR", "Technical development"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth Acceleration",
      description: "Intensive 6-month program designed to accelerate growth",
      details: ["Weekly workshops", "Monthly milestones", "Quarterly reviews", "Demo Day preparation"]
    }
  ]

  const focusAreas = [
    { name: "Fintech", icon: <DollarSign className="w-5 h-5" />, description: "Digital payments, lending, insurance, blockchain" },
    { name: "Healthtech", icon: <Heart className="w-5 h-5" />, description: "Digital health, telemedicine, AI diagnostics" },
    { name: "Edtech", icon: <GraduationCap className="w-5 h-5" />, description: "Online learning, skills development, AR/VR" },
    { name: "Sustainability", icon: <Leaf className="w-5 h-5" />, description: "Clean energy, circular economy, carbon tech" },
    { name: "B2B SaaS", icon: <Cloud className="w-5 h-5" />, description: "Enterprise software, productivity tools" },
    { name: "Deep Tech", icon: <Brain className="w-5 h-5" />, description: "AI/ML, quantum computing, robotics" },
    { name: "E-commerce", icon: <Smartphone className="w-5 h-5" />, description: "Marketplaces, logistics, retail tech" },
    { name: "Data & Analytics", icon: <Database className="w-5 h-5" />, description: "Big data, business intelligence, insights" }
  ]

  const timeline = [
    {
      phase: "Application Period",
      duration: "4 weeks",
      description: "Submit your application and supporting materials",
      activities: ["Online application", "Pitch deck submission", "Team interviews", "Due diligence"]
    },
    {
      phase: "Selection & Onboarding",
      duration: "2 weeks",
      description: "Final selection and program preparation",
      activities: ["Final interviews", "Selection announcement", "Legal documentation", "Program orientation"]
    },
    {
      phase: "Program Kickoff",
      duration: "2 weeks",
      description: "Orientation and initial goal setting",
      activities: ["Team building", "Mentor matching", "Goal setting", "Workspace setup"]
    },
    {
      phase: "Intensive Development",
      duration: "16 weeks",
      description: "Core program with workshops and mentorship",
      activities: ["Weekly workshops", "1-on-1 mentoring", "Milestone reviews", "Network events"]
    },
    {
      phase: "Demo Day & Graduation",
      duration: "2 weeks",
      description: "Present to investors and graduate from the program",
      activities: ["Demo Day prep", "Investor presentations", "Graduation ceremony", "Alumni network"]
    }
  ]

  const faqs = [
    {
      question: "What are the eligibility requirements?",
      answer: "We're looking for startups with at least 2 co-founders, a working MVP, and global market potential. Your startup should be less than 3 years old and have raised less than $1M in previous funding."
    },
    {
      question: "What equity do you take?",
      answer: "GrowthLab takes 6-8% equity in exchange for SGD 500K investment. This is competitive with other top-tier accelerators and includes all program benefits."
    },
    {
      question: "Do I need to be based in Singapore?",
      answer: "While we prefer Singapore-based startups, we accept applications from across Asia-Pacific. However, you'll need to relocate to Singapore for the 6-month program duration."
    },
    {
      question: "What happens after the program?",
      answer: "You'll join our alumni network with ongoing support, access to follow-on funding, and continued mentorship opportunities. Many alumni raise additional funding within 6 months of graduation."
    },
    {
      question: "How competitive is the application process?",
      answer: "We receive 500+ applications per cohort and select 15-20 startups. The process is highly competitive, but we provide detailed feedback to all applicants."
    },
    {
      question: "What support do you provide beyond funding?",
      answer: "We provide comprehensive support including mentorship, workspace, legal/accounting services, marketing support, and access to our investor and partner network."
    }
  ]

  const successStories = [
    {
      name: "FinFlow",
      industry: "Fintech",
      description: "Digital payment platform for SMEs",
      quote: "GrowthLab helped us scale from 10K to 1M users in 6 months. The mentorship was invaluable.",
      metrics: { raised: "$15M Series A", valuation: "$120M", users: "1M+" },
      logo: "💳"
    },
    {
      name: "HealthAI",
      industry: "Healthtech",
      description: "AI-powered diagnostic platform",
      quote: "The network we built through GrowthLab opened doors we never thought possible.",
      metrics: { raised: "$8M Seed", valuation: "$45M", users: "500K+" },
      logo: "🏥"
    },
    {
      name: "EduTech Pro",
      industry: "Edtech",
      description: "Personalized learning platform",
      quote: "GrowthLab's strategic guidance helped us pivot and find our product-market fit.",
      metrics: { raised: "$12M Series A", valuation: "$80M", users: "2M+" },
      logo: "🎓"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white/20 p-3 sm:p-4 rounded-full animate-pulse">
                <Rocket className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Join GrowthLab Accelerator
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-2">
              Transform your startup into a global success story with SGD 500K funding, 
              world-class mentorship, and access to Asia's most dynamic startup ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-4">
              <button 
                onClick={() => setShowApplicationForm(true)}
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center w-full sm:w-auto"
              >
                Apply Now
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <Link href="#program-details">
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F7377] px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto">
                  Learn More
                  <ChevronDown className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Link>
            </div>
            <div className="text-blue-200 text-xs sm:text-sm px-4">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              Applications close July 15, 2025 • Program starts September 1, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Join the most successful accelerator program in Asia-Pacific
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="space-y-2 sm:space-y-3 group p-2 sm:p-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F7377] group-hover:scale-110 transition-transform duration-300">500K</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">SGD Funding per Startup</div>
              <div className="text-xs sm:text-sm text-gray-500">Average investment</div>
            </div>
            <div className="space-y-2 sm:space-y-3 group p-2 sm:p-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F7377] group-hover:scale-110 transition-transform duration-300">150+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Startups Funded</div>
              <div className="text-xs sm:text-sm text-gray-500">Across 8 cohorts</div>
            </div>
            <div className="space-y-2 sm:space-y-3 group p-2 sm:p-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F7377] group-hover:scale-110 transition-transform duration-300">$2.5B+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Total Valuation</div>
              <div className="text-xs sm:text-sm text-gray-500">Combined portfolio value</div>
            </div>
            <div className="space-y-2 sm:space-y-3 group p-2 sm:p-0">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F7377] group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Success Rate</div>
              <div className="text-xs sm:text-sm text-gray-500">Raise follow-on funding</div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Details Tabs */}
      <div id="program-details" className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Program Details
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our accelerator program
            </p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "overview"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("benefits")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "benefits"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Benefits
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "timeline"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Timeline
            </button>
            <button
              onClick={() => setActiveTab("eligibility")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "eligibility"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Eligibility
            </button>
              </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === "overview" && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Program Overview</h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      GrowthLab Accelerator is a 6-month intensive program designed to transform promising startups into global success stories. We provide funding, mentorship, and access to our extensive network of investors, partners, and industry experts.
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">SGD 500K investment for 6-8% equity</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">100+ expert mentors and advisors</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Premium co-working space in Singapore</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Access to global investor network</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Focus Areas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {focusAreas.slice(0, 6).map((area, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <div className="text-[#0F7377] text-sm sm:text-base">{area.icon}</div>
                          <span className="text-xs sm:text-sm font-medium text-gray-700">{area.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
            </div>
              </div>
            )}

            {activeTab === "benefits" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {programBenefits.map((benefit, index) => (
                  <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="bg-[#0F7377]/10 p-2 sm:p-3 rounded-lg w-fit mb-3 sm:mb-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377]">{benefit.icon}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
                    <ul className="space-y-1 sm:space-y-2">
                      {benefit.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
            </div>
                ))}
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {timeline.map((phase, index) => (
                  <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="bg-[#0F7377] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{phase.phase}</h3>
                          <span className="bg-[#0F7377]/10 text-[#0F7377] px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit">
                            {phase.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{phase.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2">
                          {phase.activities.map((activity, idx) => (
                            <div key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                              <span className="truncate">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
            </div>
                ))}
              </div>
            )}

            {activeTab === "eligibility" && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Eligibility Requirements</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Full-time Founding Team</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">At least 2 co-founders committed full-time to the startup</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Working MVP</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">Product with early user validation and traction</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Global Market Potential</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">Scalable solution with international expansion potential</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Early Stage</h4>
                          <p className="text-gray-600 text-xs sm:text-sm">Less than 3 years old, raised less than $1M previously</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What We Look For</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">Innovation & Impact</h4>
                        <p className="text-blue-700 text-xs sm:text-sm">Solving real problems with unique, scalable solutions</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-1 sm:mb-2 text-sm sm:text-base">Market Opportunity</h4>
                        <p className="text-green-700 text-xs sm:text-sm">Large addressable market with clear growth potential</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-1 sm:mb-2 text-sm sm:text-base">Team Quality</h4>
                        <p className="text-purple-700 text-xs sm:text-sm">Strong founding team with complementary skills</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-1 sm:mb-2 text-sm sm:text-base">Execution Ability</h4>
                        <p className="text-orange-700 text-xs sm:text-sm">Proven ability to execute and deliver results</p>
                      </div>
            </div>
              </div>
            </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              See how our alumni have transformed their startups into global success stories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">{story.logo}</div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{story.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{story.industry} • {story.description}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Raised:</span>
                    <span className="font-semibold text-[#0F7377]">{story.metrics.raised}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Valuation:</span>
                    <span className="font-semibold text-[#0F7377]">{story.metrics.valuation}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Users:</span>
                    <span className="font-semibold text-[#0F7377]">{story.metrics.users}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about applying to GrowthLab Accelerator
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-2">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
                </div>
              </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Start Your Application</h2>
                <button
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
                </div>
            <div className="p-4 sm:p-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="bg-[#0F7377]/10 p-2 sm:p-3 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Ready to Apply?</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Fill out the form below to start your application process
                </p>
              </div>

              <form className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Company Name *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F7377] focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Industry *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F7377] focus:border-transparent text-sm sm:text-base">
                      <option>Select industry</option>
                      <option>Fintech</option>
                      <option>Healthtech</option>
                      <option>Edtech</option>
                      <option>Sustainability</option>
                      <option>B2B SaaS</option>
                      <option>Deep Tech</option>
                      <option>E-commerce</option>
                      <option>Other</option>
                    </select>
                </div>
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F7377] focus:border-transparent text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Brief Description *</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F7377] focus:border-transparent text-sm sm:text-base"
                    placeholder="Tell us about your startup in 2-3 sentences..."
                  />
              </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" id="terms" className="rounded mt-1" />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    I agree to the <Link href="/terms" className="text-[#0F7377] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#0F7377] hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#0F7377] text-white rounded-lg hover:bg-[#0F7377]/90 transition-colors text-sm sm:text-base"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Have Questions?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Get in touch with our team for more information about the program
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-[#0F7377]/10 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Call Us</h3>
              <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">+65 6123 4567</p>
              <p className="text-xs sm:text-sm text-gray-500">Mon-Fri, 9AM-6PM SGT</p>
            </div>

            <div className="text-center">
              <div className="bg-[#0F7377]/10 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Email Us</h3>
              <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base break-all">accelerator@growthlab.sg</p>
              <p className="text-xs sm:text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-[#0F7377]/10 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">123 Startup Street</p>
              <p className="text-xs sm:text-sm text-gray-500">Singapore 123456</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Accelerate Your Startup?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join the next generation of successful entrepreneurs. Apply now and take the first step 
            towards building a global startup from Singapore.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center w-full sm:w-auto"
            >
                Start Your Application
              <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <Link href="/about/contact">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F7377] px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto">
                Contact Us
                <MessageCircle className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Link>
          </div>
          <div className="text-blue-200 text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              Applications close July 15, 2025 • Program starts September 1, 2025
          </div>
        </div>
      </div>
    </div>
  )
}
