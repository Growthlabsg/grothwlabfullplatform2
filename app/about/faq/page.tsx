"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  HelpCircle, 
  Users, 
  DollarSign, 
  Calendar,
  Award,
  Building2,
  Globe,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Rocket,
  Target,
  TrendingUp,
  Shield,
  Zap,
  Lightbulb,
  MapPin,
  Clock,
  CheckCircle,
  Star,
  ExternalLink,
  Download,
  BookOpen,
  Brain,
  Heart,
  ThumbsUp,
  Eye,
  BarChart3,
  PieChart,
  Activity,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Cloud,
  Lock,
  Smartphone,
  Monitor,
  Headphones,
  Settings,
  Info,
  AlertTriangle,
  CheckSquare,
  Square,
  Plus,
  Minus,
  Filter,
  X,
  RefreshCw
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
  icon: any
  tags?: string[]
  related?: string[]
}

const faqData: FAQItem[] = [
  // Application & Selection
  {
    id: "apply-timing",
    question: "When can I apply to GrowthLab?",
    answer: "We run two cohorts per year with applications opening in January and July. The next application deadline is July 15, 2025, for our September 2025 cohort. Check our website for specific dates and deadlines. We also accept applications on a rolling basis for exceptional startups outside our regular cycles.",
    category: "Application & Selection",
    icon: Calendar,
    tags: ["timing", "deadlines", "cohorts"],
    related: ["singapore-based", "startup-stage", "reapply-policy"]
  },
  {
    id: "singapore-based",
    question: "Do I need to be based in Singapore to apply?",
    answer: "While we prefer startups based in Singapore or willing to relocate, we accept remote participants in exceptional cases. However, we strongly encourage at least one founder to be present in Singapore during key program activities for maximum benefit. We provide visa support and relocation assistance for international founders.",
    category: "Application & Selection",
    icon: MapPin,
    tags: ["location", "relocation", "visa"],
    related: ["visa-incorporation", "apply-timing", "startup-stage"]
  },
  {
    id: "startup-stage",
    question: "What stage startups do you accept?",
    answer: "We primarily work with early-stage startups from pre-seed to Series A. Ideally, you should have at least an MVP and some early traction or validation. We occasionally accept exceptional pre-MVP teams with strong technical founders and compelling visions. We look for startups with clear product-market fit potential.",
    category: "Application & Selection",
    icon: TrendingUp,
    tags: ["stage", "mvp", "traction"],
    related: ["industries-focus", "cohort-size", "what-provided"]
  },
  {
    id: "industries-focus",
    question: "What industries do you focus on?",
    answer: "While we're industry-agnostic, we have particular expertise in fintech, healthtech, edtech, enterprise SaaS, sustainability, and deep tech. We look for startups with scalable business models and potential for regional or global impact. Our mentors have deep experience across these verticals.",
    category: "Application & Selection",
    icon: Target,
    tags: ["industries", "verticals", "expertise"],
    related: ["startup-stage", "mentorship-expectations", "differentiation"]
  },
  {
    id: "cohort-size",
    question: "How many startups do you accept per cohort?",
    answer: "We typically select 10-12 startups per cohort to ensure we can provide hands-on support and personalized attention to each company. This allows for meaningful peer learning and focused mentorship. The small cohort size enables deep relationships and collaborative learning.",
    category: "Application & Selection",
    icon: Users,
    tags: ["cohort", "size", "support"],
    related: ["what-provided", "mentorship-expectations", "program-structure"]
  },
  {
    id: "application-process",
    question: "What is the application process like?",
    answer: "Our application process includes: 1) Online application form with business details, 2) Initial screening call (30 minutes), 3) Final interview with partners (60 minutes), 4) Reference checks, 5) Decision within 1-2 weeks. The entire process takes 2-3 weeks from application to decision.",
    category: "Application & Selection",
    icon: FileText,
    tags: ["process", "timeline", "interviews"],
    related: ["apply-timing", "reapply-policy", "nda-policy"]
  },

  // Program Details
  {
    id: "what-provided",
    question: "What does GrowthLab provide?",
    answer: "GrowthLab provides SGD 500K in funding, a 6-month intensive program, mentorship from 100+ experienced entrepreneurs and industry experts, premium co-working space, technical resources, legal and accounting support, and connections to investors and corporate partners across Asia. We also provide access to our alumni network and ongoing support post-program.",
    category: "Program Details",
    icon: Award,
    tags: ["funding", "mentorship", "resources"],
    related: ["equity-stake", "program-structure", "post-demo-day"]
  },
  {
    id: "equity-stake",
    question: "What equity stake does GrowthLab take?",
    answer: "In exchange for our investment and program, we typically take 6-8% equity in your company. The exact percentage depends on your startup's stage, traction, and valuation. We use a SAFE agreement for straightforward investment terms. Our goal is to be fair and aligned with your success.",
    category: "Program Details",
    icon: DollarSign,
    tags: ["equity", "investment", "safe"],
    related: ["what-provided", "investment-structure", "follow-on-funding"]
  },
  {
    id: "program-structure",
    question: "How is the program structured?",
    answer: "The program runs for 6 months and includes weekly workshops, one-on-one mentoring sessions, peer learning opportunities, networking events, and investor meetings. The program culminates in Demo Day, where startups present to investors and partners. We also provide milestone-based support and regular check-ins.",
    category: "Program Details",
    icon: Building2,
    tags: ["structure", "workshops", "demo-day"],
    related: ["what-provided", "full-time-commitment", "post-demo-day"]
  },
  {
    id: "full-time-commitment",
    question: "Do I need to work full-time on my startup during the program?",
    answer: "Yes, we expect all founders to be committed full-time to their startups during the program. The accelerator is intensive and requires your complete focus to maximize the benefits and achieve the milestones we set together. Part-time participation is not allowed as it limits the program's effectiveness.",
    category: "Program Details",
    icon: Calendar,
    tags: ["commitment", "full-time", "intensive"],
    related: ["program-structure", "what-provided", "success-rate"]
  },
  {
    id: "post-demo-day",
    question: "What happens after Demo Day?",
    answer: "After Demo Day, you become part of our alumni network with ongoing access to mentors, investors, and resources. We continue supporting your fundraising efforts and provide guidance as you scale. Many startups raise their next funding round within 6 months. We maintain long-term relationships with our portfolio companies.",
    category: "Program Details",
    icon: Rocket,
    tags: ["alumni", "ongoing-support", "fundraising"],
    related: ["what-provided", "success-rate", "follow-on-funding"]
  },
  {
    id: "workshop-topics",
    question: "What topics are covered in workshops?",
    answer: "Our workshops cover: Product development and design, Go-to-market strategy, Fundraising and investor relations, Financial modeling and unit economics, Legal and IP protection, Team building and culture, Marketing and growth hacking, International expansion, and Leadership development. Each workshop is hands-on and practical.",
    category: "Program Details",
    icon: BookOpen,
    tags: ["workshops", "topics", "learning"],
    related: ["program-structure", "mentorship-expectations", "what-provided"]
  },

  // Funding & Support
  {
    id: "investment-structure",
    question: "How is the investment structured?",
    answer: "Our investment is structured as a SAFE (Simple Agreement for Future Equity) with a valuation cap. This allows for a straightforward investment process without immediately setting a valuation, providing flexibility for both parties. We also offer convertible notes for more established startups.",
    category: "Funding & Support",
    icon: DollarSign,
    tags: ["safe", "investment", "structure"],
    related: ["equity-stake", "follow-on-funding", "what-provided"]
  },
  {
    id: "follow-on-funding",
    question: "Do you provide follow-on funding?",
    answer: "Yes, we have a dedicated follow-on fund to invest in our most promising portfolio companies as they raise subsequent rounds. Approximately 40% of our startups receive follow-on funding from GrowthLab, demonstrating our long-term commitment. We typically invest 2-5x our initial investment in follow-on rounds.",
    category: "Funding & Support",
    icon: TrendingUp,
    tags: ["follow-on", "funding", "commitment"],
    related: ["investment-structure", "success-rate", "post-demo-day"]
  },
  {
    id: "mentorship-expectations",
    question: "What kind of mentorship can I expect?",
    answer: "You'll be matched with 3-5 mentors based on your specific needs and industry. These include successful entrepreneurs, industry experts, and functional specialists in areas like product, marketing, sales, and fundraising. Each mentor commits to regular sessions throughout the program. We also provide access to our entire mentor network.",
    category: "Funding & Support",
    icon: Users,
    tags: ["mentorship", "matching", "expertise"],
    related: ["what-provided", "workshop-topics", "differentiation"]
  },
  {
    id: "visa-incorporation",
    question: "Can you help with visa and incorporation issues?",
    answer: "Yes, we provide comprehensive support for international founders to obtain appropriate visas for Singapore. We also offer guidance on incorporation and connect you with legal partners who provide discounted services to our startups. Our team has extensive experience with immigration and business setup processes.",
    category: "Funding & Support",
    icon: Globe,
    tags: ["visa", "incorporation", "legal"],
    related: ["singapore-based", "what-provided", "mentorship-expectations"]
  },
  {
    id: "technical-support",
    question: "What technical support do you provide?",
    answer: "We provide access to cloud credits (AWS, Google Cloud, Azure), development tools and software licenses, technical mentorship from CTOs and senior engineers, code reviews and architecture guidance, and connections to technical talent. We also offer workshops on technical best practices and scaling.",
    category: "Funding & Support",
    icon: Code,
    tags: ["technical", "cloud", "development"],
    related: ["what-provided", "workshop-topics", "mentorship-expectations"]
  },

  // Success & Results
  {
    id: "success-rate",
    question: "What is your success rate?",
    answer: "Over 95% of our startups are still operating and growing three years after the program. More than 70% have raised additional funding, with our portfolio companies collectively raising over $2 billion to date. Our alumni network spans across Asia and beyond, with companies in 15+ countries.",
    category: "Success & Results",
    icon: Award,
    tags: ["success", "rate", "fundraising"],
    related: ["differentiation", "post-demo-day", "follow-on-funding"]
  },
  {
    id: "differentiation",
    question: "How is GrowthLab different from other accelerators?",
    answer: "GrowthLab differentiates itself through our deep Southeast Asian market expertise, hands-on approach with a high mentor-to-startup ratio, strong corporate partnerships for pilot opportunities, and dedicated support for regional expansion. Our network is particularly strong in Singapore, Indonesia, Vietnam, and Thailand.",
    category: "Success & Results",
    icon: Lightbulb,
    tags: ["differentiation", "expertise", "network"],
    related: ["success-rate", "mentorship-expectations", "industries-focus"]
  },
  {
    id: "reapply-policy",
    question: "Can I apply if I've been rejected before?",
    answer: "Absolutely! Many successful GrowthLab startups applied multiple times before being accepted. We encourage you to reapply if you've made significant progress since your last application. We value persistence, growth, and the ability to learn from feedback. Each application is evaluated independently.",
    category: "Success & Results",
    icon: Zap,
    tags: ["reapply", "persistence", "growth"],
    related: ["apply-timing", "application-process", "success-rate"]
  },
  {
    id: "nda-policy",
    question: "Do you sign NDAs before application review?",
    answer: "We don't sign NDAs during the application process due to the volume of applications we receive and potential for overlap in ideas. However, we treat all application information as confidential and our team adheres to strict ethical standards and data protection policies. We have never had any issues with confidentiality.",
    category: "Success & Results",
    icon: Shield,
    tags: ["nda", "confidentiality", "ethics"],
    related: ["application-process", "differentiation", "reapply-policy"]
  },
  {
    id: "alumni-network",
    question: "What benefits do I get from the alumni network?",
    answer: "Our alumni network provides ongoing access to mentors, investors, and fellow entrepreneurs. You'll get priority access to our events, workshops, and resources. Alumni often collaborate on projects, share opportunities, and provide mutual support. We also facilitate introductions between alumni and new portfolio companies.",
    category: "Success & Results",
    icon: Heart,
    tags: ["alumni", "network", "collaboration"],
    related: ["post-demo-day", "success-rate", "differentiation"]
  }
]

const categories = [
  "Application & Selection",
  "Program Details", 
  "Funding & Support",
  "Success & Results"
]

const popularQuestions = [
  "When can I apply to GrowthLab?",
  "What does GrowthLab provide?",
  "What equity stake does GrowthLab take?",
  "What is your success rate?",
  "Do I need to be based in Singapore to apply?"
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const displayedFAQs = showAll ? filteredFAQs : filteredFAQs.slice(0, 8)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Application & Selection":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "Program Details":
        return "bg-green-50 text-green-700 border-green-200"
      case "Funding & Support":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "Success & Results":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="bg-white/20 p-3 sm:p-4 rounded-full animate-pulse">
                <HelpCircle className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
              Find answers to common questions about GrowthLab's accelerator program, 
              application process, funding, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/about/apply">
                <button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center w-full sm:w-auto">
                  Apply Now
                  <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </Link>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 border border-white/30 flex items-center justify-center w-full sm:w-auto">
                <Download className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                Download FAQ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="py-8 sm:py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center justify-between">
            <div className="flex-1 max-w-md w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#0F7377] focus:border-transparent text-sm sm:text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-[#0F7377] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#0F7377] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Questions */}
      {!searchTerm && !selectedCategory && (
        <div className="py-8 sm:py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                Popular Questions
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Most frequently asked questions by founders
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {popularQuestions.map((question, index) => {
                const faq = faqData.find(f => f.question === question)
                if (!faq) return null
                return (
                  <button
                    key={index}
                    onClick={() => toggleItem(faq.id)}
                    className="p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-left border border-gray-200 hover:border-[#0F7377]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm sm:text-base font-medium text-gray-900 pr-2">
                        {question}
                      </span>
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="h-4 w-4 text-[#0F7377] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                    {openItems.includes(faq.id) && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* FAQ Content */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                {selectedCategory ? `${selectedCategory} Questions` : 'All Questions'}
              </h2>
              <div className="text-sm text-gray-500">
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''}
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {displayedFAQs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                      <div className="bg-[#0F7377]/10 p-2 rounded-lg flex-shrink-0 mt-1">
                        <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F7377]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 pr-2 leading-tight">
                          {item.question}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getCategoryColor(item.category)}`}
                          >
                            {item.category}
                          </Badge>
                          {favorites.has(item.id) && (
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(item.id)
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Star className={`h-4 w-4 ${favorites.has(item.id) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                      {openItems.includes(item.id) ? (
                        <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-[#0F7377] flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                  {openItems.includes(item.id) && (
                    <div className="px-4 sm:px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                          {item.answer}
                        </p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {item.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!showAll && filteredFAQs.length > 8 && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-[#0F7377] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0F7377]/90 transition-colors flex items-center mx-auto"
                >
                  Show All Questions
                  <Plus className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}

            {showAll && filteredFAQs.length > 8 && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => setShowAll(false)}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center mx-auto"
                >
                  Show Less
                  <Minus className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              GrowthLab by the Numbers
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Key statistics about our accelerator program
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-1 sm:mb-2">500K</div>
              <div className="text-xs sm:text-sm text-gray-600">SGD Funding per Startup</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-1 sm:mb-2">6</div>
              <div className="text-xs sm:text-sm text-gray-600">Month Program Duration</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-1 sm:mb-2">100+</div>
              <div className="text-xs sm:text-sm text-gray-600">Expert Mentors</div>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-sm">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F7377] mb-1 sm:mb-2">95%</div>
              <div className="text-xs sm:text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              If you couldn't find the answer to your question, we're here to help! 
              Reach out to our team directly.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377] mx-auto mb-2 sm:mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Email Us</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                  Get detailed answers to your questions
                </p>
                <a href="mailto:hello@growthlab.sg" className="text-[#0F7377] hover:underline font-medium text-xs sm:text-sm">
                  hello@growthlab.sg
                </a>
              </div>
              
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377] mx-auto mb-2 sm:mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Live Chat</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                  Chat with our support team
                </p>
                <button className="text-[#0F7377] hover:underline font-medium text-xs sm:text-sm">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-[#0F7377] mx-auto mb-2 sm:mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Call Us</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                  Speak directly with our team
                </p>
                <a href="tel:+65-1234-5678" className="text-[#0F7377] hover:underline font-medium text-xs sm:text-sm">
                  +65 1234 5678
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 p-6 sm:p-8 rounded-lg shadow-lg text-white">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                Ready to Apply?
              </h3>
              <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
                Now that your questions are answered, take the next step and apply to GrowthLab's accelerator program.
              </p>
              <Link href="/about/apply">
                <button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center mx-auto">
                  Start Your Application
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}