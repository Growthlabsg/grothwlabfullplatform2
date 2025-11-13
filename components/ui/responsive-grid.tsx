import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: string
}

/**
 * A responsive grid component that changes column count based on screen size
 */
export function ResponsiveGrid({
  children,
  className,
  cols = { default: 1, sm: 2, md: 3, lg: 4 },
  gap = "gap-4",
  ...props
}: ResponsiveGridProps) {
  // Convert columns to Tailwind grid classes
  const colClasses = [
    `grid-cols-${cols.default}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
  ].filter(Boolean)

  return (
    <div className={cn("grid", gap, colClasses.join(" "), className)} {...props}>
      {children}
    </div>
  )
}
