"use client"

import { createClient, RedisClientType } from 'redis'

// Comprehensive Redis caching service for high-scale applications
export class RedisCacheService {
  private client: RedisClientType | null = null
  private isConnected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 10

  // Cache configuration
  private readonly config = {
    // Different TTL for different data types
    ttl: {
      session: 24 * 60 * 60,     // 24 hours
      user: 60 * 60,             // 1 hour
      feed: 5 * 60,              // 5 minutes
      messages: 7 * 24 * 60 * 60, // 7 days
      translation: 30 * 24 * 60 * 60, // 30 days
      analytics: 60 * 60,        // 1 hour
      search: 15 * 60,           // 15 minutes
    },
    // Key prefixes for organization
    prefixes: {
      session: 'sess:',
      user: 'user:',
      feed: 'feed:',
      messages: 'msg:',
      translation: 'trans:',
      analytics: 'analytics:',
      search: 'search:',
      rateLimit: 'rate:',
    }
  }

  // Initialize Redis connection with clustering support
  async initialize(): Promise<void> {
    try {
      // Redis cluster configuration for production
      if (process.env.REDIS_CLUSTER_URLS) {
        const clusterUrls = process.env.REDIS_CLUSTER_URLS.split(',')
        
        // For cluster mode, you'd use ioredis instead
        // const Redis = require('ioredis')
        // this.client = new Redis.Cluster(clusterUrls)
        
        console.log('Redis cluster mode not implemented in this example')
      } else {
        // Single Redis instance configuration
        this.client = createClient({
          url: process.env.REDIS_URL || 'redis://localhost:6379',
          password: process.env.REDIS_PASSWORD,
          database: parseInt(process.env.REDIS_DB || '0'),
          
          // Connection options for reliability
          socket: {
            connectTimeout: 5000,
            lazyConnect: true,
            reconnectDelay: 1000,
          },
          
          // Command timeout
          commandsQueueMaxLength: 1000,
        })

        // Error handling
        this.client.on('error', (err) => {
          console.error('Redis Client Error:', err)
          this.isConnected = false
        })

        this.client.on('connect', () => {
          console.log('Redis connected')
          this.isConnected = true
          this.reconnectAttempts = 0
        })

        this.client.on('ready', () => {
          console.log('Redis ready')
        })

        this.client.on('end', () => {
          console.log('Redis connection ended')
          this.isConnected = false
        })

        await this.client.connect()
      }
    } catch (error) {
      console.error('Redis initialization failed:', error)
      await this.handleReconnection()
    }
  }

  // Handle reconnection with exponential backoff
  private async handleReconnection(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached')
      return
    }

    this.reconnectAttempts++
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)
    
    console.log(`Attempting to reconnect to Redis in ${delay}ms (attempt ${this.reconnectAttempts})`)
    
    setTimeout(async () => {
      try {
        await this.initialize()
      } catch (error) {
        await this.handleReconnection()
      }
    }, delay)
  }

  // Generic cache operations
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!this.isConnected || !this.client) return null
      
      const value = await this.client.get(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<boolean> {
    try {
      if (!this.isConnected || !this.client) return false
      
      const serialized = JSON.stringify(value)
      
      if (ttl) {
        await this.client.setEx(key, ttl, serialized)
      } else {
        await this.client.set(key, serialized)
      }
      
      return true
    } catch (error) {
      console.error('Cache set error:', error)
      return false
    }
  }

  async del(key: string): Promise<boolean> {
    try {
      if (!this.isConnected || !this.client) return false
      
      await this.client.del(key)
      return true
    } catch (error) {
      console.error('Cache delete error:', error)
      return false
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      if (!this.isConnected || !this.client) return false
      
      const result = await this.client.exists(key)
      return result > 0
    } catch (error) {
      console.error('Cache exists error:', error)
      return false
    }
  }

  // Batch operations for efficiency
  async mget<T>(keys: string[]): Promise<Array<T | null>> {
    try {
      if (!this.isConnected || !this.client || keys.length === 0) return []
      
      const values = await this.client.mGet(keys)
      return values.map(value => value ? JSON.parse(value) : null)
    } catch (error) {
      console.error('Cache mget error:', error)
      return []
    }
  }

  async mset(pairs: Array<{ key: string; value: any; ttl?: number }>): Promise<boolean> {
    try {
      if (!this.isConnected || !this.client || pairs.length === 0) return false
      
      // Group by TTL for efficient batch operations
      const withoutTTL = pairs.filter(p => !p.ttl)
      const withTTL = pairs.filter(p => p.ttl)
      
      // Set items without TTL in batch
      if (withoutTTL.length > 0) {
        const keyValues = withoutTTL.flatMap(p => [p.key, JSON.stringify(p.value)])
        await this.client.mSet(keyValues)
      }
      
      // Set items with TTL individually (could be optimized with pipeline)
      for (const pair of withTTL) {
        await this.client.setEx(pair.key, pair.ttl!, JSON.stringify(pair.value))
      }
      
      return true
    } catch (error) {
      console.error('Cache mset error:', error)
      return false
    }
  }

  // Specialized cache methods for different data types

  // Session caching
  async cacheSession(sessionId: string, sessionData: any): Promise<boolean> {
    const key = `${this.config.prefixes.session}${sessionId}`
    return this.set(key, sessionData, this.config.ttl.session)
  }

  async getSession(sessionId: string): Promise<any> {
    const key = `${this.config.prefixes.session}${sessionId}`
    return this.get(key)
  }

  async invalidateSession(sessionId: string): Promise<boolean> {
    const key = `${this.config.prefixes.session}${sessionId}`
    return this.del(key)
  }

  // User data caching
  async cacheUser(userId: string, userData: any): Promise<boolean> {
    const key = `${this.config.prefixes.user}${userId}`
    return this.set(key, userData, this.config.ttl.user)
  }

  async getUser(userId: string): Promise<any> {
    const key = `${this.config.prefixes.user}${userId}`
    return this.get(key)
  }

  async invalidateUser(userId: string): Promise<boolean> {
    const key = `${this.config.prefixes.user}${userId}`
    return this.del(key)
  }

  // Feed caching with pagination support
  async cacheFeed(userId: string, feedType: string, page: number, feedData: any): Promise<boolean> {
    const key = `${this.config.prefixes.feed}${userId}:${feedType}:${page}`
    return this.set(key, feedData, this.config.ttl.feed)
  }

  async getFeed(userId: string, feedType: string, page: number): Promise<any> {
    const key = `${this.config.prefixes.feed}${userId}:${feedType}:${page}`
    return this.get(key)
  }

  async invalidateUserFeed(userId: string): Promise<boolean> {
    try {
      if (!this.isConnected || !this.client) return false
      
      const pattern = `${this.config.prefixes.feed}${userId}:*`
      const keys = await this.client.keys(pattern)
      
      if (keys.length > 0) {
        await this.client.del(keys)
      }
      
      return true
    } catch (error) {
      console.error('Feed invalidation error:', error)
      return false
    }
  }

  // Message caching
  async cacheMessage(messageId: string, messageData: any): Promise<boolean> {
    const key = `${this.config.prefixes.messages}${messageId}`
    return this.set(key, messageData, this.config.ttl.messages)
  }

  async getMessage(messageId: string): Promise<any> {
    const key = `${this.config.prefixes.messages}${messageId}`
    return this.get(key)
  }

  async cacheConversationMessages(conversationId: string, messages: any[]): Promise<boolean> {
    const key = `${this.config.prefixes.messages}conv:${conversationId}`
    return this.set(key, messages, this.config.ttl.messages)
  }

  async getConversationMessages(conversationId: string): Promise<any[]> {
    const key = `${this.config.prefixes.messages}conv:${conversationId}`
    return this.get(key) || []
  }

  // Translation caching
  async cacheTranslation(sourceText: string, sourceLang: string, targetLang: string, translation: string): Promise<boolean> {
    const hash = this.hashString(`${sourceText}:${sourceLang}:${targetLang}`)
    const key = `${this.config.prefixes.translation}${hash}`
    return this.set(key, { sourceText, sourceLang, targetLang, translation }, this.config.ttl.translation)
  }

  async getTranslation(sourceText: string, sourceLang: string, targetLang: string): Promise<string | null> {
    const hash = this.hashString(`${sourceText}:${sourceLang}:${targetLang}`)
    const key = `${this.config.prefixes.translation}${hash}`
    const result = await this.get<any>(key)
    return result?.translation || null
  }

  // Search result caching
  async cacheSearchResults(query: string, filters: any, results: any): Promise<boolean> {
    const hash = this.hashString(`${query}:${JSON.stringify(filters)}`)
    const key = `${this.config.prefixes.search}${hash}`
    return this.set(key, results, this.config.ttl.search)
  }

  async getSearchResults(query: string, filters: any): Promise<any> {
    const hash = this.hashString(`${query}:${JSON.stringify(filters)}`)
    const key = `${this.config.prefixes.search}${hash}`
    return this.get(key)
  }

  // Analytics caching
  async cacheAnalytics(key: string, data: any): Promise<boolean> {
    const fullKey = `${this.config.prefixes.analytics}${key}`
    return this.set(fullKey, data, this.config.ttl.analytics)
  }

  async getAnalytics(key: string): Promise<any> {
    const fullKey = `${this.config.prefixes.analytics}${key}`
    return this.get(fullKey)
  }

  // Rate limiting support
  async incrementRateLimit(key: string, windowMs: number): Promise<{ count: number; resetTime: number }> {
    try {
      if (!this.isConnected || !this.client) {
        return { count: 1, resetTime: Date.now() + windowMs }
      }
      
      const fullKey = `${this.config.prefixes.rateLimit}${key}`
      const now = Date.now()
      const resetTime = now + windowMs
      
      // Use Redis transaction for atomic increment
      const multi = this.client.multi()
      multi.incr(fullKey)
      multi.expire(fullKey, Math.ceil(windowMs / 1000))
      
      const results = await multi.exec()
      const count = results?.[0] as number || 1
      
      return { count, resetTime }
    } catch (error) {
      console.error('Rate limit increment error:', error)
      return { count: 1, resetTime: Date.now() + windowMs }
    }
  }

  // Utility methods
  private hashString(str: string): string {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36)
  }

  // Cache statistics
  async getCacheStats(): Promise<any> {
    try {
      if (!this.isConnected || !this.client) return null
      
      const info = await this.client.info('memory')
      return {
        connected: this.isConnected,
        memory: info,
        keyspace: await this.client.info('keyspace'),
        stats: await this.client.info('stats'),
      }
    } catch (error) {
      console.error('Cache stats error:', error)
      return null
    }
  }

  // Graceful shutdown
  async shutdown(): Promise<void> {
    try {
      if (this.client) {
        await this.client.quit()
        console.log('Redis connection closed gracefully')
      }
    } catch (error) {
      console.error('Error closing Redis connection:', error)
    }
  }
}

// Singleton instance
export const redisCacheService = new RedisCacheService()
