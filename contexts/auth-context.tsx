"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../lib/redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
} from "../lib/redux";
import {
  setLoading,
  logout,
  setUser,
  loginSuccess,
  setTokens,
} from "../lib/redux";

// Helper functions to sync tokens with cookies for middleware access
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/; SameSite=Lax`;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  avatarURL?: string;
  role: "startup_founder" | "investor" | "mentor" | "admin";
  status: "active" | "inactive" | "suspended";
  isEmailVerified: boolean;
  phoneNumber?: string;
  location?: string;
  timezone?: string;
  bio?: string;
  headline?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  companyName?: string;
  isVerified: boolean;
  subscriptionTier: "free" | "premium" | "enterprise";
  totalConnections: number;
  totalPosts: number;
  totalEngagement: number;
  createdAt: string;
  updatedAt: string;
  // Legacy properties for backward compatibility
  email?: string;
  name?: string;
  picture?: string;
  profilePicture?: string;
  provider?: "google" | "linkedin" | "demo";
  accessToken?: string;
  expiresAt?: number;
  avatarUrl?: string;
  displayName?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isLoading: boolean;
  error?: string;
  completeProfile: (profileData: any) => Promise<void>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    linkedInUrl?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  importLinkedInProfile: (profileType: string) => Promise<any>;
  hasPermission: (permission: string) => boolean;
  isFounder: () => boolean;
  isAdmin: () => boolean;
  // Add missing properties for founder dashboard
  getPlatformFeatures: () => any[];
  toggleFeature: (featureId: string) => void;
  updateFeaturePhase: (featureId: string, phase: string) => void;
  getEmployees: () => any[];
  updateEmployeePermissions: (
    employeeId: string,
    permissions: string[]
  ) => void;
  createEmployee: (employeeData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();
  const [refreshTokenMutation] = useRefreshTokenMutation();

  // Get current user query
  const { data: currentUser, isLoading: userLoading } = useGetCurrentUserQuery(
    undefined,
    {
      skip: !isAuthenticated,
    }
  );

  useEffect(() => {
    // Check for existing tokens in localStorage or cookies
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
          // Sync tokens to cookies for middleware access
          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);

          // Store tokens in Redux state first
          dispatch(
            setTokens({
              accessToken,
              refreshToken,
              expiresIn: 3600, // Default expiry, will be updated on refresh
            })
          );

          // Try to get current user
          try {
            const userData = await fetch(
              "http://localhost:8888/api/v1/auth/me",
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  "Content-Type": "application/json",
                },
              }
            ).then((res) => res.json());

            if (userData) {
              dispatch(setUser(userData));
              dispatch(setLoading(false));
              return;
            }
          } catch (error) {
            // Token might be expired, try refresh
            try {
              const refreshResult = await refreshTokenMutation({
                refresh_token: refreshToken,
              }).unwrap();

              if (refreshResult) {
                localStorage.setItem("accessToken", refreshResult.access_token);
                localStorage.setItem(
                  "refreshToken",
                  refreshResult.refresh_token
                );

                // Sync refreshed tokens to cookies
                setCookie("accessToken", refreshResult.access_token);
                setCookie("refreshToken", refreshResult.refresh_token);

                // Update Redux state with new tokens
                dispatch(
                  setTokens({
                    accessToken: refreshResult.access_token,
                    refreshToken: refreshResult.refresh_token,
                    expiresIn: refreshResult.expires_in,
                  })
                );

                // Get user data with new token
                const userData = await fetch(
                  "http://localhost:8888/api/v1/auth/me",
                  {
                    headers: {
                      Authorization: `Bearer ${refreshResult.access_token}`,
                      "Content-Type": "application/json",
                    },
                  }
                ).then((res) => res.json());

                if (userData) {
                  dispatch(setUser(userData));
                }
              }
            } catch (refreshError) {
              // Refresh failed, clear tokens and cookies
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              deleteCookie("accessToken");
              deleteCookie("refreshToken");
            }
          }
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error checking auth:", error);
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch, refreshTokenMutation]);

  // Update user when currentUser query succeeds
  useEffect(() => {
    if (currentUser && !userLoading) {
      dispatch(setUser(currentUser));
    }
  }, [currentUser, userLoading, dispatch]);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await loginMutation({
        emailAddress: email,
        password,
      }).unwrap();

      // Store tokens in localStorage
      localStorage.setItem("accessToken", result.access_token);
      localStorage.setItem("refreshToken", result.refresh_token);

      // Sync tokens to cookies for middleware access
      setCookie("accessToken", result.access_token);
      setCookie("refreshToken", result.refresh_token);

      // Get user profile
      const userData = await fetch("http://localhost:8888/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${result.access_token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (userData) {
        dispatch(
          loginSuccess({
            user: userData,
            tokens: result,
          })
        );
        return { success: true };
      } else {
        return { success: false, error: "Failed to get user profile" };
      }
    } catch (error: any) {
      console.error("Login error:", error);

      // Handle different error formats
      if (error?.data?.detail) {
        if (typeof error.data.detail === "string") {
          return { success: false, error: error.data.detail };
        } else if (Array.isArray(error.data.detail)) {
          const firstError = error.data.detail[0];
          return { success: false, error: firstError?.msg || "Login failed" };
        }
      }

      return { success: false, error: error?.message || "Login failed" };
    }
  };

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phoneNumber?: string,
    linkedInUrl?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await registerMutation({
        firstName,
        lastName,
        emailAddress: email,
        password,
        phoneNumber,
        linkedInUrl,
      }).unwrap();

      return { success: true };
    } catch (error: any) {
      console.error("Signup error:", error);

      // Handle different error formats
      if (error?.data?.detail) {
        if (typeof error.data.detail === "string") {
          return { success: false, error: error.data.detail };
        } else if (Array.isArray(error.data.detail)) {
          const firstError = error.data.detail[0];
          return {
            success: false,
            error: firstError?.msg || "Registration failed",
          };
        }
      }

      return { success: false, error: error?.message || "Registration failed" };
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Clear cookies
      deleteCookie("accessToken");
      deleteCookie("refreshToken");

      // Clear Redux state
      dispatch(logout());

      // Redirect to home page
      router.push("/");
    }
  };

  const importLinkedInProfile = async (profileType: string): Promise<any> => {
    // Mock implementation for now
    console.log(`Importing LinkedIn profile: ${profileType}`);
    return { success: true, message: "Profile imported successfully" };
  };

  const hasPermission = (permission: string): boolean => {
    // For now, return true for all permissions
    // This can be enhanced later with actual permission checking
    return true;
  };

  const isFounder = (): boolean => {
    // Check if user has founder role
    return user?.role === "startup_founder" || user?.role === "admin";
  };

  const isAdmin = (): boolean => {
    // Check if user has admin role
    return user?.role === "admin";
  };

  const completeProfile = async (profileData: any): Promise<void> => {
    // Mock implementation - in real app, this would update the user profile
    console.log("Completing profile with data:", profileData);
    // For now, just update the user state
    if (user) {
      dispatch(setUser({ ...user, ...profileData }));
    }
  };

  // Add missing methods for founder dashboard
  const getPlatformFeatures = (): any[] => {
    // Mock implementation
    return [];
  };

  const toggleFeature = (featureId: string): void => {
    // Mock implementation
    console.log("Toggling feature:", featureId);
  };

  const updateFeaturePhase = (featureId: string, phase: string): void => {
    // Mock implementation
    console.log("Updating feature phase:", featureId, phase);
  };

  const getEmployees = (): any[] => {
    // Mock implementation
    return [];
  };

  const updateEmployeePermissions = (
    employeeId: string,
    permissions: string[]
  ): void => {
    // Mock implementation
    console.log("Updating employee permissions:", employeeId, permissions);
  };

  const createEmployee = (employeeData: any): void => {
    // Mock implementation
    console.log("Creating employee:", employeeData);
  };

  const value: AuthContextType = {
    user,
    loading: isLoading,
    isLoading,
    completeProfile,
    login,
    signup,
    logout: handleLogout,
    importLinkedInProfile,
    hasPermission,
    isFounder,
    isAdmin,
    getPlatformFeatures,
    toggleFeature,
    updateFeaturePhase,
    getEmployees,
    updateEmployeePermissions,
    createEmployee,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
