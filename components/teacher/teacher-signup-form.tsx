"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function TeacherSignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    expertise: "",
    bio: "",
    linkedin: "",
    agreeTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions")
      setIsLoading(false)
      return
    }

    // Simulate API call
    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to success page
      router.push("/teacher/signup-success")
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Apply to be a Teacher</CardTitle>
        <CardDescription>
          Join GrowthLab's Startup School and share your expertise with the next generation of founders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expertise">Area of Expertise</Label>
            <Select
              value={formData.expertise}
              onValueChange={(value) => handleSelectChange("expertise", value)}
              disabled={isLoading}
            >
              <SelectTrigger id="expertise">
                <SelectValue placeholder="Select your area of expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="product">Product Development</SelectItem>
                <SelectItem value="marketing">Marketing & Growth</SelectItem>
                <SelectItem value="sales">Sales & Business Development</SelectItem>
                <SelectItem value="finance">Finance & Fundraising</SelectItem>
                <SelectItem value="tech">Technology & Engineering</SelectItem>
                <SelectItem value="design">Design & UX</SelectItem>
                <SelectItem value="operations">Operations & Scaling</SelectItem>
                <SelectItem value="leadership">Leadership & Management</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about your background, experience, and what you can teach founders"
              className="min-h-[120px]"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
            <Input
              id="linkedin"
              name="linkedin"
              type="url"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/yourprofile"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
              disabled={isLoading}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="agreeTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the terms and conditions
              </label>
              <p className="text-sm text-muted-foreground">
                By signing up, you agree to our{" "}
                <a href="/terms" className="text-[#0F7377] hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-[#0F7377] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" disabled={isLoading}>
            {isLoading ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
