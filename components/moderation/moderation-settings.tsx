import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"

export function ModerationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Moderation Settings</CardTitle>
        <CardDescription>Configure how content is moderated on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="automated">
          <TabsList className="mb-4">
            <TabsTrigger value="automated">Automated Moderation</TabsTrigger>
            <TabsTrigger value="community">Community Guidelines</TabsTrigger>
            <TabsTrigger value="team">Moderation Team</TabsTrigger>
          </TabsList>

          <TabsContent value="automated">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">AI Moderation</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-ai">Enable AI moderation</Label>
                    <p className="text-sm text-muted-foreground">Automatically flag potentially problematic content</p>
                  </div>
                  <Switch id="enable-ai" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>AI sensitivity threshold</Label>
                  <Slider defaultValue={[75]} max={100} step={1} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Less strict</span>
                    <span>More strict</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Content Filters</h3>

                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="spam-filter">Spam detection</Label>
                      <p className="text-sm text-muted-foreground">Filter promotional and spam content</p>
                    </div>
                    <Switch id="spam-filter" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="harassment-filter">Harassment detection</Label>
                      <p className="text-sm text-muted-foreground">Filter bullying and harassment</p>
                    </div>
                    <Switch id="harassment-filter" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="inappropriate-filter">Inappropriate content</Label>
                      <p className="text-sm text-muted-foreground">Filter adult and inappropriate content</p>
                    </div>
                    <Switch id="inappropriate-filter" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="misinformation-filter">Misinformation</Label>
                      <p className="text-sm text-muted-foreground">Flag potential misinformation</p>
                    </div>
                    <Switch id="misinformation-filter" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Community Guidelines</h3>
                <div className="space-y-2">
                  <Label htmlFor="guidelines">Guidelines Text</Label>
                  <Textarea
                    id="guidelines"
                    rows={8}
                    defaultValue="GrowthLab is committed to fostering a positive and supportive environment for entrepreneurs and startup founders. We expect all members to:

1. Be respectful and constructive in all interactions
2. Share authentic and truthful information
3. Respect intellectual property and confidentiality
4. Avoid promotional or spammy content
5. Support diversity and inclusion"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Violation Responses</h3>

                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="first-violation">First Violation</Label>
                      <Select defaultValue="warning">
                        <SelectTrigger id="first-violation">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="content-removal">Content Removal</SelectItem>
                          <SelectItem value="temporary-restriction">Temporary Restriction</SelectItem>
                          <SelectItem value="permanent-ban">Permanent Ban</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="second-violation">Second Violation</Label>
                      <Select defaultValue="temporary-restriction">
                        <SelectTrigger id="second-violation">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="content-removal">Content Removal</SelectItem>
                          <SelectItem value="temporary-restriction">Temporary Restriction</SelectItem>
                          <SelectItem value="permanent-ban">Permanent Ban</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="third-violation">Third Violation</Label>
                      <Select defaultValue="permanent-ban">
                        <SelectTrigger id="third-violation">
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="content-removal">Content Removal</SelectItem>
                          <SelectItem value="temporary-restriction">Temporary Restriction</SelectItem>
                          <SelectItem value="permanent-ban">Permanent Ban</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="restriction-duration">Restriction Duration (days)</Label>
                      <Input id="restriction-duration" type="number" defaultValue="7" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Guidelines
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Moderation Team Settings</h3>

                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="require-approval">Require approval for actions</Label>
                      <p className="text-sm text-muted-foreground">
                        Require senior moderator approval for permanent bans
                      </p>
                    </div>
                    <Switch id="require-approval" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notification-email">Email notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email for high-priority moderation items</p>
                    </div>
                    <Switch id="notification-email" defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="moderation-email">Moderation team email</Label>
                    <Input id="moderation-email" type="email" defaultValue="moderation@growthlab.sg" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response-templates">Response Templates</Label>
                    <Select defaultValue="warning">
                      <SelectTrigger id="response-templates">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="warning">Warning Template</SelectItem>
                        <SelectItem value="content-removal">Content Removal Notice</SelectItem>
                        <SelectItem value="account-restriction">Account Restriction Notice</SelectItem>
                        <SelectItem value="appeal-process">Appeal Process Information</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea
                      rows={4}
                      defaultValue="Dear user, we've noticed that your recent content may violate our community guidelines. Please review our guidelines at [link]. Continued violations may result in further action. If you believe this is in error, you can appeal this decision."
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Team Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
