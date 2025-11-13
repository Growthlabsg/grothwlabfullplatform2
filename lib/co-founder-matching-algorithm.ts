export interface CoFounderProfile {
  id: string
  name: string
  email: string
  location: string
  experience: 'beginner' | 'intermediate' | 'expert'
  availability: 'full-time' | 'part-time' | 'weekends'
  industry: string[]
  skills: string[]
  interests: string[]
  values: string[]
  goals: string[]
  fundingStage: 'idea' | 'prototype' | 'mvp' | 'traction' | 'funding'
  teamSize: 'solo' | '2-3' | '4-5' | '6+'
  commitment: 'high' | 'medium' | 'low'
  riskTolerance: 'high' | 'medium' | 'low'
  workStyle: 'collaborative' | 'independent' | 'leadership' | 'support'
  communication: 'direct' | 'diplomatic' | 'analytical' | 'creative'
  timezone: string
  languages: string[]
  education: string
  previousStartups: number
  network: string[]
  preferences: {
    ageRange: [number, number]
    experienceLevel: string[]
    location: string[]
    availability: string[]
    skills: string[]
    values: string[]
  }
  compatibilityScores: Record<string, number>
  lastActive: Date
  isVerified: boolean
  isPremium: boolean
}

export interface MatchResult {
  profile: CoFounderProfile
  compatibilityScore: number
  skillComplementarity: number
  valueAlignment: number
  goalAlignment: number
  experienceFit: number
  availabilityMatch: number
  locationCompatibility: number
  communicationStyle: number
  riskToleranceMatch: number
  workStyleCompatibility: number
  detailedBreakdown: {
    skills: { complementary: string[], overlapping: string[], missing: string[] }
    values: { aligned: string[], conflicting: string[] }
    goals: { shared: string[], different: string[] }
    experience: { strengths: string[], gaps: string[] }
  }
  matchQuality: 'excellent' | 'good' | 'fair' | 'poor'
  matchReason: string[]
}

export class CoFounderMatchingAlgorithm {
  private static readonly WEIGHTS = {
    skills: 0.25,
    values: 0.20,
    goals: 0.20,
    experience: 0.15,
    availability: 0.10,
    location: 0.05,
    communication: 0.05
  }

  private static readonly SKILL_CATEGORIES = {
    technical: ['programming', 'design', 'data-science', 'ai-ml', 'blockchain', 'mobile-dev'],
    business: ['marketing', 'sales', 'finance', 'operations', 'strategy', 'product-management'],
    creative: ['design', 'content', 'branding', 'storytelling', 'video-production'],
    analytical: ['data-analysis', 'research', 'market-analysis', 'financial-modeling'],
    leadership: ['team-management', 'project-management', 'mentoring', 'public-speaking']
  }

  private static readonly VALUE_CATEGORIES = {
    innovation: ['disruption', 'creativity', 'experimentation', 'risk-taking'],
    impact: ['social-good', 'environmental', 'community', 'education'],
    growth: ['scaling', 'expansion', 'market-dominance', 'global-reach'],
    quality: ['excellence', 'craftsmanship', 'attention-to-detail', 'perfection'],
    collaboration: ['teamwork', 'partnership', 'knowledge-sharing', 'mentorship']
  }

  static calculateCompatibility(profile1: CoFounderProfile, profile2: CoFounderProfile): MatchResult {
    const skillScore = this.calculateSkillComplementarity(profile1, profile2)
    const valueScore = this.calculateValueAlignment(profile1, profile2)
    const goalScore = this.calculateGoalAlignment(profile1, profile2)
    const experienceScore = this.calculateExperienceFit(profile1, profile2)
    const availabilityScore = this.calculateAvailabilityMatch(profile1, profile2)
    const locationScore = this.calculateLocationCompatibility(profile1, profile2)
    const communicationScore = this.calculateCommunicationStyle(profile1, profile2)

    const totalScore = 
      skillScore * this.WEIGHTS.skills +
      valueScore * this.WEIGHTS.values +
      goalScore * this.WEIGHTS.goals +
      experienceScore * this.WEIGHTS.experience +
      availabilityScore * this.WEIGHTS.availability +
      locationScore * this.WEIGHTS.location +
      communicationScore * this.WEIGHTS.communication

    const detailedBreakdown = this.generateDetailedBreakdown(profile1, profile2)
    const matchQuality = this.determineMatchQuality(totalScore)
    const matchReasons = this.generateMatchReasons(profile1, profile2, totalScore)

    return {
      profile: profile2,
      compatibilityScore: totalScore,
      skillComplementarity: skillScore,
      valueAlignment: valueScore,
      goalAlignment: goalScore,
      experienceFit: experienceScore,
      availabilityMatch: availabilityScore,
      locationCompatibility: locationScore,
      communicationStyle: communicationScore,
      detailedBreakdown,
      matchQuality,
      matchReason: matchReasons
    }
  }

  private static calculateSkillComplementarity(profile1: CoFounderProfile, profile2: CoFounderProfile): number {
    const skills1 = new Set(profile1.skills)
    const skills2 = new Set(profile2.skills)
    
    // Calculate overlapping skills (good for understanding)
    const overlapping = [...skills1].filter(skill => skills2.has(skill))
    
    // Calculate complementary skills (excellent for team building)
    const complementary = [...skills2].filter(skill => !skills1.has(skill))
    
    // Calculate missing skills (potential gaps)
    const missing = [...skills1].filter(skill => !skills2.has(skill))
    
    // Score based on optimal balance: some overlap + good complementarity
    const overlapScore = Math.min(overlapping.length / 3, 1) * 0.3
    const complementarityScore = Math.min(complementary.length / 5, 1) * 0.7
    
    return Math.min(overlapScore + complementarityScore, 1)
  }

  private static calculateValueAlignment(profile1: CoFounderProfile, profile2: CoFounderProfile): number {
    const values1 = new Set(profile1.values)
    const values2 = new Set(profile2.values)
    
    const aligned = [...values1].filter(value => values2.has(value))
    const conflicting = this.findConflictingValues(profile1.values, profile2.values)
    
    const alignmentScore = aligned.length / Math.max(values1.size, values2.size)
    const conflictPenalty = conflicting.length * 0.2
    
    return Math.max(alignmentScore - conflictPenalty, 0)
  }

  private static calculateGoalAlignment(profile1: CoFounderProfile, profile2: CoFounderProfile): number {
    const goals1 = new Set(profile1.goals)
    const goals2 = new Set(profile2.goals)
    
    const shared = [...goals1].filter(goal => goals2.has(goal))
    const total = new Set([...goals1, ...goals2])
    
    return shared.length / total.size
  }

  private static calculateExperienceFit(profile1: CoFounderProfile, profile2: CoFounderProfile): number {
    const exp1 = this.experienceToNumber(profile1.experience)
    const exp2 = this.experienceToNumber(profile2.experience)
    
    // Prefer complementary experience levels
    const diff = Math.abs(exp1 - exp2)
    if (diff === 0) return 0.7 // Same level
    if (diff === 1) return 1.0 // Complementary
    if (diff === 2) return 0.5 // Too different
    
    return 0.3
  }

  private static calculateAvailabilityMatch(profile1: CoFounderProfile, profile2: CoFounderProfile): number {
    const avail1 = profile1.availability
    const avail2 = profile2.availability
    
    if (avail1 === avail2) return 1.0
    if (avail1 === 'full-time' && avail2 === 'part-time') return 0.6
    if (avail1 === 'part-time' && avail2 === 'full-time') return 0.6
    if (avail1 === 'weekends' || avail2 === 'weekends') return 0.3
    
    return 0.5
  }

  private static calculateLocationCompatibility(profile1: CoFounderProfile, profile2: CoFounderProfile): number {
    const loc1 = profile1.location.toLowerCase()
    const loc2 = profile2.location.toLowerCase()
    
    if (loc1 === loc2) return 1.0
    if (this.isSameCountry(loc1, loc2)) return 0.8
    if (this.isSameRegion(loc1, loc2)) return 0.6
    if (this.isCompatibleTimezone(loc1, loc2)) return 0.4
    
    return 0.2
  }

  private static calculateCommunicationStyle(profile1: CoFounderProfile, profile2: CoFounderProfile): number {
    const comm1 = profile1.communication
    const comm2 = profile2.communication
    
    // Complementary communication styles work well
    if (comm1 === 'direct' && comm2 === 'diplomatic') return 0.9
    if (comm1 === 'diplomatic' && comm2 === 'direct') return 0.9
    if (comm1 === 'analytical' && comm2 === 'creative') return 0.9
    if (comm1 === 'creative' && comm2 === 'analytical') return 0.9
    
    if (comm1 === comm2) return 0.7
    
    return 0.5
  }

  private static generateDetailedBreakdown(profile1: CoFounderProfile, profile2: CoFounderProfile) {
    const skills1 = new Set(profile1.skills)
    const skills2 = new Set(profile2.skills)
    const values1 = new Set(profile1.values)
    const values2 = new Set(profile2.values)
    const goals1 = new Set(profile1.goals)
    const goals2 = new Set(profile2.goals)

    return {
      skills: {
        complementary: [...skills2].filter(skill => !skills1.has(skill)),
        overlapping: [...skills1].filter(skill => skills2.has(skill)),
        missing: [...skills1].filter(skill => !skills2.has(skill))
      },
      values: {
        aligned: [...values1].filter(value => values2.has(value)),
        conflicting: this.findConflictingValues(profile1.values, profile2.values)
      },
      goals: {
        shared: [...goals1].filter(goal => goals2.has(goal)),
        different: [...new Set([...goals1, ...goals2])].filter(goal => 
          !goals1.has(goal) || !goals2.has(goal)
        )
      },
      experience: {
        strengths: this.identifyExperienceStrengths(profile1, profile2),
        gaps: this.identifyExperienceGaps(profile1, profile2)
      }
    }
  }

  private static determineMatchQuality(score: number): 'excellent' | 'good' | 'fair' | 'poor' {
    if (score >= 0.85) return 'excellent'
    if (score >= 0.70) return 'good'
    if (score >= 0.50) return 'fair'
    return 'poor'
  }

  private static generateMatchReasons(profile1: CoFounderProfile, profile2: CoFounderProfile, score: number): string[] {
    const reasons: string[] = []
    
    if (score >= 0.85) {
      reasons.push('High compatibility across all key areas')
      reasons.push('Complementary skill sets')
      reasons.push('Shared values and goals')
    } else if (score >= 0.70) {
      reasons.push('Good skill complementarity')
      reasons.push('Aligned on core values')
    } else if (score >= 0.50) {
      reasons.push('Some complementary skills')
      reasons.push('Potential for collaboration')
    }
    
    return reasons
  }

  // Helper methods
  private static experienceToNumber(exp: string): number {
    switch (exp) {
      case 'beginner': return 1
      case 'intermediate': return 2
      case 'expert': return 3
      default: return 2
    }
  }

  private static findConflictingValues(values1: string[], values2: string[]): string[] {
    const conflicts: string[] = []
    // Add logic to identify conflicting values
    return conflicts
  }

  private static isSameCountry(loc1: string, loc2: string): boolean {
    // Simplified logic - in real implementation, use proper geocoding
    return loc1.split(',')[0] === loc2.split(',')[0]
  }

  private static isSameRegion(loc1: string, loc2: string): boolean {
    // Simplified logic - in real implementation, use proper geocoding
    return loc1.includes('Asia') && loc2.includes('Asia')
  }

  private static isCompatibleTimezone(loc1: string, loc2: string): boolean {
    // Simplified logic - in real implementation, use timezone API
    return true
  }

  private static identifyExperienceStrengths(profile1: CoFounderProfile, profile2: CoFounderProfile): string[] {
    const strengths: string[] = []
    if (profile1.previousStartups > 0) strengths.push('Previous startup experience')
    if (profile2.previousStartups > 0) strengths.push('Previous startup experience')
    return strengths
  }

  private static identifyExperienceGaps(profile1: CoFounderProfile, profile2: CoFounderProfile): string[] {
    const gaps: string[] = []
    if (profile1.previousStartups === 0 && profile2.previousStartups === 0) {
      gaps.push('No previous startup experience')
    }
    return gaps
  }

  // Advanced filtering methods
  static filterProfiles(
    userProfile: CoFounderProfile,
    allProfiles: CoFounderProfile[],
    filters: {
      minScore?: number
      location?: string[]
      experience?: string[]
      availability?: string[]
      skills?: string[]
      values?: string[]
      maxDistance?: number
    }
  ): CoFounderProfile[] {
    return allProfiles
      .filter(profile => profile.id !== userProfile.id)
      .filter(profile => {
        if (filters.location && filters.location.length > 0) {
          if (!filters.location.some(loc => 
            profile.location.toLowerCase().includes(loc.toLowerCase())
          )) return false
        }
        
        if (filters.experience && filters.experience.length > 0) {
          if (!filters.experience.includes(profile.experience)) return false
        }
        
        if (filters.availability && filters.availability.length > 0) {
          if (!filters.availability.includes(profile.availability)) return false
        }
        
        if (filters.skills && filters.skills.length > 0) {
          const hasRequiredSkills = filters.skills.some(skill => 
            profile.skills.includes(skill)
          )
          if (!hasRequiredSkills) return false
        }
        
        if (filters.values && filters.values.length > 0) {
          const hasRequiredValues = filters.values.some(value => 
            profile.values.includes(value)
          )
          if (!hasRequiredValues) return false
        }
        
        return true
      })
  }

  static getTopMatches(
    userProfile: CoFounderProfile,
    allProfiles: CoFounderProfile[],
    limit: number = 10
  ): MatchResult[] {
    const matches = allProfiles
      .filter(profile => profile.id !== userProfile.id)
      .map(profile => this.calculateCompatibility(userProfile, profile))
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
    
    return matches.slice(0, limit)
  }
} 