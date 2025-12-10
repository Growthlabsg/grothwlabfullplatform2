# Feed Posts API - Complete Documentation

This document provides complete documentation for all Post-related APIs including creating, editing, deleting, saving, reporting, and reposting.

**Base URL:** `/api/v1/feed`

**Authentication:** Most endpoints require Bearer Token authentication.

---

## Table of Contents

1. [Get Single Post](#1-get-single-post)
2. [Edit Post](#2-edit-post)
3. [Delete Post](#3-delete-post)
4. [Attachments](#4-attachments)
5. [Save/Unsave Post](#5-saveunsave-post)
6. [Get Saved Posts](#6-get-saved-posts)
7. [Report Post](#7-report-post)
8. [Withdraw Report](#8-withdraw-report)
9. [Repost](#9-repost)
10. [Delete Comment](#10-delete-comment)
11. [Connection Recommendations](#11-connection-recommendations)
12. [Frontend Implementation Guide](#12-frontend-implementation-guide)

---

## 1. Get Single Post

### GET `/api/v1/feed/posts/{post_id}`

Get a specific post by ID with full details.

**Authentication:** Optional (required for private posts)

**Path Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `post_id` | int  | Post ID     |

**Headers:**

```
Authorization: Bearer {access_token}  (optional)
x-page-id: {page_id}                  (optional, for page context)
```

**Response:** `200 OK`

```json
{
  "id": 123,
  "authorID": 456,
  "author": {
    "id": 456,
    "firstName": "Jane",
    "lastName": "Smith",
    "avatarURL": "https://cdn.example.com/jane.jpg",
    "headline": "Angel Investor",
    "isVerified": true
  },
  "authorPageID": null,
  "authorPage": null,
  "postContent": "This is my post content...",
  "likesCount": 42,
  "commentsCount": 15,
  "sharesCount": 8,
  "viewsCount": 350,
  "repostsCount": 5,
  "postVisibility": "public",
  "postHashTags": ["startup", "investment"],
  "attachments": [
    {
      "id": 1,
      "postAttachmentType": "image",
      "postAttachmentUrl": "https://cdn.example.com/image.jpg",
      "postAttachmentTitle": "Product Screenshot",
      "postAttachmentDescription": "Our new dashboard"
    }
  ],
  "createdAt": "2024-12-09T10:00:00Z",
  "updatedAt": "2024-12-09T12:00:00Z",
  "isLiked": true,
  "isSaved": false,
  "isRepost": false,
  "originalPostID": null,
  "originalPost": null
}
```

**Error Responses:**

| Status | Detail          |
| ------ | --------------- |
| `403`  | Post is private |
| `404`  | Post not found  |

---

## 2. Edit Post

### PUT `/api/v1/feed/posts/{post_id}`

Update a post (only by author).

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `post_id` | int  | Post ID     |

**Request Body:**

```json
{
  "postContent": "Updated post content...",
  "postVisibility": "public",
  "postHashTags": ["startup", "update"],
  "attachments": [
    {
      "postAttachmentType": "image",
      "postAttachmentUrl": "https://cdn.example.com/new-image.jpg",
      "postAttachmentTitle": "New Image",
      "postAttachmentDescription": "Updated screenshot"
    }
  ]
}
```

**All fields are optional.** Only include fields you want to update.

**Request Body Fields:**

| Field            | Type     | Max Length | Description                           |
| ---------------- | -------- | ---------- | ------------------------------------- |
| `postContent`    | string   | 5000       | Post text content                     |
| `postVisibility` | string   | -          | `public`, `connections`, or `private` |
| `postHashTags`   | string[] | 10 items   | Array of hashtags                     |
| `attachments`    | object[] | 10 items   | Array of attachment objects           |

**Attachment Object:**

| Field                       | Type   | Required | Description                          |
| --------------------------- | ------ | -------- | ------------------------------------ |
| `postAttachmentType`        | string | Yes      | `image`, `video`, `link`, `document` |
| `postAttachmentUrl`         | string | Yes      | URL of the attachment                |
| `postAttachmentTitle`       | string | No       | Title/caption                        |
| `postAttachmentDescription` | string | No       | Description                          |

**Response:** `200 OK` - Returns updated `PostResponse`

**Error Responses:**

| Status | Detail                           |
| ------ | -------------------------------- |
| `403`  | You can only edit your own posts |
| `404`  | Post not found                   |
| `500`  | Failed to update post            |

---

## 3. Delete Post

### DELETE `/api/v1/feed/posts/{post_id}`

Delete a post (only by author).

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `post_id` | int  | Post ID     |

**Response:** `200 OK`

```json
{
  "message": "Post deleted successfully"
}
```

**Error Responses:**

| Status | Detail                             |
| ------ | ---------------------------------- |
| `403`  | You can only delete your own posts |
| `404`  | Post not found                     |
| `500`  | Failed to delete post              |

---

## 4. Attachments

### Managing Attachments

Attachments are managed through the **Edit Post** endpoint. When you update a post with attachments:

1. **Replace all attachments:** Include the `attachments` array with new attachments
2. **Remove all attachments:** Include an empty `attachments` array: `[]`
3. **Keep existing attachments:** Don't include the `attachments` field at all

**Adding Attachments to Existing Post:**

```json
{
  "attachments": [
    {
      "postAttachmentType": "image",
      "postAttachmentUrl": "https://cdn.example.com/image1.jpg"
    },
    {
      "postAttachmentType": "image",
      "postAttachmentUrl": "https://cdn.example.com/image2.jpg"
    }
  ]
}
```

**Removing All Attachments:**

```json
{
  "attachments": []
}
```

**Attachment Types:**

| Type       | Description                      |
| ---------- | -------------------------------- |
| `image`    | Image file (jpg, png, gif, etc.) |
| `video`    | Video file (mp4, webm, etc.)     |
| `link`     | External URL/link preview        |
| `document` | Document file (pdf, doc, etc.)   |

---

## 5. Save/Unsave Post

### POST `/api/v1/feed/posts/{post_id}/save`

Toggle save status for a post.

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `post_id` | int  | Post ID     |

**Request Body (Optional):**

```json
{
  "pageID": 123
}
```

Include `pageID` to save as a business page.

**Response:** `200 OK`

```json
{
  "message": "Post saved successfully"
}
```

Or:

```json
{
  "message": "Post unsaved successfully"
}
```

**Error Responses:**

| Status | Detail                                         |
| ------ | ---------------------------------------------- |
| `403`  | You are not a member of this page              |
| `403`  | You don't have permission to save as this page |
| `404`  | Post not found                                 |
| `404`  | Page not found                                 |
| `500`  | Failed to save/unsave post                     |

---

## 6. Get Saved Posts

### GET `/api/v1/feed/saved`

Get saved posts for the current user or a business page.

**Authentication:** Required

**Query Parameters:**

| Parameter | Type | Default | Description                    |
| --------- | ---- | ------- | ------------------------------ |
| `page`    | int  | 1       | Page number                    |
| `limit`   | int  | 20      | Items per page (1-50)          |
| `page_id` | int  | null    | Page ID for page's saved posts |

**Response:** `200 OK`

```json
{
  "posts": [
    {
      "id": 123,
      "authorID": 456,
      "pageID": null,
      "author": {
        "id": 456,
        "firstName": "Jane",
        "lastName": "Smith",
        "avatarURL": "https://cdn.example.com/jane.jpg",
        "headline": "Angel Investor",
        "isVerified": true
      },
      "page": null,
      "postContent": "Great insights on startup funding...",
      "postVisibility": "public",
      "postHashTags": ["startup"],
      "attachments": [],
      "likesCount": 42,
      "commentsCount": 15,
      "sharesCount": 8,
      "viewsCount": 350,
      "isLiked": true,
      "isSaved": true,
      "savedAt": "2024-12-10T14:30:00Z",
      "createdAt": "2024-12-09T10:00:00Z",
      "updatedAt": null
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 20,
  "hasNext": true
}
```

**Note:** Posts are returned with most recently saved first.

---

## 7. Report Post

### POST `/api/v1/feed/posts/{post_id}/report`

Report a post for review.

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `post_id` | int  | Post ID     |

**Request Body:**

```json
{
  "reportingReason": "This post contains misleading information about investment returns.",
  "pageID": 123
}
```

| Field             | Type   | Required | Min/Max Length | Description                  |
| ----------------- | ------ | -------- | -------------- | ---------------------------- |
| `reportingReason` | string | Yes      | 10-500 chars   | Reason for reporting         |
| `pageID`          | int    | No       | -              | Page ID if reporting as page |

**Response:** `200 OK`

```json
{
  "message": "Post reported successfully. Our team will review it shortly."
}
```

**Error Responses:**

| Status | Detail                                           |
| ------ | ------------------------------------------------ |
| `400`  | You cannot report your own post                  |
| `400`  | You have already reported this post              |
| `403`  | You are not a member of this page                |
| `403`  | You don't have permission to report as this page |
| `404`  | Post not found                                   |
| `404`  | Page not found                                   |
| `500`  | Failed to report post                            |

---

## 8. Withdraw Report

### DELETE `/api/v1/feed/posts/{post_id}/report`

Withdraw a previously submitted report.

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| `post_id` | int  | Post ID     |

**Query Parameters:**

| Parameter | Type | Description                        |
| --------- | ---- | ---------------------------------- |
| `page_id` | int  | Page ID if withdrawing page report |

**Response:** `200 OK`

```json
{
  "message": "Report withdrawn successfully"
}
```

**Error Responses:**

| Status | Detail                                                      |
| ------ | ----------------------------------------------------------- |
| `403`  | You are not a member of this page                           |
| `403`  | You don't have permission to withdraw reports for this page |
| `404`  | Post not found                                              |
| `404`  | You have not reported this post                             |
| `500`  | Failed to withdraw report                                   |

---

## 9. Repost

### POST `/api/v1/feed/posts/{post_id}/repost`

Repost a post with an optional caption.

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Description      |
| --------- | ---- | ---------------- |
| `post_id` | int  | Original post ID |

**Request Body (Optional):**

```json
{
  "caption": "Great insights! Worth sharing with my network.",
  "pageID": 123
}
```

| Field     | Type   | Max Length | Description                  |
| --------- | ------ | ---------- | ---------------------------- |
| `caption` | string | 1000       | Caption for the repost       |
| `pageID`  | int    | -          | Page ID if reposting as page |

**Response:** `200 OK` - Returns the new repost as `PostResponse`

```json
{
  "id": 789,
  "authorID": 456,
  "author": { ... },
  "postContent": "Great insights! Worth sharing with my network.",
  "likesCount": 0,
  "commentsCount": 0,
  "sharesCount": 0,
  "viewsCount": 0,
  "repostsCount": 0,
  "isRepost": true,
  "originalPostID": 123,
  "originalPost": {
    "id": 123,
    "authorID": 111,
    "author": {
      "id": 111,
      "firstName": "Original",
      "lastName": "Author",
      "avatarURL": "https://cdn.example.com/original.jpg",
      "headline": "Startup Founder",
      "isVerified": true
    },
    "postContent": "Original post content...",
    "likesCount": 150,
    "commentsCount": 45,
    "sharesCount": 30,
    "viewsCount": 2500,
    "repostsCount": 12,
    "attachments": [ ... ],
    "createdAt": "2024-12-01T10:00:00Z"
  },
  "createdAt": "2024-12-10T15:00:00Z"
}
```

**Behavior:**

- Cannot repost your own posts
- Cannot repost a repost (will repost the original instead)
- Increments `repostsCount` on the original post
- Creates a new post with `isRepost: true`

**Error Responses:**

| Status | Detail                                         |
| ------ | ---------------------------------------------- |
| `400`  | You cannot repost your own post                |
| `403`  | You are not a member of this page              |
| `403`  | You don't have permission to post as this page |
| `404`  | Post not found                                 |
| `404`  | Original post not found                        |
| `404`  | Page not found                                 |
| `500`  | Failed to repost                               |

---

## 10. Delete Comment

### DELETE `/api/v1/feed/comments/{comment_id}`

Delete a comment or reply.

**Authentication:** Required

**Path Parameters:**

| Parameter    | Type | Description |
| ------------ | ---- | ----------- |
| `comment_id` | int  | Comment ID  |

**Who Can Delete:**

- The comment author
- The author of the post the comment is on

**Response:** `200 OK`

```json
{
  "message": "Comment deleted successfully"
}
```

**Error Responses:**

| Status | Detail                                                          |
| ------ | --------------------------------------------------------------- |
| `403`  | You can only delete your own comments or comments on your posts |
| `404`  | Comment not found                                               |
| `404`  | Post not found                                                  |
| `500`  | Failed to delete comment                                        |

---

## 11. Connection Recommendations

### GET `/api/v1/connections/recommendations`

Get personalized user recommendations with mutual connections.

**Authentication:** Required

**Query Parameters:**

| Parameter             | Type   | Default | Description                                          |
| --------------------- | ------ | ------- | ---------------------------------------------------- |
| `recommendation_type` | string | `all`   | `all`, `investors`, `founders`, `mentors`, `similar` |
| `limit`               | int    | 20      | Number of results (1-50)                             |

**Response:** `200 OK`

```json
[
  {
    "id": 123,
    "firstName": "Jane",
    "lastName": "Smith",
    "headline": "Angel Investor | 50+ Startups",
    "bio": "Investing in early-stage startups...",
    "avatarURL": "https://cdn.example.com/jane.jpg",
    "location": "San Francisco, CA",
    "companyName": "Smith Ventures",
    "role": "investor",
    "isVerified": true,
    "totalConnections": 500,
    "totalPosts": 45,
    "matchScore": 85,
    "connectionReason": "Similar industry focus and complementary roles",
    "mutualConnectionsCount": 12,
    "mutualConnections": [
      {
        "id": 456,
        "firstName": "Bob",
        "lastName": "Wilson",
        "avatarURL": "https://cdn.example.com/bob.jpg",
        "headline": "Startup Mentor"
      },
      {
        "id": 789,
        "firstName": "Alice",
        "lastName": "Brown",
        "avatarURL": "https://cdn.example.com/alice.jpg",
        "headline": "VC Partner"
      },
      {
        "id": 101,
        "firstName": "Charlie",
        "lastName": "Davis",
        "avatarURL": "https://cdn.example.com/charlie.jpg",
        "headline": "Tech Entrepreneur"
      }
    ]
  }
]
```

**Response Fields:**

| Field                    | Type   | Description                              |
| ------------------------ | ------ | ---------------------------------------- |
| `matchScore`             | int    | Match percentage (0-100)                 |
| `connectionReason`       | string | Human-readable reason for recommendation |
| `mutualConnectionsCount` | int    | Total number of mutual connections       |
| `mutualConnections`      | array  | Preview of up to 3 mutual connections    |

---

## 12. Frontend Implementation Guide

### TypeScript Interfaces

```typescript
// Post Response
interface PostResponse {
  id: number;
  authorID: number;
  author: UserProfile;
  authorPageID: number | null;
  authorPage: PageInfo | null;
  postContent: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  repostsCount: number;
  postVisibility: "public" | "connections" | "private";
  postHashTags: string[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string | null;
  isLiked: boolean;
  isSaved: boolean;
  isRepost: boolean;
  originalPostID: number | null;
  originalPost: OriginalPost | null;
}

interface OriginalPost {
  id: number;
  authorID: number;
  author: {
    id: number;
    firstName: string;
    lastName: string;
    avatarURL: string | null;
    headline: string | null;
    isVerified: boolean;
  };
  authorPageID: number | null;
  authorPage: PageInfo | null;
  postContent: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  repostsCount: number;
  postVisibility: string;
  postHashTags: string[];
  attachments: Attachment[];
  createdAt: string;
  updatedAt: string | null;
}

interface Recommendation {
  id: number;
  firstName: string;
  lastName: string;
  headline: string | null;
  bio: string | null;
  avatarURL: string | null;
  location: string | null;
  companyName: string | null;
  role: string;
  isVerified: boolean;
  totalConnections: number;
  totalPosts: number;
  matchScore: number;
  connectionReason: string;
  mutualConnectionsCount: number;
  mutualConnections: MutualConnection[];
}

interface MutualConnection {
  id: number;
  firstName: string;
  lastName: string;
  avatarURL: string | null;
  headline: string | null;
}
```

### Displaying Reposts in Feed

When rendering posts in the feed, check `isRepost` to display differently:

```tsx
// components/PostCard.tsx

function PostCard({ post }: { post: PostResponse }) {
  if (post.isRepost && post.originalPost) {
    return (
      <div className="repost-card">
        {/* Repost header */}
        <div className="repost-header">
          <RepostIcon />
          <span>
            <strong>
              {post.author.firstName} {post.author.lastName}
            </strong>{" "}
            reposted
          </span>
          <span className="time">{formatTime(post.createdAt)}</span>
        </div>

        {/* Caption (if any) */}
        {post.postContent && (
          <div className="repost-caption">
            <p>{post.postContent}</p>
          </div>
        )}

        {/* Original post (embedded) */}
        <div className="original-post-embed">
          <OriginalPostCard post={post.originalPost} />
        </div>

        {/* Engagement bar for the repost */}
        <EngagementBar
          postId={post.id}
          likes={post.likesCount}
          comments={post.commentsCount}
          reposts={post.repostsCount}
          isLiked={post.isLiked}
          isSaved={post.isSaved}
        />
      </div>
    );
  }

  // Regular post
  return (
    <div className="post-card">
      <PostHeader
        author={post.author}
        page={post.authorPage}
        time={post.createdAt}
      />
      <PostContent content={post.postContent} hashtags={post.postHashTags} />
      {post.attachments.length > 0 && <Attachments items={post.attachments} />}
      <PostStats
        likes={post.likesCount}
        comments={post.commentsCount}
        shares={post.sharesCount}
        reposts={post.repostsCount}
        views={post.viewsCount}
      />
      <EngagementBar
        postId={post.id}
        likes={post.likesCount}
        comments={post.commentsCount}
        reposts={post.repostsCount}
        isLiked={post.isLiked}
        isSaved={post.isSaved}
      />
    </div>
  );
}

function OriginalPostCard({ post }: { post: OriginalPost }) {
  return (
    <div className="embedded-post">
      <div className="embedded-header">
        <img src={post.author.avatarURL || defaultAvatar} alt="" />
        <div>
          <strong>
            {post.author.firstName} {post.author.lastName}
          </strong>
          {post.author.isVerified && <VerifiedBadge />}
          <p>{post.author.headline}</p>
        </div>
      </div>
      <div className="embedded-content">
        <p>{post.postContent}</p>
        {post.attachments.length > 0 && (
          <div className="embedded-attachments">
            {post.attachments.map((att) => (
              <img key={att.id} src={att.postAttachmentUrl} alt="" />
            ))}
          </div>
        )}
      </div>
      <div className="embedded-stats">
        <span>{post.likesCount} likes</span>
        <span>{post.commentsCount} comments</span>
        <span>{post.repostsCount} reposts</span>
      </div>
    </div>
  );
}
```

### CSS for Repost Cards

```css
.repost-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.repost-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.repost-header svg {
  width: 16px;
  height: 16px;
  color: #4caf50;
}

.repost-caption {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
}

.original-post-embed {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
}

.embedded-post {
  padding: 16px;
  background: #fafafa;
}

.embedded-header {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.embedded-header img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.embedded-content {
  margin-bottom: 12px;
}

.embedded-attachments {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.embedded-attachments img {
  width: 100%;
  border-radius: 8px;
}

.embedded-stats {
  display: flex;
  gap: 16px;
  color: #666;
  font-size: 13px;
}
```

### Repost Button Component

```tsx
function RepostButton({
  postId,
  initialCount,
}: {
  postId: number;
  initialCount: number;
}) {
  const [count, setCount] = useState(initialCount);
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRepost = async () => {
    setLoading(true);
    try {
      await fetch(`/api/v1/feed/posts/${postId}/repost`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caption: caption || undefined }),
      });
      setCount((c) => c + 1);
      setShowModal(false);
      setCaption("");
      toast.success("Post reposted!");
    } catch (err) {
      toast.error("Failed to repost");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="repost-btn" onClick={() => setShowModal(true)}>
        <RepostIcon />
        <span>{count}</span>
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3>Repost</h3>
          <textarea
            placeholder="Add a caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={1000}
          />
          <div className="modal-actions">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleRepost} disabled={loading}>
              {loading ? "Reposting..." : "Repost"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
```

---

## API Summary

| Endpoint                              | Method | Description                                 |
| ------------------------------------- | ------ | ------------------------------------------- |
| `/api/v1/feed/posts/{post_id}`        | GET    | Get single post                             |
| `/api/v1/feed/posts/{post_id}`        | PUT    | Edit post                                   |
| `/api/v1/feed/posts/{post_id}`        | DELETE | Delete post                                 |
| `/api/v1/feed/posts/{post_id}/save`   | POST   | Save/unsave post                            |
| `/api/v1/feed/saved`                  | GET    | Get saved posts                             |
| `/api/v1/feed/posts/{post_id}/report` | POST   | Report post                                 |
| `/api/v1/feed/posts/{post_id}/report` | DELETE | Withdraw report                             |
| `/api/v1/feed/posts/{post_id}/repost` | POST   | Repost a post                               |
| `/api/v1/feed/comments/{comment_id}`  | DELETE | Delete comment                              |
| `/api/v1/connections/recommendations` | GET    | Get recommendations with mutual connections |

---

## Notes

1. **Edit Post Attachments:** When editing, the `attachments` array completely replaces existing attachments. To keep existing ones, don't include the field.

2. **Repost Chain Prevention:** Reposting a repost will always reference the original post, not the intermediate repost.

3. **Delete Comment Permissions:** Post authors can delete any comment on their posts; comment authors can delete their own comments anywhere.

4. **Saved Posts Order:** Saved posts are returned with most recently saved first (by `savedAt`, not `createdAt`).

5. **Mutual Connections:** The recommendations API returns up to 3 mutual connections as a preview, with the total count in `mutualConnectionsCount`.
