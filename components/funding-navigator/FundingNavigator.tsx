"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

// For demo, import sample data statically. In production, fetch dynamically.
import opportunities from "../../funding-data/opportunities.json"

type Opportunity = {
  id: string
  title: string
  description: string
  amount: string
  deadline: string
  eligibility: string
  projectTypes: string[]
  region: string
  link: string
}

export default function FundingNavigator() {
  const [tab, setTab] = useState("search")
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [regionFilter, setRegionFilter] = useState("")
  const [filtered, setFiltered] = useState<Opportunity[]>([])

  useEffect(() => {
    let results = (opportunities as Opportunity[])
    if (search) {
      results = results.filter(o =>
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.description.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (typeFilter) {
      results = results.filter(o => o.projectTypes.includes(typeFilter) || o.projectTypes.includes("All"))
    }
    if (regionFilter) {
      results = results.filter(o => o.region === regionFilter)
    }
    setFiltered(results)
  }, [search, typeFilter, regionFilter])

  // Unique project types and regions for filters
  const allTypes = Array.from(new Set((opportunities as Opportunity[]).flatMap(o => o.projectTypes)))
  const allRegions = Array.from(new Set((opportunities as Opportunity[]).map(o => o.region)))

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Funding Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="mb-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Tab */}
          {tab === "search" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input
                  placeholder="Search funding opportunities..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="flex-1"
                />
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {allTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Regions</SelectItem>
                    {allRegions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4">
                {filtered.length === 0 && <div className="text-muted-foreground">No opportunities found.</div>}
                {filtered.map(o => (
                  <Card key={o.id} className="border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{o.title}</h3>
                          <p className="text-muted-foreground mb-1">{o.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs mb-1">
                            <span className="bg-muted px-2 py-1 rounded">{o.amount}</span>
                            <span className="bg-muted px-2 py-1 rounded">Deadline: {o.deadline}</span>
                            <span className="bg-muted px-2 py-1 rounded">{o.region}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mb-1">Eligibility: {o.eligibility}</div>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[120px]">
                          <Button asChild size="sm" className="w-full">
                            <a href={o.link} target="_blank" rel="noopener noreferrer">View & Apply</a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Dashboard Tab */}
          {tab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Personalized Dashboard</h2>
              <div className="text-muted-foreground mb-4">(Coming soon: personalized recommendations, saved and applied opportunities, and status tracking.)</div>
            </div>
          )}

          {/* Resources Tab */}
          {tab === "resources" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Funding Resources</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><a href="https://www.sbir.gov/tutorials" target="_blank" rel="noopener noreferrer" className="underline">Tips for Writing Successful Proposals</a></li>
                <li><a href="https://www.grantspace.org/resources/sample-documents/" target="_blank" rel="noopener noreferrer" className="underline">Sample Grant Documents</a></li>
                <li><a href="https://www.fundsforngos.org/article-categories/proposal-writing/" target="_blank" rel="noopener noreferrer" className="underline">Proposal Writing Guides</a></li>
                <li><a href="https://www.candid.org/" target="_blank" rel="noopener noreferrer" className="underline">Candid (Funding Database)</a></li>
              </ul>
            </div>
          )}

          {/* Calendar Tab */}
          {tab === "calendar" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-2">Important Dates</h2>
              <div className="mb-4 text-muted-foreground">(Coming soon: add deadlines to your calendar and set reminders.)</div>
              <Calendar
                mode="multiple"
                selected={(filtered.length > 0 ? filtered.map(o => new Date(o.deadline)) : [])}
                className="border rounded"
                disabled
              />
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                {filtered.map(o => (
                  <li key={o.id}>{o.title}: {o.deadline}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}