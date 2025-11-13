"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { login, demoLogin } = useAuth()
  const { toast } = useToast()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Check if it's the demo account
      if (email === "john@example.com" && password === "password") {
        await demoLogin(email, password)
        toast({
          title: "Welcome back, John!",
          description: "You've been logged in successfully.",
        })
        window.location.href = "/dashboard"
        return
      }

      // For other accounts, show error (demo purposes)
      setError("Invalid credentials. Please use the demo account: john@example.com / password")
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'linkedin') => {
    try {
      await login(provider)
      toast({
        title: "Login successful!",
        description: `Welcome back via ${provider}!`,
      })
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please try again or use the demo account.",
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
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your GrowthLab account
          </p>
        </div>

        {/* Login Form */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Sign in</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {isLoading ? "Signing in..." : "Sign In"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-sm text-[#0F7377] hover:text-[#0F7377]/80 dark:text-[#0F7377] dark:hover:text-[#0F7377]/80"
              >
                Forgot your password?
              </Link>
            </div>

            <Separator className="my-6" />

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleOAuthLogin('google')}
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
                onClick={() => handleOAuthLogin('linkedin')}
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

            {/* Demo Account Info */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Demo Account for Testing
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-300 mb-2">
                Use these credentials to test the platform:
              </p>
              <div className="text-xs text-blue-600 dark:text-blue-300">
                <p><strong>Email:</strong> john@example.com</p>
                <p><strong>Password:</strong> password</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="font-medium text-[#0F7377] hover:text-[#0F7377]/80 dark:text-[#0F7377] dark:hover:text-[#0F7377]/80"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Account for Testing */}
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Demo Account Available
          </div>
        </div>
      </div>
    </div>
  )
}
