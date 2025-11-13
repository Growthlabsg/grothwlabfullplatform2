"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useFounderAuth } from "@/contexts/founder-auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, Crown, Lock, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function FounderLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, error } = useFounderAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      await login(email, password)
      toast({
        title: "Welcome, Founder!",
        description: "Access granted to GrowthLab Founder Control Panel",
        variant: "default",
      })
      router.push("/founder/dashboard")
    } catch (err) {
      toast({
        title: "Access Denied",
        description: "Invalid founder credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Crown className="h-12 w-12 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white">GrowthLab</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Founder Access</h2>
            <p className="text-slate-300">
              Complete platform control and strategic management
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-2xl bg-white/10 backdrop-blur-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="p-3 bg-yellow-400/20 rounded-full">
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Founder Authentication
            </CardTitle>
            <CardDescription className="text-slate-300">
              Enter your founder credentials to access the platform control panel
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Founder Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="founder@growthlab.sg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Founder Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your founder password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-yellow-400 focus:ring-yellow-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <Alert variant="destructive" className="bg-red-500/20 border-red-500/50">
                  <AlertDescription className="text-red-200">
                    {error.message}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 text-lg transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-5 w-5" />
                    Access Founder Panel
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 text-slate-400">
                <Shield className="h-4 w-4" />
                <span className="text-sm">Secure Founder Access</span>
              </div>
              <p className="text-xs text-slate-500">
                This portal provides complete control over the GrowthLab platform.
                <br />
                Access is restricted to platform founders only.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-500 text-sm">
          <p>© 2024 GrowthLab. Founder access only.</p>
          <p className="mt-1">
            For regular user access, visit{" "}
            <a href="/login" className="text-yellow-400 hover:text-yellow-300 underline">
              the main login page
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
