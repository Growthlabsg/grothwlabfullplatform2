import type { Metadata } from "next"
import SecuritySettingsClient from "./client"

export const metadata: Metadata = {
  title: "Security Settings | GrowthLab",
  description: "Manage your account security and authentication settings.",
}

export default function SecuritySettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Security Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your account security, authentication methods, and privacy settings.
      </p>

      <SecuritySettingsClient />
    </div>
  )
}
