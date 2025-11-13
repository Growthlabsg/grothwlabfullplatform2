import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WhatsAppIntegration } from "./whatsapp-integration"
import { TelegramIntegration } from "./telegram-integration"
import { SlackIntegration } from "./slack-integration"

export function PlatformIntegrations() {
  return (
    <div className="w-full">
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
          <TabsTrigger value="slack">Slack</TabsTrigger>
        </TabsList>
        <TabsContent value="whatsapp">
          <WhatsAppIntegration />
        </TabsContent>
        <TabsContent value="telegram">
          <TelegramIntegration />
        </TabsContent>
        <TabsContent value="slack">
          <SlackIntegration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
