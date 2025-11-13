"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ImageDebugProps {
  src: string
  alt?: string
}

export function ImageDebugHelper({ src, alt = "Debug image" }: ImageDebugProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [details, setDetails] = useState<string>("")

  useEffect(() => {
    const checkImage = async () => {
      try {
        const res = await fetch(src, { method: "HEAD" })
        if (res.ok) {
          setStatus("success")
          setDetails(`Status: ${res.status}, Content-Type: ${res.headers.get("content-type")}`)
        } else {
          setStatus("error")
          setDetails(`Failed with status: ${res.status}`)
        }
      } catch (error) {
        setStatus("error")
        setDetails(`Error: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    if (src) {
      checkImage()
    }
  }, [src])

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Image Debug Tool</CardTitle>
        <CardDescription>
          Testing image loading for: <code className="text-xs break-all">{src}</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="p-2 border rounded">
            <p className="text-sm">
              Status:{" "}
              {status === "loading" ? "Checking..." : status === "success" ? "Image found ✅" : "Image not found ❌"}
            </p>
            <p className="text-xs">{details}</p>
          </div>
          <div className="border p-4 flex items-center justify-center">
            {status === "success" ? (
              <img
                src={src || "/placeholder.svg"}
                alt={alt}
                className="max-w-full h-auto"
                style={{ maxHeight: "200px" }}
              />
            ) : (
              <div className="text-sm text-muted-foreground">Image preview unavailable</div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant="outline" onClick={() => window.open(src, "_blank")}>
          Open direct link
        </Button>
      </CardFooter>
    </Card>
  )
}
