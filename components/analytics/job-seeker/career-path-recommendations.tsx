"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"

const careerPaths = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    timeframe: "1-2 years",
    matchScore: 92,
    salaryRange: "$110,000 - $140,000",
    growth: "High",
    demand: "Very High",
    skills: ["React", "TypeScript", "GraphQL", "Performance Optimization", "Team Leadership"],
    description: "Lead frontend development efforts, architect solutions, and mentor junior developers.",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    timeframe: "1-2 years",
    matchScore: 85,
    salaryRange: "$100,000 - $130,000",
    growth: "High",
    demand: "High",
    skills: ["React", "Node.js", "Express", "MongoDB", "AWS"],
    description: "Develop end-to-end applications, from database design to user interface implementation.",
  },
  {
    id: 3,
    title: "Frontend Architect",
    timeframe: "3-4 years",
    matchScore: 78,
    salaryRange: "$130,000 - $160,000",
    growth: "Medium",
    demand: "Medium",
    skills: ["System Design", "Performance Optimization", "Technical Leadership", "Frontend Infrastructure"],
    description: "Design scalable frontend architectures and establish best practices and standards.",
  },
]

const milestones = [
  {
    id: 1,
    title: "Advanced React Patterns",
    type: "Skill",
    status: "In Progress",
    progress: 65,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "Lead a Feature Team",
    type: "Experience",
    status: "Not Started",
    progress: 0,
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "System Design Expertise",
    type: "Skill",
    status: "Not Started",
    progress: 0,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "Frontend Architecture Certification",
    type: "Certification",
    status: "Not Started",
    progress: 0,
    icon: <Award className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "Mentor Junior Developers",
    type: "Experience",
    status: "Not Started",
    progress: 0,
    icon: <Users className="h-5 w-5" />,
  },
]

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Frontend Architect at TechCorp",
    expertise: ["React", "Frontend Architecture", "Performance"],
    matchScore: 95,
    availability: "High",
  },
  {
    id: 2,
    name: "Michael Wong",
    role: "Engineering Manager at DataSystems",
    expertise: ["Team Leadership", "Career Development", "Full Stack"],
    matchScore: 88,
    availability: "Medium",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Tech Lead at GrowthLab",
    expertise: ["TypeScript", "GraphQL", "System Design"],
    matchScore: 82,
    availability: "Low",
  },
]

export function CareerPathRecommendations() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-7">
        <CardHeader>
          <CardTitle>Recommended Career Paths</CardTitle>
          <CardDescription>Personalized career paths based on your skills and goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {careerPaths.map((path) => (
              <Card key={path.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/80 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{path.title}</h3>
                      <Badge className="bg-white text-[#0F7377]">{path.matchScore}% Match</Badge>
                    </div>
                    <p className="mt-1 text-sm text-white/80">Timeframe: {path.timeframe}</p>
                  </div>
                  <div className="p-4">
                    <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Salary Range</p>
                        <p className="font-medium">{path.salaryRange}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Growth Potential</p>
                        <p className="font-medium">{path.growth}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Market Demand</p>
                        <p className="font-medium">{path.demand}</p>
                      </div>
                    </div>
                    <p className="mb-3 text-sm">{path.description}</p>
                    <div className="mb-3">
                      <p className="mb-1 text-sm font-medium">Required Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                      View Career Path <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Career Milestones</CardTitle>
          <CardDescription>Key milestones to achieve your career goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-[#0F7377]/10 p-1.5 text-[#0F7377]">{milestone.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          milestone.status === "Completed"
                            ? "bg-green-50 text-green-700"
                            : milestone.status === "In Progress"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
                        }
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{milestone.type}</span>
                      <span className="font-medium">{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="mt-2 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Recommended Mentors</CardTitle>
          <CardDescription>Connect with mentors to accelerate your career growth</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{mentor.name}</h4>
                  <Badge className="bg-[#0F7377]">{mentor.matchScore}% Match</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{mentor.role}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {mentor.expertise.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Availability:{" "}
                    <span
                      className={
                        mentor.availability === "High"
                          ? "text-green-600"
                          : mentor.availability === "Medium"
                            ? "text-amber-600"
                            : "text-red-600"
                      }
                    >
                      {mentor.availability}
                    </span>
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">Connect</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
