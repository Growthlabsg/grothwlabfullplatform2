"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Flag, AlertTriangle } from "lucide-react"
import { useModeration } from "@/hooks/use-moderation"
import { useToast } from "@/hooks/use-toast"
import type { ReportReason } from "@/types/feed"

interface ReportButtonProps {
  contentId: string
  contentType: "post" | "comment" | "message" | "profile"
}

export function ReportButton({ contentId, contentType }: ReportButtonProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState<ReportReason>("inappropriate")
  const [details, setDetails] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { reportContent } = useModeration()
  const { toast } = useToast()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const success = await reportContent(contentId, contentType, reason, details)
      if (success) {
        toast({
          title: "Report submitted",
          description: "Thank you for helping keep our community safe.",
          variant: "default",
        })
        setOpen(false)
        setReason("inappropriate")
        setDetails("")
      } else {
        toast({
          title: "Error submitting report",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error submitting report",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Flag className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Content</DialogTitle>
            <DialogDescription>
              Help us understand what's wrong with this content. Your report will be kept confidential.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <RadioGroup value={reason} onValueChange={(value) => setReason(value as ReportReason)}>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="spam" id="spam" />
                <Label htmlFor="spam" className="font-normal cursor-pointer">
                  <div className="font-medium">Spam</div>
                  <p className="text-sm text-muted-foreground">Misleading, repetitive, or unwanted content</p>
                </Label>
              </div>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="harassment" id="harassment" />
                <Label htmlFor="harassment" className="font-normal cursor-pointer">
                  <div className="font-medium">Harassment or Bullying</div>
                  <p className="text-sm text-muted-foreground">Content that intimidates, threatens, or demeans</p>
                </Label>
              </div>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="inappropriate" id="inappropriate" />
                <Label htmlFor="inappropriate" className="font-normal cursor-pointer">
                  <div className="font-medium">Inappropriate Content</div>
                  <p className="text-sm text-muted-foreground">
                    Content that contains violence, hate speech, or adult material
                  </p>
                </Label>
              </div>
              <div className="flex items-start space-x-2 mb-3">
                <RadioGroupItem value="misinformation" id="misinformation" />
                <Label htmlFor="misinformation" className="font-normal cursor-pointer">
                  <div className="font-medium">Misinformation</div>
                  <p className="text-sm text-muted-foreground">False or misleading information</p>
                </Label>
              </div>
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="font-normal cursor-pointer">
                  <div className="font-medium">Other</div>
                  <p className="text-sm text-muted-foreground">Something else not listed here</p>
                </Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details (Optional)</Label>
              <Textarea
                id="details"
                placeholder="Please provide any additional information that might help us understand the issue."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-md">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm">
                False reports may result in action against your account. Please ensure your report is accurate.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
