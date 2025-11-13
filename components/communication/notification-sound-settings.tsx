"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Play, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

// Define sound options
const soundOptions = [
  { id: "chime", name: "Chime", path: "/sounds/chime.mp3" },
  { id: "bell", name: "Bell", path: "/sounds/bell.mp3" },
  { id: "ping", name: "Ping", path: "/sounds/ping.mp3" },
  { id: "pop", name: "Pop", path: "/sounds/pop.mp3" },
  { id: "subtle", name: "Subtle", path: "/sounds/subtle.mp3" },
]

// Define notification types
const notificationTypes = [
  { id: "message", name: "New Message" },
  { id: "mention", name: "Mentions" },
  { id: "call", name: "Incoming Calls" },
  { id: "system", name: "System Notifications" },
]

export function NotificationSoundSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    enabled: true,
    volume: 70,
    sounds: {
      message: "chime",
      mention: "bell",
      call: "ping",
      system: "subtle",
    },
    doNotDisturb: {
      enabled: false,
      startTime: "22:00",
      endTime: "07:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    },
  })

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("notificationSoundSettings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse saved notification settings", e)
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notificationSoundSettings", JSON.stringify(settings))
  }, [settings])

  // Play sound sample
  const playSound = (soundId: string) => {
    const sound = soundOptions.find((s) => s.id === soundId)
    if (sound) {
      const audio = new Audio(sound.path)
      audio.volume = settings.volume / 100
      audio.play()
      toast({
        title: "Playing Sound",
        description: `Now playing: ${sound.name}`,
        duration: 2000,
      })
    }
  }

  // Handle sound selection change
  const handleSoundChange = (type: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      sounds: {
        ...prev.sounds,
        [type]: value,
      },
    }))
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      volume: value[0],
    }))
  }

  // Handle enabled toggle
  const handleEnabledToggle = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      enabled: checked,
    }))
  }

  // Handle Do Not Disturb toggle
  const handleDNDToggle = (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      doNotDisturb: {
        ...prev.doNotDisturb,
        enabled: checked,
      },
    }))
  }

  // Handle time change
  const handleTimeChange = (timeType: "startTime" | "endTime", value: string) => {
    setSettings((prev) => ({
      ...prev,
      doNotDisturb: {
        ...prev.doNotDisturb,
        [timeType]: value,
      },
    }))
  }

  // Handle day selection
  const handleDayToggle = (day: string) => {
    setSettings((prev) => {
      const days = [...prev.doNotDisturb.days]
      if (days.includes(day)) {
        return {
          ...prev,
          doNotDisturb: {
            ...prev.doNotDisturb,
            days: days.filter((d) => d !== day),
          },
        }
      } else {
        return {
          ...prev,
          doNotDisturb: {
            ...prev.doNotDisturb,
            days: [...days, day],
          },
        }
      }
    })
  }

  // Days of the week
  const daysOfWeek = [
    { id: "monday", label: "Mon" },
    { id: "tuesday", label: "Tue" },
    { id: "wednesday", label: "Wed" },
    { id: "thursday", label: "Thu" },
    { id: "friday", label: "Fri" },
    { id: "saturday", label: "Sat" },
    { id: "sunday", label: "Sun" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sound Settings</CardTitle>
          <CardDescription>Customize notification sounds and volume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {settings.enabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              <Label htmlFor="sound-enabled">Enable notification sounds</Label>
            </div>
            <Switch id="sound-enabled" checked={settings.enabled} onCheckedChange={handleEnabledToggle} />
          </div>

          <div className="space-y-3">
            <Label htmlFor="volume-slider">Volume: {settings.volume}%</Label>
            <div className="flex items-center space-x-4">
              <VolumeX className="h-4 w-4 text-muted-foreground" />
              <Slider
                id="volume-slider"
                disabled={!settings.enabled}
                value={[settings.volume]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="flex-1"
              />
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Sounds</h3>
            {notificationTypes.map((type) => (
              <div key={type.id} className="grid grid-cols-[1fr,auto] gap-4 items-center">
                <div>
                  <Label htmlFor={`sound-${type.id}`}>{type.name}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Select
                    disabled={!settings.enabled}
                    value={settings.sounds[type.id as keyof typeof settings.sounds]}
                    onValueChange={(value) => handleSoundChange(type.id, value)}
                  >
                    <SelectTrigger id={`sound-${type.id}`} className="w-[180px]">
                      <SelectValue placeholder="Select sound" />
                    </SelectTrigger>
                    <SelectContent>
                      {soundOptions.map((sound) => (
                        <SelectItem key={sound.id} value={sound.id}>
                          {sound.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    variant="outline"
                    disabled={!settings.enabled}
                    onClick={() => playSound(settings.sounds[type.id as keyof typeof settings.sounds])}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Do Not Disturb</CardTitle>
          <CardDescription>Schedule quiet hours for notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <Label htmlFor="dnd-enabled">Enable Do Not Disturb</Label>
            </div>
            <Switch id="dnd-enabled" checked={settings.doNotDisturb.enabled} onCheckedChange={handleDNDToggle} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time">Start Time</Label>
              <input
                id="start-time"
                type="time"
                value={settings.doNotDisturb.startTime}
                onChange={(e) => handleTimeChange("startTime", e.target.value)}
                disabled={!settings.doNotDisturb.enabled}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">End Time</Label>
              <input
                id="end-time"
                type="time"
                value={settings.doNotDisturb.endTime}
                onChange={(e) => handleTimeChange("endTime", e.target.value)}
                disabled={!settings.doNotDisturb.enabled}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Active Days</Label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeek.map((day) => (
                <Button
                  key={day.id}
                  variant={settings.doNotDisturb.days.includes(day.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDayToggle(day.id)}
                  disabled={!settings.doNotDisturb.enabled}
                  className="min-w-[3rem]"
                >
                  {day.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
