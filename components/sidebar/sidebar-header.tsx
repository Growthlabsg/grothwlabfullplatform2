"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export function SidebarHeader({
  isCollapsed,
  toggleSidebar,
}: SidebarHeaderProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm relative">
      <div
        className={`flex items-center ${
          isCollapsed ? "justify-center px-2" : "justify-between px-4"
        } py-4`}
      >
        <Link
          href="/"
          className={`flex items-center gap-3 group ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <Image
            src="/images/GrowthLab Icon (1).png"
            alt="GrowthLab Logo"
            width={48}
            height={48}
            className="flex-shrink-0"
            priority
          />
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-[#0F7377] to-[#1E293B] bg-clip-text text-transparent transition-opacity duration-200">
                GrowthLab
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Singapore
              </span>
            </div>
          )}
        </Link>

        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full absolute -right-3 top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
