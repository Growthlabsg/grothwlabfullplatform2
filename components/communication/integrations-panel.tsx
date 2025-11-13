"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { MessageSquare, Send, Slack, Linkedin, Video, Settings } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Integration {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  isConnected: boolean
  status: "active" | "inactive" | "error"
}

export function IntegrationsPanel() {
  const [activeTab, setActiveTab] = useState("messaging")

  // Mock data - in a real app this would come from a data source
  const integrations: Record<string, Integration[]> = {
    messaging: [
      {
        id: "whatsapp",
        name: "WhatsApp",
        icon: <MessageSquare className="h-5 w-5 text-green-500" />,
        description: "Connect your WhatsApp Business account",
        isConnected: true,
        status: "active",
      },
      {
        id: "telegram",
        name: "Telegram",
        icon: <Send className="h-5 w-5 text-blue-500" />,
        description: "Connect your Telegram account",
        isConnected: true,
        status: "active",
      },
      {
        id: "slack",
        name: "Slack",
        icon: <Slack className="h-5 w-5 text-purple-500" />,
        description: "Connect your Slack workspace",
        isConnected: false,
        status: "inactive",
      },
    ],
    video: [
      {
        id: "google-meet",
        name: "Google Meet",
        icon: <Video className="h-5 w-5 text-red-500" />,
        description: "Connect your Google Meet account",
        isConnected: true,
        status: "active",
      },
      {
        id: "zoom",
        name: "Zoom",
        icon: <Video className="h-5 w-5 text-blue-500" />,
        description: "Connect your Zoom account",
        isConnected: true,
        status: "active",
      },
    ],
    social: [
      {
        id: "linkedin",
        name: "LinkedIn",
        icon: <Linkedin className="h-5 w-5 text-blue-700" />,
        description: "Connect your LinkedIn account",
        isConnected: true,
        status: "active",
      },
    ],
  }

  // Toggle integration connection
  const toggleConnection = (id: string, category: string) => {
    // In a real app, this would make an API call to connect/disconnect
    console.log(`Toggling connection for ${id} in ${category}`)
  }

  // Configure integration
  const configureIntegration = (id: string, category: string) => {
    // In a real app, this would open a configuration dialog
    console.log(`Configuring ${id} in ${category}`)
  }

  return (
    <div className="space-y-2">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
        </TabsList>

        {Object.entries(integrations).map(([category, items]) => (
          <TabsContent key={category} value={category} className="space-y-4 mt-2">
            <ScrollArea className="h-[320px] pr-3">
              <div className="space-y-3">
                {items.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 rounded-md border">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">{integration.icon}</div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{integration.name}</p>
                          <Badge
                            variant={
                              integration.status === "active"
                                ? "default"
                                : integration.status === "error"
                                  ? "destructive"
                                  : "outline"
                            }
                            className="ml-2"
                          >
                            {integration.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={!integration.isConnected}
                        onClick={() => configureIntegration(integration.id, category)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={integration.isConnected}
                        onCheckedChange={() => toggleConnection(integration.id, category)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
