"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { 
  User, Building2, Globe, Video, FileText, Upload, 
  CheckCircle, AlertCircle, ArrowRight, Users, DollarSign,
  Target, Lightbulb, TrendingUp, MapPin, Calendar, Code
} from "lucide-react"
import { logActivity } from "@/lib/activity-logger"
import { z } from "zod"

// Comprehensive validation schema
const applicationSchema = z.object({
  // Founders Section
  founderName: z.string().min(1, "Founder name is required"),
  founderEmail: z.string().email("Valid email is required"),
  founderLinkedIn: z.string().optional(),
  founderBio: z.string().min(50, "Bio must be at least 50 characters"),
  coFounders: z.string().optional(),
  technicalWork: z.string().min(100, "Please explain who writes code and technical work"),
  lookingForCofounder: z.boolean(),
  
  // Company Section
  companyName: z.string().min(1, "Company name is required"),
  companyDescription: z.string().max(50, "Description must be 50 characters or less"),
  companyUrl: z.string().url("Valid URL required").optional().or(z.literal("")),
  productDescription: z.string().min(200, "Product description must be at least 200 characters"),
  location: z.string().min(1, "Location is required"),
  locationReason: z.string().min(100, "Please explain your location decision"),
  
  // Progress Section
  progressStage: z.enum(["idea", "prototype", "beta", "launched", "scaling"]),
  workingTime: z.string().min(50, "Please explain how long you've been working on this"),
  techStack: z.string().min(100, "Please describe your tech stack"),
  hasUsers: z.boolean(),
  hasRevenue: z.boolean(),
  previousApplication: z.string().optional(),
  incubatorParticipation: z.string().optional(),
  
  // Idea Section
  whyThisIdea: z.string().min(200, "Please explain why you chose this idea"),
  competitors: z.string().min(150, "Please describe your competitors"),
  businessModel: z.string().min(150, "Please explain your business model"),
  category: z.enum([
    "ai-ml", "fintech", "healthtech", "edtech", "ecommerce", 
    "saas", "marketplace", "hardware", "biotech", "cleantech", "other"
  ]),
  otherIdeas: z.string().optional(),
  
  // Equity Section
  hasLegalEntity: z.boolean(),
  hasInvestment: z.boolean(),
  isFundraising: z.boolean(),
  
  // GrowthLab Interest
  whyGrowthLab: z.string().min(150, "Please explain why you want to join GrowthLab"),
  heardAboutGrowthLab: z.string().min(50, "Please tell us how you heard about GrowthLab"),
  
  // Media Files
  founderVideo: z.any().optional(),
  demoVideo: z.any().optional(),
  pitchDeck: z.any().optional(),
  
  // Terms
  termsAgreed: z.boolean().refine(val => val === true, "You must agree to the terms"),
})

type ApplicationFormData = z.infer<typeof applicationSchema>

export default function AcceleratorApplicationClient() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formProgress, setFormProgress] = useState(0)
  
  const founderVideoRef = useRef<HTMLInputElement>(null)
  const demoVideoRef = useRef<HTMLInputElement>(null)
  const pitchDeckRef = useRef<HTMLInputElement>(null)

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      founderName: user?.displayName || "",
      founderEmail: user?.email || "",
      founderLinkedIn: "",
      founderBio: "",
      coFounders: "",
      technicalWork: "",
      lookingForCofounder: false,
      companyName: "",
      companyDescription: "",
      companyUrl: "",
      productDescription: "",
      location: "",
      locationReason: "",
      progressStage: "idea",
      workingTime: "",
      techStack: "",
      hasUsers: false,
      hasRevenue: false,
      previousApplication: "",
      incubatorParticipation: "",
      whyThisIdea: "",
      competitors: "",
      businessModel: "",
      category: "other",
      otherIdeas: "",
      hasLegalEntity: false,
      hasInvestment: false,
      isFundraising: false,
      whyGrowthLab: "",
      heardAboutGrowthLab: "",
      termsAgreed: false,
    },
  })

  const steps = [
    { id: 1, title: "Founders", icon: User },
    { id: 2, title: "Company", icon: Building2 },
    { id: 3, title: "Progress", icon: TrendingUp },
    { id: 4, title: "Idea", icon: Lightbulb },
    { id: 5, title: "Equity", icon: DollarSign },
    { id: 6, title: "Media", icon: Video },
    { id: 7, title: "Review", icon: CheckCircle },
  ]

  const handleFileUpload = (field: string, file: File) => {
    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      toast({
        title: "File too large",
        description: "File size must be under 100MB",
        variant: "destructive",
      })
      return
    }
    
    form.setValue(field as any, file)
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully`,
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      setFormProgress((currentStep / steps.length) * 100)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setFormProgress(((currentStep - 2) / steps.length) * 100)
    }
  }

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (user) {
        logActivity(
          "application_submit" as any,
          user.id,
          user.email,
          `GrowthLab application submitted for ${data.companyName}`,
          { companyName: data.companyName },
          "info",
        )
      }

      toast({
        title: "Application Submitted Successfully!",
        description: "Thank you for applying to GrowthLab. We'll review your application and get back to you within 2 weeks.",
      })

      router.push("/accelerator/apply/success")
    } catch (error) {
      console.error("Application submission error:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Founders
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Founder Information</h3>
              <p className="text-gray-600">Tell us about yourself and your team</p>
            </div>
            
            <FormField
              control={form.control}
              name="founderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="founderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="founderLinkedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="founderBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your background, experience, and what drives you as an entrepreneur..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 50 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coFounders"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Co-founders</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List your co-founders and their roles (if any)"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="technicalWork"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technical Work *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Who writes code or does technical work on your product? Was any of it done by non-founders?"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 100 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lookingForCofounder"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel>Are you looking for a co-founder?</FormLabel>
                    <FormDescription>
                      Check this if you're actively seeking a co-founder to join your team
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )

      case 2: // Company
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h3>
              <p className="text-gray-600">Tell us about your company and product</p>
            </div>
            
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description *</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Describe what your company does in 50 characters or less"
                      maxLength={50}
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Maximum 50 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourcompany.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What is your company going to make? Describe your product and what it does or will do..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 200 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="locationReason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Decision *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain your decision regarding location and where the company will be based..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 100 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 3: // Progress
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Progress & Development</h3>
              <p className="text-gray-600">How far along are you in your journey?</p>
            </div>
            
            <FormField
              control={form.control}
              name="progressStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Stage *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your current stage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="idea">Just an idea</SelectItem>
                      <SelectItem value="prototype">Prototype/MVP</SelectItem>
                      <SelectItem value="beta">Beta testing</SelectItem>
                      <SelectItem value="launched">Launched with users</SelectItem>
                      <SelectItem value="scaling">Scaling and growing</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Working Time *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How long have you been working on this? How much of that has been full-time?"
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 50 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techStack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Stack *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What tech stack are you using or planning to use? Include AI models and coding tools..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 100 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="hasUsers"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Do you have users?</FormLabel>
                      <FormDescription>
                        Are people currently using your product?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasRevenue"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Do you have revenue?</FormLabel>
                      <FormDescription>
                        Is your company generating revenue?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="previousApplication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Applications</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="If you applied with the same idea before, what changed? If different idea, why did you pivot?"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incubatorParticipation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Program Participation</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Have you participated in any incubator, accelerator, or pre-accelerator programs?"
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 4: // Idea
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Idea & Market</h3>
              <p className="text-gray-600">Tell us about your idea and market understanding</p>
            </div>
            
            <FormField
              control={form.control}
              name="whyThisIdea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why This Idea? *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Why did you pick this idea to work on? Do you have domain expertise in this area?"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 200 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="competitors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competitors *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Who are your competitors? What do you understand about your business that they don't?"
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 150 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="businessModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Model *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How do you make money? How much could you make? Give your best estimate..."
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Minimum 150 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="healthtech">Healthtech</SelectItem>
                      <SelectItem value="edtech">Edtech</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="biotech">Biotech</SelectItem>
                      <SelectItem value="cleantech">Clean Tech</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherIdeas"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Ideas</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any other ideas you considered applying with. One may be something we've been waiting for."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )

      case 5: // Equity
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Legal & Investment Status</h3>
              <p className="text-gray-600">Tell us about your company's legal and investment status</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="hasLegalEntity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Legal Entity Formed</FormLabel>
                      <FormDescription>
                        Have you formed any legal entity yet?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hasInvestment"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Previous Investment</FormLabel>
                      <FormDescription>
                        Have you taken any investment yet?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFundraising"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel>Currently Fundraising</FormLabel>
                      <FormDescription>
                        Are you currently fundraising?
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-blue-800 text-sm">
                GrowthLab invests in early-stage companies. You don't need to have everything figured out yet, 
                but being honest about your current status helps us understand how we can best support you.
              </p>
            </div>
          </div>
        )

      case 6: // Media
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Media & Documentation</h3>
              <p className="text-gray-600">Upload your videos and documents</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Founder Video *</h4>
                <p className="text-sm text-gray-600">
                  Record a one-minute video introducing yourself and your idea. 
                  Maximum 100MB.
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload("founderVideo", file)
                  }}
                  className="w-full"
                />
                {form.watch("founderVideo") && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Video uploaded successfully</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Demo Video</h4>
                <p className="text-sm text-gray-600">
                  Show us how your product works. Maximum 100MB.
                </p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleFileUpload("demoVideo", file)
                  }}
                  className="w-full"
                />
                {form.watch("demoVideo") && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Demo uploaded successfully</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Pitch Deck</h4>
              <p className="text-sm text-gray-600">
                Upload your pitch deck or presentation slides (optional).
              </p>
              <input
                type="file"
                accept=".pdf,.ppt,.pptx"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload("pitchDeck", file)
                }}
                className="w-full"
              />
              {form.watch("pitchDeck") && (
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Pitch deck uploaded successfully</span>
                </div>
              )}
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">📹 Video Guidelines</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Keep it under 1 minute</li>
                <li>• Introduce yourself and your team</li>
                <li>• Explain your idea clearly</li>
                <li>• Show your passion and energy</li>
                <li>• Test your video before uploading</li>
              </ul>
            </div>
          </div>
        )

      case 7: // Review
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h3>
              <p className="text-gray-600">Review your application before submitting</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Application Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Company:</span> {form.watch("companyName") || "Not provided"}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {form.watch("category") || "Not selected"}
                  </div>
                  <div>
                    <span className="font-medium">Stage:</span> {form.watch("progressStage") || "Not selected"}
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {form.watch("location") || "Not provided"}
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="whyGrowthLab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why GrowthLab? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What convinced you to apply to GrowthLab? Did someone encourage you to apply?"
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>Minimum 150 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heardAboutGrowthLab"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How did you hear about us? *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="How did you hear about GrowthLab? Have you been to any of our events?"
                        className="min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>Minimum 50 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termsAgreed"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="text-base">
                        I agree to the terms and conditions *
                      </FormLabel>
                      <FormDescription>
                        By checking this box, you confirm that all information provided is accurate and complete.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">🎯 What Happens Next?</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• We'll review your application within 2 weeks</li>
                <li>• Selected teams will be invited for interviews</li>
                <li>• Final decisions announced within 4 weeks</li>
                <li>• Accepted teams join our next batch</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F7377] mb-4">
            GrowthLab Accelerator Application
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our prestigious accelerator program and get access to SGD 500K funding, world-class mentorship, 
            and the resources you need to scale your startup.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-[#0F7377]">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.id 
                  ? "bg-[#0F7377] text-white border-[#0F7377]" 
                  : "bg-white text-gray-400 border-gray-300"
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.id ? "text-[#0F7377]" : "text-gray-400"
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step.id ? "bg-[#0F7377]" : "bg-gray-300"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Application Form */}
        <Card className="shadow-xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderStepContent()}
                
                <Separator />
                
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="px-6"
                  >
                    Previous
                  </Button>
                  
                  <div className="flex gap-3">
                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-[#0F7377] hover:bg-[#0F7377]/90 px-6"
                      >
                        Next Step
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 px-8 py-3 text-lg font-semibold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Application
                            <CheckCircle className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Your application will be reviewed by our team within 2 weeks.</p>
          <p className="mt-1">
            Questions? Contact us at{" "}
            <a href="mailto:apply@growthlab.sg" className="text-[#0F7377] hover:underline">
              apply@growthlab.sg
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
