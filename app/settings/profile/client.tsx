"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Link as LinkIcon,
  Plus,
  X,
  Edit,
  GraduationCap,
  Briefcase,
  Award,
  Star,
  Calendar,
  Building,
  School,
  BookOpen,
  Languages,
  Target,
  Zap,
  Eye,
  MessageSquare,
  Share2,
  MoreHorizontal,
  Download,
  ExternalLink,
  QrCode,
  CreditCard,
  Copy,
  Heart,
  Video,
  Send,
  Bookmark,
  Flag,
  Settings as SettingsIcon,
  Trash2,
  Archive
} from "lucide-react"

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional(),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }).optional(),
  company: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  github: z.string().optional(),
  phone: z.string().optional(),
  timezone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  name: "Arul Murugan",
  email: "arul@example.com",
  bio: "Passionate software engineer and entrepreneur with expertise in full-stack development, AI/ML, and building scalable applications. Former Senior Software Engineer at Google with 8+ years of experience in technology and startup ecosystem.",
  title: "Senior Software Engineer",
  company: "Google",
  location: "Singapore",
  website: "https://arulmurugan.com",
  linkedin: "arul-murugan-525b321a7",
  twitter: "arulmurugan",
  github: "arulmurugan",
  phone: "+65 9123 4567",
  timezone: "GMT+8",
}

// Mock profile data following LinkedIn structure
const mockProfileData = {
  name: "Arul Murugan",
  title: "Senior Software Engineer",
  company: "Google",
  location: "Singapore",
  bio: "Passionate software engineer and entrepreneur with expertise in full-stack development, AI/ML, and building scalable applications. Former Senior Software Engineer at Google with 8+ years of experience in technology and startup ecosystem.",
  avatar: "/abstract-geometric-shapes.png",
  coverImage: "/abstract-headscape.png",
  stats: {
    connections: 500,
    followers: 1200,
    posts: 45,
    views: 2500
  },
  experience: [
    {
      id: "1",
      company: "Google",
      position: "Senior Software Engineer",
      years: "2021-Present",
      location: "Singapore",
      description: "Leading development of scalable cloud infrastructure and AI-powered applications. Working on Google Cloud Platform and internal tools.",
      achievements: ["Led team of 8 engineers", "Improved system performance by 40%", "Mentored 15+ junior developers"]
    },
    {
      id: "2",
      company: "Microsoft",
      position: "Software Engineer",
      years: "2019-2021",
      location: "Seattle, WA",
      description: "Developed enterprise software solutions and contributed to Azure cloud services.",
      achievements: ["Shipped 3 major features", "Reduced bug reports by 60%", "Collaborated with 20+ teams"]
    },
    {
      id: "3",
      company: "StartupXYZ",
      position: "Co-founder & CTO",
      years: "2017-2019",
      location: "Singapore",
      description: "Built and scaled a SaaS platform from 0 to 10,000 users. Raised $2M in funding.",
      achievements: ["Raised $2M Series A", "Grew to 10K users", "Built team of 15 engineers"]
    }
  ],
  education: [
    {
      id: "1",
      institution: "National University of Singapore",
      degree: "Bachelor of Computing",
      field: "Computer Science",
      years: "2013-2017",
      description: "Specialized in Software Engineering and Artificial Intelligence. Graduated with First Class Honours.",
      activities: ["Dean's List", "Programming Team Captain", "Hackathon Winner"]
    }
  ],
  skills: [
    { name: "JavaScript", level: "Expert", endorsements: 89 },
    { name: "Python", level: "Expert", endorsements: 76 },
    { name: "React", level: "Advanced", endorsements: 65 },
    { name: "Node.js", level: "Advanced", endorsements: 58 },
    { name: "Machine Learning", level: "Intermediate", endorsements: 42 },
    { name: "AWS", level: "Advanced", endorsements: 51 },
    { name: "Docker", level: "Intermediate", endorsements: 38 },
    { name: "Kubernetes", level: "Intermediate", endorsements: 35 }
  ],
  certifications: [
    {
      id: "1",
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2023",
      credentialId: "GCP-DEV-2023-001"
    },
    {
      id: "2",
      name: "AWS Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      credentialId: "AWS-SA-2022-045"
    }
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Tamil", level: "Native" },
    { name: "Mandarin", level: "Conversational" }
  ],
  interests: [
    "Artificial Intelligence", "Startup Ecosystem", "Open Source", "Mentorship",
    "Travel", "Photography", "Reading", "Fitness"
  ],
  achievements: [
    "Google Impact Challenge Winner (2022)",
    "Forbes 30 Under 30 Asia - Technology (2021)",
    "NUS Outstanding Graduate Award (2017)",
    "Speaker at TEDx Singapore (2020)"
  ]
}

export default function ProfileSettingsClient() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState("edit")
  const [showPreview, setShowPreview] = useState(false)
  const [profileData, setProfileData] = useState(mockProfileData)
  const [showCoverEdit, setShowCoverEdit] = useState(false)
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    setTimeout(() => {
      console.log(data)
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    }, 1000)
  }

  // Preview functionality handlers
  const handleEditCover = () => {
    setShowCoverEdit(true)
    toast({
      title: "Edit Cover Photo",
      description: "Cover photo editing feature coming soon!",
    })
  }

  const handleSendMessage = () => {
    toast({
      title: "Send Message",
      description: "Messaging feature coming soon!",
    })
  }

  const handleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions)
  }

  const handleConnect = () => {
    toast({
      title: "Connect",
      description: "Connection request sent!",
    })
  }

  const handleFollow = () => {
    toast({
      title: "Follow",
      description: "You are now following this profile!",
    })
  }

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `${profileData.name} - Professional Profile`,
        text: `Check out ${profileData.name}'s professional profile`,
        url: window.location.origin + '/profile'
      })
    } else {
      navigator.clipboard.writeText(window.location.origin + '/profile')
      toast({
        title: "Profile Link Copied",
        description: "The profile link has been copied to your clipboard.",
      })
    }
  }

  const handleDownloadProfile = () => {
    toast({
      title: "Download Profile",
      description: "Profile download feature coming soon!",
    })
  }

  const handleBookmark = () => {
    toast({
      title: "Bookmarked",
      description: "Profile has been bookmarked!",
    })
  }

  const handleReport = () => {
    toast({
      title: "Report Profile",
      description: "Report feature coming soon!",
    })
  }

  // Close dropdown when clicking outside
  const handleClickOutside = (event: React.MouseEvent) => {
    if (showMoreOptions) {
      setShowMoreOptions(false)
    }
  }

  const ProfilePreview = () => (
    <div className="max-w-4xl mx-auto bg-white" onClick={handleClickOutside}>
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute top-4 right-4 bg-white/90 hover:bg-white"
          onClick={handleEditCover}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Cover
        </Button>
      </div>

      {/* Profile Header */}
      <div className="relative px-6 pb-6">
        <Avatar className="h-32 w-32 border-4 border-white absolute -top-16 left-6">
          <AvatarImage src={profileData.avatar} alt={profileData.name} />
          <AvatarFallback>{profileData.name.substring(0, 2)}</AvatarFallback>
        </Avatar>
        
        <div className="flex justify-between items-start pt-20">
          <div>
            <h1 className="text-2xl font-bold">{profileData.name}</h1>
            <p className="text-lg text-gray-600">{profileData.title} at {profileData.company}</p>
            <p className="text-sm text-gray-500">{profileData.location}</p>
            <p className="text-sm text-gray-500 mt-2">{profileData.bio}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSendMessage}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <div className="relative">
              <Button variant="outline" size="sm" onClick={handleMoreOptions}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
              {showMoreOptions && (
                <div className="absolute right-0 top-10 bg-white border rounded-lg shadow-lg py-2 z-10 min-w-[200px]">
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={handleConnect}
                  >
                    <User className="h-4 w-4" />
                    Connect
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={handleFollow}
                  >
                    <Heart className="h-4 w-4" />
                    Follow
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={handleShareProfile}
                  >
                    <Share2 className="h-4 w-4" />
                    Share Profile
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={handleDownloadProfile}
                  >
                    <Download className="h-4 w-4" />
                    Download Profile
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={handleBookmark}
                  >
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                    onClick={handleReport}
                  >
                    <Flag className="h-4 w-4" />
                    Report
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm text-gray-600">
          <button 
            className="hover:text-[#0F7377] transition-colors cursor-pointer"
            onClick={() => toast({ title: "Connections", description: "View connections feature coming soon!" })}
          >
            {profileData.stats.connections} connections
          </button>
          <button 
            className="hover:text-[#0F7377] transition-colors cursor-pointer"
            onClick={() => toast({ title: "Followers", description: "View followers feature coming soon!" })}
          >
            {profileData.stats.followers} followers
          </button>
          <button 
            className="hover:text-[#0F7377] transition-colors cursor-pointer"
            onClick={() => toast({ title: "Posts", description: "View posts feature coming soon!" })}
          >
            {profileData.stats.posts} posts
          </button>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="border-t">
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-12">
            <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
            <TabsTrigger value="experience" className="flex-1">Experience</TabsTrigger>
            <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
            <TabsTrigger value="skills" className="flex-1">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">About</h3>
                <p className="text-gray-700">{profileData.bio}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.slice(0, 6).map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-[#0F7377]/10 hover:text-[#0F7377] transition-colors"
                      onClick={() => toast({ 
                        title: "Skill Details", 
                        description: `${skill.name} - ${skill.level} level with ${skill.endorsements} endorsements` 
                      })}
                    >
                      {skill.name} • {skill.endorsements}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Languages</h3>
                <div className="space-y-2">
                  {profileData.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="p-6">
            <div className="space-y-6">
              {profileData.experience.map((exp) => (
                <div key={exp.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-blue-200 transition-colors"
                         onClick={() => toast({ title: "Company Details", description: `View ${exp.company} details` })}>
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold cursor-pointer hover:text-blue-600 transition-colors"
                          onClick={() => toast({ title: "Position Details", description: `View ${exp.position} details` })}>
                        {exp.position}
                      </h4>
                      <p className="text-blue-600 font-medium cursor-pointer hover:underline"
                         onClick={() => toast({ title: "Company Profile", description: `View ${exp.company} profile` })}>
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500">{exp.years} • {exp.location}</p>
                      <p className="text-sm mt-2">{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="p-6">
            <div className="space-y-6">
              {profileData.education.map((edu) => (
                <div key={edu.id} className="border-b pb-6 last:border-b-0">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-green-200 transition-colors"
                         onClick={() => toast({ title: "Institution Details", description: `View ${edu.institution} details` })}>
                      <GraduationCap className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold cursor-pointer hover:text-green-600 transition-colors"
                          onClick={() => toast({ title: "Degree Details", description: `View ${edu.degree} in ${edu.field} details` })}>
                        {edu.degree} in {edu.field}
                      </h4>
                      <p className="text-green-600 font-medium cursor-pointer hover:underline"
                         onClick={() => toast({ title: "Institution Profile", description: `View ${edu.institution} profile` })}>
                        {edu.institution}
                      </p>
                      <p className="text-sm text-gray-500">{edu.years}</p>
                      <p className="text-sm mt-2">{edu.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills" className="p-6">
            <div className="space-y-4">
              {profileData.skills.map((skill, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                     onClick={() => toast({ 
                       title: "Skill Details", 
                       description: `${skill.name} - ${skill.level} level with ${skill.endorsements} endorsements` 
                     })}>
                  <div>
                    <h4 className="font-medium hover:text-[#0F7377] transition-colors">{skill.name}</h4>
                    <p className="text-sm text-gray-500">{skill.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{skill.endorsements} endorsements</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground text-sm md:text-base">Manage your professional profile</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs md:text-sm"
          >
            <Eye className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">{showPreview ? "Hide Preview" : "Preview Profile"}</span>
            <span className="sm:hidden">{showPreview ? "Hide" : "Preview"}</span>
          </Button>
        </div>
      </div>

      {showPreview ? (
        <ProfilePreview />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 h-auto">
            <TabsTrigger value="edit" className="text-xs sm:text-sm py-2 px-3">
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </TabsTrigger>
            <TabsTrigger value="experience" className="text-xs sm:text-sm py-2 px-3">
              <span className="hidden sm:inline">Experience</span>
              <span className="sm:hidden">Work</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="text-xs sm:text-sm py-2 px-3">
              <span className="hidden sm:inline">Education</span>
              <span className="sm:hidden">Edu</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="text-xs sm:text-sm py-2 px-3">
              <span className="hidden sm:inline">Skills</span>
              <span className="sm:hidden">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="digital-card" className="text-xs sm:text-sm py-2 px-3">
              <span className="hidden sm:inline">E-Card</span>
              <span className="sm:hidden">Card</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Your personal and professional details</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                      <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                        <AvatarImage src="/abstract-geometric-shapes.png" alt="Profile" />
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2 text-center sm:text-left">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto">
                          <Edit className="mr-2 h-4 w-4" />
                          Change Photo
                        </Button>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          JPG, PNG or GIF. Max size 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Professional Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Senior Software Engineer" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Google" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Singapore" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+65 9123 4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell people about yourself, your experience, and what you're passionate about..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This will appear on your public profile.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input placeholder="linkedin.com/in/username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Twitter</FormLabel>
                            <FormControl>
                              <Input placeholder="@username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Your professional journey and achievements</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 md:space-y-6">
                  {profileData.experience.map((exp) => (
                    <div key={exp.id} className="border rounded-lg p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-semibold">{exp.position}</h3>
                          <p className="text-primary font-medium text-sm md:text-base">{exp.company}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{exp.years} • {exp.location}</p>
                        </div>
                        <Button variant="outline" size="sm" className="self-start">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm mb-3">{exp.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Key Achievements:</p>
                        <ul className="text-sm space-y-1">
                          {exp.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>Your academic background and achievements</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 md:space-y-6">
                  {profileData.education.map((edu) => (
                    <div key={edu.id} className="border rounded-lg p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-base md:text-lg font-semibold">{edu.degree} in {edu.field}</h3>
                          <p className="text-primary font-medium text-sm md:text-base">{edu.institution}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{edu.years}</p>
                        </div>
                        <Button variant="outline" size="sm" className="self-start">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm mb-3">{edu.description}</p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Activities & Achievements:</p>
                        <div className="flex flex-wrap gap-2">
                          {edu.activities.map((activity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Skills & Endorsements</CardTitle>
                    <CardDescription>Showcase your professional skills and expertise</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {profileData.skills.map((skill, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 border rounded-lg gap-3">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                          <h4 className="font-medium text-sm md:text-base">{skill.name}</h4>
                          <Badge variant="outline" className="text-xs w-fit">
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs md:text-sm text-muted-foreground">
                          <span>{skill.endorsements} endorsements</span>
                          <span className="hidden sm:inline">•</span>
                          <span>Top skill</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="self-start sm:self-center">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="digital-card" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Digital Name Card
                    </CardTitle>
                    <CardDescription>Your professional digital identity card</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href="/profile" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Card
                      </a>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* QR Code Section */}
                  <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
                    <div className="bg-white p-3 md:p-4 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                        <QrCode className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400" />
                      </div>
                      <p className="text-xs text-center text-gray-500 mt-2">QR Code</p>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-base md:text-lg font-semibold mb-2">Quick Access</h3>
                      <p className="text-xs md:text-sm text-gray-600 mb-4">
                        Share your digital name card with others by scanning the QR code or sharing the link.
                      </p>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <LinkIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-xs md:text-sm font-mono bg-gray-100 px-2 py-1 rounded break-all">
                            {typeof window !== 'undefined' ? window.location.origin : 'https://growthlab.com'}/profile
                          </span>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs w-full sm:w-auto">
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Digital Card Preview */}
                  <div className="border rounded-lg p-3 md:p-4 bg-gradient-to-br from-gray-50 to-white">
                    <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Card Preview</h3>
                    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-sm sm:max-w-md mx-auto">
                      <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-4">
                        <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                          <AvatarImage src={profileData.avatar} alt={profileData.name} />
                          <AvatarFallback className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white text-sm sm:text-base">
                            {profileData.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left">
                          <h4 className="font-bold text-sm sm:text-lg">{profileData.name}</h4>
                          <p className="text-[#0F7377] font-semibold text-xs sm:text-base">{profileData.title}</p>
                          <p className="text-gray-600 text-xs sm:text-sm">{profileData.company}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#0F7377]" />
                          <span className="truncate">arul@example.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#0F7377]" />
                          <span>+65 9123 4567</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#0F7377]" />
                          <span>{profileData.location}</span>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t">
                        <div className="flex flex-wrap gap-1">
                          {profileData.skills.slice(0, 4).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center">
                    <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90 flex-1 sm:flex-none min-w-[140px]">
                      <Download className="h-4 w-4 mr-2" />
                      Download Card
                    </Button>
                    <Button variant="outline" className="flex-1 sm:flex-none min-w-[140px]">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Card
                    </Button>
                    <Button variant="outline" asChild className="flex-1 sm:flex-none min-w-[140px]">
                      <a href="/profile" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Full Card
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
