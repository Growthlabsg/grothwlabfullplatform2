"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Send, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface ScheduledMessage {
  id: string
  message: string
  recipient: string
  scheduledDate: Date
  scheduledTime: string
  status: "pending" | "sent" | "cancelled"
  platform: "whatsapp" | "telegram" | "email" | "sms"
}

const MessageScheduler = () => {
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [recipient, setRecipient] = useState("")
  const [platform, setPlatform] = useState<string>("whatsapp")
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [scheduledTime, setScheduledTime] = useState("")
  const [scheduledMessages, setScheduledMessages] = useState<ScheduledMessage[]>([])

  const handleScheduleMessage = () => {
    if (!message || !recipient || !scheduledDate || !scheduledTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newMessage: ScheduledMessage = {
      id: Date.now().toString(),
      message,
      recipient,
      scheduledDate: scheduledDate!,
      scheduledTime,
      status: "pending",
      platform: platform as any,
    }

    setScheduledMessages([...scheduledMessages, newMessage])
    
    // Reset form
    setMessage("")
    setRecipient("")
    setScheduledDate(undefined)
    setScheduledTime("")

    toast({
      title: "Message Scheduled",
      description: "Your message has been scheduled successfully.",
    })
  }

  const handleCancelMessage = (id: string) => {
    setScheduledMessages(scheduledMessages.map(msg => 
      msg.id === id ? { ...msg, status: "cancelled" as const } : msg
    ))
    
    toast({
      title: "Message Cancelled",
      description: "The scheduled message has been cancelled.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-100"
      case "sent": return "text-green-600 bg-green-100"
      case "cancelled": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Scheduler</CardTitle>
        <CardDescription>Schedule messages to be sent at a later time.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input
              id="recipient"
              placeholder="Enter phone number or email"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="telegram">Telegram</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Schedule Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !scheduledDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduledDate ? format(scheduledDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={scheduledDate}
                  onSelect={setScheduledDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Schedule Time</Label>
            <Input
              id="time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={handleScheduleMessage} className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Schedule Message
        </Button>
      </CardContent>

      <CardFooter>
        <div className="w-full space-y-4">
          <h4 className="font-medium">Scheduled Messages</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {scheduledMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No scheduled messages</p>
            ) : (
              scheduledMessages.map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{msg.recipient}</p>
                    <p className="text-xs text-muted-foreground">{msg.message.substring(0, 50)}...</p>
                    <p className="text-xs text-muted-foreground">
                      {format(msg.scheduledDate, "PPP")} at {msg.scheduledTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("px-2 py-1 rounded-full text-xs", getStatusColor(msg.status))}>
                      {msg.status}
                    </span>
                    {msg.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelMessage(msg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default MessageScheduler
