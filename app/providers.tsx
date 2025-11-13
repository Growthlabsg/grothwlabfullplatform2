"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { QRCodeProvider } from "@/contexts/qr-code-context"
import { AuthProvider } from "@/contexts/auth-context"
import { SubscriptionProvider } from "@/contexts/subscription-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { NotificationSoundProvider } from "@/contexts/notification-sound-context"
import { LanguageProvider } from "@/contexts/language-context"
import { CofounderProvider } from "@/contexts/CofounderContext"
import { JobProvider } from "@/contexts/JobContext"
import { CommunicationProvider } from "@/contexts/CommunicationContext"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
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
      </AuthProvider>
    </ThemeProvider>
  )
}
