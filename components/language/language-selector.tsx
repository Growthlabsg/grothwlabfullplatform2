"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Globe } from "lucide-react"
import { useLanguage, getLanguageName } from "@/contexts/language-context"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文 (Chinese)", flag: "🇨🇳" },
  { code: "ms", name: "Bahasa Melayu (Malay)", flag: "🇲🇾" },
  { code: "ta", name: "தமிழ் (Tamil)", flag: "🇮🇳" },
  { code: "id", name: "Bahasa Indonesia (Indonesian)", flag: "🇮🇩" },
  { code: "vi", name: "Tiếng Việt (Vietnamese)", flag: "🇻🇳" },
  { code: "th", name: "ไทย (Thai)", flag: "🇹🇭" },
]

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any)
    setIsOpen(false)
    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }
  }

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-auto px-3 gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Globe className="h-4 w-4" />
          <span className="text-lg mr-1">{currentLanguage?.flag}</span>
          <span className="hidden sm:inline text-sm font-medium">
            {currentLanguage?.name.split(" ")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </div>
            {language === lang.code && (
              <Check className="h-4 w-4 text-blue-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
