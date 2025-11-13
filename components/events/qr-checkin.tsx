"use client"

import { useState, useRef, useEffect } from "react"
import { QrCode, Camera, CheckCircle, X, Users, Clock, MapPin, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAttendance } from "@/contexts/AttendanceContext"

interface QRCheckInProps {
  eventId: number
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  isHost?: boolean
}

export function QRCheckIn({ 
  eventId, 
  eventTitle, 
  eventDate, 
  eventTime, 
  eventLocation,
  isHost = false 
}: QRCheckInProps) {
  const { toast } = useToast()
  const { checkInUser, checkOutUser, getEventAttendance, generateQRCode } = useAttendance()
  const [isScanning, setIsScanning] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [manualCode, setManualCode] = useState("")
  const [attendance, setAttendance] = useState<any[]>([])
  const [showManualInput, setShowManualInput] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    // Load attendance data
    const eventAttendance = getEventAttendance(eventId)
    setAttendance(eventAttendance)
  }, [eventId, getEventAttendance])

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsScanning(true)
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try manual input.",
        variant: "destructive"
      })
      setShowManualInput(true)
    }
  }

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
  }

  const handleQRScan = async (scannedCode: string) => {
    try {
      const success = await checkInUser(eventId, scannedCode)
      
      if (success) {
        toast({
          title: "Check-in Successful",
          description: "User has been checked in successfully",
        })
        
        // Refresh attendance data
        const eventAttendance = getEventAttendance(eventId)
        setAttendance(eventAttendance)
        
        // Stop scanning
        stopScanning()
      } else {
        toast({
          title: "Check-in Failed",
          description: "Invalid QR code or user already checked in",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process check-in",
        variant: "destructive"
      })
    }
  }

  const handleManualCheckIn = async () => {
    if (!manualCode.trim()) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid QR code",
        variant: "destructive"
      })
      return
    }

    await handleQRScan(manualCode)
    setManualCode("")
  }

  const handleCheckOut = async (userId: string) => {
    try {
      const success = await checkOutUser(eventId, userId)
      
      if (success) {
        toast({
          title: "Check-out Successful",
          description: "User has been checked out successfully",
        })
        
        // Refresh attendance data
        const eventAttendance = getEventAttendance(eventId)
        setAttendance(eventAttendance)
      } else {
        toast({
          title: "Check-out Failed",
          description: "Failed to check out user",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process check-out",
        variant: "destructive"
      })
    }
  }

  const generateMyQRCode = () => {
    // Generate unified QR code that works for all purposes
    const myQRCode = generateQRCode("current-user", eventId)
    setQrCode(myQRCode)
  }

  const copyQRCode = () => {
    navigator.clipboard.writeText(qrCode)
    toast({
      title: "QR Code Copied",
      description: "QR code has been copied to clipboard",
    })
  }

  const checkedInCount = attendance.filter(record => record.status === 'checked-in').length
  const checkedOutCount = attendance.filter(record => record.status === 'checked-out').length
  const totalAttendees = attendance.length

  return (
    <div className="space-y-6">
      {/* Event Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-[#0F7377]" />
            Event Check-in
          </CardTitle>
          <CardDescription>
            {isHost ? "Scan attendee QR codes to check them in" : "Show your QR code to check in"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg">{eventTitle}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {eventDate} • {eventTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {eventLocation}
                </span>
              </div>
            </div>

            {/* Attendance Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{checkedInCount}</div>
                <div className="text-sm text-green-600">Checked In</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{checkedOutCount}</div>
                <div className="text-sm text-blue-600">Checked Out</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{totalAttendees}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Host Check-in Interface */}
      {isHost && (
        <Card>
          <CardHeader>
            <CardTitle>Check-in Scanner</CardTitle>
            <CardDescription>
              Scan attendee QR codes or enter codes manually
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isScanning ? (
              <div className="space-y-4">
                <Button
                  onClick={startScanning}
                  className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera Scanner
                </Button>
                
                <div className="text-center text-gray-500">or</div>
                
                <Button
                  onClick={() => setShowManualInput(!showManualInput)}
                  variant="outline"
                  className="w-full"
                >
                  Enter Code Manually
                </Button>

                {showManualInput && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        QR Code
                      </label>
                      <input
                        type="text"
                        value={manualCode}
                        onChange={(e) => setManualCode(e.target.value)}
                        placeholder="Enter QR code here"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
                      />
                    </div>
                    <Button
                      onClick={handleManualCheckIn}
                      className="w-full"
                    >
                      Check In User
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-64 bg-gray-100 rounded-lg"
                  />
                  <div className="absolute inset-0 border-2 border-[#0F7377] rounded-lg pointer-events-none">
                    <div className="absolute top-2 left-2 right-2 bottom-2 border border-white rounded opacity-50"></div>
                  </div>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  Position the QR code within the frame
                </div>
                
                <Button
                  onClick={stopScanning}
                  variant="outline"
                  className="w-full"
                >
                  <X className="h-4 w-4 mr-2" />
                  Stop Scanning
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Attendee QR Code */}
      {!isHost && (
        <Card>
          <CardHeader>
            <CardTitle>Your QR Code</CardTitle>
            <CardDescription>
              Show this QR code to event staff for check-in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrCode ? (
              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                  <div className="font-mono text-sm break-all max-w-xs">
                    {qrCode}
                  </div>
                </div>
                <Button
                  onClick={copyQRCode}
                  variant="outline"
                  className="w-full"
                >
                  Copy QR Code
                </Button>
              </div>
            ) : (
              <Button
                onClick={generateMyQRCode}
                className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate My QR Code
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Attendance List */}
      {isHost && attendance.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#0F7377]" />
              Attendance List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendance.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0F7377] rounded-full flex items-center justify-center text-white font-semibold">
                      {record.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{record.userName}</div>
                      <div className="text-sm text-gray-600">{record.userEmail}</div>
                      <div className="text-xs text-gray-500">
                        Checked in: {new Date(record.checkInTime).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        record.status === 'checked-in'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'checked-out'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {record.status === 'checked-in' ? 'Checked In' : 
                       record.status === 'checked-out' ? 'Checked Out' : 'Unknown'}
                    </Badge>
                    
                    {record.status === 'checked-in' && (
                      <Button
                        onClick={() => handleCheckOut(record.userId)}
                        size="sm"
                        variant="outline"
                      >
                        Check Out
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
