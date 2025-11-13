import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ReadReceiptProps {
  readers: Array<{
    id: string
    name: string
    avatar?: string
    readAt: Date
  }>
  className?: string
  compact?: boolean
}

export function ReadReceipt({ readers, className, compact = false }: ReadReceiptProps) {
  if (readers.length === 0) return null

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  return (
    <div className={cn("flex items-center", className)}>
      <div className="flex -space-x-1 mr-1">
        {readers.slice(0, 3).map((reader) => (
          <TooltipProvider key={reader.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className={cn(compact ? "h-4 w-4" : "h-5 w-5", "border border-background")}>
                  <AvatarImage src={reader.avatar || "/placeholder.svg"} alt={reader.name} />
                  <AvatarFallback className={cn(compact ? "text-[8px]" : "text-[10px]")}>
                    {reader.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                {reader.name} • Read at {formatTime(reader.readAt)}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
      {readers.length > 3 && <span className="text-xs text-muted-foreground">+{readers.length - 3} more</span>}
    </div>
  )
}
