"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Plus, X, Trash2, Save, Send, MapPin, DollarSign, Clock, Users, Building, Briefcase, Star, Globe, Award, Heart, Zap, Shield, Coffee, Calendar, Target, TrendingUp, Lightbulb, Rocket, CheckCircle, GraduationCap, Code, Palette, BarChart3, Smartphone, Laptop, Headphones, Camera, Gamepad2, Music, BookOpen, Microscope, Wrench, Car, Plane, Ship, Train, Home, Hospital, School, Factory, Store, Office, Bank, Hotel, Restaurant, ShoppingCart, CreditCard, Phone, Mail, PhoneIcon, Truck, Settings } from "lucide-react"

interface JobFormData {
  title: string
  company: string
  companyId: string
  location: string
  type: string
  experience: string
  salary: string
  salaryMin: number
  salaryMax: number
  currency: string
  visaSponsorship: boolean
  remoteWork: string
  description: string
  requirements: string[]
  skills: string[]
  benefits: string[]
  department: string
  reportingTo: string
  teamSize: number
  workSchedule: string
  travelRequired: boolean
  travelPercentage: number
  equityOffered: boolean
  equityDetails: string
  stockOptions: boolean
  education: string[]
  workAuthorization: string[]
  backgroundCheck: boolean
  companyValues: string[]
  workEnvironment: string
  teamCulture: string
  growthOpportunities: string[]
  learningBudget: number
  conferenceBudget: number
  // Enhanced fields
  jobCategory: string
  subCategory: string
  seniorityLevel: string
  contractType: string
  startDate: string
  applicationDeadline: string
  hiringManager: string
  recruiter: string
  jobSource: string
  priority: string
  status: string
  featured: boolean
  urgent: boolean
  confidential: boolean
  // Compensation details
  baseSalary: number
  bonus: number
  commission: number
  equity: number
  stockOptions: number
  profitSharing: boolean
  performanceBonus: boolean
  signingBonus: number
  relocationPackage: number
  // Work details
  hoursPerWeek: number
  flexibleHours: boolean
  overtime: boolean
  weekendWork: boolean
  shiftWork: boolean
  onCall: boolean
  // Requirements
  minEducation: string
  preferredEducation: string
  yearsExperience: number
  certifications: string[]
  languages: string[]
  technicalSkills: string[]
  softSkills: string[]
  industryExperience: string[]
  // Company culture
  diversityInclusion: string[]
  workLifeBalance: string[]
  professionalDevelopment: string[]
  mentorship: boolean
  leadershipOpportunities: boolean
  innovation: boolean
  socialImpact: boolean
  // Benefits
  healthInsurance: boolean
  dentalInsurance: boolean
  visionInsurance: boolean
  lifeInsurance: boolean
  disabilityInsurance: boolean
  retirementPlan: boolean
  paidTimeOff: number
  sickLeave: number
  maternityLeave: number
  paternityLeave: number
  sabbatical: boolean
  gymMembership: boolean
  mealAllowance: boolean
  transportation: boolean
  parking: boolean
  // Application process
  applicationMethod: string
  resumeRequired: boolean
  coverLetterRequired: boolean
  portfolioRequired: boolean
  referencesRequired: boolean
  backgroundCheckRequired: boolean
  drugTestRequired: boolean
  interviewRounds: number
  interviewFormat: string[]
  // Additional info
  companySize: string
  fundingStage: string
  industry: string
  foundedYear: number
  website: string
  socialMedia: string[]
  companyDescription: string
  mission: string
  vision: string
  values: string[]
  awards: string[]
  press: string[]
  // Contact info
  contactEmail: string
  contactPhone: string
  applicationUrl: string
  linkedinUrl: string
  // International
  workFromHome: boolean
  timezone: string
  languageRequirements: string[]
  visaTypes: string[]
  // Metrics
  expectedHires: number
  budget: number
  costPerHire: number
  timeToFill: number
  source: string
  referralBonus: number
  // Compliance
  equalOpportunity: boolean
  diversityStatement: string
  accessibility: boolean
  reasonableAccommodations: boolean
  applicationSteps: string[]
  interviewProcess: string
  timeline: string
  tags: string[]
  companySize: string
  fundingStage: string
  urgency: string
  featured: boolean
  status: "draft" | "published" | "paused" | "closed"
}

// Global currencies
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", country: "United States" },
  { code: "EUR", name: "Euro", symbol: "€", country: "European Union" },
  { code: "GBP", name: "British Pound", symbol: "£", country: "United Kingdom" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", country: "Japan" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", country: "Australia" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", country: "Canada" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", country: "Switzerland" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", country: "China" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", country: "India" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", country: "Singapore" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", country: "Hong Kong" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", country: "South Korea" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", country: "New Zealand" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", country: "Sweden" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", country: "Norway" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", country: "Denmark" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł", country: "Poland" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč", country: "Czech Republic" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft", country: "Hungary" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", country: "Russia" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", country: "Brazil" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", country: "Mexico" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", country: "Argentina" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", country: "Chile" },
  { code: "COP", name: "Colombian Peso", symbol: "$", country: "Colombia" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/", country: "Peru" },
  { code: "UYU", name: "Uruguayan Peso", symbol: "$U", country: "Uruguay" },
  { code: "ZAR", name: "South African Rand", symbol: "R", country: "South Africa" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", country: "Egypt" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", country: "Nigeria" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", country: "Kenya" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵", country: "Ghana" },
  { code: "MAD", name: "Moroccan Dirham", symbol: "د.م.", country: "Morocco" },
  { code: "TND", name: "Tunisian Dinar", symbol: "د.ت", country: "Tunisia" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", country: "United Arab Emirates" },
  { code: "SAR", name: "Saudi Riyal", symbol: "ر.س", country: "Saudi Arabia" },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", country: "Qatar" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", country: "Kuwait" },
  { code: "BHD", name: "Bahraini Dinar", symbol: "د.ب", country: "Bahrain" },
  { code: "OMR", name: "Omani Rial", symbol: "ر.ع.", country: "Oman" },
  { code: "JOD", name: "Jordanian Dinar", symbol: "د.ا", country: "Jordan" },
  { code: "LBP", name: "Lebanese Pound", symbol: "ل.ل", country: "Lebanon" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", country: "Israel" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", country: "Turkey" },
  { code: "THB", name: "Thai Baht", symbol: "฿", country: "Thailand" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", country: "Vietnam" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", country: "Indonesia" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", country: "Malaysia" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", country: "Philippines" },
  { code: "TWD", name: "Taiwan Dollar", symbol: "NT$", country: "Taiwan" },
  { code: "BND", name: "Brunei Dollar", symbol: "B$", country: "Brunei" },
  { code: "MMK", name: "Myanmar Kyat", symbol: "K", country: "Myanmar" },
  { code: "LAK", name: "Lao Kip", symbol: "₭", country: "Laos" },
  { code: "KHR", name: "Cambodian Riel", symbol: "៛", country: "Cambodia" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", country: "Pakistan" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", country: "Bangladesh" },
  { code: "LKR", name: "Sri Lankan Rupee", symbol: "₨", country: "Sri Lanka" },
  { code: "NPR", name: "Nepalese Rupee", symbol: "₨", country: "Nepal" },
  { code: "BTN", name: "Bhutanese Ngultrum", symbol: "Nu.", country: "Bhutan" },
  { code: "MVR", name: "Maldivian Rufiyaa", symbol: "Rf", country: "Maldives" },
  { code: "AFN", name: "Afghan Afghani", symbol: "؋", country: "Afghanistan" },
  { code: "UZS", name: "Uzbekistani Som", symbol: "лв", country: "Uzbekistan" },
  { code: "KZT", name: "Kazakhstani Tenge", symbol: "₸", country: "Kazakhstan" },
  { code: "KGS", name: "Kyrgyzstani Som", symbol: "лв", country: "Kyrgyzstan" },
  { code: "TJS", name: "Tajikistani Somoni", symbol: "SM", country: "Tajikistan" },
  { code: "TMT", name: "Turkmenistani Manat", symbol: "T", country: "Turkmenistan" },
  { code: "MNT", name: "Mongolian Tugrik", symbol: "₮", country: "Mongolia" },
  { code: "AMD", name: "Armenian Dram", symbol: "֏", country: "Armenia" },
  { code: "AZN", name: "Azerbaijani Manat", symbol: "₼", country: "Azerbaijan" },
  { code: "GEL", name: "Georgian Lari", symbol: "₾", country: "Georgia" },
  { code: "MDL", name: "Moldovan Leu", symbol: "L", country: "Moldova" },
  { code: "UAH", name: "Ukrainian Hryvnia", symbol: "₴", country: "Ukraine" },
  { code: "BYN", name: "Belarusian Ruble", symbol: "Br", country: "Belarus" },
  { code: "BGN", name: "Bulgarian Lev", symbol: "лв", country: "Bulgaria" },
  { code: "RON", name: "Romanian Leu", symbol: "lei", country: "Romania" },
  { code: "HRK", name: "Croatian Kuna", symbol: "kn", country: "Croatia" },
  { code: "RSD", name: "Serbian Dinar", symbol: "дин", country: "Serbia" },
  { code: "BAM", name: "Bosnia-Herzegovina Mark", symbol: "КМ", country: "Bosnia and Herzegovina" },
  { code: "MKD", name: "Macedonian Denar", symbol: "ден", country: "North Macedonia" },
  { code: "ALL", name: "Albanian Lek", symbol: "L", country: "Albania" }
]

// Job categories with icons
const JOB_CATEGORIES = [
  { id: "technology", name: "Technology", icon: Code, subcategories: [
    "Software Engineering", "Data Science", "AI/ML", "Cybersecurity", "DevOps", "Cloud Computing", "Mobile Development", "Web Development", "Game Development", "Blockchain", "IoT", "AR/VR", "Robotics", "Quantum Computing"
  ]},
  { id: "design", name: "Design", icon: Palette, subcategories: [
    "UI/UX Design", "Graphic Design", "Product Design", "Industrial Design", "Fashion Design", "Interior Design", "Architecture", "Animation", "Video Production", "Photography", "Brand Design", "Web Design"
  ]},
  { id: "business", name: "Business", icon: Briefcase, subcategories: [
    "Management", "Strategy", "Operations", "Sales", "Marketing", "Finance", "Accounting", "HR", "Legal", "Consulting", "Project Management", "Business Development", "Partnerships", "Vendor Management"
  ]},
  { id: "healthcare", name: "Healthcare", icon: Heart, subcategories: [
    "Medicine", "Nursing", "Pharmacy", "Mental Health", "Public Health", "Medical Research", "Biotechnology", "Medical Devices", "Healthcare IT", "Telemedicine", "Health Policy", "Epidemiology"
  ]},
  { id: "education", name: "Education", icon: GraduationCap, subcategories: [
    "Teaching", "Curriculum Development", "Educational Technology", "Research", "Administration", "Student Services", "Training", "E-learning", "Academic Writing", "Educational Psychology", "Special Education", "Language Teaching"
  ]},
  { id: "finance", name: "Finance", icon: DollarSign, subcategories: [
    "Investment Banking", "Asset Management", "Financial Planning", "Risk Management", "Insurance", "Fintech", "Cryptocurrency", "Trading", "Auditing", "Tax", "Corporate Finance", "Venture Capital", "Private Equity", "Real Estate Finance"
  ]},
  { id: "marketing", name: "Marketing", icon: Target, subcategories: [
    "Digital Marketing", "Content Marketing", "Social Media", "SEO/SEM", "Brand Management", "Product Marketing", "Growth Marketing", "Email Marketing", "Influencer Marketing", "Event Marketing", "Public Relations", "Market Research"
  ]},
  { id: "sales", name: "Sales", icon: TrendingUp, subcategories: [
    "Account Management", "Business Development", "Inside Sales", "Outside Sales", "Channel Sales", "Sales Operations", "Customer Success", "Partnership Sales", "Retail Sales", "B2B Sales", "B2C Sales", "Enterprise Sales"
  ]},
  { id: "operations", name: "Operations", icon: Settings, subcategories: [
    "Supply Chain", "Logistics", "Manufacturing", "Quality Assurance", "Process Improvement", "Vendor Management", "Inventory Management", "Facilities Management", "Safety", "Compliance", "Risk Management", "Project Management"
  ]},
  { id: "customer-service", name: "Customer Service", icon: Headphones, subcategories: [
    "Customer Support", "Technical Support", "Customer Success", "Account Management", "Call Center", "Live Chat", "Email Support", "Social Media Support", "Customer Experience", "Retention", "Onboarding", "Training"
  ]},
  { id: "media", name: "Media & Communications", icon: Camera, subcategories: [
    "Journalism", "Content Creation", "Social Media", "Public Relations", "Broadcasting", "Publishing", "Advertising", "Film & TV", "Podcasting", "Writing", "Editing", "Translation"
  ]},
  { id: "entertainment", name: "Entertainment", icon: Music, subcategories: [
    "Music", "Film", "Television", "Gaming", "Sports", "Theater", "Events", "Streaming", "Production", "Talent Management", "Booking", "Promotion"
  ]},
  { id: "retail", name: "Retail & E-commerce", icon: ShoppingCart, subcategories: [
    "Store Management", "E-commerce", "Merchandising", "Buying", "Inventory", "Customer Service", "Visual Merchandising", "Supply Chain", "Fulfillment", "Returns", "Analytics", "Omnichannel"
  ]},
  { id: "hospitality", name: "Hospitality & Tourism", icon: Hotel, subcategories: [
    "Hotel Management", "Restaurant", "Travel", "Event Planning", "Tourism", "Catering", "Guest Services", "Concierge", "Reservations", "Revenue Management", "Food & Beverage", "Spa & Wellness"
  ]},
  { id: "transportation", name: "Transportation & Logistics", icon: Truck, subcategories: [
    "Logistics", "Supply Chain", "Fleet Management", "Warehousing", "Shipping", "Freight", "Last Mile", "International Trade", "Customs", "Distribution", "Inventory Management", "Route Planning"
  ]},
  { id: "real-estate", name: "Real Estate", icon: Home, subcategories: [
    "Sales", "Property Management", "Development", "Investment", "Brokerage", "Appraisal", "Leasing", "Commercial", "Residential", "Land", "Construction", "Architecture"
  ]},
  { id: "nonprofit", name: "Non-profit & Social Impact", icon: Heart, subcategories: [
    "Program Management", "Fundraising", "Grant Writing", "Volunteer Management", "Advocacy", "Community Outreach", "Policy", "Research", "Education", "Healthcare", "Environment", "Human Rights"
  ]},
  { id: "government", name: "Government & Public Sector", icon: Building, subcategories: [
    "Public Administration", "Policy", "Legislative", "Regulatory", "Public Safety", "Social Services", "Infrastructure", "Economic Development", "International Relations", "Defense", "Intelligence", "Diplomacy"
  ]},
  { id: "consulting", name: "Consulting", icon: Lightbulb, subcategories: [
    "Management Consulting", "Strategy", "Technology Consulting", "Financial Consulting", "HR Consulting", "Marketing Consulting", "Operations Consulting", "Change Management", "Process Improvement", "Digital Transformation", "Sustainability", "Risk Management"
  ]},
  { id: "research", name: "Research & Development", icon: Microscope, subcategories: [
    "Scientific Research", "Product Development", "R&D Management", "Laboratory", "Clinical Research", "Market Research", "User Research", "Data Analysis", "Innovation", "Patent Research", "Quality Control", "Testing"
  ]}
]

interface ComprehensiveJobFormProps {
  onSubmit: (jobData: JobFormData) => void
  onCancel: () => void
  initialData?: Partial<JobFormData>
  isEditing?: boolean
}

export function ComprehensiveJobForm({ 
  onSubmit, 
  onCancel, 
  initialData = {}, 
  isEditing = false 
}: ComprehensiveJobFormProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    company: "",
    companyId: "",
    location: "",
    type: "Full-time",
    experience: "Mid-level",
    salary: "",
    salaryMin: 0,
    salaryMax: 0,
    currency: "USD",
    visaSponsorship: false,
    remoteWork: "Hybrid",
    description: "",
    requirements: [""],
    skills: [],
    benefits: [],
    department: "",
    reportingTo: "",
    teamSize: 1,
    workSchedule: "Standard",
    travelRequired: false,
    travelPercentage: 0,
    equityOffered: false,
    equityDetails: "",
    stockOptions: false,
    education: [],
    workAuthorization: [],
    backgroundCheck: false,
    companyValues: [],
    workEnvironment: "",
    teamCulture: "",
    growthOpportunities: [],
    learningBudget: 0,
    conferenceBudget: 0,
    applicationSteps: [""],
    interviewProcess: "",
    timeline: "",
    tags: [],
    industry: "",
    companySize: "",
    fundingStage: "",
    urgency: "Medium",
    featured: false,
    status: "draft",
    ...initialData
  })

  const [newRequirement, setNewRequirement] = useState("")
  const [newSkill, setNewSkill] = useState("")
  const [newBenefit, setNewBenefit] = useState("")
  const [newEducation, setNewEducation] = useState("")
  const [newWorkAuth, setNewWorkAuth] = useState("")
  const [newCompanyValue, setNewCompanyValue] = useState("")
  const [newGrowthOpp, setNewGrowthOpp] = useState("")
  const [newApplicationStep, setNewApplicationStep] = useState("")
  const [newTag, setNewTag] = useState("")

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: keyof JobFormData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }))
    }
  }

  const removeArrayItem = (field: keyof JobFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    // Basic validation
    if (!formData.title || !formData.company || !formData.description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      })
      return
    }

    // Calculate salary range
    const salaryParts = formData.salary.split("-")
    if (salaryParts.length === 2) {
      formData.salaryMin = parseInt(salaryParts[0].replace(/[^0-9]/g, "")) || 0
      formData.salaryMax = parseInt(salaryParts[1].replace(/[^0-9]/g, "")) || 0
    }

    onSubmit(formData)
    toast({
      title: isEditing ? "Job Updated" : "Job Created",
      description: `Your job posting has been ${isEditing ? 'updated' : 'created'} successfully.`,
    })
  }

  const steps = [
    { id: 1, title: "Basic Information", description: "Job title, company, and location" },
    { id: 2, title: "Job Details", description: "Type, experience, salary, and description" },
    { id: 3, title: "Requirements", description: "Skills, education, and requirements" },
    { id: 4, title: "Benefits & Culture", description: "Perks, values, and work environment" },
    { id: 5, title: "Application Process", description: "Steps, timeline, and interview process" },
    { id: 6, title: "Review & Publish", description: "Final review and publishing options" }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          {isEditing ? "Edit Job Posting" : "Create New Job Posting"}
        </h2>
        <p className="text-gray-600">
          Fill out the form below to create a comprehensive job posting
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                currentStep >= step.id 
                  ? 'bg-[#0F7377] border-[#0F7377] text-white' 
                  : 'border-gray-300 text-gray-500'
              }`}>
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  currentStep > step.id ? 'bg-[#0F7377]' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">{steps[currentStep - 1].title}</h3>
          <p className="text-sm text-gray-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={currentStep.toString()} onValueChange={(value) => setCurrentStep(parseInt(value))}>
            <TabsList className="grid w-full grid-cols-6 mb-6">
              {steps.map((step) => (
                <TabsTrigger key={step.id} value={step.id.toString()}>
                  {step.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Step 1: Basic Information */}
            <TabsContent value="1" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="e.g., TechNova Solutions"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Singapore"
                  />
                </div>
                <div>
                  <Label htmlFor="industry">Industry *</Label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                  rows={4}
                />
              </div>
            </TabsContent>

            {/* Step 2: Job Details */}
            <TabsContent value="2" className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Job Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Experience Level *</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry">Entry Level</SelectItem>
                      <SelectItem value="Mid-level">Mid-level</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Salary Range *</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="e.g., $8,000 - $12,000"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{currency.symbol}</span>
                            <span>{currency.code}</span>
                            <span className="text-sm text-gray-500">- {currency.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="remoteWork">Remote Work</Label>
                  <Select value={formData.remoteWork} onValueChange={(value) => handleInputChange('remoteWork', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="On-site">On-site</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobCategory">Job Category *</Label>
                  <Select value={formData.jobCategory} onValueChange={(value) => handleInputChange('jobCategory', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {JOB_CATEGORIES.map((category) => {
                        const IconComponent = category.icon
                        return (
                          <SelectItem key={category.id} value={category.id}>
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subCategory">Sub Category</Label>
                  <Select 
                    value={formData.subCategory} 
                    onValueChange={(value) => handleInputChange('subCategory', value)}
                    disabled={!formData.jobCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub category" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {formData.jobCategory && JOB_CATEGORIES
                        .find(cat => cat.id === formData.jobCategory)
                        ?.subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="visaSponsorship"
                    checked={formData.visaSponsorship}
                    onCheckedChange={(checked) => handleInputChange('visaSponsorship', checked)}
                  />
                  <Label htmlFor="visaSponsorship">Visa Sponsorship Available</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange('featured', checked)}
                  />
                  <Label htmlFor="featured">Featured Job</Label>
                </div>
              </div>
            </TabsContent>

            {/* Step 3: Requirements */}
            <TabsContent value="3" className="space-y-6">
              <div>
                <Label>Required Skills *</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addArrayItem('skills', newSkill)
                        setNewSkill('')
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addArrayItem('skills', newSkill)
                      setNewSkill('')
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeArrayItem('skills', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Requirements *</Label>
                <div className="space-y-2">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={req}
                        onChange={(e) => {
                          const newReqs = [...formData.requirements]
                          newReqs[index] = e.target.value
                          handleInputChange('requirements', newReqs)
                        }}
                        placeholder="Enter a requirement"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('requirements', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleInputChange('requirements', [...formData.requirements, ''])}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </div>
              </div>

              <div>
                <Label>Education Requirements</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newEducation}
                    onChange={(e) => setNewEducation(e.target.value)}
                    placeholder="Add education requirement"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addArrayItem('education', newEducation)
                        setNewEducation('')
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addArrayItem('education', newEducation)
                      setNewEducation('')
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.education.map((edu, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {edu}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeArrayItem('education', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Step 4: Benefits & Culture */}
            <TabsContent value="4" className="space-y-6">
              <div>
                <Label>Benefits & Perks</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Add a benefit"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addArrayItem('benefits', newBenefit)
                        setNewBenefit('')
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      addArrayItem('benefits', newBenefit)
                      setNewBenefit('')
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {benefit}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeArrayItem('benefits', index)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="learningBudget">Learning Budget</Label>
                  <Input
                    id="learningBudget"
                    type="number"
                    value={formData.learningBudget}
                    onChange={(e) => handleInputChange('learningBudget', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="conferenceBudget">Conference Budget</Label>
                  <Input
                    id="conferenceBudget"
                    type="number"
                    value={formData.conferenceBudget}
                    onChange={(e) => handleInputChange('conferenceBudget', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workEnvironment">Work Environment</Label>
                <Textarea
                  id="workEnvironment"
                  value={formData.workEnvironment}
                  onChange={(e) => handleInputChange('workEnvironment', e.target.value)}
                  placeholder="Describe the work environment and culture..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="teamCulture">Team Culture</Label>
                <Textarea
                  id="teamCulture"
                  value={formData.teamCulture}
                  onChange={(e) => handleInputChange('teamCulture', e.target.value)}
                  placeholder="Describe the team culture and values..."
                  rows={3}
                />
              </div>
            </TabsContent>

            {/* Step 5: Application Process */}
            <TabsContent value="5" className="space-y-6">
              <div>
                <Label>Application Process Steps</Label>
                <div className="space-y-2">
                  {formData.applicationSteps.map((step, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={step}
                        onChange={(e) => {
                          const newSteps = [...formData.applicationSteps]
                          newSteps[index] = e.target.value
                          handleInputChange('applicationSteps', newSteps)
                        }}
                        placeholder="Enter a step in the application process"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('applicationSteps', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleInputChange('applicationSteps', [...formData.applicationSteps, ''])}
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Step
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="interviewProcess">Interview Process</Label>
                  <Input
                    id="interviewProcess"
                    value={formData.interviewProcess}
                    onChange={(e) => handleInputChange('interviewProcess', e.target.value)}
                    placeholder="e.g., 3 rounds over 2 weeks"
                  />
                </div>
                <div>
                  <Label htmlFor="timeline">Hiring Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    placeholder="e.g., Hiring within 4-6 weeks"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Step 6: Review & Publish */}
            <TabsContent value="6" className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Job Posting Preview</h3>
                <div className="space-y-2">
                  <p><strong>Title:</strong> {formData.title}</p>
                  <p><strong>Company:</strong> {formData.company}</p>
                  <p><strong>Location:</strong> {formData.location}</p>
                  <p><strong>Type:</strong> {formData.type}</p>
                  <p><strong>Experience:</strong> {formData.experience}</p>
                  <p><strong>Salary:</strong> {formData.salary}</p>
                  <p><strong>Remote Work:</strong> {formData.remoteWork}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="publishNow"
                    checked={formData.status === 'published'}
                    onCheckedChange={(checked) => handleInputChange('status', checked ? 'published' : 'draft')}
                  />
                  <Label htmlFor="publishNow">Publish immediately</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              {currentStep < 6 ? (
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                  <Send className="h-4 w-4 mr-2" />
                  {isEditing ? 'Update Job' : 'Create Job'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}