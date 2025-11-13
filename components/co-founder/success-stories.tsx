import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Quote } from "lucide-react"

export function SuccessStories() {
  const stories = [
    {
      founders: [
        {
          name: "Sarah Chen",
          role: "Technical Co-Founder",
          image: "/placeholder.svg?height=100&width=100&query=professional asian woman tech entrepreneur",
        },
        {
          name: "Michael Tan",
          role: "Business Co-Founder",
          image: "/placeholder.svg?height=100&width=100&query=professional asian man business entrepreneur",
        },
      ],
      company: "FinEdge",
      description:
        "Sarah (AI engineer) and Michael (fintech product manager) met through GrowthLab's co-founder matching in 2023. After a successful trial project, they launched FinEdge, a financial literacy platform that has raised $1.2M seed funding.",
      quote:
        "The matching process was spot-on. We complement each other perfectly - I handle the technical side while Michael brings the business expertise and industry connections.",
      industry: "FinTech",
    },
    {
      founders: [
        {
          name: "Priya Sharma",
          role: "Product Co-Founder",
          image: "/placeholder.svg?height=100&width=100&query=professional indian woman product manager",
        },
        {
          name: "David Wong",
          role: "Technical Co-Founder",
          image: "/placeholder.svg?height=100&width=100&query=professional chinese man software engineer",
        },
      ],
      company: "MediConnect",
      description:
        "Priya (healthcare consultant) and David (software engineer) connected through our platform in 2022. Their healthcare scheduling platform now serves 50+ clinics across Southeast Asia and recently joined GrowthLab's accelerator program.",
      quote:
        "Without GrowthLab's co-founder matching, we would never have met. The trial project period was crucial in establishing our working relationship before diving in fully.",
      industry: "HealthTech",
    },
    {
      founders: [
        {
          name: "Lim Wei Jie",
          role: "Operations Co-Founder",
          image: "/placeholder.svg?height=100&width=100&query=professional singaporean man operations expert",
        },
        {
          name: "Ananya Patel",
          role: "Technical Co-Founder",
          image: "/placeholder.svg?height=100&width=100&query=professional indian woman blockchain developer",
        },
      ],
      company: "GreenSupply",
      description:
        "Wei Jie (supply chain expert) and Ananya (blockchain developer) matched in 2023. Their sustainable supply chain verification platform has partnered with major retailers and won multiple sustainability awards.",
      quote:
        "The questionnaire was comprehensive enough to match us on both skills and values. Our shared passion for sustainability was a key factor in our successful partnership.",
      industry: "Sustainability",
    },
  ]

  return (
    <div className="space-y-8">
      {stories.map((story) => (
        <Card
          key={story.company}
          className="overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-md"
        >
          <CardContent className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-growthlab-slate">{story.company}</h3>
              <Badge variant="outline" className="bg-slate-50 font-medium">
                {story.industry}
              </Badge>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-4 text-growthlab-gray leading-relaxed">{story.description}</p>
                <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <Quote className="mt-1 h-5 w-5 text-primary-500 shrink-0" />
                  <p className="italic text-growthlab-gray">{story.quote}</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-medium text-growthlab-slate">Co-Founders:</p>
                <div className="flex flex-col gap-4">
                  {story.founders.map((founder) => (
                    <div key={founder.name} className="flex items-center gap-4 group">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-slate-100 shadow-sm transition-all group-hover:border-primary-100">
                        <Image
                          src={founder.image || "/placeholder.svg"}
                          alt={founder.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-growthlab-slate group-hover:text-primary-500 transition-colors">
                          {founder.name}
                        </p>
                        <p className="text-sm text-growthlab-gray">{founder.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
