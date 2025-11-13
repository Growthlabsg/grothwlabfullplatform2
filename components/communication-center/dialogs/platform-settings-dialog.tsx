"use client"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import { PlatformType } from "@/types/communication"
import { useCommunication } from "@/contexts/communication-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { QrCode, Smartphone, MessageCircle, Send, LinkIcon } from "lucide-react"

interface PlatformSettingsDialogProps {
  isOpen: boolean
  onClose: () => void
  platform: PlatformType | null
}

export function PlatformSettingsDialog({ isOpen, onClose, platform }: PlatformSettingsDialogProps) {
  const { platformIntegrations, integrateWithPlatform, removePlatformIntegration } = useCommunication()

  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionMethod, setConnectionMethod] = useState<"qr" | "phone" | "link">("qr")
  const [phoneNumber, setPhoneNumber] = useState("")

  const isWhatsApp = platform === PlatformType.WHATSAPP
  const isTelegram = platform === PlatformType.TELEGRAM
  const isConnected = platform ? platformIntegrations.includes(platform) : false

  const getPlatformName = () => {
    if (isWhatsApp) return "WhatsApp"
    if (isTelegram) return "Telegram"
    return "Platform"
  }

  const getPlatformIcon = () => {
    if (isWhatsApp) return <MessageCircle className="h-5 w-5 text-green-500" />
    if (isTelegram) return <Send className="h-5 w-5 text-blue-500" />
    return null
  }

  const getPlatformColor = () => {
    if (isWhatsApp) return "text-green-500"
    if (isTelegram) return "text-blue-500"
    return ""
  }

  // Handle connection with platform
  const handleConnect = async () => {
    if (!platform) return

    setIsConnecting(true)

    try {
      // If using phone number method, pass it as credentials
      const credentials = connectionMethod === "phone" ? { phoneNumber } : {}

      await integrateWithPlatform(platform, credentials)
      onClose()
    } catch (error) {
      console.error(`Failed to connect with ${getPlatformName()}:`, error)
    } finally {
      setIsConnecting(false)
    }
  }

  // Handle disconnection from platform
  const handleDisconnect = async () => {
    if (!platform) return

    try {
      await removePlatformIntegration(platform)
      onClose()
    } catch (error) {
      console.error(`Failed to disconnect from ${getPlatformName()}:`, error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{getPlatformIcon()}</DialogTitle>
          <DialogDescription>
            {isConnected ? `${getPlatformName()} Settings` : `Connect ${getPlatformName()}`}
          </DialogDescription>
        </DialogHeader>
        {isConnected ? (
          <div>Connected</div>
        ) : (
          <Tabs defaultValue="qr" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="qr">
                <QrCode className="mr-2 h-4 w-4" />
                QR Code
              </TabsTrigger>
              {isWhatsApp && (
                <TabsTrigger value="phone">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Phone Number
                </TabsTrigger>
              )}
              {isTelegram && (
                <TabsTrigger value="link">
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Link
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="qr">
              <div className="grid gap-4 py-4">
                <div className="relative overflow-hidden rounded-lg border bg-muted">
                  <img src="/whatsapp-qr.png" alt="WhatsApp QR Code" className="h-48 w-full object-cover" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan the QR code with your {getPlatformName()} app to connect.
                </p>
              </div>
            </TabsContent>
            {isWhatsApp && (
              <TabsContent value="phone">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enter your phone number to connect with {getPlatformName()}.
                  </p>
                </div>
              </TabsContent>
            )}
            {isTelegram && (
              <TabsContent value="link">
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="link">Link</Label>
                    <Input
                      id="link"
                      placeholder="Telegram Link"
                      type="url"
                      value="https://t.me/your_bot_name"
                      readOnly
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Click the link to connect with {getPlatformName()}.</p>
                </div>
              </TabsContent>
            )}
          </Tabs>
        )}
        <DialogFooter>
          {isConnected ? (
            <Button variant="destructive" onClick={handleDisconnect} disabled={isConnecting}>
              Disconnect
            </Button>
          ) : (
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? <>Connecting...</> : <>Connect with {getPlatformName()}</>}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
