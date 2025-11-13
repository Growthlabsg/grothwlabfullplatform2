"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Star, 
  MessageCircle, 
  TrendingUp, 
  BarChart3, 
  ThumbsUp, 
  ThumbsDown,
  Award,
  Target,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Heart,
  Zap,
  BookOpen,
  Lightbulb,
  Shield,
  Globe
} from "lucide-react"
import { SessionFeedback, FeedbackCategory } from "@/lib/mentor-connect-service"

interface FeedbackSystemProps {
  sessionId?: string
  fromUserId?: string
  toUserId?: string
  onSubmit?: (feedback: SessionFeedback) => void
}

export function FeedbackSystem({ sessionId, fromUserId, toUserId, onSubmit }: FeedbackSystemProps) {
  const [rating, setRating] = useState(5)
  const [comments, setComments] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [categories, setCategories] = useState<FeedbackCategory[]>([
    { category: "Communication", score: 5, comment: "" },
    { category: "Expertise", score: 5, comment: "" },
    { category: "Value Provided", score: 5, comment: "" },
    { category: "Punctuality", score: 5, comment: "" },
    { category: "Follow-up", score: 5, comment: "" }
  ])

  const handleCategoryChange = (index: number, score: number, comment: string) => {
    const newCategories = [...categories]
    newCategories[index] = { ...newCategories[index], score, comment }
    setCategories(newCategories)
  }

  const handleSubmit = () => {
    if (!sessionId || !fromUserId || !toUserId) return

    const feedback: SessionFeedback = {
      id: `feedback-${Date.now()}`,
      sessionId,
      fromUserId,
      toUserId,
      rating,
      comments,
      categories,
      isAnonymous,
      createdAt: new Date().toISOString()
    }

    onSubmit?.(feedback)
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 3.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingIcon = (rating: number) => {
    if (rating >= 4.5) return <ThumbsUp className="h-4 w-4" />
    if (rating >= 3.5) return <CheckCircle className="h-4 w-4" />
    return <AlertCircle className="h-4 w-4" />
  }

  return (
    <div className="space-y-8">
      {/* Feedback Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Session Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Rating */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Overall Rating</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">{rating}/5</span>
                {getRatingIcon(rating)}
              </div>
            </div>
          </div>

          {/* Category Ratings */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Detailed Feedback</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category, index) => (
                <div key={category.category} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Label className="font-medium">{category.category}</Label>
                    <Badge variant="secondary">
                      {category.score}/5
                    </Badge>
                  </div>
                  <Slider
                    value={[category.score]}
                    onValueChange={(value) => handleCategoryChange(index, value[0], category.comment)}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <Textarea
                    placeholder={`Comments about ${category.category.toLowerCase()}...`}
                    value={category.comment}
                    onChange={(e) => handleCategoryChange(index, category.score, e.target.value)}
                    className="min-h-[60px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* General Comments */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Additional Comments</Label>
            <Textarea
              placeholder="Share your experience, suggestions, or any other feedback..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label htmlFor="anonymous">Submit feedback anonymously</Label>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            <MessageCircle className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Feedback Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Feedback Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Total Reviews</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-4">
            <h3 className="font-medium">Category Performance</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm">{category.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(category.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {category.score}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "1",
                user: "Alex Johnson",
                rating: 5,
                comment: "Excellent mentor! Sarah provided invaluable guidance on our fundraising strategy.",
                date: "2 days ago",
                categories: ["Communication", "Expertise", "Value Provided"]
              },
              {
                id: "2",
                user: "Maria Garcia",
                rating: 4,
                comment: "Very knowledgeable and patient. Helped me understand complex technical concepts.",
                date: "1 week ago",
                categories: ["Expertise", "Communication"]
              },
              {
                id: "3",
                user: "David Chen",
                rating: 5,
                comment: "Outstanding mentor who truly cares about your success. Highly recommended!",
                date: "2 weeks ago",
                categories: ["Value Provided", "Follow-up", "Communication"]
              }
            ].map((feedback) => (
              <div key={feedback.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium">{feedback.user}</div>
                    <div className="text-sm text-muted-foreground">{feedback.date}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{feedback.comment}</p>
                <div className="flex flex-wrap gap-1">
                  {feedback.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 