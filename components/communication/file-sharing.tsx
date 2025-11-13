"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import {
  Upload,
  Download,
  File,
  Image as ImageIcon,
  Video as VideoIcon,
  Music,
  FileText,
  Archive,
  X,
  Check,
  AlertCircle,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Trash2,
  Edit,
  Star,
  Pin,
  Archive as ArchiveIcon,
} from "lucide-react"

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  url?: string
  thumbnail?: string
  uploadedAt: Date
  uploadedBy: string
  isEncrypted?: boolean
  isPublic?: boolean
  downloadCount: number
  isPinned?: boolean
  isStarred?: boolean
  securityLevel?: "public" | "private" | "confidential" | "restricted"
}

interface FileSharingProps {
  onFileUpload: (files: File[]) => void
  onFileDownload: (fileId: string) => void
  onFileDelete: (fileId: string) => void
  onFileShare: (fileId: string, permissions: string[]) => void
  className?: string
}

export function FileSharing({
  onFileUpload,
  onFileDownload,
  onFileDelete,
  onFileShare,
  className,
}: FileSharingProps) {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "presentation.pdf",
      size: 2048576,
      type: "application/pdf",
      uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      uploadedBy: "Sarah Chen",
      downloadCount: 12,
      isPinned: true,
      isStarred: false,
      securityLevel: "private"
    },
    {
      id: "2",
      name: "team-photo.jpg",
      size: 1048576,
      type: "image/jpeg",
      uploadedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      uploadedBy: "Alex Wong",
      downloadCount: 8,
      isPinned: false,
      isStarred: true,
      securityLevel: "public"
    },
    {
      id: "3",
      name: "meeting-recording.mp4",
      size: 52428800,
      type: "video/mp4",
      uploadedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      uploadedBy: "Maria Garcia",
      downloadCount: 5,
      isPinned: false,
      isStarred: false,
      securityLevel: "confidential"
    }
  ])
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showSecurityDialog, setShowSecurityDialog] = useState(false)
  const [selectedFileForSecurity, setSelectedFileForSecurity] = useState<FileItem | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
    if (type.startsWith('video/')) return <VideoIcon className="h-4 w-4" />
    if (type.startsWith('audio/')) return <Music className="h-4 w-4" />
    if (type.includes('pdf')) return <FileText className="h-4 w-4" />
    if (type.includes('zip') || type.includes('rar')) return <Archive className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  const getFileColor = (type: string) => {
    if (type.startsWith('image/')) return "bg-blue-100 text-blue-600"
    if (type.startsWith('video/')) return "bg-purple-100 text-purple-600"
    if (type.startsWith('audio/')) return "bg-green-100 text-green-600"
    if (type.includes('pdf')) return "bg-red-100 text-red-600"
    if (type.includes('zip') || type.includes('rar')) return "bg-orange-100 text-orange-600"
    return "bg-gray-100 text-gray-600"
  }

  const getSecurityColor = (level: string) => {
    switch (level) {
      case "public": return "bg-green-100 text-green-800"
      case "private": return "bg-blue-100 text-blue-800"
      case "confidential": return "bg-yellow-100 text-yellow-800"
      case "restricted": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileUpload(droppedFiles)
  }, [])

  const handleFileUpload = (files: File[]) => {
    files.forEach((file, index) => {
      const fileId = `upload-${Date.now()}-${index}`
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev[fileId] + Math.random() * 20
          if (newProgress >= 100) {
            clearInterval(interval)
            // Add file to list
            const newFile: FileItem = {
              id: fileId,
              name: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: new Date(),
              uploadedBy: "You",
              downloadCount: 0,
              isPinned: false,
              isStarred: false,
              securityLevel: "private"
            }
            setFiles(prev => [newFile, ...prev])
            setUploadProgress(prev => {
              const { [fileId]: _, ...rest } = prev
              return rest
            })
          }
          return { ...prev, [fileId]: newProgress }
        })
      }, 200)
    })
  }

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    )
  }

  const handleBulkAction = (action: 'download' | 'delete' | 'share') => {
    selectedFiles.forEach(fileId => {
      switch (action) {
        case 'download':
          onFileDownload(fileId)
          break
        case 'delete':
          onFileDelete(fileId)
          setFiles(prev => prev.filter(f => f.id !== fileId))
          break
        case 'share':
          onFileShare(fileId, ['read'])
          break
      }
    })
    setSelectedFiles([])
  }

  const toggleFilePin = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, isPinned: !f.isPinned } : f
    ))
  }

  const toggleFileStar = (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, isStarred: !f.isStarred } : f
    ))
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Zone */}
      <Card className={cn(
        "transition-all duration-200",
        isDragOver && "ring-2 ring-[#00A884] bg-green-50"
      )}>
        <CardContent className="p-6">
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="text-center"
          >
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
            <p className="text-sm text-gray-500 mb-4">
              Support for images, videos, documents, and archives
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || [])
                if (files.length > 0) {
                  handleFileUpload(files)
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileId, progress]) => (
            <Card key={fileId} className="p-3">
              <div className="flex items-center space-x-3">
                <Upload className="h-4 w-4 text-[#00A884]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-xs text-gray-500">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Bulk Actions */}
      {selectedFiles.length > 0 && (
        <Card className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {selectedFiles.length} file(s) selected
            </span>
            <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
                onClick={() => handleBulkAction('download')}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
            </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('share')}
              >
                <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('delete')}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
          </Button>
        </div>
      </div>
        </Card>
      )}

      {/* File List */}
      <div className="space-y-2">
        {files.map((file) => (
          <Card
            key={file.id}
            className={cn(
              "transition-all duration-200 hover:shadow-md",
              selectedFiles.includes(file.id) && "ring-2 ring-[#00A884]"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => handleFileSelect(file.id)}
                  className="h-4 w-4"
                />

                <div className={cn("p-2 rounded-lg", getFileColor(file.type))}>
                  {getFileIcon(file.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium truncate">{file.name}</h4>
                    {file.isPinned && <Pin className="h-4 w-4 text-yellow-500" />}
                    {file.isStarred && <Star className="h-4 w-4 text-yellow-500" />}
                    {file.isEncrypted && <Lock className="h-4 w-4 text-green-500" />}
          </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{file.uploadedBy}</span>
                    <span>{file.downloadCount} downloads</span>
                    <Badge className={getSecurityColor(file.securityLevel!)}>
                      {file.securityLevel}
                    </Badge>
        </div>
      </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFileStar(file.id)}
                  >
                    <Star className={cn("h-4 w-4", file.isStarred && "fill-yellow-400 text-yellow-500")} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFilePin(file.id)}
                  >
                    <Pin className={cn("h-4 w-4", file.isPinned && "text-yellow-500")} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileDownload(file.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileShare(file.id, ['read'])}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedFileForSecurity(file)
                      setShowSecurityDialog(true)
                    }}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onFileDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  </div>
                  </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Dialog */}
      {showSecurityDialog && selectedFileForSecurity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>File Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
        <div>
                <label className="text-sm font-medium">Security Level</label>
                <select className="w-full mt-1 p-2 border rounded">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="confidential">Confidential</option>
                  <option value="restricted">Restricted</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="encrypt" />
                <label htmlFor="encrypt" className="text-sm">Encrypt file</label>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="watermark" />
                <label htmlFor="watermark" className="text-sm">Add watermark</label>
        </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSecurityDialog(false)}
                >
                  Cancel
            </Button>
                <Button onClick={() => setShowSecurityDialog(false)}>
                  Save
            </Button>
              </div>
            </CardContent>
          </Card>
          </div>
        )}
    </div>
  )
}
