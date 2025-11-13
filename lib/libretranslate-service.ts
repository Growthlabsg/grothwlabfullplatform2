// LibreTranslate API Service for GrowthLab
// This service provides machine translation capabilities using LibreTranslate

import { mockTranslateService } from './mock-translate-service'

export interface TranslationRequest {
  q: string
  source: string
  target: string
  format?: 'text' | 'html'
  api_key?: string
}

export interface TranslationResponse {
  translatedText: string
  detectedLanguage?: {
    confidence: number
    language: string
  }
}

export interface Language {
  code: string
  name: string
  name_local?: string
}

export interface LibreTranslateConfig {
  baseUrl: string
  apiKey?: string
  timeout?: number
  retries?: number
}

class LibreTranslateService {
  private config: LibreTranslateConfig
  private cache: Map<string, string> = new Map()
  private supportedLanguages: Language[] = []
  private useMockService: boolean = false

  constructor(config: LibreTranslateConfig) {
    this.config = {
      baseUrl: config.baseUrl || 'http://localhost:5000',
      apiKey: config.apiKey,
      timeout: config.timeout || 10000,
      retries: config.retries || 3
    }
    
    // Initialize the service immediately
    this.initializeService()
  }

  // Initialize the service and check availability
  private async initializeService(): Promise<void> {
    try {
      await this.getSupportedLanguages()
    } catch (error) {
      console.warn('Failed to initialize LibreTranslate service, using mock service:', error)
      this.useMockService = true
    }
  }

  // Check if LibreTranslate service is available
  private async checkServiceAvailability(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.baseUrl}/languages`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(3000) // Quick timeout for availability check
      })
      return response.ok
    } catch (error) {
      return false
    }
  }

  // Get supported languages from LibreTranslate
  async getSupportedLanguages(): Promise<Language[]> {
    if (this.supportedLanguages.length > 0) {
      return this.supportedLanguages
    }

    // Check if LibreTranslate is available
    const isAvailable = await this.checkServiceAvailability()
    
    if (isAvailable) {
      try {
        const response = await fetch(`${this.config.baseUrl}/languages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(this.config.timeout || 10000)
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.statusText}`)
        }

        this.supportedLanguages = await response.json()
        this.useMockService = false
        return this.supportedLanguages
      } catch (error) {
        console.warn('LibreTranslate service unavailable, falling back to mock service:', error)
        this.useMockService = true
      }
    } else {
      console.warn('LibreTranslate service not available, using mock service')
      this.useMockService = true
    }

    // Fallback to mock service
    this.supportedLanguages = await mockTranslateService.getSupportedLanguages()
    return this.supportedLanguages
  }

  // Detect language of text
  async detectLanguage(text: string): Promise<string> {
    if (this.useMockService) {
      return 'en' // Mock service assumes English as default
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ q: text }),
        signal: AbortSignal.timeout(this.config.timeout || 10000)
      })

      if (!response.ok) {
        throw new Error(`Failed to detect language: ${response.statusText}`)
      }

      const result = await response.json()
      return result[0]?.language || 'en'
    } catch (error) {
      console.error('Error detecting language:', error)
      return 'en'
    }
  }

  // Translate text using LibreTranslate
  async translate(
    text: string,
    targetLang: string,
    sourceLang: string = 'auto'
  ): Promise<string> {
    if (!text || text.trim() === '') {
      return text
    }

    // Check cache first
    const cacheKey = `${sourceLang}:${targetLang}:${text}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Use mock service if LibreTranslate is unavailable
    if (this.useMockService) {
      const result = await mockTranslateService.translate(text, targetLang, sourceLang)
      this.cache.set(cacheKey, result)
      return result
    }

    // Auto-detect source language if needed
    let actualSourceLang = sourceLang
    if (sourceLang === 'auto') {
      actualSourceLang = await this.detectLanguage(text)
    }

    // Don't translate if source and target are the same
    if (actualSourceLang === targetLang) {
      return text
    }

    try {
      const requestBody: TranslationRequest = {
        q: text,
        source: actualSourceLang,
        target: targetLang,
        format: 'text'
      }

      if (this.config.apiKey) {
        requestBody.api_key = this.config.apiKey
      }

      const response = await fetch(`${this.config.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(this.config.timeout || 10000)
      })

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`)
      }

      const result: TranslationResponse = await response.json()
      const translatedText = result.translatedText || text

      // Cache the result
      this.cache.set(cacheKey, translatedText)

      return translatedText
    } catch (error) {
      console.error('Translation error, falling back to mock service:', error)
      // Fallback to mock service
      const result = await mockTranslateService.translate(text, targetLang, actualSourceLang)
      this.cache.set(cacheKey, result)
      return result
    }
  }

  // Translate multiple texts in batch
  async translateBatch(
    texts: string[],
    targetLang: string,
    sourceLang: string = 'auto'
  ): Promise<string[]> {
    if (this.useMockService) {
      return await mockTranslateService.translateBatch(texts, targetLang, sourceLang)
    }

    const results: string[] = []
    
    for (const text of texts) {
      try {
        const translated = await this.translate(text, targetLang, sourceLang)
        results.push(translated)
      } catch (error) {
        console.error(`Error translating text: ${text}`, error)
        results.push(text) // Fallback to original text
      }
    }

    return results
  }

  // Translate HTML content
  async translateHTML(
    html: string,
    targetLang: string,
    sourceLang: string = 'auto'
  ): Promise<string> {
    if (this.useMockService) {
      // Mock service doesn't support HTML, so we'll extract text and translate
      const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      const translatedText = await this.translate(textContent, targetLang, sourceLang)
      return html.replace(textContent, translatedText)
    }

    try {
      const requestBody: TranslationRequest = {
        q: html,
        source: sourceLang,
        target: targetLang,
        format: 'html'
      }

      if (this.config.apiKey) {
        requestBody.api_key = this.config.apiKey
      }

      const response = await fetch(`${this.config.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(this.config.timeout || 10000)
      })

      if (!response.ok) {
        throw new Error(`HTML translation failed: ${response.statusText}`)
      }

      const result: TranslationResponse = await response.json()
      return result.translatedText || html
    } catch (error) {
      console.error('HTML translation error:', error)
      return html
    }
  }

  // Clear translation cache
  clearCache(): void {
    this.cache.clear()
  }

  // Get cache statistics
  getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: 0 // Could implement hit rate tracking if needed
    }
  }

  // Health check for LibreTranslate service
  async healthCheck(): Promise<boolean> {
    if (this.useMockService) {
      return true // Mock service is always healthy
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/languages`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      })
      return response.ok
    } catch (error) {
      console.error('LibreTranslate health check failed:', error)
      return false
    }
  }

  // Check if using mock service
  isUsingMockService(): boolean {
    return this.useMockService
  }

  // Force refresh service availability
  async refreshServiceStatus(): Promise<void> {
    this.useMockService = false
    this.supportedLanguages = []
    await this.getSupportedLanguages()
  }
}

// Create default instance
export const libreTranslateService = new LibreTranslateService({
  baseUrl: process.env.NEXT_PUBLIC_LIBRETRANSLATE_URL || 'http://localhost:5000',
  apiKey: process.env.LIBRETRANSLATE_API_KEY,
  timeout: 15000,
  retries: 3
})

// Export the class for custom instances
export { LibreTranslateService }
