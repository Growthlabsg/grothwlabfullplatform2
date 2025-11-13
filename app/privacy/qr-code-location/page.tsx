import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Shield, CheckCircle, X, MapPin } from "lucide-react"
import Link from "next/link"

export default function QRCodeLocationPrivacyPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">QR Code Location Privacy Policy</h1>
        <p className="text-muted-foreground">How we handle location data from QR code scans</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Our Commitment to Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            At GrowthLab, we take your privacy seriously. This policy explains how we collect, use, and protect location
            data when you scan QR codes through our platform.
          </p>

          <h3 className="text-lg font-semibold mt-4">Data Collection</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Explicit Consent:</span> We only collect location data when you explicitly
              grant permission through your browser or device.
            </li>
            <li>
              <span className="font-medium">Minimized Data Collection:</span> We only collect the data necessary for
              providing analytics insights and improving our service.
            </li>
            <li>
              <span className="font-medium">Limited Retention:</span> We only retain location data for a reasonable
              period needed to provide analytics and insights to QR code creators.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">What We Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">City and Country Information:</span> We collect city and country level data
              to show where QR codes are being scanned.
            </li>
            <li>
              <span className="font-medium">Timezone:</span> We collect timezone information to analyze when QR codes
              are most frequently scanned.
            </li>
            <li>
              <span className="font-medium">General Location:</span> We store general location data, not precise
              coordinates that could identify exact locations.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">What We Don't Collect</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Precise Coordinates:</span> We do not store exact latitude and longitude
              coordinates in our database.
            </li>
            <li>
              <span className="font-medium">Personally Identifiable Information:</span> Location data is not linked to
              personal information that could identify you specifically.
            </li>
            <li>
              <span className="font-medium">Location History:</span> We don't build or maintain individual location
              history profiles.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">How We Use Location Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Analytics:</span> We provide aggregated analytics to QR code creators
              showing geographic distribution of scans.
            </li>
            <li>
              <span className="font-medium">Service Improvement:</span> We use location patterns to improve our QR code
              service and features.
            </li>
            <li>
              <span className="font-medium">Statistical Analysis:</span> We perform statistical analysis on aggregate
              data to identify trends and patterns.
            </li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">Your Control</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-medium">Permission Control:</span> You can decline location permission when scanning
              any QR code.
            </li>
            <li>
              <span className="font-medium">Browser Settings:</span> You can manage location permissions through your
              browser or device settings.
            </li>
            <li>
              <span className="font-medium">Data Request:</span> You can request a copy of your data or ask for it to be
              deleted by contacting our support team.
            </li>
          </ul>

          <Alert className="mt-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Questions about our privacy practices?</AlertTitle>
            <AlertDescription>
              If you have any questions or concerns about our privacy practices, please contact our privacy team at{" "}
              <Link href="mailto:privacy@growthlab.sg" className="text-primary hover:underline">
                privacy@growthlab.sg
              </Link>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Features Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Location-Based Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  QR code creators can see aggregated data about where their codes are being scanned, helping them
                  understand their audience's geographic distribution.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <h4 className="font-medium">Explicit Consent</h4>
                <p className="text-sm text-muted-foreground">
                  We always ask for permission before collecting location data. You can scan QR codes without providing
                  location data.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1">
                <X className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h4 className="font-medium">No Precise Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  We do not track or store precise coordinates. We only collect and store city and country level
                  information for analytics purposes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
