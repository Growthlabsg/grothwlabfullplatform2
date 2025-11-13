export type ChannelType = "direct" | "group" | "team" | "community" | "broadcast"

export type PlatformType = "native" | "slack" | "whatsapp" | "telegram"

export const PlatformType = {
  NATIVE: "native" as const,
  SLACK: "slack" as const,
  WHATSAPP: "whatsapp" as const,
  TELEGRAM: "telegram" as const,
  INTERNAL: "native" as const,
} as const

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed"

export interface User {
  id: string
  name: string
  avatar: string
  status?: "online" | "offline" | "away" | "busy"
  lastSeen?: Date
  isTyping?: boolean
}

export interface Message {
  id: string
  channelId: string
  content: string
  sender: User
  timestamp: Date
  status: MessageStatus
  isOwn: boolean
  attachments?: Attachment[]
  reactions?: Reaction[]
  replyTo?: string
  translated?: {
    language: string
    content: string
  }
  platform?: PlatformType
  // Enhanced features
  isPinned?: boolean
  isEdited?: boolean
  isEncrypted?: boolean
  threadCount?: number
  readBy?: string[]
  securityLevel?: "standard" | "confidential" | "restricted"
  encryptionKey?: string
  signature?: string
}

export interface Attachment {
  id: string
  type: "image" | "file" | "audio" | "video" | "link"
  url: string
  name: string
  size?: number
  thumbnail?: string
  duration?: number
  // Enhanced security
  isEncrypted?: boolean
  securityLevel?: "standard" | "confidential" | "restricted"
  accessLog?: FileAccessLog[]
}

export interface FileAccessLog {
  userId: string
  action: "view" | "download" | "share" | "edit" | "delete"
  timestamp: Date
  ipAddress?: string
  location?: string
  deviceInfo?: string
}

export interface Reaction {
  emoji: string
  count: number
  users: string[]
  timestamp: Date
}

export interface Channel {
  unread?: number;
  isMuted?: boolean;
  icon?: string;
  markAsRead?: () => void;
  id: string
  name: string
  type: ChannelType
  avatar?: string
  description?: string
  lastMessage?: {
    content: string
    timestamp: Date
  }
  unreadCount: number
  members: number
  platform: PlatformType
  isArchived?: boolean
  isPinned?: boolean
  color?: string
  // Enhanced features
  isEncrypted?: boolean
  securityLevel?: "standard" | "confidential" | "restricted"
  pinnedMessages?: string[]
  typingUsers?: string[]
  onlineMembers?: number
}

export interface Platform {
  id: string
  name: string
  type: PlatformType
  connected: boolean
  workspaces?: string[]
  phoneNumber?: string
  username?: string
  // Enhanced security
  encryptionEnabled?: boolean
  securitySettings?: PlatformSecuritySettings
}

export interface PlatformSecuritySettings {
  endToEndEncryption: boolean
  messageRetention: number // days
  dataBackup: boolean
  complianceLevel: "basic" | "enterprise" | "government"
  auditLogging: boolean
}

export interface ScheduledMessage {
  id: string
  content: string
  channelId: string
  scheduledTime: Date
  recurring?: {
    frequency: "daily" | "weekly" | "monthly"
    endDate?: Date
  }
  // Enhanced features
  isEncrypted?: boolean
  securityLevel?: "standard" | "confidential" | "restricted"
}

export interface SearchResult {
  messageId: string
  channelId: string
  content: string
  sender: User
  timestamp: Date
  matchedText: string
  context: string
  // Enhanced search
  securityLevel?: "standard" | "confidential" | "restricted"
  isEncrypted?: boolean
}

export interface NotificationSettings {
  enabled: boolean
  sound: boolean
  desktop: boolean
  mobile: boolean
  email: boolean
  doNotDisturb: {
    enabled: boolean
    from: string
    to: string
  }
  channels: {
    [channelId: string]: {
      muted: boolean
      mentions: boolean
    }
  }
  // Enhanced notifications
  securityAlerts: boolean
  encryptionNotifications: boolean
  complianceAlerts: boolean
}

export interface PrivacySettings {
  lastSeen: "everyone" | "contacts" | "nobody"
  profilePhoto: "everyone" | "contacts" | "nobody"
  readReceipts: boolean
  blockList: string[]
  // Enhanced privacy
  encryptionLevel: "standard" | "enhanced" | "maximum"
  dataRetention: number // days
  autoDelete: boolean
  messageExpiry?: number // hours
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system"
  fontSize: "small" | "medium" | "large"
  messageLayout: "compact" | "comfortable"
  emojiStyle: "native" | "twitter" | "facebook"
  // Enhanced appearance
  showSecurityIndicators: boolean
  showEncryptionStatus: boolean
  showReadReceipts: boolean
  showTypingIndicators: boolean
}

export interface LanguageSettings {
  appLanguage: string
  translationLanguage: string
  autoTranslate: boolean
  // Enhanced language
  encryptionLanguage: string
  securityNotifications: string
}

export interface Section {
  id: string
  name: string
  type: "team" | "direct" | "group" | "community" | "broadcast" | "whatsapp" | "telegram"
}

// New interfaces for enhanced features

export interface SecurityEvent {
  id: string
  type: "access_attempt" | "encryption" | "decryption" | "security_alert" | "compliance_check" | "breach_attempt"
  description: string
  timestamp: Date
  severity: "low" | "medium" | "high" | "critical"
  userId?: string
  fileId?: string
  ipAddress?: string
  location?: string
  deviceInfo?: string
  resolved?: boolean
}

export interface EncryptionSettings {
  enabled: boolean
  algorithm: "AES-256" | "ChaCha20" | "RSA-4096"
  keyRotation: number // days
  backupKeys: boolean
  complianceLevel: "basic" | "enterprise" | "government"
}

export interface MessageThread {
  id: string
  parentMessageId: string
  messages: Message[]
  participants: string[]
  lastActivity: Date
  isResolved?: boolean
}

export interface FileSecurity {
  id: string
  fileName: string
  securityLevel: "standard" | "confidential" | "restricted"
  encryptionStatus: "encrypted" | "decrypted" | "pending"
  accessControl: {
    allowedUsers: string[]
    allowedActions: ("view" | "download" | "share" | "edit" | "delete")[]
    expiryDate?: Date
  }
  auditTrail: FileAccessLog[]
  watermark?: boolean
  digitalSignature?: string
}

export interface ComplianceSettings {
  gdprCompliant: boolean
  soxCompliant: boolean
  hipaaCompliant: boolean
  retentionPolicy: {
    enabled: boolean
    duration: number // days
    autoDelete: boolean
  }
  auditLogging: {
    enabled: boolean
    retention: number // days
    level: "basic" | "detailed" | "comprehensive"
  }
}

export interface RealTimeFeatures {
  typingIndicators: boolean
  readReceipts: boolean
  onlineStatus: boolean
  messageStatus: boolean
  presenceUpdates: boolean
  liveReactions: boolean
  threadUpdates: boolean
  securityAlerts: boolean
}
