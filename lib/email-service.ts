import type { UserRole } from "@/types/auth"

// Email notification types
export type EmailNotificationType =
  | "welcome"
  | "password_reset"
  | "event_reminder"
  | "application_status"
  | "mentor_request"
  | "investor_interest"
  | "new_message"
  | "weekly_digest"
  | "admin_alert"

// Email template data interface
export interface EmailTemplateData {
  recipientName?: string
  recipientEmail: string
  subject: string
  eventName?: string
  eventDate?: string
  eventLocation?: string
  applicationStatus?: string
  programName?: string
  resetLink?: string
  mentorName?: string
  investorName?: string
  startupName?: string
  messagePreview?: string
  senderName?: string
  customMessage?: string
  [key: string]: any
}

// Email notification service
export class EmailService {
  // In a real application, this would connect to an email service provider
  // like SendGrid, Mailgun, AWS SES, etc.

  /**
   * Send an email notification
   * @param type Email notification type
   * @param data Email template data
   * @returns Promise<boolean> Success status
   */
  static async sendNotification(type: EmailNotificationType, data: EmailTemplateData): Promise<boolean> {
    try {
      // In a real app, this would send the actual email
      console.log(`Sending ${type} email to ${data.recipientEmail}`, data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return true
    } catch (error) {
      console.error("Failed to send email notification:", error)
      return false
    }
  }

  /**
   * Send welcome email to new user
   * @param email User email
   * @param name User name
   * @param role User role
   * @returns Promise<boolean> Success status
   */
  static async sendWelcomeEmail(email: string, name: string, role: UserRole): Promise<boolean> {
    return this.sendNotification("welcome", {
      recipientEmail: email,
      recipientName: name,
      subject: "Welcome to GrowthLab!",
      customMessage: `We're excited to have you join our community as a ${role}. Get started by completing your profile and exploring our programs.`,
    })
  }

  /**
   * Send password reset email
   * @param email User email
   * @param resetLink Password reset link
   * @returns Promise<boolean> Success status
   */
  static async sendPasswordResetEmail(email: string, resetLink: string): Promise<boolean> {
    return this.sendNotification("password_reset", {
      recipientEmail: email,
      subject: "Reset Your GrowthLab Password",
      resetLink,
    })
  }

  /**
   * Send event reminder
   * @param email User email
   * @param name User name
   * @param eventName Event name
   * @param eventDate Event date
   * @param eventLocation Event location
   * @returns Promise<boolean> Success status
   */
  static async sendEventReminder(
    email: string,
    name: string,
    eventName: string,
    eventDate: string,
    eventLocation: string,
  ): Promise<boolean> {
    return this.sendNotification("event_reminder", {
      recipientEmail: email,
      recipientName: name,
      subject: `Reminder: ${eventName} is Coming Up!`,
      eventName,
      eventDate,
      eventLocation,
    })
  }

  /**
   * Send application status update
   * @param email User email
   * @param name User name
   * @param programName Program name
   * @param status Application status
   * @returns Promise<boolean> Success status
   */
  static async sendApplicationStatusUpdate(
    email: string,
    name: string,
    programName: string,
    status: string,
  ): Promise<boolean> {
    return this.sendNotification("application_status", {
      recipientEmail: email,
      recipientName: name,
      subject: `Your ${programName} Application Status Update`,
      programName,
      applicationStatus: status,
    })
  }

  /**
   * Send weekly digest
   * @param email User email
   * @param name User name
   * @param events Upcoming events
   * @param resources New resources
   * @param opportunities New opportunities
   * @returns Promise<boolean> Success status
   */
  static async sendWeeklyDigest(
    email: string,
    name: string,
    events: any[],
    resources: any[],
    opportunities: any[],
  ): Promise<boolean> {
    return this.sendNotification("weekly_digest", {
      recipientEmail: email,
      recipientName: name,
      subject: "Your GrowthLab Weekly Digest",
      events,
      resources,
      opportunities,
    })
  }
}
