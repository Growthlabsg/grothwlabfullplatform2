"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Award
} from "lucide-react"
import Link from "next/link"

export default function FundingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Funding Opportunities</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Discover funding opportunities to fuel your startup's growth
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
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#0F7377] to-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">SGD 50M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Funding Available</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F59E0B]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">156</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Startups Funded</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#10B981] to-[#10B981]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#8B5CF6] to-[#8B5CF6]/80 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Active Investors</div>
            </CardContent>
          </Card>
        </div>

        {/* Funding Opportunities */}
        <div className="space-y-6">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 ring-2 ring-[#0F7377]/20">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">GrowthLab Accelerator Fund</h3>
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      </div>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-blue-100 text-blue-800">Accelerator</Badge>
                        <Badge className="bg-green-100 text-green-800">Open</Badge>
                        <Badge variant="outline">Pre-seed</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[#0F7377] mb-1">SGD 500K</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">6-8% equity</div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Our flagship accelerator program with direct investment and comprehensive support for early-stage startups.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>📍 Singapore</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>🏢 All Industries</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>📅 March 31, 2025</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-80">
                  <Card className="bg-gray-50 dark:bg-gray-700">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Info</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Type:</span>
                          <span className="font-medium text-gray-900 dark:text-white">Accelerator</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Stage:</span>
                          <span className="font-medium text-gray-900 dark:text-white">Pre-seed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Deadline:</span>
                          <span className="font-medium text-gray-900 dark:text-white">March 31, 2025</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white" asChild>
                          <Link href="/accelerator/apply">
                            Apply Now
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/accelerator">
                            Learn More
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="mt-12 border-0 shadow-lg bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Funded?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of startups that have successfully raised funding through our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white" asChild>
                <Link href="/accelerator/apply">
                  Apply for Funding
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30" asChild>
                <Link href="/contact">
                  Get Help
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}