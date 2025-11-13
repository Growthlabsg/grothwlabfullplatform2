export type ActivityType =
  | "user_login"
  | "user_logout"
  | "user_signup"
  | "user_update"
  | "user_delete"
  | "startup_create"
  | "startup_update"
  | "startup_delete"
  | "investor_create"
  | "investor_update"
  | "investor_delete"
  | "event_create"
  | "event_update"
  | "event_delete"
  | "course_create"
  | "course_update"
  | "course_delete"
  | "funding_create"
  | "funding_update"
  | "funding_delete"
  | "application_submit"
  | "application_review"
  | "application_approve"
  | "application_reject"
  | "data_import"
  | "data_export"
  | "system_update"

export type ActivitySeverity = "info" | "warning" | "error"

export interface ActivityLog {
  id: string
  type: ActivityType
  userId: string
  userEmail: string
  description: string
  details?: Record<string, any>
  severity: ActivitySeverity
  timestamp: string
  ip?: string
  userAgent?: string
}

// In a real app, this would be a database or API call
const activityLogs: ActivityLog[] = []

export function logActivity(
  type: ActivityType,
  userId: string,
  userEmail: string,
  description: string,
  details?: Record<string, any>,
  severity: ActivitySeverity = "info",
): ActivityLog {
  const log: ActivityLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    type,
    userId,
    userEmail,
    description,
    details,
    severity,
    timestamp: new Date().toISOString(),
  }

  // In a real app, this would be saved to a database
  activityLogs.unshift(log)

  // Keep only the last 1000 logs in memory
  if (activityLogs.length > 1000) {
    activityLogs.pop()
  }

  return log
}

export function getActivityLogs(
  page = 1,
  limit = 50,
  filters?: {
    type?: ActivityType
    userId?: string
    severity?: ActivitySeverity
    startDate?: string
    endDate?: string
  },
): { logs: ActivityLog[]; total: number } {
  let filteredLogs = [...activityLogs]

  // Apply filters
  if (filters) {
    if (filters.type) {
      filteredLogs = filteredLogs.filter((log) => log?.type === filters.type)
    }
    if (filters.userId) {
      filteredLogs = filteredLogs.filter((log) => log?.userId === filters.userId)
    }
    if (filters.severity) {
      filteredLogs = filteredLogs.filter((log) => log?.severity === filters.severity)
    }
    if (filters.startDate) {
      const startDate = new Date(filters.startDate)
      filteredLogs = filteredLogs.filter((log) => new Date(log?.timestamp) >= startDate)
    }
    if (filters.endDate) {
      const endDate = new Date(filters.endDate)
      filteredLogs = filteredLogs.filter((log) => new Date(log?.timestamp) <= endDate)
    }
  }

  const total = filteredLogs.length
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedLogs = filteredLogs.slice(start, end)

  return { logs: paginatedLogs, total }
}

export function clearActivityLogs(): void {
  activityLogs.length = 0
}

// Generate some sample logs for demo purposes
export function generateSampleLogs(count = 100): void {
  const types: ActivityType[] = [
    "user_login",
    "user_logout",
    "user_signup",
    "user_update",
    "user_delete",
    "startup_create",
    "startup_update",
    "startup_delete",
    "investor_create",
    "investor_update",
    "investor_delete",
    "event_create",
    "event_update",
    "event_delete",
    "course_create",
    "course_update",
    "course_delete",
    "funding_create",
    "funding_update",
    "funding_delete",
    "application_submit",
    "application_review",
    "application_approve",
    "application_reject",
    "data_import",
    "data_export",
    "system_update",
  ]

  const severities: ActivitySeverity[] = ["info", "warning", "error"]
  const users = [
    { id: "user-1", email: "admin@growthlab.sg" },
    { id: "user-2", email: "founder@example.com" },
    { id: "user-3", email: "investor@example.com" },
    { id: "user-4", email: "mentor@example.com" },
  ]

  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const user = users[Math.floor(Math.random() * users.length)]
    const severity = severities[Math.floor(Math.random() * severities.length)]

    // Create a timestamp within the last 30 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    const log: ActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      type,
      userId: user.id,
      userEmail: user.email,
      description: `Sample ${type} activity`,
      details: { sample: true },
      severity,
      timestamp: date.toISOString(),
    }

    activityLogs.push(log)
  }

  // Sort logs by timestamp (newest first)
  activityLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// Initialize with sample data
generateSampleLogs(200)
