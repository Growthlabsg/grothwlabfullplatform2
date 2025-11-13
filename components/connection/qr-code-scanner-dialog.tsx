"use client"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, QrCode, Camera, Copy, Check, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { QRCodeCanvas } from "qrcode.react" // Changed from default import to named import

interface QRCodeScannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnectionRequest?: (userId: string) => void
}

export function QRCodeScannerDialog({ open, onOpenChange, onConnectionRequest }: QRCodeScannerDialogProps) {
  const [activeTab, setActiveTab] = useState<"scan" | "show">("show")
  const [scanning, setScanning] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [scanResult, setScanResult] = useState<{ userId: string; success: boolean } | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

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
            if (scanning && user) {
              setTimeout(() => {
                // Simulate finding a QR code
                const mockUserId = `user${Math.floor(Math.random() * 1000)}`

                if (scanning) {
                  setScanning(false)
                  setScanResult({ userId: mockUserId, success: true })
                }
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

    if (open && activeTab === "scan" && scanning) {
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
  }, [open, activeTab, scanning, user])

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
    if (!user || !scanResult) return

    setConnecting(true)

    try {
      // In a real app, this would send an actual connection request
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Connection request sent!",
        description: "Your connection request has been sent successfully.",
      })

      // Close the dialog after successful connection
      setTimeout(() => {
        onOpenChange(false)

        // Call the onConnectionRequest callback if provided
        if (onConnectionRequest) {
          onConnectionRequest(scanResult.userId)
        } else {
          // Navigate to the user's profile
          router.push(`/connect/${scanResult.userId}`)
        }
      }, 500)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code Connection</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="show" value={activeTab} onValueChange={(value) => setActiveTab(value as "scan" | "show")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="show">My QR Code</TabsTrigger>
            <TabsTrigger value="scan">Scan QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="show" className="flex flex-col items-center justify-center py-4">
            {qrCodeData ? (
              <>
                <div className="border-4 border-primary/10 rounded-lg p-2 bg-white">
                  <QRCodeCanvas value={qrCodeData} size={200} level="H" />
                </div>
                <p className="text-sm text-center mt-4 text-muted-foreground">
                  Share this QR code with others to connect with you on GrowthLab
                </p>
                <Button variant="outline" className="mt-4" onClick={handleCopyQRCode}>
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">Generating your QR code...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="scan" className="flex flex-col items-center justify-center py-4">
            {scanResult ? (
              <div className="flex flex-col items-center justify-center py-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <QrCode className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">QR Code Scanned!</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Would you like to connect with this user?
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setScanResult(null)
                      setScanning(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleConnect} disabled={connecting}>
                    {connecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect"
                    )}
                  </Button>
                </div>
              </div>
            ) : scanning ? (
              <div className="relative w-full max-w-[300px]">
                <video ref={videoRef} className="rounded-lg w-full h-[300px] bg-black object-cover" playsInline muted />
                <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full hidden" />
                <div className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 border-2 border-primary rounded-lg"></div>
                </div>
                <Button variant="outline" className="mt-4 mx-auto block" onClick={handleStopScanning}>
                  Cancel Scanning
                </Button>
              </div>
            ) : cameraError ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                  <Camera className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-lg font-medium mb-2">Camera Error</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">{cameraError}</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCameraError(null)
                    handleStartScanning()
                  }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <QrCode className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Scan a QR Code</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Point your camera at another user's QR code to connect with them
                </p>
                <Button onClick={handleStartScanning}>
                  <Camera className="mr-2 h-4 w-4" />
                  Start Scanning
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
