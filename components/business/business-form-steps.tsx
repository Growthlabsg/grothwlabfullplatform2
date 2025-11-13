"use client"

import { UseFormReturn } from "react-hook-form"
import { Building, Briefcase, Globe, MapPin, Calendar, Target, Users, DollarSign, Award, Phone, Mail, Linkedin, Twitter, Facebook, Instagram, Plus, X } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface StepProps {
  form: UseFormReturn<any>
  generateHandle?: (name: string) => string
  addToArray?: (field: string, value: string) => void
  removeFromArray?: (field: string, index: number) => void
  newValue?: string
  setNewValue?: (value: string) => void
}

// Step 1: Basic Information
export function BasicInformationStep({ form, generateHandle }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        <p className="text-sm text-gray-600">Tell us about your business</p>
      </div>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Name *</FormLabel>
            <FormControl>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter your business name"
                  className="pl-9"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    if (generateHandle) {
                      const currentHandle = form.getValues("handle")
                      const previousName = field.value
                      const previousAutoHandle = generateHandle(previousName)

                      if (!currentHandle || currentHandle === previousAutoHandle) {
                        form.setValue("handle", generateHandle(e.target.value))
                      }
                    }
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="handle"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Handle *</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">growthlab.sg/business/</span>
                <Input placeholder="your-business" {...field} />
              </div>
            </FormControl>
            <FormDescription>
              This will be your business page URL. Only lowercase letters, numbers, and hyphens are allowed.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="tagline"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tagline</FormLabel>
            <FormControl>
              <Input placeholder="A short, memorable phrase that describes your business" {...field} />
            </FormControl>
            <FormDescription>
              A catchy one-liner that captures what your business does (optional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <div className="relative">
                  <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://yourcompany.com"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Your company's website URL (optional)
              </FormDescription>
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
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="City, Country (e.g., Singapore, Singapore)"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Where is your business headquartered?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foundedYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Founded Year</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="2020"
                    className="pl-9"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </div>
              </FormControl>
              <FormDescription>
                When was your company founded? (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe what your business does, your mission, and what makes you unique. Be specific about your products, services, and target market."
                className="min-h-[120px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Provide a comprehensive overview of your business (10-500 characters)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

// Step 2: Company Details
export function CompanyDetailsStep({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Company Details</h3>
        <p className="text-sm text-gray-600">Tell us about your company structure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <SelectTrigger className="pl-9">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </div>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Fintech">Fintech</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Biotech">Biotech</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="EdTech">EdTech</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Hospitality">Hospitality</SelectItem>
                  <SelectItem value="Real Estate">Real Estate</SelectItem>
                  <SelectItem value="PropTech">PropTech</SelectItem>
                  <SelectItem value="Media">Media</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Business Development">Business Development</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="SaaS">SaaS</SelectItem>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Blockchain">Blockchain</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="CleanTech">CleanTech</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Beauty">Beauty</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Tourism">Tourism</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="AgTech">AgTech</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                  <SelectItem value="LegalTech">LegalTech</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Advertising">Advertising</SelectItem>
                  <SelectItem value="PR">PR</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Recruitment">Recruitment</SelectItem>
                  <SelectItem value="Non-profit">Non-profit</SelectItem>
                  <SelectItem value="Social Impact">Social Impact</SelectItem>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Defense">Defense</SelectItem>
                  <SelectItem value="Aerospace">Aerospace</SelectItem>
                  <SelectItem value="Automotive">Automotive</SelectItem>
                  <SelectItem value="Telecommunications">Telecommunications</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Size *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Just me">Just me</SelectItem>
                  <SelectItem value="2-10 employees">2-10 employees</SelectItem>
                  <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                  <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                  <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                  <SelectItem value="501-1000 employees">501-1000 employees</SelectItem>
                  <SelectItem value="1001-5000 employees">1001-5000 employees</SelectItem>
                  <SelectItem value="5001+ employees">5001+ employees</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="companyStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Stage</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Startup">Startup</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Mature">Mature</SelectItem>
                  <SelectItem value="Enterprise">Enterprise</SelectItem>
                  <SelectItem value="Scale-up">Scale-up</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="legalStructure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legal Structure</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select legal structure" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="LLC">LLC</SelectItem>
                  <SelectItem value="Corporation">Corporation</SelectItem>
                  <SelectItem value="S-Corp">S-Corp</SelectItem>
                  <SelectItem value="B-Corp">B-Corp</SelectItem>
                  <SelectItem value="Non-profit">Non-profit</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="headquarters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headquarters</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="City, Country"
                    className="pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Main office location (if different from business location)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timezone</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UTC-12">UTC-12 (Baker Island)</SelectItem>
                  <SelectItem value="UTC-11">UTC-11 (American Samoa)</SelectItem>
                  <SelectItem value="UTC-10">UTC-10 (Hawaii)</SelectItem>
                  <SelectItem value="UTC-9">UTC-9 (Alaska)</SelectItem>
                  <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                  <SelectItem value="UTC-7">UTC-7 (Mountain Time)</SelectItem>
                  <SelectItem value="UTC-6">UTC-6 (Central Time)</SelectItem>
                  <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="UTC-4">UTC-4 (Atlantic Time)</SelectItem>
                  <SelectItem value="UTC-3">UTC-3 (Brazil)</SelectItem>
                  <SelectItem value="UTC-2">UTC-2 (Mid-Atlantic)</SelectItem>
                  <SelectItem value="UTC-1">UTC-1 (Azores)</SelectItem>
                  <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                  <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                  <SelectItem value="UTC+2">UTC+2 (EET)</SelectItem>
                  <SelectItem value="UTC+3">UTC+3 (MSK)</SelectItem>
                  <SelectItem value="UTC+4">UTC+4 (GST)</SelectItem>
                  <SelectItem value="UTC+5">UTC+5 (PKT)</SelectItem>
                  <SelectItem value="UTC+6">UTC+6 (BST)</SelectItem>
                  <SelectItem value="UTC+7">UTC+7 (ICT)</SelectItem>
                  <SelectItem value="UTC+8">UTC+8 (SGT)</SelectItem>
                  <SelectItem value="UTC+9">UTC+9 (JST)</SelectItem>
                  <SelectItem value="UTC+10">UTC+10 (AEST)</SelectItem>
                  <SelectItem value="UTC+11">UTC+11 (VUT)</SelectItem>
                  <SelectItem value="UTC+12">UTC+12 (NZST)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="remoteWork"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Remote Work Available
              </FormLabel>
              <FormDescription>
                Check if your company offers remote work opportunities
              </FormDescription>
            </div>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Location</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="City, Country" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headquarters"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Headquarters</FormLabel>
              <FormControl>
                <Input placeholder="Headquarters location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="remoteWork"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Remote Work Available
              </FormLabel>
              <FormDescription>
                Check if your company offers remote work opportunities
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

// Step 3: Mission & Vision
export function MissionVisionStep({ form, addToArray, removeFromArray, newValue, setNewValue }: StepProps) {
  const values = form.watch("values") || []

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Mission & Vision</h3>
        <p className="text-sm text-gray-600">Define your company's purpose and values</p>
      </div>

      <FormField
        control={form.control}
        name="mission"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mission Statement</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What is your company's purpose? What problem do you solve?"
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Describe your company's core purpose and what drives you (optional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="vision"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Vision Statement</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="What is your company's vision for the future? What do you want to achieve?"
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Describe your company's long-term vision and goals (optional)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="values"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Values</FormLabel>
            <FormControl>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a company value (e.g., Innovation, Integrity, Customer-first)"
                    value={newValue || ""}
                    onChange={(e) => setNewValue?.(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addToArray?.("values", newValue || "")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addToArray?.("values", newValue || "")}
                    disabled={!newValue?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {values.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {values.map((value: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {value}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray?.("values", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Add your company's core values and principles
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

// Step 4: Business Details
export function BusinessDetailsStep({ form, addToArray, removeFromArray, newValue, setNewValue }: StepProps) {
  const specialties = form.watch("specialties") || []
  const services = form.watch("services") || []

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Business Details</h3>
        <p className="text-sm text-gray-600">Tell us about your business offerings</p>
      </div>

      <FormField
        control={form.control}
        name="specialties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specialties</FormLabel>
            <FormControl>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a specialty (e.g., AI/ML, Digital Marketing, Financial Planning)"
                    value={newValue || ""}
                    onChange={(e) => setNewValue?.(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addToArray?.("specialties", newValue || "")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addToArray?.("specialties", newValue || "")}
                    disabled={!newValue?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {specialties.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {specialty}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray?.("specialties", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              What are your main areas of expertise?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="services"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Services/Products</FormLabel>
            <FormControl>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a service or product (e.g., Web Development, Consulting, SaaS Platform)"
                    value={newValue || ""}
                    onChange={(e) => setNewValue?.(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addToArray?.("services", newValue || "")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addToArray?.("services", newValue || "")}
                    disabled={!newValue?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {services.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {services.map((service: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {service}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray?.("services", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              What services or products do you offer?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="targetAudience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Audience</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Who are your ideal customers? Describe their demographics, needs, and characteristics."
                className="min-h-[100px]" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Describe your ideal customers and target market
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="businessModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Model</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="B2B">B2B (Business to Business)</SelectItem>
                  <SelectItem value="B2C">B2C (Business to Consumer)</SelectItem>
                  <SelectItem value="B2B2C">B2B2C (Business to Business to Consumer)</SelectItem>
                  <SelectItem value="SaaS">SaaS (Software as a Service)</SelectItem>
                  <SelectItem value="Marketplace">Marketplace</SelectItem>
                  <SelectItem value="Freemium">Freemium</SelectItem>
                  <SelectItem value="Subscription">Subscription</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fundingStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Stage</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bootstrap">Bootstrap</SelectItem>
                  <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B">Series B</SelectItem>
                  <SelectItem value="Series C+">Series C+</SelectItem>
                  <SelectItem value="IPO">IPO</SelectItem>
                  <SelectItem value="Acquired">Acquired</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Revenue</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pre-revenue">Pre-revenue</SelectItem>
                  <SelectItem value="Under $100K">Under $100K</SelectItem>
                  <SelectItem value="$100K - $500K">$100K - $500K</SelectItem>
                  <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                  <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                  <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                  <SelectItem value="$10M - $50M">$10M - $50M</SelectItem>
                  <SelectItem value="$50M+">$50M+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="funding"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Funding Raised</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding amount" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Self-funded">Self-funded</SelectItem>
                  <SelectItem value="Under $100K">Under $100K</SelectItem>
                  <SelectItem value="$100K - $500K">$100K - $500K</SelectItem>
                  <SelectItem value="$500K - $1M">$500K - $1M</SelectItem>
                  <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                  <SelectItem value="$5M - $10M">$5M - $10M</SelectItem>
                  <SelectItem value="$10M - $50M">$10M - $50M</SelectItem>
                  <SelectItem value="$50M+">$50M+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="keyMetrics.customers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Customers/Users</FormLabel>
            <FormControl>
              <div className="relative">
                <Users className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="e.g., 1000"
                  className="pl-9"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </div>
            </FormControl>
            <FormDescription>
              How many customers or users do you currently have?
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="keyMetrics.revenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Recurring Revenue (MRR)</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="e.g., 50000"
                    className="pl-9"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Your monthly recurring revenue in USD
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keyMetrics.growth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Growth Rate (%)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Target className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="e.g., 15"
                    className="pl-9"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </div>
              </FormControl>
              <FormDescription>
                Your monthly growth rate percentage
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

// Step 5: Contact & Social
export function ContactSocialStep({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Contact & Social Media</h3>
        <p className="text-sm text-gray-600">How can people reach you?</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-sm text-gray-700">Contact Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="contactInfo.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="contact@yourbusiness.com" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactInfo.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="+1 (555) 123-4567" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactInfo.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Address</FormLabel>
              <FormControl>
                <Textarea placeholder="123 Business St, City, State, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-sm text-gray-700">Social Media</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="socialMedia.linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="https://linkedin.com/company/yourbusiness" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="https://twitter.com/yourbusiness" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="socialMedia.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="https://facebook.com/yourbusiness" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMedia.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="https://instagram.com/yourbusiness" className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  )
}

// Step 6: Achievements
export function AchievementsStep({ form, addToArray, removeFromArray, newValue, setNewValue }: StepProps) {
  const certifications = form.watch("certifications") || []
  const awards = form.watch("awards") || []
  const partnerships = form.watch("partnerships") || []

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Achievements & Recognition</h3>
        <p className="text-sm text-gray-600">Showcase your company's accomplishments</p>
      </div>

      <FormField
        control={form.control}
        name="certifications"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Certifications</FormLabel>
            <FormControl>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a certification (e.g., ISO 9001, SOC 2, AWS Certified)"
                    value={newValue || ""}
                    onChange={(e) => setNewValue?.(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addToArray?.("certifications", newValue || "")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addToArray?.("certifications", newValue || "")}
                    disabled={!newValue?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {certifications.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {cert}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray?.("certifications", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Add any industry certifications or accreditations
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="awards"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Awards & Recognition</FormLabel>
            <FormControl>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an award (e.g., Best Startup 2023, Innovation Award)"
                    value={newValue || ""}
                    onChange={(e) => setNewValue?.(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addToArray?.("awards", newValue || "")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addToArray?.("awards", newValue || "")}
                    disabled={!newValue?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {awards.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {awards.map((award: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {award}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray?.("awards", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Add any awards, recognitions, or achievements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="partnerships"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Key Partnerships</FormLabel>
            <FormControl>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a partnership (e.g., Microsoft Partner, Google Cloud Partner)"
                    value={newValue || ""}
                    onChange={(e) => setNewValue?.(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addToArray?.("partnerships", newValue || "")
                      }
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => addToArray?.("partnerships", newValue || "")}
                    disabled={!newValue?.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {partnerships.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {partnerships.map((partnership: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {partnership}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray?.("partnerships", index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Add any strategic partnerships or collaborations
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

// Step 7: Review
export function ReviewStep({ form }: StepProps) {
  const values = form.watch()

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Review Your Information</h3>
        <p className="text-sm text-gray-600">Please review all information before creating your business page</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {values.name}</p>
            <p><span className="font-medium">Handle:</span> growthlab.sg/business/{values.handle}</p>
            {values.tagline && <p><span className="font-medium">Tagline:</span> {values.tagline}</p>}
            <p><span className="font-medium">Description:</span> {values.description}</p>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Company Details</h4>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Industry:</span> {values.industry}</p>
            <p><span className="font-medium">Size:</span> {values.size}</p>
            {values.companyStage && <p><span className="font-medium">Stage:</span> {values.companyStage}</p>}
            {values.legalStructure && <p><span className="font-medium">Legal Structure:</span> {values.legalStructure}</p>}
            {values.foundedYear && <p><span className="font-medium">Founded:</span> {values.foundedYear}</p>}
            {values.website && <p><span className="font-medium">Website:</span> {values.website}</p>}
            {values.location && <p><span className="font-medium">Location:</span> {values.location}</p>}
          </div>
        </div>

        {/* Mission & Vision */}
        {(values.mission || values.vision || values.values?.length > 0) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Mission & Vision</h4>
            <div className="space-y-2 text-sm">
              {values.mission && <p><span className="font-medium">Mission:</span> {values.mission}</p>}
              {values.vision && <p><span className="font-medium">Vision:</span> {values.vision}</p>}
              {values.values?.length > 0 && (
                <div>
                  <span className="font-medium">Values:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {values.values.map((value: string, index: number) => (
                      <Badge key={index} variant="secondary">{value}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Business Details */}
        {(values.specialties?.length > 0 || values.services?.length > 0 || values.targetAudience) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Business Details</h4>
            <div className="space-y-2 text-sm">
              {values.specialties?.length > 0 && (
                <div>
                  <span className="font-medium">Specialties:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {values.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="secondary">{specialty}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {values.services?.length > 0 && (
                <div>
                  <span className="font-medium">Services:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {values.services.map((service: string, index: number) => (
                      <Badge key={index} variant="secondary">{service}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {values.targetAudience && <p><span className="font-medium">Target Audience:</span> {values.targetAudience}</p>}
              {values.businessModel && <p><span className="font-medium">Business Model:</span> {values.businessModel}</p>}
              {values.fundingStage && <p><span className="font-medium">Funding Stage:</span> {values.fundingStage}</p>}
            </div>
          </div>
        )}

        {/* Contact & Social */}
        {(values.contactInfo?.email || values.contactInfo?.phone || values.socialMedia?.linkedin) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Contact & Social</h4>
            <div className="space-y-2 text-sm">
              {values.contactInfo?.email && <p><span className="font-medium">Email:</span> {values.contactInfo.email}</p>}
              {values.contactInfo?.phone && <p><span className="font-medium">Phone:</span> {values.contactInfo.phone}</p>}
              {values.socialMedia?.linkedin && <p><span className="font-medium">LinkedIn:</span> {values.socialMedia.linkedin}</p>}
              {values.socialMedia?.twitter && <p><span className="font-medium">Twitter:</span> {values.socialMedia.twitter}</p>}
              {values.socialMedia?.facebook && <p><span className="font-medium">Facebook:</span> {values.socialMedia.facebook}</p>}
              {values.socialMedia?.instagram && <p><span className="font-medium">Instagram:</span> {values.socialMedia.instagram}</p>}
            </div>
          </div>
        )}

        {/* Achievements */}
        {(values.certifications?.length > 0 || values.awards?.length > 0 || values.partnerships?.length > 0) && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Achievements</h4>
            <div className="space-y-2 text-sm">
              {values.certifications?.length > 0 && (
                <div>
                  <span className="font-medium">Certifications:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {values.certifications.map((cert: string, index: number) => (
                      <Badge key={index} variant="secondary">{cert}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {values.awards?.length > 0 && (
                <div>
                  <span className="font-medium">Awards:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {values.awards.map((award: string, index: number) => (
                      <Badge key={index} variant="secondary">{award}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {values.partnerships?.length > 0 && (
                <div>
                  <span className="font-medium">Partnerships:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {values.partnerships.map((partnership: string, index: number) => (
                      <Badge key={index} variant="secondary">{partnership}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Step 6: Team & Founders
export function TeamFoundersStep({ form, addToArray, removeFromArray, newValue, setNewValue }: StepProps) {
  const founders = form.watch("founders") || []
  const team = form.watch("team") || []

  const addFounder = () => {
    const currentFounders = form.getValues("founders") || []
    form.setValue("founders", [
      ...currentFounders,
      {
        name: "",
        title: "",
        bio: "",
        avatar: "",
        linkedin: "",
      },
    ])
  }

  const removeFounder = (index: number) => {
    const currentFounders = form.getValues("founders") || []
    form.setValue("founders", currentFounders.filter((_: any, i: number) => i !== index))
  }

  const addTeamMember = () => {
    const currentTeam = form.getValues("team") || []
    form.setValue("team", [
      ...currentTeam,
      {
        name: "",
        role: "",
        department: "",
        avatar: "",
      },
    ])
  }

  const removeTeamMember = (index: number) => {
    const currentTeam = form.getValues("team") || []
    form.setValue("team", currentTeam.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Team & Founders</h3>
        <p className="text-sm text-gray-600">Tell us about your key team members and founders</p>
      </div>

      {/* Founders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">Founders</h4>
          <Button type="button" size="sm" onClick={addFounder}>
            <Plus className="h-4 w-4 mr-2" />
            Add Founder
          </Button>
        </div>

        {founders.map((founder: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">Founder {index + 1}</h5>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeFounder(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`founders.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Founder name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`founders.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="CEO, CTO, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`founders.${index}.linkedin`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`founders.${index}.avatar`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`founders.${index}.bio`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief bio about the founder's background and experience"
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        ))}
      </div>

      {/* Team Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">Team Members</h4>
          <Button type="button" size="sm" onClick={addTeamMember}>
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        {team.map((member: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">Team Member {index + 1}</h5>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeTeamMember(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`team.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Team member name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team.${index}.role`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <FormControl>
                      <Input placeholder="Job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team.${index}.department`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Leadership">Leadership</SelectItem>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`team.${index}.avatar`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/avatar.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Step 7: Funding & Investors
export function FundingInvestorsStep({ form, addToArray, removeFromArray, newValue, setNewValue }: StepProps) {
  const investors = form.watch("investors") || []

  const addInvestor = () => {
    const currentInvestors = form.getValues("investors") || []
    form.setValue("investors", [
      ...currentInvestors,
      {
        name: "",
        type: "",
        logo: "",
      },
    ])
  }

  const removeInvestor = (index: number) => {
    const currentInvestors = form.getValues("investors") || []
    form.setValue("investors", currentInvestors.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Funding & Investors</h3>
        <p className="text-sm text-gray-600">Tell us about your funding and investors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="funding"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Funding</FormLabel>
              <FormControl>
                <Input placeholder="$5.2M" {...field} />
              </FormControl>
              <FormDescription>
                Total amount raised (e.g., $5.2M, $1.5M)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fundingStage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Stage</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select funding stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Bootstrap">Bootstrap</SelectItem>
                  <SelectItem value="Pre-seed">Pre-seed</SelectItem>
                  <SelectItem value="Seed">Seed</SelectItem>
                  <SelectItem value="Series A">Series A</SelectItem>
                  <SelectItem value="Series B">Series B</SelectItem>
                  <SelectItem value="Series C+">Series C+</SelectItem>
                  <SelectItem value="IPO">IPO</SelectItem>
                  <SelectItem value="Acquired">Acquired</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Investors Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">Investors</h4>
          <Button type="button" size="sm" onClick={addInvestor}>
            <Plus className="h-4 w-4 mr-2" />
            Add Investor
          </Button>
        </div>

        {investors.map((investor: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">Investor {index + 1}</h5>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeInvestor(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`investors.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investor Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Sequoia Capital, 500 Startups, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`investors.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investor Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investor type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Venture Capital">Venture Capital</SelectItem>
                        <SelectItem value="Angel Investor">Angel Investor</SelectItem>
                        <SelectItem value="Accelerator">Accelerator</SelectItem>
                        <SelectItem value="Sovereign Wealth Fund">Sovereign Wealth Fund</SelectItem>
                        <SelectItem value="Corporate VC">Corporate VC</SelectItem>
                        <SelectItem value="Private Equity">Private Equity</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`investors.${index}.logo`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/logo.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Step 8: Jobs & Updates
export function JobsUpdatesStep({ form, addToArray, removeFromArray, newValue, setNewValue }: StepProps) {
  const jobs = form.watch("jobs") || []
  const updates = form.watch("updates") || []

  const addJob = () => {
    const currentJobs = form.getValues("jobs") || []
    form.setValue("jobs", [
      ...currentJobs,
      {
        id: `job-${Date.now()}`,
        title: "",
        department: "",
        type: "",
        location: "",
        description: "",
        requirements: [],
        posted: new Date().toISOString().split('T')[0],
      },
    ])
  }

  const removeJob = (index: number) => {
    const currentJobs = form.getValues("jobs") || []
    form.setValue("jobs", currentJobs.filter((_: any, i: number) => i !== index))
  }

  const addUpdate = () => {
    const currentUpdates = form.getValues("updates") || []
    form.setValue("updates", [
      ...currentUpdates,
      {
        id: `update-${Date.now()}`,
        title: "",
        content: "",
        date: new Date().toISOString().split('T')[0],
        author: "",
      },
    ])
  }

  const removeUpdate = (index: number) => {
    const currentUpdates = form.getValues("updates") || []
    form.setValue("updates", currentUpdates.filter((_: any, i: number) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Jobs & Updates</h3>
        <p className="text-sm text-gray-600">Add open positions and company updates</p>
      </div>

      {/* Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">Open Positions</h4>
          <Button type="button" size="sm" onClick={addJob}>
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </div>

        {jobs.map((job: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">Job {index + 1}</h5>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeJob(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`jobs.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Full Stack Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`jobs.${index}.department`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Engineering">Engineering</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="HR">HR</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`jobs.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`jobs.${index}.location`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="Singapore, Remote, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`jobs.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the role and responsibilities"
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        ))}
      </div>

      {/* Updates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-gray-700">Company Updates</h4>
          <Button type="button" size="sm" onClick={addUpdate}>
            <Plus className="h-4 w-4 mr-2" />
            Add Update
          </Button>
        </div>

        {updates.map((update: any, index: number) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="font-medium">Update {index + 1}</h5>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => removeUpdate(index)}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`updates.${index}.title`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Update Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="New Product Launch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`updates.${index}.author`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author *</FormLabel>
                    <FormControl>
                      <Input placeholder="CEO Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name={`updates.${index}.content`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Update Content *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share the latest news and updates about your company"
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        ))}
      </div>
    </div>
  )
}

// Product Information Step
export function ProductInformationStep({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Product Information</h3>
        <p className="text-sm text-gray-600 mb-6">Tell us about your product or service offering.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="product.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product/Service Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AutoFlow AI" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="product.description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your product or service in detail..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={form.control}
          name="product.features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Key Features</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a feature..."
                      value={form.watch("newValue") || ""}
                      onChange={(e) => form.setValue("newValue", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const value = form.getValues("newValue")
                        if (value?.trim()) {
                          const currentFeatures = field.value || []
                          form.setValue("product.features", [...currentFeatures, value.trim()])
                          form.setValue("newValue", "")
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(field.value || []).map((feature: string, index: number) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {feature}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentFeatures = field.value || []
                            form.setValue("product.features", currentFeatures.filter((_: any, i: number) => i !== index))
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <h4 className="font-medium mb-3">Pricing Tiers</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="product.pricing.starter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Starter</FormLabel>
                <FormControl>
                  <Input placeholder="$99/user/month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product.pricing.professional"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional</FormLabel>
                <FormControl>
                  <Input placeholder="$199/user/month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product.pricing.enterprise"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enterprise</FormLabel>
                <FormControl>
                  <Input placeholder="Custom pricing" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <FormField
          control={form.control}
          name="product.integrations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Integrations</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add an integration..."
                      value={form.watch("newValue") || ""}
                      onChange={(e) => form.setValue("newValue", e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const value = form.getValues("newValue")
                        if (value?.trim()) {
                          const currentIntegrations = field.value || []
                          form.setValue("product.integrations", [...currentIntegrations, value.trim()])
                          form.setValue("newValue", "")
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(field.value || []).map((integration: string, index: number) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {integration}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const currentIntegrations = field.value || []
                            form.setValue("product.integrations", currentIntegrations.filter((_: any, i: number) => i !== index))
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
