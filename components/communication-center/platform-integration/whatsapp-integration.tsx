import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare } from "lucide-react"

export function WhatsAppIntegration() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>Connect and manage your WhatsApp business account</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-green-500 font-medium">Connected</span>
            <Switch checked={true} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="messages">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="messages" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Sync Messages</h3>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Auto-Reply</h3>
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
            </div>
          </TabsContent>
          <TabsContent value="contacts" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Import Contacts</h3>
                <Button variant="outline" size="sm">
                  Import
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Sync Contacts</h3>
                <Switch checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Contact Groups</h3>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="templates" className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Message Templates</h3>
                <Button variant="outline" size="sm">
                  Create New
                </Button>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Welcome Message</h4>
                    <p className="text-xs text-muted-foreground">Approved</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Order Confirmation</h4>
                    <p className="text-xs text-muted-foreground">Approved</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Appointment Reminder</h4>
                    <p className="text-xs text-muted-foreground">Pending Review</p>
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
              <Label htmlFor="business-name">Business Name</Label>
              <Input id="business-name" value="GrowthLab" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-description">Business Description</Label>
              <Input id="business-description" value="Startup accelerator and innovation hub" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input id="phone-number" value="+65 9123 4567" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Business Hours</h3>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Away Message</h3>
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
