"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Sparkles, 
  Bot, 
  MessageSquare, 
  Copy, 
  RefreshCw, 
  Save, 
  Send, 
  Settings, 
  Lightbulb,
  Wand2,
  Target,
  Users,
  Globe,
  Clock,
  Star,
  Plus,
  X,
  CheckCircle,
  AlertTriangle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIPostGeneratorConfig {
  openaiApiKey: string
  openaiModel: string
  grokApiKey: string
  grokModel: string
  anthropicApiKey: string
  anthropicModel: string
  maxTokens: number
  temperature: number
  enableHashtagGeneration: boolean
  enableTrendingTopics: boolean
  enableEngagementOptimization: boolean
  enableMultiLanguage: boolean
  defaultLanguage: string
}

interface GeneratedPost {
  id: string
  content: string
  hashtags: string[]
  engagementScore: number
  trendingPotential: number
  aiModel: string
  generationTime: number
  cost: number
  metadata: {
    tone: string
    targetAudience: string
    industry: string
    postType: string
    optimalPostingTime: string
    estimatedReach: number
    suggestedCategories: string[]
  }
}

interface PostTemplate {
  id: string
  name: string
  description: string
  prompt: string
  category: string
  industry: string
  tone: string
  targetAudience: string
  exampleOutput: string
  tags: string[]
  usageCount: number
  rating: number
}

const defaultConfig: AIPostGeneratorConfig = {
  openaiApiKey: "",
  openaiModel: "gpt-4",
  grokApiKey: "",
  grokModel: "grok-beta",
  anthropicApiKey: "",
  anthropicModel: "claude-3-sonnet-20240229",
  maxTokens: 500,
  temperature: 0.7,
  enableHashtagGeneration: true,
  enableTrendingTopics: true,
  enableEngagementOptimization: true,
  enableMultiLanguage: true,
  defaultLanguage: "English"
}

const postTemplates: PostTemplate[] = [
  {
    id: "1",
    name: "Startup Success Story",
    description: "Share inspiring startup success stories with actionable insights",
    prompt: "Create an engaging post about a startup success story in the {industry} industry. Include key lessons learned, challenges overcome, and actionable insights for other entrepreneurs. Make it inspiring and educational.",
    category: "Success Stories",
    industry: "All",
    tone: "Inspirational",
    targetAudience: "Entrepreneurs",
    exampleOutput: "🚀 From Garage to Global: How [Startup Name] Revolutionized [Industry]...",
    tags: ["success", "startup", "inspiration", "lessons"],
    usageCount: 1247,
    rating: 4.8
  },
  {
    id: "2",
    name: "Industry Trend Analysis",
    description: "Analyze and share current industry trends with expert insights",
    prompt: "Analyze the latest trends in {industry} and create a comprehensive post explaining what's happening, why it matters, and what entrepreneurs should know. Include data points and actionable insights.",
    category: "Trend Analysis",
    industry: "All",
    tone: "Analytical",
    targetAudience: "Business Leaders",
    exampleOutput: "📊 The {Industry} Revolution: 5 Trends That Will Shape 2024...",
    tags: ["trends", "analysis", "insights", "future"],
    usageCount: 892,
    rating: 4.6
  },
  {
    id: "3",
    name: "Expert Tips & Advice",
    description: "Share expert tips and practical advice for entrepreneurs",
    prompt: "Create a post sharing {number} expert tips for {topic} in the {industry} space. Make each tip practical, actionable, and backed by experience. Include a compelling hook and clear value proposition.",
    category: "Tips & Advice",
    industry: "All",
    tone: "Educational",
    targetAudience: "Entrepreneurs",
    exampleOutput: "💡 {Number} Game-Changing Tips for {Topic} That Every {Industry} Entrepreneur Needs...",
    tags: ["tips", "advice", "expertise", "practical"],
    usageCount: 1567,
    rating: 4.9
  }
]

export function AIPostGenerator() {
  const { toast } = useToast()
  const [config, setConfig] = useState<AIPostGeneratorConfig>(defaultConfig)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPosts, setGeneratedPosts] = useState<GeneratedPost[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<PostTemplate | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [postType, setPostType] = useState("text")
  const [industry, setIndustry] = useState("Technology")
  const [tone, setTone] = useState("Professional")
  const [targetAudience, setTargetAudience] = useState("Entrepreneurs")
  const [showConfig, setShowConfig] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [enableAdvancedFeatures, setEnableAdvancedFeatures] = useState(false)

  const industries = ["Technology", "Finance", "Healthcare", "Education", "E-commerce", "Manufacturing", "Real Estate", "Entertainment", "Food & Beverage", "Travel", "Other"]
  const tones = ["Professional", "Casual", "Inspirational", "Educational", "Humorous", "Authoritative", "Friendly", "Motivational"]
  const targetAudiences = ["Entrepreneurs", "Investors", "Startup Teams", "Industry Professionals", "Students", "General Public", "Specific Demographics"]
  const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Portuguese"]

  const generatePost = async () => {
    if (!config.openaiApiKey && !config.grokApiKey && !config.anthropicApiKey) {
      toast({
        title: "API Configuration Required",
        description: "Please configure at least one AI service API key in settings.",
        variant: "destructive"
      })
      return
    }

    setIsGenerating(true)
    const startTime = Date.now()

    try {
      let generatedContent = ""
      let aiModel = ""
      let cost = 0

      // Use OpenAI if available
      if (config.openaiApiKey) {
        const response = await generateWithOpenAI()
        generatedContent = response.content
        aiModel = "OpenAI GPT-4"
        cost = response.cost
      }
      // Fallback to Grok if OpenAI not available
      else if (config.grokApiKey) {
        const response = await generateWithGrok()
        generatedContent = response.content
        aiModel = "Grok AI"
        cost = response.cost
      }
      // Fallback to Anthropic if others not available
      else if (config.anthropicApiKey) {
        const response = await generateWithAnthropic()
        generatedContent = response.content
        aiModel = "Anthropic Claude"
        cost = response.cost
      }

      if (generatedContent) {
        const hashtags = config.enableHashtagGeneration ? await generateHashtags(generatedContent) : []
        const engagementScore = config.enableEngagementOptimization ? calculateEngagementScore(generatedContent) : 0
        const trendingPotential = config.enableTrendingTopics ? calculateTrendingPotential(generatedContent) : 0

        const newPost: GeneratedPost = {
          id: Date.now().toString(),
          content: generatedContent,
          hashtags,
          engagementScore,
          trendingPotential,
          aiModel,
          generationTime: Date.now() - startTime,
          cost,
          metadata: {
            tone,
            targetAudience,
            industry,
            postType,
            optimalPostingTime: calculateOptimalPostingTime(),
            estimatedReach: calculateEstimatedReach(engagementScore),
            suggestedCategories: generateSuggestedCategories(industry, tone)
          }
        }

        setGeneratedPosts(prev => [newPost, ...prev])
        
        toast({
          title: "Post Generated Successfully!",
          description: `Generated using ${aiModel} in ${newPost.generationTime}ms`,
        })
      }
    } catch (error) {
      console.error("Error generating post:", error)
      toast({
        title: "Generation Failed",
        description: "There was an error generating your post. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const generateWithOpenAI = async () => {
    const prompt = buildPrompt()
    
    const response = await fetch("/api/ai/generate-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        model: config.openaiModel,
        maxTokens: config.maxTokens,
        temperature: config.temperature,
        apiKey: config.openaiApiKey,
        service: 'openai'
      })
    })

    if (!response.ok) {
      throw new Error("OpenAI API request failed")
    }

    const data = await response.json()
    return {
      content: data.content,
      cost: data.cost || 0.02
    }
  }

  const generateWithGrok = async () => {
    // Mock Grok API call - replace with actual Grok API integration
    const prompt = buildPrompt()
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return {
      content: `🚀 ${prompt.split(' ').slice(0, 10).join(' ')}...\n\nThis is a mock response from Grok AI. In production, this would integrate with the actual Grok API to generate engaging content based on your prompt.`,
      cost: 0.01
    }
  }

  const generateWithAnthropic = async () => {
    // Mock Anthropic API call - replace with actual Claude API integration
    const prompt = buildPrompt()
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    return {
      content: `💡 ${prompt.split(' ').slice(0, 10).join(' ')}...\n\nThis is a mock response from Anthropic Claude. In production, this would integrate with the actual Claude API to generate thoughtful, engaging content based on your prompt.`,
      cost: 0.015
    }
  }

  const generateHashtags = async (content: string) => {
    // Mock hashtag generation - replace with actual AI hashtag generation
    const commonHashtags = ["#startup", "#entrepreneur", "#innovation", "#business", "#growth", "#success", "#tech", "#finance", "#healthcare", "#education"]
    const contentWords = content.toLowerCase().split(/\s+/)
    const relevantHashtags = commonHashtags.filter(tag => 
      contentWords.some(word => tag.toLowerCase().includes(word.replace("#", "")))
    )
    return relevantHashtags.slice(0, 5)
  }

  const buildPrompt = () => {
    let prompt = ""
    
    if (selectedTemplate) {
      prompt = selectedTemplate.prompt
        .replace("{industry}", industry)
        .replace("{topic}", customPrompt || "entrepreneurship")
        .replace("{number}", "5")
    } else {
      prompt = `Create an engaging social media post about ${customPrompt || "entrepreneurship"} in the ${industry} industry. 
      Target audience: ${targetAudience}
      Tone: ${tone}
      Post type: ${postType}
      Language: ${selectedLanguage}
      
      Make it engaging, informative, and shareable. Include actionable insights and encourage engagement.`
    }

    if (config.enableEngagementOptimization) {
      prompt += "\n\nOptimize for maximum engagement, likes, shares, and comments."
    }

    if (config.enableTrendingTopics) {
      prompt += "\n\nInclude relevant trending topics and current events to increase visibility."
    }

    return prompt
  }

  const calculateEngagementScore = (content: string) => {
    // Simple engagement scoring algorithm
    let score = 50 // Base score
    
    // Content length optimization
    if (content.length > 100 && content.length < 300) score += 20
    else if (content.length > 300) score += 10
    
    // Emoji usage
    const emojiCount = (content.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length
    if (emojiCount > 0 && emojiCount <= 3) score += 15
    else if (emojiCount > 3) score += 5
    
    // Question marks (encourage comments)
    if (content.includes("?")) score += 10
    
    // Call to action
    if (content.toLowerCase().includes("comment") || content.toLowerCase().includes("share") || content.toLowerCase().includes("like")) score += 15
    
    return Math.min(score, 100)
  }

  const calculateTrendingPotential = (content: string) => {
    // Simple trending potential calculation
    let potential = 40 // Base potential
    
    // Trending keywords
    const trendingKeywords = ["ai", "blockchain", "sustainability", "innovation", "future", "trending", "viral", "breaking"]
    const hasTrendingKeywords = trendingKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    )
    if (hasTrendingKeywords) potential += 30
    
    // Hashtag usage
    const hashtagCount = (content.match(/#\w+/g) || []).length
    if (hashtagCount > 0 && hashtagCount <= 5) potential += 20
    else if (hashtagCount > 5) potential += 10
    
    // Content type
    if (postType === "video") potential += 10
    else if (postType === "image") potential += 5
    
    return Math.min(potential, 100)
  }

  const calculateOptimalPostingTime = () => {
    // Simple optimal posting time calculation
    const times = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "8:00 PM"]
    return times[Math.floor(Math.random() * times.length)]
  }

  const calculateEstimatedReach = (engagementScore: number) => {
    // Simple reach estimation based on engagement score
    const baseReach = 1000
    const multiplier = 1 + (engagementScore / 100)
    return Math.floor(baseReach * multiplier)
  }

  const generateSuggestedCategories = (industry: string, tone: string) => {
    const categories = ["Business", "Technology", "Innovation", "Success", "Tips", "Trends", "Community"]
    return categories.slice(0, 3)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to Clipboard",
      description: "Post content has been copied to your clipboard.",
    })
  }

  const savePost = (post: GeneratedPost) => {
    // Save to local storage or send to backend
    const savedPosts = JSON.parse(localStorage.getItem("aiGeneratedPosts") || "[]")
    savedPosts.push(post)
    localStorage.setItem("aiGeneratedPosts", JSON.stringify(savedPosts))
    
    toast({
      title: "Post Saved",
      description: "Your generated post has been saved successfully.",
    })
  }

  const useTemplate = (template: PostTemplate) => {
    setSelectedTemplate(template)
    setCustomPrompt("")
    setShowTemplates(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Post Generator</h1>
          <p className="text-muted-foreground">
            Create engaging, AI-powered posts using ChatGPT, Grok, or Claude
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowTemplates(true)} variant="outline">
            <Lightbulb className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button onClick={() => setShowConfig(true)} variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            AI Settings
          </Button>
        </div>
      </div>

      {/* AI Configuration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Service Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${config.openaiApiKey ? 'text-green-500' : 'text-gray-400'}`} />
              <span>OpenAI GPT-4</span>
              <Badge variant={config.openaiApiKey ? "default" : "secondary"}>
                {config.openaiApiKey ? "Connected" : "Not Configured"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${config.grokApiKey ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Grok AI</span>
              <Badge variant={config.grokApiKey ? "default" : "secondary"}>
                {config.grokApiKey ? "Connected" : "Not Configured"}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-4 h-4 ${config.anthropicApiKey ? 'text-green-500' : 'text-gray-400'}`} />
              <span>Anthropic Claude</span>
              <Badge variant={config.anthropicApiKey ? "default" : "secondary"}>
                {config.anthropicApiKey ? "Connected" : "Not Configured"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Post Generation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Generate AI-Powered Post</CardTitle>
          <CardDescription>
            Configure your post parameters and let AI create engaging content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Template Selection */}
          {selectedTemplate && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{selectedTemplate.name}</h4>
                  <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTemplate(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Basic Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map(ind => (
                    <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {targetAudiences.map(audience => (
                    <SelectItem key={audience} value={audience}>{audience}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="postType">Post Type</Label>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Post</SelectItem>
                  <SelectItem value="image">Image Post</SelectItem>
                  <SelectItem value="video">Video Post</SelectItem>
                  <SelectItem value="link">Link Post</SelectItem>
                  <SelectItem value="poll">Poll Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Custom Prompt */}
          <div>
            <Label htmlFor="customPrompt">
              {selectedTemplate ? "Additional Context (Optional)" : "What would you like to post about?"}
            </Label>
            <Textarea
              id="customPrompt"
              placeholder={selectedTemplate ? "Add any specific details or context..." : "Describe your post topic, key points, or ideas..."}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Advanced Features */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch
                id="advancedFeatures"
                checked={enableAdvancedFeatures}
                onCheckedChange={setEnableAdvancedFeatures}
              />
              <Label htmlFor="advancedFeatures">Enable Advanced Features</Label>
            </div>
            
            {enableAdvancedFeatures && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="hashtagGeneration"
                    checked={config.enableHashtagGeneration}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, enableHashtagGeneration: checked }))}
                  />
                  <Label htmlFor="hashtagGeneration">Auto-generate Hashtags</Label>
                </div>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <Button 
            onClick={generatePost} 
            disabled={isGenerating || (!selectedTemplate && !customPrompt.trim())}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Post...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Posts */}
      {generatedPosts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Posts</CardTitle>
            <CardDescription>
              Review and customize your AI-generated posts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedPosts.map((post) => (
              <div key={post.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">
                      Generated with {post.aiModel} • {post.generationTime}ms • ${post.cost.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      Score: {post.engagementScore}/100
                    </Badge>
                    <Badge variant="outline">
                      Trend: {post.trendingPotential}/100
                    </Badge>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </div>

                {post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Optimal Posting Time:</span> {post.metadata.optimalPostingTime}
                  </div>
                  <div>
                    <span className="font-medium">Estimated Reach:</span> {post.metadata.estimatedReach.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Categories:</span> {post.metadata.suggestedCategories.join(", ")}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(post.content)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => savePost(post)}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("/feed", "_blank")}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post to Feed
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Templates Dialog */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post Templates</DialogTitle>
            <DialogDescription>
              Choose from pre-built templates to generate specific types of content
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <Badge variant="outline">
                      {template.usageCount} uses
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p><span className="font-medium">Category:</span> {template.category}</p>
                    <p><span className="font-medium">Industry:</span> {template.industry}</p>
                    <p><span className="font-medium">Tone:</span> {template.tone}</p>
                    <p><span className="font-medium">Target:</span> {template.targetAudience}</p>
                  </div>
                  
                  <div className="text-sm">
                    <p className="font-medium">Example Output:</p>
                    <p className="text-muted-foreground">{template.exampleOutput}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button 
                    onClick={() => useTemplate(template)}
                    className="w-full"
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Configuration Dialog */}
      <Dialog open={showConfig} onOpenChange={setShowConfig}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Service Configuration</DialogTitle>
            <DialogDescription>
              Configure your AI service API keys and generation parameters
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Tabs defaultValue="openai" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="openai">OpenAI</TabsTrigger>
                <TabsTrigger value="grok">Grok</TabsTrigger>
                <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
              </TabsList>

              <TabsContent value="openai" className="space-y-4">
                <div>
                  <Label htmlFor="openaiKey">OpenAI API Key</Label>
                  <Input
                    id="openaiKey"
                    type="password"
                    placeholder="sk-..."
                    value={config.openaiApiKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, openaiApiKey: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="openaiModel">Model</Label>
                  <Select value={config.openaiModel} onValueChange={(value) => setConfig(prev => ({ ...prev, openaiModel: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="grok" className="space-y-4">
                <div>
                  <Label htmlFor="grokKey">Grok API Key</Label>
                  <Input
                    id="grokKey"
                    type="password"
                    placeholder="Enter Grok API key"
                    value={config.grokApiKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, grokApiKey: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="grokModel">Model</Label>
                  <Select value={config.grokModel} onValueChange={(value) => setConfig(prev => ({ ...prev, grokModel: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grok-beta">Grok Beta</SelectItem>
                      <SelectItem value="grok-pro">Grok Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="anthropic" className="space-y-4">
                <div>
                  <Label htmlFor="anthropicKey">Anthropic API Key</Label>
                  <Input
                    id="anthropicKey"
                    type="password"
                    placeholder="sk-ant-..."
                    value={config.anthropicApiKey}
                    onChange={(e) => setConfig(prev => ({ ...prev, anthropicApiKey: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="anthropicModel">Model</Label>
                  <Select value={config.anthropicModel} onValueChange={(value) => setConfig(prev => ({ ...prev, anthropicModel: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
                      <SelectItem value="claude-3-opus-20240229">Claude 3 Opus</SelectItem>
                      <SelectItem value="claude-3-haiku-20240307">Claude 3 Haiku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="maxTokens">Max Tokens</Label>
                <Input
                  id="maxTokens"
                  type="number"
                  value={config.maxTokens}
                  onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  value={config.temperature}
                  onChange={(e) => setConfig(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowConfig(false)}>
              Save Configuration
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
