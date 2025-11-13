"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const dialogRef = useRef<HTMLDivElement>(null)

  if (!isOpen) return null

  return (
    <motion.div
      ref={dialogRef}
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
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search messages or contacts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="p-0">
          <ScrollArea className="h-64">
            <div className="p-2">
              {searchQuery ? (
                <div className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <p className="font-medium text-sm">Sarah Chen</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ...I'll <span className="bg-yellow-200 dark:bg-yellow-800">send</span> them over by EOD...
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">10:35 AM</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                  <Search className="h-12 w-12 mb-2 opacity-20" />
                  <p>Enter a search term</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="contacts" className="p-0">
          <ScrollArea className="h-64">
            <div className="p-2">
              {searchQuery ? (
                <div className="p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <p className="font-medium text-sm">Sarah Chen</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Online</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
                  <Search className="h-12 w-12 mb-2 opacity-20" />
                  <p>Enter a search term</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
