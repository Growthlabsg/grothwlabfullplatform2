"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { FilePermissionSelector, type SecurityLevel } from "./file-permission-selector"
import { format } from "date-fns"
import { CalendarIcon, Check, Copy, Info, RefreshCw, Share, UserPlus, Users, X } from "lucide-react"
import { FilePreview } from "./file-preview"

interface FileSharingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  file?: {
    id: string
    name: string
    type: string
    size: number
    thumbnail?: string
  }
}

export function FileSharingDialog({ open, onOpenChange, file }: FileSharingDialogProps) {
  const [securityLevel, setSecurityLevel] = useState<SecurityLevel>("standard")
  const [shareLink, setShareLink] = useState("")
  const [shareSuccess, setShareSuccess] = useState(false)
  const [sharingInProgress, setSharingInProgress] = useState(false)
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)
  const [accessControls, setAccessControls] = useState({
    preventDownload: false,
    preventPrint: false,
    preventCopy: false,
    watermark: false,
    notifyOnAccess: false,
    requireAuthentication: false,
  })
  const [linkCopied, setLinkCopied] = useState(false)

  // Update access controls when security level changes
  const handleSecurityLevelChange = (level: SecurityLevel) => {
    setSecurityLevel(level)

    // Set default access controls based on security level
    if (level === "restricted") {
      setAccessControls({
        preventDownload: true,
        preventPrint: true,
        preventCopy: true,
        watermark: true,
        notifyOnAccess: true,
        requireAuthentication: true,
      })
      // Set default expiration date for restricted files (30 days)
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
      setExpirationDate(thirtyDaysFromNow)
    } else if (level === "confidential") {
      setAccessControls({
        preventDownload: false,
        preventPrint: false,
        preventCopy: true,
        watermark: false,
        notifyOnAccess: true,
        requireAuthentication: true,
      })
      setExpirationDate(undefined)
    } else {
      // Standard
      setAccessControls({
        preventDownload: false,
        preventPrint: false,
        preventCopy: false,
        watermark: false,
        notifyOnAccess: false,
        requireAuthentication: false,
      })
      setExpirationDate(undefined)
    }
  }

  const handleShare = async () => {
    if (!file) return

    setSharingInProgress(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a mock share link
      const mockShareLink = `https://growthlab.sg/share/${file.id}?security=${securityLevel}&exp=${
        expirationDate ? expirationDate.getTime() : "none"
      }`
      setShareLink(mockShareLink)
      setShareSuccess(true)

      // Log the sharing action with security level
      console.log("File shared with security level:", securityLevel)
      console.log("Recipients:", selectedRecipients)
      console.log("Access controls:", accessControls)
      console.log("Expiration date:", expirationDate)
    } catch (error) {
      console.error("Error sharing file:", error)
    } finally {
      setSharingInProgress(false)
    }
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  // Mock recipients data
  const recipients = [
    { id: "user1", name: "Sarah Chen", email: "sarah.chen@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "user2", name: "David Wong", email: "david.wong@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "user3", name: "Alex Johnson", email: "alex.j@example.com", avatar: "/placeholder.svg?height=32&width=32" },
    { id: "team1", name: "Marketing Team", members: 5, avatar: "/placeholder.svg?height=32&width=32" },
    { id: "team2", name: "Product Team", members: 8, avatar: "/placeholder.svg?height=32&width=32" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="h-5 w-5" />
            Share File Securely
          </DialogTitle>
          <DialogDescription>
            Share {file?.name} with team members or external partners with appropriate security controls
          </DialogDescription>
        </DialogHeader>

        {file && (
          <div className="py-2">
            <FilePreview
              file={{
                id: file.id,
                name: file.name,
                type: file.type.includes("image") ? "image" : "document",
                size: file.size,
                url: "#",
                thumbnail: file.thumbnail,
              }}
              className="mb-4"
            />
          </div>
        )}

        <Tabs defaultValue="people" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="people" className="flex-1">
              <UserPlus className="h-4 w-4 mr-2" />
              Share with People
            </TabsTrigger>
            <TabsTrigger value="link" className="flex-1">
              <Share className="h-4 w-4 mr-2" />
              Get Shareable Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="recipients">Recipients</Label>
              <div className="flex flex-wrap gap-1 p-2 border rounded-md mb-1">
                {selectedRecipients.map((recipientId) => {
                  const recipient = recipients.find((r) => r.id === recipientId)
                  return (
                    <div key={recipientId} className="flex items-center bg-muted px-2 py-1 rounded-md text-sm gap-1">
                      <span>
                        {"members" in recipient!
                          ? `${recipient!.name} (${recipient!.members} members)`
                          : recipient!.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => setSelectedRecipients((prev) => prev.filter((id) => id !== recipientId))}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )
                })}
                <Select
                  onValueChange={(value) => {
                    if (!selectedRecipients.includes(value)) {
                      setSelectedRecipients((prev) => [...prev, value])
                    }
                  }}
                  value=""
                >
                  <SelectTrigger className="border-0 p-0 h-8 w-[180px] focus:ring-0">
                    <SelectValue placeholder="Add people or teams..." />
                  </SelectTrigger>
                  <SelectContent>
                    {recipients
                      .filter((r) => !selectedRecipients.includes(r.id))
                      .map((recipient) => (
                        <SelectItem key={recipient.id} value={recipient.id}>
                          <div className="flex items-center gap-2">
                            {"members" in recipient ? <Users className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                            <div>
                              <div>{recipient.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {"members" in recipient ? `${recipient.members} members` : recipient.email}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedRecipients.length === 0 && (
                <p className="text-xs text-muted-foreground">Select recipients to share this file with</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="permissions">Permission</Label>
              <Select defaultValue="view">
                <SelectTrigger id="permissions">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Can view</SelectItem>
                  <SelectItem value="comment">Can comment</SelectItem>
                  <SelectItem value="edit">Can edit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4 mt-4">
              <FilePermissionSelector value={securityLevel} onChange={handleSecurityLevelChange} />
            </div>

            {securityLevel !== "standard" && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Advanced Access Controls</h4>

                <div className="space-y-4">
                  {securityLevel === "restricted" && (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Prevent Downloads</Label>
                          <p className="text-xs text-muted-foreground">Recipients cannot download the file</p>
                        </div>
                        <Switch
                          checked={accessControls.preventDownload}
                          onCheckedChange={(checked) =>
                            setAccessControls((prev) => ({ ...prev, preventDownload: checked }))
                          }
                          disabled={securityLevel === "restricted"}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Prevent Printing</Label>
                          <p className="text-xs text-muted-foreground">Recipients cannot print the file</p>
                        </div>
                        <Switch
                          checked={accessControls.preventPrint}
                          onCheckedChange={(checked) =>
                            setAccessControls((prev) => ({ ...prev, preventPrint: checked }))
                          }
                          disabled={securityLevel === "restricted"}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Apply Watermark</Label>
                          <p className="text-xs text-muted-foreground">Add a watermark to the file</p>
                        </div>
                        <Switch
                          checked={accessControls.watermark}
                          onCheckedChange={(checked) => setAccessControls((prev) => ({ ...prev, watermark: checked }))}
                          disabled={securityLevel === "restricted"}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Prevent Copying</Label>
                      <p className="text-xs text-muted-foreground">Recipients cannot copy content from the file</p>
                    </div>
                    <Switch
                      checked={accessControls.preventCopy}
                      onCheckedChange={(checked) => setAccessControls((prev) => ({ ...prev, preventCopy: checked }))}
                      disabled={securityLevel === "restricted"}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notify on Access</Label>
                      <p className="text-xs text-muted-foreground">Get notified when the file is accessed</p>
                    </div>
                    <Switch
                      checked={accessControls.notifyOnAccess}
                      onCheckedChange={(checked) => setAccessControls((prev) => ({ ...prev, notifyOnAccess: checked }))}
                      disabled={securityLevel === "confidential" || securityLevel === "restricted"}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Set Expiration</Label>
                      <p className="text-xs text-muted-foreground">File access will expire on the selected date</p>
                    </div>
                    <div className="w-40">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expirationDate ? format(expirationDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expirationDate}
                            onSelect={setExpirationDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {shareSuccess ? (
              <div className="rounded-md bg-green-50 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">File shared successfully</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>The file has been shared with the selected recipients using {securityLevel} security.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Security Information</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>
                        This file will be shared with <strong className="capitalize">{securityLevel}</strong> security
                        level.
                        {securityLevel === "confidential" && " All interactions will be tracked and logged."}
                        {securityLevel === "restricted" &&
                          " Recipients cannot download or use the file outside the platform."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="link" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="link-permissions">Link Permissions</Label>
              <Select defaultValue="view">
                <SelectTrigger id="link-permissions">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="view">Anyone with link can view</SelectItem>
                  <SelectItem value="comment">Anyone with link can comment</SelectItem>
                  <SelectItem value="edit">Anyone with link can edit</SelectItem>
                  <SelectItem value="restricted">Restricted - requires authentication</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border-t pt-4 mt-4">
              <FilePermissionSelector value={securityLevel} onChange={handleSecurityLevelChange} />
            </div>

            {securityLevel !== "standard" && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-3">Advanced Access Controls</h4>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Authentication</Label>
                      <p className="text-xs text-muted-foreground">Recipients must sign in to access</p>
                    </div>
                    <Switch
                      checked={accessControls.requireAuthentication}
                      onCheckedChange={(checked) =>
                        setAccessControls((prev) => ({ ...prev, requireAuthentication: checked }))
                      }
                      disabled={securityLevel === "confidential" || securityLevel === "restricted"}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Set Expiration</Label>
                      <p className="text-xs text-muted-foreground">Link will expire on the selected date</p>
                    </div>
                    <div className="w-40">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {expirationDate ? format(expirationDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={expirationDate}
                            onSelect={setExpirationDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {shareLink ? (
              <div className="space-y-4">
                <div className="relative mt-4">
                  <Input value={shareLink} readOnly className="pr-20" />
                  <Button variant="outline" size="sm" className="absolute right-1 top-1 h-6" onClick={copyShareLink}>
                    {linkCopied ? (
                      <>
                        <Check className="h-3 w-3 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Notify me when this link is accessed
                  </label>
                </div>

                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Secure link created</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          This link has <strong className="capitalize">{securityLevel}</strong> security level.
                          {expirationDate && (
                            <span>
                              {" "}
                              It will expire on <strong>{format(expirationDate, "PPP")}</strong>.
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">Create a secure link with the selected security settings.</p>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleShare} disabled={sharingInProgress}>
            {sharingInProgress ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Sharing...
              </>
            ) : (
              <>
                <Share className="h-4 w-4 mr-2" />
                Share Securely
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
