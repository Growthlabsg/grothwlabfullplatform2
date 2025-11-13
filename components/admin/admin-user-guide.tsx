"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, FileText, Download } from "lucide-react"

export function AdminUserGuide() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Admin Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>GrowthLab Admin User Guide</DialogTitle>
          <DialogDescription>Comprehensive guide for managing the GrowthLab platform</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="startups">Startups</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="max-h-[60vh] overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="overview">
                <AccordionTrigger>Dashboard Overview</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    The admin dashboard provides a comprehensive overview of key metrics and activities across the
                    GrowthLab platform.
                  </p>
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Real-time metrics on users, startups, events, and funding</li>
                    <li>Interactive charts for data visualization</li>
                    <li>Filterable data by time period</li>
                    <li>Quick access to recent activities</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="metrics">
                <AccordionTrigger>Understanding Metrics</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    The dashboard displays various metrics to help you understand platform performance.
                  </p>
                  <h4 className="font-medium mb-2">Key Metrics:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>User Growth:</strong> Total users and growth rate over time
                    </li>
                    <li>
                      <strong>Active Startups:</strong> Number of active startups on the platform
                    </li>
                    <li>
                      <strong>Upcoming Events:</strong> Count of scheduled events
                    </li>
                    <li>
                      <strong>Total Funding:</strong> Aggregate funding facilitated through the platform
                    </li>
                    <li>
                      <strong>Conversion Rate:</strong> Percentage of visitors who sign up
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="customization">
                <AccordionTrigger>Dashboard Customization</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    You can customize the dashboard to focus on metrics most relevant to your role.
                  </p>
                  <h4 className="font-medium mb-2">Customization Options:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Filter data by time range (7 days, 30 days, 90 days, year, all time)</li>
                    <li>Switch between different tabs to focus on specific areas</li>
                    <li>Export data for further analysis</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="users" className="max-h-[60vh] overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="management">
                <AccordionTrigger>User Management</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    The User Management section allows you to manage all users across the GrowthLab platform.
                  </p>
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>View and search all users</li>
                    <li>Filter users by role and status</li>
                    <li>Add new users</li>
                    <li>Edit user details</li>
                    <li>Delete users</li>
                    <li>Export user data</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="roles">
                <AccordionTrigger>User Roles and Permissions</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">
                    GrowthLab uses a role-based access control (RBAC) system to manage permissions.
                  </p>
                  <h4 className="font-medium mb-2">Available Roles:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Admin:</strong> Full access to all features
                    </li>
                    <li>
                      <strong>Startup:</strong> Access to startup-specific features
                    </li>
                    <li>
                      <strong>Investor:</strong> Access to investor-specific features
                    </li>
                    <li>
                      <strong>Mentor:</strong> Access to mentorship features
                    </li>
                    <li>
                      <strong>Teacher:</strong> Access to educational content management
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bulk">
                <AccordionTrigger>Bulk User Operations</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">You can perform bulk operations on users to save time.</p>
                  <h4 className="font-medium mb-2">Bulk Operations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Import users from CSV</li>
                    <li>Export users to CSV</li>
                    <li>Bulk email users</li>
                    <li>Bulk status updates</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* Additional tabs content would go here */}
        </Tabs>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            View Full Documentation
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF Guide
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
