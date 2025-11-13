"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Bell, Plus, X, Edit2, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JobAlertsPage() {
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: "alert1",
      name: "Full Stack Developer",
      keywords: ["React", "Node.js", "TypeScript"],
      locations: ["Singapore", "Remote"],
      jobTypes: ["Full-time", "Contract"],
      frequency: "daily",
      isActive: true,
      createdAt: "2023-05-15T08:00:00Z",
    },
    {
      id: "alert2",
      name: "Product Manager",
      keywords: ["Product Management", "Agile", "SaaS"],
      locations: ["Singapore"],
      jobTypes: ["Full-time"],
      frequency: "weekly",
      isActive: true,
      createdAt: "2023-06-02T10:30:00Z",
    },
  ])

  const [newAlert, setNewAlert] = useState({
    name: "",
    keywords: [] as string[],
    locations: [] as string[],
    jobTypes: [] as string[],
    frequency: "daily",
    isActive: true,
  })

  const [currentKeyword, setCurrentKeyword] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [editingAlertId, setEditingAlertId] = useState<string | null>(null)

  const { toast } = useToast()

  const handleAddKeyword = () => {
    if (currentKeyword.trim() && !newAlert.keywords.includes(currentKeyword.trim())) {
      setNewAlert((prev) => ({
        ...prev,
        keywords: [...prev.keywords, currentKeyword.trim()],
      }))
      setCurrentKeyword("")
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setNewAlert((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const handleLocationChange = (location: string) => {
    if (newAlert.locations.includes(location)) {
      setNewAlert((prev) => ({
        ...prev,
        locations: prev.locations.filter((l) => l !== location),
      }))
    } else {
      setNewAlert((prev) => ({
        ...prev,
        locations: [...prev.locations, location],
      }))
    }
  }

  const handleJobTypeChange = (jobType: string) => {
    if (newAlert.jobTypes.includes(jobType)) {
      setNewAlert((prev) => ({
        ...prev,
        jobTypes: prev.jobTypes.filter((t) => t !== jobType),
      }))
    } else {
      setNewAlert((prev) => ({
        ...prev,
        jobTypes: [...prev.jobTypes, jobType],
      }))
    }
  }

  const handleCreateAlert = () => {
    if (!newAlert.name) {
      toast({
        title: "Alert name required",
        description: "Please provide a name for your job alert.",
        variant: "destructive",
      })
      return
    }

    if (newAlert.keywords.length === 0) {
      toast({
        title: "Keywords required",
        description: "Please add at least one keyword for your job alert.",
        variant: "destructive",
      })
      return
    }

    const newId = `alert${Date.now()}`

    if (editingAlertId) {
      // Update existing alert
      setActiveAlerts((prev) =>
        prev.map((alert) =>
          alert.id === editingAlertId ? { ...newAlert, id: editingAlertId, createdAt: alert.createdAt } : alert,
        ),
      )

      toast({
        title: "Alert updated",
        description: `Your job alert "${newAlert.name}" has been updated.`,
      })
    } else {
      // Create new alert
      setActiveAlerts((prev) => [
        ...prev,
        {
          ...newAlert,
          id: newId,
          createdAt: new Date().toISOString(),
        },
      ])

      toast({
        title: "Alert created",
        description: `Your job alert "${newAlert.name}" has been created.`,
      })
    }

    setNewAlert({
      name: "",
      keywords: [],
      locations: [],
      jobTypes: [],
      frequency: "daily",
      isActive: true,
    })
    setIsCreating(false)
    setEditingAlertId(null)
  }

  const handleEditAlert = (alertId: string) => {
    const alertToEdit = activeAlerts.find((alert) => alert.id === alertId)
    if (alertToEdit) {
      setNewAlert({
        name: alertToEdit.name,
        keywords: [...alertToEdit.keywords],
        locations: [...alertToEdit.locations],
        jobTypes: [...alertToEdit.jobTypes],
        frequency: alertToEdit.frequency,
        isActive: alertToEdit.isActive,
      })
      setEditingAlertId(alertId)
      setIsCreating(true)
    }
  }

  const handleDeleteAlert = (alertId: string) => {
    setActiveAlerts((prev) => prev.filter((alert) => alert.id !== alertId))
    toast({
      title: "Alert deleted",
      description: "Your job alert has been deleted.",
    })
  }

  const handleToggleAlert = (alertId: string) => {
    setActiveAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert)),
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/jobs" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Job Alerts</h1>
              <p className="text-[#334155] max-w-3xl">
                Create personalized job alerts to get notified when new jobs matching your criteria are posted.
              </p>
            </div>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                <Plus className="h-4 w-4 mr-2" />
                Create New Alert
              </Button>
            )}
          </div>
        </div>

        {isCreating ? (
          <Card>
            <CardHeader>
              <CardTitle>{editingAlertId ? "Edit Job Alert" : "Create New Job Alert"}</CardTitle>
              <CardDescription>
                Set up your preferences to receive notifications about new job opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="alert-name">Alert Name*</Label>
                  <Input
                    id="alert-name"
                    placeholder="e.g. Full Stack Developer Jobs"
                    value={newAlert.name}
                    onChange={(e) => setNewAlert((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords*</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      id="keywords"
                      placeholder="e.g. React, Node.js, TypeScript"
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddKeyword()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddKeyword} variant="outline">
                      Add
                    </Button>
                  </div>
                  {newAlert.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newAlert.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {keyword}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Locations</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {["Singapore", "Remote", "Hybrid", "Other"].map((location) => (
                      <div key={location} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`location-${location}`}
                          checked={newAlert.locations.includes(location)}
                          onChange={() => handleLocationChange(location)}
                        />
                        <Label htmlFor={`location-${location}`} className="font-normal">
                          {location}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Job Types</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {["Full-time", "Part-time", "Contract", "Internship"].map((jobType) => (
                      <div key={jobType} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`job-type-${jobType}`}
                          checked={newAlert.jobTypes.includes(jobType)}
                          onChange={() => handleJobTypeChange(jobType)}
                        />
                        <Label htmlFor={`job-type-${jobType}`} className="font-normal">
                          {jobType}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="frequency">Alert Frequency</Label>
                  <Select
                    value={newAlert.frequency}
                    onValueChange={(value) => setNewAlert((prev) => ({ ...prev, frequency: value }))}
                  >
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="instant">Instant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="alert-active"
                    checked={newAlert.isActive}
                    onCheckedChange={(checked) => setNewAlert((prev) => ({ ...prev, isActive: checked }))}
                  />
                  <Label htmlFor="alert-active">Alert is active</Label>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false)
                      setEditingAlertId(null)
                      setNewAlert({
                        name: "",
                        keywords: [],
                        locations: [],
                        jobTypes: [],
                        frequency: "daily",
                        isActive: true,
                      })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAlert} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                    {editingAlertId ? "Update Alert" : "Create Alert"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            <Tabs defaultValue="active">
              <TabsList className="mb-6">
                <TabsTrigger value="active">Active Alerts</TabsTrigger>
                <TabsTrigger value="history">Alert History</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                {activeAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {activeAlerts.map((alert) => (
                      <Card key={alert.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium text-lg">{alert.name}</h3>
                                <Badge variant={alert.isActive ? "default" : "outline"} className="text-xs">
                                  {alert.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>

                              <div className="space-y-2">
                                <div>
                                  <span className="text-sm font-medium">Keywords: </span>
                                  <span className="text-sm text-[#334155]">{alert.keywords.join(", ")}</span>
                                </div>

                                {alert.locations.length > 0 && (
                                  <div>
                                    <span className="text-sm font-medium">Locations: </span>
                                    <span className="text-sm text-[#334155]">{alert.locations.join(", ")}</span>
                                  </div>
                                )}

                                {alert.jobTypes.length > 0 && (
                                  <div>
                                    <span className="text-sm font-medium">Job Types: </span>
                                    <span className="text-sm text-[#334155]">{alert.jobTypes.join(", ")}</span>
                                  </div>
                                )}

                                <div className="flex items-center gap-4">
                                  <div>
                                    <span className="text-sm font-medium">Frequency: </span>
                                    <span className="text-sm text-[#334155] capitalize">{alert.frequency}</span>
                                  </div>

                                  <div>
                                    <span className="text-sm font-medium">Created: </span>
                                    <span className="text-sm text-[#334155]">{formatDate(alert.createdAt)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center space-x-2 mr-2">
                                <Switch
                                  id={`toggle-${alert.id}`}
                                  checked={alert.isActive}
                                  onCheckedChange={() => handleToggleAlert(alert.id)}
                                />
                                <Label htmlFor={`toggle-${alert.id}`} className="sr-only">
                                  {alert.isActive ? "Deactivate" : "Activate"} alert
                                </Label>
                              </div>

                              <Button variant="ghost" size="icon" onClick={() => handleEditAlert(alert.id)}>
                                <Edit2 className="h-4 w-4" />
                                <span className="sr-only">Edit alert</span>
                              </Button>

                              <Button variant="ghost" size="icon" onClick={() => handleDeleteAlert(alert.id)}>
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete alert</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Job Alerts Yet</h3>
                      <p className="text-[#334155] mb-4">
                        Create your first job alert to get notified when new jobs matching your criteria are posted.
                      </p>
                      <Button onClick={() => setIsCreating(true)} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Alert
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="history">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-[#334155]">
                      Your alert history will appear here, showing you which alerts have led to job applications.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    )
}
