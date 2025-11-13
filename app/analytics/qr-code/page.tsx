import { QRCodeAnalytics } from "@/components/qr-code/qr-code-analytics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, MapPin } from "lucide-react"
import Link from "next/link"

export default function QRCodeAnalyticsPage() {
  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">QR Code Analytics</h1>
        <p className="text-muted-foreground">
          Track and analyze your QR code usage with detailed location-based insights
        </p>
      </div>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Using Geolocation Data</AlertTitle>
        <AlertDescription>
          This feature uses geolocation data to provide analytics insights. Location data is only collected when users
          explicitly provide consent. For more information, see our{" "}
          <Link href="/privacy/qr-code-location" className="text-primary hover:underline">
            QR Code Location Privacy Policy
          </Link>
          .
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Privacy
          </CardTitle>
          <CardDescription>Information about how we collect and use location data from QR code scans</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Location data is only collected when users explicitly provide consent. We store city and country level
            information to provide analytics insights, but precise coordinates are never stored. For more information,
            see our{" "}
            <Link href="/privacy/qr-code-location" className="text-primary hover:underline">
              QR Code Location Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>

      <QRCodeAnalytics />
    </div>
  )
}
