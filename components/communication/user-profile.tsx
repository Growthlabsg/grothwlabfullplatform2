"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Link2,
  FileText,
  MessageSquare,
  Users,
  Star,
  Award,
  BookOpen,
  Bookmark,
  Share2,
  ChevronRight,
  ThumbsUp,
  Eye,
  Video,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfileProps {
  userId?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Mock user data
const mockUserData = {
  id: "user1",
  name: "Sarah Chen",
  avatar: "/abstract-geometric-shapes.png",
  role: "Founder & CEO @ HealthTech",
          bio: "Building the future of healthcare technology. Former Product Lead at Google Health. GrowthLab Alumni.",
  location: "Singapore",
  timezone: "GMT+8",
  email: "sarah@healthtech.co",
  phone: "+65 9123 4567",
  website: "https://sarahchen.co",
  linkedin: "linkedin.com/in/sarahchen",
  twitter: "@sarahchen",
  languages: ["English", "Mandarin", "Cantonese"],
  skills: [
    "Product Strategy",
    "Healthcare Tech",
    "AI/ML",
    "Fundraising",
    "Team Building",
    "UX Design",
    "Growth",
    "B2B SaaS",
  ],
  interests: ["Digital Health", "AI Ethics", "Sustainable Tech", "Mentorship", "Rock Climbing", "Photography"],
  education: [
    {
      institution: "Stanford University",
      degree: "MBA",
      field: "Business Administration",
      years: "2015-2017",
    },
    {
      institution: "National University of Singapore",
      degree: "BSc",
      field: "Computer Science",
      years: "2010-2014",
    },
  ],
  experience: [
    {
      company: "HealthTech",
      position: "Founder & CEO",
      years: "2020-Present",
      description: "Building AI-powered healthcare solutions for emerging markets.",
    },
    {
      company: "Google Health",
      position: "Product Lead",
      years: "2017-2020",
      description: "Led product development for healthcare data analytics platform.",
    },
    {
      company: "Grab",
      position: "Product Manager",
      years: "2014-2015",
      description: "Managed the development of Grab's payment platform in Southeast Asia.",
    },
  ],
  achievements: [
    "Forbes 30 Under 30 Asia - Healthcare & Science (2022)",
    "Raised $5M seed round for HealthTech (2021)",
    "Google Impact Challenge Winner (2019)",
    "Published in Journal of Medical AI Research (2018)",
  ],
  mentorship: {
    mentees: 12,
    sessions: 45,
    rating: 4.9,
    testimonials: [
      {
        name: "Alex Wong",
        avatar: "/abstract-geometric-aw.png",
        role: "CTO @ TechStart",
        text: "Sarah's guidance was instrumental in helping us navigate our product-market fit challenges.",
      },
      {
        name: "Mei Lin",
        avatar: "/machine-learning-concept.png",
        role: "Founder @ DataCo",
        text: "An incredible mentor who provided actionable insights for our fundraising strategy.",
      },
    ],
  },
  activity: {
    posts: 34,
    comments: 128,
    events: 15,
    connections: 450,
  },
  recentActivity: [
    {
      type: "post",
      title: "The Future of AI in Healthcare Diagnostics",
      date: "2 days ago",
      engagement: 45,
    },
    {
      type: "event",
      title: "Spoke at HealthTech Summit 2023",
      date: "1 week ago",
      engagement: 120,
    },
    {
      type: "comment",
      title: "Commented on 'Fundraising Strategies for Deep Tech'",
      date: "3 days ago",
      engagement: 8,
    },
  ],
  availability: {
    status: "Available for mentoring",
    nextAvailable: "Tomorrow, 2:00 PM",
    preferredTimes: ["Tuesdays 2-5 PM", "Thursdays 10 AM-12 PM"],
  },
}

export function UserProfile({ userId = "user1", open, onOpenChange }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isConnected, setIsConnected] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [showFullBio, setShowFullBio] = useState(false)

  // In a real app, this would fetch user data based on userId
  const userData = mockUserData

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback>{userData.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <DialogTitle className="text-2xl">{userData.name}</DialogTitle>
                  <p className="text-muted-foreground">{userData.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant={isConnected ? "outline" : "default"} onClick={() => setIsConnected(!isConnected)}>
                    {isConnected ? "Connected" : "Connect"}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing ? "text-primary" : ""}
                  >
                    <Star className={cn("h-4 w-4", isFollowing && "fill-current")} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {userData.location}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {userData.timezone}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {userData.languages[0]} +{userData.languages.length - 1}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {userData.activity.connections} connections
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <div className="px-6 border-b">
            <TabsList className="w-full justify-start p-0 h-auto bg-transparent border-b-0">
              <TabsTrigger value="overview" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
                Overview
              </TabsTrigger>
              <TabsTrigger value="experience" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
                Experience
              </TabsTrigger>
              <TabsTrigger value="mentorship" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
                Mentorship
              </TabsTrigger>
              <TabsTrigger value="activity" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
                Activity
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-sm py-2 px-4 h-10 data-[state=active]:bg-transparent">
                Contact
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <TabsContent value="overview" className="p-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About</h3>
                    <p className="text-muted-foreground">
                      {showFullBio ? userData.bio : `${userData.bio.substring(0, 100)}...`}
                      <Button
                        variant="link"
                        className="p-0 h-auto text-xs"
                        onClick={() => setShowFullBio(!showFullBio)}
                      >
                        {showFullBio ? "Show less" : "Show more"}
                      </Button>
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {userData.interests.map((interest) => (
                        <Badge key={interest} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">Recent Activity</h3>
                      <Button variant="link" className="p-0 h-auto">
                        View all <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {userData.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                          <div className="bg-muted rounded-full p-2">
                            {activity.type === "post" ? (
                              <FileText className="h-4 w-4" />
                            ) : activity.type === "event" ? (
                              <Calendar className="h-4 w-4" />
                            ) : (
                              <MessageSquare className="h-4 w-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{activity.title}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs text-muted-foreground">{activity.date}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                {activity.type === "post" ? (
                                  <>
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    <span>{activity.engagement} likes</span>
                                  </>
                                ) : activity.type === "event" ? (
                                  <>
                                    <Users className="h-3 w-3 mr-1" />
                                    <span>{activity.engagement} attendees</span>
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-3 w-3 mr-1" />
                                    <span>{activity.engagement} views</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Availability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20">
                          {userData.availability.status}
                        </Badge>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Next available: {userData.availability.nextAvailable}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p className="mb-1">Preferred times:</p>
                          <ul className="list-disc list-inside">
                            {userData.availability.preferredTimes.map((time, index) => (
                              <li key={index}>{time}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Schedule Meeting</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userData.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-amber-500 mt-0.5" />
                            <p className="text-sm">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Languages</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userData.languages.map((language, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{language}</span>
                            <Badge variant="outline">
                              {index === 0 ? "Native" : index === 1 ? "Fluent" : "Conversational"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="p-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Work Experience</h3>
                    <div className="space-y-6">
                      {userData.experience.map((exp, index) => (
                        <div key={index} className="relative pl-6 pb-6 border-l border-muted-foreground/20">
                          <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                          {index === userData.experience.length - 1 && (
                            <div className="absolute w-3 h-3 border-2 border-muted-foreground/20 rounded-full -left-[6.5px] bottom-0"></div>
                          )}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h4 className="font-medium">{exp.position}</h4>
                              <p className="text-muted-foreground">{exp.company}</p>
                            </div>
                            <Badge variant="outline">{exp.years}</Badge>
                          </div>
                          <p className="mt-2 text-sm">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.education.map((edu, index) => (
                          <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{edu.institution}</h4>
                              <Badge variant="outline">{edu.years}</Badge>
                            </div>
                            <p className="text-sm">
                              {edu.degree}, {edu.field}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Skills & Endorsements</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {userData.skills.slice(0, 5).map((skill, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{skill}</span>
                            <Badge variant="secondary">{Math.floor(Math.random() * 20) + 5}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Endorse Skills
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mentorship" className="p-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Mentorship Overview</h3>
                    <p className="text-muted-foreground mb-4">
                      {userData.name} has mentored {userData.mentorship.mentees} founders and conducted{" "}
                      {userData.mentorship.sessions} mentorship sessions.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <p className="text-3xl font-bold">{userData.mentorship.mentees}</p>
                          <p className="text-sm text-muted-foreground">Mentees</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <p className="text-3xl font-bold">{userData.mentorship.sessions}</p>
                          <p className="text-sm text-muted-foreground">Sessions</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 flex flex-col items-center justify-center">
                          <div className="flex items-center">
                            <p className="text-3xl font-bold">{userData.mentorship.rating}</p>
                            <Star className="h-5 w-5 text-amber-500 ml-1 fill-current" />
                          </div>
                          <p className="text-sm text-muted-foreground">Rating</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Mentorship Areas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { area: "Fundraising Strategy", sessions: 18 },
                        { area: "Product-Market Fit", sessions: 12 },
                        { area: "Team Building", sessions: 8 },
                        { area: "Go-to-Market Strategy", sessions: 7 },
                      ].map((item, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{item.area}</h4>
                              <Badge variant="outline">{item.sessions} sessions</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Testimonials</h3>
                    <div className="space-y-4">
                      {userData.mentorship.testimonials.map((testimonial, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                                <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center">
                                  <h4 className="font-medium">{testimonial.name}</h4>
                                  <div className="flex ml-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                <p className="mt-2 text-sm">{testimonial.text}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Request Mentorship</CardTitle>
                      <CardDescription>Book a session with {userData.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Next available: {userData.availability.nextAvailable}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Session duration: 30 minutes</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Book Mentorship Session</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Mentorship Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {[
                          "Fundraising",
                          "Product Strategy",
                          "Team Building",
                          "Growth Hacking",
                          "Pitch Deck Review",
                        ].map((topic, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Mentorship Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { title: "Fundraising Checklist", type: "PDF" },
                          { title: "Pitch Deck Template", type: "PPTX" },
                          { title: "Growth Metrics Dashboard", type: "XLSX" },
                        ].map((resource, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">{resource.title}</span>
                            </div>
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Access Resources
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="p-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {[
                        {
                          type: "post",
                          title: "The Future of AI in Healthcare Diagnostics",
                          content:
                            "Excited to share my thoughts on how AI is transforming healthcare diagnostics in emerging markets...",
                          date: "2 days ago",
                          likes: 45,
                          comments: 12,
                        },
                        {
                          type: "event",
                          title: "Spoke at HealthTech Summit 2023",
                          content:
                            "Had a great time speaking about 'Building Healthcare Solutions for Emerging Markets' at the HealthTech Summit...",
                          date: "1 week ago",
                          attendees: 120,
                        },
                        {
                          type: "comment",
                          title: "Commented on 'Fundraising Strategies for Deep Tech'",
                          content:
                            "Great article! I'd add that for deep tech startups, it's crucial to have a clear path to commercialization...",
                          date: "3 days ago",
                          likes: 8,
                        },
                        {
                          type: "connection",
                          title: "Connected with Alex Wong",
                          content: "CTO @ TechStart",
                          date: "5 days ago",
                        },
                      ].map((activity, index) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="bg-muted rounded-full p-2">
                                {activity.type === "post" ? (
                                  <FileText className="h-4 w-4" />
                                ) : activity.type === "event" ? (
                                  <Calendar className="h-4 w-4" />
                                ) : activity.type === "comment" ? (
                                  <MessageSquare className="h-4 w-4" />
                                ) : (
                                  <Users className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{activity.title}</h4>
                                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                                </div>
                                {activity.content && <p className="mt-1 text-sm">{activity.content}</p>}
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-4">
                                    {activity.likes && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        <span>{activity.likes} likes</span>
                                      </div>
                                    )}
                                    {activity.comments && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        <span>{activity.comments} comments</span>
                                      </div>
                                    )}
                                    {activity.attendees && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <Users className="h-3 w-3 mr-1" />
                                        <span>{activity.attendees} attendees</span>
                                      </div>
                                    )}
                                  </div>
                                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                                    View
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Activity Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                          <p className="text-2xl font-bold">{userData.activity.posts}</p>
                          <p className="text-sm text-muted-foreground">Posts</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                          <p className="text-2xl font-bold">{userData.activity.comments}</p>
                          <p className="text-sm text-muted-foreground">Comments</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                          <p className="text-2xl font-bold">{userData.activity.events}</p>
                          <p className="text-sm text-muted-foreground">Events</p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 border rounded-md">
                          <p className="text-2xl font-bold">{userData.activity.connections}</p>
                          <p className="text-sm text-muted-foreground">Connections</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Saved Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { title: "Fundraising Strategies for 2023", type: "Article" },
                          { title: "AI in Healthcare Panel Discussion", type: "Event" },
                          { title: "Product-Market Fit Workshop", type: "Resource" },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Bookmark className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">{item.title}</span>
                            </div>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Saved Items
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Groups & Communities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { name: "Healthcare Founders Network", members: 1250 },
                          { name: "Women in Tech Singapore", members: 3400 },
                          { name: "GrowthLab Alumni SEA", members: 850 },
                        ].map((group, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm">{group.name}</span>
                            </div>
                            <Badge variant="secondary">{group.members}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="p-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Connect with {userData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">{userData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{userData.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Website</p>
                        <p className="text-sm text-muted-foreground">{userData.website}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Link2 className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-sm text-muted-foreground">{userData.linkedin}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Twitter</p>
                        <p className="text-sm text-muted-foreground">{userData.twitter}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <User className="h-4 w-4 mr-2" />
                      Save Contact
                    </Button>
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Schedule a Meeting</CardTitle>
                    <CardDescription>Book time with {userData.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Meeting Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                          <div className="flex items-center">
                            <Video className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Video Call</span>
                          </div>
                        </div>
                        <div className="border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Phone Call</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Duration</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50 flex items-center justify-center">
                          <span className="text-sm">15 min</span>
                        </div>
                        <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50 flex items-center justify-center bg-muted/50">
                          <span className="text-sm">30 min</span>
                        </div>
                        <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50 flex items-center justify-center">
                          <span className="text-sm">60 min</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Availability</h4>
                      <div className="border rounded-md p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Next Week</span>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <span className="text-xs text-muted-foreground">{day}</span>
                              <span className="text-sm">{index + 10}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50 flex items-center justify-center">
                            <span className="text-xs">2:00 PM</span>
                          </div>
                          <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50 flex items-center justify-center">
                            <span className="text-xs">3:30 PM</span>
                          </div>
                          <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50 flex items-center justify-center">
                            <span className="text-xs">4:00 PM</span>
                          </div>
                          <div className="border rounded-md p-2 cursor-pointer hover:bg-muted/50 flex items-center justify-center">
                            <span className="text-xs">5:30 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Schedule Meeting</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
