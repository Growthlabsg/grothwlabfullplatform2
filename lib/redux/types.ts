import { baseApi } from "./baseApi";

// API Response Types
export interface ApiResponse<T = any> {
  message?: string;
  success?: boolean;
  data?: T;
}

export interface ValidationError {
  detail: Array<{
    loc: string[];
    msg: string;
    type: string;
    ctx?: any;
  }>;
}

// Auth API Types
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  phoneNumber?: string;
  linkedInUrl?: string;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
}

export interface LoginRequest {
  emailAddress: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface LogoutResponse {
  message: string;
  success: boolean;
}

export interface ResendVerificationRequest {
  emailAddress: string;
}

export interface ResendVerificationResponse {
  message: string;
  success: boolean;
}

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  message: string;
  success: boolean;
}

export interface UserProfile {
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
}

// Redux State Types
export interface AuthState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  expiresAt: number | null;
}

export interface RootState {
  auth: AuthState;
  [baseApi.reducerPath]: any;
}
