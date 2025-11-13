import { MentorAnalyticsDashboard } from "@/components/analytics/mentor/mentor-analytics-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentor Analytics | GrowthLab.sg",
  description: "Track your mentoring impact and mentee progress",
}

export default function MentorAnalyticsPage() {
  return (
          <div>
          <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">Mentor Analytics</h1>
          <p className="text-lg text-[#334155]">Track your mentoring impact, mentee progress, and engagement metrics</p>
        </div>

        <MentorAnalyticsDashboard />
      </div>
      
    </div>
  )
}
