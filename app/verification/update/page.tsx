"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Upload, X, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface FileUpload {
  id: string
  name: string
  type: string
  size: number
  progress: number
  status: "uploading" | "complete" | "error"
  error?: string
}

export default function UpdateVerificationPage() {
  const [uploads, setUploads] = useState<FileUpload[]>([])
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Sample requested information - in a real app, this would come from an API
  const requestedInformation =
    "Please provide additional documentation regarding your business registration and team identification."

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newUploads: FileUpload[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file) {
        newUploads.push({
          id: `upload-${Date.now()}-${i}`,
          name: file.name,
          type: file.type,
          size: file.size,
          progress: 0,
          status: "uploading",
        })
      }
    }

    setUploads([...uploads, ...newUploads])

    // Simulate upload progress
    newUploads.forEach((upload) => {
      const interval = setInterval(() => {
        setUploads((current) =>
          current.map((u) => {
            if (u.id === upload.id) {
              const progress = u.progress + 10
              if (progress >= 100) {
                clearInterval(interval)
                return { ...u, progress: 100, status: "complete" }
              }
              return { ...u, progress }
            }
            return u
          }),
        )
      }, 300)
    })
  }

  // Remove upload
  const removeUpload = (id: string) => {
    setUploads(uploads.filter((upload) => upload.id !== id))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  // Form validation
  const isFormValid = () => {
    return (additionalInfo.trim() !== "" || uploads.length > 0) && uploads.every((upload) => upload.status === "complete")
  }

  if (isSubmitted) {
    return (
              <div className="container mx-auto py-8 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Additional Information Submitted</CardTitle>
              <CardDescription className="text-center">
                Thank you for providing the requested information
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="rounded-full bg-green-100 p-4 mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Thank You!</h3>
              <p className="text-center text-muted-foreground mb-4">
                We've received your additional information. Our team will review it and get back to you soon.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <a href="/verification/status">View Verification Status</a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
    }

  return (
    <div>
      <div className="container mx-auto py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Additional Information</h1>
          <p className="text-muted-foreground">
            Please provide the additional information requested for your verification
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Update Verification Request</CardTitle>
            <CardDescription>Provide the requested additional information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Alert>
                <AlertTitle>Information Requested</AlertTitle>
                <AlertDescription>{requestedInformation}</AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label htmlFor="additional-info" className="text-sm font-medium">
                  Additional Information
                </label>
                <Textarea
                  id="additional-info"
                  placeholder="Provide additional details as requested..."
                  rows={4}
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="documents" className="text-sm font-medium">
                  Upload Documents
                </label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                  <Input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.mp4"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium mb-1">Drag & drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, JPG, PNG, DOC, DOCX, MP4 (max 20MB each)
                    </p>
                  </label>
                </div>
              </div>

              {uploads.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Uploaded Files</h4>
                  {uploads.map((upload) => (
                    <div key={upload.id} className="bg-muted p-2 rounded-md flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{upload.name}</p>
                        <div className="w-full bg-background h-1.5 rounded-full mt-1">
                          <div
                            className={`h-1.5 rounded-full ${upload.status === "error" ? "bg-red-500" : "bg-primary"}`}
                            style={{ width: `${upload.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs">
                        {upload.status === "uploading"
                          ? `${upload.progress}%`
                          : upload.status === "complete"
                            ? "Complete"
                            : "Error"}
                      </span>
                      <Button variant="ghost" size="icon" onClick={() => removeUpload(upload.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" asChild>
                  <a href="/verification/status">Cancel</a>
                </Button>
                <Button type="submit" disabled={isSubmitting || !isFormValid()}>
                  {isSubmitting ? "Submitting..." : "Submit Additional Information"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      
    </div>
  )
}
