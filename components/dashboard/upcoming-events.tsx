import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import { formatDate } from "@/utils/format"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: string
}

interface UpcomingEventsProps {
  events: Event[]
  className?: string
}

export function UpcomingEvents({ events, className }: UpcomingEventsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Events you've registered for</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="space-y-2">
              <h3 className="font-semibold">{event.title}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  {event.time}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{event.type}</Badge>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
