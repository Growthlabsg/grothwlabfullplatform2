"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Users, Award, Building2, Mail, Linkedin, 
  ArrowRight, Star, MapPin, Calendar, Phone,
  Globe, ExternalLink, Download, Heart, Zap,
  Target, TrendingUp, Shield, Lightbulb, 
  CheckCircle, Plus, Minus, ChevronDown, ChevronUp,
  MessageSquare, UserCheck, Clock, BookOpen,
  BarChart3, PieChart, Activity, Briefcase,
  GraduationCap, Code, Database, Cloud,
  Smartphone, Monitor, Headphones, Settings
} from "lucide-react"

export default function PeoplePage() {
  const [activeTab, setActiveTab] = useState("team")
  const [expandedBio, setExpandedBio] = useState<number | null>(null)
  const [showAllMentors, setShowAllMentors] = useState(false)
  const [showAllPartners, setShowAllPartners] = useState(false)

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Tan",
      role: "Founder & CEO",
      company: "GrowthLab",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Former VP at Google, 15+ years in tech. Led 3 successful exits. Passionate about building the next generation of Southeast Asian startups.",
      fullBio: "Sarah brings over 15 years of experience in technology and venture capital. As a former VP at Google, she led product development for over 50 million users across Southeast Asia. She has been instrumental in 3 successful startup exits totaling over $500M in value. Sarah holds an MBA from Stanford and a Computer Science degree from NUS. She's passionate about empowering underrepresented founders and building sustainable tech ecosystems.",
      linkedin: "https://linkedin.com/in/sarah-tan",
      email: "sarah@growthlab.sg",
      location: "Singapore",
      expertise: ["Product Strategy", "Go-to-Market", "Leadership"],
      achievements: ["3 Successful Exits", "50M+ Users Impacted", "15+ Years Experience"]
    },
    {
      id: 2,
      name: "David Chen",
      role: "CTO & Partner",
      company: "GrowthLab",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Ex-Microsoft engineer, AI/ML specialist. Built scalable systems for 100M+ users. Expert in deep tech and technical architecture.",
      fullBio: "David is a technical visionary with 12+ years building enterprise-grade systems. At Microsoft, he led the development of AI-powered features used by 100M+ users globally. He holds a PhD in Computer Science from MIT and has published 20+ research papers in AI/ML. David specializes in helping startups build scalable, secure, and efficient technical architectures. He's also an active contributor to open-source projects with 10K+ GitHub stars.",
      linkedin: "https://linkedin.com/in/david-chen",
      email: "david@growthlab.sg",
      location: "Singapore",
      expertise: ["AI/ML", "System Architecture", "Deep Tech"],
      achievements: ["100M+ Users", "20+ Research Papers", "10K+ GitHub Stars"]
    },
    {
      id: 3,
      name: "Raj Mehta",
      role: "Managing Partner",
      company: "GrowthLab",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Former investment director at Sequoia Capital Asia. 20+ years in venture capital. Specializes in fintech and enterprise SaaS.",
      fullBio: "Raj brings two decades of venture capital experience, having led investments in 50+ startups across Asia. At Sequoia Capital Asia, he managed a $2B portfolio and achieved 15 successful exits. He holds an MBA from Wharton and a Finance degree from IIM. Raj specializes in fintech and enterprise SaaS, with deep expertise in regulatory compliance and market expansion. He's known for his strategic thinking and ability to identify high-potential opportunities early.",
      linkedin: "https://linkedin.com/in/raj-mehta",
      email: "raj@growthlab.sg",
      location: "Singapore",
      expertise: ["Venture Capital", "Fintech", "Enterprise SaaS"],
      achievements: ["$2B Portfolio", "15 Successful Exits", "20+ Years VC Experience"]
    },
    {
      id: 4,
      name: "Grace Lee",
      role: "Investment Associate",
      company: "GrowthLab",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      bio: "Ex-McKinsey consultant, MBA from INSEAD. Focuses on healthtech and sustainability investments. Strong analytical background.",
      fullBio: "Grace combines deep analytical skills with passion for impact investing. At McKinsey, she advised Fortune 500 companies on digital transformation and sustainability initiatives. She holds an MBA from INSEAD and a Chemical Engineering degree from NUS. Grace specializes in healthtech and sustainability investments, with particular expertise in regulatory affairs and market analysis. She's fluent in 4 languages and has worked across 15+ countries in Asia-Pacific.",
      linkedin: "https://linkedin.com/in/grace-lee",
      email: "grace@growthlab.sg",
      location: "Singapore",
      expertise: ["Healthtech", "Sustainability", "Market Analysis"],
      achievements: ["INSEAD MBA", "15+ Countries", "4 Languages"]
    }
  ]

  const mentors = [
    {
      id: 1,
      name: "Dr. Anita Patel",
      role: "HealthTech Expert",
      company: "Former CTO, Johnson & Johnson",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec0?w=150&h=150&fit=crop&crop=face",
      bio: "Leading expert in digital health and medical devices. 25+ years in healthcare innovation. Advised 50+ healthtech startups.",
      linkedin: "https://linkedin.com/in/anita-patel",
      email: "anita@mentor.growthlab.sg",
      expertise: ["Digital Health", "Medical Devices", "Regulatory Affairs"],
      location: "Singapore"
    },
    {
      id: 2,
      name: "Tan Wei Ming",
      role: "FinTech Specialist",
      company: "Ex-CEO, DBS Digital",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      bio: "Pioneered digital banking in Asia. Expert in regulatory compliance and scaling fintech operations. Mentor to 30+ fintech startups.",
      linkedin: "https://linkedin.com/in/wei-ming-tan",
      email: "wei-ming@mentor.growthlab.sg",
      expertise: ["Digital Banking", "Regulatory Compliance", "Fintech Scaling"],
      location: "Singapore"
    },
    {
      id: 3,
      name: "Nguyen Thi Minh",
      role: "Sustainability Expert",
      company: "Founder, GreenTech Ventures",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      bio: "Leading voice in sustainable technology. Built 3 successful green tech companies. Passionate about climate innovation.",
      linkedin: "https://linkedin.com/in/nguyen-minh",
      email: "minh@mentor.growthlab.sg",
      expertise: ["Sustainability", "Climate Tech", "Green Innovation"],
      location: "Vietnam"
    },
    {
      id: 4,
      name: "James Rodriguez",
      role: "AI/ML Expert",
      company: "Former Principal Scientist, Google AI",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Leading AI researcher with 20+ years experience. Published 100+ papers in top-tier conferences. Expert in deep learning and computer vision.",
      linkedin: "https://linkedin.com/in/james-rodriguez",
      email: "james@mentor.growthlab.sg",
      expertise: ["AI/ML", "Deep Learning", "Computer Vision"],
      location: "Singapore"
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "Marketing & Growth Expert",
      company: "Former CMO, Grab",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      bio: "Built marketing strategies for 50M+ users across Southeast Asia. Expert in growth hacking, brand building, and customer acquisition.",
      linkedin: "https://linkedin.com/in/lisa-wang",
      email: "lisa@mentor.growthlab.sg",
      expertise: ["Growth Marketing", "Brand Building", "Customer Acquisition"],
      location: "Singapore"
    },
    {
      id: 6,
      name: "Michael Kim",
      role: "Legal & Compliance Expert",
      company: "Partner, Allen & Gledhill",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Leading corporate lawyer specializing in startup law. Advised 200+ startups on fundraising, IP protection, and regulatory compliance.",
      linkedin: "https://linkedin.com/in/michael-kim",
      email: "michael@mentor.growthlab.sg",
      expertise: ["Startup Law", "IP Protection", "Regulatory Compliance"],
      location: "Singapore"
    }
  ]

  const partners = [
    {
      id: 1,
      name: "Singapore Economic Development Board",
      role: "Government Partner",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      description: "Strategic partner providing grants, tax incentives, and regulatory support for startups in Singapore.",
      website: "https://www.edb.gov.sg",
      contact: "partnerships@edb.gov.sg",
      category: "Government",
      benefits: ["Grants & Funding", "Tax Incentives", "Regulatory Support"]
    },
    {
      id: 2,
      name: "Sequoia Capital Asia",
      role: "Investment Partner",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
      description: "Leading venture capital firm with $8B+ AUM. Co-invests in GrowthLab portfolio companies.",
      website: "https://www.sequoiacap.com/asia",
      contact: "partnerships@sequoiacap.com",
      category: "Investment",
      benefits: ["Co-investment", "Network Access", "Strategic Guidance"]
    },
    {
      id: 3,
      name: "Google Cloud",
      role: "Technology Partner",
      image: "https://images.unsplash.com/photo-1611162617213-9d7acecc0868?w=150&h=150&fit=crop",
      description: "Provides cloud infrastructure, AI/ML tools, and technical support to GrowthLab startups.",
      website: "https://cloud.google.com",
      contact: "startups@google.com",
      category: "Technology",
      benefits: ["Cloud Credits", "AI/ML Tools", "Technical Support"]
    },
    {
      id: 4,
      name: "Microsoft for Startups",
      role: "Technology Partner",
      image: "https://images.unsplash.com/photo-1607003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      description: "Provides Azure credits, development tools, and go-to-market support for startups.",
      website: "https://startups.microsoft.com",
      contact: "partnerships@microsoft.com",
      category: "Technology",
      benefits: ["Azure Credits", "Development Tools", "Go-to-Market Support"]
    },
    {
      id: 5,
      name: "AWS Activate",
      role: "Technology Partner",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150&h=150&fit=crop",
      description: "Amazon's global startup program providing AWS credits and technical resources.",
      website: "https://aws.amazon.com/activate",
      contact: "activate@amazon.com",
      category: "Technology",
      benefits: ["AWS Credits", "Technical Resources", "Training Programs"]
    },
    {
      id: 6,
      name: "DBS Bank",
      role: "Financial Partner",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
      description: "Leading digital bank providing banking services, fintech APIs, and financial advisory.",
      website: "https://www.dbs.com",
      contact: "startups@dbs.com",
      category: "Financial",
      benefits: ["Banking Services", "Fintech APIs", "Financial Advisory"]
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
                <Users className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Meet the GrowthLab Team
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto">
              Our experienced team of entrepreneurs, investors, and industry experts are dedicated to helping startups succeed in Southeast Asia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/about/apply">
                <button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center w-full sm:w-auto">
                  Join Our Program
                  <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </Link>
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold transition-all duration-300 border border-white/30 flex items-center justify-center w-full sm:w-auto">
                <Download className="mr-2 sm:mr-3 w-5 h-5 sm:w-6 sm:h-6" />
                Download Team Directory
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap sm:flex-nowrap space-x-2 sm:space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("team")}
              className={`py-3 sm:py-4 px-3 sm:px-2 border-b-2 font-medium transition-colors text-sm sm:text-base whitespace-nowrap ${
                activeTab === "team"
                  ? "border-[#0F7377] text-[#0F7377]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              Core Team
            </button>
            <button
              onClick={() => setActiveTab("mentors")}
              className={`py-3 sm:py-4 px-3 sm:px-2 border-b-2 font-medium transition-colors text-sm sm:text-base whitespace-nowrap ${
                activeTab === "mentors"
                  ? "border-[#0F7377] text-[#0F7377]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Award className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              Mentors
            </button>
            <button
              onClick={() => setActiveTab("partners")}
              className={`py-3 sm:py-4 px-3 sm:px-2 border-b-2 font-medium transition-colors text-sm sm:text-base whitespace-nowrap ${
                activeTab === "partners"
                  ? "border-[#0F7377] text-[#0F7377]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
              Partners
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-12">
        {/* Team Members */}
        {activeTab === "team" && (
          <div>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Our Leadership Team</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Meet the passionate individuals driving GrowthLab's mission to build the next generation of Southeast Asian startups.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#0F7377]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{member.name}</h3>
                    <p className="text-[#0F7377] font-medium text-sm sm:text-base mb-1">{member.role}</p>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{member.company}</p>
                    <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{member.bio}</p>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                      {member.expertise.slice(0, 2).map((skill, index) => (
                        <span key={index} className="bg-[#0F7377]/10 text-[#0F7377] text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {/* Expandable Bio */}
                    <button
                      onClick={() => setExpandedBio(expandedBio === member.id ? null : member.id)}
                      className="text-[#0F7377] text-xs sm:text-sm font-medium mb-3 sm:mb-4 flex items-center hover:underline"
                    >
                      {expandedBio === member.id ? (
                        <>
                          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Read More
                        </>
                      )}
                    </button>
                    
                    {expandedBio === member.id && (
                      <div className="mb-3 sm:mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">{member.fullBio}</p>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-1">Expertise:</h4>
                            <div className="flex flex-wrap gap-1">
                              {member.expertise.map((skill, index) => (
                                <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-gray-900 mb-1">Achievements:</h4>
                            <div className="space-y-1">
                              {member.achievements.map((achievement, index) => (
                                <div key={index} className="flex items-center text-xs text-gray-700">
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#0F7377] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors text-center flex items-center justify-center"
                      >
                        <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Connect
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors text-center flex items-center justify-center"
                      >
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mentors */}
        {activeTab === "mentors" && (
          <div>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Expert Mentors</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Our network of experienced mentors provides invaluable guidance and industry expertise to help startups scale and succeed.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {(showAllMentors ? mentors : mentors.slice(0, 3)).map((mentor) => (
                <div key={mentor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#0F7377]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{mentor.name}</h3>
                    <p className="text-[#0F7377] font-medium text-sm sm:text-base mb-1">{mentor.role}</p>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">{mentor.company}</p>
                    <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{mentor.bio}</p>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                      {mentor.expertise.slice(0, 2).map((skill, index) => (
                        <span key={index} className="bg-[#0F7377]/10 text-[#0F7377] text-xs px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <a
                        href={mentor.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#0F7377] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors text-center flex items-center justify-center"
                      >
                        <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Connect
                      </a>
                      <a
                        href={`mailto:${mentor.email}`}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors text-center flex items-center justify-center"
                      >
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Email
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {mentors.length > 3 && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => setShowAllMentors(!showAllMentors)}
                  className="bg-[#0F7377] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0F7377]/90 transition-colors flex items-center mx-auto"
                >
                  {showAllMentors ? (
                    <>
                      <Minus className="mr-2 h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Show All Mentors
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Partners */}
        {activeTab === "partners" && (
          <div>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Strategic Partners</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                We collaborate with leading organizations to provide comprehensive support and resources for our startups.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {(showAllPartners ? partners : partners.slice(0, 3)).map((partner) => (
                <div key={partner.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#0F7377]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{partner.name}</h3>
                    <p className="text-[#0F7377] font-medium text-sm sm:text-base mb-1">{partner.role}</p>
                    <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{partner.description}</p>
                    
                    {/* Benefits Tags */}
                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                      {partner.benefits.slice(0, 2).map((benefit, index) => (
                        <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#0F7377] text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#0F7377]/90 transition-colors text-center flex items-center justify-center"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Website
                      </a>
                      <a
                        href={`mailto:${partner.contact}`}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-200 transition-colors text-center flex items-center justify-center"
                      >
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        Contact
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {partners.length > 3 && (
              <div className="text-center mt-6 sm:mt-8">
                <button
                  onClick={() => setShowAllPartners(!showAllPartners)}
                  className="bg-[#0F7377] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0F7377]/90 transition-colors flex items-center mx-auto"
                >
                  {showAllPartners ? (
                    <>
                      <Minus className="mr-2 h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Show All Partners
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">GrowthLab by the Numbers</h2>
            <p className="text-base sm:text-lg text-gray-600">
              Our team's impact in the Southeast Asian startup ecosystem
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#0F7377] mb-1 sm:mb-2">4</div>
              <div className="text-xs sm:text-sm text-gray-600">Core Team Members</div>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#0F7377] mb-1 sm:mb-2">50+</div>
              <div className="text-xs sm:text-sm text-gray-600">Expert Mentors</div>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#0F7377] mb-1 sm:mb-2">25+</div>
              <div className="text-xs sm:text-sm text-gray-600">Strategic Partners</div>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-[#0F7377] mb-1 sm:mb-2">100+</div>
              <div className="text-xs sm:text-sm text-gray-600">Startups Supported</div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Team CTA */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Join Our Team</h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a difference in the startup ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/careers">
              <button className="bg-white text-[#0F7377] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center w-full sm:w-auto">
                <Briefcase className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                View Open Positions
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-[#0F7377] transition-colors flex items-center justify-center w-full sm:w-auto">
                <MessageSquare className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
