"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useNotifications } from "@/contexts/notification-context";
import Image from "next/image";
import { PersistentQRButton } from "@/components/qr-code/persistent-qr-button";
import { SimpleThemeToggle } from "@/components/theme-toggle";
import { ContextSwitcher } from "../feed/context-switcher";

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

export function Header({ toggleSidebar, isMobile }: HeaderProps) {
  const { user } = useAuth();
  const { unreadCount } = useNotifications();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and mobile menu button */}
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/GrowthLab Icon (1).png"
              alt="GrowthLab"
              width={48}
              height={48}
              className="flex-shrink-0"
              priority
            />
            <span className="font-semibold text-lg hidden sm:inline-block bg-gradient-to-r from-[#0F7377] to-[#1E293B] bg-clip-text text-transparent">
              GrowthLab
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 pl-16">
          {/* <Link
            href="/about"
            className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
              isActive("/about")
                ? "text-[#0F7377] font-semibold"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            About
          </Link>
          <Link
            href="/services"
            className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
              isActive("/services")
                ? "text-[#0F7377] font-semibold"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Services
          </Link>
          <Link
            href="/programmes"
            className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
              isActive("/programmes")
                ? "text-[#0F7377] font-semibold"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Programmes
          </Link>
          <Link
            href="/news"
            className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
              isActive("/news")
                ? "text-[#0F7377] font-semibold"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            News
          </Link> */}
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 md:hidden z-50 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/about"
                className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
                  isActive("/about")
                    ? "text-[#0F7377] font-semibold"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
                  isActive("/services")
                    ? "text-[#0F7377] font-semibold"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/programmes"
                className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
                  isActive("/programmes")
                    ? "text-[#0F7377] font-semibold"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Programmes
              </Link>
              <Link
                href="/news"
                className={`text-sm font-medium transition-all duration-200 hover:text-[#0F7377] ${
                  isActive("/news")
                    ? "text-[#0F7377] font-semibold"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                News
              </Link>
            </nav>
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <SimpleThemeToggle />
          <PersistentQRButton
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          />

          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            title="Notifications"
            asChild
          >
            <Link href="/notifications">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                </div>
              )}
            </Link>
          </Button>

          {!user ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden sm:flex hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white hover:from-[#0F7377]/90 hover:to-[#1E293B]/90 shadow-md hover:shadow-lg transition-all duration-200"
                asChild
              >
                <Link href="/accelerator/apply">Apply Now</Link>
              </Button>
            </div>
          ) : (
            // <Button
            //   variant="ghost"
            //   size="sm"
            //   asChild
            //   className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            // >
            //   <Link href="/">Home</Link>
            // </Button>
            <ContextSwitcher />
          )}
        </div>
      </div>
    </header>
  );
}
