import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
            <CardDescription>
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Here are some things you can try:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Go back to the previous page</li>
                <li>• Use the search function</li>
                <li>• Visit our homepage</li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link href="/search">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 