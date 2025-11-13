"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  CheckCircle2,
  Circle,
  Plus,
  Save,
  Download,
  Trash2,
  Edit,
  Flag,
  ArrowUpDown,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Upload,
  Layers,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

export interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  category: "ideation" | "legal" | "product" | "marketing" | "funding" | "operations" | "team" | "custom"
  timeEstimate: string
  difficulty: "easy" | "medium" | "hard"
  priority: "high" | "medium" | "low"
  isCustom?: boolean
  resources?: {
    title: string
    url: string
  }[]
}

export interface ChecklistCategory {
  id: string
  name: string
}

// Expanded initial checklist with more comprehensive items
const defaultChecklist: ChecklistItem[] = [
  // Ideation Phase
  {
    id: "idea-1",
    title: "Define your business idea and value proposition",
    description: "Clearly articulate what problem your business solves and how it creates value for customers.",
    completed: false,
    category: "ideation",
    timeEstimate: "1-2 days",
    difficulty: "medium",
    priority: "high",
    resources: [
      { title: "Business Model Canvas", url: "/resources/business-model-canvas" },
      { title: "Value Proposition Design", url: "/resources/value-proposition" },
    ],
  },
  {
    id: "idea-2",
    title: "Conduct market research",
    description: "Analyze your target market, competitors, and industry trends to validate your business idea.",
    completed: false,
    category: "ideation",
    timeEstimate: "1-2 weeks",
    difficulty: "hard",
    priority: "high",
    resources: [
      { title: "Market Research Guide", url: "/resources/market-research" },
      { title: "Competitor Analysis Template", url: "/resources/competitor-analysis" },
    ],
  },
  {
    id: "idea-3",
    title: "Create user personas",
    description: "Develop detailed profiles of your ideal customers to better understand their needs and behaviors.",
    completed: false,
    category: "ideation",
    timeEstimate: "2-3 days",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "User Persona Template", url: "/resources/user-persona" }],
  },
  {
    id: "idea-4",
    title: "Validate your idea with potential customers",
    description: "Conduct interviews or surveys with potential customers to validate your business idea.",
    completed: false,
    category: "ideation",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [
      { title: "Customer Interview Guide", url: "/resources/customer-interview" },
      { title: "Survey Design Tips", url: "/resources/survey-design" },
    ],
  },
  {
    id: "idea-5",
    title: "Develop a unique selling proposition (USP)",
    description:
      "Define what makes your product or service unique and why customers should choose you over competitors.",
    completed: false,
    category: "ideation",
    timeEstimate: "2-3 days",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "USP Development Guide", url: "/resources/usp-development" }],
  },

  // Legal Phase
  {
    id: "legal-1",
    title: "Choose a business structure",
    description:
      "Select the appropriate legal structure for your business (sole proprietorship, LLC, corporation, etc.).",
    completed: false,
    category: "legal",
    timeEstimate: "1 week",
    difficulty: "medium",
    priority: "high",
    resources: [
      { title: "Business Structure Comparison", url: "/resources/business-structures" },
      { title: "Legal Consultation", url: "/resources/legal-consultation" },
    ],
  },
  {
    id: "legal-2",
    title: "Register your business name",
    description: "Register your business name with the appropriate government agencies.",
    completed: false,
    category: "legal",
    timeEstimate: "1-3 days",
    difficulty: "easy",
    priority: "high",
    resources: [{ title: "Singapore Business Registration Guide", url: "/resources/business-registration" }],
  },
  {
    id: "legal-3",
    title: "Apply for necessary licenses and permits",
    description: "Obtain all required licenses and permits to operate your business legally.",
    completed: false,
    category: "legal",
    timeEstimate: "2-4 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "Business License Guide", url: "/resources/business-licenses" }],
  },
  {
    id: "legal-4",
    title: "Create terms of service and privacy policy",
    description: "Develop legal documents to protect your business and inform customers about your practices.",
    completed: false,
    category: "legal",
    timeEstimate: "1 week",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Legal Document Templates", url: "/resources/legal-templates" }],
  },
  {
    id: "legal-5",
    title: "Secure intellectual property protection",
    description: "Protect your business name, logo, and innovations through trademarks, copyrights, or patents.",
    completed: false,
    category: "legal",
    timeEstimate: "1-3 months",
    difficulty: "hard",
    priority: "medium",
    resources: [{ title: "IP Protection Guide", url: "/resources/ip-protection" }],
  },
  {
    id: "legal-6",
    title: "Set up contracts for vendors and clients",
    description: "Create standardized contracts for your business relationships.",
    completed: false,
    category: "legal",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Contract Templates", url: "/resources/contract-templates" }],
  },

  // Product Phase
  {
    id: "product-1",
    title: "Define your minimum viable product (MVP)",
    description: "Identify the core features needed to solve your customers' problems and test your solution.",
    completed: false,
    category: "product",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "MVP Planning Guide", url: "/resources/mvp-planning" }],
  },
  {
    id: "product-2",
    title: "Create a product roadmap",
    description: "Develop a strategic plan for your product's evolution over time.",
    completed: false,
    category: "product",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Product Roadmap Template", url: "/resources/product-roadmap" }],
  },
  {
    id: "product-3",
    title: "Develop MVP (Minimum Viable Product)",
    description: "Build the first version of your product with just enough features to gather feedback.",
    completed: false,
    category: "product",
    timeEstimate: "1-3 months",
    difficulty: "hard",
    priority: "high",
    resources: [
      { title: "MVP Development Guide", url: "/resources/mvp-development" },
      { title: "Product Management Tools", url: "/resources/product-management" },
    ],
  },
  {
    id: "product-4",
    title: "Establish quality assurance processes",
    description: "Create procedures to ensure your product meets quality standards.",
    completed: false,
    category: "product",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "QA Process Guide", url: "/resources/qa-process" }],
  },
  {
    id: "product-5",
    title: "Gather and implement user feedback",
    description: "Collect feedback from early users and make improvements to your product.",
    completed: false,
    category: "product",
    timeEstimate: "Ongoing",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "User Feedback Collection Methods", url: "/resources/user-feedback" }],
  },

  // Marketing Phase
  {
    id: "marketing-1",
    title: "Create a marketing plan",
    description: "Develop a comprehensive strategy to reach your target audience and promote your product.",
    completed: false,
    category: "marketing",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [
      { title: "Marketing Plan Template", url: "/resources/marketing-plan" },
      { title: "Digital Marketing Guide", url: "/resources/digital-marketing" },
    ],
  },
  {
    id: "marketing-2",
    title: "Build a company website",
    description: "Create a professional website to showcase your products or services.",
    completed: false,
    category: "marketing",
    timeEstimate: "2-4 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "Website Development Guide", url: "/resources/website-development" }],
  },
  {
    id: "marketing-3",
    title: "Establish social media presence",
    description: "Create and optimize profiles on relevant social media platforms.",
    completed: false,
    category: "marketing",
    timeEstimate: "1-2 weeks",
    difficulty: "easy",
    priority: "medium",
    resources: [{ title: "Social Media Strategy Guide", url: "/resources/social-media-strategy" }],
  },
  {
    id: "marketing-4",
    title: "Develop content marketing strategy",
    description: "Plan and create valuable content to attract and engage your target audience.",
    completed: false,
    category: "marketing",
    timeEstimate: "2-3 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Content Marketing Guide", url: "/resources/content-marketing" }],
  },
  {
    id: "marketing-5",
    title: "Set up analytics tracking",
    description: "Implement tools to measure website traffic, user behavior, and marketing performance.",
    completed: false,
    category: "marketing",
    timeEstimate: "1 week",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Analytics Setup Guide", url: "/resources/analytics-setup" }],
  },

  // Funding Phase
  {
    id: "funding-1",
    title: "Set up business bank account",
    description: "Open a dedicated bank account for your business finances.",
    completed: false,
    category: "funding",
    timeEstimate: "1-2 days",
    difficulty: "easy",
    priority: "high",
    resources: [{ title: "Business Banking Options", url: "/resources/business-banking" }],
  },
  {
    id: "funding-2",
    title: "Prepare financial projections",
    description: "Create financial forecasts including revenue, expenses, and cash flow for the next 1-3 years.",
    completed: false,
    category: "funding",
    timeEstimate: "1-2 weeks",
    difficulty: "hard",
    priority: "high",
    resources: [
      { title: "Financial Projection Templates", url: "/resources/financial-templates" },
      { title: "Financial Planning Guide", url: "/resources/financial-planning" },
    ],
  },
  {
    id: "funding-3",
    title: "Determine startup costs and funding needs",
    description: "Calculate how much money you need to start and sustain your business until profitability.",
    completed: false,
    category: "funding",
    timeEstimate: "1 week",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "Startup Cost Calculator", url: "/resources/startup-cost-calculator" }],
  },
  {
    id: "funding-4",
    title: "Explore funding options",
    description: "Research different funding sources such as bootstrapping, loans, grants, or investors.",
    completed: false,
    category: "funding",
    timeEstimate: "2-3 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "Funding Options Guide", url: "/resources/funding-options" }],
  },
  {
    id: "funding-5",
    title: "Create a pitch deck",
    description: "Develop a compelling presentation to attract potential investors.",
    completed: false,
    category: "funding",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [
      { title: "Pitch Deck Template", url: "/resources/pitch-deck-template" },
      { title: "Pitch Deck Builder", url: "/startup/pitch-deck-builder" },
    ],
  },
  {
    id: "funding-6",
    title: "Set up accounting system",
    description: "Implement a system to track income, expenses, and prepare for tax obligations.",
    completed: false,
    category: "funding",
    timeEstimate: "1 week",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "Accounting Software Comparison", url: "/resources/accounting-software" }],
  },

  // Operations Phase
  {
    id: "operations-1",
    title: "Set up business location",
    description: "Secure physical space or virtual infrastructure for your business operations.",
    completed: false,
    category: "operations",
    timeEstimate: "2-4 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [
      { title: "Office Space Guide", url: "/resources/office-space" },
      { title: "Remote Work Setup", url: "/resources/remote-work" },
    ],
  },
  {
    id: "operations-2",
    title: "Establish operational processes",
    description: "Create standard operating procedures for key business functions.",
    completed: false,
    category: "operations",
    timeEstimate: "2-3 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "SOP Templates", url: "/resources/sop-templates" }],
  },
  {
    id: "operations-3",
    title: "Set up technology infrastructure",
    description: "Implement necessary software and hardware for your business operations.",
    completed: false,
    category: "operations",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "Startup Tech Stack Guide", url: "/resources/tech-stack" }],
  },
  {
    id: "operations-4",
    title: "Establish vendor relationships",
    description: "Identify and secure relationships with key suppliers and service providers.",
    completed: false,
    category: "operations",
    timeEstimate: "2-4 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Vendor Management Guide", url: "/resources/vendor-management" }],
  },
  {
    id: "operations-5",
    title: "Implement customer service processes",
    description: "Create systems to handle customer inquiries, feedback, and support.",
    completed: false,
    category: "operations",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [{ title: "Customer Service Playbook", url: "/resources/customer-service" }],
  },

  // Team Phase
  {
    id: "team-1",
    title: "Define organizational structure",
    description: "Create an organizational chart and define roles and responsibilities.",
    completed: false,
    category: "team",
    timeEstimate: "1 week",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Org Structure Templates", url: "/resources/org-structure" }],
  },
  {
    id: "team-2",
    title: "Develop hiring plan",
    description: "Identify key positions to fill and create a timeline for hiring.",
    completed: false,
    category: "team",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Hiring Plan Template", url: "/resources/hiring-plan" }],
  },
  {
    id: "team-3",
    title: "Create job descriptions",
    description: "Write detailed job descriptions for each position you need to fill.",
    completed: false,
    category: "team",
    timeEstimate: "1 week",
    difficulty: "easy",
    priority: "medium",
    resources: [{ title: "Job Description Templates", url: "/resources/job-descriptions" }],
  },
  {
    id: "team-4",
    title: "Establish compensation structure",
    description: "Develop a fair and competitive compensation plan for your team.",
    completed: false,
    category: "team",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "medium",
    resources: [{ title: "Compensation Planning Guide", url: "/resources/compensation-planning" }],
  },
  {
    id: "team-5",
    title: "Set up payroll and benefits",
    description: "Implement systems for paying employees and providing benefits.",
    completed: false,
    category: "team",
    timeEstimate: "1-2 weeks",
    difficulty: "medium",
    priority: "high",
    resources: [
      { title: "Payroll Service Comparison", url: "/resources/payroll-services" },
      { title: "Benefits Guide for Startups", url: "/resources/startup-benefits" },
    ],
  },
]

// Define categories
const categories: ChecklistCategory[] = [
  { id: "all", name: "All Tasks" },
  { id: "ideation", name: "Ideation" },
  { id: "legal", name: "Legal" },
  { id: "product", name: "Product" },
  { id: "marketing", name: "Marketing" },
  { id: "funding", name: "Funding" },
  { id: "operations", name: "Operations" },
  { id: "team", name: "Team" },
  { id: "custom", name: "Custom" },
]

export function StartupChecklist() {
  const { toast } = useToast()
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState<"priority" | "difficulty" | "category" | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [showCompleted, setShowCompleted] = useState(true)

  // New state for custom checklist item form
  const [newItem, setNewItem] = useState<Partial<ChecklistItem>>({
    title: "",
    description: "",
    category: "custom",
    timeEstimate: "1 week",
    difficulty: "medium",
    priority: "medium",
  })

  // State for editing an existing item
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null)

  // State for custom checklist name
  const [checklistName, setChecklistName] = useState<string>("My Startup Checklist")

  // Load checklist from localStorage on component mount
  useEffect(() => {
    const savedChecklist = localStorage.getItem("startupChecklist")
    const savedName = localStorage.getItem("startupChecklistName")

    if (savedChecklist) {
      setChecklist(JSON.parse(savedChecklist))
    } else {
      setChecklist(defaultChecklist)
    }

    if (savedName) {
      setChecklistName(savedName)
    }
  }, [])

  // Save checklist to localStorage whenever it changes
  useEffect(() => {
    if (checklist.length > 0) {
      localStorage.setItem("startupChecklist", JSON.stringify(checklist))
    }
  }, [checklist])

  // Save checklist name to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("startupChecklistName", checklistName)
  }, [checklistName])

  const toggleItemCompletion = (id: string) => {
    setChecklist((prevChecklist) =>
      prevChecklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    )

    const item = checklist.find((item) => item.id === id)
    if (item) {
      toast({
        title: item.completed ? "Task unmarked" : "Task completed!",
        description: item.completed ? `"${item.title}" marked as incomplete` : `"${item.title}" marked as complete`,
        variant: item.completed ? "destructive" : "default",
      })
    }
  }

  const resetChecklist = () => {
    if (
      confirm("Are you sure you want to reset your checklist? This will remove all custom items and reset progress.")
    ) {
      setChecklist(defaultChecklist)
      toast({
        title: "Checklist reset",
        description: "All items have been reset to default state",
        variant: "destructive",
      })
    }
  }

  const saveChecklist = () => {
    localStorage.setItem("startupChecklist", JSON.stringify(checklist))
    toast({
      title: "Checklist saved",
      description: "Your progress has been saved successfully",
    })
  }

  const exportChecklist = () => {
    const dataStr = JSON.stringify(
      {
        name: checklistName,
        items: checklist,
      },
      null,
      2,
    )
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = "startup-checklist.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()

    toast({
      title: "Checklist exported",
      description: "Your checklist has been downloaded as JSON",
    })
  }

  const importChecklist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const parsed = JSON.parse(content)

        if (parsed.items && Array.isArray(parsed.items)) {
          setChecklist(parsed.items)
          if (parsed.name) {
            setChecklistName(parsed.name)
          }
          toast({
            title: "Checklist imported",
            description: "Your checklist has been imported successfully",
          })
        } else {
          throw new Error("Invalid file format")
        }
      } catch (error) {
        toast({
          title: "Import failed",
          description: "The selected file is not a valid checklist",
          variant: "destructive",
        })
      }
    }
    reader.readAsText(file)

    // Reset the input
    event.target.value = ""
  }

  const addCustomItem = () => {
    if (!newItem.title) {
      toast({
        title: "Error",
        description: "Please provide a title for the task",
        variant: "destructive",
      })
      return
    }

    const newCustomItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      title: newItem.title || "",
      description: newItem.description || "",
      completed: false,
      category: (newItem.category as ChecklistItem["category"]) || "custom",
      timeEstimate: newItem.timeEstimate || "1 week",
      difficulty: (newItem.difficulty as ChecklistItem["difficulty"]) || "medium",
      priority: (newItem.priority as ChecklistItem["priority"]) || "medium",
      isCustom: true,
      resources: newItem.resources || [],
    }

    setChecklist((prev) => [...prev, newCustomItem])

    // Reset form
    setNewItem({
      title: "",
      description: "",
      category: "custom",
      timeEstimate: "1 week",
      difficulty: "medium",
      priority: "medium",
    })

    toast({
      title: "Task added",
      description: `"${newCustomItem.title}" has been added to your checklist`,
    })
  }

  const updateEditingItem = () => {
    if (!editingItem) return

    setChecklist((prev) => prev.map((item) => (item.id === editingItem.id ? editingItem : item)))

    setEditingItem(null)

    toast({
      title: "Task updated",
      description: `"${editingItem.title}" has been updated`,
    })
  }

  const deleteItem = (id: string) => {
    const itemToDelete = checklist.find((item) => item.id === id)

    if (!itemToDelete) return

    if (confirm(`Are you sure you want to delete "${itemToDelete.title}"?`)) {
      setChecklist((prev) => prev.filter((item) => item.id !== id))

      toast({
        title: "Task deleted",
        description: `"${itemToDelete.title}" has been removed from your checklist`,
        variant: "destructive",
      })
    }
  }

  // Filter items based on active tab and completed status
  const filteredChecklist = checklist
    .filter((item) => {
      // Filter by category
      if (activeTab !== "all" && item.category !== activeTab) {
        return false
      }

      // Filter by completion status
      if (!showCompleted && item.completed) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        const aValue = priorityOrder[a.priority] || 0
        const bValue = priorityOrder[b.priority] || 0
        return sortDirection === "desc" ? bValue - aValue : aValue - bValue
      }

      if (sortBy === "difficulty") {
        const difficultyOrder = { hard: 3, medium: 2, easy: 1 }
        const aValue = difficultyOrder[a.difficulty] || 0
        const bValue = difficultyOrder[b.difficulty] || 0
        return sortDirection === "desc" ? bValue - aValue : aValue - bValue
      }

      if (sortBy === "category") {
        return sortDirection === "desc" ? b.category.localeCompare(a.category) : a.category.localeCompare(b.category)
      }

      // Default sort: completed items at the bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1
      }

      // Then sort by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
    })

  const completedCount = checklist.filter((item) => item.completed).length
  const totalCount = checklist.length
  const progressPercentage = Math.round((completedCount / totalCount) * 100) || 0

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ideation":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "legal":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "product":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "marketing":
        return "bg-pink-100 text-pink-800 border-pink-200"
      case "funding":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "operations":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "team":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "custom":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{checklistName}</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Checklist Name</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Label htmlFor="checklist-name">Checklist Name</Label>
                  <Input
                    id="checklist-name"
                    value={checklistName}
                    onChange={(e) => setChecklistName(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => {
                      toast({
                        title: "Name updated",
                        description: "Your checklist name has been updated",
                      })
                    }}
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Task</DialogTitle>
                  <DialogDescription>Create a custom task for your startup checklist.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      placeholder="Enter task title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) =>
                          setNewItem({ ...newItem, category: value as ChecklistItem["category"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories
                            .filter((cat) => cat.id !== "all")
                            .map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={newItem.priority}
                        onValueChange={(value) =>
                          setNewItem({ ...newItem, priority: value as ChecklistItem["priority"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select
                        value={newItem.difficulty}
                        onValueChange={(value) =>
                          setNewItem({ ...newItem, difficulty: value as ChecklistItem["difficulty"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="timeEstimate">Time Estimate</Label>
                      <Input
                        id="timeEstimate"
                        value={newItem.timeEstimate}
                        onChange={(e) => setNewItem({ ...newItem, timeEstimate: e.target.value })}
                        placeholder="e.g., 1-2 weeks"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addCustomItem}>Add Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={saveChecklist}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export/Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={exportChecklist}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Checklist
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <label className="flex items-center cursor-pointer">
                    <input type="file" accept=".json" className="hidden" onChange={importChecklist} />
                    <Upload className="h-4 w-4 mr-2" />
                    Import Checklist
                  </label>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={resetChecklist}>
              <Trash2 className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  You've completed {completedCount} of {totalCount} tasks ({progressPercentage}%)
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show completed</span>
                <Switch checked={showCompleted} onCheckedChange={setShowCompleted} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-2" />
          </CardContent>
        </Card>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("priority")
                    setSortDirection(sortBy === "priority" && sortDirection === "desc" ? "asc" : "desc")
                  }}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Sort by Priority {sortBy === "priority" && (sortDirection === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("difficulty")
                    setSortDirection(sortBy === "difficulty" && sortDirection === "desc" ? "asc" : "desc")
                  }}
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Sort by Difficulty {sortBy === "difficulty" && (sortDirection === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortBy("category")
                    setSortDirection(sortBy === "category" && sortDirection === "desc" ? "asc" : "desc")
                  }}
                >
                  <Layers className="h-4 w-4 mr-2" />
                  Sort by Category {sortBy === "category" && (sortDirection === "desc" ? "↓" : "↑")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid gap-4">
                {filteredChecklist.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <div className="rounded-full bg-muted p-3 mb-3">
                        <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium">No tasks found</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                        {!showCompleted
                          ? "All tasks in this category are completed. Toggle 'Show completed' to view them."
                          : "There are no tasks in this category yet."}
                      </p>
                      {category.id !== "all" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Plus className="h-4 w-4 mr-2" />
                              Add Task
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Add New Task</DialogTitle>
                              <DialogDescription>Create a custom task for your startup checklist.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="title">Task Title</Label>
                                <Input
                                  id="title"
                                  value={newItem.title}
                                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                  placeholder="Enter task title"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={newItem.description}
                                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                  placeholder="Enter task description"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="category">Category</Label>
                                  <Select
                                    value={category.id}
                                    onValueChange={(value) =>
                                      setNewItem({ ...newItem, category: value as ChecklistItem["category"] })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories
                                        .filter((cat) => cat.id !== "all")
                                        .map((cat) => (
                                          <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="priority">Priority</Label>
                                  <Select
                                    value={newItem.priority}
                                    onValueChange={(value) =>
                                      setNewItem({ ...newItem, priority: value as ChecklistItem["priority"] })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="low">Low</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="difficulty">Difficulty</Label>
                                  <Select
                                    value={newItem.difficulty}
                                    onValueChange={(value) =>
                                      setNewItem({ ...newItem, difficulty: value as ChecklistItem["difficulty"] })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="easy">Easy</SelectItem>
                                      <SelectItem value="medium">Medium</SelectItem>
                                      <SelectItem value="hard">Hard</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="timeEstimate">Time Estimate</Label>
                                  <Input
                                    id="timeEstimate"
                                    value={newItem.timeEstimate}
                                    onChange={(e) => setNewItem({ ...newItem, timeEstimate: e.target.value })}
                                    placeholder="e.g., 1-2 weeks"
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button onClick={addCustomItem}>Add Task</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardContent>
                  </Card>
                ) : (
                  filteredChecklist.map((item) => (
                    <Card key={item.id} className={item.completed ? "bg-muted/50" : ""}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button type="button"
                                    onClick={() => toggleItemCompletion(item.id)}
                                    className="mt-1 flex-shrink-0"
                                    aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
                                  >
                                    {item.completed ? (
                                      <CheckCircle2 className="h-5 w-5 text-primary" />
                                    ) : (
                                      <Circle className="h-5 w-5 text-muted-foreground" />
                                    )}
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {item.completed ? "Mark as incomplete" : "Mark as complete"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <div>
                              <CardTitle className={item.completed ? "line-through text-muted-foreground" : ""}>
                                {item.title}
                              </CardTitle>
                              <CardDescription className="mt-1">{item.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-2 items-start">
                            <div className="flex flex-wrap gap-2 justify-end">
                              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                                {getPriorityIcon(item.priority)}
                                <span className="ml-1 capitalize">{item.priority}</span>
                              </Badge>
                              <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                                <span className="capitalize">{item.difficulty}</span>
                              </Badge>
                              <Badge variant="outline" className={getCategoryColor(item.category)}>
                                <span className="capitalize">{item.category}</span>
                              </Badge>
                              <Badge variant="outline">{item.timeEstimate}</Badge>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[500px]">
                                    <DialogHeader>
                                      <DialogTitle>Edit Task</DialogTitle>
                                      <DialogDescription>Make changes to this task.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-title">Task Title</Label>
                                        <Input
                                          id="edit-title"
                                          value={editingItem?.title || item.title}
                                          onChange={(e) =>
                                            setEditingItem({ ...(editingItem || item), title: e.target.value })
                                          }
                                          placeholder="Enter task title"
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Textarea
                                          id="edit-description"
                                          value={editingItem?.description || item.description}
                                          onChange={(e) =>
                                            setEditingItem({ ...(editingItem || item), description: e.target.value })
                                          }
                                          placeholder="Enter task description"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-category">Category</Label>
                                          <Select
                                            value={editingItem?.category || item.category}
                                            onValueChange={(value) =>
                                              setEditingItem({
                                                ...(editingItem || item),
                                                category: value as ChecklistItem["category"],
                                              })
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {categories
                                                .filter((cat) => cat.id !== "all")
                                                .map((category) => (
                                                  <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                  </SelectItem>
                                                ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-priority">Priority</Label>
                                          <Select
                                            value={editingItem?.priority || item.priority}
                                            onValueChange={(value) =>
                                              setEditingItem({
                                                ...(editingItem || item),
                                                priority: value as ChecklistItem["priority"],
                                              })
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="high">High</SelectItem>
                                              <SelectItem value="medium">Medium</SelectItem>
                                              <SelectItem value="low">Low</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-difficulty">Difficulty</Label>
                                          <Select
                                            value={editingItem?.difficulty || item.difficulty}
                                            onValueChange={(value) =>
                                              setEditingItem({
                                                ...(editingItem || item),
                                                difficulty: value as ChecklistItem["difficulty"],
                                              })
                                            }
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="easy">Easy</SelectItem>
                                              <SelectItem value="medium">Medium</SelectItem>
                                              <SelectItem value="hard">Hard</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="grid gap-2">
                                          <Label htmlFor="edit-timeEstimate">Time Estimate</Label>
                                          <Input
                                            id="edit-timeEstimate"
                                            value={editingItem?.timeEstimate || item.timeEstimate}
                                            onChange={(e) =>
                                              setEditingItem({
                                                ...(editingItem || item),
                                                timeEstimate: e.target.value,
                                              })
                                            }
                                            placeholder="e.g., 1-2 weeks"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => setEditingItem(null)}>
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          if (editingItem) {
                                            updateEditingItem()
                                          } else {
                                            setEditingItem(item)
                                            updateEditingItem()
                                          }
                                        }}
                                      >
                                        Save Changes
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <DropdownMenuItem onClick={() => deleteItem(item.id)}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      {item.resources && item.resources.length > 0 && (
                        <CardContent>
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-2">Resources:</p>
                            <ul className="space-y-1">
                              {item.resources.map((resource, index) => (
                                <li key={index} className="text-sm">
                                  <a
                                    href={resource.url}
                                    className="text-primary hover:underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {resource.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Checklist Summary</CardTitle>
            <CardDescription>Overview of your startup checklist progress by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories
                .filter((category) => category.id !== "all")
                .map((category) => {
                  const categoryItems = checklist.filter((item) => item.category === category.id)
                  const completedCategoryItems = categoryItems.filter((item) => item.completed)
                  const categoryProgress =
                    categoryItems.length > 0
                      ? Math.round((completedCategoryItems.length / categoryItems.length) * 100)
                      : 0

                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Badge className={`mr-2 ${getCategoryColor(category.id)}`}>{category.name}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {completedCategoryItems.length} of {categoryItems.length} tasks completed
                          </span>
                        </div>
                        <span className="text-sm font-medium">{categoryProgress}%</span>
                      </div>
                      <Progress value={categoryProgress} className="h-2" />
                    </div>
                  )
                })}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">Total progress: {progressPercentage}% complete</div>
            <Button variant="outline" size="sm" onClick={saveChecklist}>
              <Save className="h-4 w-4 mr-2" />
              Save Progress
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
