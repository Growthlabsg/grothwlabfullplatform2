"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Clock, Trash2 } from "lucide-react"
import type { SessionAvailability } from "@/types/mentor"

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
}

// Sample data
const SAMPLE_AVAILABILITY: SessionAvailability[] = [
  {
    id: "avail-1",
    mentorId: "mentor-1",
    date: "2025-05-15",
    timeSlots: [
      { startTime: "09:00", endTime: "10:00", isBooked: false },
      { startTime: "14:00", endTime: "15:00", isBooked: true, sessionId: "session-1" },
    ],
  },
  {
    id: "avail-2",
    mentorId: "mentor-1",
    date: "2025-05-17",
    timeSlots: [
      { startTime: "10:00", endTime: "10:45", isBooked: true, sessionId: "session-2" },
      { startTime: "11:00", endTime: "12:00", isBooked: false },
    ],
  },
  {
    id: "avail-3",
    mentorId: "mentor-1",
    date: "2025-05-20",
    timeSlots: [
      { startTime: "14:00", endTime: "15:00", isBooked: false },
      { startTime: "16:00", endTime: "17:30", isBooked: true, sessionId: "session-3" },
    ],
  },
]

export function AvailabilityManager() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([
    { id: "1", startTime: "09:00", endTime: "10:00" },
  ])
  const [availability] = useState<SessionAvailability[]>(SAMPLE_AVAILABILITY)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addTimeSlot = () => {
    const newId = String(selectedTimeSlots.length + 1)
    setSelectedTimeSlots([...selectedTimeSlots, { id: newId, startTime: "09:00", endTime: "10:00" }])
  }

  const removeTimeSlot = (id: string) => {
    setSelectedTimeSlots(selectedTimeSlots.filter((slot) => slot.id !== id))
  }

  const updateTimeSlot = (id: string, field: "startTime" | "endTime", value: string) => {
    setSelectedTimeSlots(selectedTimeSlots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)))
  }

  const handleSaveAvailability = () => {
    // In a real app, this would send data to the backend
    console.log("Saving availability for:", date)
    console.log("Time slots:", selectedTimeSlots)
    setIsDialogOpen(false)
  }

  // Format the date to match the expected format in availability data
  const formatDate = (date: Date | undefined) => {
    if (!date) return ""
    return date.toISOString().split("T")[0]
  }

  // Get time slots for the selected date
  const getTimeSlotsForDate = () => {
    const formattedDate = formatDate(date)
    const availForDate = availability.find((a) => a.date === formattedDate)
    return availForDate?.timeSlots || []
  }

  const timeSlots = getTimeSlotsForDate()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Availability</CardTitle>
        <CardDescription>Manage your mentoring availability</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="recurring">Recurring Slots</TabsTrigger>
          </TabsList>
          <TabsContent value="calendar" className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md p-3" />
              </div>
              <div className="flex-1">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-3">
                    {date
                      ? date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Select a date"}
                  </h3>

                  {timeSlots.length > 0 ? (
                    <div className="space-y-2">
                      {timeSlots.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-md border">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {slot.startTime} - {slot.endTime}
                          </span>
                          <Badge className={slot.isBooked ? "bg-[#0F7377]" : "bg-green-500"}>
                            {slot.isBooked ? "Booked" : "Available"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No availability set for this date.</p>
                  )}

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="mt-4 w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Availability
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Availability</DialogTitle>
                        <DialogDescription>Set your availability for {date?.toLocaleDateString()}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {selectedTimeSlots.map((slot) => (
                          <div key={slot.id} className="flex items-end gap-2">
                            <div className="grid flex-1 gap-2">
                              <Label htmlFor={`start-time-${slot.id}`}>Start Time</Label>
                              <Input
                                id={`start-time-${slot.id}`}
                                type="time"
                                value={slot.startTime}
                                onChange={(e) => updateTimeSlot(slot.id, "startTime", e.target.value)}
                              />
                            </div>
                            <div className="grid flex-1 gap-2">
                              <Label htmlFor={`end-time-${slot.id}`}>End Time</Label>
                              <Input
                                id={`end-time-${slot.id}`}
                                type="time"
                                value={slot.endTime}
                                onChange={(e) => updateTimeSlot(slot.id, "endTime", e.target.value)}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeTimeSlot(slot.id)}
                              disabled={selectedTimeSlots.length === 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addTimeSlot}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Time Slot
                        </Button>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveAvailability} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                          Save Availability
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="recurring">
            <div className="rounded-md border p-4">
              <h3 className="font-medium mb-3">Set Recurring Availability</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Set standard availability that repeats weekly. This makes it easier to manage your schedule.
              </p>
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">Configure Recurring Slots</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
