"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ArrowRight,
  ExternalLink,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Calendar,
  Award,
  Users,
  Rocket,
  Target,
  Heart
} from "lucide-react"
import Link from "next/link"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "/team-sarah.jpg",
      bio: "Former VP at Google, 10+ years in tech. Passionate about building the next generation of Asian unicorns.",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
      email: "sarah@growthlab.asia",
      location: "Singapore",
      joinDate: "2020",
      expertise: ["Product Strategy", "Leadership", "Startup Ecosystem"],
      achievements: ["Built 3 successful startups", "Mentored 100+ entrepreneurs", "Featured in Forbes 30 Under 30"]
    },
    {
      name: "Marcus Johnson",
      role: "CTO",
      image: "/team-marcus.jpg",
      bio: "Ex-Microsoft engineer, serial entrepreneur. Built and sold 3 startups before joining GrowthLab.",
      linkedin: "https://linkedin.com/in/marcusjohnson",
      twitter: "https://twitter.com/marcusjohnson",
      email: "marcus@growthlab.asia",
      location: "Hong Kong",
      joinDate: "2020",
      expertise: ["Software Engineering", "Technical Architecture", "AI/ML"],
      achievements: ["Led engineering teams at 5 startups", "Open source contributor", "Tech conference speaker"]
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "/team-priya.jpg",
      bio: "Former McKinsey consultant, expert in scaling operations. Led 50+ startups through growth phases.",
      linkedin: "https://linkedin.com/in/priyasharma",
      twitter: "https://twitter.com/priyasharma",
      email: "priya@growthlab.asia",
      location: "Tokyo",
      joinDate: "2021",
      expertise: ["Operations", "Strategy", "Process Optimization"],
      achievements: ["Scaled 50+ startups", "McKinsey consultant", "Operations expert"]
    },
    {
      name: "Alex Kim",
      role: "Head of Community",
      image: "/team-alex.jpg",
      bio: "Community builder with 15+ years experience. Built thriving communities for 100+ startups.",
      linkedin: "https://linkedin.com/in/alexkim",
      twitter: "https://twitter.com/alexkim",
      email: "alex@growthlab.asia",
      location: "Seoul",
      joinDate: "2021",
      expertise: ["Community Building", "Event Management", "Networking"],
      achievements: ["Built 100+ communities", "Event organizer", "Community expert"]
    },
    {
      name: "Dr. Lisa Wang",
      role: "Head of Education",
      image: "/team-lisa.jpg",
      bio: "Former Stanford professor, expert in entrepreneurship education. Designed curriculum for 1000+ students.",
      linkedin: "https://linkedin.com/in/lisawang",
      twitter: "https://twitter.com/lisawang",
      email: "lisa@growthlab.asia",
      location: "Singapore",
      joinDate: "2022",
      expertise: ["Education", "Curriculum Design", "Mentorship"],
      achievements: ["Stanford professor", "Designed 1000+ student curriculum", "Education expert"]
    },
    {
      name: "James Rodriguez",
      role: "Head of Marketing",
      image: "/team-james.jpg",
      bio: "Former Facebook marketing lead, expert in growth marketing. Helped 200+ startups scale their user base.",
      linkedin: "https://linkedin.com/in/jamesrodriguez",
      twitter: "https://twitter.com/jamesrodriguez",
      email: "james@growthlab.asia",
      location: "Manila",
      joinDate: "2022",
      expertise: ["Growth Marketing", "Brand Strategy", "Digital Marketing"],
      achievements: ["Facebook marketing lead", "Helped 200+ startups scale", "Marketing expert"]
    }
  ]

  const advisors = [
    {
      name: "David Lee",
      role: "Advisor",
      company: "Sequoia Capital",
      image: "/advisor-david.jpg",
      bio: "Partner at Sequoia Capital, 20+ years in venture capital. Led investments in 50+ unicorns.",
      linkedin: "https://linkedin.com/in/davidlee"
    },
    {
      name: "Maria Santos",
      role: "Advisor",
      company: "Andreessen Horowitz",
      image: "/advisor-maria.jpg",
      bio: "General Partner at a16z, expert in fintech and enterprise software. Former startup founder.",
      linkedin: "https://linkedin.com/in/mariasantos"
    },
    {
      name: "Kenji Tanaka",
      role: "Advisor",
      company: "SoftBank Vision Fund",
      image: "/advisor-kenji.jpg",
      bio: "Managing Partner at SoftBank Vision Fund, 15+ years in tech investing across Asia.",
      linkedin: "https://linkedin.com/in/kenjitanaka"
    }
  ]

  const stats = [
    { label: "Team Members", value: "25+", icon: Users },
    { label: "Years Combined Experience", value: "200+", icon: Calendar },
    { label: "Startups Helped", value: "500+", icon: Rocket },
    { label: "Countries Represented", value: "8+", icon: MapPin }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Our Team</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Meet the passionate individuals behind GrowthLab's success
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                    <p className="text-[#0F7377] font-medium mb-2">{member.role}</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{member.location}</span>
                      <span>•</span>
                      <span>Since {member.joinDate}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      {member.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={member.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Advisory Board</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {advisors.map((advisor, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src={advisor.image} alt={advisor.name} />
                    <AvatarFallback>{advisor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{advisor.name}</h3>
                  <p className="text-[#0F7377] font-medium mb-2">{advisor.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{advisor.company}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">{advisor.bio}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={advisor.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Connect
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white border-0">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  We believe in creating an environment where everyone can thrive and contribute to our mission
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Passion-Driven</h3>
                  <p className="text-white/90">We're passionate about helping startups succeed and building the future of Asia's tech ecosystem.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Collaborative</h3>
                  <p className="text-white/90">We work together as a team, supporting each other and our community members to achieve shared goals.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Rocket className="h-8 w-8 text-[#F59E0B]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Innovation-Focused</h3>
                  <p className="text-white/90">We constantly innovate and improve our platform to better serve our community and stay ahead of the curve.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Join Our Team */}
        <div className="text-center">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for building the next generation of unicorns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                  <Link href="/careers">
                    View Open Positions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
