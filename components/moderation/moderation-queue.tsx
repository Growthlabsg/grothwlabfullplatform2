import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X, AlertTriangle, Eye } from "lucide-react"

type QueuedContent = {
  id: string
  content: string
  contentType: "post" | "comment" | "profile"
  author: string
  flagReason: string
  flaggedAt: string
  confidence: number
}

const mockQueuedContent: QueuedContent[] = [
  {
    id: "q1",
    content: "Check out this amazing investment opportunity! Limited time offer!",
    contentType: "post",
    author: "user123",
    flagReason: "Potential spam",
    flaggedAt: "2023-06-15T10:30:00Z",
    confidence: 0.85,
  },
  {
    id: "q2",
    content: "This platform is terrible. Everyone here is just wasting time.",
    contentType: "comment",
    author: "anonymous456",
    flagReason: "Negative sentiment",
    flaggedAt: "2023-06-15T11:45:00Z",
    confidence: 0.72,
  },
  {
    id: "q3",
    content: "Contact me for business opportunities at suspicious-link.com",
    contentType: "post",
    author: "entrepreneur789",
    flagReason: "Suspicious link",
    flaggedAt: "2023-06-15T09:15:00Z",
    confidence: 0.91,
  },
  {
    id: "q4",
    content: "Profile with potentially misleading credentials",
    contentType: "profile",
    author: "expert123",
    flagReason: "Credential verification",
    flaggedAt: "2023-06-14T16:20:00Z",
    confidence: 0.68,
  },
]

export function ModerationQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Automated Moderation Queue</CardTitle>
        <CardDescription>Content flagged by our automated systems for review</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Flag Reason</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockQueuedContent.map((item) => (
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
                <TableCell>{item.flagReason}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.confidence > 0.8 ? "destructive" : item.confidence > 0.6 ? "warning" : "outline"}
                  >
                    {Math.round(item.confidence * 100)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
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
