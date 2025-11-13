"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail("")
    }, 1000)
  }

  return (
    <div>
      {isSuccess ? (
        <div className="rounded-md bg-white/15 p-5 text-white border border-white/20 shadow-lg animate-fade-in">
          <p className="font-medium">Thank you for subscribing! We'll keep you updated with the latest news.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/15 text-white placeholder:text-white/70 focus-visible:ring-white/50 border-white/20 h-11"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-secondary-500 hover:bg-secondary-600 text-white font-medium h-11 px-6 shadow-md transition-all"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  )
}
