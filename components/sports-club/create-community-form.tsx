"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Globe, Lock, Target, Calendar } from "lucide-react"

interface CreateCommunityFormProps {
  onSubmit: (communityData: any) => void
}

export function CreateCommunityForm({ onSubmit }: CreateCommunityFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sport: "",
    location: "",
    skillLevel: "",
    ageGroup: "",
    frequency: "",
    maxMembers: "",
    isPublic: true,
    requiresApproval: false,
    rules: "",
    contactInfo: ""
  })

  const sports = [
    "Football", "Basketball", "Tennis", "Volleyball", "Badminton", "Table Tennis",
    "Swimming", "Running", "Cycling", "Golf", "Baseball", "Hockey", "Cricket",
    "Rugby", "Boxing", "Martial Arts", "Yoga", "Fitness", "Dance", "Climbing",
    "Archery", "Chess"
  ]

  const skillLevels = ["Beginner", "Intermediate", "Advanced", "All Levels"]
  const ageGroups = ["18-25", "26-35", "36-45", "46-55", "55+", "All Ages"]
  const frequencies = ["Daily", "Weekly", "Bi-weekly", "Monthly", "As needed"]
  const maxMembers = ["10", "20", "30", "50", "100", "Unlimited"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Community Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g., Singapore Startup Runners"
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
          placeholder="Describe your community, its goals, and what members can expect..."
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="e.g., Singapore, Marina Bay area"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="ageGroup">Age Group</Label>
          <Select value={formData.ageGroup} onValueChange={(value) => handleInputChange("ageGroup", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              {ageGroups.map((group) => (
                <SelectItem key={group} value={group}>{group}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="frequency">Meeting Frequency</Label>
          <Select value={formData.frequency} onValueChange={(value) => handleInputChange("frequency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              {frequencies.map((freq) => (
                <SelectItem key={freq} value={freq}>{freq}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxMembers">Maximum Members</Label>
        <Select value={formData.maxMembers} onValueChange={(value) => handleInputChange("maxMembers", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select limit" />
          </SelectTrigger>
          <SelectContent>
            {maxMembers.map((limit) => (
              <SelectItem key={limit} value={limit}>{limit}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="rules">Community Rules & Guidelines</Label>
        <Textarea
          id="rules"
          value={formData.rules}
          onChange={(e) => handleInputChange("rules", e.target.value)}
          placeholder="Set clear rules and guidelines for your community..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactInfo">Contact Information</Label>
        <Input
          id="contactInfo"
          value={formData.contactInfo}
          onChange={(e) => handleInputChange("contactInfo", e.target.value)}
          placeholder="Phone number or email for community inquiries"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPublic"
            checked={formData.isPublic}
            onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
          />
          <Label htmlFor="isPublic">Make this community public</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="requiresApproval"
            checked={formData.requiresApproval}
            onCheckedChange={(checked) => handleInputChange("requiresApproval", checked)}
          />
          <Label htmlFor="requiresApproval">Require approval for new members</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">
          <Users className="h-4 w-4 mr-2" />
          Create Community
        </Button>
      </div>
    </form>
  )
}
