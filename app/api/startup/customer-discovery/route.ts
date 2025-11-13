/**
 * API route for customer discovery tools and data
 */

import { type NextRequest, NextResponse } from "next/server"

// Interface for survey data
interface Survey {
  id: string
  title: string
  description: string
  questions: SurveyQuestion[]
  status: "draft" | "active" | "completed"
  createdAt: string
  updatedAt: string
  startupId: string
  responseCount: number
}

interface SurveyQuestion {
  id: string
  type: "multiple-choice" | "rating" | "open-ended" | "yes-no" | "likert" | "dropdown"
  question: string
  required: boolean
  options?: string[]
  scale?: number
}

// Interface for interview data
interface Interview {
  id: string
  startupId: string
  intervieweeName: string
  contactInfo: string
  role: string
  company?: string
  date: string
  duration: number
  status: "scheduled" | "completed" | "cancelled"
  summary?: string
  insights?: string[]
  recordingUrl?: string
  transcriptUrl?: string
  followUpActions?: string[]
  createdAt: string
  updatedAt: string
}

// Interface for feedback data
interface Feedback {
  id: string
  startupId: string
  source: "survey" | "interview" | "email" | "social" | "other"
  sourceId?: string
  content: string
  sentiment: "positive" | "neutral" | "negative"
  category?: string
  createdAt: string
  tags?: string[]
}

/**
 * Get surveys for a startup
 */
export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const startupId = searchParams.get("startupId")
    const type = searchParams.get("type") // 'surveys', 'interviews', 'feedback'

    if (!startupId) {
      return NextResponse.json({ error: "Missing startupId parameter" }, { status: 400 })
    }

    // Determine what data to return based on type
    switch (type) {
      case "surveys":
        return NextResponse.json(getMockSurveys(startupId))
      case "interviews":
        return NextResponse.json(getMockInterviews(startupId))
      case "feedback":
        return NextResponse.json(getMockFeedback(startupId))
      default:
        // Return all data types
        return NextResponse.json({
          surveys: getMockSurveys(startupId).surveys,
          interviews: getMockInterviews(startupId).interviews,
          feedback: getMockFeedback(startupId).feedback,
        })
    }
  } catch (error) {
    console.error("Customer discovery fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch customer discovery data" }, { status: 500 })
  }
}

/**
 * Create new survey, interview, or feedback entry
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json()

    // Validate data has startupId and type
    if (!data.startupId || !data.type) {
      return NextResponse.json({ error: "Missing required fields (startupId, type)" }, { status: 400 })
    }

    // Process based on type
    switch (data.type) {
      case "survey":
        // Validate survey data
        if (!data.title || !data.questions || !Array.isArray(data.questions)) {
          return NextResponse.json({ error: "Invalid survey data" }, { status: 400 })
        }

        // In a real implementation, this would save to a database
        return NextResponse.json({
          success: true,
          id: `survey-${Date.now()}`,
          createdAt: new Date().toISOString(),
          survey: {
            id: `survey-${Date.now()}`,
            title: data.title,
            description: data.description || "",
            questions: data.questions,
            status: "draft",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            startupId: data.startupId,
            responseCount: 0,
          },
        })

      case "interview":
        // Validate interview data
        if (!data.intervieweeName || !data.date || !data.duration) {
          return NextResponse.json({ error: "Invalid interview data" }, { status: 400 })
        }

        // In a real implementation, this would save to a database
        return NextResponse.json({
          success: true,
          id: `interview-${Date.now()}`,
          createdAt: new Date().toISOString(),
          interview: {
            id: `interview-${Date.now()}`,
            startupId: data.startupId,
            intervieweeName: data.intervieweeName,
            contactInfo: data.contactInfo || "",
            role: data.role || "",
            company: data.company || "",
            date: data.date,
            duration: data.duration,
            status: "scheduled",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        })

      case "feedback":
        // Validate feedback data
        if (!data.content || !data.source) {
          return NextResponse.json({ error: "Invalid feedback data" }, { status: 400 })
        }

        // In a real implementation, this would save to a database
        return NextResponse.json({
          success: true,
          id: `feedback-${Date.now()}`,
          createdAt: new Date().toISOString(),
          feedback: {
            id: `feedback-${Date.now()}`,
            startupId: data.startupId,
            source: data.source,
            sourceId: data.sourceId || undefined,
            content: data.content,
            sentiment: data.sentiment || "neutral",
            category: data.category || undefined,
            createdAt: new Date().toISOString(),
            tags: data.tags || [],
          },
        })

      default:
        return NextResponse.json(
          { error: "Invalid type. Must be one of: survey, interview, feedback" },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("Customer discovery create error:", error)
    return NextResponse.json({ error: "Failed to create customer discovery item" }, { status: 500 })
  }
}

/**
 * Update existing survey, interview, or feedback entry
 */
export async function PUT(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json()

    // Validate data has id and type
    if (!data.id || !data.type) {
      return NextResponse.json({ error: "Missing required fields (id, type)" }, { status: 400 })
    }

    // In a real implementation, this would update the database entry
    // For now, we're just returning success with the updated data

    return NextResponse.json({
      success: true,
      id: data.id,
      updatedAt: new Date().toISOString(),
      [data.type]: {
        ...data,
        updatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Customer discovery update error:", error)
    return NextResponse.json({ error: "Failed to update customer discovery item" }, { status: 500 })
  }
}

/**
 * Delete a survey, interview, or feedback entry
 */
export async function DELETE(req: NextRequest) {
  try {
    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get("id")
    const type = searchParams.get("type")

    if (!id || !type) {
      return NextResponse.json({ error: "Missing required parameters (id, type)" }, { status: 400 })
    }

    // In a real implementation, this would delete from the database
    // For now, we're just returning success

    return NextResponse.json({
      success: true,
      id,
      type,
      deletedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Customer discovery delete error:", error)
    return NextResponse.json({ error: "Failed to delete customer discovery item" }, { status: 500 })
  }
}

/**
 * Generate mock surveys for a startup
 */
function getMockSurveys(startupId: string) {
  const surveys: Survey[] = [
    {
      id: "1",
      title: "Product Feature Preferences",
      description: "Help us understand which features are most important to you",
      questions: [
        {
          id: "1-1",
          type: "multiple-choice",
          question: "Which feature would you most like to see added to our product?",
          required: true,
          options: [
            "Integration with other tools",
            "Mobile app",
            "Advanced analytics",
            "Team collaboration",
            "Other (please specify)",
          ],
        },
        {
          id: "1-2",
          type: "rating",
          question: "How satisfied are you with the current user interface?",
          required: true,
          scale: 5,
        },
        {
          id: "1-3",
          type: "open-ended",
          question: "What would make our product more valuable to you?",
          required: false,
        },
      ],
      status: "active",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      startupId,
      responseCount: 28,
    },
    {
      id: "2",
      title: "Customer Satisfaction Survey",
      description: "We value your feedback on our service",
      questions: [
        {
          id: "2-1",
          type: "yes-no",
          question: "Would you recommend our service to others?",
          required: true,
        },
        {
          id: "2-2",
          type: "likert",
          question: "Our customer support is responsive and helpful.",
          required: true,
          options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
        },
        {
          id: "2-3",
          type: "open-ended",
          question: "How can we improve our service?",
          required: false,
        },
      ],
      status: "completed",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      startupId,
      responseCount: 45,
    },
    {
      id: "3",
      title: "Market Research Survey",
      description: "Help us understand your needs and pain points",
      questions: [
        {
          id: "3-1",
          type: "dropdown",
          question: "What industry are you in?",
          required: true,
          options: ["Technology", "Finance", "Healthcare", "Education", "Retail", "Manufacturing", "Other"],
        },
        {
          id: "3-2",
          type: "multiple-choice",
          question: "What is your biggest challenge with current solutions?",
          required: true,
          options: [
            "Too expensive",
            "Difficult to use",
            "Missing key features",
            "Poor customer support",
            "Limited integration capabilities",
            "Other",
          ],
        },
        {
          id: "3-3",
          type: "open-ended",
          question: "What would be the ideal solution for your needs?",
          required: true,
        },
      ],
      status: "draft",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      startupId,
      responseCount: 0,
    },
  ]

  return { surveys }
}

/**
 * Generate mock interviews for a startup
 */
function getMockInterviews(startupId: string) {
  const interviews: Interview[] = [
    {
      id: "1",
      startupId,
      intervieweeName: "John Smith",
      contactInfo: "john.smith@example.com",
      role: "CTO",
      company: "TechCorp Inc.",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 45,
      status: "completed",
      summary: "John provided valuable insights on technical challenges and integration needs.",
      insights: [
        "Current solution is too complex for technical teams",
        "API documentation is a major pain point",
        "Would prefer a self-hosted option for compliance reasons",
        "Integration with CI/CD pipeline is crucial",
      ],
      recordingUrl: "https://example.com/recordings/interview-1.mp4",
      transcriptUrl: "https://example.com/transcripts/interview-1.txt",
      followUpActions: [
        "Send API documentation for review",
        "Schedule follow-up demo with development team",
        "Research compliance requirements for their industry",
      ],
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      startupId,
      intervieweeName: "Sarah Johnson",
      contactInfo: "sarah.j@example.com",
      role: "Marketing Director",
      company: "Brand Leaders LLC",
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 60,
      status: "completed",
      summary: "Sarah shared marketing perspectives and customer acquisition challenges.",
      insights: [
        "Current analytics tools don't provide enough campaign attribution data",
        "Team struggles with connecting social media metrics to sales",
        "Would pay premium for better integration with existing marketing tools",
        "ROI reporting is a major pain point with current solutions",
      ],
      recordingUrl: "https://example.com/recordings/interview-2.mp4",
      transcriptUrl: "https://example.com/transcripts/interview-2.txt",
      followUpActions: [
        "Share analytics solution concept",
        "Connect with their analytics team",
        "Research integration possibilities with popular marketing tools",
      ],
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      startupId,
      intervieweeName: "Michael Wong",
      contactInfo: "michael.w@example.com",
      role: "CEO",
      company: "Startup Innovators",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 30,
      status: "scheduled",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  return { interviews }
}

/**
 * Generate mock feedback for a startup
 */
function getMockFeedback(startupId: string) {
  const feedback: Feedback[] = [
    {
      id: "1",
      startupId,
      source: "survey",
      sourceId: "1",
      content: "I love the intuitive interface, but would like to see more customization options.",
      sentiment: "positive",
      category: "Product UI/UX",
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["UI", "Customization", "Feature Request"],
    },
    {
      id: "2",
      startupId,
      source: "interview",
      sourceId: "1",
      content: "The API documentation is difficult to understand and lacking examples.",
      sentiment: "negative",
      category: "Technical Documentation",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["API", "Documentation", "Developer Experience"],
    },
    {
      id: "3",
      startupId,
      source: "email",
      content: "Your customer support team was incredibly helpful in resolving our issue quickly.",
      sentiment: "positive",
      category: "Customer Support",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["Support", "Customer Service"],
    },
    {
      id: "4",
      startupId,
      source: "social",
      content:
        "Been using @YourProduct for a month now and it has completely transformed our workflow! #ProductivityBoost",
      sentiment: "positive",
      category: "General Feedback",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["Social Media", "Testimonial"],
    },
    {
      id: "5",
      startupId,
      source: "survey",
      sourceId: "2",
      content: "The pricing is too high for the features offered compared to competitors.",
      sentiment: "negative",
      category: "Pricing",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      tags: ["Pricing", "Competitive Analysis"],
    },
  ]

  return { feedback }
}
