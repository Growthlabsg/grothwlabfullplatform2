import Image from "next/image"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function FeaturedEvent() {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative h-56 w-full sm:h-72">
        <Image src="/startup-demo-day.png" alt="GrowthLab Demo Day" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <Badge className="absolute left-4 top-4 bg-secondary-500 hover:bg-secondary-600 text-white font-medium shadow-sm">
          Featured
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="mb-2 text-2xl font-bold text-growthlab-slate tracking-tight">GrowthLab Demo Day: Cohort 4</h3>
          <p className="text-growthlab-gray">
            Join us for an exciting showcase of innovative startups from our latest accelerator cohort.
          </p>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-3 text-sm text-growthlab-gray">
            <Calendar className="h-5 w-5 text-primary-500" />
            <span>April 28, 2025</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-growthlab-gray">
            <Clock className="h-5 w-5 text-primary-500" />
            <span>6:00 PM - 9:00 PM SGT</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-growthlab-gray">
            <MapPin className="h-5 w-5 text-primary-500" />
            <span>BASH, 79 Ayer Rajah Crescent, Singapore</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-growthlab-gray">
            <Users className="h-5 w-5 text-primary-500" />
            <span>250+ Attendees Expected</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="bg-primary-500 hover:bg-primary-600 text-white shadow-sm transition-all">RSVP Now</Button>
          <Button
            variant="outline"
            className="border-primary-200 hover:bg-primary-50 hover:border-primary-300 transition-all"
          >
            Add to Calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
