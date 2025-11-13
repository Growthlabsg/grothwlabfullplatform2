"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Monitor, Layout, Laptop } from "lucide-react"
import type { Channel } from "@/types/communication"

interface ScreenShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipient: Channel
}

export function ScreenShareDialog({ open, onOpenChange, recipient }: ScreenShareDialogProps) {
  const [selectedOption, setSelectedOption] = useState<"entire" | "window" | "tab" | null>(null)
  const [isSharing, setIsSharing] = useState(false)

  const handleStartSharing = () => {
    if (!selectedOption) return
    setIsSharing(true)

    // Simulate sharing for demo
    setTimeout(() => {
      setIsSharing(false)
      onOpenChange(false)

      // Reset for next time
      setSelectedOption(null)
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share your screen with {recipient.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-4">
          <div
            className={`border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer transition-colors ${selectedOption === "entire" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setSelectedOption("entire")}
          >
            <Monitor className="h-8 w-8 mb-2 text-primary" />
            <p className="text-sm font-medium">Entire Screen</p>
          </div>

          <div
            className={`border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer transition-colors ${selectedOption === "window" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setSelectedOption("window")}
          >
            <Layout className="h-8 w-8 mb-2 text-primary" />
            <p className="text-sm font-medium">Window</p>
          </div>

          <div
            className={`border rounded-lg p-4 flex flex-col items-center justify-center hover:bg-muted cursor-pointer transition-colors ${selectedOption === "tab" ? "border-primary bg-primary/5" : ""}`}
            onClick={() => setSelectedOption("tab")}
          >
            <Laptop className="h-8 w-8 mb-2 text-primary" />
            <p className="text-sm font-medium">Browser Tab</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleStartSharing} disabled={!selectedOption || isSharing}>
            {isSharing ? "Starting screen share..." : "Share"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
