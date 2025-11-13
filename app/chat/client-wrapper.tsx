"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConversationList } from "@/components/chat/conversation-list"
import { ChatWindow } from "@/components/chat/chat-window"
import { ConnectionRequests } from "@/components/chat/connection-requests"
import { NotificationSettings } from "@/components/chat/notification-settings"
import { SmartDiscovery } from "@/components/chat/smart-discovery"
import { LinkedInIntegration } from "@/components/profile/linkedin-integration"

export function ChatPageClient() {
  const [activeTab, setActiveTab] = useState("messages")

  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100vh-180px)]">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="requests">Connection Requests</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="h-full">
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-1">
              <ConversationList />
            </div>
            <div className="md:col-span-2">
              <ChatWindow />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discover" className="h-full">
          <SmartDiscovery />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <ConnectionRequests />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <NotificationSettings />
          <LinkedInIntegration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
