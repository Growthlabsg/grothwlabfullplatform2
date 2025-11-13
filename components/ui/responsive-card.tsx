import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ResponsiveCardProps {
  children: ReactNode
  className?: string
  padding?: "none" | "sm" | "md" | "lg"
  mdPadding?: "none" | "sm" | "md" | "lg"
  lgPadding?: "none" | "sm" | "md" | "lg"
}

export function ResponsiveCard({ children, className, padding = "md", mdPadding, lgPadding }: ResponsiveCardProps) {
  const getPaddingClass = (size: "none" | "sm" | "md" | "lg") => {
    return {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    }[size]
  }

  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-lg border shadow-sm",
        getPaddingClass(padding),
        mdPadding && `md:${getPaddingClass(mdPadding)}`,
        lgPadding && `lg:${getPaddingClass(lgPadding)}`,
        className,
      )}
    >
      {children}
    </div>
  )
}
