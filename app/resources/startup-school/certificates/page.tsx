"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  Award,
  Download,
  Share2,
  Search,
  Filter,
  Calendar,
  CheckCircle,
  Star,
  Eye,
  ExternalLink,
  Printer,
  Mail
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

const certificates = [
  {
    id: "funding-fundamentals-cert",
    title: "Startup Funding Fundamentals",
    issuer: "GrowthLab Startup School",
    date: "2024-01-15",
    grade: "A+",
    score: "95%",
    status: "completed",
    courseId: "funding-101",
    verificationCode: "GLSS-FF-2024-001",
    skills: ["Venture Capital", "Pitch Deck", "Financial Planning", "Investor Relations"],
    description: "Successfully completed comprehensive course on startup funding strategies and investor relations."
  },
  {
    id: "product-development-cert",
    title: "Product Development Masterclass",
    issuer: "GrowthLab Startup School",
    date: "2024-01-20",
    grade: "A",
    score: "92%",
    status: "completed",
    courseId: "product-development",
    verificationCode: "GLSS-PD-2024-002",
    skills: ["Product Management", "User Research", "Prototyping", "UX Design"],
    description: "Mastered product development methodologies and user-centered design principles."
  },
  {
    id: "legal-essentials-cert",
    title: "Startup Legal Essentials",
    issuer: "GrowthLab Startup School",
    date: "2024-01-25",
    grade: "A",
    score: "88%",
    status: "completed",
    courseId: "legal-compliance",
    verificationCode: "GLSS-LE-2024-003",
    skills: ["Legal Compliance", "Contract Law", "IP Protection", "Corporate Structure"],
    description: "Gained essential knowledge of legal requirements and compliance for startups."
  },
  {
    id: "operations-scaling-cert",
    title: "Operations & Scaling",
    issuer: "GrowthLab Startup School",
    date: "2024-02-01",
    grade: "A+",
    score: "96%",
    status: "completed",
    courseId: "operations-scaling",
    verificationCode: "GLSS-OS-2024-004",
    skills: ["Operations Management", "Team Building", "Process Optimization", "Growth Strategy"],
    description: "Learned advanced operations management and scaling strategies for growing startups."
  },
  {
    id: "founder-journey-cert",
    title: "Founder's Journey Path",
    issuer: "GrowthLab Startup School",
    date: "2024-02-10",
    grade: "A+",
    score: "98%",
    status: "completed",
    courseId: "founder-journey",
    verificationCode: "GLSS-FJ-2024-005",
    skills: ["Leadership", "Strategy", "Innovation", "Growth"],
    description: "Completed comprehensive founder's journey learning path from ideation to scaling."
  }
]

export default function CertificatesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === "all" || cert.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortBy === "grade") {
      return b.grade.localeCompare(a.grade)
    }
    return 0
  })

  const handleDownload = (certId: string) => {
    toast({
      title: "Download Started",
      description: "Your certificate is being prepared for download.",
    })
    // In a real app, this would trigger a PDF download
  }

  const handleShare = (certId: string) => {
    const cert = certificates.find(c => c.id === certId)
    if (cert) {
      const shareText = `I just earned a certificate in ${cert.title} from GrowthLab Startup School! 🎓`
      const shareUrl = `${window.location.origin}/resources/startup-school/certificates/${certId}`
      
      if (navigator.share) {
        navigator.share({
          title: `Certificate: ${cert.title}`,
          text: shareText,
          url: shareUrl
        })
      } else {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
        toast({
          title: "Link Copied",
          description: "Certificate link has been copied to clipboard.",
        })
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/resources/startup-school">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Startup School
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
                <p className="text-gray-600">Your earned certificates and achievements</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print All
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Email All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search certificates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium bg-white shadow-sm focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="grade">Highest Grade</option>
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-[#0F7377]" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Certificates</p>
                  <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {certificates.filter(c => c.status === 'completed').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Grade</p>
                  <p className="text-2xl font-bold text-gray-900">A+</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">This Year</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {certificates.filter(c => new Date(c.date).getFullYear() === 2024).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Grid */}
        {sortedCertificates.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Certificates Found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery || filterStatus !== "all" 
                  ? "No certificates match your search criteria." 
                  : "You haven't earned any certificates yet. Complete some courses to get started!"
                }
              </p>
              <Button asChild>
                <Link href="/resources/startup-school">
                  Browse Courses
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCertificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 p-6 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{cert.title}</h3>
                      <p className="text-sm text-white/90">{cert.issuer}</p>
                    </div>
                    <Badge className="bg-[#F59E0B] text-white">
                      {cert.grade}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Score: {cert.score}</span>
                    <span>{formatDate(cert.date)}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-sm text-gray-600 mb-4">{cert.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills Earned:</h4>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    Verification Code: {cert.verificationCode}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                      onClick={() => handleDownload(cert.id)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleShare(cert.id)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/resources/startup-school/certificates/${cert.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Earn More Certificates</h3>
              <p className="text-lg mb-6 text-white/90">
                Continue your learning journey and earn more certificates to showcase your expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#F59E0B] text-white hover:bg-[#F59E0B]/90" asChild>
                  <Link href="/resources/startup-school">Browse Courses</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/resources/startup-school/learning-paths">View Learning Paths</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
