"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  QrCode, 
  Camera, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  X, 
  CheckCircle, 
  AlertCircle,
  Download,
  Share2,
  MessageCircle,
  Bell,
  Tag,
  Plus,
  Camera as CameraIcon
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface ProfileData {
  userId: string
  name: string
  email: string
  company: string
  position: string
  profileUrl: string
  timestamp: string
  avatar?: string
}

interface EventData {
  eventId: string
  eventName: string
  eventDate: string
  eventTime: string
  location: string
  organizer: string
}

interface QRScannerProps {
  isOpen: boolean
  onClose: () => void
  mode: "profile" | "event" | "checkin"
  onScan: (data: ProfileData | EventData) => void
}

export function QRScanner({ isOpen, onClose, mode, onScan }: QRScannerProps) {
  const { user } = useAuth()
  const [scanning, setScanning] = useState(false)
  const [scannedData, setScannedData] = useState<ProfileData | EventData | null>(null)
  const [showSelfie, setShowSelfie] = useState(false)
  const [selfieImage, setSelfieImage] = useState<string | null>(null)
  const [notes, setNotes] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [followUpReminder, setFollowUpReminder] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const availableTags = [
    "SaaS", "AI", "FinTech", "Healthcare", "E-commerce", "EdTech", "Female Founder", 
    "CTO", "CEO", "Investor", "Mentor", "Developer", "Designer", "Marketing"
  ]

  useEffect(() => {
    if (isOpen && scanning) {
      startCamera()
    } else if (!scanning) {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isOpen, scanning])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }

  const handleScan = (data: string) => {
    try {
      const parsedData = JSON.parse(data)
      
      if (mode === "profile" && "userId" in parsedData) {
        setScannedData(parsedData as ProfileData)
      } else if (mode === "event" && "eventId" in parsedData) {
        setScannedData(parsedData as EventData)
      }
      
      setScanning(false)
      stopCamera()
    } catch (error) {
      console.error("Invalid QR code data:", error)
    }
  }

  const takeSelfie = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      })
      
      const video = document.createElement('video')
      video.srcObject = stream
      video.play()
      
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        
        context?.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg')
        setSelfieImage(imageData)
        setShowSelfie(false)
        
        stream.getTracks().forEach(track => track.stop())
      })
    } catch (error) {
      console.error("Error taking selfie:", error)
    }
  }

  const handleConnection = () => {
    if (scannedData && "userId" in scannedData) {
      const connectionData = {
        ...scannedData,
        notes,
        tags: selectedTags,
        followUpReminder,
        selfie: selfieImage
      }
      onScan(connectionData)
      onClose()
    }
  }

  const handleEventCheckIn = () => {
    if (scannedData && "eventId" in scannedData) {
      onScan(scannedData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5" />
                {mode === "profile" && "Scan Profile QR Code"}
                {mode === "event" && "Scan Event QR Code"}
                {mode === "checkin" && "Event Check-in"}
              </CardTitle>
              <CardDescription>
                {mode === "profile" && "Scan someone's profile QR code to connect"}
                {mode === "event" && "Scan event QR code for details"}
                {mode === "checkin" && "Scan event QR code to check in"}
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!scannedData ? (
            /* QR Scanner Interface */
            <div className="space-y-4">
              {scanning ? (
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-64 bg-gray-900 rounded-lg"
                    autoPlay
                    playsInline
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-blue-500 rounded-lg relative">
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto">
                    <QrCode className="h-16 w-16 text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Click start to begin scanning QR codes
                  </p>
                </div>
              )}

              <div className="flex gap-2 justify-center">
                {!scanning ? (
                  <Button onClick={() => setScanning(true)} className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Start Scanning
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => setScanning(false)}>
                    Stop Scanning
                  </Button>
                )}
              </div>

              {/* Manual Input for Testing */}
              <div className="border-t pt-4">
                <Label className="text-sm font-medium">Manual QR Data (for testing)</Label>
                <Input
                  placeholder="Paste QR code data here..."
                  className="mt-2"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleScan(e.currentTarget.value)
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            /* Scanned Data Display */
            <div className="space-y-4">
              {mode === "profile" && "userId" in scannedData ? (
                /* Profile Connection */
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={scannedData.avatar} />
                      <AvatarFallback className="text-lg font-bold">
                        {scannedData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {scannedData.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {scannedData.position} at {scannedData.company}
                      </p>
                      <p className="text-sm text-gray-500">{scannedData.email}</p>
                    </div>
                  </div>

                  {/* Connection Details */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Notes about this connection</Label>
                      <Input
                        placeholder="What did you discuss? Any follow-up needed?"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Tags</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {availableTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => {
                              if (selectedTags.includes(tag)) {
                                setSelectedTags(selectedTags.filter(t => t !== tag))
                              } else {
                                setSelectedTags([...selectedTags, tag])
                              }
                            }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Follow-up reminder</Label>
                      <Input
                        placeholder="When should you follow up? (e.g., 'Next week', 'In 2 days')"
                        value={followUpReminder}
                        onChange={(e) => setFollowUpReminder(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    {/* Selfie Option */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Take a selfie together</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowSelfie(true)}
                          className="flex items-center gap-2"
                        >
                          <CameraIcon className="h-4 w-4" />
                          Take Selfie
                        </Button>
                        {selfieImage && (
                          <div className="flex items-center gap-2">
                            <img 
                              src={selfieImage} 
                              alt="Selfie" 
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelfieImage(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setScannedData(null)}>
                      Scan Another
                    </Button>
                    <Button onClick={handleConnection} className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              ) : mode === "event" && "eventId" in scannedData ? (
                /* Event Information */
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                      {scannedData.eventName}
                    </h3>
                    <div className="space-y-2 mt-2 text-sm text-blue-700 dark:text-blue-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {scannedData.eventDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {scannedData.eventTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {scannedData.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Organized by {scannedData.organizer}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setScannedData(null)}>
                      Scan Another
                    </Button>
                    <Button onClick={handleEventCheckIn} className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Check In
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selfie Camera Modal */}
      {showSelfie && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CameraIcon className="h-5 w-5" />
                Take a Selfie
              </CardTitle>
              <CardDescription>
                Capture the moment with your new connection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CameraIcon className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Click the button below to take a selfie
                </p>
                <Button onClick={takeSelfie} className="flex items-center gap-2">
                  <CameraIcon className="h-4 w-4" />
                  Take Selfie
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowSelfie(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
