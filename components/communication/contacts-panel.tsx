"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Search, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ContactsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export const ContactsPanel = ({ isOpen, onClose }: ContactsPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const panelRef = useRef<HTMLDivElement>(null)

  const mockContacts = [
    { id: "1", name: "Sarah Chen", avatar: "/stylized-initials.png", status: "online", lastSeen: "now" },
    { id: "2", name: "Michael Wong", avatar: "/abstract-letter-jt.png", status: "away", lastSeen: "5m ago" },
    { id: "3", name: "Priya Sharma", avatar: "/abstract-aj.png", status: "offline", lastSeen: "2h ago" },
    { id: "4", name: "David Kim", avatar: "/abstract-geometric-ts.png", status: "online", lastSeen: "now" },
    { id: "5", name: "Emma Johnson", avatar: "/intertwined-letters.png", status: "online", lastSeen: "now" },
  ]

  const filteredContacts = searchQuery
    ? mockContacts.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : mockContacts

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
        transform: "translateZ(0)", // Force GPU acceleration
      }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
        <h3 className="font-semibold text-lg text-emerald-800 dark:text-emerald-300">Contacts</h3>
      </div>

      {/* Search input */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search contacts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Contacts list */}
      <div className="relative max-h-80 overflow-hidden">
        <ScrollArea className="h-80" type="always">
          <div className="p-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} alt={contact.name} />
                      <AvatarFallback>
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{contact.name}</p>
                      <div className="flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-2 ${
                            contact.status === "online"
                              ? "bg-green-500"
                              : contact.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-500">{contact.status}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-gray-500 dark:text-gray-400">
                <Users className="h-12 w-12 mb-2 opacity-20" />
                <p>No contacts found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <Button variant="outline" size="sm">
          Add New Contact
        </Button>
      </div>
    </motion.div>
  )
}
