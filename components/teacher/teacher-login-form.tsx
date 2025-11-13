"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function TeacherLoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate API call
    try {
      // In a real application, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, using simple validation
      if (email === "teacher@growthlab.sg" && password === "password") {
        router.push("/teacher/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Teacher Login</CardTitle>
        <CardDescription>
          Sign in to access your teacher dashboard, manage courses, and connect with students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a href="/teacher/forgot-password" className="text-xs text-[#0F7377] hover:underline">
                Forgot password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6">
          <Separator className="my-4" />
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a href="/teacher/signup" className="text-[#0F7377] hover:underline">
                Apply to be a teacher
              </a>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col text-center text-xs text-muted-foreground">
        <p>For this demo use: teacher@growthlab.sg / password</p>
      </CardFooter>
    </Card>
  )
}
