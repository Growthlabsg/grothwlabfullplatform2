"use client"

import { useState } from "react"
import { Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { LinkedInImportDialog } from "@/components/profile/linkedin-import-dialog"
import { useAuth } from "@/contexts/auth-context"

interface LinkedInImportButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function LinkedInImportButton({ variant = "outline", size = "default", className }: LinkedInImportButtonProps) {
  const { user, updateUser } = useAuth()
  const { toast } = useToast()
  const [showImportDialog, setShowImportDialog] = useState(false)

  const handleProfileImported = (profileData: any) => {
    // In a real app, this would update the user profile in the database
    if (updateUser && user) {
      updateUser({
        ...user,
        ...profileData,
        linkedInImported: true,
        linkedInImportedAt: new Date().toISOString(),
      })
    }
  }

  return (
    <>
      <Button variant={variant} size={size} className={className} onClick={() => setShowImportDialog(true)}>
        <Linkedin className="mr-2 h-4 w-4" />
        Import from LinkedIn
      </Button>

      <LinkedInImportDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        onProfileImported={handleProfileImported}
      />
    </>
  )
}
