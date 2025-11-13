export interface User {
  id: string
  name: string
  email: string
  avatar: string
  userType: 'mentor' | 'mentee' | 'startup'
  bio: string
  location: string
  timezone: string
  availability: Availability[]
  expertise: string[]
  industries: string[]
  interests: string[]
  goals: string[]
  experience: Experience[]
  education: Education[]
  languages: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isAvailable: boolean
  createdAt: string
  lastActive: string
}

export interface Availability {
  id: string
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  startTime: string
  endTime: string
  timezone: string
}

export interface Experience {
  id: string
  company: string
  position: string
  industry: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

export interface MentorProfile extends User {
  userType: 'mentor'
  mentoringStyle: 'structured' | 'casual' | 'hands-on' | 'advisory'
  specializations: string[]
  successStories: SuccessStory[]
  certifications: Certification[]
  hourlyRate?: number
  sessionTypes: SessionType[]
  maxMentees: number
  currentMentees: number
}

export interface MenteeProfile extends User {
  userType: 'mentee'
  currentRole: string
  company: string
  startupStage: 'idea' | 'mvp' | 'early-traction' | 'growth' | 'scaling'
  fundingStage: 'bootstrapped' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'public'
  teamSize: number
  challenges: string[]
  goals: string[]
  preferredMentorType: 'industry-expert' | 'technical' | 'business' | 'funding' | 'scaling'
  budget: 'free' | 'low' | 'medium' | 'high'
}

export interface StartupProfile extends User {
  userType: 'startup'
  companyName: string
  industry: string
  startupStage: 'idea' | 'mvp' | 'early-traction' | 'growth' | 'scaling'
  fundingStage: 'bootstrapped' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'public'
  teamSize: number
  fundingRaised?: number
  challenges: string[]
  goals: string[]
  preferredMentorType: 'industry-expert' | 'technical' | 'business' | 'funding' | 'scaling'
  budget: 'free' | 'low' | 'medium' | 'high'
}

export interface SuccessStory {
  id: string
  menteeName: string
  company: string
  challenge: string
  solution: string
  outcome: string
  duration: string
  testimonial: string
  rating: number
  date: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  description: string
}

export interface SessionType {
  id: string
  name: string
  description: string
  duration: number
  price: number
  isAvailable: boolean
}

export interface Match {
  id: string
  mentorId: string
  menteeId: string
  startupId?: string
  matchScore: number
  matchReasons: string[]
  compatibilityFactors: CompatibilityFactor[]
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  createdAt: string
  updatedAt: string
}

export interface CompatibilityFactor {
  factor: string
  score: number
  weight: number
  description: string
}

export interface Session {
  id: string
  matchId: string
  mentorId: string
  menteeId: string
  startupId?: string
  sessionType: string
  date: string
  startTime: string
  endTime: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
  notes: string
  feedback?: SessionFeedback
}

export interface SessionFeedback {
  id: string
  sessionId: string
  fromUserId: string
  toUserId: string
  rating: number
  comments: string
  categories: FeedbackCategory[]
  isAnonymous: boolean
  createdAt: string
}

export interface FeedbackCategory {
  category: string
  score: number
  comment: string
}

export interface SearchFilters {
  userType?: 'mentor' | 'mentee' | 'startup'
  expertise?: string[]
  industries?: string[]
  location?: string
  availability?: string[]
  rating?: number
  priceRange?: 'free' | 'low' | 'medium' | 'high'
  mentoringStyle?: string[]
  startupStage?: string[]
  fundingStage?: string[]
  isVerified?: boolean
  isAvailable?: boolean
}

export interface MatchingAlgorithm {
  weights: {
    expertise: number
    industry: number
    location: number
    availability: number
    rating: number
    goals: number
    challenges: number
    experience: number
  }
  thresholds: {
    minimumScore: number
    maximumDistance: number
    minimumRating: number
  }
}

export class MentorConnectService {
  private static instance: MentorConnectService
  private users: Map<string, User> = new Map()
  private matches: Map<string, Match> = new Map()
  private sessions: Map<string, Session> = new Map()
  private feedback: Map<string, SessionFeedback> = new Map()

  constructor() {
    this.initializeData()
  }

  static getInstance(): MentorConnectService {
    if (!MentorConnectService.instance) {
      MentorConnectService.instance = new MentorConnectService()
    }
    return MentorConnectService.instance
  }

  private initializeData() {
    // Initialize with sample data
    this.initializeMentors()
    this.initializeMentees()
    this.initializeStartups()
  }

  private initializeMentors() {
    const mentors: MentorProfile[] = [
      {
        id: "mentor-1",
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        avatar: "/avatars/sarah-chen.jpg",
        userType: "mentor",
        bio: "Serial entrepreneur with 15+ years experience building and scaling tech startups. Successfully exited 3 companies and helped 50+ startups raise over $200M in funding.",
        location: "San Francisco, CA",
        timezone: "PST",
        availability: [
          { id: "avail-1", day: "monday", startTime: "09:00", endTime: "17:00", timezone: "PST" },
          { id: "avail-2", day: "wednesday", startTime: "09:00", endTime: "17:00", timezone: "PST" },
          { id: "avail-3", day: "friday", startTime: "09:00", endTime: "17:00", timezone: "PST" }
        ],
        expertise: ["fundraising", "business-strategy", "scaling", "investor-relations"],
        industries: ["technology", "saas", "fintech", "healthtech"],
        interests: ["early-stage-startups", "venture-capital", "product-strategy"],
        goals: ["help-startups-scale", "mentor-next-generation"],
        experience: [
          {
            id: "exp-1",
            company: "TechFlow Inc",
            position: "CEO & Founder",
            industry: "SaaS",
            startDate: "2018-01",
            endDate: "2023-06",
            isCurrent: false,
            description: "Built and scaled B2B SaaS platform to $50M ARR",
            achievements: ["Raised $25M Series B", "Grew team to 200+ employees", "Achieved 300% YoY growth"]
          }
        ],
        education: [
          {
            id: "edu-1",
            institution: "Stanford University",
            degree: "MBA",
            field: "Business Administration",
            startDate: "2010-09",
            endDate: "2012-06",
            description: "Focus on entrepreneurship and venture capital"
          }
        ],
        languages: ["English", "Mandarin"],
        rating: 4.9,
        reviewCount: 47,
        isVerified: true,
        isAvailable: true,
        createdAt: "2023-01-15",
        lastActive: "2025-01-15",
        mentoringStyle: "structured",
        specializations: ["fundraising", "business-strategy", "team-building"],
        successStories: [
          {
            id: "story-1",
            menteeName: "Alex Rodriguez",
            company: "DataFlow Analytics",
            challenge: "Struggling to raise Series A funding",
            solution: "Developed comprehensive fundraising strategy and investor pitch",
            outcome: "Successfully raised $8M Series A",
            duration: "6 months",
            testimonial: "Sarah's guidance was invaluable in our fundraising journey. Her strategic advice helped us secure funding from top-tier investors.",
            rating: 5,
            date: "2024-06-15"
          }
        ],
        certifications: [
          {
            id: "cert-1",
            name: "Certified Business Coach",
            issuer: "International Coach Federation",
            date: "2022-03",
            description: "Professional coaching certification"
          }
        ],
        hourlyRate: 300,
        sessionTypes: [
          {
            id: "session-1",
            name: "Strategy Session",
            description: "1-hour strategic planning session",
            duration: 60,
            price: 300,
            isAvailable: true
          },
          {
            id: "session-2",
            name: "Fundraising Workshop",
            description: "2-hour intensive fundraising preparation",
            duration: 120,
            price: 500,
            isAvailable: true
          }
        ],
        maxMentees: 10,
        currentMentees: 6
      },
      {
        id: "mentor-2",
        name: "Michael Rodriguez",
        email: "michael.rodriguez@example.com",
        avatar: "/avatars/michael-rodriguez.jpg",
        userType: "mentor",
        bio: "Technical leader with 20+ years in software engineering and product development. Expert in building scalable systems and leading engineering teams.",
        location: "New York, NY",
        timezone: "EST",
        availability: [
          { id: "avail-4", day: "tuesday", startTime: "10:00", endTime: "18:00", timezone: "EST" },
          { id: "avail-5", day: "thursday", startTime: "10:00", endTime: "18:00", timezone: "EST" }
        ],
        expertise: ["software-engineering", "product-development", "technical-architecture", "team-leadership"],
        industries: ["technology", "software", "ai-ml", "cybersecurity"],
        interests: ["technical-mentoring", "product-strategy", "engineering-culture"],
        goals: ["mentor-technical-founders", "build-engineering-teams"],
        experience: [
          {
            id: "exp-2",
            company: "TechCorp",
            position: "VP of Engineering",
            industry: "Technology",
            startDate: "2019-03",
            endDate: "2024-12",
            isCurrent: true,
            description: "Leading engineering team of 150+ developers",
            achievements: ["Scaled engineering team 10x", "Improved system reliability to 99.9%", "Launched 3 major products"]
          }
        ],
        education: [
          {
            id: "edu-2",
            institution: "MIT",
            degree: "MS",
            field: "Computer Science",
            startDate: "2008-09",
            endDate: "2010-06",
            description: "Focus on distributed systems and software engineering"
          }
        ],
        languages: ["English", "Spanish"],
        rating: 4.8,
        reviewCount: 32,
        isVerified: true,
        isAvailable: true,
        createdAt: "2023-03-20",
        lastActive: "2025-01-15",
        mentoringStyle: "hands-on",
        specializations: ["technical-architecture", "engineering-leadership", "product-development"],
        successStories: [
          {
            id: "story-2",
            menteeName: "Jennifer Kim",
            company: "CloudScale",
            challenge: "Struggling with technical architecture decisions",
            solution: "Provided technical guidance and architecture review",
            outcome: "Successfully built scalable platform serving 1M+ users",
            duration: "8 months",
            testimonial: "Michael's technical expertise helped us make critical architecture decisions that enabled our rapid growth.",
            rating: 5,
            date: "2024-08-20"
          }
        ],
        certifications: [
          {
            id: "cert-2",
            name: "AWS Solutions Architect",
            issuer: "Amazon Web Services",
            date: "2021-11",
            description: "Cloud architecture certification"
          }
        ],
        hourlyRate: 250,
        sessionTypes: [
          {
            id: "session-3",
            name: "Technical Review",
            description: "1-hour technical architecture review",
            duration: 60,
            price: 250,
            isAvailable: true
          },
          {
            id: "session-4",
            name: "Code Review Session",
            description: "2-hour intensive code review and optimization",
            duration: 120,
            price: 400,
            isAvailable: true
          }
        ],
        maxMentees: 8,
        currentMentees: 4
      }
    ]

    mentors.forEach(mentor => this.users.set(mentor.id, mentor))
  }

  private initializeMentees() {
    const mentees: MenteeProfile[] = [
      {
        id: "mentee-1",
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        avatar: "/avatars/alex-johnson.jpg",
        userType: "mentee",
        bio: "First-time founder building a B2B SaaS platform. Looking for guidance on product-market fit and early-stage growth strategies.",
        location: "Austin, TX",
        timezone: "CST",
        availability: [
          { id: "avail-6", day: "monday", startTime: "14:00", endTime: "18:00", timezone: "CST" },
          { id: "avail-7", day: "wednesday", startTime: "14:00", endTime: "18:00", timezone: "CST" }
        ],
        expertise: ["product-management", "user-research", "early-stage-marketing"],
        industries: ["saas", "b2b", "technology"],
        interests: ["product-market-fit", "user-acquisition", "early-stage-fundraising"],
        goals: ["validate-product-market-fit", "raise-seed-funding", "build-strong-team"],
        experience: [
          {
            id: "exp-3",
            company: "StartupXYZ",
            position: "Founder & CEO",
            industry: "SaaS",
            startDate: "2024-01",
            endDate: null,
            isCurrent: true,
            description: "Building B2B SaaS platform for small businesses",
            achievements: ["Launched MVP", "Gained 50 beta users", "Generated $5K MRR"]
          }
        ],
        education: [
          {
            id: "edu-3",
            institution: "University of Texas",
            degree: "BS",
            field: "Computer Science",
            startDate: "2018-09",
            endDate: "2022-05",
            description: "Focus on software engineering and entrepreneurship"
          }
        ],
        languages: ["English"],
        rating: 0,
        reviewCount: 0,
        isVerified: false,
        isAvailable: true,
        createdAt: "2024-06-01",
        lastActive: "2025-01-15",
        currentRole: "Founder & CEO",
        company: "StartupXYZ",
        startupStage: "early-traction",
        fundingStage: "bootstrapped",
        teamSize: 3,
        challenges: ["product-market-fit", "user-acquisition", "team-building"],
        goals: ["validate-product-market-fit", "raise-seed-funding", "build-strong-team"],
        preferredMentorType: "business",
        budget: "medium"
      }
    ]

    mentees.forEach(mentee => this.users.set(mentee.id, mentee))
  }

  private initializeStartups() {
    const startups: StartupProfile[] = [
      {
        id: "startup-1",
        name: "TechFlow Solutions",
        email: "contact@techflowsolutions.com",
        avatar: "/avatars/techflow-logo.jpg",
        userType: "startup",
        bio: "AI-powered workflow automation platform for enterprise teams. Currently in growth stage with 500+ customers.",
        location: "Seattle, WA",
        timezone: "PST",
        availability: [
          { id: "avail-8", day: "tuesday", startTime: "10:00", endTime: "16:00", timezone: "PST" },
          { id: "avail-9", day: "thursday", startTime: "10:00", endTime: "16:00", timezone: "PST" }
        ],
        expertise: ["ai-ml", "workflow-automation", "enterprise-sales", "product-development"],
        industries: ["technology", "ai-ml", "enterprise", "saas"],
        interests: ["scaling-operations", "enterprise-sales", "team-expansion"],
        goals: ["scale-to-1000-customers", "raise-series-b", "expand-internationally"],
        experience: [
          {
            id: "exp-4",
            company: "TechFlow Solutions",
            position: "CEO & Co-Founder",
            industry: "AI/ML",
            startDate: "2022-03",
            endDate: null,
            isCurrent: true,
            description: "Leading AI-powered workflow automation platform",
            achievements: ["Grew to 500+ customers", "Raised $5M Series A", "Built team of 25"]
          }
        ],
        education: [
          {
            id: "edu-4",
            institution: "University of Washington",
            degree: "MS",
            field: "Computer Science",
            startDate: "2018-09",
            endDate: "2020-06",
            description: "Focus on artificial intelligence and machine learning"
          }
        ],
        languages: ["English"],
        rating: 0,
        reviewCount: 0,
        isVerified: true,
        isAvailable: true,
        createdAt: "2022-03-15",
        lastActive: "2025-01-15",
        companyName: "TechFlow Solutions",
        industry: "AI/ML",
        startupStage: "growth",
        fundingStage: "series-a",
        teamSize: 25,
        fundingRaised: 5000000,
        challenges: ["scaling-operations", "enterprise-sales", "international-expansion"],
        goals: ["scale-to-1000-customers", "raise-series-b", "expand-internationally"],
        preferredMentorType: "scaling",
        budget: "high"
      }
    ]

    startups.forEach(startup => this.users.set(startup.id, startup))
  }

  async findMatches(
    userId: string,
    filters: SearchFilters = {},
    algorithm: MatchingAlgorithm = this.getDefaultAlgorithm()
  ): Promise<Match[]> {
    const user = this.users.get(userId)
    if (!user) throw new Error("User not found")

    const potentialMatches = this.getPotentialMatches(user, filters)
    const scoredMatches = potentialMatches.map(match => ({
      ...match,
      matchScore: this.calculateMatchScore(user, match, algorithm),
      matchReasons: this.getMatchReasons(user, match),
      compatibilityFactors: this.getCompatibilityFactors(user, match, algorithm)
    }))

    return scoredMatches
      .filter(match => match.matchScore >= algorithm.thresholds.minimumScore)
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  private getPotentialMatches(user: User, filters: SearchFilters): User[] {
    let matches = Array.from(this.users.values()).filter(u => u.id !== user.id)

    // Apply filters
    if (filters.userType) {
      matches = matches.filter(u => u.userType === filters.userType)
    }
    if (filters.expertise && filters.expertise.length > 0) {
      matches = matches.filter(u => 
        filters.expertise!.some(exp => u.expertise.includes(exp))
      )
    }
    if (filters.industries && filters.industries.length > 0) {
      matches = matches.filter(u => 
        filters.industries!.some(ind => u.industries.includes(ind))
      )
    }
    if (filters.rating) {
      matches = matches.filter(u => u.rating >= filters.rating!)
    }
    if (filters.isVerified !== undefined) {
      matches = matches.filter(u => u.isVerified === filters.isVerified)
    }
    if (filters.isAvailable !== undefined) {
      matches = matches.filter(u => u.isAvailable === filters.isAvailable)
    }

    return matches
  }

  private calculateMatchScore(user: User, match: User, algorithm: MatchingAlgorithm): number {
    let totalScore = 0
    let totalWeight = 0

    // Expertise matching
    const expertiseScore = this.calculateExpertiseScore(user, match)
    totalScore += expertiseScore * algorithm.weights.expertise
    totalWeight += algorithm.weights.expertise

    // Industry matching
    const industryScore = this.calculateIndustryScore(user, match)
    totalScore += industryScore * algorithm.weights.industry
    totalWeight += algorithm.weights.industry

    // Location matching
    const locationScore = this.calculateLocationScore(user, match)
    totalScore += locationScore * algorithm.weights.location
    totalWeight += algorithm.weights.location

    // Availability matching
    const availabilityScore = this.calculateAvailabilityScore(user, match)
    totalScore += availabilityScore * algorithm.weights.availability
    totalWeight += algorithm.weights.availability

    // Rating consideration
    const ratingScore = match.rating / 5.0
    totalScore += ratingScore * algorithm.weights.rating
    totalWeight += algorithm.weights.rating

    // Goals matching
    const goalsScore = this.calculateGoalsScore(user, match)
    totalScore += goalsScore * algorithm.weights.goals
    totalWeight += algorithm.weights.goals

    return totalWeight > 0 ? totalScore / totalWeight : 0
  }

  private calculateExpertiseScore(user: User, match: User): number {
    const userExpertise = new Set(user.expertise)
    const matchExpertise = new Set(match.expertise)
    const intersection = new Set([...userExpertise].filter(x => matchExpertise.has(x)))
    const union = new Set([...userExpertise, ...matchExpertise])
    return union.size > 0 ? intersection.size / union.size : 0
  }

  private calculateIndustryScore(user: User, match: User): number {
    const userIndustries = new Set(user.industries)
    const matchIndustries = new Set(match.industries)
    const intersection = new Set([...userIndustries].filter(x => matchIndustries.has(x)))
    const union = new Set([...userIndustries, ...matchIndustries])
    return union.size > 0 ? intersection.size / union.size : 0
  }

  private calculateLocationScore(user: User, match: User): number {
    // Simple location matching - in a real implementation, you'd use geocoding
    return user.location === match.location ? 1.0 : 0.5
  }

  private calculateAvailabilityScore(user: User, match: User): number {
    const userAvailability = new Set(user.availability.map(a => a.day))
    const matchAvailability = new Set(match.availability.map(a => a.day))
    const intersection = new Set([...userAvailability].filter(x => matchAvailability.has(x)))
    return intersection.size > 0 ? 1.0 : 0.0
  }

  private calculateGoalsScore(user: User, match: User): number {
    const userGoals = new Set(user.goals)
    const matchGoals = new Set(match.goals)
    const intersection = new Set([...userGoals].filter(x => matchGoals.has(x)))
    const union = new Set([...userGoals, ...matchGoals])
    return union.size > 0 ? intersection.size / union.size : 0
  }

  private getMatchReasons(user: User, match: User): string[] {
    const reasons: string[] = []

    // Expertise overlap
    const expertiseOverlap = user.expertise.filter(exp => match.expertise.includes(exp))
    if (expertiseOverlap.length > 0) {
      reasons.push(`Shared expertise in ${expertiseOverlap.join(", ")}`)
    }

    // Industry overlap
    const industryOverlap = user.industries.filter(ind => match.industries.includes(ind))
    if (industryOverlap.length > 0) {
      reasons.push(`Experience in ${industryOverlap.join(", ")} industries`)
    }

    // Goals alignment
    const goalsOverlap = user.goals.filter(goal => match.goals.includes(goal))
    if (goalsOverlap.length > 0) {
      reasons.push(`Aligned goals: ${goalsOverlap.join(", ")}`)
    }

    // High rating
    if (match.rating >= 4.5) {
      reasons.push("Highly rated mentor")
    }

    return reasons
  }

  private getCompatibilityFactors(user: User, match: User, algorithm: MatchingAlgorithm): CompatibilityFactor[] {
    return [
      {
        factor: "Expertise Match",
        score: this.calculateExpertiseScore(user, match),
        weight: algorithm.weights.expertise,
        description: "Alignment of skills and expertise areas"
      },
      {
        factor: "Industry Experience",
        score: this.calculateIndustryScore(user, match),
        weight: algorithm.weights.industry,
        description: "Relevant industry experience"
      },
      {
        factor: "Location Proximity",
        score: this.calculateLocationScore(user, match),
        weight: algorithm.weights.location,
        description: "Geographic proximity for in-person meetings"
      },
      {
        factor: "Availability Overlap",
        score: this.calculateAvailabilityScore(user, match),
        weight: algorithm.weights.availability,
        description: "Scheduling compatibility"
      },
      {
        factor: "Mentor Rating",
        score: match.rating / 5.0,
        weight: algorithm.weights.rating,
        description: "Quality of previous mentoring experiences"
      },
      {
        factor: "Goals Alignment",
        score: this.calculateGoalsScore(user, match),
        weight: algorithm.weights.goals,
        description: "Alignment of mentoring goals and objectives"
      }
    ]
  }

  private getDefaultAlgorithm(): MatchingAlgorithm {
    return {
      weights: {
        expertise: 0.25,
        industry: 0.20,
        location: 0.15,
        availability: 0.15,
        rating: 0.15,
        goals: 0.10
      },
      thresholds: {
        minimumScore: 0.6,
        maximumDistance: 100,
        minimumRating: 4.0
      }
    }
  }

  async createMatch(mentorId: string, menteeId: string, startupId?: string): Promise<Match> {
    const mentor = this.users.get(mentorId) as MentorProfile
    const mentee = this.users.get(menteeId) as MenteeProfile
    const startup = startupId ? this.users.get(startupId) as StartupProfile : undefined

    if (!mentor || !mentee) {
      throw new Error("Invalid mentor or mentee")
    }

    const match: Match = {
      id: `match-${Date.now()}`,
      mentorId,
      menteeId,
      startupId,
      matchScore: 0,
      matchReasons: [],
      compatibilityFactors: [],
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.matches.set(match.id, match)
    return match
  }

  async scheduleSession(matchId: string, sessionType: string, date: string, startTime: string, endTime: string): Promise<Session> {
    const match = this.matches.get(matchId)
    if (!match) throw new Error("Match not found")

    const session: Session = {
      id: `session-${Date.now()}`,
      matchId,
      mentorId: match.mentorId,
      menteeId: match.menteeId,
      startupId: match.startupId,
      sessionType,
      date,
      startTime,
      endTime,
      duration: this.calculateDuration(startTime, endTime),
      status: "scheduled",
      notes: ""
    }

    this.sessions.set(session.id, session)
    return session
  }

  private calculateDuration(startTime: string, endTime: string): number {
    const start = new Date(`2000-01-01T${startTime}`)
    const end = new Date(`2000-01-01T${endTime}`)
    return (end.getTime() - start.getTime()) / (1000 * 60) // Duration in minutes
  }

  async submitFeedback(sessionId: string, fromUserId: string, toUserId: string, rating: number, comments: string, categories: FeedbackCategory[]): Promise<SessionFeedback> {
    const feedback: SessionFeedback = {
      id: `feedback-${Date.now()}`,
      sessionId,
      fromUserId,
      toUserId,
      rating,
      comments,
      categories,
      isAnonymous: false,
      createdAt: new Date().toISOString()
    }

    this.feedback.set(feedback.id, feedback)
    
    // Update user rating
    const user = this.users.get(toUserId)
    if (user) {
      const newReviewCount = user.reviewCount + 1
      const newRating = ((user.rating * user.reviewCount) + rating) / newReviewCount
      user.rating = newRating
      user.reviewCount = newReviewCount
    }

    return feedback
  }

  async searchUsers(filters: SearchFilters): Promise<User[]> {
    let results = Array.from(this.users.values())

    // Apply filters
    if (filters.userType) {
      results = results.filter(u => u.userType === filters.userType)
    }
    if (filters.expertise && filters.expertise.length > 0) {
      results = results.filter(u => 
        filters.expertise!.some(exp => u.expertise.includes(exp))
      )
    }
    if (filters.industries && filters.industries.length > 0) {
      results = results.filter(u => 
        filters.industries!.some(ind => u.industries.includes(ind))
      )
    }
    if (filters.location) {
      results = results.filter(u => 
        u.location.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }
    if (filters.rating) {
      results = results.filter(u => u.rating >= filters.rating!)
    }
    if (filters.isVerified !== undefined) {
      results = results.filter(u => u.isVerified === filters.isVerified)
    }
    if (filters.isAvailable !== undefined) {
      results = results.filter(u => u.isAvailable === filters.isAvailable)
    }

    return results.sort((a, b) => b.rating - a.rating)
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.users.get(userId) || null
  }

  async getMatchesByUserId(userId: string): Promise<Match[]> {
    return Array.from(this.matches.values()).filter(match => 
      match.mentorId === userId || match.menteeId === userId || match.startupId === userId
    )
  }

  async getSessionsByUserId(userId: string): Promise<Session[]> {
    return Array.from(this.sessions.values()).filter(session => 
      session.mentorId === userId || session.menteeId === userId || session.startupId === userId
    )
  }
} 