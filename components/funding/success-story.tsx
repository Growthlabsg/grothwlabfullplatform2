import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/format"

interface SuccessStoryProps {
  story: {
    id: string
    companyName: string
    logo: string
    description: string
    fundingAmount: number
    fundingType: string
    investors: string[]
    industry: string
  }
  className?: string
}

export function SuccessStory({ story, className }: SuccessStoryProps) {
  return (
    <Card className={`overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-md ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
            <Image
              src={story.logo || "/placeholder.svg?height=64&width=64&query=startup company logo"}
              alt={story.companyName}
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <h3 className="font-bold text-growthlab-slate">{story.companyName}</h3>
              <Badge variant="outline" className="text-xs bg-slate-50 border-slate-200">
                {story.industry}
              </Badge>
            </div>
            <p className="mb-3 text-sm text-growthlab-gray leading-relaxed">{story.description}</p>
            <div className="text-sm text-growthlab-gray font-medium">
              <span className="text-growthlab-slate">Raised:</span> {formatCurrency(story.fundingAmount)} (
              {story.fundingType})
            </div>
            <div className="text-sm text-growthlab-gray mt-1">
              <span className="text-growthlab-slate font-medium">Investors:</span> {story.investors.join(", ")}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
