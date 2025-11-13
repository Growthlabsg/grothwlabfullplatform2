"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Briefcase, MapPin, Clock, DollarSign, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  salary?: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote"
  postedDate: string
  applicants: number
  status: "open" | "closed" | "draft"
  isBookmarked: boolean
}

export function JobsPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<"all" | "bookmarked" | "applied">("all")

  // Mock data - in a real app this would come from a data source
  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechNova",
      companyLogo: "/abstract-geometric-shapes.png",
      location: "Singapore",
      salary: "$8,000 - $12,000 / month",
      type: "Full-time",
      postedDate: "2 days ago",
      applicants: 24,
      status: "open",
      isBookmarked: true,
    },
    {
      id: "2",
      title: "Product Manager",
      company: "GrowthLab",
      companyLogo: "/images/GrowthLab Icon (1).png",
      location: "Singapore",
      salary: "$10,000 - $15,000 / month",
      type: "Full-time",
      postedDate: "1 week ago",
      applicants: 45,
      status: "open",
      isBookmarked: false,
    },
    {
      id: "3",
      title: "UX/UI Designer",
      company: "DesignHub",
      companyLogo: "/abstract-ms-flow.png",
      location: "Remote",
      salary: "$6,000 - $9,000 / month",
      type: "Full-time",
      postedDate: "3 days ago",
      applicants: 36,
      status: "open",
      isBookmarked: true,
    },
    {
      id: "4",
      title: "Data Scientist",
      company: "AI Solutions",
      companyLogo: "/machine-learning-concept.png",
      location: "Singapore",
      salary: "$7,000 - $11,000 / month",
      type: "Full-time",
      postedDate: "Just now",
      applicants: 12,
      status: "open",
      isBookmarked: false,
    },
    {
      id: "5",
      title: "Marketing Intern",
      company: "GrowthLab",
      companyLogo: "/images/GrowthLab Icon (1).png",
      location: "Singapore",
      type: "Internship",
      postedDate: "1 day ago",
      applicants: 18,
      status: "open",
      isBookmarked: false,
    },
  ]

  // Filter jobs based on search and filter
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || (filter === "bookmarked" && job.isBookmarked)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-2">
      {/* Search and filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-1 mb-2">
        <Button
          variant={filter === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("all")}
          className="flex-1"
        >
          All
        </Button>
        <Button
          variant={filter === "bookmarked" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("bookmarked")}
          className="flex-1"
        >
          Bookmarked
        </Button>
        <Button
          variant={filter === "applied" ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilter("applied")}
          className="flex-1"
        >
          Applied
        </Button>
      </div>

      {/* Jobs list */}
      <ScrollArea className="h-[300px] pr-3">
        {filteredJobs.length > 0 ? (
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div key={job.id} className="flex items-start gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={job.companyLogo || "/placeholder.svg"} alt={job.company} />
                  <AvatarFallback>{job.company.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">{job.title}</p>
                    <Badge variant={job.isBookmarked ? "default" : "outline"} className="ml-2">
                      {job.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{job.company}</p>
                  <div className="flex flex-wrap items-center mt-1 text-xs text-muted-foreground gap-x-2">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-3 w-3 mr-1" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Job Details</DropdownMenuItem>
                    <DropdownMenuItem>Apply Now</DropdownMenuItem>
                    <DropdownMenuItem>{job.isBookmarked ? "Remove Bookmark" : "Bookmark Job"}</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Share Job</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <p>No jobs found</p>
            <p className="text-sm">Try a different search term</p>
            <Button variant="outline" size="sm" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Post a Job
            </Button>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
