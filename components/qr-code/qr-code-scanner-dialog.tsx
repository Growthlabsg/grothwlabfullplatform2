"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { Camera, X } from "lucide-react"

interface QRCodeScannerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onScan: (data: string) => void
}

export function QRCodeScannerDialog({ open, onOpenChange, onScan }: QRCodeScannerDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Initialize camera when dialog opens
  useEffect(() => {
    if (open) {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [open])

  const startCamera = async () => {
    try {
      setError(null)

      // Check if navigator and mediaDevices are available (for SSR and older browsers)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera access is not supported in your browser")
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()

        // Start scanning for QR codes
        requestAnimationFrame(scanQRCode)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setError("Could not access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const scanQRCode = () => {
    if (!open || !videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const context = canvas.getContext("2d")
      if (!context) return

      canvas.height = video.videoHeight
      canvas.width = video.videoWidth

      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // In a real implementation, you would use a QR code scanning library here
      // For example: jsQR, zxing, etc.
      // For this example, we'll just simulate finding a QR code after a delay

      // Simulated QR code detection (remove in real implementation)
      // This is just for demonstration purposes
      /* 
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      
      if (code) {
        onScan(code.data)
        onOpenChange(false)
        return
      }
      */
    }

    // Continue scanning
    requestAnimationFrame(scanQRCode)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center">
          {error ? (
            <div className="text-center p-4">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={startCamera}>
                <Camera className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="relative w-full aspect-square max-w-sm mx-auto overflow-hidden rounded-lg">
                <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" playsInline muted />
                <div className="absolute inset-0 border-2 border-primary/50 rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-2 border-primary rounded-lg" />
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
              <p className="text-sm text-center mt-4 text-muted-foreground">
                Position the QR code within the frame to scan
              </p>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
