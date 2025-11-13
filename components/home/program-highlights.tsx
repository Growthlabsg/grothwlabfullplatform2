import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function ProgramHighlights() {
  const highlights = [
    {
      title: "Funding",
      description:
        "SGD 500K investment for 7% equity, with additional funding opportunities through our investor network.",
      icon: "/placeholder.svg?height=48&width=48&query=funding investment icon with dollar sign",
    },
    {
      title: "Mentorship",
      description: "Access to over 100 mentors from successful startups, VCs, and industry experts across Asia.",
      icon: "/placeholder.svg?height=48&width=48&query=mentorship guidance icon with people",
    },
    {
      title: "Workshops",
      description: "Weekly workshops on product, growth, fundraising, and other critical startup topics.",
      icon: "/placeholder.svg?height=48&width=48&query=workshop education icon with presentation",
    },
    {
      title: "Network",
      description: "Join a community of founders, investors, and partners across the Asian startup ecosystem.",
      icon: "/placeholder.svg?height=48&width=48&query=network connection icon with nodes",
    },
  ]

  const benefits = [
    "Weekly 1:1 sessions with dedicated mentors",
    "Office space in Singapore's startup district",
    "Legal and accounting support",
    "AWS, Google Cloud, and other perks worth $250K+",
    "Demo Day with 100+ investors",
    "Lifetime access to GrowthLab's founder network",
  ]

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <div className="grid grid-cols-2 gap-5">
          {highlights.map((highlight) => (
            <Card
              key={highlight.title}
              className="overflow-hidden border-slate-200 transition-all duration-300 hover:shadow-md hover:border-primary-200"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex justify-center">
                  <div className="relative h-14 w-14 rounded-full bg-primary-50 p-3 shadow-sm">
                    <Image
                      src={highlight.icon || "/placeholder.svg"}
                      alt={highlight.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>
                <h3 className="mb-2 text-center text-lg font-bold text-growthlab-slate">{highlight.title}</h3>
                <p className="text-center text-sm text-growthlab-gray leading-relaxed">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <h3 className="mb-6 text-2xl font-bold text-growthlab-slate">What You Get</h3>
        <div className="space-y-4">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3 group">
              <CheckCircle className="mt-0.5 h-5 w-5 text-primary-500 group-hover:text-primary-600 transition-colors" />
              <p className="text-growthlab-gray group-hover:text-growthlab-slate transition-colors">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
