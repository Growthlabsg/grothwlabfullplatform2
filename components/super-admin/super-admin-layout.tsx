"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  Settings,
  Activity,
  Shield,
  BarChart3,
  ToggleLeft,
  Database,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  Key,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  FileText,
  Zap,
  Server,
  Network,
  Lock,
  Eye,
  Trash2,
  Edit,
  Plus,
  Download,
  Upload,
  RefreshCw,
  HelpCircle,
  Building,
  Calendar,
  BookOpen
} from "lucide-react"

interface SuperAdminLayoutProps {
  children: React.ReactNode
  onTabChange?: (tab: string) => void
  activeTab?: string
}

// Comprehensive navigation including all administration features
const navigation = [
  {
    name: "Overview",
    href: "overview",
    icon: BarChart3,
    badge: null
  },
  {
    name: "Admin Dashboard",
    href: "admin-dashboard",
    icon: BarChart3,
    badge: null
  },
  {
    name: "User Management",
    href: "users",
    icon: Users,
    badge: "2.1k"
  },
  {
    name: "Project Review",
    href: "project-review",
    icon: FileText,
    badge: "5"
  },
  {
    name: "Employee Access",
    href: "employee-access",
    icon: Shield,
    badge: "12"
  },
  {
    name: "Startup Management",
    href: "startups",
    icon: Building,
    badge: "45"
  },
  {
    name: "Event Management",
    href: "events",
    icon: Calendar,
    badge: "12"
  },
  {
    name: "Course Management",
    href: "courses",
    icon: BookOpen,
    badge: "8"
  },
  {
    name: "Startup Verification",
    href: "verification",
    icon: Shield,
    badge: "2"
  },
  {
    name: "Feature Toggles",
    href: "features",
    icon: ToggleLeft,
    badge: null
  },
  {
    name: "Performance",
    href: "performance",
    icon: Zap,
    badge: "Live"
  },
  {
    name: "System Config",
    href: "config",
    icon: Settings,
    badge: null
  },
  {
    name: "Security",
    href: "security",
    icon: Shield,
    badge: "Secure"
  },
  {
    name: "Activity Logs",
    href: "logs",
    icon: Activity,
    badge: "1.2k"
  },
  {
    name: "Database",
    href: "database",
    icon: Database,
    badge: null
  },
  {
    name: "API Management",
    href: "api",
    icon: Network,
    badge: null
  },
  {
    name: "File Management",
    href: "files",
    icon: FileText,
    badge: null
  },
  {
    name: "Environment",
    href: "environment",
    icon: Globe,
    badge: "Prod"
  },
  {
    name: "Notifications",
    href: "notifications",
    icon: Bell,
    badge: "3"
  },
  {
    name: "Backup & Restore",
    href: "backup",
    icon: RefreshCw,
    badge: null
  }
]

const systemAlerts = [
  {
    id: 1,
    type: "warning",
    message: "High memory usage detected",
    time: "2 minutes ago"
  },
  {
    id: 2,
    type: "info",
    message: "Database backup completed",
    time: "5 minutes ago"
  },
  {
    id: 3,
    type: "success",
    message: "New user registration spike",
    time: "10 minutes ago"
  }
]

export function SuperAdminLayout({ children, activeTab, onTabChange }: SuperAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const handleNavigationClick = (href: string) => {
    console.log('Navigation clicked:', href)
    onTabChange?.(href)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">GrowthLab</h1>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = (activeTab || "overview") === item.href
            return (
              <button
                key={item.name}
                onClick={(e) => {
                  e.preventDefault()
                  onTabChange?.(item.href)
                  setSidebarOpen(false)
                }}
                className={cn(
                  "flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors w-full text-left",
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge 
                    variant={item.badge === "Live" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            )
          })}
        </nav>

        {/* System Status */}
        <div className="border-t border-gray-200 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">System Status</span>
              <Badge variant="default" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Healthy
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Uptime</span>
              <span className="font-medium">99.9%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Active Users</span>
              <span className="font-medium">1,247</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search admin functions..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* System Alerts */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-5 h-5" />
                    {systemAlerts.length > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {systemAlerts.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>System Alerts</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {systemAlerts.map((alert) => (
                    <DropdownMenuItem key={alert.id} className="flex items-start space-x-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        alert.type === "warning" && "bg-yellow-500",
                        alert.type === "info" && "bg-blue-500",
                        alert.type === "success" && "bg-green-500"
                      )} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.message}</p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Admin Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=SA" alt="Super Admin" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Super Administrator</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@growthlab.sg
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Key className="mr-2 h-4 w-4" />
                    <span>API Keys</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
} 