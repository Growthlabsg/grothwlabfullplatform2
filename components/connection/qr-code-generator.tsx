"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react" // Changed from default import to named import
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface QRCodeGeneratorProps {
  value: string
  size?: number
  className?: string
}

export function QRCodeGenerator({ value, size = 256, className }: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="bg-white p-4 rounded-lg mb-4">
          <QRCodeSVG value={value} size={size} /> {/* Changed from QRCode to QRCodeSVG */}
        </div>
        <Button onClick={handleCopy} className="w-full">
          {copied ? "Copied!" : "Copy Connection Link"}
        </Button>
      </CardContent>
    </Card>
  )
}
