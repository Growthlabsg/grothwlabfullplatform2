"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BarChart3, 
  Users, 
  Rocket, 
  DollarSign, 
  GraduationCap, 
  Building2,
  User,
  Settings,
  Activity,
  TrendingUp,
  Target,
  Award,
  Globe,
  MessageSquare,
  Calendar,
  FileText,
  Briefcase,
  Heart,
  Star,
  Zap,
  Lightbulb,
  Shield,
  Gift,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowRight,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface DashboardCard {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  badge?: string
  color: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = useLanguage()
  
  // Fallbacks if translations are missing
  const titleRaw = t("dashboard.title")
  const subtitleRaw = t("dashboard.subtitle")
  const statusLiveRaw = t("dashboard.status.live")
  const titleText = !titleRaw || titleRaw === "dashboard.title" ? "Dashboard" : titleRaw
  const subtitleText = !subtitleRaw || subtitleRaw === "dashboard.subtitle" ? "Your central hub for insights and activity" : subtitleRaw
  const statusLiveText = !statusLiveRaw || statusLiveRaw === "dashboard.status.live" ? "Live" : statusLiveRaw

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{titleText}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{subtitleText}</p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Activity className="h-3 w-3 mr-1" />
                {statusLiveText}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content from children */}
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
    )
  }