"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Languages, 
  Translate, 
  Trash2, 
  RefreshCw, 
  Download, 
  Upload, 
  Settings,
  CheckCircle,
  AlertCircle,
  Loader2,
  Database,
  Activity
} from "lucide-react"

interface TranslationManagerProps {
  className?: string
}

export function TranslationManager({ className = "" }: TranslationManagerProps) {
  const { 
    language, 
    setLanguage, 
    supportedLanguages, 
    translate, 
    translateBatch,
    isTranslating,
    translationError,
    checkTranslationService
  } = useLanguage()

  const [textToTranslate, setTextToTranslate] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [targetLanguage, setTargetLanguage] = useState(language)
  const [batchTexts, setBatchTexts] = useState<string[]>([""])
  const [batchResults, setBatchResults] = useState<string[]>([])
  const [serviceHealth, setServiceHealth] = useState<boolean | null>(null)
  const [isCheckingHealth, setIsCheckingHealth] = useState(false)

  // Check service health on mount
  useEffect(() => {
    checkHealth()
  }, [])

  const checkHealth = async () => {
    setIsCheckingHealth(true)
    try {
      const isHealthy = await checkTranslationService()
      setServiceHealth(isHealthy)
    } catch (error) {
      setServiceHealth(false)
    } finally {
      setIsCheckingHealth(false)
    }
  }

  const handleSingleTranslation = async () => {
    if (!textToTranslate.trim()) return

    try {
      const result = await translate(textToTranslate, targetLanguage)
      setTranslatedText(result)
    } catch (error) {
      console.error('Translation failed:', error)
    }
  }

  const handleBatchTranslation = async () => {
    const texts = batchTexts.filter(text => text.trim())
    if (texts.length === 0) return

    try {
      const results = await translateBatch(texts, targetLanguage)
      setBatchResults(results)
    } catch (error) {
      console.error('Batch translation failed:', error)
    }
  }

  const addBatchText = () => {
    setBatchTexts([...batchTexts, ""])
  }

  const removeBatchText = (index: number) => {
    if (batchTexts.length > 1) {
      setBatchTexts(batchTexts.filter((_, i) => i !== index))
    }
  }

  const updateBatchText = (index: number, value: string) => {
    const newTexts = [...batchTexts]
    newTexts[index] = value
    setBatchTexts(newTexts)
  }

  const clearAll = () => {
    setTextToTranslate("")
    setTranslatedText("")
    setBatchTexts([""])
    setBatchResults([])
  }

  const getHealthStatus = () => {
    if (isCheckingHealth) {
      return { icon: <Loader2 className="h-4 w-4 animate-spin" />, color: "bg-yellow-50 text-yellow-700 border-yellow-200", text: "Checking..." }
    }
    
    if (serviceHealth === true) {
      return { icon: <CheckCircle className="h-4 w-4 text-green-500" />, color: "bg-green-50 text-green-700 border-green-200", text: "Healthy" }
    }
    
    if (serviceHealth === false) {
      return { icon: <AlertCircle className="h-4 w-4 text-red-500" />, color: "bg-red-50 text-red-700 border-red-200", text: "Unhealthy" }
    }
    
    return { icon: <Activity className="h-4 w-4 text-gray-500" />, color: "bg-gray-50 text-gray-700 border-gray-200", text: "Unknown" }
  }

  const healthStatus = getHealthStatus()

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Service Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Translation Service Status
          </CardTitle>
          <CardDescription>
            Monitor the health and status of your LibreTranslate service
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Service Health</span>
            </div>
            <Badge variant="outline" className={healthStatus.color}>
              {healthStatus.icon}
              <span className="ml-1">{healthStatus.text}</span>
            </Badge>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={checkHealth}
              disabled={isCheckingHealth}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isCheckingHealth ? 'animate-spin' : ''}`} />
              Check Health
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open('http://localhost:5000', '_blank')}
            >
              <Settings className="h-4 w-4 mr-2" />
              Open LibreTranslate
            </Button>
          </div>

          {translationError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700">{translationError}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Single Text Translation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Translate className="h-5 w-5" />
            Single Text Translation
          </CardTitle>
          <CardDescription>
            Translate individual text snippets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="source-text">Source Text</Label>
              <Textarea
                id="source-text"
                placeholder="Enter text to translate..."
                value={textToTranslate}
                onChange={(e) => setTextToTranslate(e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="target-lang">Target Language</Label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {supportedLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name_local || lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleSingleTranslation}
                disabled={!textToTranslate.trim() || isTranslating}
                className="w-full"
              >
                {isTranslating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Translate className="h-4 w-4 mr-2" />
                    Translate
                  </>
                )}
              </Button>
            </div>
          </div>

          {translatedText && (
            <div className="space-y-2">
              <Label>Translated Text</Label>
              <Textarea
                value={translatedText}
                readOnly
                rows={4}
                className="bg-gray-50"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Batch Translation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Batch Translation
          </CardTitle>
          <CardDescription>
            Translate multiple texts at once
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {batchTexts.map((text, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  placeholder={`Text ${index + 1}...`}
                  value={text}
                  onChange={(e) => updateBatchText(index, e.target.value)}
                  rows={2}
                  className="flex-1"
                />
                {batchTexts.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeBatchText(index)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={addBatchText}>
              <Upload className="h-4 w-4 mr-2" />
              Add Text
            </Button>
            
            <Button 
              onClick={handleBatchTranslation}
              disabled={batchTexts.every(text => !text.trim()) || isTranslating}
            >
              {isTranslating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Translating...
                </>
              ) : (
                <>
                  <Translate className="h-4 w-4 mr-2" />
                  Translate All
                </>
              )}
            </Button>
          </div>

          {batchResults.length > 0 && (
            <div className="space-y-2">
              <Label>Translation Results</Label>
              <div className="space-y-2">
                {batchResults.map((result, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-md">
                    <div className="text-sm text-gray-600 mb-1">Text {index + 1}</div>
                    <div className="font-medium">{result}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.open('https://github.com/LibreTranslate/LibreTranslate', '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              LibreTranslate Docs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
