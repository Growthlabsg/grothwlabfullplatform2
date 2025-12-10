"use client";

import React, { useRef, forwardRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { toast } from "sonner";

export interface VisitingCardData {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  skills?: string[];
  isVerified?: boolean;
}

interface VisitingCardProps {
  data: VisitingCardData;
  showQRCode?: boolean;
  compact?: boolean;
}

// Compact visiting card component (like business card)
export const VisitingCard = forwardRef<HTMLDivElement, VisitingCardProps>(
  ({ data, showQRCode = true, compact = false }, ref) => {
    const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>("");

    // Generate QR Code
    React.useEffect(() => {
      const generateQRCode = async () => {
        try {
          const cardUrl = `${window.location.origin}/card/${data.id}`;
          const qrDataUrl = await QRCode.toDataURL(cardUrl, {
            width: 80,
            margin: 1,
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
      if (showQRCode) {
        generateQRCode();
      }
    }, [data.id, showQRCode]);

    return (
      <div
        ref={ref}
        className={`bg-white rounded-xl shadow-lg ${
          compact ? "p-4" : "p-6"
        } max-w-md mx-auto border border-gray-100`}
      >
        {/* Header with Avatar and QR */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-4">
            <Avatar className={compact ? "w-14 h-14" : "w-16 h-16"}>
              <AvatarImage src={data.avatar} alt={data.name} />
              <AvatarFallback className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] text-white text-lg font-bold">
                {data.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4
                  className={`font-bold text-gray-900 ${
                    compact ? "text-base" : "text-lg"
                  }`}
                >
                  {data.name}
                </h4>
                {data.isVerified && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    <Check className="w-3 h-3" />
                  </Badge>
                )}
              </div>
              <p
                className={`text-[#0F7377] font-semibold ${
                  compact ? "text-sm" : "text-base"
                }`}
              >
                {data.title}
              </p>
              {data.company && (
                <p
                  className={`text-gray-600 ${compact ? "text-xs" : "text-sm"}`}
                >
                  {data.company}
                </p>
              )}
            </div>
          </div>
          {showQRCode && qrCodeDataUrl && (
            <div className="flex-shrink-0">
              <img
                src={qrCodeDataUrl}
                alt="QR Code"
                className={compact ? "w-14 h-14" : "w-16 h-16"}
              />
            </div>
          )}
        </div>

        {/* Contact Info */}
        <div className={`space-y-2 ${compact ? "text-xs" : "text-sm"}`}>
          {data.email && (
            <div className="flex items-center gap-2 text-gray-600">
              <Mail
                className={`${
                  compact ? "h-3 w-3" : "h-4 w-4"
                } text-[#0F7377] flex-shrink-0`}
              />
              <span className="truncate">{data.email}</span>
            </div>
          )}
          {data.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone
                className={`${
                  compact ? "h-3 w-3" : "h-4 w-4"
                } text-[#0F7377] flex-shrink-0`}
              />
              <span>{data.phone}</span>
            </div>
          )}
          {data.location && (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin
                className={`${
                  compact ? "h-3 w-3" : "h-4 w-4"
                } text-[#0F7377] flex-shrink-0`}
              />
              <span>{data.location}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center gap-2 text-gray-600">
              <Globe
                className={`${
                  compact ? "h-3 w-3" : "h-4 w-4"
                } text-[#0F7377] flex-shrink-0`}
              />
              <span className="truncate">
                {data.website.replace(/^https?:\/\//, "")}
              </span>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center gap-2 text-gray-600">
              <LinkIcon
                className={`${
                  compact ? "h-3 w-3" : "h-4 w-4"
                } text-[#0F7377] flex-shrink-0`}
              />
              <span className="truncate">
                {data.linkedin.includes("linkedin.com")
                  ? data.linkedin.replace(/^https?:\/\/(www\.)?/, "")
                  : `linkedin.com/in/${data.linkedin}`}
              </span>
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className={`${compact ? "mt-3 pt-3" : "mt-4 pt-4"} border-t`}>
            <div className="flex flex-wrap gap-1">
              {data.skills.slice(0, compact ? 3 : 4).map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${
                    compact ? "text-[10px] px-1.5 py-0" : "text-xs"
                  } bg-[#0F7377]/10 text-[#0F7377] border-[#0F7377]/20`}
                >
                  {skill}
                </Badge>
              ))}
              {data.skills.length > (compact ? 3 : 4) && (
                <Badge
                  variant="outline"
                  className={`${
                    compact ? "text-[10px] px-1.5 py-0" : "text-xs"
                  }`}
                >
                  +{data.skills.length - (compact ? 3 : 4)}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Footer Branding */}
        <div
          className={`${
            compact ? "mt-3 pt-2" : "mt-4 pt-3"
          } border-t border-gray-100 text-center`}
        >
          <p className={`${compact ? "text-[10px]" : "text-xs"} text-gray-400`}>
            <span className="text-[#0F7377] font-medium">GrowthLab</span>{" "}
            Digital Card
          </p>
        </div>
      </div>
    );
  }
);

VisitingCard.displayName = "VisitingCard";

// Function to download visiting card as PNG
export async function downloadVisitingCard(
  cardElement: HTMLElement,
  userName: string
): Promise<void> {
  try {
    const canvas = await html2canvas(cardElement, {
      scale: 3, // Higher quality
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    const link = document.createElement("a");
    link.download = `${userName.replace(/\s+/g, "_")}_visiting_card.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();

    toast.success("Visiting card downloaded!");
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download visiting card");
    throw error;
  }
}

// Function to download QR code as PNG
export async function downloadQRCode(
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

    toast.success("QR Code downloaded!");
  } catch (error) {
    console.error("QR download error:", error);
    toast.error("Failed to download QR Code");
    throw error;
  }
}

export default VisitingCard;
