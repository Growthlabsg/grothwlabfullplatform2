"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChevronLeft,
  Building2,
  Settings,
  Users,
  Shield,
  Bell,
  Globe,
  Trash2,
  Save,
  Upload,
  Mail,
  Phone,
  MapPin,
  Target,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  useGetPageQuery,
  useUpdatePageMutation,
  useDeletePageMutation,
} from "@/lib/redux";
import { usePageContext } from "@/contexts/page-context";
import { toast } from "sonner";

interface PageSettingsProps {
  params: { id: string };
}

export default function PageSettingsPage({ params }: PageSettingsProps) {
  const { id } = params;
  const pageId = parseInt(id);
  const router = useRouter();

  const { data: page, isLoading, error } = useGetPageQuery(pageId);
  const [updatePage, { isLoading: isUpdating }] = useUpdatePageMutation();
  const [deletePage, { isLoading: isDeleting }] = useDeletePageMutation();

  const { activePage, isOperatingAsPage, switchToPersonal } = usePageContext();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Form state
  const [formData, setFormData] = useState({
    businessTitle: "",
    headline: "",
    description: "",
    websiteUrl: "",
    email: "",
    pagePhoneNumbers: "",
    missionStatement: "",
    visionStatement: "",
  });

  // Initialize form when page data loads
  useState(() => {
    if (page) {
      setFormData({
        businessTitle: page.businessTitle || "",
        headline: page.headline || "",
        description: page.description || "",
        websiteUrl: page.websiteUrl || "",
        email: page.email || "",
        pagePhoneNumbers: page.pagePhoneNumbers?.join(", ") || "",
        missionStatement: page.missionStatement || "",
        visionStatement: page.visionStatement || "",
      });
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updatePage({
        pageId,
        data: {
          ...formData,
          // Convert phone numbers string back to array
          pagePhoneNumbers: formData.pagePhoneNumbers
            ? formData.pagePhoneNumbers
                .split(",")
                .map((p) => p.trim())
                .filter(Boolean)
            : undefined,
        },
      }).unwrap();
      toast.success("Page settings updated successfully");
    } catch (error) {
      toast.error("Failed to update page settings");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePage(pageId).unwrap();
      toast.success("Page deleted successfully");
      if (isOperatingAsPage && activePage?.id === pageId) {
        switchToPersonal();
      }
      router.push("/business");
    } catch (error) {
      toast.error("Failed to delete page");
    }
  };

  const getVerificationBadge = (status?: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" />
            Pending Verification
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Page not found</h2>
          <p className="text-muted-foreground mb-4">
            The page you're looking for doesn't exist or you don't have access.
          </p>
          <Button asChild>
            <Link href="/business">Back to Business Pages</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/business/${pageId}`}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Page
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Page Settings
            </h1>
            <p className="text-muted-foreground">
              Manage settings for {page.businessTitle}
            </p>
          </div>
        </div>
        {getVerificationBadge(page.verificationStatus)}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">
            <Building2 className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="social">
            <Target className="h-4 w-4 mr-2" />
            Mission
          </TabsTrigger>
          <TabsTrigger value="danger">
            <Shield className="h-4 w-4 mr-2" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic information about your business page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={page.avatarURL} />
                  <AvatarFallback className="text-2xl">
                    {page.businessTitle?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Change Logo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended: 400x400px, PNG or JPG
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="businessTitle">Business Name</Label>
                  <Input
                    id="businessTitle"
                    value={formData.businessTitle}
                    onChange={(e) =>
                      handleInputChange("businessTitle", e.target.value)
                    }
                    placeholder="Your business name"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    value={formData.headline}
                    onChange={(e) =>
                      handleInputChange("headline", e.target.value)
                    }
                    placeholder="A short tagline for your business"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Tell people about your business"
                    rows={4}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="websiteUrl">Website</Label>
                  <Input
                    id="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={(e) =>
                      handleInputChange("websiteUrl", e.target.value)
                    }
                    placeholder="https://yourbusiness.com"
                    type="url"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isUpdating}>
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How people can reach your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="contact@yourbusiness.com"
                    type="email"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="pagePhoneNumbers">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Numbers
                  </Label>
                  <Input
                    id="pagePhoneNumbers"
                    value={formData.pagePhoneNumbers}
                    onChange={(e) =>
                      handleInputChange("pagePhoneNumbers", e.target.value)
                    }
                    placeholder="+65 1234 5678, +1 234 567 8900"
                  />
                  <p className="text-xs text-muted-foreground">
                    Separate multiple numbers with commas
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isUpdating}>
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mission & Vision Settings */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Mission & Vision</CardTitle>
              <CardDescription>
                Define your company's purpose and goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="missionStatement">Mission Statement</Label>
                  <Textarea
                    id="missionStatement"
                    value={formData.missionStatement}
                    onChange={(e) =>
                      handleInputChange("missionStatement", e.target.value)
                    }
                    placeholder="What is your company's mission?"
                    rows={3}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="visionStatement">Vision Statement</Label>
                  <Textarea
                    id="visionStatement"
                    value={formData.visionStatement}
                    onChange={(e) =>
                      handleInputChange("visionStatement", e.target.value)
                    }
                    placeholder="What is your company's vision for the future?"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isUpdating}>
                  {isUpdating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Danger Zone */}
        <TabsContent value="danger">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your business page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <h4 className="font-medium text-red-900">Delete this page</h4>
                  <p className="text-sm text-red-700">
                    Once deleted, all data including posts, followers, and
                    analytics will be permanently removed.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              page "{page.businessTitle}" and remove all associated data
              including posts, followers, team members, and analytics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Page
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
