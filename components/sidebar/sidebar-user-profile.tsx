"use client";

import Link from "next/link";
import {
  User,
  Shield,
  Bell,
  QrCode,
  LogOut,
  Zap,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SimpleThemeToggle } from "@/components/theme-toggle";

interface SidebarUserProfileProps {
  user: any;
  isCollapsed: boolean;
  unreadCount: number;
  handleLogout: () => void;
  openQRGenerator?: () => void;
}

export function SidebarUserProfile({
  user,
  isCollapsed,
  unreadCount,
  handleLogout,
  openQRGenerator,
}: SidebarUserProfileProps) {
  return (
    <div className={`flex flex-col gap-4 ${isCollapsed ? "items-center" : ""}`}>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`p-0 h-auto ${
                isCollapsed ? "w-12 h-12 rounded-xl" : "w-full"
              }`}
            >
              <div
                className={`flex items-center ${
                  isCollapsed ? "flex-col justify-center" : "gap-3"
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={user.avatarUrl || "/placeholder.svg?key=user"}
                      alt={user.displayName || "User"}
                    />
                    <AvatarFallback>
                      {user.firstName
                        ? user.firstName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500 text-[8px] text-white items-center justify-center">
                      {unreadCount}
                    </span>
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">
                      {user?.firstName} {user?.lastName || ""}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.emailAddress}
                    </p>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align={isCollapsed ? "center" : "end"}
            className="w-56"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/settings/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings/security" className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/notifications"
                className="cursor-pointer flex justify-between"
              >
                <div className="flex items-center">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </div>
                {unreadCount > 0 && (
                  <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={openQRGenerator}
              className="cursor-pointer"
            >
              <QrCode className="mr-2 h-4 w-4" />
              <span>My QR Code</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center justify-between w-full">
                <span>Theme</span>
                <SimpleThemeToggle />
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {!isCollapsed ? (
            <>
              <div className="text-xs text-muted-foreground">
                Join our community:
              </div>
              <div className="flex gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white border-0 shadow-sm"
                  asChild
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377] hover:text-white"
                  asChild
                >
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="icon"
                      className="w-10 h-10 rounded-xl"
                      asChild
                    >
                      <Link href="/signup">
                        <UserPlus className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-gray-900 text-white border-gray-700 shadow-lg"
                  >
                    <span>Sign Up</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-10 h-10 rounded-xl"
                      asChild
                    >
                      <Link href="/login">
                        <LogIn className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-gray-900 text-white border-gray-700 shadow-lg"
                  >
                    <span>Log In</span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </>
      )}

      {/* Community channels */}
      {!isCollapsed ? (
        <>
          <div className="text-xs text-muted-foreground pt-2">
            Connect with us:
          </div>
          <div className="flex gap-2 w-full overflow-hidden">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-0 text-xs px-2 transition-all duration-200 hover:bg-muted/80 hover:scale-105"
              asChild
            >
              <Link href="https://whatsapp.com" target="_blank">
                <Zap className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">WhatsApp</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-0 text-xs px-2 transition-all duration-200 hover:bg-muted/80 hover:scale-105"
              asChild
            >
              <Link href="https://telegram.org" target="_blank">
                <Zap className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">Telegram</span>
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  asChild
                >
                  <Link href="https://telegram.org" target="_blank">
                    <Zap className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="z-[60]">
                Connect with us
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
