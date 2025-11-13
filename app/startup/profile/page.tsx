import { StartupProfile } from "@/components/startup/startup-profile"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Startup Profile | GrowthLab",
  description: "View and manage your startup profile",
}

export default function StartupProfilePage() {
  return <StartupProfile />
}
