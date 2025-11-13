"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  threshold?: number
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
}

export function ScrollAnimation({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  direction = "up",
  duration = 0.6
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, delay])

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(30px)"
      case "down":
        return "translateY(-30px)"
      case "left":
        return "translateX(30px)"
      case "right":
        return "translateX(-30px)"
      default:
        return "translateY(30px)"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 transform-none" : "opacity-0",
        className
      )}
      style={{
        transform: isVisible ? "none" : getTransform(),
        transitionDuration: `${duration}s`
      }}
    >
      {children}
    </div>
  )
}

// Staggered animation for lists
export function StaggeredAnimation({
  children,
  className,
  staggerDelay = 0.1
}: {
  children: React.ReactNode[]
  className?: string
  staggerDelay?: number
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <ScrollAnimation
          key={index}
          delay={index * staggerDelay * 1000}
          className="mb-4"
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  )
}

// Fade in animation
export function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ScrollAnimation className={cn("animate-fade-in-up", className)}>
      {children}
    </ScrollAnimation>
  )
}

// Slide in from left
export function SlideInLeft({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ScrollAnimation direction="left" className={cn("animate-slide-in-left", className)}>
      {children}
    </ScrollAnimation>
  )
}

// Slide in from right
export function SlideInRight({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ScrollAnimation direction="right" className={cn("animate-slide-in-right", className)}>
      {children}
    </ScrollAnimation>
  )
}

// Counter animation
export function AnimatedCounter({
  value,
  className,
  duration = 2000
}: {
  value: number | string
  className?: string
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && typeof value === "number") {
      const startTime = Date.now()
      const startValue = 0
      const endValue = value

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const currentValue = Math.floor(startValue + (endValue - startValue) * progress)
        setDisplayValue(currentValue)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    } else if (isVisible) {
      setDisplayValue(Number(value))
    }
  }, [isVisible, value, duration])

  return (
    <span ref={ref} className={cn("animate-count-up", className)}>
      {displayValue}
    </span>
  )
} 