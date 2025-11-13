import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function UpcomingEvents() {
  const events = [
    {
      id: 1,
      title: "Founder Networking Mixer",
      date: "May 5, 2025",
      time: "7:00 PM - 9:00 PM",
      category: "Networking",
    },
    {
      id: 2,
      title: "AI for Startups Workshop",
      date: "May 12, 2025",
      time: "2:00 PM - 5:00 PM",
      category: "Workshop",
    },
    {
      id: 3,
      title: "Pitch Night: FinTech Edition",
      date: "May 19, 2025",
      time: "6:30 PM - 9:30 PM",
      category: "Pitch Night",
    },
    {
      id: 4,
      title: "Fundraising Masterclass",
      date: "May 26, 2025",
      time: "10:00 AM - 12:00 PM",
      category: "Workshop",
    },
  ]

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-growthlab-slate">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {events.map((event) => (
          <div key={event.id} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 group">
            <h3 className="mb-2 font-medium text-growthlab-slate group-hover:text-primary-500 transition-colors">
              {event.title}
            </h3>
            <div className="mb-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-growthlab-gray">
                <Calendar className="h-3.5 w-3.5 text-primary-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-growthlab-gray">
                <Clock className="h-3.5 w-3.5 text-primary-400" />
                <span>{event.time}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-growthlab-gray">
                {event.category}
              </span>
              <Link
                href={`/events/${event.id}`}
                className="text-xs font-medium text-primary-500 hover:text-primary-600 hover:underline transition-colors"
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          variant="ghost"
          className="w-full justify-between text-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all"
        >
          View All Events
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
