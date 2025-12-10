# Business Pages API - Complete Frontend Integration Guide

This guide explains how to integrate Business Pages functionality into your Next.js frontend, covering everything from page creation to operating as a page (posting, commenting, liking).

## Table of Contents

1. [Overview](#overview)
2. [Authentication Setup](#authentication-setup)
3. [Business Page Management](#business-page-management)
   - [Create a Page](#create-a-page)
   - [Get My Pages](#get-my-pages)
   - [Get Page Details](#get-page-details)
   - [Update a Page](#update-a-page)
   - [Delete a Page](#delete-a-page)
4. [Context Switching](#context-switching)
   - [Understanding Context](#understanding-context)
   - [Switch to Page Context](#switch-to-page-context)
   - [Get Current Context](#get-current-context)
5. [Operating as a Page](#operating-as-a-page)
   - [Create Post as Page](#create-post-as-page)
   - [Comment as Page](#comment-as-page)
   - [Reply to Comments as Page](#reply-to-comments-as-page)
6. [Page Member Management](#page-member-management)
7. [Following Pages](#following-pages)
8. [Pricing Tiers](#pricing-tiers)
9. [TypeScript Types](#typescript-types)
10. [React Hooks Examples](#react-hooks-examples)
11. [State Management](#state-management)

---

## Overview

Business Pages allow users to create company/organization profiles and operate as those entities on the platform. Key features:

- **Users can create multiple pages** - Each user can own/manage multiple business pages
- **Role-based access** - OWNER, ADMIN, EMPLOYEE, MARKETING_EXPERT, VIEWER roles
- **Context switching** - Only **OWNER** and **ADMIN** can switch context to operate as the page
- **Page verification** - Pages must be **VERIFIED** before they can post/comment
- **Unified posting** - Posts and comments can be made as personal account OR as a page

### Role Permissions

| Role             | Can Post as Page | Can Comment as Page | Manage Members | Delete Page |
| ---------------- | ---------------- | ------------------- | -------------- | ----------- |
| OWNER            | ✅               | ✅                  | ✅             | ✅          |
| ADMIN            | ✅               | ✅                  | ✅             | ❌          |
| EMPLOYEE         | ❌               | ❌                  | ❌             | ❌          |
| MARKETING_EXPERT | ❌               | ❌                  | ❌             | ❌          |
| VIEWER           | ❌               | ❌                  | ❌             | ❌          |

---

## Authentication Setup

All API calls require the JWT token in the Authorization header:

```typescript
// lib/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888/api/v1";

export const api = {
  baseURL: API_BASE_URL,

  getHeaders(pageId?: number): HeadersInit {
    const token = localStorage.getItem("access_token");
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Add page context header if operating as a page
    if (pageId) {
      headers["X-Page-ID"] = pageId.toString();
    }

    return headers;
  },

  async get<T>(endpoint: string, pageId?: number): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(pageId),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async post<T>(endpoint: string, data?: any, pageId?: number): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(pageId),
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async put<T>(endpoint: string, data: any, pageId?: number): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(pageId),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },

  async delete<T>(endpoint: string, pageId?: number): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(pageId),
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
};
```

---

## Business Page Management

### Create a Page

**Endpoint:** `POST /api/v1/pages/`

When you create a page, you automatically become the **OWNER**.

```typescript
// Types
interface CreatePageData {
  businessTitle: string; // Required (2-200 chars)
  email: string; // Required, unique
  pagePhoneNumbers?: string[]; // Optional, max 5
  headline?: string; // Short catchy headline (max 300)
  tagline?: string; // Company tagline (max 500)
  description?: string; // Detailed description (max 2000)
  websiteUrl?: string;

  // Company Details
  foundedYear?: number; // 1800-2100
  industry?: string;
  companySize?: string; // "1-10", "11-50", "51-200", "201-500", "500+"
  companyStage?: string; // "Startup", "Growth", "Mature", "Enterprise"
  legalStructure?: string; // "LLC", "Corporation", "Partnership", etc.
  businessModel?: string; // "B2B", "B2C", "SaaS", "Marketplace", etc.

  // Location
  location?: string;
  isRemoteWorkAvailable?: boolean;
  primaryLocation?: string;
  headquarterLocation?: string;

  // Mission & Vision
  missionStatement?: string; // max 1000
  visionStatement?: string; // max 1000
  companyValues?: string[]; // max 20 items

  // Services
  specialties?: string[]; // max 30 items
  services?: string[]; // max 30 items

  // Funding Info
  fundingStage?: string; // "Pre-seed", "Seed", "Series A", etc.
  annualRevenue?: string; // "$0-100K", "$100K-1M", etc.
  totalFundingRaised?: string;
  numberOfCustomers?: number;
  monthlyRecurringRevenue?: string;
  monthGrowthRatePercentage?: number;

  // Product Info
  productName?: string;
  productDescription?: string;
  keyFeatures?: string[]; // max 20 items
  integrations?: string[]; // max 30 items
}

// API Call
async function createPage(data: CreatePageData): Promise<BusinessPageResponse> {
  return api.post<BusinessPageResponse>("/pages/", data);
}

// Usage Example
const newPage = await createPage({
  businessTitle: "TechStartup Inc",
  email: "contact@techstartup.com",
  headline: "Building the future of AI",
  tagline: "Innovation meets simplicity",
  description: "We are a cutting-edge AI company...",
  industry: "Technology",
  companySize: "11-50",
  companyStage: "Startup",
  fundingStage: "Seed",
  businessModel: "SaaS",
  specialties: ["AI", "Machine Learning", "NLP"],
  services: ["AI Consulting", "Custom ML Models"],
});
```

**Response:**

```json
{
  "id": 1,
  "businessTitle": "TechStartup Inc",
  "email": "contact@techstartup.com",
  "verificationStatus": "pending",
  "userRole": "owner",
  "canPost": true,
  "canComment": true,
  ...
}
```

> ⚠️ **Note:** New pages have `verificationStatus: "pending"`. They must be **VERIFIED** by an admin before you can post/comment as the page.

---

### Get My Pages

**Endpoint:** `GET /api/v1/pages/my-pages`

Returns all pages where the current user is a member.

```typescript
interface BusinessPageListResponse {
  id: number;
  businessTitle: string;
  email: string;
  avatarURL?: string;
  verificationStatus: "pending" | "verified" | "rejected" | "suspended";
  totalFollowers: number;
  userRole?: "owner" | "admin" | "employee" | "marketing_expert" | "viewer";
  canSwitchContext: boolean; // true only for OWNER/ADMIN on VERIFIED pages
}

async function getMyPages(): Promise<BusinessPageListResponse[]> {
  return api.get<BusinessPageListResponse[]>("/pages/my-pages");
}

// Usage
const myPages = await getMyPages();

// Filter pages where user can operate as the page
const operablePages = myPages.filter((page) => page.canSwitchContext);
```

**Response:**

```json
[
  {
    "id": 1,
    "businessTitle": "TechStartup Inc",
    "email": "contact@techstartup.com",
    "avatarURL": "https://...",
    "verificationStatus": "verified",
    "totalFollowers": 150,
    "userRole": "owner",
    "canSwitchContext": true
  },
  {
    "id": 2,
    "businessTitle": "Another Company",
    "verificationStatus": "pending",
    "userRole": "employee",
    "canSwitchContext": false
  }
]
```

---

### Get Page Details

**Endpoint:** `GET /api/v1/pages/{page_id}`

```typescript
async function getPage(pageId: number): Promise<BusinessPageResponse> {
  return api.get<BusinessPageResponse>(`/pages/${pageId}`);
}
```

---

### Update a Page

**Endpoint:** `PUT /api/v1/pages/{page_id}`

Only **OWNER** or **ADMIN** can update a page.

```typescript
interface UpdatePageData {
  businessTitle?: string;
  email?: string;
  description?: string;
  avatarURL?: string;
  coverImageURL?: string;
  websiteUrl?: string;
  // ... all other fields from CreatePageData are optional
}

async function updatePage(
  pageId: number,
  data: UpdatePageData
): Promise<BusinessPageResponse> {
  return api.put<BusinessPageResponse>(`/pages/${pageId}`, data);
}

// Usage
await updatePage(1, {
  description: "Updated company description",
  avatarURL: "https://storage.example.com/new-logo.png",
  fundingStage: "Series A",
});
```

---

### Delete a Page

**Endpoint:** `DELETE /api/v1/pages/{page_id}`

Only **OWNER** can delete a page (soft delete).

```typescript
async function deletePage(pageId: number): Promise<{ message: string }> {
  return api.delete(`/pages/${pageId}`);
}
```

---

## Context Switching

### Understanding Context

The platform supports two operating contexts:

1. **Personal Context** - User acts as themselves
2. **Page Context** - User acts on behalf of a business page

Context is managed via the `X-Page-ID` header. When this header is present, the API knows you're operating as that page.

**Requirements for switching context:**

- User must be a **OWNER** or **ADMIN** of the page
- Page must have `verificationStatus: "verified"`

---

### Switch to Page Context

Context switching is handled client-side by storing the active page ID and including it in API requests.

```typescript
// stores/pageContext.ts (Zustand example)
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PageContextState {
  activePageId: number | null;
  activePage: BusinessPageListResponse | null;

  switchToPage: (page: BusinessPageListResponse) => void;
  switchToPersonal: () => void;
  isOperatingAsPage: () => boolean;
}

export const usePageContext = create<PageContextState>()(
  persist(
    (set, get) => ({
      activePageId: null,
      activePage: null,

      switchToPage: (page) => {
        if (!page.canSwitchContext) {
          throw new Error("You cannot operate as this page");
        }
        set({ activePageId: page.id, activePage: page });
      },

      switchToPersonal: () => {
        set({ activePageId: null, activePage: null });
      },

      isOperatingAsPage: () => get().activePageId !== null,
    }),
    {
      name: "page-context",
    }
  )
);
```

---

### Get Current Context

**Endpoint:** `GET /api/v1/pages/context/current`

Validates the current context and returns detailed info.

```typescript
interface CurrentContextResponse {
  isPage: boolean;
  pageID?: number;
  page?: BusinessPageListResponse;
  user: UserProfile;
  permissions?: {
    canPost: boolean;
    canComment: boolean;
    canManageMembers: boolean;
    canViewAnalytics: boolean;
    canRespondToConnections: boolean;
  };
}

async function getCurrentContext(
  pageId?: number
): Promise<CurrentContextResponse> {
  return api.get<CurrentContextResponse>("/pages/context/current", pageId);
}

// Usage - Check current context
const context = await getCurrentContext(activePageId);
if (context.isPage) {
  console.log(`Operating as: ${context.page?.businessTitle}`);
  console.log(`Can post: ${context.permissions?.canPost}`);
} else {
  console.log(`Operating as personal account: ${context.user.firstName}`);
}
```

---

## Operating as a Page

### Create Post as Page

**Endpoint:** `POST /api/v1/feed/posts`

To post as a page, include the `authorPageID` field in the request body.

```typescript
interface CreatePostData {
  postContent: string; // Required (1-5000 chars)
  postVisibility?: "public" | "connections" | "private";
  postHashTags?: string[]; // Max 10 items
  attachments?: PostAttachment[];
  authorPageID?: number; // Include to post as page
}

interface PostAttachment {
  postAttachmentType: "image" | "video" | "link" | "document";
  postAttachmentUrl: string;
  postAttachmentTitle?: string;
  postAttachmentDescription?: string;
}

// Post as personal account
async function createPost(data: CreatePostData): Promise<PostResponse> {
  return api.post<PostResponse>("/feed/posts", data);
}

// Post as page
async function createPostAsPage(
  data: CreatePostData,
  pageId: number
): Promise<PostResponse> {
  return api.post<PostResponse>("/feed/posts", {
    ...data,
    authorPageID: pageId,
  });
}

// Usage - Personal post
await createPost({
  postContent: "This is my personal post!",
  postVisibility: "public",
  postHashTags: ["startup", "tech"],
});

// Usage - Page post
await createPostAsPage(
  {
    postContent: "Exciting news from TechStartup Inc! 🚀",
    postVisibility: "public",
    postHashTags: ["announcement", "product"],
  },
  1
); // pageId = 1
```

**Response for page post:**

```json
{
  "id": 42,
  "authorID": 8,
  "author": {
    "id": 8,
    "firstName": "John",
    "lastName": "Doe"
  },
  "authorPageID": 1,
  "authorPage": {
    "id": 1,
    "businessTitle": "TechStartup Inc",
    "avatarURL": "https://...",
    "verificationStatus": "verified"
  },
  "postContent": "Exciting news from TechStartup Inc! 🚀",
  "likesCount": 0,
  "commentsCount": 0,
  ...
}
```

---

### Comment as Page

**Endpoint:** `POST /api/v1/feed/posts/{post_id}/comments`

```typescript
interface CreateCommentData {
  commentContent: string; // Required (1-1000 chars)
  parentCommentID?: number; // For replies
  authorPageID?: number; // Include to comment as page
}

// Comment as personal account
async function createComment(
  postId: number,
  data: CreateCommentData
): Promise<CommentResponse> {
  return api.post<CommentResponse>(`/feed/posts/${postId}/comments`, data);
}

// Comment as page
async function createCommentAsPage(
  postId: number,
  data: CreateCommentData,
  pageId: number
): Promise<CommentResponse> {
  return api.post<CommentResponse>(`/feed/posts/${postId}/comments`, {
    ...data,
    authorPageID: pageId,
  });
}

// Usage - Personal comment
await createComment(42, {
  commentContent: "Great post!",
});

// Usage - Page comment
await createCommentAsPage(
  42,
  {
    commentContent: "Thank you for mentioning us! - TechStartup Team",
  },
  1
);
```

---

### Reply to Comments as Page

Same endpoint, just include `parentCommentID`:

```typescript
// Reply to a comment as page
await createCommentAsPage(
  42,
  {
    commentContent: "Thanks for your feedback!",
    parentCommentID: 123, // ID of the comment to reply to
  },
  1
);
```

---

## Page Member Management

### Add Member

**Endpoint:** `POST /api/v1/pages/{page_id}/members`

Only users with `canManageMembers` permission can add members.

```typescript
interface AddMemberData {
  userID: number;
  role: "admin" | "employee" | "marketing_expert" | "viewer"; // Cannot add owner
  canPost?: boolean;
  canComment?: boolean;
  canManageMembers?: boolean;
  canViewAnalytics?: boolean;
  canRespondToConnections?: boolean;
}

async function addPageMember(
  pageId: number,
  data: AddMemberData
): Promise<PageMemberResponse> {
  return api.post<PageMemberResponse>(`/pages/${pageId}/members`, data);
}

// Usage
await addPageMember(1, {
  userID: 15,
  role: "admin",
  canPost: true,
  canComment: true,
  canManageMembers: true,
});
```

### Get Members

**Endpoint:** `GET /api/v1/pages/{page_id}/members`

```typescript
async function getPageMembers(pageId: number): Promise<PageMemberResponse[]> {
  return api.get<PageMemberResponse[]>(`/pages/${pageId}/members`);
}
```

### Update Member

**Endpoint:** `PUT /api/v1/pages/{page_id}/members/{member_id}`

```typescript
async function updatePageMember(
  pageId: number,
  memberId: number,
  data: Partial<AddMemberData>
): Promise<PageMemberResponse> {
  return api.put<PageMemberResponse>(
    `/pages/${pageId}/members/${memberId}`,
    data
  );
}
```

### Remove Member

**Endpoint:** `DELETE /api/v1/pages/{page_id}/members/{member_id}`

```typescript
async function removePageMember(
  pageId: number,
  memberId: number
): Promise<{ message: string }> {
  return api.delete(`/pages/${pageId}/members/${memberId}`);
}
```

---

## Following Pages

### Follow/Unfollow Page

**Endpoint:** `POST /api/v1/pages/{page_id}/follow`

Toggles follow status.

```typescript
async function toggleFollowPage(pageId: number): Promise<{ message: string }> {
  return api.post(`/pages/${pageId}/follow`);
}
```

### Get Page Followers

**Endpoint:** `GET /api/v1/pages/{page_id}/followers`

```typescript
async function getPageFollowers(
  pageId: number,
  page: number = 1,
  limit: number = 20
): Promise<UserProfile[]> {
  return api.get<UserProfile[]>(
    `/pages/${pageId}/followers?page=${page}&limit=${limit}`
  );
}
```

---

## Pricing Tiers

Business pages can have pricing tiers for their products/services.

### Add Pricing Tier

**Endpoint:** `POST /api/v1/pages/{page_id}/pricing-tiers`

```typescript
interface CreatePricingTierData {
  tierName: string; // Required
  pricePerMonth: number; // Required, >= 0
  description?: string;
  features?: string[]; // Max 20 items
  isPopular?: boolean;
}

async function addPricingTier(
  pageId: number,
  data: CreatePricingTierData
): Promise<PricingTierResponse> {
  return api.post<PricingTierResponse>(`/pages/${pageId}/pricing-tiers`, data);
}

// Usage
await addPricingTier(1, {
  tierName: "Pro",
  pricePerMonth: 49.99,
  description: "Best for growing teams",
  features: ["Unlimited projects", "Priority support", "API access"],
  isPopular: true,
});
```

---

## TypeScript Types

Complete type definitions for your frontend:

```typescript
// types/pages.ts

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

export interface BusinessPageResponse {
  id: number;
  businessTitle: string;
  email: string;
  pagePhoneNumbers?: string[];
  headline?: string;
  tagline?: string;
  description?: string;
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

  // Stats & Status
  verificationStatus: PageVerificationStatus;
  verifiedAt?: string;
  totalFollowers: number;
  totalConnections: number;
  totalPosts: number;
  totalEngagement: number;
  createdAt: string;
  updatedAt?: string;

  // User-specific
  userRole?: PageRole;
  canPost?: boolean;
  canComment?: boolean;
}

export interface BusinessPageListResponse {
  id: number;
  businessTitle: string;
  email: string;
  avatarURL?: string;
  verificationStatus: PageVerificationStatus;
  totalFollowers: number;
  userRole?: PageRole;
  canSwitchContext: boolean;
}

export interface PageMemberResponse {
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
  user?: UserProfile;
}

export interface CurrentContextResponse {
  isPage: boolean;
  pageID?: number;
  page?: BusinessPageListResponse;
  user: UserProfile;
  permissions?: {
    canPost: boolean;
    canComment: boolean;
    canManageMembers: boolean;
    canViewAnalytics: boolean;
    canRespondToConnections: boolean;
  };
}

export interface PricingTierResponse {
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
```

---

## React Hooks Examples

### usePages Hook

```typescript
// hooks/usePages.ts
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useMyPages() {
  const [pages, setPages] = useState<BusinessPageListResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const data = await api.get<BusinessPageListResponse[]>("/pages/my-pages");
      setPages(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch pages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return { pages, loading, error, refetch: fetchPages };
}
```

### usePageContext Hook

```typescript
// hooks/usePageContext.ts
import { usePageContext as usePageContextStore } from "@/stores/pageContext";
import { useCallback } from "react";

export function usePageContext() {
  const {
    activePageId,
    activePage,
    switchToPage,
    switchToPersonal,
    isOperatingAsPage,
  } = usePageContextStore();

  const createPostWithContext = useCallback(
    async (data: CreatePostData) => {
      if (activePageId) {
        return api.post("/feed/posts", { ...data, authorPageID: activePageId });
      }
      return api.post("/feed/posts", data);
    },
    [activePageId]
  );

  const createCommentWithContext = useCallback(
    async (postId: number, data: CreateCommentData) => {
      if (activePageId) {
        return api.post(`/feed/posts/${postId}/comments`, {
          ...data,
          authorPageID: activePageId,
        });
      }
      return api.post(`/feed/posts/${postId}/comments`, data);
    },
    [activePageId]
  );

  return {
    activePageId,
    activePage,
    isOperatingAsPage: isOperatingAsPage(),
    switchToPage,
    switchToPersonal,
    createPostWithContext,
    createCommentWithContext,
  };
}
```

---

## State Management

### Context Switcher Component

```tsx
// components/ContextSwitcher.tsx
"use client";

import { useState } from "react";
import { useMyPages } from "@/hooks/usePages";
import { usePageContext } from "@/hooks/usePageContext";

export function ContextSwitcher() {
  const { pages, loading } = useMyPages();
  const { activePage, switchToPage, switchToPersonal, isOperatingAsPage } =
    usePageContext();
  const [isOpen, setIsOpen] = useState(false);

  const operablePages = pages.filter((p) => p.canSwitchContext);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
      >
        {isOperatingAsPage ? (
          <>
            <img
              src={activePage?.avatarURL || "/default-company.png"}
              className="w-8 h-8 rounded-full"
              alt={activePage?.businessTitle}
            />
            <span>{activePage?.businessTitle}</span>
          </>
        ) : (
          <>
            <img
              src="/default-avatar.png"
              className="w-8 h-8 rounded-full"
              alt="Personal Account"
            />
            <span>Personal Account</span>
          </>
        )}
        <ChevronDownIcon className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
          {/* Personal Account Option */}
          <button
            onClick={() => {
              switchToPersonal();
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${
              !isOperatingAsPage ? "bg-blue-50" : ""
            }`}
          >
            <img
              src="/default-avatar.png"
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <div className="text-left">
              <div className="font-medium">Personal Account</div>
              <div className="text-sm text-gray-500">Post as yourself</div>
            </div>
            {!isOperatingAsPage && (
              <CheckIcon className="w-5 h-5 text-blue-500 ml-auto" />
            )}
          </button>

          {/* Divider */}
          {operablePages.length > 0 && <hr className="my-2" />}

          {/* Page Options */}
          {operablePages.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                switchToPage(page);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${
                activePage?.id === page.id ? "bg-blue-50" : ""
              }`}
            >
              <img
                src={page.avatarURL || "/default-company.png"}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <div className="text-left">
                <div className="font-medium">{page.businessTitle}</div>
                <div className="text-sm text-gray-500 capitalize">
                  {page.userRole}
                </div>
              </div>
              {activePage?.id === page.id && (
                <CheckIcon className="w-5 h-5 text-blue-500 ml-auto" />
              )}
            </button>
          ))}

          {/* No operable pages message */}
          {operablePages.length === 0 && pages.length > 0 && (
            <div className="px-4 py-3 text-sm text-gray-500">
              No pages available to operate as. You need to be an Owner or Admin
              of a verified page.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

### Create Post Form with Context

```tsx
// components/CreatePostForm.tsx
"use client";

import { useState } from "react";
import { usePageContext } from "@/hooks/usePageContext";

export function CreatePostForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { activePageId, activePage, isOperatingAsPage, createPostWithContext } =
    usePageContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPostWithContext({
        postContent: content,
        postVisibility: "public",
      });
      setContent("");
      // Refresh feed or show success message
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
      {/* Show who is posting */}
      <div className="flex items-center gap-2 mb-3">
        <img
          src={
            isOperatingAsPage ? activePage?.avatarURL : "/default-avatar.png"
          }
          className="w-10 h-10 rounded-full"
          alt=""
        />
        <div>
          <div className="font-medium">
            {isOperatingAsPage ? activePage?.businessTitle : "You"}
          </div>
          <div className="text-xs text-gray-500">
            Posting as {isOperatingAsPage ? "page" : "yourself"}
          </div>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={`What's on your mind${
          isOperatingAsPage ? `, ${activePage?.businessTitle}` : ""
        }?`}
        className="w-full p-3 border rounded-lg resize-none"
        rows={3}
      />

      <div className="flex justify-end mt-3">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
```

---

## API Endpoints Summary

| Action          | Method | Endpoint                    | Auth                | Page Context           |
| --------------- | ------ | --------------------------- | ------------------- | ---------------------- |
| Create Page     | POST   | `/pages/`                   | ✅                  | ❌                     |
| Get My Pages    | GET    | `/pages/my-pages`           | ✅                  | ❌                     |
| Get Page        | GET    | `/pages/{id}`               | ✅                  | ❌                     |
| Update Page     | PUT    | `/pages/{id}`               | ✅ OWNER/ADMIN      | ❌                     |
| Delete Page     | DELETE | `/pages/{id}`               | ✅ OWNER            | ❌                     |
| Get Context     | GET    | `/pages/context/current`    | ✅                  | Optional               |
| Add Member      | POST   | `/pages/{id}/members`       | ✅ canManageMembers | ❌                     |
| Get Members     | GET    | `/pages/{id}/members`       | ✅ Member           | ❌                     |
| Update Member   | PUT    | `/pages/{id}/members/{mid}` | ✅ canManageMembers | ❌                     |
| Remove Member   | DELETE | `/pages/{id}/members/{mid}` | ✅ canManageMembers | ❌                     |
| Follow/Unfollow | POST   | `/pages/{id}/follow`        | ✅                  | ❌                     |
| Get Followers   | GET    | `/pages/{id}/followers`     | ✅                  | ❌                     |
| Create Post     | POST   | `/feed/posts`               | ✅                  | `authorPageID` in body |
| Create Comment  | POST   | `/feed/posts/{id}/comments` | ✅                  | `authorPageID` in body |
| Like Post       | POST   | `/feed/posts/{id}/like`     | ✅                  | ❌                     |

---

## Error Handling

Common errors and how to handle them:

```typescript
// lib/errors.ts
export function handleApiError(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message;

    // Parse common errors
    if (message.includes("Page not found")) {
      return "The page you're looking for doesn't exist.";
    }
    if (message.includes("not a member of this page")) {
      return "You don't have access to this page.";
    }
    if (message.includes("Only page owners and admins")) {
      return "You need to be a page owner or admin to do this.";
    }
    if (message.includes("Page must be verified")) {
      return "This page is pending verification. Please wait for admin approval.";
    }
    if (message.includes("email already exists")) {
      return "A page with this email already exists.";
    }

    return message;
  }

  return "An unexpected error occurred.";
}
```

---

## Best Practices

1. **Always check `canSwitchContext`** before allowing users to select a page for posting
2. **Cache page list** and refresh on page creation/deletion
3. **Show clear indicators** of which context the user is operating in
4. **Handle verification status** - show appropriate UI for pending/rejected pages
5. **Validate permissions** client-side before API calls to provide better UX
6. **Use optimistic updates** for likes/follows with proper rollback on error

---
