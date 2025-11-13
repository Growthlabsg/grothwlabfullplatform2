"use client"

import { useState } from "react"
import { 
  Rocket, 
  Users, 
  DollarSign, 
  Target, 
  Calendar, 
  MapPin, 
  Award, 
  Lightbulb,
  Building2,
  Globe,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Zap,
  Heart,
  MessageSquare,
  FileText,
  Briefcase,
  BookOpen,
  Settings,
  Shield,
  BarChart3,
  ExternalLink,
  Play,
  Download,
  Share2,
  Eye,
  ThumbsUp,
  UserPlus,
  Video,
  Headphones,
  Camera,
  Mic,
  Monitor,
  Smartphone,
  Laptop,
  Tablet
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ProgrammesPage() {
  const [activeTab, setActiveTab] = useState("accelerator")

  const acceleratorPrograms = [
    {
      id: 1,
      name: "GrowthLab Accelerator",
      duration: "6 months",
      funding: "SGD 500K",
      equity: "6-8%",
      spots: "15 startups",
      status: "Applications Open",
      deadline: "March 31, 2025",
      description: "Our flagship program for early-stage startups ready to scale globally",
      highlights: [
        "SGD 500K direct investment",
        "World-class mentorship network",
        "Co-working space in Singapore",
        "Global investor connections",
        "Legal & technical support"
      ],
      requirements: [
        "MVP or early traction",
        "Full-time founding team",
        "Singapore-based or willing to relocate",
        "Innovative business model"
      ]
    },
    {
      id: 2,
      name: "Seed to Series A Bridge",
      duration: "3 months",
      funding: "SGD 200K",
      equity: "3-5%",
      spots: "10 startups",
      status: "Applications Open",
      deadline: "April 15, 2025",
      description: "For startups with proven traction looking to bridge to Series A funding",
      highlights: [
        "SGD 200K bridge funding",
        "Series A preparation support",
        "Investor pitch coaching",
        "Financial modeling assistance",
        "Due diligence preparation"
      ],
      requirements: [
        "Proven revenue model",
        "Monthly recurring revenue",
        "Strong growth metrics",
        "Experienced team"
      ]
    }
  ]

  const mentorshipPrograms = [
    {
      id: 1,
      name: "Founder Mentorship Program",
      duration: "12 months",
      cost: "Free",
      spots: "50 founders",
      status: "Applications Open",
      description: "One-on-one mentorship with successful entrepreneurs and industry experts",
      mentors: [
        "Sarah Tan - Ex-Google VP, 3 successful exits",
        "David Chen - Ex-Microsoft CTO, AI/ML expert",
        "Raj Mehta - Ex-Sequoia Capital Asia",
        "Grace Lee - Ex-McKinsey, INSEAD MBA"
      ],
      focus: ["Business strategy", "Team building", "Fundraising", "Market expansion"]
    },
    {
      id: 2,
      name: "Technical Mentorship",
      duration: "6 months",
      cost: "SGD 5K",
      spots: "25 startups",
      status: "Applications Open",
      description: "Specialized technical guidance for tech startups",
      mentors: [
        "Alex Wong - Ex-Facebook Senior Engineer",
        "Maria Garcia - Ex-Apple Product Manager",
        "James Kim - Ex-Amazon Solutions Architect"
      ],
      focus: ["Product development", "Technical architecture", "DevOps", "Security"]
    }
  ]

  const fundingPrograms = [
    {
      id: 1,
      name: "GrowthLab Investment Fund",
      amount: "SGD 10M",
      focus: "Series A & B rounds",
      status: "Active",
      description: "Direct investment in GrowthLab portfolio companies",
      criteria: [
        "Previous GrowthLab program graduate",
        "Strong growth metrics",
        "Experienced management team",
        "Clear path to profitability"
      ]
    },
    {
      id: 2,
      name: "Government Grant Matching",
      amount: "Up to SGD 100K",
      focus: "Innovation & R&D",
      status: "Active",
      description: "Matching grants for government-funded innovation projects",
      criteria: [
        "Eligible for government grants",
        "Innovation-focused project",
        "Clear commercialization plan",
        "Singapore-based operations"
      ]
    }
  ]

  const partnershipPrograms = [
    {
      id: 1,
      name: "Corporate Innovation Lab",
      partners: ["Google Cloud", "Microsoft", "AWS"],
      duration: "12 months",
      status: "Applications Open",
      description: "Collaborate with tech giants on innovative solutions",
      benefits: [
        "Access to cutting-edge technology",
        "Corporate partnership opportunities",
        "Joint go-to-market strategies",
        "Technical resources and support"
      ]
    },
    {
      id: 2,
      name: "University Research Partnership",
      partners: ["NUS", "NTU", "SMU"],
      duration: "18 months",
      status: "Applications Open",
      description: "Bridge academic research with commercial applications",
      benefits: [
        "Access to research facilities",
        "Academic collaboration",
        "IP development support",
        "Student talent pipeline"
      ]
    }
  ]

  const upcomingPrograms = [
    {
      id: 1,
      name: "AI Startup Bootcamp",
      startDate: "May 1, 2025",
      duration: "2 weeks",
      cost: "SGD 2K",
      spots: "20 startups",
      description: "Intensive bootcamp focused on AI/ML startup development",
      highlights: ["Technical workshops", "AI ethics training", "Investor networking", "Demo day"]
    },
    {
      id: 2,
      name: "Sustainability Innovation Challenge",
      startDate: "June 15, 2025",
      duration: "3 months",
      prize: "SGD 50K",
      spots: "15 teams",
      description: "Competition for sustainable technology solutions",
      highlights: ["Expert judging panel", "Industry mentorship", "Pilot opportunities", "Media exposure"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full hover:bg-white/30 transition-colors">
                <Rocket className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
              GrowthLab Programmes
            </h1>
            <p className="text-lg md:text-2xl text-blue-100 mb-8 leading-relaxed max-w-4xl mx-auto">
              Accelerate your startup's growth with our comprehensive programs, 
              mentorship, and funding opportunities designed for every stage of your journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/programmes/accelerator"
                className="bg-[#F59E0B] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#F59E0B]/90 transition-colors shadow-lg hover:shadow-xl"
              >
                View Programs
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors shadow-lg hover:shadow-xl"
              >
                Schedule a Call
              </Link>
              <Link
                href="/signup"
                className="border-2 border-white/50 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started Free
              </Link>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">500+</div>
                <div className="text-sm text-white/80">Startups Supported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">SGD 50M+</div>
                <div className="text-sm text-white/80">Total Funding</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">95%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">100+</div>
                <div className="text-sm text-white/80">Expert Mentors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab("accelerator")}
              className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "accelerator"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0F7377] hover:bg-gray-100 hover:shadow-md"
              }`}
            >
              <Rocket className="w-4 h-4 inline mr-2" />
              <span className="hidden sm:inline">Accelerator</span>
              <span className="sm:hidden">Accel</span>
            </button>
            <button
              onClick={() => setActiveTab("mentorship")}
              className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "mentorship"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0F7377] hover:bg-gray-100 hover:shadow-md"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              <span className="hidden sm:inline">Mentorship</span>
              <span className="sm:hidden">Mentor</span>
            </button>
            <button
              onClick={() => setActiveTab("funding")}
              className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "funding"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0F7377] hover:bg-gray-100 hover:shadow-md"
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              <span className="hidden sm:inline">Funding</span>
              <span className="sm:hidden">Fund</span>
            </button>
            <button
              onClick={() => setActiveTab("partnership")}
              className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "partnership"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0F7377] hover:bg-gray-100 hover:shadow-md"
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              <span className="hidden sm:inline">Partnerships</span>
              <span className="sm:hidden">Partner</span>
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === "upcoming"
                  ? "bg-[#0F7377] text-white shadow-lg"
                  : "text-gray-600 hover:text-[#0F7377] hover:bg-gray-100 hover:shadow-md"
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              <span className="hidden sm:inline">Upcoming</span>
              <span className="sm:hidden">Soon</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Accelerator Programs */}
        {activeTab === "accelerator" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Accelerator Programs</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transform your startup with our comprehensive accelerator programs designed for different growth stages
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {acceleratorPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{program.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium self-start ${
                        program.status === "Applications Open" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {program.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-6 text-sm md:text-base">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.funding}</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.equity} equity</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.spots}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Key Highlights</h4>
                      <ul className="space-y-2">
                        {program.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start text-xs md:text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Requirements</h4>
                      <ul className="space-y-2">
                        {program.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start text-xs md:text-sm text-gray-600">
                            <Star className="w-3 h-3 md:w-4 md:h-4 text-[#0F7377] mr-2 mt-0.5 flex-shrink-0" />
                            <span>{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs md:text-sm text-gray-500">
                          <strong>Deadline:</strong> {program.deadline}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href="/programmes/accelerator/apply"
                            className="bg-[#0F7377] text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                          >
                            Apply Now
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                          </Link>
                          <Link
                            href="/contact"
                            className="border border-[#0F7377] text-[#0F7377] px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377] hover:text-white transition-colors flex items-center justify-center"
                          >
                            Learn More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mentorship Programs */}
        {activeTab === "mentorship" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Mentorship Programs</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get personalized guidance from successful entrepreneurs, investors, and industry experts
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {mentorshipPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{program.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.cost}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.spots}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.status}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Featured Mentors</h4>
                      <div className="space-y-2">
                        {program.mentors.map((mentor, index) => (
                          <div key={index} className="flex items-start text-xs md:text-sm text-gray-600">
                            <Users className="w-3 h-3 md:w-4 md:h-4 text-[#0F7377] mr-2 mt-0.5 flex-shrink-0" />
                            <span>{mentor}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Focus Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.focus.map((area, index) => (
                          <span key={index} className="px-2 md:px-3 py-1 bg-[#0F7377]/10 text-[#0F7377] text-xs md:text-sm rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/mentorship"
                        className="flex-1 bg-[#0F7377] text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        Connect with Mentors
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Link>
                      <Link
                        href="/contact"
                        className="border border-[#0F7377] text-[#0F7377] px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377] hover:text-white transition-colors flex items-center justify-center"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Funding Programs */}
        {activeTab === "funding" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Funding Opportunities</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Access various funding sources to fuel your startup's growth and expansion
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {fundingPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{program.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.amount}</span>
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.focus}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.status}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Eligibility Criteria</h4>
                      <ul className="space-y-2">
                        {program.criteria.map((criterion, index) => (
                          <li key={index} className="flex items-start text-xs md:text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/funding"
                        className="flex-1 bg-[#0F7377] text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        Explore Funding
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Link>
                      <Link
                        href="/contact"
                        className="border border-[#0F7377] text-[#0F7377] px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377] hover:text-white transition-colors flex items-center justify-center"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partnership Programs */}
        {activeTab === "partnership" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Strategic Partnerships</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Collaborate with leading corporations, universities, and organizations to accelerate your growth
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {partnershipPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{program.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.status}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Partners</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.partners.map((partner, index) => (
                          <span key={index} className="px-2 md:px-3 py-1 bg-[#0F7377]/10 text-[#0F7377] text-xs md:text-sm rounded-full">
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Key Benefits</h4>
                      <ul className="space-y-2">
                        {program.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-xs md:text-sm text-gray-600">
                            <Zap className="w-3 h-3 md:w-4 md:h-4 text-[#0F7377] mr-2 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/contact"
                        className="flex-1 bg-[#0F7377] text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        Partner with Us
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Link>
                      <Link
                        href="/about"
                        className="border border-[#0F7377] text-[#0F7377] px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377] hover:text-white transition-colors flex items-center justify-center"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Programs */}
        {activeTab === "upcoming" && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Programs</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Don't miss out on these exciting opportunities coming soon
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {upcomingPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{program.name}</h3>
                    <p className="text-gray-600 mb-6 text-sm md:text-base">{program.description}</p>
                    
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.startDate}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.cost || program.prize}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 text-[#0F7377] mr-2 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-gray-600">{program.spots}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.highlights.map((highlight, index) => (
                          <span key={index} className="px-2 md:px-3 py-1 bg-[#0F7377]/10 text-[#0F7377] text-xs md:text-sm rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href="/contact"
                        className="flex-1 bg-[#0F7377] text-white px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        Register Interest
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                      </Link>
                      <Link
                        href="/events"
                        className="border border-[#0F7377] text-[#0F7377] px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-[#0F7377] hover:text-white transition-colors flex items-center justify-center"
                      >
                        View Events
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377] mb-2">500+</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">Startups Supported</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377] mb-2">SGD 50M+</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">Total Funding</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377] mb-2">95%</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">Success Rate</div>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-[#0F7377] mb-2">100+</div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">Expert Mentors</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Accelerate Your Startup?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-10 max-w-3xl mx-auto">
            Join hundreds of successful startups that have transformed their businesses with GrowthLab programmes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/programmes/accelerator/apply"
              className="bg-[#F59E0B] text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-[#F59E0B]/90 transition-colors shadow-lg hover:shadow-xl"
            >
              Apply Now
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#0F7377] transition-colors shadow-lg hover:shadow-xl"
            >
              Schedule a Call
            </Link>
            <Link
              href="/signup"
              className="border-2 border-white/50 text-white px-6 md:px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
          </div>
          
          {/* Quick Access Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <Link href="/programmes/accelerator" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              <Rocket className="h-4 w-4" />
              <span>Accelerator</span>
            </Link>
            <Link href="/mentorship" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              <Users className="h-4 w-4" />
              <span>Mentorship</span>
            </Link>
            <Link href="/funding" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              <DollarSign className="h-4 w-4" />
              <span>Funding</span>
            </Link>
            <Link href="/events" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
