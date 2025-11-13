import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, AlertTriangle, Eye, MessageSquare } from "lucide-react"

type ReportedItem = {
  id: string
  content: string
  contentType: "post" | "comment" | "profile"
  author: string
  reportReason: string
  reportedBy: string
  reportedAt: string
  reportCount: number
}

const mockReportedContent: ReportedItem[] = [
  {
    id: "r1",
    content: "This is completely false information about startup funding.",
    contentType: "post",
    author: "startupguru",
    reportReason: "Misinformation",
    reportedBy: "user456",
    reportedAt: "2023-06-15T14:30:00Z",
    reportCount: 3,
  },
  {
    id: "r2",
    content: "Your idea is terrible and will never succeed.",
    contentType: "comment",
    author: "critic123",
    reportReason: "Harassment",
    reportedBy: "founder789",
    reportedAt: "2023-06-15T13:45:00Z",
    reportCount: 5,
  },
  {
    id: "r3",
    content: "Join my exclusive investment group, only $500 to join!",
    contentType: "post",
    author: "investor456",
    reportReason: "Spam/Scam",
    reportedBy: "multiple users",
    reportedAt: "2023-06-15T12:15:00Z",
    reportCount: 8,
  },
  {
    id: "r4",
    content: "Profile with inappropriate profile picture",
    contentType: "profile",
    author: "anonymous789",
    reportReason: "Inappropriate content",
    reportedBy: "moderator1",
    reportedAt: "2023-06-14T16:20:00Z",
    reportCount: 1,
  },
]

export function ReportedContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Reported Content</CardTitle>
        <CardDescription>Content reported by community members</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Report Reason</TableHead>
              <TableHead>Reports</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReportedContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="max-w-[300px] truncate">{item.content}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.contentType === "post" ? "default" : item.contentType === "comment" ? "secondary" : "outline"
                    }
                  >
                    {item.contentType}
                  </Badge>
                </TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.reportReason}</TableCell>
                <TableCell>
                  <Badge variant={item.reportCount > 5 ? "destructive" : item.reportCount > 2 ? "warning" : "outline"}>
                    {item.reportCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-green-600">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-yellow-600">
                      <AlertTriangle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
