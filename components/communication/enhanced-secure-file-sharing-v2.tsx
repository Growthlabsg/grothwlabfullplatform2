"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  FileText,
  Upload,
  Download,
  Share2,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Eye,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Activity,
  Calendar as CalendarIcon,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  StarOff,
  Trash,
  Edit,
  Copy,
  Printer,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type SecurityLevel = "standard" | "confidential" | "restricted"

interface SecureFile {
  id: string
  name: string
  type: string
  size: string
  owner: string
  modifiedDate: string
  securityLevel: SecurityLevel
  starred: boolean
  sharedWith: {
    userId: string
    userName: string
    permission: "view" | "edit" | "admin"
    sharedAt: Date
    expirationDate?: Date
  }[]
  accessControls: {
    preventDownload: boolean
    preventPrint: boolean
    preventCopy: boolean
    expirationDate?: Date
    notifyOnAccess: boolean
    watermark: boolean
    requireAuthentication: boolean
  }
  accessLogs: {
    userId: string
    userName: string
    action: "view" | "download" | "share" | "edit"
    timestamp: Date
    ipAddress: string
    deviceInfo: string
  }[]
}

interface FileTrackingSystemProps {
  currentUser: {
    id: string
    name: string
    email: string
  }
}

export function EnhancedSecureFileSharingV2({ currentUser }: FileTrackingSystemProps) {
  const [files, setFiles] = useState<SecureFile[]>([])
  const [selectedFile, setSelectedFile] = useState<SecureFile | null>(null)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [securityFilter, setSecurityFilter] = useState<SecurityLevel | "all">("all")

  useEffect(() => {
    // Mock data
    const mockFiles: SecureFile[] = [
      {
        id: "file1",
        name: "Q3_Financial_Report.pdf",
        type: "pdf",
        size: "2.4 MB",
        owner: currentUser.name,
        modifiedDate: "2024-01-15",
        securityLevel: "confidential",
        starred: true,
        sharedWith: [
          {
            userId: "user1",
            userName: "Sarah Chen",
            permission: "view",
            sharedAt: new Date("2024-01-10"),
            expirationDate: new Date("2024-02-10")
          },
          {
            userId: "user2",
            userName: "David Wong",
            permission: "edit",
            sharedAt: new Date("2024-01-12")
          }
        ],
        accessControls: {
          preventDownload: false,
          preventPrint: true,
          preventCopy: true,
          expirationDate: new Date("2024-12-31"),
          notifyOnAccess: true,
          watermark: true,
          requireAuthentication: true
        },
        accessLogs: [
          {
            userId: "user1",
            userName: "Sarah Chen",
            action: "view",
            timestamp: new Date("2024-01-15T10:30:00"),
            ipAddress: "192.168.1.100",
            deviceInfo: "Chrome on Windows 11"
          },
          {
            userId: "user2",
            userName: "David Wong",
            action: "download",
            timestamp: new Date("2024-01-15T09:15:00"),
            ipAddress: "203.0.113.45",
            deviceInfo: "Safari on iOS 17"
          }
        ]
      },
      {
        id: "file2",
        name: "Product_Roadmap_2024.pptx",
        type: "pptx",
        size: "5.7 MB",
        owner: currentUser.name,
        modifiedDate: "2024-01-12",
        securityLevel: "restricted",
        starred: false,
        sharedWith: [
          {
            userId: "user3",
            userName: "Executive Team",
            permission: "view",
            sharedAt: new Date("2024-01-08"),
            expirationDate: new Date("2024-01-31")
          }
        ],
        accessControls: {
          preventDownload: true,
          preventPrint: true,
          preventCopy: true,
          expirationDate: new Date("2024-01-31"),
          notifyOnAccess: true,
          watermark: true,
          requireAuthentication: true
        },
        accessLogs: [
          {
            userId: "user3",
            userName: "Executive Team",
            action: "view",
            timestamp: new Date("2024-01-15T08:45:00"),
            ipAddress: "10.0.0.50",
            deviceInfo: "Firefox on macOS"
          }
        ]
      },
      {
        id: "file3",
        name: "Team_Photo.jpg",
        type: "jpg",
        size: "1.2 MB",
        owner: currentUser.name,
        modifiedDate: "2024-01-10",
        securityLevel: "standard",
        starred: false,
        sharedWith: [
          {
            userId: "user4",
            userName: "Marketing Team",
            permission: "edit",
            sharedAt: new Date("2024-01-05")
          }
        ],
        accessControls: {
          preventDownload: false,
          preventPrint: false,
          preventCopy: false,
          notifyOnAccess: false,
          watermark: false,
          requireAuthentication: false
        },
        accessLogs: [
          {
            userId: "user4",
            userName: "Marketing Team",
            action: "view",
            timestamp: new Date("2024-01-15T11:00:00"),
            ipAddress: "172.16.0.25",
            deviceInfo: "Chrome on Android"
          }
        ]
      }
    ]

    setFiles(mockFiles)
  }, [currentUser.name])

  const getSecurityIcon = (level: SecurityLevel) => {
    switch (level) {
      case "standard":
        return <ShieldCheck className="h-4 w-4 text-green-500" />
      case "confidential":
        return <Lock className="h-4 w-4 text-amber-500" />
      case "restricted":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
    }
  }

  const getSecurityDescription = (level: SecurityLevel) => {
    switch (level) {
      case "standard":
        return "Basic protection for non-sensitive files"
      case "confidential":
        return "Enhanced protection with comprehensive tracking"
      case "restricted":
        return "Maximum protection with strict access controls"
    }
  }

  const getSecurityFeatures = (level: SecurityLevel) => {
    switch (level) {
      case "standard":
        return [
          "Basic access controls",
          "Recipients can download, share and edit",
          "Basic tracking of file access"
        ]
      case "confidential":
        return [
          "Enhanced access controls",
          "Comprehensive tracking and logging",
          "All file interactions are recorded",
          "Detailed audit trails with user identities"
        ]
      case "restricted":
        return [
          "Maximum security controls",
          "Prevents downloads or actions outside the platform",
          "Watermarking and document protection",
          "Time-limited access with auto-expiration"
        ]
    }
  }

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSecurity = securityFilter === "all" || file.securityLevel === securityFilter
    return matchesSearch && matchesSecurity
  })

  const handleShareFile = (file: SecureFile) => {
    setSelectedFile(file)
    setShareDialogOpen(true)
  }

  const handleViewTracking = (file: SecureFile) => {
    setSelectedFile(file)
    setTrackingDialogOpen(true)
  }

  const handleToggleStar = (fileId: string) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, starred: !file.starred } : file
    ))
  }

  const handleChangeSecurityLevel = (fileId: string, level: SecurityLevel) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, securityLevel: level } : file
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Secure File Sharing</h1>
          <p className="text-muted-foreground">
            Share files with team members and external partners with appropriate security controls
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload File
        </Button>
      </div>

      {/* Security Levels Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-green-600">
              <ShieldCheck className="h-5 w-5 mr-2" />
              Standard
            </CardTitle>
            <CardDescription>{getSecurityDescription("standard")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              {getSecurityFeatures("standard").map((feature, index) => (
                <li key={index} className="flex items-start">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-amber-600">
              <Lock className="h-5 w-5 mr-2" />
              Confidential
            </CardTitle>
            <CardDescription>{getSecurityDescription("confidential")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              {getSecurityFeatures("confidential").map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Lock className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-red-600">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Restricted
            </CardTitle>
            <CardDescription>{getSecurityDescription("restricted")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              {getSecurityFeatures("restricted").map((feature, index) => (
                <li key={index} className="flex items-start">
                  <ShieldAlert className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Files Section */}
      <Tabs defaultValue="files" className="w-full">
        <TabsList>
          <TabsTrigger value="files">Shared Files</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Shared Files</CardTitle>
                  <CardDescription>Manage your shared files and their security settings</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                  <Select value={securityFilter} onValueChange={(value: any) => setSecurityFilter(value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="confidential">Confidential</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Security Level</TableHead>
                    <TableHead>Shared With</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead>Access Controls</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-muted-foreground">{file.size}</div>
                          </div>
                          {file.starred && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getSecurityIcon(file.securityLevel)}
                          <Badge variant="outline" className="capitalize">
                            {file.securityLevel}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">{file.sharedWith.length} users</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">{file.modifiedDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {file.accessControls.preventDownload && <Download className="h-4 w-4 text-red-500" />}
                          {file.accessControls.preventPrint && <Printer className="h-4 w-4 text-red-500" />}
                          {file.accessControls.preventCopy && <Copy className="h-4 w-4 text-red-500" />}
                          {file.accessControls.watermark && <Eye className="h-4 w-4 text-blue-500" />}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShareFile(file)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewTracking(file)}
                          >
                            <Activity className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStar(file.id)}
                          >
                            {file.starred ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Track all file interactions and security changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {files.flatMap(file => 
                  file.accessLogs.map(log => (
                    <div key={log?.timestamp.getTime()} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {log?.action === 'view' && <Eye className="h-4 w-4 text-blue-500" />}
                          {log?.action === 'download' && <Download className="h-4 w-4 text-green-500" />}
                          {log?.action === 'share' && <Share2 className="h-4 w-4 text-purple-500" />}
                          {log?.action === 'edit' && <Edit className="h-4 w-4 text-orange-500" />}
                        </div>
                        <div>
                          <div className="font-medium">{log?.userName}</div>
                          <div className="text-sm text-muted-foreground">
                            {log?.action} • {file.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(log?.timestamp, "MMM dd, HH:mm")}
                      </div>
                    </div>
                  ))
                )}
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
                    <Label>Default Security Level</Label>
                    <p className="text-sm text-muted-foreground">Set the default security level for new files</p>
                  </div>
                  <Select defaultValue="confidential">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="confidential">Confidential</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Notify on Access</Label>
                    <p className="text-sm text-muted-foreground">Get notified when files are accessed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Require Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require users to authenticate before accessing files</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Share "{selectedFile?.name}" with specific users and set permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Security Level</Label>
              <Select 
                value={selectedFile?.securityLevel} 
                onValueChange={(value: SecurityLevel) => selectedFile && handleChangeSecurityLevel(selectedFile.id, value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="confidential">Confidential</SelectItem>
                  <SelectItem value="restricted">Restricted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Access Controls</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="prevent-download" />
                  <Label htmlFor="prevent-download">Prevent Download</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="prevent-print" />
                  <Label htmlFor="prevent-print">Prevent Print</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="prevent-copy" />
                  <Label htmlFor="prevent-copy">Prevent Copy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="watermark" />
                  <Label htmlFor="watermark">Add Watermark</Label>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tracking Dialog */}
      <Dialog open={trackingDialogOpen} onOpenChange={setTrackingDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>File Tracking - {selectedFile?.name}</DialogTitle>
            <DialogDescription>
              Detailed access logs and user interactions
            </DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Security Level</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getSecurityIcon(selectedFile.securityLevel)}
                    <Badge variant="outline" className="capitalize">
                      {selectedFile.securityLevel}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Shared With</Label>
                  <div className="text-sm text-muted-foreground mt-1">
                    {selectedFile.sharedWith.length} users
                  </div>
                </div>
              </div>
              
              <div>
                <Label>Access Logs</Label>
                <div className="mt-2 space-y-2">
                  {selectedFile.accessLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {log?.action === 'view' && <Eye className="h-4 w-4 text-blue-500" />}
                          {log?.action === 'download' && <Download className="h-4 w-4 text-green-500" />}
                          {log?.action === 'share' && <Share2 className="h-4 w-4 text-purple-500" />}
                          {log?.action === 'edit' && <Edit className="h-4 w-4 text-orange-500" />}
                        </div>
                        <div>
                          <div className="font-medium">{log?.userName}</div>
                          <div className="text-sm text-muted-foreground">
                            {log?.action} • {log?.ipAddress} • {log?.deviceInfo}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(log?.timestamp, "MMM dd, HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 