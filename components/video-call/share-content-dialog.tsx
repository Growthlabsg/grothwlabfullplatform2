"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { getShareRecipients, shareContent, getShareableLink, type ShareRecipient } from "@/lib/sharing-service"
import { Copy } from "lucide-react"

interface ShareContentDialogProps {
  isOpen: boolean
  onClose: () => void
  contentId: string
  contentType: "recording" | "transcript" | "summary"
  title: string
}

export function ShareContentDialog({ isOpen, onClose, contentId, contentType, title }: ShareContentDialogProps) {
  const [recipients, setRecipients] = useState<ShareRecipient[]>([])
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [customMessage, setCustomMessage] = useState<string>("")
  const [isSharing, setIsSharing] = useState(false)
  const [shareableLink, setShareableLink] = useState<string>("")
  const [linkExpiry, setLinkExpiry] = useState<number>(24) // Default 24 hours
  const [activeTab, setActiveTab] = useState<string>("people")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Reset state when dialog opens
      setSelectedRecipients([])
      setCustomMessage("")
      setCopied(false)

      // Load recipients
      const loadRecipients = async () => {
        const data = await getShareRecipients()
        setRecipients(data)
      }

      loadRecipients()

      // Generate shareable link
      const link = getShareableLink(contentId, contentType, linkExpiry)
      setShareableLink(link)
    }
  }, [isOpen, contentId, contentType, linkExpiry])

  const handleToggleRecipient = (recipientId: string) => {
    setSelectedRecipients((prev) =>
      prev.includes(recipientId) ? prev.filter((id) => id !== recipientId) : [...prev, recipientId],
    )
  }

  const handleShare = async () => {
    if (selectedRecipients.length === 0) return

    setIsSharing(true)

    try {
      const selectedRecipientObjects = recipients.filter((r) => selectedRecipients.includes(r.id))

      await shareContent(contentId, contentType, selectedRecipientObjects, customMessage || undefined)

      // Close dialog after successful share
      onClose()
    } catch (error) {
      console.error("Error sharing content:", error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share {contentType}</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="people" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="link">Get Link</TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Select recipients</Label>
              <div className="border rounded-md p-1 max-h-60 overflow-y-auto">
                {recipients.map((recipient) => (
                  <div key={recipient.id} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-sm">
                    <Checkbox
                      id={`recipient-${recipient.id}`}
                      checked={selectedRecipients.includes(recipient.id)}
                      onCheckedChange={() => handleToggleRecipient(recipient.id)}
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={recipient.avatar || "/placeholder.svg"} alt={recipient.name} />
                      <AvatarFallback>{recipient.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <Label htmlFor={`recipient-${recipient.id}`} className="flex-1 cursor-pointer">
                      <div>{recipient.name}</div>
                      <div className="text-xs text-muted-foreground">{recipient.email}</div>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Add a message (optional)</Label>
              <Textarea
                id="message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="I wanted to share this with you..."
                className="resize-none"
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="link" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Shareable link</Label>
              <div className="flex space-x-2">
                <Input value={shareableLink} readOnly className="flex-1" />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && <p className="text-xs text-green-600">Link copied to clipboard!</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry">Link expiry</Label>
              <select
                id="expiry"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
                value={linkExpiry}
                onChange={(e) => setLinkExpiry(Number(e.target.value))}
              >
                <option value={1}>1 hour</option>
                <option value={24}>24 hours</option>
                <option value={168}>7 days</option>
                <option value={720}>30 days</option>
                <option value={0}>No expiry</option>
              </select>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          {activeTab === "people" ? (
            <Button onClick={handleShare} disabled={isSharing || selectedRecipients.length === 0}>
              {isSharing ? "Sharing..." : "Share"}
            </Button>
          ) : (
            <Button onClick={handleCopyLink} disabled={copied}>
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
