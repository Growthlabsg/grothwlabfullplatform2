"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatDate } from "@/utils/format"
import type { Deal, DealStage } from "@/types/investor-dashboard"

interface DealPipelineProps {
  deals: Deal[]
  className?: string
}

export function DealPipeline({ deals, className }: DealPipelineProps) {
  const [activeTab, setActiveTab] = useState<DealStage | "all">("all")

  const filteredDeals = activeTab === "all" ? deals : deals.filter((deal) => deal.dealStage === activeTab)

  const getDealStageLabel = (stage: DealStage): string => {
    switch (stage) {
      case "new":
        return "New"
      case "screening":
        return "Screening"
      case "meeting":
        return "Meeting"
      case "due-diligence":
        return "Due Diligence"
      case "committee":
        return "Investment Committee"
      case "term-sheet":
        return "Term Sheet"
      case "closed":
        return "Closed"
      case "rejected":
        return "Rejected"
      default:
        return stage
    }
  }

  const getDealStageColor = (stage: DealStage): string => {
    switch (stage) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "screening":
        return "bg-purple-100 text-purple-800"
      case "meeting":
        return "bg-indigo-100 text-indigo-800"
      case "due-diligence":
        return "bg-amber-100 text-amber-800"
      case "committee":
        return "bg-orange-100 text-orange-800"
      case "term-sheet":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-emerald-100 text-emerald-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const stages: DealStage[] = [
    "new",
    "screening",
    "meeting",
    "due-diligence",
    "committee",
    "term-sheet",
    "closed",
    "rejected",
  ]

  const stageCounts = stages.reduce(
    (acc, stage) => {
      acc[stage] = deals.filter((deal) => deal.dealStage === stage).length
      return acc
    },
    {} as Record<DealStage, number>,
  )

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Deal Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DealStage | "all")}>
          <TabsList className="mb-4 w-full justify-start overflow-auto">
            <TabsTrigger value="all">All ({deals.length})</TabsTrigger>
            {stages.map((stage) => (
              <TabsTrigger key={stage} value={stage}>
                {getDealStageLabel(stage)} ({stageCounts[stage]})
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {filteredDeals.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <p className="text-muted-foreground">No deals in this stage</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDeals.map((deal) => (
                  <div key={deal.id} className="rounded-lg border p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={deal.logo || "/placeholder.svg?height=40&width=40"}
                            alt={deal.companyName}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-[#1E293B]">{deal.companyName}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{deal.industry}</span>
                            <span>•</span>
                            <span>{deal.stage}</span>
                            <span>•</span>
                            <span>{deal.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getDealStageColor(deal.dealStage)}>{getDealStageLabel(deal.dealStage)}</Badge>
                        <Badge variant="outline">{formatCurrency(deal.askAmount)}</Badge>
                        <Badge variant="outline">{formatDate(deal.dateReceived)}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-[#334155]">
                      <p className="line-clamp-2">{deal.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="text-xs text-muted-foreground">
                        Last activity: <span className="font-medium">{deal.lastActivity}</span>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/investor/deals/${deal.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
