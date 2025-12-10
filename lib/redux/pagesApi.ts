import { baseApi } from "./baseApi";

// Types based on Business Pages API documentation
export type PageRole =
  | "owner"
  | "admin"
  | "employee"
  | "marketing_expert"
  | "viewer";

export type PageVerificationStatus =
  | "pending"
  | "verified"
  | "rejected"
  | "suspended";

export interface BusinessPageAuthor {
  id: number;
  businessTitle: string;
  email: string;
  avatarURL?: string;
  verificationStatus: PageVerificationStatus;
}

export interface BusinessPage {
  id: number;
  businessTitle: string;
  email: string;
  pagePhoneNumbers?: string[];
  headline?: string;
  tagline?: string;
  description?: string;
  longDescription?: string;
  avatarURL?: string;
  coverImageURL?: string;
  websiteUrl?: string;

  // Company Details
  foundedYear?: number;
  industry?: string;
  companySize?: string;
  companyStage?: string;
  legalStructure?: string;
  businessModel?: string;

  // Location
  location?: string;
  isRemoteWorkAvailable?: boolean;
  primaryLocation?: string;
  headquarterLocation?: string;
  pageTimezone?: string;

  // Mission & Vision
  missionStatement?: string;
  visionStatement?: string;
  companyValues?: string[];

  // Services
  specialties?: string[];
  services?: string[];

  // Funding
  fundingStage?: string;
  annualRevenue?: string;
  totalFundingRaised?: string;
  numberOfCustomers?: number;
  monthlyRecurringRevenue?: string;
  monthGrowthRatePercentage?: number;

  // Product
  productName?: string;
  productDescription?: string;
  keyFeatures?: string[];
  integrations?: string[];

  // Social Media Links
  socialLinkedin?: string;
  socialTwitter?: string;
  socialFacebook?: string;
  socialInstagram?: string;

  // Contact Info
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;

  // Achievements
  certifications?: string[];
  awards?: string[];
  partnerships?: string[];
  patents?: string[];

  // Stats & Status
  verificationStatus: PageVerificationStatus;
  verifiedAt?: string;
  totalFollowers: number;
  totalConnections: number;
  totalPosts: number;
  totalEngagement: number;
  createdAt: string;
  updatedAt?: string;

  // User-specific (when authenticated user views the page)
  userRole?: PageRole;
  canPost?: boolean;
  canComment?: boolean;

  // Follow status for current user
  isFollowing?: boolean;
}

export interface BusinessPageListItem {
  id: number;
  businessTitle: string;
  email: string;
  avatarURL?: string;
  verificationStatus: PageVerificationStatus;
  totalFollowers: number;
  userRole?: PageRole;
  canSwitchContext: boolean;
}

export interface PageMember {
  id: number;
  pageID: number;
  userID: number;
  role: PageRole;
  canPost: boolean;
  canComment: boolean;
  canManageMembers: boolean;
  canViewAnalytics: boolean;
  canRespondToConnections: boolean;
  joinedAt: string;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    avatarURL?: string;
  };
}

export interface CurrentContextResponse {
  isPage: boolean;
  pageID?: number;
  page?: BusinessPageListItem;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    avatarURL?: string;
  };
  permissions?: {
    canPost: boolean;
    canComment: boolean;
    canManageMembers: boolean;
    canViewAnalytics: boolean;
    canRespondToConnections: boolean;
  };
}

export interface CreatePageRequest {
  businessTitle: string;
  email: string;
  pagePhoneNumbers?: string[];
  headline?: string;
  tagline?: string;
  description?: string;
  longDescription?: string;
  websiteUrl?: string;
  foundedYear?: number;
  industry?: string;
  companySize?: string;
  companyStage?: string;
  legalStructure?: string;
  businessModel?: string;
  location?: string;
  isRemoteWorkAvailable?: boolean;
  primaryLocation?: string;
  headquarterLocation?: string;
  timezone?: string;
  missionStatement?: string;
  visionStatement?: string;
  companyValues?: string[];
  specialties?: string[];
  services?: string[];
  fundingStage?: string;
  annualRevenue?: string;
  totalFundingRaised?: string;
  numberOfCustomers?: number;
  monthlyRecurringRevenue?: string;
  monthGrowthRatePercentage?: number;
  productName?: string;
  productDescription?: string;
  keyFeatures?: string[];
  integrations?: string[];

  // Social Media Links
  socialLinkedin?: string;
  socialTwitter?: string;
  socialFacebook?: string;
  socialInstagram?: string;

  // Contact Info
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;

  // Achievements
  certifications?: string[];
  awards?: string[];
  partnerships?: string[];
  patents?: string[];

  // Market Analysis
  targetMarket?: string;
  competitiveAdvantage?: string;
  technologyStack?: string[];
  totalAddressableMarket?: number;
  serviceableMarket?: number;
  obtainableMarket?: number;
  marketGrowthRate?: number;
  competitors?: string[];

  // Key Metrics
  mrrAmount?: number;
  arrAmount?: number;
  churnRate?: number;
  customerLtv?: number;
  customerCac?: number;
  burnRate?: number;
  runwayMonths?: number;
  valuation?: number;
  lastFundingDate?: string;
  nextMilestone?: string;

  // Company Culture
  culturePerks?: string[];
  teamSize?: number;
  averageTeamAge?: number;
  diversityMalePercent?: number;
  diversityFemalePercent?: number;

  // Other
  languages?: string[];
  tags?: string[];
}

export interface AddMemberRequest {
  userID: number;
  role: Exclude<PageRole, "owner">;
  canPost?: boolean;
  canComment?: boolean;
  canManageMembers?: boolean;
  canViewAnalytics?: boolean;
  canRespondToConnections?: boolean;
}

export interface PricingTier {
  id: number;
  businessPageID: number;
  tierName: string;
  pricePerMonth: number;
  description?: string;
  features?: string[];
  isPopular: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePricingTierRequest {
  tierName: string;
  pricePerMonth: number;
  description?: string;
  features?: string[];
  isPopular?: boolean;
}

// Office Location types
export interface OfficeLocation {
  id: number;
  businessPageId: number;
  city: string;
  address: string;
  country?: string;
  officeType: string;
  employeeCount: number;
  phone?: string;
  email?: string;
  isHeadquarters: boolean;
  createdAt: string;
}

export interface CreateOfficeLocationRequest {
  city: string;
  address: string;
  country?: string;
  officeType: string;
  employeeCount?: number;
  phone?: string;
  email?: string;
  isHeadquarters?: boolean;
}

// Milestone types
export interface Milestone {
  id: number;
  businessPageId: number;
  title: string;
  description?: string;
  milestoneDate: string;
  category?: string;
  displayOrder: number;
  createdAt: string;
}

export interface CreateMilestoneRequest {
  title: string;
  description?: string;
  milestoneDate: string;
  category?: string;
  displayOrder?: number;
}

// User Stats types
export interface UserStats {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    headline?: string;
    avatarURL?: string;
    coverImageURL?: string;
  };
  stats: {
    profileViews: number;
    postImpressions: number;
    searchAppearances: number;
    totalConnections: number;
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
    verifiedConnections: number;
    weeklyGrowth: number;
    engagementRate: number;
  };
}

// Page Stats types
export interface PageStats {
  page: {
    id: number;
    businessTitle: string;
    headline?: string;
    avatarURL?: string;
    coverImageURL?: string;
  };
  stats: {
    pageViews: number;
    postImpressions: number;
    searchAppearances: number;
    totalFollowers: number;
    totalPosts: number;
    totalLikes: number;
    totalComments: number;
    weeklyGrowth: number;
    engagementRate: number;
  };
}

// User Profile types
export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  headline?: string;
  avatarURL?: string;
  coverImageURL?: string;
  bio?: string;
  location?: string;
  linkedInUrl?: string;
  totalFollowers: number;
  totalConnections: number;
  totalPosts: number;
  isFollowing: boolean;
  isConnected: boolean;
  connectionStatus: "none" | "pending_sent" | "pending_received" | "connected";
}

// Posts response for user/page
// Note: Backend should include isLiked and isSaved fields for each post
export interface PostsResponse {
  posts: any[]; // Uses Post type from feedApi, but backend may not include all fields yet
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

// Pages API endpoints
export const pagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get my pages
    getMyPages: builder.query<BusinessPageListItem[], void>({
      query: () => "/v1/pages/my-pages",
      providesTags: ["Pages"],
    }),

    // Get page details
    getPage: builder.query<BusinessPage, number>({
      query: (pageId) => `/v1/pages/${pageId}`,
      providesTags: (result, error, pageId) => [{ type: "Page", id: pageId }],
    }),

    // Create page
    createPage: builder.mutation<BusinessPage, CreatePageRequest>({
      query: (page) => ({
        url: "/v1/pages/",
        method: "POST",
        body: page,
      }),
      invalidatesTags: ["Pages"],
    }),

    // Update page
    updatePage: builder.mutation<
      BusinessPage,
      { pageId: number; data: Partial<CreatePageRequest> }
    >({
      query: ({ pageId, data }) => ({
        url: `/v1/pages/${pageId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Page", id: pageId },
        "Pages",
      ],
    }),

    // Delete page
    deletePage: builder.mutation<{ message: string }, number>({
      query: (pageId) => ({
        url: `/v1/pages/${pageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Pages"],
    }),

    // Get current context
    getCurrentContext: builder.query<CurrentContextResponse, number | null>({
      query: (pageId) => ({
        url: "/v1/pages/context/current",
        headers: pageId ? { "X-Page-ID": pageId.toString() } : undefined,
      }),
    }),

    // Get page members
    getPageMembers: builder.query<PageMember[], number>({
      query: (pageId) => `/v1/pages/${pageId}/members`,
      providesTags: (result, error, pageId) => [
        { type: "PageMembers", id: pageId },
      ],
    }),

    // Add page member
    addPageMember: builder.mutation<
      PageMember,
      { pageId: number; data: AddMemberRequest }
    >({
      query: ({ pageId, data }) => ({
        url: `/v1/pages/${pageId}/members`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "PageMembers", id: pageId },
      ],
    }),

    // Update page member
    updatePageMember: builder.mutation<
      PageMember,
      { pageId: number; memberId: number; data: Partial<AddMemberRequest> }
    >({
      query: ({ pageId, memberId, data }) => ({
        url: `/v1/pages/${pageId}/members/${memberId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "PageMembers", id: pageId },
      ],
    }),

    // Remove page member
    removePageMember: builder.mutation<
      { message: string },
      { pageId: number; memberId: number }
    >({
      query: ({ pageId, memberId }) => ({
        url: `/v1/pages/${pageId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "PageMembers", id: pageId },
      ],
    }),

    // Follow/Unfollow page
    toggleFollowPage: builder.mutation<{ message: string }, number>({
      query: (pageId) => ({
        url: `/v1/pages/${pageId}/follow`,
        method: "POST",
      }),
      invalidatesTags: (result, error, pageId) => [
        { type: "Page", id: pageId },
      ],
    }),

    // Get page followers
    getPageFollowers: builder.query<
      { followers: any[]; total: number },
      { pageId: number; page?: number; limit?: number }
    >({
      query: ({ pageId, page = 1, limit = 20 }) => ({
        url: `/v1/pages/${pageId}/followers`,
        params: { page, limit },
      }),
    }),

    // Pricing tiers
    getPagePricingTiers: builder.query<PricingTier[], number>({
      query: (pageId) => `/v1/pages/${pageId}/pricing-tiers`,
      providesTags: (result, error, pageId) => [
        { type: "PricingTiers", id: pageId },
      ],
    }),

    addPricingTier: builder.mutation<
      PricingTier,
      { pageId: number; data: CreatePricingTierRequest }
    >({
      query: ({ pageId, data }) => ({
        url: `/v1/pages/${pageId}/pricing-tiers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "PricingTiers", id: pageId },
      ],
    }),

    updatePricingTier: builder.mutation<
      PricingTier,
      {
        pageId: number;
        tierId: number;
        data: Partial<CreatePricingTierRequest>;
      }
    >({
      query: ({ pageId, tierId, data }) => ({
        url: `/v1/pages/${pageId}/pricing-tiers/${tierId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "PricingTiers", id: pageId },
      ],
    }),

    deletePricingTier: builder.mutation<
      { message: string },
      { pageId: number; tierId: number }
    >({
      query: ({ pageId, tierId }) => ({
        url: `/v1/pages/${pageId}/pricing-tiers/${tierId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "PricingTiers", id: pageId },
      ],
    }),

    // Office Locations
    getPageOffices: builder.query<OfficeLocation[], number>({
      query: (pageId) => `/v1/pages/${pageId}/offices`,
      providesTags: (result, error, pageId) => [
        { type: "OfficeLocations", id: pageId },
      ],
    }),

    addOfficeLocation: builder.mutation<
      OfficeLocation,
      { pageId: number; data: CreateOfficeLocationRequest }
    >({
      query: ({ pageId, data }) => ({
        url: `/v1/pages/${pageId}/offices`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "OfficeLocations", id: pageId },
      ],
    }),

    updateOfficeLocation: builder.mutation<
      OfficeLocation,
      {
        pageId: number;
        officeId: number;
        data: Partial<CreateOfficeLocationRequest>;
      }
    >({
      query: ({ pageId, officeId, data }) => ({
        url: `/v1/pages/${pageId}/offices/${officeId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "OfficeLocations", id: pageId },
      ],
    }),

    deleteOfficeLocation: builder.mutation<
      { message: string },
      { pageId: number; officeId: number }
    >({
      query: ({ pageId, officeId }) => ({
        url: `/v1/pages/${pageId}/offices/${officeId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "OfficeLocations", id: pageId },
      ],
    }),

    // Milestones
    getPageMilestones: builder.query<Milestone[], number>({
      query: (pageId) => `/v1/pages/${pageId}/milestones`,
      providesTags: (result, error, pageId) => [
        { type: "Milestones", id: pageId },
      ],
    }),

    addMilestone: builder.mutation<
      Milestone,
      { pageId: number; data: CreateMilestoneRequest }
    >({
      query: ({ pageId, data }) => ({
        url: `/v1/pages/${pageId}/milestones`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Milestones", id: pageId },
      ],
    }),

    updateMilestone: builder.mutation<
      Milestone,
      {
        pageId: number;
        milestoneId: number;
        data: Partial<CreateMilestoneRequest>;
      }
    >({
      query: ({ pageId, milestoneId, data }) => ({
        url: `/v1/pages/${pageId}/milestones/${milestoneId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Milestones", id: pageId },
      ],
    }),

    deleteMilestone: builder.mutation<
      { message: string },
      { pageId: number; milestoneId: number }
    >({
      query: ({ pageId, milestoneId }) => ({
        url: `/v1/pages/${pageId}/milestones/${milestoneId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { pageId }) => [
        { type: "Milestones", id: pageId },
      ],
    }),

    // User Stats (for sidebar)
    getUserStats: builder.query<UserStats, void>({
      query: () => "/v1/users/me/stats",
      providesTags: ["User"],
    }),

    // Page Stats (for sidebar when operating as page)
    getPageStats: builder.query<PageStats, number>({
      query: (pageId) => `/v1/pages/${pageId}/stats`,
      providesTags: (result, error, pageId) => [{ type: "Page", id: pageId }],
    }),

    // User Profile (for viewing other users)
    getUserProfile: builder.query<UserProfile, number>({
      query: (userId) => `/v1/users/${userId}/profile`,
    }),

    // User Posts (for profile page)
    getUserPosts: builder.query<
      PostsResponse,
      { userId: number; page?: number; limit?: number }
    >({
      query: ({ userId, page = 1, limit = 10 }) => ({
        url: `/v1/users/${userId}/posts`,
        params: { page, limit },
      }),
    }),

    // Page Posts (for page profile)
    getPagePosts: builder.query<
      PostsResponse,
      { pageId: number; page?: number; limit?: number }
    >({
      query: ({ pageId, page = 1, limit = 10 }) => ({
        url: `/v1/pages/${pageId}/posts`,
        params: { page, limit },
      }),
      providesTags: (result, error, { pageId }) => [
        { type: "Page", id: pageId },
      ],
    }),

    // Page Analytics (for admin dashboard)
    getPageAnalytics: builder.query<any, number>({
      query: (pageId) => `/v1/pages/${pageId}/analytics`,
      providesTags: (result, error, pageId) => [{ type: "Page", id: pageId }],
    }),

    // Follow/Unfollow User
    toggleFollowUser: builder.mutation<{ message: string }, number>({
      query: (userId) => ({
        url: `/v1/users/${userId}/follow`,
        method: "POST",
      }),
    }),

    // Send Connection Request
    sendConnectionRequest: builder.mutation<{ message: string }, number>({
      query: (userId) => ({
        url: `/v1/users/${userId}/connect`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetMyPagesQuery,
  useGetPageQuery,
  useCreatePageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useGetCurrentContextQuery,
  useGetPageMembersQuery,
  useAddPageMemberMutation,
  useUpdatePageMemberMutation,
  useRemovePageMemberMutation,
  useToggleFollowPageMutation,
  useGetPageFollowersQuery,
  useGetPagePricingTiersQuery,
  useAddPricingTierMutation,
  useUpdatePricingTierMutation,
  useDeletePricingTierMutation,
  useGetPageOfficesQuery,
  useAddOfficeLocationMutation,
  useUpdateOfficeLocationMutation,
  useDeleteOfficeLocationMutation,
  useGetPageMilestonesQuery,
  useAddMilestoneMutation,
  useUpdateMilestoneMutation,
  useDeleteMilestoneMutation,
  useGetUserStatsQuery,
  useGetPageStatsQuery,
  useGetUserProfileQuery,
  useGetUserPostsQuery,
  useGetPagePostsQuery,
  useGetPageAnalyticsQuery,
  useToggleFollowUserMutation,
  useSendConnectionRequestMutation,
} = pagesApi;
