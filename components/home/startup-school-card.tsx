import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, ChevronRight } from "lucide-react"

export function StartupSchoolCard() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image src="/placeholder.svg?height=200&width=600" alt="Startup School" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white">Startup School</h3>
          <p className="text-white/90">Learn from experienced founders and industry experts</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-[#0F7377]" />
          <span className="font-medium">20+ Courses Available</span>
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0F7377]" />
            <span>Fundraising & Pitching</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0F7377]" />
            <span>Product Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0F7377]" />
            <span>Growth Marketing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#0F7377]" />
            <span>Financial Modeling</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href="/startup-school" className="flex-1">
            <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Explore Courses</Button>
          </Link>
          <Link href="/teacher/signup" className="flex-1">
            <Button variant="outline" className="w-full">
              Become a Teacher <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
