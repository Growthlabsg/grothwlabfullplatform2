"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { 
  Building, 
  Briefcase, 
  Globe, 
  MapPin, 
  Calendar, 
  Target, 
  Users, 
  DollarSign, 
  Award, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  X
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { BusinessPageService } from "@/lib/business-page-service"
import { useAuth } from "@/contexts/auth-context"
import type { CreateBusinessPageFormData } from "@/types/business-page"
import { 
  BasicInformationStep, 
  CompanyDetailsStep, 
  MissionVisionStep, 
  BusinessDetailsStep, 
  ProductInformationStep,
  ContactSocialStep, 
  TeamFoundersStep,
  FundingInvestorsStep,
  JobsUpdatesStep,
  AchievementsStep, 
  ReviewStep 
} from "./business-form-steps"
import { 
  MarketAnalysisStep,
  CompanyCultureStep,
  OfficeLocationsStep
} from "./additional-form-steps"

const formSchema = z.object({
  // Basic Information
  name: z.string().min(2, "Business name must be at least 2 characters").max(100),
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(30, "Handle must be at most 30 characters")
    .regex(/^[a-z0-9-]+$/, "Handle can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  tagline: z.string().max(100, "Tagline must be at most 100 characters").optional(),
  longDescription: z.string().max(2000, "Long description must be at most 2000 characters").optional(),
  
  // Company Details
  industry: z.string().min(1, "Please select an industry"),
  size: z.string().min(1, "Please select a company size"),
  companyStage: z.string().optional(),
  legalStructure: z.string().optional(),
  foundedYear: z
    .number()
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional()
    .or(z.string().regex(/^\d+$/).transform(Number).optional()),
  
  // Location & Contact
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)).optional(),
  location: z.string().optional(),
  headquarters: z.string().optional(),
  timezone: z.string().optional(),
  remoteWork: z.boolean().optional(),
  
  // Mission & Vision
  mission: z.string().max(500, "Mission must be at most 500 characters").optional(),
  vision: z.string().max(500, "Vision must be at most 500 characters").optional(),
  values: z.array(z.string()).optional(),
  
  // Business Details
  specialties: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  targetAudience: z.string().max(300, "Target audience must be at most 300 characters").optional(),
  businessModel: z.string().optional(),
  fundingStage: z.string().optional(),
  revenue: z.string().optional(),
  funding: z.string().optional(),
  
  // Social Media
  socialMedia: z.object({
    linkedin: z.string().url("Please enter a valid LinkedIn URL").or(z.string().length(0)).optional(),
    twitter: z.string().url("Please enter a valid Twitter URL").or(z.string().length(0)).optional(),
    facebook: z.string().url("Please enter a valid Facebook URL").or(z.string().length(0)).optional(),
    instagram: z.string().url("Please enter a valid Instagram URL").or(z.string().length(0)).optional(),
  }).optional(),
  
  // Contact Information
  contactInfo: z.object({
    email: z.string().email("Please enter a valid email").or(z.string().length(0)).optional(),
    phone: z.string().optional(),
    address: z.string().max(200, "Address must be at most 200 characters").optional(),
  }).optional(),
  
  // Achievements
  certifications: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  partnerships: z.array(z.string()).optional(),
  
  // Key Metrics
  keyMetrics: z.object({
    customers: z.number().min(0).optional(),
    revenue: z.number().min(0).optional(),
    growth: z.number().min(0).max(1000).optional(),
    mrr: z.number().min(0).optional(), // Monthly Recurring Revenue
    arr: z.number().min(0).optional(), // Annual Recurring Revenue
    churn: z.number().min(0).max(100).optional(), // Monthly churn rate
    ltv: z.number().min(0).optional(), // Customer Lifetime Value
    cac: z.number().min(0).optional(), // Customer Acquisition Cost
    burnRate: z.number().min(0).optional(), // Monthly burn rate
    runway: z.number().min(0).optional(), // Months of runway
    valuation: z.number().min(0).optional(), // Company valuation
    lastFundingDate: z.string().optional(),
    nextMilestone: z.string().optional(),
  }).optional(),
  
  // Additional
  languages: z.array(z.string()).optional(),
  
  // Startup Profile Fields
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  verified: z.boolean().optional(),
  
  // Founders
  founders: z.array(z.object({
    name: z.string().min(1, "Founder name is required"),
    title: z.string().min(1, "Founder title is required"),
    bio: z.string().min(10, "Founder bio must be at least 10 characters"),
    avatar: z.string().optional(),
    linkedin: z.string().url("Please enter a valid LinkedIn URL").or(z.string().length(0)).optional(),
  })).optional(),
  
  // Investors
  investors: z.array(z.object({
    name: z.string().min(1, "Investor name is required"),
    type: z.string().min(1, "Investor type is required"),
    logo: z.string().optional(),
  })).optional(),
  
  // Team
  team: z.array(z.object({
    name: z.string().min(1, "Team member name is required"),
    role: z.string().min(1, "Team member role is required"),
    department: z.string().min(1, "Department is required"),
    avatar: z.string().optional(),
  })).optional(),
  
  // Jobs
  jobs: z.array(z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Job title is required"),
    department: z.string().min(1, "Department is required"),
    type: z.string().min(1, "Job type is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(10, "Job description must be at least 10 characters"),
    requirements: z.array(z.string()).optional(),
    posted: z.string().optional(),
  })).optional(),
  
  // Updates
  updates: z.array(z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Update title is required"),
    content: z.string().min(10, "Update content must be at least 10 characters"),
    date: z.string().optional(),
    author: z.string().min(1, "Author is required"),
  })).optional(),
  
  // Milestones
  milestones: z.array(z.object({
    title: z.string().min(1, "Milestone title is required"),
    date: z.string().min(1, "Milestone date is required"),
    description: z.string().min(10, "Milestone description must be at least 10 characters"),
  })).optional(),
  
  // Additional comprehensive startup details
  targetMarket: z.string().max(500, "Target market must be at most 500 characters").optional(),
  competitiveAdvantage: z.string().max(500, "Competitive advantage must be at most 500 characters").optional(),
  technologyStack: z.array(z.string()).optional(),
  patents: z.array(z.string()).optional(),
  officeLocations: z.array(z.object({
    city: z.string().min(1, "City is required"),
    address: z.string().min(1, "Address is required"),
    type: z.string().min(1, "Office type is required"),
    employees: z.number().min(0, "Employee count must be positive"),
  })).optional(),
  culture: z.object({
    values: z.array(z.string()).optional(),
    perks: z.array(z.string()).optional(),
    teamSize: z.number().min(0).optional(),
    averageAge: z.number().min(0).optional(),
    diversity: z.object({
      gender: z.object({
        male: z.number().min(0).max(100),
        female: z.number().min(0).max(100),
      }).optional(),
      ethnicity: z.object({
        asian: z.number().min(0).max(100),
        caucasian: z.number().min(0).max(100),
        other: z.number().min(0).max(100),
      }).optional(),
    }).optional(),
  }).optional(),
  product: z.object({
    name: z.string().max(100, "Product name must be at most 100 characters").optional(),
    description: z.string().max(1000, "Product description must be at most 1000 characters").optional(),
    features: z.array(z.string()).optional(),
    pricing: z.object({
      starter: z.string().optional(),
      professional: z.string().optional(),
      enterprise: z.string().optional(),
    }).optional(),
    integrations: z.array(z.string()).optional(),
  }).optional(),
  market: z.object({
    totalAddressableMarket: z.number().min(0).optional(),
    serviceableAddressableMarket: z.number().min(0).optional(),
    serviceableObtainableMarket: z.number().min(0).optional(),
    marketGrowth: z.number().min(0).max(1000).optional(),
    competition: z.array(z.string()).optional(),
  }).optional(),
})

interface CreateBusinessPageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STEPS = [
  { id: 1, title: "Basic Information", description: "Company name and basic details" },
  { id: 2, title: "Company Details", description: "Industry, size, and structure" },
  { id: 3, title: "Mission & Vision", description: "Your company's purpose and goals" },
  { id: 4, title: "Business Details", description: "Services, specialties, and target audience" },
  { id: 5, title: "Product Information", description: "Product features, pricing, and integrations" },
  { id: 6, title: "Market Analysis", description: "Target market, competition, and technology" },
  { id: 7, title: "Contact & Social", description: "How people can reach you" },
  { id: 8, title: "Team & Founders", description: "Key team members and founders" },
  { id: 9, title: "Funding & Investors", description: "Funding information and investors" },
  { id: 10, title: "Company Culture", description: "Values, perks, and team diversity" },
  { id: 11, title: "Office Locations", description: "Physical locations and remote work" },
  { id: 12, title: "Jobs & Updates", description: "Open positions and company updates" },
  { id: 13, title: "Achievements", description: "Awards, certifications, and partnerships" },
  { id: 14, title: "Review & Create", description: "Review all information and create your page" },
]

export function CreateBusinessPageDialog({ open, onOpenChange }: CreateBusinessPageDialogProps) {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [newValue, setNewValue] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      handle: "",
      description: "",
      tagline: "",
      longDescription: "",
      industry: "",
      size: "",
      companyStage: "",
      legalStructure: "",
      foundedYear: undefined,
      website: "",
      location: "",
      headquarters: "",
      timezone: "",
      remoteWork: false,
      mission: "",
      vision: "",
      values: [],
      specialties: [],
      services: [],
      targetAudience: "",
      businessModel: "",
      fundingStage: "",
      revenue: "",
      funding: "",
      socialMedia: {
        linkedin: "",
        twitter: "",
        facebook: "",
        instagram: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        address: "",
      },
      certifications: [],
      awards: [],
      partnerships: [],
      keyMetrics: {
        customers: undefined,
        revenue: undefined,
        growth: undefined,
        mrr: undefined,
        arr: undefined,
        churn: undefined,
        ltv: undefined,
        cac: undefined,
        burnRate: undefined,
        runway: undefined,
        valuation: undefined,
        lastFundingDate: "",
        nextMilestone: "",
      },
      languages: [],
      tags: [],
      featured: false,
      verified: false,
      founders: [],
      investors: [],
      team: [],
      jobs: [],
      updates: [],
      milestones: [],
      // Additional comprehensive startup details
      targetMarket: "",
      competitiveAdvantage: "",
      technologyStack: [],
      patents: [],
      officeLocations: [],
      culture: {
        values: [],
        perks: [],
        teamSize: undefined,
        averageAge: undefined,
        diversity: {
          gender: { male: 0, female: 0 },
          ethnicity: { asian: 0, caucasian: 0, other: 0 },
        },
      },
      product: {
        name: "",
        description: "",
        features: [],
        pricing: {
          starter: "",
          professional: "",
          enterprise: "",
        },
        integrations: [],
      },
      market: {
        totalAddressableMarket: undefined,
        serviceableAddressableMarket: undefined,
        serviceableObtainableMarket: undefined,
        marketGrowth: undefined,
        competition: [],
      },
    },
  })

  // Helper functions
  const addToArray = (field: string, value: string) => {
    if (value.trim()) {
      const currentValues = form.getValues(field as any) || []
      form.setValue(field as any, [...currentValues, value.trim()])
      setNewValue("")
    }
  }

  const removeFromArray = (field: string, index: number) => {
    const currentValues = form.getValues(field as any) || []
    form.setValue(field as any, currentValues.filter((_: any, i: number) => i !== index))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a business page.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const formData: CreateBusinessPageFormData = {
        ...values as any,
        foundedYear: values.foundedYear ? Number(values.foundedYear) : undefined,
        jobs: values.jobs?.map(job => ({
          ...job,
          id: job.id || `job-${Date.now()}`,
          requirements: job.requirements || [],
          posted: job.posted || new Date().toISOString().split('T')[0],
        })).filter(job => job.posted) as Array<{ id: string; title: string; department: string; type: string; location: string; description: string; requirements: string[]; posted: string; }> || [],
        updates: values.updates?.map(update => ({
          ...update,
          id: update.id || `update-${Date.now()}`,
          date: update.date || new Date().toISOString().split('T')[0],
        })).filter(update => update.date) as Array<{ id: string; title: string; content: string; date: string; author: string; }> || [],
      }

      const newPage = await BusinessPageService.createBusinessPage(user.id, formData)

      toast({
        title: "Business page created",
        description: `${newPage.name} has been created successfully.`,
      })

      onOpenChange(false)
      router.push(`/business/${newPage.handle}`)
    } catch (error) {
      console.error("Error creating business page:", error)
      toast({
        title: "Error",
        description: "Failed to create business page. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Generate handle from name
  const generateHandle = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicInformationStep form={form} generateHandle={generateHandle} />
      case 2:
        return <CompanyDetailsStep form={form} />
      case 3:
        return <MissionVisionStep form={form} addToArray={addToArray} removeFromArray={removeFromArray} newValue={newValue} setNewValue={setNewValue} />
      case 4:
        return <BusinessDetailsStep form={form} addToArray={addToArray} removeFromArray={removeFromArray} newValue={newValue} setNewValue={setNewValue} />
      case 5:
        return <ProductInformationStep form={form} />
      case 6:
        return <MarketAnalysisStep form={form} />
      case 7:
        return <ContactSocialStep form={form} />
      case 8:
        return <TeamFoundersStep form={form} addToArray={addToArray} removeFromArray={removeFromArray} newValue={newValue} setNewValue={setNewValue} />
      case 9:
        return <FundingInvestorsStep form={form} addToArray={addToArray} removeFromArray={removeFromArray} newValue={newValue} setNewValue={setNewValue} />
      case 10:
        return <CompanyCultureStep form={form} />
      case 11:
        return <OfficeLocationsStep form={form} />
      case 12:
        return <JobsUpdatesStep form={form} addToArray={addToArray} removeFromArray={removeFromArray} newValue={newValue} setNewValue={setNewValue} />
      case 13:
        return <AchievementsStep form={form} addToArray={addToArray} removeFromArray={removeFromArray} newValue={newValue} setNewValue={setNewValue} />
      case 14:
        return <ReviewStep form={form} />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Building className="h-6 w-6 text-[#0F7377]" />
            Create a Professional Business Page
          </DialogTitle>
          <DialogDescription>
            Build a comprehensive business profile that showcases your company professionally.
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-[#0F7377] h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{STEPS[currentStep - 1]?.title}</span>
          </div>
          <div className="text-sm text-gray-500">
            {Math.round((currentStep / STEPS.length) * 100)}% Complete
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
            {renderStepContent() || <div>Loading...</div>}

            <DialogFooter className="flex justify-between">
              <div className="flex gap-2">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                )}
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </div>
              
              <div className="flex gap-2">
                {currentStep < STEPS.length ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Business Page"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
