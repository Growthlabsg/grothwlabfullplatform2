import type { Metadata } from "next"
import { ClientWrapper } from "./client-wrapper"

export const metadata: Metadata = {
  title: "Apply to GrowthLab Accelerator | GrowthLab.sg",
  description: "Apply to join GrowthLab's accelerator program and take your startup to the next level.",
}

export default function AcceleratorApplicationPage() {
  return <ClientWrapper />
}
