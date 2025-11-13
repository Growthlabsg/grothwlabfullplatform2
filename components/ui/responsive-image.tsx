import Image from "next/image"
import { cn } from "@/lib/utils"

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
  fill?: boolean
}

/**
 * An image component that optimizes for different screen sizes
 */
export function ResponsiveImage({
  src,
  alt,
  className,
  width = 1200,
  height = 800,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  objectFit = "cover",
  fill = false,
}: ResponsiveImageProps) {
  // If the image path is a placeholder SVG query parameter, use it unoptimized
  const isPlaceholderSvg = typeof src === "string" && src.includes("/placeholder.svg")

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        fill={fill}
        className={cn("w-full h-auto", {
          "object-contain": objectFit === "contain",
          "object-cover": objectFit === "cover",
          "object-fill": objectFit === "fill",
          "object-none": objectFit === "none",
          "object-scale-down": objectFit === "scale-down",
        })}
        unoptimized={isPlaceholderSvg}
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          const imgElement = e.currentTarget as HTMLImageElement
          if (imgElement.src !== "/placeholder.svg") {
            imgElement.src = "/placeholder.svg"
          }
        }}
      />
    </div>
  )
}
