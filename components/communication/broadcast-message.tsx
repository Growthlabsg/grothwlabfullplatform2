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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Megaphone, Users, AlertTriangle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BroadcastMessageProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock recipient groups
const recipientGroups = [
  { id: "all", name: "All Users", count: 2845, selected: true },
  { id: "founders", name: "Founders", count: 1450, selected: false },
  { id: "investors", name: "Investors", count: 580, selected: false },
  { id: "mentors", name: "Mentors", count: 420, selected: false },
  { id: "teachers", name: "Teachers", count: 245, selected: false },
  { id: "admins", name: "Admins", count: 150, selected: false },
]

export function BroadcastMessage({ open, onOpenChange }: BroadcastMessageProps) {
  const [message, setMessage] = useState("")
  const [selectedGroups, setSelectedGroups] = useState<string[]>(["all"])
  const [priority, setPriority] = useState("normal")
  const [scheduleDelivery, setScheduleDelivery] = useState(false)
  const [deliveryDate, setDeliveryDate] = useState<string>("")
  const [deliveryTime, setDeliveryTime] = useState<string>("")
  const [requireConfirmation, setRequireConfirmation] = useState(false)
  const [sendNotification, setSendNotification] = useState(true)

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) => {
      if (groupId === "all") {
        return ["all"]
      }

      const newSelection = prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev.filter((id) => id !== "all"), groupId]

      return newSelection.length === 0 ? ["all"] : newSelection
    })
  }

  const handleSendBroadcast = () => {
    // In a real app, this would send the broadcast message
    console.log("Sending broadcast message:", {
      message,
      selectedGroups,
      priority,
      scheduleDelivery: scheduleDelivery ? { date: deliveryDate, time: deliveryTime } : null,
      requireConfirmation,
      sendNotification,
    })

    onOpenChange(false)
    setMessage("")
    setSelectedGroups(["all"])
    setPriority("normal")
    setScheduleDelivery(false)
    setDeliveryDate("")
    setDeliveryTime("")
    setRequireConfirmation(false)
    setSendNotification(true)
  }

  const totalRecipients = selectedGroups.includes("all")
    ? (recipientGroups[0] ? recipientGroups[0].count : undefined)
    : recipientGroups.filter((group) => selectedGroups.includes(group.id)).reduce((sum, group) => sum + group.count, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-amber-500" />
            Broadcast Message
          </DialogTitle>
          <DialogDescription>Send an announcement to multiple recipients at once</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Recipient Groups</Label>
            <ScrollArea className="h-32 border rounded-md p-2">
              <div className="space-y-2">
                {recipientGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={() => handleGroupToggle(group.id)}
                    />
                    <Label
                      htmlFor={`group-${group.id}`}
                      className="flex items-center justify-between flex-1 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{group.name}</span>
                      </div>
                      <Badge variant="outline">{group.count}</Badge>
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total recipients:</span>
              <Badge>{totalRecipients}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="broadcast-message">Message</Label>
            <Textarea
              id="broadcast-message"
              placeholder="Type your broadcast message here..."
              className="min-h-[120px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="schedule-delivery"
                  checked={scheduleDelivery}
                  onCheckedChange={(checked) => setScheduleDelivery(checked === true)}
                />
                <Label htmlFor="schedule-delivery">Schedule Delivery</Label>
              </div>

              {scheduleDelivery && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                  <input
                    type="time"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="require-confirmation"
                checked={requireConfirmation}
                onCheckedChange={(checked) => setRequireConfirmation(checked === true)}
              />
              <Label htmlFor="require-confirmation">Require read confirmation</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="send-notification"
                checked={sendNotification}
                onCheckedChange={(checked) => setSendNotification(checked === true)}
              />
              <Label htmlFor="send-notification">Send as notification</Label>
            </div>
          </div>

          {priority === "urgent" && (
            <div className="flex items-center p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
              <p className="text-sm">
                Urgent broadcasts will send push notifications to all recipients, even if they have notifications
                disabled.
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSendBroadcast} disabled={!message.trim() || selectedGroups.length === 0}>
            {scheduleDelivery ? "Schedule Broadcast" : "Send Broadcast"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
