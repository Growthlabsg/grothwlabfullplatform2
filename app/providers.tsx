"use client";

import type React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/lib/redux";
import { QRCodeProvider } from "@/contexts/qr-code-context";
import { AuthProvider } from "@/contexts/auth-context";
import { SubscriptionProvider } from "@/contexts/subscription-context";
import { NotificationProvider } from "@/contexts/notification-context";
import { NotificationSoundProvider } from "@/contexts/notification-sound-context";
import { LanguageProvider } from "@/contexts/language-context";
import { CofounderProvider } from "@/contexts/CofounderContext";
import { JobProvider } from "@/contexts/JobContext";
import { CommunicationProvider } from "@/contexts/CommunicationContext";
import { Toaster } from "@/components/ui/toaster";
import { AuthLoadingWrapper } from "@/components/layout/auth-loading-wrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>
          <AuthLoadingWrapper>
            <SubscriptionProvider>
              <NotificationProvider>
                <LanguageProvider>
                  <CofounderProvider>
                    <JobProvider>
                      <CommunicationProvider>
                        <QRCodeProvider>
                          <NotificationSoundProvider>
                            {children}
                            <Toaster />
                          </NotificationSoundProvider>
                        </QRCodeProvider>
                      </CommunicationProvider>
                    </JobProvider>
                  </CofounderProvider>
                </LanguageProvider>
              </NotificationProvider>
            </SubscriptionProvider>
          </AuthLoadingWrapper>
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
