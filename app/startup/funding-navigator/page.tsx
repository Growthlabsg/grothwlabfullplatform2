import { FundingNavigator } from "@/components/startup/funding-navigator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Funding Navigator | GrowthLab",
  description: "Explore funding options and connect with investors that match your startup's needs",
}

export default function FundingNavigatorPage() {
  return <FundingNavigator />
}
