"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  UserPlus,
  MessageSquare,
  Share2,
  Check,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Mock user data
const MOCK_USERS = {
  user123: {
    id: "user123",
    name: "Alex Johnson",
    role: "Founder & CEO",
    company: "TechStart",
    avatar: "/abstract-aj.png",
    bio: "Building the future of technology. Passionate about startups and innovation.",
    mutualConnections: 12,
    isConnected: false,
    isPending: false,
  },
  user456: {
    id: "user456",
    name: "Sarah Williams",
    role: "Product Manager",
    company: "ProductLab",
    avatar: "/abstract-southwest.png",
    bio: "Product enthusiast with a passion for user-centered design and agile methodologies.",
    mutualConnections: 5,
    isConnected: true,
    isPending: false,
  },
  user789: {
    id: "user789",
    name: "Michael Chen",
    role: "Software Engineer",
    company: "CodeWorks",
    avatar: "/microphone-crowd.png",
    bio: "Full-stack developer specializing in React, Node.js, and cloud architecture.",
    mutualConnections: 8,
    isConnected: false,
    isPending: true,
  },
};

export default function ConnectPage() {
  const params = useParams();
  const userId = params.userId as string;
  const router = useRouter();
  const { user: currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if user exists in our mock data
        const user = MOCK_USERS[userId as keyof typeof MOCK_USERS] || {
          id: userId,
          name: `User ${userId.slice(0, 5)}`,
          role: "GrowthLab Member",
          company: "GrowthLab",
          avatar: "/abstract-geometric-shapes.png",
          bio: "A member of the GrowthLab community.",
          mutualConnections: Math.floor(Math.random() * 10),
          isConnected: false,
          isPending: false,
        };

        setUserData(user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Could not load user information. Please try again.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleConnectClick = async () => {
    if (!currentUser || !userData) return;

    setConnecting(true);

    try {
      // In a real app, this would send an actual connection request
      // await connectionService.sendConnectionRequest(currentUser.id, userData.id)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUserData((prev: any) => ({
        ...prev,
        isPending: true,
        isConnected: false,
      }));

      // Connection request sent successfully
      toast.success(
        `Your connection request has been sent to ${userData.name}`
      );
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast.error("Could not send connection request. Please try again.");
    } finally {
      setConnecting(false);
    }
  };

  const handleMessageClick = () => {
    if (!userData) return;
    // Navigate to messages or open messaging panel
    router.push(`/messages?user=${userData.id}`);
  };

  const handleShare = () => {
    // In a real app, this would open a share dialog
    if (navigator.share) {
      navigator.share({
        title: `Connect with ${userData?.name} on GrowthLab`,
        text: `Check out ${userData?.name}'s profile on GrowthLab!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="container max-w-md mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
          <CardFooter className="flex justify-center space-x-2">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container max-w-md mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>User Not Found</CardTitle>
            <CardDescription>
              The user you're looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Connect with {userData.name}</CardTitle>
          <CardDescription>
            {userData.mutualConnections > 0 ? (
              <span>{userData.mutualConnections} mutual connections</span>
            ) : (
              <span>No mutual connections</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={userData.avatar || "/placeholder.svg"}
              alt={userData.name}
            />
            <AvatarFallback className="text-2xl">
              {userData.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-xl font-semibold">{userData.name}</h3>
            <p className="text-sm text-muted-foreground">
              {userData.role} at {userData.company}
            </p>
          </div>

          {userData.bio && (
            <div className="text-center">
              <p className="text-sm">{userData.bio}</p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Startup</Badge>
            <Badge variant="outline">Technology</Badge>
            <Badge variant="outline">Entrepreneurship</Badge>
            {userData.isConnected && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <Check className="mr-1 h-3 w-3" />
                Connected
              </Badge>
            )}
            {userData.isPending && (
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-800"
              >
                Pending
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          {userData.isConnected ? (
            <Button variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Connected
            </Button>
          ) : userData.isPending ? (
            <Button variant="outline" disabled>
              <UserPlus className="mr-2 h-4 w-4" />
              Pending
            </Button>
          ) : connecting ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </Button>
          ) : (
            <Button
              onClick={handleConnectClick}
              className="bg-[#0F7377] hover:bg-[#0F7377]/90"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Connect
            </Button>
          )}

          <Button
            variant="outline"
            onClick={handleMessageClick}
            disabled={!userData.isConnected}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {userData.isConnected ? "Message" : "Connect First"}
          </Button>

          <Button variant="ghost" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-4 flex justify-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Button>
      </div>
    </div>
  );
}
