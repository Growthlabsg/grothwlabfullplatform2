"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChartComponent } from "@/components/dashboard/bar-chart"
import { Star } from "lucide-react"

interface FeedbackAnalyticsProps {
  timeframe: string
}

export function FeedbackAnalytics({ timeframe }: FeedbackAnalyticsProps) {
  // Mock data - in a real app, this would come from an API
  const ratingDistributionData = [
    { name: "5 Stars", value: 75 },
    { name: "4 Stars", value: 20 },
    { name: "3 Stars", value: 5 },
    { name: "2 Stars", value: 0 },
    { name: "1 Star", value: 0 },
  ]

  const skillRatingData = [
    { name: "Technical Knowledge", value: 4.9 },
    { name: "Communication", value: 4.8 },
    { name: "Responsiveness", value: 4.7 },
    { name: "Guidance Quality", value: 4.9 },
    { name: "Actionable Advice", value: 4.6 },
  ]

  const feedbackComments = [
    {
      menteeName: "Jason Lim",
      rating: 5,
      date: "May 10, 2025",
      comment:
        "Your guidance has been invaluable in helping me secure funding. Your insights into what investors look for and how to structure my pitch made all the difference.",
      strengths: ["Industry Knowledge", "Network Access", "Strategic Thinking"],
    },
    {
      menteeName: "Aisha Rahman",
      rating: 5,
      date: "May 8, 2025",
      comment:
        "I've grown so much as a leader thanks to your mentorship. The practical advice and resources you've shared have helped me navigate challenging situations with my team.",
      strengths: ["Leadership Guidance", "Practical Advice", "Resource Sharing"],
    },
    {
      menteeName: "Mark Chen",
      rating: 4,
      date: "May 5, 2025",
      comment:
        "Your product development insights have been extremely helpful. I would appreciate more specific feedback on marketing strategies in our future sessions.",
      strengths: ["Technical Expertise", "Product Development", "Honest Feedback"],
      improvements: ["Marketing Strategy Guidance"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of ratings received from mentees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratingDistributionData.map((rating) => (
                <div key={rating.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-2">{rating.name}</span>
                      {rating.name === "5 Stars" && (
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      )}
                      {rating.name === "4 Stars" && (
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-3.5 w-3.5 text-gray-300" />
                        </div>
                      )}
                      {rating.name === "3 Stars" && (
                        <div className="flex">
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-gray-300" />
                          ))}
                        </div>
                      )}
                      {rating.name === "2 Stars" && (
                        <div className="flex">
                          {[...Array(2)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          ))}
                          {[...Array(3)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-gray-300" />
                          ))}
                        </div>
                      )}
                      {rating.name === "1 Star" && (
                        <div className="flex">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-gray-300" />
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">{rating.value}%</span>
                  </div>
                  <Progress value={rating.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <BarChartComponent
          title="Skill Ratings"
          description="Average ratings across different mentoring skills"
          data={skillRatingData}
          valueSuffix="/5"
          color="#0F7377"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feedback Comments</CardTitle>
          <CardDescription>Recent feedback from your mentees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedbackComments.map((feedback, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{feedback.menteeName}</h3>
                    <Badge variant="outline" className="text-xs">
                      {feedback.date}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{feedback.rating}.0</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">"{feedback.comment}"</p>

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-medium text-green-600">Strengths:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {feedback.strengths.map((strength, sIndex) => (
                        <Badge key={sIndex} variant="outline" className="bg-green-50 text-green-700 text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {feedback.improvements && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-amber-600">Areas for Improvement:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {feedback.improvements.map((improvement, iIndex) => (
                          <Badge key={iIndex} variant="outline" className="bg-amber-50 text-amber-700 text-xs">
                            {improvement}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {index < feedbackComments.length - 1 && <div className="border-t my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
