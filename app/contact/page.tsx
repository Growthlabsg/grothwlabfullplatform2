"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Users,
  Calendar,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    })
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
      inquiryType: ""
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "hello@growthlab.asia",
      action: "mailto:hello@growthlab.asia"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      value: "+65 1234 5678",
      action: "tel:+6512345678"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "Singapore, Hong Kong, Tokyo",
      action: null
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically respond within",
      value: "24 hours",
      action: null
    }
  ]

  const inquiryTypes = [
    "General Inquiry",
    "Accelerator Program",
    "Partnership Opportunity",
    "Media & Press",
    "Investment Inquiry",
    "Technical Support",
    "Community Question",
    "Other"
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Get in touch with our team. We'd love to hear from you!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/" className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange("inquiryType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Brief subject line"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{info.description}</p>
                      {info.action ? (
                        <a 
                          href={info.action} 
                          className="text-[#0F7377] font-medium hover:underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-[#0F7377] font-medium">{info.value}</p>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Office Locations */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <MapPin className="h-5 w-5" />
                  Our Offices
                </CardTitle>
                <CardDescription>
                  Visit us at any of our locations across Asia
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-[#0F7377] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Singapore</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    79 Ayer Rajah Crescent, Singapore 139955
                  </p>
                </div>
                <div className="border-l-4 border-[#F59E0B] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Hong Kong</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Central, Hong Kong
                  </p>
                </div>
                <div className="border-l-4 border-[#0F7377] pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Tokyo</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Shibuya, Tokyo, Japan
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <MessageSquare className="h-5 w-5" />
                  Quick Links
                </CardTitle>
                <CardDescription>
                  Common questions and resources
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/faq" className="flex items-center gap-2 text-[#0F7377] hover:underline">
                  <CheckCircle className="h-4 w-4" />
                  Frequently Asked Questions
                </Link>
                <Link href="/accelerator" className="flex items-center gap-2 text-[#0F7377] hover:underline">
                  <CheckCircle className="h-4 w-4" />
                  Accelerator Program
                </Link>
                <Link href="/network" className="flex items-center gap-2 text-[#0F7377] hover:underline">
                  <CheckCircle className="h-4 w-4" />
                  Network & Community
                </Link>
                <Link href="/events" className="flex items-center gap-2 text-[#0F7377] hover:underline">
                  <CheckCircle className="h-4 w-4" />
                  Upcoming Events
                </Link>
                <Link href="/resources" className="flex items-center gap-2 text-[#0F7377] hover:underline">
                  <CheckCircle className="h-4 w-4" />
                  Resources & Guides
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who are building the next generation of unicorns with GrowthLab.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                  <Link href="/signup">
                    Join Our Community
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                  <Link href="/about">
                    Learn More About Us
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}