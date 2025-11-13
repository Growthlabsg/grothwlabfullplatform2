"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Building2, 
  Edit, 
  Save, 
  Eye, 
  RefreshCw, 
  Plus,
  Trash2,
  Copy,
  Globe,
  Settings,
  Users,
  Shield,
  Target,
  Award,
  Heart,
  MessageCircle,
  Share2,
  Flag,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  BarChart3,
  Calendar,
  Percent,
  Star,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Globe as GlobeIcon
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CompanyInfo {
  name: string
  tagline: string
  description: string
  founded: string
  headquarters: string
  industry: string
  website: string
  email: string
  phone: string
  linkedin: string
  twitter: string
  mission: string
  vision: string
  values: string[]
  achievements: Achievement[]
  isActive: boolean
}

interface Achievement {
  id: string
  title: string
  description: string
  year: string
  category: "award" | "milestone" | "recognition"
  icon: string
}

interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  bio: string
  avatar: string
  email: string
  linkedin: string
  twitter: string
  isActive: boolean
  joinDate: string
  expertise: string[]
}

interface AboutPage {
  id: string
  title: string
  slug: string
  content: string
  metaDescription: string
  status: "draft" | "published" | "archived"
  lastModified: string
  author: string
}

export function AboutSectionManagement() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("company")
  const [isEditing, setIsEditing] = useState(false)

  // Company info state
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: "GrowthLab",
    tagline: "The Premier Startup Accelerator of Asia",
    description: "Accelerating the next generation of startups in Southeast Asia through innovative programs, mentorship, and funding opportunities.",
    founded: "2020",
    headquarters: "Singapore",
    industry: "Startup Acceleration",
    website: "https://growthlab.sg",
    email: "hello@growthlab.sg",
    phone: "+65 6789 0123",
    linkedin: "https://linkedin.com/company/growthlab",
    twitter: "https://twitter.com/growthlab_sg",
    mission: "To empower entrepreneurs and accelerate the growth of innovative startups across Asia.",
    vision: "To become the leading startup ecosystem in Asia, fostering innovation and economic growth.",
    values: ["Innovation", "Excellence", "Collaboration", "Integrity", "Impact"],
    achievements: [
      {
        id: "1",
        title: "Best Accelerator 2023",
        description: "Recognized as the top startup accelerator in Southeast Asia",
        year: "2023",
        category: "award",
        icon: "🏆"
      },
      {
        id: "2",
        title: "100+ Startups Accelerated",
        description: "Successfully accelerated over 100 startups across various industries",
        year: "2023",
        category: "milestone",
        icon: "🚀"
      }
    ],
    isActive: true
  })

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Chen",
      position: "CEO & Founder",
      department: "Leadership",
      bio: "Serial entrepreneur with 15+ years of experience in startup acceleration and venture capital.",
      avatar: "/team/sarah-chen.jpg",
      email: "sarah@growthlab.sg",
      linkedin: "https://linkedin.com/in/sarah-chen",
      twitter: "https://twitter.com/sarahchen",
      isActive: true,
      joinDate: "2020-01-01",
      expertise: ["Startup Strategy", "Venture Capital", "Leadership"]
    },
    {
      id: "2",
      name: "Alex Wong",
      position: "Head of Programs",
      department: "Operations",
      bio: "Expert in startup program development and mentor network management.",
      avatar: "/team/alex-wong.jpg",
      email: "alex@growthlab.sg",
      linkedin: "https://linkedin.com/in/alex-wong",
      twitter: "https://twitter.com/alexwong",
      isActive: true,
      joinDate: "2020-03-01",
      expertise: ["Program Development", "Mentor Management", "Operations"]
    }
  ])

  // About pages state
  const [aboutPages, setAboutPages] = useState<AboutPage[]>([
    {
      id: "1",
      title: "About GrowthLab",
      slug: "about",
      content: "Learn about our mission, vision, and the team behind GrowthLab.",
      metaDescription: "Discover GrowthLab, the premier startup accelerator in Asia, and learn about our mission to empower entrepreneurs.",
      status: "published",
      lastModified: "2024-01-20T00:00:00Z",
      author: "Sarah Chen"
    },
    {
      id: "2",
      title: "Our Team",
      slug: "team",
      content: "Meet the passionate team driving innovation and growth at GrowthLab.",
      metaDescription: "Meet the GrowthLab team of experts, mentors, and professionals dedicated to startup success.",
      status: "published",
      lastModified: "2024-01-20T00:00:00Z",
      author: "Alex Wong"
    }
  ])

  const handleSave = (section: string) => {
    toast({
      title: "Changes Saved",
      description: `${section} has been updated successfully.`,
    })
    setIsEditing(false)
  }

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "All About section changes have been published.",
    })
  }

  const handleRevert = () => {
    toast({
      title: "Reverted",
      description: "All changes have been reverted to the last published version.",
    })
    setIsEditing(false)
  }

  const addNewTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "New Team Member",
      position: "Position",
      department: "Department",
      bio: "Team member bio",
      avatar: "/team/default-avatar.jpg",
      email: "new@growthlab.sg",
      linkedin: "",
      twitter: "",
      isActive: true,
      joinDate: new Date().toISOString().split('T')[0],
      expertise: []
    }
    setTeamMembers([...teamMembers, newMember])
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id))
  }

  const addNewAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: "New Achievement",
      description: "Achievement description",
      year: new Date().getFullYear().toString(),
      category: "milestone",
      icon: "🎯"
    }
    setCompanyInfo({
      ...companyInfo,
      achievements: [...companyInfo.achievements, newAchievement]
    })
  }

  const removeAchievement = (id: string) => {
    setCompanyInfo({
      ...companyInfo,
      achievements: companyInfo.achievements.filter(a => a.id !== id)
    })
  }

  const addNewAboutPage = () => {
    const newPage: AboutPage = {
      id: Date.now().toString(),
      title: "New Page",
      slug: "new-page",
      content: "Page content",
      metaDescription: "Page description",
      status: "draft",
      lastModified: new Date().toISOString(),
      author: "Admin"
    }
    setAboutPages([...aboutPages, newPage])
  }

  const removeAboutPage = (id: string) => {
    setAboutPages(aboutPages.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="w-6 h-6" />
            About Section Management
          </h2>
          <p className="text-muted-foreground">
            Control all aspects of the about section including company information, team, and content pages
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleRevert}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Revert
          </Button>
          <Button onClick={handlePublish}>
            <Globe className="w-4 h-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* About Section Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company Info</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyInfo.isActive ? "Active" : "Inactive"}</div>
            <p className="text-xs text-muted-foreground">
              Company profile status
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">
              {teamMembers.filter(m => m.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyInfo.achievements.length}</div>
            <p className="text-xs text-muted-foreground">
              Company milestones
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">About Pages</CardTitle>
            <GlobeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aboutPages.length}</div>
            <p className="text-xs text-muted-foreground">
              {aboutPages.filter(p => p.status === "published").length} published
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="company">Company Info</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        {/* Company Info Tab */}
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Company Information</CardTitle>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </div>
              <CardDescription>Manage company details, mission, vision, and values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Basic Information</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input
                        id="company-name"
                        value={companyInfo.name}
                        onChange={(e) => setCompanyInfo({
                          ...companyInfo,
                          name: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="tagline">Tagline</Label>
                      <Input
                        id="tagline"
                        value={companyInfo.tagline}
                        onChange={(e) => setCompanyInfo({
                          ...companyInfo,
                          tagline: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="founded">Founded</Label>
                      <Input
                        id="founded"
                        value={companyInfo.founded}
                        onChange={(e) => setCompanyInfo({
                          ...companyInfo,
                          founded: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="headquarters">Headquarters</Label>
                      <Input
                        id="headquarters"
                        value={companyInfo.headquarters}
                        onChange={(e) => setCompanyInfo({
                          ...companyInfo,
                          headquarters: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={companyInfo.website}
                        onChange={(e) => setCompanyInfo({
                          ...companyInfo,
                          website: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={companyInfo.email}
                        onChange={(e) => setCompanyInfo({
                          ...companyInfo,
                          email: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={companyInfo.phone}
                        onChange={(e) => setCompanyInfo({
                          ...companyInfo,
                          phone: e.target.value
                        })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Mission & Vision</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="mission">Mission Statement</Label>
                    <Textarea
                      id="mission"
                      value={companyInfo.mission}
                      onChange={(e) => setCompanyInfo({
                        ...companyInfo,
                        mission: e.target.value
                      })}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="vision">Vision Statement</Label>
                    <Textarea
                      id="vision"
                      value={companyInfo.vision}
                      onChange={(e) => setCompanyInfo({
                        ...companyInfo,
                        vision: e.target.value
                      })}
                      disabled={!isEditing}
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Company Values</h4>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={() => {
                      setCompanyInfo({
                        ...companyInfo,
                        values: [...companyInfo.values, "New Value"]
                      })
                    }}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Value
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {companyInfo.values.map((value, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={value}
                        onChange={(e) => {
                          const newValues = [...companyInfo.values]
                          newValues[index] = e.target.value
                          setCompanyInfo({
                            ...companyInfo,
                            values: newValues
                          })
                        }}
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newValues = companyInfo.values.filter((_, i) => i !== index)
                            setCompanyInfo({
                              ...companyInfo,
                              values: newValues
                            })
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Achievements & Milestones</h4>
                  {isEditing && (
                    <Button variant="outline" size="sm" onClick={addNewAchievement}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                  )}
                </div>
                <div className="space-y-3">
                  {companyInfo.achievements.map((achievement, index) => (
                    <div key={achievement.id} className="p-3 border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Icon</Label>
                          <Input
                            value={achievement.icon}
                            onChange={(e) => {
                              const newAchievements = [...companyInfo.achievements]
                              (newAchievements[index] ? newAchievements[index].icon : undefined) = e.target.value
                              setCompanyInfo({
                                ...companyInfo,
                                achievements: newAchievements
                              })
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Title</Label>
                          <Input
                            value={achievement.title}
                            onChange={(e) => {
                              const newAchievements = [...companyInfo.achievements]
                              (newAchievements[index] ? newAchievements[index].title : undefined) = e.target.value
                              setCompanyInfo({
                                ...companyInfo,
                                achievements: newAchievements
                              })
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Year</Label>
                          <Input
                            value={achievement.year}
                            onChange={(e) => {
                              const newAchievements = [...companyInfo.achievements]
                              (newAchievements[index] ? newAchievements[index].year : undefined) = e.target.value
                              setCompanyInfo({
                                ...companyInfo,
                                achievements: newAchievements
                              })
                            }}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Category</Label>
                          <Select
                            value={achievement.category}
                            onValueChange={(value: "award" | "milestone" | "recognition") => {
                              const newAchievements = [...companyInfo.achievements]
                              (newAchievements[index] ? newAchievements[index].category : undefined) = value
                              setCompanyInfo({
                                ...companyInfo,
                                achievements: newAchievements
                              })
                            }}
                            disabled={!isEditing}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="award">Award</SelectItem>
                              <SelectItem value="milestone">Milestone</SelectItem>
                              <SelectItem value="recognition">Recognition</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-3 space-y-1">
                        <Label className="text-xs">Description</Label>
                        <Textarea
                          value={achievement.description}
                          onChange={(e) => {
                            const newAchievements = [...companyInfo.achievements]
                            (newAchievements[index] ? newAchievements[index].description : undefined) = e.target.value
                            setCompanyInfo({
                              ...companyInfo,
                              achievements: newAchievements
                            })
                          }}
                          disabled={!isEditing}
                          rows={2}
                        />
                      </div>
                      {isEditing && (
                        <div className="mt-3 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeAchievement(achievement.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Company Information")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Team Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewTeamMember}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage team members, positions, and profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={member.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                          ) : (
                            <Users className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.isActive ? "default" : "secondary"}>
                          {member.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {isEditing && (
                          <Button variant="outline" size="sm" onClick={() => removeTeamMember(member.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Department</Label>
                        <Input
                          value={member.department}
                          onChange={(e) => {
                            const newMembers = [...teamMembers]
                            (newMembers[index] ? newMembers[index].department : undefined) = e.target.value
                            setTeamMembers(newMembers)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Join Date</Label>
                        <Input
                          type="date"
                          value={member.joinDate}
                          onChange={(e) => {
                            const newMembers = [...teamMembers]
                            (newMembers[index] ? newMembers[index].joinDate : undefined) = e.target.value
                            setTeamMembers(newMembers)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 mb-3">
                      <Label className="text-xs">Bio</Label>
                      <Textarea
                        value={member.bio}
                        onChange={(e) => {
                          const newMembers = [...teamMembers]
                          (newMembers[index] ? newMembers[index].bio : undefined) = e.target.value
                          setTeamMembers(newMembers)
                        }}
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Email</Label>
                        <Input
                          value={member.email}
                          onChange={(e) => {
                            const newMembers = [...teamMembers]
                            (newMembers[index] ? newMembers[index].email : undefined) = e.target.value
                            setTeamMembers(newMembers)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">LinkedIn</Label>
                        <Input
                          value={member.linkedin}
                          onChange={(e) => {
                            const newMembers = [...teamMembers]
                            (newMembers[index] ? newMembers[index].linkedin : undefined) = e.target.value
                            setTeamMembers(newMembers)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Twitter</Label>
                        <Input
                          value={member.twitter}
                          onChange={(e) => {
                            const newMembers = [...teamMembers]
                            (newMembers[index] ? newMembers[index].twitter : undefined) = e.target.value
                            setTeamMembers(newMembers)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Expertise</Label>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="flex items-center gap-1">
                            {skill}
                            {isEditing && (
                              <button
                                onClick={() => {
                                  const newMembers = [...teamMembers]
                                  (newMembers[index] ? newMembers[index].expertise : undefined) = (newMembers[index] ? newMembers[index].expertise : undefined).filter((_, i) => i !== skillIndex)
                                  setTeamMembers(newMembers)
                                }}
                                className="ml-1 hover:text-red-500"
                              >
                                <XCircle className="w-3 h-3" />
                              </button>
                            )}
                          </Badge>
                        ))}
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newMembers = [...teamMembers]
                              (newMembers[index] ? newMembers[index].expertise : undefined) = [...(newMembers[index] ? newMembers[index].expertise : undefined), "New Skill"]
                              setTeamMembers(newMembers)
                            }}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Team")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>About Pages</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewAboutPage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Page
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage about section pages and content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aboutPages.map((page, index) => (
                  <div key={page.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={page.status === "published" ? "default" : "secondary"}>
                          {page.status}
                        </Badge>
                        <div>
                          <h4 className="font-medium">{page.title}</h4>
                          <p className="text-sm text-muted-foreground">/{page.slug}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {new Date(page.lastModified).toLocaleDateString()}
                        </span>
                        {isEditing && (
                          <Button variant="outline" size="sm" onClick={() => removeAboutPage(page.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Title</Label>
                        <Input
                          value={page.title}
                          onChange={(e) => {
                            const newPages = [...aboutPages]
                            (newPages[index] ? newPages[index].title : undefined) = e.target.value
                            setAboutPages(newPages)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Slug</Label>
                        <Input
                          value={page.slug}
                          onChange={(e) => {
                            const newPages = [...aboutPages]
                            (newPages[index] ? newPages[index].slug : undefined) = e.target.value
                            setAboutPages(newPages)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="space-y-1 mb-3">
                      <Label className="text-xs">Meta Description</Label>
                      <Input
                        value={page.metaDescription}
                        onChange={(e) => {
                          const newPages = [...aboutPages]
                          (newPages[index] ? newPages[index].metaDescription : undefined) = e.target.value
                          setAboutPages(newPages)
                        }}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs">Content</Label>
                      <Textarea
                        value={page.content}
                        onChange={(e) => {
                          const newPages = [...aboutPages]
                          (newPages[index] ? newPages[index].content : undefined) = e.target.value
                          setAboutPages(newPages)
                        }}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    {isEditing && (
                      <div className="mt-3">
                        <Label className="text-xs">Status</Label>
                        <Select
                          value={page.status}
                          onValueChange={(value: "draft" | "published" | "archived") => {
                            const newPages = [...aboutPages]
                            (newPages[index] ? newPages[index].status : undefined) = value
                            setAboutPages(newPages)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Pages")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Preview and manage about section content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Company Overview</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {companyInfo.name}</p>
                    <p><strong>Tagline:</strong> {companyInfo.tagline}</p>
                    <p><strong>Founded:</strong> {companyInfo.founded}</p>
                    <p><strong>Headquarters:</strong> {companyInfo.headquarters}</p>
                    <p><strong>Mission:</strong> {companyInfo.mission}</p>
                    <p><strong>Vision:</strong> {companyInfo.vision}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Team Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teamMembers.filter(m => m.isActive).map(member => (
                      <div key={member.id} className="flex items-center gap-3 p-3 border rounded">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Published Pages</h4>
                  <div className="space-y-2">
                    {aboutPages.filter(p => p.status === "published").map(page => (
                      <div key={page.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">{page.title}</p>
                          <p className="text-sm text-muted-foreground">/{page.slug}</p>
                        </div>
                        <Badge variant="outline">Published</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
