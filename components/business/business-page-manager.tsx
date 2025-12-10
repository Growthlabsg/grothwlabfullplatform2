"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building,
  Plus,
  Settings,
  Trash2,
  BarChart,
  Users,
  ArrowUpRight,
  MapPin,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
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
import { CreateBusinessPageDialog } from "@/components/business/create-business-page-dialog";
import { usePageContext } from "@/contexts/page-context";
import {
  useGetMyPagesQuery,
  useDeletePageMutation,
  useGetPageQuery,
} from "@/lib/redux";
import { BusinessPageListItem } from "@/lib/redux/pagesApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ContextSwitcher } from "@/components/feed/context-switcher";

export function BusinessPageManager() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<BusinessPageListItem | null>(
    null
  );

  const {
    myPages,
    isLoadingPages,
    operablePages,
    activePage,
    isOperatingAsPage,
    activePageId,
    switchToPage,
    switchToPersonal,
  } = usePageContext();

  const [deletePage, { isLoading: isDeleting }] = useDeletePageMutation();

  // Filter pages based on context:
  // - When operating as a page: show only the active page
  // - When operating as user: show all pages
  const displayedPages =
    isOperatingAsPage && activePage ? [activePage] : myPages;

  const handleDeletePage = async () => {
    if (!pageToDelete) return;

    try {
      await deletePage(pageToDelete.id).unwrap();
      toast.success(`${pageToDelete.businessTitle} has been deleted`);
      setPageToDelete(null);
    } catch (error) {
      toast.error("Failed to delete business page");
    }
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoadingPages) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-16 w-16 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0F7377] to-[#00A884] rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {isOperatingAsPage
                ? activePage?.businessTitle
                : "Your Business Pages"}
            </h2>
            <p className="text-white/90 text-sm sm:text-base">
              {isOperatingAsPage
                ? "Manage your business page settings and content"
                : "Manage and showcase your business presence on GrowthLab"}
            </p>
          </div>
          <div className="flex gap-2">
            {isOperatingAsPage && (
              <Button
                onClick={switchToPersonal}
                variant="outline"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                View All Pages
              </Button>
            )}
            {!isOperatingAsPage && (
              <Button
                onClick={() => setShowCreateDialog(true)}
                className="bg-white text-[#0F7377] hover:bg-white/90 shadow-lg"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Business Page
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Context Switcher Card */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                Active Context
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {isOperatingAsPage
                  ? `Operating as ${activePage?.businessTitle}`
                  : "Operating as your personal account"}
              </p>
            </div>
          </div>
          <ContextSwitcher />
        </div>
      </Card>

      {/* Stats Overview - Show different stats based on context */}
      {isOperatingAsPage && activePage ? (
        // Single page stats when operating as page
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Followers</p>
                <p className="text-2xl font-bold">
                  {activePage.totalFollowers.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-bold capitalize">
                  {activePage.verificationStatus}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Your Role</p>
                <p className="text-lg font-bold capitalize">
                  {activePage.userRole}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Eye className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Page ID</p>
                <p className="text-2xl font-bold">{activePage.id}</p>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        // All pages stats when operating as user
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold">{myPages.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold">
                  {
                    myPages.filter((p) => p.verificationStatus === "verified")
                      .length
                  }
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Followers</p>
                <p className="text-2xl font-bold">
                  {myPages
                    .reduce((sum, page) => sum + page.totalFollowers, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Can Operate</p>
                <p className="text-2xl font-bold">{operablePages.length}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Pages List */}
      {displayedPages.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Building className="h-12 w-12 text-gray-400" />
            <div>
              <h3 className="text-lg font-medium">No business pages yet</h3>
              <p className="text-gray-500 mt-1">
                Create a business page to showcase your company and connect with
                customers.
              </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create Business Page
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {displayedPages.map((page) => (
            <Card
              key={page.id}
              className={cn(
                "hover:shadow-lg transition-all duration-300 border shadow-md",
                activePage?.id === page.id &&
                  "ring-2 ring-blue-500 border-blue-500"
              )}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Avatar className="h-16 w-16 rounded-xl border-2 border-gray-200">
                    <AvatarImage src={page.avatarURL} />
                    <AvatarFallback className="rounded-xl bg-gradient-to-br from-[#0F7377] to-[#00A884] text-white text-xl">
                      {page.businessTitle[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold truncate">
                            {page.businessTitle}
                          </h3>
                          {getVerificationBadge(page.verificationStatus)}
                        </div>
                        <p className="text-sm text-gray-500 capitalize">
                          {page.userRole} · {page.totalFollowers} followers
                        </p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {page.canSwitchContext ? (
                        <Button
                          size="sm"
                          variant={
                            activePage?.id === page.id ? "default" : "outline"
                          }
                          onClick={() => switchToPage(page)}
                          className="text-xs"
                        >
                          {activePage?.id === page.id ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            "Switch to Page"
                          )}
                        </Button>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {page.verificationStatus === "pending"
                            ? "Pending Verification"
                            : "View Only"}
                        </Badge>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="text-xs"
                      >
                        <Link href={`/business/${page.id}`}>
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Link>
                      </Button>
                      {(page.userRole === "owner" ||
                        page.userRole === "admin") && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="text-xs"
                          >
                            <Link href={`/business/${page.id}/settings`}>
                              <Settings className="h-3 w-3 mr-1" />
                              Settings
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="text-xs"
                          >
                            <Link href={`/business/${page.id}/analytics`}>
                              <BarChart className="h-3 w-3 mr-1" />
                              Analytics
                            </Link>
                          </Button>
                        </>
                      )}
                      {page.userRole === "owner" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                          onClick={() => setPageToDelete(page)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <CreateBusinessPageDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!pageToDelete}
        onOpenChange={(open) => !open && setPageToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Business Page</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{pageToDelete?.businessTitle}"?
              This action cannot be undone and will remove all posts, followers,
              and data associated with this page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePage}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete Page"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
