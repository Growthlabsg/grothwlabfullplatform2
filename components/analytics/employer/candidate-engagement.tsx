"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Mail, MessageSquare, UserCheck } from "lucide-react"
import Link from "next/link"

interface CandidateEngagementProps {
  timeframe: string
}

export function CandidateEngagement({ timeframe }: CandidateEngagementProps) {
  // Mock data - in a real app, this would come from an API
  const engagementMetrics = [
    {
      title: "Response Rate",
      value: "78%",
      description: "Candidates you've responded to",
      icon: Mail,
      trend: { value: 5, isPositive: true },
    },
    {
      title: "Avg. Response Time",
      value: "1.8 days",
      description: "Time to first response",
      icon: Clock,
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Interview Rate",
      value: "42%",
      description: "Candidates interviewed",
      icon: UserCheck,
      trend: { value: 3, isPositive: true },
    },
    {
      title: "Message Rate",
      value: "3.5",
      description: "Messages per candidate",
      icon: MessageSquare,
      trend: { value: 8, isPositive: true },
    },
  ]

  const responseTimeData = [
    { name: "Week 1", value: 2.4 },
    { name: "Week 2", value: 2.2 },
    { name: "Week 3", value: 2.1 },
    { name: "Week 4", value: 2.3 },
    { name: "Week 5", value: 2.0 },
    { name: "Week 6", value: 1.9 },
    { name: "Week 7", value: 1.8 },
    { name: "Week 8", value: 1.7 },
    { name: "Week 9", value: 1.8 },
    { name: "Week 10", value: 1.7 },
    { name: "Week 11", value: 1.6 },
    { name: "Week 12", value: 1.8 },
  ]

  const candidateSourceData = [
    { name: "GrowthLab Jobs", value: 45 },
    { name: "LinkedIn", value: 28 },
    { name: "Referrals", value: 15 },
    { name: "Company Website", value: 12 },
    { name: "Job Boards", value: 8 },
    { name: "University Partnerships", value: 6 },
    { name: "Events", value: 5 },
    { name: "Other", value: 3 },
  ]

  const topCandidates = [
    {
      name: "Sarah Chen",
      role: "Senior Full Stack Developer",
      matchScore: 92,
      status: "Interview Scheduled",
      lastActivity: "2 days ago",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      experience: "6 years",
    },
    {
      name: "Michael Wong",
      role: "Product Manager",
      matchScore: 88,
      status: "Application Reviewed",
      lastActivity: "1 day ago",
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
      experience: "5 years",
    },
    {
      name: "Priya Sharma",
      role: "UX Designer",
      matchScore: 85,
      status: "Assessment Sent",
      lastActivity: "3 days ago",
      skills: ["UI/UX", "Figma", "User Testing", "Design Systems"],
      experience: "4 years",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {engagementMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            description={metric.description}
            icon={metric.icon}
            trend={metric.trend}
          />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AreaChart
          title="Response Time Trend"
          description="Average days to respond to candidates"
          data={responseTimeData}
          valueSuffix=" days"
          color="#0F7377"
        />

        <BarChartComponent
          title="Candidate Sources"
          description="Where your candidates are coming from"
          data={candidateSourceData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Candidates</CardTitle>
          <CardDescription>Highest matching candidates for your open positions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topCandidates.map((candidate, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{candidate.name}</h3>
                        <Badge className="bg-[#0F7377]">{candidate.matchScore}% Match</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">
                        {candidate.role} • {candidate.experience} experience
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <Badge variant="secondary">{candidate.status}</Badge>
                        </div>
                        <div className="text-muted-foreground">Last activity: {candidate.lastActivity}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">View Profile</Link>
                      </Button>
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                        <Link href="#">Contact</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
