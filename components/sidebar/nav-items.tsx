"use client";

import { useMemo } from "react";
import {
  Building2,
  Home,
  Settings,
  Mail,
  Shield,
  Info,
  Newspaper,
  HelpCircle,
  Lightbulb,
  Globe,
  CreditCard,
} from "lucide-react";
import type { NavItem } from "./types";

export function useNavItems() {
  const mainNavItems: NavItem[] = useMemo(
    () => [
      {
        href: "/",
        icon: <Home className="h-4 w-4" />,
        label: "Home",
        shortcut: "h",
      },
      {
        href: "/feed",
        icon: <Newspaper className="h-4 w-4" />,
        label: "Feed",
        notifications: 3,
        permissions: ["authenticated"],
      },
      {
        href: "/business",
        icon: <Building2 className="h-4 w-4" />,
        label: "My Businesses",
        shortcut: "b",
        permissions: ["authenticated"],
      },
      {
        href: "/news",
        icon: <Globe className="h-4 w-4" />,
        label: "News",
        shortcut: "w",
      },
      {
        href: "/about",
        icon: <Info className="h-4 w-4" />,
        label: "About",
        shortcut: "i",
        subItems: [
          {
            href: "/about/what-happens",
            label: "What happens at GrowthLab",
            icon: <Lightbulb className="h-4 w-4" />,
          },
          {
            href: "/about/faq",
            label: "FAQ",
            icon: <HelpCircle className="h-4 w-4" />,
          },
        ],
      },
    ],
    []
  );

  const settingsNavItems: NavItem[] = useMemo(
    () => [
      {
        href: "/settings/profile",
        icon: <Settings className="h-4 w-4" />,
        label: "Profile Settings",
        shortcut: "s",
        permissions: ["authenticated"],
      },
      {
        href: "/settings/security",
        icon: <Shield className="h-4 w-4" />,
        label: "Security",
        permissions: ["authenticated"],
      },
      {
        href: "/settings/email",
        icon: <Mail className="h-4 w-4" />,
        label: "Email Preferences",
        permissions: ["authenticated"],
      },
      {
        href: "/subscription/plans",
        icon: <CreditCard className="h-4 w-4" />,
        label: "Subscription & Billing",
        permissions: ["authenticated"],
      },
    ],
    []
  );

  // Empty arrays for future use
  const communicationNavItems: NavItem[] = useMemo(() => [], []);
  const adminNavItems: NavItem[] = useMemo(() => [], []);

  return {
    mainNavItems,
    settingsNavItems,
    communicationNavItems,
    adminNavItems,
  };
}
