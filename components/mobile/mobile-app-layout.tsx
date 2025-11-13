"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Home,
  LayoutDashboard,
  Calendar,
  DollarSign,
  Users,
  BookOpen,
  MessageCircle,
  Settings,
  Menu,
  Bell,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { LanguageSelector } from "@/components/language/language-selector"

interface MobileAppLayoutProps {
  children: React.ReactNode
}

export function MobileAppLayout({ children }: MobileAppLayoutProps) {
  const pathname = usePathname()
  const { t } = useLanguage()
  const { user } = useAuth()
  const [isOpen, setIsOpen] = React.useState(false)

  // Navigation items
  const navItems = [
    { href: "/", label: t("nav.home"), icon: <Home className="h-5 w-5" /> },
    { href: "/dashboard", label: t("nav.dashboard"), icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/events", label: t("nav.events"), icon: <Calendar className="h-5 w-5" /> },
    { href: "/funding", label: t("nav.funding"), icon: <DollarSign className="h-5 w-5" /> },
    { href: "/community", label: t("nav.community"), icon: <Users className="h-5 w-5" /> },
    { href: "/resources", label: t("nav.resources"), icon: <BookOpen className="h-5 w-5" /> },
    { href: "/chat", label: t("nav.chat"), icon: <MessageCircle className="h-5 w-5" /> },
    { href: "/settings", label: t("nav.settings"), icon: <Settings className="h-5 w-5" /> },
  ]

  // Bottom tab navigation items (limited to 5 for mobile)
  const tabItems = [
    { href: "/", label: t("nav.home"), icon: <Home className="h-5 w-5" /> },
    { href: "/dashboard", label: t("nav.dashboard"), icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: "/events", label: t("nav.events"), icon: <Calendar className="h-5 w-5" /> },
    { href: "/funding", label: t("nav.funding"), icon: <DollarSign className="h-5 w-5" /> },
    { href: "/chat", label: t("nav.chat"), icon: <MessageCircle className="h-5 w-5" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[80%] sm:w-[350px] pr-0">
                  <div className="flex flex-col h-full">
                    <div className="px-4 py-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="relative h-8 w-8 flex-shrink-0">
                          <Image
                            src="/images/GrowthLab Icon (1).png"
                            alt="GrowthLab Logo"
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xl font-bold">GrowthLab</span>
                      </div>
                    </div>

                    <nav className="flex-1 overflow-auto py-4">
                      <div className="space-y-1 px-2">
                        {navItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors
                              ${pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.icon}
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </nav>

                    <div className="border-t p-4">
                      <div className="flex items-center justify-between">
                        <LanguageSelector />
                        {user ? (
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium">{user.displayName || user.email}</div>
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                               {user.displayName ? (user.displayName[0] ? user.displayName[0].toUpperCase() : undefined) : "U"}
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href="/login">{t("auth.login")}</Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link href="/signup">{t("auth.signup")}</Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-6 w-6">
                  <Image src="/images/GrowthLab Icon (1).png" alt="GrowthLab Logo" width={40} height={40} className="object-contain" />
                </div>
                <span className="font-bold hidden sm:inline-block">GrowthLab</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/search">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-4">{children}</main>

      {/* Bottom Tab Navigation */}
      <div className="sticky bottom-0 z-40 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <div className="container flex h-14 items-center justify-between">
          {tabItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center justify-center h-full text-xs
                ${pathname === item.href ? "text-primary" : "text-muted-foreground"}`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
