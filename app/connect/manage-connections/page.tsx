"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Construction } from "lucide-react";

export default function ManageConnectionsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Manage Connections
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage your professional connections
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="py-16 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-6">
              <Construction className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We're working hard to bring you a powerful connections management
              experience. Soon you'll be able to view all your connections,
              manage pending requests, and discover new professionals to connect
              with.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-muted rounded-full">
                View Connections
              </span>
              <span className="px-3 py-1 bg-muted rounded-full">
                Pending Requests
              </span>
              <span className="px-3 py-1 bg-muted rounded-full">
                Suggestions
              </span>
              <span className="px-3 py-1 bg-muted rounded-full">
                Import Contacts
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
