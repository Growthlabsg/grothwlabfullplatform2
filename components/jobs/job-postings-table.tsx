"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Eye, Edit, Copy, Trash2, MoreHorizontal, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for demonstration
const mockJobs = [
  {
    id: "job1",
    title: "Full Stack Developer",
    company: {
      id: "c1",
      name: "TechNova",
      logo: "/abstract-geometric-shapes.png",
    },
    location: {
      city: "Singapore",
      country: "Singapore",
      remote: "hybrid",
    },
    status: "published",
    featured: true,
    views: 245,
    applications: 18,
    postedDate: "2023-04-15T08:00:00Z",
    expiryDate: "2023-05-15T08:00:00Z",
    visaSponsorship: true,
  },
  {
    id: "job2",
    title: "Product Manager",
    company: {
      id: "c1",
      name: "TechNova",
      logo: "/abstract-geometric-shapes.png",
    },
    location: {
      city: "Singapore",
      country: "Singapore",
      remote: "on-site",
    },
    status: "published",
    featured: false,
    views: 189,
    applications: 12,
    postedDate: "2023-04-10T10:30:00Z",
    expiryDate: "2023-05-10T10:30:00Z",
    visaSponsorship: false,
  },
  {
    id: "job3",
    title: "UX Designer",
    company: {
      id: "c1",
      name: "TechNova",
      logo: "/abstract-geometric-shapes.png",
    },
    location: {
      city: "Singapore",
      country: "Singapore",
      remote: "remote",
    },
    status: "published",
    featured: false,
    views: 210,
    applications: 15,
    postedDate: "2023-04-05T09:15:00Z",
    expiryDate: "2023-05-05T09:15:00Z",
    visaSponsorship: true,
  },
  {
    id: "job4",
    title: "Data Scientist",
    company: {
      id: "c1",
      name: "TechNova",
      logo: "/abstract-geometric-shapes.png",
    },
    location: {
      city: "Singapore",
      country: "Singapore",
      remote: "hybrid",
    },
    status: "draft",
    featured: false,
    views: 0,
    applications: 0,
    postedDate: "2023-04-18T14:20:00Z",
    expiryDate: null,
  },
  {
    id: "job5",
    title: "Marketing Manager",
    company: {
      id: "c1",
      name: "TechNova",
      logo: "/abstract-geometric-shapes.png",
    },
    location: {
      city: "Singapore",
      country: "Singapore",
      remote: "hybrid",
    },
    status: "closed",
    featured: false,
    views: 165,
    applications: 8,
    postedDate: "2023-04-01T11:45:00Z",
    expiryDate: "2023-05-01T11:45:00Z",
  },
]

export function JobPostingsTable() {
  const [jobs, setJobs] = useState(mockJobs)
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge variant="default" className="bg-green-500">
            Published
          </Badge>
        )
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "closed":
        return <Badge variant="secondary">Closed</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getRemoteLabel = (remote: string) => {
    switch (remote) {
      case "remote":
        return "Remote"
      case "hybrid":
        return "Hybrid"
      case "on-site":
        return "On-site"
      default:
        return remote
    }
  }

  const handleSelectJob = (jobId: string) => {
    setSelectedJobs((prev) => {
      if (prev.includes(jobId)) {
        return prev.filter((id) => id !== jobId)
      } else {
        return [...prev, jobId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedJobs.length === jobs.length) {
      setSelectedJobs([])
    } else {
      setSelectedJobs(jobs.map((job) => job.id))
    }
  }

  const handleDeleteJob = (jobId: string) => {
    setJobToDelete(jobId)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteJob = () => {
    if (jobToDelete) {
      setJobs((prev) => prev.filter((job) => job.id !== jobToDelete))
      setSelectedJobs((prev) => prev.filter((id) => id !== jobToDelete))
      toast({
        title: "Job deleted",
        description: "The job posting has been deleted successfully.",
      })
    }
    setDeleteDialogOpen(false)
    setJobToDelete(null)
  }

  const handleBulkAction = (action: string) => {
    if (selectedJobs.length === 0) {
      toast({
        title: "No jobs selected",
        description: "Please select at least one job to perform this action.",
        variant: "destructive",
      })
      return
    }

    if (action === "delete") {
      setJobs((prev) => prev.filter((job) => !selectedJobs.includes(job.id)))
      setSelectedJobs([])
      toast({
        title: "Jobs deleted",
        description: `${selectedJobs.length} job(s) have been deleted.`,
      })
    } else if (action === "publish") {
      setJobs((prev) => prev.map((job) => (selectedJobs.includes(job.id) ? { ...job, status: "published" } : job)))
      toast({
        title: "Jobs published",
        description: `${selectedJobs.length} job(s) have been published.`,
      })
    } else if (action === "close") {
      setJobs((prev) => prev.map((job) => (selectedJobs.includes(job.id) ? { ...job, status: "closed" } : job)))
      toast({
        title: "Jobs closed",
        description: `${selectedJobs.length} job(s) have been closed.`,
      })
    }
  }

  const handleDuplicateJob = (jobId: string) => {
    const jobToDuplicate = jobs.find((job) => job.id === jobId)
    if (jobToDuplicate) {
      const newJob = {
        ...jobToDuplicate,
        id: `job${jobs.length + 1}`,
        title: `${jobToDuplicate.title} (Copy)`,
        status: "draft",
        views: 0,
        applications: 0,
        postedDate: new Date().toISOString(),
        expiryDate: null,
      }
      setJobs((prev) => [...prev, newJob])
      toast({
        title: "Job duplicated",
        description: "A copy of the job posting has been created as a draft.",
      })
    }
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedJobs.length === jobs.length && jobs.length > 0}
              onCheckedChange={handleSelectAll}
              aria-label="Select all jobs"
            />
            <span className="text-sm text-muted-foreground">
              {selectedJobs.length} of {jobs.length} selected
            </span>
          </div>
          {selectedJobs.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("publish")}>
                Publish
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("close")}>
                Close
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleBulkAction("delete")}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="w-[40px] py-3 px-4">
                <Checkbox
                  checked={selectedJobs.length === jobs.length && jobs.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all jobs"
                />
              </th>
              <th className="text-left py-3 px-4 font-medium">Job Title</th>
              <th className="text-left py-3 px-4 font-medium">Location</th>
              <th className="text-left py-3 px-4 font-medium">Visa Sponsorship</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Posted</th>
              <th className="text-center py-3 px-4 font-medium">Views</th>
              <th className="text-center py-3 px-4 font-medium">Applications</th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="py-3 px-4">
                  <Checkbox
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={() => handleSelectJob(job.id)}
                    aria-label={`Select ${job.title}`}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 rounded-md overflow-hidden bg-muted">
                      {job.company.logo ? (
                        <Image
                          src={job.company.logo || "/placeholder.svg"}
                          alt={`${job.company.name} logo`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary">
                          {job.company.name[0]}
                        </div>
                      )}
                    </div>
                    <div>
                      <Link href={`/jobs/${job.id}`} className="font-medium hover:underline">
                        {job.title}
                      </Link>
                      {job.featured && (
                        <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-200">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    {job.location.city}, {job.location.country}
                    <Badge variant="outline" className="ml-2">
                      {getRemoteLabel(job.location.remote)}
                    </Badge>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {job.visaSponsorship ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Visa Sponsored
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-gray-600">
                      No Visa Sponsorship
                    </Badge>
                  )}
                </td>
                <td className="py-3 px-4">{getStatusBadge(job.status)}</td>
                <td className="py-3 px-4">
                  <div className="text-sm">{formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</div>
                  {job.expiryDate && (
                    <div className="text-xs text-muted-foreground">
                      Expires: {formatDistanceToNow(new Date(job.expiryDate), { addSuffix: true })}
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 text-center">{job.views}</td>
                <td className="py-3 px-4 text-center">
                  <Link href={`/jobs/applications?jobId=${job.id}`} className="hover:underline">
                    {job.applications}
                  </Link>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/jobs/${job.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View job</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/jobs/edit/${job.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit job</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/jobs/analytics/${job.id}`}>
                        <BarChart3 className="h-4 w-4" />
                        <span className="sr-only">Job analytics</span>
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleDuplicateJob(job.id)}>
                          <Copy className="h-4 w-4 mr-2" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/jobs/applications?jobId=${job.id}`}>
                            <Users className="h-4 w-4 mr-2" /> View Applications
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteJob(job.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this job?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job posting and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteJob} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
