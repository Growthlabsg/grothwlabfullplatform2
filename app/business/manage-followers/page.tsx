"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Construction, Building2 } from "lucide-react";

export default function ManageFollowersPage() {
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
            <Building2 className="h-6 w-6 text-primary" />
            Manage Followers
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage your page's followers
          </p>
        </div>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="py-16 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 flex items-center justify-center mb-6">
              <Construction className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Coming Soon
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We're building an amazing followers management dashboard for your
              business page. Soon you'll be able to see who follows your page,
              analyze follower growth, and engage with your audience more
              effectively.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-muted rounded-full">
                Follower List
              </span>
              <span className="px-3 py-1 bg-muted rounded-full">
                Growth Analytics
              </span>
              <span className="px-3 py-1 bg-muted rounded-full">
                Engagement Stats
              </span>
              <span className="px-3 py-1 bg-muted rounded-full">
                Export Data
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
