"use client"

import type React from "react"

import { useState, useRef } from "react"
import { FileUp, X, File, ImageIcon, FileText, Film, Music, Archive, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FileUploaderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: "uploading" | "complete" | "error"
  url?: string
}

export function FileUploader({ open, onOpenChange }: FileUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [recipient, setRecipient] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    }))

    setFiles((prev) => [...prev, ...newFiles])

    // Simulate file upload progress
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setFiles((prevFiles) => {
          const fileIndex = prevFiles.findIndex((f) => f.id === file.id)
          if (fileIndex === -1) return prevFiles

          const updatedFile = { ...prevFiles[fileIndex] }
          updatedFile.progress += 10

          if (updatedFile.progress >= 100) {
            updatedFile.progress = 100
            updatedFile.status = "complete"
            updatedFile.url = `https://example.com/files/${updatedFile.id}`
            clearInterval(interval)
          }

          const updatedFiles = [...prevFiles]
          updatedFiles[fileIndex] = updatedFile

          return updatedFiles
        })
      }, 300)
    })
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="h-5 w-5" />
    if (type.startsWith("video/")) return <Film className="h-5 w-5" />
    if (type.startsWith("audio/")) return <Music className="h-5 w-5" />
    if (type.startsWith("text/")) return <FileText className="h-5 w-5" />
    if (type.includes("zip") || type.includes("rar") || type.includes("tar") || type.includes("7z")) {
      return <Archive className="h-5 w-5" />
    }
    return <File className="h-5 w-5" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = () => {
    // In a real app, this would send the files to the recipient
    console.log(`Sending ${files.length} files to ${recipient}`)
    onOpenChange(false)
    setFiles([])
    setRecipient("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Files</DialogTitle>
          <DialogDescription>Upload and share files with your contacts or groups.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Send to</Label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sarah-chen">Sarah Chen</SelectItem>
                <SelectItem value="alex-wong">Alex Wong</SelectItem>
                <SelectItem value="mei-lin">Mei Lin</SelectItem>
                <SelectItem value="startup-founders">Startup Founders (Group)</SelectItem>
                <SelectItem value="investor-network">Investor Network (Group)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className={`border-2 border-dashed rounded-md p-6 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center gap-2 text-center cursor-pointer">
              <FileUp className="h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium">Drag and drop files here or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports images, documents, videos, and more (max 50MB)</p>
              <Input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileChange} />
            </div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({files.length})</Label>
              <ScrollArea className="h-[200px] border rounded-md p-2">
                <div className="space-y-2">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-2 border rounded-md">
                      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                        {getFileIcon(file.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                          {file.status === "uploading" ? (
                            <span className="text-xs text-muted-foreground">{file.progress}%</span>
                          ) : file.status === "complete" ? (
                            <span className="text-xs text-green-500 flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Complete
                            </span>
                          ) : (
                            <span className="text-xs text-red-500">Error</span>
                          )}
                        </div>
                        <Progress value={file.progress} className="h-1 mt-1" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile(file.id)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={files.length === 0 || !recipient || files.some((file) => file.status === "uploading")}
          >
            <Upload className="h-4 w-4 mr-2" />
            Send Files
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
