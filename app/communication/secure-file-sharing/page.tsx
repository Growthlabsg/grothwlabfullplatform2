import { SecureFileList } from "@/components/communication/secure-file-list"
import { FileTrackingSystem } from "@/components/communication/file-tracking-system"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, ShieldAlert, ShieldCheck, Activity, Users, Clock, Eye, Download, Share2 } from "lucide-react"

export default function SecureFileSharingPage() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Secure File Sharing</h1>
        <p className="text-muted-foreground">
          Share files with team members and external partners with appropriate security controls
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-600">
              <ShieldCheck className="h-5 w-5 mr-2" />
              Standard
            </CardTitle>
            <CardDescription>Basic protection for non-sensitive files</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Basic access controls</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Recipients can download, share and edit</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>Basic tracking of file access</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-amber-600">
              <Lock className="h-5 w-5 mr-2" />
              Confidential
            </CardTitle>
            <CardDescription>Enhanced protection with comprehensive tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <Lock className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                <span>Enhanced access controls</span>
              </li>
              <li className="flex items-start">
                <Lock className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                <span>Comprehensive tracking and logging</span>
              </li>
              <li className="flex items-start">
                <Lock className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                <span>All file interactions are recorded</span>
              </li>
              <li className="flex items-start">
                <Lock className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                <span>Detailed audit trails with user identities</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-600">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Restricted
            </CardTitle>
            <CardDescription>Maximum protection with strict access controls</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                <span>Maximum security controls</span>
              </li>
              <li className="flex items-start">
                <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                <span>Prevents downloads or actions outside the platform</span>
              </li>
              <li className="flex items-start">
                <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                <span>Watermarking and document protection</span>
              </li>
              <li className="flex items-start">
                <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                <span>Time-limited access with auto-expiration</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="files" className="w-full">
        <TabsList>
          <TabsTrigger value="files">Shared Files</TabsTrigger>
          <TabsTrigger value="tracking">File Tracking</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="files" className="pt-4">
          <SecureFileList />
        </TabsContent>
        
        <TabsContent value="tracking" className="pt-4">
          <FileTrackingSystem />
        </TabsContent>
        
        <TabsContent value="activity" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Track all file interactions and security changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Sarah Chen</div>
                      <div className="text-sm text-muted-foreground">
                        view • Q3_Financial_Report.pdf
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jan 15, 10:30
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">David Wong</div>
                      <div className="text-sm text-muted-foreground">
                        download • Product_Roadmap_2024.pptx
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jan 15, 09:15
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <div className="font-medium">John Smith</div>
                      <div className="text-sm text-muted-foreground">
                        share • Team_Photo.jpg
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Jan 15, 08:45
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure default security levels and access controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Default Security Level</h3>
                    <p className="text-sm text-muted-foreground">Set the default security level for new files</p>
                  </div>
                  <select className="border rounded px-3 py-2">
                    <option value="standard">Standard</option>
                    <option value="confidential">Confidential</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notify on Access</h3>
                    <p className="text-sm text-muted-foreground">Get notified when files are accessed</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Require Authentication</h3>
                    <p className="text-sm text-muted-foreground">Require users to authenticate before accessing files</p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Watermark Documents</h3>
                    <p className="text-sm text-muted-foreground">Add watermarks to sensitive documents</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
