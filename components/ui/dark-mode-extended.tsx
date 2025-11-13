"use client"

import { useTheme } from "next-themes"

// Extended dark mode utility classes for comprehensive coverage
export const darkModeExtended = {
  // Page containers
  page: {
    container: "min-h-screen bg-gray-50 dark:bg-gray-900",
    content: "bg-white dark:bg-gray-800",
    section: "bg-gray-50 dark:bg-gray-900",
    card: "bg-white dark:bg-gray-800",
  },
  
  // Text variations
  text: {
    // Headings
    h1: "text-4xl font-bold text-gray-900 dark:text-white",
    h2: "text-3xl font-bold text-gray-900 dark:text-white",
    h3: "text-2xl font-semibold text-gray-900 dark:text-white",
    h4: "text-xl font-semibold text-gray-900 dark:text-white",
    h5: "text-lg font-medium text-gray-900 dark:text-white",
    h6: "text-base font-medium text-gray-900 dark:text-white",
    
    // Body text
    body: "text-gray-700 dark:text-gray-300",
    bodyLarge: "text-lg text-gray-700 dark:text-gray-300",
    bodySmall: "text-sm text-gray-600 dark:text-gray-400",
    caption: "text-sm text-gray-500 dark:text-gray-400",
    small: "text-xs text-gray-500 dark:text-gray-400",
    
    // Special text
    accent: "text-[#0F7377] dark:text-[#0F7377]",
    muted: "text-gray-500 dark:text-gray-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    error: "text-red-600 dark:text-red-400",
    info: "text-blue-600 dark:text-blue-400",
  },
  
  // Background variations
  background: {
    // Main backgrounds
    primary: "bg-white dark:bg-gray-900",
    secondary: "bg-gray-50 dark:bg-gray-800",
    tertiary: "bg-gray-100 dark:bg-gray-700",
    
    // Card backgrounds
    card: "bg-white dark:bg-gray-800",
    cardHover: "hover:bg-gray-50 dark:hover:bg-gray-700",
    
    // Section backgrounds
    section: "bg-white dark:bg-gray-800",
    sectionAlt: "bg-gray-50 dark:bg-gray-900",
    
    // Overlay backgrounds
    overlay: "bg-white/80 dark:bg-gray-900/80",
    backdrop: "bg-black/50 dark:bg-black/70",
  },
  
  // Border variations
  border: {
    // Main borders
    primary: "border-gray-200 dark:border-gray-700",
    secondary: "border-gray-300 dark:border-gray-600",
    accent: "border-[#0F7377] dark:border-[#0F7377]",
    
    // Card borders
    card: "border-gray-200 dark:border-gray-700",
    cardHover: "hover:border-gray-300 dark:hover:border-gray-600",
    
    // Input borders
    input: "border-gray-300 dark:border-gray-600",
    inputFocus: "focus:border-[#0F7377] dark:focus:border-[#0F7377]",
    inputError: "border-red-500 dark:border-red-400",
    
    // Divider borders
    divider: "border-gray-200 dark:border-gray-700",
    separator: "border-gray-100 dark:border-gray-800",
  },
  
  // Interactive states
  interactive: {
    // Hover states
    hover: {
      bg: "hover:bg-gray-50 dark:hover:bg-gray-700",
      text: "hover:text-[#0F7377] dark:hover:text-[#0F7377]",
      border: "hover:border-[#0F7377] dark:hover:border-[#0F7377]",
      scale: "hover:scale-105",
      shadow: "hover:shadow-lg dark:hover:shadow-gray-900/30",
    },
    
    // Focus states
    focus: {
      ring: "focus:ring-2 focus:ring-[#0F7377] dark:focus:ring-[#0F7377]",
      border: "focus:border-[#0F7377] dark:focus:border-[#0F7377]",
      outline: "focus:outline-none",
    },
    
    // Active states
    active: {
      bg: "active:bg-gray-100 dark:active:bg-gray-600",
      scale: "active:scale-95",
    },
    
    // Disabled states
    disabled: {
      opacity: "opacity-50",
      cursor: "cursor-not-allowed",
      pointer: "pointer-events-none",
    },
  },
  
  // Form elements
  form: {
    // Input fields
    input: {
      base: "w-full px-3 py-2 border rounded-lg transition-colors",
      light: "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
      dark: "dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400",
      focus: "focus:ring-2 focus:ring-[#0F7377] focus:border-transparent",
      error: "border-red-500 dark:border-red-400",
      success: "border-green-500 dark:border-green-400",
    },
    
    // Labels
    label: {
      base: "block text-sm font-medium mb-2",
      light: "text-gray-700",
      dark: "dark:text-gray-300",
      required: "after:content-['*'] after:ml-0.5 after:text-red-500",
    },
    
    // Checkboxes and radios
    checkbox: {
      base: "h-4 w-4 rounded border-gray-300 text-[#0F7377]",
      dark: "dark:border-gray-600 dark:bg-gray-800",
      focus: "focus:ring-2 focus:ring-[#0F7377] focus:ring-offset-2",
    },
    
    // Select dropdowns
    select: {
      base: "w-full px-3 py-2 border rounded-lg transition-colors",
      light: "bg-white border-gray-300 text-gray-900",
      dark: "dark:bg-gray-800 dark:border-gray-600 dark:text-white",
      focus: "focus:ring-2 focus:ring-[#0F7377] focus:border-transparent",
    },
  },
  
  // Button variations
  button: {
    // Primary buttons
    primary: {
      base: "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200",
      light: "bg-[#0F7377] text-white hover:bg-[#0F7377]/90 shadow-sm",
      dark: "dark:bg-[#0F7377] dark:text-white dark:hover:bg-[#0F7377]/90",
      focus: "focus:ring-2 focus:ring-[#0F7377] focus:ring-offset-2",
      disabled: "opacity-50 cursor-not-allowed",
    },
    
    // Secondary buttons
    secondary: {
      base: "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200",
      light: "bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-300",
      dark: "dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:border-gray-600",
      focus: "focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
      disabled: "opacity-50 cursor-not-allowed",
    },
    
    // Outline buttons
    outline: {
      base: "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200",
      light: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      dark: "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700",
      focus: "focus:ring-2 focus:ring-[#0F7377] focus:ring-offset-2",
      disabled: "opacity-50 cursor-not-allowed",
    },
    
    // Ghost buttons
    ghost: {
      base: "inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200",
      light: "text-gray-700 hover:bg-gray-100",
      dark: "dark:text-gray-300 dark:hover:bg-gray-700",
      focus: "focus:ring-2 focus:ring-[#0F7377] focus:ring-offset-2",
      disabled: "opacity-50 cursor-not-allowed",
    },
    
    // Icon buttons
    icon: {
      base: "inline-flex items-center justify-center p-2 rounded-lg transition-all duration-200",
      light: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      dark: "dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700",
      focus: "focus:ring-2 focus:ring-[#0F7377] focus:ring-offset-2",
      disabled: "opacity-50 cursor-not-allowed",
    },
  },
  
  // Navigation elements
  navigation: {
    // Nav items
    item: {
      base: "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200",
      light: "text-gray-700 hover:bg-gray-100",
      dark: "dark:text-gray-300 dark:hover:bg-gray-700",
      active: "bg-[#0F7377]/10 text-[#0F7377] font-medium",
      activeDark: "dark:bg-[#0F7377]/20 dark:text-[#0F7377]",
    },
    
    // Breadcrumbs
    breadcrumb: {
      base: "flex items-center space-x-2 text-sm",
      light: "text-gray-500",
      dark: "dark:text-gray-400",
      current: "text-gray-900 dark:text-white font-medium",
      separator: "text-gray-300 dark:text-gray-600",
    },
    
    // Tabs
    tab: {
      base: "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
      light: "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
      dark: "dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700",
      active: "bg-[#0F7377] text-white",
      activeDark: "dark:bg-[#0F7377] dark:text-white",
    },
  },
  
  // Data display
  data: {
    // Tables
    table: {
      container: "w-full overflow-hidden rounded-lg border",
      light: "bg-white border-gray-200",
      dark: "dark:bg-gray-800 dark:border-gray-700",
      header: "bg-gray-50 dark:bg-gray-700",
      row: "border-b border-gray-200 dark:border-gray-700",
      rowHover: "hover:bg-gray-50 dark:hover:bg-gray-700",
      cell: "px-6 py-4 text-sm text-gray-900 dark:text-white",
      cellHeader: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider",
    },
    
    // Lists
    list: {
      container: "divide-y",
      light: "divide-gray-200 bg-white",
      dark: "dark:divide-gray-700 dark:bg-gray-800",
      item: "px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
    },
    
    // Cards
    card: {
      base: "rounded-lg border shadow-sm transition-all duration-200",
      light: "bg-white border-gray-200",
      dark: "dark:bg-gray-800 dark:border-gray-700",
      hover: "hover:shadow-md dark:hover:shadow-gray-900/30",
      header: "px-6 py-4 border-b border-gray-200 dark:border-gray-700",
      content: "px-6 py-4",
      footer: "px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50",
    },
  },
  
  // Status indicators
  status: {
    // Badges
    badge: {
      base: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      neutral: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    },
    
    // Status dots
    dot: {
      base: "w-2 h-2 rounded-full",
      online: "bg-green-500 dark:bg-green-400",
      offline: "bg-gray-400 dark:bg-gray-500",
      busy: "bg-red-500 dark:bg-red-400",
      away: "bg-yellow-500 dark:bg-yellow-400",
    },
  },
  
  // Animations and transitions
  animation: {
    // Transitions
    transition: {
      base: "transition-all duration-200 ease-in-out",
      fast: "transition-all duration-100 ease-in-out",
      slow: "transition-all duration-300 ease-in-out",
      transform: "transition-transform duration-200 ease-in-out",
      colors: "transition-colors duration-200 ease-in-out",
      opacity: "transition-opacity duration-200 ease-in-out",
    },
    
    // Hover effects
    hover: {
      scale: "hover:scale-105 transition-transform duration-200",
      lift: "hover:-translate-y-1 hover:shadow-lg transition-all duration-200",
      glow: "hover:shadow-[0_0_20px_rgba(15,115,119,0.3)] transition-shadow duration-200",
    },
    
    // Loading states
    loading: {
      spin: "animate-spin",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      ping: "animate-ping",
    },
  },
  
  // Responsive utilities
  responsive: {
    // Container padding
    container: "px-4 sm:px-6 lg:px-8",
    
    // Grid layouts
    grid: {
      cols1: "grid-cols-1",
      cols2: "grid-cols-1 md:grid-cols-2",
      cols3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      cols4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    },
    
    // Spacing
    spacing: {
      section: "py-16 lg:py-20",
      container: "max-w-7xl mx-auto",
      gap: "gap-4 sm:gap-6 lg:gap-8",
    },
  },
}

// Hook for extended dark mode utilities
export function useDarkModeExtended() {
  const { theme, resolvedTheme } = useTheme()
  
  const isDark = resolvedTheme === "dark"
  const isLight = resolvedTheme === "light"
  const isSystem = theme === "system"
  
  // Get theme-aware classes
  const getClasses = (baseClasses: string, lightClasses: string, darkClasses: string) => {
    return `${baseClasses} ${isDark ? darkClasses : lightClasses}`
  }
  
  // Get conditional classes
  const getConditionalClasses = (condition: boolean, trueClasses: string, falseClasses: string) => {
    return condition ? trueClasses : falseClasses
  }
  
  return {
    theme,
    resolvedTheme,
    isDark,
    isLight,
    isSystem,
    getClasses,
    getConditionalClasses,
  }
}

// Utility function to combine multiple class sets
export function combineClassSets(...classSets: string[]) {
  return classSets.filter(Boolean).join(" ")
}

// Predefined component patterns
export const componentPatterns = {
  // Page layouts
  page: {
    container: darkModeExtended.page.container,
    header: darkModeExtended.page.content,
    content: darkModeExtended.page.content,
    footer: darkModeExtended.page.section,
  },
  
  // Form layouts
  form: {
    container: darkModeExtended.page.card,
    field: "space-y-2",
    row: "grid grid-cols-1 md:grid-cols-2 gap-4",
    actions: "flex justify-end gap-3 pt-6",
  },
  
  // Card layouts
  card: {
    container: darkModeExtended.data.card.base + " " + darkModeExtended.data.card.light + " " + darkModeExtended.data.card.dark,
    header: darkModeExtended.data.card.header,
    content: darkModeExtended.data.card.content,
    footer: darkModeExtended.data.card.footer,
  },
  
  // Table layouts
  table: {
    container: darkModeExtended.data.table.container + " " + darkModeExtended.data.table.light + " " + darkModeExtended.data.table.dark,
    header: darkModeExtended.data.table.header,
    row: darkModeExtended.data.table.row,
    cell: darkModeExtended.data.table.cell,
    cellHeader: darkModeExtended.data.table.cellHeader,
  },
  
  // Navigation layouts
  nav: {
    container: "space-y-1",
    item: darkModeExtended.navigation.item.base + " " + darkModeExtended.navigation.item.light + " " + darkModeExtended.navigation.item.dark,
    active: darkModeExtended.navigation.item.active + " " + darkModeExtended.navigation.item.activeDark,
  },
}
