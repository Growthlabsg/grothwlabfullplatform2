"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MetricCard } from "@/components/dashboard/metric-card"
import { AreaChart } from "@/components/dashboard/area-chart"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, FileText, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

interface JobPostingPerformanceProps {
  timeframe: string
}

export function JobPostingPerformance({ timeframe }: JobPostingPerformanceProps) {
  // Mock data - in a real app, this would come from an API
  const postingMetrics = [
    {
      title: "Active Postings",
      value: "8",
      description: "Currently active job postings",
      icon: FileText,
      trend: { value: 2, isPositive: true },
    },
    {
      title: "Total Views",
      value: "2,456",
      description: "Views across all postings",
      icon: Eye,
      trend: { value: 15, isPositive: true },
    },
    {
      title: "Total Applications",
      value: "124",
      description: "Applications received",
      icon: Users,
      trend: { value: 8, isPositive: true },
    },
    {
      title: "Avg. Applications",
      value: "15.5",
      description: "Applications per posting",
      icon: TrendingUp,
      trend: { value: 5, isPositive: false },
    },
  ]

  const viewsOverTimeData = [
    { name: "Week 1", value: 320 },
    { name: "Week 2", value: 480 },
    { name: "Week 3", value: 580 },
    { name: "Week 4", value: 420 },
    { name: "Week 5", value: 390 },
    { name: "Week 6", value: 450 },
    { name: "Week 7", value: 520 },
    { name: "Week 8", value: 610 },
    { name: "Week 9", value: 580 },
    { name: "Week 10", value: 490 },
    { name: "Week 11", value: 530 },
    { name: "Week 12", value: 620 },
  ]

  const applicationsByJobData = [
    { name: "Full Stack Developer", value: 42 },
    { name: "Product Manager", value: 35 },
    { name: "UX Designer", value: 28 },
    { name: "DevOps Engineer", value: 22 },
    { name: "Data Scientist", value: 18 },
    { name: "Marketing Specialist", value: 15 },
    { name: "Sales Executive", value: 12 },
    { name: "Customer Success", value: 8 },
  ]

  const topPerformingJobs = [
    {
      title: "Senior Full Stack Developer",
      views: 845,
      applications: 42,
      conversionRate: "4.97%",
      qualifiedCandidates: 18,
      qualificationRate: "42.9%",
      status: "Active",
      daysRemaining: 12,
    },
    {
      title: "Product Manager",
      views: 762,
      applications: 35,
      conversionRate: "4.59%",
      qualifiedCandidates: 14,
      qualificationRate: "40.0%",
      status: "Active",
      daysRemaining: 18,
    },
    {
      title: "UX Designer",
      views: 654,
      applications: 28,
      conversionRate: "4.28%",
      qualifiedCandidates: 10,
      qualificationRate: "35.7%",
      status: "Active",
      daysRemaining: 21,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {postingMetrics.map((metric, index) => (
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
          title="Job Posting Views Over Time"
          description="Total views across all job postings"
          data={viewsOverTimeData}
          color="#0F7377"
        />

        <BarChartComponent
          title="Applications by Job"
          description="Number of applications received per job posting"
          data={applicationsByJobData}
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Job Postings</CardTitle>
          <CardDescription>Jobs with the highest engagement and application rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topPerformingJobs.map((job, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{job.title}</h3>
                        <Badge variant={job.status === "Active" ? "default" : "secondary"} className="text-xs">
                          {job.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {job.daysRemaining} days left
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-medium">{job.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Applications</p>
                          <p className="font-medium">{job.applications}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Conversion</p>
                          <p className="font-medium">{job.conversionRate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Qualified</p>
                          <p className="font-medium">
                            {job.qualifiedCandidates} ({job.qualificationRate})
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">View Details</Link>
                      </Button>
                      <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                        <Link href="#">View Applicants</Link>
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
