"use client"

import { useState, useRef } from "react"
import { User, Camera, Share2, CheckCircle, X, Calendar, MapPin, MessageSquare, Heart, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAttendance } from "@/contexts/AttendanceContext"

interface VirtualNameCardProps {
  eventId: number
  eventTitle: string
  eventDate: string
  eventLocation: string
  onCardCreated?: (cardId: string) => void
}

export function VirtualNameCard({ 
  eventId, 
  eventTitle, 
  eventDate, 
  eventLocation,
  onCardCreated 
}: VirtualNameCardProps) {
  const { toast } = useToast()
  const { createVirtualNameCard, getMyNameCards, getReceivedNameCards } = useAttendance()
  const [isCreating, setIsCreating] = useState(false)
  const [targetUserId, setTargetUserId] = useState("")
  const [notes, setNotes] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const myCards = getMyNameCards()
  const receivedCards = getReceivedNameCards()

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setShowCamera(true)
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try uploading a photo instead.",
        variant: "destructive"
      })
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)
        
        const dataURL = canvas.toDataURL('image/jpeg')
        setPhoto(dataURL)
        stopCamera()
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreateCard = async () => {
    if (!targetUserId.trim()) {
      toast({
        title: "Invalid User ID",
        description: "Please enter a valid user ID",
        variant: "destructive"
      })
      return
    }

    setIsCreating(true)
    
    try {
      const success = await createVirtualNameCard(targetUserId, eventId, photo || undefined, notes)
      
      if (success) {
        toast({
          title: "Name Card Created",
          description: "Virtual name card has been sent successfully",
        })
        
        setTargetUserId("")
        setNotes("")
        setPhoto(null)
        
        if (onCardCreated) {
          onCardCreated("new-card")
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to create name card",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create name card",
        variant: "destructive"
      })
    } finally {
      setIsCreating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      {/* Create New Name Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-[#0F7377]" />
            Create Virtual Name Card
          </CardTitle>
          <CardDescription>
            Share your profile with someone you met at this event
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Target User ID
            </label>
            <input
              type="text"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              placeholder="Enter user ID or scan their QR code"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0F7377] focus:border-[#0F7377]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Notes (Optional)
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a personal note about your meeting..."
              rows={3}
            />
          </div>

          {/* Photo Section */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Photo Together (Optional)
            </label>
            
            {!photo ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button
                    onClick={startCamera}
                    variant="outline"
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1"
                  >
                    Upload Photo
                  </Button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <img
                    src={photo}
                    alt="Meeting photo"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    onClick={() => setPhoto(null)}
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Camera Interface */}
            {showCamera && (
              <div className="space-y-3">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-48 bg-gray-100 rounded-lg"
                  />
                  <div className="absolute inset-0 border-2 border-[#0F7377] rounded-lg pointer-events-none">
                    <div className="absolute top-2 left-2 right-2 bottom-2 border border-white rounded opacity-50"></div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={capturePhoto}
                    className="flex-1 bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Capture Photo
                  </Button>
                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />
          </div>

          <Button
            onClick={handleCreateCard}
            disabled={isCreating || !targetUserId.trim()}
            className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
          >
            {isCreating ? "Creating..." : "Create Name Card"}
          </Button>
        </CardContent>
      </Card>

      {/* My Name Cards */}
      {myCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-[#0F7377]" />
              My Name Cards
            </CardTitle>
            <CardDescription>
              Name cards you've shared with others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myCards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {card.photo && (
                      <img
                        src={card.photo}
                        alt="Meeting photo"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">To: {card.toUserName}</h4>
                        <Badge
                          className={
                            card.connectionStatus === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : card.connectionStatus === 'declined'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {card.connectionStatus === 'accepted' ? 'Accepted' :
                           card.connectionStatus === 'declined' ? 'Declined' : 'Pending'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(card.meetingDate)} at {card.meetingTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {card.eventTitle}
                        </div>
                      </div>
                      {card.notes && (
                        <p className="text-sm text-gray-700 italic">"{card.notes}"</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Received Name Cards */}
      {receivedCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#0F7377]" />
              Received Name Cards
            </CardTitle>
            <CardDescription>
              Name cards others have shared with you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {receivedCards.map((card) => (
                <div
                  key={card.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {card.photo && (
                      <img
                        src={card.photo}
                        alt="Meeting photo"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">From: {card.fromUserName}</h4>
                        <Badge
                          className={
                            card.connectionStatus === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : card.connectionStatus === 'declined'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {card.connectionStatus === 'accepted' ? 'Accepted' :
                           card.connectionStatus === 'declined' ? 'Declined' : 'Pending'}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(card.meetingDate)} at {card.meetingTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {card.eventTitle}
                        </div>
                      </div>
                      {card.notes && (
                        <p className="text-sm text-gray-700 italic">"{card.notes}"</p>
                      )}
                      
                      {card.connectionStatus === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Decline
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {myCards.length === 0 && receivedCards.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Name Cards Yet</h3>
            <p className="text-gray-600 mb-4">
              Start networking by creating your first virtual name card
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
