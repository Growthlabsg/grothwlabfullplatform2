"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, Briefcase, MapPin, GraduationCap, Users } from "lucide-react"

interface LinkedInProfileProps {
  isOpen: boolean
  onClose: () => void
}

export function LinkedInProfile({ isOpen, onClose }: LinkedInProfileProps) {
  // Sample LinkedIn profile data
  const profile = {
    id: "linkedin-123",
    name: "Sarah Wong",
    headline: "Investor at Horizon Ventures | Former VP at Goldman Sachs | Harvard MBA",
    avatar: "/abstract-southwest.png",
    backgroundImage: "/placeholder.svg?height=200&width=800&query=background",
    currentPosition: {
      title: "Partner",
      company: "Horizon Ventures",
      duration: "2018 - Present",
      location: "Singapore",
      description:
        "Leading investments in fintech and enterprise SaaS startups across Southeast Asia. Managing a portfolio of 15+ companies with $50M+ in investments.",
    },
    experience: [
      {
        title: "Vice President",
        company: "Goldman Sachs",
        duration: "2012 - 2018",
        location: "Hong Kong",
        description: "Led the fintech investment banking team for APAC region.",
      },
      {
        title: "Associate",
        company: "Morgan Stanley",
        duration: "2008 - 2012",
        location: "New York",
        description: "Worked on M&A transactions in the technology sector.",
      },
    ],
    education: [
      {
        school: "Harvard Business School",
        degree: "Master of Business Administration (MBA)",
        duration: "2006 - 2008",
      },
      {
        school: "University of Pennsylvania",
        degree: "Bachelor of Science in Economics",
        duration: "2002 - 2006",
      },
    ],
    skills: [
      "Venture Capital",
      "Investment Banking",
      "Financial Analysis",
      "Due Diligence",
      "Strategic Planning",
      "Fintech",
      "SaaS",
      "Startup Mentoring",
    ],
    connections: 2347,
    mutualConnections: 15,
    about:
      "Experienced investor with a passion for helping innovative startups scale across Southeast Asia. I focus on fintech, enterprise SaaS, and B2B marketplaces. Previously worked in investment banking at Goldman Sachs and Morgan Stanley. Harvard MBA and Wharton undergrad.",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>LinkedIn Profile</DialogTitle>
          <DialogDescription>View detailed LinkedIn profile information</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {/* Background and Profile Image */}
          <div className="relative">
            <div className="h-32 w-full rounded-t-md overflow-hidden">
              <img
                src={profile.backgroundImage || "/placeholder.svg"}
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            <Avatar className="absolute -bottom-12 left-4 h-24 w-24 border-4 border-background">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
              <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info */}
          <div className="mt-14 px-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.headline}</p>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{profile.currentPosition.location}</span>
                  <span className="mx-2">•</span>
                  <Users className="h-4 w-4 mr-1" />
                  <span>{profile.connections} connections</span>
                  {profile.mutualConnections > 0 && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{profile.mutualConnections} mutual connections</span>
                    </>
                  )}
                </div>
              </div>
              <Button variant="outline" className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on LinkedIn
              </Button>
            </div>

            <Separator className="my-4" />

            {/* About */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-sm">{profile.about}</p>
            </div>

            {/* Current Position */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Current Position</h3>
              <div className="flex items-start">
                <Briefcase className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{profile.currentPosition.title}</div>
                  <div className="text-sm">{profile.currentPosition.company}</div>
                  <div className="text-sm text-muted-foreground">{profile.currentPosition.duration}</div>
                  <div className="text-sm text-muted-foreground">{profile.currentPosition.location}</div>
                  <p className="text-sm mt-1">{profile.currentPosition.description}</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <div className="space-y-4">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="flex items-start">
                    <Briefcase className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{exp.title}</div>
                      <div className="text-sm">{exp.company}</div>
                      <div className="text-sm text-muted-foreground">{exp.duration}</div>
                      <div className="text-sm text-muted-foreground">{exp.location}</div>
                      <p className="text-sm mt-1">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <div className="space-y-4">
                {profile.education.map((edu, index) => (
                  <div key={index} className="flex items-start">
                    <GraduationCap className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{edu.school}</div>
                      <div className="text-sm">{edu.degree}</div>
                      <div className="text-sm text-muted-foreground">{edu.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
