"use client"

import { UnifiedCommunicationHub } from "@/components/communication/unified-communication-hub"
import { ErrorBoundary } from "react-error-boundary"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Hash,
  Video,
  Calendar,
  Settings,
  Users,
  Phone,
  Mail,
  FileText,
  Shield,
  Zap,
  Star,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  MapPin,
  Link,
  ExternalLink,
  Plus,
  Send,
  Paperclip,
  Smile,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Flag,
  Heart,
  ThumbsUp,
  Reply,
  Forward,
  Archive,
  Mute,
  Block,
  Report,
  Camera,
  CameraOff,
  ScreenShare,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Battery,
  BatteryCharging,
  Power,
  PowerOff,
  RefreshCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Scissors,
  Type,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  Quote,
  Code,
  Link2,
  Image,
  Music,
  File,
  Folder,
  FolderOpen,
  FolderPlus,
  FolderMinus,
  FolderX,
  FolderCheck,
  FolderSearch,
  FolderHeart,
  FolderLock,
  CheckCircle as CheckCircleIcon,
  AlertCircle as AlertCircleIcon,
  AlertTriangle,
  Check,
  XCircle,
  Info as InfoIcon,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Download,
  Upload,
  Share2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Key,
  ShieldCheck,
  ShieldAlert,
  Activity as ActivityIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Star as StarIcon,
  Heart as HeartIcon,
  Zap as ZapIcon,
  Flash,
  Sparkles,
  Fire,
  Droplets,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Globe,
  Map,
  Navigation,
  Compass,
  Home,
  Building,
  Building2,
  Store,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Euro,
  PoundSterling,
  Yen,
  Bitcoin,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Receipt,
  Calculator,
  Percent,
  Minus,
  Divide,
  Equal,
  AtSign,
  Number,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState("whatsapp")
  const [showHub, setShowHub] = useState(false)

  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp-Style Chat",
      description: "Familiar messaging interface with enhanced features",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Hash,
      title: "Slack Integration",
      description: "Team collaboration with channels and threads",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Video,
      title: "Google Meet Integration",
      description: "Video conferencing with screen sharing",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Calendar,
      title: "Calendar & Scheduling",
      description: "Appointment scheduling and calendar management",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "End-to-end encryption and secure file sharing",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Zap,
      title: "Real-time Features",
      description: "Typing indicators, read receipts, and live updates",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ]

  const stats = [
    { label: "Active Users", value: "2,847", change: "+12%", trend: "up" },
    { label: "Messages Sent", value: "45,291", change: "+8%", trend: "up" },
    { label: "Meetings Created", value: "1,234", change: "+15%", trend: "up" },
    { label: "Files Shared", value: "8,567", change: "+5%", trend: "up" },
  ]

  const renderTabContent = () => {
    return <UnifiedCommunicationHub />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {!showHub ? (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Communication Hub</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
                A unified platform combining WhatsApp-style messaging, Slack collaboration, 
                Google Meet video conferencing, and calendar management. All your communication 
                needs in one place.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUpIcon className={cn(
                          "h-4 w-4",
                          stat.trend === "up" ? "text-green-500" : "text-red-500"
                        )} />
                        <span className={cn(
                          "text-sm font-medium",
                          stat.trend === "up" ? "text-green-500" : "text-red-500"
                        )}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-4", feature.bgColor)}>
                        <feature.icon className={cn("h-6 w-6", feature.color)} />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  onClick={() => setShowHub(true)}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>Start Chatting</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Video className="h-6 w-6" />
                  <span>Join Meeting</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Event</span>
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                >
                  <Hash className="h-6 w-6" />
                  <span>Create Channel</span>
                </Button>
              </div>
            </div>

            {/* Integration Status */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Integration Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>WhatsApp-Style Chat</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Core messaging functionality with enhanced features
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Slack Integration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Team collaboration with channels and file sharing
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Google Meet</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Video conferencing with screen sharing capabilities
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Calendar Integration</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Appointment scheduling and calendar management
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Security Features</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      End-to-end encryption and secure file sharing
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Real-time Updates</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Live typing indicators and read receipts
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Launch Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => setShowHub(true)}
                className="px-8 py-4 text-lg"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Launch Unified Communication Hub
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen">
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setShowHub(false)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Overview</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-green-500 to-blue-500 rounded flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">GrowthLab Unified Communication Hub</h1>
                  <p className="text-xs text-gray-500">All platforms integrated under one roof</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">All Systems Online</Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex-1 h-[calc(100vh-80px)]">
            <ErrorBoundary fallback={<div>Something went wrong with the communication hub</div>}>
              {renderTabContent()}
            </ErrorBoundary>
          </div>
        </div>
      )}
    </div>
  )
}
