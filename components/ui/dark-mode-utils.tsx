"use client"

import { useTheme } from "next-themes"

// Dark mode utility classes
export const darkModeClasses = {
  // Backgrounds
  bg: {
    primary: "bg-white dark:bg-gray-900",
    secondary: "bg-gray-50 dark:bg-gray-800",
    tertiary: "bg-gray-100 dark:bg-gray-700",
    card: "bg-white dark:bg-gray-800",
    sidebar: "bg-white dark:bg-gray-900",
    header: "bg-white dark:bg-gray-900",
  },
  
  // Text colors
  text: {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-600 dark:text-gray-300",
    muted: "text-gray-500 dark:text-gray-400",
    accent: "text-[#0F7377] dark:text-[#0F7377]",
  },
  
  // Borders
  border: {
    primary: "border-gray-200 dark:border-gray-700",
    secondary: "border-gray-300 dark:border-gray-600",
    accent: "border-[#0F7377] dark:border-[#0F7377]",
  },
  
  // Hover states
  hover: {
    bg: "hover:bg-gray-50 dark:hover:bg-gray-800",
    text: "hover:text-[#0F7377] dark:hover:text-[#0F7377]",
    border: "hover:border-[#0F7377] dark:hover:border-[#0F7377]",
  },
  
  // Focus states
  focus: {
    ring: "focus:ring-[#0F7377] dark:focus:ring-[#0F7377]",
    border: "focus:border-[#0F7377] dark:focus:border-[#0F7377]",
  },
  
  // Input fields
  input: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-gray-300 dark:border-gray-600",
    text: "text-gray-900 dark:text-white",
    placeholder: "placeholder-gray-500 dark:placeholder-gray-400",
  },
  
  // Cards
  card: {
    bg: "bg-white dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
    shadow: "shadow-sm dark:shadow-gray-900/20",
  },
  
  // Buttons
  button: {
    primary: "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white",
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
  },
  
  // Navigation
  nav: {
    active: "text-[#0F7377] dark:text-[#0F7377] bg-[#0F7377]/10 dark:bg-[#0F7377]/20",
    inactive: "text-gray-600 dark:text-gray-300 hover:text-[#0F7377] dark:hover:text-[#0F7377]",
  },
  
  // Status indicators
  status: {
    online: "bg-green-500 dark:bg-green-400",
    offline: "bg-gray-400 dark:bg-gray-500",
    busy: "bg-red-500 dark:bg-red-400",
    away: "bg-yellow-500 dark:bg-yellow-400",
  },
  
  // Transitions
  transition: "transition-all duration-200 ease-in-out",
}

// Hook to get current theme
export function useDarkMode() {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const isLight = resolvedTheme === "light"
  const isSystem = theme === "system"
  
  return {
    theme,
    resolvedTheme,
    isDark,
    isLight,
    isSystem,
  }
}

// Utility function to combine classes with dark mode variants
export function combineClasses(baseClasses: string, darkModeClasses: string): string {
  return `${baseClasses} ${darkModeClasses}`
}

// Common component patterns
export const componentPatterns = {
  // Page container
  pageContainer: "min-h-screen bg-gray-50 dark:bg-gray-900",
  
  // Section container
  sectionContainer: "py-16 bg-white dark:bg-gray-800",
  
  // Card container
  cardContainer: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm",
  
  // Form container
  formContainer: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6",
  
  // Navigation item
  navItem: "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
  
  // Active navigation item
  activeNavItem: "bg-[#0F7377]/10 dark:bg-[#0F7377]/20 text-[#0F7377] dark:text-[#0F7377] font-medium",
  
  // Button variants
  buttonVariants: {
    primary: "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors",
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 font-medium py-2 px-4 rounded-lg transition-colors",
    outline: "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-2 px-4 rounded-lg transition-colors",
  },
  
  // Input field
  inputField: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-[#0F7377] focus:border-transparent transition-colors",
  
  // Label
  label: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
  
  // Heading variants
  headingVariants: {
    h1: "text-4xl font-bold text-gray-900 dark:text-white",
    h2: "text-3xl font-bold text-gray-900 dark:text-white",
    h3: "text-2xl font-semibold text-gray-900 dark:text-white",
    h4: "text-xl font-semibold text-gray-900 dark:text-white",
    h5: "text-lg font-medium text-gray-900 dark:text-white",
    h6: "text-base font-medium text-gray-900 dark:text-white",
  },
  
  // Text variants
  textVariants: {
    body: "text-gray-700 dark:text-gray-300",
    caption: "text-sm text-gray-500 dark:text-gray-400",
    small: "text-xs text-gray-500 dark:text-gray-400",
  },
}
