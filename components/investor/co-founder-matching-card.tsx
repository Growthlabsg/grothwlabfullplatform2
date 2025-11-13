import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface CoFounderMatchingCardProps {
  className?: string
}

export function CoFounderMatchingCard({ className }: CoFounderMatchingCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Co-founder Matching</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F7377]/10">
            <UserPlus className="h-6 w-6 text-[#0F7377]" />
          </div>
          <div className="flex-1">
            <p className="text-[#334155]">
              Discover promising founding teams with complementary skills and strong team dynamics.
            </p>
            <div className="mt-4">
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90" asChild>
                <Link href="/investor/co-founder-matching">Explore Teams</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
