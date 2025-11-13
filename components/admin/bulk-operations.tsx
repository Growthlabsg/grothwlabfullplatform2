"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { bulkExport, convertToCSV, parseCSV } from "@/lib/bulk-operations"
import { logActivity } from "@/lib/activity-logger"

export function BulkOperations() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("import")
  const [entityType, setEntityType] = useState("users")
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)

      // Read file content
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        setCsvData(content)
      }
      reader.readAsText(selectedFile)
    }
  }

  const handleImport = async () => {
    if (!file || !csvData || !user) {
      setError("Please select a valid CSV file")
      return
    }

    setIsLoading(true)
    setProgress(0)
    setError("")
    setResult(null)

    try {
      // Parse CSV data
      const items = parseCSV(csvData)

      if (items.length === 0) {
        throw new Error("No valid data found in the CSV file")
      }

      // Mock import function for demo
      const importFunction = async (item: any) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 100))
        return item
      }

      // Start import with progress updates
      const totalItems = items.length
      let processedItems = 0

      const updateProgress = () => {
        processedItems++
        const newProgress = Math.round((processedItems / totalItems) * 100)
        setProgress(newProgress)
      }

      // Process items in batches
      const batchSize = 10
      const batches = Math.ceil(totalItems / batchSize)

      for (let i = 0; i < batches; i++) {
        const start = i * batchSize
        const end = Math.min(start + batchSize, totalItems)
        const batchItems = items.slice(start, end)

        // Process batch
        await Promise.all(
          batchItems.map(async (item) => {
            await importFunction(item)
            updateProgress()
          }),
        )
      }

      // Log the activity
      logActivity(
        "data_import" as any,
        user.id,
        user.email,
        `Bulk import of ${entityType}: ${totalItems} items processed`,
        { entityType, totalItems },
        "info",
      )

      setResult({
        success: true,
        totalItems,
        successCount: totalItems,
        failCount: 0,
        timestamp: new Date().toISOString(),
      })
    } catch (err) {
      console.error("Import error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during import")

      // Log the error
      logActivity(
        "data_import" as any,
        user.id,
        user.email,
        `Bulk import of ${entityType} failed`,
        { entityType, error: err instanceof Error ? err.message : String(err) },
        "error",
      )
    } finally {
      setIsLoading(false)
      setProgress(100)
    }
  }

  const handleExport = async () => {
    if (!user) return

    setIsLoading(true)
    setError("")
    setResult(null)

    try {
      // Mock export function for demo
      const exportFunction = async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate sample data based on entity type
        const sampleData = []
        for (let i = 1; i <= 50; i++) {
          if (entityType === "users") {
            sampleData.push({
              id: `user-${i}`,
              name: `User ${i}`,
              email: `user${i}@example.com`,
              role: i % 3 === 0 ? "admin" : i % 2 === 0 ? "investor" : "startup",
              createdAt: new Date().toISOString(),
            })
          } else if (entityType === "startups") {
            sampleData.push({
              id: `startup-${i}`,
              name: `Startup ${i}`,
              industry: i % 4 === 0 ? "Fintech" : i % 3 === 0 ? "Healthcare" : i % 2 === 0 ? "EdTech" : "SaaS",
              stage: i % 3 === 0 ? "Seed" : i % 2 === 0 ? "Series A" : "Pre-seed",
              foundedDate: new Date().toISOString(),
            })
          } else if (entityType === "events") {
            sampleData.push({
              id: `event-${i}`,
              title: `Event ${i}`,
              date: new Date(Date.now() + i * 86400000).toISOString(),
              location: i % 2 === 0 ? "Online" : "Singapore",
              capacity: 50 + i * 10,
            })
          }
        }

        return sampleData
      }

      const exportResult = await bulkExport(exportFunction, user.id, user.email, entityType)
      const csv = convertToCSV(exportResult.data)

      // Create download link
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${entityType}_export_${new Date().toISOString().split("T")[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setResult({
        success: true,
        totalItems: exportResult.data.length,
        timestamp: exportResult.timestamp,
      })
    } catch (err) {
      console.error("Export error:", err)
      setError(err instanceof Error ? err.message : "An error occurred during export")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Operations</CardTitle>
        <CardDescription>Import and export data in bulk</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="import" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="importEntityType">Select Entity Type</Label>
              <Select value={entityType} onValueChange={setEntityType}>
                <SelectTrigger id="importEntityType">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="startups">Startups</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="courses">Courses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="csvFile">Upload CSV File</Label>
              <div className="flex items-center gap-2">
                <Input id="csvFile" type="file" accept=".csv" onChange={handleFileChange} disabled={isLoading} />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => document.getElementById("csvFile")?.click()}
                  disabled={isLoading}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Upload a CSV file with headers matching the required fields for {entityType}
              </p>
            </div>

            {file && (
              <div className="space-y-2">
                <Label htmlFor="csvPreview">CSV Preview</Label>
                <Textarea
                  id="csvPreview"
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  className="font-mono text-xs"
                  rows={10}
                  disabled={isLoading}
                />
              </div>
            )}

            {isLoading && (
              <div className="space-y-2">
                <Label>Import Progress</Label>
                <Progress value={progress} className="h-2 w-full" />
                <p className="text-xs text-muted-foreground">{progress}% complete</p>
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && result.success && (
              <Alert className="bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Import Successful</AlertTitle>
                <AlertDescription>
                  Successfully imported {result.successCount} of {result.totalItems} items.
                  {result.failCount > 0 && ` Failed to import ${result.failCount} items.`}
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exportEntityType">Select Entity Type</Label>
              <Select value={entityType} onValueChange={setEntityType}>
                <SelectTrigger id="exportEntityType">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="startups">Startups</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="courses">Courses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Export Options</Label>
              <div className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="includeDeleted" />
                  <Label htmlFor="includeDeleted">Include deleted items</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="includeMetadata" />
                  <Label htmlFor="includeMetadata">Include metadata</Label>
                </div>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {result && result.success && (
              <Alert className="bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertTitle>Export Successful</AlertTitle>
                <AlertDescription>
                  Successfully exported {result.totalItems} items. The download should start automatically.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {activeTab === "import" ? (
          <Button onClick={handleImport} disabled={!file || isLoading} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
            {isLoading ? "Importing..." : "Import Data"}
          </Button>
        ) : (
          <Button onClick={handleExport} disabled={isLoading} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
            {isLoading ? "Exporting..." : "Export Data"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
