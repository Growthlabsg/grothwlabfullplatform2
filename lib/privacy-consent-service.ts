export interface ConsentSettings {
  recordingConsent: boolean
  transcriptionConsent: boolean
  analyticsConsent: boolean
  dataRetentionPeriod: number // in days
  lastUpdated: Date
}

export interface PrivacyRegulation {
  id: string
  name: string
  description: string
  requirements: string[]
  link: string
}

// Mock function to get user's current consent settings
export async function getUserConsentSettings(userId: string): Promise<ConsentSettings> {
  // In a real implementation, this would fetch the user's consent settings from a database

  // Mock default settings
  return {
    recordingConsent: false,
    transcriptionConsent: false,
    analyticsConsent: true,
    dataRetentionPeriod: 90, // 90 days
    lastUpdated: new Date(Date.now() - 86400000 * 30), // 30 days ago
  }
}

// Mock function to update user's consent settings
export async function updateUserConsentSettings(
  userId: string,
  settings: Partial<ConsentSettings>,
): Promise<ConsentSettings> {
  console.log("Updating consent settings for user:", userId, settings)

  // In a real implementation, this would update the settings in a database

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return updated settings
  const currentSettings = await getUserConsentSettings(userId)
  return {
    ...currentSettings,
    ...settings,
    lastUpdated: new Date(),
  }
}

// Mock function to request recording consent
export async function requestRecordingConsent(
  callId: string,
  participantIds: string[],
): Promise<{ [participantId: string]: boolean }> {
  console.log("Requesting recording consent for call:", callId, "participants:", participantIds)

  // In a real implementation, this would send consent requests to participants
  // and track their responses

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock consent responses (all consenting in this example)
  const responses: { [participantId: string]: boolean } = {}
  participantIds.forEach((id) => {
    responses[id] = true
  })

  return responses
}

// Mock function to get relevant privacy regulations
export function getPrivacyRegulations(): PrivacyRegulation[] {
  return [
    {
      id: "gdpr",
      name: "GDPR",
      description:
        "The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy.",
      requirements: [
        "Explicit consent from all participants before recording",
        "Right to access and delete recorded data",
        "Data minimization and purpose limitation",
        "Ability to withdraw consent at any time",
      ],
      link: "https://gdpr.eu/",
    },
    {
      id: "ccpa",
      name: "CCPA",
      description:
        "The California Consumer Privacy Act (CCPA) gives California consumers rights over their personal information.",
      requirements: [
        "Right to know what personal information is collected",
        "Right to delete personal information",
        "Right to opt-out of the sale of personal information",
        "Right to non-discrimination for exercising CCPA rights",
      ],
      link: "https://oag.ca.gov/privacy/ccpa",
    },
    {
      id: "pdpa",
      name: "PDPA",
      description:
        "The Personal Data Protection Act 2012 (PDPA) governs the collection, use and disclosure of personal data in Singapore.",
      requirements: [
        "Consent obligation - obtain consent before collecting, using or disclosing personal data",
        "Purpose limitation - collect, use or disclose personal data only for purposes that would be considered appropriate",
        "Notification obligation - notify individuals of the purpose for the collection, use or disclosure of their personal data",
        "Access and correction obligation - provide individuals with access to their personal data upon request",
      ],
      link: "https://www.pdpc.gov.sg/Overview-of-PDPA/The-Legislation/Personal-Data-Protection-Act",
    },
  ]
}
