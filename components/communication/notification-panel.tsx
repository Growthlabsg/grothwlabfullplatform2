"use client"

import { useRef } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [filter, setFilter] = useState("all")
  const [notifications, setNotifications] = useState([
    { id: "1", type: "message", sender: "Sarah Chen", content: "New message", time: "2m ago", read: false },
    { id: "2", type: "call", sender: "Michael Wong", content: "Missed call", time: "1h ago", read: true },
    { id: "3", type: "mention", sender: "Team Chat", content: "You were mentioned", time: "3h ago", read: false },
  ])

  const panelRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-auto w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      style={{
        isolation: "isolate",
        transform: "translateZ(0)", // Force GPU acceleration for smoother rendering
      }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
        <h3 className="font-semibold text-lg text-emerald-800 dark:text-emerald-300">Notifications</h3>
        <div className="flex space-x-2 z-20">
          <Select defaultValue={filter} onValueChange={(value) => setFilter(value)}>
            <SelectTrigger className="w-[110px] h-8 text-xs">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="call">Calls</SelectItem>
              <SelectItem value="mention">Mentions</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable content area with fixed height */}
      <div className="relative max-h-80 overflow-hidden">
        <ScrollArea className="h-80" type="always">
          <div className="p-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification?.id}
                  className={`p-3 mb-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    notification?.read ? "opacity-70" : "bg-emerald-50 dark:bg-emerald-900/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{notification?.sender}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{notification?.content}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notification?.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-gray-500 dark:text-gray-400">
                <Bell className="h-12 w-12 mb-2 opacity-20" />
                <p>No notifications</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <Button variant="link" size="sm" className="text-emerald-600 dark:text-emerald-400">
          View all notifications
        </Button>
      </div>
    </motion.div>
  )
}
