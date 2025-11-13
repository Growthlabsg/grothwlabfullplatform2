// Mock Translation Service for Development
// This provides translations without requiring LibreTranslate to be running

export interface MockTranslationData {
  [key: string]: {
    [langCode: string]: string
  }
}

// Mock translation data for common phrases
const mockTranslations: MockTranslationData = {
  // Dashboard
  "Dashboard": {
    "zh": "仪表板",
    "es": "Panel de Control",
    "fr": "Tableau de Bord",
    "de": "Dashboard",
    "ja": "ダッシュボード",
    "ko": "대시보드",
    "ar": "لوحة التحكم",
    "hi": "डैशबोर्ड",
    "pt": "Painel de Controle"
  },
  "Your central hub for insights and activity": {
    "zh": "您的洞察和活动中心",
    "es": "Tu centro de información y actividad",
    "fr": "Votre centre d'informations et d'activités",
    "de": "Ihr zentraler Hub für Einblicke und Aktivitäten",
    "ja": "洞察とアクティビティの中心的なハブ",
    "ko": "통찰력과 활동의 중앙 허브",
    "ar": "مركزك الرئيسي للرؤى والنشاط",
    "hi": "अंतर्दृष्टि और गतिविधि का आपका केंद्रीय केंद्र",
    "pt": "Seu centro para insights e atividades"
  },
  
  // Sports Club
  "Founders Sports Club": {
    "zh": "创始人体育俱乐部",
    "es": "Club Deportivo de Fundadores",
    "fr": "Club Sportif des Fondateurs",
    "de": "Gründer Sportclub",
    "ja": "創業者スポーツクラブ",
    "ko": "창업자 스포츠 클럽",
    "ar": "نادي الرياضة للمؤسسين",
    "hi": "संस्थापक खेल क्लब",
    "pt": "Clube Esportivo dos Fundadores"
  },
  "Connect with fellow founders through sports, tournaments, and networking activities": {
    "zh": "通过体育、锦标赛和社交活动与创始人建立联系",
    "es": "Conecta con otros fundadores a través del deporte, torneos y actividades de networking",
    "fr": "Connectez-vous avec d'autres fondateurs par le sport, les tournois et les activités de réseautage",
    "de": "Verbinden Sie sich mit anderen Gründern durch Sport, Turniere und Networking-Aktivitäten",
    "ja": "スポーツ、トーナメント、ネットワーキング活動を通じて他の創業者とつながる",
    "ko": "스포츠, 토너먼트, 네트워킹 활동을 통해 다른 창업자들과 연결",
    "ar": "تواصل مع المؤسسين الآخرين من خلال الرياضة والبطولات وأنشطة التواصل",
    "hi": "खेल, टूर्नामेंट और नेटवर्किंग गतिविधियों के माध्यम से अन्य संस्थापकों के साथ जुड़ें",
    "pt": "Conecte-se com outros fundadores através de esportes, torneios e atividades de networking"
  },
  
  // Common Actions
  "Create Event": {
    "zh": "创建活动",
    "es": "Crear Evento",
    "fr": "Créer un Événement",
    "de": "Veranstaltung Erstellen",
    "ja": "イベントを作成",
    "ko": "이벤트 생성",
    "ar": "إنشاء حدث",
    "hi": "इवेंट बनाएं",
    "pt": "Criar Evento"
  },
  "Dashboard": {
    "zh": "仪表板",
    "es": "Panel de Control",
    "fr": "Tableau de Bord",
    "de": "Dashboard",
    "ja": "ダッシュボード",
    "ko": "대시보드",
    "ar": "لوحة التحكم",
    "hi": "डैशबोर्ड",
    "pt": "Painel de Controle"
  },
  "Teams": {
    "zh": "团队",
    "es": "Equipos",
    "fr": "Équipes",
    "de": "Teams",
    "ja": "チーム",
    "ko": "팀",
    "ar": "الفرق",
    "hi": "टीम",
    "pt": "Equipes"
  },
  "Tournaments": {
    "zh": "锦标赛",
    "es": "Torneos",
    "fr": "Tournois",
    "de": "Turniere",
    "ja": "トーナメント",
    "ko": "토너먼트",
    "ar": "البطولات",
    "hi": "टूर्नामेंट",
    "pt": "Torneios"
  },
  "Analytics": {
    "zh": "分析",
    "es": "Análisis",
    "fr": "Analyses",
    "de": "Analysen",
    "ja": "分析",
    "ko": "분석",
    "ar": "التحليلات",
    "hi": "विश्लेषण",
    "pt": "Análises"
  },
  "Interests": {
    "zh": "兴趣",
    "es": "Intereses",
    "fr": "Intérêts",
    "de": "Interessen",
    "ja": "興味",
    "ko": "관심사",
    "ar": "الاهتمامات",
    "hi": "रुचियां",
    "pt": "Interesses"
  },
  "Events": {
    "zh": "活动",
    "es": "Eventos",
    "fr": "Événements",
    "de": "Veranstaltungen",
    "ja": "イベント",
    "ko": "이벤트",
    "ar": "الأحداث",
    "hi": "इवेंट",
    "pt": "Eventos"
  },
  "Networking": {
    "zh": "社交网络",
    "es": "Networking",
    "fr": "Réseautage",
    "de": "Netzwerken",
    "ja": "ネットワーキング",
    "ko": "네트워킹",
    "ar": "التواصل",
    "hi": "नेटवर्किंग",
    "pt": "Networking"
  },
  
  // Stats and Metrics
  "Quick Stats": {
    "zh": "快速统计",
    "es": "Estadísticas Rápidas",
    "fr": "Statistiques Rapides",
    "de": "Schnelle Statistiken",
    "ja": "クイック統計",
    "ko": "빠른 통계",
    "ar": "إحصائيات سريعة",
    "hi": "त्वरित आंकड़े",
    "pt": "Estatísticas Rápidas"
  },
  "Active Users": {
    "zh": "活跃用户",
    "es": "Usuarios Activos",
    "fr": "Utilisateurs Actifs",
    "de": "Aktive Benutzer",
    "ja": "アクティブユーザー",
    "ko": "활성 사용자",
    "ar": "المستخدمون النشطون",
    "hi": "सक्रिय उपयोगकर्ता",
    "pt": "Usuários Ativos"
  },
  "Total Revenue": {
    "zh": "总收入",
    "es": "Ingresos Totales",
    "fr": "Revenus Totaux",
    "de": "Gesamteinnahmen",
    "ja": "総収益",
    "ko": "총 수익",
    "ar": "إجمالي الإيرادات",
    "hi": "कुल राजस्व",
    "pt": "Receita Total"
  },
  "Startups": {
    "zh": "初创公司",
    "es": "Startups",
    "fr": "Startups",
    "de": "Startups",
    "ja": "スタートアップ",
    "ko": "스타트업",
    "ar": "الشركات الناشئة",
    "hi": "स्टार्टअप",
    "pt": "Startups"
  },
  "Mentors": {
    "zh": "导师",
    "es": "Mentores",
    "fr": "Mentors",
    "de": "Mentoren",
    "ja": "メンター",
    "ko": "멘토",
    "ar": "المرشدون",
    "hi": "सलाहकार",
    "pt": "Mentores"
  },
  
  // Upcoming Events
  "Upcoming Events": {
    "zh": "即将举行的活动",
    "es": "Próximos Eventos",
    "fr": "Événements à Venir",
    "de": "Kommende Veranstaltungen",
    "ja": "今後のイベント",
    "ko": "예정된 이벤트",
    "ar": "الأحداث القادمة",
    "hi": "आगामी इवेंट",
    "pt": "Próximos Eventos"
  },
  "Recent Achievements": {
    "zh": "最近成就",
    "es": "Logros Recientes",
    "fr": "Réalisations Récentes",
    "de": "Aktuelle Erfolge",
    "ja": "最近の成果",
    "ko": "최근 성과",
    "ar": "الإنجازات الأخيرة",
    "hi": "हाल के उपलब्धियां",
    "pt": "Conquistas Recentes"
  },
  "Leaderboard": {
    "zh": "排行榜",
    "es": "Tabla de Posiciones",
    "fr": "Classement",
    "de": "Rangliste",
    "ja": "リーダーボード",
    "ko": "리더보드",
    "ar": "المتصدرون",
    "hi": "लीडरबोर्ड",
    "pt": "Classificação"
  }
}

class MockTranslateService {
  private cache: Map<string, string> = new Map()

  async translate(text: string, targetLang: string, sourceLang: string = 'en'): Promise<string> {
    if (!text || targetLang === 'en') {
      return text
    }

    // Check cache first
    const cacheKey = `${sourceLang}:${targetLang}:${text}`
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    // Look up in mock translations
    const translation = mockTranslations[text]?.[targetLang]
    
    if (translation) {
      this.cache.set(cacheKey, translation)
      return translation
    }

    // If no translation found, return original text
    return text
  }

  async translateBatch(texts: string[], targetLang: string, sourceLang: string = 'en'): Promise<string[]> {
    const results: string[] = []
    
    for (const text of texts) {
      const translated = await this.translate(text, targetLang, sourceLang)
      results.push(translated)
    }

    return results
  }

  async getSupportedLanguages() {
    return [
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
    ]
  }

  async healthCheck(): Promise<boolean> {
    return true // Mock service is always healthy
  }

  clearCache(): void {
    this.cache.clear()
  }

  getCacheStats() {
    return {
      size: this.cache.size,
      hitRate: 0
    }
  }
}

export const mockTranslateService = new MockTranslateService()
