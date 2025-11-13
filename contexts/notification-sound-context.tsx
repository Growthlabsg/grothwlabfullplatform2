"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

// Define notification types
export type NotificationType = "message" | "mention" | "call" | "system"

// Define notification sound settings
export interface NotificationSoundSettings {
  enabled: boolean
  volume: number
  doNotDisturb: boolean
  doNotDisturbStart: string
  doNotDisturbEnd: string
  sounds: {
    message: string
    mention: string
    call: string
    system: string
  }
}

// Define context type
interface NotificationSoundContextType {
  settings: NotificationSoundSettings
  updateSettings: (settings: Partial<NotificationSoundSettings>) => void
  playSound: (type: NotificationType) => void
  toggleMute: () => void
  toggleDoNotDisturb: () => void
  isInDoNotDisturbPeriod: boolean
}

// Default settings
const defaultSettings: NotificationSoundSettings = {
  enabled: true,
  volume: 0.5,
  doNotDisturb: false,
  doNotDisturbStart: "22:00",
  doNotDisturbEnd: "08:00",
  sounds: {
    message: "/sounds/ping.mp3",
    mention: "/sounds/bell.mp3",
    call: "/sounds/chime.mp3",
    system: "/sounds/subtle.mp3",
  },
}

// Create context
const NotificationSoundContext = createContext<NotificationSoundContextType | undefined>(undefined)

export function NotificationSoundProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<NotificationSoundSettings>(defaultSettings)
  const [isInDoNotDisturbPeriod, setIsInDoNotDisturbPeriod] = useState<boolean>(false)

  const updateSettings = (newSettings: Partial<NotificationSoundSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const toggleMute = () => {
    updateSettings({ enabled: !settings.enabled })
  }

  const toggleDoNotDisturb = () => {
    updateSettings({ doNotDisturb: !settings.doNotDisturb })
  }

  const playSound = (type: NotificationType) => {
    // Simple implementation - just log for now
    console.log(`Playing sound for ${type}`)
  }

  return (
    <NotificationSoundContext.Provider
      value={{
        settings,
        updateSettings,
        playSound,
        toggleMute,
        toggleDoNotDisturb,
        isInDoNotDisturbPeriod,
      }}
    >
      {children}
    </NotificationSoundContext.Provider>
  )
}

export function useNotificationSound() {
  const context = useContext(NotificationSoundContext)
  if (context === undefined) {
    throw new Error("useNotificationSound must be used within a NotificationSoundProvider")
  }
  return context
}
