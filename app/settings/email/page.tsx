import type { Metadata } from "next"
import EmailSettingsClient from "./client"

export const metadata: Metadata = {
  title: "Email Settings | GrowthLab",
  description: "Manage your email preferences and notification settings.",
}

export default function EmailSettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Email Preferences</h1>
      <p className="text-muted-foreground mb-8">
        Manage your email preferences, notification settings, and communication preferences.
      </p>

      <EmailSettingsClient />
    </div>
  )
}
