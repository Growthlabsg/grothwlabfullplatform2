"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/utils/format"
import type { FundingStage, FundingType, Industry } from "@/types/funding"

interface FundingFiltersProps {
  onFilterChange: (filters: FundingFilters) => void
  className?: string
}

export interface FundingFilters {
  types: FundingType[]
  stages: FundingStage[]
  industries: Industry[]
  fundingRange: [number, number]
}

const fundingTypeOptions: { value: FundingType; label: string }[] = [
  { value: "vc", label: "Venture Capital" },
  { value: "angel", label: "Angel Investment" },
  { value: "grant", label: "Grant" },
  { value: "accelerator", label: "Accelerator" },
  { value: "corporate", label: "Corporate Investment" },
  { value: "debt", label: "Debt Financing" },
]

const fundingStageOptions: { value: FundingStage; label: string }[] = [
  { value: "pre-seed", label: "Pre-Seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "series-b", label: "Series B" },
  { value: "series-c", label: "Series C" },
  { value: "growth", label: "Growth" },
  { value: "late-stage", label: "Late Stage" },
]

const industryOptions: { value: Industry; label: string }[] = [
  { value: "fintech", label: "FinTech" },
  { value: "healthtech", label: "HealthTech" },
  { value: "edtech", label: "EdTech" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "saas", label: "SaaS" },
  { value: "ai", label: "AI/ML" },
  { value: "blockchain", label: "Blockchain" },
  { value: "cleantech", label: "CleanTech" },
  { value: "hardware", label: "Hardware" },
  { value: "consumer", label: "Consumer" },
  { value: "enterprise", label: "Enterprise" },
  { value: "other", label: "Other" },
]

export function FundingFilters({ onFilterChange, className }: FundingFiltersProps) {
  const [filters, setFilters] = useState<FundingFilters>({
    types: [],
    stages: [],
    industries: [],
    fundingRange: [0, 10000000],
  })

  const handleTypeChange = (type: FundingType, checked: boolean) => {
    const newTypes = checked ? [...filters.types, type] : filters.types.filter((t) => t !== type)

    const newFilters = { ...filters, types: newTypes }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStageChange = (stage: FundingStage, checked: boolean) => {
    const newStages = checked ? [...filters.stages, stage] : filters.stages.filter((s) => s !== stage)

    const newFilters = { ...filters, stages: newStages }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleIndustryChange = (industry: Industry, checked: boolean) => {
    const newIndustries = checked ? [...filters.industries, industry] : filters.industries.filter((i) => i !== industry)

    const newFilters = { ...filters, industries: newIndustries }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleFundingRangeChange = (value: number[]) => {
    const newFilters = { ...filters, fundingRange: [value[0], value[1]] as [number, number] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const newFilters = {
      types: [],
      stages: [],
      industries: [],
      fundingRange: [0, 10000000],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium text-[#1E293B]">Funding Type</h3>
          <div className="space-y-2">
            {fundingTypeOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${option.value}`}
                  checked={filters.types.includes(option.value)}
                  onCheckedChange={(checked) => handleTypeChange(option.value, checked as boolean)}
                />
                <Label htmlFor={`type-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[#1E293B]">Funding Stage</h3>
          <div className="space-y-2">
            {fundingStageOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`stage-${option.value}`}
                  checked={filters.stages.includes(option.value)}
                  onCheckedChange={(checked) => handleStageChange(option.value, checked as boolean)}
                />
                <Label htmlFor={`stage-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[#1E293B]">Industry</h3>
          <div className="space-y-2">
            {industryOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`industry-${option.value}`}
                  checked={filters.industries.includes(option.value)}
                  onCheckedChange={(checked) => handleIndustryChange(option.value, checked as boolean)}
                />
                <Label htmlFor={`industry-${option.value}`} className="text-sm">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-[#1E293B]">Funding Range</h3>
          <div className="space-y-6">
            <Slider
              defaultValue={[0, 10000000]}
              min={0}
              max={10000000}
              step={100000}
              value={[filters.fundingRange[0], filters.fundingRange[1]]}
              onValueChange={handleFundingRangeChange}
            />
            <div className="flex items-center justify-between text-sm">
              <span>{formatCurrency(filters.fundingRange[0])}</span>
              <span>{formatCurrency(filters.fundingRange[1])}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Reset Filters
        </Button>
      </CardFooter>
    </Card>
  )
}
