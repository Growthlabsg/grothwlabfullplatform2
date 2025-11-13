"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { Rocket, Users, DollarSign, GraduationCap, ChevronRight, ChevronLeft } from "lucide-react"

export function OnboardingFlow() {
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = React.useState(true)
  const [step, setStep] = React.useState(0)

  // Skip onboarding if user has already completed it
  React.useEffect(() => {
    if (user?.profileCompleted) {
      setOpen(false)
    }
  }, [user])

  const steps = [
    {
      title: "Welcome to GrowthLab",
      description: "Let's get you started on your startup journey",
      content: (
        <div className="flex flex-col items-center space-y-4 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 rounded-lg border">
              <Rocket className="h-12 w-12 text-[#0F7377] mb-2" />
              <h3 className="font-medium">Accelerator Program</h3>
              <p className="text-sm text-center text-muted-foreground">Get funding and mentorship</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border">
              <Users className="h-12 w-12 text-[#0F7377] mb-2" />
              <h3 className="font-medium">Co-Founder Matching</h3>
              <p className="text-sm text-center text-muted-foreground">Find your perfect co-founder</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border">
              <DollarSign className="h-12 w-12 text-[#0F7377] mb-2" />
              <h3 className="font-medium">Funding Marketplace</h3>
              <p className="text-sm text-center text-muted-foreground">Connect with investors</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg border">
              <GraduationCap className="h-12 w-12 text-[#0F7377] mb-2" />
              <h3 className="font-medium">Startup School</h3>
              <p className="text-sm text-center text-muted-foreground">Learn from experts</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Complete Your Profile",
      description: "Help us personalize your experience",
      content: (
        <div className="space-y-4 py-6">
          <p>Complete your profile to get the most out of GrowthLab. This will help us:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Match you with the right co-founders</li>
            <li>Connect you with relevant investors</li>
            <li>Recommend events and resources</li>
            <li>Provide personalized mentorship</li>
          </ul>
          <Button
            className="w-full mt-4 bg-[#0F7377] hover:bg-[#0F7377]/90"
            onClick={() => router.push("/settings/profile")}
          >
            Complete Your Profile
          </Button>
        </div>
      ),
    },
    {
      title: "Explore GrowthLab",
      description: "Discover all the features available to you",
      content: (
        <div className="space-y-4 py-6">
          <div className="space-y-2">
            <h3 className="font-medium">Dashboard</h3>
            <p className="text-sm text-muted-foreground">
              Your personalized dashboard shows your progress, upcoming events, and recommendations.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Events</h3>
            <p className="text-sm text-muted-foreground">
              Join workshops, networking sessions, and demo days to connect with the community.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Resources</h3>
            <p className="text-sm text-muted-foreground">
              Access guides, templates, and tools to help you build your startup.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with fellow founders, investors, and mentors through our community channels.
            </p>
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      // Complete onboarding
      setOpen(false)
      toast({
        title: "Onboarding completed",
        description: "You're all set to start using GrowthLab!",
      })
      // In a real app, you would update the user's profile to mark onboarding as completed
    }
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    setOpen(false)
    toast({
      title: "Onboarding skipped",
      description: "You can always access the onboarding guide from your settings.",
    })
  }

  if (!open) return null

  const progress = ((step + 1) / steps.length) * 100

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{(steps[step] ? steps[step].title : undefined)}</DialogTitle>
          <DialogDescription>{(steps[step] ? steps[step].description : undefined)}</DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {(steps[step] ? steps[step].content : undefined)}

        <DialogFooter className="flex justify-between">
          <div>
            {step > 0 ? (
              <Button variant="outline" onClick={handlePrevious}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
            ) : (
              <Button variant="outline" onClick={handleSkip}>
                Skip
              </Button>
            )}
          </div>
          <Button onClick={handleNext}>
            {step < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
