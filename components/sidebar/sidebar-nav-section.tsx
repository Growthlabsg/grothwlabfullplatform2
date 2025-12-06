"use client";

import { SidebarMenuItem } from "./sidebar-menu-item";
import { SidebarGroupHeader } from "./sidebar-group-header";
import type { NavItem } from "./types";

interface SidebarNavSectionProps {
  title: string;
  groupKey: string;
  items: NavItem[];
  isCollapsed: boolean;
  isMobile: boolean;
  pathname: string;
  expandedGroups: Record<string, boolean>;
  expandedSubItems: Record<string, boolean>;
  setIsSidebarOpen: (open: boolean) => void;
  toggleGroupExpansion: (group: string) => void;
  toggleSubItemsExpansion: (itemHref: string) => void;
  handleActionClick: (href: string) => void;
}

export function SidebarNavSection({
  title,
  groupKey,
  items,
  isCollapsed,
  isMobile,
  pathname,
  expandedGroups,
  expandedSubItems,
  setIsSidebarOpen,
  toggleGroupExpansion,
  toggleSubItemsExpansion,
  handleActionClick,
}: SidebarNavSectionProps) {
  if (items.length === 0) return null;

  return (
    <div
      className={`transition-all duration-300 ${
        !expandedGroups[groupKey] && !isCollapsed ? "mb-0" : ""
      }`}
    >
      <SidebarGroupHeader
        label={title}
        groupKey={groupKey}
        isCollapsed={isCollapsed}
        isMobile={isMobile}
        isExpanded={expandedGroups[groupKey] ?? false}
        onToggle={toggleGroupExpansion}
      />
      <div
        className={`transition-all duration-300 overflow-hidden ${
          !expandedGroups[groupKey] && !isCollapsed
            ? "max-h-0 opacity-0"
            : "max-h-[2000px] opacity-100"
        }`}
      >
        <div className={`${isCollapsed ? "space-y-1" : "py-3 space-y-2"}`}>
          {items.map((item) => (
            <div key={item.href} className={isCollapsed ? "my-0" : "my-0.5"}>
              <SidebarMenuItem
                item={item}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                pathname={pathname}
                expandedSubItems={expandedSubItems}
                setIsSidebarOpen={setIsSidebarOpen}
                toggleSubItemsExpansion={toggleSubItemsExpansion}
                handleActionClick={handleActionClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
