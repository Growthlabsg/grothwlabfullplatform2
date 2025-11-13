"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { useResponsive } from "@/hooks/use-responsive"

interface NavigationItem {
  href: string
  label: string
  children?: NavigationItem[]
}

interface ResponsiveNavigationProps {
  items: NavigationItem[]
  className?: string
}

export function ResponsiveNavigation({ items, className }: ResponsiveNavigationProps) {
  const pathname = usePathname()
  const { isMobile } = useResponsive()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  // Mobile navigation
  if (isMobile) {
    return (
      <div className={className}>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col h-full py-4">
              <nav className="space-y-1">
                {items.map((item) => (
                  <div key={item.href} className="py-1">
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 text-sm rounded-md transition-colors",
                        isActive(item.href) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>

                    {item.children && (
                      <div className="pl-4 mt-1 space-y-1 border-l border-border ml-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2 text-sm rounded-md transition-colors",
                              isActive(child.href) ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  }

  // Desktop navigation
  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary relative group",
            isActive(item.href) ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.label}

          {item.children && (
            <div className="absolute left-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-background rounded-md shadow-md border border-border overflow-hidden">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "block px-4 py-2 text-sm transition-colors hover:bg-muted",
                      isActive(child.href) ? "bg-primary/10 text-primary font-medium" : "text-foreground",
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Link>
      ))}
    </nav>
  )
}
