"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const applicationData = [
  { name: "Week 1", applications: 4, interviews: 1, offers: 0 },
  { name: "Week 2", applications: 6, interviews: 2, offers: 0 },
  { name: "Week 3", applications: 8, interviews: 3, offers: 1 },
  { name: "Week 4", applications: 6, interviews: 2, offers: 0 },
]

const stageData = [
  { name: "Applied", value: 24 },
  { name: "Screening", value: 12 },
  { name: "Interview", value: 8 },
  { name: "Final Round", value: 3 },
  { name: "Offer", value: 1 },
]

const recentApplications = [
  {
    id: 1,
    company: "TechCorp",
    position: "Frontend Developer",
    date: "2023-04-15",
    status: "Interview",
    response: true,
  },
  {
    id: 2,
    company: "DataSystems",
    position: "Data Analyst",
    date: "2023-04-12",
    status: "Screening",
    response: true,
  },
  {
    id: 3,
    company: "GrowthLab",
    position: "Product Manager",
    date: "2023-04-10",
    status: "Applied",
    response: false,
  },
  {
    id: 4,
    company: "InnovateTech",
    position: "UX Designer",
    date: "2023-04-08",
    status: "Rejected",
    response: true,
  },
  {
    id: 5,
    company: "CloudNine",
    position: "Backend Developer",
    date: "2023-04-05",
    status: "Final Round",
    response: true,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800"
    case "Screening":
      return "bg-purple-100 text-purple-800"
    case "Interview":
      return "bg-amber-100 text-amber-800"
    case "Final Round":
      return "bg-emerald-100 text-emerald-800"
    case "Offer":
      return "bg-green-100 text-green-800"
    case "Rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function ApplicationPerformance() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Application Activity</CardTitle>
          <CardDescription>Your application activity over the past month</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={applicationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#8884d8" name="Applications" />
              <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
              <Bar dataKey="offers" fill="#ffc658" name="Offers" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Application Funnel</CardTitle>
          <CardDescription>Your application journey stages</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={stageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="lg:col-span-7">
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Your most recent job applications and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{new Date(app.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {app.response ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Received
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
