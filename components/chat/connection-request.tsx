"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ConnectionRequestProps {
  isOpen: boolean
  onClose: () => void
}

export function ConnectionRequest({ isOpen, onClose }: ConnectionRequestProps) {
  const [message, setMessage] = useState("")
  const [connectionType, setConnectionType] = useState("general")
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)

  // Sample recipient data
  const recipient = {
    id: "user1",
    name: "Sarah Wong",
    avatar: "/abstract-southwest.png",
    role: "Investor",
    company: "Horizon Ventures",
  }

  // Connection request templates
  const templates = {
    general: "Hi Sarah, I'd like to connect with you on GrowthLab.",
    investment:
      "Hi Sarah, I'm interested in discussing potential investment opportunities for my startup. Would you be open to connecting?",
    mentorship:
      "Hi Sarah, I admire your experience in the investment space. I'm looking for mentorship in this area and would appreciate connecting with you.",
    partnership:
      "Hi Sarah, I see potential synergies between our companies and would love to explore partnership opportunities. Would you be open to connecting?",
  }

  const handleConnectionTypeChange = (value: string) => {
    setConnectionType(value)
    setMessage(templates[value as keyof typeof templates])
  }

  const handleSendRequest = () => {
    setIsSending(true)
    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
      // Close dialog after showing success message
      setTimeout(() => {
        onClose()
        // Reset state for next time
        setIsSent(false)
        setConnectionType("general")
        setMessage(templates.general)
      }, 2000)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Send Connection Request</DialogTitle>
          <DialogDescription>
            {isSent
              ? "Your connection request has been sent successfully!"
              : "Send a personalized connection request to start networking."}
          </DialogDescription>
        </DialogHeader>

        {!isSent ? (
          <>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage src={recipient.avatar || "/placeholder.svg"} alt={recipient.name} />
                <AvatarFallback>{recipient.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{recipient.name}</div>
                <div className="text-sm text-muted-foreground">
                  {recipient.role} at {recipient.company}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="connection-type">Connection Purpose</Label>
                <Select value={connectionType} onValueChange={handleConnectionTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Networking</SelectItem>
                    <SelectItem value="investment">Investment Opportunity</SelectItem>
                    <SelectItem value="mentorship">Seeking Mentorship</SelectItem>
                    <SelectItem value="partnership">Partnership Exploration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Personalized Message</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a personalized message..."
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  {300 - message.length} characters remaining. A personalized message increases your chances of
                  connection.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSendRequest} disabled={isSending || message.trim() === ""}>
                {isSending ? "Sending..." : "Send Request"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium">Connection Request Sent!</h3>
            <p className="text-center text-muted-foreground mt-2">
              We'll notify you when {recipient.name} responds to your request.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
