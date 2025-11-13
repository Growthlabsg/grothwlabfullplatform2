export interface Job {
  id: string
  title: string
  company: string
  companyId: string // Reference to the startup/business that created this job
  companyLogo?: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance"
  experience: "Entry Level" | "Junior" | "Mid Level" | "Senior" | "Expert" | "Team Lead" | "Manager"
  salary: string
  salaryMin?: number
  salaryMax?: number
  currency: string
  visaSponsorship: boolean
  visaDetails?: string
  remoteWork: "On-site" | "Remote" | "Hybrid"
  description: string
  requirements: string[]
  skills: string[]
  benefits: string[]
  posted: string
  postedDate: Date
  applicationDeadline?: string
  startDate?: string
  applications: number
  views: number
  companySize: string
  fundingStage: string
  industry: string
  matchScore?: number
  urgency: "Low" | "Medium" | "High"
  featured: boolean
  status: "Draft" | "Active" | "Paused" | "Closed" | "Expired"
  applicationMethod: "Platform" | "External"
  applicationUrl?: string
  applicationEmail?: string
  createdBy: string // User ID who created the job
  createdAt: string
  updatedAt: string
  // Additional comprehensive fields
  department: string
  reportingTo?: string
  teamSize?: number
  workSchedule?: string
  travelRequired?: boolean
  travelPercentage?: number
  equityOffered?: boolean
  equityDetails?: string
  stockOptions?: boolean
  stockOptionsDetails?: string
  relocationAssistance?: boolean
  relocationDetails?: string
  education?: string[]
  certifications?: string[]
  languages?: string[]
  workAuthorization?: string[]
  backgroundCheck?: boolean
  drugTest?: boolean
  securityClearance?: boolean
  clearanceLevel?: string
  // Company culture and values
  companyValues?: string[]
  workEnvironment?: string
  teamCulture?: string
  growthOpportunities?: string[]
  learningBudget?: number
  conferenceBudget?: number
  // Application process
  applicationSteps?: string[]
  interviewProcess?: string[]
  timeline?: string
  // Analytics
  clickThroughRate?: number
  conversionRate?: number
  timeToHire?: number
  // SEO and visibility
  tags?: string[]
  keywords?: string[]
  seoTitle?: string
  seoDescription?: string
}

export interface JobApplication {
  id: string
  jobId: string
  applicantId: string
  applicantName: string
  applicantEmail: string
  applicantPhone?: string
  resumeUrl?: string
  coverLetter?: string
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  status: "Applied" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Interviewed" | "Rejected" | "Hired" | "Withdrawn"
  appliedAt: string
  lastUpdated: string
  notes?: string
  interviewScheduledAt?: string
  interviewType?: "Phone" | "Video" | "In-person" | "Technical"
  interviewNotes?: string
  rating?: number
  feedback?: string
}

export interface JobFilter {
  search?: string
  location?: string[]
  type?: string[]
  experience?: string[]
  salaryMin?: number
  salaryMax?: number
  remoteWork?: string[]
  visaSponsorship?: boolean
  industry?: string[]
  companySize?: string[]
  fundingStage?: string[]
  featured?: boolean
  postedWithin?: string
  skills?: string[]
  benefits?: string[]
}

export interface JobStats {
  totalJobs: number
  activeJobs: number
  applications: number
  views: number
  avgTimeToHire: number
  conversionRate: number
  topSkills: { skill: string; count: number }[]
  topLocations: { location: string; count: number }[]
  topIndustries: { industry: string; count: number }[]
}

export interface CreateJobFormData {
  // Basic Information
  title: string
  company: string
  companyId: string
  department: string
  reportingTo?: string
  teamSize?: number
  
  // Job Details
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance"
  experience: "Entry Level" | "Junior" | "Mid Level" | "Senior" | "Expert" | "Team Lead" | "Manager"
  location: string
  remoteWork: "On-site" | "Remote" | "Hybrid"
  workSchedule?: string
  
  // Compensation
  salary: string
  salaryMin?: number
  salaryMax?: number
  currency: string
  equityOffered?: boolean
  equityDetails?: string
  stockOptions?: boolean
  stockOptionsDetails?: string
  
  // Job Description
  description: string
  requirements: string[]
  skills: string[]
  education?: string[]
  certifications?: string[]
  languages?: string[]
  
  // Benefits & Perks
  benefits: string[]
  learningBudget?: number
  conferenceBudget?: number
  relocationAssistance?: boolean
  relocationDetails?: string
  
  // Work Environment
  companyValues?: string[]
  workEnvironment?: string
  teamCulture?: string
  growthOpportunities?: string[]
  
  // Requirements
  workAuthorization?: string[]
  backgroundCheck?: boolean
  drugTest?: boolean
  securityClearance?: boolean
  clearanceLevel?: string
  travelRequired?: boolean
  travelPercentage?: number
  
  // Application Process
  applicationMethod: "Platform" | "External"
  applicationUrl?: string
  applicationEmail?: string
  applicationSteps?: string[]
  interviewProcess?: string[]
  timeline?: string
  
  // Dates
  applicationDeadline?: string
  startDate?: string
  
  // Visa & Immigration
  visaSponsorship: boolean
  visaDetails?: string
  
  // Visibility
  featured: boolean
  tags?: string[]
  keywords?: string[]
  seoTitle?: string
  seoDescription?: string
}
