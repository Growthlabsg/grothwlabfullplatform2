import type { UserSportInterest } from "@/types/sports-club"

export interface SportsNotification {
  id: string
  type: "event" | "team" | "interest"
  title: string
  message: string
  date: Date
  read: boolean
  relatedId?: string // Event ID, Team ID, etc.
  sportType?: string
  actionUrl?: string
}

// Mock notifications
const mockNotifications: SportsNotification[] = [
  {
    id: "notif-1",
    type: "event",
    title: "New Soccer Event",
    message: "A new soccer event has been added that matches your interests: Saturday Soccer Showdown.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    relatedId: "event-1",
    sportType: "soccer",
    actionUrl: "/sports-club?tab=events",
  },
  {
    id: "notif-2",
    type: "team",
    title: "Team Activity Update",
    message: "Tech Titans team has added a new event: Practice session on Friday.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: false,
    relatedId: "team-1",
    sportType: "soccer",
    actionUrl: "/sports-club?tab=interests&section=teams",
  },
  {
    id: "notif-3",
    type: "interest",
    title: "Sport Interest Matches",
    message: "3 founders with basketball interests just joined the platform.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    read: true,
    sportType: "basketball",
    actionUrl: "/sports-club?tab=interests",
  },
]

/**
 * Get all sports notifications for the current user
 */
export function getSportsNotifications(): SportsNotification[] {
  return mockNotifications
}

/**
 * Get unread notifications count
 */
export function getUnreadNotificationsCount(): number {
  return mockNotifications.filter((n) => !n.read).length
}

/**
 * Mark a notification as read
 */
export function markNotificationAsRead(notificationId: string): void {
  const notification = mockNotifications.find((n) => n.id === notificationId)
  if (notification) {
    notification?.read = true
  }
}

/**
 * Mark all notifications as read
 */
export function markAllNotificationsAsRead(): void {
  mockNotifications.forEach((notification) => {
    notification?.read = true
  })
}

/**
 * Get notifications related to a specific sport
 */
export function getNotificationsForSport(sportType: string): SportsNotification[] {
  return mockNotifications.filter((n) => n.sportType === sportType)
}

/**
 * Get notifications matching user interests
 */
export function getNotificationsMatchingInterests(interests: UserSportInterest[]): SportsNotification[] {
  const sportTypes = interests.map((interest) => interest.sport)
  return mockNotifications.filter((n) => n.sportType && sportTypes.includes(n.sportType as any))
}

/**
 * Subscribe to notifications for a specific sport
 */
export function subscribeToSportNotifications(sportType: string): void {
  console.log(`Subscribed to notifications for ${sportType}`)
  // In a real implementation, this would update user preferences in the database
}

/**
 * Unsubscribe from notifications for a specific sport
 */
export function unsubscribeFromSportNotifications(sportType: string): void {
  console.log(`Unsubscribed from notifications for ${sportType}`)
  // In a real implementation, this would update user preferences in the database
}
