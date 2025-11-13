export type NotificationType =
  | "system"
  | "user"
  | "startup"
  | "investor"
  | "mentor"
  | "event"
  | "course"
  | "funding"
  | "application"

export type NotificationPriority = "low" | "medium" | "high" | "urgent"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  priority: NotificationPriority
  read: boolean
  createdAt: string
  expiresAt?: string
  actionUrl?: string
  actionLabel?: string
  userId: string
  metadata?: Record<string, any>
}
