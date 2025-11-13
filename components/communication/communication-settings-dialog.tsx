"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { NotificationPreferences } from "./notification-preferences"
import { Bell, Globe, Moon, Palette, Shield } from "lucide-react"

interface CommunicationSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  channelId?: string
}

const NOTIFICATION_SOUNDS = [
  { id: "chime", name: "Chime", url: "/sounds/chime.mp3" },
  { id: "bell", name: "Bell", url: "/sounds/bell.mp3" },
  { id: "ping", name: "Ping", url: "/sounds/ping.mp3" },
  { id: "pop", name: "Pop", url: "/sounds/pop.mp3" },
  { id: "subtle", name: "Subtle", url: "/sounds/subtle.mp3" },
]

export function CommunicationSettingsDialog({ open, onOpenChange, channelId }: CommunicationSettingsDialogProps) {
  const [activeTab, setActiveTab] = useState("notifications")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Communication Settings</DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="notifications"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 overflow-hidden flex flex-col"
        >
          <div className="px-1">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="notifications" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="language" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Language</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-auto mt-4">
            <TabsContent value="notifications" className="h-full">
              <NotificationPreferences channelId={channelId} />
            </TabsContent>

            <TabsContent value="appearance" className="h-full">
              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Theme</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-start">
                        <Moon className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Moon className="h-4 w-4 mr-2" />
                        System
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Font Size</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-start">
                        Small
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Medium
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Large
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Message Density</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        Compact
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Comfortable
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="h-full">
              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Read Receipts</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <Button variant="outline" className="justify-start">
                        Enable read receipts
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Last Seen</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-start">
                        Everyone
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Contacts
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Nobody
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Profile Photo</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="justify-start">
                        Everyone
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Contacts
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Nobody
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="language" className="h-full">
              <div className="border rounded-md p-4 space-y-4">
                <h3 className="font-medium flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Language Settings
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">App Language</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        English
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Chinese
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Spanish
                      </Button>
                      <Button variant="outline" className="justify-start">
                        French
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Translation Language</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">
                        English
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Chinese
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Spanish
                      </Button>
                      <Button variant="outline" className="justify-start">
                        French
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
