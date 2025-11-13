"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConnectionList } from "./connection-list"
import { ConnectionRequestsDialog } from "./connection-requests-dialog"
import { ConnectionAnalytics } from "./connection-analytics"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export function ConnectionManagementDashboard() {
  const [activeTab, setActiveTab] = useState("connections")
  const [connectionRequestsOpen, setConnectionRequestsOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Your Connections</h2>
        <Button onClick={() => setConnectionRequestsOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Find Connections
        </Button>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="connections">
          <ConnectionList />
        </TabsContent>

        <TabsContent value="analytics">
          <ConnectionAnalytics />
        </TabsContent>
      </Tabs>

      <ConnectionRequestsDialog open={connectionRequestsOpen} onOpenChange={setConnectionRequestsOpen} />
    </div>
  )
}
