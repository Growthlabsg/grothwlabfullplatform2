"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useGetMyPagesQuery } from "@/lib/redux";
import { BusinessPageListItem } from "@/lib/redux/pagesApi";

interface PageContextState {
  // Active page context
  activePageId: number | null;
  activePage: BusinessPageListItem | null;
  isOperatingAsPage: boolean;

  // Available pages
  myPages: BusinessPageListItem[];
  operablePages: BusinessPageListItem[]; // Pages user can switch to (owner/admin + verified)
  isLoadingPages: boolean;

  // Actions
  switchToPage: (page: BusinessPageListItem) => void;
  switchToPersonal: () => void;
  refreshPages: () => void;
}

const PageContext = createContext<PageContextState | undefined>(undefined);

const PAGE_CONTEXT_KEY = "growthlab_page_context";

export function PageContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePageId, setActivePageId] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch user's pages
  const {
    data: myPages = [],
    isLoading: isLoadingPages,
    refetch: refreshPages,
  } = useGetMyPagesQuery();

  // Filter pages that user can operate as (owner/admin of verified pages)
  const operablePages = useMemo(() => {
    return myPages.filter((page) => page.canSwitchContext);
  }, [myPages]);

  // Find the active page from the list
  const activePage = useMemo(() => {
    if (!activePageId) return null;
    return myPages.find((p) => p.id === activePageId) || null;
  }, [activePageId, myPages]);

  // Load saved context from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      const savedContext = localStorage.getItem(PAGE_CONTEXT_KEY);
      if (savedContext) {
        try {
          const parsed = JSON.parse(savedContext);
          if (parsed.activePageId) {
            setActivePageId(parsed.activePageId);
          }
        } catch (e) {
          console.error("Failed to parse saved page context:", e);
        }
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Validate active page when pages load
  useEffect(() => {
    if (isInitialized && myPages.length > 0 && activePageId) {
      // Check if active page is still valid (user is still owner/admin and page is verified)
      const isValid = operablePages.some((p) => p.id === activePageId);
      if (!isValid) {
        // Page no longer accessible, switch to personal
        setActivePageId(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem(PAGE_CONTEXT_KEY);
        }
      }
    }
  }, [isInitialized, myPages, activePageId, operablePages]);

  // Save context to localStorage when it changes
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      if (activePageId) {
        localStorage.setItem(
          PAGE_CONTEXT_KEY,
          JSON.stringify({ activePageId })
        );
      } else {
        localStorage.removeItem(PAGE_CONTEXT_KEY);
      }
    }
  }, [activePageId, isInitialized]);

  const switchToPage = useCallback((page: BusinessPageListItem) => {
    if (!page.canSwitchContext) {
      console.error(
        "Cannot switch to this page - insufficient permissions or page not verified"
      );
      return;
    }
    setActivePageId(page.id);
  }, []);

  const switchToPersonal = useCallback(() => {
    setActivePageId(null);
  }, []);

  const value: PageContextState = {
    activePageId,
    activePage,
    isOperatingAsPage: activePageId !== null && activePage !== null,
    myPages,
    operablePages,
    isLoadingPages,
    switchToPage,
    switchToPersonal,
    refreshPages,
  };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

export function usePageContext() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePageContext must be used within a PageContextProvider");
  }
  return context;
}
