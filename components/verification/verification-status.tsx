"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VerificationBadge } from "./verification-badge"
import { AlertCircle, CheckCircle, Clock, ExternalLink, Shield } from "lucide-react"
import Link from "next/link"

interface VerificationStatusProps {
  status: "verified" | "pending" | "rejected" | "additional_info" | "unverified"
  verifiedDate?: string
  additionalInfoNeeded?: string
  className?: string
}

export function VerificationStatus({
  status,
  verifiedDate,
  additionalInfoNeeded,
  className = "",
}: VerificationStatusProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const getBadgeComponent = () => {
    switch (status) {
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="mr-1 h-3 w-3" /> Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="mr-1 h-3 w-3" /> Pending Verification
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            <AlertCircle className="mr-1 h-3 w-3" /> Verification Rejected
          </Badge>
        )
      case "additional_info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            <AlertCircle className="mr-1 h-3 w-3" /> Additional Info Needed
          </Badge>
        )
      case "unverified":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            <Shield className="mr-1 h-3 w-3" /> Unverified
          </Badge>
        )
    }
  }

  const getStatusContent = () => {
    switch (status) {
      case "verified":
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h3 className="font-medium">Verified Startup</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              This startup has been verified by GrowthLab
              {verifiedDate ? ` on ${verifiedDate}` : ""}.
            </p>
          </>
        )
      case "pending":
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <h3 className="font-medium">Verification in Progress</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your verification request is being reviewed. This process typically takes 2-3 business days.
            </p>
          </>
        )
      case "rejected":
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <h3 className="font-medium">Verification Rejected</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your verification request has been rejected. Please review the feedback and submit a new request if
              needed.
            </p>
          </>
        )
      case "additional_info":
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              <h3 className="font-medium">Additional Information Needed</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              We need additional information to complete your verification.
            </p>
            {additionalInfoNeeded && (
              <Alert className="mt-2">
                <AlertTitle>Information Requested:</AlertTitle>
                <AlertDescription>{additionalInfoNeeded}</AlertDescription>
              </Alert>
            )}
          </>
        )
      case "unverified":
        return (
          <>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium">Unverified Startup</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              This startup has not been verified yet. Verification helps build trust with investors and partners.
            </p>
          </>
        )
    }
  }

  const getActionButton = () => {
    switch (status) {
      case "verified":
        return null
      case "pending":
        return (
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">View Request Status</Link>
          </Button>
        )
      case "rejected":
        return (
          <Button variant="outline" size="sm" asChild>
            <Link href="/verification">Submit New Request</Link>
          </Button>
        )
      case "additional_info":
        return (
          <Button size="sm" asChild>
            <Link href="/verification/update">Provide Additional Info</Link>
          </Button>
        )
      case "unverified":
        return (
          <Button size="sm" asChild>
            <Link href="/verification">
              Get Verified <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        )
    }
  }

  if (isCollapsed) {
    return (
      <div
        className={`flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${className}`}
        onClick={() => setIsCollapsed(false)}
      >
        <div className="flex items-center gap-2">
          <VerificationBadge
            status={
              status === "verified"
                ? "verified"
                : status === "pending" || status === "additional_info"
                  ? "pending"
                  : "unverified"
            }
          />
          {getBadgeComponent()}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            setIsCollapsed(false)
          }}
        >
          Show Details
        </Button>
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Verification Status</CardTitle>
          {getBadgeComponent()}
        </div>
      </CardHeader>
      <CardContent>{getStatusContent()}</CardContent>
      <CardFooter className="flex justify-between">
        {getActionButton()}
        <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(true)}>
          Collapse
        </Button>
      </CardFooter>
    </Card>
  )
}
