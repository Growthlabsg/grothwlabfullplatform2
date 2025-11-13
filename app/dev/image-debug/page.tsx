"use client"

import { useState } from "react"
import { ImageDiagnostics } from "@/components/debug/image-diagnostics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ImageDebugPage() {
  // Common image paths from your project
  const defaultImagePaths = [
    "/growthlab-logo.png",
    "/placeholder.svg",
    "/images/growthlab-logo.png",
    "/public/growthlab-logo.png",
    "/public/images/growthlab-logo.png",
    "/diverse-group.png",
    "/professional-woman-diverse.png",
    "/tech-professional.png",
  ]

  const [imagePaths, setImagePaths] = useState<string[]>(defaultImagePaths)
  const [newPath, setNewPath] = useState("")

  const addPath = () => {
    if (newPath && !imagePaths.includes(newPath)) {
      setImagePaths([...imagePaths, newPath])
      setNewPath("")
    }
  }

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold">Image Debug Tool</h1>
      <p className="text-muted-foreground">
        Use this tool to diagnose image loading issues in your deployed application.
      </p>

      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label htmlFor="image-path">Add image path to test</Label>
          <Input
            id="image-path"
            value={newPath}
            onChange={(e) => setNewPath(e.target.value)}
            placeholder="/path/to/image.png"
          />
        </div>
        <Button onClick={addPath}>Add</Button>
      </div>

      <ImageDiagnostics imagePaths={imagePaths} />

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Common Image Issues & Solutions</h2>
        <ul className="space-y-3 list-disc pl-5">
          <li>
            <strong>Incorrect paths:</strong> Ensure images are referenced from the root (/) and exist in the public
            directory.
          </li>
          <li>
            <strong>Missing public directory:</strong> Make sure your build process includes the public directory.
          </li>
          <li>
            <strong>Next.js Image component:</strong> Check that domains are properly configured in next.config.js for
            external images.
          </li>
          <li>
            <strong>Case sensitivity:</strong> Some deployment platforms are case-sensitive. Ensure filenames match
            exactly.
          </li>
          <li>
            <strong>Build caching:</strong> Try clearing deployment caches if images were recently added.
          </li>
        </ul>
      </div>
    </div>
  )
}
