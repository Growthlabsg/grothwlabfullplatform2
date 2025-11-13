import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/utils/format"
import type { Investor } from "@/types/funding"

interface InvestorCardProps {
  investor: Investor
  className?: string
}

export function InvestorCard({ investor, className }: InvestorCardProps) {
  const getStageLabel = (stage: string) => {
    switch (stage) {
      case "pre-seed":
        return "Pre-Seed"
      case "seed":
        return "Seed"
      case "series-a":
        return "Series A"
      case "series-b":
        return "Series B"
      case "series-c":
        return "Series C"
      case "growth":
        return "Growth"
      case "late-stage":
        return "Late Stage"
      default:
        return stage
    }
  }

  return (
    <Card className={`overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-md ${className}`}>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-slate-100 shadow-sm">
              <Image
                src={investor.avatar || "/placeholder.svg?height=64&width=64&query=professional investor portrait"}
                alt={investor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-growthlab-slate">{investor.name}</h3>
              <p className="text-sm text-growthlab-gray">
                {investor.title}, {investor.organization}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{investor.location}</p>
            </div>
          </div>

          <div className="mb-5">
            <p className="line-clamp-3 text-sm text-growthlab-gray leading-relaxed">{investor.bio}</p>
          </div>

          <div className="mb-4 space-y-3">
            <div>
              <p className="text-xs font-medium text-growthlab-slate">Investment Focus:</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {investor.investmentFocus.stages.map((stage) => (
                  <Badge key={stage} variant="outline" className="text-xs bg-slate-50 border-slate-200">
                    {getStageLabel(stage)}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-growthlab-slate">Industries:</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {investor.investmentFocus.industries.slice(0, 3).map((industry) => (
                  <Badge
                    key={industry}
                    variant="secondary"
                    className="text-xs bg-secondary-100 text-secondary-800 border-secondary-200"
                  >
                    {industry}
                  </Badge>
                ))}
                {investor.investmentFocus.industries.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-secondary-100 text-secondary-800 border-secondary-200"
                  >
                    +{investor.investmentFocus.industries.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-growthlab-slate">Ticket Size:</p>
              <p className="text-sm text-growthlab-gray mt-1">
                {formatCurrency(investor.investmentFocus.ticketSize.min)} -{" "}
                {formatCurrency(investor.investmentFocus.ticketSize.max)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 border-t bg-slate-50 p-4">
        <Button
          variant="outline"
          className="border-slate-200 hover:bg-slate-100 hover:text-growthlab-slate transition-all"
          asChild
        >
          <Link href={`/funding/investors/${investor.id}`}>View Profile</Link>
        </Button>
        <Button className="bg-primary-500 hover:bg-primary-600 text-white shadow-sm transition-all" asChild>
          <Link href={`/funding/investors/${investor.id}/connect`}>Connect</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
