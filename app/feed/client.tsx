"use client"

import { useState } from "react"
import { FeedHeader } from "@/components/feed/feed-header"
import { FeedContent } from "@/components/feed/feed-content"
import { UserReputationCard } from "@/components/reputation/user-reputation-card"
import { CommunityGuidelinesViewer } from "@/components/moderation/community-guidelines-viewer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, UserPlus, Users } from "lucide-react"
import { QRCodeScanner } from "@/components/connection/qr-code-scanner"
import { ConnectionRequestsDialog } from "@/components/connection/connection-requests-dialog"

export function FeedClient() {
  const [qrScannerOpen, setQrScannerOpen] = useState(false)
  const [connectionRequestsOpen, setConnectionRequestsOpen] = useState(false)

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <FeedHeader />
          <FeedContent />
        </div>

        <div className="space-y-6">
          <UserReputationCard />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Connect with Others</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setConnectionRequestsOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Find Connections
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setQrScannerOpen(true)}>
                <QrCode className="mr-2 h-4 w-4" />
                Scan QR Code
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                View My Network
              </Button>
            </CardContent>
          </Card>

          <CommunityGuidelinesViewer compact />
        </div>
      </div>

      <QRCodeScanner open={qrScannerOpen} onOpenChange={setQrScannerOpen} />
      <ConnectionRequestsDialog open={connectionRequestsOpen} onOpenChange={setConnectionRequestsOpen} />
    </div>
  )
}
