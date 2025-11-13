import { VerificationStatus } from "@/components/verification/verification-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function VerificationStatusPage() {
  // In a real app, you would fetch the verification status from an API
  const verificationStatus = "pending"

  return (
          <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verification Status</h1>
          <p className="text-muted-foreground">Track the status of your startup verification request</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <VerificationStatus
              status={verificationStatus as any}
              additionalInfoNeeded="Please provide additional documentation regarding your business registration and team identification."
            />

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Verification Timeline</CardTitle>
                <CardDescription>Track the progress of your verification request</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium">Submission Received</h3>
                      <p className="text-sm text-muted-foreground">2023-12-10</p>
                      <p className="text-sm mt-1">
                        Your verification request has been received and added to our review queue.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium">Initial Review</h3>
                      <p className="text-sm text-muted-foreground">2023-12-11</p>
                      <p className="text-sm mt-1">An initial review of your submission has been completed.</p>
                    </div>
                  </div>

                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground">Final Verification</h3>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-sm mt-1 text-muted-foreground">
                        Final verification is completed after all required documentation has been reviewed.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-muted-foreground">Verification Complete</h3>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-sm mt-1 text-muted-foreground">
                        Your startup will receive verified status once all checks are complete.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Verification Benefits</CardTitle>
                <CardDescription>What you gain from being verified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Increased Credibility</h4>
                    <p className="text-sm text-muted-foreground">
                      The verified badge builds trust with investors and partners
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Priority Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Get priority access to funding opportunities and events
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Enhanced Visibility</h4>
                    <p className="text-sm text-muted-foreground">Verified startups appear higher in search results</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Exclusive Features</h4>
                    <p className="text-sm text-muted-foreground">Access exclusive platform features and resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Support resources for verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-3">
                  <h4 className="text-sm font-medium">Verification Guidelines</h4>
                  <p className="text-xs text-muted-foreground mt-1">Review our requirements and best practices</p>
                  <a href="/help/verification-guidelines" className="text-xs text-primary mt-2 inline-block">
                    View Guidelines →
                  </a>
                </div>

                <div className="border rounded-md p-3">
                  <h4 className="text-sm font-medium">Contact Support</h4>
                  <p className="text-xs text-muted-foreground mt-1">Get help with your verification process</p>
                  <a href="/help/contact" className="text-xs text-primary mt-2 inline-block">
                    Contact Support →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
}
