"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  Phone,
  Video,
  Calendar,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for demonstration
const mockApplicants = [
  {
    id: "app1",
    name: "Sarah Chen",
    avatar: "/abstract-geometric-shapes.png",
    job: "Full Stack Developer",
    status: "interviewing",
    lastMessage: "Thank you for the interview opportunity. I'm looking forward to discussing the role further.",
    lastMessageTime: "2 hours ago",
    unreadCount: 0,
    email: "sarah.chen@email.com",
    phone: "+65 9123 4567"
  },
  {
    id: "app2",
    name: "Alex Wong",
    avatar: "/abstract-geometric-aw.png",
    job: "Product Manager",
    status: "reviewed",
    lastMessage: "Hi Alex, we'd like to schedule an interview for next week. What times work for you?",
    lastMessageTime: "1 day ago",
    unreadCount: 1,
    email: "alex.wong@email.com",
    phone: "+65 9234 5678"
  },
  {
    id: "app3",
    name: "Mei Lin",
    avatar: "/machine-learning-concept.png",
    job: "UX Designer",
    status: "submitted",
            lastMessage: "Thank you for your application. We'll review it and get back to you soon.",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    email: "mei.lin@email.com",
    phone: "+65 9345 6789"
  }
]

const mockTemplates = [
  {
    id: "template1",
    name: "Interview Invitation",
    subject: "Interview Invitation for {position}",
    content: "Hi {name},\n\nThank you for your application for the {position} position. We would like to invite you for an interview.\n\nPlease let us know your availability for next week.\n\nBest regards,\n{company_name}"
  },
  {
    id: "template2",
    name: "Application Received",
    subject: "Application Received - {position}",
    content: "Hi {name},\n\nThank you for your application for the {position} position. We have received your application and will review it carefully.\n\nWe'll get back to you within 5-7 business days.\n\nBest regards,\n{company_name}"
  },
  {
    id: "template3",
    name: "Offer Letter",
    subject: "Job Offer - {position}",
    content: "Hi {name},\n\nWe are pleased to offer you the {position} position at {company_name}.\n\nPlease review the attached offer letter and let us know if you have any questions.\n\nBest regards,\n{company_name}"
  },
  {
    id: "template4",
    name: "Rejection Letter",
    subject: "Application Update - {position}",
    content: "Hi {name},\n\nThank you for your interest in the {position} position and for taking the time to apply.\n\nAfter careful consideration, we have decided to move forward with other candidates.\n\nWe wish you the best in your job search.\n\nBest regards,\n{company_name}"
  }
]

export function ApplicationCommunication() {
  const [selectedApplicant, setSelectedApplicant] = useState(mockApplicants[0])
  const [message, setMessage] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [showScheduleInterview, setShowScheduleInterview] = useState(false)
  const { toast } = useToast()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge variant="outline">Submitted</Badge>
      case "reviewed":
        return <Badge variant="secondary">Reviewed</Badge>
      case "interviewing":
        return <Badge className="bg-blue-500">Interviewing</Badge>
      case "offered":
        return <Badge className="bg-green-500">Offered</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Message is empty",
        description: "Please enter a message before sending.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Message sent",
      description: `Message sent to ${selectedApplicant.name}`,
    })
    setMessage("")
  }

  const handleTemplateSelect = (templateId: string) => {
    const template = mockTemplates.find(t => t.id === templateId)
    if (template) {
      setMessage(template.content
        .replace("{name}", selectedApplicant.name)
        .replace("{position}", selectedApplicant.job)
        .replace("{company_name}", "Your Company")
      )
      setSelectedTemplate(templateId)
    }
  }

  const handleScheduleInterview = () => {
    setShowScheduleInterview(true)
    toast({
      title: "Interview scheduling",
      description: "Interview scheduling feature would open here.",
    })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
      {/* Applicant List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Applicants</CardTitle>
          <CardDescription>Select an applicant to communicate with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedApplicant.id === applicant.id
                    ? "bg-[#0F7377]/10 border border-[#0F7377]/20"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedApplicant(applicant)}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={applicant.avatar} alt={applicant.name} />
                    <AvatarFallback>
                      {applicant.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{applicant.name}</p>
                      {applicant.unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {applicant.unreadCount}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{applicant.job}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(applicant.status)}
                      <span className="text-xs text-muted-foreground">{applicant.lastMessageTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication Area */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedApplicant.avatar} alt={selectedApplicant.name} />
                <AvatarFallback>
                  {selectedApplicant.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedApplicant.name}</CardTitle>
                <CardDescription>{selectedApplicant.job}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(selectedApplicant.status)}
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="messages" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="h-[400px] flex flex-col">
              {/* Message History */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                <div className="flex justify-end">
                  <div className="bg-[#0F7377] text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Thank you for your application. We'll review it and get back to you soon.</p>
                    <p className="text-xs opacity-70 mt-1">3 days ago</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border p-3 rounded-lg max-w-xs">
                    <p className="text-sm">{selectedApplicant.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{selectedApplicant.lastMessageTime}</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule Interview
                    </Button>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                  </div>
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="templates" className="h-[400px] flex flex-col">
              <div className="flex-1 space-y-4">
                <div>
                  <label className="text-sm font-medium">Message Templates</label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Template Preview</label>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    {selectedTemplate ? (
                      <div className="space-y-2">
                        {mockTemplates
                          .find(t => t.id === selectedTemplate)
                          ?.content.split('\n')
                          .map((line, index) => (
                            <p key={index} className="text-sm">
                              {line.replace("{name}", selectedApplicant.name)
                                .replace("{position}", selectedApplicant.job)
                                .replace("{company_name}", "Your Company")}
                            </p>
                          ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Select a template to preview</p>
                    )}
                  </div>
                </div>

                <Button onClick={handleSendMessage} disabled={!selectedTemplate}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Template Message
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="h-[400px] flex flex-col">
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Interview Type</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select interview type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                        <SelectItem value="in-person">In-person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Duration</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Date & Time</label>
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <Input type="date" />
                    <Input type="time" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Interviewer</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith (CTO)</SelectItem>
                      <SelectItem value="jane">Jane Doe (HR Manager)</SelectItem>
                      <SelectItem value="mike">Mike Johnson (Team Lead)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Notes (Optional)</label>
                  <Textarea
                    placeholder="Add any notes or instructions for the candidate..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleScheduleInterview}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button variant="outline">
                    <Clock className="h-4 w-4 mr-2" />
                    Send Availability Request
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 