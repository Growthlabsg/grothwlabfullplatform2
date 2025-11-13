import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { LayoutWithSidebar } from "@/components/layout/layout-with-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GrowthLab - The Premier Startup Accelerator of Asia",
  description: "Accelerating the next generation of startups in Southeast Asia",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
          <LayoutWithSidebar>
            {children}
          </LayoutWithSidebar>
        </Providers>
      </body>
    </html>
  )
}
