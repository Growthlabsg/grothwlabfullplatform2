"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Simplified version of the QRCode context for demonstration
interface QRCodeContextType {
  openQRScanner: () => void
  openQRGenerator: () => void
  closeQRScanner: () => void
  closeQRGenerator: () => void
  isQRScannerOpen: boolean
  isQRGeneratorOpen: boolean
  handleQRCodeScan: (data: string) => void
}

const QRCodeContext = createContext<QRCodeContextType | undefined>(undefined)

export function QRCodeProvider({ children }: { children: React.ReactNode }) {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false)
  const [isQRGeneratorOpen, setIsQRGeneratorOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const openQRScanner = useCallback(() => setIsQRScannerOpen(true), [])
  const closeQRScanner = useCallback(() => setIsQRScannerOpen(false), [])
  const openQRGenerator = useCallback(() => setIsQRGeneratorOpen(true), [])
  const closeQRGenerator = useCallback(() => setIsQRGeneratorOpen(false), [])

  const handleQRCodeScan = useCallback(
    (data: string) => {
      closeQRScanner()

      try {
        // Try to parse as URL or JSON
        let url: URL
        try {
          url = new URL(data)

          // Handle profile URLs
          if (url.pathname.startsWith("/connect/") || url.pathname.startsWith("/profile/")) {
            const userId = url.pathname.split("/").pop()
            if (userId) {
              toast({
                title: "QR Code Scanned",
                description: "Navigating to user profile...",
              })
              router.push(`/connect/${userId}`)
              return
            }
          }
        } catch (e) {
          // Not a valid URL, try as JSON
          try {
            const jsonData = JSON.parse(data)
            if (jsonData.userId) {
              toast({
                title: "QR Code Scanned",
                description: "Navigating to user profile...",
              })
              router.push(`/connect/${jsonData.userId}`)
              return
            }
          } catch (jsonError) {
            // Not valid JSON either
          }
        }

        // If we get here, we couldn't handle the QR code
        toast({
          title: "Invalid QR Code",
          description: "This QR code format is not recognized.",
          variant: "destructive",
        })
      } catch (error) {
        console.error("Error handling QR code scan:", error)
        toast({
          title: "Error",
          description: "There was a problem processing the QR code.",
          variant: "destructive",
        })
      }
    },
    [closeQRScanner, router, toast],
  )

  return (
    <QRCodeContext.Provider
      value={{
        openQRScanner,
        openQRGenerator,
        closeQRScanner,
        closeQRGenerator,
        isQRScannerOpen,
        isQRGeneratorOpen,
        handleQRCodeScan,
      }}
    >
      {children}
    </QRCodeContext.Provider>
  )
}

export function useQRCode() {
  const context = useContext(QRCodeContext)
  if (context === undefined) {
    throw new Error("useQRCode must be used within a QRCodeProvider")
  }
  return context
}
