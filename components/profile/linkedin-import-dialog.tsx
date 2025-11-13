"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Linkedin, Download, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LinkedInService } from "@/lib/linkedin-service"
import type { LinkedInProfile } from "@/lib/linkedin-service"
import { mockEnvVariables } from "@/lib/mock-env-variables"

// Use mock environment variables
const CLIENT_ID = mockEnvVariables.LINKEDIN_CLIENT_ID || "mock-linkedin-client-id"

enum ImportStep {
  CONNECT = 0,
  PREVIEW = 1,
  IMPORTING = 2,
  COMPLETE = 3,
  ERROR = 4,
}

interface LinkedInImportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProfileImported?: (profile: any) => void
}

export function LinkedInImportDialog({ open, onOpenChange, onProfileImported }: LinkedInImportDialogProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState<ImportStep>(ImportStep.CONNECT)
  const [profile, setProfile] = useState<LinkedInProfile | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    try {
      // In a real app, this would redirect to LinkedIn OAuth
      // For mock purposes, we'll simulate the flow
      setStep(ImportStep.PREVIEW)

      // Get mock profile data
      const mockProfile = await LinkedInService.getProfile("mock-token")
      setProfile(mockProfile)
    } catch (err) {
      console.error("Error connecting to LinkedIn:", err)
      setError("Failed to connect to LinkedIn. Please try again.")
      setStep(ImportStep.ERROR)
    }
  }

  const handleImport = async () => {
    if (!profile) return

    setStep(ImportStep.IMPORTING)

    try {
      // Simulate import process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Map LinkedIn profile to user data
      const userData = LinkedInService.mapProfileToUser(profile)

      if (onProfileImported) {
        onProfileImported(userData)
      }

      setStep(ImportStep.COMPLETE)

      toast({
        title: "Profile imported successfully",
        description: "Your LinkedIn profile data has been imported.",
      })
    } catch (err) {
      console.error("Error importing profile:", err)
      setError("Failed to import profile data. Please try again.")
      setStep(ImportStep.ERROR)
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset state when dialog closes
    setTimeout(() => {
      setStep(ImportStep.CONNECT)
      setProfile(null)
      setError(null)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-[#0A66C2]" />
            Import LinkedIn Profile
          </DialogTitle>
          <DialogDescription>
            Connect your LinkedIn account to import your professional profile information.
          </DialogDescription>
        </DialogHeader>

        {step === ImportStep.CONNECT && (
          <div className="space-y-4 py-4">
            <div className="bg-muted rounded-lg p-4 space-y-4">
              <h3 className="font-medium">Why connect your LinkedIn profile?</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Create a complete profile on GrowthLab quickly</li>
                <li>Keep your professional information up-to-date</li>
                <li>Showcase your experience and skills to the community</li>
                <li>Connect with other professionals in your network</li>
              </ul>
            </div>
            <div className="bg-[#EEF3F8] text-[#0A66C2] rounded-lg p-6 text-center">
              <Image
                src="/professional-connections.png"
                alt="LinkedIn connections"
                width={150}
                height={150}
                className="mx-auto mb-4"
              />
              <h3 className="font-semibold text-lg mb-2">Connect with your professional network</h3>
              <p className="text-sm mb-4">Import your LinkedIn profile to enhance your networking opportunities</p>
            </div>
          </div>
        )}

        {step === ImportStep.PREVIEW && profile && (
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-4 mb-4">
              {profile.profilePicture ? (
                <Image
                  src={profile.profilePicture || "/placeholder.svg"}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">{profile.headline}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Profile Information</h4>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm">
                        {profile.location?.city}, {profile.location?.country}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Industry</p>
                      <p className="text-sm">{profile.industry}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Experience ({profile.positions.length})</h4>
              <Card>
                <CardContent className="pt-6 pb-2">
                  <div className="space-y-4">
                    {profile.positions.slice(0, 2).map((position) => (
                      <div key={position.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <h5 className="font-medium">{position.title}</h5>
                        <p className="text-sm">{position.company}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(position.startDate.year, position.startDate.month - 1).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                          })}{" "}
                          -
                          {position.endDate
                            ? new Date(position.endDate.year, position.endDate.month - 1).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })
                            : " Present"}
                        </p>
                      </div>
                    ))}
                    {profile.positions.length > 2 && (
                      <p className="text-xs text-muted-foreground">+ {profile.positions.length - 2} more positions</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Education ({profile.education.length})</h4>
              <Card>
                <CardContent className="pt-6 pb-2">
                  <div className="space-y-4">
                    {profile.education.slice(0, 2).map((edu) => (
                      <div key={edu.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <h5 className="font-medium">{edu.school}</h5>
                        <p className="text-sm">
                          {edu.degree}, {edu.fieldOfStudy}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {edu.startDate?.year} - {edu.endDate?.year || "Present"}
                        </p>
                      </div>
                    ))}
                    {profile.education.length > 2 && (
                      <p className="text-xs text-muted-foreground">+ {profile.education.length - 2} more education</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Skills ({profile.skills.length})</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.slice(0, 8).map((skill) => (
                  <Badge key={skill.id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
                {profile.skills.length > 8 && <Badge variant="outline">+{profile.skills.length - 8} more</Badge>}
              </div>
            </div>
          </div>
        )}

        {step === ImportStep.IMPORTING && (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">Importing your profile</h3>
            <p className="text-sm text-muted-foreground text-center">
              Please wait while we import your LinkedIn profile data. This may take a moment.
            </p>
          </div>
        )}

        {step === ImportStep.COMPLETE && (
          <div className="py-12 flex flex-col items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Import Complete</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Your LinkedIn profile has been successfully imported to GrowthLab.
            </p>
            <Button
              onClick={() => {
                handleClose()
                router.refresh()
              }}
            >
              View Your Updated Profile
            </Button>
          </div>
        )}

        {step === ImportStep.ERROR && (
          <div className="py-12 flex flex-col items-center justify-center">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h3 className="text-lg font-medium mb-2">Import Failed</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {error || "There was an error importing your LinkedIn profile. Please try again."}
            </p>
            <Button onClick={() => setStep(ImportStep.CONNECT)}>Try Again</Button>
          </div>
        )}

        <DialogFooter>
          {step === ImportStep.CONNECT && (
            <Button onClick={handleConnect} className="bg-[#0A66C2] hover:bg-[#004182]">
              <Linkedin className="mr-2 h-4 w-4" />
              Connect with LinkedIn
            </Button>
          )}

          {step === ImportStep.PREVIEW && (
            <>
              <Button variant="outline" onClick={handleClose} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleImport}>
                <Download className="mr-2 h-4 w-4" />
                Import Profile
              </Button>
            </>
          )}

          {step === ImportStep.IMPORTING && (
            <Button variant="outline" disabled>
              Importing...
            </Button>
          )}

          {(step === ImportStep.COMPLETE || step === ImportStep.ERROR) && step !== ImportStep.CONNECT && (
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
