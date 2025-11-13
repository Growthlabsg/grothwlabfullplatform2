"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Clock, Users, ArrowRight, Home, User } from "lucide-react"
import Link from "next/link"

export default function ApplicationSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home after 30 seconds if user doesn't navigate away
    const timer = setTimeout(() => {
      router.push("/")
    }, 30000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Application Submitted!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for applying to GrowthLab Accelerator. We're excited to review your application and learn more about your startup.
          </p>
        </div>

        {/* Success Card */}
        <Card className="shadow-xl border-green-200 mb-8">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-green-800">
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Review Period</h3>
                <p className="text-sm text-gray-600">
                  Our team will review your application within 2 weeks
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Updates</h3>
                <p className="text-sm text-gray-600">
                  You'll receive email updates on your application status
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Interview Process</h3>
                <p className="text-sm text-gray-600">
                  Shortlisted candidates will be invited for interviews
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Application Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0F7377] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Application Review</h4>
                  <p className="text-gray-600 text-sm">Our team reviews your application and evaluates fit with our program</p>
                  <p className="text-[#0F7377] text-sm font-medium">Timeline: 1-2 weeks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0F7377] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Initial Screening</h4>
                  <p className="text-gray-600 text-sm">Shortlisted candidates receive an email invitation for next steps</p>
                  <p className="text-[#0F7377] text-sm font-medium">Timeline: 2-3 weeks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0F7377] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Founder Interview</h4>
                  <p className="text-gray-600 text-sm">Video call with our team to discuss your startup in detail</p>
                  <p className="text-[#0F7377] text-sm font-medium">Timeline: 3-4 weeks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0F7377] text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Final Decision</h4>
                  <p className="text-gray-600 text-sm">Final selection and program acceptance notification</p>
                  <p className="text-[#0F7377] text-sm font-medium">Timeline: 4-5 weeks</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">While You Wait</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Prepare for Interview</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Practice your pitch deck presentation</li>
                  <li>• Prepare answers to common startup questions</li>
                  <li>• Research our program and mentors</li>
                  <li>• Have your metrics and traction ready</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Continue Building</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Keep working on your product</li>
                  <li>• Gather user feedback and iterate</li>
                  <li>• Build your team and partnerships</li>
                  <li>• Document your progress and learnings</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Have questions about your application or our program?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                  asChild
                >
                  <Link href="mailto:apply@growthlab.sg">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                  asChild
                >
                  <Link href="/contact">
                    <User className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-semibold px-8 py-3"
            asChild
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white font-semibold px-8 py-3"
            asChild
          >
            <Link href="/about">
              <ArrowRight className="w-5 h-5 mr-2" />
              Learn More About GrowthLab
            </Link>
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>
            You will be automatically redirected to the home page in 30 seconds, 
            or you can use the navigation buttons above.
          </p>
        </div>
      </div>
    </div>
  )
}
