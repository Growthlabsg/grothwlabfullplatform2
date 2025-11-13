"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Download,
  Upload,
  Database,
  Server,
  HardDrive,
  Cloud,
  Shield,
  Clock,
  Calendar,
  Settings,
  Play,
  Pause,
  Square,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Info,
  X,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  RefreshCw,
  FileText,
  Folder,
  Archive,
  Zap,
  Target,
  History,
  Save,
  ExternalLink,
  Filter,
  Search,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"

interface BackupJob {
  id: string
  name: string
  description: string
  type: "full" | "incremental" | "differential" | "snapshot"
  source: "database" | "files" | "system" | "application" | "logs"
  status: "running" | "completed" | "failed" | "scheduled" | "paused" | "cancelled"
  progress: number
  size: string
  compressed: boolean
  encrypted: boolean
  schedule: {
    enabled: boolean
    frequency: "hourly" | "daily" | "weekly" | "monthly" | "custom"
    time: string
    days?: string[]
    customCron?: string
  }
  retention: {
    count: number
    days: number
    policy: "count" | "time" | "size"
  }
  destination: {
    type: "local" | "s3" | "gcs" | "azure" | "ftp" | "sftp"
    path: string
    credentials?: string
  }
  metadata: {
    createdAt: string
    startedAt?: string
    completedAt?: string
    duration?: string
    version: string
    checksum?: string
    creator: string
  }
  statistics: {
    filesCount: number
    totalSize: string
    compressedSize: string
    compressionRatio: number
    transferSpeed?: string
  }
}

interface RestorePoint {
  id: string
  backupId: string
  name: string
  description: string
  timestamp: string
  type: "full" | "incremental" | "differential" | "snapshot"
  size: string
  status: "available" | "corrupted" | "expired" | "archived"
  integrity: "verified" | "unverified" | "failed"
  location: string
  metadata: Record<string, any>
}

interface BackupSchedule {
  id: string
  name: string
  description: string
  enabled: boolean
  jobs: string[]
  trigger: {
    type: "time" | "event" | "manual"
    schedule?: string
    events?: string[]
  }
  notifications: {
    onSuccess: boolean
    onFailure: boolean
    onStart: boolean
    recipients: string[]
    channels: string[]
  }
  retention: {
    maxBackups: number
    maxAge: number
    maxSize: string
  }
}

const mockBackupJobs: BackupJob[] = [
  {
    id: "backup1",
    name: "Daily Database Backup",
    description: "Complete backup of production database including all tables and indexes",
    type: "full",
    source: "database",
    status: "completed",
    progress: 100,
    size: "2.1TB",
    compressed: true,
    encrypted: true,
    schedule: {
      enabled: true,
      frequency: "daily",
      time: "02:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
    },
    retention: {
      count: 30,
      days: 30,
      policy: "count"
    },
    destination: {
      type: "s3",
      path: "s3://growthlab-backups/database/",
      credentials: "aws-backup-role"
    },
    metadata: {
      createdAt: "2024-01-20T02:00:00Z",
      startedAt: "2024-01-20T02:00:00Z",
      completedAt: "2024-01-20T02:45:00Z",
      duration: "45 minutes",
      version: "v2.1.4",
      checksum: "sha256:abc123...",
      creator: "system"
    },
    statistics: {
      filesCount: 1,
      totalSize: "2.1TB",
      compressedSize: "1.2TB",
      compressionRatio: 57.1,
      transferSpeed: "78 MB/s"
    }
  },
  {
    id: "backup2",
    name: "Hourly Incremental Backup",
    description: "Incremental backup capturing changes since last backup",
    type: "incremental",
    source: "database",
    status: "running",
    progress: 67,
    size: "156MB",
    compressed: true,
    encrypted: true,
    schedule: {
      enabled: true,
      frequency: "hourly",
      time: "00",
    },
    retention: {
      count: 168,
      days: 7,
      policy: "time"
    },
    destination: {
      type: "s3",
      path: "s3://growthlab-backups/incremental/",
      credentials: "aws-backup-role"
    },
    metadata: {
      createdAt: "2024-01-20T14:00:00Z",
      startedAt: "2024-01-20T14:00:00Z",
      version: "v2.1.4",
      creator: "system"
    },
    statistics: {
      filesCount: 1,
      totalSize: "156MB",
      compressedSize: "89MB",
      compressionRatio: 57.1,
      transferSpeed: "45 MB/s"
    }
  },
  {
    id: "backup3",
    name: "Application Files Backup",
    description: "Backup of application files, configurations, and assets",
    type: "full",
    source: "files",
    status: "scheduled",
    progress: 0,
    size: "0B",
    compressed: true,
    encrypted: true,
    schedule: {
      enabled: true,
      frequency: "weekly",
      time: "01:00",
      days: ["sunday"]
    },
    retention: {
      count: 12,
      days: 90,
      policy: "count"
    },
    destination: {
      type: "s3",
      path: "s3://growthlab-backups/files/",
      credentials: "aws-backup-role"
    },
    metadata: {
      createdAt: "2024-01-21T01:00:00Z",
      version: "v2.1.4",
      creator: "admin"
    },
    statistics: {
      filesCount: 0,
      totalSize: "0B",
      compressedSize: "0B",
      compressionRatio: 0
    }
  },
  {
    id: "backup4",
    name: "System Configuration Backup",
    description: "Backup of system configurations, environment variables, and settings",
    type: "snapshot",
    source: "system",
    status: "failed",
    progress: 0,
    size: "0B",
    compressed: false,
    encrypted: true,
    schedule: {
      enabled: false,
      frequency: "daily",
      time: "03:00"
    },
    retention: {
      count: 14,
      days: 14,
      policy: "count"
    },
    destination: {
      type: "local",
      path: "/backup/system/",
    },
    metadata: {
      createdAt: "2024-01-20T03:00:00Z",
      startedAt: "2024-01-20T03:00:00Z",
      version: "v2.1.4",
      creator: "system"
    },
    statistics: {
      filesCount: 0,
      totalSize: "0B",
      compressedSize: "0B",
      compressionRatio: 0
    }
  }
]

const mockRestorePoints: RestorePoint[] = [
  {
    id: "restore1",
    backupId: "backup1",
    name: "Production DB - Jan 20, 2024 02:00",
    description: "Full database backup before system update",
    timestamp: "2024-01-20T02:00:00Z",
    type: "full",
    size: "2.1TB",
    status: "available",
    integrity: "verified",
    location: "s3://growthlab-backups/database/2024-01-20-020000.sql.gz",
    metadata: {
      version: "v2.1.4",
      checksum: "sha256:abc123...",
      tables: 47,
      records: 2847293
    }
  },
  {
    id: "restore2",
    backupId: "backup1",
    name: "Production DB - Jan 19, 2024 02:00",
    description: "Daily full database backup",
    timestamp: "2024-01-19T02:00:00Z",
    type: "full",
    size: "2.0TB",
    status: "available",
    integrity: "verified",
    location: "s3://growthlab-backups/database/2024-01-19-020000.sql.gz",
    metadata: {
      version: "v2.1.3",
      checksum: "sha256:def456...",
      tables: 47,
      records: 2834567
    }
  },
  {
    id: "restore3",
    backupId: "backup2",
    name: "Incremental - Jan 20, 2024 13:00",
    description: "Hourly incremental backup",
    timestamp: "2024-01-20T13:00:00Z",
    type: "incremental",
    size: "142MB",
    status: "available",
    integrity: "verified",
    location: "s3://growthlab-backups/incremental/2024-01-20-130000.sql.gz",
    metadata: {
      version: "v2.1.4",
      checksum: "sha256:ghi789...",
      changes: 1247
    }
  }
]

export function BackupRestoreSystem() {
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>(mockBackupJobs)
  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>(mockRestorePoints)
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [selectedRestorePoint, setSelectedRestorePoint] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [lastUpdated, setLastUpdated] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setLastUpdated(new Date().toLocaleTimeString())
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Simulate backup progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBackupJobs(prev => prev.map(job => {
        if (job.status === "running" && job.progress < 100) {
          const newProgress = Math.min(100, job.progress + Math.random() * 5)
          return {
            ...job,
            progress: newProgress,
            status: newProgress >= 100 ? "completed" as const : job.status
          }
        }
        return job
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const showAlert = (message: string) => {
    if (typeof window !== 'undefined') {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Backup System', { body: message })
      } else {
        alert(message)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": case "available": case "verified": return "text-green-600 bg-green-50"
      case "running": return "text-blue-600 bg-blue-50"
      case "failed": case "corrupted": case "failed": return "text-red-600 bg-red-50"
      case "scheduled": case "unverified": return "text-yellow-600 bg-yellow-50"
      case "paused": case "archived": return "text-gray-600 bg-gray-50"
      case "cancelled": case "expired": return "text-orange-600 bg-orange-50"
      default: return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": case "available": case "verified": return <CheckCircle className="h-4 w-4" />
      case "running": return <Play className="h-4 w-4" />
      case "failed": case "corrupted": return <AlertTriangle className="h-4 w-4" />
      case "scheduled": case "unverified": return <Clock className="h-4 w-4" />
      case "paused": case "archived": return <Pause className="h-4 w-4" />
      case "cancelled": case "expired": return <X className="h-4 w-4" />
      default: return <Info className="h-4 w-4" />
    }
  }

  const handleStartBackup = async (jobId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setBackupJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { 
              ...job, 
              status: "running" as const, 
              progress: 0,
              metadata: {
                ...job.metadata,
                startedAt: new Date().toISOString()
              }
            }
          : job
      ))
      
      showAlert(`Backup job "${backupJobs.find(j => j.id === jobId)?.name}" started successfully!`)
    } catch (error) {
      showAlert("Failed to start backup job")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePauseBackup = async (jobId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setBackupJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: "paused" as const }
          : job
      ))
      
      showAlert("Backup job paused")
    } catch (error) {
      showAlert("Failed to pause backup job")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelBackup = async (jobId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setBackupJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: "cancelled" as const, progress: 0 }
          : job
      ))
      
      showAlert("Backup job cancelled")
    } catch (error) {
      showAlert("Failed to cancel backup job")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBackup = async (jobId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setBackupJobs(prev => prev.filter(job => job.id !== jobId))
      setSelectedJobs(prev => prev.filter(id => id !== jobId))
      
      showAlert("Backup job deleted successfully")
    } catch (error) {
      showAlert("Failed to delete backup job")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateBackup = async (backupData: Partial<BackupJob>) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newBackup: BackupJob = {
        id: `backup_${Date.now()}`,
        name: backupData.name || "New Backup Job",
        description: backupData.description || "",
        type: backupData.type || "full",
        source: backupData.source || "database",
        status: "scheduled",
        progress: 0,
        size: "0B",
        compressed: backupData.compressed || true,
        encrypted: backupData.encrypted || true,
        schedule: backupData.schedule || {
          enabled: false,
          frequency: "daily",
          time: "02:00"
        },
        retention: backupData.retention || {
          count: 30,
          days: 30,
          policy: "count"
        },
        destination: backupData.destination || {
          type: "local",
          path: "/backup/"
        },
        metadata: {
          createdAt: new Date().toISOString(),
          version: "v2.1.4",
          creator: "admin"
        },
        statistics: {
          filesCount: 0,
          totalSize: "0B",
          compressedSize: "0B",
          compressionRatio: 0
        }
      }
      
      setBackupJobs(prev => [newBackup, ...prev])
      showAlert("Backup job created successfully!")
    } catch (error) {
      showAlert("Failed to create backup job")
    } finally {
      setIsLoading(false)
      setShowCreateDialog(false)
    }
  }

  const handleRestoreFromPoint = async (restorePointId: string) => {
    setIsLoading(true)
    try {
      const restorePoint = restorePoints.find(rp => rp.id === restorePointId)
      if (!restorePoint) throw new Error("Restore point not found")

      await new Promise(resolve => setTimeout(resolve, 3000))
      
      showAlert(`Restore from "${restorePoint.name}" completed successfully!`)
    } catch (error) {
      showAlert("Restore operation failed")
    } finally {
      setIsLoading(false)
      setShowRestoreDialog(false)
    }
  }

  const handleVerifyIntegrity = async (restorePointId: string) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setRestorePoints(prev => prev.map(rp => 
        rp.id === restorePointId 
          ? { ...rp, integrity: "verified" as const }
          : rp
      ))
      
      showAlert("Integrity verification completed successfully")
    } catch (error) {
      showAlert("Integrity verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredJobs = backupJobs.filter(job => {
    const matchesStatus = filterStatus === "all" || job.status === filterStatus
    const matchesType = filterType === "all" || job.type === filterType
    const matchesSearch = searchQuery === "" || 
      job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesType && matchesSearch
  })

  const totalBackups = backupJobs.length
  const runningBackups = backupJobs.filter(j => j.status === "running").length
  const failedBackups = backupJobs.filter(j => j.status === "failed").length
  const scheduledBackups = backupJobs.filter(j => j.schedule.enabled).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Backup & Restore System</h2>
          <p className="text-muted-foreground">
            Manage system backups, restore points, and data recovery operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Backup Job
          </Button>
          <Button onClick={() => setShowRestoreDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Restore Data
          </Button>
          <div className="text-xs text-muted-foreground">
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Backups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalBackups}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Running Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{runningBackups}</div>
            <p className="text-xs text-muted-foreground">
              Active backup operations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Failed Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedBackups}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 inline mr-1" />
              -2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Scheduled Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{scheduledBackups}</div>
            <p className="text-xs text-muted-foreground">
              Automated backups enabled
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Backup Jobs</TabsTrigger>
          <TabsTrigger value="restore">Restore Points</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          {/* Filters and Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search backup jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
                
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                    <SelectItem value="incremental">Incremental</SelectItem>
                    <SelectItem value="differential">Differential</SelectItem>
                    <SelectItem value="snapshot">Snapshot</SelectItem>
                  </SelectContent>
                </Select>

                {selectedJobs.length > 0 && (
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-muted-foreground">
                      {selectedJobs.length} selected
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => selectedJobs.forEach(handleStartBackup)}
                      disabled={isLoading}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => selectedJobs.forEach(handlePauseBackup)}
                      disabled={isLoading}
                    >
                      <Pause className="h-3 w-3 mr-1" />
                      Pause
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => selectedJobs.forEach(handleDeleteBackup)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Backup Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    {/* Selection Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedJobs.includes(job.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedJobs(prev => [...prev, job.id])
                        } else {
                          setSelectedJobs(prev => prev.filter(id => id !== job.id))
                        }
                      }}
                      className="mt-1"
                    />

                    {/* Job Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-lg">{job.name}</h4>
                          <p className="text-muted-foreground">{job.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(job.status)}>
                            {getStatusIcon(job.status)}
                            <span className="ml-1 capitalize">{job.status}</span>
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {job.source}
                          </Badge>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {job.status === "running" && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{job.progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                        </div>
                      )}

                      {/* Job Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Size:</span>
                          <div className="text-muted-foreground">{job.size}</div>
                        </div>
                        <div>
                          <span className="font-medium">Destination:</span>
                          <div className="text-muted-foreground capitalize">{job.destination.type}</div>
                        </div>
                        <div>
                          <span className="font-medium">Schedule:</span>
                          <div className="text-muted-foreground">
                            {job.schedule.enabled ? job.schedule.frequency : "Manual"}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium">Retention:</span>
                          <div className="text-muted-foreground">
                            {job.retention.count} backups
                          </div>
                        </div>
                      </div>

                      {/* Security Features */}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          {job.compressed ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <X className="h-3 w-3 text-red-600" />
                          )}
                          <span>Compression</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {job.encrypted ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <X className="h-3 w-3 text-red-600" />
                          )}
                          <span>Encryption</span>
                        </div>
                        {job.statistics.compressionRatio > 0 && (
                          <div className="text-muted-foreground">
                            Compression: {job.statistics.compressionRatio.toFixed(1)}%
                          </div>
                        )}
                      </div>

                      {/* Last Run Info */}
                      {job.metadata.completedAt && (
                        <div className="text-xs text-muted-foreground">
                          Last completed: {new Date(job.metadata.completedAt).toLocaleString()}
                          {job.metadata.duration && ` • Duration: ${job.metadata.duration}`}
                          {job.statistics.transferSpeed && ` • Speed: ${job.statistics.transferSpeed}`}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      {job.status === "scheduled" || job.status === "failed" || job.status === "completed" ? (
                        <Button
                          size="sm"
                          onClick={() => handleStartBackup(job.id)}
                          disabled={isLoading}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      ) : job.status === "running" ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePauseBackup(job.id)}
                            disabled={isLoading}
                          >
                            <Pause className="h-3 w-3 mr-1" />
                            Pause
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleCancelBackup(job.id)}
                            disabled={isLoading}
                          >
                            <Square className="h-3 w-3 mr-1" />
                            Cancel
                          </Button>
                        </>
                      ) : job.status === "paused" ? (
                        <Button
                          size="sm"
                          onClick={() => handleStartBackup(job.id)}
                          disabled={isLoading}
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </Button>
                      ) : null}
                      
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <Copy className="h-3 w-3 mr-1" />
                        Clone
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteBackup(job.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-center">
                <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No backup jobs found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || filterStatus !== "all" || filterType !== "all"
                    ? "Try adjusting your filters or search query"
                    : "Create your first backup job to get started"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="restore" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Restore Points</CardTitle>
              <CardDescription>
                Select a restore point to recover your data from a previous backup
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Integrity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restorePoints.map((point) => (
                    <TableRow key={point.id}>
                      <TableCell className="font-medium">{point.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {point.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{point.size}</TableCell>
                      <TableCell className="text-xs">
                        {new Date(point.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(point.status)}>
                          {getStatusIcon(point.status)}
                          <span className="ml-1 capitalize">{point.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(point.integrity)}>
                          {getStatusIcon(point.integrity)}
                          <span className="ml-1 capitalize">{point.integrity}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedRestorePoint(point.id)
                              setShowRestoreDialog(true)
                            }}
                            disabled={point.status !== "available" || isLoading}
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Restore
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerifyIntegrity(point.id)}
                            disabled={isLoading}
                          >
                            <Shield className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
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

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Schedules</CardTitle>
              <CardDescription>
                Manage automated backup schedules and policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backupJobs.filter(job => job.schedule.enabled).map((job) => (
                  <div key={job.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{job.name}</h4>
                      <div className="flex items-center gap-2">
                        <Switch checked={job.schedule.enabled} />
                        <Badge variant="outline">
                          {job.schedule.frequency}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Frequency:</span>
                        <div className="text-muted-foreground capitalize">
                          {job.schedule.frequency}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Time:</span>
                        <div className="text-muted-foreground">
                          {job.schedule.time}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Retention:</span>
                        <div className="text-muted-foreground">
                          {job.retention.count} backups
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Next Run:</span>
                        <div className="text-muted-foreground">
                          {job.schedule.frequency === "daily" ? "Tomorrow 02:00" : 
                           job.schedule.frequency === "hourly" ? "Next hour" :
                           "Next week"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Backup Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                <p className="text-sm text-muted-foreground">
                  Last 30 days • 847 successful / 900 total
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Successful</span>
                    <span className="text-green-600">847</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Failed</span>
                    <span className="text-red-600">53</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">12.4TB</div>
                <p className="text-sm text-muted-foreground">
                  Total backup storage used
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Backups</span>
                    <span>8.2TB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>File Backups</span>
                    <span>3.1TB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>System Backups</span>
                    <span>1.1TB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Backup Activity</CardTitle>
              <CardDescription>
                Timeline of recent backup operations and events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 minutes ago", event: "Daily database backup completed", status: "success" },
                  { time: "1 hour ago", event: "Incremental backup started", status: "info" },
                  { time: "3 hours ago", event: "File backup failed - insufficient storage", status: "error" },
                  { time: "6 hours ago", event: "System configuration backup completed", status: "success" },
                  { time: "12 hours ago", event: "Weekly full backup started", status: "info" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.event}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Backup Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Backup Job</DialogTitle>
            <DialogDescription>
              Configure a new backup job with schedule and retention settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backup-name">Job Name</Label>
                <Input id="backup-name" placeholder="Enter backup job name" />
              </div>
              <div>
                <Label htmlFor="backup-type">Backup Type</Label>
                <Select defaultValue="full">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full Backup</SelectItem>
                    <SelectItem value="incremental">Incremental</SelectItem>
                    <SelectItem value="differential">Differential</SelectItem>
                    <SelectItem value="snapshot">Snapshot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="backup-description">Description</Label>
              <Textarea 
                id="backup-description" 
                placeholder="Describe what this backup job covers"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="backup-source">Source</Label>
                <Select defaultValue="database">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="database">Database</SelectItem>
                    <SelectItem value="files">Application Files</SelectItem>
                    <SelectItem value="system">System Configuration</SelectItem>
                    <SelectItem value="logs">Log Files</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="backup-destination">Destination</Label>
                <Select defaultValue="s3">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Options</h4>
              <div className="flex items-center space-x-2">
                <Switch id="compression" defaultChecked />
                <Label htmlFor="compression">Enable compression</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="encryption" defaultChecked />
                <Label htmlFor="encryption">Enable encryption</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="schedule" />
                <Label htmlFor="schedule">Enable automatic scheduling</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleCreateBackup({})} disabled={isLoading}>
              <Plus className="h-4 w-4 mr-2" />
              Create Backup Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Dialog */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore from Backup</DialogTitle>
            <DialogDescription>
              Select a restore point and confirm the restore operation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="restore-point">Restore Point</Label>
              <Select value={selectedRestorePoint} onValueChange={setSelectedRestorePoint}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a restore point" />
                </SelectTrigger>
                <SelectContent>
                  {restorePoints.filter(rp => rp.status === "available").map((point) => (
                    <SelectItem key={point.id} value={point.id}>
                      {point.name} - {point.size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedRestorePoint && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Warning</span>
                </div>
                <p className="text-sm text-yellow-700">
                  This operation will restore data from the selected backup point. 
                  Current data may be overwritten. Please ensure you have a recent backup before proceeding.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleRestoreFromPoint(selectedRestorePoint)}
              disabled={!selectedRestorePoint || isLoading}
              variant="destructive"
            >
              <Upload className="h-4 w-4 mr-2" />
              Confirm Restore
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
