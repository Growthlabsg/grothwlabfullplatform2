"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CofounderProfile {
  id: string
  name: string
  location: string
  experience: string
  availability: string
  skills: string[]
  values: string[]
  goals: string[]
  education: string
  previousStartups: number
  isVerified: boolean
  isPremium: boolean
  compatibilityScore: number
  matchQuality: string
  industry: string[]
  commitment: string
  lastActive: Date
  bio: string
  achievements: string[]
  lookingFor: string
  timezone: string
  languages: string[]
  linkedin?: string
  github?: string
  twitter?: string
  portfolio?: string
  behance?: string
  researchgate?: string
  mutualConnections?: number
  sharedInterests?: string[]
  fundingRaised?: string
  [key: string]: any
}

interface CofounderContextType {
  profiles: CofounderProfile[]
  setProfiles: (profiles: CofounderProfile[]) => void
  savedProfiles: string[]
  setSavedProfiles: (profiles: string[]) => void
  connectionRequests: string[]
  setConnectionRequests: (requests: string[]) => void
  conversations: any[]
  setConversations: (conversations: any[]) => void
  addProfile: (profile: CofounderProfile) => void
  updateProfile: (id: string, updates: Partial<CofounderProfile>) => void
  deleteProfile: (id: string) => void
  saveProfile: (profileId: string) => void
  unsaveProfile: (profileId: string) => void
  sendConnectionRequest: (profileId: string) => void
  acceptConnectionRequest: (profileId: string) => void
  rejectConnectionRequest: (profileId: string) => void
  sendMessage: (profileId: string, message: string) => void
  getProfileById: (id: string) => CofounderProfile | undefined
  isProfileSaved: (profileId: string) => boolean
  hasConnectionRequest: (profileId: string) => boolean
  getConversation: (profileId: string) => any
}

const CofounderContext = createContext<CofounderContextType | undefined>(undefined)

export const useCofounder = () => {
  const context = useContext(CofounderContext)
  if (context === undefined) {
    throw new Error('useCofounder must be used within a CofounderProvider')
  }
  return context
}

// Mock data for demonstration
const MOCK_PROFILES: CofounderProfile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    location: "Singapore",
    experience: "expert",
    availability: "full-time",
    skills: ["programming", "data-science", "product-management", "finance"],
    values: ["innovation", "social-impact", "excellence"],
    goals: ["build-unicorn", "global-impact", "mentor-others"],
    education: "Stanford University",
    previousStartups: 2,
    isVerified: true,
    isPremium: true,
    compatibilityScore: 0.92,
    matchQuality: "excellent",
    industry: ["Artificial Intelligence", "Fintech"],
    commitment: "high",
    lastActive: new Date(),
    bio: "Former Google engineer with 2 successful exits. Passionate about AI and social impact.",
    achievements: ["Built $50M ARR SaaS", "GrowthLab Alumni"],
    lookingFor: "Technical co-founder for AI-powered fintech",
    timezone: "UTC+8",
    languages: ["English", "Mandarin"],
    linkedin: "https://linkedin.com/in/sarahchen",
    github: "https://github.com/sarahchen",
    portfolio: "https://sarahchen.dev"
  },
  {
    id: "2",
    name: "Alex Rodriguez",
    location: "San Francisco",
    experience: "intermediate",
    availability: "full-time",
    skills: ["sales", "marketing", "operations", "strategy"],
    values: ["growth", "collaboration", "quality"],
    goals: ["scale-startup", "build-team", "market-leadership"],
    education: "UC Berkeley",
    previousStartups: 1,
    isVerified: true,
    isPremium: false,
    compatibilityScore: 0.78,
    matchQuality: "good",
    industry: ["B2B/Enterprise", "SaaS"],
    commitment: "high",
    lastActive: new Date(),
    bio: "Sales leader with experience scaling B2B startups from 0 to $10M ARR.",
    achievements: ["Led sales at 3 startups", "MBA from Haas"],
    lookingFor: "Technical co-founder for B2B SaaS",
    timezone: "UTC-8",
    languages: ["English", "Spanish"],
    linkedin: "https://linkedin.com/in/alexrodriguez",
    twitter: "https://twitter.com/alexrodriguez"
  },
  {
    id: "3",
    name: "Priya Patel",
    location: "Bangalore",
    experience: "beginner",
    availability: "part-time",
    skills: ["design", "content", "research", "user-research"],
    values: ["impact", "education", "community"],
    goals: ["help-students", "improve-healthcare", "social-impact"],
    education: "IIT Delhi",
    previousStartups: 0,
    isVerified: false,
    isPremium: false,
    compatibilityScore: 0.65,
    matchQuality: "fair",
    industry: ["Education/Edtech", "Healthcare"],
    commitment: "medium",
    lastActive: new Date(),
    bio: "UX designer passionate about making education accessible to everyone.",
    achievements: ["Designed apps used by 1M+ students"],
    lookingFor: "Technical co-founder for edtech startup",
    timezone: "UTC+5:30",
    languages: ["English", "Hindi"],
    linkedin: "https://linkedin.com/in/priyapatel",
    behance: "https://behance.net/priyapatel"
  },
  {
    id: "4",
    name: "Marcus Johnson",
    location: "New York",
    experience: "expert",
    availability: "full-time",
    skills: ["blockchain", "smart-contracts", "defi", "cryptography"],
    values: ["decentralization", "transparency", "innovation"],
    goals: ["revolutionize-finance", "build-web3", "global-adoption"],
    education: "MIT",
    previousStartups: 3,
    isVerified: true,
    isPremium: true,
    compatibilityScore: 0.88,
    matchQuality: "excellent",
    industry: ["Blockchain", "Fintech"],
    commitment: "high",
    lastActive: new Date(),
    bio: "Blockchain architect with 3 successful DeFi protocols. Building the future of finance.",
    achievements: ["Built $100M+ DeFi protocols", "Ethereum core contributor"],
    lookingFor: "Business co-founder for DeFi startup",
    timezone: "UTC-5",
    languages: ["English"],
    linkedin: "https://linkedin.com/in/marcusjohnson",
    github: "https://github.com/marcusjohnson"
  },
  {
    id: "5",
    name: "Emma Wilson",
    location: "London",
    experience: "intermediate",
    availability: "full-time",
    skills: ["biotech", "research", "lab-management", "regulatory"],
    values: ["scientific-rigor", "patient-impact", "collaboration"],
    goals: ["cure-diseases", "improve-healthcare", "scientific-breakthrough"],
    education: "Oxford University",
    previousStartups: 1,
    isVerified: true,
    isPremium: false,
    compatibilityScore: 0.82,
    matchQuality: "good",
    industry: ["Biomedical/Biotech", "Healthcare"],
    commitment: "high",
    lastActive: new Date(),
    bio: "Biotech researcher with breakthrough in cancer detection. Ready to commercialize.",
    achievements: ["Published 15+ papers", "Patent holder"],
    lookingFor: "Technical co-founder for biotech startup",
    timezone: "UTC+0",
    languages: ["English", "French"],
    linkedin: "https://linkedin.com/in/emmawilson",
    researchgate: "https://researchgate.net/emma-wilson"
  }
]

export const CofounderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<CofounderProfile[]>(MOCK_PROFILES)
  const [savedProfiles, setSavedProfiles] = useState<string[]>([])
  const [connectionRequests, setConnectionRequests] = useState<string[]>([])
  const [conversations, setConversations] = useState<any[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfilesData = localStorage.getItem('cofounder-saved-profiles')
    const connectionRequestsData = localStorage.getItem('cofounder-connection-requests')
    const conversationsData = localStorage.getItem('cofounder-conversations')
    
    if (savedProfilesData) {
      setSavedProfiles(JSON.parse(savedProfilesData))
    }
    if (connectionRequestsData) {
      setConnectionRequests(JSON.parse(connectionRequestsData))
    }
    if (conversationsData) {
      setConversations(JSON.parse(conversationsData))
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cofounder-saved-profiles', JSON.stringify(savedProfiles))
  }, [savedProfiles])

  useEffect(() => {
    localStorage.setItem('cofounder-connection-requests', JSON.stringify(connectionRequests))
  }, [connectionRequests])

  useEffect(() => {
    localStorage.setItem('cofounder-conversations', JSON.stringify(conversations))
  }, [conversations])

  const addProfile = (profile: CofounderProfile) => {
    setProfiles(prev => [...prev, profile])
  }

  const updateProfile = (id: string, updates: Partial<CofounderProfile>) => {
    setProfiles(prev => prev.map(profile => 
      profile.id === id ? { ...profile, ...updates } : profile
    ))
  }

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id))
    setSavedProfiles(prev => prev.filter(profileId => profileId !== id))
    setConnectionRequests(prev => prev.filter(profileId => profileId !== id))
  }

  const saveProfile = (profileId: string) => {
    if (!savedProfiles.includes(profileId)) {
      setSavedProfiles(prev => [...prev, profileId])
    }
  }

  const unsaveProfile = (profileId: string) => {
    setSavedProfiles(prev => prev.filter(id => id !== profileId))
  }

  const sendConnectionRequest = (profileId: string) => {
    if (!connectionRequests.includes(profileId)) {
      setConnectionRequests(prev => [...prev, profileId])
    }
  }

  const acceptConnectionRequest = (profileId: string) => {
    setConnectionRequests(prev => prev.filter(id => id !== profileId))
    // Add to conversations if not already exists
    if (!conversations.find(conv => conv.profileId === profileId)) {
      setConversations(prev => [...prev, {
        profileId,
        messages: [],
        lastMessage: null,
        unreadCount: 0
      }])
    }
  }

  const rejectConnectionRequest = (profileId: string) => {
    setConnectionRequests(prev => prev.filter(id => id !== profileId))
  }

  const sendMessage = (profileId: string, message: string) => {
    const conversation = conversations.find(conv => conv.profileId === profileId)
    const newMessage = {
      id: Date.now().toString(),
      text: message,
      timestamp: new Date(),
      sender: 'user'
    }

    if (conversation) {
      setConversations(prev => prev.map(conv => 
        conv.profileId === profileId 
          ? { ...conv, messages: [...conv.messages, newMessage], lastMessage: newMessage }
          : conv
      ))
    } else {
      setConversations(prev => [...prev, {
        profileId,
        messages: [newMessage],
        lastMessage: newMessage,
        unreadCount: 0
      }])
    }
  }

  const getProfileById = (id: string) => {
    return profiles.find(profile => profile.id === id)
  }

  const isProfileSaved = (profileId: string) => {
    return savedProfiles.includes(profileId)
  }

  const hasConnectionRequest = (profileId: string) => {
    return connectionRequests.includes(profileId)
  }

  const getConversation = (profileId: string) => {
    return conversations.find(conv => conv.profileId === profileId)
  }

  const value: CofounderContextType = {
    profiles,
    setProfiles,
    savedProfiles,
    setSavedProfiles,
    connectionRequests,
    setConnectionRequests,
    conversations,
    setConversations,
    addProfile,
    updateProfile,
    deleteProfile,
    saveProfile,
    unsaveProfile,
    sendConnectionRequest,
    acceptConnectionRequest,
    rejectConnectionRequest,
    sendMessage,
    getProfileById,
    isProfileSaved,
    hasConnectionRequest,
    getConversation
  }

  return (
    <CofounderContext.Provider value={value}>
      {children}
    </CofounderContext.Provider>
  )
}
