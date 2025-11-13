"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import EnhancedCommunicationHub from "./enhanced-communication-hub"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCommunication } from "@/contexts/CommunicationContext"

export function CommunicationHubButton() {
  const [isOpen, setIsOpen] = useState(false)
  const { unreadCount, isHubOpen, openHub, closeHub } = useCommunication()

  // Debug logging
  useEffect(() => {
    console.log("CommunicationHubButton mounted, unreadCount:", unreadCount)
  }, [unreadCount])

  return (
    <>
      {/* Main Chat Button - Fixed Position */}
      <div className="fixed bottom-6 right-6 z-50">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="h-16 w-16 rounded-full shadow-xl bg-[#0F7377] hover:bg-[#0F7377]/90 text-white transition-all duration-300 hover:scale-110 border-2 border-white"
                onClick={() => {
                  setIsOpen(true)
                  openHub()
                }}
              >
                <MessageSquare className="h-7 w-7" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-7 w-7 p-0 flex items-center justify-center text-xs font-bold bg-red-500 hover:bg-red-600 border-2 border-white"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-gray-900 text-white p-3 rounded-lg shadow-lg">
              <div className="text-center">
                <p className="font-semibold">GrowthLab Chat</p>
                <p className="text-xs text-gray-300 mt-1">
                  {unreadCount > 0 ? `${unreadCount} unread messages` : "No new messages"}
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Communication Hub Sheet */}
      <Sheet open={isOpen} onOpenChange={(open) => {
        setIsOpen(open)
        if (!open) {
          closeHub()
        }
      }}>
        <SheetContent side="right" className="p-0 sm:max-w-[95vw] md:max-w-[85vw] lg:max-w-[70vw] xl:max-w-[60vw] 2xl:max-w-[50vw]">
          <SheetTitle className="sr-only">Communication Hub</SheetTitle>
          <div className="h-full">
            <EnhancedCommunicationHub onClose={() => {
              setIsOpen(false)
              closeHub()
            }} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}