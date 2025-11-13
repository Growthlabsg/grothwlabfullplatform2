import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { libreTranslateService, Language } from '@/lib/libretranslate-service'

export interface UseTranslationOptions {
  autoTranslate?: boolean
  fallbackToOriginal?: boolean
  cacheResults?: boolean
  detectLanguage?: boolean
}

export interface TranslationState {
  isTranslating: boolean
  error: string | null
  detectedLanguage: string | null
  lastTranslated: string | null
}

export function useTranslation(options: UseTranslationOptions = {}) {
  const { language, setLanguage } = useLanguage()
  const [supportedLanguages, setSupportedLanguages] = useState<Language[]>([])
  const [translationState, setTranslationState] = useState<TranslationState>({
    isTranslating: false,
    error: null,
    detectedLanguage: null,
    lastTranslated: null
  })

  const {
    autoTranslate = true,
    fallbackToOriginal = true,
    cacheResults = true,
    detectLanguage: shouldDetectLanguage = true
  } = options

  // Load supported languages on mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const languages = await libreTranslateService.getSupportedLanguages()
        setSupportedLanguages(languages)
      } catch (error) {
        console.error('Failed to load supported languages:', error)
      }
    }

    loadLanguages()
  }, [])

  // Health check for LibreTranslate service
  const checkServiceHealth = useCallback(async (): Promise<boolean> => {
    try {
      const isHealthy = await libreTranslateService.healthCheck()
      if (!isHealthy) {
        setTranslationState(prev => ({
          ...prev,
          error: 'Translation service unavailable'
        }))
      }
      return isHealthy
    } catch (error) {
      setTranslationState(prev => ({
        ...prev,
        error: 'Translation service error'
      }))
      return false
    }
  }, [])

  // Translate single text
  const translate = useCallback(async (
    text: string,
    targetLang?: string,
    sourceLang?: string
  ): Promise<string> => {
    if (!text || text.trim() === '') {
      return text
    }

    const target = targetLang || language
    const source = sourceLang || 'auto'

    // Don't translate if target is English (assuming English is your base language)
    if (target === 'en') {
      return text
    }

    setTranslationState(prev => ({
      ...prev,
      isTranslating: true,
      error: null
    }))

    try {
      // Check service health first
      const isHealthy = await checkServiceHealth()
      if (!isHealthy) {
        throw new Error('Translation service unavailable')
      }

      // Detect language if requested
      let detectedLang = source
      if (shouldDetectLanguage && source === 'auto') {
        detectedLang = await libreTranslateService.detectLanguage(text)
        setTranslationState(prev => ({
          ...prev,
          detectedLanguage: detectedLang
        }))
      }

      // Don't translate if detected language is the same as target
      if (detectedLang === target) {
        setTranslationState(prev => ({
          ...prev,
          isTranslating: false
        }))
        return text
      }

      const translatedText = await libreTranslateService.translate(
        text,
        target,
        detectedLang
      )

      setTranslationState(prev => ({
        ...prev,
        isTranslating: false,
        lastTranslated: translatedText
      }))

      return translatedText
    } catch (error) {
      console.error('Translation failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Translation failed'
      
      setTranslationState(prev => ({
        ...prev,
        isTranslating: false,
        error: errorMessage
      }))

      return fallbackToOriginal ? text : ''
    }
  }, [language, checkServiceHealth, shouldDetectLanguage, fallbackToOriginal])

  // Translate multiple texts
  const translateBatch = useCallback(async (
    texts: string[],
    targetLang?: string,
    sourceLang?: string
  ): Promise<string[]> => {
    if (texts.length === 0) return texts

    const target = targetLang || language
    const source = sourceLang || 'auto'

    setTranslationState(prev => ({
      ...prev,
      isTranslating: true,
      error: null
    }))

    try {
      const isHealthy = await checkServiceHealth()
      if (!isHealthy) {
        throw new Error('Translation service unavailable')
      }

      const results = await libreTranslateService.translateBatch(texts, target, source)

      setTranslationState(prev => ({
        ...prev,
        isTranslating: false
      }))

      return results
    } catch (error) {
      console.error('Batch translation failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Batch translation failed'
      
      setTranslationState(prev => ({
        ...prev,
        isTranslating: false,
        error: errorMessage
      }))

      return fallbackToOriginal ? texts : texts.map(() => '')
    }
  }, [language, checkServiceHealth, fallbackToOriginal])

  // Translate HTML content
  const translateHTML = useCallback(async (
    html: string,
    targetLang?: string,
    sourceLang?: string
  ): Promise<string> => {
    if (!html || html.trim() === '') {
      return html
    }

    const target = targetLang || language
    const source = sourceLang || 'auto'

    if (target === 'en') {
      return html
    }

    setTranslationState(prev => ({
      ...prev,
      isTranslating: true,
      error: null
    }))

    try {
      const isHealthy = await checkServiceHealth()
      if (!isHealthy) {
        throw new Error('Translation service unavailable')
      }

      const translatedHTML = await libreTranslateService.translateHTML(html, target, source)

      setTranslationState(prev => ({
        ...prev,
        isTranslating: false
      }))

      return translatedHTML
    } catch (error) {
      console.error('HTML translation failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'HTML translation failed'
      
      setTranslationState(prev => ({
        ...prev,
        isTranslating: false,
        error: errorMessage
      }))

      return fallbackToOriginal ? html : ''
    }
  }, [language, checkServiceHealth, fallbackToOriginal])

  // Auto-translate text when language changes
  const autoTranslateText = useCallback(async (text: string): Promise<string> => {
    if (!autoTranslate || language === 'en') {
      return text
    }

    return await translate(text)
  }, [autoTranslate, language, translate])

  // Clear translation cache
  const clearCache = useCallback(() => {
    libreTranslateService.clearCache()
  }, [])

  // Get cache statistics
  const getCacheStats = useCallback(() => {
    return libreTranslateService.getCacheStats()
  }, [])

  // Memoized language options for UI
  const languageOptions = useMemo(() => {
    return supportedLanguages.map(lang => ({
      value: lang.code,
      label: lang.name_local || lang.name,
      native: lang.name_local
    }))
  }, [supportedLanguages])

  // Check if a language is supported
  const isLanguageSupported = useCallback((langCode: string): boolean => {
    return supportedLanguages.some(lang => lang.code === langCode)
  }, [supportedLanguages])

  // Get language name by code
  const getLanguageName = useCallback((langCode: string): string => {
    const lang = supportedLanguages.find(l => l.code === langCode)
    return lang ? (lang.name_local || lang.name) : langCode
  }, [supportedLanguages])

  return {
    // Translation functions
    translate,
    translateBatch,
    translateHTML,
    autoTranslateText,
    
    // Language management
    supportedLanguages,
    languageOptions,
    isLanguageSupported,
    getLanguageName,
    
    // State
    translationState,
    isTranslating: translationState.isTranslating,
    error: translationState.error,
    detectedLanguage: translationState.detectedLanguage,
    
    // Cache management
    clearCache,
    getCacheStats,
    
    // Service health
    checkServiceHealth,
    
    // Current language
    currentLanguage: language,
    setLanguage
  }
}
