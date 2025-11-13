import { PlatformIntegrations } from "@/components/communication-center/platform-integration/platform-integrations"

export default function IntegrationsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Platform Integrations</h1>
        <p className="text-muted-foreground">Connect and manage your messaging platforms in one place</p>
      </div>
      <PlatformIntegrations />
    </div>
  )
}
