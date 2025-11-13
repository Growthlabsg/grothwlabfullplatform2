"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, FileText, LinkIcon, Plus, Video, Upload, ExternalLink } from "lucide-react"
import type { MentorResource } from "@/types/mentor"

// Sample data
const RESOURCES: MentorResource[] = [
  {
    id: "resource-1",
    title: "Pitch Deck Template",
    description: "A comprehensive pitch deck template for early-stage startups.",
    type: "template",
    url: "#",
    tags: ["fundraising", "pitch", "presentation"],
    dateAdded: "2025-04-15",
    visibility: "public",
  },
  {
    id: "resource-2",
    title: "Customer Development Interview Guide",
    description: "A step-by-step guide to conducting effective customer development interviews.",
    type: "article",
    url: "#",
    tags: ["product-market-fit", "customer-development", "interviews"],
    dateAdded: "2025-04-20",
    visibility: "mentees",
  },
  {
    id: "resource-3",
    title: "Scaling a Tech Team",
    description: "Video presentation on best practices for scaling technical teams.",
    type: "video",
    url: "#",
    tags: ["team-building", "engineering", "scaling"],
    dateAdded: "2025-04-25",
    visibility: "public",
  },
  {
    id: "resource-4",
    title: "Financial Model for SaaS Startups",
    description: "A comprehensive financial model spreadsheet for SaaS startups.",
    type: "template",
    url: "#",
    tags: ["finance", "saas", "metrics"],
    dateAdded: "2025-05-01",
    visibility: "mentees",
  },
]

export function ResourceLibrary() {
  const [resources] = useState<MentorResource[]>(RESOURCES)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "article",
    url: "",
    tags: "",
    visibility: "public",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setNewResource({
      ...newResource,
      [e.target.name]: e.target.value,
    })
  }

  const handleTypeChange = (value: string) => {
    setNewResource({
      ...newResource,
      type: value as MentorResource["type"],
    })
  }

  const handleVisibilityChange = (value: string) => {
    setNewResource({
      ...newResource,
      visibility: value as MentorResource["visibility"],
    })
  }

  const handleAddResource = () => {
    // In a real app, this would send data to the backend
    console.log("Adding new resource:", newResource)
    // Reset form
    setNewResource({
      title: "",
      description: "",
      type: "article",
      url: "",
      tags: "",
      visibility: "public",
    })
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filter === "all") return matchesSearch
    if (filter === "public") return matchesSearch && resource.visibility === "public"
    if (filter === "mentees") return matchesSearch && resource.visibility === "mentees"
    if (filter === "private") return matchesSearch && resource.visibility === "private"
    if (filter === "template") return matchesSearch && resource.type === "template"
    if (filter === "article") return matchesSearch && resource.type === "article"
    if (filter === "video") return matchesSearch && resource.type === "video"
    return matchesSearch
  })

  const getResourceIcon = (type: MentorResource["type"]) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "book":
        return <BookOpen className="h-5 w-5" />
      case "template":
        return <FileText className="h-5 w-5" />
      default:
        return <LinkIcon className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Resource Library</CardTitle>
        <CardDescription>Manage resources to share with mentees and the community</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="browse" className="w-full">
          <TabsList>
            <TabsTrigger value="browse">Browse Resources</TabsTrigger>
            <TabsTrigger value="manage">Manage Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="browse" className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Resources</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="mentees">Mentees Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Add New Resource</DialogTitle>
                    <DialogDescription>
                      Add a resource to share with your mentees or the GrowthLab community.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" value={newResource.title} onChange={handleInputChange} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newResource.description}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="type">Resource Type</Label>
                        <Select value={newResource.type} onValueChange={handleTypeChange}>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="article">Article</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="book">Book</SelectItem>
                            <SelectItem value="template">Template</SelectItem>
                            <SelectItem value="tool">Tool</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="visibility">Visibility</Label>
                        <Select value={newResource.visibility} onValueChange={handleVisibilityChange}>
                          <SelectTrigger id="visibility">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="mentees">Mentees Only</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="url">Resource URL</Label>
                      <Input
                        id="url"
                        name="url"
                        value={newResource.url}
                        onChange={handleInputChange}
                        placeholder="https://"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={newResource.tags}
                        onChange={handleInputChange}
                        placeholder="fundraising, pitch, product"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleAddResource} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                      Add Resource
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="overflow-hidden">
                  <div className="border-l-4 border-[#0F7377] p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F7377]/10 text-[#0F7377]">
                          {getResourceIcon(resource.type)}
                        </div>
                        <h3 className="font-medium">{resource.title}</h3>
                      </div>
                      <Badge
                        variant={
                          resource.visibility === "public"
                            ? "default"
                            : resource.visibility === "mentees"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {resource.visibility === "public"
                          ? "Public"
                          : resource.visibility === "mentees"
                            ? "Mentees"
                            : "Private"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Added: {new Date(resource.dateAdded).toLocaleDateString()}
                      </span>
                      <Button size="sm" variant="outline" className="text-[#0F7377]" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-3 w-3" />
                          View Resource
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="manage" className="space-y-4">
            <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90">
              <Upload className="mr-2 h-4 w-4" />
              Upload New Files
            </Button>
            <div className="rounded-md border p-4">
              <p className="text-sm text-muted-foreground">
                The resource management interface allows you to upload files, track usage stats, and organize your
                resources into collections.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
