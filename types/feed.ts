export interface PostAuthor {
  id: string
  name: string
  headline: string
  avatar: string
  verified?: boolean
}

export interface Post {
  id: string
  author: PostAuthor
  content: string
  timestamp: string
  likes: number
  comments: number
  reposts: number
  tags?: string[]
  images?: string[]
  video?: string
  image?: string
  engagement?: {
    views: number
    reach: number
    clicks: number
    saves: number
  }
  aiInsights?: {
    sentiment: string
    keyTopics: string[]
    suggestedActions: string[]
    engagementPrediction: string
  }
}

export interface Comment {
  id: string
  author: PostAuthor
  content: string
  timestamp: string
  likes: number
}
