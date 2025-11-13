"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Edit, 
  Save, 
  Eye, 
  RefreshCw, 
  Plus,
  Trash2,
  Copy,
  Globe,
  Settings,
  Navigation,
  FileText as Pages,
  Layout,
  Palette,
  Languages
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PageContent {
  id: string
  title: string
  slug: string
  content: string
  metaDescription: string
  status: "published" | "draft" | "archived"
  lastModified: string
  seoTitle?: string
  seoKeywords?: string[]
}

interface NavigationItem {
  id: string
  label: string
  href: string
  order: number
  enabled: boolean
  parentId?: string
  children?: NavigationItem[]
}

interface GlobalContent {
  id: string
  key: string
  value: string
  type: "text" | "html" | "json" | "image"
  description: string
  lastModified: string
}

export function PlatformContentManager() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("pages")
  const [isEditing, setIsEditing] = useState(false)

  // Pages state
  const [pages, setPages] = useState<PageContent[]>([
    {
      id: "1",
      title: "About Us",
      slug: "about",
      content: "GrowthLab is a leading startup accelerator...",
      metaDescription: "Learn about GrowthLab's mission to empower startups",
      status: "published",
      lastModified: "2024-01-20",
      seoTitle: "About GrowthLab - Startup Accelerator",
      seoKeywords: ["startup", "accelerator", "growth", "funding"]
    },
    {
      id: "2",
      title: "Programs",
      slug: "programs",
      content: "Our comprehensive programs include...",
      metaDescription: "Explore GrowthLab's startup programs and offerings",
      status: "published",
      lastModified: "2024-01-19"
    },
    {
      id: "3",
      title: "Resources",
      slug: "resources",
      content: "Access our library of startup resources...",
      metaDescription: "Startup resources, tools, and guides",
      status: "draft",
      lastModified: "2024-01-18"
    }
  ])

  // Navigation state
  const [navigation, setNavigation] = useState<NavigationItem[]>([
    { id: "1", label: "Home", href: "/", order: 1, enabled: true },
    { id: "2", label: "About", href: "/about", order: 2, enabled: true },
    { id: "3", label: "Programs", href: "/programs", order: 3, enabled: true },
    { id: "4", label: "Resources", href: "/resources", order: 4, enabled: true },
    { id: "5", label: "Contact", href: "/contact", order: 5, enabled: true },
    { id: "6", label: "Dashboard", href: "/dashboard", order: 6, enabled: false }
  ])

  // Global content state
  const [globalContent, setGlobalContent] = useState<GlobalContent[]>([
    {
      id: "1",
      key: "site_name",
      value: "GrowthLab",
      type: "text",
      description: "Main site name displayed throughout the platform",
      lastModified: "2024-01-20"
    },
    {
      id: "2",
      key: "footer_text",
      value: "© 2024 GrowthLab. All rights reserved.",
      type: "text",
      description: "Footer copyright text",
      lastModified: "2024-01-20"
    },
    {
      id: "3",
      key: "contact_email",
      value: "hello@growthlab.sg",
      type: "text",
      description: "Main contact email address",
      lastModified: "2024-01-20"
    },
    {
      id: "4",
      key: "hero_background",
      value: "/images/hero-bg.jpg",
      type: "image",
      description: "Default hero section background image",
      lastModified: "2024-01-20"
    }
  ])

  const handleSave = (section: string) => {
    toast({
      title: "Changes Saved",
      description: `${section} content has been updated successfully.`,
    })
    setIsEditing(false)
  }

  const handlePublish = () => {
    toast({
      title: "Published",
      description: "All platform content changes have been published.",
    })
  }

  const handleRevert = () => {
    toast({
      title: "Reverted",
      description: "All changes have been reverted to the last published version.",
    })
    setIsEditing(false)
  }

  const addNewPage = () => {
    const newPage: PageContent = {
      id: Date.now().toString(),
      title: "New Page",
      slug: "new-page",
      content: "Page content here...",
      metaDescription: "Page description",
      status: "draft",
      lastModified: new Date().toISOString().split('T')[0]
    }
    setPages([...pages, newPage])
  }

  const removePage = (id: string) => {
    setPages(pages.filter(p => p.id !== id))
  }

  const addNewNavigationItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      label: "New Item",
      href: "/new-item",
      order: navigation.length + 1,
      enabled: true
    }
    setNavigation([...navigation, newItem])
  }

  const removeNavigationItem = (id: string) => {
    setNavigation(navigation.filter(n => n.id !== id))
  }

  const addNewGlobalContent = () => {
    const newContent: GlobalContent = {
      id: Date.now().toString(),
      key: "new_key",
      value: "New value",
      type: "text",
      description: "New global content item",
      lastModified: new Date().toISOString().split('T')[0]
    }
    setGlobalContent([...globalContent, newContent])
  }

  const removeGlobalContent = (id: string) => {
    setGlobalContent(globalContent.filter(g => g.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Platform Content Manager
          </h2>
          <p className="text-muted-foreground">
            Manage all platform content, pages, navigation, and global settings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleRevert}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Revert
          </Button>
          <Button onClick={handlePublish}>
            <Globe className="w-4 h-4 mr-2" />
            Publish Changes
          </Button>
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <Pages className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.length}</div>
            <p className="text-xs text-muted-foreground">
              {pages.filter(p => p.status === "published").length} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Navigation Items</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{navigation.length}</div>
            <p className="text-xs text-muted-foreground">
              {navigation.filter(n => n.enabled).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Content</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalContent.length}</div>
            <p className="text-xs text-muted-foreground">
              {globalContent.filter(g => g.type === "text").length} text items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="global">Global Content</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Page Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewPage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Page
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Create and manage platform pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page, index) => (
                  <div key={page.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={page.status === "published" ? "default" : "secondary"}>
                          {page.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Last modified: {page.lastModified}
                        </span>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" onClick={() => removePage(page.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Page Title</Label>
                        <Input
                          value={page.title}
                          onChange={(e) => {
                            const newPages = [...pages]
                            (newPages[index] ? newPages[index].title : undefined) = e.target.value
                            setPages(newPages)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Slug</Label>
                        <Input
                          value={page.slug}
                          onChange={(e) => {
                            const newPages = [...pages]
                            (newPages[index] ? newPages[index].slug : undefined) = e.target.value
                            setPages(newPages)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-xs">Meta Description</Label>
                      <Textarea
                        value={page.metaDescription}
                        onChange={(e) => {
                          const newPages = [...pages]
                          (newPages[index] ? newPages[index].metaDescription : undefined) = e.target.value
                          setPages(newPages)
                        }}
                        disabled={!isEditing}
                        rows={2}
                      />
                    </div>
                    <div className="mt-3">
                      <Label className="text-xs">Content</Label>
                      <Textarea
                        value={page.content}
                        onChange={(e) => {
                          const newPages = [...pages]
                          (newPages[index] ? newPages[index].content : undefined) = e.target.value
                          setPages(newPages)
                        }}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>
                    <div className="mt-3">
                      <Label className="text-xs">Status</Label>
                      <Select
                        value={page.status}
                        onValueChange={(value: "published" | "draft" | "archived") => {
                          const newPages = [...pages]
                          (newPages[index] ? newPages[index].status : undefined) = value
                          setPages(newPages)
                        }}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Pages")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Navigation Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewNavigationItem}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage main navigation menu items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {navigation.map((item, index) => (
                  <div key={item.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-muted-foreground">#{item.order}</span>
                        <Switch
                          checked={item.enabled}
                          onCheckedChange={(checked) => {
                            const newNav = [...navigation]
                            (newNav[index] ? newNav[index].enabled : undefined) = checked
                            setNavigation(newNav)
                          }}
                        />
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" onClick={() => removeNavigationItem(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Label</Label>
                        <Input
                          value={item.label}
                          onChange={(e) => {
                            const newNav = [...navigation]
                            (newNav[index] ? newNav[index].label : undefined) = e.target.value
                            setNavigation(newNav)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">URL</Label>
                        <Input
                          value={item.href}
                          onChange={(e) => {
                            const newNav = [...navigation]
                            (newNav[index] ? newNav[index].href : undefined) = e.target.value
                            setNavigation(newNav)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Order</Label>
                        <Input
                          type="number"
                          value={item.order}
                          onChange={(e) => {
                            const newNav = [...navigation]
                            (newNav[index] ? newNav[index].order : undefined) = parseInt(e.target.value)
                            setNavigation(newNav)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Navigation")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Global Content Tab */}
        <TabsContent value="global" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Global Content</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={addNewGlobalContent}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </div>
              <CardDescription>Manage global content used throughout the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalContent.map((content, index) => (
                  <div key={content.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{content.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          Last modified: {content.lastModified}
                        </span>
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm" onClick={() => removeGlobalContent(content.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-xs">Key</Label>
                        <Input
                          value={content.key}
                          onChange={(e) => {
                            const newContent = [...globalContent]
                            (newContent[index] ? newContent[index].key : undefined) = e.target.value
                            setGlobalContent(newContent)
                          }}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Type</Label>
                        <Select
                          value={content.type}
                          onValueChange={(value: "text" | "html" | "json" | "image") => {
                            const newContent = [...globalContent]
                            (newContent[index] ? newContent[index].type : undefined) = value
                            setGlobalContent(newContent)
                          }}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-xs">Description</Label>
                      <Input
                        value={content.description}
                        onChange={(e) => {
                          const newContent = [...globalContent]
                          (newContent[index] ? newContent[index].description : undefined) = e.target.value
                          setGlobalContent(newContent)
                        }}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="mt-3">
                      <Label className="text-xs">Value</Label>
                      {content.type === "text" || content.type === "image" ? (
                        <Input
                          value={content.value}
                          onChange={(e) => {
                            const newContent = [...globalContent]
                            (newContent[index] ? newContent[index].value : undefined) = e.target.value
                            setGlobalContent(newContent)
                          }}
                          disabled={!isEditing}
                        />
                      ) : (
                        <Textarea
                          value={content.value}
                          onChange={(e) => {
                            const newContent = [...globalContent]
                            (newContent[index] ? newContent[index].value : undefined) = e.target.value
                            setGlobalContent(newContent)
                          }}
                          disabled={!isEditing}
                          rows={4}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={() => handleSave("Global content")}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Global content management settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Content Management</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-save">Auto-save Drafts</Label>
                      <Switch id="auto-save" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="version-control">Version Control</Label>
                      <Switch id="version-control" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content-review">Content Review Required</Label>
                      <Switch id="content-review" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">SEO & Performance</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-seo">Auto-generate SEO</Label>
                      <Switch id="auto-seo" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content-cache">Content Caching</Label>
                      <Switch id="content-cache" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="image-optimization">Image Optimization</Label>
                      <Switch id="image-optimization" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button onClick={handlePublish} className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Publish All Content Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
