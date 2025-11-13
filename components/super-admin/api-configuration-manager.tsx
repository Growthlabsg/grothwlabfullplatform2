"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Key, 
  Bot, 
  Brain, 
  Sparkles, 
  Globe, 
  Database, 
  MessageSquare, 
  Image, 
  Video, 
  Search, 
  Mail, 
  Shield, 
  Settings, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Copy, 
  CheckCircle, 
  AlertTriangle, 
  Zap,
  Lock,
  Unlock,
  TestTube,
  Activity,
  TrendingUp,
  Users,
  FileText,
  Calendar,
  MapPin,
  CreditCard,
  Building2,
  Cpu,
  Palette,
  Music,
  Camera,
  Phone,
  Smartphone,
  Monitor,
  Server,
  Cloud,
  Wifi,
  Bluetooth,
  Satellite,
  Radio,
  Tv,
  Gamepad2,
  Headphones,
  Speaker,
  Printer,
  Router,
  HardDrive,
  MemoryStick,
  Usb,
  WifiOff,
  Signal,
  Battery,
  Power,
  PowerOff,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Volume1,
  Mic,
  MicOff,
  VideoOff,
  VideoIcon,
  CameraOff,
  ImageOff,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FileArchive,
  FileSpreadsheet,
  FileInstagram
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface APIConfiguration {
  id: string
  service: string
  category: string
  name: string
  description: string
  apiKey: string
  apiSecret?: string
  baseUrl?: string
  region?: string
  environment: "development" | "staging" | "production"
  status: "active" | "inactive" | "testing" | "error"
  lastTested?: string
  usageCount: number
  rateLimit?: string
  costPerRequest?: number
  monthlyCost?: number
  features: string[]
  isEncrypted: boolean
  createdAt: string
  updatedAt: string
}

interface ServiceCategory {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  services: string[]
  color: string
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "llm",
    name: "Large Language Models",
    description: "AI language models for content generation, analysis, and processing",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-blue-500",
    services: [
      "OpenAI GPT-4",
      "OpenAI GPT-3.5",
      "Anthropic Claude",
      "Google Gemini",
      "Meta Llama",
      "Cohere",
      "AI21",
      "Hugging Face",
      "Grok AI",
      "Perplexity AI",
      "Mistral AI",
      "DeepSeek",
      "Qwen",
      "Baichuan",
      "MiniMax",
      "01.AI",
      "BAAI",
      "THUDM"
    ]
  },
  {
    id: "image-generation",
    name: "Image Generation",
    description: "AI services for creating, editing, and manipulating images",
    icon: <Image className="w-5 h-5" />,
    color: "bg-purple-500",
    services: [
      "OpenAI DALL-E",
      "Midjourney",
      "Stable Diffusion",
      "Adobe Firefly",
      "Canva AI",
      "Runway ML",
      "Leonardo AI",
      "Artbreeder",
      "DeepAI",
      "Hugging Face Diffusers",
      "Replicate",
      "DreamStudio",
      "NightCafe",
      "Wombo Dream",
      "StarryAI",
      "Fotor AI",
      "PhotoRoom",
      "Remove.bg",
      "Cleanup.pictures",
      "Inpaint"
    ]
  },
  {
    id: "video-generation",
    name: "Video Generation",
    description: "AI services for creating, editing, and processing videos",
    icon: <Video className="w-5 h-5" />,
    color: "bg-red-500",
    services: [
      "OpenAI Sora",
      "Runway ML",
      "Pika Labs",
      "Stable Video",
      "HeyGen",
      "Synthesia",
      "D-ID",
      "Lumen5",
      "InVideo",
      "Pictory",
      "Synthesys",
      "Colossyan",
      "DeepBrain AI",
      "Hour One",
      "Lovo",
      "Murf",
      "Speechify",
      "Play.ht",
      "WellSaid Labs",
      "Resemble AI"
    ]
  },
  {
    id: "search-engines",
    name: "Search & Discovery",
    description: "Search engines, web scraping, and content discovery services",
    icon: <Search className="w-5 h-5" />,
    color: "bg-green-500",
    services: [
      "Google Search API",
      "Bing Search API",
      "DuckDuckGo",
      "SerpAPI",
      "ScrapingBee",
      "Bright Data",
      "ProxyMesh",
      "ScraperAPI",
      "Zenscrape",
      "Apify",
      "ParseHub",
      "Octoparse",
      "Import.io",
      "Mozenda",
      "Conductor",
      "Ahrefs",
      "SEMrush",
      "Moz",
      "Majestic",
      "SpyFu"
    ]
  },
  {
    id: "communication",
    name: "Communication",
    description: "Email, SMS, messaging, and communication services",
    icon: <MessageSquare className="w-5 h-5" />,
    color: "bg-yellow-500",
    services: [
      "SendGrid",
      "Mailgun",
      "Mailchimp",
      "Twilio",
      "Vonage",
      "MessageBird",
      "AWS SES",
      "Gmail API",
      "Outlook API",
      "Slack API",
      "Discord API",
      "Telegram Bot API",
      "WhatsApp Business API",
      "Facebook Messenger API",
      "Line Messaging API",
      "WeChat API",
      "Viber API",
      "Signal API",
      "Skype API",
      "Teams API"
    ]
  },
  {
    id: "payment",
    name: "Payment & Finance",
    description: "Payment gateways, financial services, and banking APIs",
    icon: <CreditCard className="w-5 h-5" />,
    color: "bg-emerald-500",
    services: [
      "Stripe",
      "PayPal",
      "Square",
      "Adyen",
      "Braintree",
      "Worldpay",
      "Klarna",
      "Afterpay",
      "Affirm",
      "Shopify Payments",
      "WooCommerce Payments",
      "Magento Payments",
      "BigCommerce Payments",
      "Squarespace Commerce",
      "Wix Payments",
      "Weebly Payments",
      "GoDaddy Payments",
      "Bluehost Payments",
      "HostGator Payments",
      "DreamHost Payments"
    ]
  },
  {
    id: "cloud-services",
    name: "Cloud & Infrastructure",
    description: "Cloud computing, storage, and infrastructure services",
    icon: <Cloud className="w-5 h-5" />,
    color: "bg-indigo-500",
    services: [
      "AWS",
      "Google Cloud",
      "Microsoft Azure",
      "DigitalOcean",
      "Linode",
      "Vultr",
      "Heroku",
      "Vercel",
      "Netlify",
      "Cloudflare",
      "Fastly",
      "Akamai",
      "CDN77",
      "Bunny CDN",
      "KeyCDN",
      "StackPath",
      "Limelight",
      "EdgeCast",
      "Level3",
      "Cogent"
    ]
  },
  {
    id: "analytics",
    name: "Analytics & Monitoring",
    description: "Data analytics, monitoring, and business intelligence services",
    icon: <Activity className="w-5 h-5" />,
    color: "bg-pink-500",
    services: [
      "Google Analytics",
      "Mixpanel",
      "Amplitude",
      "Heap Analytics",
      "Hotjar",
      "FullStory",
      "LogRocket",
      "Sentry",
      "DataDog",
      "New Relic",
      "AppDynamics",
      "Dynatrace",
      "Splunk",
      "Elastic",
      "Grafana",
      "Kibana",
      "Tableau",
      "Power BI",
      "Looker",
      "Metabase"
    ]
  },
  {
    id: "social-media",
    name: "Social Media",
    description: "Social media platforms and management services",
    icon: <Users className="w-5 h-5" />,
    color: "bg-orange-500",
    services: [
      "Facebook Graph API",
      "Instagram Basic Display API",
      "Twitter API v2",
      "LinkedIn API",
      "YouTube Data API",
      "TikTok API",
      "Pinterest API",
      "Snapchat Kit",
      "Reddit API",
      "Tumblr API",
      "Medium API",
      "Quora API",
      "Stack Overflow API",
      "GitHub API",
      "GitLab API",
      "Bitbucket API",
      "Discord API",
      "Slack API",
      "Telegram Bot API",
      "WhatsApp Business API"
    ]
  },
  {
    id: "maps-location",
    name: "Maps & Location",
    description: "Mapping, geolocation, and location-based services",
    icon: <MapPin className="w-5 h-5" />,
    color: "bg-teal-500",
    services: [
      "Google Maps API",
      "Mapbox",
      "OpenStreetMap",
      "Here Maps",
      "TomTom",
      "Bing Maps",
      "Apple Maps",
      "Foursquare API",
      "Yelp Fusion API",
      "TripAdvisor API",
      "Booking.com API",
      "Expedia API",
      "Airbnb API",
      "Uber API",
      "Lyft API",
      "Grab API",
      "GoJek API",
      "Bolt API",
      "FreeNow API",
      "Cabify API"
    ]
  },
  {
    id: "other",
    name: "Other Services",
    description: "Miscellaneous APIs and third-party integrations",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-gray-500",
    services: [
      "Weather APIs",
      "News APIs",
      "Sports APIs",
      "Music APIs",
      "Movie APIs",
      "Book APIs",
      "Recipe APIs",
      "Translation APIs",
      "OCR APIs",
      "Voice APIs",
      "Text-to-Speech",
      "Speech-to-Text",
      "Face Recognition",
      "Object Detection",
      "Sentiment Analysis",
      "Entity Recognition",
      "Keyword Extraction",
      "Topic Modeling",
      "Summarization",
      "Question Answering"
    ]
  }
]

const mockAPIConfigs: APIConfiguration[] = [
  {
    id: "1",
    service: "OpenAI GPT-4",
    category: "llm",
    name: "OpenAI GPT-4 Production",
    description: "Primary LLM service for content generation and analysis",
    apiKey: "sk-...",
    baseUrl: "https://api.openai.com/v1",
    environment: "production",
    status: "active",
    lastTested: "2024-01-15T10:30:00Z",
    usageCount: 15420,
    rateLimit: "3,000 requests/minute",
    costPerRequest: 0.03,
    monthlyCost: 462.60,
    features: ["Text Generation", "Chat Completion", "Fine-tuning", "Embeddings"],
    isEncrypted: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    service: "Anthropic Claude",
    category: "llm",
    name: "Claude 3 Sonnet",
    description: "Alternative LLM for strategic and analytical content",
    apiKey: "sk-ant-...",
    baseUrl: "https://api.anthropic.com",
    environment: "production",
    status: "active",
    lastTested: "2024-01-14T15:45:00Z",
    usageCount: 8230,
    rateLimit: "5 requests/second",
    costPerRequest: 0.015,
    monthlyCost: 123.45,
    features: ["Text Generation", "Chat Completion", "Analysis"],
    isEncrypted: true,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    service: "Stripe",
    category: "payment",
    name: "Stripe Production",
    description: "Primary payment gateway for all transactions",
    apiKey: "sk_live_...",
    apiSecret: "sk_live_...",
    environment: "production",
    status: "active",
    lastTested: "2024-01-15T09:15:00Z",
    usageCount: 1250,
    rateLimit: "100 requests/second",
    costPerRequest: 0.029,
    monthlyCost: 36.25,
    features: ["Payment Processing", "Subscription Management", "Refunds", "Disputes"],
    isEncrypted: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T09:15:00Z"
  }
]

export function APIConfigurationManager() {
  const { toast } = useToast()
  const [configs, setConfigs] = useState<APIConfiguration[]>(mockAPIConfigs)
  const [selectedCategory, setSelectedCategory] = useState("llm")
  const [showAddConfig, setShowAddConfig] = useState(false)
  const [editingConfig, setEditingConfig] = useState<APIConfiguration | null>(null)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterEnvironment, setFilterEnvironment] = useState<string>("all")

  const filteredConfigs = configs.filter(config => {
    const matchesSearch = config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         config.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || config.status === filterStatus
    const matchesEnvironment = filterEnvironment === "all" || config.environment === filterEnvironment
    const matchesCategory = selectedCategory === "all" || config.category === selectedCategory
    
    return matchesSearch && matchesStatus && matchesEnvironment && matchesCategory
  })

  const toggleSecretVisibility = (configId: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [configId]: !prev[configId]
    }))
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: `${label} has been copied to your clipboard.`,
    })
  }

  const testAPI = async (config: APIConfiguration) => {
    try {
      // Mock API test - replace with actual API testing logic
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newConfigs = configs.map(c => 
        c.id === config.id 
          ? { ...c, status: "active", lastTested: new Date().toISOString() }
          : c
      )
      setConfigs(newConfigs)
      
      toast({
        title: "API Test Successful",
        description: `${config.service} is working correctly.`,
      })
    } catch (error) {
      const newConfigs = configs.map(c => 
        c.id === config.id 
          ? { ...c, status: "error" }
          : c
      )
      setConfigs(newConfigs)
      
      toast({
        title: "API Test Failed",
        description: `Failed to connect to ${config.service}.`,
        variant: "destructive"
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'testing': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production': return 'bg-red-100 text-red-800'
      case 'staging': return 'bg-yellow-100 text-yellow-800'
      case 'development': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    const cat = serviceCategories.find(c => c.id === category)
    return cat?.icon || <Zap className="w-4 h-4" />
  }

  const getCategoryColor = (category: string) => {
    const cat = serviceCategories.find(c => c.id === category)
    return cat?.color || "bg-gray-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">API Configuration Manager</h1>
          <p className="text-muted-foreground">
            Centralized management of all external API keys and service configurations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowAddConfig(true)}>
            <Key className="w-4 h-4 mr-2" />
            Add API Configuration
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total APIs</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{configs.length}</div>
            <p className="text-xs text-muted-foreground">
              {configs.filter(c => c.status === 'active').length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${configs.reduce((sum, c) => sum + (c.monthlyCost || 0), 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total across all services
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {configs.reduce((sum, c) => sum + c.usageCount, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(configs.map(c => c.service)).size}
            </div>
            <p className="text-xs text-muted-foreground">
              Unique services
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Service Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("all")}
              >
                <Zap className="w-4 h-4 mr-2" />
                All Services
              </Button>
              {serviceCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                  <Badge variant="secondary" className="ml-auto">
                    {configs.filter(c => c.category === category.id).length}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Configurations List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Configurations</CardTitle>
                  <CardDescription>
                    Manage and monitor all external service integrations
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Search APIs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterEnvironment} onValueChange={setFilterEnvironment}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Env</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredConfigs.map((config) => (
                  <div key={config.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${getCategoryColor(config.category)} text-white`}>
                          {getCategoryIcon(config.category)}
                        </div>
                        <div>
                          <h4 className="font-medium">{config.name}</h4>
                          <p className="text-sm text-muted-foreground">{config.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{config.service}</Badge>
                            <Badge className={getStatusColor(config.status)}>
                              {config.status}
                            </Badge>
                            <Badge className={getEnvironmentColor(config.environment)}>
                              {config.environment}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testAPI(config)}
                        >
                          <TestTube className="w-4 h-4 mr-2" />
                          Test
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingConfig(config)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">API Key:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type={showSecrets[config.id] ? "text" : "password"}
                            value={config.apiKey}
                            readOnly
                            className="text-xs"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSecretVisibility(config.id)}
                          >
                            {showSecrets[config.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(config.apiKey, "API Key")}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {config.apiSecret && (
                        <div>
                          <span className="font-medium">API Secret:</span>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type={showSecrets[config.id] ? "text" : "password"}
                              value={config.apiSecret}
                              readOnly
                              className="text-xs"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(config.apiSecret!, "API Secret")}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-medium">Base URL:</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            value={config.baseUrl || "N/A"}
                            readOnly
                            className="text-xs"
                          />
                          {config.baseUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(config.baseUrl!, "Base URL")}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Usage:</span>
                        <p>{config.usageCount.toLocaleString()} requests</p>
                      </div>
                      <div>
                        <span className="font-medium">Rate Limit:</span>
                        <p>{config.rateLimit || "N/A"}</p>
                      </div>
                      <div>
                        <span className="font-medium">Cost/Request:</span>
                        <p>${config.costPerRequest?.toFixed(4) || "N/A"}</p>
                      </div>
                      <div>
                        <span className="font-medium">Monthly Cost:</span>
                        <p>${config.monthlyCost?.toFixed(2) || "N/A"}</p>
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-sm">Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {config.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last tested: {config.lastTested ? new Date(config.lastTested).toLocaleString() : "Never"}</span>
                      <span>Updated: {new Date(config.updatedAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Configuration Dialog */}
      <Dialog open={showAddConfig || !!editingConfig} onOpenChange={() => {
        setShowAddConfig(false)
        setEditingConfig(null)
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingConfig ? 'Edit API Configuration' : 'Add New API Configuration'}
            </DialogTitle>
            <DialogDescription>
              Configure external service integration with API keys and settings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="service">Service</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map(category => (
                      <div key={category.id}>
                        <div className="font-medium text-sm px-2 py-1 bg-gray-100">
                          {category.name}
                        </div>
                        {category.services.map(service => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Configuration Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., OpenAI GPT-4 Production"
                />
              </div>
              <div>
                <Label htmlFor="environment">Environment</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the purpose and usage of this API configuration"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter API key"
                />
              </div>
              <div>
                <Label htmlFor="apiSecret">API Secret (Optional)</Label>
                <Input
                  id="apiSecret"
                  type="password"
                  placeholder="Enter API secret if required"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="baseUrl">Base URL (Optional)</Label>
                <Input
                  id="baseUrl"
                  placeholder="e.g., https://api.openai.com/v1"
                />
              </div>
              <div>
                <Label htmlFor="region">Region (Optional)</Label>
                <Input
                  id="region"
                  placeholder="e.g., us-east-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rateLimit">Rate Limit (Optional)</Label>
                <Input
                  id="rateLimit"
                  placeholder="e.g., 100 requests/minute"
                />
              </div>
              <div>
                <Label htmlFor="costPerRequest">Cost per Request (Optional)</Label>
                <Input
                  id="costPerRequest"
                  type="number"
                  step="0.0001"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => {
              setShowAddConfig(false)
              setEditingConfig(null)
            }}>
              Cancel
            </Button>
            <Button type="submit">
              {editingConfig ? 'Update Configuration' : 'Create Configuration'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
