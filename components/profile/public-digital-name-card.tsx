"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
  Share2,
  Download,
  MessageSquare,
  Calendar,
  Building,
  GraduationCap,
  Award,
  Star,
  Check,
  DollarSign,
  Loader2,
  Copy,
  User,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

// Interface for public profile data
export interface PublicProfileData {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  avatar: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  roles: Array<{
    id: string;
    title: string;
    type: "mentor" | "investor" | "founder" | "advisor" | "expert";
    description: string;
    verified: boolean;
  }>;
  skills: string[];
  languages: string[];
  totalConnections: number;
  totalEngagement: number;
  totalPosts: number;
  isVerified: boolean;
}

interface PublicDigitalNameCardProps {
  profileData: PublicProfileData;
  onConnect?: () => void;
  onSchedule?: () => void;
  isOwnProfile?: boolean;
}

// Compact Visiting Card Component for Download (matches settings/profile E-Card preview)
const CompactVisitingCard = React.forwardRef<
  HTMLDivElement,
  { data: PublicProfileData }
>(({ data }, ref) => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
      style={{ width: "450px" }}
    >
      {/* Header with Avatar */}
      <div className="flex items-center gap-4 mb-5">
        <Avatar className="w-16 h-16 flex-shrink-0">
          <AvatarImage src={data.avatar} alt={data.name} />
          <AvatarFallback className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white text-lg font-bold">
            {data.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h4 className="font-bold text-gray-900 text-lg leading-tight">
            {data.name}
          </h4>
          <p className="text-[#0F7377] font-semibold text-sm">{data.title}</p>
          {data.company && (
            <p className="text-gray-600 text-sm">{data.company}</p>
          )}
        </div>
      </div>

      {/* Contact Info - Fixed alignment with proper spacing */}
      <div className="space-y-3 text-sm pl-1">
        {data.email && (
          <div className="flex items-center gap-4 text-gray-600">
            <Mail className="h-5 w-5 text-[#0F7377] flex-shrink-0" />
            <span>{data.email}</span>
          </div>
        )}
        {data.phone && (
          <div className="flex items-center gap-4 text-gray-600">
            <Phone className="h-5 w-5 text-[#0F7377] flex-shrink-0" />
            <span>{data.phone}</span>
          </div>
        )}
        {data.location && (
          <div className="flex items-center gap-4 text-gray-600">
            <MapPin className="h-5 w-5 text-[#0F7377] flex-shrink-0" />
            <span>{data.location}</span>
          </div>
        )}
        {data.website && (
          <div className="flex items-center gap-4 text-gray-600">
            <Globe className="h-5 w-5 text-[#0F7377] flex-shrink-0" />
            <span>{data.website.replace(/^https?:\/\//, "")}</span>
          </div>
        )}
        {data.linkedin && (
          <div className="flex items-center gap-4 text-gray-600">
            <LinkIcon className="h-5 w-5 text-[#0F7377] flex-shrink-0" />
            <span>
              {data.linkedin.includes("linkedin.com")
                ? data.linkedin.replace(/^https?:\/\/(www\.)?/, "")
                : `linkedin.com/in/${data.linkedin}`}
            </span>
          </div>
        )}
      </div>

      {/* Skills Badges */}
      {data.skills && data.skills.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1.5">
            {data.skills.slice(0, 5).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-[#0F7377]/10 text-[#0F7377] border-[#0F7377]/20 px-2 py-0.5"
              >
                {skill}
              </Badge>
            ))}
            {data.skills.length > 5 && (
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 text-gray-500"
              >
                +{data.skills.length - 5}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">
            Generated by{" "}
            <span className="text-[#0F7377] font-medium">GrowthLab</span>
          </p>
          <p className="text-xs text-gray-400">© {currentYear}</p>
        </div>
      </div>
    </div>
  );
});
CompactVisitingCard.displayName = "CompactVisitingCard";

export default function PublicDigitalNameCard({
  profileData,
  onConnect,
  onSchedule,
  isOwnProfile = false,
}: PublicDigitalNameCardProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const visitingCardRef = useRef<HTMLDivElement>(null);

  // Generate QR Code
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const cardUrl = `${window.location.origin}/card/${profileData.id}`;
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
  }, [profileData.id]);

  const handleShare = async () => {
    const cardUrl = `${window.location.origin}/card/${profileData.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData.name} - Digital Name Card`,
          text: `Check out ${profileData.name}'s digital name card on GrowthLab`,
          url: cardUrl,
        });
      } catch (error) {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = useCallback(async () => {
    try {
      const cardUrl = `${window.location.origin}/card/${profileData.id}`;
      await navigator.clipboard.writeText(cardUrl);
      setCopied(true);
      toast.success("Card link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  }, [profileData.id]);

  // Download compact visiting card as PNG (like settings/profile E-Card preview)
  const handleDownload = useCallback(async () => {
    if (!visitingCardRef.current) return;

    setDownloading(true);
    try {
      const canvas = await html2canvas(visitingCardRef.current, {
        scale: 3,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `${profileData.name.replace(
        /\s+/g,
        "_"
      )}_visiting_card.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();

      toast.success("Visiting card downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download card");
    } finally {
      setDownloading(false);
    }
  }, [profileData.name]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-6 px-4">
      {/* Hidden Compact Visiting Card for Download */}
      <div className="fixed -left-[9999px] -top-[9999px]">
        <CompactVisitingCard ref={visitingCardRef} data={profileData} />
      </div>

      <div className="max-w-4xl mx-auto">
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
                  Professional profile on GrowthLab
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
                      {downloading ? "..." : "Download"}
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
                  <AvatarImage
                    src={profileData.avatar}
                    alt={profileData.name}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white text-lg md:text-xl font-bold">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                    {profileData.name}
                  </h2>
                  {profileData.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-base md:text-lg text-[#0F7377] font-semibold mb-2">
                  {profileData.title}
                </p>
                {profileData.company && (
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-4">
                    {profileData.company}
                  </p>
                )}
                {profileData.bio && (
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {profileData.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="space-y-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  {profileData.email && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Mail className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={`mailto:${profileData.email}`}
                        className="text-sm md:text-base text-gray-600 hover:text-[#0F7377] transition-colors"
                      >
                        {profileData.email}
                      </a>
                    </div>
                  )}
                  {profileData.phone && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Phone className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={`tel:${profileData.phone}`}
                        className="text-sm md:text-base text-gray-600 hover:text-[#0F7377] transition-colors"
                      >
                        {profileData.phone}
                      </a>
                    </div>
                  )}
                  {profileData.location && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <MapPin className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <span className="text-sm md:text-base text-gray-600">
                        {profileData.location}
                      </span>
                    </div>
                  )}
                  {profileData.website && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <Globe className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={profileData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-base text-[#0F7377] hover:underline truncate"
                      >
                        {profileData.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                  Social Links
                </h3>
                <div className="space-y-3">
                  {profileData.linkedin && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={
                          profileData.linkedin.startsWith("http")
                            ? profileData.linkedin
                            : `https://linkedin.com/in/${profileData.linkedin}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-base text-[#0F7377] hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {profileData.twitter && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={
                          profileData.twitter.startsWith("http")
                            ? profileData.twitter
                            : `https://twitter.com/${profileData.twitter}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm md:text-base text-[#0F7377] hover:underline"
                      >
                        Twitter Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Roles Section */}
            {profileData.roles.length > 0 && (
              <div className="mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">
                  Professional Roles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {profileData.roles.map((role) => (
                    <Card
                      key={role.id}
                      className="border-2 hover:shadow-lg transition-all duration-300"
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
                            {!isOwnProfile && (
                              <div className="flex flex-col sm:flex-col gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs flex-1"
                                  onClick={onConnect}
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Connect
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs flex-1"
                                  onClick={onSchedule}
                                >
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Schedule
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Skills and Languages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
              {profileData.skills.length > 0 && (
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
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
              )}
              {profileData.languages.length > 0 && (
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((language, index) => (
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
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 md:mb-8">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5 border border-[#0F7377]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#0F7377] mb-1">
                  {profileData.totalConnections}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Connections
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1">
                  {profileData.totalEngagement}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  Engagement
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#10B981] mb-1">
                  {profileData.totalPosts}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Posts</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 border border-[#8B5CF6]/20">
                <div className="text-2xl md:text-3xl font-bold text-[#8B5CF6] mb-1">
                  {profileData.isVerified ? "Yes" : "No"}
                </div>
                <div className="text-xs md:text-sm text-gray-600">Verified</div>
              </div>
            </div>

            {/* Action Buttons for non-own profiles */}
            {!isOwnProfile && (
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t">
                <Button
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90"
                  onClick={onConnect}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
                <Button variant="outline" onClick={onSchedule}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Card
                </Button>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t text-center">
              <p className="text-xs text-gray-400">
                <span className="text-[#0F7377] font-medium">GrowthLab</span>{" "}
                Digital Name Card
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
