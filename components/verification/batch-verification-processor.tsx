"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

interface VerificationRequest {
  id: string
  companyName: string
  companyLogo?: string
  status: string
  dateSubmitted: string
  industry: string
}

interface BatchVerificationProcessorProps {
  selectedRequests: VerificationRequest[]
  onProcess: (action: "approve" | "reject" | "request_info", notes: string) => void
}

export function BatchVerificationProcessor({ selectedRequests, onProcess }: BatchVerificationProcessorProps) {
  const [action, setAction] = useState<"approve" | "reject" | "request_info" | null>(null)
  const [notes, setNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcess = () => {
    if (!action) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      onProcess(action, notes)
      setIsProcessing(false)
    }, 1500)
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="mr-1 h-3 w-3" /> Rejected
          </Badge>
        )
      case "additional_info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            <AlertCircle className="mr-1 h-3 w-3" /> Info Requested
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Selected Requests ({selectedRequests.length})</h3>
        <div className="max-h-[200px] overflow-y-auto space-y-2 border rounded-md p-2">
          {selectedRequests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-2 border-b last:border-0">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={request.companyLogo || "/placeholder.svg"} alt={request.companyName} />
                  <AvatarFallback>{request.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{request.companyName}</div>
                  <div className="text-xs text-muted-foreground">{request.industry}</div>
                </div>
              </div>
              <div>{getStatusBadge(request.status)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Batch Action</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="approve"
              checked={action === "approve"}
              onCheckedChange={(checked) => {
                if (checked) setAction("approve")
                else if (action === "approve") setAction(null)
              }}
            />
            <Label htmlFor="approve" className="text-sm">
              Approve All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reject"
              checked={action === "reject"}
              onCheckedChange={(checked) => {
                if (checked) setAction("reject")
                else if (action === "reject") setAction(null)
              }}
            />
            <Label htmlFor="reject" className="text-sm">
              Reject All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="request_info"
              checked={action === "request_info"}
              onCheckedChange={(checked) => {
                if (checked) setAction("request_info")
                else if (action === "request_info") setAction(null)
              }}
            />
            <Label htmlFor="request_info" className="text-sm">
              Request Info
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="batch-notes">Batch Notes</Label>
        <Textarea
          id="batch-notes"
          placeholder="Add notes for all selected verification requests..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          This action will apply to all {selectedRequests.length} selected verification requests.
        </AlertDescription>
      </Alert>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onProcess("approve", "")}>
          Cancel
        </Button>
        <Button
          onClick={handleProcess}
          disabled={!action || isProcessing}
          className={
            action === "approve"
              ? "bg-green-600 hover:bg-green-700"
              : action === "reject"
                ? "bg-red-600 hover:bg-red-700"
                : action === "request_info"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : ""
          }
        >
          {isProcessing ? "Processing..." : "Process Selected"}
        </Button>
      </div>
    </div>
  )
}
