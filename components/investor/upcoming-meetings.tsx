import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Video } from "lucide-react"
import { Phone } from "@/components/investor/phone-icon"
import { formatDate } from "@/utils/format"

interface Meeting {
  id: string
  companyName: string
  date: string
  time: string
  type: "in-person" | "video" | "phone"
  attendees: string[]
}

interface UpcomingMeetingsProps {
  meetings: Meeting[]
  className?: string
}

export function UpcomingMeetings({ meetings, className }: UpcomingMeetingsProps) {
  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case "in-person":
        return <Users className="h-4 w-4 text-[#0F7377]" />
      case "video":
        return <Video className="h-4 w-4 text-[#0F7377]" />
      case "phone":
        return <Phone className="h-4 w-4 text-[#0F7377]" />
      default:
        return <Calendar className="h-4 w-4 text-[#0F7377]" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Meetings</CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/investor/calendar">View Calendar</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {meetings.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
            <p className="text-muted-foreground">No upcoming meetings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {meetings.map((meeting) => (
              <div key={meeting.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-[#1E293B]">{meeting.companyName}</h3>
                  <Badge variant="outline">{meeting.type}</Badge>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {formatDate(meeting.date)}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    {meeting.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    {meeting.attendees.join(", ")}
                  </div>
                </div>
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button size="sm" className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    Join Meeting
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
