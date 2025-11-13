"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Camera, 
  QrCode, 
  Copy, 
  Check, 
  Loader2, 
  RefreshCw, 
  ArrowLeft,
  Share2,
  Download,
  MessageSquare,
  User,
  Users,
  Globe,
  Settings,
  Bell,
  Heart,
  Star,
  ExternalLink,
  Scan,
  Smartphone,
  Wifi,
  Shield,
  Zap
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { QRCodeSVG } from "qrcode.react"
import Link from "next/link"
import { UnifiedQRScanner } from "@/components/qr-code/unified-qr-scanner"

export default function QRCodeScanPage() {
  const [activeTab, setActiveTab] = useState<"scan" | "show">("show")
  const [scanning, setScanning] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [scanResult, setScanResult] = useState<{ userId: string; success: boolean } | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [showUnifiedScanner, setShowUnifiedScanner] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()

  // Generate QR code data for current user
  const qrCodeData = user ? `${process.env.NEXT_PUBLIC_APP_URL}/connect/${user.id}` : ""

  // Handle camera scanning
  useEffect(() => {
    let animationFrameId: number
    let stream: MediaStream | null = null

    const startScanning = async () => {
      if (!videoRef.current || !canvasRef.current) return

      try {
        setCameraError(null)
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        videoRef.current.srcObject = stream
        await videoRef.current.play()

        const scanQRCode = () => {
          if (!videoRef.current || !canvasRef.current || !scanning) return

          const canvas = canvasRef.current
          const context = canvas.getContext("2d")

          if (context && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
            canvas.height = videoRef.current.videoHeight
            canvas.width = videoRef.current.videoWidth

            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

            // In a real implementation, we would use a QR code scanning library
            // like jsQR to detect and decode QR codes from the canvas
            // For this mock implementation, we'll simulate finding a QR code after a delay
            if (scanning) {
              setTimeout(() => {
                // Simulate finding a QR code
                const mockUserId = `user${Math.floor(Math.random() * 1000)}`

                setScanning(false)
                setScanResult({ userId: mockUserId, success: true })
              }, 3000)
            }
          }

          if (scanning) {
            animationFrameId = requestAnimationFrame(scanQRCode)
          }
        }

        scanQRCode()
      } catch (error) {
        console.error("Error accessing camera:", error)
        setCameraError("Could not access camera. Please check permissions.")
      }
    }

    if (activeTab === "scan" && scanning) {
      startScanning()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [activeTab, scanning])

  const handleCopyQRCode = () => {
    if (qrCodeData) {
      navigator.clipboard
        .writeText(qrCodeData)
        .then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          toast({
            title: "Copied!",
            description: "Connection link copied to clipboard",
          })
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Could not copy to clipboard",
            variant: "destructive",
          })
        })
    }
  }

  const handleStartScanning = () => {
    setScanResult(null)
    setScanning(true)
  }

  const handleStopScanning = () => {
    setScanning(false)
  }

  const handleConnect = async () => {
    if (!scanResult) return

    setConnecting(true)

    try {
      // In a real app, this would send an actual connection request
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Connection request sent!",
        description: "Your connection request has been sent successfully.",
      })

      // Navigate to the user's profile
      router.push(`/profile/${scanResult.userId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send connection request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setConnecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
                <h1 className="text-lg md:text-xl font-semibold text-gray-900">QR Connect</h1>
                <p className="text-sm text-gray-500">Connect with others instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main QR Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  QR Code Connection
                </CardTitle>
                <CardDescription>Connect with other users by sharing your QR code or scanning theirs.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="show" value={activeTab} onValueChange={(value) => setActiveTab(value as "scan" | "show")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="show" className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      <span className="hidden sm:inline">My QR Code</span>
                      <span className="sm:hidden">My QR</span>
                    </TabsTrigger>
                    <TabsTrigger value="scan" className="flex items-center gap-2">
                      <Scan className="h-4 w-4" />
                      <span className="hidden sm:inline">Scan QR Code</span>
                      <span className="sm:hidden">Scan</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="show" className="flex flex-col items-center justify-center py-6">
                    {qrCodeData ? (
                      <>
                        <div className="relative">
                          <div className="border-4 border-[#0F7377]/20 rounded-xl p-4 bg-white shadow-lg">
                            <QRCodeSVG value={qrCodeData} size={200} level="H" />
                          </div>
                          <div className="absolute -top-2 -right-2">
                            <Badge variant="secondary" className="bg-[#0F7377] text-white">
                              <Shield className="h-3 w-3 mr-1" />
                              Secure
                            </Badge>
                          </div>
                        </div>
                        <div className="text-center mt-6 max-w-md">
                          <h3 className="text-lg font-semibold mb-2">Your Connection QR Code</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Share this QR code with others to connect with you on GrowthLab. They can scan it to send you a connection request.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Button variant="outline" onClick={handleCopyQRCode} className="flex-1 sm:flex-none">
                              {copied ? (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="mr-2 h-4 w-4" />
                                  Copy Link
                                </>
                              )}
                            </Button>
                            <Button variant="outline" className="flex-1 sm:flex-none">
                              <Share2 className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                            <Button variant="outline" className="flex-1 sm:flex-none">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="h-12 w-12 animate-spin text-[#0F7377]" />
                        <p className="mt-4 text-sm text-muted-foreground">Generating your QR code...</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="scan" className="flex flex-col items-center justify-center py-6">
                    {scanResult ? (
                      <div className="flex flex-col items-center justify-center py-6 max-w-md">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                          <QrCode className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">QR Code Scanned Successfully!</h3>
                        <p className="text-sm text-center text-muted-foreground mb-6">
                          Would you like to connect with this user? You'll be able to send messages and collaborate.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 w-full">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setScanResult(null)
                              setScanning(false)
                            }}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleConnect} disabled={connecting} className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90">
                            {connecting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Connecting...
                              </>
                            ) : (
                              <>
                                <User className="mr-2 h-4 w-4" />
                                Connect
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ) : scanning ? (
                      <div className="relative max-w-sm mx-auto">
                        <div className="relative">
                          <video
                            ref={videoRef}
                            className="rounded-xl w-full h-[300px] bg-black object-cover shadow-lg"
                            playsInline
                            muted
                          />
                          <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full hidden" />
                          <div className="absolute inset-0 border-2 border-[#0F7377]/50 rounded-xl pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-[#0F7377] rounded-lg">
                              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#0F7377] rounded-tl-lg"></div>
                              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#0F7377] rounded-tr-lg"></div>
                              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#0F7377] rounded-bl-lg"></div>
                              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#0F7377] rounded-br-lg"></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-sm text-muted-foreground mb-4">Position the QR code within the frame</p>
                          <Button variant="outline" onClick={handleStopScanning} className="w-full">
                            <Camera className="mr-2 h-4 w-4" />
                            Cancel Scanning
                          </Button>
                        </div>
                      </div>
                    ) : cameraError ? (
                      <div className="flex flex-col items-center justify-center py-12 max-w-md">
                        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
                          <Camera className="h-10 w-10 text-red-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Camera Access Required</h3>
                        <p className="text-sm text-center text-muted-foreground mb-6">{cameraError}</p>
                        <div className="space-y-3 w-full">
                          <Button
                            onClick={() => {
                              setCameraError(null)
                              handleStartScanning()
                            }}
                            className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Settings className="mr-2 h-4 w-4" />
                            Camera Settings
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 max-w-md">
                        <div className="w-20 h-20 rounded-full bg-[#0F7377]/10 flex items-center justify-center mb-6">
                          <Scan className="h-10 w-10 text-[#0F7377]" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Scan a QR Code</h3>
                        <p className="text-sm text-center text-muted-foreground mb-6">
                          Point your camera at another user's QR code to connect with them instantly. Make sure you have good lighting and the QR code is clearly visible.
                        </p>
                        <div className="space-y-3 w-full">
                          <Button 
                            onClick={() => setShowUnifiedScanner(true)} 
                            className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Start Scanning
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Smartphone className="mr-2 h-4 w-4" />
                            How to Scan
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connection Stats</CardTitle>
                <CardDescription>Your networking activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5">
                    <div className="text-2xl font-bold text-[#0F7377]">24</div>
                    <div className="text-xs text-gray-600">Connections</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5">
                    <div className="text-2xl font-bold text-[#F59E0B]">156</div>
                    <div className="text-xs text-gray-600">QR Scans</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5">
                    <div className="text-2xl font-bold text-[#10B981]">89</div>
                    <div className="text-xs text-gray-600">Shared</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5">
                    <div className="text-2xl font-bold text-[#8B5CF6]">12</div>
                    <div className="text-xs text-gray-600">This Week</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common connection tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="h-4 w-4 mr-3" />
                  View Connections
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Recent Messages
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="h-4 w-4 mr-3" />
                  Notifications
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Settings className="h-4 w-4 mr-3" />
                  Connection Settings
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Pro Tips
                </CardTitle>
                <CardDescription>Maximize your networking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0F7377] mt-2 flex-shrink-0" />
                    <span>Ensure good lighting when scanning QR codes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0F7377] mt-2 flex-shrink-0" />
                    <span>Hold your phone steady for better scanning</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0F7377] mt-2 flex-shrink-0" />
                    <span>Share your QR code at networking events</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0F7377] mt-2 flex-shrink-0" />
                    <span>Keep your profile updated for better connections</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Your latest connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">John Doe</p>
                    <p className="text-xs text-gray-500">Connected 2 hours ago</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">New</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-green-100 text-green-800 text-xs">AS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Alice Smith</p>
                    <p className="text-xs text-gray-500">Connected yesterday</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100 text-purple-800 text-xs">MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Mike Johnson</p>
                    <p className="text-xs text-gray-500">Connected 3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Unified QR Scanner */}
      <UnifiedQRScanner
        isOpen={showUnifiedScanner}
        onClose={() => setShowUnifiedScanner(false)}
        mode="general"
        onProfileScanned={(userId) => {
          toast({
            title: "Profile Found",
            description: `Redirecting to user ${userId}'s profile`,
          })
          setShowUnifiedScanner(false)
        }}
      />
    </div>
  )
}
