import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Phone, Video, PhoneMissed, PhoneCall } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Call {
  id: string
  contactName: string
  contactAvatar: string
  timestamp: Date
  duration?: string
  status: "completed" | "missed" | "no-answer"
  type: "audio" | "video"
}

interface CallHistoryProps {
  calls: Call[]
}

export function CallHistory({ calls }: CallHistoryProps) {
  const getStatusIcon = (call: Call) => {
    if (call.status === "missed") {
      return <PhoneMissed className="h-4 w-4 text-destructive" />
    } else if (call.status === "no-answer") {
      return <PhoneMissed className="h-4 w-4 text-yellow-500" />
    } else {
      return call.type === "audio" ? (
        <PhoneCall className="h-4 w-4 text-green-500" />
      ) : (
        <Video className="h-4 w-4 text-blue-500" />
      )
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No call history found
              </TableCell>
            </TableRow>
          ) : (
            calls.map((call) => (
              <TableRow key={call.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={call.contactAvatar || "/placeholder.svg"} alt={call.contactName} />
                    <AvatarFallback>{getInitials(call.contactName)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{call.contactName}</span>
                </TableCell>
                <TableCell>
                  {call.type === "audio" ? (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>Audio</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      <span>Video</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{formatDistanceToNow(call.timestamp, { addSuffix: true })}</TableCell>
                <TableCell>{call.status === "completed" ? call.duration : "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(call)}
                    <span className="capitalize">{call.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
