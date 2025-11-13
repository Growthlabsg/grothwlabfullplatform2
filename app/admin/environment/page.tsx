import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminPlaceholderPage() {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold">Admin Page</h2>
          <p className="text-muted-foreground">Temporarily unavailable - being updated</p>
        </div>
      </div>
    </AdminLayout>
  )
}