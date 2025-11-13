import { Job, JobFilter, JobStats, CreateJobFormData, JobApplication } from "@/types/job"

// Mock job data - in a real app, this would come from a database
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Full Stack Developer",
    company: "TechNova Solutions",
    companyId: "1",
    companyLogo: "TN",
    location: "Singapore",
    type: "Full-time",
    experience: "Senior",
    salary: "$8,000 - $12,000",
    salaryMin: 8000,
    salaryMax: 12000,
    currency: "SGD",
    visaSponsorship: true,
    visaDetails: "We sponsor EP and S-Pass for qualified candidates",
    remoteWork: "Hybrid",
    description: "Join our fast-growing team to build innovative solutions for the fintech industry. We're looking for experienced developers who are passionate about creating high-quality software.",
    requirements: [
      "5+ years of full-stack development experience",
      "Strong proficiency in React, Node.js, and TypeScript",
      "Experience with AWS cloud services",
      "Knowledge of microservices architecture",
      "Experience with CI/CD pipelines"
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes"],
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Learning Budget", "Work from Home"],
    posted: "2 days ago",
    postedDate: new Date("2024-01-15"),
    applications: 45,
    views: 234,
    companySize: "50-200",
    fundingStage: "Series B",
    industry: "Fintech",
    matchScore: 92,
    urgency: "High",
    featured: true,
    status: "Active",
    applicationMethod: "Platform",
    createdBy: "user1",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    department: "Engineering",
    reportingTo: "CTO",
    teamSize: 8,
    workSchedule: "Flexible",
    travelRequired: false,
    equityOffered: true,
    equityDetails: "0.1% - 0.5% equity based on experience",
    stockOptions: true,
    relocationAssistance: true,
    education: ["Bachelor's degree in Computer Science or related field"],
    workAuthorization: ["Singapore Citizen", "PR", "EP", "S-Pass"],
    backgroundCheck: true,
    companyValues: ["Innovation", "Transparency", "Customer Success"],
    workEnvironment: "Collaborative and fast-paced",
    teamCulture: "We value open communication and continuous learning",
    growthOpportunities: ["Technical leadership", "Mentoring", "Conference speaking"],
    learningBudget: 2000,
    conferenceBudget: 1500,
    applicationSteps: [
      "Submit application",
      "Initial phone screening",
      "Technical interview",
      "System design interview",
      "Final interview with team"
    ],
    interviewProcess: "3-4 rounds over 2 weeks",
    timeline: "Hiring within 4-6 weeks",
    tags: ["Full Stack", "React", "Node.js", "Fintech", "Senior"],
    keywords: ["javascript", "react", "nodejs", "typescript", "aws"]
  },
  {
    id: "2",
    title: "Product Manager",
    company: "TechNova Solutions",
    companyId: "1",
    companyLogo: "TN",
    location: "Singapore",
    type: "Full-time",
    experience: "Mid Level",
    salary: "$6,000 - $9,000",
    salaryMin: 6000,
    salaryMax: 9000,
    currency: "SGD",
    visaSponsorship: false,
    remoteWork: "On-site",
    description: "Lead product development for our SaaS platform. Work closely with engineering and design teams to deliver exceptional user experiences.",
    requirements: [
      "3+ years of product management experience",
      "Experience with B2B SaaS products",
      "Strong analytical and problem-solving skills",
      "Experience with agile development methodologies",
      "Excellent communication and leadership skills"
    ],
    skills: ["Product Strategy", "User Research", "Agile", "Analytics", "Figma", "Jira"],
    benefits: ["Health Insurance", "Stock Options", "Remote Work", "Learning Budget"],
    posted: "1 day ago",
    postedDate: new Date("2024-01-16"),
    applications: 32,
    views: 189,
    companySize: "50-200",
    fundingStage: "Series B",
    industry: "SaaS",
    matchScore: 78,
    urgency: "Medium",
    featured: false,
    status: "Active",
    applicationMethod: "Platform",
    createdBy: "user1",
    createdAt: "2024-01-16T09:00:00Z",
    updatedAt: "2024-01-16T09:00:00Z",
    department: "Product",
    reportingTo: "VP of Product",
    teamSize: 5,
    workSchedule: "Standard business hours",
    travelRequired: false,
    equityOffered: true,
    education: ["Bachelor's degree in Business, Engineering, or related field"],
    workAuthorization: ["Singapore Citizen", "PR"],
    companyValues: ["Customer-centric", "Data-driven", "Innovation"],
    workEnvironment: "Cross-functional collaboration",
    teamCulture: "We encourage experimentation and learning from failures",
    growthOpportunities: ["Product leadership", "Strategy development", "Team management"],
    learningBudget: 1500,
    applicationSteps: [
      "Submit application",
      "Initial phone screening",
      "Product case study",
      "Stakeholder interview",
      "Final interview with leadership"
    ],
    interviewProcess: "3 rounds over 2 weeks",
    timeline: "Hiring within 3-4 weeks",
    tags: ["Product Management", "SaaS", "B2B", "Mid Level"],
    keywords: ["product management", "saas", "b2b", "strategy", "analytics"]
  },
  // Jobs for TechNova Solutions (Startup ID: 1)
  {
    id: "4",
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
    visaDetails: "We sponsor EP for qualified AI researchers",
    remoteWork: "Hybrid",
    description: "Join our AI research team to develop cutting-edge machine learning algorithms for enterprise workflow automation. You'll work on AutoFlow AI, our flagship product that transforms how businesses operate.",
    requirements: [
      "PhD in Computer Science, AI, or related field",
      "5+ years of experience in machine learning research",
      "Strong background in deep learning and neural networks",
      "Experience with TensorFlow, PyTorch, and MLOps",
      "Published research papers in top-tier conferences",
      "Experience with enterprise software development"
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
    status: "Active",
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
    stockOptionsDetails: "Stock options vesting over 4 years",
    education: ["PhD in Computer Science, AI, or related field"],
    certifications: ["AWS Machine Learning Specialty", "Google Cloud AI/ML Professional"],
    languages: ["English", "Mandarin (preferred)"],
    learningBudget: 5000,
    conferenceBudget: 3000,
    relocationAssistance: true,
    relocationDetails: "Full relocation package including housing assistance",
    companyValues: ["Innovation", "Excellence", "Collaboration", "Impact"],
    workEnvironment: "Research-focused with access to cutting-edge hardware",
    teamCulture: "We foster a culture of intellectual curiosity and breakthrough innovation",
    growthOpportunities: ["Lead research projects", "Mentor junior researchers", "Patent development"],
    workAuthorization: ["Singapore Citizen", "PR", "EP"],
    backgroundCheck: true,
    securityClearance: false,
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
    tags: ["AI Research", "Machine Learning", "Deep Learning", "Senior", "PhD"],
    keywords: ["ai research", "machine learning", "deep learning", "tensorflow", "pytorch", "phd"]
  },
  {
    id: "5",
    title: "Frontend Developer",
    company: "TechNova Solutions",
    companyId: "1",
    companyLogo: "TN",
    location: "Singapore",
    type: "Full-time",
    experience: "Mid Level",
    salary: "$6,500 - $9,500",
    salaryMin: 6500,
    salaryMax: 9500,
    currency: "SGD",
    visaSponsorship: true,
    visaDetails: "We sponsor EP and S-Pass for qualified developers",
    remoteWork: "Hybrid",
    description: "Build beautiful and intuitive user interfaces for our AutoFlow AI platform. Work closely with our AI team to create seamless user experiences for enterprise clients.",
    requirements: [
      "3+ years of frontend development experience",
      "Strong proficiency in React, TypeScript, and modern CSS",
      "Experience with state management (Redux, Zustand, or similar)",
      "Knowledge of responsive design and accessibility",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Familiarity with design systems and component libraries"
    ],
    skills: ["React", "TypeScript", "CSS", "Redux", "Jest", "Figma"],
    benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours", "Work from Home"],
    posted: "1 day ago",
    postedDate: new Date("2024-01-16"),
    applications: 42,
    views: 198,
    companySize: "25-50",
    fundingStage: "Series A",
    industry: "Artificial Intelligence",
    matchScore: 88,
    urgency: "Medium",
    featured: false,
    status: "Active",
    applicationMethod: "Platform",
    createdBy: "user1",
    createdAt: "2024-01-16T10:30:00Z",
    updatedAt: "2024-01-16T10:30:00Z",
    department: "Engineering",
    reportingTo: "Frontend Lead",
    teamSize: 4,
    workSchedule: "Flexible",
    travelRequired: false,
    equityOffered: true,
    equityDetails: "0.05% - 0.2% equity based on experience",
    education: ["Bachelor's degree in Computer Science or related field"],
    workAuthorization: ["Singapore Citizen", "PR", "EP", "S-Pass"],
    backgroundCheck: true,
    companyValues: ["Innovation", "User-Centric", "Quality", "Collaboration"],
    workEnvironment: "Modern office with latest development tools",
    teamCulture: "We value clean code, user experience, and continuous learning",
    growthOpportunities: ["Technical leadership", "UI/UX collaboration", "Mentoring"],
    learningBudget: 2000,
    conferenceBudget: 1000,
    applicationSteps: [
      "Submit application with portfolio",
      "Initial phone screening",
      "Technical coding challenge",
      "Frontend architecture discussion",
      "Team fit interview"
    ],
    interviewProcess: "3-4 rounds over 2 weeks",
    timeline: "Hiring within 4-5 weeks",
    tags: ["Frontend", "React", "TypeScript", "Mid Level", "UI/UX"],
    keywords: ["frontend", "react", "typescript", "ui", "ux", "javascript"]
  },
  // Jobs for FinFlow Pro (Startup ID: 2)
  {
    id: "6",
    title: "Blockchain Developer",
    company: "FinFlow Pro",
    companyId: "2",
    companyLogo: "FP",
    location: "Singapore",
    type: "Full-time",
    experience: "Senior",
    salary: "$9,000 - $13,000",
    salaryMin: 9000,
    salaryMax: 13000,
    currency: "SGD",
    visaSponsorship: true,
    visaDetails: "We sponsor EP for qualified blockchain developers",
    remoteWork: "Hybrid",
    description: "Develop next-generation financial technology solutions using blockchain and smart contracts. Build secure, scalable DeFi protocols for our fintech platform.",
    requirements: [
      "4+ years of blockchain development experience",
      "Expert knowledge of Solidity and smart contract development",
      "Experience with Ethereum, Polygon, or other blockchain networks",
      "Strong understanding of DeFi protocols and financial instruments",
      "Experience with Web3.js, Ethers.js, or similar libraries",
      "Knowledge of security best practices for smart contracts"
    ],
    skills: ["Solidity", "Ethereum", "Web3", "DeFi", "Smart Contracts", "Security"],
    benefits: ["Health Insurance", "Stock Options", "Crypto Bonuses", "Learning Budget", "Flexible Hours"],
    posted: "2 days ago",
    postedDate: new Date("2024-01-15"),
    applications: 35,
    views: 167,
    companySize: "10-25",
    fundingStage: "Seed",
    industry: "Financial Technology",
    matchScore: 92,
    urgency: "High",
    featured: true,
    status: "Active",
    applicationMethod: "Platform",
    createdBy: "user2",
    createdAt: "2024-01-15T11:00:00Z",
    updatedAt: "2024-01-15T11:00:00Z",
    department: "Engineering",
    reportingTo: "CTO",
    teamSize: 3,
    workSchedule: "Flexible",
    travelRequired: false,
    equityOffered: true,
    equityDetails: "0.3% - 1.0% equity based on experience and impact",
    education: ["Bachelor's degree in Computer Science or related field"],
    workAuthorization: ["Singapore Citizen", "PR", "EP"],
    backgroundCheck: true,
    companyValues: ["Innovation", "Security", "Transparency", "Financial Inclusion"],
    workEnvironment: "Cutting-edge fintech startup environment",
    teamCulture: "We're building the future of finance with cutting-edge technology",
    growthOpportunities: ["Technical leadership", "Protocol design", "Team building"],
    learningBudget: 3000,
    conferenceBudget: 2000,
    applicationSteps: [
      "Submit application with smart contract portfolio",
      "Initial technical screening",
      "Smart contract security review",
      "DeFi protocol design challenge",
      "Final interview with team"
    ],
    interviewProcess: "4 rounds over 2 weeks",
    timeline: "Hiring within 5-6 weeks",
    tags: ["Blockchain", "DeFi", "Solidity", "Senior", "Fintech"],
    keywords: ["blockchain", "defi", "solidity", "ethereum", "smart contracts", "fintech"]
  },
  // Jobs for HealthTech Innovations (Startup ID: 3)
  {
    id: "7",
    title: "Medical AI Engineer",
    company: "HealthTech Innovations",
    companyId: "3",
    companyLogo: "HI",
    location: "Singapore",
    type: "Full-time",
    experience: "Senior",
    salary: "$11,000 - $16,000",
    salaryMin: 11000,
    salaryMax: 16000,
    currency: "SGD",
    visaSponsorship: true,
    visaDetails: "We sponsor EP for qualified medical AI engineers",
    remoteWork: "Hybrid",
    description: "Develop AI-powered healthcare solutions that improve patient outcomes. Work on medical imaging, diagnostic tools, and treatment recommendation systems.",
    requirements: [
      "5+ years of experience in medical AI or healthcare technology",
      "Strong background in computer vision and medical imaging",
      "Experience with DICOM, PACS, and medical data standards",
      "Knowledge of regulatory requirements (FDA, CE marking, etc.)",
      "Experience with PyTorch, TensorFlow, and medical AI frameworks",
      "Understanding of clinical workflows and healthcare systems"
    ],
    skills: ["Medical AI", "Computer Vision", "DICOM", "PyTorch", "TensorFlow", "Healthcare"],
    benefits: ["Health Insurance", "Stock Options", "Research Budget", "Conference Attendance", "Flexible Hours"],
    posted: "4 days ago",
    postedDate: new Date("2024-01-12"),
    applications: 22,
    views: 134,
    companySize: "50-100",
    fundingStage: "Series B",
    industry: "Healthcare Technology",
    matchScore: 94,
    urgency: "High",
    featured: true,
    status: "Active",
    applicationMethod: "Platform",
    createdBy: "user3",
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-12T09:00:00Z",
    department: "AI Research",
    reportingTo: "Head of Medical AI",
    teamSize: 8,
    workSchedule: "Flexible",
    travelRequired: true,
    travelPercentage: 15,
    equityOffered: true,
    equityDetails: "0.1% - 0.5% equity based on experience and impact",
    education: ["Master's or PhD in Computer Science, Biomedical Engineering, or related field"],
    certifications: ["AWS Machine Learning Specialty", "Medical Device Software Certification"],
    workAuthorization: ["Singapore Citizen", "PR", "EP"],
    backgroundCheck: true,
    securityClearance: false,
    companyValues: ["Patient Safety", "Innovation", "Evidence-Based", "Collaboration"],
    workEnvironment: "Research hospital collaboration with access to medical data",
    teamCulture: "We're passionate about using AI to improve healthcare outcomes",
    growthOpportunities: ["Clinical research collaboration", "Patent development", "Team leadership"],
    learningBudget: 4000,
    conferenceBudget: 2500,
    applicationSteps: [
      "Submit application with medical AI portfolio",
      "Initial technical screening",
      "Medical AI case study",
      "Clinical workflow discussion",
      "Regulatory compliance interview",
      "Final interview with medical team"
    ],
    interviewProcess: "5 rounds over 3 weeks",
    timeline: "Hiring within 6-8 weeks",
    tags: ["Medical AI", "Healthcare", "Computer Vision", "Senior", "Research"],
    keywords: ["medical ai", "healthcare", "computer vision", "medical imaging", "dicom", "pytorch"]
  },
  {
    id: "8",
    title: "DevOps Engineer",
    company: "FinFlow Pro",
    companyId: "2",
    companyLogo: "FP",
    location: "Singapore",
    type: "Full-time",
    experience: "Mid Level",
    salary: "$7,000 - $10,000",
    salaryMin: 7000,
    salaryMax: 10000,
    currency: "SGD",
    visaSponsorship: true,
    visaDetails: "We sponsor EP for qualified DevOps engineers",
    remoteWork: "Hybrid",
    description: "Build and maintain our cloud infrastructure for our DeFi platform. Ensure high availability, security, and scalability of our blockchain-based financial services.",
    requirements: [
      "3+ years of DevOps/Infrastructure experience",
      "Strong knowledge of AWS, Azure, or GCP",
      "Experience with Kubernetes and containerization",
      "Knowledge of CI/CD pipelines and automation",
      "Experience with monitoring and logging tools",
      "Understanding of security best practices"
    ],
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD", "Monitoring"],
    benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours"],
    posted: "1 day ago",
    postedDate: new Date("2024-01-16"),
    applications: 18,
    views: 89,
    companySize: "10-25",
    fundingStage: "Seed",
    industry: "Financial Technology",
    matchScore: 85,
    urgency: "Medium",
    featured: false,
    status: "Active",
    applicationMethod: "Platform",
    createdBy: "user2",
    createdAt: "2024-01-16T08:00:00Z",
    updatedAt: "2024-01-16T08:00:00Z",
    department: "Engineering",
    reportingTo: "CTO",
    teamSize: 2,
    workSchedule: "Flexible",
    travelRequired: false,
    equityOffered: true,
    equityDetails: "0.1% - 0.3% equity based on experience",
    education: ["Bachelor's degree in Computer Science or related field"],
    workAuthorization: ["Singapore Citizen", "PR", "EP"],
    backgroundCheck: true,
    companyValues: ["Security", "Reliability", "Innovation", "Collaboration"],
    workEnvironment: "Fast-paced fintech startup environment",
    teamCulture: "We value automation, reliability, and continuous improvement",
    growthOpportunities: ["Infrastructure leadership", "Security specialization", "Team building"],
    learningBudget: 2500,
    conferenceBudget: 1500,
    applicationSteps: [
      "Submit application",
      "Initial technical screening",
      "Infrastructure design challenge",
      "Security best practices discussion",
      "Team fit interview"
    ],
    interviewProcess: "3-4 rounds over 2 weeks",
    timeline: "Hiring within 4-5 weeks",
    tags: ["DevOps", "AWS", "Kubernetes", "Mid Level", "Fintech"],
    keywords: ["devops", "aws", "kubernetes", "docker", "ci/cd", "fintech"]
  },
  {
    id: "9",
    title: "Clinical Data Analyst",
    company: "HealthTech Innovations",
    companyId: "3",
    companyLogo: "HI",
    location: "Singapore",
    type: "Full-time",
    experience: "Mid Level",
    salary: "$6,000 - $9,000",
    salaryMin: 6000,
    salaryMax: 9000,
    currency: "SGD",
    visaSponsorship: true,
    visaDetails: "We sponsor EP for qualified clinical data analysts",
    remoteWork: "Hybrid",
    description: "Analyze clinical data to support our AI-powered healthcare solutions. Work with medical teams to extract insights from patient data and improve treatment outcomes.",
    requirements: [
      "3+ years of experience in clinical data analysis or healthcare analytics",
      "Strong knowledge of SQL, Python, and statistical analysis",
      "Experience with healthcare data standards (HL7, FHIR, etc.)",
      "Understanding of clinical workflows and medical terminology",
      "Experience with data visualization tools (Tableau, Power BI, etc.)",
      "Knowledge of regulatory requirements for healthcare data"
    ],
    skills: ["SQL", "Python", "Statistics", "Healthcare Data", "Tableau", "Clinical Research"],
    benefits: ["Health Insurance", "Stock Options", "Learning Budget", "Flexible Hours"],
    posted: "2 days ago",
    postedDate: new Date("2024-01-15"),
    applications: 25,
    views: 112,
    companySize: "50-100",
    fundingStage: "Series B",
    industry: "Healthcare Technology",
    matchScore: 87,
    urgency: "Medium",
    featured: false,
    status: "Active",
    applicationMethod: "Platform",
    createdBy: "user3",
    createdAt: "2024-01-15T13:00:00Z",
    updatedAt: "2024-01-15T13:00:00Z",
    department: "Data Analytics",
    reportingTo: "Head of Data Analytics",
    teamSize: 5,
    workSchedule: "Flexible",
    travelRequired: false,
    equityOffered: true,
    equityDetails: "0.05% - 0.2% equity based on experience",
    education: ["Bachelor's degree in Statistics, Biostatistics, or related field"],
    workAuthorization: ["Singapore Citizen", "PR", "EP"],
    backgroundCheck: true,
    companyValues: ["Patient Privacy", "Data Integrity", "Evidence-Based", "Collaboration"],
    workEnvironment: "Collaborative environment with medical professionals",
    teamCulture: "We're committed to using data to improve healthcare outcomes",
    growthOpportunities: ["Clinical research collaboration", "Advanced analytics", "Team leadership"],
    learningBudget: 2000,
    conferenceBudget: 1200,
    applicationSteps: [
      "Submit application with portfolio",
      "Initial technical screening",
      "Clinical data analysis challenge",
      "Healthcare domain knowledge assessment",
      "Team fit interview"
    ],
    interviewProcess: "3-4 rounds over 2 weeks",
    timeline: "Hiring within 4-5 weeks",
    tags: ["Data Analysis", "Healthcare", "Clinical Research", "Mid Level", "Statistics"],
    keywords: ["data analysis", "healthcare", "clinical data", "statistics", "sql", "python"]
  }
]

// Mock job applications
const mockJobApplications: JobApplication[] = [
  {
    id: "app1",
    jobId: "1",
    applicantId: "applicant1",
    applicantName: "John Doe",
    applicantEmail: "john.doe@email.com",
    applicantPhone: "+65 9123 4567",
    resumeUrl: "/resumes/john-doe-resume.pdf",
    coverLetter: "I am very interested in this position...",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    githubUrl: "https://github.com/johndoe",
    status: "Under Review",
    appliedAt: "2024-01-16T10:30:00Z",
    lastUpdated: "2024-01-16T10:30:00Z",
    notes: "Strong technical background, good cultural fit"
  },
  {
    id: "app2",
    jobId: "1",
    applicantId: "applicant2",
    applicantName: "Jane Smith",
    applicantEmail: "jane.smith@email.com",
    status: "Shortlisted",
    appliedAt: "2024-01-15T15:45:00Z",
    lastUpdated: "2024-01-17T09:15:00Z",
    interviewScheduledAt: "2024-01-20T14:00:00Z",
    interviewType: "Video",
    rating: 4.5
  }
]

export const JobService = {
  // Get all jobs with optional filtering
  getAllJobs: async (filters?: JobFilter): Promise<Job[]> => {
    let filteredJobs = [...mockJobs]

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredJobs = filteredJobs.filter(job => 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchLower))
        )
      }

      if (filters.location && filters.location.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.location!.some(loc => job.location.toLowerCase().includes(loc.toLowerCase()))
        )
      }

      if (filters.type && filters.type.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.type!.includes(job.type)
        )
      }

      if (filters.experience && filters.experience.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.experience!.includes(job.experience)
        )
      }

      if (filters.salaryMin !== undefined) {
        filteredJobs = filteredJobs.filter(job => 
          job.salaryMin && job.salaryMin >= filters.salaryMin!
        )
      }

      if (filters.salaryMax !== undefined) {
        filteredJobs = filteredJobs.filter(job => 
          job.salaryMax && job.salaryMax <= filters.salaryMax!
        )
      }

      if (filters.remoteWork && filters.remoteWork.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.remoteWork!.includes(job.remoteWork)
        )
      }

      if (filters.visaSponsorship !== undefined) {
        filteredJobs = filteredJobs.filter(job => 
          job.visaSponsorship === filters.visaSponsorship
        )
      }

      if (filters.industry && filters.industry.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.industry!.includes(job.industry)
        )
      }

      if (filters.companySize && filters.companySize.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.companySize!.includes(job.companySize)
        )
      }

      if (filters.fundingStage && filters.fundingStage.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.fundingStage!.includes(job.fundingStage)
        )
      }

      if (filters.featured !== undefined) {
        filteredJobs = filteredJobs.filter(job => 
          job.featured === filters.featured
        )
      }

      if (filters.skills && filters.skills.length > 0) {
        filteredJobs = filteredJobs.filter(job => 
          filters.skills!.some(skill => 
            job.skills.some(jobSkill => 
              jobSkill.toLowerCase().includes(skill.toLowerCase())
            )
          )
        )
      }
    }

    return filteredJobs
  },

  // Get jobs by company ID
  getJobsByCompany: async (companyId: string): Promise<Job[]> => {
    return mockJobs.filter(job => job.companyId === companyId)
  },

  // Get job by ID
  getJobById: async (jobId: string): Promise<Job | null> => {
    return mockJobs.find(job => job.id === jobId) || null
  },

  // Create a new job
  createJob: async (jobData: CreateJobFormData): Promise<Job> => {
    const newJob: Job = {
      id: (mockJobs.length + 1).toString(),
      ...jobData,
      posted: "Just now",
      postedDate: new Date(),
      applications: 0,
      views: 0,
      status: "Active",
      createdBy: "current-user", // In real app, get from auth context
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Set default values for optional fields
      department: jobData.department || "General",
      workSchedule: jobData.workSchedule || "Standard business hours",
      travelRequired: jobData.travelRequired || false,
      travelPercentage: jobData.travelPercentage || 0,
      equityOffered: jobData.equityOffered || false,
      stockOptions: jobData.stockOptions || false,
      relocationAssistance: jobData.relocationAssistance || false,
      education: jobData.education || [],
      certifications: jobData.certifications || [],
      languages: jobData.languages || [],
      workAuthorization: jobData.workAuthorization || [],
      backgroundCheck: jobData.backgroundCheck || false,
      drugTest: jobData.drugTest || false,
      securityClearance: jobData.securityClearance || false,
      companyValues: jobData.companyValues || [],
      workEnvironment: jobData.workEnvironment || "",
      teamCulture: jobData.teamCulture || "",
      growthOpportunities: jobData.growthOpportunities || [],
      learningBudget: jobData.learningBudget || 0,
      conferenceBudget: jobData.conferenceBudget || 0,
      applicationSteps: jobData.applicationSteps || [],
      interviewProcess: jobData.interviewProcess || "",
      timeline: jobData.timeline || "",
      tags: jobData.tags || [],
      keywords: jobData.keywords || [],
      seoTitle: jobData.seoTitle || jobData.title,
      seoDescription: jobData.seoDescription || jobData.description.substring(0, 160)
    }

    mockJobs.push(newJob)
    return newJob
  },

  // Update a job
  updateJob: async (jobId: string, updates: Partial<CreateJobFormData>): Promise<Job | null> => {
    const jobIndex = mockJobs.findIndex(job => job.id === jobId)
    if (jobIndex === -1) return null

    mockJobs[jobIndex] = {
      ...mockJobs[jobIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    return mockJobs[jobIndex]
  },

  // Delete a job
  deleteJob: async (jobId: string): Promise<boolean> => {
    const jobIndex = mockJobs.findIndex(job => job.id === jobId)
    if (jobIndex === -1) return false

    mockJobs.splice(jobIndex, 1)
    return true
  },

  // Get job applications
  getJobApplications: async (jobId: string): Promise<JobApplication[]> => {
    return mockJobApplications.filter(app => app.jobId === jobId)
  },

  // Create job application
  createJobApplication: async (application: Omit<JobApplication, 'id' | 'appliedAt' | 'lastUpdated'>): Promise<JobApplication> => {
    const newApplication: JobApplication = {
      id: `app${Date.now()}`,
      ...application,
      appliedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    }

    mockJobApplications.push(newApplication)
    return newApplication
  },

  // Get job statistics
  getJobStats: async (companyId?: string): Promise<JobStats> => {
    const jobs = companyId ? mockJobs.filter(job => job.companyId === companyId) : mockJobs
    
    const totalJobs = jobs.length
    const activeJobs = jobs.filter(job => job.status === "Active").length
    const applications = jobs.reduce((sum, job) => sum + job.applications, 0)
    const views = jobs.reduce((sum, job) => sum + job.views, 0)
    
    // Calculate top skills
    const skillCounts: { [key: string]: number } = {}
    jobs.forEach(job => {
      job.skills.forEach(skill => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1
      })
    })
    const topSkills = Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Calculate top locations
    const locationCounts: { [key: string]: number } = {}
    jobs.forEach(job => {
      locationCounts[job.location] = (locationCounts[job.location] || 0) + 1
    })
    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Calculate top industries
    const industryCounts: { [key: string]: number } = {}
    jobs.forEach(job => {
      industryCounts[job.industry] = (industryCounts[job.industry] || 0) + 1
    })
    const topIndustries = Object.entries(industryCounts)
      .map(([industry, count]) => ({ industry, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalJobs,
      activeJobs,
      applications,
      views,
      avgTimeToHire: 30, // Mock data
      conversionRate: applications > 0 ? (activeJobs / applications) * 100 : 0,
      topSkills,
      topLocations,
      topIndustries
    }
  }
}
