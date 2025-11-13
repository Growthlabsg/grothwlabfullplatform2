import { NextRequest } from 'next/server'

// Advanced rate limiting with multiple strategies for scalability
interface RateLimitRule {
  windowMs: number     // Time window in milliseconds
  maxRequests: number  // Maximum requests allowed in window
  skipSuccessfulRequests?: boolean
  skipFailedRequests?: boolean
  keyGenerator?: (req: NextRequest) => string
}

interface RateLimitConfig {
  global: RateLimitRule
  perUser: RateLimitRule
  perIP: RateLimitRule
  perEndpoint: Record<string, RateLimitRule>
  premium?: RateLimitRule // Higher limits for premium users
}

// In-memory store with Redis fallback for production
class RateLimitStore {
  private memory = new Map<string, { count: number; resetTime: number }>()
  private redis: any = null // Redis client would be initialized here

  async get(key: string): Promise<{ count: number; resetTime: number } | null> {
    // Try Redis first in production
    if (this.redis && process.env.NODE_ENV === 'production') {
      try {
        const data = await this.redis.get(key)
        return data ? JSON.parse(data) : null
      } catch (error) {
        console.error('Redis get error:', error)
      }
    }

    // Fallback to memory store
    return this.memory.get(key) || null
  }

  async set(key: string, value: { count: number; resetTime: number }, ttlMs: number): Promise<void> {
    // Update Redis in production
    if (this.redis && process.env.NODE_ENV === 'production') {
      try {
        await this.redis.setex(key, Math.ceil(ttlMs / 1000), JSON.stringify(value))
      } catch (error) {
        console.error('Redis set error:', error)
      }
    }

    // Always update memory store as backup
    this.memory.set(key, value)
    
    // Clean up expired entries from memory
    setTimeout(() => {
      if (Date.now() > value.resetTime) {
        this.memory.delete(key)
      }
    }, ttlMs)
  }

  async increment(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
    const now = Date.now()
    const existing = await this.get(key)

    if (!existing || now > existing.resetTime) {
      const newEntry = { count: 1, resetTime: now + windowMs }
      await this.set(key, newEntry, windowMs)
      return newEntry
    }

    existing.count++
    await this.set(key, existing, existing.resetTime - now)
    return existing
  }
}

export class AdvancedRateLimiter {
  private store = new RateLimitStore()
  private config: RateLimitConfig

  constructor(config: RateLimitConfig) {
    this.config = config
  }

  // Check if request should be rate limited
  async checkRateLimit(req: NextRequest, userId?: string): Promise<{
    allowed: boolean
    limit: number
    remaining: number
    resetTime: number
    retryAfter?: number
  }> {
    const checks = await Promise.all([
      this.checkGlobalLimit(req),
      this.checkIPLimit(req),
      this.checkUserLimit(req, userId),
      this.checkEndpointLimit(req)
    ])

    // Find the most restrictive limit that was exceeded
    const failedCheck = checks.find(check => !check.allowed)
    if (failedCheck) {
      return failedCheck
    }

    // Return the most restrictive successful check
    const mostRestrictive = checks.reduce((min, check) => 
      check.remaining < min.remaining ? check : min
    )

    return mostRestrictive
  }

  // Global rate limiting across all requests
  private async checkGlobalLimit(req: NextRequest) {
    const rule = this.config.global
    const key = 'global'
    
    return this.applyRateLimit(key, rule)
  }

  // Per-IP rate limiting
  private async checkIPLimit(req: NextRequest) {
    const rule = this.config.perIP
    const ip = this.getClientIP(req)
    const key = `ip:${ip}`
    
    return this.applyRateLimit(key, rule)
  }

  // Per-user rate limiting
  private async checkUserLimit(req: NextRequest, userId?: string) {
    if (!userId) {
      return { allowed: true, limit: Infinity, remaining: Infinity, resetTime: 0 }
    }

    // Check if user has premium limits
    const isPremium = await this.checkPremiumStatus(userId)
    const rule = isPremium && this.config.premium ? this.config.premium : this.config.perUser
    const key = `user:${userId}`
    
    return this.applyRateLimit(key, rule)
  }

  // Per-endpoint rate limiting
  private async checkEndpointLimit(req: NextRequest) {
    const pathname = new URL(req.url).pathname
    const rule = this.config.perEndpoint[pathname]
    
    if (!rule) {
      return { allowed: true, limit: Infinity, remaining: Infinity, resetTime: 0 }
    }

    const key = rule.keyGenerator ? rule.keyGenerator(req) : `endpoint:${pathname}`
    return this.applyRateLimit(key, rule)
  }

  // Apply rate limiting logic
  private async applyRateLimit(key: string, rule: RateLimitRule) {
    const result = await this.store.increment(key, rule.windowMs)
    const remaining = Math.max(0, rule.maxRequests - result.count)
    const allowed = result.count <= rule.maxRequests

    return {
      allowed,
      limit: rule.maxRequests,
      remaining,
      resetTime: result.resetTime,
      retryAfter: allowed ? undefined : Math.ceil((result.resetTime - Date.now()) / 1000)
    }
  }

  // Get client IP with proxy support
  private getClientIP(req: NextRequest): string {
    const forwarded = req.headers.get('x-forwarded-for')
    const realIP = req.headers.get('x-real-ip')
    const cfConnectingIP = req.headers.get('cf-connecting-ip')
    
    if (cfConnectingIP) return cfConnectingIP
    if (realIP) return realIP
    if (forwarded) return forwarded.split(',')[0].trim()
    
    return req.ip || 'unknown'
  }

  // Check if user has premium status (implement based on your user system)
  private async checkPremiumStatus(userId: string): Promise<boolean> {
    // Implementation would check user's subscription status
    // For now, return false
    return false
  }

  // Create rate limit headers for response
  createHeaders(result: { limit: number; remaining: number; resetTime: number; retryAfter?: number }) {
    const headers = new Headers()
    
    headers.set('X-RateLimit-Limit', result.limit.toString())
    headers.set('X-RateLimit-Remaining', result.remaining.toString())
    headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString())
    
    if (result.retryAfter !== undefined) {
      headers.set('Retry-After', result.retryAfter.toString())
    }
    
    return headers
  }
}

// Default configuration for different use cases
export const defaultRateLimitConfig: RateLimitConfig = {
  global: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000000,     // 1M requests per 15 minutes globally
  },
  perIP: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,         // 100 requests per IP per 15 minutes
  },
  perUser: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 1000,        // 1000 requests per user per 15 minutes
  },
  perEndpoint: {
    '/api/auth/login': {
      windowMs: 15 * 60 * 1000,
      maxRequests: 5,           // 5 login attempts per 15 minutes
      keyGenerator: (req) => {
        const body = req.body as any
        const email = body?.email || 'unknown'
        return `login:${email}`
      }
    },
    '/api/messages': {
      windowMs: 60 * 1000,      // 1 minute
      maxRequests: 60,          // 60 messages per minute
    },
    '/api/feed': {
      windowMs: 60 * 1000,      // 1 minute
      maxRequests: 30,          // 30 feed requests per minute
    },
    '/api/upload': {
      windowMs: 60 * 1000,      // 1 minute
      maxRequests: 10,          // 10 uploads per minute
    },
    '/api/search': {
      windowMs: 60 * 1000,      // 1 minute
      maxRequests: 20,          // 20 searches per minute
    }
  },
  premium: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5000,        // 5x higher limit for premium users
  }
}

// API endpoint specific configurations
export const apiRateLimitConfig: RateLimitConfig = {
  global: {
    windowMs: 60 * 1000,      // 1 minute
    maxRequests: 100000,      // 100K API calls per minute globally
  },
  perIP: {
    windowMs: 60 * 1000,      // 1 minute
    maxRequests: 100,         // 100 API calls per IP per minute
  },
  perUser: {
    windowMs: 60 * 1000,      // 1 minute
    maxRequests: 1000,        // 1000 API calls per user per minute
  },
  perEndpoint: {
    '/api/realtime/connect': {
      windowMs: 60 * 1000,
      maxRequests: 5,           // 5 WebSocket connections per minute
    },
    '/api/translate': {
      windowMs: 60 * 1000,
      maxRequests: 100,         // 100 translations per minute
    },
    '/api/ai/generate': {
      windowMs: 60 * 1000,
      maxRequests: 20,          // 20 AI generations per minute
    }
  },
  premium: {
    windowMs: 60 * 1000,
    maxRequests: 5000,          // 5x higher limit for premium users
  }
}

// Create rate limiter instances
export const webRateLimiter = new AdvancedRateLimiter(defaultRateLimitConfig)
export const apiRateLimiter = new AdvancedRateLimiter(apiRateLimitConfig)
