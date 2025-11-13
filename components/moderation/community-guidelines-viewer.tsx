"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Loader2, AlertTriangle, Info, Shield } from "lucide-react"
import { getCommunityGuidelines } from "@/lib/community-guidelines-builder"
import type { CommunityGuidelines, GuidelineItem } from "@/lib/community-guidelines-builder"

interface CommunityGuidelinesViewerProps {
  compact?: boolean
}

export function CommunityGuidelinesViewer({ compact = false }: CommunityGuidelinesViewerProps) {
  const [guidelines, setGuidelines] = useState<CommunityGuidelines | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load community guidelines
    setLoading(true)
    try {
      const data = getCommunityGuidelines()
      setGuidelines(data)
    } catch (error) {
      console.error("Error loading community guidelines:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!guidelines) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <AlertTriangle className="h-8 w-8 text-destructive mb-2" />
        <p className="text-center">Failed to load community guidelines</p>
      </div>
    )
  }

  // Render a compact version for sidebars or modals
  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Community Guidelines
          </CardTitle>
          <CardDescription>Last updated {new Date(guidelines.lastUpdated).toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">{guidelines.description}</p>
          <Accordion type="single" collapsible className="w-full">
            {guidelines.categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className="text-sm font-medium">{category.name}</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm">
                    {guidelines.items
                      .filter((item) => item.categoryId === category.id)
                      .map((item) => (
                        <li key={item.id} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{item.title}</span>
                        </li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">
            <Info className="h-4 w-4 mr-2" />
            View Full Guidelines
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Render the full guidelines
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-primary" />
          {guidelines.name}
        </h1>
        <p className="text-muted-foreground mb-4">{guidelines.description}</p>
        <p className="text-sm text-muted-foreground">
          Version {guidelines.version} • Last updated {new Date(guidelines.lastUpdated).toLocaleDateString()}
        </p>
      </div>

      {guidelines.categories.map((category) => (
        <div key={category.id} className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">{category.name}</h2>
          <p className="text-muted-foreground">{category.description}</p>

          <div className="space-y-6 mt-4">
            {guidelines.items
              .filter((item) => item.categoryId === category.id)
              .sort((a, b) => a.order - b.order)
              .map((item) => (
                <GuidelineItemCard key={item.id} item={item} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function GuidelineItemCard({ item }: { item: GuidelineItem }) {
  const severityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800",
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">{item.title}</CardTitle>
          <Badge className={severityColors[item.severity]}>
            {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{item.description}</p>

        {item.examples && item.examples.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Examples:</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {item.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>
        )}

        {item.consequences && item.consequences.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-1">Consequences:</h4>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              {item.consequences.map((consequence, index) => (
                <li key={index}>{consequence}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
