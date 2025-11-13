"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function BreadcrumbNavigation() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const pathSegments = pathname.split("/").filter(Boolean)

  // Map path segments to readable names
  const getReadableName = (segment: string) => {
    // Convert kebab-case to Title Case
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <nav className="flex items-center py-4 px-6 text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`
          const isLast = index === pathSegments.length - 1

          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              {isLast ? (
                <span className="font-medium">{getReadableName(segment)}</span>
              ) : (
                <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors">
                  {getReadableName(segment)}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
