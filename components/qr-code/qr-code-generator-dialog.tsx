"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { 
  Camera, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Shield, 
  User, 
  QrCode, 
  Scan,
  Smartphone,
  Wifi,
  Zap,
  Star,
  Heart,
  MessageSquare,
  ExternalLink,
  Settings,
  Bell,
  Users,
  Globe,
  Loader2
} from "lucide-react"
import QRCode from "react-qr-code"
import { useState, useEffect } from "react"
// import { useAuth } from "@/contexts/auth-context"

interface QRCodeGeneratorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onScanClick: () => void
}

export function QRCodeGeneratorDialog({ open, onOpenChange, onScanClick }: QRCodeGeneratorDialogProps) {
  const [activeTab, setActiveTab] = useState("my-profile")
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [sharing, setSharing] = useState(false)
  const { toast } = useToast()
  // const { user } = useAuth()

  // Get user data from auth context or use defaults
  // Unified QR code that works for profile, E-card, and event attendance
  const userId = "user123" // In real app, this would come from auth context
  const unifiedQRData = typeof window !== 'undefined' 
    ? JSON.stringify({
        type: "unified",
        userId: userId,
        profileUrl: `${window.location.origin}/profile`,
        settingsUrl: `${window.location.origin}/settings/profile`,
        timestamp: Date.now()
      })
    : JSON.stringify({
        type: "unified", 
        userId: "user123",
        profileUrl: "https://growthlab.sg/profile",
        settingsUrl: "https://growthlab.sg/settings/profile",
        timestamp: Date.now()
      })
  const userName = "John Doe"
  const userTitle = "GrowthLab Member"
  const userAvatar = "/abstract-geometric-shapes.png"

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const svg = document.getElementById("profile-qr-code")
      if (!svg) {
        throw new Error("QR code not found")
      }

      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL("image/png")

        // Download the PNG file
        const downloadLink = document.createElement("a")
        downloadLink.download = `${userName.replace(/\s+/g, "-").toLowerCase()}-qr-code.png`
        downloadLink.href = pngFile
        downloadLink.click()

        toast({
          title: "Download Complete",
          description: "Your QR code has been downloaded successfully",
        })
      }

      img.onerror = () => {
        throw new Error("Failed to process QR code image")
      }

      img.src = "data:image/svg+xml;base64," + btoa(svgData)
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download Failed",
        description: "Could not download QR code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = async () => {
    setSharing(true)
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${userName}'s Profile QR Code`,
          text: `Scan this QR code to connect with ${userName} on GrowthLab`,
          url: `${window.location.origin}/profile`,
        })
        toast({
          title: "Shared Successfully",
          description: "Your QR code has been shared",
        })
      } else {
        // Fallback to copying the URL
        await navigator.clipboard.writeText(`${window.location.origin}/profile`)
        toast({
          title: "Link Copied",
          description: "Profile link copied to clipboard",
        })
      }
    } catch (error) {
      console.error("Share error:", error)
      toast({
        title: "Share Failed",
        description: "Could not share QR code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSharing(false)
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/profile`)
      setCopied(true)
      toast({
        title: "Link Copied",
        description: "Profile link copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy error:", error)
      toast({
        title: "Copy Failed",
        description: "Could not copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <QrCode className="h-5 w-5 text-[#0F7377]" />
            Your QR Code
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="my-profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">My Profile</span>
              <span className="sm:hidden">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex items-center gap-2">
              <Scan className="h-4 w-4" />
              <span className="hidden sm:inline">Scan QR Code</span>
              <span className="sm:hidden">Scan</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-profile" className="space-y-6">
            {/* User Profile Section */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#0F7377]/5 to-[#0F7377]/10 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-[#0F7377] text-white font-semibold">
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{userName}</h3>
                <p className="text-sm text-gray-600 truncate">{userTitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-[#0F7377]/10 text-[#0F7377]">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#0F7377]/20">
                  <QRCode 
                    id="profile-qr-code" 
                    value={unifiedQRData} 
                    size={180} 
                    level="H" 
                    className="h-auto max-w-full" 
                  />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="bg-[#0F7377] text-white text-xs">
                    <Wifi className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-900">Your Universal QR Code</h4>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  One QR code for everything: share your profile, E-card, and check into events
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1"
                >
                  {downloading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-4 w-4" />
                  )}
                  Download
                </Button>
                <Button 
                  onClick={handleShare}
                  disabled={sharing}
                  className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90"
                >
                  {sharing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Share2 className="mr-2 h-4 w-4" />
                  )}
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleCopyLink}
                  disabled={copied}
                  className="flex-1"
                >
                  {copied ? (
                    <Check className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Copy Link"}
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-semibold text-[#0F7377]">24</div>
                <div className="text-xs text-gray-600">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-[#F59E0B]">156</div>
                <div className="text-xs text-gray-600">QR Scans</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-[#10B981]">89</div>
                <div className="text-xs text-gray-600">Shared</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scan" className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/20 rounded-full flex items-center justify-center">
                <Scan className="h-10 w-10 text-[#0F7377]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Scan QR Code</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Use your camera to scan someone else's QR code and connect instantly
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    onOpenChange(false)
                    setTimeout(() => {
                      onScanClick()
                    }, 100)
                  }}
                  className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                  size="lg"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Open Scanner
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    <Smartphone className="mr-2 h-4 w-4" />
                    How to Scan
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Pro Tips
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0F7377] mt-2 flex-shrink-0" />
                  <span>Ensure good lighting when scanning QR codes</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0F7377] mt-2 flex-shrink-0" />
                  <span>Hold your phone steady for better scanning</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0F7377] mt-2 flex-shrink-0" />
                  <span>Make sure the QR code is clearly visible</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
