"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  QrCode, 
  Download, 
  Share2, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  Twitter, 
  MapPin, 
  Building,
  User,
  Calendar,
  Star,
  Heart,
  MessageCircle,
  Bookmark,
  Copy
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { useAuth } from "@/contexts/auth-context"

interface DigitalBusinessCardProps {
  userId?: string
  isPreview?: boolean
  onShare?: () => void
  onDownload?: () => void
}

export function DigitalBusinessCard({ userId, isPreview = false, onShare, onDownload }: DigitalBusinessCardProps) {
  const { user } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showQR, setShowQR] = useState(false)

  // Use provided userId or current user
  const profileUser = userId ? { /* Fetch user by ID */ } : user

  if (!profileUser) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">User not found</p>
        </CardContent>
      </Card>
    )
  }

  const generateProfileQR = () => {
    const profileData = {
      userId: profileUser.id,
      name: profileUser.name,
      email: profileUser.email,
      company: profileUser.company || "GrowthLab",
      position: profileUser.position || "Member",
      profileUrl: `${window.location.origin}/profile/${profileUser.id}`,
      timestamp: new Date().toISOString()
    }
    
    return JSON.stringify(profileData)
  }

  const handleCopyContact = (type: string, value: string) => {
    navigator.clipboard.writeText(value)
    // You could add a toast notification here
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileUser.name}'s Business Card`,
          text: `Connect with ${profileUser.name} - ${profileUser.position} at ${profileUser.company}`,
          url: `${window.location.origin}/profile/${profileUser.id}`
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      onShare?.()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Main Business Card */}
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 shadow-xl">
        <CardHeader className="text-center pb-4">
          {/* Profile Header */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-700 shadow-lg">
                <AvatarImage src={profileUser.avatar} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  {profileUser.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              
              {/* Verification Badge */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profileUser.name || 'Your Name'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {profileUser.position || 'Position'}
              </p>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Building className="h-4 w-4" />
                <span>{profileUser.company || 'Company'}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
              Contact Information
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {profileUser.email || 'email@example.com'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyContact('email', profileUser.email || '')}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Phone className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {profileUser.phone || '+65 1234 5678'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyContact('phone', profileUser.phone || '')}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Globe className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {profileUser.website || 'www.example.com'}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyContact('website', profileUser.website || '')}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                  {profileUser.location || 'Singapore'}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          {(profileUser.linkedin || profileUser.twitter) && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Social Links
              </h3>
              
              <div className="flex gap-2">
                {profileUser.linkedin && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                )}
                {profileUser.twitter && (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Skills/Interests */}
          {profileUser.skills && profileUser.skills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Skills & Interests
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {profileUser.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`flex-1 ${isLiked ? 'text-red-500 border-red-500' : ''}`}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex-1 ${isBookmarked ? 'text-blue-500 border-blue-500' : ''}`}
            >
              <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </Button>
            
            <Button variant="outline" size="sm" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          </div>

          {/* QR Code Toggle */}
          <div className="text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowQR(!showQR)}
              className="text-blue-600 hover:text-blue-700"
            >
              <QrCode className="h-4 w-4 mr-2" />
              {showQR ? 'Hide QR Code' : 'Show QR Code'}
            </Button>
          </div>

          {/* QR Code */}
          {showQR && (
            <div className="text-center space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="bg-white p-4 rounded-lg inline-block">
                <QRCodeSVG 
                  value={generateProfileQR()} 
                  size={120}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-xs text-gray-500">
                Scan to connect or share this profile
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {!isPreview && (
        <div className="flex gap-3 mt-6">
          <Button 
            onClick={onDownload || (() => {})}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Card
          </Button>
          
          <Button 
            onClick={handleShare}
            variant="outline"
            className="flex-1"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          Powered by GrowthLab • {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
