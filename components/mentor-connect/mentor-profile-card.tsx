"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  CheckCircle, 
  MessageCircle,
  Calendar,
  Award,
  TrendingUp,
  Target,
  Building2,
  GraduationCap,
  Briefcase,
  Globe,
  ExternalLink,
  Heart,
  Share2,
  BookOpen,
  Video,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Globe as GlobeIcon
} from "lucide-react"
import { User, MentorProfile, MenteeProfile, StartupProfile } from "@/lib/mentor-connect-service"

interface MentorProfileCardProps {
  user: User
}

export function MentorProfileCard({ user }: MentorProfileCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showFullProfile, setShowFullProfile] = useState(false)

  const getProfileType = (user: User) => {
    if (user.userType === "mentor") return user as MentorProfile
    if (user.userType === "mentee") return user as MenteeProfile
    if (user.userType === "startup") return user as StartupProfile
    return null
  }

  const profile = getProfileType(user)

  const getExpertiseBadges = () => {
    return user.expertise.slice(0, 3).map((exp, index) => (
      <Badge key={index} variant="secondary" className="text-xs">
        {exp.replace("-", " ")}
      </Badge>
    ))
  }

  const getIndustryBadges = () => {
    return user.industries.slice(0, 2).map((ind, index) => (
      <Badge key={index} variant="outline" className="text-xs">
        {ind}
      </Badge>
    ))
  }

  const getAvailabilityStatus = () => {
    if (!user.isAvailable) return "Unavailable"
    const now = new Date()
    const hour = now.getHours()
    if (hour >= 9 && hour <= 17) return "Available now"
    return "Available during business hours"
  }

  const getProfileIcon = () => {
    switch (user.userType) {
      case "mentor":
        return <GraduationCap className="h-4 w-4" />
      case "mentee":
        return <Target className="h-4 w-4" />
      case "startup":
        return <Building2 className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getProfileTitle = () => {
    switch (user.userType) {
      case "mentor":
        return "Mentor"
      case "mentee":
        return "Mentee"
      case "startup":
        return "Startup"
      default:
        return "User"
    }
  }

  const getProfileColor = () => {
    switch (user.userType) {
      case "mentor":
        return "border-blue-200 bg-blue-50"
      case "mentee":
        return "border-green-200 bg-green-50"
      case "startup":
        return "border-purple-200 bg-purple-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getProfileBadgeColor = () => {
    switch (user.userType) {
      case "mentor":
        return "bg-blue-100 text-blue-800"
      case "mentee":
        return "bg-green-100 text-green-800"
      case "startup":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${getProfileColor()} border-2`}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image and Basic Info */}
          <div className="flex flex-col items-center text-center md:w-48">
            <Avatar className="h-20 w-20 mb-3">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex items-center gap-1 mb-1">
              {getProfileIcon()}
              <span className="text-sm font-medium text-muted-foreground">
                {getProfileTitle()}
              </span>
            </div>
            
            <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
            
            {user.userType === "mentor" && profile && (
              <p className="text-sm text-muted-foreground mb-2">
                {(profile as MentorProfile).specializations?.join(", ") || "Expert Mentor"}
              </p>
            )}
            
            {user.userType === "mentee" && profile && (
              <p className="text-sm text-muted-foreground mb-2">
                {(profile as MenteeProfile).currentRole} at {(profile as MenteeProfile).company}
              </p>
            )}
            
            {user.userType === "startup" && profile && (
              <p className="text-sm text-muted-foreground mb-2">
                {(profile as StartupProfile).companyName}
              </p>
            )}

            <div className="flex items-center mt-2 mb-3">
              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{user.location}</span>
            </div>

            <div className="flex items-center mb-4">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{user.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">
                ({user.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Clock className="h-3 w-3 mr-1" />
              <span>{getAvailabilityStatus()}</span>
            </div>

            {user.isVerified && (
              <div className="flex items-center text-sm text-green-600 mb-4">
                <CheckCircle className="h-3 w-3 mr-1" />
                <span>Verified</span>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-4 flex-1">
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {user.bio}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {getExpertiseBadges()}
                    {user.expertise.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.expertise.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {getIndustryBadges()}
                    {user.industries.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{user.industries.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                {user.userType === "mentor" && profile && (
                  <div>
                    <h4 className="font-medium mb-2">Mentoring Style</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {(profile as MentorProfile).mentoringStyle}
                      </Badge>
                      <Badge variant="outline">
                        ${(profile as MentorProfile).hourlyRate}/hr
                      </Badge>
                    </div>
                  </div>
                )}

                {user.userType === "mentee" && profile && (
                  <div>
                    <h4 className="font-medium mb-2">Startup Stage</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {(profile as MenteeProfile).startupStage}
                      </Badge>
                      <Badge variant="outline">
                        {(profile as MenteeProfile).fundingStage}
                      </Badge>
                    </div>
                  </div>
                )}

                {user.userType === "startup" && profile && (
                  <div>
                    <h4 className="font-medium mb-2">Company Details</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {(profile as StartupProfile).startupStage}
                      </Badge>
                      <Badge variant="outline">
                        Team: {(profile as StartupProfile).teamSize} people
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Panel */}
              <div className="md:w-64 space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Status</div>
                    <div className="text-sm font-bold text-green-600">
                      {user.isAvailable ? "Available" : "Unavailable"}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{user.reviewCount} reviews</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {getProfileIcon()}
                            {user.name} - {getProfileTitle()} Profile
                          </DialogTitle>
                          <DialogDescription>
                            Detailed profile and matching information
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="availability">Availability</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-2">About</h4>
                                <p className="text-sm text-muted-foreground">{user.bio}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Goals</h4>
                                <div className="flex flex-wrap gap-2">
                                  {user.goals.map((goal, index) => (
                                    <Badge key={index} variant="outline">
                                      {goal}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                  {user.expertise.map((exp, index) => (
                                    <Badge key={index} variant="secondary">
                                      {exp.replace("-", " ")}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-2">Industries</h4>
                                <div className="flex flex-wrap gap-2">
                                  {user.industries.map((ind, index) => (
                                    <Badge key={index} variant="outline">
                                      {ind}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="experience" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-4">Work Experience</h4>
                              <div className="space-y-4">
                                {user.experience.map((exp, index) => (
                                  <div key={index} className="border-l-2 border-primary pl-4">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <h5 className="font-medium">{exp.position}</h5>
                                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                                      </div>
                                      <span className="text-xs text-muted-foreground">
                                        {exp.startDate} - {exp.isCurrent ? "Present" : exp.endDate}
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="availability" className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-4">Availability</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.availability.map((avail, index) => (
                                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                      <span className="font-medium capitalize">{avail.day}</span>
                                      <p className="text-sm text-muted-foreground">
                                        {avail.startTime} - {avail.endTime}
                                      </p>
                                    </div>
                                    <Badge variant="outline">{avail.timezone}</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="reviews" className="space-y-4">
                            <div className="text-center py-8">
                              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                              <h4 className="text-2xl font-bold">{user.rating}</h4>
                              <p className="text-muted-foreground">{user.reviewCount} reviews</p>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 