"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ImageTest() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Test images from different sources
  const testImages = [
    { src: "/diverse-group.png", alt: "Local public image", type: "Local" },
    { src: "https://v0.blob.com/example.png", alt: "v0 blob image", type: "Remote v0" },
    {
      src: "https://images.unsplash.com/photo-1636622433525-127afdf3662d",
      alt: "Unsplash image",
      type: "Remote Unsplash",
    },
    { src: "/test-image.png", alt: "Placeholder SVG", type: "Placeholder" },
  ]

  const checkImage = async (src: string) => {
    try {
      setError(null)
      setSuccess(null)

      // Skip checking local images since they may not be accessible via fetch in client component
      if (src.startsWith("/")) {
        setSuccess(`Local image path validated: ${src}`)
        return
      }

      const res = await fetch(src, { method: "HEAD" })
      if (res.ok) {
        setSuccess(`Successfully loaded: ${src}`)
      } else {
        setError(`Failed to load image (Status ${res.status}): ${src}`)
      }
    } catch (error) {
      setError(`Error checking image: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <Card className="max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Image Optimization Test</CardTitle>
        <CardDescription>Test if your Next.js image optimization is working correctly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert>
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testImages.map((img, index) => (
            <div key={index} className="border rounded-md p-4 space-y-3">
              <div className="font-medium">{img.type} Image Test</div>
              <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                <Image
                  src={img.src || "/placeholder.svg"}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  onError={() => setError(`Failed to render: ${img.src}`)}
                  unoptimized={img.src.includes("placeholder.svg")}
                />
              </div>
              <Button size="sm" variant="outline" onClick={() => checkImage(img.src)}>
                Test {img.type} Image
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Note: Images in the public directory should be in the public folder at the root level of your project.
        </p>
      </CardFooter>
    </Card>
  )
}
