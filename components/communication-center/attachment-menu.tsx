import { Button } from "@/components/ui/button"
import { ImageIcon, FileText, Mic, Video, MapPin, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

interface AttachmentMenuProps {
  compact?: boolean
}

export function AttachmentMenu({ compact = false }: AttachmentMenuProps) {
  const attachmentTypes = [
    { icon: <ImageIcon className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />, label: "Image", color: "text-blue-500" },
    {
      icon: <FileText className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />,
      label: "Document",
      color: "text-red-500",
    },
    { icon: <Mic className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />, label: "Audio", color: "text-purple-500" },
    { icon: <Video className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />, label: "Video", color: "text-green-500" },
    {
      icon: <MapPin className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />,
      label: "Location",
      color: "text-orange-500",
    },
    { icon: <Paperclip className={compact ? "h-2.5 w-2.5" : "h-3.5 w-3.5"} />, label: "Other", color: "text-gray-500" },
  ]

  return (
    <div className={cn("bg-background border rounded-md shadow-md overflow-hidden", compact ? "p-0.5" : "p-1")}>
      <div className="grid grid-cols-3 gap-1">
        {attachmentTypes.map((type, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "flex flex-col items-center justify-center gap-0.5",
              compact ? "h-16 w-16 p-1" : "h-20 w-20 p-2",
              type.color,
            )}
          >
            <div
              className={cn("rounded-full flex items-center justify-center bg-muted", compact ? "h-7 w-7" : "h-9 w-9")}
            >
              {type.icon}
            </div>
            <span className={compact ? "text-[9px]" : "text-xs"}>{type.label}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
