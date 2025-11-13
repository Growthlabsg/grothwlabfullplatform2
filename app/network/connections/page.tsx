import { ConnectionManagementDashboard } from "@/components/connections/connection-management-dashboard"

export default function ConnectionsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">My Connections</h1>
      <ConnectionManagementDashboard />
    </div>
  )
}
