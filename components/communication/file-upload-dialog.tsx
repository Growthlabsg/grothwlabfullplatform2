"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ImageIcon, type File, FileText, Video, UploadCloud } from "lucide-react"

interface FileUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FileUploadDialog({ open, onOpenChange }: FileUploadDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = () => {
    if (selectedFiles.length === 0) return

    setUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
        onOpenChange(false)
        setSelectedFiles([])
        setUploadProgress(0)
      }
    }, 200)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="files">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="camera">Camera</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="pt-4">
            <div className="space-y-4">
              <div
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, DOC, XLS, TXT (up to 10MB)</p>
                <Input id="file-upload" type="file" className="hidden" onChange={handleFileSelect} multiple />
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected files:</p>
                  {selectedFiles.map((file, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {uploading && (
                <div className="space-y-2">
                  <p className="text-sm">Uploading...</p>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="photos" className="pt-4">
            <div
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById("photo-upload")?.click()}
            >
              <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload photos</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, GIF (up to 5MB)</p>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
                multiple
              />
            </div>
          </TabsContent>

          <TabsContent value="media" className="pt-4">
            <div
              className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => document.getElementById("media-upload")?.click()}
            >
              <Video className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">Click to upload media</p>
              <p className="text-xs text-muted-foreground">MP4, MOV, MP3 (up to 50MB)</p>
              <Input
                id="media-upload"
                type="file"
                accept="video/*,audio/*"
                className="hidden"
                onChange={handleFileSelect}
                multiple
              />
            </div>
          </TabsContent>

          <TabsContent value="camera" className="pt-4">
            <div className="flex flex-col items-center justify-center h-40">
              <p className="text-muted-foreground">Camera access is not available in this demo</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={selectedFiles.length === 0 || uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
