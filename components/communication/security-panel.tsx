"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lock, Shield, Eye, EyeOff, Fingerprint, Key, Clock, Trash2, AlertTriangle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

export function SecurityPanel() {
  const [activeTab, setActiveTab] = useState("privacy")
  const [showReadReceipts, setShowReadReceipts] = useState(true)
  const [endToEndEncryption, setEndToEndEncryption] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [dataRetention, setDataRetention] = useState("90")

  return (
    <div className="space-y-2">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-4 mt-2">
          <ScrollArea className="h-[320px] pr-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    <Label>Read Receipts</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Let others know when you've read their messages</p>
                </div>
                <Switch checked={showReadReceipts} onCheckedChange={setShowReadReceipts} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <EyeOff className="h-4 w-4 mr-2" />
                    <Label>Last Seen</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Control who can see when you were last online</p>
                </div>
                <Select defaultValue="everyone">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="contacts">Contacts</SelectItem>
                    <SelectItem value="nobody">Nobody</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <Label>Profile Photo</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Control who can see your profile photo</p>
                </div>
                <Select defaultValue="everyone">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="contacts">Contacts</SelectItem>
                    <SelectItem value="nobody">Nobody</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    <Label>Blocked Contacts</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Manage your blocked contacts</p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-2">
          <ScrollArea className="h-[320px] pr-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    <Label>End-to-End Encryption</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Messages are encrypted and can only be read by participants
                  </p>
                </div>
                <Switch checked={endToEndEncryption} onCheckedChange={setEndToEndEncryption} disabled={true} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Fingerprint className="h-4 w-4 mr-2" />
                    <Label>Two-Factor Authentication</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Key className="h-4 w-4 mr-2" />
                    <Label>Security Key</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Use a physical security key for authentication</p>
                </div>
                <Button variant="outline" size="sm">
                  Setup
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <Label>Login Notifications</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Get notified when someone logs into your account</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="data" className="space-y-4 mt-2">
          <ScrollArea className="h-[320px] pr-3">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <Label>Data Retention</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Control how long your data is stored</p>
                </div>
                <Select value={dataRetention} onValueChange={setDataRetention}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Trash2 className="h-4 w-4 mr-2" />
                    <Label>Delete Account Data</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Permanently delete all your account data</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    <Label>Export Data</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">Download a copy of your data</p>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>

              <div className="mt-6 p-3 border rounded-md bg-amber-50 dark:bg-amber-950">
                <h4 className="text-sm font-medium flex items-center text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  GDPR Compliance
                </h4>
                <p className="text-xs mt-1 text-amber-700 dark:text-amber-400">
                  Your data is processed in accordance with GDPR regulations. You have the right to access, rectify, and
                  erase your data at any time.
                </p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
