"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Download, Eye } from "lucide-react"
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

// Mock data for demonstration
const mockApplications = [
  {
    id: "app1",
    jobId: "job1",
    jobTitle: "Full Stack Developer",
    applicantId: "user1",
    applicantName: "Sarah Chen",
    applicantAvatar: "/abstract-geometric-shapes.png",
    resumeUrl: "#",
    coverLetterUrl: "#",
    status: "reviewed",
    submittedDate: "2023-04-15T08:00:00Z",
    lastUpdatedDate: "2023-04-16T10:30:00Z",
  },
  {
    id: "app2",
    jobId: "job2",
    jobTitle: "Product Manager",
    applicantId: "user2",
    applicantName: "Alex Wong",
    applicantAvatar: "/abstract-geometric-aw.png",
    resumeUrl: "#",
    coverLetterUrl: "#",
    status: "interviewing",
    submittedDate: "2023-04-12T14:20:00Z",
    lastUpdatedDate: "2023-04-14T09:15:00Z",
  },
  {
    id: "app3",
    jobId: "job1",
    jobTitle: "Full Stack Developer",
    applicantId: "user3",
    applicantName: "Mei Lin",
    applicantAvatar: "/machine-learning-concept.png",
    resumeUrl: "#",
    coverLetterUrl: null,
    status: "submitted",
    submittedDate: "2023-04-16T11:45:00Z",
    lastUpdatedDate: "2023-04-16T11:45:00Z",
  },
  {
    id: "app4",
    jobId: "job3",
    jobTitle: "UX Designer",
    applicantId: "user4",
    applicantName: "David Kumar",
    applicantAvatar: null,
    resumeUrl: "#",
    coverLetterUrl: "#",
    status: "rejected",
    submittedDate: "2023-04-10T09:30:00Z",
    lastUpdatedDate: "2023-04-13T16:20:00Z",
  },
  {
    id: "app5",
    jobId: "job4",
    jobTitle: "Data Scientist",
    applicantId: "user5",
    applicantName: "Lisa Tan",
    applicantAvatar: "/abstract-geometric-ll.png",
    resumeUrl: "#",
    coverLetterUrl: "#",
    status: "offered",
    submittedDate: "2023-04-08T13:10:00Z",
    lastUpdatedDate: "2023-04-15T14:30:00Z",
  },
]

export function JobApplicationsTable() {
  const [applications, setApplications] = useState(mockApplications)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([])
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="outline">Submitted</Badge>
      case "reviewed":
        return <Badge variant="secondary">Reviewed</Badge>
      case "interviewing":
        return (
          <Badge variant="default" className="bg-blue-500">
            Interviewing
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "offered":
        return (
          <Badge variant="default" className="bg-green-500">
            Offered
          </Badge>
        )
      case "hired":
        return (
          <Badge variant="default" className="bg-[#0F7377]">
            Hired
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleStatusChange = (applicationId: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus, lastUpdatedDate: new Date().toISOString() } : app,
      ),
    )

    toast({
      title: "Application status updated",
      description: `Application status has been changed to ${newStatus}.`,
    })
  }

  const handleSelectApplication = (applicationId: string) => {
    setSelectedApplications((prev) => {
      if (prev.includes(applicationId)) {
        return prev.filter((id) => id !== applicationId)
      } else {
        return [...prev, applicationId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedApplications.length === applications.length) {
      setSelectedApplications([])
    } else {
      setSelectedApplications(applications.map((app) => app.id))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedApplications.length === 0) {
      toast({
        title: "No applications selected",
        description: "Please select at least one application to perform this action.",
        variant: "destructive",
      })
      return
    }

    if (action === "delete") {
      setApplications((prev) => prev.filter((app) => !selectedApplications.includes(app.id)))
      setSelectedApplications([])
      toast({
        title: "Applications deleted",
        description: `${selectedApplications.length} application(s) have been deleted.`,
      })
    } else if (action === "status") {
      // In a real app, this would open a dialog to select the new status
      toast({
        title: "Bulk status update",
        description: `This would update the status of ${selectedApplications.length} application(s).`,
      })
    } else if (action === "export") {
      toast({
        title: "Exporting applications",
        description: `${selectedApplications.length} application(s) will be exported.`,
      })
    }
  }

  return (
    <Card>
      <div className="overflow-x-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedApplications.length === applications.length && applications.length > 0}
              onCheckedChange={handleSelectAll}
              aria-label="Select all applications"
            />
            <span className="text-sm text-muted-foreground">
              {selectedApplications.length} of {applications.length} selected
            </span>
          </div>
          {selectedApplications.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("status")}>
                Update Status
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")}>
                <Download className="h-4 w-4 mr-1" /> Export
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
                  checked={selectedApplications.length === applications.length && applications.length > 0}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all applications"
                />
              </th>
              <th className="text-left py-3 px-4 font-medium">Applicant</th>
              <th className="text-left py-3 px-4 font-medium">Job</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium">Applied</th>
              <th className="text-left py-3 px-4 font-medium">Documents</th>
              <th className="text-right py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-b last:border-0 hover:bg-muted/50">
                <td className="py-3 px-4">
                  <Checkbox
                    checked={selectedApplications.includes(application.id)}
                    onCheckedChange={() => handleSelectApplication(application.id)}
                    aria-label={`Select application from ${application.applicantName}`}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 rounded-full overflow-hidden bg-muted">
                      {application.applicantAvatar ? (
                        <Image
                          src={application.applicantAvatar || "/placeholder.svg"}
                          alt={`${application.applicantName} avatar`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary">
                          {application.applicantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{application.applicantName}</div>
                      <div className="text-xs text-muted-foreground">ID: {application.applicantId}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Link href={`/jobs/${application.jobId}`} className="hover:underline">
                    {application.jobTitle}
                  </Link>
                </td>
                <td className="py-3 px-4">{getStatusBadge(application.status)}</td>
                <td className="py-3 px-4">
                  <div className="text-sm">
                    {formatDistanceToNow(new Date(application.submittedDate), { addSuffix: true })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Updated: {formatDistanceToNow(new Date(application.lastUpdatedDate), { addSuffix: true })}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    {application.resumeUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={application.resumeUrl}>
                          <Download className="h-3 w-3 mr-1" /> Resume
                        </Link>
                      </Button>
                    )}
                    {application.coverLetterUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={application.coverLetterUrl}>
                          <Download className="h-3 w-3 mr-1" /> Cover Letter
                        </Link>
                      </Button>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Update Status
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleStatusChange(application.id, "submitted")}>
                          Submitted
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(application.id, "reviewed")}>
                          Reviewed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(application.id, "interviewing")}>
                          Interviewing
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(application.id, "offered")}>
                          Offered
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(application.id, "hired")}>
                          Hired
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(application.id, "rejected")}
                          className="text-destructive"
                        >
                          Rejected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/jobs/applications/${application.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View application</span>
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
