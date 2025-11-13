import type { Metadata } from "next"
import DigitalNameCard from "@/components/profile/digital-name-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Edit, 
  QrCode, 
  Eye, 
  MessageSquare, 
  Calendar,
  Heart,
  Star,
  ExternalLink,
  Copy,
  Check,
  Settings,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Plus,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Digital Name Card | GrowthLab",
  description: "View and share your digital name card with the GrowthLab community.",
}

// Mock profile data
const mockProfileData = {
  name: "Arul Murugan",
  title: "Senior Software Engineer",
  company: "Google",
  location: "Singapore",
  bio: "Passionate software engineer and entrepreneur with expertise in full-stack development, AI/ML, and building scalable applications. Former Senior Software Engineer at Google with 8+ years of experience in technology and startup ecosystem.",
  avatar: "/abstract-geometric-shapes.png",
  email: "arul@example.com",
  phone: "+65 9123 4567",
  website: "https://arulmurugan.com",
  linkedin: "arul-murugan-525b321a7",
  twitter: "arulmurugan",
  github: "arulmurugan",
  roles: [
    {
      id: "1",
      type: "mentor",
      title: "Tech Mentor",
      description: "Providing guidance to aspiring developers and entrepreneurs",
      verified: true
    },
    {
      id: "2", 
      type: "investor",
      title: "Angel Investor",
      description: "Investing in early-stage tech startups",
      verified: true
    },
    {
      id: "3",
      type: "founder",
      title: "Startup Founder",
      description: "Co-founded multiple successful tech companies",
      verified: true
    }
  ],
  skills: [
    "JavaScript", "Python", "React", "Node.js", "Machine Learning", "AWS", "Docker", "Kubernetes"
  ],
  languages: [
    "English", "Tamil", "Mandarin"
  ],
  stats: {
    connections: 500,
    followers: 1200,
    posts: 45,
    views: 2500
  }
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">Digital Name Card</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings/profile">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <DigitalNameCard />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Stats</CardTitle>
                <CardDescription>Your engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5">
                    <div className="text-2xl font-bold text-[#0F7377]">{mockProfileData.stats.connections}</div>
                    <div className="text-xs text-gray-600">Connections</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5">
                    <div className="text-2xl font-bold text-[#F59E0B]">{mockProfileData.stats.followers}</div>
                    <div className="text-xs text-gray-600">Followers</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5">
                    <div className="text-2xl font-bold text-[#10B981]">{mockProfileData.stats.posts}</div>
                    <div className="text-xs text-gray-600">Posts</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5">
                    <div className="text-2xl font-bold text-[#8B5CF6]">{mockProfileData.stats.views}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common profile actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="h-4 w-4 mr-3" />
                  Edit Profile
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <QrCode className="h-4 w-4 mr-3" />
                  Generate QR Code
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-3" />
                  Download Card
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Share2 className="h-4 w-4 mr-3" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>

            {/* Professional Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Roles</CardTitle>
                <CardDescription>Your current roles and contributions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockProfileData.roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0F7377]/10 flex items-center justify-center">
                        {role.type === 'mentor' && <GraduationCap className="h-4 w-4 text-[#0F7377]" />}
                        {role.type === 'investor' && <Briefcase className="h-4 w-4 text-[#0F7377]" />}
                        {role.type === 'founder' && <Award className="h-4 w-4 text-[#0F7377]" />}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{role.title}</div>
                        <div className="text-xs text-gray-500">{role.description}</div>
                      </div>
                    </div>
                    {role.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Info</CardTitle>
                <CardDescription>How to reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-[#0F7377]" />
                  <a href={`mailto:${mockProfileData.email}`} className="hover:underline">
                    {mockProfileData.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-[#0F7377]" />
                  <a href={`tel:${mockProfileData.phone}`} className="hover:underline">
                    {mockProfileData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-[#0F7377]" />
                  <span>{mockProfileData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-[#0F7377]" />
                  <a href={mockProfileData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Website
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Links</CardTitle>
                <CardDescription>Connect on social platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <LinkIcon className="h-4 w-4 text-[#0F7377]" />
                  <a href={`https://linkedin.com/in/${mockProfileData.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <LinkIcon className="h-4 w-4 text-[#0F7377]" />
                  <a href={`https://twitter.com/${mockProfileData.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Twitter Profile
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <LinkIcon className="h-4 w-4 text-[#0F7377]" />
                  <a href={`https://github.com/${mockProfileData.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    GitHub Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}