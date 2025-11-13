"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Users, Phone, Video } from "lucide-react"
import { useCommunicationActions } from "@/hooks/use-communication-actions"
import { cn } from "@/lib/utils"

interface GlobalCommunicationButtonProps {
  user?: any
  groupName?: string
  groupMembers?: any[]
  variant?: "connect" | "message" | "chat" | "group"
  size?: "sm" | "default" | "lg"
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function GlobalCommunicationButton({
  user,
  groupName,
  groupMembers = [],
  variant = "connect",
  size = "default",
  className,
  children,
  onClick,
  disabled = false
}: GlobalCommunicationButtonProps) {
  const { handleConnect, handleMessage, handleChat, handleGroupChat } = useCommunicationActions()

  const getButtonProps = () => {
    const handleClick = () => {
      switch (variant) {
        case "connect":
          user && handleConnect(user)
          break
        case "message":
          user && handleMessage(user)
          break
        case "chat":
          handleChat()
          break
        case "group":
          groupName && handleGroupChat(groupName, groupMembers)
          break
        default:
          handleChat()
      }
      onClick?.()
    }

    // Check connection status for message variant
    const isConnected = user?.isConnected || user?.connectionStatus === 'connected'
    const isPending = user?.isPending || user?.connectionStatus === 'pending'

    switch (variant) {
      case "connect":
        return {
          onClick: handleClick,
          icon: <MessageSquare className="h-4 w-4 mr-2" />,
          text: isConnected ? "Connected" : isPending ? "Pending" : "Connect",
          disabled: disabled || isConnected || isPending
        }
      case "message":
        return {
          onClick: handleClick,
          icon: <MessageSquare className="h-4 w-4 mr-2" />,
          text: "Message",
          disabled: disabled || !isConnected
        }
      case "chat":
        return {
          onClick: handleClick,
          icon: <MessageSquare className="h-4 w-4 mr-2" />,
          text: "Chat",
          disabled: disabled
        }
      case "group":
        return {
          onClick: handleClick,
          icon: <Users className="h-4 w-4 mr-2" />,
          text: groupName || "Group Chat",
          disabled: disabled
        }
      default:
        return {
          onClick: handleClick,
          icon: <MessageSquare className="h-4 w-4 mr-2" />,
          text: "Chat",
          disabled: disabled
        }
    }
  }

  const buttonProps = getButtonProps()

  return (
    <Button
      onClick={buttonProps.onClick}
      size={size}
      disabled={buttonProps.disabled}
      className={cn(
        variant === "connect" && !buttonProps.disabled && "bg-[#0F7377] hover:bg-[#0F7377]/90 text-white",
        buttonProps.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {buttonProps.icon}
      {children || buttonProps.text}
    </Button>
  )
}

// Quick action buttons for common communication needs
export function QuickCommunicationButtons({ user }: { user?: any }) {
  const { handleConnect, handleMessage, handleChat } = useCommunicationActions()

  const isConnected = user?.isConnected || user?.connectionStatus === 'connected'
  const isPending = user?.isPending || user?.connectionStatus === 'pending'

  return (
    <div className="flex gap-2">
      {user && (
        <>
          <GlobalCommunicationButton
            user={user}
            variant="connect"
            size="sm"
            className="flex-1"
          >
            {isConnected ? "Connected" : isPending ? "Pending" : "Connect"}
          </GlobalCommunicationButton>
          <GlobalCommunicationButton
            user={user}
            variant="message"
            size="sm"
            className="flex-1"
          >
            Message
          </GlobalCommunicationButton>
        </>
      )}
      <GlobalCommunicationButton
        variant="chat"
        size="sm"
        className="flex-1"
      >
        Chat
      </GlobalCommunicationButton>
    </div>
  )
}
