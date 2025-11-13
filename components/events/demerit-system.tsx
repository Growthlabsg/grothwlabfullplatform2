"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Clock, CheckCircle, X, FileText, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAttendance } from "@/contexts/AttendanceContext"

interface DemeritSystemProps {
  userId?: string
  showAppealForm?: boolean
}

export function DemeritSystem({ userId = "current-user", showAppealForm = true }: DemeritSystemProps) {
  const { toast } = useToast()
  const { 
    userDemeritPoints, 
    isRestricted, 
    getDemeritHistory, 
    appealDemerit 
  } = useAttendance()
  
  const [demeritHistory, setDemeritHistory] = useState<any[]>([])
  const [showAppeal, setShowAppeal] = useState(false)
  const [appealReason, setAppealReason] = useState("")
  const [selectedDemerit, setSelectedDemerit] = useState<string | null>(null)
  const [isSubmittingAppeal, setIsSubmittingAppeal] = useState(false)

  useEffect(() => {
    const history = getDemeritHistory(userId)
    setDemeritHistory(history)
  }, [userId, getDemeritHistory])

  const handleAppeal = async () => {
    if (!selectedDemerit || !appealReason.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a demerit and provide a reason for appeal",
        variant: "destructive"
      })
      return
    }

    setIsSubmittingAppeal(true)
    
    try {
      const success = await appealDemerit(selectedDemerit, appealReason)
      
      if (success) {
        toast({
          title: "Appeal Submitted",
          description: "Your appeal has been submitted for review",
        })
        
        setShowAppeal(false)
        setAppealReason("")
        setSelectedDemerit(null)
        
        // Refresh demerit history
        const history = getDemeritHistory(userId)
        setDemeritHistory(history)
      } else {
        toast({
          title: "Appeal Failed",
          description: "Failed to submit appeal. Please try again.",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit appeal",
        variant: "destructive"
      })
    } finally {
      setIsSubmittingAppeal(false)
    }
  }

  const getDemeritReasonText = (reason: string) => {
    switch (reason) {
      case 'no-show':
        return 'No Show'
      case 'late-cancellation':
        return 'Late Cancellation'
      case 'inappropriate-behavior':
        return 'Inappropriate Behavior'
      default:
        return reason
    }
  }

  const getDemeritReasonColor = (reason: string) => {
    switch (reason) {
      case 'no-show':
        return 'bg-red-100 text-red-800'
      case 'late-cancellation':
        return 'bg-yellow-100 text-yellow-800'
      case 'inappropriate-behavior':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-red-100 text-red-800'
      case 'appealed':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const activeDemerits = demeritHistory.filter(d => d.status === 'active')
  const totalActivePoints = activeDemerits.reduce((sum, d) => sum + d.points, 0)

  return (
    <div className="space-y-6">
      {/* Demerit Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[#0F7377]" />
            Demerit Status
          </CardTitle>
          <CardDescription>
            Track your attendance behavior and demerit points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-lg">Current Demerit Points</h3>
                <p className="text-sm text-gray-600">
                  {totalActivePoints} points from {activeDemerits.length} incidents
                </p>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${
                  totalActivePoints >= 10 ? 'text-red-600' : 
                  totalActivePoints >= 7 ? 'text-yellow-600' : 
                  'text-green-600'
                }`}>
                  {totalActivePoints}
                </div>
                <div className="text-sm text-gray-600">/ 10 points</div>
              </div>
            </div>

            {/* Restriction Status */}
            {isRestricted ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800">
                  <X className="h-5 w-5" />
                  <span className="font-semibold">Account Restricted</span>
                </div>
                <p className="text-sm text-red-700 mt-1">
                  You cannot attend events until your demerit points are reduced below 10.
                  Submit an appeal to request restoration of your account.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Account in Good Standing</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  You can attend events. Keep up the good attendance!
                </p>
              </div>
            )}

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Demerit Points</span>
                <span>{totalActivePoints} / 10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    totalActivePoints >= 10 ? 'bg-red-500' :
                    totalActivePoints >= 7 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((totalActivePoints / 10) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demerit History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#0F7377]" />
            Demerit History
          </CardTitle>
          <CardDescription>
            Complete history of your demerit points and appeals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {demeritHistory.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Demerits</h3>
              <p className="text-gray-600">
                You have a clean attendance record!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {demeritHistory.map((demerit) => (
                <div
                  key={demerit.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{demerit.eventTitle}</h4>
                        <Badge className={getDemeritReasonColor(demerit.reason)}>
                          {getDemeritReasonText(demerit.reason)}
                        </Badge>
                        <Badge className={getStatusColor(demerit.status)}>
                          {demerit.status.charAt(0).toUpperCase() + demerit.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(demerit.date)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-medium text-red-600">
                          -{demerit.points} points
                        </span>
                        {demerit.status === 'active' && showAppealForm && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedDemerit(demerit.id)
                              setShowAppeal(true)
                            }}
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Appeal
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Appeal Form */}
      {showAppeal && showAppealForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#0F7377]" />
              Submit Appeal
            </CardTitle>
            <CardDescription>
              Provide a reason for your appeal. Our team will review it within 2-3 business days.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Appeal Reason
              </label>
              <Textarea
                value={appealReason}
                onChange={(e) => setAppealReason(e.target.value)}
                placeholder="Please explain why you believe this demerit should be removed..."
                rows={4}
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleAppeal}
                disabled={isSubmittingAppeal || !appealReason.trim()}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
              >
                {isSubmittingAppeal ? "Submitting..." : "Submit Appeal"}
              </Button>
              <Button
                onClick={() => {
                  setShowAppeal(false)
                  setAppealReason("")
                  setSelectedDemerit(null)
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Demerit Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#0F7377]" />
            Demerit Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium">No Show (3 points):</span> Not attending an event you registered for without prior cancellation
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium">Late Cancellation (2 points):</span> Cancelling within 24 hours of the event start time
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="font-medium">Inappropriate Behavior (1-5 points):</span> Disruptive or inappropriate conduct during events
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> Accumulating 10 or more demerit points will result in account restriction. 
                You can appeal any demerit within 30 days of receiving it.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
