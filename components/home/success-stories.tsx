import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SuccessStories() {
  const stories = [
    {
      id: 1,
      name: "FinTech Solutions",
      description:
        "Raised SGD 2M Series A after GrowthLab. Their payment platform now processes over $10M monthly across Southeast Asia.",
      logo: "/fintech-flow.png",
      category: "FinTech",
    },
    {
      id: 2,
      name: "EcoLogistics",
      description:
        "Expanded to 3 countries within 6 months of graduating from GrowthLab with sustainable last-mile delivery solutions.",
      logo: "/green-path-logistics.png",
      category: "Logistics",
    },
    {
      id: 3,
      name: "HealthTech AI",
      description:
        "Partnered with 5 major hospitals after Demo Day to deploy their AI diagnostic tools, impacting thousands of patients.",
      logo: "/AI-Healthcare-Integration.png",
      category: "HealthTech",
    },
  ]

  return (
    <div className="space-y-6">
      {stories.map((story) => (
        <Card
          key={story.id}
          className="overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-md hover:border-primary-200"
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-5">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                <Image src={story.logo || "/placeholder.svg"} alt={story.name} fill className="object-contain p-2" />
              </div>
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <h3 className="font-bold text-growthlab-slate">{story.name}</h3>
                  <Badge
                    variant="outline"
                    className="text-xs font-medium border-slate-200 text-growthlab-gray bg-slate-50"
                  >
                    {story.category}
                  </Badge>
                </div>
                <p className="text-sm text-growthlab-gray leading-relaxed">{story.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
