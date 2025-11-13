import { PitchDeckBuilder } from "@/components/startup/pitch-deck-builder"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pitch Deck Builder | GrowthLab",
  description: "Create a compelling pitch deck for your startup",
}

export default function PitchDeckBuilderPage() {
  return <PitchDeckBuilder />
}
