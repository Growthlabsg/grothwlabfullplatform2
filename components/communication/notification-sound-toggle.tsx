"use client"
import { useNotificationSound } from "@/contexts/notification-sound-context"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Moon, Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface NotificationSoundToggleProps {
  className?: string
}

export function NotificationSoundToggle({ className }: NotificationSoundToggleProps) {
  const { settings, toggleMute, setVolume, toggleDoNotDisturb, playSound } = useNotificationSound()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative", className)}>
          {settings.doNotDisturb ? (
            <Moon className="h-5 w-5" />
          ) : settings.muted ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}

          {settings.doNotDisturb && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
            />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Sound Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="px-2 py-1.5">
          <div className="text-xs mb-1.5 text-muted-foreground">Volume</div>
          <div className="flex items-center gap-2">
            <VolumeX className="h-4 w-4 text-muted-foreground" />
            <Slider
              defaultValue={[settings.volume]}
              max={1}
              step={0.01}
              onValueChange={(value) => setVolume(value[0])}
              disabled={settings.muted}
              className={cn(settings.muted && "opacity-50")}
            />
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleMute}>
          {settings.muted ? (
            <>
              <Bell className="mr-2 h-4 w-4" />
              <span>Unmute Sounds</span>
            </>
          ) : (
            <>
              <VolumeX className="mr-2 h-4 w-4" />
              <span>Mute Sounds</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleDoNotDisturb}>
          {settings.doNotDisturb ? (
            <>
              <Bell className="mr-2 h-4 w-4" />
              <span>Turn Off Do Not Disturb</span>
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              <span>Enable Do Not Disturb</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => playSound("message")}>
          <Bell className="mr-2 h-4 w-4" />
          <span>Test Notification Sound</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <a href="/notifications/sound-settings">
            <Bell className="mr-2 h-4 w-4" />
            <span>Notification Settings</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
