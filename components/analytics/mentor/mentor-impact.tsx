"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Clock, Target, Users } from "lucide-react"
import Link from "next/link"

interface MentorImpactProps {
  timeframe: string
}

export function MentorImpact({ timeframe }: MentorImpactProps) {
  // Mock data - in a real app, this would come from an API
  const impactMetrics = [
    {
      title: "Active Mentees",
      value: "12",
      description: "Currently mentoring",
      icon: Users,
      trend: { value: 2, isPositive: true },
    },
    {
      title: "Total Hours",
      value: "86",
      description: "Mentoring hours",
      icon: Clock,
      trend: { value: 15, isPositive: true },
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      description: "Out of 5 stars",
      icon: Award,
      trend: { value: 0.2, isPositive: true },
    },
    {
      title: "Goals Achieved",
      value: "28",
      description: "Mentee milestones",
      icon: Target,
      trend: { value: 5, isPositive: true },
    },
  ]

  const menteeGrowthData = [
    { name: "Jan", value: 6 },
    { name: "Feb", value: 7 },
    { name: "Mar", value: 7 },
    { name: "Apr", value: 8 },
    { name: "May", value: 9 },
    { name: "Jun", value: 10 },
    { name: "Jul", value: 10 },
    { name: "Aug", value: 11 },
    { name: "Sep", value: 11 },
    { name: "Oct", value: 12 },
    { name: "Nov", value: 12 },
    { name: "Dec", value: 12 },
  ]

  const impactByAreaData = [
    { name: "Career Guidance", value: 35 },
    { name: "Technical Skills", value: 28 },
    { name: "Leadership", value: 18 },
    { name: "Networking", value: 12 },
    { name: "Work-Life Balance", value: 7 },
  ]

  const successStories = [
    {
      menteeName: "Jason Lim",
      achievement: "Secured funding for startup",
      description:
        "With your guidance on pitch deck preparation and investor networking, Jason secured $500K in seed funding for his fintech startup.",
      date: "May 2025",
    },
    {
      menteeName: "Aisha Rahman",
      achievement: "Promoted to Senior Developer",
      description:
        "Your technical mentoring and leadership coaching helped Aisha advance to a senior role at her company within 6 months.",
      date: "April 2025",
    },
    {
      menteeName: "Mark Chen",
      achievement: "Launched new product",
      description:
        "Your product strategy guidance helped Mark successfully launch his company's new SaaS offering, which gained 500 users in the first month.",
      date: "March 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {impactMetrics.map((metric, index) => (
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
          title="Mentee Growth"
          description="Number of mentees over time"
          data={menteeGrowthData}
          color="#0F7377"
        />

        <BarChartComponent
          title="Impact by Area"
          description="Areas where you've made the most impact"
          data={impactByAreaData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mentee Success Stories</CardTitle>
          <CardDescription>Notable achievements from your mentees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{story.menteeName}</h3>
                        <Badge className="bg-[#0F7377]">{story.achievement}</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{story.description}</p>

                      <div className="text-sm text-muted-foreground">{story.date}</div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">View Details</Link>
                      </Button>
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                        <Link href="#">Share Story</Link>
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
