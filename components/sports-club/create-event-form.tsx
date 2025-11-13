"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentForm } from "@/components/payments/payment-form"
import { Calendar, MapPin, Clock, Users, Trophy, Target, CreditCard, DollarSign } from "lucide-react"

interface CreateEventFormProps {
  onSubmit: (eventData: any) => void
}

export function CreateEventForm({ onSubmit }: CreateEventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sport: "",
    date: "",
    time: "",
    location: "",
    maxParticipants: "",
    skillLevel: "",
    price: "",
    equipment: "",
    rules: "",
    prizes: "",
    contactInfo: "",
    isPublic: true,
    requiresRegistration: true
  })
  
  const [paymentData, setPaymentData] = useState({
    enabled: false,
    price: "",
    currency: "usd",
    paymentType: "per_person",
    earlyBirdDiscount: false,
    earlyBirdPrice: "",
    earlyBirdEndDate: "",
    groupDiscount: false,
    groupSize: "",
    groupDiscountPercent: "",
    refundPolicy: "no_refund",
    refundDays: "7",
    paymentMethods: ["card"],
    requireApproval: false
  })

  const sports = [
    "Football", "Basketball", "Tennis", "Volleyball", "Badminton", "Table Tennis",
    "Swimming", "Running", "Cycling", "Golf", "Baseball", "Hockey", "Cricket",
    "Rugby", "Boxing", "Martial Arts", "Yoga", "Fitness", "Dance", "Climbing",
    "Archery", "Chess"
  ]

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "All Levels"]
  const maxParticipants = ["10", "20", "30", "50", "100", "Unlimited"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, payment: paymentData })
  }

  const handlePaymentSave = (data: any) => {
    setPaymentData(data)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Event Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="e.g., Startup Soccer Tournament"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sport">Sport *</Label>
          <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select sport" />
            </SelectTrigger>
            <SelectContent>
              {sports.map((sport) => (
                <SelectItem key={sport} value={sport}>{sport}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your event..."
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="skillLevel">Skill Level</Label>
          <Select value={formData.skillLevel} onValueChange={(value) => handleInputChange("skillLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {skillLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="e.g., Singapore Sports Hub"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="maxParticipants">Max Participants</Label>
          <Select value={formData.maxParticipants} onValueChange={(value) => handleInputChange("maxParticipants", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select limit" />
            </SelectTrigger>
            <SelectContent>
              {maxParticipants.map((limit) => (
                <SelectItem key={limit} value={limit}>{limit}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price (SGD)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            placeholder="0 for free"
            min="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="equipment">Equipment Needed</Label>
        <Input
          id="equipment"
          value={formData.equipment}
          onChange={(e) => handleInputChange("equipment", e.target.value)}
          placeholder="e.g., Bring your own racket, balls provided"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="rules">Rules & Guidelines</Label>
        <Textarea
          id="rules"
          value={formData.rules}
          onChange={(e) => handleInputChange("rules", e.target.value)}
          placeholder="Event rules and guidelines..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="prizes">Prizes & Rewards</Label>
        <Input
          id="prizes"
          value={formData.prizes}
          onChange={(e) => handleInputChange("prizes", e.target.value)}
          placeholder="e.g., Trophy for winner, medals for top 3"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contact Information</Label>
        <Input
          id="contactInfo"
          value={formData.contactInfo}
          onChange={(e) => handleInputChange("contactInfo", e.target.value)}
          placeholder="Phone number or email for questions"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPublic"
            checked={formData.isPublic}
            onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
          />
          <Label htmlFor="isPublic">Make this event public</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="requiresRegistration"
            checked={formData.requiresRegistration}
            onCheckedChange={(checked) => handleInputChange("requiresRegistration", checked)}
          />
          <Label htmlFor="requiresRegistration">Require registration</Label>
        </div>
      </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                <Trophy className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment Needed</Label>
              <Textarea
                id="equipment"
                value={formData.equipment}
                onChange={(e) => handleInputChange("equipment", e.target.value)}
                placeholder="List any equipment participants need to bring"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rules">Rules & Guidelines</Label>
              <Textarea
                id="rules"
                value={formData.rules}
                onChange={(e) => handleInputChange("rules", e.target.value)}
                placeholder="Outline event rules and guidelines"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prizes">Prizes (Optional)</Label>
              <Input
                id="prizes"
                value={formData.prizes}
                onChange={(e) => handleInputChange("prizes", e.target.value)}
                placeholder="e.g., Trophies, Vouchers, Cash Prizes"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information</Label>
              <Input
                id="contactInfo"
                value={formData.contactInfo}
                onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                placeholder="Phone number or email for questions"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6">
          <PaymentForm 
            onSave={handlePaymentSave}
            onCancel={() => {}}
            initialData={paymentData}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
