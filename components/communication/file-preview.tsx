"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  FileIcon,
  ImageIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileIcon as FilePresentationIcon,
  FileArchiveIcon,
  FileVideoIcon,
  FileAudioIcon,
  Download,
  Eye,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FilePreviewProps {
  file: {
    id: string
    name: string
    type:
      | "image"
      | "document"
      | "spreadsheet"
      | "presentation"
      | "archive"
      | "video"
      | "audio"
      | "pdf"
      | "code"
      | "other"
    size: number
    url: string
    thumbnail?: string
    uploadProgress?: number
  }
  onRemove?: (fileId: string) => void
  onDownload?: (fileId: string) => void
  onPreview?: (fileId: string) => void
  className?: string
  compact?: boolean
}

export function FilePreview({ file, onRemove, onDownload, onPreview, className, compact = false }: FilePreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = () => {
    switch (file.type) {
      case "image":
        return <ImageIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-purple-500")} />
      case "document":
        return <FileTextIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-blue-500")} />
      case "spreadsheet":
        return <FileSpreadsheetIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-green-500")} />
      case "presentation":
        return <FilePresentationIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-orange-500")} />
      case "archive":
        return <FileArchiveIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-yellow-500")} />
      case "video":
        return <FileVideoIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-red-500")} />
      case "audio":
        return <FileAudioIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-pink-500")} />
      default:
        return <FileIcon className={cn(compact ? "h-4 w-4" : "h-5 w-5", "text-gray-500")} />
    }
  }

  const isImage = file.type === "image" && file.thumbnail
  const isUploading = typeof file.uploadProgress === "number" && file.uploadProgress < 100

  return (
    <div
      className={cn("border rounded-md overflow-hidden", isHovered ? "border-primary/50" : "border-border", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isImage ? (
        <div className="relative">
          <img
            src={file.thumbnail || "/placeholder.svg"}
            alt={file.name}
            className={cn("w-full object-cover", compact ? "max-h-24" : "max-h-40")}
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2">
              {onPreview && (
                <Button size="sm" variant="secondary" onClick={() => onPreview(file.id)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
              )}
              {onDownload && (
                <Button size="sm" variant="secondary" onClick={() => onDownload(file.id)}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={cn("flex items-center gap-3 p-3", compact ? "p-2" : "p-3")}>
          {getFileIcon()}
          <div className="flex-1 min-w-0">
            <p className={cn("font-medium truncate", compact ? "text-xs" : "text-sm")}>{file.name}</p>
            <p className={cn("text-muted-foreground truncate", compact ? "text-[10px]" : "text-xs")}>
              {formatFileSize(file.size)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {isHovered && !isUploading && (
              <>
                {onPreview && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(compact ? "h-6 w-6" : "h-8 w-8")}
                    onClick={() => onPreview(file.id)}
                  >
                    <Eye className={cn(compact ? "h-3 w-3" : "h-4 w-4")} />
                  </Button>
                )}
                {onDownload && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(compact ? "h-6 w-6" : "h-8 w-8")}
                    onClick={() => onDownload(file.id)}
                  >
                    <Download className={cn(compact ? "h-3 w-3" : "h-4 w-4")} />
                  </Button>
                )}
              </>
            )}
            {onRemove && (
              <Button
                size="icon"
                variant="ghost"
                className={cn(compact ? "h-6 w-6" : "h-8 w-8")}
                onClick={() => onRemove(file.id)}
              >
                <X className={cn(compact ? "h-3 w-3" : "h-4 w-4")} />
              </Button>
            )}
          </div>
        </div>
      )}

      {isUploading && (
        <div className="p-2">
          <Progress value={file.uploadProgress} className="h-1" />
          <div className="flex justify-between mt-1">
            <span className={cn(compact ? "text-[10px]" : "text-xs", "text-muted-foreground")}>
              {file.uploadProgress}%
            </span>
            <span className={cn(compact ? "text-[10px]" : "text-xs", "text-muted-foreground")}>
              {formatFileSize(file.size * (file.uploadProgress! / 100))} / {formatFileSize(file.size)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
