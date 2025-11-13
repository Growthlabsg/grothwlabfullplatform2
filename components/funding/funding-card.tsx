import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/utils/format"
import type { FundingOpportunity } from "@/types/funding"

interface FundingCardProps {
  opportunity: FundingOpportunity
  className?: string
}

export function FundingCard({ opportunity, className }: FundingCardProps) {
  const getFundingTypeLabel = (type: string) => {
    switch (type) {
      case "vc":
        return "Venture Capital"
      case "angel":
        return "Angel Investment"
      case "grant":
        return "Grant"
      case "accelerator":
        return "Accelerator"
      case "corporate":
        return "Corporate Investment"
      case "debt":
        return "Debt Financing"
      default:
        return type
    }
  }

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
    <Card
      className={`overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-md ${className} ${opportunity.featured ? "border-secondary-300 shadow-sm" : ""}`}
    >
      <CardContent className="p-0">
        <div className="relative p-6">
          {opportunity.featured && (
            <Badge className="absolute right-4 top-4 bg-secondary-500 hover:bg-secondary-600 text-white font-medium shadow-sm">
              Featured
            </Badge>
          )}
          <div className="mb-4 flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
              <Image
                src={opportunity.logo || "/placeholder.svg?height=48&width=48&query=investment company logo"}
                alt={opportunity.organization}
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <h3 className="font-bold text-growthlab-slate">{opportunity.title}</h3>
              <p className="text-sm text-growthlab-gray">{opportunity.organization}</p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-slate-50 border-slate-200">
              {getFundingTypeLabel(opportunity.type)}
            </Badge>
            {opportunity.stage.slice(0, 2).map((stage) => (
              <Badge key={stage} variant="outline" className="bg-slate-50 border-slate-200">
                {getStageLabel(stage)}
              </Badge>
            ))}
            {opportunity.stage.length > 2 && (
              <Badge variant="outline" className="bg-slate-50 border-slate-200">
                +{opportunity.stage.length - 2} more
              </Badge>
            )}
          </div>

          <div className="mb-4 space-y-1.5">
            <p className="text-sm text-growthlab-gray">
              <span className="font-medium">Funding Range:</span> {formatCurrency(opportunity.minAmount)} -{" "}
              {formatCurrency(opportunity.maxAmount)}
            </p>
            <p className="text-sm text-growthlab-gray">
              <span className="font-medium">Location:</span> {opportunity.location}
            </p>
            {opportunity.applicationDeadline && (
              <p className="text-sm text-growthlab-gray">
                <span className="font-medium">Deadline:</span> {opportunity.applicationDeadline}
              </p>
            )}
          </div>

          <div className="mb-4">
            <p className="line-clamp-3 text-sm text-growthlab-gray leading-relaxed">{opportunity.description}</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {opportunity.industries.slice(0, 3).map((industry) => (
              <Badge
                key={industry}
                variant="secondary"
                className="text-xs bg-secondary-100 text-secondary-800 border-secondary-200"
              >
                {industry}
              </Badge>
            ))}
            {opportunity.industries.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-secondary-100 text-secondary-800 border-secondary-200">
                +{opportunity.industries.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2 border-t bg-slate-50 p-4">
        <Button
          variant="outline"
          className="border-slate-200 hover:bg-slate-100 hover:text-growthlab-slate transition-all"
          asChild
        >
          <Link href={`/funding/${opportunity.id}`}>View Details</Link>
        </Button>
        <Button className="bg-primary-500 hover:bg-primary-600 text-white shadow-sm transition-all" asChild>
          <Link href={`/funding/${opportunity.id}/apply`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
