import { CustomerDiscoveryTool } from "@/components/startup/customer-discovery-tool"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Customer Discovery Tool | GrowthLab",
  description: "Conduct user research, collect feedback, and validate your product with real users",
}

export default function CustomerDiscoveryPage() {
  return <CustomerDiscoveryTool />
}
