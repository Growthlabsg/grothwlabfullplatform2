import { ApplicationCommunication } from "@/components/jobs/application-communication"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, MessageSquare, Users, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function CommunicationPage() {
  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/jobs/applications" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Applications
          </Link>
          <h1 className="text-3xl font-bold mb-4">Communicate with Applicants</h1>
          <p className="text-[#334155] max-w-3xl">
            Send messages, schedule interviews, and manage communication with job applicants. Use templates for common messages and track all interactions.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Active Conversations</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Pending Responses</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Interviews Scheduled</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#334155]">Total Applicants</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Interface */}
        <ApplicationCommunication />

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common communication tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <MessageSquare className="h-5 w-5 mb-2" />
                  <span className="font-medium">Send Bulk Messages</span>
                  <span className="text-sm text-muted-foreground">Send the same message to multiple applicants</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <Users className="h-5 w-5 mb-2" />
                  <span className="font-medium">Schedule Group Interviews</span>
                  <span className="text-sm text-muted-foreground">Schedule interviews for multiple candidates</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <CheckCircle className="h-5 w-5 mb-2" />
                  <span className="font-medium">Send Status Updates</span>
                  <span className="text-sm text-muted-foreground">Update applicants on their application status</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Tips */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Communication Best Practices</CardTitle>
              <CardDescription>Tips for effective communication with applicants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Response Time</h4>
                    <p className="text-sm text-[#334155]">
                      Aim to respond to applications within 24-48 hours to maintain a positive candidate experience.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Personalization</h4>
                    <p className="text-sm text-[#334155]">
                      Use the applicant's name and reference specific details from their application to show you've reviewed their materials.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Clear Next Steps</h4>
                    <p className="text-sm text-[#334155]">
                      Always provide clear next steps and timelines so candidates know what to expect.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Professional Tone</h4>
                    <p className="text-sm text-[#334155]">
                      Maintain a professional yet friendly tone that reflects your company culture.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Template Usage</h4>
                    <p className="text-sm text-[#334155]">
                      Use templates for common messages but customize them for each candidate to maintain authenticity.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Follow-up</h4>
                    <p className="text-sm text-[#334155]">
                      Set reminders to follow up with candidates who haven't responded within a reasonable timeframe.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
}