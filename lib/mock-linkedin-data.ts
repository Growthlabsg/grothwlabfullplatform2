// Mock data for LinkedIn-style features

export interface LinkedInPerson {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  mutualConnections: number
  skills: string[]
  location: string
  verified: boolean
  onlineStatus: "online" | "offline" | "away"
  lastActive: string
  connectionStrength: number // 1-5 scale
  sharedInterests: string[]
  recentActivity: string
  coverImage?: string
  bio?: string
  achievements?: string[]
}

export interface LinkedInSkill {
  id: string
  personId: string
  personName: string
  skill: string
  mutualConnections: number
  endorsed: boolean
  endorsementCount: number
  skillLevel: "beginner" | "intermediate" | "expert"
  category: string
  lastEndorsed?: string
  skillIcon?: string
}

export interface LinkedInCompany {
  id: string
  name: string
  industry: string
  followers: number
  growth: string
  recentUpdate: string
  logo: string
  verified: boolean
  employeeCount: number
  founded: string
  headquarters: string
  website: string
  recentPosts: number
  engagementRate: number
  topSkills: string[]
  coverImage?: string
  description?: string
  mission?: string
}

export interface LinkedInLearning {
  id: string
  title: string
  instructor: string
  duration: string
  progress: number
  category: string
  thumbnail: string
  rating: number
  enrolledStudents: number
  difficulty: "beginner" | "intermediate" | "advanced"
  completionRate: number
  certificates: boolean
  lastAccessed: string
  nextLesson: string
  timeSpent: string
  preview?: string
  tags?: string[]
}

export interface LinkedInJob {
  id: string
  title: string
  company: string
  location: string
  type: string
  postedDate: string
  applicants: number
  salary: string
  skills: string[]
  experience: string
  remote: boolean
  benefits: string[]
  companyRating: number
  applicationDeadline: string
  urgent: boolean
  savedCount: number
  companyLogo?: string
  jobImage?: string
  description?: string
}

export interface LinkedInTrendingTopic {
  id: string
  tag: string
  postCount: number
  engagement: number
  trend: string
  category: string
  relatedTopics: string[]
  topPosts: number
  influencerCount: number
  growthRate: number
  lastUpdated: string
  topicImage?: string
  description?: string
}

export interface LinkedInEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: number
  category: string
  description: string
  image: string
  organizer: string
  price: string
  registrationDeadline: string
  maxCapacity: number
  virtual: boolean
  tags: string[]
  featured: boolean
  coverImage?: string
  speakerImages?: string[]
  agenda?: string[]
}

export interface LinkedInGroup {
  id: string
  name: string
  members: number
  avatar: string
  category: string
  description: string
  recentActivity: string
  rules: string[]
  privacy: "public" | "private" | "secret"
  createdDate: string
  activeMembers: number
  weeklyPosts: number
  moderators: string[]
  topics: string[]
  coverImage?: string
  featuredImage?: string
}

export interface LinkedInPost {
  id: string
  author: LinkedInPerson
  content: string
  timestamp: string
  likes: number
  comments: number
  reposts: number
  shares: number
  views: number
  tags: string[]
  image?: string
  video?: string
  article?: string
  sponsored: boolean
  promoted: boolean
  engagement: number
  reach: number
  impressions: number
  clickThroughRate: number
  timeSpent: number
  reactions: {
    like: number
    love: number
    celebrate: number
    support: number
    insightful: number
    funny: number
  }
  commentsList: LinkedInComment[]
  savedBy: number
  bookmarked: boolean
  postImage?: string
  carouselImages?: string[]
}

export interface LinkedInComment {
  id: string
  author: LinkedInPerson
  content: string
  timestamp: string
  likes: number
  replies: number
  edited: boolean
  parentId?: string
  authorAvatar?: string
}

export interface LinkedInNotification {
  id: string
  type: "connection" | "mention" | "like" | "comment" | "repost" | "follow" | "job" | "event" | "learning"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired: boolean
  relatedId?: string
  priority: "low" | "medium" | "high"
  sender: LinkedInPerson
  notificationImage?: string
}

export interface LinkedInAnalytics {
  profileViews: number
  postImpressions: number
  searchAppearances: number
  connectionRequests: number
  profileCompleteness: number
  weeklyGrowth: number
  topPosts: LinkedInPost[]
  audienceInsights: {
    demographics: Record<string, number>
    locations: Record<string, number>
    industries: Record<string, number>
    interests: string[]
  }
  engagementMetrics: {
    averageLikes: number
    averageComments: number
    averageShares: number
    bestPostingTimes: string[]
    topPerformingContent: string[]
  }
  chartData?: {
    views: number[]
    engagement: number[]
    growth: number[]
    dates: string[]
  }
}

// Enhanced Mock People You May Know
export const mockPeopleYouMayKnow: LinkedInPerson[] = [
    {
    id: "1",
    name: "Dr. Emily Chen",
    role: "AI Research Lead",
    company: "TechCorp",
    avatar: "/sarah-chen.png",
  mutualConnections: 3,
  skills: ["AI", "Machine Learning", "Research", "Python", "TensorFlow"],
  location: "Singapore",
  verified: true,
  onlineStatus: "online",
  lastActive: "2 minutes ago",
  connectionStrength: 4,
  sharedInterests: ["AI", "Healthcare", "Innovation"],
  recentActivity: "Published research paper on AI in healthcare",
  coverImage: "/abstract-geometric-shapes.png",
  bio: "Leading AI research in healthcare technology. Passionate about using machine learning to solve real-world medical challenges.",
  achievements: ["Top 100 AI Researchers 2023", "Healthcare Innovation Award", "15+ Research Papers Published"]
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "StartupXYZ",
    avatar: "/diverse-group-conversation.png",
    mutualConnections: 5,
    skills: ["Product Strategy", "UX", "Agile", "Data Analysis", "User Research"],
    location: "Singapore",
    verified: false,
    onlineStatus: "away",
    lastActive: "1 hour ago",
    connectionStrength: 3,
    sharedInterests: ["Product Management", "Startups", "User Experience"],
    recentActivity: "Launched new product feature",
    coverImage: "/startup-founders.png",
    bio: "Product leader with 8+ years experience building user-centric products. Former Google PM, now helping startups scale.",
    achievements: ["Product of the Year 2022", "Led 3 successful product launches", "Mentored 20+ PMs"]
  },
  {
    id: "3",
    name: "Sarah Kim",
    role: "UX Designer",
    company: "DesignStudio",
    avatar: "/diverse-group-meeting.png",
    mutualConnections: 2,
    skills: ["UI/UX", "Design Systems", "Prototyping", "Figma", "User Testing"],
    location: "Singapore",
    verified: false,
    onlineStatus: "offline",
    lastActive: "3 hours ago",
    connectionStrength: 2,
    sharedInterests: ["Design", "Creativity", "User Experience"],
    recentActivity: "Updated portfolio with new projects",
    coverImage: "/diverse-person-portrait.png",
    bio: "Creative UX designer focused on creating meaningful digital experiences. Specializing in fintech and healthcare design.",
    achievements: ["Design Excellence Award 2023", "Featured in Design Weekly", "100+ Projects Completed"]
  },
  {
    id: "4",
    name: "David Kumar",
    role: "Startup Advisor",
    company: "GrowthLab",
    avatar: "/alex-wong.png",
    mutualConnections: 7,
    skills: ["Startup Strategy", "Fundraising", "Mentoring", "Business Development", "Networking"],
    location: "Singapore",
    verified: true,
    onlineStatus: "online",
    lastActive: "5 minutes ago",
    connectionStrength: 5,
    sharedInterests: ["Startups", "Innovation", "Mentoring"],
    recentActivity: "Hosted startup pitch competition",
    coverImage: "/abstract-geometric-shapes.png",
    bio: "Serial entrepreneur turned startup advisor. Helped 50+ startups raise $200M+ in funding. Building the next generation of unicorns.",
    achievements: ["Entrepreneur of the Year 2021", "Advised 50+ Startups", "$200M+ Funding Raised"]
  },
  {
    id: "5",
    name: "Lisa Tan",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "/diverse-person-portrait.png",
    mutualConnections: 4,
    skills: ["Product Management", "Data Analysis", "User Research", "A/B Testing", "Growth Hacking"],
    location: "Singapore",
    verified: false,
    onlineStatus: "away",
    lastActive: "30 minutes ago",
    connectionStrength: 3,
    sharedInterests: ["Product Strategy", "Data", "Growth"],
    recentActivity: "Analyzed user behavior data",
    coverImage: "/startup-founders.png",
    bio: "Data-driven PM with expertise in growth and analytics. Building products that users love and businesses need.",
    achievements: ["Growth PM of the Year", "Increased User Engagement 300%", "Led 5 Product Launches"]
  }
]

// Enhanced Mock Skills to Endorse
export const mockSkillsToEndorse: LinkedInSkill[] = [
  {
    id: "1",
    personId: "1",
    personName: "Alex Wong",
    skill: "React.js",
    mutualConnections: 3,
    endorsed: false,
    endorsementCount: 12,
    skillLevel: "expert",
    category: "Frontend Development",
    lastEndorsed: undefined,
    skillIcon: "/diverse-group-conversation.png"
  },
  {
    id: "2",
    personId: "2",
    personName: "Michelle Tan",
    skill: "Product Strategy",
    mutualConnections: 2,
    endorsed: false,
    endorsementCount: 8,
    skillLevel: "intermediate",
    category: "Product Management",
    lastEndorsed: undefined,
    skillIcon: "/startup-founders.png"
  },
  {
    id: "3",
    personId: "3",
    personName: "Raj Patel",
    skill: "Investment Analysis",
    mutualConnections: 6,
    endorsed: false,
    endorsementCount: 15,
    skillLevel: "expert",
    category: "Finance",
    lastEndorsed: undefined,
    skillIcon: "/abstract-geometric-shapes.png"
  },
  {
    id: "4",
    personId: "4",
    personName: "Emma Wong",
    skill: "Python",
    mutualConnections: 4,
    endorsed: false,
    endorsementCount: 9,
    skillLevel: "intermediate",
    category: "Programming",
    lastEndorsed: undefined,
    skillIcon: "/diverse-group-meeting.png"
  }
]

// Enhanced Mock Companies
export const mockCompanies: LinkedInCompany[] = [
  {
    id: "1",
    name: "TechInnovate",
    industry: "Healthcare Technology",
    followers: 2400,
    growth: "+12%",
    recentUpdate: "Just posted 3 new job openings",
    logo: "/startup-founders.png",
    verified: true,
    employeeCount: 150,
    founded: "2020",
    headquarters: "Singapore",
    website: "techinnovate.sg",
    recentPosts: 12,
    engagementRate: 4.2,
    topSkills: ["AI", "Healthcare", "Machine Learning", "Data Science"],
    coverImage: "/abstract-geometric-shapes.png",
    description: "Revolutionizing healthcare through AI-powered diagnostics and patient care solutions.",
    mission: "Making healthcare accessible, accurate, and affordable for everyone through technology."
  },
  {
    id: "2",
    name: "GrowthLab",
    industry: "Education Technology",
    followers: 15200,
    growth: "+8%",
    recentUpdate: "Announced new mentorship program",
    logo: "/abstract-geometric-shapes.png",
    verified: true,
    employeeCount: 85,
    founded: "2018",
    headquarters: "Singapore",
    website: "growthlab.sg",
    recentPosts: 28,
    engagementRate: 6.8,
    topSkills: ["Education", "Mentoring", "Startup Support", "Networking"],
    coverImage: "/startup-founders.png",
    description: "Empowering entrepreneurs and startups through education, mentorship, and networking opportunities.",
    mission: "Building Asia's next generation of successful entrepreneurs and innovative startups."
  },
  {
    id: "3",
    name: "StartupXYZ",
    industry: "Fintech",
    followers: 8900,
    growth: "+15%",
    recentUpdate: "Secured Series A funding",
    logo: "/diverse-group-conversation.png",
    verified: false,
    employeeCount: 75,
    founded: "2021",
    headquarters: "Singapore",
    website: "startupxyz.sg",
    recentPosts: 18,
    engagementRate: 5.1,
    topSkills: ["Fintech", "Blockchain", "Payments", "RegTech"],
    coverImage: "/diverse-group-meeting.png",
    description: "Building the future of digital payments and financial services for Southeast Asia.",
    mission: "Democratizing financial services and making banking accessible to everyone."
  },
  {
    id: "4",
    name: "DesignStudio",
    industry: "Creative Services",
    followers: 5600,
    growth: "+6%",
    recentUpdate: "Launched new design system",
    logo: "/diverse-group-meeting.png",
    verified: false,
    employeeCount: 45,
    founded: "2019",
    headquarters: "Singapore",
    website: "designstudio.sg",
    recentPosts: 9,
    engagementRate: 3.9,
    topSkills: ["Design", "Creativity", "Branding", "User Experience"],
    coverImage: "/diverse-person-portrait.png",
    description: "Creating beautiful, functional, and user-centered design solutions for modern businesses.",
    mission: "Designing experiences that connect brands with their audiences in meaningful ways."
  }
]

// Enhanced Mock Learning Content
export const mockLearningContent: LinkedInLearning[] = [
  {
    id: "1",
    title: "Startup Funding Strategies",
    instructor: "David Kumar",
    duration: "2h 15m",
    progress: 35,
    category: "Business",
    thumbnail: "/startup-founders.png",
    rating: 4.8,
    enrolledStudents: 1247,
    difficulty: "intermediate",
    completionRate: 78,
    certificates: true,
    lastAccessed: "2 hours ago",
    nextLesson: "Valuation Methods",
    timeSpent: "45 minutes",
    preview: "Learn proven strategies to secure funding for your startup, from seed to Series A and beyond.",
    tags: ["funding", "startup", "investment", "pitching", "venture capital"],
    preview: "Learn proven strategies to secure funding for your startup, from seed to Series A and beyond.",
    tags: ["funding", "startup", "investment", "pitching", "venture capital"]
  },
  {
    id: "2",
    title: "Product-Market Fit Mastery",
    instructor: "Sarah Chen",
    duration: "1h 45m",
    progress: 65,
    category: "Product",
    thumbnail: "/diverse-person-portrait.png",
    rating: 4.9,
    enrolledStudents: 892,
    difficulty: "advanced",
    completionRate: 82,
    certificates: true,
    lastAccessed: "1 hour ago",
    nextLesson: "Customer Discovery",
    timeSpent: "1 hour 10 minutes",
    preview: "Master the art of finding and validating product-market fit for sustainable business growth.",
    tags: ["product-market fit", "customer discovery", "validation", "growth", "strategy"]
  },
  {
    id: "3",
    title: "AI for Startups",
    instructor: "Dr. Emily Chen",
    duration: "3h 20m",
    progress: 20,
    category: "Technology",
    thumbnail: "/abstract-geometric-shapes.png",
    rating: 4.7,
    enrolledStudents: 2156,
    difficulty: "beginner",
    completionRate: 71,
    certificates: true,
    lastAccessed: "4 hours ago",
    nextLesson: "Machine Learning Basics",
    timeSpent: "40 minutes",
    preview: "Discover how to leverage AI and machine learning to give your startup a competitive edge.",
    tags: ["AI", "machine learning", "startup", "technology", "innovation"]
  },
  {
    id: "4",
    title: "UX Design Fundamentals",
    instructor: "Sarah Kim",
    duration: "2h 30m",
    progress: 80,
    category: "Design",
    thumbnail: "/diverse-group-meeting.png",
    rating: 4.6,
    enrolledStudents: 1678,
    difficulty: "beginner",
    completionRate: 89,
    certificates: true,
    lastAccessed: "30 minutes ago",
    nextLesson: "Prototyping",
    timeSpent: "2 hours",
    preview: "Learn the fundamentals of user experience design and create products users love.",
    tags: ["UX design", "user experience", "design thinking", "prototyping", "usability"]
  }
]

// Enhanced Mock Jobs
export const mockJobs: LinkedInJob[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechStartup Inc.",
    location: "Singapore",
    type: "Full-time",
    postedDate: "2 days ago",
    applicants: 24,
    salary: "$6,000 - $8,000",
    skills: ["React", "TypeScript", "Node.js"],
    experience: "3-5 years",
    remote: false,
    benefits: ["Health Insurance", "Stock Options", "Flexible Hours"],
    companyRating: 4.2,
    applicationDeadline: "2024-06-15",
    urgent: true,
    savedCount: 45,
    companyLogo: "/startup-founders.png",
    jobImage: "/abstract-geometric-shapes.png",
    description: "Join our fast-growing team to build cutting-edge web applications that millions of users love."
  },
  {
    id: "2",
    title: "Product Manager",
    company: "GrowthLab",
    location: "Remote",
    type: "Full-time",
    postedDate: "1 week ago",
    applicants: 18,
    salary: "$7,000 - $9,000",
    skills: ["Product Strategy", "Data Analysis", "Agile"],
    experience: "5-7 years",
    remote: true,
    benefits: ["Remote Work", "Health Insurance", "Learning Budget"],
    companyRating: 4.8,
    applicationDeadline: "2024-06-30",
    urgent: false,
    savedCount: 32,
    companyLogo: "/abstract-geometric-shapes.png",
    jobImage: "/startup-founders.png",
    description: "Lead product strategy and execution for our education technology platform serving thousands of entrepreneurs."
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "Creative Agency",
    location: "Singapore",
    type: "Contract",
    postedDate: "3 days ago",
    applicants: 31,
    salary: "$4,000 - $6,000",
    skills: ["Figma", "Prototyping", "User Research"],
    experience: "2-4 years",
    remote: false,
    benefits: ["Flexible Hours", "Creative Freedom"],
    companyRating: 4.0,
    applicationDeadline: "2024-06-20",
    urgent: false,
    savedCount: 28,
    companyLogo: "/diverse-group-meeting.png",
    jobImage: "/diverse-person-portrait.png",
    description: "Create stunning user experiences and beautiful interfaces for our diverse client portfolio."
  },
  {
    id: "4",
    title: "AI Research Engineer",
    company: "TechCorp",
    location: "Singapore",
    type: "Full-time",
    postedDate: "5 days ago",
    applicants: 12,
    salary: "$8,000 - $12,000",
    skills: ["Python", "TensorFlow", "Machine Learning"],
    experience: "4-6 years",
    remote: false,
    benefits: ["Health Insurance", "Research Budget", "Conference Attendance"],
    companyRating: 4.5,
    applicationDeadline: "2024-07-01",
    urgent: true,
    savedCount: 67,
    companyLogo: "/diverse-group-conversation.png",
    jobImage: "/abstract-geometric-shapes.png",
    description: "Research and develop cutting-edge AI solutions that will transform industries and improve lives."
  }
]

// Enhanced Mock Trending Topics
export const mockTrendingTopics: LinkedInTrendingTopic[] = [
  {
    id: "1",
    tag: "#startup",
    postCount: 2,
    engagement: 292,
    trend: "+12%",
    category: "Business",
    relatedTopics: ["#entrepreneurship", "#innovation", "#funding"],
    topPosts: 15,
    influencerCount: 8,
    growthRate: 12.5,
    lastUpdated: "2 hours ago",
    topicImage: "/startup-founders.png",
    description: "Latest discussions about startup culture, funding, and entrepreneurship in Asia"
  },
  {
    id: "2",
    tag: "#funding",
    postCount: 2,
    engagement: 520,
    trend: "+8%",
    category: "Finance",
    relatedTopics: ["#startup", "#investment", "#venturecapital"],
    topPosts: 23,
    influencerCount: 12,
    growthRate: 8.2,
    lastUpdated: "1 hour ago",
    topicImage: "/abstract-geometric-shapes.png",
    description: "Insights and discussions about startup funding, investments, and financial strategies"
  },
  {
    id: "3",
    tag: "#entrepreneurship",
    postCount: 2,
    engagement: 520,
    trend: "+15%",
    category: "Business",
    relatedTopics: ["#startup", "#business", "#leadership"],
    topPosts: 31,
    influencerCount: 18,
    growthRate: 15.7,
    lastUpdated: "3 hours ago",
    topicImage: "/diverse-group-conversation.png",
    description: "Stories and advice from successful entrepreneurs and business leaders"
  },
  {
    id: "4",
    tag: "#healthtech",
    postCount: 2,
    engagement: 399,
    trend: "+23%",
    category: "Technology",
    relatedTopics: ["#healthcare", "#AI", "#innovation"],
    topPosts: 19,
    influencerCount: 11,
    growthRate: 23.1,
    lastUpdated: "4 hours ago",
    topicImage: "/diverse-group-meeting.png",
    description: "Latest innovations and discussions in healthcare technology and digital health"
  },
  {
    id: "5",
    tag: "#AI",
    postCount: 1,
    engagement: 178,
    trend: "+31%",
    category: "Technology",
    relatedTopics: ["#machinelearning", "#technology", "#innovation"],
    topPosts: 27,
    influencerCount: 15,
    growthRate: 31.4,
    lastUpdated: "5 hours ago",
    topicImage: "/abstract-geometric-shapes.png",
    description: "Cutting-edge developments in artificial intelligence and machine learning"
  },
  {
    id: "6",
    tag: "#innovation",
    postCount: 5,
    engagement: 973,
    trend: "+18%",
    category: "Technology",
    relatedTopics: ["#startup", "#technology", "#creativity"],
    topPosts: 42,
    influencerCount: 25,
    growthRate: 18.9,
    lastUpdated: "1 hour ago",
    topicImage: "/startup-founders.png",
    description: "Creative solutions and breakthrough innovations across all industries"
  }
]

// Enhanced Mock Events
export const mockEvents: LinkedInEvent[] = [
  {
    id: "1",
    title: "Startup Networking Mixer",
    date: "Tomorrow",
    time: "7:00 PM",
    location: "Singapore",
    attendees: 45,
    category: "Networking",
    description: "Connect with fellow entrepreneurs and investors",
    image: "/startup-founders.png",
    organizer: "GrowthLab",
    price: "Free",
    registrationDeadline: "Today 6:00 PM",
    maxCapacity: 100,
    virtual: false,
    tags: ["networking", "startup", "entrepreneurship"],
    featured: true,
    coverImage: "/abstract-geometric-shapes.png",
    speakerImages: ["/diverse-person-portrait.png", "/alex-wong.png"],
    agenda: ["6:30 PM - Welcome & Introductions", "7:00 PM - Speed Networking", "8:00 PM - Panel Discussion", "9:00 PM - Open Networking"]
  },
  {
    id: "2",
    title: "AI in Healthcare Summit",
    date: "Dec 15",
    time: "9:00 AM",
    location: "Virtual",
    attendees: 120,
    category: "Conference",
    description: "Explore the future of AI in healthcare",
    image: "/abstract-geometric-shapes.png",
    organizer: "TechCorp",
    price: "$99",
    registrationDeadline: "Dec 10",
    maxCapacity: 500,
    virtual: true,
    tags: ["AI", "healthcare", "conference", "virtual"],
    featured: true,
    coverImage: "/diverse-group-conversation.png",
    speakerImages: ["/diverse-person-portrait.png", "/diverse-group-meeting.png"],
    agenda: ["9:00 AM - Keynote: Future of Healthcare", "10:00 AM - AI Diagnostics Panel", "11:00 AM - Patient Care Solutions", "12:00 PM - Networking Break"]
  },
  {
    id: "3",
    title: "Fundraising Workshop",
    date: "Jun 02",
    time: "2:00 PM",
    location: "Virtual",
    attendees: 85,
    category: "Workshop",
    description: "Learn proven fundraising strategies",
    image: "/diverse-group-conversation.png",
    organizer: "StartupXYZ",
    price: "$49",
    registrationDeadline: "May 30",
    maxCapacity: 200,
    virtual: true,
    tags: ["fundraising", "workshop", "startup", "investment"],
    featured: false,
    coverImage: "/startup-founders.png",
    speakerImages: ["/alex-wong.png"],
    agenda: ["2:00 PM - Fundraising Fundamentals", "3:00 PM - Pitch Deck Workshop", "4:00 PM - Investor Q&A", "5:00 PM - Networking"]
  }
]

// Enhanced Mock Groups
export const mockGroups: LinkedInGroup[] = [
  {
    id: "1",
    name: "Singapore Startup Founders",
    members: 3245,
    avatar: "/startup-founders.png",
    category: "Business",
    description: "Connect with fellow startup founders in Singapore",
    recentActivity: "New discussion: 'Scaling challenges in SEA'",
    rules: ["Be respectful", "No spam", "Share valuable insights"],
    privacy: "public",
    createdDate: "2020-03-15",
    activeMembers: 1247,
    weeklyPosts: 45,
    moderators: ["David Kumar", "Sarah Chen"],
    topics: ["startup", "entrepreneurship", "singapore", "scaling"],
    coverImage: "/abstract-geometric-shapes.png",
    featuredImage: "/diverse-group-conversation.png"
  },
  {
    id: "2",
    name: "Tech Entrepreneurs Network",
    members: 5678,
    avatar: "/placeholder-uyrzi.png",
    category: "Technology",
    description: "Network of tech entrepreneurs and innovators",
    recentActivity: "New job posting: Senior Developer",
    rules: ["Professional discussions only", "No self-promotion", "Help others"],
    privacy: "public",
    createdDate: "2019-08-22",
    activeMembers: 2341,
    weeklyPosts: 78,
    moderators: ["Alex Wong", "Dr. Emily Chen"],
    topics: ["technology", "innovation", "entrepreneurship", "AI"],
    coverImage: "/diverse-person-portrait.png",
    featuredImage: "/startup-founders.png"
  },
  {
    id: "3",
    name: "Product Managers Guild",
    members: 2134,
    avatar: "/placeholder-eeaoc.png",
    category: "Product",
    description: "Community for product managers to share insights",
    recentActivity: "New article: 'Product-Market Fit'",
    rules: ["Share experiences", "Ask questions", "Provide feedback"],
    privacy: "private",
    createdDate: "2021-01-10",
    activeMembers: 892,
    weeklyPosts: 23,
    moderators: ["Marcus Rodriguez", "Lisa Tan"],
    topics: ["product management", "UX", "strategy", "user research"],
    coverImage: "/diverse-group-meeting.png",
    featuredImage: "/abstract-geometric-shapes.png"
  }
]

// Enhanced Mock Quick Stats
export const mockQuickStats = {
  totalPosts: 156,
  totalLikes: 951,
  totalComments: 212,
  verifiedUsers: 4,
  profileViews: 248,
  postImpressions: 2567,
  searchAppearances: 45,
  weeklyGrowth: 12.5,
  engagementRate: 4.2,
  reach: 12450,
  connections: 342,
  pendingRequests: 8
}

// Enhanced Mock Trending News
export const mockTrendingNews = [
  {
    id: "1",
    title: "Singapore's tech startup ecosystem sees 15% growth in Q1 2023",
    category: "Singapore",
    readers: 1234,
    trend: "+15%",
    source: "TechCrunch",
    publishedDate: "2 hours ago",
    readTime: "3 min read",
    featured: true
  },
  {
    id: "2",
    title: "New regulations for fintech startups announced by MAS",
    category: "Fintech",
    readers: 856,
    trend: "+8%",
    source: "Business Times",
    publishedDate: "4 hours ago",
    readTime: "5 min read",
    featured: false
  },
  {
    id: "3",
    title: "Early-stage funding rounds reach new heights in Southeast Asia",
    category: "Funding",
    readers: 567,
    trend: "+23%",
    source: "DealStreetAsia",
    publishedDate: "6 hours ago",
    readTime: "4 min read",
    featured: true
  }
]

// New: Mock Post Analytics
export const mockPostAnalytics = {
  totalViews: 12450,
  uniqueViews: 8920,
  engagementRate: 4.2,
  clickThroughRate: 2.1,
  timeSpent: 45,
  topPerformingPosts: 3,
  audienceGrowth: 12.5,
  bestPostingTimes: ["9:00 AM", "12:00 PM", "6:00 PM"],
  topPerformingContent: ["Startup stories", "Industry insights", "Personal experiences"]
}

// New: Mock Content Recommendations
export const mockContentRecommendations = [
  {
    id: "1",
    type: "article",
    title: "10 Ways to Improve Your Startup's Pitch Deck",
    author: "David Kumar",
    readTime: "5 min read",
    category: "Startup",
    relevance: 95,
    reason: "Based on your interest in fundraising"
  },
  {
    id: "2",
    type: "video",
    title: "AI Trends in 2024: What Startups Need to Know",
    author: "Dr. Emily Chen",
    duration: "12 min",
    category: "Technology",
    relevance: 88,
    reason: "Matches your learning preferences"
  },
  {
    id: "3",
    type: "podcast",
    title: "Building Remote-First Startup Culture",
    author: "Sarah Chen",
    duration: "28 min",
    category: "Culture",
    relevance: 82,
    reason: "Popular in your network"
  }
]

// New: Mock Networking Suggestions
export const mockNetworkingSuggestions = [
  {
    id: "1",
    person: mockPeopleYouMayKnow[0],
    reason: "3 mutual connections in AI",
    strength: "high",
    suggestedAction: "Send connection request"
  },
  {
    id: "2",
    person: mockPeopleYouMayKnow[1],
    reason: "Similar role and interests",
    strength: "medium",
    suggestedAction: "Follow and engage with posts"
  },
  {
    id: "3",
    person: mockPeopleYouMayKnow[2],
    reason: "Shared interest in UX design",
    strength: "medium",
    suggestedAction: "Comment on recent posts"
  }
]

// New: Mock Post Images
export const mockPostImages = [
  "/startup-founders.png",
  "/abstract-geometric-shapes.png",
  "/diverse-group-conversation.png",
  "/diverse-person-portrait.png",
  "/diverse-group-meeting.png",
  "/alex-wong.png"
]

// New: Mock Company Cover Images
export const mockCompanyCoverImages = [
  "/abstract-geometric-shapes.png",
  "/startup-founders.png",
  "/diverse-group-conversation.png",
  "/diverse-group-meeting.png"
]

// New: Mock Event Cover Images
export const mockEventCoverImages = [
  "/startup-founders.png",
  "/abstract-geometric-shapes.png",
  "/diverse-group-conversation.png"
]

// New: Mock Learning Thumbnails
export const mockLearningThumbnails = [
  "/startup-founders.png",
  "/diverse-person-portrait.png",
  "/abstract-geometric-shapes.png",
  "/diverse-group-meeting.png"
]
