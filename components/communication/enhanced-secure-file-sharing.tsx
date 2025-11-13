"use client"

import Link from "next/link"

import { useState, useEffect, useRef } from "react"
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
  Copy,
  Calendar,
  CheckCircle,
  XCircle,
  UserPlus,
  Settings,
  RefreshCw,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PermissionLevelSelector, type SecurityLevel } from "./permission-level-selector"
import { format } from "date-fns"

// Define types for our services
interface FileAccessLog {
  id: string
  fileId: string
  fileName: string
  userId: string
  userName: string
  userEmail?: string
  accessType: string
  timestamp: Date
  ipAddress: string
  deviceInfo: string
  details?: any
}

interface FileMetadata {
  id: string
  name: string
  size: number
  type: string
  securityLevel: SecurityLevel
  path: string[]
  encryptionMetadata: any
  createdAt: Date
  createdBy: string
  version: number
  accessControls?: {
    preventDownload?: boolean
    preventPrint?: boolean
    preventCopy?: boolean
    expirationDate?: Date
    notifyOnAccess?: boolean
    watermark?: boolean
    requireAuthentication?: boolean
  }
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

// Enhanced file tracking service with tiered access controls
const fileTrackingService = {
  currentUser: { id: "", name: "", email: "" },
  setCurrentUser: (user: { id: string; name: string; email: string }) => {
    fileTrackingService.currentUser = user
  },
  createFileMetadata: (
    file: File,
    securityLevel: SecurityLevel,
    path: string[],
    encryptionMetadata: any,
    accessControls?: FileMetadata["accessControls"],
  ): FileMetadata => {
    console.log(`Creating metadata for file ${file.name} with security level ${securityLevel}`)

    // Set default access controls based on security level
    const defaultAccessControls = {
      preventDownload: securityLevel === "restricted",
      preventPrint: securityLevel === "restricted",
      preventCopy: securityLevel === "restricted",
      expirationDate: securityLevel === "restricted" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined, // 30 days if restricted
      notifyOnAccess: securityLevel === "confidential" || securityLevel === "restricted",
      watermark: securityLevel === "restricted",
      requireAuthentication: securityLevel === "confidential" || securityLevel === "restricted",
    }

    const metadata: FileMetadata = {
      id: `file-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      securityLevel,
      path,
      encryptionMetadata,
      createdAt: new Date(),
      createdBy: fileTrackingService.currentUser.id,
      version: 1,
      accessControls: { ...defaultAccessControls, ...accessControls },
    }

    // Log file creation with security level
    fileTrackingService.logFileAccess(metadata.id, file.name, "create", {
      securityLevel,
      accessControls: metadata.accessControls,
    })

    return metadata
  },

  logFileAccess: (fileId: string, fileName: string, accessType: string, details?: any): FileAccessLog => {
    const log: FileAccessLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      fileId,
      fileName,
      userId: fileTrackingService.currentUser.id,
      userName: fileTrackingService.currentUser.name,
      userEmail: fileTrackingService.currentUser.email,
      accessType,
      timestamp: new Date(),
      ipAddress: "127.0.0.1", // In a real app, this would be the actual IP
      deviceInfo: navigator.userAgent,
      details,
    }

    console.log(`Logging file access:`, log)
    return log
  },

  getFileAccessLogs: (fileId: string): FileAccessLog[] => {
    // Mock logs with various actions to demonstrate the tiered system
    return [
      {
        id: "log-1",
        fileId,
        fileName: "Example File",
        userId: "user-123",
        userName: "John Doe",
        userEmail: "john.doe@example.com",
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
        userEmail: "jane.smith@example.com",
        accessType: "download",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        ipAddress: "192.168.1.1",
        deviceInfo: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      },
      {
        id: "log-3",
        fileId,
        fileName: "Example File",
        userId: "user-789",
        userName: "David Wong",
        userEmail: "david.wong@example.com",
        accessType: "security_level_change",
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        ipAddress: "192.168.1.2",
        deviceInfo: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        details: {
          previousLevel: "standard",
          newLevel: "confidential",
        },
      },
      {
        id: "log-4",
        fileId,
        fileName: "Example File",
        userId: "user-123",
        userName: "John Doe",
        userEmail: "john.doe@example.com",
        accessType: "share",
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        ipAddress: "127.0.0.1",
        deviceInfo: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        details: {
          sharedWith: "Sarah Chen",
          permission: "view",
        },
      },
      {
        id: "log-5",
        fileId,
        fileName: "Example File",
        userId: "user-456",
        userName: "Jane Smith",
        userEmail: "jane.smith@example.com",
        accessType: "print_attempt",
        timestamp: new Date(Date.now() - 3600000 * 3), // 3 hours ago
        ipAddress: "192.168.1.1",
        deviceInfo: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
        details: {
          successful: false,
          reason: "Printing is disabled for this file",
        },
      },
    ]
  },

  changeSecurityLevel: (fileId: string, level: SecurityLevel, metadata?: FileMetadata) => {
    console.log(`Changing security level of file ${fileId} to ${level}`)

    // Set default access controls based on new security level
    const defaultAccessControls = {
      preventDownload: level === "restricted",
      preventPrint: level === "restricted",
      preventCopy: level === "restricted",
      notifyOnAccess: level === "confidential" || level === "restricted",
      watermark: level === "restricted",
      requireAuthentication: level === "confidential" || level === "restricted",
    }

    // Log the security level change with detailed information
    fileTrackingService.logFileAccess(fileId, metadata?.name || "Unknown", "security_level_change", {
      previousLevel: metadata?.securityLevel,
      newLevel: level,
      accessControlsUpdated: true,
      newAccessControls: defaultAccessControls,
    })

    return {
      ...metadata,
      securityLevel: level,
      accessControls: defaultAccessControls,
    }
  },

  shareFile: (
    fileId: string,
    fileName: string,
    recipientId: string,
    recipientName: string,
    permission: "view" | "edit" | "admin",
    securityLevel: SecurityLevel,
    accessControls?: FileMetadata["accessControls"],
    expirationDate?: Date,
  ) => {
    console.log(`Sharing file ${fileId} with user ${recipientName} (${permission} permission)`)

    // Generate a secure share link (in a real app this would be a unique URL)
    const shareLink = `https://growthlab.sg/secure-share/${fileId}?recipient=${recipientId}&exp=${expirationDate?.getTime()}`

    // Log the sharing action with comprehensive details
    fileTrackingService.logFileAccess(fileId, fileName, "share", {
      recipientId,
      recipientName,
      permission,
      securityLevel,
      accessControls,
      expirationDate,
      shareLink,
    })

    return { shareLink }
  },

  // Verify if a user can perform an action on a file based on security level
  canPerformAction: (
    fileId: string,
    fileName: string,
    action: "download" | "print" | "copy" | "share" | "edit" | "view",
    securityLevel: SecurityLevel,
    accessControls?: FileMetadata["accessControls"],
  ): boolean => {
    // Implement permission checks based on security level and access controls
    let allowed = true

    if (securityLevel === "restricted") {
      // Restricted files have the most limitations
      if (action === "download" && accessControls?.preventDownload) {
        allowed = false
      }
      if (action === "print" && accessControls?.preventPrint) {
        allowed = false
      }
      if (action === "copy" && accessControls?.preventCopy) {
        allowed = false
      }

      // Check if file has expired
      if (accessControls?.expirationDate && new Date() > accessControls.expirationDate) {
        allowed = false
      }
    }

    // Log the access attempt regardless of outcome
    fileTrackingService.logFileAccess(fileId, fileName, `${action}_attempt`, {
      successful: allowed,
      securityLevel,
      reason: allowed ? undefined : `${action} is not allowed for this file`,
    })

    return allowed
  },

  getAuditTrail: (fileId: string, startDate?: Date, endDate?: Date): FileAccessLog[] => {
    // In a real app, this would retrieve a comprehensive audit trail from the database
    const logs = fileTrackingService.getFileAccessLogs(fileId)

    // Filter by date range if provided
    return logs.filter((log) => {
      if (startDate && log?.timestamp < startDate) return false
      if (endDate && log?.timestamp > endDate) return false
      return true
    })
  },

  getFileMetadata: (fileId: string): FileMetadata | undefined => {
    // In a real app, this would retrieve the file metadata from the database
    return {
      id: fileId,
      name: "Example File",
      size: 1024 * 1024 * 2, // 2MB
      type: "application/pdf",
      securityLevel: "confidential",
      path: ["My Files"],
      encryptionMetadata: {
        encryptionVersion: "1.0",
        encryptedAt: new Date(),
        keyId: "mock-key-id",
      },
      createdAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
      createdBy: "user-123",
      version: 2,
      accessControls: {
        preventDownload: false,
        preventPrint: false,
        preventCopy: true,
        notifyOnAccess: true,
        watermark: false,
        requireAuthentication: true,
      },
    }
  },
}

interface EnhancedSecureFileSharingProps {
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
    sharedAt: Date
    expirationDate?: Date
  }[]
  encrypted: boolean
  version: number
  accessControls?: {
    preventDownload: boolean
    preventPrint: boolean
    preventCopy: boolean
    expirationDate?: Date
    notifyOnAccess: boolean
    watermark: boolean
    requireAuthentication: boolean
  }
}

export function EnhancedSecureFileSharing({ currentUser }: EnhancedSecureFileSharingProps) {
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
  const [detailedSecurityDialog, setDetailedSecurityDialog] = useState<{ open: boolean; file?: SecureFile }>({
    open: false,
  })
  const [accessLogs, setAccessLogs] = useState<FileAccessLog[]>([])
  const [encryptionInitialized, setEncryptionInitialized] = useState(false)
  const [selectedSecurityLevel, setSelectedSecurityLevel] = useState<SecurityLevel>("standard")
  const [shareSecurityLevel, setShareSecurityLevel] = useState<SecurityLevel>("standard")
  const [accessControlSettings, setAccessControlSettings] = useState({
    preventDownload: false,
    preventPrint: false,
    preventCopy: false,
    expirationDate: undefined as Date | undefined,
    notifyOnAccess: false,
    watermark: false,
    requireAuthentication: false,
  })
  const [shareLink, setShareLink] = useState("")
  const [shareSuccess, setShareSuccess] = useState(false)
  const [sharingInProgress, setSharingInProgress] = useState(false)
  const [downloadAttemptBlocked, setDownloadAttemptBlocked] = useState(false)
  const shareLinkRef = useRef<HTMLInputElement>(null)

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

  // Update access controls when security level changes
  useEffect(() => {
    const newAccessControls = {
      preventDownload: shareSecurityLevel === "restricted",
      preventPrint: shareSecurityLevel === "restricted",
      preventCopy: shareSecurityLevel === "restricted",
      expirationDate: shareSecurityLevel === "restricted" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined,
      notifyOnAccess: shareSecurityLevel === "confidential" || shareSecurityLevel === "restricted",
      watermark: shareSecurityLevel === "restricted",
      requireAuthentication: shareSecurityLevel === "confidential" || shareSecurityLevel === "restricted",
    }

    setAccessControlSettings(newAccessControls)
  }, [shareSecurityLevel])

  // Mock files data with enhanced security metadata
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
      accessControls: {
        preventDownload: false,
        preventPrint: false,
        preventCopy: true,
        notifyOnAccess: true,
        watermark: false,
        requireAuthentication: true,
      },
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
      sharedWith: [
        {
          userId: "user1",
          userName: "Sarah Chen",
          permission: "view",
          sharedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
          expirationDate: new Date(Date.now() + 86400000 * 27), // Expires in 27 days
        },
      ],
      encrypted: true,
      version: 2,
      accessControls: {
        preventDownload: true,
        preventPrint: true,
        preventCopy: true,
        expirationDate: new Date(Date.now() + 86400000 * 27), // Expires in 27 days
        notifyOnAccess: true,
        watermark: true,
        requireAuthentication: true,
      },
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
      accessControls: {
        preventDownload: false,
        preventPrint: false,
        preventCopy: false,
        notifyOnAccess: false,
        watermark: false,
        requireAuthentication: false,
      },
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
      accessControls: {
        preventDownload: false,
        preventPrint: false,
        preventCopy: false,
        notifyOnAccess: false,
        watermark: false,
        requireAuthentication: false,
      },
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
        {
          userId: "user2",
          userName: "Alex Wong",
          permission: "view",
          sharedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
          expirationDate: undefined,
        },
        {
          userId: "user3",
          userName: "Mei Lin",
          permission: "edit",
          sharedAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
          expirationDate: undefined,
        },
      ],
      encrypted: true,
      version: 3,
      accessControls: {
        preventDownload: false,
        preventPrint: false,
        preventCopy: true,
        notifyOnAccess: true,
        watermark: false,
        requireAuthentication: true,
      },
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

          // Create file metadata with tracking and specified security level
          fileTrackingService.createFileMetadata(
            file,
            selectedSecurityLevel, // Use selected security level
            [currentFolder],
            metadata,
            // Set access controls based on security level
            {
              preventDownload: selectedSecurityLevel === "restricted",
              preventPrint: selectedSecurityLevel === "restricted",
              preventCopy: selectedSecurityLevel === "restricted",
              expirationDate: undefined,
              notifyOnAccess: selectedSecurityLevel === "confidential" || selectedSecurityLevel === "restricted",
              watermark: selectedSecurityLevel === "restricted",
              requireAuthentication: selectedSecurityLevel === "confidential" || selectedSecurityLevel === "restricted",
            },
          )

          // Update progress
          setUploadProgress(Math.round(((i + 1) / files.length) * 100))

          console.log(
            `File ${file.name} encrypted and uploaded successfully with security level: ${selectedSecurityLevel}`,
          )
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

  // Handle file download with decryption and permission check
  const handleFileDownload = async (fileId: string) => {
    if (!encryptionInitialized) {
      console.error("Encryption service not initialized")
      return
    }

    const file = mockFiles.find((f) => f.id === fileId)
    if (!file) return

    // Check if download is allowed based on security level
    const canDownload = fileTrackingService.canPerformAction(
      fileId,
      file.name,
      "download",
      file.securityLevel,
      file.accessControls,
    )

    if (!canDownload) {
      console.error(`Download not allowed for file ${file.name} with security level ${file.securityLevel}`)
      setDownloadAttemptBlocked(true)
      setTimeout(() => setDownloadAttemptBlocked(false), 3000)
      return
    }

    try {
      // Log the download attempt
      fileTrackingService.logFileAccess(fileId, file.name, "download", {
        securityLevel: file.securityLevel,
        successful: true,
      })

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

    // Get comprehensive audit trail
    const logs = fileTrackingService.getAuditTrail(fileId)
    setAccessLogs(logs)

    // Open the dialog
    setAccessLogsDialog({ open: true, file })
  }

  // Change security level
  const handleChangeSecurityLevel = (fileId: string, level: SecurityLevel) => {
    const file = mockFiles.find((f) => f.id === fileId)
    if (!file) return

    // Update the security level and access controls
    const updatedMetadata = fileTrackingService.changeSecurityLevel(fileId, level, {
      id: fileId,
      name: file.name,
      size: 0, // Unknown actual size
      type: file.type,
      securityLevel: file.securityLevel,
      path: file.path,
      encryptionMetadata: {},
      createdAt: new Date(),
      createdBy: currentUser.id,
      version: file.version,
    })

    console.log(`Changed security level of file ${fileId} to ${level} with updated metadata:`, updatedMetadata)

    // Close the dialog
    setSecurityDialog({ open: false })
  }

  // Handle share file
  const handleShareFile = async () => {
    const file = shareDialog.file
    if (!file) return

    setSharingInProgress(true)

    try {
      // Use the file sharing service to share with appropriate security level
      const result = fileTrackingService.shareFile(
        file.id,
        file.name,
        "recipient-123", // In a real app this would be the selected recipient
        "Sarah Chen", // Selected recipient name
        "view", // Selected permission
        shareSecurityLevel,
        accessControlSettings,
        accessControlSettings.expirationDate,
      )

      // Set the share link
      setShareLink(result.shareLink)

      // Show success message
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 5000)
    } catch (error) {
      console.error("Error sharing file:", error)
    } finally {
      setSharingInProgress(false)
    }
  }

  // Handle detailed security settings
  const handleOpenDetailedSecurity = (fileId: string) => {
    const file = mockFiles.find((f) => f.id === fileId)
    if (!file) return

    setDetailedSecurityDialog({ open: true, file })
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
        return "Enhanced protection with comprehensive tracking of all file interactions."
      case "restricted":
        return "Maximum protection. Files cannot be downloaded or accessed outside the platform."
    }
  }

  // Format access type for display
  const formatAccessType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Copy share link to clipboard
  const copyShareLink = () => {
    if (shareLinkRef.current) {
      shareLinkRef.current.select()
      document.execCommand("copy")

      // Log the copy action
      if (shareDialog.file) {
        fileTrackingService.logFileAccess(shareDialog.file.id, shareDialog.file.name, "share_link_copied", {
          shareLink,
        })
      }
    }
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

      {/* Download blocked notification */}
      {downloadAttemptBlocked && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 fixed top-4 right-4 w-96 z-50 shadow-lg rounded-r-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">Access Denied</p>
              <p className="text-sm text-red-700 mt-1">
                Download is not permitted for this restricted file. File can only be viewed within the platform.
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
          {/* Security level selector for uploads */}
          <Select value={selectedSecurityLevel} onValueChange={(val) => setSelectedSecurityLevel(val as SecurityLevel)}>
            <SelectTrigger className="w-[140px] h-8">
              <div className="flex items-center">
                {selectedSecurityLevel === "standard" && <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />}
                {selectedSecurityLevel === "confidential" && <Lock className="h-4 w-4 text-yellow-500 mr-2" />}
                {selectedSecurityLevel === "restricted" && <ShieldAlert className="h-4 w-4 text-red-500 mr-2" />}
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard" className="flex items-center">
                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                  Standard
                </div>
              </SelectItem>
              <SelectItem value="confidential">
                <div className="flex items-center">
                  <Lock className="h-4 w-4 text-yellow-500 mr-2" />
                  Confidential
                </div>
              </SelectItem>
              <SelectItem value="restricted">
                <div className="flex items-center">
                  <ShieldAlert className="h-4 w-4 text-red-500 mr-2" />
                  Restricted
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

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
            <span className="text-sm">Uploading files securely ({selectedSecurityLevel})...</span>
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
                    setShareSecurityLevel(file.securityLevel)
                    setShareLink("")
                    setShareSuccess(false)
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
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Lock className="h-3 w-3 mr-1" />
                                Encrypted
                              </span>

                              {/* Show restrictions if applicable */}
                              {file.accessControls?.preventDownload && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        variant="outline"
                                        className="ml-0 text-[10px] h-4 bg-red-50 text-red-700 border-red-200"
                                      >
                                        Restricted
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">This file has restricted access controls</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}

                              {/* Show if has expiration */}
                              {file.accessControls?.expirationDate && (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        variant="outline"
                                        className="ml-0 text-[10px] h-4 bg-blue-50 text-blue-700 border-blue-200"
                                      >
                                        <Clock className="h-3 w-3 mr-1" />
                                        Expiring
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">
                                        This file will expire on{" "}
                                        {file.accessControls.expirationDate.toLocaleDateString()}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              )}
                            </div>
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
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 ml-1"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleOpenDetailedSecurity(file.id)
                                }}
                              >
                                <Settings className="h-3 w-3" />
                              </Button>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="space-y-2 max-w-xs">
                              <p className="text-xs font-medium">
                                {file.securityLevel.charAt(0).toUpperCase() + file.securityLevel.slice(1)} Protection
                              </p>
                              <p className="text-xs">{getSecurityDescription(file.securityLevel)}</p>
                              {file.accessControls && (
                                <div className="pt-1 border-t text-xs">
                                  <p className="font-medium">Access Controls:</p>
                                  <ul className="list-disc pl-4 text-xs mt-1 space-y-1">
                                    {file.accessControls.preventDownload && <li>Downloads prevented</li>}
                                    {file.accessControls.preventPrint && <li>Printing prevented</li>}
                                    {file.accessControls.preventCopy && <li>Copying prevented</li>}
                                    {file.accessControls.watermark && <li>Watermarking enabled</li>}
                                    {file.accessControls.notifyOnAccess && <li>Access notifications enabled</li>}
                                    {file.accessControls.expirationDate && (
                                      <li>Expires on {file.accessControls.expirationDate.toLocaleDateString()}</li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
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
                                    <li key={user.userId} className="flex flex-col">
                                      <div className="flex items-center justify-between">
                                        <span>{user.userName}</span>
                                        <Badge variant="outline" className="ml-2 capitalize">
                                          {user.permission}
                                        </Badge>
                                      </div>
                                      {user.expirationDate && (
                                        <span className="text-xs text-muted-foreground mt-0.5">
                                          Expires: {user.expirationDate.toLocaleDateString()}
                                        </span>
                                      )}
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
                            <DropdownMenuItem
                              onClick={() => handleFileDownload(file.id)}
                              disabled={file.accessControls?.preventDownload}
                              className={file.accessControls?.preventDownload ? "text-muted-foreground" : ""}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                              {file.accessControls?.preventDownload && (
                                <ShieldAlert className="h-4 w-4 ml-2 text-red-500" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setShareDialog({ open: true, file })
                                setShareSecurityLevel(file.securityLevel)
                                setShareLink("")
                                setShareSuccess(false)
                              }}
                            >
                              <Share2 className="h-4 w-4 mr-2" /> Share
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSecurityDialog({ open: true, file })}>
                              <Lock className="h-4 w-4 mr-2" /> Change Security
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewAccessLogs(file.id)}>
                              <Clock className="h-4 w-4 mr-2" /> Access Logs
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleOpenDetailedSecurity(file.id)}>
                              <Settings className="h-4 w-4 mr-2" /> Access Controls
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
            <DialogTitle className="flex items-center gap-2">
              {securityDialog.file?.securityLevel === "standard" && <ShieldCheck className="h-5 w-5 text-green-500" />}
              {securityDialog.file?.securityLevel === "confidential" && <Lock className="h-5 w-5 text-yellow-500" />}
              {securityDialog.file?.securityLevel === "restricted" && <ShieldAlert className="h-5 w-5 text-red-500" />}
              Change Security Level
            </DialogTitle>
            <DialogDescription>Set security for {securityDialog.file?.name}</DialogDescription>
          </DialogHeader>

          <PermissionLevelSelector
            value={securityDialog.file?.securityLevel || "standard"}
            onChange={(level) => {
              if (securityDialog.file) {
                handleChangeSecurityLevel(securityDialog.file.id, level)
              }
            }}
            className="py-4"
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setSecurityDialog({ open: false })}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (securityDialog.file) {
                  handleChangeSecurityLevel(securityDialog.file.id, securityDialog.file.securityLevel)
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog with enhanced security controls */}
      <Dialog open={shareDialog.open} onOpenChange={(open) => setShareDialog({ open: false, file: shareDialog.file })}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share File Securely
            </DialogTitle>
            <DialogDescription>Share {shareDialog.file?.name} with team members</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="people" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="people" className="flex-1">
                <UserPlus className="h-4 w-4 mr-2" />
                Share with People
              </TabsTrigger>
              <TabsTrigger value="link" className="flex-1">
                <Link className="h-4 w-4 mr-2" />
                Get Link
              </TabsTrigger>
            </TabsList>

            <TabsContent value="people" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="share-with">Share with</Label>
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
                <Label htmlFor="permissions">Permissions</Label>
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

              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium mb-3">Security Level</h4>

                <PermissionLevelSelector value={shareSecurityLevel} onChange={setShareSecurityLevel} />
              </div>

              {shareSecurityLevel !== "standard" && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Advanced Access Controls</h4>

                  <div className="space-y-4">
                    {shareSecurityLevel === "restricted" && (
                      <>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Prevent Downloads</Label>
                            <p className="text-xs text-muted-foreground">Recipients cannot download the file</p>
                          </div>
                          <Switch
                            checked={accessControlSettings.preventDownload}
                            onCheckedChange={(checked) =>
                              setAccessControlSettings((prev) => ({ ...prev, preventDownload: checked }))
                            }
                            disabled={shareSecurityLevel === "restricted"}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Prevent Printing</Label>
                            <p className="text-xs text-muted-foreground">Recipients cannot print the file</p>
                          </div>
                          <Switch
                            checked={accessControlSettings.preventPrint}
                            onCheckedChange={(checked) =>
                              setAccessControlSettings((prev) => ({ ...prev, preventPrint: checked }))
                            }
                            disabled={shareSecurityLevel === "restricted"}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Apply Watermark</Label>
                            <p className="text-xs text-muted-foreground">Add a watermark to the file</p>
                          </div>
                          <Switch
                            checked={accessControlSettings.watermark}
                            onCheckedChange={(checked) =>
                              setAccessControlSettings((prev) => ({ ...prev, watermark: checked }))
                            }
                            disabled={shareSecurityLevel === "restricted"}
                          />
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Prevent Copying</Label>
                        <p className="text-xs text-muted-foreground">Recipients cannot copy content from the file</p>
                      </div>
                      <Switch
                        checked={accessControlSettings.preventCopy}
                        onCheckedChange={(checked) =>
                          setAccessControlSettings((prev) => ({ ...prev, preventCopy: checked }))
                        }
                        disabled={shareSecurityLevel === "restricted"}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Notify on Access</Label>
                        <p className="text-xs text-muted-foreground">Get notified when the file is accessed</p>
                      </div>
                      <Switch
                        checked={accessControlSettings.notifyOnAccess}
                        onCheckedChange={(checked) =>
                          setAccessControlSettings((prev) => ({ ...prev, notifyOnAccess: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Set Expiration</Label>
                        <p className="text-xs text-muted-foreground">File access will expire on the selected date</p>
                      </div>
                      <div className="w-40">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <Calendar className="mr-2 h-4 w-4" />
                              {accessControlSettings.expirationDate ? (
                                format(accessControlSettings.expirationDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={accessControlSettings.expirationDate}
                              onSelect={(date) =>
                                setAccessControlSettings((prev) => ({ ...prev, expirationDate: date || undefined }))
                              }
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {shareSuccess ? (
                <div className="rounded-md bg-green-50 p-4 mt-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">File shared successfully</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>The file has been shared with the selected security settings.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Info className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Security Information</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          This file will be shared with <strong>{shareSecurityLevel}</strong> security level.
                          {shareSecurityLevel === "confidential" && " All interactions will be tracked and logged."}
                          {shareSecurityLevel === "restricted" &&
                            " Recipients cannot download or use the file outside the platform."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="link" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="permissions">Link Permissions</Label>
                <Select defaultValue="view">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">Anyone with link can view</SelectItem>
                    <SelectItem value="edit">Anyone with link can edit</SelectItem>
                    <SelectItem value="restricted">Restricted - requires authentication</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium mb-3">Security Level</h4>

                <PermissionLevelSelector value={shareSecurityLevel} onChange={setShareSecurityLevel} />
              </div>

              {shareSecurityLevel !== "standard" && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Advanced Access Controls</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Require Authentication</Label>
                        <p className="text-xs text-muted-foreground">Recipients must sign in to access</p>
                      </div>
                      <Switch
                        checked={accessControlSettings.requireAuthentication}
                        onCheckedChange={(checked) =>
                          setAccessControlSettings((prev) => ({ ...prev, requireAuthentication: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Set Expiration</Label>
                        <p className="text-xs text-muted-foreground">Link will expire on the selected date</p>
                      </div>
                      <div className="w-40">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <Calendar className="mr-2 h-4 w-4" />
                              {accessControlSettings.expirationDate ? (
                                format(accessControlSettings.expirationDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={accessControlSettings.expirationDate}
                              onSelect={(date) =>
                                setAccessControlSettings((prev) => ({ ...prev, expirationDate: date || undefined }))
                              }
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {shareLink ? (
                <div className="relative mt-4">
                  <Input value={shareLink} readOnly ref={shareLinkRef} className="pr-20" />
                  <Button variant="outline" size="sm" className="absolute right-1 top-1 h-6" onClick={copyShareLink}>
                    <Copy className="h-3 w-3 mr-1" /> Copy
                  </Button>
                </div>
              ) : (
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <Info className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Create a secure link with the selected security settings.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShareDialog({ open: false })}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleShareFile} disabled={sharingInProgress}>
              {sharingInProgress ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sharing...
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Securely
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Logs Dialog */}
      <Dialog open={accessLogsDialog.open} onOpenChange={(open) => setAccessLogsDialog({ open })}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Access Logs
            </DialogTitle>
            <DialogDescription>
              Complete audit trail for {accessLogsDialog.file?.name}
              {accessLogsDialog.file?.securityLevel === "confidential" && (
                <Badge className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Confidential</Badge>
              )}
              {accessLogsDialog.file?.securityLevel === "restricted" && (
                <Badge className="ml-2 bg-red-100 text-red-800 hover:bg-red-100">Restricted</Badge>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="download">Download</SelectItem>
                    <SelectItem value="share">Share</SelectItem>
                    <SelectItem value="security">Security Changes</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Search logs..." className="w-[200px]" />
              </div>

              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="rounded-md border overflow-hidden">
              <ScrollArea className="h-[400px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">User</th>
                      <th className="p-2 text-left font-medium">Action</th>
                      <th className="p-2 text-left font-medium">Timestamp</th>
                      <th className="p-2 text-left font-medium">Details</th>
                      <th className="p-2 text-left font-medium">IP Address</th>
                      <th className="p-2 text-left font-medium">Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-muted-foreground">
                          No access logs found for this file.
                        </td>
                      </tr>
                    ) : (
                      accessLogs.map((log) => (
                        <tr key={log?.id} className="border-b hover:bg-muted/50">
                          <td className="p-2">
                            <div>
                              <div className="font-medium">{log?.userName}</div>
                              <div className="text-xs text-muted-foreground">{log?.userEmail}</div>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge
                              variant="outline"
                              className={`capitalize ${
                                log?.accessType.includes("denied") ||
                                (log?.accessType.includes("attempt") && log?.details?.successful === false)
                                  ? "bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
                                  : ""
                              }`}
                            >
                              {formatAccessType(log?.accessType)}
                            </Badge>
                          </td>
                          <td className="p-2 whitespace-nowrap">{log?.timestamp.toLocaleString()}</td>
                          <td className="p-2">
                            {log?.details && (
                              <div>
                                {log?.details.previousLevel && log?.details.newLevel && (
                                  <span className="text-xs">
                                    {formatAccessType(log?.details.previousLevel)} →{" "}
                                    {formatAccessType(log?.details.newLevel)}
                                  </span>
                                )}

                                {log?.details.sharedWith && (
                                  <span className="text-xs">
                                    Shared with: {log?.details.sharedWith} ({log?.details.permission})
                                  </span>
                                )}

                                {log?.details.reason && (
                                  <span className="text-xs text-red-600">{log?.details.reason}</span>
                                )}

                                {log?.details.successful === false && !log?.details.reason && (
                                  <span className="text-xs text-red-600">Access denied</span>
                                )}
                              </div>
                            )}
                          </td>
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
            <Button onClick={() => setAccessLogsDialog({ open: false })}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detailed Security Settings Dialog */}
      <Dialog open={detailedSecurityDialog.open} onOpenChange={(open) => setDetailedSecurityDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Detailed Security Settings
            </DialogTitle>
            <DialogDescription>
              Configure advanced security controls for {detailedSecurityDialog.file?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-5">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  {detailedSecurityDialog.file?.securityLevel === "standard" && (
                    <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                  )}
                  {detailedSecurityDialog.file?.securityLevel === "confidential" && (
                    <Lock className="h-4 w-4 text-yellow-500 mr-2" />
                  )}
                  {detailedSecurityDialog.file?.securityLevel === "restricted" && (
                    <ShieldAlert className="h-4 w-4 text-red-500 mr-2" />
                  )}
                  Security Level
                </CardTitle>
                <CardDescription>
                  Current security level:{" "}
                  <strong className="capitalize">{detailedSecurityDialog.file?.securityLevel}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground mb-3">
                  {getSecurityDescription(detailedSecurityDialog.file?.securityLevel || "standard")}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (detailedSecurityDialog.file) {
                      setSecurityDialog({ open: true, file: detailedSecurityDialog.file })
                      setDetailedSecurityDialog({ open: false })
                    }
                  }}
                >
                  Change Security Level
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Access Controls</CardTitle>
                <CardDescription>Configure how users can interact with this file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="prevent-download">Prevent Downloads</Label>
                    <p className="text-xs text-muted-foreground">Recipients cannot download the file</p>
                  </div>
                  <Switch
                    id="prevent-download"
                    checked={detailedSecurityDialog.file?.accessControls?.preventDownload || false}
                    disabled={detailedSecurityDialog.file?.securityLevel === "restricted"}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="prevent-print">Prevent Printing</Label>
                    <p className="text-xs text-muted-foreground">Recipients cannot print the file</p>
                  </div>
                  <Switch
                    id="prevent-print"
                    checked={detailedSecurityDialog.file?.accessControls?.preventPrint || false}
                    disabled={detailedSecurityDialog.file?.securityLevel === "restricted"}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="prevent-copy">Prevent Copying</Label>
                    <p className="text-xs text-muted-foreground">Recipients cannot copy content from the file</p>
                  </div>
                  <Switch
                    id="prevent-copy"
                    checked={detailedSecurityDialog.file?.accessControls?.preventCopy || false}
                    disabled={detailedSecurityDialog.file?.securityLevel === "restricted"}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="watermark">Apply Watermark</Label>
                    <p className="text-xs text-muted-foreground">Add a watermark to the file</p>
                  </div>
                  <Switch
                    id="watermark"
                    checked={detailedSecurityDialog.file?.accessControls?.watermark || false}
                    disabled={detailedSecurityDialog.file?.securityLevel === "restricted"}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-access">Notify on Access</Label>
                    <p className="text-xs text-muted-foreground">Get notified when the file is accessed</p>
                  </div>
                  <Switch
                    id="notify-access"
                    checked={detailedSecurityDialog.file?.accessControls?.notifyOnAccess || false}
                    disabled={
                      detailedSecurityDialog.file?.securityLevel === "restricted" ||
                      detailedSecurityDialog.file?.securityLevel === "confidential"
                    }
                  />
                </div>

                {detailedSecurityDialog.file?.accessControls?.expirationDate && (
                  <div className="pt-2 mt-2 border-t">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Expiration Date</Label>
                        <p className="text-xs text-muted-foreground">
                          File access will expire on{" "}
                          {detailedSecurityDialog.file.accessControls.expirationDate.toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Change
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between">
                <p className="text-xs text-muted-foreground">Some settings are locked by the current security level</p>
                <Button variant="ghost" size="sm">
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Sharing Status</CardTitle>
                <CardDescription>
                  File is currently shared with {detailedSecurityDialog.file?.sharedWith.length || 0} users
                </CardDescription>
              </CardHeader>
              <CardContent>
                {detailedSecurityDialog.file?.sharedWith.length === 0 ? (
                  <p className="text-sm text-muted-foreground">This file is not shared with anyone.</p>
                ) : (
                  <div className="space-y-2">
                    {detailedSecurityDialog.file?.sharedWith.map((user) => (
                      <div key={user.userId} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{user.userName}</div>
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Badge variant="outline" className="mr-2 capitalize">
                              {user.permission}
                            </Badge>
                            {user.expirationDate && <span>Expires: {user.expirationDate.toLocaleDateString()}</span>}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (detailedSecurityDialog.file) {
                      setShareDialog({ open: true, file: detailedSecurityDialog.file })
                      setDetailedSecurityDialog({ open: false })
                      setShareSecurityLevel(detailedSecurityDialog.file.securityLevel)
                      setShareLink("")
                      setShareSuccess(false)
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          </div>

          <DialogFooter>
            <Button onClick={() => setDetailedSecurityDialog({ open: false })}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
