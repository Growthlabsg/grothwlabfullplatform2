"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  icon?: LucideIcon
  title?: string
  description?: string
  onClick?: () => void
  variant?: "default" | "elevated" | "glass" | "gradient"
  hoverEffect?: "lift" | "scale" | "rotate" | "glow"
  interactive?: boolean
}

export function InteractiveCard({
  children,
  className,
  icon: Icon,
  title,
  description,
  onClick,
  variant = "default",
  hoverEffect = "lift",
  interactive = true
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getVariantClasses = () => {
    switch (variant) {
      case "elevated":
        return "shadow-lg hover:shadow-xl border-0 bg-white"
      case "glass":
        return "glass backdrop-blur-sm border-white/20 bg-white/10"
      case "gradient":
        return "bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg"
      default:
        return "bg-white border border-gray-200 shadow-sm"
    }
  }

  const getHoverEffectClasses = () => {
    if (!interactive) return ""
    
    switch (hoverEffect) {
      case "lift":
        return "hover:-translate-y-2 hover:shadow-xl"
      case "scale":
        return "hover:scale-105 hover:shadow-lg"
      case "rotate":
        return "hover:rotate-1 hover:shadow-lg"
      case "glow":
        return "hover:shadow-[0_0_20px_rgba(15,115,119,0.3)]"
      default:
        return "hover:-translate-y-1 hover:shadow-md"
    }
  }

  return (
    <Card
      className={cn(
        "transition-all duration-300 cursor-pointer group",
        getVariantClasses(),
        getHoverEffectClasses(),
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {(Icon || title) && (
        <CardHeader className="pb-4">
          {Icon && (
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300",
              "bg-gradient-to-br from-[#0F7377] to-[#0F7377]/80 text-white",
              isHovered && "scale-110"
            )}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          {title && (
            <CardTitle className={cn(
              "text-lg font-bold transition-colors duration-300",
              isHovered && "text-[#0F7377]"
            )}>
              {title}
            </CardTitle>
          )}
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
        </CardHeader>
      )}
      <CardContent className={cn(
        "transition-all duration-300",
        isHovered && "transform scale-[1.02]"
      )}>
        {children}
      </CardContent>
    </Card>
  )
}

// Interactive stats card
export function StatsCard({
  value,
  label,
  growth,
  icon: Icon,
  color = "text-[#0F7377]",
  onClick
}: {
  value: string | number
  label: string
  growth?: string
  icon?: LucideIcon
  color?: string
  onClick?: () => void
}) {
  return (
    <InteractiveCard
      variant="elevated"
      hoverEffect="lift"
      onClick={onClick}
      className="text-center"
    >
      <div className="flex flex-col items-center">
        {Icon && (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        )}
        <div className={`text-4xl font-bold mb-2 ${color} transition-all duration-300 group-hover:scale-110`}>
          {value}
        </div>
        <div className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-[#0F7377] transition-colors duration-300">
          {label}
        </div>
        {growth && (
          <div className="text-sm text-green-600 font-medium">
            {growth}
          </div>
        )}
      </div>
    </InteractiveCard>
  )
}

// Interactive feature card
export function FeatureCard({
  icon: Icon,
  title,
  description,
  features,
  color = "text-[#0F7377]",
  onClick
}: {
  icon: LucideIcon
  title: string
  description: string
  features?: string[]
  color?: string
  onClick?: () => void
}) {
  return (
    <InteractiveCard
      variant="elevated"
      hoverEffect="lift"
      onClick={onClick}
      className="h-full"
    >
      <div className="flex flex-col h-full">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F7377] to-[#0F7377]/80 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#0F7377] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 mb-6 flex-grow">
          {description}
        </p>
        {features && (
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-[#0F7377] transition-colors duration-300">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </InteractiveCard>
  )
}

// Interactive testimonial card
export function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating = 5,
  onClick
}: {
  quote: string
  author: string
  role: string
  avatar?: string
  rating?: number
  onClick?: () => void
}) {
  return (
    <InteractiveCard
      variant="glass"
      hoverEffect="glow"
      onClick={onClick}
      className="text-white"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          {[...Array(rating)].map((_, i) => (
            <div key={i} className="w-4 h-4 text-[#F59E0B] group-hover:animate-pulse">
              ★
            </div>
          ))}
        </div>
        <blockquote className="text-white/90 mb-6 flex-grow italic">
          "{quote}"
        </blockquote>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F59E0B]/80 group-hover:scale-110 transition-transform duration-300"></div>
          <div>
            <div className="font-semibold text-white group-hover:text-[#F59E0B] transition-colors duration-300">
              {author}
            </div>
            <div className="text-sm text-white/70">
              {role}
            </div>
          </div>
        </div>
      </div>
    </InteractiveCard>
  )
} 