"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
import { Save, GripVertical, PlusCircle, Trash2 } from "lucide-react"

// Interface for required document
interface RequiredDocument {
  id: string
  name: string
  description: string
  required: boolean
}

export default function VerificationSettingsPage() {
  const [requiredDocuments, setRequiredDocuments] = useState<RequiredDocument[]>([
    {
      id: "doc-1",
      name: "Business Registration Certificate",
      description: "Official business registration document from your country",
      required: true,
    },
    {
      id: "doc-2",
      name: "Founding Team ID",
      description: "Government-issued IDs for all founding team members",
      required: true,
    },
    {
      id: "doc-3",
      name: "Pitch Deck",
      description: "Your startup's pitch deck or company presentation",
      required: false,
    },
    {
      id: "doc-4",
      name: "Financial Statements",
      description: "Financial statements or projections",
      required: false,
    },
    {
      id: "doc-5",
      name: "Product Demo",
      description: "Video or screenshots of your product",
      required: false,
    },
  ])

  const [settings, setSettings] = useState({
    autoApproveBasic: false,
    requireAdminReview: true,
    notifyOnNew: true,
    notifyOnUpdate: true,
    verificationExpiry: "365",
    allowExpired: false,
    requiredFieldsSection: {
      companyName: true,
      website: true,
      industry: true,
      stage: true,
      foundingDate: false,
      description: true,
      founderInfo: true,
    },
  })

  const [emailTemplates, setEmailTemplates] = useState({
    approved: {
      subject: "Your startup has been verified!",
      body: "Congratulations! Your startup {company_name} has been verified on GrowthLab. You now have access to all the benefits of being a verified startup.",
    },
    rejected: {
      subject: "Verification Request Update",
      body: "Thank you for submitting your startup {company_name} for verification. Unfortunately, we are unable to verify your startup at this time due to {rejection_reason}.",
    },
    additionalInfo: {
      subject: "Additional Information Needed for Verification",
      body: "Thank you for submitting your startup {company_name} for verification. We need some additional information to complete the verification process: {additional_info_needed}.",
    },
  })

  // Handle drag and drop reordering
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(requiredDocuments)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setRequiredDocuments(items)
  }

  // Add new document
  const addDocument = () => {
    const newDoc: RequiredDocument = {
      id: `doc-${Date.now()}`,
      name: "",
      description: "",
      required: false,
    }
    setRequiredDocuments([...requiredDocuments, newDoc])
  }

  // Update document
  const updateDocument = (id: string, field: string, value: string | boolean) => {
    setRequiredDocuments(requiredDocuments.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc)))
  }

  // Remove document
  const removeDocument = (id: string) => {
    setRequiredDocuments(requiredDocuments.filter((doc) => doc.id !== id))
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Verification Settings</h2>
            <p className="text-muted-foreground">Configure startup verification requirements and workflow</p>
          </div>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="documents">Required Documents</TabsTrigger>
            <TabsTrigger value="email">Email Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure verification workflow and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-approve">Auto-approve basic verifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically approve verifications with all required documents
                      </p>
                    </div>
                    <Switch
                      id="auto-approve"
                      checked={settings.autoApproveBasic}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoApproveBasic: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-review">Require admin review</Label>
                      <p className="text-sm text-muted-foreground">
                        All verifications must be reviewed by an admin before approval
                      </p>
                    </div>
                    <Switch
                      id="admin-review"
                      checked={settings.requireAdminReview}
                      onCheckedChange={(checked) => setSettings({ ...settings, requireAdminReview: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-new">Notify on new requests</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notification when new verification requests are submitted
                      </p>
                    </div>
                    <Switch
                      id="notify-new"
                      checked={settings.notifyOnNew}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifyOnNew: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notify-update">Notify on updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Send email notification when verification requests are updated
                      </p>
                    </div>
                    <Switch
                      id="notify-update"
                      checked={settings.notifyOnUpdate}
                      onCheckedChange={(checked) => setSettings({ ...settings, notifyOnUpdate: checked })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry">Verification expiry (days)</Label>
                    <Input
                      id="expiry"
                      type="number"
                      value={settings.verificationExpiry}
                      onChange={(e) => setSettings({ ...settings, verificationExpiry: e.target.value })}
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of days before verification expires and needs renewal
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-expired">Allow expired verifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow startups to keep verification badge after expiry
                      </p>
                    </div>
                    <Switch
                      id="allow-expired"
                      checked={settings.allowExpired}
                      onCheckedChange={(checked) => setSettings({ ...settings, allowExpired: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Fields</CardTitle>
                <CardDescription>Configure which fields are required during verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="company-name"
                      checked={settings.requiredFieldsSection.companyName}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          requiredFieldsSection: {
                            ...settings.requiredFieldsSection,
                            companyName: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="company-name">Company Name</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="website"
                      checked={settings.requiredFieldsSection.website}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          requiredFieldsSection: {
                            ...settings.requiredFieldsSection,
                            website: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="website">Website</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="industry"
                      checked={settings.requiredFieldsSection.industry}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          requiredFieldsSection: {
                            ...settings.requiredFieldsSection,
                            industry: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="industry">Industry</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stage"
                      checked={settings.requiredFieldsSection.stage}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          requiredFieldsSection: {
                            ...settings.requiredFieldsSection,
                            stage: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="stage">Stage</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="founding-date"
                      checked={settings.requiredFieldsSection.foundingDate}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          requiredFieldsSection: {
                            ...settings.requiredFieldsSection,
                            foundingDate: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="founding-date">Founding Date</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="description"
                      checked={settings.requiredFieldsSection.description}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          requiredFieldsSection: {
                            ...settings.requiredFieldsSection,
                            description: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="description">Company Description</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="founder-info"
                      checked={settings.requiredFieldsSection.founderInfo}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          requiredFieldsSection: {
                            ...settings.requiredFieldsSection,
                            founderInfo: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="founder-info">Founder Information</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Configure the documents required for verification</CardDescription>
              </CardHeader>
              <CardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="documents">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                        {requiredDocuments.map((doc, index) => (
                          <Draggable key={doc.id} draggableId={doc.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="border rounded-md p-4"
                              >
                                <div className="flex justify-between items-start">
                                  <div {...provided.dragHandleProps} className="mr-2 mt-1 cursor-move">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1 space-y-3">
                                    <div className="space-y-1">
                                      <Label htmlFor={`doc-name-${doc.id}`}>Document Name</Label>
                                      <Input
                                        id={`doc-name-${doc.id}`}
                                        value={doc.name}
                                        onChange={(e) => updateDocument(doc.id, "name", e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <Label htmlFor={`doc-desc-${doc.id}`}>Description</Label>
                                      <Input
                                        id={`doc-desc-${doc.id}`}
                                        value={doc.description}
                                        onChange={(e) => updateDocument(doc.id, "description", e.target.value)}
                                      />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`doc-required-${doc.id}`}
                                        checked={doc.required}
                                        onCheckedChange={(checked) =>
                                          updateDocument(doc.id, "required", checked as boolean)
                                        }
                                      />
                                      <Label htmlFor={`doc-required-${doc.id}`}>Required Document</Label>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeDocument(doc.id)}
                                    className="mt-1"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                <Button variant="outline" className="mt-4 w-full" onClick={addDocument}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Configure email notifications for verification status updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Approval Email</h3>
                  <div className="space-y-2">
                    <Label htmlFor="approved-subject">Subject</Label>
                    <Input
                      id="approved-subject"
                      value={emailTemplates.approved.subject}
                      onChange={(e) =>
                        setEmailTemplates({
                          ...emailTemplates,
                          approved: { ...emailTemplates.approved, subject: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approved-body">Email Body</Label>
                    <Textarea
                      id="approved-body"
                      value={emailTemplates.approved.body}
                      onChange={(e) =>
                        setEmailTemplates({
                          ...emailTemplates,
                          approved: { ...emailTemplates.approved, body: e.target.value },
                        })
                      }
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Available variables: {"{company_name}"}, {"{founded_date}"}, {"{verification_date}"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Rejection Email</h3>
                  <div className="space-y-2">
                    <Label htmlFor="rejected-subject">Subject</Label>
                    <Input
                      id="rejected-subject"
                      value={emailTemplates.rejected.subject}
                      onChange={(e) =>
                        setEmailTemplates({
                          ...emailTemplates,
                          rejected: { ...emailTemplates.rejected, subject: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rejected-body">Email Body</Label>
                    <Textarea
                      id="rejected-body"
                      value={emailTemplates.rejected.body}
                      onChange={(e) =>
                        setEmailTemplates({
                          ...emailTemplates,
                          rejected: { ...emailTemplates.rejected, body: e.target.value },
                        })
                      }
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Available variables: {"{company_name}"}, {"{rejection_reason}"}, {"{rejection_date}"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information Email</h3>
                  <div className="space-y-2">
                    <Label htmlFor="additional-subject">Subject</Label>
                    <Input
                      id="additional-subject"
                      value={emailTemplates.additionalInfo.subject}
                      onChange={(e) =>
                        setEmailTemplates({
                          ...emailTemplates,
                          additionalInfo: { ...emailTemplates.additionalInfo, subject: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additional-body">Email Body</Label>
                    <Textarea
                      id="additional-body"
                      value={emailTemplates.additionalInfo.body}
                      onChange={(e) =>
                        setEmailTemplates({
                          ...emailTemplates,
                          additionalInfo: { ...emailTemplates.additionalInfo, body: e.target.value },
                        })
                      }
                      rows={6}
                    />
                    <p className="text-sm text-muted-foreground">
                      Available variables: {"{company_name}"}, {"{additional_info_needed}"}, {"{request_date}"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
