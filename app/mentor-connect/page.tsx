import type { Metadata } from "next"
import { MentorConnectClient } from "@/components/mentor-connect/mentor-connect-client"

export const metadata: Metadata = {
  title: "Mentor Connect | GrowthLab.sg",
  description: "Connect with experienced mentors and startups using our smart matching algorithm",
}

export default function MentorConnectPage() {
  return (
    <div>
      <MentorConnectClient />
    </div>
  )
}