"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { 
  CreditCard, 
  Building, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  ExternalLink
} from "lucide-react"

interface StripeAccountSetupProps {
  onComplete: (accountId: string) => void
  onCancel: () => void
}

export function StripeAccountSetup({ onComplete, onCancel }: StripeAccountSetupProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [accountStatus, setAccountStatus] = useState<'pending' | 'active' | 'restricted' | null>(null)
  
  const [formData, setFormData] = useState({
    // Business Information
    businessName: '',
    businessType: '',
    businessDescription: '',
    website: '',
    
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Address Information
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
    
    // Bank Information
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    
    // Tax Information
    taxId: '',
    ssn: '',
    
    // Terms and Conditions
    acceptTerms: false,
    acceptDataProcessing: false,
  })

  const businessTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' },
    { value: 'non_profit', label: 'Non-profit' },
    { value: 'government_entity', label: 'Government Entity' },
  ]

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'SG', label: 'Singapore' },
    { value: 'JP', label: 'Japan' },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulate Stripe account creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const accountId = `acct_${Math.random().toString(36).substr(2, 9)}`
      setAccountStatus('pending')
      
      toast({
        title: "Account Created Successfully",
        description: "Your Stripe account is being verified. You'll receive an email once it's ready.",
      })
      
      onComplete(accountId)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create Stripe account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  placeholder="Describe your business"
                  rows={3}
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Address Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="NY"
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="10001"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Bank Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    placeholder="1234567890"
                    type="password"
                  />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number *</Label>
                  <Input
                    id="routingNumber"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                    placeholder="021000021"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="accountType">Account Type *</Label>
                <Select value={formData.accountType} onValueChange={(value) => handleInputChange('accountType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking</SelectItem>
                    <SelectItem value="savings">Savings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Tax Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="taxId">Tax ID (EIN) *</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange('taxId', e.target.value)}
                    placeholder="12-3456789"
                  />
                </div>
                <div>
                  <Label htmlFor="ssn">SSN (Last 4 digits) *</Label>
                  <Input
                    id="ssn"
                    value={formData.ssn}
                    onChange={(e) => handleInputChange('ssn', e.target.value)}
                    placeholder="1234"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                />
                <Label htmlFor="acceptTerms" className="text-sm">
                  I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Stripe's Terms</a>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptDataProcessing"
                  checked={formData.acceptDataProcessing}
                  onCheckedChange={(checked) => handleInputChange('acceptDataProcessing', checked as boolean)}
                />
                <Label htmlFor="acceptDataProcessing" className="text-sm">
                  I agree to the <a href="#" className="text-blue-600 underline">Data Processing Agreement</a>
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (accountStatus === 'pending') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle>Account Verification Pending</CardTitle>
          <CardDescription>
            Your Stripe account is being verified. This usually takes a few minutes to a few hours.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            You'll receive an email notification once your account is ready to accept payments.
          </p>
          <Button onClick={onCancel} variant="outline">
            Close
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle>Set Up Stripe Account</CardTitle>
            <CardDescription>
              Connect your Stripe account to start accepting payments for your events
            </CardDescription>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex items-center justify-between mt-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        {renderStepContent()}
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={step === 1 ? onCancel : handlePrevious}
            disabled={loading}
          >
            {step === 1 ? 'Cancel' : 'Previous'}
          </Button>
          
          {step < 4 ? (
            <Button onClick={handleNext} disabled={loading}>
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={loading || !formData.acceptTerms || !formData.acceptDataProcessing}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
