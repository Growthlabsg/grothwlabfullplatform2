import { VerificationForm } from "@/components/verification/verification-form"
export default function VerificationPage() {
  return (
          <div>
          <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Startup Verification</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get your startup verified to increase credibility, gain access to premium features, and build trust with
            investors and partners on the GrowthLab platform.
          </p>
        </div>
        <VerificationForm />
      </div>
      
    </div>
  )
}
