"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { ArrowRight, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"

interface HiringFunnelProps {
  timeframe: string
}

export function HiringFunnel({ timeframe }: HiringFunnelProps) {
  // Mock data - in a real app, this would come from an API
  const funnelStages = [
    { name: "Applications", value: 124, percentage: 100 },
    { name: "Screened", value: 86, percentage: 69 },
    { name: "Assessment", value: 52, percentage: 42 },
    { name: "Interview", value: 28, percentage: 23 },
    { name: "Final Round", value: 12, percentage: 10 },
    { name: "Offers", value: 8, percentage: 6 },
    { name: "Hired", value: 6, percentage: 5 },
  ]

  const timeToHireData = [
    { name: "Full Stack Developer", value: 32 },
    { name: "Product Manager", value: 38 },
    { name: "UX Designer", value: 28 },
    { name: "DevOps Engineer", value: 35 },
    { name: "Data Scientist", value: 42 },
  ]

  const dropoffReasonsData = [
    { name: "Failed Screening", value: 38 },
    { name: "Failed Assessment", value: 34 },
    { name: "Failed Interview", value: 24 },
    { name: "Rejected Offer", value: 2 },
    { name: "Withdrew", value: 20 },
  ]

  const recentHires = [
    {
      name: "David Lim",
      role: "Senior Full Stack Developer",
      timeToHire: "32 days",
      startDate: "May 15, 2025",
      source: "GrowthLab Jobs",
    },
    {
      name: "Jessica Tan",
      role: "Product Manager",
      timeToHire: "38 days",
      startDate: "May 1, 2025",
      source: "LinkedIn",
    },
    {
      name: "Raj Patel",
      role: "UX Designer",
      timeToHire: "28 days",
      startDate: "April 22, 2025",
      source: "Referral",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hiring Funnel</CardTitle>
          <CardDescription>Candidate progression through your hiring process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {funnelStages.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stage.name}</span>
                    <Badge variant="outline">{stage.value}</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{stage.percentage}%</span>
                </div>
                <Progress value={stage.percentage} className="h-2" />
                {index < funnelStages.length - 1 && (
                  <div className="flex items-center justify-center text-muted-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <BarChartComponent
          title="Average Time to Hire (Days)"
          description="By position"
          data={timeToHireData}
          valueSuffix=" days"
          color="#0F7377"
        />

        <BarChartComponent
          title="Dropoff Reasons"
          description="Why candidates exit your hiring process"
          data={dropoffReasonsData}
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Hires</CardTitle>
          <CardDescription>Candidates who have accepted offers and joined your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentHires.map((hire, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{hire.name}</h3>
                        <Badge className="bg-green-600">Hired</Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Position</p>
                          <p className="font-medium">{hire.role}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Time to Hire</p>
                          <p className="font-medium">{hire.timeToHire}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Source</p>
                          <p className="font-medium">{hire.source}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Starts {hire.startDate}
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="#">View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hiring Process Insights</CardTitle>
          <CardDescription>Key insights to improve your hiring process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-green-100 p-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Strong application to screen conversion</h4>
                <p className="text-sm text-muted-foreground">
                  Your application to screen conversion rate of 69% is above the industry average of 60%. Your job
                  descriptions are attracting relevant candidates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-amber-100 p-1">
                <Clock className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <h4 className="font-medium">Assessment to interview conversion needs improvement</h4>
                <p className="text-sm text-muted-foreground">
                  Your assessment to interview conversion rate of 54% is below the industry average of 65%. Consider
                  reviewing your assessment criteria or providing better preparation materials.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-red-100 p-1">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <h4 className="font-medium">Time to hire opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  Your average time to hire of 35 days is above the industry average of 28 days. Consider streamlining
                  your interview process or reducing time between stages.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
