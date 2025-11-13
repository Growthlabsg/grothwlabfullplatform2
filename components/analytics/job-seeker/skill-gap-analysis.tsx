"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

const skillsData = [
  { skill: "JavaScript", yourLevel: 85, marketDemand: 95 },
  { skill: "React", yourLevel: 80, marketDemand: 90 },
  { skill: "Node.js", yourLevel: 60, marketDemand: 85 },
  { skill: "TypeScript", yourLevel: 50, marketDemand: 80 },
  { skill: "GraphQL", yourLevel: 40, marketDemand: 75 },
  { skill: "AWS", yourLevel: 30, marketDemand: 85 },
  { skill: "Docker", yourLevel: 25, marketDemand: 70 },
]

const radarData = [
  { subject: "JavaScript", A: 85, B: 95, fullMark: 100 },
  { subject: "React", A: 80, B: 90, fullMark: 100 },
  { subject: "Node.js", A: 60, B: 85, fullMark: 100 },
  { subject: "TypeScript", A: 50, B: 80, fullMark: 100 },
  { subject: "GraphQL", A: 40, B: 75, fullMark: 100 },
  { subject: "AWS", A: 30, B: 85, fullMark: 100 },
  { subject: "Docker", A: 25, B: 70, fullMark: 100 },
]

const recommendedCourses = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    provider: "AWS Training",
    level: "Intermediate",
    duration: "6 weeks",
    match: "High",
  },
  {
    id: 2,
    title: "Docker and Kubernetes: The Complete Guide",
    provider: "Udemy",
    level: "Intermediate",
    duration: "4 weeks",
    match: "High",
  },
  {
    id: 3,
    title: "Advanced TypeScript Masterclass",
    provider: "Frontend Masters",
    level: "Advanced",
    duration: "3 weeks",
    match: "Medium",
  },
  {
    id: 4,
    title: "GraphQL with React: The Complete Developers Guide",
    provider: "Coursera",
    level: "Intermediate",
    duration: "4 weeks",
    match: "Medium",
  },
]

const getMatchColor = (match: string) => {
  switch (match) {
    case "High":
      return "bg-green-100 text-green-800"
    case "Medium":
      return "bg-amber-100 text-amber-800"
    case "Low":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function SkillGapAnalysis() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Skills Gap Analysis</CardTitle>
          <CardDescription>Compare your skills with market demand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsData.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{skill.skill}</span>
                  <span className="text-sm text-muted-foreground">
                    {skill.yourLevel}% / {skill.marketDemand}%
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <span className="flex-1">Your proficiency</span>
                    <span>{skill.yourLevel}%</span>
                  </div>
                  <Progress value={skill.yourLevel} className="h-2 bg-blue-100" indicatorClassName="bg-blue-600" />
                  <div className="flex items-center text-xs">
                    <span className="flex-1">Market demand</span>
                    <span>{skill.marketDemand}%</span>
                  </div>
                  <Progress value={skill.marketDemand} className="h-2 bg-green-100" indicatorClassName="bg-green-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Skills Radar</CardTitle>
          <CardDescription>Visual comparison of your skills vs. market demand</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar name="Your Skills" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Market Demand" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-[#8884d8]" />
              <span className="text-sm">Your Skills</span>
            </div>
            <div className="flex items-center">
              <div className="mr-1 h-3 w-3 rounded-full bg-[#82ca9d]" />
              <span className="text-sm">Market Demand</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="lg:col-span-7">
        <CardHeader>
          <CardTitle>Recommended Courses</CardTitle>
          <CardDescription>Personalized course recommendations to close your skill gaps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="rounded-lg border p-4">
                <div className="flex justify-between">
                  <h4 className="font-semibold">{course.title}</h4>
                  <Badge className={getMatchColor(course.match)}>{course.match} Match</Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Provider: {course.provider}</p>
                  <p>Level: {course.level}</p>
                  <p>Duration: {course.duration}</p>
                </div>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  View Course <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
