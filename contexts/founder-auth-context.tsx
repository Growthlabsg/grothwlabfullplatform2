"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type {
  Founder,
  PlatformFeature,
  LaunchPhase,
  Employee,
  Permission,
} from "@/types/founder";

// Founder-specific permissions that give complete control
const FOUNDER_PERMISSIONS: Permission[] = [
  "founder:all", // Access to everything
  "founder:platform", // Platform-level control
  "founder:features", // Feature management
  "founder:employees", // Employee management
  "founder:revenue", // Revenue and financial control
  "founder:strategy", // Strategic decisions
  "founder:infrastructure", // Server, database, scaling
  "founder:security", // Security settings, access control
  "founder:integrations", // Third-party integrations
  "founder:api", // API management and rate limiting
  "founder:business", // Business logic and rules
  "founder:pricing", // Pricing strategies and models
  "founder:content", // All content management
  "founder:moderation", // Content moderation rules
  "founder:guidelines", // Community guidelines
  "founder:reports", // User reports and violations
  "founder:analytics", // All analytics and metrics
  "founder:users", // Complete user management
  "founder:startups", // Startup management
  "founder:investors", // Investor management
  "founder:mentors", // Mentor management
  "founder:events", // Event management
  "founder:courses", // Course management
  "founder:funding", // Funding management
  "founder:applications", // Application management
  "founder:system", // System management
  "founder:communication", // Communication management
  "founder:cofounder", // Co-founder matching management
  "founder:growthstarter", // GrowthStarter management
  "founder:business", // Business development management
  "founder:network", // Network management
  "founder:resources", // Resources management
  "founder:mentorship", // Mentorship management
  "founder:jobs", // Jobs management
  "founder:feed", // Feed management
  "founder:files", // Files management
];

interface FounderAuthContextType {
  founder: Founder | null;
  isLoading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasPermission: (permission: Permission) => boolean;
  isFounder: () => boolean;

  // Feature management
  getPlatformFeatures: () => Promise<PlatformFeature[]>;
  toggleFeature: (featureId: string, enabled: boolean) => Promise<void>;
  updateFeaturePhase: (featureId: string, phase: string) => Promise<void>;
  createFeature: (
    feature: Omit<PlatformFeature, "id">
  ) => Promise<PlatformFeature>;
  deleteFeature: (featureId: string) => Promise<void>;

  // Launch phase management
  getLaunchPhases: () => Promise<LaunchPhase[]>;
  createLaunchPhase: (phase: Omit<LaunchPhase, "id">) => Promise<LaunchPhase>;
  updateLaunchPhase: (phase: LaunchPhase) => Promise<void>;
  deleteLaunchPhase: (phaseId: string) => Promise<void>;

  // Employee management
  getEmployees: () => Promise<Employee[]>;
  createEmployee: (employee: Omit<Employee, "id">) => Promise<Employee>;
  updateEmployeePermissions: (
    employeeId: string,
    permissions: Permission[]
  ) => Promise<void>;
  deactivateEmployee: (employeeId: string) => Promise<void>;

  // Platform control
  getSystemStatus: () => Promise<any>;
  updateSystemConfig: (config: Record<string, any>) => Promise<void>;
  getAnalytics: () => Promise<any>;
  getRevenueMetrics: () => Promise<any>;
}

const FounderAuthContext = createContext<FounderAuthContextType>({
  founder: null,
  isLoading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  hasPermission: () => false,
  isFounder: () => false,
  getPlatformFeatures: async () => [],
  toggleFeature: async () => {},
  updateFeaturePhase: async () => {},
  createFeature: async () => ({} as PlatformFeature),
  deleteFeature: async () => {},
  getLaunchPhases: async () => [],
  createLaunchPhase: async () => ({} as LaunchPhase),
  updateLaunchPhase: async () => {},
  deleteLaunchPhase: async () => {},
  getEmployees: async () => [],
  createEmployee: async () => ({} as Employee),
  updateEmployeePermissions: async () => {},
  deactivateEmployee: async () => {},
  getSystemStatus: async () => ({}),
  updateSystemConfig: async () => {},
  getAnalytics: async () => ({}),
  getRevenueMetrics: async () => ({}),
});

// Mock founder data (you - the platform founder)
const mockFounder: Founder = {
  id: "founder-1",
  email: "founder@example.com",
  displayName: "John Doe",
  role: "founder",
  emailVerified: true,
  createdAt: "2024-01-01",
  profileCompleted: true,
  designation: "CEO & Co-Founder",
  avatarUrl: "/placeholder.svg?key=sur73",
  permissions: ["founder:all"],
  isFounder: true,
  lastActive: "2024-01-01",
  status: "active",
  companyOwnership: 60,
  decisionAuthority: "absolute",
  platformAccess: "complete",
  revenueShare: 60,
  strategicControl: "full",
  foundingDate: "2024-01-01",
  equityStake: 60,
  votingRights: 100,
  boardPosition: "CEO",
  investmentContribution: 50000,
};

export function FounderAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [founder, setFounder] = useState<Founder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Simulate loading founder on mount
  useEffect(() => {
    const loadFounder = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // No persisted founder - will be null until login
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadFounder();
  }, []);

  // Founder login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Founder authentication logic
      if (email === "founder@growthlab.sg" && password === "Founder2024!") {
        setFounder(mockFounder);
        setError(null);
      } else {
        throw new Error("Invalid founder credentials");
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Login failed"));
      setFounder(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Founder logout function
  const logout = async () => {
    setFounder(null);
  };

  // Check if user has specific permission
  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!founder) return false;
      return (
        founder.permissions.includes(permission) ||
        founder.permissions.includes("founder:all")
      );
    },
    [founder]
  );

  // Check if user is founder
  const isFounder = useCallback((): boolean => {
    return founder?.isFounder === true;
  }, [founder]);

  // Feature management functions
  const getPlatformFeatures = async (): Promise<PlatformFeature[]> => {
    // Mock implementation - replace with actual API calls
    return [];
  };

  const toggleFeature = async (
    featureId: string,
    enabled: boolean
  ): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log(`Toggling feature ${featureId} to ${enabled}`);
  };

  const updateFeaturePhase = async (
    featureId: string,
    phase: string
  ): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log(`Updating feature ${featureId} to phase ${phase}`);
  };

  const createFeature = async (
    feature: Omit<PlatformFeature, "id">
  ): Promise<PlatformFeature> => {
    // Mock implementation - replace with actual API calls
    const newFeature: PlatformFeature = {
      ...feature,
      id: `feature_${Date.now()}`,
    };
    return newFeature;
  };

  const deleteFeature = async (featureId: string): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log(`Deleting feature ${featureId}`);
  };

  // Launch phase management functions
  const getLaunchPhases = async (): Promise<LaunchPhase[]> => {
    // Mock implementation - replace with actual API calls
    return [];
  };

  const createLaunchPhase = async (
    phase: Omit<LaunchPhase, "id">
  ): Promise<LaunchPhase> => {
    // Mock implementation - replace with actual API calls
    const newPhase: LaunchPhase = {
      ...phase,
      id: `phase_${Date.now()}`,
    };
    return newPhase;
  };

  const updateLaunchPhase = async (phase: LaunchPhase): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log(`Updating phase ${phase.id}`);
  };

  const deleteLaunchPhase = async (phaseId: string): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log(`Deleting phase ${phaseId}`);
  };

  // Employee management functions
  const getEmployees = async (): Promise<Employee[]> => {
    // Mock implementation - replace with actual API calls
    return [];
  };

  const createEmployee = async (
    employee: Omit<Employee, "id">
  ): Promise<Employee> => {
    // Mock implementation - replace with actual API calls
    const newEmployee: Employee = {
      ...employee,
      id: `employee_${Date.now()}`,
    };
    return newEmployee;
  };

  const updateEmployeePermissions = async (
    employeeId: string,
    permissions: Permission[]
  ): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log(`Updating permissions for employee ${employeeId}`);
  };

  const deactivateEmployee = async (employeeId: string): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log(`Deactivating employee ${employeeId}`);
  };

  // Platform control functions
  const getSystemStatus = async (): Promise<any> => {
    // Mock implementation - replace with actual API calls
    return {
      status: "operational",
      uptime: "99.9%",
      lastIncident: null,
      systemLoad: "23%",
      databaseStatus: "operational",
      apiStatus: "operational",
      storageUsage: "67%",
    };
  };

  const updateSystemConfig = async (
    config: Record<string, any>
  ): Promise<void> => {
    // Mock implementation - replace with actual API calls
    console.log("Updating system config:", config);
  };

  const getAnalytics = async (): Promise<any> => {
    // Mock implementation - replace with actual API calls
    return {
      totalUsers: 15420,
      activeUsers: 1247,
      revenue: 125000,
      growth: 23.5,
    };
  };

  const getRevenueMetrics = async (): Promise<any> => {
    // Mock implementation - replace with actual API calls
    return {
      monthlyRecurringRevenue: 125000,
      annualRecurringRevenue: 1500000,
      customerLifetimeValue: 2500,
      churnRate: 2.1,
    };
  };

  const value: FounderAuthContextType = {
    founder,
    isLoading,
    error,
    login,
    logout,
    hasPermission,
    isFounder,
    getPlatformFeatures,
    toggleFeature,
    updateFeaturePhase,
    createFeature,
    deleteFeature,
    getLaunchPhases,
    createLaunchPhase,
    updateLaunchPhase,
    deleteLaunchPhase,
    getEmployees,
    createEmployee,
    updateEmployeePermissions,
    deactivateEmployee,
    getSystemStatus,
    updateSystemConfig,
    getAnalytics,
    getRevenueMetrics,
  };

  return (
    <FounderAuthContext.Provider value={value}>
      {children}
    </FounderAuthContext.Provider>
  );
}

export function useFounderAuth() {
  const context = useContext(FounderAuthContext);
  if (!context) {
    throw new Error("useFounderAuth must be used within a FounderAuthProvider");
  }
  return context;
}
