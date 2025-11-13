"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { UserPlus, Check, X, Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock data for connection requests
const MOCK_REQUESTS = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Founder at TechStart",
    avatar: "/abstract-aj.png",
    mutualConnections: 12,
  },
  {
    id: "2",
    name: "Sarah Williams",
    role: "Product Manager",
    avatar: "/abstract-southwest.png",
    mutualConnections: 5,
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Software Engineer",
    avatar: "/microphone-crowd.png",
    mutualConnections: 8,
  },
]

interface ConnectionRequestsDialogProps {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "default" | "lg"
  className?: string
}

export function ConnectionRequestsDialog({
  variant = "outline",
  size = "default",
  className,
}: ConnectionRequestsDialogProps) {
  const [open, setOpen] = useState(false)
  const [requests, setRequests] = useState(MOCK_REQUESTS)
  const { toast } = useToast()

  const handleAccept = (id: string) => {
    setRequests((prev) => prev.filter((request) => request.id !== id))

    toast({
      title: "Connection accepted",
      description: "You are now connected with this user.",
    })
  }

  const handleDecline = (id: string) => {
    setRequests((prev) => prev.filter((request) => request.id !== id))

    toast({
      title: "Connection declined",
      description: "The connection request has been declined.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <UserPlus className="mr-2 h-4 w-4" />
          Requests
          {requests.length > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {requests.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connection Requests</DialogTitle>
        </DialogHeader>

        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">You have no pending connection requests</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                    <AvatarFallback>
                      {request.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{request.name}</h4>
                    <p className="text-sm text-muted-foreground">{request.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">{request.mutualConnections} mutual connections</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleDecline(request.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleAccept(request.id)}>
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
