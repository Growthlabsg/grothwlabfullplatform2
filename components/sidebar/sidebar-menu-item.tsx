"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "./types";

interface SidebarMenuItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  isMobile: boolean;
  pathname: string;
  expandedSubItems: Record<string, boolean>;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSubItemsExpansion: (itemHref: string) => void;
  handleActionClick: (href: string) => void;
}

export function SidebarMenuItem({
  item,
  isActive,
  isCollapsed,
  isMobile,
  pathname,
  expandedSubItems,
  setIsSidebarOpen,
  toggleSubItemsExpansion,
  handleActionClick,
}: SidebarMenuItemProps) {
  const router = useRouter();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isSubItemActive =
    hasSubItems && item.subItems?.some((subItem) => pathname === subItem.href);
  const isExpanded = expandedSubItems[item.href];

  const getBadgeClass = (variant: string): string => {
    switch (variant) {
      case "default":
        return "bg-primary text-primary-foreground";
      case "secondary":
        return "bg-secondary text-secondary-foreground";
      case "destructive":
        return "bg-destructive text-destructive-foreground";
      case "outline":
        return "bg-background text-foreground border border-input";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const renderNotificationBadge = (count?: number) => {
    if (!count) return null;
    return (
      <Badge className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
        {count}
      </Badge>
    );
  };

  const menuItem = (
    <div className="flex flex-col w-full">
      <div
        className={`flex items-center justify-between w-full py-3.5 px-4 rounded-xl transition-all duration-300 
         ${
           isActive || isSubItemActive
             ? "bg-gradient-to-r from-[#0F7377]/20 to-[#1E293B]/20 text-[#0F7377] font-semibold shadow-sm border border-[#0F7377]/20"
             : item.isAction
             ? "bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 hover:from-[#F59E0B]/20 hover:to-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer"
             : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:translate-x-1 hover:shadow-sm cursor-pointer"
         }
         ${isMobile ? "py-4" : ""}
         group
       `}
        role="menuitem"
        onClick={() => {
          if (hasSubItems) {
            toggleSubItemsExpansion(item.href);
          } else if (item.isAction) {
            handleActionClick(item.href);
          } else {
            router.push(item.href);
            if (isMobile) {
              setIsSidebarOpen(false);
            }
          }
        }}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span
            className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-all duration-300 ${
              item.isAction
                ? "text-[#F59E0B] group-hover:scale-110"
                : isActive || isSubItemActive
                ? "text-[#0F7377] group-hover:scale-110"
                : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 group-hover:scale-110"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`text-sm transition-all duration-300 flex-1 min-w-0 ${
              isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            } ${item.isAction ? "font-medium" : ""}`}
          >
            {item.label}
          </span>
          {item.shortcut && !isCollapsed && !item.isAction && !hasSubItems && (
            <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium text-gray-600 dark:text-gray-400 flex-shrink-0">
              Alt+{item.shortcut}
            </kbd>
          )}
          {!isCollapsed && renderNotificationBadge(item.notifications)}
        </div>
        {item.badge && !isCollapsed && (
          <span
            className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getBadgeClass(
              item.badge.variant
            )} flex-shrink-0`}
          >
            {item.badge.text}
          </span>
        )}
        {hasSubItems && !isCollapsed && (
          <ChevronRight
            className={`h-4 w-4 ml-2 transition-all duration-300 flex-shrink-0 ${
              isExpanded ? "transform rotate-90" : ""
            } text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300`}
          />
        )}
      </div>

      {/* Render subItems if expanded */}
      {hasSubItems && !isCollapsed && item.subItems && (
        <div
          className={`transition-all duration-300 overflow-hidden pl-4 ${
            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {item.subItems.map((subItem) => (
            <div
              key={subItem.href}
              className={`flex items-center justify-between py-3 px-4 my-1 rounded-lg cursor-pointer transition-all duration-300 ${
                pathname === subItem.href
                  ? "bg-gradient-to-r from-[#0F7377]/15 to-[#1E293B]/15 text-[#0F7377] font-medium shadow-sm border border-[#0F7377]/15"
                  : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:translate-x-1"
              } ${isMobile ? "py-3" : ""}`}
              onClick={() => {
                router.push(subItem.href);
                if (isMobile) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {subItem.icon && (
                  <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    {subItem.icon}
                  </span>
                )}
                <span className="text-sm flex-1 min-w-0">{subItem.label}</span>
              </div>
              {renderNotificationBadge(subItem.notifications)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isCollapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`flex items-center justify-center w-full py-3 px-1 rounded-xl transition-all duration-300 
               ${
                 isActive || isSubItemActive
                   ? "bg-gradient-to-r from-[#0F7377]/20 to-[#1E293B]/20 text-[#0F7377] font-semibold shadow-sm border border-[#0F7377]/20"
                   : item.isAction
                   ? "bg-gradient-to-r from-[#F59E0B]/10 to-[#F59E0B]/5 hover:from-[#F59E0B]/20 hover:to-[#F59E0B]/10 hover:text-[#F59E0B] cursor-pointer"
                   : "hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-gray-800 dark:hover:to-gray-700 hover:shadow-sm cursor-pointer"
               }
               ${isMobile ? "py-4" : ""}
               relative group mx-1
             `}
              role="menuitem"
              onClick={() => {
                if (item.isAction) {
                  handleActionClick(item.href);
                } else if (!hasSubItems) {
                  router.push(item.href);
                  if (isMobile) {
                    setIsSidebarOpen(false);
                  }
                }
              }}
            >
              <span
                className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                  item.isAction
                    ? "text-[#F59E0B] group-hover:scale-110"
                    : isActive || isSubItemActive
                    ? "text-[#0F7377] group-hover:scale-110"
                    : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 group-hover:scale-110"
                }`}
              >
                {item.icon}
              </span>
              {item.notifications && item.notifications > 0 && (
                <div className="absolute -top-1 -right-1">
                  <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {item.notifications > 99 ? "99+" : item.notifications}
                  </Badge>
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="bg-gray-900 text-white border-gray-700 shadow-lg"
          >
            <div className="flex flex-col gap-1">
              <span className="font-medium">{item.label}</span>
              {item.shortcut && (
                <span className="text-xs text-gray-300">
                  Alt+{item.shortcut}
                </span>
              )}
              {item.notifications && item.notifications > 0 && (
                <span className="text-xs text-red-400">
                  {item.notifications} notifications
                </span>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return menuItem;
}
