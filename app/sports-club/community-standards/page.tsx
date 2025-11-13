"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Heart, Users, Target, Trophy, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function CommunityStandardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#0F7377]/90 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Community Standards
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Our commitment to creating a safe, inclusive, and positive environment for all athletes
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Our Values */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Respect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Treat everyone with dignity and respect, regardless of skill level, background, or experience.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Inclusion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">We welcome athletes of all backgrounds, skill levels, and abilities to join our community.</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Strive for personal and team excellence while supporting others in their journey.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Code of Conduct */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Code of Conduct</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Do's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Be respectful and supportive of all participants</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Follow the rules and guidelines of each sport</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Communicate clearly and constructively</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Help create a welcoming environment for newcomers</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Report any inappropriate behavior to moderators</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <span>Celebrate others' achievements and progress</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    Don'ts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <span>Use offensive language, slurs, or discriminatory remarks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <span>Engage in harassment, bullying, or intimidation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <span>Cheat, use performance-enhancing drugs, or unsportsmanlike conduct</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <span>Share inappropriate content or spam</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <span>Discriminate based on race, gender, age, religion, or ability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                      <span>Engage in physical violence or threats</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Enforcement */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Enforcement</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  How We Handle Violations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Reporting Process</h3>
                    <ol className="space-y-2 text-sm text-gray-600">
                      <li>1. Report violations through our reporting system</li>
                      <li>2. Our moderation team reviews within 24 hours</li>
                      <li>3. We investigate and gather evidence</li>
                      <li>4. Appropriate action is taken based on severity</li>
                      <li>5. All parties are notified of the outcome</li>
                    </ol>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Consequences</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Warning</Badge>
                        <span className="text-gray-600">First offense, minor violations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Temporary Ban</Badge>
                        <span className="text-gray-600">1-30 days for repeated violations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">Permanent Ban</Badge>
                        <span className="text-gray-600">Serious or repeated violations</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Safety Guidelines */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Safety Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Physical Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Warm up properly before any physical activity</li>
                    <li>• Use appropriate safety equipment</li>
                    <li>• Stay hydrated and take breaks when needed</li>
                    <li>• Report any injuries immediately</li>
                    <li>• Follow venue safety protocols</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Online Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Protect your personal information</li>
                    <li>• Report suspicious behavior or accounts</li>
                    <li>• Use strong passwords and enable 2FA</li>
                    <li>• Be cautious when meeting people offline</li>
                    <li>• Respect others' privacy and boundaries</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact & Appeals */}
          <section>
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions or Concerns?</h2>
                <p className="text-gray-600 mb-6">
                  If you have questions about our community standards or need to report a violation, 
                  please don't hesitate to reach out to our moderation team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/sports-club/contact">
                      Contact Moderation Team
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/sports-club/appeal">
                      Appeal a Decision
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Back to Sports Club */}
          <div className="text-center">
            <Button asChild variant="outline">
              <Link href="/sports-club">
                ← Back to Sports Club
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
