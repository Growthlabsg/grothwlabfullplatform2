"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getUserConsentSettings, updateUserConsentSettings, getPrivacyRegulations } from "@/lib/privacy-consent-service"
import { ExternalLink, Info, ShieldAlert } from "lucide-react"

interface RecordingConsentDialogProps {
  isOpen: boolean
  onClose: (consented: boolean) => void
  callId: string
  recordingType: "audio" | "video" | "both"
}

export function RecordingConsentDialog({ isOpen, onClose, callId, recordingType }: RecordingConsentDialogProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [recordingConsent, setRecordingConsent] = useState(false)
  const [transcriptionConsent, setTranscriptionConsent] = useState(false)
  const [rememberConsent, setRememberConsent] = useState(false)
  const [regulations, setRegulations] = useState(getPrivacyRegulations())
  const [showRegulationDetails, setShowRegulationDetails] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      const loadConsentSettings = async () => {
        setIsLoading(true)
        try {
          // In a real app, you would get the actual user ID
          const settings = await getUserConsentSettings("current-user-id")
          setRecordingConsent(settings.recordingConsent)
          setTranscriptionConsent(settings.transcriptionConsent)
        } catch (error) {
          console.error("Error loading consent settings:", error)
        } finally {
          setIsLoading(false)
        }
      }

      loadConsentSettings()
    }
  }, [isOpen])

  const handleSaveConsent = async () => {
    if (rememberConsent) {
      try {
        // Update user's consent preferences
        await updateUserConsentSettings("current-user-id", {
          recordingConsent,
          transcriptionConsent,
        })
      } catch (error) {
        console.error("Error updating consent settings:", error)
      }
    }

    // Close dialog and pass consent status back
    onClose(recordingConsent)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose(false)}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Call Recording Consent</DialogTitle>
          <DialogDescription>Your consent is required before we can record this call.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="py-8 text-center">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
            <p>Loading your preferences...</p>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <Alert>
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Important Privacy Notice</AlertTitle>
              <AlertDescription>
                Recording this call will capture{" "}
                {recordingType === "both"
                  ? "audio, video, and potentially shared screens"
                  : recordingType === "video"
                    ? "audio, video, and potentially shared screens"
                    : "audio and potentially shared screens"}
                .
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  id="recording-consent"
                  checked={recordingConsent}
                  onCheckedChange={(checked) => setRecordingConsent(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="recording-consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to this call being recorded
                  </label>
                  <p className="text-sm text-muted-foreground">
                    The recording will be stored securely and used only for the stated purposes.
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  id="transcription-consent"
                  checked={transcriptionConsent}
                  onCheckedChange={(checked) => setTranscriptionConsent(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="transcription-consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to transcription of the call
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Audio will be processed to create a text transcript of the conversation.
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-start space-x-3 space-y-0">
                <Checkbox
                  id="remember-consent"
                  checked={rememberConsent}
                  onCheckedChange={(checked) => setRememberConsent(checked === true)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="remember-consent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember my preferences
                  </label>
                  <p className="text-sm text-muted-foreground">Save these settings for future calls.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Applicable Privacy Regulations</h3>
              <div className="space-y-2">
                {regulations.map((regulation) => (
                  <div key={regulation.id} className="text-sm border rounded-md">
                    <div
                      className="flex justify-between items-center p-2 cursor-pointer hover:bg-muted"
                      onClick={() =>
                        setShowRegulationDetails(showRegulationDetails === regulation.id ? null : regulation.id)
                      }
                    >
                      <span className="font-medium">{regulation.name}</span>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>

                    {showRegulationDetails === regulation.id && (
                      <div className="p-3 border-t bg-muted/50">
                        <p className="mb-2">{regulation.description}</p>
                        <h4 className="text-xs font-medium mb-1">Key requirements:</h4>
                        <ul className="text-xs list-disc pl-5 mb-2 space-y-1">
                          {regulation.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                        <a
                          href={regulation.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center text-blue-600 hover:underline"
                        >
                          Learn more
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(false)}>
            Decline
          </Button>
          <Button onClick={handleSaveConsent} disabled={isLoading || !recordingConsent}>
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
