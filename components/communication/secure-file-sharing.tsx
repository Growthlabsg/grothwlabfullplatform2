"use client"

import { useState, useEffect } from "react"
import {
  FileIcon,
  FolderIcon,
  Search,
  Upload,
  Filter,
  Download,
  Share2,
  Star,
  StarOff,
  MoreVertical,
  Lock,
  ShieldAlert,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Plus,
  ArrowLeft,
  Clock,
  FileText,
  AlertTriangle,
  Info,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define types for our services
type SecurityLevel = "standard" | "confidential" | "restricted"

interface FileAccessLog {
  id: string
  fileId: string
  fileName: string
  userId: string
  userName: string
  accessType: string
  timestamp: Date
  ipAddress: string
  deviceInfo: string
}

// Mock encryption service
const encryptionService = {
  initialize: async (userId: string) => {
    console.log(`Initializing encryption for user ${userId}`)
    // In a real app, this would generate or retrieve encryption keys
    return Promise.resolve()
  },
  encryptFile: async (file: File) => {
    console.log(`Encrypting file ${file.name}`)
    // In a real app, this would encrypt the file
    return {
      encryptedFile: file,
      metadata: {
        encryptionVersion: "1.0",
        encryptedAt: new Date(),
        keyId: "mock-key-id",
      },
    }
  },
  decryptFile: async (encryptedFile: Blob, metadata: any) => {
    console.log(`Decrypting file with metadata`, metadata)
    // In a real app, this would decrypt the file
    return encryptedFile
  },
}

// Mock file tracking service
const fileTrackingService = {
  currentUser: { id: "", name: "", email: "" },
  setCurrentUser: (user: { id: string; name: string; email: string }) => {
    fileTrackingService.currentUser = user
  },
  createFileMetadata: (file: File, securityLevel: SecurityLevel, path: string[], encryptionMetadata: any) => {
    console.log(`Creating metadata for file ${file.name} with security level ${securityLevel}`)
    // In a real app, this would store the metadata in a database
    return {
      id: `file-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      securityLevel,
      path,
      encryptionMetadata,
      createdAt: new Date(),
      createdBy: fileTrackingService.currentUser.id,
    }
  },
  logFileAccess: (fileId: string, fileName: string, accessType: string) => {
    const log = {
      id: `log-${Date.now()}`,
      fileId,
      fileName,
      userId: fileTrackingService.currentUser.id,
      userName: fileTrackingService.currentUser.name,
      accessType,
      timestamp: new Date(),
      ipAddress: "127.0.0.1", // In a real app, this would be the actual IP
      deviceInfo: navigator.userAgent,
    }
    console.log(`Logging file access:`, log)
    // In a real app, this would store the log in a database
    return log
  },
  getFileAccessLogs: (fileId: string) => {
    // In a real app, this would retrieve logs from a database
    return [
      {
        id: "log-1",
        fileId,
        fileName: "Example File",
        userId: "user-123",
        userName: "John Doe",
        accessType: "view",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        ipAddress: "127.0.0.1",
        deviceInfo: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      {
        id: "log-2",
        fileId,
        fileName: "Example File",
        userId: "user-456",
        userName: "Jane Smith",
        accessType: "download",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        ipAddress: "192.168.1.1",
        deviceInfo: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      },
    ]
  },
  changeSecurityLevel: (fileId: string, level: SecurityLevel) => {
    console.log(`Changing security level of file ${fileId} to ${level}`)
    // In a real app, this would update the file metadata in a database
  },
  shareFile: (fileId: string, userId: string, userName: string, permission: "view" | "edit" | "admin") => {
    console.log(`Sharing file ${fileId} with user ${userName} (${permission} permission)`)
    // In a real app, this would update the file sharing settings in a database
  },
}

interface SecureFileSharingProps {
  securityLevels?: SecurityLevel[]
  currentUser: {
    id: string
    name: string
    email: string
  }
}

interface SecureFile {
  id: string
  name: string
  type: string
  size: string
  owner: string
  modifiedDate: string
  securityLevel: SecurityLevel
  starred: boolean
  path: string[]
  sharedWith: {
    userId: string
    userName: string
    permission: "view" | "edit" | "admin"
  }[]
  encrypted: boolean
  version: number
}

export function SecureFileSharing({
  securityLevels = ["standard", "confidential", "restricted"],
  currentUser,
}: SecureFileSharingProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [currentFolder, setCurrentFolder] = useState("My Files")
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("name")
  const [sortAsc, setSortAsc] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [securityDialog, setSecurityDialog] = useState<{ open: boolean; file?: SecureFile }>({ open: false })
  const [shareDialog, setShareDialog] = useState<{ open: boolean; file?: SecureFile }>({ open: false })
  const [accessLogsDialog, setAccessLogsDialog] = useState<{ open: boolean; file?: SecureFile }>({ open: false })
  const [accessLogs, setAccessLogs] = useState<FileAccessLog[]>([])
  const [encryptionInitialized, setEncryptionInitialized] = useState(false)

  // Initialize encryption service
  useEffect(() => {
    const initEncryption = async () => {
      try {
        await encryptionService.initialize(currentUser.id)
        fileTrackingService.setCurrentUser(currentUser)
        setEncryptionInitialized(true)
        console.log("Encryption service initialized successfully")
      } catch (error) {
        console.error("Failed to initialize encryption:", error)
      }
    }

    initEncryption()
  }, [currentUser])

  // Mock files data
  const mockFiles: SecureFile[] = [
    {
      id: "1",
      name: "Investor_Pitch_Deck.pptx",
      type: "pptx",
      size: "2.4 MB",
      owner: "You",
      modifiedDate: "2023-09-18",
      securityLevel: "confidential",
      starred: true,
      path: ["My Files"],
      sharedWith: [],
      encrypted: true,
      version: 1,
    },
    {
      id: "2",
      name: "Financial_Projections_2023.xlsx",
      type: "xlsx",
      size: "1.8 MB",
      owner: "You",
      modifiedDate: "2023-09-15",
      securityLevel: "restricted",
      starred: false,
      path: ["My Files"],
      sharedWith: [{ userId: "user1", userName: "Sarah Chen", permission: "view" }],
      encrypted: true,
      version: 2,
    },
    {
      id: "3",
      name: "Team_Overview.pdf",
      type: "pdf",
      size: "3.7 MB",
      owner: "Sarah Chen",
      modifiedDate: "2023-09-12",
      securityLevel: "standard",
      starred: true,
      path: ["My Files"],
      sharedWith: [],
      encrypted: true,
      version: 1,
    },
    {
      id: "4",
      name: "Market_Research.docx",
      type: "docx",
      size: "920 KB",
      owner: "You",
      modifiedDate: "2023-09-10",
      securityLevel: "standard",
      starred: false,
      path: ["My Files"],
      sharedWith: [],
      encrypted: true,
      version: 1,
    },
    {
      id: "5",
      name: "Product_Roadmap.pdf",
      type: "pdf",
      size: "1.2 MB",
      owner: "David Wong",
      modifiedDate: "2023-09-05",
      securityLevel: "confidential",
      starred: false,
      path: ["My Files"],
      sharedWith: [
        { userId: "user2", userName: "Alex Wong", permission: "view" },
        { userId: "user3", userName: "Mei Lin", permission: "edit" },
      ],
      encrypted: true,
      version: 3,
    },
  ]

  // Filtered and sorted files
  const files = mockFiles
    .filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((file) => file.path.includes(currentFolder))
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      }
      if (sortBy === "date") {
        return sortAsc
          ? new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime()
          : new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
      }
      // Simple sorting by size string for demo purposes
      return sortAsc ? a.size.localeCompare(b.size) : b.size.localeCompare(a.size)
    })

  // Toggle file selection
  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  // Toggle star status
  const toggleStarred = (fileId: string) => {
    // In a real app, this would update the backend
    console.log(`Toggling star for file ${fileId}`)
  }

  // Handle file upload with encryption
  const handleFileUpload = async () => {
    if (!encryptionInitialized) {
      console.error("Encryption service not initialized")
      return
    }

    // Simulate file selection
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.multiple = true

    fileInput.onchange = async (e) => {
      const files = (e.target as HTMLInputElement).files
      if (!files || files.length === 0) return

      setIsUploading(true)
      setUploadProgress(0)

      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        try {
          // Encrypt the file
          const { encryptedFile, metadata } = await encryptionService.encryptFile(file)

          // Create file metadata with tracking
          fileTrackingService.createFileMetadata(
            file,
            "confidential", // Default security level
            [currentFolder],
            metadata,
          )

          // Update progress
          setUploadProgress(Math.round(((i + 1) / files.length) * 100))

          console.log(`File ${file.name} encrypted and uploaded successfully`)
        } catch (error) {
          console.error(`Failed to upload file ${file.name}:`, error)
        }
      }

      // Finish upload
      setTimeout(() => {
        setIsUploading(false)
        setUploadProgress(0)
      }, 1000)
    }

    fileInput.click()
  }

  // Handle file download with decryption
  const handleFileDownload = async (fileId: string) => {
    if (!encryptionInitialized) {
      console.error("Encryption service not initialized")
      return
    }

    const file = mockFiles.find((f) => f.id === fileId)
    if (!file) return

    try {
      // Log the download attempt
      fileTrackingService.logFileAccess(fileId, file.name, "download")

      // In a real app, we would fetch the encrypted file and metadata from the server
      // and then decrypt it
      console.log(`File ${file.name} downloaded securely`)

      // Simulate download
      const link = document.createElement("a")
      link.href = URL.createObjectURL(new Blob(["Simulated decrypted content"]))
      link.download = file.name
      link.click()
    } catch (error) {
      console.error(`Failed to download file ${file.name}:`, error)
    }
  }

  // Handle sort
  const handleSort = (column: "name" | "date" | "size") => {
    if (sortBy === column) {
      setSortAsc(!sortAsc)
    } else {
      setSortBy(column)
      setSortAsc(true)
    }
  }

  // View access logs
  const handleViewAccessLogs = (fileId: string) => {
    const file = mockFiles.find((f) => f.id === fileId)
    if (!file) return

    // Get access logs for the file
    const logs = fileTrackingService.getFileAccessLogs(fileId)
    setAccessLogs(logs)

    // Open the dialog
    setAccessLogsDialog({ open: true, file })
  }

  // Change security level
  const handleChangeSecurityLevel = (fileId: string, level: SecurityLevel) => {
    // In a real app, this would update the backend
    fileTrackingService.changeSecurityLevel(fileId, level)
    console.log(`Changed security level of file ${fileId} to ${level}`)

    // Close the dialog
    setSecurityDialog({ open: false })
  }

  // Share file
  const handleShareFile = (fileId: string, userId: string, userName: string, permission: "view" | "edit" | "admin") => {
    // In a real app, this would update the backend
    fileTrackingService.shareFile(fileId, userId, userName, permission)
    console.log(`Shared file ${fileId} with user ${userName} (${permission} permission)`)

    // Close the dialog
    setShareDialog({ open: false })
  }

  // Security level icon mapping
  const getSecurityIcon = (level: SecurityLevel) => {
    switch (level) {
      case "standard":
        return <ShieldCheck className="h-4 w-4 text-green-500" />
      case "confidential":
        return <Lock className="h-4 w-4 text-yellow-500" />
      case "restricted":
        return <ShieldAlert className="h-4 w-4 text-red-500" />
    }
  }

  // Security level description
  const getSecurityDescription = (level: SecurityLevel) => {
    switch (level) {
      case "standard":
        return "Basic protection. Accessible to all team members."
      case "confidential":
        return "Enhanced protection. Limited access to specific team members."
      case "restricted":
        return "Maximum protection. Accessible only to you and admins."
    }
  }

  // Format access type for display
  const formatAccessType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Encryption status banner */}
      {!encryptionInitialized && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Initializing end-to-end encryption. Some features may be limited until encryption is ready.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top toolbar */}
      <div className="px-4 py-2 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          {currentFolder !== "My Files" && (
            <Button variant="ghost" size="sm" onClick={() => setCurrentFolder("My Files")} className="h-8">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          )}
          <h3 className="text-sm font-medium">{currentFolder}</h3>
          {encryptionInitialized && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 hover:bg-green-100">
                    <Lock className="h-3 w-3 mr-1" />
                    Encrypted
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">All files are protected with end-to-end encryption</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={handleFileUpload}
            disabled={isUploading || !encryptionInitialized}
          >
            <Upload className="h-4 w-4 mr-1" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>

          <Button variant="ghost" size="sm" className="h-8" disabled={!encryptionInitialized}>
            <Plus className="h-4 w-4 mr-1" /> New Folder
          </Button>
        </div>
      </div>

      {/* Upload progress */}
      {isUploading && (
        <div className="px-4 py-2 border-b">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Uploading files securely...</span>
            <span className="text-sm">{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      {/* Search and filters */}
      <div className="px-4 py-2 border-b">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              className="pl-8 h-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-32 h-8">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Files</SelectItem>
                <SelectItem value="documents">Documents</SelectItem>
                <SelectItem value="spreadsheets">Spreadsheets</SelectItem>
                <SelectItem value="presentations">Presentations</SelectItem>
                <SelectItem value="images">Images</SelectItem>
              </SelectContent>
            </Select>

            <Tabs defaultValue="all">
              <TabsList className="h-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="starred">Starred</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Selected files actions */}
      {selectedFiles.length > 0 && (
        <div className="px-4 py-2 border-b bg-muted/30">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedFiles.length} {selectedFiles.length === 1 ? "file" : "files"} selected
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => {
                  // Download all selected files
                  selectedFiles.forEach((fileId) => handleFileDownload(fileId))
                }}
                disabled={!encryptionInitialized}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => {
                  // Open security dialog for the first selected file
                  const file = mockFiles.find((f) => f.id === selectedFiles[0])
                  if (file) {
                    setSecurityDialog({ open: true, file })
                  }
                }}
                disabled={!encryptionInitialized}
              >
                <Lock className="h-4 w-4 mr-1" />
                Security
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => {
                  // Open share dialog for the first selected file
                  const file = mockFiles.find((f) => f.id === selectedFiles[0])
                  if (file) {
                    setShareDialog({ open: true, file })
                  }
                }}
                disabled={!encryptionInitialized}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="h-8" onClick={() => setSelectedFiles([])}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Files table */}
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted-foreground border-b">
                <th className="font-medium text-left p-3 w-12">
                  <Checkbox
                    checked={selectedFiles.length > 0 && selectedFiles.length === files.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedFiles(files.map((file) => file.id))
                      } else {
                        setSelectedFiles([])
                      }
                    }}
                  />
                </th>
                <th
                  className="font-medium text-left p-3 cursor-pointer hover:text-primary"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Name
                    {sortBy === "name" ? (
                      sortAsc ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )
                    ) : null}
                  </div>
                </th>
                <th className="font-medium text-left p-3 hidden md:table-cell">Owner</th>
                <th
                  className="font-medium text-left p-3 hidden md:table-cell cursor-pointer hover:text-primary"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Modified
                    {sortBy === "date" ? (
                      sortAsc ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )
                    ) : null}
                  </div>
                </th>
                <th className="font-medium text-left p-3 hidden sm:table-cell">Security</th>
                <th className="font-medium text-left p-3 hidden lg:table-cell">Shared With</th>
                <th
                  className="font-medium text-left p-3 hidden lg:table-cell cursor-pointer hover:text-primary"
                  onClick={() => handleSort("size")}
                >
                  <div className="flex items-center">
                    Size
                    {sortBy === "size" ? (
                      sortAsc ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      )
                    ) : null}
                  </div>
                </th>
                <th className="font-medium text-right p-3"></th>
              </tr>
            </thead>
            <tbody>
              {files.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted-foreground">
                    No files found. Upload your first file.
                  </td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <Checkbox
                        checked={selectedFiles.includes(file.id)}
                        onCheckedChange={() => toggleFileSelection(file.id)}
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {file.type === "folder" ? (
                          <FolderIcon className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FileIcon className="h-5 w-5 text-gray-500" />
                        )}
                        <div>
                          <div className="flex items-center">
                            <span className="truncate max-w-[200px]">{file.name}</span>
                            {file.version > 1 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant="outline" className="ml-2 text-xs">
                                      v{file.version}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="text-xs">
                                      Version {file.version} - {file.version - 1} previous versions available
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          {file.encrypted && (
                            <span className="text-xs text-muted-foreground flex items-center mt-1">
                              <Lock className="h-3 w-3 mr-1" />
                              End-to-end encrypted
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">{file.owner}</td>
                    <td className="p-3 hidden md:table-cell">{file.modifiedDate}</td>
                    <td className="p-3 hidden sm:table-cell">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1">
                              {getSecurityIcon(file.securityLevel)}
                              <span className="text-xs capitalize">{file.securityLevel}</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">{getSecurityDescription(file.securityLevel)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      {file.sharedWith.length > 0 ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center">
                                <span className="text-xs">{file.sharedWith.length} users</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <p className="font-medium mb-1">Shared with:</p>
                                <ul className="space-y-1">
                                  {file.sharedWith.map((user) => (
                                    <li key={user.userId} className="flex items-center justify-between">
                                      <span>{user.userName}</span>
                                      <Badge variant="outline" className="ml-2 capitalize">
                                        {user.permission}
                                      </Badge>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not shared</span>
                      )}
                    </td>
                    <td className="p-3 hidden lg:table-cell">{file.size}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleStarred(file.id)}>
                          {file.starred ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleFileDownload(file.id)}>
                              <Download className="h-4 w-4 mr-2" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setShareDialog({ open: true, file })}>
                              <Share2 className="h-4 w-4 mr-2" /> Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSecurityDialog({ open: true, file })}>
                              <Lock className="h-4 w-4 mr-2" /> Change Security
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewAccessLogs(file.id)}>
                              <Clock className="h-4 w-4 mr-2" /> Access Logs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </ScrollArea>
      </div>

      {/* Bottom info bar */}
      <div className="px-4 py-2 text-xs text-muted-foreground border-t flex items-center justify-between">
        <div>
          {selectedFiles.length > 0 ? (
            <span>{selectedFiles.length} items selected</span>
          ) : (
            <span>{files.length} items</span>
          )}
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Download className="h-3 w-3 mr-1" /> Download
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs">
              <Share2 className="h-3 w-3 mr-1" /> Share
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-xs text-red-600">
              Delete
            </Button>
          </div>
        )}
      </div>

      {/* Security Level Dialog */}
      <Dialog open={securityDialog.open} onOpenChange={(open) => setSecurityDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Security Level</DialogTitle>
            <DialogDescription>Set who can access {securityDialog.file?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {securityLevels.map((level) => (
              <div key={level} className="flex items-center space-x-3 rounded-lg border p-3">
                <Checkbox
                  id={level}
                  checked={securityDialog.file?.securityLevel === level}
                  onCheckedChange={() => {
                    if (securityDialog.file) {
                      handleChangeSecurityLevel(securityDialog.file.id, level)
                    }
                  }}
                />
                <div className="flex-1 space-y-1">
                  <label
                    htmlFor={level}
                    className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {level === "standard" && <ShieldCheck className="h-4 w-4 text-green-500" />}
                    {level === "confidential" && <Lock className="h-4 w-4 text-yellow-500" />}
                    {level === "restricted" && <ShieldAlert className="h-4 w-4 text-red-500" />}
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </label>
                  <p className="text-sm text-muted-foreground">{getSecurityDescription(level)}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSecurityDialog({ open: false })}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setSecurityDialog({ open: false })}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialog.open} onOpenChange={(open) => setShareDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share File Securely</DialogTitle>
            <DialogDescription>Share {shareDialog.file?.name} with team members</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="share-with" className="text-sm font-medium">
                Share with
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="sarah">Sarah Chen</SelectItem>
                    <SelectItem value="david">David Wong</SelectItem>
                    <SelectItem value="team-alpha">Team Alpha</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="permissions" className="text-sm font-medium">
                Permissions
              </label>
              <Select defaultValue="view">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Security Notice</label>
              <div className="rounded-md bg-yellow-50 p-3">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Files are shared with end-to-end encryption. All access will be logged and tracked.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Access Expiration</label>
              <div className="flex gap-2">
                <Select defaultValue="never">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="1day">1 day</SelectItem>
                    <SelectItem value="1week">1 week</SelectItem>
                    <SelectItem value="1month">1 month</SelectItem>
                    <SelectItem value="custom">Custom date</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="date" className="w-full" disabled />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShareDialog({ open: false })}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                if (shareDialog.file) {
                  handleShareFile(shareDialog.file.id, "user1", "Sarah Chen", "view")
                }
              }}
            >
              Share Securely
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Logs Dialog */}
      <Dialog open={accessLogsDialog.open} onOpenChange={(open) => setAccessLogsDialog({ open })}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Access Logs</DialogTitle>
            <DialogDescription>Activity history for {accessLogsDialog.file?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="rounded-md border">
              <ScrollArea className="h-[400px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">User</th>
                      <th className="p-2 text-left font-medium">Action</th>
                      <th className="p-2 text-left font-medium">Timestamp</th>
                      <th className="p-2 text-left font-medium">IP Address</th>
                      <th className="p-2 text-left font-medium">Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-4 text-center text-muted-foreground">
                          No access logs found for this file.
                        </td>
                      </tr>
                    ) : (
                      accessLogs.map((log) => (
                        <tr key={log?.id} className="border-b">
                          <td className="p-2">{log?.userName}</td>
                          <td className="p-2">
                            <Badge variant="outline" className="capitalize">
                              {formatAccessType(log?.accessType)}
                            </Badge>
                          </td>
                          <td className="p-2">{log?.timestamp.toLocaleString()}</td>
                          <td className="p-2">{log?.ipAddress}</td>
                          <td className="p-2 truncate max-w-[150px]">{log?.deviceInfo}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                // Export logs as CSV
                console.log("Exporting logs as CSV")
              }}
            >
              <FileText className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button onClick={() => setAccessLogsDialog({ open: false })}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
