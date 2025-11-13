"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { checkImageExists } from "@/utils/image-debug"

interface ImageDiagnosticsProps {
  imagePaths: string[]
}

export function ImageDiagnostics({ imagePaths }: ImageDiagnosticsProps) {
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    const newResults: Record<string, boolean> = {}

    for (const path of imagePaths) {
      newResults[path] = await checkImageExists(path)
    }

    setResults(newResults)
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Image Loading Diagnostics</CardTitle>
        <CardDescription>Check if images are accessible from the server</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={runDiagnostics} disabled={loading} className="mb-4">
            {loading ? "Checking..." : "Run Diagnostics"}
          </Button>

          {Object.keys(results).length > 0 && (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">Image Path</th>
                    <th className="p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results).map(([path, exists]) => (
                    <tr key={path} className="border-t">
                      <td className="p-2 font-mono text-sm break-all">{path}</td>
                      <td className="p-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${exists ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {exists ? "Available" : "Not Found"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        This tool helps identify which images are not loading correctly.
      </CardFooter>
    </Card>
  )
}
