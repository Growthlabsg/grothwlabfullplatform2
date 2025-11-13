import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, RotateCcw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type ModerationLog = {
  id: string
  action: "approve" | "reject" | "warn" | "ban" | "restrict"
  contentType: "post" | "comment" | "profile" | "user"
  targetId: string
  moderator: string
  reason: string
  timestamp: string
}

const mockModerationLogs: ModerationLog[] = [
  {
    id: "log1",
    action: "reject",
    contentType: "post",
    targetId: "post123",
    moderator: "admin1",
    reason: "Spam content",
    timestamp: "2023-06-15T14:30:00Z",
  },
  {
    id: "log2",
    action: "warn",
    contentType: "user",
    targetId: "user456",
    moderator: "admin2",
    reason: "Multiple reports of harassment",
    timestamp: "2023-06-15T13:45:00Z",
  },
  {
    id: "log3",
    action: "ban",
    contentType: "user",
    targetId: "user789",
    moderator: "admin1",
    reason: "Repeated violations of community guidelines",
    timestamp: "2023-06-15T12:15:00Z",
  },
  {
    id: "log4",
    action: "approve",
    contentType: "post",
    targetId: "post456",
    moderator: "admin3",
    reason: "False positive - content is appropriate",
    timestamp: "2023-06-15T11:20:00Z",
  },
  {
    id: "log5",
    action: "restrict",
    contentType: "user",
    targetId: "user101",
    moderator: "admin2",
    reason: "Temporary restriction for cooling off period",
    timestamp: "2023-06-15T10:05:00Z",
  },
]

export function ModerationLogs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderation Logs</CardTitle>
        <CardDescription>History of all moderation actions taken</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="approve">Approvals</SelectItem>
                <SelectItem value="reject">Rejections</SelectItem>
                <SelectItem value="warn">Warnings</SelectItem>
                <SelectItem value="restrict">Restrictions</SelectItem>
                <SelectItem value="ban">Bans</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Filter by moderator" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Moderators</SelectItem>
                <SelectItem value="admin1">Admin 1</SelectItem>
                <SelectItem value="admin2">Admin 2</SelectItem>
                <SelectItem value="admin3">Admin 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Input type="date" placeholder="Date range" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Content Type</TableHead>
              <TableHead>Target ID</TableHead>
              <TableHead>Moderator</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockModerationLogs.map((log) => (
              <TableRow key={log?.id}>
                <TableCell>
                  <Badge
                    variant={
                      log?.action === "approve"
                        ? "success"
                        : log?.action === "reject"
                          ? "destructive"
                          : log?.action === "warn"
                            ? "warning"
                            : log?.action === "ban"
                              ? "destructive"
                              : "secondary"
                    }
                  >
                    {log?.action.charAt(0).toUpperCase() + log?.action.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{log?.contentType}</Badge>
                </TableCell>
                <TableCell>{log?.targetId}</TableCell>
                <TableCell>{log?.moderator}</TableCell>
                <TableCell className="max-w-[300px] truncate">{log?.reason}</TableCell>
                <TableCell>{new Date(log?.timestamp).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <RotateCcw className="h-4 w-4" />
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
