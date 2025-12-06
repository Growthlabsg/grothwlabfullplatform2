"use client";

import { ChevronRight } from "lucide-react";

interface SidebarGroupHeaderProps {
  label: string;
  groupKey: string;
  isCollapsed: boolean;
  isMobile: boolean;
  isExpanded: boolean;
  onToggle: (group: string) => void;
}

export function SidebarGroupHeader({
  label,
  groupKey,
  isCollapsed,
  isMobile,
  isExpanded,
  onToggle,
}: SidebarGroupHeaderProps) {
  return (
    <div
      className={`py-3 text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center justify-between cursor-pointer 
         transition-all duration-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg ${
           isCollapsed ? "justify-center px-1" : "px-4"
         }
         ${isMobile ? "py-4" : ""}`}
      onClick={() => !isCollapsed && onToggle(groupKey)}
    >
      {!isCollapsed && (
        <>
          <span className="uppercase tracking-wider font-medium">{label}</span>
          <ChevronRight
            className={`h-4 w-4 transition-all duration-300 text-gray-400 ${
              isExpanded ? "transform rotate-90" : ""
            }`}
          />
        </>
      )}
      {isCollapsed && (
        <div className="flex flex-col items-center gap-1">
          <span className="w-4 h-px bg-gray-300 dark:bg-gray-600"></span>
          <span className="w-2 h-px bg-gray-200 dark:bg-gray-700"></span>
        </div>
      )}
    </div>
  );
}
