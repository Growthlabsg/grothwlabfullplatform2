"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Calendar as CalendarIcon,
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
  Settings,
  Users,
  User,
  UserPlus,
  UserMinus,
  Shield,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Key,
  ShieldCheck,
  ShieldAlert,
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Star,
  Heart as HeartIcon,
  Zap,
  Sparkles,
  Flame,
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
  DollarSign,
  Bitcoin,
  Wallet,
  PiggyBank,
  Banknote,
  Coins,
  Receipt,
  Calculator,
  Percent,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Minus,
  Divide,
  Equal,
  Hash as HashIcon,
  AtSign,
  Hash,
  Hash as HashIcon2,
  Hash as HashIcon3,
  Hash as HashIcon4,
  Hash as HashIcon5,
  Hash as HashIcon6,
  Hash as HashIcon7,
  Hash as HashIcon8,
  Hash as HashIcon9,
  Hash as HashIcon10,
  Video,
  Phone,
  Mic,
  MicOff,
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
  RotateCw,
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
  CheckCircle,
  AlertCircle,
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
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Key as KeyIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldAlert as ShieldAlertIcon,
  Activity as ActivityIcon,
  TrendingUp as TrendingUpIcon2,
  TrendingDown as TrendingDownIcon2,
  BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Target as TargetIcon,
  Award as AwardIcon,
  Trophy as TrophyIcon,
  Medal as MedalIcon,
  Crown as CrownIcon,
  Star as StarIcon,
  Heart as HeartIcon2,
  Zap as ZapIcon,
  Sparkles as SparklesIcon,
  Flame as FlameIcon,
  Droplets as DropletsIcon,
  Cloud as CloudIcon,
  CloudRain as CloudRainIcon,
  CloudLightning as CloudLightningIcon,
  CloudSnow as CloudSnowIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Globe as GlobeIcon,
  Map as MapIcon,
  Navigation as NavigationIcon,
  Compass as CompassIcon,
  Home as HomeIcon,
  Building as BuildingIcon,
  Building2 as Building2Icon,
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  CreditCard as CreditCardIcon,
  DollarSign as DollarSignIcon,
  Euro as EuroIcon,
  PoundSterling as PoundSterlingIcon,
  DollarSign as DollarSignIcon2,
  Bitcoin as BitcoinIcon,
  Wallet as WalletIcon,
  PiggyBank as PiggyBankIcon,
  Banknote as BanknoteIcon,
  Coins as CoinsIcon,
  Receipt as ReceiptIcon,
  Calculator as CalculatorIcon,
  Percent as PercentIcon,
  TrendingUp as TrendingUpIcon3,
  TrendingDown as TrendingDownIcon3,
  Minus as MinusIcon,
  Divide as DivideIcon,
  Equal as EqualIcon,
  Hash as HashIcon11,
  AtSign as AtSignIcon,
  Hash as HashIcon21,
  Hash as HashIcon12,
  Hash as HashIcon13,
  Hash as HashIcon14,
  Hash as HashIcon15,
  Hash as HashIcon16,
  Hash as HashIcon17,
  Hash as HashIcon18,
  Hash as HashIcon19,
  Hash as HashIcon20,
} from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  location?: string
  attendees: CalendarAttendee[]
  isRecurring?: boolean
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly"
    interval: number
    endDate?: Date
  }
  reminders?: {
    type: "email" | "notification" | "sms"
    minutes: number
  }[]
  color?: string
  isAllDay?: boolean
  isPrivate?: boolean
  meetingLink?: string
  notes?: string
  attachments?: CalendarAttachment[]
}

interface CalendarAttendee {
  id: string
  name: string
  email: string
  avatar?: string
  status: "invited" | "accepted" | "declined" | "tentative"
  responseTime?: Date
  isOrganizer: boolean
}

interface CalendarAttachment {
  id: string
  name: string
  url: string
  size: number
  type: string
}

interface CalendarIntegrationProps {
  account: string
  onClose?: () => void
}

export function CalendarIntegration({ account, onClose }: CalendarIntegrationProps) {
  const [activeTab, setActiveTab] = useState<"calendar" | "events" | "scheduling" | "settings">("calendar")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showPrivate, setShowPrivate] = useState(true)
  const [showCompleted, setShowCompleted] = useState(false)
  const [autoSync, setAutoSync] = useState(true)
  const [defaultReminders, setDefaultReminders] = useState(15)
  const [enableNotifications, setEnableNotifications] = useState(true)
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)

  // Mock calendar data
  const events: CalendarEvent[] = [
    {
      id: "event1",
      title: "Weekly Team Meeting",
      description: "Discuss project progress and plan for the week",
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 2),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 3),
      location: "Conference Room A",
      attendees: [
        {
          id: "user1",
          name: "John Doe",
          email: "john.doe@company.com",
          avatar: "/john-doe.png",
          status: "accepted",
          isOrganizer: true,
        },
        {
          id: "user2",
          name: "Jane Smith",
          email: "jane.smith@company.com",
          avatar: "/jane-smith.png",
          status: "accepted",
          isOrganizer: false,
        },
        {
          id: "user3",
          name: "Mike Johnson",
          email: "mike.johnson@company.com",
          avatar: "/mike-johnson.png",
          status: "tentative",
          isOrganizer: false,
        },
      ],
      isRecurring: true,
      recurrence: {
        frequency: "weekly",
        interval: 1,
      },
      reminders: [
        { type: "notification", minutes: 15 },
        { type: "email", minutes: 60 },
      ],
      color: "#3B82F6",
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "event2",
      title: "Client Presentation",
      description: "Present quarterly results to the client",
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 90),
      location: "Virtual Meeting",
      attendees: [
        {
          id: "user1",
          name: "John Doe",
          email: "john.doe@company.com",
          avatar: "/john-doe.png",
          status: "accepted",
          isOrganizer: true,
        },
        {
          id: "client1",
          name: "Sarah Wilson",
          email: "sarah.wilson@client.com",
          avatar: "/sarah-wilson.png",
          status: "accepted",
          isOrganizer: false,
        },
      ],
      reminders: [
        { type: "notification", minutes: 30 },
        { type: "email", minutes: 120 },
      ],
      color: "#10B981",
      meetingLink: "https://meet.google.com/xyz-uvw-rst",
      notes: "Prepare slides and demo materials",
      attachments: [
        {
          id: "att1",
          name: "Q4_Presentation.pdf",
          url: "/attachments/q4_presentation.pdf",
          size: 2048576,
          type: "application/pdf",
        },
      ],
    },
    {
      id: "event3",
      title: "Lunch with Mentor",
      description: "Catch up and discuss career development",
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 48),
      endTime: new Date(Date.now() + 1000 * 60 * 60 * 48 + 1000 * 60 * 60),
      location: "Downtown Cafe",
      attendees: [
        {
          id: "user1",
          name: "John Doe",
          email: "john.doe@company.com",
          avatar: "/john-doe.png",
          status: "accepted",
          isOrganizer: true,
        },
        {
          id: "mentor1",
          name: "Dr. Emily Chen",
          email: "emily.chen@mentor.com",
          avatar: "/emily-chen.png",
          status: "accepted",
          isOrganizer: false,
        },
      ],
      reminders: [
        { type: "notification", minutes: 60 },
      ],
      color: "#F59E0B",
      isPrivate: true,
    },
  ]

  const renderEventItem = (event: CalendarEvent) => (
    <div
      key={event.id}
      className={cn(
        "flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors",
        selectedEvent === event.id && "bg-gray-100 dark:bg-gray-800"
      )}
      onClick={() => setSelectedEvent(event.id)}
    >
      <div className="relative">
        <div 
          className="h-10 w-10 rounded flex items-center justify-center text-white"
          style={{ backgroundColor: event.color }}
        >
          <CalendarIcon className="h-5 w-5" />
        </div>
        {event.isPrivate && (
          <Lock className="absolute -top-1 -right-1 h-3 w-3 text-gray-400" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium truncate">{event.title}</h3>
          <div className="flex items-center space-x-1">
            {event.meetingLink && <Video className="h-3 w-3 text-blue-500" />}
            {event.isPrivate && <Lock className="h-3 w-3 text-gray-400" />}
            <Badge variant="outline" className="text-xs">
              {event.attendees.length} attendees
            </Badge>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {format(event.startTime, "MMM d, yyyy 'at' HH:mm")} • {event.location || "No location"}
        </p>
      </div>
    </div>
  )

  const renderAttendeeItem = (attendee: CalendarAttendee) => (
    <div key={attendee.id} className="flex items-center space-x-3 p-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={attendee.avatar} />
        <AvatarFallback className="text-xs">
          {attendee.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium truncate">{attendee.name}</h3>
          <div className="flex items-center space-x-1">
            {attendee.isOrganizer && <Badge variant="outline" className="text-xs">Organizer</Badge>}
            <Badge variant={
              attendee.status === "accepted" ? "default" :
              attendee.status === "tentative" ? "secondary" :
              attendee.status === "declined" ? "destructive" : "outline"
            }>
              {attendee.status}
            </Badge>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {attendee.email}
        </p>
      </div>
    </div>
  )

  const renderEventDetails = (event: CalendarEvent) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
      
      {event.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{event.description}</p>
      )}
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm">
            {format(event.startTime, "EEEE, MMMM d, yyyy 'at' HH:mm")} - {format(event.endTime, "HH:mm")}
          </span>
        </div>
        
        {event.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm">{event.location}</span>
          </div>
        )}
        
        {event.meetingLink && (
          <div className="flex items-center space-x-2">
            <Video className="h-4 w-4 text-gray-400" />
            <a href={event.meetingLink} className="text-sm text-blue-500 hover:underline">
              Join meeting
            </a>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Attendees</h3>
        <div className="space-y-1">
          {event.attendees.map(renderAttendeeItem)}
        </div>
      </div>
      
      {event.notes && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Notes</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{event.notes}</p>
        </div>
      )}
      
      {event.attachments && event.attachments.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Attachments</h3>
          <div className="space-y-1">
            {event.attachments.map(attachment => (
              <div key={attachment.id} className="flex items-center space-x-2 p-2 border rounded">
                <File className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium">{attachment.name}</span>
                <span className="text-xs text-gray-500">
                  ({(attachment.size / 1024 / 1024).toFixed(1)} MB)
                </span>
                <Button variant="ghost" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-green-500 rounded flex items-center justify-center">
            <CalendarIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Calendar</h1>
            <p className="text-xs text-gray-500">{account}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Event
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r dark:border-gray-800 flex flex-col">
          <div className="p-4 border-b dark:border-gray-800">
            <Input
              placeholder="Search events"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
            
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {activeTab === "calendar" && (
                <>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">
                      {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Today"}
                    </h3>
                    {getEventsForDate(selectedDate || new Date()).map(event => (
                      <div key={event.id} className="p-2 border rounded text-xs">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-gray-500">
                          {format(event.startTime, "HH:mm")} - {format(event.endTime, "HH:mm")}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              {activeTab === "events" && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium">Events</h3>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {events
                    .filter(event => 
                      (showPrivate || !event.isPrivate) &&
                      (showCompleted || event.endTime > new Date()) &&
                      event.title.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(renderEventItem)}
                </>
              )}
              
              {activeTab === "scheduling" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Scheduling</h3>
                  <div className="text-xs text-gray-500">
                    Quick scheduling options will appear here.
                  </div>
                </div>
              )}
              
              {activeTab === "settings" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Calendar Settings</CardTitle>
                      <CardDescription>Configure calendar preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-sync">Auto sync</Label>
                        <Switch
                          id="auto-sync"
                          checked={autoSync}
                          onCheckedChange={setAutoSync}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="default-reminders">Default reminders (minutes)</Label>
                        <Input
                          id="default-reminders"
                          type="number"
                          value={defaultReminders}
                          onChange={(e) => setDefaultReminders(parseInt(e.target.value))}
                          min={0}
                          max={1440}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="enable-notifications">Enable notifications</Label>
                        <Switch
                          id="enable-notifications"
                          checked={enableNotifications}
                          onCheckedChange={setEnableNotifications}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-private">Show private events</Label>
                        <Switch
                          id="show-private"
                          checked={showPrivate}
                          onCheckedChange={setShowPrivate}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {selectedEvent ? (
            <div className="flex-1 p-4">
              {renderEventDetails(events.find(e => e.id === selectedEvent)!)}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <CalendarIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Select an Event</h3>
                <p className="text-gray-500">Choose an event to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 