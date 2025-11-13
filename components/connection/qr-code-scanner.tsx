"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Camera, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from "@zxing/library"

interface QRCodeScannerProps {
  onScan: (result: string) => void
  className?: string
  autoStart?: boolean
}

export function QRCodeScanner({ onScan, className = "", autoStart = true }: QRCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(autoStart)
  const [hasCamera, setHasCamera] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Initialize the code reader
    codeReaderRef.current = new BrowserMultiFormatReader()

    // Check for camera availability
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === "videoinput")
        setHasCamera(videoDevices.length > 0)

        if (videoDevices.length === 0) {
          setError("No camera found on this device")
          setIsLoading(false)
        } else if (autoStart) {
          startScanning()
        } else {
          setIsLoading(false)
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err)
        setError("Error accessing camera: " + err.message)
        setIsLoading(false)
      })

    // Cleanup on unmount
    return () => {
      if (codeReaderRef.current) {
        codeReaderRef.current.reset()
      }
    }
  }, [autoStart])

  const startScanning = async () => {
    setIsScanning(true)
    setIsLoading(true)
    setError(null)

    if (!codeReaderRef.current || !videoRef.current) {
      setError("Scanner initialization failed")
      setIsLoading(false)
      return
    }

    try {
      await codeReaderRef.current.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
        setIsLoading(false)

        if (result) {
          const qrCodeValue = result.getText()
          onScan(qrCodeValue)

          // Optional: Pause scanning after successful scan
          // setIsScanning(false)
          // codeReaderRef.current?.reset()
        }

        if (error) {
          if (
            !(error instanceof NotFoundException) &&
            !(error instanceof ChecksumException) &&
            !(error instanceof FormatException)
          ) {
            console.error("QR Code scanning error:", error)
            setError("Error scanning QR code: " + error.message)
          }
        }
      })
    } catch (err: any) {
      console.error("Error starting QR code scanner:", err)
      setError("Error starting scanner: " + err.message)
      setIsLoading(false)
      setIsScanning(false)

      toast({
        title: "Camera Access Error",
        description: "Please allow camera access to scan QR codes.",
        variant: "destructive",
      })
    }
  }

  const stopScanning = () => {
    if (codeReaderRef.current) {
      codeReaderRef.current.reset()
    }
    setIsScanning(false)
  }

  const toggleScanning = () => {
    if (isScanning) {
      stopScanning()
    } else {
      startScanning()
    }
  }

  const restartScanning = () => {
    stopScanning()
    setTimeout(() => {
      startScanning()
    }, 100)
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="p-6 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={restartScanning} disabled={!hasCamera}>
              Try Again
            </Button>
          </div>
        )}

        <div className="aspect-square w-full relative">
          {!isScanning && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-background">
              <Button onClick={startScanning} disabled={!hasCamera}>
                <Camera className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 border-2 border-primary/50"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border-2 border-primary"></div>
            </div>
          )}
        </div>

        {isScanning && (
          <div className="p-4 flex justify-center">
            <Button variant="outline" size="sm" onClick={restartScanning}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Scanner
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
