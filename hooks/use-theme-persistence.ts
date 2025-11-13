"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function useThemePersistence() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Get system theme preference
  const getSystemTheme = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  }

  // Set theme with persistence
  const setThemeWithPersistence = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("growthlab-theme", newTheme)
    }
  }

  // Get saved theme preference
  const getSavedTheme = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("growthlab-theme") as "light" | "dark" | "system" | null
    }
    return null
  }

  // Initialize theme on mount
  useEffect(() => {
    if (mounted) {
      const savedTheme = getSavedTheme()
      if (savedTheme && savedTheme !== theme) {
        setTheme(savedTheme)
      }
    }
  }, [mounted, theme, setTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (theme === "system") {
          // Force a re-render when system theme changes
          setTheme("system")
        }
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [theme, setTheme])

  return {
    theme,
    resolvedTheme,
    mounted,
    setTheme: setThemeWithPersistence,
    getSystemTheme,
    getSavedTheme,
  }
}

// Hook for theme-aware color schemes
export function useThemeColors() {
  const { resolvedTheme } = useTheme()
  
  const colors = {
    primary: {
      light: "#0F7377",
      dark: "#0F7377",
    },
    secondary: {
      light: "#F59E0B",
      dark: "#F59E0B",
    },
    background: {
      light: "#FFFFFF",
      dark: "#111827",
    },
    surface: {
      light: "#F9FAFB",
      dark: "#1F2937",
    },
    text: {
      light: "#111827",
      dark: "#F9FAFB",
    },
    textSecondary: {
      light: "#6B7280",
      dark: "#D1D5DB",
    },
    border: {
      light: "#E5E7EB",
      dark: "#374151",
    },
    accent: {
      light: "#E6F0F0",
      dark: "#0C5C5F",
    },
  }

  const getColor = (colorKey: keyof typeof colors, variant: "light" | "dark" = "light") => {
    return colors[colorKey][variant]
  }

  const getCurrentColor = (colorKey: keyof typeof colors) => {
    const variant = resolvedTheme === "dark" ? "dark" : "light"
    return getColor(colorKey, variant)
  }

  return {
    colors,
    getColor,
    getCurrentColor,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
  }
}
