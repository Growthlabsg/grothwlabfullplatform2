"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Rocket, Users, DollarSign, GraduationCap, Shield, Globe, Zap, 
  Target, Lightbulb, Star, ArrowRight, CheckCircle, Building2,
  MessageSquare, FileText, Briefcase, Heart, Award, TrendingUp,
  Calendar, BookOpen, Settings, Camera, Mic, Monitor, Smartphone,
  Laptop, Tablet, Headphones, Video, Share2, Eye, ThumbsUp,
  BarChart3, UserPlus, Clock, ExternalLink, Play, Download
} from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function ServicesPage() {
  const services = [
    {
      icon: Rocket,
      title: "Accelerator Program",
      description: "A 3-month intensive program with SGD 500K funding, mentorship, and resources to scale your startup.",
      features: [
        "SGD 500K funding opportunity",
        "Expert mentorship network",
        "Workspace and resources",
        "Demo day presentation",
        "Investor connections"
      ],
      color: "from-[#0F7377] to-[#0F7377]/80",
      bgColor: "bg-[#0F7377]/10",
      textColor: "text-[#0F7377]",
      image: "/singapore-startup-collaboration.png",
      link: "/programmes/accelerator",
      buttonText: "Apply Now"
    },
    {
      icon: Users,
      title: "Co-Founder Matching",
      description: "AI-powered matching platform to find your perfect co-founder through compatibility assessment and trial projects.",
      features: [
        "AI-powered matching algorithm",
        "Compatibility assessment",
        "Trial project collaboration",
        "Team formation tools",
        "Success tracking"
      ],
      color: "from-[#F59E0B] to-[#F59E0B]/80",
      bgColor: "bg-[#F59E0B]/10",
      textColor: "text-[#F59E0B]",
      image: "/professional-connections.png",
      link: "/co-founder-matching",
      buttonText: "Find Co-founder"
    },
    {
      icon: DollarSign,
      title: "Funding Marketplace",
      description: "Connect with investors and apply for grants ranging from SGD 50,000 to 500,000.",
      features: [
        "Investor network access",
        "Grant applications",
        "Financial modeling tools",
        "Due diligence support",
        "Investment tracking"
      ],
      color: "from-[#10B981] to-[#10B981]/80",
      bgColor: "bg-[#10B981]/10",
      textColor: "text-[#10B981]",
      image: "/fintech-flow.png",
      link: "/funding",
      buttonText: "Get Funding"
    },
    {
      icon: GraduationCap,
      title: "Startup School",
      description: "Learn from experienced founders and industry experts through our curated courses and workshops.",
      features: [
        "Expert-led courses",
        "Industry workshops",
        "Skill development",
        "Certification programs",
        "Peer learning"
      ],
      color: "from-[#8B5CF6] to-[#8B5CF6]/80",
      bgColor: "bg-[#8B5CF6]/10",
      textColor: "text-[#8B5CF6]",
      image: "/machine-learning-concept.png",
      link: "/startup-school",
      buttonText: "Start Learning"
    },
    {
      icon: MessageSquare,
      title: "Communication Hub",
      description: "Direct messaging, video calls, and secure file sharing with integrated WhatsApp and Telegram.",
      features: [
        "Direct messaging",
        "Video conferencing",
        "File sharing",
        "WhatsApp integration",
        "Telegram integration"
      ],
      color: "from-[#06B6D4] to-[#06B6D4]/80",
      bgColor: "bg-[#06B6D4]/10",
      textColor: "text-[#06B6D4]",
      image: "/confident-professional.png",
      link: "/communication",
      buttonText: "Start Chatting"
    },
    {
      icon: Briefcase,
      title: "Job Marketplace",
      description: "Hire talent, post jobs, and build your team with comprehensive hiring tools.",
      features: [
        "Job posting platform",
        "Talent matching",
        "Resume builder",
        "Interview scheduling",
        "Hiring analytics"
      ],
      color: "from-[#EF4444] to-[#EF4444]/80",
      bgColor: "bg-[#EF4444]/10",
      textColor: "text-[#EF4444]",
      image: "/marketing-expert.png",
      link: "/jobs",
      buttonText: "Browse Jobs"
    }
  ]

  const additionalServices = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with multi-factor authentication and comprehensive audit logging.",
      color: "bg-[#0F7377]/10",
      textColor: "text-[#0F7377]",
      link: "/settings/security"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Connect with founders, investors, and mentors across Asia's most vibrant startup ecosystems.",
      color: "bg-[#F59E0B]/10",
      textColor: "text-[#F59E0B]",
      link: "/global"
    },
    {
      icon: Zap,
      title: "Rapid Growth",
      description: "Accelerate your startup with proven methodologies, funding opportunities, and strategic partnerships.",
      color: "bg-[#10B981]/10",
      textColor: "text-[#10B981]",
      link: "/programmes"
    },
    {
      icon: FileText,
      title: "Resource Library",
      description: "Templates, guides, and tools to help you build and scale your startup.",
      color: "bg-[#8B5CF6]/10",
      textColor: "text-[#8B5CF6]",
      link: "/resources"
    },
    {
      icon: Calendar,
      title: "Events & Networking",
      description: "Join workshops, meetups, and networking events across Asia.",
      color: "bg-[#06B6D4]/10",
      textColor: "text-[#06B6D4]",
      link: "/events"
    },
    {
      icon: Heart,
      title: "Sports Club",
      description: "Network while staying active with our comprehensive sports community.",
      color: "bg-[#EF4444]/10",
      textColor: "text-[#EF4444]",
      link: "/sports-club"
    },
    {
      icon: Award,
      title: "Mentorship",
      description: "Access to 500+ industry experts and successful entrepreneurs.",
      color: "bg-[#8B5CF6]/10",
      textColor: "text-[#8B5CF6]",
      link: "/mentorship"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your startup's progress with comprehensive analytics and insights.",
      color: "bg-[#10B981]/10",
      textColor: "text-[#10B981]",
      link: "/analytics"
    }
  ]

  const platformFeatures = [
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Access all features on any device with our responsive platform",
      highlight: true
    },
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Advanced algorithms match founders, co-founders, and opportunities",
      highlight: true
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security for all your sensitive data",
      highlight: true
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock assistance from our dedicated support team",
      highlight: false
    },
    {
      icon: Globe,
      title: "Multi-language",
      description: "Available in English, Chinese, Japanese, Korean, and more",
      highlight: false
    },
    {
      icon: Video,
      title: "Video Integration",
      description: "Built-in video calls, screen sharing, and recording capabilities",
      highlight: false
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F7377] to-[#1E293B] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/20 hover:bg-white/30 transition-colors">
              <Target className="w-3 h-3 mr-2" />
              Our Services
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Complete Startup Ecosystem
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
              From ideation to unicorn, we provide everything you need to build, scale, and succeed in Asia's most dynamic startup ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-4 md:mb-6">
              Core Services
            </h2>
            <p className="text-lg text-[#64748B] max-w-3xl mx-auto">
              Our comprehensive suite of services is designed to support startups at every stage of their journey.
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <CardContent className="p-6">
                  <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-3">{service.title}</h3>
                  <p className="text-[#64748B] mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-[#64748B]">
                        <CheckCircle className={`h-4 w-4 ${service.textColor}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button className={`w-full bg-gradient-to-r ${service.color} text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all`} asChild>
                    <Link href={service.link}>
                      {service.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-4 md:text-4xl">
              Platform Features
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              Additional features and tools to enhance your startup journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <CardContent className="p-6">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${service.color} group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-6 w-6 ${service.textColor}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E293B] mb-3">{service.title}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">{service.description}</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={service.link}>
                      Learn More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-4 md:text-4xl">
              Why Choose GrowthLab?
            </h2>
            <p className="text-lg text-[#64748B] max-w-3xl mx-auto">
              Cutting-edge technology and features that set us apart from the competition
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                  feature.highlight 
                    ? 'bg-gradient-to-br from-[#0F7377]/10 to-[#1E293B]/10 border-[#0F7377]/30 hover:border-[#0F7377]/50' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    feature.highlight 
                      ? 'bg-gradient-to-r from-[#0F7377] to-[#1E293B]' 
                      : 'bg-gray-200'
                  }`}>
                    <IconComponent className={`h-6 w-6 ${
                      feature.highlight ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    feature.highlight ? 'text-[#0F7377]' : 'text-[#1E293B]'
                  }`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1E293B] mb-4 md:text-4xl">
              Our Impact
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              See how our services have helped startups across Asia achieve success.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 grid-cols-2 md:grid-cols-4">
            <div className="text-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-[#0F7377] mb-2">2,847+</div>
              <div className="text-[#1E293B] font-semibold text-sm md:text-base">Active Members</div>
              <div className="text-xs md:text-sm text-green-600 mt-1">+12% this month</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-[#F59E0B] mb-2">156</div>
              <div className="text-[#1E293B] font-semibold text-sm md:text-base">Startups</div>
              <div className="text-xs md:text-sm text-green-600 mt-1">+8 new this week</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-[#10B981] mb-2">$47.2M</div>
              <div className="text-[#1E293B] font-semibold text-sm md:text-base">Deals Closed</div>
              <div className="text-xs md:text-sm text-green-600 mt-1">+23% this quarter</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl md:text-4xl font-bold text-[#8B5CF6] mb-2">89</div>
              <div className="text-[#1E293B] font-semibold text-sm md:text-base">Latest Investments</div>
              <div className="text-xs md:text-sm text-green-600 mt-1">+5 this month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-[#0F7377] to-[#1E293B]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/20 text-white border-white/20 hover:bg-white/30 transition-colors">
              <Star className="w-3 h-3 mr-2" />
              Client Success Stories
            </Badge>
            <h2 className="text-3xl font-bold text-white mb-4 md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Hear from founders who have transformed their startups with our services.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-3">
            {[
              {
                quote: "GrowthLab's accelerator program transformed our startup. The mentorship, funding, and network connections helped us scale from 5 to 50 employees in just 6 months.",
                name: "Sarah Chen",
                role: "CEO, FinTech Solutions",
                avatar: "/sarah-lim.png"
              },
              {
                quote: "The co-founder matching platform helped me find the perfect technical co-founder. We've been working together for 2 years and just closed our Series A.",
                name: "Alex Kumar",
                role: "Founder, EcoLogistics",
                avatar: "/david-tan.png"
              },
              {
                quote: "As an investor, I've found some of my best deals through GrowthLab. The quality of startups and the due diligence process is exceptional.",
                name: "Dr. Michael Wong",
                role: "Partner, Venture Capital",
                avatar: "/michelle-chen.png"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-6 leading-relaxed text-sm md:text-base">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-white/20">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-xs md:text-sm text-white/70">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#1E293B] to-[#0F7377]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/20 hover:bg-white/30 transition-colors">
              <Heart className="w-3 h-3 mr-2" />
              Ready to Get Started?
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Choose Your Path to Success
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed">
              Whether you're looking to accelerate your startup, find a co-founder, or connect with investors, 
              we have the services and expertise to help you succeed.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/90 text-white hover:from-[#F59E0B]/90 hover:to-[#F59E0B] shadow-lg hover:shadow-xl transition-all" 
                asChild
              >
                <Link href="/programmes/accelerator" className="flex items-center">
                  Apply to Accelerator <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all" 
                asChild
              >
                <Link href="/contact" className="flex items-center">
                  Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all" 
                asChild
              >
                <Link href="/signup" className="flex items-center">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* Quick Access Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link href="/co-founder-matching" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <Users className="h-4 w-4" />
                <span>Find Co-founder</span>
              </Link>
              <Link href="/funding" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <DollarSign className="h-4 w-4" />
                <span>Get Funding</span>
              </Link>
              <Link href="/jobs" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <Briefcase className="h-4 w-4" />
                <span>Browse Jobs</span>
              </Link>
              <Link href="/events" className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10">
                <Calendar className="h-4 w-4" />
                <span>Join Events</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 