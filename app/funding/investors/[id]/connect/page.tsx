"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Footer } from "@/components/layout/footer"
import type { Investor } from "@/types/funding"

// Sample data for the investor
const investor: Investor = {
  id: "investor-1",
  name: "Sarah Chen",
  organization: "GrowthLab Ventures",
  title: "Managing Partner",
  avatar: "/placeholder.svg?height=64&width=64",
  bio: "Sarah is a seasoned investor with over 15 years of experience in venture capital and startup ecosystems across Asia.",
  investmentFocus: {
    stages: ["pre-seed", "seed", "series-a"],
    industries: ["fintech", "saas", "ai", "ecommerce"],
    ticketSize: {
      min: 250000,
      max: 1000000,
    },
  },
  portfolio: ["PayNow", "HealthTech AI", "EduLearn", "LogisticsX"],
  location: "Singapore",
  linkedin: "https://linkedin.com/in/sarahchen",
  twitter: "https://twitter.com/sarahchen",
}

export default function InvestorConnectPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <Link
            href={`/funding/investors/${investor.id}`}
            className="mb-4 inline-flex items-center text-[#0F7377] hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Investor Profile
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image src={investor.avatar || "/placeholder.svg"} alt={investor.name} fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#1E293B]">Connect with {investor.name}</h1>
              <p className="text-[#334155]">
                {investor.title}, {investor.organization}
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request a Connection</CardTitle>
            <CardDescription>
              {isSubmitted
                ? "Your connection request has been submitted."
                : `Fill out the form below to request a connection with ${investor.name}.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-[#1E293B]">Request Submitted!</h3>
                <p className="mb-6 text-[#334155]">
                  Thank you for your interest in connecting with {investor.name}. We'll review your request and get back
                  to you within 3-5 business days.
                </p>
                <div className="space-y-4">
                  <p className="font-medium text-[#1E293B]">Next steps:</p>
                  <ol className="mx-auto max-w-md list-decimal space-y-2 text-left text-[#334155]">
                    <li>Our team will review your request</li>
                    <li>If there's a potential match, we'll share your profile with {investor.name}</li>
                    <li>If {investor.name.split(" ")[0]} is interested, we'll schedule an introduction call</li>
                    <li>You'll receive preparation materials before the call</li>
                  </ol>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@yourcompany.com" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Your company name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Your Role</Label>
                    <Input id="role" placeholder="CEO, CTO, etc." required />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stage">Company Stage</Label>
                    <Select required>
                      <SelectTrigger id="stage">
                        <SelectValue placeholder="Select your company stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea Stage</SelectItem>
                        <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="series-a">Series A</SelectItem>
                        <SelectItem value="series-b">Series B</SelectItem>
                        <SelectItem value="series-c">Series C+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Select required>
                      <SelectTrigger id="industry">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fintech">FinTech</SelectItem>
                        <SelectItem value="healthtech">HealthTech</SelectItem>
                        <SelectItem value="edtech">EdTech</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce</SelectItem>
                        <SelectItem value="saas">SaaS</SelectItem>
                        <SelectItem value="ai">AI/ML</SelectItem>
                        <SelectItem value="blockchain">Blockchain</SelectItem>
                        <SelectItem value="cleantech">CleanTech</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitch">Elevator Pitch</Label>
                  <Textarea
                    id="pitch"
                    placeholder="Briefly describe your company and product in 1-2 sentences"
                    required
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="why-connect">Why do you want to connect with {investor.name}?</Label>
                  <Textarea
                    id="why-connect"
                    placeholder="Explain why you're interested in connecting and how this investor might be a good fit for your startup"
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="funding">Funding Needs</Label>
                  <Textarea
                    id="funding"
                    placeholder="How much funding are you seeking and what will you use it for?"
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pitch-deck">Pitch Deck URL (optional)</Label>
                  <Input id="pitch-deck" type="url" placeholder="https://..." />
                  <p className="text-xs text-muted-foreground">
                    Link to your pitch deck on Google Drive, Dropbox, etc.
                  </p>
                </div>
              </form>
            )}
          </CardContent>
          {!isSubmitted && (
            <CardFooter>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Footer />
    </div>
  )
}
