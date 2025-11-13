"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Globe, Check, Search, ChevronDown } from "lucide-react"

// Define available languages
const languages = [
  { code: "en", name: "English", flag: "🇺🇸", isDefault: true },
  { code: "zh", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "ms", name: "Malay", flag: "🇲🇾" },
  { code: "ta", name: "Tamil", flag: "🇮🇳" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
]

// Create language context
type LanguageContextType = {
  currentLanguage: string
  setLanguage: (code: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  setLanguage: () => {},
  t: (key) => key,
})

// Sample translations
const translations: Record<string, Record<string, string>> = {
  en: {
    welcome: "Welcome to GrowthLab",
    dashboard: "Dashboard",
    events: "Events",
    funding: "Funding",
    network: "Network",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
  },
  zh: {
    welcome: "欢迎来到新加坡成长实验室",
    dashboard: "仪表板",
    events: "活动",
    funding: "融资",
    network: "网络",
    settings: "设置",
    profile: "个人资料",
    logout: "登出",
  },
  ms: {
    welcome: "Selamat datang ke GrowthLab Singapura",
    dashboard: "Papan Pemuka",
    events: "Acara",
    funding: "Pembiayaan",
    network: "Rangkaian",
    settings: "Tetapan",
    profile: "Profil",
    logout: "Log Keluar",
  },
}

// Language Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const setLanguage = (code: string) => {
    setCurrentLanguage(code)
    // In a real app, you might want to store this in localStorage or cookies
  }

  const t = (key: string) => {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      return translations[currentLanguage][key]
    }
    // Fallback to English if translation not found
    return translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Hook to use language context
export function useLanguage() {
  return useContext(LanguageContext)
}

// Language Selector component
export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  return (
    <div className="relative">
      <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(!isOpen)}>
        <span>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-background border z-10">
          <div className="py-1">
            {languages.map((language) => (
              <button type="button"
                key={language.code}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-muted"
                onClick={() => {
                  setLanguage(language.code)
                  setIsOpen(false)
                }}
              >
                <span className="mr-2">{language.flag}</span>
                <span className="flex-1 text-left">{language.name}</span>
                {language.code === currentLanguage && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Main Internationalization component
interface InternationalizationProps {
  className?: string
}

export function Internationalization({ className }: InternationalizationProps) {
  const [activeTab, setActiveTab] = useState("languages")
  const [searchQuery, setSearchQuery] = useState("")
  const [autoDetect, setAutoDetect] = useState(true)
  const [showUntranslated, setShowUntranslated] = useState(false)
  const [defaultLanguage, setDefaultLanguage] = useState("en")

  // Filter languages based on search query
  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || lang.code.includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center">
          <Globe className="h-5 w-5 mr-2" />
          Language & Localization
        </h2>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 border-b">
          <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
            <TabsTrigger value="languages" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Languages
            </TabsTrigger>
            <TabsTrigger value="translations" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Translations
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
              Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <ScrollArea className="flex-1">
          <TabsContent value="languages" className="p-4 m-0">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  className="pl-10 pr-4 py-2 w-full text-sm rounded-md border border-input bg-background"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLanguages.map((language) => (
                <Card key={language.code} className={language.code === defaultLanguage ? "border-primary" : ""}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{language.flag}</div>
                      <div>
                        <p className="font-medium">{language.name}</p>
                        <p className="text-xs text-muted-foreground">Code: {language.code}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {language.isDefault && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          Default
                        </Badge>
                      )}
                      <Switch checked={language.code === defaultLanguage} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="translations" className="p-4 m-0">
            <div className="flex items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search translations..."
                  className="pl-10 pr-4 py-2 w-full text-sm rounded-md border border-input bg-background"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Switch id="show-untranslated" checked={showUntranslated} onCheckedChange={setShowUntranslated} />
                  <Label htmlFor="show-untranslated">Show untranslated only</Label>
                </div>
                <Button>Add Translation</Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Translation Keys</CardTitle>
                <CardDescription>Manage your application's text content across languages</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Key</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                          English (Default)
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Chinese</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Malay</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      {Object.keys(translations.en).map((key) => (
                        <tr
                          key={key}
                          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                        >
                          <td className="p-4 align-middle font-medium">{key}</td>
                          <td className="p-4 align-middle">{translations.en[key]}</td>
                          <td className="p-4 align-middle">
                            {translations.zh && translations.zh[key] ? (
                              translations.zh[key]
                            ) : (
                              <span className="text-muted-foreground italic">Not translated</span>
                            )}
                          </td>
                          <td className="p-4 align-middle">
                            {translations.ms && translations.ms[key] ? (
                              translations.ms[key]
                            ) : (
                              <span className="text-muted-foreground italic">Not translated</span>
                            )}
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="p-4 m-0">
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Language Settings</CardTitle>
                <CardDescription>Configure how languages are handled in your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-detect">Auto-detect User Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically detect and apply the user's preferred language based on browser settings
                    </p>
                  </div>
                  <Switch id="auto-detect" checked={autoDetect} onCheckedChange={setAutoDetect} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="default-language">Default Language</Label>
                    <p className="text-sm text-muted-foreground">
                      The language to use when auto-detection is disabled or fails
                    </p>
                  </div>
                  <select
                    id="default-language"
                    className="w-[200px] rounded-md border border-input bg-background px-3 py-2"
                    value={defaultLanguage}
                    onChange={(e) => setDefaultLanguage(e.target.value)}
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="fallback-language">Fallback Language</Label>
                    <p className="text-sm text-muted-foreground">
                      The language to use when a translation is missing in the selected language
                    </p>
                  </div>
                  <select
                    id="fallback-language"
                    className="w-[200px] rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="en"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="language-selector">Show Language Selector</Label>
                    <p className="text-sm text-muted-foreground">
                      Display a language selector in the application interface
                    </p>
                  </div>
                  <Switch id="language-selector" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="rtl-support">RTL Language Support</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable right-to-left text direction for languages like Arabic and Hebrew
                    </p>
                  </div>
                  <Switch id="rtl-support" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localization Settings</CardTitle>
                <CardDescription>Configure region-specific formatting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="date-format">Date Format</Label>
                    <p className="text-sm text-muted-foreground">
                      How dates should be displayed throughout the application
                    </p>
                  </div>
                  <select
                    id="date-format"
                    className="w-[200px] rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="auto"
                  >
                    <option value="auto">Auto (Based on locale)</option>
                    <option value="mdy">MM/DD/YYYY</option>
                    <option value="dmy">DD/MM/YYYY</option>
                    <option value="ymd">YYYY/MM/DD</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="time-format">Time Format</Label>
                    <p className="text-sm text-muted-foreground">
                      How times should be displayed throughout the application
                    </p>
                  </div>
                  <select
                    id="time-format"
                    className="w-[200px] rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="auto"
                  >
                    <option value="auto">Auto (Based on locale)</option>
                    <option value="12">12-hour (AM/PM)</option>
                    <option value="24">24-hour</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="currency">Default Currency</Label>
                    <p className="text-sm text-muted-foreground">The primary currency used for monetary values</p>
                  </div>
                  <select
                    id="currency"
                    className="w-[200px] rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="sgd"
                  >
                    <option value="sgd">SGD (S$)</option>
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="jpy">JPY (¥)</option>
                    <option value="cny">CNY (¥)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <p className="text-sm text-muted-foreground">The timezone used for displaying dates and times</p>
                  </div>
                  <select
                    id="timezone"
                    className="w-[200px] rounded-md border border-input bg-background px-3 py-2"
                    defaultValue="Asia/Singapore"
                  >
                    <option value="Asia/Singapore">Singapore (GMT+8)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">New York (GMT-5/4)</option>
                    <option value="Europe/London">London (GMT+0/1)</option>
                    <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
