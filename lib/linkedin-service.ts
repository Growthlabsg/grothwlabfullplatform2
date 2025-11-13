import type { User } from "@/types/auth"

// Define LinkedIn profile data structure
export interface LinkedInProfile {
  id: string
  firstName: string
  lastName: string
  headline: string
  profilePicture?: string
  email?: string
  industry?: string
  summary?: string
  location?: {
    country: string
    city?: string
  }
  positions: {
    id: string
    title: string
    company: string
    startDate: {
      month: number
      year: number
    }
    endDate?: {
      month: number
      year: number
    }
    description?: string
    location?: string
  }[]
  education: {
    id: string
    school: string
    degree?: string
    fieldOfStudy?: string
    startDate?: {
      year: number
    }
    endDate?: {
      year: number
    }
    activities?: string
  }[]
  skills: {
    id: string
    name: string
    endorsements?: number
  }[]
  certifications: {
    id: string
    name: string
    authority?: string
    licenseNumber?: string
    startDate?: {
      month?: number
      year: number
    }
    endDate?: {
      month?: number
      year: number
    }
  }[]
}

// Mock LinkedIn OAuth configuration
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || "mock-client-id"
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || "mock-client-secret"
const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`
  : "http://localhost:3000/api/auth/linkedin/callback"

// Mock LinkedIn profile data
const mockLinkedInProfile: LinkedInProfile = {
  id: "linkedin123456",
  firstName: "John",
  lastName: "Doe",
  headline: "Founder & CEO at TechStartup | Software Engineer | Entrepreneur",
  profilePicture: "/professional-chinese-man.png",
  email: "john.doe@example.com",
  industry: "Information Technology",
  summary:
    "Experienced software engineer and entrepreneur with a passion for building innovative products. Currently leading TechStartup, focusing on AI-powered solutions for businesses.",
  location: {
    country: "Singapore",
    city: "Singapore",
  },
  positions: [
    {
      id: "pos1",
      title: "Founder & CEO",
      company: "TechStartup",
      startDate: {
        month: 1,
        year: 2020,
      },
      description:
        "Leading a team of developers building AI-powered solutions for businesses. Responsible for product strategy, fundraising, and team management.",
      location: "Singapore",
    },
    {
      id: "pos2",
      title: "Senior Software Engineer",
      company: "Tech Corporation",
      startDate: {
        month: 6,
        year: 2017,
      },
      endDate: {
        month: 12,
        year: 2019,
      },
      description:
        "Led the development of cloud-based solutions. Managed a team of 5 engineers and collaborated with product managers to deliver features on time.",
      location: "Singapore",
    },
    {
      id: "pos3",
      title: "Software Engineer",
      company: "StartupX",
      startDate: {
        month: 3,
        year: 2015,
      },
      endDate: {
        month: 5,
        year: 2017,
      },
      description:
        "Developed web applications using React and Node.js. Implemented CI/CD pipelines and improved code quality.",
      location: "Singapore",
    },
  ],
  education: [
    {
      id: "edu1",
      school: "National University of Singapore",
      degree: "Master's Degree",
      fieldOfStudy: "Computer Science",
      startDate: {
        year: 2013,
      },
      endDate: {
        year: 2015,
      },
      activities: "AI Research Group, Hackathon Organizer",
    },
    {
      id: "edu2",
      school: "Singapore Polytechnic",
      degree: "Bachelor's Degree",
      fieldOfStudy: "Software Engineering",
      startDate: {
        year: 2010,
      },
      endDate: {
        year: 2013,
      },
      activities: "Programming Club, Student Council",
    },
  ],
  skills: [
    {
      id: "skill1",
      name: "JavaScript",
      endorsements: 42,
    },
    {
      id: "skill2",
      name: "React",
      endorsements: 38,
    },
    {
      id: "skill3",
      name: "Node.js",
      endorsements: 35,
    },
    {
      id: "skill4",
      name: "Product Management",
      endorsements: 27,
    },
    {
      id: "skill5",
      name: "Team Leadership",
      endorsements: 31,
    },
    {
      id: "skill6",
      name: "Entrepreneurship",
      endorsements: 24,
    },
  ],
  certifications: [
    {
      id: "cert1",
      name: "AWS Certified Solutions Architect",
      authority: "Amazon Web Services",
      licenseNumber: "AWS-123456",
      startDate: {
        month: 5,
        year: 2019,
      },
      endDate: {
        month: 5,
        year: 2022,
      },
    },
    {
      id: "cert2",
      name: "Certified Scrum Master",
      authority: "Scrum Alliance",
      licenseNumber: "CSM-789012",
      startDate: {
        year: 2018,
      },
    },
  ],
}

export const LinkedInService = {
  // Generate LinkedIn OAuth URL
  getAuthUrl: (): string => {
    const scope = encodeURIComponent("r_liteprofile r_emailaddress w_member_social")
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      LINKEDIN_REDIRECT_URI,
    )}&scope=${scope}&state=${Math.random().toString(36).substring(2, 15)}`
  },

  // Exchange authorization code for access token
  getAccessToken: async (code: string): Promise<string> => {
    // In a real app, this would make an API call to LinkedIn
    console.log("Exchanging code for access token:", code)

    // Mock successful token exchange
    return "mock-access-token"
  },

  // Get LinkedIn profile data
  getProfile: async (accessToken: string): Promise<LinkedInProfile> => {
    // In a real app, this would make API calls to LinkedIn
    console.log("Getting LinkedIn profile with token:", accessToken)

    // Return mock profile data
    return mockLinkedInProfile
  },

  // Map LinkedIn profile to user data
  mapProfileToUser: (profile: LinkedInProfile): Partial<User> => {
    return {
      displayName: `${profile.firstName} ${profile.lastName}`,
      email: profile.email || "",
      designation: profile.headline,
      avatarUrl: profile.profilePicture,
      // Add other fields as needed
    }
  },
}
