"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Users, Plus, X, ExternalLink } from "lucide-react"
import Link from "next/link"

export function ConnectionRecommendations() {
  const [recommendations, setRecommendations] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Product Manager at Google",
      avatar: "/abstract-letter-jt.png",
      mutualConnections: 15,
      reason: "Based on your profile",
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Startup Founder & CEO",
      avatar: "/abstract-ms-flow.png",
      mutualConnections: 8,
      reason: "From your alma mater",
    },
    {
      id: "3",
      name: "Emily Wong",
      role: "Venture Capitalist at Sequoia",
      avatar: "/stylized-letters.png",
      mutualConnections: 5,
      reason: "You may know each other",
    },
  ])

  const dismissRecommendation = (id: string) => {
    setRecommendations((prev) => prev.filter((rec) => rec.id !== id))
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm font-medium">Recommended Connections</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={recommendation.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex items-start justify-between group">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={recommendation.avatar || "/placeholder.svg"} alt={recommendation.name} />
                      <AvatarFallback>{recommendation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary group-hover:underline">
                        {recommendation.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{recommendation.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-primary">{recommendation.mutualConnections} mutual connections</p>
                        <Badge variant="outline" className="text-xs px-1 py-0 h-5">
                          {recommendation.reason}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground"
                      onClick={() => dismissRecommendation(recommendation.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="link" className="px-0 text-sm w-full" asChild>
              <Link href="/network/recommendations">
                View more recommendations
                <ExternalLink className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="text-center py-4">
            <Users className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-sm font-medium">No recommendations</h3>
            <p className="text-xs text-muted-foreground mt-1">
              We'll suggest connections as we learn more about your network
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
