"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowRight,
  Users,
  Rocket,
  Target,
  Award,
  Globe,
  Heart,
  TrendingUp,
  CheckCircle,
  Star,
  Quote,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Building2,
  Lightbulb,
  Shield,
  Zap,
  BookOpen,
  Briefcase,
  DollarSign,
  Clock,
  MessageSquare,
  Play,
  Download,
  Share2,
  Eye,
  ThumbsUp,
  BarChart3,
  Settings,
  UserPlus,
  FileText,
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

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "/team-sarah.jpg",
      bio: "Former VP at Google, 10+ years in tech. Passionate about building the next generation of Asian unicorns.",
      linkedin: "https://linkedin.com/in/sarahchen",
      expertise: ["Product Strategy", "Leadership", "Scaling"],
      experience: "15+ years"
    },
    {
      name: "Marcus Johnson",
      role: "CTO",
      image: "/team-marcus.jpg",
      bio: "Ex-Microsoft engineer, serial entrepreneur. Built and sold 3 startups before joining GrowthLab.",
      linkedin: "https://linkedin.com/in/marcusjohnson",
      expertise: ["Technology", "Architecture", "Innovation"],
      experience: "12+ years"
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "/team-priya.jpg",
      bio: "Former McKinsey consultant, expert in scaling operations. Led 50+ startups through growth phases.",
      linkedin: "https://linkedin.com/in/priyasharma",
      expertise: ["Operations", "Strategy", "Growth"],
      experience: "10+ years"
    },
    {
      name: "Alex Kim",
      role: "Head of Community",
      image: "/team-alex.jpg",
      bio: "Community builder with 15+ years experience. Built thriving communities for 100+ startups.",
      linkedin: "https://linkedin.com/in/alexkim",
      expertise: ["Community", "Networking", "Events"],
      experience: "15+ years"
    }
  ]

  const stats = [
    { label: "Active Members", value: "2,847+", icon: Users },
    { label: "Startups Accelerated", value: "156+", icon: Rocket },
    { label: "Total Funding Raised", value: "$47.2M", icon: TrendingUp },
    { label: "Success Rate", value: "85%", icon: Award },
    { label: "Countries", value: "12+", icon: Globe },
    { label: "Years Experience", value: "5+", icon: Calendar }
  ]

  const values = [
    {
      title: "Community First",
      description: "We believe that strong communities are the foundation of successful startups. Every decision we make prioritizes community building and member success.",
      icon: Users
    },
    {
      title: "Innovation Driven",
      description: "We're constantly pushing the boundaries of what's possible in startup acceleration, using cutting-edge technology and methodologies.",
      icon: Rocket
    },
    {
      title: "Results Oriented",
      description: "Our success is measured by our members' success. We focus on tangible outcomes and measurable impact for every startup we work with.",
      icon: Target
    },
    {
      title: "Transparent & Honest",
      description: "We believe in open communication, honest feedback, and transparent processes. Trust is the foundation of all our relationships.",
      icon: Heart
    }
  ]

  const features = [
    {
      title: "Accelerator Program",
      description: "12-week intensive program with mentorship, funding, and networking opportunities",
      icon: Rocket,
      link: "/programmes/accelerator",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Co-founder Matching",
      description: "AI-powered platform to find your perfect co-founder based on skills and vision",
      icon: Users,
      link: "/co-founder-matching",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Funding Marketplace",
      description: "Connect with investors and access funding opportunities across Asia",
      icon: DollarSign,
      link: "/funding",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Mentorship Network",
      description: "Access to 500+ industry experts and successful entrepreneurs",
      icon: Award,
      link: "/mentorship",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Job Board",
      description: "Find talent or get hired at the most innovative startups",
      icon: Briefcase,
      link: "/jobs",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Events & Networking",
      description: "Join workshops, meetups, and networking events across Asia",
      icon: Calendar,
      link: "/events",
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Sports Club",
      description: "Network while staying active with our comprehensive sports community",
      icon: Heart,
      link: "/sports-club",
      color: "from-red-500 to-red-600"
    },
    {
      title: "Global Expansion",
      description: "Expand your startup across multiple Asian markets",
      icon: Globe,
      link: "/global",
      color: "from-teal-500 to-teal-600"
    }
  ]

  const keyFeatures = [
    {
      title: "AI-Powered Matching",
      description: "Advanced algorithms match founders, co-founders, and opportunities",
      icon: Zap,
      highlight: true
    },
    {
      title: "Real-time Analytics",
      description: "Track your startup's progress with comprehensive dashboards",
      icon: BarChart3,
      highlight: true
    },
    {
      title: "Mobile-First Design",
      description: "Access all features on any device with our responsive platform",
      icon: Smartphone,
      highlight: true
    },
    {
      title: "Secure Platform",
      description: "Enterprise-grade security for all your sensitive data",
      icon: Shield,
      highlight: true
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock assistance from our dedicated support team",
      icon: Headphones,
      highlight: false
    },
    {
      title: "Multi-language",
      description: "Available in English, Chinese, Japanese, Korean, and more",
      icon: Globe,
      highlight: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F7377] to-[#1E293B] text-white py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center max-w-5xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border border-white/20 hover:bg-white/30 transition-colors">
              <Heart className="w-3 h-3 mr-2" />
              About GrowthLab
              </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Powering Asia's Next{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 bg-clip-text text-transparent">
                Unicorns
              </span>
              </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              We're on a mission to build the most comprehensive startup ecosystem in Asia, 
              connecting founders, investors, and mentors to create the next generation of unicorns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/signup">
                  Join Our Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/contact">
                  Get in Touch
                  </Link>
                </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/programmes">
                  View Programs
                  </Link>
                </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">2,847+</div>
                <div className="text-sm text-white/80">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">156+</div>
                <div className="text-sm text-white/80">Startups Accelerated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">$47.2M</div>
                <div className="text-sm text-white/80">Funding Raised</div>
            </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">85%</div>
                <div className="text-sm text-white/80">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Impact</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Numbers that speak to our commitment to startup success across Asia
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Platform Features</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to build, scale, and grow your startup in one comprehensive platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg bg-white dark:bg-gray-800">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{feature.description}</p>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={feature.link}>
                        Learn More
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose GrowthLab?</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Cutting-edge technology and features that set us apart from the competition
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  feature.highlight 
                    ? 'bg-gradient-to-br from-[#0F7377]/10 to-[#1E293B]/10 border-[#0F7377]/30 hover:border-[#0F7377]/50' 
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    feature.highlight 
                      ? 'bg-gradient-to-r from-[#0F7377] to-[#1E293B]' 
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      feature.highlight ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                    }`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    feature.highlight ? 'text-[#0F7377]' : 'text-gray-900 dark:text-white'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                To democratize access to startup resources and create a thriving ecosystem where 
                every entrepreneur has the tools, connections, and support they need to build 
                successful companies.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We believe that great ideas can come from anywhere, and that with the right 
                support and community, any founder can build the next unicorn. Our platform 
                brings together the best of Asia's startup ecosystem in one place.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#0F7377]" />
                  <span className="text-gray-700 dark:text-gray-300">Comprehensive startup resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#0F7377]" />
                  <span className="text-gray-700 dark:text-gray-300">World-class mentorship network</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#0F7377]" />
                  <span className="text-gray-700 dark:text-gray-300">Access to funding opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#0F7377]" />
                  <span className="text-gray-700 dark:text-gray-300">Vibrant community of entrepreneurs</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/startup-team-collaboration.png" 
                alt="Our mission in action"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#0F7377] rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
            </div>
            <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">85%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do at GrowthLab
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800">
              <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The passionate individuals behind GrowthLab's success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800 group">
                <CardContent className="p-6 md:p-8">
                  <Avatar className="h-20 w-20 md:h-24 md:w-24 mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-[#0F7377] font-medium mb-2">{member.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{member.experience}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {member.expertise.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
          </div>

                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        LinkedIn
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/contact">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Contact
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Join Team CTA */}
          <div className="text-center mt-12 md:mt-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Want to Join Our Team?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              We're always looking for passionate individuals who want to make a difference in the startup ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                <Link href="/jobs">
                  View Open Positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">
                  Contact HR Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 bg-gradient-to-br from-[#0F7377] to-[#1E293B] text-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Hear from the entrepreneurs who have built successful companies with GrowthLab
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-[#F59E0B] mr-3" />
                  <div>
                    <h4 className="font-semibold">Sarah Chen</h4>
                    <p className="text-sm text-white/80">Founder, TechFlow</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "GrowthLab transformed our startup journey. The mentorship and community support helped us scale from idea to $10M ARR in just 18 months."
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
                  <Quote className="h-8 w-8 text-[#F59E0B] mr-3" />
                  <div>
                    <h4 className="font-semibold">Marcus Johnson</h4>
                    <p className="text-sm text-white/80">CEO, DataVault</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "The accelerator program gave us the structure and resources we needed to succeed. The network of mentors and investors was invaluable."
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
                  <Quote className="h-8 w-8 text-[#F59E0B] mr-3" />
                  <div>
                    <h4 className="font-semibold">Priya Sharma</h4>
                    <p className="text-sm text-white/80">CTO, GreenTech</p>
                  </div>
                </div>
                <p className="text-white/90 italic">
                  "The technical mentorship program connected me with industry experts who guided our product strategy. Game changer for our startup!"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#F59E0B] fill-current" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </div>

      {/* CTA Section */}
      <div className="py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto max-w-7xl px-4">
          <Card className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white border-0 shadow-2xl">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Join Our Community?</h2>
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto">
                Start your startup journey today and connect with Asia's most innovative entrepreneurs, 
                investors, and mentors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link href="/programmes">
                    View Programs
                  </Link>
                </Button>
          </div>

              {/* Additional Links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Link href="/accelerator" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Rocket className="h-4 w-4" />
                  <span>Accelerator</span>
                </Link>
                <Link href="/co-founder-matching" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Users className="h-4 w-4" />
                  <span>Find Co-founder</span>
                </Link>
                <Link href="/funding" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors">
                  <DollarSign className="h-4 w-4" />
                  <span>Get Funding</span>
                </Link>
                <Link href="/events" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Events</span>
                </Link>
                  </div>
                </CardContent>
              </Card>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Quick Access</h2>
            <p className="text-gray-600 dark:text-gray-300">Everything you need to get started with GrowthLab</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            <Link href="/programmes" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Rocket className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Programs</span>
            </Link>
            
            <Link href="/co-founder-matching" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Co-founder</span>
            </Link>
            
            <Link href="/funding" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Funding</span>
            </Link>
            
            <Link href="/jobs" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Briefcase className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Jobs</span>
            </Link>
            
            <Link href="/events" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Events</span>
            </Link>
            
            <Link href="/sports-club" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Sports</span>
            </Link>
            
            <Link href="/mentorship" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Mentorship</span>
            </Link>
            
            <Link href="/global" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Global</span>
            </Link>
            
            <Link href="/resources" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Resources</span>
            </Link>
            
            <Link href="/services" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <Settings className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Services</span>
            </Link>
            
            <Link href="/news" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <FileText className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">News</span>
                </Link>
            
            <Link href="/contact" className="group p-4 rounded-lg bg-white dark:bg-gray-800 hover:shadow-lg transition-all duration-300 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-[#0F7377] group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">Contact</span>
                </Link>
          </div>
        </div>
      </div>
    </div>
  )
}