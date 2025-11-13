import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  className?: string
}

/**
 * A container component that adapts its width and padding based on screen size
 */
export function ResponsiveContainer({ children, maxWidth = "xl", className, ...props }: ResponsiveContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  }

  return (
    <div className={cn("w-full px-4 md:px-6 lg:px-8 mx-auto", maxWidthClasses[maxWidth], className)} {...props}>
      {children}
    </div>
  )
}
