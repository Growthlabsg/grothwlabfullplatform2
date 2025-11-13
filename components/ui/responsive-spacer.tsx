import { cn } from "@/lib/utils"

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"

interface ResponsiveSpacerProps {
  size?: SpacerSize
  mdSize?: SpacerSize
  lgSize?: SpacerSize
  xlSize?: SpacerSize
  className?: string
}

export function ResponsiveSpacer({ size = "md", mdSize, lgSize, xlSize, className }: ResponsiveSpacerProps) {
  const getSizeClass = (spacerSize: SpacerSize) => {
    return {
      xs: "h-2",
      sm: "h-4",
      md: "h-6",
      lg: "h-8",
      xl: "h-12",
      "2xl": "h-16",
      "3xl": "h-20",
      "4xl": "h-24",
    }[spacerSize]
  }

  return (
    <div
      className={cn(
        getSizeClass(size),
        mdSize && `md:${getSizeClass(mdSize)}`,
        lgSize && `lg:${getSizeClass(lgSize)}`,
        xlSize && `xl:${getSizeClass(xlSize)}`,
        className,
      )}
      aria-hidden="true"
    />
  )
}
