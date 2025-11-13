"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, FileJson, FileIcon as FilePdf } from "lucide-react"
import type { Channel } from "@/types/communication"

interface ExportChatDialogProps {
  isOpen: boolean
  onClose: () => void
  channel: Channel
}

export function ExportChatDialog({ isOpen, onClose, channel }: ExportChatDialogProps) {
  const [format, setFormat] = useState<"pdf" | "txt" | "json">("pdf")
  const [dateRange, setDateRange] = useState<"all" | "last-week" | "last-month" | "custom">("all")
  const [includeMedia, setIncludeMedia] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = () => {
    setIsExporting(true)

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
      onClose()

      // In a real app, this would trigger a download
      console.log(`Exporting ${channel.name} chat as ${format}`)
      console.log(`Date range: ${dateRange}`)
      console.log(`Include media: ${includeMedia}`)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Export Chat</DialogTitle>
          <DialogDescription>Export your conversation with {channel.name} as a file.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-2">
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Export format</h3>
            <RadioGroup value={format} onValueChange={(value) => setFormat(value as any)} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center">
                  <FilePdf className="h-4 w-4 mr-1 text-red-500" />
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="txt" id="txt" />
                <Label htmlFor="txt" className="flex items-center">
                  <FileText className="h-4 w-4 mr-1 text-blue-500" />
                  Text
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center">
                  <FileJson className="h-4 w-4 mr-1 text-yellow-500" />
                  JSON
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Date range</h3>
            <RadioGroup value={dateRange} onValueChange={(value) => setDateRange(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all">All messages</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="last-week" id="last-week" />
                <Label htmlFor="last-week">Last 7 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="last-month" id="last-month" />
                <Label htmlFor="last-month">Last 30 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom range</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Options</h3>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-media"
                checked={includeMedia}
                onCheckedChange={(checked) => setIncludeMedia(!!checked)}
              />
              <Label htmlFor="include-media">Include media (photos, videos, files)</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Download className="h-4 w-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
