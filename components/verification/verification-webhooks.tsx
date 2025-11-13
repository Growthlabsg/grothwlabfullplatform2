"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Webhook, Plus, Trash2, RefreshCw, AlertCircle, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react"

interface WebhookConfig {
  id: string
  name: string
  url: string
  secret: string
  active: boolean
  events: string[]
  createdAt: string
  lastTriggered?: string
  lastStatus?: "success" | "failed"
}

export function VerificationWebhooks() {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: "wh-001",
      name: "CRM Integration",
      url: "https://example.com/webhooks/verification",
      secret: "whsec_abcdefghijklmnopqrstuvwxyz123456",
      active: true,
      events: ["verification.approved", "verification.rejected"],
      createdAt: "2023-11-15",
      lastTriggered: "2023-12-10",
      lastStatus: "success",
    },
    {
      id: "wh-002",
      name: "Analytics Platform",
      url: "https://analytics.example.org/api/webhooks",
      secret: "whsec_123456abcdefghijklmnopqrstuvwxyz",
      active: false,
      events: ["verification.approved", "verification.rejected", "verification.expired", "verification.requested"],
      createdAt: "2023-10-20",
      lastTriggered: "2023-11-05",
      lastStatus: "failed",
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false)
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookConfig | null>(null)
  const [newWebhook, setNewWebhook] = useState<Omit<WebhookConfig, "id" | "createdAt">>({
    name: "",
    url: "",
    secret: "",
    active: true,
    events: [],
  })
  const [showSecret, setShowSecret] = useState(false)
  const [testEvent, setTestEvent] = useState<string>("verification.approved")
  const [testResult, setTestResult] = useState<{ status: "success" | "failed"; message: string } | null>(null)

  // Generate a random webhook secret
  const generateSecret = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    let secret = "whsec_"
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return secret
  }

  // Handle adding a new webhook
  const handleAddWebhook = () => {
    const webhook: WebhookConfig = {
      id: `wh-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0],
      ...newWebhook,
    }

    setWebhooks([...webhooks, webhook])
    setNewWebhook({
      name: "",
      url: "",
      secret: "",
      active: true,
      events: [],
    })
    setIsAddDialogOpen(false)
  }

  // Handle deleting a webhook
  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter((webhook) => webhook.id !== id))
  }

  // Handle toggling webhook active state
  const handleToggleActive = (id: string, active: boolean) => {
    setWebhooks(webhooks.map((webhook) => (webhook.id === id ? { ...webhook, active } : webhook)))
  }

  // Handle testing a webhook
  const handleTestWebhook = () => {
    if (!selectedWebhook) return

    // Simulate webhook test
    setTimeout(() => {
      const success = Math.random() > 0.3 // 70% chance of success
      setTestResult({
        status: success ? "success" : "failed",
        message: success
          ? "Webhook test successful. Received 200 OK response."
          : "Webhook test failed. Received 500 Internal Server Error response.",
      })
    }, 1500)
  }

  // Available webhook events
  const availableEvents = [
    { id: "verification.requested", label: "Verification Requested" },
    { id: "verification.approved", label: "Verification Approved" },
    { id: "verification.rejected", label: "Verification Rejected" },
    { id: "verification.expired", label: "Verification Expired" },
    { id: "verification.info_requested", label: "Additional Info Requested" },
    { id: "verification.document_uploaded", label: "Document Uploaded" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-medium">Verification Webhooks</h3>
          <p className="text-sm text-muted-foreground">
            Configure webhooks to notify external systems about verification status changes
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Webhook
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Endpoints</CardTitle>
          <CardDescription>Manage webhook endpoints that receive verification event notifications</CardDescription>
        </CardHeader>
        <CardContent>
          {webhooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Webhook className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No webhooks configured</h3>
              <p className="text-sm text-muted-foreground max-w-md mt-2">
                Add a webhook endpoint to receive real-time notifications about verification status changes.
              </p>
              <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Webhook
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Triggered</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell>
                      <div className="font-medium">{webhook.name}</div>
                      <div className="text-xs text-muted-foreground">ID: {webhook.id}</div>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">{webhook.url}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.length > 2 ? (
                          <>
                            <Badge variant="outline" className="text-xs">
                               {(webhook.events[0] ? webhook.events[0].split : undefined)?.(".")[1]}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                               {(webhook.events[1] ? webhook.events[1].split : undefined)?.(".")[1]}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              +{webhook.events.length - 2} more
                            </Badge>
                          </>
                        ) : (
                          webhook.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event.split(".")[1]}
                            </Badge>
                          ))
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={webhook.active}
                          onCheckedChange={(checked) => handleToggleActive(webhook.id, checked)}
                        />
                        <span className={webhook.active ? "text-green-600" : "text-muted-foreground"}>
                          {webhook.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {webhook.lastTriggered ? (
                        <div className="flex items-center gap-1">
                          <span>{webhook.lastTriggered}</span>
                          {webhook.lastStatus && (
                            <Badge
                              variant="outline"
                              className={
                                webhook.lastStatus === "success"
                                  ? "bg-green-100 text-green-800 border-green-300"
                                  : "bg-red-100 text-red-800 border-red-300"
                              }
                            >
                              {webhook.lastStatus === "success" ? (
                                <CheckCircle className="mr-1 h-3 w-3" />
                              ) : (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              {webhook.lastStatus}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Never</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedWebhook(webhook)
                            setIsTestDialogOpen(true)
                          }}
                        >
                          <RefreshCw className="mr-1 h-3 w-3" /> Test
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteWebhook(webhook.id)}>
                          <Trash2 className="mr-1 h-3 w-3" /> Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Payload Example</CardTitle>
          <CardDescription>Example of the payload that will be sent to your webhook endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
            {JSON.stringify(
              {
                id: "evt_verification_123456",
                type: "verification.approved",
                created: new Date().toISOString(),
                data: {
                  verification: {
                    id: "VR-001",
                    companyName: "FinTech Flow",
                    status: "approved",
                    dateSubmitted: "2023-12-10",
                    reviewedAt: new Date().toISOString(),
                    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                  },
                },
              },
              null,
              2,
            )}
          </pre>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            <AlertCircle className="inline-block mr-1 h-4 w-4" /> Webhooks are signed using the webhook secret. Verify
            the signature in the <code>X-GrowthLab-Signature</code> header to ensure the request is authentic.
          </p>
        </CardFooter>
      </Card>

      {/* Add Webhook Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Webhook</DialogTitle>
            <DialogDescription>
              Add a new webhook endpoint to receive verification event notifications
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Webhook Name</Label>
              <Input
                id="name"
                placeholder="e.g., CRM Integration"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Endpoint URL</Label>
              <Input
                id="url"
                placeholder="https://example.com/webhooks/verification"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">The URL that will receive webhook POST requests</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secret">Webhook Secret</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="secret"
                    type={showSecret ? "text" : "password"}
                    value={newWebhook.secret || ""}
                    onChange={(e) => setNewWebhook({ ...newWebhook, secret: e.target.value })}
                    placeholder="whsec_..."
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewWebhook({ ...newWebhook, secret: generateSecret() })}
                >
                  Generate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Used to sign the webhook payload for security verification
              </p>
            </div>
            <div className="space-y-2">
              <Label>Events to Subscribe</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`event-${event.id}`}
                      checked={newWebhook.events.includes(event.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewWebhook({
                            ...newWebhook,
                            events: [...newWebhook.events, event.id],
                          })
                        } else {
                          setNewWebhook({
                            ...newWebhook,
                            events: newWebhook.events.filter((e) => e !== event.id),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={`event-${event.id}`} className="text-sm">
                      {event.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newWebhook.active}
                onCheckedChange={(checked) => setNewWebhook({ ...newWebhook, active: checked })}
              />
              <Label htmlFor="active">Webhook Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddWebhook}
              disabled={!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0}
            >
              Add Webhook
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Webhook Dialog */}
      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Test Webhook</DialogTitle>
            <DialogDescription>Send a test event to the webhook endpoint {selectedWebhook?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="test-event">Event Type</Label>
              <Select value={testEvent} onValueChange={setTestEvent}>
                <SelectTrigger id="test-event">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {availableEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {testResult && (
              <Alert
                variant={testResult.status === "success" ? "default" : "destructive"}
                className={
                  testResult.status === "success"
                    ? "bg-green-50 text-green-800 border-green-200"
                    : "bg-red-50 text-red-800 border-red-200"
                }
              >
                {testResult.status === "success" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>{testResult.status === "success" ? "Success" : "Failed"}</AlertTitle>
                <AlertDescription>{testResult.message}</AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={handleTestWebhook}>{testResult ? "Test Again" : "Send Test Event"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
