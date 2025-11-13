"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ToggleLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Zap,
  Users,
  MessageSquare,
  Calendar,
  Building,
  DollarSign,
  BookOpen,
  Video,
  Phone,
  QrCode,
  Globe,
  Shield,
  Bell,
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  Award,
  Heart,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  Save,
  RefreshCw,
  Download,
  Upload,
  Handshake,
  ShoppingCart,
  Scale,
  MessageCircle,
  Briefcase,
  HelpCircle,
  Bot,
  Brain,
  Home,
  GraduationCap,
  Calculator,
  Mail
} from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

interface Feature {
  id: string
  name: string
  description: string
  category: "core" | "communication" | "business" | "analytics" | "security" | "social" | "sidebar"
  status: "enabled" | "disabled" | "beta" | "deprecated"
  enabled: boolean
  betaEnabled: boolean
  visible: boolean
  sidebarVisible?: boolean
  sidebarPosition?: number
  sidebarIcon?: string
  requiresAuth: boolean
  userRoles: string[]
  lastModified: string
  modifiedBy: string
  usage: {
    total: number
    active: number
    percentage: number
  }
  dependencies: string[]
  impact: "low" | "medium" | "high" | "critical"
  maintenance: "none" | "low" | "medium" | "high"
  launchDate?: string
  rolloutPercentage?: number
  targetAudience?: string[]
}

const mockFeatures: Feature[] = [
  {
    id: "user-authentication",
    name: "User Authentication",
    description: "Core user authentication and authorization system",
    category: "core",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: false,
    sidebarPosition: 0,
    sidebarIcon: "Shield",
    requiresAuth: false,
    userRoles: ["all"],
    lastModified: "2024-01-20T10:30:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 1247, percentage: 8.1 },
    dependencies: [],
    impact: "critical",
    maintenance: "low",
    rolloutPercentage: 100,
    targetAudience: ["all"]
  },
  {
    id: "messaging-system",
    name: "Messaging System",
    description: "Real-time messaging and chat functionality",
    category: "communication",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-19T15:45:00Z",
    modifiedBy: "admin.user",
    usage: { total: 15420, active: 8923, percentage: 57.9 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "medium"
  },
  {
    id: "video-calls",
    name: "Video Calls",
    description: "Integrated video calling and conferencing",
    category: "communication",
    status: "beta",
    enabled: true,
    betaEnabled: true,
    visible: true,
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-18T09:20:00Z",
    modifiedBy: "admin.user",
    usage: { total: 15420, active: 2341, percentage: 15.2 },
    dependencies: ["user-authentication", "messaging-system"],
    impact: "medium",
    maintenance: "high"
  },
  {
    id: "startup-dashboard",
    name: "Startup Dashboard",
    description: "Comprehensive dashboard for startup management",
    category: "business",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    requiresAuth: true,
    userRoles: ["startup"],
    lastModified: "2024-01-17T14:15:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 3456, percentage: 22.4 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "medium"
  },
  {
    id: "investor-portal",
    name: "Investor Portal",
    description: "Investment management and deal flow portal",
    category: "business",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    requiresAuth: true,
    userRoles: ["investor"],
    lastModified: "2024-01-16T11:30:00Z",
    modifiedBy: "admin.user",
    usage: { total: 15420, active: 1234, percentage: 8.0 },
    dependencies: ["user-authentication", "startup-dashboard"],
    impact: "high",
    maintenance: "medium"
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description: "Advanced analytics and reporting tools",
    category: "analytics",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    requiresAuth: true,
    userRoles: ["admin", "super_admin"],
    lastModified: "2024-01-15T16:45:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 45, percentage: 0.3 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "low"
  },
  {
    id: "qr-code-connect",
    name: "QR Code Connection",
    description: "QR code-based networking and connection system",
    category: "communication",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 1,
    sidebarIcon: "QrCode",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-14T13:20:00Z",
    modifiedBy: "admin.user",
    usage: { total: 15420, active: 5678, percentage: 36.8 },
    dependencies: ["user-authentication", "messaging-system"],
    impact: "medium",
    maintenance: "low",
    rolloutPercentage: 100,
    targetAudience: ["user", "startup", "investor", "mentor"]
  },
  // Sidebar Features - New section for controlling sidebar visibility
  {
    id: "sidebar-dashboard",
    name: "Dashboard",
    description: "Main dashboard accessible from sidebar",
    category: "sidebar",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 1,
    sidebarIcon: "Home",
    requiresAuth: true,
    userRoles: ["all"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 15420, percentage: 100 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "low",
    rolloutPercentage: 100,
    targetAudience: ["all"]
  },
  {
    id: "sidebar-feed",
    name: "Feed",
    description: "Social feed and content discovery",
    category: "sidebar",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 2,
    sidebarIcon: "MessageSquare",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 12345, percentage: 80.1 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "medium",
    rolloutPercentage: 100,
    targetAudience: ["user", "startup", "investor", "mentor"]
  },
  {
    id: "sidebar-programmes",
    name: "Programmes",
    description: "Startup programmes and accelerators",
    category: "sidebar",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 3,
    sidebarIcon: "GraduationCap",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 8900, percentage: 57.7 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "medium",
    rolloutPercentage: 100,
    targetAudience: ["user", "startup", "investor", "mentor"]
  },
  {
    id: "sidebar-resources",
    name: "Startup Resources",
    description: "Tools and resources for startups",
    category: "sidebar",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 4,
    sidebarIcon: "BookOpen",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 7200, percentage: 46.7 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "low",
    rolloutPercentage: 100,
    targetAudience: ["user", "startup", "investor", "mentor"]
  },
  {
    id: "sidebar-apps-deals",
    name: "Apps & Deals",
    description: "Startup apps and investment deals",
    category: "sidebar",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 5,
    sidebarIcon: "Building",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 5600, percentage: 36.3 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "medium",
    rolloutPercentage: 100,
    targetAudience: ["user", "startup", "investor", "mentor"]
  },
  {
    id: "sidebar-growthstarter",
    name: "GrowthStarter",
    description: "Crowdfunding platform for startups",
    category: "sidebar",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 6,
    sidebarIcon: "DollarSign",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 3400, percentage: 22.1 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "high",
    rolloutPercentage: 100,
    targetAudience: ["user", "startup", "investor", "mentor"]
  },
  {
    id: "sidebar-ai-generator",
    name: "AI Post Generator",
    description: "AI-powered content generation for feed posts",
    category: "sidebar",
    status: "beta",
    enabled: true,
    betaEnabled: true,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 7,
    sidebarIcon: "Bot",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 1200, percentage: 7.8 },
    dependencies: ["user-authentication", "sidebar-feed"],
    impact: "medium",
    maintenance: "medium",
    rolloutPercentage: 25,
    targetAudience: ["startup", "investor", "mentor"]
  },
  {
    id: "sidebar-mentor-connect",
    name: "Mentor Connect",
    description: "Connect with startup mentors and advisors",
    category: "sidebar",
    status: "beta",
    enabled: true,
    betaEnabled: true,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 8,
    sidebarIcon: "Users",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 800, percentage: 5.2 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "medium",
    rolloutPercentage: 15,
    targetAudience: ["startup", "mentor"]
  },
  {
    id: "sidebar-cofounder-matching",
    name: "Co-founder Matching",
    description: "Find and connect with potential co-founders",
    category: "sidebar",
    status: "beta",
    enabled: true,
    betaEnabled: true,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 9,
    sidebarIcon: "Handshake",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 600, percentage: 3.9 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "high",
    rolloutPercentage: 10,
    targetAudience: ["startup", "investor"]
  },
  {
    id: "sidebar-investor-portal",
    name: "Investor Portal",
    description: "Investment management and deal flow",
    category: "sidebar",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 10,
    sidebarIcon: "TrendingUp",
    requiresAuth: true,
    userRoles: ["investor", "admin"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 1234, percentage: 8.0 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "medium",
    rolloutPercentage: 100,
    targetAudience: ["investor", "admin"]
  },
  {
    id: "sidebar-startup-school",
    name: "Startup School",
    description: "Educational content and courses for entrepreneurs",
    category: "sidebar",
    status: "beta",
    enabled: true,
    betaEnabled: true,
    visible: true,
    sidebarVisible: true,
    sidebarPosition: 11,
    sidebarIcon: "GraduationCap",
    requiresAuth: true,
    userRoles: ["user", "startup", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 450, percentage: 2.9 },
    dependencies: ["user-authentication"],
    impact: "low",
    maintenance: "low",
    rolloutPercentage: 20,
    targetAudience: ["startup", "mentor"]
  },
  {
    id: "sidebar-events",
    name: "Events & Networking",
    description: "Startup events, meetups, and networking opportunities",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 12,
    sidebarIcon: "Calendar",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication"],
    impact: "low",
    maintenance: "low",
    rolloutPercentage: 0,
    targetAudience: ["user", "startup", "investor", "mentor"],
    launchDate: "2024-03-01"
  },
  {
    id: "sidebar-marketplace",
    name: "Startup Marketplace",
    description: "Buy, sell, and trade startup services and products",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 13,
    sidebarIcon: "ShoppingCart",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "medium",
    rolloutPercentage: 0,
    targetAudience: ["user", "startup", "investor", "mentor"],
    launchDate: "2024-04-01"
  },
  {
    id: "sidebar-ai-assistant",
    name: "AI Business Assistant",
    description: "AI-powered business planning and strategy assistant",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 14,
    sidebarIcon: "Brain",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication"],
    impact: "high",
    maintenance: "high",
    rolloutPercentage: 0,
    targetAudience: ["user", "startup", "investor", "mentor"],
    launchDate: "2024-05-01"
  },
  {
    id: "sidebar-legal-hub",
    name: "Legal Hub",
    description: "Legal documents, contracts, and compliance tools",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 15,
    sidebarIcon: "Scale",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "medium",
    rolloutPercentage: 0,
    targetAudience: ["user", "startup", "investor", "mentor"],
    launchDate: "2024-06-01"
  },
  {
    id: "sidebar-financial-tools",
    name: "Financial Tools",
    description: "Financial modeling, projections, and analysis tools",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 16,
    sidebarIcon: "Calculator",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "medium",
    rolloutPercentage: 0,
    targetAudience: ["user", "startup", "investor", "mentor"],
    launchDate: "2024-07-01"
  },
  {
    id: "sidebar-community-hub",
    name: "Community Hub",
    description: "Startup community discussions and forums",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 17,
    sidebarIcon: "MessageCircle",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication"],
    impact: "low",
    maintenance: "low",
    rolloutPercentage: 0,
    targetAudience: ["user", "startup", "investor", "mentor"],
    launchDate: "2024-08-01"
  },
  {
    id: "sidebar-job-board",
    name: "Job Board",
    description: "Startup job opportunities and talent recruitment",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 18,
    sidebarIcon: "Briefcase",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-20T10:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "medium",
    rolloutPercentage: 0,
    targetAudience: ["user", "startup", "investor", "mentor"],
    launchDate: "2024-09-01"
  },
  {
    id: "sidebar-newsletter",
    name: "Startup Newsletter",
    description: "Curated startup news and insights",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 19,
    sidebarIcon: "Mail",
    requiresAuth: false,
    userRoles: ["all"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: [],
    impact: "low",
    maintenance: "low",
    rolloutPercentage: 0,
    targetAudience: ["all"],
    launchDate: "2024-10-01"
  },
  {
    id: "sidebar-help-center",
    name: "Help Center",
    description: "Support documentation and help resources",
    category: "sidebar",
    status: "disabled",
    enabled: false,
    betaEnabled: false,
    visible: false,
    sidebarVisible: false,
    sidebarPosition: 20,
    sidebarIcon: "HelpCircle",
    requiresAuth: false,
    userRoles: ["all"],
    lastModified: "2024-01-20T10:00:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: [],
    impact: "low",
    maintenance: "low",
    rolloutPercentage: 0,
    targetAudience: ["all"],
    launchDate: "2024-11-01"
  },
  {
    id: "qr-code-connect-social",
    name: "QR Code Connection",
    description: "QR code-based user connection system",
    category: "social",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: true,
    sidebarVisible: false,
    sidebarPosition: 0,
    sidebarIcon: "QrCode",
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-14T13:20:00Z",
    modifiedBy: "admin.user",
    usage: { total: 15420, active: 5678, percentage: 36.8 },
    dependencies: ["user-authentication"],
    impact: "medium",
    maintenance: "low",
    rolloutPercentage: 100,
    targetAudience: ["user", "startup", "investor", "mentor"]
  },
  {
    id: "sports-club",
    name: "Sports Club",
    description: "Sports events and team management system",
    category: "social",
    status: "beta",
    enabled: true,
    betaEnabled: true,
    visible: true,
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-13T10:15:00Z",
    modifiedBy: "admin.user",
    usage: { total: 15420, active: 1890, percentage: 12.3 },
    dependencies: ["user-authentication"],
    impact: "low",
    maintenance: "medium"
  },
  {
    id: "ai-recommendations",
    name: "AI Recommendations",
    description: "AI-powered content and connection recommendations",
    category: "analytics",
    status: "beta",
    enabled: false,
    betaEnabled: true,
    visible: false,
    requiresAuth: true,
    userRoles: ["user", "startup", "investor", "mentor"],
    lastModified: "2024-01-12T08:30:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 0, percentage: 0 },
    dependencies: ["user-authentication", "analytics-dashboard"],
    impact: "medium",
    maintenance: "high"
  },
  {
    id: "advanced-security",
    name: "Advanced Security",
    description: "Enhanced security features and monitoring",
    category: "security",
    status: "enabled",
    enabled: true,
    betaEnabled: false,
    visible: false,
    requiresAuth: false,
    userRoles: ["all"],
    lastModified: "2024-01-11T12:45:00Z",
    modifiedBy: "super.admin",
    usage: { total: 15420, active: 15420, percentage: 100 },
    dependencies: ["user-authentication"],
    impact: "critical",
    maintenance: "low"
  }
]

const categoryIcons = {
  core: Settings,
  communication: MessageSquare,
  business: Building,
  analytics: BarChart3,
  security: Shield,
  social: Users,
  sidebar: ToggleLeft
}

const categoryColors = {
  core: "bg-blue-100 text-blue-800",
  communication: "bg-green-100 text-green-800",
  business: "bg-purple-100 text-purple-800",
  analytics: "bg-orange-100 text-orange-800",
  security: "bg-red-100 text-red-800",
  social: "bg-indigo-100 text-indigo-800",
  sidebar: "bg-pink-100 text-pink-800"
}

const statusColors = {
  enabled: "bg-green-100 text-green-800",
  disabled: "bg-gray-100 text-gray-800",
  beta: "bg-yellow-100 text-yellow-800",
  deprecated: "bg-red-100 text-red-800"
}

const impactColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800"
}

export function FeatureToggles() {
  // const { toast } = useToast()
  const [features, setFeatures] = useState<Feature[]>(mockFeatures)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [showFeatureDialog, setShowFeatureDialog] = useState(false)
  const [showAddFeatureDialog, setShowAddFeatureDialog] = useState(false)
  
  // Simple toast function with enhanced feedback
  const showToast = (title: string, description: string) => {
    // Try to use a more user-friendly notification
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(title, { body: description })
      } else {
        alert(`${title}: ${description}`)
      }
    } else {
      alert(`${title}: ${description}`)
    }
    
    // Also log to console for debugging
    console.log(`Feature Toggle - ${title}:`, description)
  }

  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || feature.category === categoryFilter
    const matchesStatus = statusFilter === "all" || feature.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleToggleFeature = (featureId: string, enabled: boolean) => {
    setFeatures(features.map(feature => 
      feature.id === featureId ? { ...feature, enabled } : feature
    ))
    showToast(
      "Feature Updated",
      `Feature ${enabled ? "enabled" : "disabled"} successfully`
    )
  }

  const handleToggleBeta = (featureId: string, betaEnabled: boolean) => {
    setFeatures(features.map(feature => 
      feature.id === featureId ? { ...feature, betaEnabled } : feature
    ))
    showToast(
      "Beta Status Updated",
      `Beta mode ${betaEnabled ? "enabled" : "disabled"} for feature`
    )
  }

  const handleToggleVisibility = (featureId: string, visible: boolean) => {
    setFeatures(features.map(feature => 
      feature.id === featureId ? { ...feature, visible } : feature
    ))
    showToast(
      "Visibility Updated",
      `Feature visibility ${visible ? "enabled" : "disabled"}`
    )
  }

  const handleDeleteFeature = (featureId: string) => {
    setFeatures(features.filter(feature => feature.id !== featureId))
    showToast(
      "Feature Deleted",
      "Feature has been permanently deleted"
    )
  }

  const featureStats = {
    total: features.length,
    enabled: features.filter(f => f.enabled).length,
    disabled: features.filter(f => !f.enabled).length,
    beta: features.filter(f => f.betaEnabled).length,
    visible: features.filter(f => f.visible).length,
    critical: features.filter(f => f.impact === "critical").length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feature Toggles</h2>
          <p className="text-muted-foreground">
            Control platform features, visibility, and functionality
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => showToast("Test", "Feature Toggles are working correctly!")}
            title="Test feature toggles functionality"
          >
            🧪 Test
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button onClick={() => setShowAddFeatureDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featureStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enabled</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{featureStats.enabled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disabled</CardTitle>
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{featureStats.disabled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beta</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{featureStats.beta}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visible</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{featureStats.visible}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{featureStats.critical}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="core">Core</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="sidebar">Sidebar Features</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="enabled">Enabled</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
                <SelectItem value="beta">Beta</SelectItem>
                <SelectItem value="deprecated">Deprecated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sidebar Features Section */}
      {categoryFilter === "all" || categoryFilter === "sidebar" ? (
        <Card className="border-2 border-pink-200 bg-pink-50/50">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ToggleLeft className="h-6 w-6 text-pink-600" />
              <CardTitle className="text-xl text-pink-800">Sidebar Feature Control</CardTitle>
            </div>
            <CardDescription className="text-pink-700">
              Control which features appear in the platform sidebar. Launch features gradually by toggling their visibility.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features
                .filter(feature => feature.category === "sidebar")
                .sort((a, b) => (a.sidebarPosition || 0) - (b.sidebarPosition || 0))
                .map((feature) => (
                  <Card key={feature.id} className="relative border-pink-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${
                            feature.sidebarVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {feature.sidebarIcon === "Home" && <Home className="w-4 h-4" />}
                            {feature.sidebarIcon === "MessageSquare" && <MessageSquare className="w-4 h-4" />}
                            {feature.sidebarIcon === "GraduationCap" && <GraduationCap className="w-4 h-4" />}
                            {feature.sidebarIcon === "BookOpen" && <BookOpen className="w-4 h-4" />}
                            {feature.sidebarIcon === "Building" && <Building className="w-4 h-4" />}
                            {feature.sidebarIcon === "DollarSign" && <DollarSign className="w-4 h-4" />}
                            {feature.sidebarIcon === "Bot" && <Bot className="w-4 h-4" />}
                            {feature.sidebarIcon === "Users" && <Users className="w-4 h-4" />}
                            {feature.sidebarIcon === "Handshake" && <Handshake className="w-4 h-4" />}
                            {feature.sidebarIcon === "TrendingUp" && <TrendingUp className="w-4 h-4" />}
                            {feature.sidebarIcon === "Calendar" && <Calendar className="w-4 h-4" />}
                            {feature.sidebarIcon === "ShoppingCart" && <ShoppingCart className="w-4 h-4" />}
                            {feature.sidebarIcon === "Brain" && <Brain className="w-4 h-4" />}
                            {feature.sidebarIcon === "Scale" && <Scale className="w-4 h-4" />}
                            {feature.sidebarIcon === "Calculator" && <Calculator className="w-4 h-4" />}
                            {feature.sidebarIcon === "MessageCircle" && <MessageCircle className="w-4 h-4" />}
                            {feature.sidebarIcon === "Briefcase" && <Briefcase className="w-4 h-4" />}
                            {feature.sidebarIcon === "Mail" && <Mail className="w-4 h-4" />}
                            {feature.sidebarIcon === "HelpCircle" && <HelpCircle className="w-4 h-4" />}
                          </div>
                          <div>
                            <CardTitle className="text-sm">{feature.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge className={statusColors[feature.status]}>
                                {feature.status}
                              </Badge>
                              <Badge className={impactColors[feature.impact]}>
                                {feature.impact}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedFeature(feature)
                            setShowFeatureDialog(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardDescription className="text-xs mt-2">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Sidebar Visibility Toggle */}
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`sidebar-visible-${feature.id}`} className="text-sm font-medium">
                          Show in Sidebar
                        </Label>
                        <Switch
                          id={`sidebar-visible-${feature.id}`}
                          checked={feature.sidebarVisible}
                          onCheckedChange={(checked) => {
                            setFeatures(features.map(f => 
                              f.id === feature.id ? { ...f, sidebarVisible: checked } : f
                            ))
                            showToast(
                              "Sidebar Visibility Updated",
                              `${feature.name} ${checked ? 'will now appear' : 'will be hidden'} in the sidebar`
                            )
                          }}
                        />
                      </div>

                      {/* Rollout Percentage */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span>Rollout: {feature.rolloutPercentage}%</span>
                          <span className="text-muted-foreground">
                            {feature.rolloutPercentage === 100 ? 'Full Launch' : 
                             feature.rolloutPercentage === 0 ? 'Hidden' : 'Partial Launch'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              feature.rolloutPercentage === 100 ? 'bg-green-600' :
                              feature.rolloutPercentage === 0 ? 'bg-gray-400' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${feature.rolloutPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Launch Date */}
                      {feature.launchDate && (
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Planned Launch:</span> {new Date(feature.launchDate).toLocaleDateString()}
                        </div>
                      )}

                      {/* Target Audience */}
                      <div className="text-xs">
                        <span className="font-medium">Target:</span> {feature.targetAudience?.join(", ") || "All users"}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Features Grid - Fixed duplicate keys */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFeatures.map((feature) => {
          const CategoryIcon = categoryIcons[feature.category]
          return (
            <Card key={feature.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge className={categoryColors[feature.category]}>
                          {feature.category}
                        </Badge>
                        <Badge className={statusColors[feature.status]}>
                          {feature.status}
                        </Badge>
                        <Badge className={impactColors[feature.impact]}>
                          {feature.impact}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedFeature(feature)
                      setShowFeatureDialog(true)
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Usage Stats */}
                <div className="flex items-center justify-between text-sm">
                  <span>Usage</span>
                  <span className="font-medium">{feature.usage.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${feature.usage.percentage}%` }}
                  />
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`enabled-${feature.id}`} className="text-sm">
                      Enabled
                    </Label>
                    <Switch
                      id={`enabled-${feature.id}`}
                      checked={feature.enabled}
                      onCheckedChange={(checked) => handleToggleFeature(feature.id, checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`beta-${feature.id}`} className="text-sm">
                      Beta Mode
                    </Label>
                    <Switch
                      id={`beta-${feature.id}`}
                      checked={feature.betaEnabled}
                      onCheckedChange={(checked) => handleToggleBeta(feature.id, checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`visible-${feature.id}`} className="text-sm">
                      Visible
                    </Label>
                    <Switch
                      id={`visible-${feature.id}`}
                      checked={feature.visible}
                      onCheckedChange={(checked) => handleToggleVisibility(feature.id, checked)}
                    />
                  </div>
                </div>

                {/* Dependencies */}
                {feature.dependencies.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Dependencies:</span> {feature.dependencies.join(", ")}
                  </div>
                )}

                {/* Last Modified */}
                <div className="text-xs text-muted-foreground">
                  Modified: {new Date(feature.lastModified).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Feature Details Dialog */}
      <Dialog open={showFeatureDialog} onOpenChange={setShowFeatureDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Feature Configuration</DialogTitle>
            <DialogDescription>
              Detailed configuration for {selectedFeature?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedFeature && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Feature Name</Label>
                  <Input value={selectedFeature.name} readOnly />
                </div>
                <div>
                  <Label>Category</Label>
                  <Input value={selectedFeature.category} readOnly />
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea value={selectedFeature.description} readOnly rows={3} />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={selectedFeature.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="beta">Beta</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Impact Level</Label>
                  <Select value={selectedFeature.impact}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enabled</Label>
                  <Switch
                    checked={selectedFeature.enabled}
                    onCheckedChange={(checked) => handleToggleFeature(selectedFeature.id, checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Beta Mode</Label>
                  <Switch
                    checked={selectedFeature.betaEnabled}
                    onCheckedChange={(checked) => handleToggleBeta(selectedFeature.id, checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Visible to Users</Label>
                  <Switch
                    checked={selectedFeature.visible}
                    onCheckedChange={(checked) => handleToggleVisibility(selectedFeature.id, checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Requires Authentication</Label>
                  <Switch checked={selectedFeature.requiresAuth} />
                </div>
              </div>

              <div>
                <Label>User Roles</Label>
                <div className="mt-2 space-y-2">
                  {selectedFeature.userRoles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Dependencies</Label>
                <div className="mt-2 space-y-2">
                  {selectedFeature.dependencies.length > 0 ? (
                    selectedFeature.dependencies.map((dep) => (
                      <Badge key={dep} variant="secondary">
                        {dep}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No dependencies</span>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeatureDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              showToast(
                "Feature Updated",
                "Feature configuration has been saved"
              )
              setShowFeatureDialog(false)
            }}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Feature Dialog */}
      <Dialog open={showAddFeatureDialog} onOpenChange={setShowAddFeatureDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Feature</DialogTitle>
            <DialogDescription>
              Create a new feature toggle with configuration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="featureName">Feature Name</Label>
              <Input id="featureName" placeholder="Enter feature name" />
            </div>
            <div>
              <Label htmlFor="featureDescription">Description</Label>
              <Textarea id="featureDescription" placeholder="Enter feature description" rows={3} />
            </div>
            <div>
              <Label htmlFor="featureCategory">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="featureImpact">Impact Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select impact level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFeatureDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              showToast(
                "Feature Created",
                "New feature has been created successfully"
              )
              setShowAddFeatureDialog(false)
            }}>
              Create Feature
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 