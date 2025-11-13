"use client"

import { useEffect, type RefObject } from "react"

interface KeyboardNavigationOptions {
  containerRef: RefObject<HTMLElement>
  onArrowUp?: (event: KeyboardEvent) => void
  onArrowDown?: (event: KeyboardEvent) => void
  onArrowLeft?: (event: KeyboardEvent) => void
  onArrowRight?: (event: KeyboardEvent) => void
  onEnter?: (event: KeyboardEvent) => void
  onEscape?: (event: KeyboardEvent) => void
  onTab?: (event: KeyboardEvent) => void
  onShortcut?: (event: KeyboardEvent) => void
  enabled?: boolean
}

export function useKeyboardNavigation({
  containerRef,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onEscape,
  onTab,
  onShortcut,
  enabled = true,
}: KeyboardNavigationOptions) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard navigation when the container is in focus
      if (!containerRef.current?.contains(document.activeElement)) return

      switch (event.key) {
        case "ArrowUp":
          if (onArrowUp) {
            event.preventDefault()
            onArrowUp(event)
          }
          break
        case "ArrowDown":
          if (onArrowDown) {
            event.preventDefault()
            onArrowDown(event)
          }
          break
        case "ArrowLeft":
          if (onArrowLeft) {
            event.preventDefault()
            onArrowLeft(event)
          }
          break
        case "ArrowRight":
          if (onArrowRight) {
            event.preventDefault()
            onArrowRight(event)
          }
          break
        case "Enter":
          if (onEnter) {
            event.preventDefault()
            onEnter(event)
          }
          break
        case "Escape":
          if (onEscape) {
            event.preventDefault()
            onEscape(event)
          }
          break
        case "Tab":
          if (onTab) {
            onTab(event)
          }
          break
        default:
          if (onShortcut && (event.altKey || event.ctrlKey || event.metaKey)) {
            onShortcut(event)
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [containerRef, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onEnter, onEscape, onTab, onShortcut, enabled])
}
