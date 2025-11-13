"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MessageSquare } from "lucide-react"
import { WhatsAppModalHub } from "@/components/communication/whatsapp-modal-hub"

interface FloatingCommunicationHubProps {
  className?: string
}

export function FloatingCommunicationHub({ className }: FloatingCommunicationHubProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(12)
  const [isHovered, setIsHovered] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Close when clicking outside - Fixed to include modal content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      // Check if click is outside the floating button container
      const isOutsideContainer = containerRef.current && !containerRef.current.contains(target)
      
      // Check if click is outside the modal (using data attribute)
      const isOutsideModal = !(target as Element)?.closest('[data-modal="whatsapp-hub"]')
      
      // Only close if click is outside both the container and modal
      if (isOutsideContainer && isOutsideModal) {
        console.log("Click outside detected - closing modal")
        setIsOpen(false)
      }
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        console.log("Escape key pressed - closing modal")
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Floating WhatsApp Button - Perfect Alignment */}
      <div
        ref={containerRef}
        className={cn(
          "fixed bottom-8 right-8 z-40 transition-all duration-300 ease-in-out",
          isOpen && "z-50",
          className
        )}
      >
        <Button
          onClick={() => {
            console.log("Floating button clicked, toggling modal")
            setIsOpen(!isOpen)
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isOpen ? "Close communication hub" : "Open communication hub"}
          aria-expanded={isOpen}
          className={cn(
            "h-16 w-16 rounded-full shadow-2xl border-0 p-0 relative transition-all duration-300 ease-in-out transform",
            isOpen 
              ? "bg-[#008F72] hover:bg-[#007A5F] scale-110 ring-4 ring-[#00A884]/30" 
              : "bg-[#00A884] hover:bg-[#008F72] hover:scale-105",
            isHovered && !isOpen && "shadow-[0_20px_40px_rgba(0,168,132,0.3)]"
          )}
        >
          <MessageSquare className="h-7 w-7 text-white transition-transform duration-200" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full min-w-[24px] h-6 text-xs border-2 border-white animate-pulse shadow-lg">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          
          {/* Ripple effect for visual feedback */}
          <div className={cn(
            "absolute inset-0 rounded-full bg-white/20 scale-0 transition-transform duration-300",
            isHovered && "scale-100"
          )} />
        </Button>
      </div>

      {/* WhatsApp Modal - Perfectly Aligned */}
      <WhatsAppModalHub 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
} 