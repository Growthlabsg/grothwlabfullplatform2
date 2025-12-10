"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PublicDigitalNameCard, {
  PublicProfileData,
} from "@/components/profile/public-digital-name-card";
import { useAppSelector } from "@/lib/redux";
import { toast } from "sonner";

// API base URL
const API_BASE_URL = "http://localhost:8888/api";

// Interface for API response (matches backend PublicUserProfile)
interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  avatarURL?: string;
  coverImageURL?: string;
  headline?: string;
  bio?: string;
  companyName?: string;
  role?: string;
  phoneNumber?: string;
  location?: string;
  timezone?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  isVerified?: boolean;
  isEmailVerified?: boolean;
  status?: string;
  subscriptionTier?: string;
  totalFollowers?: number;
  totalConnections?: number;
  totalPosts?: number;
  totalEngagement?: number;
  isFollowing?: boolean;
  isConnected?: boolean;
  connectionStatus?: string;
  skills?: string[] | null;
  languages?: string[] | null;
  roles?: Array<{
    id: string;
    title: string;
    type: string;
    description: string;
    verified: boolean;
  }>;
  createdAt?: string;
  updatedAt?: string;
  lastActive?: string;
}

// Helper function to convert role type to display title
function getRoleTitleFromType(role?: string): string {
  if (!role) return "Professional";
  const roleMap: Record<string, string> = {
    startup_founder: "Startup Founder",
    investor: "Investor",
    mentor: "Mentor",
    advisor: "Advisor",
    expert: "Industry Expert",
    entrepreneur: "Entrepreneur",
  };
  return (
    roleMap[role] ||
    role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export default function PublicCardPage() {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.userId);

  // Use direct Redux selector instead of useAuth to avoid context issues in public pages
  const currentUser = useAppSelector((state) => state.auth.user);

  // State for profile data
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data directly without auth headers (public endpoint)
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId || isNaN(userId)) {
        setError("Invalid user ID");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Use plain fetch without Authorization header for public access
        // credentials: 'omit' ensures no cookies are sent
        const response = await fetch(
          `${API_BASE_URL}/v1/users/${userId}/profile`,
          {
            method: "GET",
            credentials: "omit", // Don't send any cookies
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("User not found");
          } else {
            setError(`Failed to load profile: ${response.status}`);
          }
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Check if this is the user's own profile
  const isOwnProfile = currentUser?.id === userId;

  // Transform API data to PublicProfileData format
  // Helper to map role type string to valid type
  const mapRoleType = (
    type: string
  ): "mentor" | "investor" | "founder" | "advisor" | "expert" => {
    const validTypes = [
      "mentor",
      "investor",
      "founder",
      "advisor",
      "expert",
    ] as const;
    if (validTypes.includes(type as any)) {
      return type as "mentor" | "investor" | "founder" | "advisor" | "expert";
    }
    // Map common variations
    if (type.includes("founder")) return "founder";
    if (type.includes("investor")) return "investor";
    if (type.includes("mentor")) return "mentor";
    if (type.includes("advisor")) return "advisor";
    return "expert";
  };

  const profileData: PublicProfileData | null = profile
    ? {
        id: profile.id,
        name:
          `${profile.firstName || ""} ${profile.lastName || ""}`.trim() ||
          "User",
        title:
          profile.headline ||
          getRoleTitleFromType(profile.role) ||
          "Professional",
        company: profile.companyName || "",
        location: profile.location || "",
        bio: profile.bio || "",
        avatar: profile.avatarURL || "",
        email: profile.emailAddress || "",
        phone: profile.phoneNumber || "",
        website: profile.websiteUrl || "",
        linkedin: profile.linkedInUrl || "",
        twitter: profile.twitterUrl || "",
        roles: profile.roles?.map((r) => ({
          ...r,
          type: mapRoleType(r.type),
        })) || [
          {
            id: "default_1",
            title: getRoleTitleFromType(profile.role) || "Professional",
            type: mapRoleType(profile.role || ""),
            description: "Building innovative solutions",
            verified: profile.isVerified || false,
          },
        ],
        skills: profile.skills || [],
        languages: profile.languages || [],
        totalConnections: profile.totalConnections || 0,
        totalEngagement: profile.totalEngagement || 0,
        totalPosts: profile.totalPosts || 0,
        isVerified: profile.isVerified || false,
      }
    : null;

  const handleConnect = () => {
    if (!currentUser) {
      sessionStorage.setItem("redirectAfterLogin", `/card/${userId}`);
      sessionStorage.setItem("pendingAction", "connect");
      router.push("/login");
      toast.info("Please sign in to connect");
      return;
    }
    // Navigate to connect page or trigger connection request
    router.push(`/connect/${userId}`);
  };

  const handleSchedule = () => {
    if (!currentUser) {
      sessionStorage.setItem("redirectAfterLogin", `/card/${userId}`);
      sessionStorage.setItem("pendingAction", "schedule");
      router.push("/login");
      toast.info("Please sign in to schedule a meeting");
      return;
    }
    // Navigate to scheduling page
    toast.info("Scheduling feature coming soon!");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header skeleton */}
            <div className="bg-gradient-to-r from-[#0F7377] to-[#1E293B] p-6">
              <Skeleton className="h-8 w-48 bg-white/20" />
            </div>
            {/* Content skeleton */}
            <div className="p-6 space-y-6">
              <div className="flex gap-6">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">😕</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Card Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            This digital name card doesn't exist or has been removed.
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link href="/">Go to Home</Link>
            </Button>
            {!currentUser && (
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <PublicDigitalNameCard
      profileData={profileData}
      onConnect={handleConnect}
      onSchedule={handleSchedule}
      isOwnProfile={isOwnProfile}
    />
  );
}
