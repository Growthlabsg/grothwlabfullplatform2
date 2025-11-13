"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Languages, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageTranslationProps {
  messageId: string
  originalContent: string
  onTranslate: (messageId: string, targetLanguage: string) => Promise<string>
  className?: string
}

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "id", name: "Indonesian" },
]

export function MessageTranslation({ messageId, originalContent, onTranslate, className }: MessageTranslationProps) {
  const [isTranslating, setIsTranslating] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [translatedContent, setTranslatedContent] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTranslate = async () => {
    try {
      setIsTranslating(true)
      setError(null)
      const translated = await onTranslate(messageId, selectedLanguage)
      setTranslatedContent(translated)
    } catch (err) {
      setError("Translation failed. Please try again.")
      console.error(err)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleReset = () => {
    setTranslatedContent(null)
    setError(null)
  }

  return (
    <div className={cn("rounded-md border p-3", className)}>
      {translatedContent ? (
        <>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Languages className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                Translated to {LANGUAGES.find((l) => l.code === selectedLanguage)?.name}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 mr-1" />
              Close
            </Button>
          </div>
          <p className="text-sm">{translatedContent}</p>
        </>
      ) : (
        <>
          <div className="flex items-center mb-2">
            <Languages className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Translate message</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    {language.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button size="sm" onClick={handleTranslate} disabled={isTranslating}>
              {isTranslating ? "Translating..." : "Translate"}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </>
      )}
    </div>
  )
}
