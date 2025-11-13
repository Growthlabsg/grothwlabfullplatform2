"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { libreTranslateService } from "@/lib/libretranslate-service"

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
  tp: (text: string) => string
  translate: (text: string, targetLang?: string) => Promise<string>
  translateBatch: (texts: string[], targetLang?: string) => Promise<string[]>
  isTranslating: boolean
  translationError: string | null
  supportedLanguages: Array<{ code: string; name: string; name_local?: string }>
  checkTranslationService: () => Promise<boolean>
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [translationError, setTranslationError] = useState<string | null>(null)
  const [supportedLanguages, setSupportedLanguages] = useState<Array<{ code: string; name: string; name_local?: string }>>([])

  // Load persisted language on mount and persist on change
  useEffect(() => {
    try {
      const saved = typeof window !== "undefined" ? localStorage.getItem("language") : null
      if (saved) setLanguage(saved)
    } catch {}
  }, [])
  
  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("language", language)
    } catch {}
  }, [language])

  // Load supported languages on mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const languages = await libreTranslateService.getSupportedLanguages()
        setSupportedLanguages(languages)
      } catch (error) {
        console.error('Failed to load supported languages:', error)
        // Fallback to common languages
        setSupportedLanguages([
          { code: 'en', name: 'English', name_local: 'English' },
          { code: 'zh', name: 'Chinese', name_local: '中文' },
          { code: 'es', name: 'Spanish', name_local: 'Español' },
          { code: 'fr', name: 'French', name_local: 'Français' },
          { code: 'de', name: 'German', name_local: 'Deutsch' },
          { code: 'ja', name: 'Japanese', name_local: '日本語' },
          { code: 'ko', name: 'Korean', name_local: '한국어' },
          { code: 'ar', name: 'Arabic', name_local: 'العربية' },
          { code: 'hi', name: 'Hindi', name_local: 'हिन्दी' },
          { code: 'pt', name: 'Portuguese', name_local: 'Português' }
        ])
      }
    }

    loadLanguages()
  }, [])

  // Check translation service health
  const checkTranslationService = useCallback(async (): Promise<boolean> => {
    try {
      const isHealthy = await libreTranslateService.healthCheck()
      setTranslationError(isHealthy ? null : 'Translation service unavailable')
      return isHealthy
    } catch (error) {
      setTranslationError('Translation service error')
      return false
    }
  }, [])

  // Translate text using LibreTranslate
  const translate = useCallback(async (text: string, targetLang?: string): Promise<string> => {
    console.log("LanguageContext: translate called", { text, targetLang, currentLanguage: language })
    
    if (!text || text.trim() === '') {
      console.log("LanguageContext: Empty text, returning as-is")
      return text
    }

    const target = targetLang || language
    console.log("LanguageContext: Target language", { target, originalTarget: targetLang })
    
    // Don't translate if target is English
    if (target === 'en') {
      console.log("LanguageContext: Target is English, no translation needed")
      return text
    }

    setIsTranslating(true)
    setTranslationError(null)
    console.log("LanguageContext: Starting translation", { text, target })

    try {
      const translatedText = await libreTranslateService.translate(text, target, 'auto')
      console.log("LanguageContext: Translation successful", { original: text, translated: translatedText, target })
      setIsTranslating(false)
      return translatedText
    } catch (error) {
      console.error('LanguageContext: Translation failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Translation failed'
      setTranslationError(errorMessage)
      setIsTranslating(false)
      return text // Fallback to original text
    }
  }, [language])

  // Translate multiple texts
  const translateBatch = useCallback(async (texts: string[], targetLang?: string): Promise<string[]> => {
    if (texts.length === 0) return texts

    const target = targetLang || language
    
    if (target === 'en') {
      return texts
    }

    setIsTranslating(true)
    setTranslationError(null)

    try {
      const results = await libreTranslateService.translateBatch(texts, target, 'auto')
      setIsTranslating(false)
      return results
    } catch (error) {
      console.error('Batch translation failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Batch translation failed'
      setTranslationError(errorMessage)
      setIsTranslating(false)
      return texts // Fallback to original texts
    }
  }, [language])

  // Minimal translation dictionary with sensible defaults
  const translations: Record<string, Record<string, string>> = {
    en: {
      // Dashboard
      "dashboard.title": "Dashboard",
      "dashboard.subtitle": "Your central hub for insights and activity",
      "dashboard.status.live": "Live",
      "dashboard.access": "Access Dashboard",
      "dashboard.quick.stats": "Quick Stats",
      "dashboard.stats.active.users": "Active Users",
      "dashboard.stats.total.revenue": "Total Revenue",
      "dashboard.stats.startups": "Startups",
      "dashboard.stats.mentors": "Mentors",

      // Areas
      "dashboard.analytics": "Analytics & Insights",
      "dashboard.analytics.description": "View real-time metrics, trends, and performance.",
      "dashboard.admin": "Admin Console",
      "dashboard.admin.description": "Manage users, permissions, and platform settings.",
      "dashboard.investor": "Investor Desk",
      "dashboard.investor.description": "Discover deals and track portfolio activity.",
      "dashboard.mentor": "Mentor Hub",
      "dashboard.mentor.description": "Support startups and manage mentorship sessions.",
      "dashboard.teacher": "Educator Hub",
      "dashboard.teacher.description": "Courses, classes, and student engagement.",
      "dashboard.growthstarter": "Growthstarter",
      "dashboard.growthstarter.description": "Launch and manage crowdfunding campaigns.",
      "dashboard.startup": "Startup HQ",
      "dashboard.startup.description": "Operate your startup and track progress.",
      "dashboard.super-admin": "Super Admin",
      "dashboard.super-admin.description": "Global configuration and platform controls.",

      // Sports Club
      "sports.title": "Founders Sports Club",
      "sports.subtitle": "Connect with fellow founders through sports, tournaments, and networking activities",
      "sports.create.event": "Create Event",
      "sports.dashboard": "Dashboard",
      "sports.teams": "Teams",
      "sports.tournaments": "Tournaments",
      "sports.analytics": "Analytics",
      "sports.interests": "Interests",
      "sports.events": "Events",
      "sports.networking": "Networking",

      // Common Actions
      "action.create": "Create",
      "action.edit": "Edit",
      "action.delete": "Delete",
      "action.save": "Save",
      "action.cancel": "Cancel",
      "action.submit": "Submit",
      "action.back": "Back",
      "action.next": "Next",
      "action.previous": "Previous",
      "action.view": "View",
      "action.download": "Download",
      "action.upload": "Upload",
      "action.search": "Search",
      "action.filter": "Filter",
      "action.sort": "Sort",
      "action.refresh": "Refresh",
      "action.close": "Close",
      "action.open": "Open",
      "action.start": "Start",
      "action.stop": "Stop",
      "action.pause": "Pause",
      "action.resume": "Resume",
    },
    zh: {
      "dashboard.title": "仪表板",
      "dashboard.subtitle": "您的洞察和活动中心",
      "dashboard.status.live": "实时",
      "dashboard.access": "进入仪表板",
      "dashboard.quick.stats": "快速统计",
      "dashboard.stats.active.users": "活跃用户",
      "dashboard.stats.total.revenue": "总收入",
      "dashboard.stats.startups": "初创公司",
      "dashboard.stats.mentors": "导师",
      "dashboard.analytics": "分析与洞察",
      "dashboard.admin": "管理控制台",
      "dashboard.investor": "投资者工作台",
      "dashboard.mentor": "导师中心",
      "dashboard.teacher": "教育者中心",
      "dashboard.growthstarter": "Growthstarter",
      "dashboard.startup": "创业总部",
      "dashboard.super-admin": "超级管理员",

      // Sports Club
      "sports.title": "创始人体育俱乐部",
      "sports.subtitle": "通过体育、锦标赛和社交活动与创始人建立联系",
      "sports.create.event": "创建活动",
      "sports.dashboard": "仪表板",
      "sports.teams": "团队",
      "sports.tournaments": "锦标赛",
      "sports.analytics": "分析",
      "sports.interests": "兴趣",
      "sports.events": "活动",
      "sports.networking": "社交网络",

      // Common Actions
      "action.create": "创建",
      "action.edit": "编辑",
      "action.delete": "删除",
      "action.save": "保存",
      "action.cancel": "取消",
      "action.submit": "提交",
      "action.back": "返回",
      "action.next": "下一步",
      "action.previous": "上一步",
      "action.view": "查看",
      "action.download": "下载",
      "action.upload": "上传",
      "action.search": "搜索",
      "action.filter": "筛选",
      "action.sort": "排序",
      "action.refresh": "刷新",
      "action.close": "关闭",
      "action.open": "打开",
      "action.start": "开始",
      "action.stop": "停止",
      "action.pause": "暂停",
      "action.resume": "恢复",
    },
    es: {
      "dashboard.title": "Panel de Control",
      "dashboard.subtitle": "Tu centro de información y actividad",
      "sports.title": "Club Deportivo de Fundadores",
      "sports.subtitle": "Conecta con otros fundadores a través del deporte, torneos y actividades de networking",
      "action.create": "Crear",
      "action.edit": "Editar",
      "action.delete": "Eliminar",
      "action.save": "Guardar",
      "action.cancel": "Cancelar",
    },
    fr: {
      "dashboard.title": "Tableau de Bord",
      "dashboard.subtitle": "Votre centre d'informations et d'activités",
      "sports.title": "Club Sportif des Fondateurs",
      "sports.subtitle": "Connectez-vous avec d'autres fondateurs par le sport, les tournois et les activités de réseautage",
      "action.create": "Créer",
      "action.edit": "Modifier",
      "action.delete": "Supprimer",
      "action.save": "Enregistrer",
      "action.cancel": "Annuler",
    },
    de: {
      "dashboard.title": "Dashboard",
      "dashboard.subtitle": "Ihr zentraler Hub für Einblicke und Aktivitäten",
      "sports.title": "Gründer Sportclub",
      "sports.subtitle": "Verbinden Sie sich mit anderen Gründern durch Sport, Turniere und Networking-Aktivitäten",
      "action.create": "Erstellen",
      "action.edit": "Bearbeiten",
      "action.delete": "Löschen",
      "action.save": "Speichern",
      "action.cancel": "Abbrechen",
    }
  }

  // Common phrase translations for auto-translating button labels by text
  const phraseTable: Record<string, Partial<Record<string, string>>> = {
    "submit": { zh: "提交", es: "Enviar", fr: "Soumettre", de: "Absenden" },
    "save": { zh: "保存", es: "Guardar", fr: "Enregistrer", de: "Speichern" },
    "cancel": { zh: "取消", es: "Cancelar", fr: "Annuler", de: "Abbrechen" },
    "edit": { zh: "编辑", es: "Editar", fr: "Modifier", de: "Bearbeiten" },
    "delete": { zh: "删除", es: "Eliminar", fr: "Supprimer", de: "Löschen" },
    "back": { zh: "返回", es: "Atrás", fr: "Retour", de: "Zurück" },
    "next": { zh: "下一步", es: "Siguiente", fr: "Suivant", de: "Weiter" },
    "previous": { zh: "上一步", es: "Anterior", fr: "Précédent", de: "Zurück" },
    "view details": { zh: "查看详情", es: "Ver detalles", fr: "Voir les détails", de: "Details anzeigen" },
    "register": { zh: "注册", es: "Registrarse", fr: "S'inscrire", de: "Registrieren" },
    "register now": { zh: "立即注册", es: "Registrarse ahora", fr: "S'inscrire maintenant", de: "Jetzt registrieren" },
    "create": { zh: "创建", es: "Crear", fr: "Créer", de: "Erstellen" },
    "create event": { zh: "创建活动", es: "Crear evento", fr: "Créer un événement", de: "Veranstaltung erstellen" },
    "invite": { zh: "邀请", es: "Invitar", fr: "Inviter", de: "Einladen" },
    "share": { zh: "分享", es: "Compartir", fr: "Partager", de: "Teilen" },
    "add to calendar": { zh: "添加到日历", es: "Agregar al calendario", fr: "Ajouter au calendrier", de: "Zum Kalender hinzufügen" },
    "download": { zh: "下载", es: "Descargar", fr: "Télécharger", de: "Herunterladen" },
    "try app": { zh: "试用应用", es: "Probar aplicación", fr: "Essayer l'application", de: "App testen" },
    "apply now": { zh: "立即申请", es: "Aplicar ahora", fr: "Postuler maintenant", de: "Jetzt bewerben" },
    "learn more": { zh: "了解更多", es: "Saber más", fr: "En savoir plus", de: "Mehr erfahren" },
    "read more": { zh: "阅读更多", es: "Leer más", fr: "Lire la suite", de: "Weiterlesen" },
    "contact": { zh: "联系", es: "Contactar", fr: "Contacter", de: "Kontakt" },
    "sign in": { zh: "登录", es: "Iniciar sesión", fr: "Se connecter", de: "Anmelden" },
    "sign up": { zh: "注册", es: "Registrarse", fr: "S'inscrire", de: "Registrieren" },
    "submit app": { zh: "提交应用", es: "Enviar aplicación", fr: "Soumettre l'application", de: "App einreichen" },
    "submit deal": { zh: "提交优惠", es: "Enviar oferta", fr: "Soumettre l'offre", de: "Angebot einreichen" },
    "view teams": { zh: "查看队伍", es: "Ver equipos", fr: "Voir les équipes", de: "Teams anzeigen" },
    "qr check-in": { zh: "二维码签到", es: "Registro QR", fr: "Enregistrement QR", de: "QR-Check-in" },
  }

  const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim()

  const tp = (text: string): string => {
    const key = normalize(text)
    const row = phraseTable[key]
    if (!row) return text
    const translated = row[language]
    return translated || text
  }

  const toTitleCase = (text: string) =>
    text
      .replace(/[-_.]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())

  const humanizeKey = (key: string): string => {
    // Prefer full-path humanization: e.g., "dashboard.title" -> "Dashboard Title"
    return toTitleCase(key)
  }

  const t = (key: string): string => {
    const table = translations[language] || translations.en
    const value = table[key]
    if (value && typeof value === "string") return value
    // Fallback to a humanized version of the key so UI never shows raw keys
    return humanizeKey(key)
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      tp, 
      translate,
      translateBatch,
      isTranslating,
      translationError,
      supportedLanguages,
      checkTranslationService
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
