"use client"
import Link from "next/link"
import { useState } from "react"
import { 
  Video, 
  Users, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Lightbulb,
  Award,
  MessageSquare,
  Presentation,
  Mic,
  Camera,
  Wifi,
  FileText,
  ArrowRight,
  Play,
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
  ChevronDown,
  ChevronUp,
  Download,
  Star,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  ExternalLink,
  BookOpen,
  Brain,
  Rocket,
  Eye,
  Heart,
  ThumbsUp,
  MessageCircle,
  Timer,
  UserCheck,
  Globe,
  Building2,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Cloud,
  Lock,
  Smartphone,
  Monitor,
  Headphones,
  WifiOff,
  Volume2,
  VolumeX,
  Settings,
  HelpCircle,
  Info,
  AlertTriangle,
  CheckSquare,
  Square,
  Plus,
  Minus
} from "lucide-react"

export default function InterviewGuidePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showChecklist, setShowChecklist] = useState(false)
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set())

  const toggleChecklistItem = (index: number) => {
    const newCompleted = new Set(completedItems)
    if (newCompleted.has(index)) {
      newCompleted.delete(index)
    } else {
      newCompleted.add(index)
    }
    setCompletedItems(newCompleted)
  }

  const interviewTips = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Practice Your Pitch",
      description: "Prepare a concise 3-minute pitch covering key business aspects. Practice with someone who can provide constructive feedback.",
      details: [
        "Start with the problem you're solving",
        "Explain your unique solution",
        "Share key traction metrics",
        "End with your vision and ask"
      ]
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Know Your Numbers",
      description: "Have key metrics ready: user numbers, growth rates, conversion rates, CAC, LTV, and revenue figures.",
      details: [
        "Monthly Active Users (MAU)",
        "Customer Acquisition Cost (CAC)",
        "Lifetime Value (LTV)",
        "Monthly Recurring Revenue (MRR)"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Research GrowthLab",
      description: "Understand our focus areas, portfolio companies, and mentors. Explain why GrowthLab is right for your startup.",
      details: [
        "Study our portfolio companies",
        "Research our mentors and advisors",
        "Understand our investment thesis",
        "Connect with our alumni"
      ]
    },
    {
      icon: <Presentation className="w-6 h-6" />,
      title: "Prepare Your Demo",
      description: "Ensure your product demo is polished and highlights key value propositions. Practice multiple times for smooth delivery.",
      details: [
        "Keep demo under 5 minutes",
        "Show key features and benefits",
        "Prepare for technical issues",
        "Have backup screenshots ready"
      ]
    }
  ]

  const commonQuestions = [
    {
      question: "What inspired you to start this company?",
      answer: "Share your personal story and the problem you're passionate about solving. Be authentic and show your genuine motivation.",
      category: "Founder Story"
    },
    {
      question: "How do you know customers want this product?",
      answer: "Provide specific examples of customer validation, user feedback, pilot programs, or early sales that prove market demand.",
      category: "Market Validation"
    },
    {
      question: "What makes your solution different?",
      answer: "Highlight your unique competitive advantages, technology, approach, or market positioning that sets you apart.",
      category: "Competitive Advantage"
    },
    {
      question: "How do you plan to acquire customers?",
      answer: "Explain your go-to-market strategy, customer acquisition channels, and specific tactics you'll use to grow.",
      category: "Go-to-Market"
    },
    {
      question: "What are your unit economics?",
      answer: "Show your understanding of customer lifetime value, acquisition costs, and how you'll achieve profitability.",
      category: "Business Model"
    },
    {
      question: "Who are your main competitors?",
      answer: "Demonstrate market awareness and explain your differentiation strategy against key competitors.",
      category: "Competitive Analysis"
    },
    {
      question: "What are the biggest risks to your business?",
      answer: "Show self-awareness and your plans to mitigate these risks. Be honest about challenges ahead.",
      category: "Risk Assessment"
    },
    {
      question: "How will you use GrowthLab's investment?",
      answer: "Outline specific milestones, resource allocation plans, and how the funding will accelerate growth.",
      category: "Use of Funds"
    }
  ]

  const preparationChecklist = [
    "Practice your 3-minute pitch 10+ times",
    "Prepare answers to common questions",
    "Gather all key metrics and data",
    "Test your technical setup thoroughly",
    "Research GrowthLab and our portfolio",
    "Prepare a polished product demo",
    "Have backup plans for technical issues",
    "Dress professionally for video call",
    "Find a quiet, well-lit space",
    "Ensure all founders are available",
    "Prepare questions to ask us",
    "Review your application materials"
  ]

  const evaluationCriteria = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Dynamics",
      color: "blue",
      description: "We assess your team's expertise, complementary skills, commitment, and ability to execute.",
      points: [
        "Founder backgrounds & expertise",
        "Team chemistry & roles",
        "Execution capability",
        "Commitment level",
        "Leadership qualities"
      ]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Problem & Solution",
      color: "green",
      description: "Clearly articulate the problem you're solving and how your solution addresses it uniquely.",
      points: [
        "Problem significance",
        "Solution uniqueness",
        "Customer validation",
        "Market fit",
        "Product-market fit"
      ]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Opportunity",
      color: "purple",
      description: "Demonstrate understanding of market size, competitive landscape, and growth potential.",
      points: [
        "Market size (TAM/SAM/SOM)",
        "Competitive analysis",
        "Timing advantage",
        "Growth potential",
        "Market trends"
      ]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Traction & Validation",
      color: "orange",
      description: "Share metrics that validate customer interest and product-market fit.",
      points: [
        "User growth metrics",
        "Revenue validation",
        "Customer feedback",
        "Pilot projects",
        "Partnerships"
      ]
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Business Model",
      color: "red",
      description: "Explain how you make money, unit economics, and go-to-market strategy.",
      points: [
        "Revenue streams",
        "Unit economics",
        "Go-to-market strategy",
        "Path to profitability",
        "Scalability"
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Growth Strategy",
      color: "indigo",
      description: "Outline your vision for scaling and key milestones during the accelerator program.",
      points: [
        "Scaling roadmap",
        "Key milestones",
        "Resource requirements",
        "Long-term vision",
        "Exit strategy"
      ]
    }
  ]

  const technicalSetup = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Internet Connection",
      description: "Test your connection speed and have a backup option ready",
      tips: [
        "Minimum 10 Mbps upload/download",
        "Use ethernet cable if possible",
        "Have mobile hotspot as backup",
        "Test connection 30 minutes before"
      ]
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Camera Setup",
      description: "Ensure good lighting and professional background",
      tips: [
        "Camera at eye level",
        "Good natural or artificial lighting",
        "Clean, professional background",
        "Test camera angles beforehand"
      ]
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: "Audio Quality",
      description: "Test microphone and find a quiet environment",
      tips: [
        "Use external microphone if possible",
        "Test audio levels",
        "Find quiet, echo-free room",
        "Close windows and doors"
      ]
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Materials Ready",
      description: "Have presentation slides and demo ready to share",
      tips: [
        "Test screen sharing",
        "Have backup files ready",
        "Practice screen transitions",
        "Prepare demo environment"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white/20 p-3 sm:p-4 rounded-full animate-pulse">
                <Video className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              GrowthLab Interview Guide
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
              Master your GrowthLab accelerator interview with our comprehensive guide. 
              Learn what we look for and how to present your startup effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Link href="/about/apply">
                <button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </Link>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 border border-white/30 flex items-center justify-center w-full sm:w-auto">
                <Download className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                Download Guide PDF
              </button>
            </div>
            <div className="text-blue-200 text-xs sm:text-sm">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
              Average interview duration: 45 minutes • Preparation time: 2-3 hours
            </div>
          </div>
        </div>
      </div>

      {/* Interview Process Overview */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Interview Process Overview
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Your journey through GrowthLab's selection process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-[#0F7377]/10 p-4 sm:p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 sm:w-12 sm:h-12 text-[#0F7377]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">First Round</h3>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-[#0F7377] mb-1 sm:mb-2">30 min</div>
                <p className="text-gray-600 text-xs sm:text-sm">Video call with program managers</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">Focus: Team, product, traction</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-[#0F7377]/10 p-4 sm:p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <Presentation className="w-8 h-8 sm:w-12 sm:h-12 text-[#0F7377]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Final Round</h3>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-[#0F7377] mb-1 sm:mb-2">60 min</div>
                <p className="text-gray-600 text-xs sm:text-sm">Deep dive with partners & mentors</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">Includes: Product demo, business analysis</p>
              </div>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-[#0F7377]/10 p-4 sm:p-6 rounded-full w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <Award className="w-8 h-8 sm:w-12 sm:h-12 text-[#0F7377]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Decision</h3>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-[#0F7377] mb-1 sm:mb-2">1-2 weeks</div>
                <p className="text-gray-600 text-xs sm:text-sm">Notification of final decision</p>
                <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">Constructive feedback provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Complete Interview Guide
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know to succeed in your GrowthLab interview
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
              onClick={() => setActiveTab("criteria")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "criteria"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Evaluation
            </button>
            <button
              onClick={() => setActiveTab("preparation")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "preparation"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Preparation
            </button>
            <button
              onClick={() => setActiveTab("questions")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "questions"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Questions
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeTab === "technical"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Technical
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {activeTab === "overview" && (
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">What to Expect</h3>
                    <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      Our interview process is designed to understand your startup's potential and how GrowthLab can help you succeed. We focus on getting to know you, your team, and your vision.
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Conversational, not interrogative</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Focus on learning and growth</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Constructive feedback provided</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm sm:text-base">Opportunity to ask questions</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Interview Format</h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm sm:text-base">Opening (5-10 min)</h4>
                        <p className="text-blue-700 text-xs sm:text-sm">Introductions and icebreaker questions</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-1 sm:mb-2 text-sm sm:text-base">Pitch & Demo (15-20 min)</h4>
                        <p className="text-green-700 text-xs sm:text-sm">Your presentation and product demonstration</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-1 sm:mb-2 text-sm sm:text-base">Q&A Session (15-20 min)</h4>
                        <p className="text-purple-700 text-xs sm:text-sm">Deep dive questions and discussion</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-900 mb-1 sm:mb-2 text-sm sm:text-base">Your Questions (5-10 min)</h4>
                        <p className="text-orange-700 text-xs sm:text-sm">Opportunity to ask us anything</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "criteria" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {evaluationCriteria.map((criteria, index) => (
                  <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className={`bg-${criteria.color}-50 p-2 sm:p-3 rounded-lg w-fit mb-3 sm:mb-4`}>
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 text-${criteria.color}-600`}>{criteria.icon}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{criteria.title}</h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{criteria.description}</p>
                    <ul className="space-y-1 sm:space-y-2">
                      {criteria.points.map((point, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "preparation" && (
              <div className="space-y-6 sm:space-y-8">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Preparation Tips</h3>
                    <button
                      onClick={() => setShowChecklist(!showChecklist)}
                      className="bg-[#0F7377] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0F7377]/90 transition-colors"
                    >
                      {showChecklist ? 'Hide' : 'Show'} Checklist
                    </button>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    {interviewTips.map((tip, index) => (
                      <div key={index} className="p-4 sm:p-6 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="bg-[#0F7377] text-white p-2 rounded-lg flex-shrink-0">
                            {tip.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{tip.title}</h4>
                            <p className="text-gray-600 mb-3 text-xs sm:text-sm">{tip.description}</p>
                            <ul className="space-y-1">
                              {tip.details.map((detail, idx) => (
                                <li key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {showChecklist && (
                  <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Preparation Checklist</h3>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      {preparationChecklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                          <button
                            onClick={() => toggleChecklistItem(index)}
                            className="flex-shrink-0"
                          >
                            {completedItems.has(index) ? (
                              <CheckSquare className="w-5 h-5 text-green-500" />
                            ) : (
                              <Square className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          <span className={`text-sm ${completedItems.has(index) ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 sm:mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Progress: {completedItems.size} / {preparationChecklist.length} completed
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-[#0F7377] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(completedItems.size / preparationChecklist.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "questions" && (
              <div className="space-y-4 sm:space-y-6">
                {commonQuestions.map((qa, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-2">{qa.question}</h3>
                        <span className="inline-block mt-1 px-2 py-1 bg-[#0F7377]/10 text-[#0F7377] text-xs rounded-full">
                          {qa.category}
                        </span>
                      </div>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{qa.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "technical" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {technicalSetup.map((setup, index) => (
                  <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <div className="bg-gray-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                      {setup.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{setup.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{setup.description}</p>
                    <ul className="text-left space-y-1">
                      {setup.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-xs text-gray-600">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Success Stories
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from founders who aced their GrowthLab interviews
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">🚀</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Sarah Chen</h3>
                  <p className="text-sm text-gray-600">Founder, TechFlow</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base">
                "The interview felt like a conversation with mentors who genuinely wanted to help. Their questions helped me think deeper about my business model."
              </p>
              <div className="text-xs sm:text-sm text-gray-500">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                Raised $2M Series A • 50K+ users
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">💡</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Marcus Johnson</h3>
                  <p className="text-sm text-gray-600">CEO, GreenTech Solutions</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base">
                "The preparation guide was incredibly helpful. I felt confident and ready to showcase our vision and traction."
              </p>
              <div className="text-xs sm:text-sm text-gray-500">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                $5M valuation • 200+ B2B clients
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">🎯</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Priya Patel</h3>
                  <p className="text-sm text-gray-600">Co-founder, HealthAI</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 sm:mb-6 italic leading-relaxed text-sm sm:text-base">
                "The technical setup guide saved us from potential issues. Everything went smoothly, and we could focus on our pitch."
              </p>
              <div className="text-xs sm:text-sm text-gray-500">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                $1.5M seed round • 10K+ patients
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Need Help?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Our team is here to support you through the interview process
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
              <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base break-all">interview@growthlab.sg</p>
              <p className="text-xs sm:text-sm text-gray-500">We'll respond within 24 hours</p>
            </div>
            
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-[#0F7377]/10 p-3 sm:p-4 rounded-full w-fit mx-auto mb-3 sm:mb-4">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377]" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">Available 24/7</p>
              <p className="text-xs sm:text-sm text-gray-500">Get instant answers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Ace Your Interview?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Now that you know what to expect, take the next step and apply to GrowthLab. 
            Our team is excited to meet passionate founders like you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
            <Link href="/about/apply">
              <button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center w-full sm:w-auto">
                Start Your Application
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </Link>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F7377] px-6 sm:px-10 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto">
              <Download className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
              Download Guide
            </button>
          </div>
          <div className="text-blue-200 text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
            Applications close July 15, 2025 • Interviews start August 1, 2025
          </div>
        </div>
      </div>
    </div>
  )
}