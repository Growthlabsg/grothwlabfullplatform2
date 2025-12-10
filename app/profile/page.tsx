"use client";

import { useState, useRef, useCallback } from "react";
import DigitalNameCard from "@/components/profile/digital-name-card";
import {
  VisitingCard,
  VisitingCardData,
  downloadVisitingCard,
  downloadQRCode,
} from "@/components/profile/visiting-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Share2,
  Download,
  Edit,
  QrCode,
  Eye,
  MessageSquare,
  Calendar,
  Heart,
  Star,
  ExternalLink,
  Copy,
  Check,
  Settings,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Plus,
  MoreHorizontal,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";

// Static mock data for roles (not available in API)
const staticRoles = [
  {
    id: "1",
    type: "mentor",
    title: "Tech Mentor",
    description: "Providing guidance to aspiring developers and entrepreneurs",
    verified: true,
  },
  {
    id: "2",
    type: "investor",
    title: "Angel Investor",
    description: "Investing in early-stage tech startups",
    verified: true,
  },
  {
    id: "3",
    type: "founder",
    title: "Startup Founder",
    description: "Co-founded multiple successful tech companies",
    verified: true,
  },
];

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadingQR, setDownloadingQR] = useState(false);
  const visitingCardRef = useRef<HTMLDivElement>(null);

  // Get user display name
  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"
    : "User";

  // Extract linkedin username from URL
  const getLinkedinUsername = (url?: string) => {
    if (!url) return null;
    const match = url.match(/linkedin\.com\/in\/([^\/]+)/);
    return match ? match[1] : url;
  };

  // Extract twitter username from URL
  const getTwitterUsername = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:twitter|x)\.com\/([^\/]+)/);
    return match ? match[1] : url;
  };

  // Copy link to public e-card page
  const handleCopyLink = useCallback(async () => {
    try {
      // Link to the public card page (not profile page)
      const cardUrl = `${window.location.origin}/card/${user?.id || ""}`;
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      toast.success("Public card link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  }, [user?.id]);

  // Download QR code as PNG
  const handleDownloadQR = useCallback(async () => {
    if (!user?.id) return;

    setDownloadingQR(true);
    try {
      await downloadQRCode(user.id, displayName);
    } catch (error) {
      // Error already handled in the function
    } finally {
      setDownloadingQR(false);
    }
  }, [user?.id, displayName]);

  // Prepare visiting card data from user profile
  const visitingCardData: VisitingCardData | null = user
    ? {
        id: user.id,
        name: displayName,
        title: user.headline || "",
        company: user.companyName || "",
        email: user.emailAddress || "",
        phone: user.phoneNumber || "",
        website: user.websiteUrl || "",
        location: user.location || "",
        avatar: user.avatarURL || "",
        linkedin: getLinkedinUsername(user.linkedinUrl) || "",
        skills: [], // TODO: Add skills to user profile API
        isVerified: user.isVerified,
      }
    : null;

  // Download visiting card as PNG
  const handleDownload = useCallback(async () => {
    if (!visitingCardRef.current || !visitingCardData) return;

    setDownloading(true);
    try {
      await downloadVisitingCard(visitingCardRef.current, displayName);
    } catch (error) {
      // Error already handled in the function
    } finally {
      setDownloading(false);
    }
  }, [displayName, visitingCardData]);

  // Share to public card page
  const handleShare = useCallback(async () => {
    const cardUrl = `${window.location.origin}/card/${user?.id || ""}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${displayName} - Digital Name Card`,
          text: `Check out ${displayName}'s digital name card on GrowthLab`,
          url: cardUrl,
        });
      } catch (error) {
        // User cancelled or share failed, fallback to copy
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  }, [user?.id, displayName, handleCopyLink]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0F7377]" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hidden Visiting Card for Download */}
      {visitingCardData && (
        <div className="fixed -left-[9999px] -top-[9999px]">
          <VisitingCard ref={visitingCardRef} data={visitingCardData} />
        </div>
      )}

      {/* Header Navigation */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                Digital Name Card
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/settings/profile">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <DigitalNameCard />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Stats</CardTitle>
                <CardDescription>Your engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5">
                    <div className="text-2xl font-bold text-[#0F7377]">
                      {user?.totalConnections ?? 0}
                    </div>
                    <div className="text-xs text-gray-600">Connections</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5">
                    <div className="text-2xl font-bold text-[#F59E0B]">
                      {user?.totalEngagement ?? 0}
                    </div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5">
                    <div className="text-2xl font-bold text-[#10B981]">
                      {user?.totalPosts ?? 0}
                    </div>
                    <div className="text-xs text-gray-600">Posts</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5">
                    <div className="text-2xl font-bold text-[#8B5CF6]">
                      {user?.isVerified ? "Yes" : "No"}
                    </div>
                    <div className="text-xs text-gray-600">Verified</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>Common profile actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  asChild
                >
                  <Link href="/settings/profile">
                    <Edit className="h-4 w-4 mr-3" />
                    Edit Profile
                  </Link>
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={handleDownloadQR}
                  disabled={downloadingQR}
                >
                  {downloadingQR ? (
                    <Loader2 className="h-4 w-4 mr-3 animate-spin" />
                  ) : (
                    <QrCode className="h-4 w-4 mr-3" />
                  )}
                  {downloadingQR ? "Downloading..." : "Generate QR Code"}
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? (
                    <Loader2 className="h-4 w-4 mr-3 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4 mr-3" />
                  )}
                  {downloading ? "Downloading..." : "Download Card"}
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={copied ? undefined : handleCopyLink}
                >
                  {copied ? (
                    <Check className="h-4 w-4 mr-3" />
                  ) : (
                    <Copy className="h-4 w-4 mr-3" />
                  )}
                  {copied ? "Link Copied!" : "Copy Link"}
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-3" />
                  Share Profile
                </Button>
              </CardContent>
            </Card>

            {/* Professional Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Roles</CardTitle>
                <CardDescription>
                  Your current roles and contributions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {staticRoles.map((role) => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0F7377]/10 flex items-center justify-center">
                        {role.type === "mentor" && (
                          <GraduationCap className="h-4 w-4 text-[#0F7377]" />
                        )}
                        {role.type === "investor" && (
                          <Briefcase className="h-4 w-4 text-[#0F7377]" />
                        )}
                        {role.type === "founder" && (
                          <Award className="h-4 w-4 text-[#0F7377]" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{role.title}</div>
                        <div className="text-xs text-gray-500">
                          {role.description}
                        </div>
                      </div>
                    </div>
                    {role.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Info</CardTitle>
                <CardDescription>How to reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {user?.emailAddress && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-[#0F7377]" />
                    <a
                      href={`mailto:${user.emailAddress}`}
                      className="hover:underline"
                    >
                      {user.emailAddress}
                    </a>
                  </div>
                )}
                {user?.phoneNumber && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-[#0F7377]" />
                    <a
                      href={`tel:${user.phoneNumber}`}
                      className="hover:underline"
                    >
                      {user.phoneNumber}
                    </a>
                  </div>
                )}
                {user?.location && (
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-[#0F7377]" />
                    <span>{user.location}</span>
                  </div>
                )}
                {user?.websiteUrl && (
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="h-4 w-4 text-[#0F7377]" />
                    <a
                      href={user.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
                {!user?.emailAddress &&
                  !user?.phoneNumber &&
                  !user?.location &&
                  !user?.websiteUrl && (
                    <p className="text-sm text-gray-500">
                      No contact info available
                    </p>
                  )}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Links</CardTitle>
                <CardDescription>Connect on social platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {user?.linkedinUrl && (
                  <div className="flex items-center gap-3 text-sm">
                    <LinkIcon className="h-4 w-4 text-[#0F7377]" />
                    <a
                      href={user.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                {user?.twitterUrl && (
                  <div className="flex items-center gap-3 text-sm">
                    <LinkIcon className="h-4 w-4 text-[#0F7377]" />
                    <a
                      href={user.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Twitter Profile
                    </a>
                  </div>
                )}
                {!user?.linkedinUrl && !user?.twitterUrl && (
                  <p className="text-sm text-gray-500">
                    No social links available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
