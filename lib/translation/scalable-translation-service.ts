"use client"

import { redisCacheService } from '../caching/redis-cache-service'

// Scalable translation service with load balancing and caching
interface TranslationProvider {
  name: string
  endpoint: string
  apiKey?: string
  maxConcurrency: number
  rateLimit: { requests: number; windowMs: number }
  priority: number // Lower number = higher priority
}

interface TranslationRequest {
  text: string
  sourceLang: string
  targetLang: string
  priority?: 'low' | 'normal' | 'high'
}

interface TranslationResponse {
  translatedText: string
  sourceLang: string
  targetLang: string
  provider: string
  cached: boolean
  processingTime: number
}

export class ScalableTranslationService {
  private providers: TranslationProvider[] = []
  private activeConnections = new Map<string, number>()
  private rateLimitCounters = new Map<string, { count: number; resetTime: number }>()
  private requestQueue: Array<{
    request: TranslationRequest
    resolve: (value: TranslationResponse) => void
    reject: (error: Error) => void
    timestamp: number
  }> = []
  private isProcessingQueue = false

  constructor() {
    this.initializeProviders()
    this.startQueueProcessor()
  }

  // Initialize translation providers with load balancing
  private initializeProviders() {
    // LibreTranslate instances (can be scaled horizontally)
    const libreTranslateInstances = (process.env.LIBRETRANSLATE_URLS || 'http://localhost:5000').split(',')
    
    libreTranslateInstances.forEach((url, index) => {
      this.providers.push({
        name: `libretranslate-${index}`,
        endpoint: url.trim(),
        apiKey: process.env.LIBRETRANSLATE_API_KEY,
        maxConcurrency: 10, // 10 concurrent requests per instance
        rateLimit: { requests: 100, windowMs: 60000 }, // 100 requests per minute
        priority: 1
      })
    })

    // Google Translate as fallback (if configured)
    if (process.env.GOOGLE_TRANSLATE_API_KEY) {
      this.providers.push({
        name: 'google-translate',
        endpoint: 'https://translation.googleapis.com/language/translate/v2',
        apiKey: process.env.GOOGLE_TRANSLATE_API_KEY,
        maxConcurrency: 100, // Higher concurrency for Google
        rateLimit: { requests: 1000, windowMs: 60000 }, // 1000 requests per minute
        priority: 2 // Fallback priority
      })
    }

    // Microsoft Translator as secondary fallback
    if (process.env.AZURE_TRANSLATOR_KEY) {
      this.providers.push({
        name: 'azure-translator',
        endpoint: 'https://api.cognitive.microsofttranslator.com/translate',
        apiKey: process.env.AZURE_TRANSLATOR_KEY,
        maxConcurrency: 50,
        rateLimit: { requests: 500, windowMs: 60000 },
        priority: 3
      })
    }

    // Sort providers by priority
    this.providers.sort((a, b) => a.priority - b.priority)

    console.log(`Initialized ${this.providers.length} translation providers`)
  }

  // Main translation method with intelligent routing
  async translate(request: TranslationRequest): Promise<TranslationResponse> {
    const startTime = Date.now()

    // Check cache first
    const cached = await this.getCachedTranslation(request)
    if (cached) {
      return {
        ...cached,
        cached: true,
        processingTime: Date.now() - startTime
      }
    }

    // Add to queue for processing
    return new Promise((resolve, reject) => {
      this.requestQueue.push({
        request,
        resolve,
        reject,
        timestamp: Date.now()
      })

      // Sort queue by priority
      this.requestQueue.sort((a, b) => {
        const priorityOrder = { high: 0, normal: 1, low: 2 }
        const aPriority = priorityOrder[a.request.priority || 'normal']
        const bPriority = priorityOrder[b.request.priority || 'normal']
        return aPriority - bPriority
      })

      this.processQueue()
    })
  }

  // Batch translation for efficiency
  async translateBatch(requests: TranslationRequest[]): Promise<TranslationResponse[]> {
    const startTime = Date.now()
    
    // Check cache for all requests
    const results: Array<TranslationResponse | null> = await Promise.all(
      requests.map(req => this.getCachedTranslation(req))
    )

    // Identify uncached requests
    const uncachedIndices: number[] = []
    const uncachedRequests: TranslationRequest[] = []

    results.forEach((result, index) => {
      if (!result) {
        uncachedIndices.push(index)
        uncachedRequests.push(requests[index])
      }
    })

    // Translate uncached requests
    if (uncachedRequests.length > 0) {
      const translations = await Promise.all(
        uncachedRequests.map(req => this.translate(req))
      )

      // Merge results
      uncachedIndices.forEach((originalIndex, translationIndex) => {
        results[originalIndex] = translations[translationIndex]
      })
    }

    // Add cached flag and processing time
    return results.map(result => ({
      ...result!,
      processingTime: Date.now() - startTime
    }))
  }

  // Queue processor for load balancing
  private async processQueue() {
    if (this.isProcessingQueue || this.requestQueue.length === 0) return

    this.isProcessingQueue = true

    while (this.requestQueue.length > 0) {
      const availableProvider = this.findAvailableProvider()
      if (!availableProvider) {
        // Wait and retry if no providers available
        await this.sleep(100)
        continue
      }

      const queueItem = this.requestQueue.shift()!
      this.processTranslationRequest(queueItem, availableProvider)
    }

    this.isProcessingQueue = false
  }

  // Find best available provider
  private findAvailableProvider(): TranslationProvider | null {
    for (const provider of this.providers) {
      const activeConnections = this.activeConnections.get(provider.name) || 0
      const rateLimitInfo = this.rateLimitCounters.get(provider.name)

      // Check concurrency limits
      if (activeConnections >= provider.maxConcurrency) continue

      // Check rate limits
      if (rateLimitInfo && Date.now() < rateLimitInfo.resetTime) {
        if (rateLimitInfo.count >= provider.rateLimit.requests) continue
      }

      return provider
    }

    return null
  }

  // Process individual translation request
  private async processTranslationRequest(
    queueItem: { request: TranslationRequest; resolve: Function; reject: Function; timestamp: number },
    provider: TranslationProvider
  ) {
    const { request, resolve, reject } = queueItem
    const startTime = Date.now()

    try {
      // Update active connections
      const currentConnections = this.activeConnections.get(provider.name) || 0
      this.activeConnections.set(provider.name, currentConnections + 1)

      // Update rate limiting
      this.updateRateLimit(provider)

      // Perform translation based on provider
      let translatedText: string

      switch (provider.name.split('-')[0]) {
        case 'libretranslate':
          translatedText = await this.translateWithLibreTranslate(request, provider)
          break
        case 'google':
          translatedText = await this.translateWithGoogle(request, provider)
          break
        case 'azure':
          translatedText = await this.translateWithAzure(request, provider)
          break
        default:
          throw new Error(`Unknown provider: ${provider.name}`)
      }

      const response: TranslationResponse = {
        translatedText,
        sourceLang: request.sourceLang,
        targetLang: request.targetLang,
        provider: provider.name,
        cached: false,
        processingTime: Date.now() - startTime
      }

      // Cache the result
      await this.cacheTranslation(request, response)

      resolve(response)

    } catch (error) {
      console.error(`Translation failed with provider ${provider.name}:`, error)
      
      // Try with next available provider
      const nextProvider = this.findAvailableProvider()
      if (nextProvider && nextProvider.name !== provider.name) {
        this.processTranslationRequest(queueItem, nextProvider)
      } else {
        reject(error)
      }
    } finally {
      // Decrease active connections
      const currentConnections = this.activeConnections.get(provider.name) || 1
      this.activeConnections.set(provider.name, Math.max(0, currentConnections - 1))
    }
  }

  // LibreTranslate implementation
  private async translateWithLibreTranslate(request: TranslationRequest, provider: TranslationProvider): Promise<string> {
    const response = await fetch(`${provider.endpoint}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(provider.apiKey && { 'Authorization': `Bearer ${provider.apiKey}` })
      },
      body: JSON.stringify({
        q: request.text,
        source: request.sourceLang === 'auto' ? 'auto' : request.sourceLang,
        target: request.targetLang,
        format: 'text'
      })
    })

    if (!response.ok) {
      throw new Error(`LibreTranslate error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.translatedText
  }

  // Google Translate implementation
  private async translateWithGoogle(request: TranslationRequest, provider: TranslationProvider): Promise<string> {
    const params = new URLSearchParams({
      key: provider.apiKey!,
      q: request.text,
      target: request.targetLang,
      format: 'text'
    })

    if (request.sourceLang !== 'auto') {
      params.append('source', request.sourceLang)
    }

    const response = await fetch(`${provider.endpoint}?${params}`)

    if (!response.ok) {
      throw new Error(`Google Translate error: ${response.statusText}`)
    }

    const data = await response.json()
    return (data.data.translations[0] ? data.data.translations[0].translatedText : undefined)
  }

  // Azure Translator implementation
  private async translateWithAzure(request: TranslationRequest, provider: TranslationProvider): Promise<string> {
    const params = new URLSearchParams({
      'api-version': '3.0',
      to: request.targetLang
    })

    if (request.sourceLang !== 'auto') {
      params.append('from', request.sourceLang)
    }

    const response = await fetch(`${provider.endpoint}?${params}`, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': provider.apiKey!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([{ text: request.text }])
    })

    if (!response.ok) {
      throw new Error(`Azure Translator error: ${response.statusText}`)
    }

    const data = await response.json()
    return (data[0] ? data[0].translations : undefined)[0].text
  }

  // Rate limiting management
  private updateRateLimit(provider: TranslationProvider) {
    const now = Date.now()
    const key = provider.name
    const existing = this.rateLimitCounters.get(key)

    if (!existing || now >= existing.resetTime) {
      this.rateLimitCounters.set(key, {
        count: 1,
        resetTime: now + provider.rateLimit.windowMs
      })
    } else {
      existing.count++
    }
  }

  // Cache management
  private async getCachedTranslation(request: TranslationRequest): Promise<TranslationResponse | null> {
    try {
      const cached = await redisCacheService.getTranslation(
        request.text,
        request.sourceLang,
        request.targetLang
      )

      if (cached) {
        return {
          translatedText: cached,
          sourceLang: request.sourceLang,
          targetLang: request.targetLang,
          provider: 'cache',
          cached: true,
          processingTime: 0
        }
      }
    } catch (error) {
      console.error('Cache read error:', error)
    }

    return null
  }

  private async cacheTranslation(request: TranslationRequest, response: TranslationResponse) {
    try {
      await redisCacheService.cacheTranslation(
        request.text,
        request.sourceLang,
        request.targetLang,
        response.translatedText
      )
    } catch (error) {
      console.error('Cache write error:', error)
    }
  }

  // Utility methods
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  private startQueueProcessor() {
    // Process queue every 50ms
    setInterval(() => {
      this.processQueue()
    }, 50)
  }

  // Health check for all providers
  async checkProvidersHealth(): Promise<Array<{ name: string; healthy: boolean; responseTime?: number }>> {
    const healthChecks = this.providers.map(async (provider) => {
      const start = Date.now()
      try {
        // Perform a simple translation test
        await this.translate({
          text: 'Hello',
          sourceLang: 'en',
          targetLang: 'es',
          priority: 'low'
        })

        return {
          name: provider.name,
          healthy: true,
          responseTime: Date.now() - start
        }
      } catch (error) {
        return {
          name: provider.name,
          healthy: false
        }
      }
    })

    return Promise.all(healthChecks)
  }

  // Get service statistics
  getStats() {
    return {
      providers: this.providers.length,
      queueLength: this.requestQueue.length,
      activeConnections: Object.fromEntries(this.activeConnections),
      rateLimits: Object.fromEntries(this.rateLimitCounters)
    }
  }
}

// Singleton instance
export const scalableTranslationService = new ScalableTranslationService()
