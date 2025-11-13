import type { Metadata } from "next"
import StartupInvestorConnectClient from "./client"

export const metadata: Metadata = {
  title: "Startup-Investor Connect | GrowthLab",
  description: "Connect startups with investors and vice versa to facilitate funding and growth opportunities.",
}

export default function StartupInvestorConnectPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Startup-Investor Connect</h1>
      <p className="text-muted-foreground mb-8">
        Connect with the right investors or find promising startups to invest in. Our matching algorithm helps create
        meaningful connections based on industry, stage, and investment criteria.
      </p>

      <StartupInvestorConnectClient />
    </div>
  )
}
