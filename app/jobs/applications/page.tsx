import { JobApplicationsTable } from "@/components/jobs/job-applications-table"
import { JobPostingsTable } from "@/components/jobs/job-postings-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Briefcase,
  MessageSquare,
  Calendar,
  BarChart3,
  Filter,
  Search,
  Plus,
  Download,
  Mail,
  Phone,
  Video,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function ApplicationsPage() {
  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Application Management</h1>
          <p className="text-[#334155] max-w-3xl">
            Manage job applications, shortlist candidates, and communicate with applicants. Track the entire hiring process from application to hire.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Total Applications</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Active Jobs</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Shortlisted</p>
                  <p className="text-2xl font-bold">23</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Interviews Scheduled</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="shortlist">Shortlisted</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <div className="space-y-6">
              {/* Filters and Search */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search applicants, job titles, or companies..." className="pl-9" />
                    </div>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Applications</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="interviewing">Interviewing</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Filter by job" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Jobs</SelectItem>
                        <SelectItem value="developer">Full Stack Developer</SelectItem>
                        <SelectItem value="designer">UX Designer</SelectItem>
                        <SelectItem value="manager">Product Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      More Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Applications Table */}
              <JobApplicationsTable />

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Applications
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/jobs/applications/communication">
                    <Mail className="h-4 w-4 mr-2" />
                    Communicate with Applicants
                  </Link>
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interviews
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Active Job Postings</h2>
                <Button asChild>
                  <Link href="/jobs/hire-talents">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Link>
                </Button>
              </div>
              <JobPostingsTable />
            </div>
          </TabsContent>

          <TabsContent value="shortlist">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Shortlisted Candidates</h2>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Shortlist
                </Button>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    id: 1,
                    name: "Sarah Chen",
                    job: "Full Stack Developer",
                    avatar: "/abstract-geometric-shapes.png",
                    experience: "4 years",
                    location: "Singapore",
                    skills: ["React", "Node.js", "TypeScript"],
                    shortlistedDate: "2023-04-15",
                    status: "Ready for Interview"
                  },
                  {
                    id: 2,
                    name: "Alex Wong",
                    job: "Product Manager",
                    avatar: "/abstract-geometric-aw.png",
                    experience: "3 years",
                    location: "Singapore",
                    skills: ["Product Strategy", "User Research", "Agile"],
                    shortlistedDate: "2023-04-14",
                    status: "Interview Scheduled"
                  },
                  {
                    id: 3,
                    name: "Mei Lin",
                    job: "UX Designer",
                    avatar: "/machine-learning-concept.png",
                    experience: "2 years",
                    location: "Singapore",
                    skills: ["Figma", "User Research", "Prototyping"],
                    shortlistedDate: "2023-04-13",
                    status: "Awaiting Response"
                  }
                ].map((candidate) => (
                  <Card key={candidate.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted">
                          <img
                            src={candidate.avatar}
                            alt={`${candidate.name} avatar`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{candidate.name}</h3>
                              <p className="text-sm text-[#334155]">{candidate.job}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{candidate.status}</Badge>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <div className="flex items-center text-xs text-[#334155]">
                              <Briefcase className="h-3 w-3 mr-1" />
                              {candidate.experience}
                            </div>
                            <div className="flex items-center text-xs text-[#334155]">
                              <Users className="h-3 w-3 mr-1" />
                              {candidate.location}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-[#334155]">
                              Shortlisted on {candidate.shortlistedDate}
                            </span>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3 mr-1" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <Video className="h-3 w-3 mr-1" />
                                Video Call
                              </Button>
                              <Button size="sm">
                                Schedule Interview
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="interviews">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Interview Schedule</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    id: 1,
                    candidate: "Sarah Chen",
                    job: "Full Stack Developer",
                    date: "2023-04-20",
                    time: "10:00 AM",
                    type: "Video Call",
                    status: "Confirmed",
                    interviewer: "John Smith"
                  },
                  {
                    id: 2,
                    candidate: "Alex Wong",
                    job: "Product Manager",
                    date: "2023-04-21",
                    time: "2:00 PM",
                    type: "In-person",
                    status: "Pending",
                    interviewer: "Jane Doe"
                  },
                  {
                    id: 3,
                    candidate: "Mei Lin",
                    job: "UX Designer",
                    date: "2023-04-22",
                    time: "11:00 AM",
                    type: "Video Call",
                    status: "Confirmed",
                    interviewer: "Mike Johnson"
                  }
                ].map((interview) => (
                  <Card key={interview.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">{interview.candidate}</h3>
                            <p className="text-sm text-[#334155]">{interview.job}</p>
                            <p className="text-sm text-[#334155]">
                              {interview.date} at {interview.time} • {interview.type}
                            </p>
                            <p className="text-sm text-[#334155]">
                              Interviewer: {interview.interviewer}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={interview.status === "Confirmed" ? "default" : "outline"}
                            className={interview.status === "Confirmed" ? "bg-green-500" : ""}
                          >
                            {interview.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Application Analytics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Status Overview</CardTitle>
                    <CardDescription>Distribution of applications by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { status: "Submitted", count: 45, color: "bg-gray-500" },
                        { status: "Reviewed", count: 32, color: "bg-blue-500" },
                        { status: "Interviewing", count: 18, color: "bg-yellow-500" },
                        { status: "Offered", count: 8, color: "bg-green-500" },
                        { status: "Rejected", count: 53, color: "bg-red-500" }
                      ].map((item) => (
                        <div key={item.status} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                            <span className="text-sm">{item.status}</span>
                          </div>
                          <span className="font-medium">{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Jobs</CardTitle>
                    <CardDescription>Jobs with the most applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { job: "Full Stack Developer", applications: 45, views: 234 },
                        { job: "Product Manager", applications: 32, views: 189 },
                        { job: "UX Designer", applications: 28, views: 156 },
                        { job: "Data Scientist", applications: 25, views: 142 },
                        { job: "Marketing Manager", applications: 22, views: 98 }
                      ].map((item) => (
                        <div key={item.job} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.job}</p>
                            <p className="text-sm text-[#334155]">{item.views} views</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{item.applications}</p>
                            <p className="text-sm text-[#334155]">applications</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest application activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New application received", candidate: "Sarah Chen", job: "Full Stack Developer", time: "2 hours ago" },
                      { action: "Interview scheduled", candidate: "Alex Wong", job: "Product Manager", time: "4 hours ago" },
                      { action: "Application reviewed", candidate: "Mei Lin", job: "UX Designer", time: "6 hours ago" },
                      { action: "Offer sent", candidate: "David Kumar", job: "Data Scientist", time: "1 day ago" },
                      { action: "Application rejected", candidate: "Lisa Tan", job: "Marketing Manager", time: "1 day ago" }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-[#334155]">
                            {activity.candidate} • {activity.job} • {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
}