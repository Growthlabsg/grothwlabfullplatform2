"use client"

import { useEffect, useRef } from "react"

export function useIntersectionObserver(callback: () => void, options: IntersectionObserverInit = { threshold: 0.1 }) {
  const observerRef = useRef<HTMLDivElement>(null)
  const callbackRef = useRef(callback)

  // Update the callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        callbackRef.current()
      }
    }, options)

    const currentElement = observerRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [options])

  return observerRef
}
