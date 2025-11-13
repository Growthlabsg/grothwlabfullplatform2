"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { ArrowUpRight, CheckCircle, Clock, Target } from "lucide-react"
import Link from "next/link"

interface MenteeProgressProps {
  timeframe: string
}

export function MenteeProgress({ timeframe }: MenteeProgressProps) {
  // Mock data - in a real app, this would come from an API
  const goalCompletionData = [
    { name: "Jason Lim", value: 85 },
    { name: "Aisha Rahman", value: 92 },
    { name: "Mark Chen", value: 78 },
    { name: "Sarah Wong", value: 65 },
    { name: "David Tan", value: 45 },
  ]

  const skillProgressData = [
    { name: "Technical Skills", value: 75 },
    { name: "Leadership", value: 68 },
    { name: "Communication", value: 82 },
    { name: "Problem Solving", value: 70 },
    { name: "Business Acumen", value: 58 },
  ]

  const menteeGoals = [
    {
      menteeName: "Jason Lim",
      goal: "Secure seed funding",
      progress: 85,
      status: "In Progress",
      targetDate: "June 30, 2025",
      milestones: [
        { name: "Finalize pitch deck", completed: true },
        { name: "Identify potential investors", completed: true },
        { name: "Schedule investor meetings", completed: true },
        { name: "Secure term sheet", completed: false },
        { name: "Close funding round", completed: false },
      ],
    },
    {
      menteeName: "Aisha Rahman",
      goal: "Develop leadership skills",
      progress: 92,
      status: "In Progress",
      targetDate: "May 15, 2025",
      milestones: [
        { name: "Complete leadership assessment", completed: true },
        { name: "Read recommended books", completed: true },
        { name: "Lead team project", completed: true },
        { name: "Gather peer feedback", completed: true },
        { name: "Present at department meeting", completed: false },
      ],
    },
    {
      menteeName: "Mark Chen",
      goal: "Launch new product",
      progress: 78,
      status: "In Progress",
      targetDate: "July 15, 2025",
      milestones: [
        { name: "Finalize product requirements", completed: true },
        { name: "Complete MVP development", completed: true },
        { name: "Conduct user testing", completed: true },
        { name: "Prepare marketing materials", completed: false },
        { name: "Launch product", completed: false },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <BarChartComponent
          title="Goal Completion by Mentee"
          description="Progress towards defined goals"
          data={goalCompletionData}
          valueSuffix="%"
          color="#0F7377"
        />

        <BarChartComponent
          title="Skill Development Areas"
          description="Average progress across all mentees"
          data={skillProgressData}
          valueSuffix="%"
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mentee Goal Tracking</CardTitle>
          <CardDescription>Current goals and progress for your mentees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {menteeGoals.map((menteeGoal, index) => (
              <div key={index} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{menteeGoal.menteeName}</h3>
                      <Badge variant={menteeGoal.status === "Completed" ? "default" : "secondary"} className="text-xs">
                        {menteeGoal.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{menteeGoal.goal}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Target className="h-4 w-4 mr-1" />
                      {menteeGoal.targetDate}
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="#">
                        View Details
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">{menteeGoal.progress}%</span>
                  </div>
                  <Progress value={menteeGoal.progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Milestones</h4>
                  <div className="grid gap-2">
                    {menteeGoal.milestones.map((milestone, mIndex) => (
                      <div key={mIndex} className="flex items-center gap-2 text-sm">
                        <div className={`rounded-full p-1 ${milestone.completed ? "bg-green-100" : "bg-slate-100"}`}>
                          {milestone.completed ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <Clock className="h-3 w-3 text-slate-600" />
                          )}
                        </div>
                        <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                          {milestone.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {index < menteeGoals.length - 1 && <div className="border-t my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
