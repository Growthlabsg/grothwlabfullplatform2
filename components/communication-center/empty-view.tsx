import type { Section } from "@/types/communication"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Users,
  Hash,
  Radio,
  MessageCircle,
  Send,
  User,
  Globe,
  Info,
  ExternalLink,
  Video,
  Phone,
  Search,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface EmptyViewProps {
  section: Section | null
}

export function EmptyView({ section }: EmptyViewProps) {
  const renderSectionSpecificContent = () => {
    if (!section) return null

    switch (section.type) {
      case "team":
        return (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Team Collaboration</CardTitle>
                  <CardDescription>Create channels for your team's projects and discussions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Hash className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">project-planning</p>
                      <p className="text-xs text-muted-foreground">12 members</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Hash className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">design-feedback</p>
                      <p className="text-xs text-muted-foreground">8 members</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Hash className="h-4 w-4 mr-2" />
                    Create a channel
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Team Benefits</CardTitle>
                  <CardDescription>Why team channels help your collaboration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Centralize team communications in a structured environment</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Keep discussions organized by topic or project</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Improve team awareness with dedicated spaces</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border">
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Team meeting
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Share files
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage members
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Hash className="h-4 w-4 mr-2" />
                  Browse channels
                </Button>
              </div>
            </div>
          </div>
        )

      case "direct":
        return (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Direct Messages</CardTitle>
                  <CardDescription>Private conversations with team members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <div className="h-8 w-8 rounded-full bg-primary/20 mr-2 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Start a conversation</p>
                      <p className="text-xs text-muted-foreground">Select a team member</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <div className="h-8 w-8 rounded-full bg-primary/20 mr-2 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Call a colleague</p>
                      <p className="text-xs text-muted-foreground">Audio or video calls</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Start a conversation
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Contacts</CardTitle>
                  <CardDescription>People you've recently messaged</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary/10 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Alex Wong</p>
                      <p className="text-xs text-muted-foreground">Last messaged 2h ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary/10 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sarah Chen</p>
                      <p className="text-xs text-muted-foreground">Last messaged yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors">
                    <div className="h-8 w-8 rounded-full bg-primary/10 mr-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mei Lin</p>
                      <p className="text-xs text-muted-foreground">Last messaged 3d ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border">
              <h3 className="font-medium mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Browse contacts
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Start a call
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  Send file
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Update profile
                </Button>
              </div>
            </div>
          </div>
        )

      case "group":
        return (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Group Chats</CardTitle>
                  <CardDescription>Create groups for specific discussions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Product Team</p>
                      <p className="text-xs text-muted-foreground">8 members</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Marketing Group</p>
                      <p className="text-xs text-muted-foreground">5 members</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Create a group
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Group Benefits</CardTitle>
                  <CardDescription>Why group chats enhance collaboration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Create focused discussions for specific projects or topics</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Include only relevant team members in each group</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Streamline communication with fewer notifications</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "community":
        return (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Community</CardTitle>
                  <CardDescription>Connect with like-minded professionals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Startup Founders</p>
                      <p className="text-xs text-muted-foreground">152 members</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">SG Tech Network</p>
                      <p className="text-xs text-muted-foreground">328 members</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Globe className="h-4 w-4 mr-2" />
                    Browse communities
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Community Benefits</CardTitle>
                  <CardDescription>How communities can help your growth</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Connect with industry professionals and experts</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Share knowledge and gain insights from peers</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Discover collaboration opportunities and partnerships</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "broadcast":
        return (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Broadcasts</CardTitle>
                  <CardDescription>Send announcements to multiple recipients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Radio className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Team Announcements</p>
                      <p className="text-xs text-muted-foreground">25 recipients</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-md">
                    <Radio className="h-5 w-5 mr-2 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Company Updates</p>
                      <p className="text-xs text-muted-foreground">48 recipients</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Radio className="h-4 w-4 mr-2" />
                    Create broadcast list
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Broadcast Features</CardTitle>
                  <CardDescription>How broadcasts can help your team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Send one-way announcements to multiple recipients</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Schedule messages for future delivery</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Track who has viewed your broadcasts</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "whatsapp":
        return (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">WhatsApp Integration</CardTitle>
                  <CardDescription>Connect your WhatsApp account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-center p-6">
                    <MessageCircle className="h-16 w-16 text-green-500" />
                  </div>
                  <p className="text-sm text-center">
                    Connect your WhatsApp account to send and receive messages directly from this platform.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Connect WhatsApp
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">WhatsApp Benefits</CardTitle>
                  <CardDescription>How WhatsApp integration helps you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Manage all your business communications in one place</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Respond to WhatsApp messages without switching apps</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Keep a unified history of all your conversations</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "telegram":
        return (
          <div className="max-w-3xl mx-auto w-full px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Telegram Integration</CardTitle>
                  <CardDescription>Connect your Telegram account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-center p-6">
                    <Send className="h-16 w-16 text-blue-500" />
                  </div>
                  <p className="text-sm text-center">
                    Connect your Telegram account to send and receive messages directly from this platform.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Connect Telegram
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Telegram Benefits</CardTitle>
                  <CardDescription>How Telegram integration helps you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Manage all your communications from one interface</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Handle group discussions and channels efficiently</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 mt-0.5">
                      <Info className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <p className="text-sm">Access advanced messaging features in a unified experience</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-auto py-6">
      {section ? (
        renderSectionSpecificContent()
      ) : (
        <div className="max-w-3xl mx-auto w-full px-4">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome to Communication Center</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Connect with your team, clients, and community through multiple channels in one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Direct Messages</CardTitle>
                <CardDescription>Private conversations</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center p-4">
                  <MessageSquare className="h-12 w-12 text-primary/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start chatting
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Team Channels</CardTitle>
                <CardDescription>Team collaboration</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center p-4">
                  <Users className="h-12 w-12 text-primary/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Join channels
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">External Platforms</CardTitle>
                <CardDescription>Connect integrations</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center p-4">
                  <Globe className="h-12 w-12 text-primary/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Globe className="h-4 w-4 mr-2" />
                  Setup integrations
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 border">
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                New message
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                Create group
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Video className="h-4 w-4 mr-2" />
                Start call
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
