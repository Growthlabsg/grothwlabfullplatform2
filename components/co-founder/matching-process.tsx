import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function MatchingProcess() {
  const steps = [
    {
      title: "AI-Powered Matching",
      description:
        "Our algorithm analyzes over 50 data points from your questionnaire to find compatible co-founders based on complementary skills, aligned goals, and working styles.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Mutual Interest",
      description:
        "We only facilitate introductions when there's mutual interest. You'll receive profiles of potential matches and can express interest in those you'd like to meet.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Guided Introduction",
      description:
        "Once there's mutual interest, we facilitate a structured introduction call to help you get to know each other and discuss potential collaboration.",
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      title: "Trial Project",
      description:
        "Test compatibility with a 2-week trial project. We provide frameworks and guidance to help you evaluate your working relationship before committing.",
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  const benefits = [
    "Verified profiles to ensure quality matches",
    "Compatibility-focused matching beyond just skills",
    "Structured process to reduce time wasted on mismatches",
    "Ongoing support from GrowthLab mentors",
    "Access to resources for your trial project",
    "No equity taken - completely free service",
  ]

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {steps.map((step, index) => (
          <Card key={step.title} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="order-2 p-6 md:order-1">
                  <h3 className="mb-2 text-xl font-bold text-[#1E293B]">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-[#334155]">{step.description}</p>
                </div>
                <div className="order-1 md:order-2">
                  <div className="relative h-48 w-full md:h-full">
                    <Image src={step.image || "/placeholder.svg"} alt={step.title} fill className="object-cover" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg bg-[#F8FAFC] p-6">
        <h3 className="mb-4 text-xl font-bold text-[#1E293B]">Why Our Matching Process Works</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0F7377]" />
              <p className="text-[#334155]">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
