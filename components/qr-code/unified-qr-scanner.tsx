"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { 
  QrCode, 
  Camera, 
  CheckCircle, 
  X, 
  User, 
  CreditCard, 
  Calendar,
  ExternalLink,
  Scan,
  Smartphone
} from "lucide-react"

interface UnifiedQRScannerProps {
  isOpen: boolean
  onClose: () => void
  mode?: "profile" | "event" | "general"
  eventId?: number
  onProfileScanned?: (userId: string) => void
  onEventScanned?: (userId: string, eventId: number) => void
}

export function UnifiedQRScanner({ 
  isOpen, 
  onClose, 
  mode = "general",
  eventId,
  onProfileScanned,
  onEventScanned
}: UnifiedQRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedData, setScannedData] = useState<any>(null)
  const [showResult, setShowResult] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen && isScanning) {
      startScanning()
    } else {
      stopScanning()
    }
  }, [isOpen, isScanning])

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      })
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const handleQRScan = (qrData: string) => {
    try {
      // Try to parse as JSON (unified QR code)
      const parsedData = JSON.parse(qrData)
      
      if (parsedData.type === "unified" && parsedData.userId) {
        setScannedData(parsedData)
        setShowResult(true)
        setIsScanning(false)
        
        // Handle based on mode
        if (mode === "profile" && onProfileScanned) {
          onProfileScanned(parsedData.userId)
        } else if (mode === "event" && onEventScanned && eventId) {
          onEventScanned(parsedData.userId, eventId)
        }
        
        return
      }
    } catch (error) {
      // Not a JSON QR code, might be old format
      console.log("Not a unified QR code format")
    }
    
    toast({
      title: "Invalid QR Code",
      description: "This QR code is not compatible with GrowthLab",
      variant: "destructive"
    })
  }

  const handleProfileAction = () => {
    if (scannedData?.profileUrl) {
      window.open(scannedData.profileUrl, '_blank')
    }
  }

  const handleSettingsAction = () => {
    if (scannedData?.settingsUrl) {
      window.open(scannedData.settingsUrl, '_blank')
    }
  }

  const handleEventCheckIn = () => {
    if (scannedData?.userId && eventId && onEventScanned) {
      onEventScanned(scannedData.userId, eventId)
      onClose()
    }
  }

  const resetScanner = () => {
    setScannedData(null)
    setShowResult(false)
    setIsScanning(true)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Scan className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {mode === "profile" && "Scan a profile QR code to view their information"}
            {mode === "event" && "Scan a QR code to check in to this event"}
            {mode === "general" && "Scan any GrowthLab QR code"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!showResult ? (
            <>
              {isScanning ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-64 bg-black rounded-lg object-cover"
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 border-2 border-[#0F7377]/50 rounded-lg pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-[#0F7377] rounded-lg">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#0F7377] rounded-tl-lg"></div>
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#0F7377] rounded-tr-lg"></div>
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#0F7377] rounded-bl-lg"></div>
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#0F7377] rounded-br-lg"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
                  <Camera className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Camera not started</p>
                  <Button onClick={() => setIsScanning(true)}>
                    <Camera className="mr-2 h-4 w-4" />
                    Start Camera
                  </Button>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsScanning(!isScanning)}
                  className="flex-1"
                >
                  {isScanning ? "Stop Scanning" : "Start Scanning"}
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">QR Code Scanned Successfully!</h3>
                <p className="text-sm text-gray-600">
                  User ID: {scannedData?.userId}
                </p>
              </div>

              <div className="space-y-3">
                {mode === "general" && (
                  <>
                    <Button 
                      onClick={handleProfileAction}
                      className="w-full"
                      variant="outline"
                    >
                      <User className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                    <Button 
                      onClick={handleSettingsAction}
                      className="w-full"
                      variant="outline"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      View E-Card
                    </Button>
                  </>
                )}
                
                {mode === "event" && (
                  <Button 
                    onClick={handleEventCheckIn}
                    className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Check In to Event
                  </Button>
                )}
                
                {mode === "profile" && (
                  <Button 
                    onClick={handleProfileAction}
                    className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Profile
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={resetScanner}
                  className="flex-1"
                >
                  Scan Another
                </Button>
                <Button 
                  onClick={onClose}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
