"use client";

import { useMemo } from "react";
import QRCode from "react-qr-code";
import { QrCode, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarQRCodeProps {
  user: any;
  isCollapsed: boolean;
  openQRGenerator?: () => void;
}

export function SidebarQRCode({
  user,
  isCollapsed,
  openQRGenerator,
}: SidebarQRCodeProps) {
  const qrCodeData = useMemo(() => {
    if (!user) return null;
    return JSON.stringify({
      type: "unified",
      userId: user.id,
      profileUrl: `${
        typeof window !== "undefined" ? window.location.origin : ""
      }/profile`,
      settingsUrl: `${
        typeof window !== "undefined" ? window.location.origin : ""
      }/settings/profile`,
      timestamp: Date.now(),
    });
  }, [user?.id]);

  if (!user || !qrCodeData) return null;

  return (
    <div
      className={`flex flex-col items-center py-1 px-2 gap-2 ${
        isCollapsed ? "scale-75" : ""
      }`}
    >
      {/* {!isCollapsed && (
        <div className="flex items-center justify-between w-full">
          <h4 className="text-xs font-medium text-muted-foreground">
            MY QR CODE
          </h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={openQRGenerator}
            title="Open QR code options"
          >
            <QrCode className="h-3 w-3" />
          </Button>
        </div>
      )} */}

      {/* <div
        className={`bg-white p-2 rounded-lg cursor-pointer transition-all duration-200 
          hover:shadow-md ${isCollapsed ? "scale-90" : ""}`}
        onClick={openQRGenerator}
        title="Click to expand and share"
      >
        <QRCode
          value={qrCodeData}
          size={isCollapsed ? 48 : 128}
          level="M"
          className="h-auto max-w-full"
        />
      </div> */}

      {/* {!isCollapsed && (
        <div className="text-xs text-center text-muted-foreground">
          Scan to view my profile
        </div>
      )} */}

      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2"
        onClick={() => (window.location.href = "/connect/scan")}
      >
        <QrCode className="w-3 h-3 mr-2" />
        Scan QR
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2"
        onClick={() => (window.location.href = "/profile")}
      >
        <CreditCard className="w-3 h-3 mr-2" />
        E-Card
      </Button>
    </div>
  );
}
