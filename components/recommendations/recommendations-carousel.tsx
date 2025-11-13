"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, DollarSign, Lightbulb, Rocket, BookOpen, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { RecommendationEngine, type RecommendationItem } from "@/lib/recommendation-engine"

interface RecommendationsCarouselProps {
  title?: string
  description?: string
  limit?: number
  className?: string
}

export function RecommendationsCarousel({
  title = "Recommended for you",
  description,
  limit = 5,
  className,
}: RecommendationsCarouselProps) {
  const { t } = useLanguage()
  const { user } = useAuth()
  const [recommendations, setRecommendations] = React.useState<RecommendationItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  // Fetch recommendations on mount
  React.useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        // Mock user interests
        const userInterests = {
          industries: ["fintech", "healthtech", "edtech"],
          technologies: ["ai", "blockchain", "mobile"],
          stages: ["seed", "series-a"],
          goals: ["funding", "growth", "networking"],
          recentSearches: ["investment", "mentorship", "pitch deck"],
          recentViews: [
            { type: "event", id: "event-1", timestamp: Date.now() },
            { type: "funding", id: "funding-2", timestamp: Date.now() - 3600000 },
          ],
        }

        const recs = await RecommendationEngine.getPersonalizedRecommendations(user.id, user.role, userInterests, limit)

        setRecommendations(recs)
      } catch (error) {
        console.error("Failed to fetch recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [user, limit])

  // Track recommendation views
  React.useEffect(() => {
    if (recommendations.length > 0 && user) {
      const visibleRec = recommendations[currentIndex]
      RecommendationEngine.trackInteraction(user.id, visibleRec.id, "view")
    }
  }, [currentIndex, recommendations, user])

  // Handle recommendation click
  const handleRecommendationClick = (recommendationId: string) => {
    if (user) {
      RecommendationEngine.trackInteraction(user.id, recommendationId, "click")
    }
  }

  // Get icon for recommendation type
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-4 w-4" />
      case "funding":
        return <DollarSign className="h-4 w-4" />
      case "mentor":
        return <Lightbulb className="h-4 w-4" />
      case "startup":
        return <Rocket className="h-4 w-4" />
      case "resource":
        return <BookOpen className="h-4 w-4" />
      case "connection":
        return <Users className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  // Navigate to previous recommendation
  const prevRecommendation = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Navigate to next recommendation
  const nextRecommendation = () => {
    if (currentIndex < recommendations.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-center text-muted-foreground mb-4">Sign in to get personalized recommendations</p>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/login">{t("auth.login")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/signup">{t("auth.signup")}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // If loading, show skeleton
  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </CardFooter>
      </Card>
    )
  }

  // If no recommendations, show empty state
  if (recommendations.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-center text-muted-foreground">
            No recommendations available at this time. Check back later!
          </p>
        </CardContent>
      </Card>
    )
  }

  // Render recommendations carousel
  const currentRecommendation = recommendations[currentIndex]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div ref={carouselRef} className="relative overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out">
            <div className="w-full flex-shrink-0">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-4">
                {currentRecommendation.imageUrl ? (
                  <Image
                    src={currentRecommendation.imageUrl || "/placeholder.svg"}
                    alt={currentRecommendation.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    {getRecommendationIcon(currentRecommendation.type)}
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {getRecommendationIcon(currentRecommendation.type)}
                    <span className="capitalize">{currentRecommendation.type}</span>
                  </Badge>
                </div>
              </div>
              <h3 className="text-lg font-semibold">{currentRecommendation.title}</h3>
              <p className="text-muted-foreground mt-1">{currentRecommendation.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {currentRecommendation.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-4 gap-1">
            {recommendations.map((_, index) => (
              <button type="button"
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to recommendation ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="icon" onClick={prevRecommendation} disabled={currentIndex === 0}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous recommendation</span>
        </Button>
        <Button onClick={() => handleRecommendationClick(currentRecommendation.id)} asChild>
          <Link href={currentRecommendation.url}>View Details</Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextRecommendation}
          disabled={currentIndex === recommendations.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next recommendation</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
