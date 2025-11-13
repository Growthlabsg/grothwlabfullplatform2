"use client"

import { useState } from "react"
import { QRNetworkingHub } from "@/components/qr-networking/qr-networking-hub"
import { QRScanner } from "@/components/qr-networking/qr-scanner"
import { DigitalBusinessCard } from "@/components/qr-networking/digital-business-card"
import { NetworkingNotifications } from "@/components/qr-networking/networking-notifications"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  QrCode, 
  QrCodeIcon, 
  Camera, 
  Users, 
  Calendar, 
  Bell, 
  CreditCard,
  BarChart3,
  Settings,
  Zap,
  Star,
  TrendingUp,
  Award,
  Target
} from "lucide-react"

export default function QRNetworkingPage() {
  const [activeTab, setActiveTab] = useState("hub")
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scannerMode, setScannerMode] = useState<"profile" | "event" | "checkin">("profile")

  const handleScan = (data: any) => {
    console.log("Scanned data:", data)
    // Handle the scanned data based on mode
    setShowQRScanner(false)
  }

  const openScanner = (mode: "profile" | "event" | "checkin") => {
    setScannerMode(mode)
    setShowQRScanner(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  QR Networking System
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Connect, Check-in, and Network with QR Codes
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => openScanner("profile")}
                className="flex items-center gap-2"
              >
                <Camera className="h-4 w-4" />
                Scan QR
              </Button>
              <Button 
                onClick={() => openScanner("checkin")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <QrCodeIcon className="h-4 w-4 mr-2" />
                Event Check-in
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white dark:bg-gray-800 p-1 rounded-xl shadow-lg">
            <TabsTrigger value="hub" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <QrCode className="h-4 w-4 mr-2" />
              Hub
            </TabsTrigger>
            <TabsTrigger value="business-card" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <CreditCard className="h-4 w-4 mr-2" />
              Business Card
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="help" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Zap className="h-4 w-4 mr-2" />
              Help
            </TabsTrigger>
          </TabsList>

          {/* QR Networking Hub Tab */}
          <TabsContent value="hub">
            <QRNetworkingHub />
          </TabsContent>

          {/* Digital Business Card Tab */}
          <TabsContent value="business-card">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Digital Business Card
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Your professional profile in a shareable digital format
                </p>
              </div>
              
              <DigitalBusinessCard />
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <NetworkingNotifications />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Networking Analytics
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your networking progress and connections over time
                </p>
              </div>

              {/* Analytics Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600">247</div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Total Connections</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-green-600">23</div>
                    <p className="text-sm text-green-600 dark:text-green-400">Events Attended</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-purple-600">89%</div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Follow-up Rate</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-orange-600">15</div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Achievements</p>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Monthly Connection Growth
                    </CardTitle>
                    <CardDescription>
                      Track your networking progress month over month
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { month: "Jan", connections: 12, target: 20 },
                        { month: "Feb", connections: 18, target: 20 },
                        { month: "Mar", connections: 25, target: 20 },
                        { month: "Apr", connections: 22, target: 20 },
                        { month: "May", connections: 28, target: 20 },
                        { month: "Jun", connections: 35, target: 20 }
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.month}</span>
                            <span className="text-gray-500">{item.connections}/{item.target}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((item.connections / item.target) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Top Networking Categories
                    </CardTitle>
                    <CardDescription>
                      Your most active networking areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Technology", count: 89, percentage: 36 },
                        { category: "Finance", count: 67, percentage: 27 },
                        { category: "Healthcare", count: 45, percentage: 18 },
                        { category: "Education", count: 34, percentage: 14 },
                        { category: "Other", count: 12, percentage: 5 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500 w-8 text-right">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  QR Networking Settings
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Customize your networking experience and preferences
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>
                      Control what information is shared in your QR code
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Show email address</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Show phone number</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Show company details</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Show social media links</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Manage how and when you receive networking notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Follow-up reminders</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">New connection alerts</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Event check-in reminders</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Weekly networking reports</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  How to Use QR Networking
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn how to make the most of your QR networking experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      Creating Your Profile QR Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>1. Go to the Profile tab in the QR Networking Hub</p>
                      <p>2. Your QR code is automatically generated with your profile information</p>
                      <p>3. Download or share your QR code with others</p>
                      <p>4. Others can scan it to connect with you instantly</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      Scanning QR Codes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>1. Click the "Scan QR Code" button</p>
                      <p>2. Point your camera at someone's profile QR code</p>
                      <p>3. Add notes and tags about the connection</p>
                      <p>4. Take a selfie together (optional)</p>
                      <p>5. Set follow-up reminders</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Event Check-ins
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>1. Use the "Event Check-in" mode when scanning</p>
                      <p>2. Scan the event QR code at the venue</p>
                      <p>3. Automatically log your attendance</p>
                      <p>4. Connect with other attendees</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Managing Follow-ups
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p>1. Set reminders when making connections</p>
                      <p>2. View all follow-ups in the Notifications tab</p>
                      <p>3. Mark reminders as complete</p>
                      <p>4. Never miss an important follow-up</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        mode={scannerMode}
        onScan={handleScan}
      />
    </div>
  )
}
