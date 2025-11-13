"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Phone,
  Users,
  Copy,
  CheckCircle,
  X,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockInterviews = [
  {
    id: "int1",
    applicationId: "app1",
    candidateName: "Sarah Chen",
    candidateAvatar: "/abstract-geometric-shapes.png",
    jobTitle: "Full Stack Developer",
    date: "2023-05-20T00:00:00Z",
    startTime: "10:00",
    endTime: "11:00",
    interviewType: "video",
    interviewers: ["John Smith", "Emily Wong"],
    videoLink: "https://zoom.us/j/123456789",
    notes: "Focus on technical skills and experience with React and Node.js.",
    status: "scheduled",
    scheduledAt: "2023-04-16T10:30:00Z",
  },
  {
    id: "int2",
    applicationId: "app2",
    candidateName: "Alex Wong",
    candidateAvatar: "/abstract-geometric-aw.png",
    jobTitle: "Product Manager",
    date: "2023-05-18T00:00:00Z",
    startTime: "14:30",
    endTime: "15:30",
    interviewType: "in-person",
    interviewers: ["Lisa Johnson", "Michael Tan"],
    location: "Conference Room B, 3rd Floor",
    notes: "Discuss previous product management experience and approach to user research.",
    status: "scheduled",
    scheduledAt: "2023-04-14T09:15:00Z",
  },
  {
    id: "int3",
    applicationId: "app3",
    candidateName: "Mei Lin",
    candidateAvatar: "/machine-learning-concept.png",
    jobTitle: "Full Stack Developer",
    date: "2023-05-15T00:00:00Z",
    startTime: "11:30",
    endTime: "12:30",
    interviewType: "phone",
    interviewers: ["John Smith"],
    notes: "Initial screening call to discuss experience and expectations.",
    status: "completed",
    scheduledAt: "2023-04-12T15:45:00Z",
    feedback: "Strong technical skills, good communication. Recommend moving forward.",
  },
]

interface ScheduledInterviewsProps {
  applicationId?: string
  limit?: number
  showAll?: boolean
}

export function ScheduledInterviews({ applicationId, limit = 5, showAll = false }: ScheduledInterviewsProps) {
  const [interviews, setInterviews] = useState(mockInterviews)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [interviewToDelete, setInterviewToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  // Filter interviews by applicationId if provided
  const filteredInterviews = applicationId
    ? interviews.filter((interview) => interview.applicationId === applicationId)
    : interviews

  // Limit the number of interviews shown unless showAll is true
  const displayedInterviews = showAll ? filteredInterviews : filteredInterviews.slice(0, limit)

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: "Link copied",
      description: "The video conference link has been copied to your clipboard.",
    })
  }

  const handleDeleteInterview = (interviewId: string) => {
    setInterviewToDelete(interviewId)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteInterview = () => {
    if (interviewToDelete) {
      setInterviews((prev) => prev.filter((interview) => interview.id !== interviewToDelete))
      toast({
        title: "Interview deleted",
        description: "The interview has been deleted successfully.",
      })
    }
    setDeleteDialogOpen(false)
    setInterviewToDelete(null)
  }

  const handleMarkAsCompleted = (interviewId: string) => {
    setInterviews((prev) =>
      prev.map((interview) => (interview.id === interviewId ? { ...interview, status: "completed" } : interview)),
    )
    toast({
      title: "Interview marked as completed",
      description: "The interview has been marked as completed.",
    })
  }

  const handleMarkAsCancelled = (interviewId: string) => {
    setInterviews((prev) =>
      prev.map((interview) => (interview.id === interviewId ? { ...interview, status: "cancelled" } : interview)),
    )
    toast({
      title: "Interview cancelled",
      description: "The interview has been cancelled.",
    })
  }

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-blue-500" />
      case "in-person":
        return <MapPin className="h-4 w-4 text-green-500" />
      case "phone":
        return <Phone className="h-4 w-4 text-purple-500" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Scheduled
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  if (displayedInterviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No interviews scheduled</h3>
          <p className="text-muted-foreground mb-4">
            {applicationId
              ? "No interviews have been scheduled for this application yet."
              : "You don't have any interviews scheduled."}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {displayedInterviews.map((interview) => (
        <Card key={interview.id} className={interview.status === "cancelled" ? "opacity-60" : ""}>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                  {interview.candidateAvatar ? (
                    <Image
                      src={interview.candidateAvatar || "/placeholder.svg"}
                      alt={`${interview.candidateName} avatar`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-primary/10 text-primary">
                      {interview.candidateName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{interview.candidateName}</h3>
                      {getStatusBadge(interview.status)}
                    </div>
                    <p className="text-muted-foreground">{interview.jobTitle}</p>
                  </div>

                  <div className="flex items-center gap-2">
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
                        {interview.status === "scheduled" && (
                          <>
                            <DropdownMenuItem onClick={() => handleMarkAsCompleted(interview.id)}>
                              <CheckCircle className="h-4 w-4 mr-2" /> Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMarkAsCancelled(interview.id)}>
                              <X className="h-4 w-4 mr-2" /> Cancel Interview
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem asChild>
                          <Link href={`/jobs/interviews/edit/${interview.id}`}>
                            <Edit className="h-4 w-4 mr-2" /> Edit Interview
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteInterview(interview.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{format(parseISO(interview.date), "EEEE, MMMM d, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {interview.startTime} - {interview.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getInterviewTypeIcon(interview.interviewType)}
                    <span className="capitalize">{interview.interviewType} Interview</span>
                    {interview.interviewType === "video" && interview.videoLink && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => handleCopyLink(interview.videoLink!)}
                      >
                        <Copy className="h-3 w-3 mr-1" /> Copy Link
                      </Button>
                    )}
                  </div>
                  {interview.interviewType === "in-person" && interview.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.location}</span>
                    </div>
                  )}
                  {interview.interviewers && interview.interviewers.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Interviewers: {interview.interviewers.join(", ")}</span>
                    </div>
                  )}
                </div>

                {interview.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <p className="text-sm">{interview.notes}</p>
                  </div>
                )}

                {interview.feedback && interview.status === "completed" && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <h4 className="text-sm font-medium mb-1">Feedback</h4>
                    <p className="text-sm">{interview.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {!showAll && filteredInterviews.length > limit && (
        <div className="text-center mt-4">
          <Button variant="outline" asChild>
            <Link href="/jobs/interviews">View All Interviews</Link>
          </Button>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this interview?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the interview and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteInterview} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
