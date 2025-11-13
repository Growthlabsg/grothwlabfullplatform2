import type { UserRole } from "@/types/auth"

// Define recommendation types
export type RecommendationType = "event" | "funding" | "mentor" | "startup" | "resource" | "course" | "connection"

// Define recommendation item interface
export interface RecommendationItem {
  id: string
  type: RecommendationType
  title: string
  description: string
  imageUrl?: string
  url: string
  relevanceScore: number
  tags: string[]
  createdAt: string
}

// Define user interests interface
export interface UserInterests {
  industries?: string[]
  technologies?: string[]
  stages?: string[]
  roles?: string[]
  goals?: string[]
  recentSearches?: string[]
  recentViews?: { type: string; id: string; timestamp: number }[]
  connections?: string[]
}

// Recommendation engine class
export class RecommendationEngine {
  /**
   * Get personalized recommendations for a user
   * @param userId User ID
   * @param userRole User role
   * @param interests User interests
   * @param limit Number of recommendations to return
   * @returns Promise<RecommendationItem[]> Recommendations
   */
  static async getPersonalizedRecommendations(
    userId: string,
    userRole: UserRole,
    interests: UserInterests,
    limit = 10,
  ): Promise<RecommendationItem[]> {
    try {
      // In a real app, this would call an AI service or recommendation API
      // For now, we'll simulate recommendations based on user role and interests

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate recommendations based on user role and interests
      const recommendations = this.generateRecommendations(userRole, interests)

      // Sort by relevance score and limit results
      return recommendations.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit)
    } catch (error) {
      console.error("Failed to get recommendations:", error)
      return []
    }
  }

  /**
   * Generate recommendations based on user role and interests
   * @param userRole User role
   * @param interests User interests
   * @returns RecommendationItem[] Recommendations
   */
  private static generateRecommendations(userRole: UserRole, interests: UserInterests): RecommendationItem[] {
    const recommendations: RecommendationItem[] = []
    const now = new Date().toISOString()

    // Add role-specific recommendations
    if (userRole === "startup") {
      recommendations.push(
        {
          id: "funding-1",
          type: "funding",
          title: "Seed Funding Opportunity",
          description: "Apply for seed funding up to $100,000 for early-stage startups.",
          imageUrl: "/growth-funding.png",
          url: "/funding/opportunities/seed-funding",
          relevanceScore: this.calculateRelevanceScore(interests, ["seed", "funding", "early-stage"]),
          tags: ["seed", "funding", "early-stage"],
          createdAt: now,
        },
        {
          id: "mentor-1",
          type: "mentor",
          title: "Connect with Tech Mentors",
          description: "Get guidance from experienced tech entrepreneurs.",
          imageUrl: "/guiding-path.png",
          url: "/mentorship/tech",
          relevanceScore: this.calculateRelevanceScore(interests, ["mentor", "tech", "guidance"]),
          tags: ["mentor", "tech", "guidance"],
          createdAt: now,
        },
      )
    }

    if (userRole === "investor") {
      recommendations.push(
        {
          id: "startup-1",
          type: "startup",
          title: "Promising Fintech Startups",
          description: "Discover high-potential fintech startups seeking investment.",
          imageUrl: "/interconnected-fintech.png",
          url: "/startups/fintech",
          relevanceScore: this.calculateRelevanceScore(interests, ["fintech", "investment", "startup"]),
          tags: ["fintech", "investment", "startup"],
          createdAt: now,
        },
        {
          id: "event-1",
          type: "event",
          title: "Investor Networking Event",
          description: "Connect with other investors and discuss opportunities.",
          imageUrl: "/interconnected-world.png",
          url: "/events/investor-networking",
          relevanceScore: this.calculateRelevanceScore(interests, ["investor", "networking", "event"]),
          tags: ["investor", "networking", "event"],
          createdAt: now,
        },
      )
    }

    if (userRole === "mentor") {
      recommendations.push(
        {
          id: "startup-2",
          type: "startup",
          title: "Startups Seeking Mentorship",
          description: "Connect with startups looking for guidance in your expertise area.",
          imageUrl: "/guiding-path.png",
          url: "/mentorship/opportunities",
          relevanceScore: this.calculateRelevanceScore(interests, ["mentorship", "guidance", "expertise"]),
          tags: ["mentorship", "guidance", "expertise"],
          createdAt: now,
        },
        {
          id: "course-1",
          type: "course",
          title: "Effective Mentoring Techniques",
          description: "Learn advanced mentoring strategies to help startups succeed.",
          imageUrl: "/placeholder.svg?height=100&width=100&query=mentoring",
          url: "/courses/mentoring-techniques",
          relevanceScore: this.calculateRelevanceScore(interests, ["mentoring", "techniques", "education"]),
          tags: ["mentoring", "techniques", "education"],
          createdAt: now,
        },
      )
    }

    // Add general recommendations for all users
    recommendations.push(
      {
        id: "event-2",
        type: "event",
        title: "GrowthLab Demo Day",
        description: "Watch startups pitch their innovative solutions.",
        imageUrl: "/placeholder.svg?height=100&width=100&query=demo+day",
        url: "/events/demo-day",
        relevanceScore: this.calculateRelevanceScore(interests, ["demo", "pitch", "innovation"]),
        tags: ["demo", "pitch", "innovation"],
        createdAt: now,
      },
      {
        id: "resource-1",
        type: "resource",
        title: "Startup Growth Playbook",
        description: "Essential strategies for scaling your startup in Southeast Asia.",
        imageUrl: "/placeholder.svg?height=100&width=100&query=growth+playbook",
        url: "/resources/growth-playbook",
        relevanceScore: this.calculateRelevanceScore(interests, ["growth", "scaling", "strategy"]),
        tags: ["growth", "scaling", "strategy"],
        createdAt: now,
      },
      {
        id: "connection-1",
        type: "connection",
        title: "Expand Your Network",
        description: "Connect with professionals in your industry.",
        imageUrl: "/interconnected-world.png",
        url: "/community/network",
        relevanceScore: this.calculateRelevanceScore(interests, ["network", "connection", "professional"]),
        tags: ["network", "connection", "professional"],
        createdAt: now,
      },
    )

    return recommendations
  }

  /**
   * Calculate relevance score based on user interests and item tags
   * @param interests User interests
   * @param tags Item tags
   * @returns number Relevance score (0-100)
   */
  private static calculateRelevanceScore(interests: UserInterests, tags: string[]): number {
    let score = 50 // Base score

    // Check for matching industries
    if (interests.industries) {
      const matchingIndustries = interests.industries.filter((industry) =>
        tags.some((tag) => tag.toLowerCase().includes(industry.toLowerCase())),
      )
      score += matchingIndustries.length * 5
    }

    // Check for matching technologies
    if (interests.technologies) {
      const matchingTechnologies = interests.technologies.filter((tech) =>
        tags.some((tag) => tag.toLowerCase().includes(tech.toLowerCase())),
      )
      score += matchingTechnologies.length * 5
    }

    // Check for matching goals
    if (interests.goals) {
      const matchingGoals = interests.goals.filter((goal) =>
        tags.some((tag) => tag.toLowerCase().includes(goal.toLowerCase())),
      )
      score += matchingGoals.length * 10
    }

    // Check for recent searches
    if (interests.recentSearches) {
      const matchingSearches = interests.recentSearches.filter((search) =>
        tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())),
      )
      score += matchingSearches.length * 15
    }

    // Check for recent views
    if (interests.recentViews) {
      const matchingViews = interests.recentViews.filter((view) =>
        tags.some((tag) => tag.toLowerCase().includes(view.type.toLowerCase())),
      )
      score += matchingViews.length * 10
    }

    // Ensure score is between 0 and 100
    return Math.min(Math.max(score, 0), 100)
  }

  /**
   * Track user interaction with a recommendation
   * @param userId User ID
   * @param recommendationId Recommendation ID
   * @param action Action (view, click, dismiss)
   */
  static async trackInteraction(
    userId: string,
    recommendationId: string,
    action: "view" | "click" | "dismiss",
  ): Promise<void> {
    try {
      // In a real app, this would call an API to track the interaction
      console.log(`Tracking ${action} for user ${userId} on recommendation ${recommendationId}`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 200))
    } catch (error) {
      console.error("Failed to track interaction:", error)
    }
  }
}
