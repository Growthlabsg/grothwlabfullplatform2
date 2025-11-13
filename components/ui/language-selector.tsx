"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Globe, Languages, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface LanguageSelectorProps {
  variant?: "default" | "compact" | "dropdown"
  showStatus?: boolean
  className?: string
}

export function LanguageSelector({ 
  variant = "default", 
  showStatus = true,
  className = "" 
}: LanguageSelectorProps) {
  const { 
    language, 
    setLanguage, 
    supportedLanguages, 
    checkTranslationService,
    isTranslating,
    translationError 
  } = useLanguage()
  
  const [isCheckingService, setIsCheckingService] = useState(false)
  const [serviceStatus, setServiceStatus] = useState<'healthy' | 'unhealthy' | 'unknown'>('unknown')

  // Check service health on mount
  useEffect(() => {
    const checkHealth = async () => {
      setIsCheckingService(true)
      try {
        const isHealthy = await checkTranslationService()
        setServiceStatus(isHealthy ? 'healthy' : 'unhealthy')
      } catch (error) {
        setServiceStatus('unhealthy')
      } finally {
        setIsCheckingService(false)
      }
    }

    checkHealth()
  }, [checkTranslationService])

  const handleLanguageChange = async (newLanguage: string) => {
    if (newLanguage === language) return
    
    setLanguage(newLanguage)
    
    // Check service health when changing language
    if (showStatus) {
      setIsCheckingService(true)
      try {
        const isHealthy = await checkTranslationService()
        setServiceStatus(isHealthy ? 'healthy' : 'unhealthy')
      } catch (error) {
        setServiceStatus('unhealthy')
      } finally {
        setIsCheckingService(false)
      }
    }
  }

  const getStatusIcon = () => {
    if (isCheckingService) {
      return <Loader2 className="h-4 w-4 animate-spin" />
    }
    
    switch (serviceStatus) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'unhealthy':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Globe className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = () => {
    switch (serviceStatus) {
      case 'healthy':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'unhealthy':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusText = () => {
    switch (serviceStatus) {
      case 'healthy':
        return 'Translation Ready'
      case 'unhealthy':
        return 'Translation Unavailable'
      default:
        return 'Checking Service'
    }
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Globe className="h-4 w-4 text-gray-500" />
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-24 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {supportedLanguages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.code.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {showStatus && (
          <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
            {getStatusIcon()}
          </Badge>
        )}
      </div>
    )
  }

  if (variant === "dropdown") {
    return (
      <div className={`relative ${className}`}>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <SelectValue />
              {showStatus && getStatusIcon()}
            </div>
          </SelectTrigger>
          <SelectContent>
            {supportedLanguages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <div className="flex items-center justify-between w-full">
                  <span>{lang.name_local || lang.name}</span>
                  {lang.code === language && (
                    <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">Language</span>
        </div>
        {showStatus && (
          <Badge variant="outline" className={getStatusColor()}>
            {getStatusIcon()}
            <span className="ml-1 text-xs">{getStatusText()}</span>
          </Badge>
        )}
      </div>
      
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-medium">{lang.name_local || lang.name}</span>
                  {lang.name_local && lang.name_local !== lang.name && (
                    <span className="text-xs text-gray-500">{lang.name}</span>
                  )}
                </div>
                {lang.code === language && (
                  <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {translationError && (
        <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-700">{translationError}</span>
        </div>
      )}

      {isTranslating && (
        <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          <span className="text-sm text-blue-700">Translating content...</span>
        </div>
      )}

      <div className="text-xs text-gray-500">
        Powered by LibreTranslate - Free and Open Source Machine Translation
      </div>
    </div>
  )
}
