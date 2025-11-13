"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      // For demo purposes, show success and redirect
      toast({
        title: "Account created successfully!",
        description: "Welcome to GrowthLab! You can now sign in.",
      })
      
      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/login"
      }, 2000)
    } catch (error) {
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignup = async (provider: 'google' | 'linkedin') => {
    try {
      await login(provider)
      toast({
        title: "Signup successful!",
        description: `Welcome to GrowthLab via ${provider}!`,
      })
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again or use the email signup.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/GrowthLab Icon (1).png"
              alt="GrowthLab"
              width={64}
              height={64}
              className="mx-auto"
            />
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Join GrowthLab
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create your account to start your startup journey
          </p>
        </div>

        {/* Signup Form */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Create account</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white border-0 shadow-sm py-3 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <Separator className="my-6" />

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleOAuthSignup('google')}
              >
                <Image
                  src="/google-icon.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Continue with Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleOAuthSignup('linkedin')}
              >
                <Image
                  src="/linkedin-icon.svg"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Continue with LinkedIn
              </Button>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#0F7377] hover:text-[#0F7377]/80 dark:text-[#0F7377] dark:hover:text-[#0F7377]/80">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#0F7377] hover:text-[#0F7377]/80 dark:text-[#0F7377] dark:hover:text-[#0F7377]/80">
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="font-medium text-[#0F7377] hover:text-[#0F7377]/80 dark:text-[#0F7377] dark:hover:text-[#0F7377]/80"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Demo Account Info */}
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Demo Account Available
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Use john@example.com / password to test the platform
          </p>
        </div>
      </div>
    </div>
  )
}
