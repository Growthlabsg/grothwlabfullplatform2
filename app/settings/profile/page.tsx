import type { Metadata } from "next"
import ProfileSettingsClient from "./client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Eye, 
  Share2, 
  Download, 
  QrCode,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Profile Settings | GrowthLab",
  description: "Manage your profile settings and preferences.",
}

export default function ProfileSettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">Profile Settings</h1>
                <p className="text-sm text-gray-500">Manage your professional profile</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">View Profile</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ProfileSettingsClient />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Profile Status
                </CardTitle>
                <CardDescription>Your profile completion status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Basic Information</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Professional Experience</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Skills & Endorsements</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Digital Name Card</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-xs text-gray-500">Profile Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common profile actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link href="/profile">
                    <Eye className="h-4 w-4 mr-3" />
                    View Public Profile
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <QrCode className="h-4 w-4 mr-3" />
                  Generate QR Code
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="h-4 w-4 mr-3" />
                  Download Card
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Share2 className="h-4 w-4 mr-3" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>

            {/* Profile Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Profile Tips
                </CardTitle>
                <CardDescription>Optimize your profile visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Add a professional headshot to increase profile views by 40%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Complete your bio to help others understand your expertise</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Add skills to showcase your professional capabilities</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                    <span>Share your digital name card to expand your network</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Privacy Settings</CardTitle>
                <CardDescription>Control your profile visibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Profile Visibility</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Public
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Contact Information</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Visible
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Social Links</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Visible
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Privacy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
