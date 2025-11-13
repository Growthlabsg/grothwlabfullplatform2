import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"

interface ResponsiveTextProps {
  children: ReactNode
  className?: string
  size?: TextSize
  mdSize?: TextSize
  lgSize?: TextSize
  xlSize?: TextSize
  as?: keyof JSX.IntrinsicElements
  weight?: "normal" | "medium" | "semibold" | "bold"
}

export function ResponsiveText({
  children,
  className,
  size = "base",
  mdSize,
  lgSize,
  xlSize,
  as: Component = "p",
  weight = "normal",
}: ResponsiveTextProps) {
  const getSizeClass = (textSize: TextSize) => {
    return {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
    }[textSize]
  }

  const getWeightClass = (fontWeight: "normal" | "medium" | "semibold" | "bold") => {
    return {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    }[fontWeight]
  }

  return (
    <Component
      className={cn(
        getSizeClass(size),
        mdSize && `md:${getSizeClass(mdSize)}`,
        lgSize && `lg:${getSizeClass(lgSize)}`,
        xlSize && `xl:${getSizeClass(xlSize)}`,
        getWeightClass(weight),
        className,
      )}
    >
      {children}
    </Component>
  )
}
