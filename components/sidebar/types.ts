import type React from "react";
import type { UserRole } from "@/types/auth";

export interface NavItem {
  href: string;
  icon: React.ReactNode;
  label: string;
  roles?: UserRole[];
  permissions?: string[];
  badge?: {
    text: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  };
  shortcut?: string;
  isAction?: boolean;
  notifications?: number;
  subItems?: {
    href: string;
    label: string;
    icon?: React.ReactNode;
    notifications?: number;
  }[];
}

export interface SidebarContextType {
  isCollapsed: boolean;
  isMobile: boolean;
  isSidebarOpen: boolean;
  expandedGroups: Record<string, boolean>;
  expandedSubItems: Record<string, boolean>;
  pathname: string;
  setIsSidebarOpen: (open: boolean) => void;
  toggleGroupExpansion: (group: string) => void;
  toggleSubItemsExpansion: (itemHref: string) => void;
}
