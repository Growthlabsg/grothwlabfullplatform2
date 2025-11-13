"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Languages } from "lucide-react"
import type { Message } from "@/types/communication"

interface TranslateDialogProps {
  isOpen: boolean
  onClose: () => void
  message: Message | null
}

export function TranslateDialog({ isOpen, onClose, message }: TranslateDialogProps) {
  const [targetLanguage, setTargetLanguage] = useState("en")
  const [translatedText, setTranslatedText] = useState("")
  const [isTranslating, setIsTranslating] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese (Simplified)" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "bn", name: "Bengali" },
    { code: "ms", name: "Malay" },
    { code: "id", name: "Indonesian" },
    { code: "th", name: "Thai" },
    { code: "vi", name: "Vietnamese" },
  ]

  useEffect(() => {
    if (isOpen && message) {
      handleTranslate()
    } else {
      setTranslatedText("")
    }
  }, [isOpen, message, targetLanguage])

  const handleTranslate = () => {
    if (!message) return

    setIsTranslating(true)

    // Simulate translation API call
    setTimeout(() => {
      // Mock translations based on language
      const translations: Record<string, string> = {
        en: "This is the translated text in English.",
        es: "Este es el texto traducido en español.",
        fr: "Voici le texte traduit en français.",
        de: "Dies ist der übersetzte Text auf Deutsch.",
        it: "Questo è il testo tradotto in italiano.",
        pt: "Este é o texto traduzido em português.",
        ru: "Это переведенный текст на русском языке.",
        ja: "これは日本語に翻訳されたテキストです。",
        ko: "이것은 한국어로 번역된 텍스트입니다.",
        zh: "这是翻译成中文的文本。",
        ar: "هذا هو النص المترجم باللغة العربية.",
        hi: "यह हिंदी में अनुवादित पाठ है।",
        bn: "এটি বাংলায় অনুবাদ করা পাঠ্য।",
        ms: "Ini adalah teks yang diterjemahkan dalam bahasa Melayu.",
        id: "Ini adalah teks yang diterjemahkan dalam bahasa Indonesia.",
        th: "นี่คือข้อความที่แปลเป็นภาษาไทย",
        vi: "Đây là văn bản được dịch sang tiếng Việt.",
      }

      setTranslatedText(translations[targetLanguage] || "Translation not available for this language.")
      setIsTranslating(false)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Translate Message</DialogTitle>
          <DialogDescription>Translate this message to another language.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Original message:</label>
            <div className="p-3 bg-muted rounded-md text-sm">{message?.content || "No message selected"}</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Translate to:</label>
            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Translation:</label>
            <div className="p-3 bg-muted rounded-md text-sm min-h-[60px]">
              {isTranslating ? (
                <div className="flex items-center justify-center h-full">
                  <Languages className="h-4 w-4 mr-2 animate-spin" />
                  <span>Translating...</span>
                </div>
              ) : (
                translatedText || "Translation will appear here"
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleTranslate} disabled={isTranslating || !message}>
            {isTranslating ? "Translating..." : "Translate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
