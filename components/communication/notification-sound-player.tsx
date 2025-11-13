"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationSoundPlayerProps {
  sounds: Array<{
    id: string
    name: string
    url: string
  }>
  defaultSound?: string
  defaultVolume?: number
  onSoundChange?: (soundId: string) => void
  onVolumeChange?: (volume: number) => void
  className?: string
}

export function NotificationSoundPlayer({
  sounds,
  defaultSound,
  defaultVolume = 0.5,
  onSoundChange,
  onVolumeChange,
  className,
}: NotificationSoundPlayerProps) {
  const [selectedSound, setSelectedSound] = useState(defaultSound || sounds[0]?.id)
  const [volume, setVolume] = useState(defaultVolume)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio()

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleSoundChange = (soundId: string) => {
    setSelectedSound(soundId)
    onSoundChange?.(soundId)
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }

    onVolumeChange?.(newVolume)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)

    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const playSound = () => {
    const sound = sounds.find((s) => s.id === selectedSound)
    if (!sound || !audioRef.current) return

    audioRef.current.src = sound.url
    audioRef.current.volume = volume
    audioRef.current.muted = isMuted
    audioRef.current.play()
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Notification Sound</Label>
          <Button variant="outline" size="sm" onClick={playSound}>
            Play
          </Button>
        </div>

        <RadioGroup value={selectedSound} onValueChange={handleSoundChange}>
          <div className="grid grid-cols-2 gap-2">
            {sounds.map((sound) => (
              <div key={sound.id} className="flex items-center space-x-2">
                <RadioGroupItem value={sound.id} id={sound.id} />
                <Label htmlFor={sound.id} className="text-sm cursor-pointer">
                  {sound.name}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Volume</Label>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>

        <Slider
          defaultValue={[volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className={cn(isMuted && "opacity-50")}
        />
      </div>
    </div>
  )
}
