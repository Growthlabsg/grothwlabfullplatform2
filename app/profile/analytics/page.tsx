import { JobSeekerAnalyticsDashboard } from "@/components/analytics/job-seeker/job-seeker-analytics-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Analytics | GrowthLab.sg",
  description: "Track your job application performance and career insights",
}

export default function JobSeekerAnalyticsPage() {
  return (
          <div>
          <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#1E293B] md:text-4xl">My Analytics</h1>
          <p className="text-lg text-[#334155]">
            Track your job application performance, identify skill gaps, and discover career opportunities
          </p>
        </div>

        <JobSeekerAnalyticsDashboard />
      </div>
      
    </div>
  )
}
