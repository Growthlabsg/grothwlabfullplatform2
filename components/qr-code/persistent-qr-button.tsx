"use client"

import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import { useQRCode } from "@/contexts/qr-code-context"
import { QRCodeScannerDialog } from "@/components/qr-code/qr-code-scanner-dialog"
import { QRCodeGeneratorDialog } from "@/components/qr-code/qr-code-generator-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

interface PersistentQRButtonProps {
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  showTooltip?: boolean
}

export function PersistentQRButton({
  className,
  variant = "outline",
  size = "icon",
  showTooltip = true,
}: PersistentQRButtonProps) {
  // Add local state for dialogs in case context is not available
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
  const [isQRGeneratorOpen, setIsQRGeneratorOpen] = useState(false)

  // Try to use the QR code context, but provide fallbacks if it's not available
  let qrContext
  let contextAvailable = true
  
  // Check if the hook function exists before calling it
  if (typeof useQRCode === 'function') {
    try {
      qrContext = useQRCode()
    } catch (error) {
      console.warn("QRCodeProvider not found, using local state instead")
      contextAvailable = false
      qrContext = {
        openQRScanner: () => setIsQRScannerOpen(true),
        isQRScannerOpen,
        closeQRScanner: () => setIsQRScannerOpen(false),
        handleQRCodeScan: () => {},
        isQRGeneratorOpen,
        openQRGenerator: () => setIsQRGeneratorOpen(true),
        closeQRGenerator: () => setIsQRScannerOpen(false),
      }
    }
  } else {
    contextAvailable = false
    qrContext = {
      openQRScanner: () => setIsQRScannerOpen(true),
      isQRScannerOpen,
      closeQRScanner: () => setIsQRScannerOpen(false),
      handleQRCodeScan: () => {},
      isQRGeneratorOpen,
      openQRGenerator: () => setIsQRGeneratorOpen(true),
      closeQRGenerator: () => setIsQRScannerOpen(false),
    }
  }

  const {
    openQRScanner,
    isQRScannerOpen: contextQRScannerOpen,
    closeQRScanner,
    handleQRCodeScan,
    isQRGeneratorOpen: contextQRGeneratorOpen,
    openQRGenerator,
    closeQRGenerator,
  } = qrContext

  // Use either context values or local state
  const actualQRScannerOpen = contextAvailable ? contextQRScannerOpen : isQRScannerOpen
  const actualQRGeneratorOpen = contextAvailable ? contextQRGeneratorOpen : isQRGeneratorOpen

  const button = (
    <Button
      variant={variant}
      size={size}
      className={`${className} ${size === "icon" ? "rounded-full" : ""}`}
      onClick={openQRGenerator}
    >
      <QrCode className={size === "icon" ? "h-4 w-4" : "h-4 w-4 mr-2"} />
      {size !== "icon" && "QR Code"}
      <span className="sr-only">QR Code</span>
    </Button>
  )

  return (
    <>
      {showTooltip ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent>
              <p>Your Profile QR Code</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        button
      )}

      <QRCodeScannerDialog open={actualQRScannerOpen} onOpenChange={closeQRScanner} onScan={handleQRCodeScan} />

      <QRCodeGeneratorDialog open={actualQRGeneratorOpen} onOpenChange={closeQRGenerator} onScanClick={openQRScanner} />
    </>
  )
}
