# GrowthLab API Documentation for Frontend

This document contains all the APIs needed for the frontend implementation, including new endpoints and updated existing ones.

---

## Table of Contents

1. [Authentication](#authentication)
2. [User APIs](#user-apis)
3. [Feed APIs](#feed-apis)
4. [Business Page APIs](#business-page-apis)
5. [Page Resources APIs](#page-resources-apis)
6. [Context & Headers](#context--headers)

---

## Authentication

All authenticated endpoints require the `Authorization` header:

```
Authorization: Bearer {access_token}
```

---

## User APIs

Base URL: `/api/v1/users`

### GET `/me` (via /auth/me)

Get current authenticated user's profile.

**Response:**

```json
{
  "id": 123,
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john@example.com",
  "headline": "Founder & CEO",
  "avatarURL": "https://...",
  "coverImageURL": "https://...",
  "bio": "...",
  "location": "Singapore",
  "isVerified": true
}
```

---

### GET `/{userId}/profile`

Get public profile of any user.

**Response:**

```json
{
  "id": 123,
  "firstName": "John",
  "lastName": "Doe",
  "headline": "Founder & CEO at StartupName",
  "avatarURL": "https://...",
  "coverImageURL": "https://...",
  "bio": "Building the future...",
  "location": "Singapore",
  "linkedInUrl": "https://linkedin.com/in/johndoe",
  "totalFollowers": 1234,
  "totalConnections": 342,
  "totalPosts": 156,
  "isFollowing": false,
  "isConnected": false,
  "connectionStatus": "none"
}
```

**Connection Status Values:**

- `none` - No connection
- `pending_sent` - Current user sent connection request
- `pending_received` - Current user received connection request
- `connected` - Already connected

---

### GET `/{userId}/posts`

Get posts by a specific user.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | int | 1 | Page number |
| limit | int | 10 | Items per page |

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "authorID": 123,
      "author": {
        "id": 123,
        "firstName": "John",
        "lastName": "Doe",
        "avatarURL": "https://...",
        "headline": "Founder & CEO"
      },
      "authorPageID": null,
      "authorPage": null,
      "postContent": "Hello world!",
      "postVisibility": "public",
      "postHashTags": ["startup", "tech"],
      "likeCount": 45,
      "commentCount": 12,
      "shareCount": 5,
      "isLiked": false,
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 156,
  "page": 1,
  "limit": 10,
  "hasNext": true
}
```

---

### GET `/me/stats`

Get current user's statistics for the sidebar.

**Response:**

```json
{
  "user": {
    "id": 123,
    "firstName": "John",
    "lastName": "Doe",
    "headline": "Founder & CEO at StartupName",
    "avatarURL": "https://...",
    "coverImageURL": "https://..."
  },
  "stats": {
    "profileViews": 248,
    "postImpressions": 2567,
    "searchAppearances": 45,
    "totalConnections": 342,
    "totalPosts": 156,
    "totalLikes": 951,
    "totalComments": 212,
    "verifiedConnections": 4,
    "weeklyGrowth": 12.5,
    "engagementRate": 4.2
  }
}
```

---

## Feed APIs

Base URL: `/api/v1/feed`

### GET `/`

Get personalized feed. **Supports page context via header.**

**Headers:**

```
Authorization: Bearer {token}
X-Page-ID: 123  (optional - for page-context feed)
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | int | 1 | Page number |
| limit | int | 10 | Items per page |
| feed_type | string | "recommended" | Feed type: `recommended`, `following`, `trending`, `recent` |

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "authorID": 123,
      "author": {
        "id": 123,
        "firstName": "John",
        "lastName": "Doe",
        "avatarURL": "https://...",
        "headline": "Founder"
      },
      "authorPageID": 456,
      "authorPage": {
        "id": 456,
        "businessTitle": "TechCorp",
        "avatarURL": "https://...",
        "verificationStatus": "verified"
      },
      "postContent": "Exciting news!",
      "postVisibility": "public",
      "postHashTags": ["announcement"],
      "likeCount": 120,
      "commentCount": 34,
      "shareCount": 15,
      "isLiked": true,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 500,
  "page": 1,
  "limit": 10,
  "hasNext": true
}
```

**Notes:**

- When `X-Page-ID` is provided, feed is tailored for that business page's industry/interests
- When `X-Page-ID` is absent, feed is tailored for the user's personal interests

---

### POST `/posts`

Create a new post. Can post as user or as a business page.

**Request Body:**

```json
{
  "postContent": "Hello everyone!",
  "postVisibility": "public",
  "postHashTags": ["startup", "tech"],
  "attachments": [],
  "authorPageID": 123
}
```

| Field          | Type     | Required | Description                        |
| -------------- | -------- | -------- | ---------------------------------- |
| postContent    | string   | Yes      | Post content                       |
| postVisibility | string   | No       | `public`, `private`, `connections` |
| postHashTags   | string[] | No       | Array of hashtags                  |
| attachments    | array    | No       | File attachments                   |
| authorPageID   | int      | No       | Include to post as a business page |

---

### POST `/posts/{postId}/comments`

Add a comment to a post. Can comment as user or as a business page.

**Request Body:**

```json
{
  "commentContent": "Great post!",
  "parentCommentID": null,
  "authorPageID": 123
}
```

| Field           | Type   | Required | Description                           |
| --------------- | ------ | -------- | ------------------------------------- |
| commentContent  | string | Yes      | Comment text                          |
| parentCommentID | int    | No       | For nested replies                    |
| authorPageID    | int    | No       | Include to comment as a business page |

---

### POST `/posts/{postId}/like`

Like or unlike a post.

**Response:**

```json
{
  "message": "Post liked successfully"
}
```

---

## Business Page APIs

Base URL: `/api/v1/pages`

### POST `/`

Create a new business page.

**Request Body:**

```json
{
  "businessTitle": "TechCorp Inc",
  "email": "contact@techcorp.com",
  "pagePhoneNumbers": ["+1-555-0100"],
  "headline": "Building the Future",
  "tagline": "Innovation First",
  "description": "We are a tech company...",
  "longDescription": "Detailed description...",
  "websiteUrl": "https://techcorp.com",
  "foundedYear": 2020,
  "industry": "Technology",
  "companySize": "51-100",
  "companyStage": "Growth Stage",
  "location": "San Francisco, CA",
  "socialMedia": {
    "linkedin": "https://linkedin.com/company/techcorp",
    "twitter": "https://twitter.com/techcorp",
    "facebook": "https://facebook.com/techcorp",
    "instagram": "https://instagram.com/techcorp"
  },
  "contactInfo": {
    "email": "support@techcorp.com",
    "phone": "+1-555-0100",
    "address": "123 Tech Street, SF, CA"
  },
  "keyMetrics": {
    "mrr": 100000,
    "arr": 1200000,
    "churnRate": 5.5,
    "ltv": 1200,
    "cac": 150
  },
  "market": {
    "targetMarket": "B2B SaaS Companies",
    "competitiveAdvantage": "Best-in-class AI",
    "technologyStack": ["Python", "React", "PostgreSQL"],
    "totalAddressableMarket": 10000000000,
    "competitors": ["CompetitorA", "CompetitorB"]
  },
  "culture": {
    "perks": ["Remote Work", "Health Insurance"],
    "teamSize": 75,
    "averageAge": 32
  }
}
```

---

### GET `/{pageId}`

Get business page details.

**Response:** Full BusinessPageResponse with all fields.

---

### PUT `/{pageId}`

Update business page. Only owners/admins can update.

---

### DELETE `/{pageId}`

Delete business page. Only owners can delete.

---

### GET `/my-pages`

Get all pages where current user is a member.

**Response:**

```json
[
  {
    "id": 123,
    "businessTitle": "TechCorp",
    "email": "contact@techcorp.com",
    "avatarURL": "https://...",
    "verificationStatus": "verified",
    "totalFollowers": 1500,
    "userRole": "owner",
    "canSwitchContext": true
  }
]
```

---

### GET `/{pageId}/posts`

Get posts by a specific business page.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | int | 1 | Page number |
| limit | int | 10 | Items per page |

**Response:**

```json
{
  "posts": [
    {
      "id": 1,
      "authorID": 123,
      "author": { ... },
      "authorPageID": 456,
      "authorPage": {
        "id": 456,
        "businessTitle": "TechCorp",
        "avatarURL": "https://...",
        "verificationStatus": "verified"
      },
      "postContent": "Company update...",
      "likeCount": 89,
      "commentCount": 23,
      "isLiked": false,
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "hasNext": true
}
```

---

### GET `/{pageId}/stats`

Get page statistics for sidebar. **Requires page membership.**

**Response:**

```json
{
  "page": {
    "id": 123,
    "businessTitle": "TechCorp",
    "headline": "Building the Future",
    "avatarURL": "https://...",
    "coverImageURL": "https://..."
  },
  "stats": {
    "pageViews": 1248,
    "postImpressions": 5567,
    "searchAppearances": 145,
    "totalFollowers": 842,
    "totalPosts": 56,
    "totalLikes": 1951,
    "totalComments": 412,
    "weeklyGrowth": 18.5,
    "engagementRate": 6.2
  }
}
```

---

### GET `/{pageId}/analytics`

Get comprehensive analytics. **Requires owner/admin role.**

**Response:**

```json
{
  "overview": {
    "totalFollowers": 1234,
    "totalPosts": 56,
    "totalEngagement": 5678,
    "pageViews": 12345,
    "avgEngagementRate": 4.5
  },
  "growth": {
    "followersLast7Days": [100, 120, 115, 130, 145, 160, 180],
    "followersLast30Days": [...],
    "newFollowersThisWeek": 80,
    "followerGrowthPercent": 12.5
  },
  "engagement": {
    "likesLast7Days": [50, 60, 55, 70, 65, 80, 90],
    "commentsLast7Days": [10, 12, 8, 15, 14, 18, 20],
    "sharesLast7Days": [5, 6, 4, 8, 7, 10, 12],
    "topPosts": [
      { "id": 123, "content": "...", "likes": 150, "comments": 45 }
    ]
  },
  "audience": {
    "demographics": {
      "industries": [
        { "name": "Technology", "percent": 35 }
      ],
      "locations": [
        { "name": "Singapore", "percent": 40 }
      ],
      "companySizes": [
        { "name": "1-50", "percent": 30 }
      ]
    }
  },
  "content": {
    "postFrequency": {
      "thisWeek": 5,
      "lastWeek": 3,
      "avgPerWeek": 4
    },
    "bestPostingTimes": []
  }
}
```

---

### GET `/{pageId}/followers`

Get paginated list of page followers.

**Response:**

```json
[
  {
    "id": 123,
    "firstName": "Jane",
    "lastName": "Smith",
    "headline": "Product Manager",
    "avatarURL": "https://...",
    "isVerified": true
  }
]
```

---

### POST `/{pageId}/follow`

Follow or unfollow a business page.

**Response:**

```json
{
  "message": "Now following TechCorp"
}
```

---

### GET `/{pageId}/members`

Get all members of a page. **Requires membership.**

---

### POST `/{pageId}/members`

Add a member to the page. **Requires owner/admin role.**

**Request Body:**

```json
{
  "userID": 456,
  "role": "employee",
  "canPost": true,
  "canComment": true,
  "canManageMembers": false,
  "canViewAnalytics": true
}
```

---

### GET `/context/current`

Get current operating context.

**Headers:**

```
X-Page-ID: 123  (optional)
```

**Response (as user):**

```json
{
  "isPage": false,
  "pageID": null,
  "page": null,
  "user": { ... },
  "permissions": null
}
```

**Response (as page):**

```json
{
  "isPage": true,
  "pageID": 123,
  "page": { ... },
  "user": { ... },
  "permissions": {
    "canPost": true,
    "canComment": true,
    "canManageMembers": true,
    "canViewAnalytics": true,
    "canRespondToConnections": true
  }
}
```

---

## Page Resources APIs

Base URL: `/api/v1/pages/{pageId}`

### Founders

| Method | Endpoint                | Description       |
| ------ | ----------------------- | ----------------- |
| GET    | `/founders`             | List all founders |
| POST   | `/founders`             | Add a founder     |
| PUT    | `/founders/{founderId}` | Update founder    |
| DELETE | `/founders/{founderId}` | Remove founder    |

### Team Members

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/team`            | List all team members |
| POST   | `/team`            | Add team member       |
| PUT    | `/team/{memberId}` | Update team member    |
| DELETE | `/team/{memberId}` | Remove team member    |

### Investors

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| GET    | `/investors`              | List all investors |
| POST   | `/investors`              | Add investor       |
| PUT    | `/investors/{investorId}` | Update investor    |
| DELETE | `/investors/{investorId}` | Remove investor    |

### Jobs

| Method | Endpoint        | Description               |
| ------ | --------------- | ------------------------- |
| GET    | `/jobs`         | List page jobs            |
| GET    | `/jobs/active`  | List active jobs (public) |
| POST   | `/jobs`         | Create job posting        |
| PUT    | `/jobs/{jobId}` | Update job                |
| DELETE | `/jobs/{jobId}` | Delete job                |

### Updates/News

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/updates`            | List page updates |
| POST   | `/updates`            | Create update     |
| PUT    | `/updates/{updateId}` | Edit update       |
| DELETE | `/updates/{updateId}` | Delete update     |

### Milestones

| Method | Endpoint                    | Description      |
| ------ | --------------------------- | ---------------- |
| GET    | `/milestones`               | List milestones  |
| POST   | `/milestones`               | Add milestone    |
| PUT    | `/milestones/{milestoneId}` | Update milestone |
| DELETE | `/milestones/{milestoneId}` | Delete milestone |

### Office Locations

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| GET    | `/offices`            | List offices  |
| POST   | `/offices`            | Add office    |
| PUT    | `/offices/{officeId}` | Update office |
| DELETE | `/offices/{officeId}` | Delete office |

---

## Context & Headers

### How to Send Page Context

| Action              | Method                           | How to Send                    |
| ------------------- | -------------------------------- | ------------------------------ |
| Create Post         | POST `/feed/posts`               | `authorPageID` in request body |
| Create Comment      | POST `/feed/posts/{id}/comments` | `authorPageID` in request body |
| Get Feed            | GET `/feed/`                     | `X-Page-ID` header             |
| Get Current Context | GET `/pages/context/current`     | `X-Page-ID` header             |
| Like Post           | POST `/feed/posts/{id}/like`     | Token only (user action)       |
| Follow Page         | POST `/pages/{id}/follow`        | Token only (user action)       |

### Frontend Implementation

```typescript
// Store page context
const [activePageId, setActivePageId] = useState<number | null>(null);

// API call with page context (for GET requests)
const fetchFeed = async () => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (activePageId) {
    headers["X-Page-ID"] = activePageId.toString();
  }

  const response = await fetch("/api/v1/feed/", { headers });
  return response.json();
};

// API call for posting as page
const createPost = async (content: string) => {
  const body = {
    postContent: content,
    postVisibility: "public",
    authorPageID: activePageId || undefined, // Include only when operating as page
  };

  const response = await fetch("/api/v1/feed/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};
```

---

## Error Responses

All endpoints return errors in this format:

```json
{
  "detail": "Error message here"
}
```

**Common HTTP Status Codes:**

- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (no permission)
- `404` - Not Found
- `500` - Internal Server Error

---

## Missing/Planned APIs

The following APIs are needed for full functionality of certain features but may not yet be implemented in the backend.

### QR Connect APIs

Base URL: `/api/v1/connect`

#### POST `/request`

Send a connection request to another user via QR scan.

**Request Body:**

```json
{
  "targetUserId": 123,
  "source": "qr_scan",
  "message": "Optional message" // optional
}
```

**Response:**

```json
{
  "success": true,
  "connectionId": 456,
  "status": "pending",
  "message": "Connection request sent successfully"
}
```

---

#### GET `/stats`

Get QR/connection statistics for the current user.

**Response:**

```json
{
  "totalConnections": 24,
  "totalQRScans": 156,
  "totalShares": 89,
  "connectionsThisWeek": 12,
  "pendingRequests": 3
}
```

---

#### GET `/recent`

Get recent connections for the current user.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| limit | int | 10 | Number of recent connections |

**Response:**

```json
{
  "connections": [
    {
      "id": 1,
      "user": {
        "id": 123,
        "firstName": "Alice",
        "lastName": "Smith",
        "avatarURL": "https://...",
        "headline": "Product Designer"
      },
      "connectedAt": "2024-01-15T10:30:00Z",
      "source": "qr_scan"
    }
  ]
}
```

---

### User Roles API

Base URL: `/api/v1/users`

#### GET `/{userId}/roles`

Get the professional roles of a user.

**Response:**

```json
{
  "roles": [
    {
      "id": "1",
      "type": "mentor",
      "title": "Tech Mentor",
      "description": "Providing guidance to aspiring developers",
      "verified": true,
      "startDate": "2023-01-01",
      "organization": "GrowthLab"
    },
    {
      "id": "2",
      "type": "investor",
      "title": "Angel Investor",
      "description": "Investing in early-stage startups",
      "verified": true
    }
  ]
}
```

**Role Types:**

- `founder` - Startup Founder
- `investor` - Investor/Angel
- `mentor` - Mentor
- `advisor` - Advisor
- `executive` - Executive/C-Level
- `professional` - Professional/Employee

---

#### POST `/{userId}/roles`

Add a new role to user profile (requires authentication as the user).

**Request Body:**

```json
{
  "type": "mentor",
  "title": "Tech Mentor",
  "description": "Providing guidance to aspiring developers",
  "organization": "GrowthLab",
  "startDate": "2023-01-01"
}
```

**Response:**

```json
{
  "id": "3",
  "type": "mentor",
  "title": "Tech Mentor",
  "description": "Providing guidance to aspiring developers",
  "verified": false
}
```

---

### Extended User Profile Fields

The following fields would enhance the `/api/v1/auth/me` response:

```json
{
  // ... existing fields ...
  "qrScansReceived": 156,
  "profileShares": 89,
  "roles": [
    {
      "id": "1",
      "type": "mentor",
      "title": "Tech Mentor",
      "verified": true
    }
  ],
  "skills": ["JavaScript", "React", "Leadership"],
  "education": [
    {
      "institution": "MIT",
      "degree": "BS Computer Science",
      "year": 2015
    }
  ],
  "experience": [
    {
      "company": "TechCorp",
      "title": "Senior Engineer",
      "startDate": "2018-01",
      "endDate": null,
      "current": true
    }
  ]
}
```

---

### Notes

1. **Currently Implemented (Frontend using real data):**

   - `/api/v1/auth/me` - User profile data including `totalConnections`, `totalPosts`, `totalEngagement`
   - User profile display with first name, last name, headline, bio, avatar
   - Social links (LinkedIn, Twitter, Website)
   - Verification status

2. **Currently Using Static/Mock Data:**

   - User roles (mentor, investor, founder) - static array in components
   - Recent connections list in QR scan page
   - Some stats like QR scans received

3. **Frontend Implementation Notes:**
   - QR scanning uses `jsQR` library for client-side scanning
   - QR codes contain JSON with `userId`, `profileUrl`, `connectUrl`, and `name`
   - Download functionality uses `html2canvas` to capture cards as PNG
   - Share uses Web Share API with clipboard fallback

```

```
