"use client"

import { ResponsiveContainer } from "@/components/layout/responsive-container"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { ResponsiveDebugger } from "@/components/dev/responsive-debugger"

export default function ResponsiveTestPage() {
  // This page is only for testing responsive layouts during development
  return (
    <div className="min-h-screen p-4">
      <ResponsiveDebugger />
      <ResponsiveContainer maxWidth="xl" className="space-y-8">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">Responsive Testing Page</h1>

        <p className="text-muted-foreground">
          This page is for testing responsive layouts across different screen sizes.
        </p>

        <ResponsiveGrid cols={{ default: 1, sm: 2, md: 3, lg: 4 }} className="mt-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-lg p-4 h-40 flex items-center justify-center">
              Card {i + 1}
            </div>
          ))}
        </ResponsiveGrid>
      </ResponsiveContainer>
    </div>
  )
}
