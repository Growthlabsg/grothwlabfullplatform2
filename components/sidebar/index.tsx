"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { useNotifications } from "@/contexts/notification-context";
import { useToast } from "@/components/ui/use-toast";
import { CreateGroupDialog } from "@/components/communication/create-group-dialog";
import { CommunicationSettingsDialog } from "@/components/communication/communication-settings-dialog";
import type { UserRole, Permission } from "@/types/auth";

import { SidebarHeader } from "./sidebar-header";
import { SidebarSearchBar } from "./sidebar-search-bar";
import { SidebarQRCode } from "./sidebar-qr-code";
import { SidebarNavSection } from "./sidebar-nav-section";
import { SidebarUserProfile } from "./sidebar-user-profile";
import { useNavItems } from "./nav-items";
import type { NavItem } from "./types";

interface GrowthLabSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

// Safe QR code hook
function useSafeQRCode() {
  const [qrCode, setQrCode] = useState<any>(null);

  useEffect(() => {
    const initializeQRCode = async () => {
      const defaultQRCode = {
        openQRScanner: () => {},
        openQRGenerator: () => {},
        closeQRScanner: () => {},
        closeQRGenerator: () => {},
        isQRScannerOpen: false,
        isQRGeneratorOpen: false,
      };

      try {
        const qrCodeContext = await import("@/contexts/qr-code-context");
        if (typeof qrCodeContext.useQRCode === "function") {
          try {
            const qrCodeResult = qrCodeContext.useQRCode();
            setQrCode(qrCodeResult);
          } catch {
            setQrCode(defaultQRCode);
          }
        } else {
          setQrCode(defaultQRCode);
        }
      } catch {
        setQrCode(defaultQRCode);
      }
    };

    initializeQRCode();
  }, []);

  return qrCode;
}

export function GrowthLabSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}: GrowthLabSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, hasPermission } = useAuth();
  const { toast } = useToast();
  const { unreadCount } = useNotifications();
  const qrCode = useSafeQRCode();

  const [isMounted, setIsMounted] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {
      main: true,
      communication: false,
      admin: false,
      settings: false,
    }
  );
  const [expandedSubItems, setExpandedSubItems] = useState<
    Record<string, boolean>
  >({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [showCreateGroupDialog, setShowCreateGroupDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  const {
    mainNavItems,
    settingsNavItems,
    communicationNavItems,
    adminNavItems,
  } = useNavItems();

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-expand sections based on pathname
  useEffect(() => {
    if (!pathname) return;

    const section = pathname.startsWith("/admin")
      ? "admin"
      : pathname.startsWith("/settings")
      ? "settings"
      : ["/chat", "/calls", "/meetings"].some((item) =>
          pathname.startsWith(item)
        )
      ? "communication"
      : "main";

    setExpandedGroups((prev) => ({ ...prev, [section]: true }));

    mainNavItems.forEach((item) => {
      if (item.subItems?.some((sub) => pathname === sub.href)) {
        setExpandedSubItems((prev) => ({ ...prev, [item.href]: true }));
      }
    });
  }, [pathname, mainNavItems]);

  // Close sidebar on outside click (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobile &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isSidebarOpen, setIsSidebarOpen]);

  // Filter navigation items based on user permissions
  const filterNavItems = (items: NavItem[]): NavItem[] => {
    if (!user) {
      return items.filter((item) => !item.roles && !item.permissions);
    }

    return items.filter((item) => {
      if (!item.roles && !item.permissions) return true;
      if (item.roles?.includes(user.role as UserRole)) return true;
      if (item.permissions?.some((p) => hasPermission(p as Permission)))
        return true;
      return false;
    });
  };

  const filteredMainNavItems = filterNavItems(mainNavItems);
  const filteredSettingsNavItems = filterNavItems(settingsNavItems);
  const filteredCommunicationNavItems = filterNavItems(communicationNavItems);
  const filteredAdminNavItems = filterNavItems(adminNavItems);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleGroupExpansion = (group: string) => {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };
  const toggleSubItemsExpansion = (itemHref: string) => {
    setExpandedSubItems((prev) => ({ ...prev, [itemHref]: !prev[itemHref] }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      router.push("/");
    } catch {
      toast({
        title: "Logout failed",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleActionClick = (href: string) => {
    if (href === "#create-group") {
      setShowCreateGroupDialog(true);
    } else if (href === "#communication-settings") {
      setShowSettingsDialog(true);
    } else {
      router.push(href);
    }
  };

  // Loading skeleton
  if (!isMounted) {
    return (
      <div className="w-64 border-r border-border h-screen">
        <div className="p-4 border-b border-border">
          <Skeleton className="h-8 w-40" />
        </div>
        <div className="p-4 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <div className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} className="h-8 w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile toggle button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 rounded-full shadow-lg md:hidden"
        onClick={toggleMobileSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out transform 
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          ${isCollapsed ? "w-16" : "w-64"}
          bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 
          shadow-xl border-r border-gray-200 dark:border-gray-700
        `}
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <div className="flex flex-col h-full">
          <SidebarHeader
            isCollapsed={isCollapsed}
            toggleSidebar={toggleSidebar}
          />

          {/* Navigation Content */}
          <div className="overflow-y-auto py-4 flex-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {/* QR Code Section */}
            {user && !isCollapsed && (
              <div className="px-4 mb-6">
                <div className="bg-gradient-to-r from-[#0F7377]/10 to-[#1E293B]/10 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <SidebarQRCode
                    user={user}
                    isCollapsed={isCollapsed}
                    openQRGenerator={qrCode?.openQRGenerator}
                  />
                </div>
              </div>
            )}

            {/* Search Bar */}
            {!isCollapsed && (
              <div className="px-4 mb-8">
                <SidebarSearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  filterFavorites={filterFavorites}
                  setFilterFavorites={setFilterFavorites}
                />
              </div>
            )}

            {/* Navigation Sections */}
            <div className={`space-y-8 ${isCollapsed ? "px-2" : "px-4"}`}>
              <SidebarNavSection
                title="Main Navigation"
                groupKey="main"
                items={filteredMainNavItems}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                pathname={pathname}
                expandedGroups={expandedGroups}
                expandedSubItems={expandedSubItems}
                setIsSidebarOpen={setIsSidebarOpen}
                toggleGroupExpansion={toggleGroupExpansion}
                toggleSubItemsExpansion={toggleSubItemsExpansion}
                handleActionClick={handleActionClick}
              />

              <SidebarNavSection
                title="Communication"
                groupKey="communication"
                items={filteredCommunicationNavItems}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                pathname={pathname}
                expandedGroups={expandedGroups}
                expandedSubItems={expandedSubItems}
                setIsSidebarOpen={setIsSidebarOpen}
                toggleGroupExpansion={toggleGroupExpansion}
                toggleSubItemsExpansion={toggleSubItemsExpansion}
                handleActionClick={handleActionClick}
              />

              <SidebarNavSection
                title="Super Admin"
                groupKey="admin"
                items={filteredAdminNavItems}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                pathname={pathname}
                expandedGroups={expandedGroups}
                expandedSubItems={expandedSubItems}
                setIsSidebarOpen={setIsSidebarOpen}
                toggleGroupExpansion={toggleGroupExpansion}
                toggleSubItemsExpansion={toggleSubItemsExpansion}
                handleActionClick={handleActionClick}
              />

              <SidebarNavSection
                title="Settings"
                groupKey="settings"
                items={filteredSettingsNavItems}
                isCollapsed={isCollapsed}
                isMobile={isMobile}
                pathname={pathname}
                expandedGroups={expandedGroups}
                expandedSubItems={expandedSubItems}
                setIsSidebarOpen={setIsSidebarOpen}
                toggleGroupExpansion={toggleGroupExpansion}
                toggleSubItemsExpansion={toggleSubItemsExpansion}
                handleActionClick={handleActionClick}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className={`${isCollapsed ? "px-2 py-4" : "px-4 py-4"}`}>
              <SidebarUserProfile
                user={user}
                isCollapsed={isCollapsed}
                unreadCount={unreadCount}
                handleLogout={handleLogout}
                openQRGenerator={qrCode?.openQRGenerator}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Dialogs */}
      <CreateGroupDialog
        open={showCreateGroupDialog}
        onOpenChange={setShowCreateGroupDialog}
      />
      <CommunicationSettingsDialog
        open={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
      />
    </>
  );
}
