"use client"

import { EnhancedCommunicationProvider } from "@/contexts/enhanced-communication-context"
import { EnhancedCommunicationCenter } from "@/components/communication/enhanced-communication-center"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EnhancedCommunicationPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communication Center</h1>
          <p className="text-muted-foreground">Connect and collaborate with your network</p>
        </div>
        <Tabs defaultValue="enhanced">
          <TabsList>
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="enhanced">Enhanced</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp Style</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Interactive Communication Demo</CardTitle>
          <CardDescription>
            This demo shows the full communication functionality with realistic mock data
          </CardDescription>
        </CardHeader>
        <div className="mt-2 bg-gray-50 rounded-bl-lg rounded-br-lg border border-t-0 h-[calc(100vh-15rem)]">
          <EnhancedCommunicationProvider>
            <EnhancedCommunicationCenter />
          </EnhancedCommunicationProvider>
        </div>
      </Card>
    </div>
  )
}
