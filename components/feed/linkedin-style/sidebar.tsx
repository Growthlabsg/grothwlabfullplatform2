"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark, Users, Award, TrendingUp, Calendar, Building2, Check, Plus, Eye, Clock, Star, Target, Activity, Globe, Zap } from "lucide-react"
import { 
  mockPeopleYouMayKnow, 
  mockSkillsToEndorse, 
  mockQuickStats, 
  mockEvents, 
  mockGroups,
  mockPostAnalytics,
  mockContentRecommendations,
  mockNetworkingSuggestions,
  type LinkedInPerson,
  type LinkedInSkill
} from "@/lib/mock-linkedin-data"
import { toast } from "sonner"

export function FeedSidebar() {
  const [people, setPeople] = useState<LinkedInPerson[]>(mockPeopleYouMayKnow)
  const [skills, setSkills] = useState<LinkedInSkill[]>(mockSkillsToEndorse)
  const [stats, setStats] = useState(mockQuickStats)
  const [analytics, setAnalytics] = useState(mockPostAnalytics)
  const [showAllPeople, setShowAllPeople] = useState(false)
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [showAllRecommendations, setShowAllRecommendations] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)

  const handleConnect = (personId: string) => {
    setPeople(prev => prev.filter(p => p.id !== personId))
    toast.success("Connection request sent!")
  }

  const handleEndorse = (skillId: string) => {
    setSkills(prev => prev.map(s => 
      s.id === skillId ? { ...s, endorsed: true, lastEndorsed: new Date().toISOString() } : s
    ))
    toast.success("Skill endorsed!")
  }

  const handleViewProfile = (personId: string) => {
    setSelectedPerson(selectedPerson === personId ? null : personId)
    toast.info(`Viewing ${people.find(p => p.id === personId)?.name}'s profile`)
  }

  const handleJoinEvent = (eventId: string) => {
    toast.success("Joined event successfully!")
  }

  const handleJoinGroup = (groupId: string) => {
    toast.success("Joined group successfully!")
  }

  const handleFollowRecommendation = (recommendationId: string) => {
    toast.success("Content recommendation followed!")
  }

  const getOnlineStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500"
      case "away": return "bg-yellow-500"
      case "offline": return "bg-gray-400"
      default: return "bg-gray-400"
    }
  }

  const getConnectionStrengthColor = (strength: number) => {
    if (strength >= 4) return "text-green-600"
    if (strength >= 3) return "text-blue-600"
    if (strength >= 2) return "text-yellow-600"
    return "text-gray-500"
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "expert": return "text-red-600"
      case "intermediate": return "text-blue-600"
      case "beginner": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  const displayedPeople = showAllPeople ? people : people.slice(0, 3)
  const displayedSkills = showAllSkills ? skills : skills.slice(0, 2)
  const displayedRecommendations = showAllRecommendations ? mockContentRecommendations : mockContentRecommendations.slice(0, 2)

  return (
    <div className="space-y-4 max-w-full overflow-hidden">
      {/* Profile Card */}
      <Card>
        <div className="relative h-24 w-full bg-gradient-to-r from-primary/30 to-primary/10 rounded-t-lg">
          <div className="absolute -bottom-10 left-4">
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <CardContent className="pt-12 pb-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-sm text-muted-foreground">Founder & CEO at StartupName</p>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">Profile views</span>
                <span className="font-medium text-primary">{stats.profileViews}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">Post impressions</span>
                <span className="font-medium text-primary">{stats.postImpressions}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">Search appearances</span>
                <span className="font-medium text-primary">{stats.searchAppearances}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-muted-foreground">Connections</span>
                <span className="font-medium text-primary">{stats.connections}</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                <Bookmark className="h-4 w-4 inline-block mr-2" />
                <span>My items</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced LinkedIn-style Quick Stats */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Total Posts</span>
              <span className="font-semibold text-blue-600">{stats.totalPosts}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Total Likes</span>
              <span className="font-semibold text-green-600">{stats.totalLikes}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Total Comments</span>
              <span className="font-semibold text-purple-600">{stats.totalComments}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Verified Users</span>
              <span className="font-semibold text-orange-600">{stats.verifiedUsers}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Weekly Growth</span>
              <span className="font-semibold text-green-600">+{stats.weeklyGrowth}%</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Engagement Rate</span>
              <span className="font-semibold text-blue-600">{stats.engagementRate}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced LinkedIn-style People You May Know */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            People you may know
          </h3>
          <div className="space-y-3">
            {displayedPeople.map((person) => (
              <div key={person.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getOnlineStatusColor(person.onlineStatus)}`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                      {person.verified && <Check className="h-3 w-3 text-blue-600 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate mb-1">{person.role} at {person.company}</p>
                    <p className="text-xs text-blue-600 mb-2">{person.mutualConnections} mutual connections</p>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs flex items-center gap-1 ${getConnectionStrengthColor(person.connectionStrength)}`}>
                        <Target className="h-3 w-3" />
                        {person.connectionStrength}/5 strength
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {person.lastActive}
                      </span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {person.skills.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    {selectedPerson === person.id && (
                      <div className="mt-2 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                        <p className="text-xs text-blue-800 font-medium mb-1">Shared Interests:</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {person.sharedInterests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-blue-100 text-blue-800">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-blue-700 flex items-center gap-1">
                          <Activity className="h-3 w-3" />
                          {person.recentActivity}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0 ml-auto">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs h-7 px-2 whitespace-nowrap min-w-[60px]"
                      onClick={() => handleConnect(person.id)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Connect
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-xs h-7 px-2 whitespace-nowrap min-w-[60px]"
                      onClick={() => handleViewProfile(person.id)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      {selectedPerson === person.id ? "Hide" : "View"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {people.length > 3 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => setShowAllPeople(!showAllPeople)}
            >
              {showAllPeople ? "Show Less" : `Show ${people.length - 3} More`}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Enhanced LinkedIn-style Skills to Endorse */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="h-4 w-4 text-orange-600" />
            Skills you can endorse
          </h3>
          <div className="space-y-3">
            {displayedSkills.map((skill) => (
              <div key={skill.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-1">{skill.personName}</p>
                    <p className="text-xs text-muted-foreground mb-2">{skill.skill}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-xs text-blue-600">{skill.mutualConnections} mutual connections</p>
                      <Badge variant="outline" className={`text-xs ${getSkillLevelColor(skill.skillLevel)}`}>
                        {skill.skillLevel}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {skill.endorsementCount} endorsements
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {skill.category}
                      </span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={skill.endorsed ? "default" : "outline"}
                    className={`text-xs h-7 px-2 flex-shrink-0 whitespace-nowrap min-w-[70px] ${skill.endorsed ? 'bg-green-600 hover:bg-green-700' : ''}`}
                    onClick={() => handleEndorse(skill.id)}
                    disabled={skill.endorsed}
                  >
                    {skill.endorsed ? <Check className="h-3 w-3 mr-1" /> : <Plus className="h-3 w-3 mr-1" />}
                    {skill.endorsed ? "Endorsed" : "Endorse"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {skills.length > 2 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => setShowAllSkills(!showAllSkills)}
            >
              {showAllSkills ? "Show Less" : `Show ${skills.length - 2} More`}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Content Recommendations */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-600" />
            Recommended for you
          </h3>
          <div className="space-y-3">
            {displayedRecommendations.map((rec) => (
              <div key={rec.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {rec.type === "article" && <Globe className="h-4 w-4 text-blue-600" />}
                    {rec.type === "video" && <Eye className="h-4 w-4 text-red-600" />}
                    {rec.type === "podcast" && <Activity className="h-4 w-4 text-purple-600" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground">{rec.author}</p>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-blue-600">
                        {rec.type === "article" ? rec.readTime : rec.duration}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {rec.category}
                      </Badge>
                      <span className="text-xs text-green-600">{rec.relevance}% match</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{rec.reason}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs h-6 px-2 w-full min-w-0"
                  onClick={() => handleFollowRecommendation(rec.id)}
                >
                  Follow
                </Button>
              </div>
            ))}
          </div>
          {mockContentRecommendations.length > 2 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-3"
              onClick={() => setShowAllRecommendations(!showAllRecommendations)}
            >
              {showAllRecommendations ? "Show Less" : `Show ${mockContentRecommendations.length - 2} More`}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Recent Events */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            Upcoming Events
          </h3>
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary rounded-md p-2 flex flex-col items-center justify-center min-w-[48px]">
                  <span className="text-xs font-medium">{event.date === "Tomorrow" ? "TOM" : event.date.split(' ')[0].toUpperCase()}</span>
                  <span className="text-lg font-bold">{event.date === "Tomorrow" ? "24" : event.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground">{event.time} • {event.location}</p>
                  <p className="text-xs text-blue-600">{event.attendees} attending</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs bg-secondary/10 text-secondary-foreground">
                      {event.category}
                    </Badge>
                    {event.featured && (
                      <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800">
                        Featured
                      </Badge>
                    )}
                    {event.virtual && (
                      <Badge variant="outline" className="text-xs bg-purple-100 text-purple-800">
                        Virtual
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {event.organizer}
                    </span>
                    <span className="text-xs text-gray-600 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {event.price}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-xs h-6 px-2 min-w-[50px]"
                    onClick={() => handleJoinEvent(event.id)}
                  >
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            View all events
          </Button>
        </CardContent>
      </Card>

      {/* Enhanced Groups */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              Groups
            </h3>
            <Button variant="ghost" size="sm" className="h-8 px-2">
              <Users className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {mockGroups.map((group) => (
              <div key={group.id} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={group.avatar} alt={group.name} />
                  <AvatarFallback>{group.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{group.name}</h4>
                  <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                                      <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-blue-600 flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {group.activeMembers} active
                      </span>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {group.privacy}
                      </span>
                    </div>
                  <p className="text-xs text-gray-600 mt-1">{group.recentActivity}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-6 px-2 min-w-[50px] flex-shrink-0"
                  onClick={() => handleJoinGroup(group.id)}
                >
                  Join
                </Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="w-full mt-2">
            See all groups
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export const LinkedInStyleSidebar = FeedSidebar

export const Sidebar = FeedSidebar
