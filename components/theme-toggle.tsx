"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Change theme</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem 
            onClick={() => setTheme("light")}
            className="cursor-pointer"
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
            {resolvedTheme === "light" && (
              <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")}
            className="cursor-pointer"
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
            {resolvedTheme === "dark" && (
              <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setTheme("system")}
            className="cursor-pointer"
          >
            <Monitor className="mr-2 h-4 w-4" />
            <span>System</span>
            {resolvedTheme === "system" && (
              <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  )
}

export function SimpleThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative transition-all duration-300 hover:scale-110"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {resolvedTheme === "light" ? "dark" : "light"} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
