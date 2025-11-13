"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Target, 
  TrendingUp, 
  MapPin, 
  Clock, 
  Star, 
  Users, 
  Award,
  Zap,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Building2
} from "lucide-react"
import { MatchingAlgorithm } from "@/lib/mentor-connect-service"

interface MatchingAlgorithmProps {
  algorithm?: MatchingAlgorithm
  onAlgorithmChange?: (algorithm: MatchingAlgorithm) => void
}

export function MatchingAlgorithm({ algorithm, onAlgorithmChange }: MatchingAlgorithmProps) {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<MatchingAlgorithm>(
    algorithm || {
      weights: {
        expertise: 0.25,
        industry: 0.20,
        location: 0.15,
        availability: 0.15,
        rating: 0.15,
        goals: 0.10
      },
      thresholds: {
        minimumScore: 0.6,
        maximumDistance: 100,
        minimumRating: 4.0
      }
    }
  )

  const handleWeightChange = (factor: keyof MatchingAlgorithm['weights'], value: number[]) => {
    const newWeights = { ...currentAlgorithm.weights, [factor]: value[0] }
    const newAlgorithm = { ...currentAlgorithm, weights: newWeights }
    setCurrentAlgorithm(newAlgorithm)
    onAlgorithmChange?.(newAlgorithm)
  }

  const handleThresholdChange = (factor: keyof MatchingAlgorithm['thresholds'], value: number[]) => {
    const newThresholds = { ...currentAlgorithm.thresholds, [factor]: value[0] }
    const newAlgorithm = { ...currentAlgorithm, thresholds: newThresholds }
    setCurrentAlgorithm(newAlgorithm)
    onAlgorithmChange?.(newAlgorithm)
  }

  const getFactorIcon = (factor: string) => {
    switch (factor) {
      case 'expertise': return <Brain className="h-4 w-4" />
      case 'industry': return <Building2 className="h-4 w-4" />
      case 'location': return <MapPin className="h-4 w-4" />
      case 'availability': return <Clock className="h-4 w-4" />
      case 'rating': return <Star className="h-4 w-4" />
      case 'goals': return <Target className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const getFactorDescription = (factor: string) => {
    switch (factor) {
      case 'expertise': return "Skills and knowledge alignment"
      case 'industry': return "Relevant industry experience"
      case 'location': return "Geographic proximity"
      case 'availability': return "Scheduling compatibility"
      case 'rating': return "Quality of previous mentoring"
      case 'goals': return "Alignment of objectives"
      default: return ""
    }
  }

  const totalWeight = Object.values(currentAlgorithm.weights).reduce((sum, weight) => sum + weight, 0)

  return (
    <div className="space-y-8">
      {/* Algorithm Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Smart Matching Algorithm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4">How it works</h3>
              <p className="text-muted-foreground mb-4">
                Our AI-powered algorithm analyzes multiple factors to find the perfect mentor-mentee matches. 
                Each factor is weighted based on its importance in successful mentoring relationships.
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Weight Distribution</span>
                  <Badge variant={totalWeight === 1 ? "default" : "destructive"}>
                    {Math.round(totalWeight * 100)}%
                  </Badge>
                </div>
                {totalWeight !== 1 && (
                  <p className="text-xs text-destructive">
                    Weights should sum to 100%. Current: {Math.round(totalWeight * 100)}%
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Algorithm Performance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Match Success Rate</span>
                  <span className="text-sm font-medium">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Match Score</span>
                  <span className="text-sm font-medium">4.2/5.0</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Rate</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weight Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Algorithm Weights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(currentAlgorithm.weights).map(([factor, weight]) => (
              <div key={factor} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFactorIcon(factor)}
                    <Label className="capitalize">{factor}</Label>
                  </div>
                  <Badge variant="secondary">
                    {Math.round(weight * 100)}%
                  </Badge>
                </div>
                <Slider
                  value={[weight]}
                  onValueChange={(value) => handleWeightChange(factor as keyof MatchingAlgorithm['weights'], value)}
                  max={1}
                  min={0}
                  step={0.05}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  {getFactorDescription(factor)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Threshold Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Matching Thresholds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Minimum Match Score</Label>
                <Badge variant="secondary">
                  {Math.round(currentAlgorithm.thresholds.minimumScore * 100)}%
                </Badge>
              </div>
              <Slider
                value={[currentAlgorithm.thresholds.minimumScore]}
                onValueChange={(value) => handleThresholdChange('minimumScore', value)}
                max={1}
                min={0.1}
                step={0.05}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Minimum compatibility score required for a match
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Maximum Distance (km)</Label>
                <Badge variant="secondary">
                  {currentAlgorithm.thresholds.maximumDistance}km
                </Badge>
              </div>
              <Slider
                value={[currentAlgorithm.thresholds.maximumDistance]}
                onValueChange={(value) => handleThresholdChange('maximumDistance', value)}
                max={500}
                min={10}
                step={10}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Maximum distance for in-person meetings
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Minimum Rating</Label>
                <Badge variant="secondary">
                  {currentAlgorithm.thresholds.minimumRating}/5
                </Badge>
              </div>
              <Slider
                value={[currentAlgorithm.thresholds.minimumRating]}
                onValueChange={(value) => handleThresholdChange('minimumRating', value)}
                max={5}
                min={1}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Minimum mentor rating required
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Algorithm Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Successful Matches</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 