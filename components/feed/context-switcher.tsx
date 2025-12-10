"use client";

import { useState } from "react";
import { usePageContext } from "@/contexts/page-context";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Building2, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContextSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function ContextSwitcher({
  className,
  compact = false,
}: ContextSwitcherProps) {
  const { user } = useAuth();
  const {
    activePage,
    isOperatingAsPage,
    operablePages,
    isLoadingPages,
    switchToPage,
    switchToPersonal,
  } = usePageContext();

  if (!user) return null;

  const currentAvatar = isOperatingAsPage
    ? activePage?.avatarURL
    : user.avatarURL;
  const currentName = isOperatingAsPage
    ? activePage?.businessTitle
    : `${user.firstName} ${user.lastName}`;
  const currentSubtext = isOperatingAsPage
    ? `${activePage?.userRole} · Page`
    : "Personal Account";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center gap-2 h-auto py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-800",
            className
          )}
        >
          <Avatar
            className={cn(
              "border-2",
              compact ? "h-8 w-8" : "h-10 w-10",
              isOperatingAsPage ? "border-blue-500" : "border-gray-200"
            )}
          >
            <AvatarImage src={currentAvatar} />
            <AvatarFallback>
              {isOperatingAsPage ? (
                <Building2 className="h-4 w-4" />
              ) : (
                <>
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </>
              )}
            </AvatarFallback>
          </Avatar>
          {!compact && (
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium truncate max-w-[120px]">
                {currentName}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentSubtext}
              </span>
            </div>
          )}
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium">Switch Account</p>
          <p className="text-xs text-gray-500">
            Post and interact as yourself or a page
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Personal Account Option */}
        <DropdownMenuItem
          onClick={switchToPersonal}
          className={cn(
            "flex items-center gap-3 p-3 cursor-pointer",
            !isOperatingAsPage && "bg-blue-50 dark:bg-blue-900/20"
          )}
        >
          <Avatar className="h-10 w-10 border-2 border-gray-200">
            <AvatarImage src={user.avatarURL} />
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">
                {user.firstName} {user.lastName}
              </span>
              <User className="h-3 w-3 text-gray-400" />
            </div>
            <span className="text-xs text-gray-500">Personal Account</span>
          </div>
          {!isOperatingAsPage && (
            <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
          )}
        </DropdownMenuItem>

        {/* Operable Pages */}
        {isLoadingPages ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
          </div>
        ) : operablePages.length > 0 ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-gray-500 font-normal">
              Your Pages
            </DropdownMenuLabel>
            {operablePages.map((page) => (
              <DropdownMenuItem
                key={page.id}
                onClick={() => switchToPage(page)}
                className={cn(
                  "flex items-center gap-3 p-3 cursor-pointer",
                  activePage?.id === page.id && "bg-blue-50 dark:bg-blue-900/20"
                )}
              >
                <Avatar className="h-10 w-10 border-2 border-blue-200">
                  <AvatarImage src={page.avatarURL} />
                  <AvatarFallback>
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">
                      {page.businessTitle}
                    </span>
                    {page.verificationStatus === "verified" && (
                      <Badge variant="secondary" className="text-xs px-1 py-0">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 capitalize">
                    {page.userRole} · {page.totalFollowers} followers
                  </span>
                </div>
                {activePage?.id === page.id && (
                  <Check className="h-5 w-5 text-blue-500 flex-shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
          </>
        ) : null}

        {/* No operable pages message */}
        {!isLoadingPages && operablePages.length === 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-3 py-2 text-xs text-gray-500">
              No pages available. Create a page or become an admin of a verified
              page to post as a business.
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
