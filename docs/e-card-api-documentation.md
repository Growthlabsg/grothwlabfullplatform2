# E-Card Feature - API Documentation

## Overview

This document explains the APIs and data structures used for the public e-card/visiting card feature.

---

## Features Implemented

### 1. **Copy Link** (`/profile` page)

- Copies the public card URL: `/card/{userId}`
- Opens a **full Digital Name Card page** (no header/footer/sidebar)
- Works for both authenticated and non-authenticated users

### 2. **QR Code Scanning** (`/connect/scan` page)

- QR codes point to: `/card/{userId}`
- When scanned, opens the full public Digital Name Card page

### 3. **Generate QR Code** (`/profile` page)

- Downloads a PNG image of the QR code
- QR code encodes the public card URL

### 4. **Download Card** (`/profile` page)

- Downloads a **compact visiting card** as PNG
- Uses the `VisitingCard` component style (like E-Card tab preview on settings/profile)

### 5. **Public Card Page** (`/card/[userId]`)

- Accessible to anyone (no authentication required)
- Shows **full Digital Name Card** with:
  - Profile info (name, title, company, bio, avatar)
  - Contact info (email, phone, location, website)
  - Social links (LinkedIn, Twitter)
  - Professional roles with Connect/Schedule buttons
  - Skills & Languages
  - Quick stats (Connections, Engagement, Posts, Verified)
- **No dashboard, header, or footer** - clean standalone page
- Action buttons redirect to login if not authenticated

---

## Data Structures

### PublicProfileData Interface (for Public Card Page)

```typescript
// Location: components/profile/public-digital-name-card.tsx

export interface PublicProfileData {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  avatar: string;
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  roles: Array<{
    id: string;
    title: string;
    type: "mentor" | "investor" | "founder" | "advisor" | "expert";
    description: string;
    verified: boolean;
  }>;
  skills: string[];
  languages: string[];
  totalConnections: number;
  totalEngagement: number;
  totalPosts: number;
  isVerified: boolean;
}
```

### VisitingCardData Interface (for Download Card)

```typescript
// Location: components/profile/visiting-card.tsx

export interface VisitingCardData {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  email: string;
  phone: string;
  website?: string;
  linkedin?: string;
  skills?: string[];
  isVerified?: boolean;
}
```

---

## APIs Used

### 1. Get Current User (Auth Context)

**Source:** `contexts/auth-context.tsx`
**Hook:** `useAuth()`

Returns the logged-in user's full profile:

```typescript
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
}
```

### 2. Get User Profile (Public API)

**Endpoint:** `GET /v1/users/{userId}/profile`
**Hook:** `useGetUserProfileQuery(userId)`
**Source:** `lib/redux/pagesApi.ts`

**Current Response:**

```typescript
interface UserProfile {
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
```

---

## Missing API Fields (Backend Enhancement Needed)

The public profile API (`/v1/users/{userId}/profile`) needs these additional fields for the full Digital Name Card experience:

### High Priority (Required for Public Card)

| Field             | Type       | Description               | Privacy Note |
| ----------------- | ---------- | ------------------------- | ------------ |
| `companyName`     | `string`   | User's company name       | Public       |
| `skills`          | `string[]` | Array of skills/expertise | Public       |
| `languages`       | `string[]` | Languages spoken          | Public       |
| `isVerified`      | `boolean`  | Verification status       | Public       |
| `websiteUrl`      | `string`   | Personal/company website  | Public       |
| `twitterUrl`      | `string`   | Twitter/X profile URL     | Public       |
| `totalEngagement` | `number`   | Total engagement count    | Public       |

### Medium Priority (For Full Experience)

| Field         | Type     | Description                     | Privacy Note    |
| ------------- | -------- | ------------------------------- | --------------- |
| `roles`       | `Role[]` | Professional roles array        | Public          |
| `publicEmail` | `string` | Contact email (if user opts in) | User-controlled |
| `publicPhone` | `string` | Contact phone (if user opts in) | User-controlled |

### Role Interface

```typescript
interface Role {
  id: string;
  title: string;
  type: "mentor" | "investor" | "founder" | "advisor" | "expert";
  description: string;
  verified: boolean;
}
```

### Suggested Enhanced API Response

```typescript
// Enhanced GET /v1/users/{userId}/profile response
interface EnhancedUserProfile {
  // Existing fields
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
  connectionStatus: string;

  // NEW: Required for Digital Name Card
  companyName?: string;
  skills?: string[];
  languages?: string[];
  isVerified: boolean;
  websiteUrl?: string;
  twitterUrl?: string;
  totalEngagement: number;

  // NEW: Professional roles
  roles?: Array<{
    id: string;
    title: string;
    type: string;
    description: string;
    verified: boolean;
  }>;

  // NEW: Privacy-controlled contact info
  publicEmail?: string; // Only if user opted to show
  publicPhone?: string; // Only if user opted to show
}
```

---

## Static Data (Until API is Enhanced)

The following data is currently static/hardcoded until the API is enhanced:

```typescript
// In /card/[userId]/page.tsx
const profileData = {
  // ... API data ...

  // Static data for now
  roles: [
    {
      id: "1",
      title: "Startup Founder",
      type: "founder",
      description: "Building innovative solutions",
      verified: false,
    },
  ],
  skills: [],
  languages: [],
  totalEngagement: 58,
  isVerified: false,
};
```

---

## Component Files

| File                                              | Purpose                                                     |
| ------------------------------------------------- | ----------------------------------------------------------- |
| `components/profile/public-digital-name-card.tsx` | **NEW** - Full public Digital Name Card (for /card page)    |
| `components/profile/visiting-card.tsx`            | Compact visiting card (for download)                        |
| `components/profile/digital-name-card.tsx`        | Full digital name card (on /profile page)                   |
| `app/profile/page.tsx`                            | User's own profile page                                     |
| `app/card/[userId]/page.tsx`                      | **UPDATED** - Public card page (uses PublicDigitalNameCard) |
| `app/connect/scan/page.tsx`                       | QR code scanner                                             |

---

## URL Structure

| URL                 | Description                     | Auth Required | Content                                  |
| ------------------- | ------------------------------- | ------------- | ---------------------------------------- |
| `/profile`          | User's own profile with sidebar | Yes           | DigitalNameCard + sidebar                |
| `/card/{userId}`    | **Public card page**            | No            | PublicDigitalNameCard (full, no sidebar) |
| `/connect/scan`     | QR code scanner                 | Yes           | -                                        |
| `/settings/profile` | Edit profile settings           | Yes           | -                                        |

---

## Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        /profile page                            │
│  ┌─────────────────────────┬──────────────────────────────┐    │
│  │   Digital Name Card     │   Sidebar (Stats, Actions,   │    │
│  │   (Full content)        │   Roles, Contact Info)       │    │
│  └─────────────────────────┴──────────────────────────────┘    │
│                           │                                     │
│            ┌──────────────┼──────────────┐                     │
│            │              │              │                     │
│            ▼              ▼              ▼                     │
│      [Copy Link]    [Download]    [Generate QR]                │
│            │              │              │                     │
│            │              │              │                     │
│            ▼              ▼              ▼                     │
│    Opens /card/{id}  Compact PNG   QR Code PNG                 │
│    (Full public     (Visiting      (Points to                  │
│     card page)       card style)    /card/{id})                │
└─────────────────────────────────────────────────────────────────┘

                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     /card/{userId} page                         │
│                    (Public - No Auth Required)                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              PublicDigitalNameCard                       │   │
│  │  (Full content - same as Digital Name Card)              │   │
│  │  - No header, footer, sidebar                            │   │
│  │  - Profile, Contact, Social Links                        │   │
│  │  - Professional Roles with Connect/Schedule              │   │
│  │  - Skills & Languages                                    │   │
│  │  - Quick Stats                                           │   │
│  │  - Share, Copy Link, Download buttons                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           │                                     │
│                           ▼                                     │
│                  [Connect] [Schedule]                           │
│                           │                                     │
│                           ▼                                     │
│              Not logged in? → /login (with redirect)           │
└─────────────────────────────────────────────────────────────────┘

                              │
                              │ QR Scan
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    /connect/scan page                           │
│  QR codes point to → /card/{userId}                            │
│  Scanning redirects to public card page                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Testing Checklist

- [ ] `/profile` page: "Copy Link" copies `/card/{userId}` URL
- [ ] `/profile` page: "Download Card" downloads compact visiting card PNG
- [ ] `/profile` page: "Generate QR Code" downloads QR code PNG pointing to `/card/{userId}`
- [ ] `/card/{userId}` page: Shows full Digital Name Card (no sidebar/header/footer)
- [ ] `/card/{userId}` page: "Connect" button redirects to login if not authenticated
- [ ] `/card/{userId}` page: "Schedule" button redirects to login if not authenticated
- [ ] `/connect/scan` page: Scanning QR code redirects to `/card/{userId}`
- [ ] All pages work without authentication (public access)
