// Email notification service for events
export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export interface NotificationData {
  eventId: number
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  userName: string
  userEmail: string
  [key: string]: any
}

export class EmailNotificationService {
  private static instance: EmailNotificationService
  private templates: Map<string, EmailTemplate> = new Map()

  constructor() {
    this.initializeTemplates()
  }

  static getInstance(): EmailNotificationService {
    if (!EmailNotificationService.instance) {
      EmailNotificationService.instance = new EmailNotificationService()
    }
    return EmailNotificationService.instance
  }

  private initializeTemplates() {
    // Event Creation Template
    this.templates.set('event-created', {
      subject: 'Event Created Successfully - {{eventTitle}}',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0F7377, #0F7377/90); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Event Created Successfully!</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #0F7377; margin-top: 0;">{{eventTitle}}</h2>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Date:</strong> {{eventDate}}</p>
              <p><strong>Time:</strong> {{eventTime}}</p>
              <p><strong>Location:</strong> {{eventLocation}}</p>
            </div>
            <p>Your event has been created and is now live on the platform. Attendees can register and you can manage it from your dashboard.</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="{{eventUrl}}" style="background: #0F7377; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Event</a>
            </div>
          </div>
          <div style="background: #0F7377; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>GrowthLab Events Platform</p>
          </div>
        </div>
      `,
      text: `
        Event Created Successfully!
        
        {{eventTitle}}
        Date: {{eventDate}}
        Time: {{eventTime}}
        Location: {{eventLocation}}
        
        Your event has been created and is now live on the platform.
        View your event: {{eventUrl}}
        
        GrowthLab Events Platform
      `
    })

    // Event Update Template
    this.templates.set('event-updated', {
      subject: 'Event Updated - {{eventTitle}}',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0F7377, #0F7377/90); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Event Updated</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #0F7377; margin-top: 0;">{{eventTitle}}</h2>
            <p>The event details have been updated. Please review the changes below:</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Date:</strong> {{eventDate}}</p>
              <p><strong>Time:</strong> {{eventTime}}</p>
              <p><strong>Location:</strong> {{eventLocation}}</p>
            </div>
            <div style="text-align: center; margin: 20px 0;">
              <a href="{{eventUrl}}" style="background: #0F7377; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Updated Event</a>
            </div>
          </div>
          <div style="background: #0F7377; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>GrowthLab Events Platform</p>
          </div>
        </div>
      `,
      text: `
        Event Updated
        
        {{eventTitle}}
        Date: {{eventDate}}
        Time: {{eventTime}}
        Location: {{eventLocation}}
        
        The event details have been updated.
        View updated event: {{eventUrl}}
        
        GrowthLab Events Platform
      `
    })

    // Event Cancellation Template
    this.templates.set('event-cancelled', {
      subject: 'Event Cancelled - {{eventTitle}}',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #dc2626/90); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Event Cancelled</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #dc2626; margin-top: 0;">{{eventTitle}}</h2>
            <p>We regret to inform you that this event has been cancelled.</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Original Date:</strong> {{eventDate}}</p>
              <p><strong>Original Time:</strong> {{eventTime}}</p>
              <p><strong>Location:</strong> {{eventLocation}}</p>
            </div>
            <p>If you have any questions or concerns, please contact the event organizer.</p>
          </div>
          <div style="background: #0F7377; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>GrowthLab Events Platform</p>
          </div>
        </div>
      `,
      text: `
        Event Cancelled
        
        {{eventTitle}}
        Original Date: {{eventDate}}
        Original Time: {{eventTime}}
        Location: {{eventLocation}}
        
        This event has been cancelled. If you have any questions, please contact the event organizer.
        
        GrowthLab Events Platform
      `
    })

    // Check-in Template
    this.templates.set('check-in', {
      subject: 'Successfully Checked In - {{eventTitle}}',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #16a34a, #16a34a/90); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Check-in Successful!</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #16a34a; margin-top: 0;">{{eventTitle}}</h2>
            <p>Hello {{userName}}, you have successfully checked in to the event.</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Check-in Time:</strong> {{checkInTime}}</p>
              <p><strong>Event Date:</strong> {{eventDate}}</p>
              <p><strong>Event Time:</strong> {{eventTime}}</p>
              <p><strong>Location:</strong> {{eventLocation}}</p>
            </div>
            <p>Enjoy the event and don't forget to network with other attendees!</p>
          </div>
          <div style="background: #0F7377; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>GrowthLab Events Platform</p>
          </div>
        </div>
      `,
      text: `
        Check-in Successful!
        
        {{eventTitle}}
        Check-in Time: {{checkInTime}}
        Event Date: {{eventDate}}
        Event Time: {{eventTime}}
        Location: {{eventLocation}}
        
        You have successfully checked in to the event. Enjoy!
        
        GrowthLab Events Platform
      `
    })

    // Demerit Added Template
    this.templates.set('demerit-added', {
      subject: 'Demerit Points Added - {{points}} Points',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #dc2626/90); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Demerit Points Added</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #dc2626; margin-top: 0;">{{points}} Demerit Points Added</h2>
            <p>Hello {{userName}}, demerit points have been added to your account.</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>Reason:</strong> {{reason}}</p>
              <p><strong>Points Added:</strong> {{points}}</p>
              <p><strong>Total Points:</strong> {{totalPoints}}</p>
              <p><strong>Event:</strong> {{eventTitle}}</p>
            </div>
            <p>Please review our demerit guidelines and maintain good attendance to avoid restrictions.</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="{{demeritUrl}}" style="background: #0F7377; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Demerit Details</a>
            </div>
          </div>
          <div style="background: #0F7377; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>GrowthLab Events Platform</p>
          </div>
        </div>
      `,
      text: `
        Demerit Points Added
        
        {{points}} Demerit Points Added
        Reason: {{reason}}
        Points Added: {{points}}
        Total Points: {{totalPoints}}
        Event: {{eventTitle}}
        
        Please review our demerit guidelines and maintain good attendance.
        View details: {{demeritUrl}}
        
        GrowthLab Events Platform
      `
    })

    // Name Card Created Template
    this.templates.set('name-card-created', {
      subject: 'New Virtual Name Card Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0F7377, #0F7377/90); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Name Card!</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #0F7377; margin-top: 0;">Someone wants to connect with you!</h2>
            <p>{{fromUserName}} has shared a virtual name card with you from the event.</p>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 15px 0;">
              <p><strong>From:</strong> {{fromUserName}}</p>
              <p><strong>Event:</strong> {{eventTitle}}</p>
              <p><strong>Date Met:</strong> {{meetingDate}}</p>
            </div>
            <p>Accept or decline this connection to continue networking!</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="{{nameCardUrl}}" style="background: #0F7377; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Name Card</a>
            </div>
          </div>
          <div style="background: #0F7377; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>GrowthLab Events Platform</p>
          </div>
        </div>
      `,
      text: `
        New Virtual Name Card Received
        
        {{fromUserName}} has shared a virtual name card with you!
        Event: {{eventTitle}}
        Date Met: {{meetingDate}}
        
        View and respond to this name card: {{nameCardUrl}}
        
        GrowthLab Events Platform
      `
    })
  }

  private replaceTemplateVariables(template: string, data: NotificationData): string {
    let result = template
    Object.keys(data).forEach(key => {
      const value = data[key] || ''
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value)
    })
    return result
  }

  async sendNotification(type: string, data: NotificationData): Promise<boolean> {
    try {
      const template = this.templates.get(type)
      if (!template) {
        console.error(`Email template not found for type: ${type}`)
        return false
      }

      // Add default URLs
      const enrichedData = {
        ...data,
        eventUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/events/${data.eventId}`,
        demeritUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/events/dashboard?tab=demerits`,
        nameCardUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/events/dashboard?tab=networking`
      }

      const emailData = {
        to: data.userEmail,
        subject: this.replaceTemplateVariables(template.subject, enrichedData),
        html: this.replaceTemplateVariables(template.html, enrichedData),
        text: this.replaceTemplateVariables(template.text, enrichedData)
      }

      // In a real implementation, this would call an email service like SendGrid, AWS SES, etc.
      console.log('Email notification would be sent:', {
        type,
        to: emailData.to,
        subject: emailData.subject
      })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 100))

      return true
    } catch (error) {
      console.error('Error sending email notification:', error)
      return false
    }
  }

  // Convenience methods for different notification types
  async sendEventCreated(data: NotificationData): Promise<boolean> {
    return this.sendNotification('event-created', data)
  }

  async sendEventUpdated(data: NotificationData): Promise<boolean> {
    return this.sendNotification('event-updated', data)
  }

  async sendEventCancelled(data: NotificationData): Promise<boolean> {
    return this.sendNotification('event-cancelled', data)
  }

  async sendCheckInNotification(data: NotificationData): Promise<boolean> {
    return this.sendNotification('check-in', data)
  }

  async sendDemeritNotification(data: NotificationData): Promise<boolean> {
    return this.sendNotification('demerit-added', data)
  }

  async sendNameCardNotification(data: NotificationData): Promise<boolean> {
    return this.sendNotification('name-card-created', data)
  }
}

// Export singleton instance
export const emailService = EmailNotificationService.getInstance()
