import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Globe, Linkedin, Mail, MapPin, Star } from "lucide-react"
import type { FounderProfile } from "@/types/co-founder-matching"

interface FounderProfileProps {
  founder: FounderProfile
  className?: string
}

export function FounderProfileCard({ founder, className }: FounderProfileProps) {
  const getSkillLabel = (skill: string): string => {
    return skill.charAt(0).toUpperCase() + skill.slice(1).replace("-", " ")
  }

  const getGoalLabel = (goal: string): string => {
    switch (goal) {
      case "build-mvp":
        return "Build MVP"
      case "product-market-fit":
        return "Product-Market Fit"
      case "raise-funding":
        return "Raise Funding"
      case "scale":
        return "Scale Business"
      case "exit":
        return "Exit"
      default:
        return goal.replace("-", " ")
    }
  }

  return (
    <Card className={`border-slate-200 transition-all duration-300 hover:shadow-sm ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-growthlab-slate">Founder Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-slate-100 shadow-sm">
            <Image
              src={founder.avatar || "/placeholder.svg?height=96&width=96&query=professional entrepreneur portrait"}
              alt={founder.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold text-growthlab-slate">{founder.name}</h3>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span>{founder.location}</span>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Briefcase className="h-4 w-4 text-primary-400" />
                <span>{founder.experience} years</span>
              </div>

              {founder.matchScore && (
                <div className="flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                  <Star className="h-3 w-3 fill-primary-500 text-primary-500" />
                  <span>Match: {founder.matchScore}%</span>
                </div>
              )}
            </div>

            <p className="mt-3 text-sm text-growthlab-gray leading-relaxed">{founder.bio}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {founder.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-secondary-100 text-secondary-800 border-secondary-200"
                >
                  {getSkillLabel(skill)}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-2 text-sm text-growthlab-gray">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary-500" />
                <span>
                  Industry: <span className="font-medium">{founder.industry}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary-500" />
                <span>
                  Goal: <span className="font-medium">{getGoalLabel(founder.goal)}</span>
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 justify-center sm:justify-start">
              {founder.linkedin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 hover:bg-slate-100 hover:text-primary-600 transition-all"
                  asChild
                >
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-1.5 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              )}

              {founder.email && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 hover:bg-slate-100 hover:text-primary-600 transition-all"
                  asChild
                >
                  <a href={`mailto:${founder.email}`}>
                    <Mail className="mr-1.5 h-4 w-4" />
                    Contact
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
