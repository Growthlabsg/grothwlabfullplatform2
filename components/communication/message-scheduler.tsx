"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { CalendarIcon, Clock, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface MessageSchedulerProps {
  onSchedule: (
    date: Date,
    recurring?: {
      frequency: "daily" | "weekly" | "monthly"
      endDate?: Date
    },
  ) => void
  className?: string
}

export function MessageScheduler({ onSchedule, className }: MessageSchedulerProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("09:00")
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurringFrequency, setRecurringFrequency] = useState<"daily" | "weekly" | "monthly">("daily")
  const [recurringEndDate, setRecurringEndDate] = useState<Date | undefined>(undefined)

  const handleSchedule = () => {
    if (!date) return

    const [hours, minutes] = time.split(":").map(Number)
    const scheduledDate = new Date(date)
    scheduledDate.setHours(hours, minutes, 0, 0)

    if (isRecurring) {
      onSchedule(scheduledDate, {
        frequency: recurringFrequency,
        endDate: recurringEndDate,
      })
    } else {
      onSchedule(scheduledDate)
    }
  }

  return (
    <div className={cn("border rounded-md p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Schedule Message</h3>
      </div>

      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
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

        <div className="grid gap-2">
          <Label htmlFor="time">Time</Label>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="recurring" checked={isRecurring} onCheckedChange={setIsRecurring} />
          <Label htmlFor="recurring">Recurring message</Label>
        </div>

        {isRecurring && (
          <div className="space-y-4 pl-6 border-l-2 border-muted">
            <div className="grid gap-2">
              <Label>Frequency</Label>
              <Tabs
                defaultValue="daily"
                value={recurringFrequency}
                onValueChange={(v) => setRecurringFrequency(v as "daily" | "weekly" | "monthly")}
              >
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="end-date">End Date</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => setRecurringEndDate(undefined)}
                  disabled={!recurringEndDate}
                >
                  <RotateCw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="end-date"
                    variant="outline"
                    className={cn("justify-start text-left font-normal", !recurringEndDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {recurringEndDate ? format(recurringEndDate, "PPP") : "No end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={recurringEndDate}
                    onSelect={setRecurringEndDate}
                    initialFocus
                    disabled={(day) => day < (date || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        <Button className="w-full" onClick={handleSchedule}>
          Schedule Message
        </Button>
      </div>
    </div>
  )
}
