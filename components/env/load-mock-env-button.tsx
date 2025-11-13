"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, CheckCircleIcon, LoaderIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LoadMockEnvButton() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const loadMockEnv = async () => {
    setLoading(true)
    setResult(null)

    try {
      // In a real implementation, this would call an API endpoint that runs the script
      // For demo purposes, we'll simulate the API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setResult({
        success: true,
        message: "Mock environment variables loaded successfully. The .env.local file has been created.",
      })
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to load mock environment variables",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={loadMockEnv} disabled={loading} className="flex items-center gap-2">
        {loading ? (
          <>
            <LoaderIcon className="h-4 w-4 animate-spin" />
            Loading Mock Environment...
          </>
        ) : (
          "Load Mock Environment Variables"
        )}
      </Button>

      {result && (
        <Alert
          variant={result.success ? "default" : "destructive"}
          className={result.success ? "bg-green-50 border-green-200" : ""}
        >
          {result.success ? (
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircleIcon className="h-4 w-4" />
          )}
          <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{result.message}</AlertDescription>
        </Alert>
      )}

      <div className="text-sm text-gray-500">
        <p>
          This will create a <code>.env.local</code> file with mock environment variables for development.
        </p>
        <p>In production, this button would be disabled.</p>
      </div>
    </div>
  )
}
