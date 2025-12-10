"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
  QrCode,
  Share2,
  Download,
  MessageSquare,
  Video,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Star,
  Target,
  Zap,
  Heart,
  Eye,
  ExternalLink,
  Copy,
  Check,
  DollarSign,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { useAuth } from "@/contexts/auth-context";
import html2canvas from "html2canvas";

interface DigitalNameCardProps {
  profileData?: {
    name: string;
    title: string;
    company: string;
    location: string;
    bio: string;
    avatar: string;
    email: string;
    phone: string;
    website: string;
    linkedin: string;
    twitter: string;
    github: string;
    roles: Array<{
      id: string;
      title: string;
      type: "mentor" | "investor" | "founder" | "advisor" | "expert";
      description: string;
      verified: boolean;
    }>;
    skills: string[];
    languages: string[];
    timezone: string;
  };
  isEditable?: boolean;
  onEdit?: () => void;
}

export default function DigitalNameCard({
  profileData,
  isEditable = false,
  onEdit,
}: DigitalNameCardProps) {
  const { user } = useAuth();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  // Get user display name
  const displayName = user
    ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"
    : "User";

  // Build data from auth context user, falling back to profileData or defaults
  const data = {
    name: displayName,
    title: user?.headline || profileData?.title || "Professional",
    company: user?.companyName || profileData?.company || "",
    location: user?.location || profileData?.location || "",
    bio: user?.bio || profileData?.bio || "",
    avatar: user?.avatarURL || profileData?.avatar || "",
    email: user?.emailAddress || profileData?.email || "",
    phone: user?.phoneNumber || profileData?.phone || "",
    website: user?.websiteUrl || profileData?.website || "",
    linkedin: user?.linkedinUrl || profileData?.linkedin || "",
    twitter: user?.twitterUrl || profileData?.twitter || "",
    github: profileData?.github || "",
    roles: profileData?.roles || [
      {
        id: "1",
        title: getRoleTitle(user?.role),
        type: mapRoleType(user?.role),
        description: getRoleDescription(user?.role),
        verified: user?.isVerified || false,
      },
    ],
    skills: profileData?.skills || [],
    languages: profileData?.languages || [],
    timezone: user?.timezone || profileData?.timezone || "GMT+8",
    totalConnections: user?.totalConnections || 0,
    totalPosts: user?.totalPosts || 0,
    totalEngagement: user?.totalEngagement || 0,
    isVerified: user?.isVerified || false,
  };

  // Helper functions for role mapping
  function getRoleTitle(role?: string): string {
    switch (role) {
      case "startup_founder":
        return "Startup Founder";
      case "investor":
        return "Investor";
      case "mentor":
        return "Mentor";
      case "admin":
        return "Administrator";
      default:
        return "Professional";
    }
  }

  function mapRoleType(
    role?: string
  ): "mentor" | "investor" | "founder" | "advisor" | "expert" {
    switch (role) {
      case "startup_founder":
        return "founder";
      case "investor":
        return "investor";
      case "mentor":
        return "mentor";
      default:
        return "expert";
    }
  }

  function getRoleDescription(role?: string): string {
    switch (role) {
      case "startup_founder":
        return "Building innovative solutions";
      case "investor":
        return "Investing in promising startups";
      case "mentor":
        return "Guiding entrepreneurs to success";
      case "admin":
        return "Platform administrator";
      default:
        return "Professional member";
    }
  }

  // Generate QR Code that points to public card page
  React.useEffect(() => {
    const generateQRCode = async () => {
      try {
        // QR code points to the public card page for easy scanning
        const cardUrl = `${window.location.origin}/card/${user?.id || ""}`;

        const qrDataUrl = await QRCode.toDataURL(cardUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: "#0F7377",
            light: "#FFFFFF",
          },
        });
        setQrCodeDataUrl(qrDataUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };
    generateQRCode();
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    );
  }, [user?.id]);

  const handleShare = async () => {
    // Share the public card URL
    const cardUrl = `${window.location.origin}/card/${user?.id || ""}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.name} - Digital Name Card`,
          text: `Check out ${data.name}'s digital name card on GrowthLab`,
          url: cardUrl,
        });
      } catch (error) {
        // User cancelled or share failed, fallback to copy
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = useCallback(async () => {
    try {
      // Copy the public card URL
      const cardUrl = `${window.location.origin}/card/${user?.id || ""}`;
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      toast.success("Public card link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error("Failed to copy link");
    }
  }, [user?.id]);

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });

      const link = document.createElement("a");
      link.download = `${data.name.replace(/\s+/g, "_")}_visiting_card.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Visiting card downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download visiting card");
    } finally {
      setDownloading(false);
    }
  }, [data.name]);

  const getRoleIcon = (type: string) => {
    switch (type) {
      case "mentor":
        return <GraduationCap className="w-4 h-4" />;
      case "investor":
        return <DollarSign className="w-4 h-4" />;
      case "founder":
        return <Building className="w-4 h-4" />;
      case "advisor":
        return <Award className="w-4 h-4" />;
      case "expert":
        return <Star className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (type: string) => {
    switch (type) {
      case "mentor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "investor":
        return "bg-green-100 text-green-800 border-green-200";
      case "founder":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "advisor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "expert":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <Card
          ref={cardRef}
          className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50"
        >
          {/* Header with QR Code and Actions */}
          <CardHeader className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white p-4 md:p-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                  Digital Name Card
                </h1>
                <p className="text-white/90 text-sm md:text-base">
                  Your professional identity in one place
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {qrCodeDataUrl && (
                  <div className="bg-white p-2 rounded-lg">
                    <img
                      src={qrCodeDataUrl}
                      alt="QR Code"
                      className="w-12 h-12 md:w-16 md:h-16"
                    />
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs md:text-sm"
                    onClick={handleShare}
                  >
                    <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs md:text-sm"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <Check className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    ) : (
                      <Copy className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    )}
                    <span className="hidden sm:inline">
                      {copied ? "Copied!" : "Copy Link"}
                    </span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs md:text-sm"
                    onClick={handleDownload}
                    disabled={downloading}
                  >
                    {downloading ? (
                      <Loader2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 animate-spin" />
                    ) : (
                      <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    )}
                    <span className="hidden sm:inline">
                      {downloading ? "Downloading..." : "Download"}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <Avatar className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={data.avatar} alt={data.name} />
                  <AvatarFallback className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white text-lg md:text-xl font-bold">
                    {data.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {data.name}
                </h2>
                <p className="text-base md:text-lg text-[#0F7377] font-semibold mb-2">
                  {data.title}
                </p>
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                  {data.company}
                </p>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {data.bio}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="space-y-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Mail className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                    <a
                      href={`mailto:${data.email}`}
                      className="text-sm md:text-base text-gray-600 hover:text-[#0F7377] transition-colors"
                    >
                      {data.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Phone className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                    <a
                      href={`tel:${data.phone}`}
                      className="text-sm md:text-base text-gray-600 hover:text-[#0F7377] transition-colors"
                    >
                      {data.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <MapPin className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-600">
                      {data.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <Globe className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                    <a
                      href={data.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-[#0F7377] hover:underline truncate"
                    >
                      {data.website}
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  Social Links
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                    <a
                      href={`https://linkedin.com/in/${data.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-[#0F7377] hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                    <a
                      href={`https://twitter.com/${data.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-[#0F7377] hover:underline"
                    >
                      Twitter Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                    <a
                      href={`https://github.com/${data.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-[#0F7377] hover:underline"
                    >
                      GitHub Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Roles Section */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
                Professional Roles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {data.roles.map((role) => (
                  <Card
                    key={role.id}
                    className="border-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <CardContent className="p-3 md:p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${getRoleColor(
                            role.type
                          )} flex-shrink-0`}
                        >
                          {getRoleIcon(role.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 text-sm md:text-base truncate">
                              {role.title}
                            </h4>
                            {role.verified && (
                              <Badge
                                variant="secondary"
                                className="text-xs self-start"
                              >
                                <Check className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2">
                            {role.description}
                          </p>
                          <div className="flex flex-col sm:flex-col gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs flex-1"
                            >
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Connect
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs flex-1"
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Skills and Languages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-[#0F7377]/10 text-[#0F7377] border-[#0F7377]/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((language, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs px-2 py-1 border-[#0F7377]/30 text-[#0F7377]"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5 border border-[#0F7377]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#0F7377] mb-1">
                  {data.totalConnections}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Connections
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">
                  {data.totalEngagement}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Engagement
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#10B981] mb-1">
                  {data.totalPosts}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 border border-[#8B5CF6]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#8B5CF6] mb-1">
                  {data.isVerified ? "Yes" : "No"}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Verified</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6 md:mb-8">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-[#0F7377]/5 hover:border-[#0F7377]/30"
              >
                <Eye className="w-5 h-5 text-[#0F7377]" />
                <span className="text-sm font-medium">View Profile</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-[#0F7377]/5 hover:border-[#0F7377]/30"
              >
                <MessageSquare className="w-5 h-5 text-[#0F7377]" />
                <span className="text-sm font-medium">Send Message</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-[#0F7377]/5 hover:border-[#0F7377]/30"
              >
                <Calendar className="w-5 h-5 text-[#0F7377]" />
                <span className="text-sm font-medium">Book Meeting</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-[#0F7377]/5 hover:border-[#0F7377]/30"
              >
                <Share2 className="w-5 h-5 text-[#0F7377]" />
                <span className="text-sm font-medium">Share Profile</span>
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center pt-4 md:pt-6 border-t">
              <Button className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white flex-1 sm:flex-none min-w-[140px]">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none min-w-[140px]"
              >
                <Video className="w-4 h-4 mr-2" />
                Video Call
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none min-w-[140px]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                className="flex-1 sm:flex-none min-w-[140px]"
              >
                <Heart className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </div>

            {/* Footer Links */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <a
                  href="/settings/profile"
                  className="text-xs md:text-sm text-gray-600 hover:text-[#0F7377] transition-colors"
                >
                  Edit Profile
                </a>
                <a
                  href="/privacy"
                  className="text-xs md:text-sm text-gray-600 hover:text-[#0F7377] transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-xs md:text-sm text-gray-600 hover:text-[#0F7377] transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/contact"
                  className="text-xs md:text-sm text-gray-600 hover:text-[#0F7377] transition-colors"
                >
                  Contact Support
                </a>
              </div>
              <div className="text-center mt-4">
                <p className="text-xs text-gray-500">
                  Powered by{" "}
                  <span className="text-[#0F7377] font-semibold">
                    GrowthLab
                  </span>{" "}
                  • Last updated: {currentDate || "Loading..."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
