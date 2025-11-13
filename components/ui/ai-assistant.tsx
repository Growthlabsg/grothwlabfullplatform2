"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Sparkles,
  Send,
  Brain,
  Lightbulb,
  Wand2,
  X,
  RefreshCw,
  Copy,
  CheckCircle,
  AlertCircle,
  Settings,
  MessageSquare,
} from "lucide-react"
import { aiService } from "@/lib/ai-config"

interface AIAssistantProps {
  title?: string
  description?: string
  placeholder?: string
  suggestions?: string[]
  onResponse?: (response: string) => void
  modelId?: string
  maxTokens?: number
  temperature?: number
  systemPrompt?: string
  className?: string
  variant?: "default" | "compact" | "full"
}

export function AIAssistant({
  title = "AI Assistant",
  description = "Get AI-powered assistance for your task",
  placeholder = "Describe what you need help with...",
  suggestions = [],
  onResponse,
  modelId,
  maxTokens,
  temperature,
  systemPrompt,
  className = "",
  variant = "default"
}: AIAssistantProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState("")
  const [showSettings, setShowSettings] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a prompt to get AI assistance.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const aiResponse = await aiService.generateContent(prompt, modelId, {
        maxTokens,
        temperature,
        systemPrompt,
      })
      
      setResponse(aiResponse)
      onResponse?.(aiResponse)
      
      toast({
        title: "AI Response Generated",
        description: "Your AI response has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "AI Error",
        description: error instanceof Error ? error.message : "Failed to generate AI response",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestion = (suggestion: string) => {
    setPrompt(suggestion)
    handleSubmit()
  }

  const copyResponse = () => {
    navigator.clipboard.writeText(response)
    toast({
      title: "Response Copied",
      description: "AI response has been copied to clipboard.",
    })
  }

  const clearAll = () => {
    setPrompt("")
    setResponse("")
    setIsOpen(false)
  }

  if (variant === "compact") {
    return (
      <div className={className}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[#0F7377] hover:bg-[#0F7377]/90"
          size="sm"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          AI Assist
        </Button>
        
        {isOpen && (
          <Card className="absolute z-50 mt-2 w-96">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{title}</CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[80px]"
                />
              </div>
              
              {suggestions.length > 0 && (
                <div>
                  <Label className="text-xs">Suggestions</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant="outline"
                        className="text-xs border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                        onClick={() => handleSuggestion(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !prompt.trim()}
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1"
                  size="sm"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
              </div>
              
              {response && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-xs">AI Response</Label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyResponse}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm">{response}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  if (variant === "full") {
    return (
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[#0F7377]" />
                {title}
              </CardTitle>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSettings(!showSettings)}
                className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={clearAll}
                className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showSettings && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-xs">Model</Label>
                <Input
                  value={modelId || "Default"}
                  disabled
                  className="text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Max Tokens</Label>
                <Input
                  type="number"
                  value={maxTokens || 4096}
                  disabled
                  className="text-xs"
                />
              </div>
              <div>
                <Label className="text-xs">Temperature</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={temperature || 0.7}
                  disabled
                  className="text-xs"
                />
              </div>
            </div>
          )}
          
          <div>
            <Label>Your Request</Label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholder}
              className="min-h-[120px]"
            />
          </div>
          
          {suggestions.length > 0 && (
            <div>
              <Label className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                Quick Suggestions
              </Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                    onClick={() => handleSuggestion(suggestion)}
                  >
                    <Wand2 className="h-3 w-3 mr-1" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !prompt.trim()}
              className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1"
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {isLoading ? "Generating Response..." : "Generate AI Response"}
            </Button>
          </div>
          
          {response && (
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <Label>AI Response</Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyResponse}
                    className="border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  // Default variant
  return (
    <div className={className}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0F7377] hover:bg-[#0F7377]/90"
      >
        <Sparkles className="h-4 w-4 mr-2" />
        AI Assistant
      </Button>
      
      {isOpen && (
        <Card className="absolute z-50 mt-2 w-80">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{title}</CardTitle>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={placeholder}
                className="min-h-[100px]"
              />
            </div>
            
            {suggestions.length > 0 && (
              <div>
                <Label className="text-xs">Suggestions</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      className="text-xs border-[#0F7377] text-[#0F7377] hover:bg-[#0F7377]/10"
                      onClick={() => handleSuggestion(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1"
                size="sm"
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Generating..." : "Generate"}
              </Button>
            </div>
            
            {response && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs">AI Response</Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={copyResponse}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-sm">{response}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
} 