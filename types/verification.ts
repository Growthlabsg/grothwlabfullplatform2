export interface VerificationStatus {
  id: string
  status: "pending" | "verified" | "rejected" | "additional_info_required"
  submittedAt: string
  updatedAt: string
  verifiedAt?: string
  rejectedAt?: string
  additionalInfoRequestedAt?: string
  reviewedBy?: string
  notes?: string
  documentUrls: string[]
  companyId: string
  companyName: string
}

export interface VerificationCriteria {
  id: string
  name: string
  description: string
  required: boolean
  documentTypes: string[]
  weight: number
  isActive: boolean
}

export interface VerificationStats {
  total: number
  pending: number
  verified: number
  rejected: number
  additionalInfoRequired: number
  averageTimeToVerify: number // in hours
  verificationRate: number // percentage
}

export interface VerificationWebhook {
  id: string
  url: string
  events: VerificationWebhookEvent[]
  isActive: boolean
  createdAt: string
  lastTriggeredAt?: string
  secret: string
}

export type VerificationWebhookEvent =
  | "verification.submitted"
  | "verification.approved"
  | "verification.rejected"
  | "verification.info_requested"
  | "verification.updated"

export interface BatchVerificationJob {
  id: string
  status: "pending" | "processing" | "completed" | "failed"
  totalItems: number
  processedItems: number
  successItems: number
  failedItems: number
  createdAt: string
  completedAt?: string
  createdBy: string
  errorMessage?: string
}

export interface VerificationAnalytics {
  dailyStats: {
    date: string
    submitted: number
    approved: number
    rejected: number
    additionalInfoRequested: number
  }[]
  verificationsByType: {
    type: string
    count: number
    percentage: number
  }[]
  averageTimeToVerify: number // in hours
  verificationRateOverTime: {
    period: string
    rate: number
  }[]
  topRejectionReasons: {
    reason: string
    count: number
    percentage: number
  }[]
}
