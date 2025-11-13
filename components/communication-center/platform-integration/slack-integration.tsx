import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hash, Bot, Webhook } from "lucide-react"

export function SlackIntegration() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center">
              <Hash className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Slack Integration</CardTitle>
              <CardDescription>Connect and manage your Slack workspace</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-purple-500 font-medium">Connected</span>
            <Switch checked={true} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="channels">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="channels" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Synced Channels</h3>
              <Button variant="outline" size="sm">
                Add Channel
              </Button>
            </div>
            <div className="border rounded-md p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <Hash className="h-3 w-3 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">general</h4>
                    <p className="text-xs text-muted-foreground">General discussions</p>
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
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <Hash className="h-3 w-3 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">announcements</h4>
                    <p className="text-xs text-muted-foreground">Important announcements</p>
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
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <Hash className="h-3 w-3 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">cohort-12</h4>
                    <p className="text-xs text-muted-foreground">Cohort 12 discussions</p>
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
                  <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <Hash className="h-3 w-3 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">mentors</h4>
                    <p className="text-xs text-muted-foreground">Mentor discussions</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="apps" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Installed Apps</h3>
                <Button variant="outline" size="sm">
                  Add App
                </Button>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">GrowthLab Assistant</h4>
                      <p className="text-xs text-muted-foreground">Custom bot for GrowthLab</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Google Calendar</h4>
                      <p className="text-xs text-muted-foreground">Calendar integration</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <Bot className="h-3 w-3 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Trello</h4>
                      <p className="text-xs text-muted-foreground">Project management</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="webhooks" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Incoming Webhooks</h3>
                <Button variant="outline" size="sm">
                  Add Webhook
                </Button>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <Webhook className="h-3 w-3 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">GitHub Notifications</h4>
                      <p className="text-xs text-muted-foreground">Posts to #dev-updates</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <Webhook className="h-3 w-3 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Application Alerts</h4>
                      <p className="text-xs text-muted-foreground">Posts to #alerts</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input id="workspace-name" value="GrowthLab" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workspace-url">Workspace URL</Label>
              <Input id="workspace-url" value="growthlabsg.slack.com" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Sync Messages</h3>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Sync Users</h3>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Sync Files</h3>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Message Notifications</h3>
              <Switch checked={true} />
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
