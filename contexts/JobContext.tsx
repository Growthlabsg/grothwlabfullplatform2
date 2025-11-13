"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface JobPosting {
  id: string
  title: string
  company: string
  companyId: string
  companyLogo: string
  location: string
  type: string
  experience: string
  salary: string
  salaryMin: number
  salaryMax: number
  currency: string
  visaSponsorship: boolean
  remoteWork: string
  description: string
  requirements: string[]
  skills: string[]
  benefits: string[]
  posted: string
  postedDate: Date
  applications: number
  views: number
  companySize: string
  fundingStage: string
  industry: string
  matchScore: number
  urgency: string
  featured: boolean
  status: "draft" | "published" | "paused" | "closed"
  applicationMethod: string
  createdBy: string
  createdAt: string
  updatedAt: string
  department: string
  reportingTo: string
  teamSize: number
  workSchedule: string
  travelRequired: boolean
  travelPercentage: number
  equityOffered: boolean
  equityDetails: string
  stockOptions: boolean
  education: string[]
  workAuthorization: string[]
  backgroundCheck: boolean
  companyValues: string[]
  workEnvironment: string
  teamCulture: string
  growthOpportunities: string[]
  learningBudget: number
  conferenceBudget: number
  applicationSteps: string[]
  interviewProcess: string
  timeline: string
  tags: string[]
  [key: string]: any
}

interface JobContextType {
  jobs: JobPosting[]
  setJobs: (jobs: JobPosting[]) => void
  savedJobs: string[]
  setSavedJobs: (jobs: string[]) => void
  applications: string[]
  setApplications: (applications: string[]) => void
  addJob: (job: JobPosting) => void
  updateJob: (id: string, updates: Partial<JobPosting>) => void
  deleteJob: (id: string) => void
  saveJob: (jobId: string) => void
  unsaveJob: (jobId: string) => void
  applyToJob: (jobId: string) => void
  withdrawApplication: (jobId: string) => void
  getJobById: (id: string) => JobPosting | undefined
  getJobsByCompany: (companyId: string) => JobPosting[]
  getJobsByCreator: (creatorId: string) => JobPosting[]
  isJobSaved: (jobId: string) => boolean
  hasApplied: (jobId: string) => boolean
  filterJobs: (filters: JobFilters) => JobPosting[]
}

interface JobFilters {
  search?: string
  location?: string[]
  type?: string[]
  experience?: string[]
  salaryMin?: number
  salaryMax?: number
  remoteWork?: string[]
  industry?: string[]
  companySize?: string[]
  fundingStage?: string[]
  skills?: string[]
  benefits?: string[]
  status?: string[]
  featured?: boolean
  visaSponsorship?: boolean
  createdBy?: string
  companyId?: string
}

const JobContext = createContext<JobContextType | undefined>(undefined)

export const useJobs = () => {
  const context = useContext(JobContext)
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider')
  }
  return context
}

// Mock data for demonstration
const MOCK_JOBS: JobPosting[] = [
  {
    id: "1",
    title: "AI Research Engineer",
    company: "TechNova Solutions",
    companyId: "1",
    companyLogo: "TN",
    location: "Singapore",
    type: "Full-time",
    experience: "Senior",
    salary: "$10,000 - $15,000",
    salaryMin: 10000,
    salaryMax: 15000,
    currency: "SGD",
    visaSponsorship: true,
    remoteWork: "Hybrid",
    description: "Join our AI research team to develop cutting-edge machine learning algorithms for enterprise workflow automation.",
    requirements: [
      "PhD in Computer Science, AI, or related field",
      "5+ years of experience in machine learning research",
      "Strong background in deep learning and neural networks",
      "Experience with TensorFlow, PyTorch, and MLOps"
    ],
    skills: ["Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Python", "Research"],
    benefits: ["Health Insurance", "Stock Options", "Research Budget", "Conference Attendance", "Flexible Hours"],
    posted: "3 days ago",
    postedDate: new Date("2024-01-13"),
    applications: 28,
    views: 156,
    companySize: "25-50",
    fundingStage: "Series A",
    industry: "Artificial Intelligence",
    matchScore: 95,
    urgency: "High",
    featured: true,
    status: "published",
    applicationMethod: "Platform",
    createdBy: "user1",
    createdAt: "2024-01-13T14:00:00Z",
    updatedAt: "2024-01-13T14:00:00Z",
    department: "Research & Development",
    reportingTo: "Head of AI Research",
    teamSize: 6,
    workSchedule: "Flexible",
    travelRequired: true,
    travelPercentage: 10,
    equityOffered: true,
    equityDetails: "0.2% - 0.8% equity based on experience and impact",
    stockOptions: true,
    education: ["PhD in Computer Science, AI, or related field"],
    workAuthorization: ["Singapore Citizen", "PR", "EP"],
    backgroundCheck: true,
    companyValues: ["Innovation", "Excellence", "Collaboration", "Impact"],
    workEnvironment: "Research-focused with access to cutting-edge hardware",
    teamCulture: "We foster a culture of intellectual curiosity and breakthrough innovation",
    growthOpportunities: ["Lead research projects", "Mentor junior researchers", "Patent development"],
    learningBudget: 5000,
    conferenceBudget: 3000,
    applicationSteps: [
      "Submit application with research portfolio",
      "Initial technical screening",
      "Research presentation",
      "Technical deep-dive interview",
      "Team fit interview",
      "Final interview with leadership"
    ],
    interviewProcess: "4-5 rounds over 3 weeks",
    timeline: "Hiring within 6-8 weeks",
    tags: ["AI Research", "Machine Learning", "Deep Learning", "Senior", "PhD"]
  },
  {
    id: "2",
    title: "Senior Full Stack Developer",
    company: "DataFlow Inc",
    companyId: "2",
    companyLogo: "DF",
    location: "San Francisco",
    type: "Full-time",
    experience: "Senior",
    salary: "$12,000 - $18,000",
    salaryMin: 12000,
    salaryMax: 18000,
    currency: "USD",
    visaSponsorship: true,
    remoteWork: "Remote",
    description: "Build scalable web applications and APIs for our data analytics platform serving enterprise clients.",
    requirements: [
      "5+ years of full-stack development experience",
      "Expertise in React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Strong understanding of database design and optimization"
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "Docker"],
    benefits: ["Health Insurance", "Dental", "Vision", "401k", "Stock Options", "Unlimited PTO"],
    posted: "1 week ago",
    postedDate: new Date("2024-01-06"),
    applications: 45,
    views: 234,
    companySize: "50-100",
    fundingStage: "Series B",
    industry: "Data Analytics",
    matchScore: 88,
    urgency: "Medium",
    featured: false,
    status: "published",
    applicationMethod: "Platform",
    createdBy: "user2",
    createdAt: "2024-01-06T09:15:00Z",
    updatedAt: "2024-01-06T09:15:00Z",
    department: "Engineering",
    reportingTo: "Engineering Manager",
    teamSize: 8,
    workSchedule: "Flexible",
    travelRequired: false,
    travelPercentage: 0,
    equityOffered: true,
    equityDetails: "0.1% - 0.5% equity based on experience",
    stockOptions: true,
    education: ["Bachelor's in Computer Science or related field"],
    workAuthorization: ["US Citizen", "Green Card", "H1B", "OPT"],
    backgroundCheck: true,
    companyValues: ["Innovation", "Quality", "Collaboration", "Growth"],
    workEnvironment: "Remote-first with optional office access",
    teamCulture: "We value work-life balance and continuous learning",
    growthOpportunities: ["Technical leadership", "Architecture decisions", "Mentoring"],
    learningBudget: 3000,
    conferenceBudget: 2000,
    applicationSteps: [
      "Submit application with portfolio",
      "Technical assessment",
      "Code review session",
      "System design interview",
      "Cultural fit interview"
    ],
    interviewProcess: "3-4 rounds over 2 weeks",
    timeline: "Hiring within 4-6 weeks",
    tags: ["Full Stack", "React", "Node.js", "TypeScript", "Senior", "Remote"]
  },
  {
    id: "3",
    title: "Product Marketing Manager",
    company: "GreenTech Solutions",
    companyId: "3",
    companyLogo: "GT",
    location: "London",
    type: "Full-time",
    experience: "Mid-level",
    salary: "£6,000 - £9,000",
    salaryMin: 6000,
    salaryMax: 9000,
    currency: "GBP",
    visaSponsorship: false,
    remoteWork: "Hybrid",
    description: "Drive product marketing strategy for our sustainable technology solutions targeting enterprise clients.",
    requirements: [
      "3+ years of product marketing experience",
      "Experience in B2B SaaS or technology sector",
      "Strong analytical and communication skills",
      "Experience with marketing automation tools"
    ],
    skills: ["Product Marketing", "B2B Marketing", "Analytics", "Content Strategy", "Salesforce", "HubSpot"],
    benefits: ["Health Insurance", "Pension", "25 Days Holiday", "Learning Budget", "Gym Membership"],
    posted: "5 days ago",
    postedDate: new Date("2024-01-11"),
    applications: 32,
    views: 189,
    companySize: "20-50",
    fundingStage: "Seed",
    industry: "Clean Technology",
    matchScore: 82,
    urgency: "Medium",
    featured: true,
    status: "published",
    applicationMethod: "Platform",
    createdBy: "user3",
    createdAt: "2024-01-11T14:30:00Z",
    updatedAt: "2024-01-11T14:30:00Z",
    department: "Marketing",
    reportingTo: "Head of Marketing",
    teamSize: 4,
    workSchedule: "Standard",
    travelRequired: true,
    travelPercentage: 20,
    equityOffered: true,
    equityDetails: "0.3% - 0.7% equity based on performance",
    stockOptions: false,
    education: ["Bachelor's in Marketing, Business, or related field"],
    workAuthorization: ["UK Citizen", "Settled Status", "Skilled Worker Visa"],
    backgroundCheck: false,
    companyValues: ["Sustainability", "Innovation", "Impact", "Collaboration"],
    workEnvironment: "Hybrid with 3 days in office",
    teamCulture: "We're passionate about creating a sustainable future through technology",
    growthOpportunities: ["Marketing leadership", "Product strategy", "Team management"],
    learningBudget: 2500,
    conferenceBudget: 1500,
    applicationSteps: [
      "Submit application with marketing portfolio",
      "Initial screening call",
      "Marketing strategy presentation",
      "Team interview",
      "Final interview with leadership"
    ],
    interviewProcess: "3-4 rounds over 2-3 weeks",
    timeline: "Hiring within 5-7 weeks",
    tags: ["Product Marketing", "B2B", "SaaS", "Mid-level", "Hybrid", "Sustainability"]
  }
]

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOBS)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [applications, setApplications] = useState<string[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedJobsData = localStorage.getItem('saved-jobs')
    const applicationsData = localStorage.getItem('job-applications')
    
    if (savedJobsData) {
      setSavedJobs(JSON.parse(savedJobsData))
    }
    if (applicationsData) {
      setApplications(JSON.parse(applicationsData))
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('saved-jobs', JSON.stringify(savedJobs))
  }, [savedJobs])

  useEffect(() => {
    localStorage.setItem('job-applications', JSON.stringify(applications))
  }, [applications])

  const addJob = (job: JobPosting) => {
    setJobs(prev => [...prev, job])
  }

  const updateJob = (id: string, updates: Partial<JobPosting>) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updates } : job
    ))
  }

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(job => job.id !== id))
    setSavedJobs(prev => prev.filter(jobId => jobId !== id))
    setApplications(prev => prev.filter(jobId => jobId !== id))
  }

  const saveJob = (jobId: string) => {
    if (!savedJobs.includes(jobId)) {
      setSavedJobs(prev => [...prev, jobId])
    }
  }

  const unsaveJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(id => id !== jobId))
  }

  const applyToJob = (jobId: string) => {
    if (!applications.includes(jobId)) {
      setApplications(prev => [...prev, jobId])
      // Update application count
      updateJob(jobId, { 
        applications: (jobs.find(j => j.id === jobId)?.applications || 0) + 1 
      })
    }
  }

  const withdrawApplication = (jobId: string) => {
    setApplications(prev => prev.filter(id => id !== jobId))
    // Update application count
    updateJob(jobId, { 
      applications: Math.max(0, (jobs.find(j => j.id === jobId)?.applications || 0) - 1)
    })
  }

  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id)
  }

  const getJobsByCompany = (companyId: string) => {
    return jobs.filter(job => job.companyId === companyId)
  }

  const getJobsByCreator = (creatorId: string) => {
    return jobs.filter(job => job.createdBy === creatorId)
  }

  const isJobSaved = (jobId: string) => {
    return savedJobs.includes(jobId)
  }

  const hasApplied = (jobId: string) => {
    return applications.includes(jobId)
  }

  const filterJobs = (filters: JobFilters) => {
    return jobs.filter(job => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const searchableText = `${job.title} ${job.company} ${job.description} ${job.skills.join(' ')}`.toLowerCase()
        if (!searchableText.includes(searchLower)) return false
      }

      // Location filter
      if (filters.location && filters.location.length > 0) {
        if (!filters.location.some(loc => job.location.toLowerCase().includes(loc.toLowerCase()))) return false
      }

      // Type filter
      if (filters.type && filters.type.length > 0) {
        if (!filters.type.includes(job.type)) return false
      }

      // Experience filter
      if (filters.experience && filters.experience.length > 0) {
        if (!filters.experience.includes(job.experience)) return false
      }

      // Salary filter
      if (filters.salaryMin && job.salaryMax < filters.salaryMin) return false
      if (filters.salaryMax && job.salaryMin > filters.salaryMax) return false

      // Remote work filter
      if (filters.remoteWork && filters.remoteWork.length > 0) {
        if (!filters.remoteWork.includes(job.remoteWork)) return false
      }

      // Industry filter
      if (filters.industry && filters.industry.length > 0) {
        if (!filters.industry.includes(job.industry)) return false
      }

      // Company size filter
      if (filters.companySize && filters.companySize.length > 0) {
        if (!filters.companySize.includes(job.companySize)) return false
      }

      // Funding stage filter
      if (filters.fundingStage && filters.fundingStage.length > 0) {
        if (!filters.fundingStage.includes(job.fundingStage)) return false
      }

      // Skills filter
      if (filters.skills && filters.skills.length > 0) {
        const hasRequiredSkills = filters.skills.some(skill => 
          job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
        )
        if (!hasRequiredSkills) return false
      }

      // Benefits filter
      if (filters.benefits && filters.benefits.length > 0) {
        const hasRequiredBenefits = filters.benefits.some(benefit => 
          job.benefits.some(jobBenefit => jobBenefit.toLowerCase().includes(benefit.toLowerCase()))
        )
        if (!hasRequiredBenefits) return false
      }

      // Status filter
      if (filters.status && filters.status.length > 0) {
        if (!filters.status.includes(job.status)) return false
      }

      // Featured filter
      if (filters.featured !== undefined && job.featured !== filters.featured) return false

      // Visa sponsorship filter
      if (filters.visaSponsorship && !job.visaSponsorship) return false

      // Created by filter
      if (filters.createdBy && job.createdBy !== filters.createdBy) return false

      // Company filter
      if (filters.companyId && job.companyId !== filters.companyId) return false

      return true
    })
  }

  const value: JobContextType = {
    jobs,
    setJobs,
    savedJobs,
    setSavedJobs,
    applications,
    setApplications,
    addJob,
    updateJob,
    deleteJob,
    saveJob,
    unsaveJob,
    applyToJob,
    withdrawApplication,
    getJobById,
    getJobsByCompany,
    getJobsByCreator,
    isJobSaved,
    hasApplied,
    filterJobs
  }

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  )
}
