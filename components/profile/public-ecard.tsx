"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  Calendar,
  Building,
  GraduationCap,
  Award,
  Star,
  UserPlus,
  Eye,
  Check,
  DollarSign,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import html2canvas from "html2canvas";

export interface PublicECardData {
  id: number;
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
  github?: string;
  role?: string;
  isVerified?: boolean;
  totalConnections?: number;
  totalPosts?: number;
  totalEngagement?: number;
  skills?: string[];
  languages?: string[];
  timezone?: string;
}

interface PublicECardProps {
  data: PublicECardData;
  isPublicView?: boolean;
  onConnect?: () => void;
  onViewProfile?: () => void;
  showActions?: boolean;
}

export default function PublicECard({
  data,
  isPublicView = true,
  onConnect,
  onViewProfile,
  showActions = true,
}: PublicECardProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  // Generate QR Code that points to this public card
  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const cardUrl = `${window.location.origin}/card/${data.id}`;
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
  }, [data.id]);

  const getRoleTitle = (role?: string): string => {
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
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case "mentor":
        return <GraduationCap className="w-4 h-4" />;
      case "investor":
        return <DollarSign className="w-4 h-4" />;
      case "startup_founder":
        return <Building className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case "mentor":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "investor":
        return "bg-green-100 text-green-800 border-green-200";
      case "startup_founder":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto">
        <Card
          ref={cardRef}
          className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50"
        >
          {/* Header with QR Code */}
          <CardHeader className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold mb-1">
                  Digital Name Card
                </h1>
              </div>
              {qrCodeDataUrl && (
                <div className="bg-white p-2 rounded-lg">
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    className="w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-4 md:p-6">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-6">
              <div className="flex-shrink-0 flex justify-center md:justify-start">
                <Avatar className="w-24 h-24 md:w-28 md:h-28 border-4 border-white shadow-lg">
                  <AvatarImage src={data.avatar} alt={data.name} />
                  <AvatarFallback className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white text-xl font-bold">
                    {data.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                    {data.name}
                  </h2>
                  {data.isVerified && (
                    <Badge
                      variant="secondary"
                      className="self-center md:self-auto"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-base md:text-lg text-[#0F7377] font-semibold mb-1">
                  {data.title}
                </p>
                {data.company && (
                  <p className="text-sm md:text-base text-gray-600 mb-2">
                    {data.company}
                  </p>
                )}
                {data.role && (
                  <Badge className={`${getRoleColor(data.role)} mb-3`}>
                    {getRoleIcon(data.role)}
                    <span className="ml-1">{getRoleTitle(data.role)}</span>
                  </Badge>
                )}
                {data.bio && (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {data.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  {data.email && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <Mail className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <span className="text-sm text-gray-600 truncate">
                        {data.email}
                      </span>
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <Phone className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {data.phone}
                      </span>
                    </div>
                  )}
                  {data.location && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <MapPin className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {data.location}
                      </span>
                    </div>
                  )}
                  {data.website && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <Globe className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={data.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0F7377] hover:underline truncate"
                      >
                        {data.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Social Links
                </h3>
                <div className="space-y-2">
                  {data.linkedin && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={
                          data.linkedin.startsWith("http")
                            ? data.linkedin
                            : `https://linkedin.com/in/${data.linkedin}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0F7377] hover:underline"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  {data.twitter && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={
                          data.twitter.startsWith("http")
                            ? data.twitter
                            : `https://twitter.com/${data.twitter}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0F7377] hover:underline"
                      >
                        Twitter Profile
                      </a>
                    </div>
                  )}
                  {data.github && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <LinkIcon className="w-4 h-4 text-[#0F7377] flex-shrink-0" />
                      <a
                        href={
                          data.github.startsWith("http")
                            ? data.github
                            : `https://github.com/${data.github}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#0F7377] hover:underline"
                      >
                        GitHub Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            {(data.totalConnections !== undefined ||
              data.totalPosts !== undefined) && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#0F7377]/10 to-[#0F7377]/5 border border-[#0F7377]/20">
                  <div className="text-xl font-bold text-[#0F7377]">
                    {data.totalConnections ?? 0}
                  </div>
                  <div className="text-xs text-gray-600">Connections</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 border border-[#10B981]/20">
                  <div className="text-xl font-bold text-[#10B981]">
                    {data.totalPosts ?? 0}
                  </div>
                  <div className="text-xs text-gray-600">Posts</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-[#F59E0B]/10 to-[#F59E0B]/5 border border-[#F59E0B]/20">
                  <div className="text-xl font-bold text-[#F59E0B]">
                    {data.totalEngagement ?? 0}
                  </div>
                  <div className="text-xs text-gray-600">Engagement</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {showActions && (
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button
                  className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white flex-1"
                  onClick={onConnect}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Connect
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onViewProfile}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Full Profile
                </Button>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                Powered by{" "}
                <span className="text-[#0F7377] font-semibold">GrowthLab</span>
                {currentDate && ` • ${currentDate}`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Export a function to download the e-card as PNG
export async function downloadECardAsPng(
  cardElement: HTMLElement,
  userName: string
): Promise<void> {
  try {
    const canvas = await html2canvas(cardElement, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const link = document.createElement("a");
    link.download = `${userName.replace(/\s+/g, "_")}_ecard.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    toast.success("E-Card downloaded successfully!");
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download E-Card");
    throw error;
  }
}

// Export a function to download QR code as PNG
export async function downloadQRCodeAsPng(
  userId: number | string,
  userName: string
): Promise<void> {
  try {
    const cardUrl = `${window.location.origin}/card/${userId}`;
    const qrDataUrl = await QRCode.toDataURL(cardUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: "#0F7377",
        light: "#FFFFFF",
      },
    });

    const link = document.createElement("a");
    link.download = `${userName.replace(/\s+/g, "_")}_qr_code.png`;
    link.href = qrDataUrl;
    link.click();

    toast.success("QR Code downloaded successfully!");
  } catch (error) {
    console.error("QR download error:", error);
    toast.error("Failed to download QR Code");
    throw error;
  }
}
