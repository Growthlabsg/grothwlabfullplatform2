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
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface ScheduleMessageDialogProps {
  isOpen: boolean
  onClose: () => void
  channelId: string
  initialMessage?: string
}

export function ScheduleMessageDialog({ isOpen, onClose, channelId, initialMessage = "" }: ScheduleMessageDialogProps) {
  const [message, setMessage] = useState(initialMessage)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState<"daily" | "weekly" | "monthly">("daily")
  const [isScheduling, setIsScheduling] = useState(false)

  const handleSchedule = () => {
    if (!message.trim() || !date) return

    setIsScheduling(true)

    // Combine date and time
    const scheduledDateTime = new Date(date)
    const [hours, minutes] = time.split(":").map(Number)
    scheduledDateTime.setHours(hours, minutes)

    // Simulate scheduling API call
    setTimeout(() => {
      console.log(`Scheduling message for ${scheduledDateTime.toLocaleString()}`)
      console.log(`Message: ${message}`)
      console.log(`Channel ID: ${channelId}`)
      console.log(`Recurring: ${isRecurring ? recurringFrequency : "No"}`)

      setIsScheduling(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule Message</DialogTitle>
          <DialogDescription>Schedule a message to be sent at a specific time.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <>
                      <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, "0")}:00`}>
                        {hour.toString().padStart(2, "0")}:00
                      </SelectItem>
                      <SelectItem key={`${hour}:30`} value={`${hour.toString().padStart(2, "0")}:30`}>
                        {hour.toString().padStart(2, "0")}:30
                      </SelectItem>
                    </>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="recurring" checked={isRecurring} onCheckedChange={(checked) => setIsRecurring(!!checked)} />
              <Label htmlFor="recurring">Recurring message</Label>
            </div>

            {isRecurring && (
              <div className="pl-6">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={recurringFrequency} onValueChange={(value) => setRecurringFrequency(value as any)}>
                  <SelectTrigger id="frequency" className="mt-1">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} disabled={isScheduling || !message.trim() || !date}>
            {isScheduling ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Schedule
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
