import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Application Submitted | GrowthLab.sg",
  description: "Your application to become a GrowthLab teacher has been submitted successfully",
}

export default function TeacherSignupSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center border-b px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/images/GrowthLab Icon (1).png" alt="GrowthLab Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-[#333333]">GrowthLab</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h1 className="mb-4 text-2xl font-bold md:text-3xl">Application Submitted!</h1>

          <p className="mb-6 text-muted-foreground">
            Thank you for applying to be a GrowthLab teacher. We've received your application and will review it
            shortly. You'll receive an email with next steps within 2-3 business days.
          </p>

          <div className="mb-8 rounded-lg border bg-muted/40 p-4 text-left">
            <h2 className="mb-2 font-medium">What happens next?</h2>
            <ol className="ml-5 list-decimal space-y-1 text-sm text-muted-foreground">
              <li>Our team will review your application and expertise</li>
              <li>You'll receive an email with our decision</li>
              <li>If approved, you'll get access to our course creation tools</li>
              <li>We'll schedule an onboarding call to get you started</li>
            </ol>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Return to Homepage
              </Button>
            </Link>
            <Link href="/startup-school" className="flex-1">
              <Button className="w-full bg-[#0F7377] hover:bg-[#0F7377]/90">Explore Startup School</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
