import type { Metadata } from "next"
import { EnhancedFeedLayout } from "@/components/feed/enhanced-feed-layout"

export const metadata: Metadata = {
  title: "Feed | GrowthLab",
  description: "Stay updated with the latest from your network and the GrowthLab community",
}

export default function EnhancedFeedPage() {
  return <EnhancedFeedLayout />
}
