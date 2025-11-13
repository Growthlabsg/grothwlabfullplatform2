"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Bell, Clock, MessageSquare, Send } from "lucide-react"

interface EmailIntegrationProps {
  isOpen: boolean
  onClose: () => void
}

export function EmailIntegration({ isOpen, onClose }: EmailIntegrationProps) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [connectionRequests, setConnectionRequests] = useState(true)
  const [newMessages, setNewMessages] = useState(true)
  const [missedCalls, setMissedCalls] = useState(true)
  const [dailyDigest, setDailyDigest] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [emailAddress, setEmailAddress] = useState("your.email@example.com")
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Email Integration</DialogTitle>
          <DialogDescription>Manage your email notifications and settings</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="notifications" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Notify me about:</Label>

                <div className="ml-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="connection-requests" className="text-sm">
                        Connection Requests
                      </Label>
                    </div>
                    <Switch
                      id="connection-requests"
                      checked={connectionRequests}
                      onCheckedChange={setConnectionRequests}
                      disabled={!emailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="new-messages" className="text-sm">
                        New Messages
                      </Label>
                    </div>
                    <Switch
                      id="new-messages"
                      checked={newMessages}
                      onCheckedChange={setNewMessages}
                      disabled={!emailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="missed-calls" className="text-sm">
                        Missed Calls
                      </Label>
                    </div>
                    <Switch
                      id="missed-calls"
                      checked={missedCalls}
                      onCheckedChange={setMissedCalls}
                      disabled={!emailNotifications}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Digest Emails:</Label>

                <div className="ml-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="daily-digest" className="text-sm">
                        Daily Digest
                      </Label>
                    </div>
                    <Switch
                      id="daily-digest"
                      checked={dailyDigest}
                      onCheckedChange={setDailyDigest}
                      disabled={!emailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="weekly-digest" className="text-sm">
                        Weekly Digest
                      </Label>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={weeklyDigest}
                      onCheckedChange={setWeeklyDigest}
                      disabled={!emailNotifications}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-address">Email Address</Label>
                <div className="flex space-x-2">
                  <Input
                    id="email-address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    disabled={!isEditing}
                  />
                  <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Save" : "Edit"}
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Verification</Label>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Status: Verified</div>
                  <Button variant="outline" size="sm">
                    Re-verify
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Format</Label>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="html-format" name="email-format" defaultChecked />
                    <Label htmlFor="html-format" className="text-sm">
                      HTML
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="text-format" name="email-format" />
                    <Label htmlFor="text-format" className="text-sm">
                      Plain Text
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
