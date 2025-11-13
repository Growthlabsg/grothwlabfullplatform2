"use client"

import type React from "react"
import { useEffect, useState, useMemo, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  BookOpen,
  Briefcase,
  Building,
  Building2,
  Calendar,
  Home,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Mail,
  Shield,
  Zap,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  Phone,
  VideoIcon,
  Search,
  Star,
  StarOff,
  History,
  UserCog,
  UserPlus2,
  Info,
  Newspaper,
  Layers,
  HelpCircle,
  FileText,
  User,
  PenTool,
  Compass,
  UserPlus,
  Award,
  GraduationCap,
  Lightbulb,
  LandPlot,
  DollarSign,
  Link2,
  School,
  Send,
  TrendingUp,
  Code,
  ShoppingBag,
  FileBarChart,
  Rocket,
  Bell,
  QrCode,
  Trophy,
  AppWindow,
  Globe,
  BarChart3,
  Activity,
  LogIn,
  CreditCard,
} from "lucide-react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"
import { useNotifications } from "@/contexts/notification-context"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
// Legacy chat button hidden (kept source, not rendered)
// import { CommunicationHubButton } from "@/components/communication/communication-hub-button"
import { CreateGroupDialog } from "@/components/communication/create-group-dialog"
import { CommunicationSettingsDialog } from "@/components/communication/communication-settings-dialog"
import type { UserRole, Permission } from "@/types/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SimpleThemeToggle } from "@/components/theme-toggle"

// Define navigation item type
interface NavItem {
  href: string
  icon: React.ReactNode
  label: string
  roles?: UserRole[]
  permissions?: string[]
  badge?: {
    text: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
  shortcut?: string
  isAction?: boolean
  notifications?: number
  subItems?: {
    href: string
    label: string
    icon?: React.ReactNode
    notifications?: number
  }[]
}

// Define communication item type
interface CommunicationItem {
  id: string
  name: string
  avatar?: string
  status?: "online" | "offline" | "away" | "busy"
  lastMessage?: string
  time?: string
  unread?: number
  isFavorite?: boolean
  isGroup?: boolean
  participants?: { id: string; name: string; avatar?: string }[]
}

// Define call history item type
interface CallHistoryItem {
  id: string
  contactName: string
  contactAvatar?: string
  type: "incoming" | "outgoing" | "missed" | "video"
  timestamp: string
  duration?: string
  isFavorite?: boolean
}

interface GrowthLabSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  isMobile: boolean
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
}

// Create a safe version of QR code functions
function useSafeQRCode() {
  const [qrCode, setQrCode] = useState<any>(null)

  useEffect(() => {
    const initializeQRCode = async () => {
    // Default empty functions
    const defaultQRCode = {
      openQRScanner: () => {},
      openQRGenerator: () => {},
      closeQRScanner: () => {},
      closeQRGenerator: () => {},
      isQRScannerOpen: false,
      isQRGeneratorOpen: false,
      handleQRCodeScan: () => {},
      generateQRCodeData: () => "",
      verifyQRCodeData: () => ({ isValid: false }),
      trackQRCodeScan: async () => {},
      getQRCodeAnalytics: async () => [],
      qrCodeScans: [],
      getQRCodeStatistics: async () => ({
        totalScans: 0,
        uniqueUsers: 0,
        scansByDay: [],
        scansByHour: [],
        scansByBrowser: [],
        scansByOS: [],
        scansByCountry: [],
        scansByCity: [],
        recentScans: [],
      }),
      requestLocationPermission: async () => false,
      locationPermissionGranted: false,
    }

    // Try to import the QR code context
    let useQRCode
    try {
      // Dynamic import to avoid the error if the module doesn't exist
      const qrCodeContext = await import("@/contexts/qr-code-context")
      useQRCode = qrCodeContext.useQRCode
    } catch (error) {
      console.warn("QR code module not found, QR code functionality will be disabled")
      setQrCode(defaultQRCode)
      return
    }

    // Check if the hook function exists before calling it
    if (typeof useQRCode === 'function') {
      try {
        // Note: This is not ideal but necessary for conditional hook usage
        // In a real app, you'd want to ensure the provider is always available
        const qrCodeResult = useQRCode()
        setQrCode(qrCodeResult)
      } catch (error) {
        console.warn("QRCodeProvider not found, QR code functionality will be limited")
        setQrCode(defaultQRCode)
      }
    } else {
      setQrCode(defaultQRCode)
    }
    }
    
    initializeQRCode()
  }, [])

  return qrCode
}

export function GrowthLabSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}: GrowthLabSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, isLoading, hasPermission } = useAuth()
  const { toast } = useToast()

  // Use the safe QR code hook that won't throw errors
  const qrCode = useSafeQRCode()
  const { openQRGenerator } = qrCode || {}

  const [isMounted, setIsMounted] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    main: true,
    communication: false,
    admin: false,
    settings: false,
  })

  const [expandedSubItems, setExpandedSubItems] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [filterFavorites, setFilterFavorites] = useState(false)
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false)
  const { unreadCount } = useNotifications()

  // Mock recent communication data
  const recentChats: CommunicationItem[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      status: "online",
      lastMessage: "Looking forward to our meeting",
      time: "2m",
      unread: 2,
      isFavorite: true,
    },
    {
      id: "2",
      name: "Alex Wong",
      avatar: "/abstract-geometric-aw.png",
      status: "busy",
      lastMessage: "Can we discuss the proposal?",
      time: "1h",
      isFavorite: false,
    },
    {
      id: "3",
      name: "Mei Lin",
      avatar: "/machine-learning-concept.png",
      status: "away",
      lastMessage: "I've sent the documents",
      time: "3h",
      isFavorite: true,
    },
    {
      id: "4",
      name: "Startup Founders",
      avatar: "/collaborative-innovation.png",
      lastMessage: "John: When is the next meetup?",
      time: "5h",
      unread: 5,
      isGroup: true,
      participants: [
        { id: "u1", name: "John Lee", avatar: "/abstract-geometric-aw.png" },
        { id: "u2", name: "Sarah Chen", avatar: "/abstract-geometric-shapes.png" },
        { id: "u3", name: "Mei Lin", avatar: "/machine-learning-concept.png" },
      ],
      isFavorite: true,
    },
    {
      id: "5",
      name: "Investor Network",
      avatar: "/interconnected-fintech.png",
      lastMessage: "Alex: Let's schedule the pitch session",
      time: "1d",
      isGroup: true,
      participants: [
        { id: "u4", name: "Alex Wong", avatar: "/abstract-geometric-aw.png" },
        { id: "u5", name: "David Kumar", avatar: "/abstract-geometric-dk.png" },
        { id: "u6", name: "Lisa Tan", avatar: "/abstract-geometric-ll.png" },
      ],
      isFavorite: false,
    },
  ]

  const recentCalls: CommunicationItem[] = [
    {
      id: "1",
      name: "Investor Meeting",
      time: "Today, 2:00 PM",
      isFavorite: true,
    },
    {
      id: "2",
      name: "Mentor Session",
      time: "Tomorrow, 10:00 AM",
      isFavorite: false,
    },
  ]

  const upcomingMeetings: CommunicationItem[] = [
    {
      id: "1",
      name: "Team Sync",
      time: "Today, 4:30 PM",
      isFavorite: false,
    },
    {
      id: "2",
      name: "Pitch Practice",
      time: "Tomorrow, 11:00 AM",
      isFavorite: true,
    },
  ]

  const callHistory: CallHistoryItem[] = [
    {
      id: "call1",
      contactName: "Sarah Chen",
      contactAvatar: "/abstract-geometric-shapes.png",
      type: "incoming",
      timestamp: "Today, 10:30 AM",
      duration: "15m 23s",
      isFavorite: true,
    },
    {
      id: "call2",
      contactName: "Alex Wong",
      contactAvatar: "/abstract-geometric-aw.png",
      type: "outgoing",
      timestamp: "Yesterday, 3:45 PM",
      duration: "5m 12s",
      isFavorite: false,
    },
    {
      id: "call3",
      contactName: "Mei Lin",
      contactAvatar: "/machine-learning-concept.png",
      type: "missed",
      timestamp: "Yesterday, 1:15 PM",
      isFavorite: false,
    },
    {
      id: "call4",
      contactName: "Startup Founders",
      contactAvatar: "/collaborative-innovation.png",
      type: "video",
      timestamp: "Mar 15, 2:00 PM",
      duration: "45m 07s",
      isFavorite: true,
    },
  ]

  // Filter items based on search query and favorites filter
  const filteredChats = useMemo(() => {
    return recentChats.filter((chat) => {
      const matchesSearch =
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (chat.lastMessage && chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesFavorite = filterFavorites ? chat.isFavorite : true
      return matchesSearch && matchesFavorite
    })
  }, [recentChats, searchQuery, filterFavorites])

  const filteredCalls = useMemo(() => {
    return recentCalls.filter((call) => {
      const matchesSearch = call.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFavorite = filterFavorites ? call.isFavorite : true
      return matchesSearch && matchesFavorite
    })
  }, [recentCalls, searchQuery, filterFavorites])

  const filteredMeetings = useMemo(() => {
    return upcomingMeetings.filter((meeting) => {
      const matchesSearch = meeting.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFavorite = filterFavorites ? meeting.isFavorite : true
      return matchesSearch && matchesFavorite
    })
  }, [upcomingMeetings, searchQuery, filterFavorites])

  const filteredCallHistory = useMemo(() => {
    return callHistory.filter((call) => {
      const matchesSearch = call.contactName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFavorite = filterFavorites ? call.isFavorite : true
      return matchesSearch && matchesFavorite
    })
  }, [callHistory, searchQuery, filterFavorites])

  // Get favorite items
  const favoriteChats = useMemo(() => recentChats.filter((chat) => chat.isFavorite), [recentChats])
  const favoriteCalls = useMemo(() => callHistory.filter((call) => call.isFavorite), [callHistory])
  const favoriteMeetings = useMemo(() => upcomingMeetings.filter((meeting) => meeting.isFavorite), [upcomingMeetings])

  // Set mounted state to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Set active section based on current path
  useEffect(() => {
    if (pathname) {
      // Determine which section the current path belongs to
      const section = determineActiveSection(pathname)
      setActiveSection(section)

      // Auto-expand the relevant section
      if (section) {
        setExpandedGroups((prev) => ({
          ...prev,
          [section]: true,
        }))
      }

      // Auto-expand the relevant subItems if the path matches
      mainNavItems.forEach((item) => {
        if (item.subItems) {
          const matchingSubItem = item.subItems.find((subItem) => pathname === subItem.href)
          if (matchingSubItem) {
            setExpandedSubItems((prev) => ({
              ...prev,
              [item.href]: true,
            }))
          }
        }
      })
    }
  }, [pathname])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, isSidebarOpen, setIsSidebarOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts when sidebar is in focus
      if (!sidebarRef.current?.contains(document.activeElement)) return

      // Toggle sidebar collapse with Alt+S
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        toggleSidebar()
      }

      // Focus search with Ctrl+F
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault()
        const searchInput = sidebarRef.current?.querySelector('input[type="search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
        }
      }

      // Navigate through menu items with arrow keys
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()

        const menuItems = Array.from(
          sidebarRef.current?.querySelectorAll('[role="menuitem"] a, button[role="menuitem"]') || [],
        ) as HTMLElement[]

        if (menuItems.length === 0) return

        const currentIndex = menuItems.findIndex((item) => item === document.activeElement)
        let nextIndex = currentIndex

        if (e.key === "ArrowDown") {
          nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0
        } else {
          nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1
        }

        menuItems[nextIndex]?.focus()
      }

      // Handle keyboard shortcuts for navigation items
      if (e.altKey) {
        const allItems = [...mainNavItems, ...communicationNavItems, ...adminNavItems, ...settingsNavItems]
        const matchingItem = allItems.find(
          (item) => item.shortcut && item.shortcut.toLowerCase() === e.key.toLowerCase(),
        )

        if (matchingItem) {
          e.preventDefault()
          window.location.href = matchingItem.href
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Determine active section based on pathname
  const determineActiveSection = (path: string): string | null => {
    if (path.startsWith("/admin")) return "admin"
    if (path.startsWith("/settings")) return "settings"
    if (["/chat", "/calls", "/meetings"].some((item) => path.startsWith(item))) {
      return "communication"
    }
    return "main"
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleMobileSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleGroupExpansion = (group: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
      // Redirect to home page after logout to ensure sidebar updates correctly
      router.push("/")
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleFavorite = (id: string, type: "chat" | "call" | "meeting" | "history") => {
    // Implementation for toggling favorites
    console.log(`Toggling favorite for ${type} with id: ${id}`)
  }

  // Define main navigation items with subcategory icons and notification counts
  const mainNavItems: NavItem[] = useMemo(
    () => [
      // === CORE NAVIGATION (Most Important) ===
      {
        href: "/",
        icon: <Home className="h-4 w-4" />,
        label: "Home",
        shortcut: "h",
        // Public - visible to everyone
      },
      {
        href: "/dashboard",
        icon: <BarChart3 className="h-4 w-4" />,
        label: "Dashboard",
        shortcut: "d",
        badge: {
          text: "Hub",
          variant: "secondary"
        },
        permissions: ["authenticated"]
      },
      {
        href: "/feed",
        icon: <Newspaper className="h-4 w-4" />,
        label: "Feed",
        notifications: 3,
        // Public - visible to everyone
      },

      // === NETWORKING & CONNECTIONS ===
      {
        href: "/network",
        icon: <Users className="h-4 w-4" />,
        label: "Network",
        shortcut: "n",
        notifications: 2,
        permissions: ["authenticated"],
        subItems: [
          {
            href: "/network/find-cofounder",
            label: "Find a Co-founder",
            icon: <UserPlus className="h-4 w-4" />,
          },
          {
            href: "/network/startups",
            label: "Startup Directory",
            icon: <Building className="h-4 w-4" />,
          },
          {
            href: "/network/investors",
            label: "Investors",
            icon: <DollarSign className="h-4 w-4" />,
          },
          {
            href: "/network/mentors",
            label: "Mentors",
            icon: <Award className="h-4 w-4" />,
          },
          {
            href: "/network/incubators-accelerators",
            label: "Incubators & Accelerators",
            icon: <Compass className="h-4 w-4" />,
          },
          {
            href: "/network/industry-experts",
            label: "Industry Experts",
            icon: <Lightbulb className="h-4 w-4" />,
          },
          {
            href: "/network/teachers",
            label: "Teachers",
            icon: <GraduationCap className="h-4 w-4" />,
          },
          {
            href: "/network/government-agencies",
            label: "Government Agencies",
            icon: <LandPlot className="h-4 w-4" />,
          },
        ],
      },
      {
        href: "/jobs",
        icon: <Briefcase className="h-4 w-4" />,
        label: "Jobs",
        shortcut: "j",
        notifications: 4,
        permissions: ["authenticated"],
        subItems: [
          {
            href: "/jobs/find-startup-jobs",
            label: "Find Startup Jobs",
            icon: <Briefcase className="h-4 w-4" />,
            notifications: 2,
          },
          {
            href: "/jobs/hire-talents",
            label: "Hire Talents",
            icon: <Users className="h-4 w-4" />,
          },
          {
            href: "/jobs/find-cofounder",
            label: "Find a Cofounder",
            icon: <UserPlus className="h-4 w-4" />,
          },
        ],
      },

      // === BUSINESS & STARTUP TOOLS ===
      {
        href: "/business",
        icon: <Building2 className="h-4 w-4" />,
        label: "My Businesses",
        shortcut: "b",
        badge: {
          text: "New",
          variant: "secondary"
        },
        permissions: ["authenticated"]
      },
      {
        href: "/startup",
        icon: <Rocket className="h-4 w-4" />,
        label: "Startup Resources",
        shortcut: "s",
        permissions: ["authenticated"]
      },
      {
        href: "/growthstarter",
        icon: <Zap className="h-4 w-4" />,
        label: "GrowthStarter",
        shortcut: "g",
        badge: {
          text: "New",
          variant: "secondary"
        },
        permissions: ["authenticated"]
      },

      // === EVENTS & ACTIVITIES ===
      {
        href: "/events",
        icon: <Calendar className="h-4 w-4" />,
        label: "Events",
        shortcut: "e",
        notifications: 1,
        permissions: ["authenticated"]
      },
      {
        href: "/sports-club",
        icon: <Trophy className="h-4 w-4" />,
        label: "Sports Club",
        shortcut: "o",
        notifications: 3,
        permissions: ["authenticated"]
      },

      // === LEARNING & RESOURCES ===
      {
        href: "/programmes",
        icon: <Layers className="h-4 w-4" />,
        label: "Programmes",
        shortcut: "p",
        permissions: ["authenticated"],
        subItems: [
          {
            href: "/programmes/featured",
            label: "Featured programmes",
            icon: <Star className="h-4 w-4" />,
          },
          {
            href: "/programmes/funding",
            label: "Funding Programmes",
            icon: <DollarSign className="h-4 w-4" />,
          },
          {
            href: "/programmes/partnership",
            label: "Partnership Programmes",
            icon: <Link2 className="h-4 w-4" />,
          },
        ],
      },
      {
        href: "/resources",
        icon: <BookOpen className="h-4 w-4" />,
        label: "Resources",
        shortcut: "r",
        permissions: ["authenticated"],
        subItems: [
          {
            href: "/resources/startup-school",
            label: "Startup School",
            icon: <School className="h-4 w-4" />,
          },
          {
            href: "/resources/newsletter",
            label: "Newsletter",
            icon: <Send className="h-4 w-4" />,
          },
          {
            href: "/resources/for-investors",
            label: "For investors",
            icon: <TrendingUp className="h-4 w-4" />,
          },
          {
            href: "/resources/hacker-news",
            label: "Hacker news",
            icon: <Code className="h-4 w-4" />,
          },
          {
            href: "/resources/business-support",
            label: "Business Support Services",
            icon: <ShoppingBag className="h-4 w-4" />,
          },
          {
            href: "/resources/innovation",
            label: "Innovation resource",
            icon: <Lightbulb className="h-4 w-4" />,
          },
          {
            href: "/resources/reports",
            label: "Reports",
            icon: <FileBarChart className="h-4 w-4" />,
          },
        ],
      },

      // === PREMIUM & SUBSCRIPTION ===
      {
        href: "/subscription/dashboard",
        icon: <Star className="h-4 w-4" />,
        label: "Subscription",
        shortcut: "u",
        badge: {
          text: "Pro",
          variant: "secondary"
        },
        permissions: ["authenticated"]
      },

      // === MARKETPLACE & DEALS ===
      {
        href: "/apps-deals",
        icon: <AppWindow className="h-4 w-4" />,
        label: "Apps & Deals",
        shortcut: "a",
        notifications: 5,
        badge: {
          text: "New",
          variant: "secondary"
        },
        permissions: ["authenticated"]
      },

      // === INFORMATION & NEWS ===
      {
        href: "/news",
        icon: <Newspaper className="h-4 w-4" />,
        label: "News",
        shortcut: "w",
        // Public - visible to everyone
      },
      {
        href: "/about",
        icon: <Info className="h-4 w-4" />,
        label: "About",
        shortcut: "i",
        // Public - visible to everyone
        subItems: [
          {
            href: "/about/what-happens",
            label: "What happens at GrowthLab",
            icon: <Lightbulb className="h-4 w-4" />,
          },
          {
            href: "/about/apply",
            label: "Apply",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            href: "/about/interview-guide",
            label: "GrowthLab interview guide",
            icon: <FileText className="h-4 w-4" />,
          },
          {
            href: "/about/faq",
            label: "FAQ",
            icon: <HelpCircle className="h-4 w-4" />,
          },
          {
            href: "/about/people",
            label: "People",
            icon: <User className="h-4 w-4" />,
          },
          {
            href: "/about/blog",
            label: "GrowthLab Blog",
            icon: <PenTool className="h-4 w-4" />,
          },
        ],
      },
    ],
    [],
  )

  // Define communication navigation items with notification counts
  const communicationNavItems: NavItem[] = useMemo(
    () => [
      // === PRIMARY COMMUNICATION ===
      {
        href: "/chat",
        icon: <MessageCircle className="h-4 w-4" />,
        label: "Chat",
        shortcut: "c",
        notifications: 3,
        permissions: ["authenticated"]
      },
      {
        href: "/calls",
        icon: <Phone className="h-4 w-4" />,
        label: "Calls",
        shortcut: "v",
        permissions: ["authenticated"]
      },
      {
        href: "/meetings",
        icon: <VideoIcon className="h-4 w-4" />,
        label: "Meetings",
        shortcut: "m",
        notifications: 1,
        permissions: ["authenticated"]
      },
      
      // === COMMUNICATION MANAGEMENT ===
      {
        href: "/calls/history",
        icon: <History className="h-4 w-4" />,
        label: "Call History",
        shortcut: "h",
        permissions: ["authenticated"]
      },
      {
        href: "#create-group",
        icon: <UserPlus2 className="h-4 w-4" />,
        label: "Create Group",
        isAction: true,
        permissions: ["authenticated"]
      },
      {
        href: "#communication-settings",
        icon: <UserCog className="h-4 w-4" />,
        label: "Communication Settings",
        isAction: true,
        permissions: ["authenticated"]
      },
    ],
    [],
  )

  // Define settings navigation items
  const settingsNavItems: NavItem[] = useMemo(
    () => [
      // === ACCOUNT & PROFILE ===
      {
        href: "/settings/profile",
        icon: <Settings className="h-4 w-4" />,
        label: "Profile Settings",
        shortcut: "s",
        permissions: ["authenticated"]
      },
      {
        href: "/settings/security",
        icon: <Shield className="h-4 w-4" />,
        label: "Security",
        permissions: ["authenticated"]
      },
      
      // === COMMUNICATION & NOTIFICATIONS ===
      {
        href: "/settings/email",
        icon: <Mail className="h-4 w-4" />,
        label: "Email Preferences",
        permissions: ["authenticated"]
      },
      
      // === BILLING & SUBSCRIPTION ===
      {
        href: "/subscription/plans",
        icon: <CreditCard className="h-4 w-4" />,
        label: "Subscription & Billing",
        permissions: ["authenticated"]
      },
    ],
    [],
  )

  // Admin navigation items moved to super admin panel
  const adminNavItems: NavItem[] = useMemo(
    () => [
      {
        href: "/super-admin",
        icon: <Shield className="h-4 w-4" />,
        label: "Super Admin Panel",
        roles: ["admin", "super.admin"],
        notifications: 2,
      },
    ],
    [],
  )

  // Filter navigation items based on user role and permissions
  const filterNavItems = (items: NavItem[]): NavItem[] => {
    if (!user) {
      return items.filter((item) => !item.roles && !item.permissions)
    }

    return items.filter((item) => {
      // If no roles or permissions specified, show to everyone
      if (!item.roles && !item.permissions) return true

      // Check roles
      if (item.roles) {
        const hasRole = item.roles.includes(user.role as UserRole)
        if (hasRole) return true
      }

      // Check permissions
      if (item.permissions) {
        const hasRequiredPermission = item.permissions.some((permission) => hasPermission(permission as Permission))
        if (hasRequiredPermission) return true
      }

      return false
    })
  }

  // Filter navigation items - calculate directly instead of using useMemo to ensure immediate updates
  const filteredMainNavItems = filterNavItems(mainNavItems)
  const filteredCommunicationNavItems = filterNavItems(communicationNavItems)
  const filteredAdminNavItems = filterNavItems(adminNavItems)
  const filteredSettingsNavItems = filterNavItems(settingsNavItems)

  // Get badge class based on variant
  const getBadgeClass = (variant: string): string => {
    switch (variant) {
      case "default":
        return "bg-primary text-primary-foreground"
      case "secondary":
        return "bg-secondary text-secondary-foreground"
      case "destructive":
        return "bg-destructive text-destructive-foreground"
      case "outline":
        return "bg-background text-foreground border border-input"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  // Get status indicator class
  const getStatusClass = (status?: string): string => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-red-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
      default:
        return "bg-gray-400"
    }
  }

  // Get call type icon and color
  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case "incoming":
        return <Phone className="h-4 w-4 text-green-500 rotate-90" />
      case "outgoing":
        return <Phone className="h-4 w-4 text-blue-500 rotate-[135deg]" />
      case "missed":
        return <Phone className="h-4 w-4 text-red-500 rotate-90" />
      case "video":
        return <VideoIcon className="h-4 w-4 text-purple-500" />
      default:
        return <Phone className="h-4 w-4" />
    }
  }

  // Handle action item clicks
  const handleActionClick = (href: string) => {
    if (href === "#create-group") {
      setShowCreateGroupDialog(true)
    } else if (href === "#communication-settings") {
      setShowSettingsDialog(true)
    } else {
      router.push(href)
    }
  }

  // Toggle subItems expansion
  const toggleSubItemsExpansion = (itemHref: string) => {
    setExpandedSubItems((prev) => ({
      ...prev,
      [itemHref]: !prev[itemHref],
    }))
  }

  // Render notification badge
  const renderNotificationBadge = (count?: number) => {
    if (!count) return null

    return <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{count}</Badge>
  }

  // Render menu item with tooltip when collapsed
  const renderMenuItem = (item: NavItem, isActive: boolean) => {
    const hasSubItems = item.subItems && item.subItems.length > 0
    const isSubItemActive = hasSubItems && item.subItems?.some((subItem) => pathname === subItem.href)
    const isExpanded = expandedSubItems[item.href]

    const menuItem = (
      <div className={`flex flex-col w-full`}>
        <div
          className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl transition-all duration-300 
           ${
             isActive || isSubItemActive
               ? "bg-gradient-to-r from-[#0F7377]/20 to-[#1E293B]/20 text-[#0F7377] font-semibold shadow-sm border border-[#0F7377]/20"
               : item.isAction
                 ? "bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 hover:from-[#F59E0B]/20 hover:to-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer"
                 : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:translate-x-1 hover:shadow-sm cursor-pointer"
           }
           ${isMobile ? "py-4" : ""} // Larger touch target on mobile
           group
         `}
          role="menuitem"
          onClick={() => {
            if (hasSubItems) {
              toggleSubItemsExpansion(item.href)
            } else if (item.isAction) {
              handleActionClick(item.href)
            } else {
              router.push(item.href)
              if (isMobile) {
                setIsSidebarOpen(false) // Close sidebar on navigation for mobile
              }
            }
          }}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span
              className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-all duration-300 ${
                item.isAction 
                  ? "text-[#F59E0B] group-hover:scale-110" 
                  : isActive || isSubItemActive
                    ? "text-[#0F7377] group-hover:scale-110"
                    : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 group-hover:scale-110"
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-sm transition-all duration-300 flex-1 min-w-0 ${
                isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
              } ${item.isAction ? "font-medium" : ""}`}
            >
              {item.label}
            </span>
            {item.shortcut && !isCollapsed && !item.isAction && !hasSubItems && (
              <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-600 dark:text-gray-400 flex-shrink-0">
                Alt+{item.shortcut}
              </kbd>
            )}
            {!isCollapsed && renderNotificationBadge(item.notifications)}
          </div>
          {item.badge && !isCollapsed && (
            <span
              className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getBadgeClass(item.badge.variant)} flex-shrink-0`}
            >
              {item.badge.text}
            </span>
          )}
          {hasSubItems && !isCollapsed && (
            <ChevronRight
              className={`h-4 w-4 ml-2 transition-all duration-300 flex-shrink-0 ${isExpanded ? "transform rotate-90" : ""} text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300`}
            />
          )}
        </div>

        {/* Render subItems if expanded */}
        {hasSubItems && !isCollapsed && item.subItems && (
          <div
            className={`transition-all duration-300 overflow-hidden pl-4 ${
              isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {item.subItems.map((subItem) => (
              <div
                key={subItem.href}
                className={`flex items-center justify-between py-3 px-4 my-1 rounded-lg cursor-pointer transition-all duration-300 ${
                  pathname === subItem.href
                    ? "bg-gradient-to-r from-[#0F7377]/15 to-[#1E293B]/15 text-[#0F7377] font-medium shadow-sm border border-[#0F7377]/15"
                    : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:translate-x-1"
                } ${isMobile ? "py-3" : ""} // Larger touch target on mobile`}
                onClick={() => {
                  router.push(subItem.href)
                  if (isMobile) {
                    setIsSidebarOpen(false) // Close sidebar on navigation for mobile
                  }
                }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {subItem.icon && (
                    <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-gray-500 dark:text-gray-400">{subItem.icon}</span>
                  )}
                  <span className="text-sm flex-1 min-w-0">{subItem.label}</span>
                </div>
                {renderNotificationBadge(subItem.notifications)}
              </div>
            ))}
          </div>
        )}
      </div>
    )

    return isCollapsed ? (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`flex items-center justify-center w-full py-3 px-1 rounded-xl transition-all duration-300 
               ${
                 isActive || isSubItemActive
                   ? "bg-gradient-to-r from-[#0F7377]/20 to-[#1E293B]/20 text-[#0F7377] font-semibold shadow-sm border border-[#0F7377]/20"
                   : item.isAction
                     ? "bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 hover:from-[#F59E0B]/20 hover:to-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer"
                     : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-sm cursor-pointer"
               }
               ${isMobile ? "py-4" : ""} // Larger touch target on mobile
               relative group
               mx-1
             `}
              role="menuitem"
              onClick={() => {
                if (item.isAction) {
                  handleActionClick(item.href)
                } else if (!hasSubItems) {
                  router.push(item.href)
                  if (isMobile) {
                    setIsSidebarOpen(false)
                  }
                }
              }}
            >
              <span
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                  item.isAction 
                    ? "text-[#F59E0B] group-hover:scale-110" 
                    : isActive || isSubItemActive
                      ? "text-[#0F7377] group-hover:scale-110"
                      : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 group-hover:scale-110"
                }`}
              >
                {item.icon}
              </span>
              {/* Notification badge for collapsed state */}
              {item.notifications && item.notifications > 0 && (
                <div className="absolute -top-1 -right-1">
                  <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {item.notifications > 99 ? "99+" : item.notifications}
                  </Badge>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gray-900 text-white border-gray-700 shadow-lg">
            <div className="flex flex-col gap-1">
              <span className="font-medium">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs text-gray-300">Alt+{item.shortcut}</span>
              )}
              {item.notifications && item.notifications > 0 && (
                <span className="text-xs text-red-400">{item.notifications} notifications</span>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      menuItem
    )
  }

  // Render group header with toggle
  const renderGroupHeader = (label: string, groupKey: string) => {
    return (
      <div
        className={`py-3 text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center justify-between cursor-pointer 
           transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg ${isCollapsed ? "justify-center px-1" : "px-4"}
           ${isMobile ? "py-4" : ""} // Larger touch target on mobile`}
        onClick={() => !isCollapsed && toggleGroupExpansion(groupKey)}
      >
        {!isCollapsed && (
          <>
            <span className="uppercase tracking-wider font-medium">{label}</span>
            <ChevronRight
              className={`h-4 w-4 transition-all duration-300 text-gray-400 ${
                expandedGroups[groupKey] ? "transform rotate-90" : ""
              }`}
            />
          </>
        )}
        {isCollapsed && (
          <div className="flex flex-col items-center gap-1">
            <span className="w-4 h-px bg-gray-300 dark:bg-gray-600"></span>
            <span className="w-2 h-px bg-gray-200 dark:bg-gray-700"></span>
          </div>
        )}
      </div>
    )
  }

  // Render search and filter bar
  const renderSearchBar = () => {
    if (isCollapsed) return null

    return (
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search navigation..."
            className="pl-10 h-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-[#0F7377] dark:focus:border-[#0F7377] focus:ring-[#0F7377] dark:focus:ring-[#0F7377] transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 transition-all duration-300 ${
              filterFavorites 
                ? "text-[#F59E0B] hover:text-[#F59E0B]/80" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
            onClick={() => setFilterFavorites(!filterFavorites)}
            title={filterFavorites ? "Show all" : "Show favorites only"}
          >
            {filterFavorites ? <Star className="h-4 w-4" /> : <StarOff className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    )
  }

  // Render user profile section
  const renderUserProfile = () => {
    return (
      <div className={`flex flex-col gap-4 ${isCollapsed ? "items-center" : ""}`}>
        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={`p-0 h-auto ${isCollapsed ? "w-12 h-12 rounded-xl" : "w-full"}`}>
                  <div className={`flex items-center ${isCollapsed ? "flex-col justify-center" : "gap-3"}`}>
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.avatarUrl || "/placeholder.svg?key=user"}
                          alt={user.displayName || "User"}
                        />
                        <AvatarFallback>
                          {user.displayName
                            ? user.displayName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 text-[8px] text-white flex items-center justify-center">
                          {unreadCount}
                        </span>
                      </span>
                    </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium truncate">{user.displayName || user.email}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.role}</p>
                      </div>
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isCollapsed ? "center" : "end"} className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/security" className="cursor-pointer">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/notifications" className="cursor-pointer flex justify-between">
                    <div className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </div>
                    {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount}</Badge>}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => qrCode?.openQRGenerator()} className="cursor-pointer">
                  <QrCode className="mr-2 h-4 w-4" />
                  <span>My QR Code</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <span>Theme</span>
                    <SimpleThemeToggle />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {!isCollapsed ? (
              <>
                <div className="text-xs text-muted-foreground">Join our community:</div>
                <div className="flex gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white border-0 shadow-sm" 
                    asChild
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white" 
                    asChild
                  >
                    <Link href="/login">Log In</Link>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="default" size="icon" className="w-10 h-10 rounded-xl" asChild>
                        <Link href="/signup">
                          <UserPlus className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-900 text-white border-gray-700 shadow-lg">
                      <span>Sign Up</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl" asChild>
                        <Link href="/login">
                          <LogIn className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-gray-900 text-white border-gray-700 shadow-lg">
                      <span>Log In</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </>
        )}

        {/* Community channels */}
        {!isCollapsed ? (
          <>
            <div className="text-xs text-muted-foreground pt-2">Connect with us:</div>
            <div className="flex gap-2 w-full overflow-hidden">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-w-0 text-xs px-2 transition-all duration-200 hover:bg-muted/80 hover:scale-105"
                asChild
              >
                <Link href="https://whatsapp.com" target="_blank">
                  <Zap className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-w-0 text-xs px-2 transition-all duration-200 hover:bg-muted/80 hover:scale-105"
                asChild
              >
                <Link href="https://telegram.org" target="_blank">
                  <Zap className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">Telegram</span>
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                    <Link href="https://telegram.org" target="_blank">
                      <Zap className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="z-[60]">
                  Connect with us
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    )
  }

  // Add this new function for rendering the QR code in the sidebar
  // Memoize QR code data to prevent regeneration on every render
  const qrCodeData = useMemo(() => {
    if (!user) return null
    
    // Create unified QR code data that works for profile, E-card, and event attendance
    return JSON.stringify({
      type: "unified",
      userId: user.id,
      profileUrl: `${window.location.origin}/profile`,
      settingsUrl: `${window.location.origin}/settings/profile`,
      timestamp: Date.now()
    })
  }, [user?.id, user?.email])

  const renderQRCode = () => {
    if (!user || !qrCodeData) return null

    // Create profile URL
    const profileUrl = `/network/profile/${user.id}`

    return (
      <div className={`flex flex-col items-center py-3 px-2 gap-2 ${isCollapsed ? "scale-75" : ""}`}>
        {!isCollapsed && (
          <div className="flex items-center justify-between w-full">
            <h4 className="text-xs font-medium text-muted-foreground">MY QR CODE</h4>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => qrCode?.openQRGenerator()}
              title="Open QR code options"
            >
              <QrCode className="h-3 w-3" />
            </Button>
          </div>
        )}

        <div
          className={`bg-white p-2 rounded-lg cursor-pointer transition-all duration-200 
            hover:shadow-md ${isCollapsed ? "scale-90" : ""}`}
          onClick={() => qrCode?.openQRGenerator()}
          title="Click to expand and share"
        >
          <QRCode value={qrCodeData} size={isCollapsed ? 48 : 128} level="M" className="h-auto max-w-full" />
        </div>

        {!isCollapsed && <div className="text-xs text-center text-muted-foreground">Scan to view my profile</div>}
        
        {/* Scan QR Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => window.location.href = '/connect/scan'}
        >
          <QrCode className="w-3 h-3 mr-2" />
          Scan QR
        </Button>
        
        {/* E-Card Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={() => window.location.href = '/profile'}
        >
          <CreditCard className="w-3 h-3 mr-2" />
          E-Card
        </Button>
      </div>
    )
  }

  // If not mounted yet, return a skeleton to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="w-64 border-r border-border h-screen">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="p-4 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-8 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Mobile sidebar toggle button (fixed position)
  const mobileToggle = (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg md:hidden"
      onClick={toggleMobileSidebar}
      aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
    >
      {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
    </Button>
  )

  return (
    <>
      {mobileToggle}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isCollapsed ? "w-16" : "w-64"}
          bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700
        `}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Header */}
          <div className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
            <div className={`flex items-center ${isCollapsed ? "justify-center px-2" : "justify-between px-4"} py-4`}>
              <Link href="/" className={`flex items-center gap-3 group ${isCollapsed ? "justify-center" : ""}`}>
                <Image
                  src="/images/GrowthLab Icon (1).png"
                  alt="GrowthLab Logo"
                  width={48}
                  height={48}
                  className="flex-shrink-0"
                  priority
                />
                {!isCollapsed && (
                  <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-[#0F7377] to-[#1E293B] bg-clip-text text-transparent transition-opacity duration-200">
                      GrowthLab
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Singapore</span>
                  </div>
                )}
              </Link>

              {!isCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  onClick={toggleSidebar}
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}

              {isCollapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full absolute -right-3 top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
                  onClick={toggleSidebar}
                  aria-label="Expand sidebar"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Enhanced Navigation Content */}
          <div className="overflow-y-auto py-4 flex-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 scrollbar-track-transparent">
            {/* Enhanced QR Code Section */}
            {user && !isCollapsed && (
              <div className="px-4 mb-6">
                <div className="bg-gradient-to-r from-[#0F7377]/10 to-[#1E293B]/10 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  {renderQRCode()}
                </div>
              </div>
            )}

            {/* Enhanced Search Bar */}
            {!isCollapsed && (
              <div className="px-4 mb-8">
                {renderSearchBar()}
              </div>
            )}

            {/* Enhanced Navigation Sections */}
            <div className={`space-y-8 ${isCollapsed ? "px-2" : "px-4"}`}>
              {/* Main Navigation */}
              {filteredMainNavItems.length > 0 && (
                <div className={`transition-all duration-300 ${!expandedGroups.main && !isCollapsed ? "mb-0" : ""}`}>
                  {renderGroupHeader("Main Navigation", "main")}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      !expandedGroups.main && !isCollapsed ? "max-h-0 opacity-0" : "max-h-[2000px] opacity-100"
                    }`}
                  >
                    <div className={`${isCollapsed ? "space-y-1" : "py-3 space-y-2"}`}>
                      {filteredMainNavItems.map((item) => (
                        <div key={item.href} className={isCollapsed ? "my-0" : "my-0.5"}>
                          {renderMenuItem(item, pathname === item.href)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Communication Section */}
              {filteredCommunicationNavItems.length > 0 && (
                <div
                  className={`transition-all duration-300 ${!expandedGroups.communication && !isCollapsed ? "mb-0" : ""}`}
                >
                  {renderGroupHeader("Communication", "communication")}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      !expandedGroups.communication && !isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
                    }`}
                  >
                    <div className={`${isCollapsed ? "space-y-1" : "py-3 space-y-2"}`}>
                      {filteredCommunicationNavItems.map((item) => (
                        <div key={item.href} className={isCollapsed ? "my-0" : "my-0.5"}>
                          {renderMenuItem(item, pathname === item.href)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Super Admin Navigation */}
              {filteredAdminNavItems.length > 0 && (
                <div className={`transition-all duration-300 ${!expandedGroups.admin && !isCollapsed ? "mb-0" : ""}`}>
                  {renderGroupHeader("Super Admin", "admin")}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      !expandedGroups.admin && !isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
                    }`}
                  >
                    <div className={`${isCollapsed ? "space-y-1" : "py-3 space-y-2"}`}>
                      {filteredAdminNavItems.map((item) => (
                        <div key={item.href} className={isCollapsed ? "my-0" : "my-0.5"}>
                          {renderMenuItem(item, pathname === item.href)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Navigation */}
              {filteredSettingsNavItems.length > 0 && (
                <div className={`transition-all duration-300 ${!expandedGroups.settings && !isCollapsed ? "mb-0" : ""}`}>
                  {renderGroupHeader("Settings", "settings")}
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      !expandedGroups.settings && !isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
                    }`}
                  >
                    <div className={`${isCollapsed ? "space-y-1" : "py-3 space-y-2"}`}>
                      {filteredSettingsNavItems.map((item) => (
                        <div key={item.href} className={isCollapsed ? "my-0" : "my-0.5"}>
                          {renderMenuItem(item, pathname === item.href)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className={`${isCollapsed ? "px-2 py-4" : "px-4 py-4"}`}>
              {renderUserProfile()}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Overlay for mobile sidebar */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Legacy Communication Hub Button hidden */}
      {/* <CommunicationHubButton /> */}

      {/* Create Group Dialog */}
      <CreateGroupDialog open={showCreateGroupDialog} onOpenChange={setShowCreateGroupDialog} />

      {/* Communication Settings Dialog */}
      <CommunicationSettingsDialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog} />
    </>
  )
}
