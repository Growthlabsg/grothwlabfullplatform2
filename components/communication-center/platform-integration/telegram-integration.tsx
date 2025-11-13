import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Users } from "lucide-react"

export function TelegramIntegration() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Send className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Telegram Integration</CardTitle>
              <CardDescription>Connect and manage your Telegram bot and channels</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-blue-500 font-medium">Connected</span>
            <Switch checked={true} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bot">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bot">Bot</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="bot" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="bot-name">Bot Name</Label>
              <Input id="bot-name" value="GrowthLab Assistant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bot-description">Bot Description</Label>
              <Input id="bot-description" value="Official bot for GrowthLab" />
            </div>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Auto-Reply</h3>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Command Suggestions</h3>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Inline Queries</h3>
                <Switch checked={true} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="channels" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Linked Channels</h3>
                <Button variant="outline" size="sm">
                  Add Channel
                </Button>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Send className="h-3 w-3 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">GrowthLab Announcements</h4>
                      <p className="text-xs text-muted-foreground">@growthlabsg_announcements</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Send className="h-3 w-3 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Startup Resources</h4>
                      <p className="text-xs text-muted-foreground">@growthlabsg_resources</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="groups" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Linked Groups</h3>
                <Button variant="outline" size="sm">
                  Add Group
                </Button>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-3 w-3 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Cohort 12 Discussion</h4>
                      <p className="text-xs text-muted-foreground">Private Group • 28 members</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-3 w-3 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Mentor Network</h4>
                      <p className="text-xs text-muted-foreground">Private Group • 42 members</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="h-3 w-3 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Investor Connect</h4>
                      <p className="text-xs text-muted-foreground">Private Group • 35 members</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="api-token">API Token</Label>
              <div className="flex space-x-2">
                <Input id="api-token" type="password" value="5123456789:ABCDefGhIJKlmnOPQRstUVwxYZ" />
                <Button variant="outline" size="sm">
                  Show
                </Button>
              </div>
              <p className="text-xs text-muted-foreground pt-1">Your Telegram Bot API token from BotFather</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Webhook Updates</h3>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Message Notifications</h3>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Forward to Email</h3>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Analytics</h3>
              <Switch checked={true} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Disconnect</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}
