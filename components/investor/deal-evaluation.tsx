"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import type { Deal, EvaluationCriteria } from "@/types/investor-dashboard"

interface DealEvaluationProps {
  deal: Deal
  onSave: (evaluationScores: Record<EvaluationCriteria, number>, notes: string) => void
  className?: string
}

export function DealEvaluation({ deal, onSave, className }: DealEvaluationProps) {
  const [scores, setScores] = useState<Record<EvaluationCriteria, number>>(
    deal.evaluationScores || {
      team: 0,
      product: 0,
      market: 0,
      traction: 0,
      "business-model": 0,
      competition: 0,
      financials: 0,
      valuation: 0,
    },
  )
  const [notes, setNotes] = useState(deal.notes || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleScoreChange = (criteria: EvaluationCriteria, value: number[]) => {
    setScores({
      ...scores,
      [criteria]: value[0],
    })
  }

  const getCriteriaLabel = (criteria: EvaluationCriteria): string => {
    switch (criteria) {
      case "team":
        return "Team Quality"
      case "product":
        return "Product/Solution"
      case "market":
        return "Market Opportunity"
      case "traction":
        return "Traction & Metrics"
      case "business-model":
        return "Business Model"
      case "competition":
        return "Competitive Landscape"
      case "financials":
        return "Financial Projections"
      case "valuation":
        return "Valuation"
      default:
        return criteria
    }
  }

  const calculateTotalScore = (): number => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
    return Math.round(total / 8)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSave(scores, notes)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Deal Evaluation</CardTitle>
        <CardDescription>Evaluate {deal.companyName} across key investment criteria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.keys(scores).map((criteria) => (
            <div key={criteria} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#1E293B]">
                  {getCriteriaLabel(criteria as EvaluationCriteria)}
                </label>
                <span className="text-sm font-bold">{scores[criteria as EvaluationCriteria]}/10</span>
              </div>
              <Slider
                value={[scores[criteria as EvaluationCriteria]]}
                min={0}
                max={10}
                step={1}
                onValueChange={(value) => handleScoreChange(criteria as EvaluationCriteria, value)}
              />
            </div>
          ))}

          <div className="rounded-lg bg-[#F8FAFC] p-4 text-center">
            <p className="text-sm text-[#334155]">Overall Score</p>
            <p className="text-3xl font-bold text-[#0F7377]">{calculateTotalScore()}/10</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1E293B]">Evaluation Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your evaluation notes here..."
              rows={5}
            />
          </div>

          <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">
            {isSubmitting ? "Saving..." : "Save Evaluation"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
