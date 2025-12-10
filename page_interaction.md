# Business Page Interactions API

This document describes how business pages can interact with posts and comments (like, comment, reply).

---

## Overview

Business pages can now:

- **Like posts** as the page
- **Unlike posts** as the page
- **Comment on posts** as the page
- **Reply to comments** as the page
- **Like comments** as the page

---

## API Endpoints

### 1. Like/Unlike a Post

```
POST /api/v1/feed/posts/{post_id}/like
```

#### Request Body (Optional)

```json
{
  "pageID": 123 // Include to like as a business page, omit to like as user
}
```

#### Examples

**Like as User:**

```typescript
// No body or empty body
await fetch(`/api/v1/feed/posts/${postId}/like`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

**Like as Business Page:**

```typescript
await fetch(`/api/v1/feed/posts/${postId}/like`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pageID: 123, // Your business page ID
  }),
});
```

#### Response

```json
{
  "message": "Post liked successfully"
}
```

or

```json
{
  "message": "Post unliked successfully"
}
```

#### Permission Requirements

- User must be authenticated
- If `pageID` is provided:
  - User must be a member of the page
  - User must have role: `OWNER`, `ADMIN`, or `EDITOR`

---

### 2. Comment on a Post

```
POST /api/v1/feed/posts/{post_id}/comments
```

#### Request Body

```json
{
  "commentContent": "Great post!",
  "parentCommentID": null, // null for top-level, comment ID for reply
  "authorPageID": 123 // Include to comment as a business page
}
```

#### Examples

**Comment as User:**

```typescript
await fetch(`/api/v1/feed/posts/${postId}/comments`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    commentContent: "Great post!",
  }),
});
```

**Comment as Business Page:**

```typescript
await fetch(`/api/v1/feed/posts/${postId}/comments`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    commentContent: "Thanks for sharing!",
    authorPageID: 123, // Your business page ID
  }),
});
```

**Reply to a Comment as Business Page:**

```typescript
await fetch(`/api/v1/feed/posts/${postId}/comments`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    commentContent: "Thank you for your feedback!",
    parentCommentID: 456, // ID of comment to reply to
    authorPageID: 123, // Your business page ID
  }),
});
```

#### Response

```json
{
  "id": 789,
  "postID": 100,
  "commentAuthorID": 1,
  "author": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "avatarURL": "...",
    "headline": "CEO"
  },
  "authorPageID": 123,
  "authorPage": {
    "id": 123,
    "businessTitle": "TechCorp Inc",
    "avatarURL": "...",
    "verificationStatus": "verified",
    "totalFollowers": 5000
  },
  "commentContent": "Thanks for sharing!",
  "commentLikeCount": 0,
  "parentCommentID": null,
  "createdAt": "2025-12-09T10:30:00Z",
  "updatedAt": null,
  "isLiked": false,
  "replies": []
}
```

#### Permission Requirements

- User must be authenticated
- If `authorPageID` is provided:
  - User must be a member of the page
  - User must have role: `OWNER` or `ADMIN`

---

### 3. Like/Unlike a Comment

```
POST /api/v1/feed/comments/{comment_id}/like
```

#### Request Body (Optional)

```json
{
  "pageID": 123 // Include to like as a business page, omit to like as user
}
```

#### Examples

**Like Comment as User:**

```typescript
await fetch(`/api/v1/feed/comments/${commentId}/like`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

**Like Comment as Business Page:**

```typescript
await fetch(`/api/v1/feed/comments/${commentId}/like`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pageID: 123,
  }),
});
```

#### Response

```json
{
  "message": "Comment liked successfully"
}
```

#### Permission Requirements

- User must be authenticated
- If `pageID` is provided:
  - User must be a member of the page
  - User must have role: `OWNER`, `ADMIN`, or `EDITOR`

---

## TypeScript Interfaces

```typescript
// Request for liking posts/comments as a page
interface LikeRequest {
  pageID?: number; // Optional - include to like as a business page
}

// Request for creating comments
interface CommentCreate {
  commentContent: string;
  parentCommentID?: number | null; // For replies
  authorPageID?: number; // To comment as a business page
}

// Comment response
interface CommentResponse {
  id: number;
  postID: number;
  commentAuthorID: number;
  author: UserProfile;
  authorPageID: number | null;
  authorPage: BusinessPageInfo | null;
  commentContent: string;
  commentLikeCount: number;
  parentCommentID: number | null;
  createdAt: string;
  updatedAt: string | null;
  isLiked: boolean;
  replies: CommentResponse[];
}

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  avatarURL: string | null;
  headline: string | null;
  isVerified: boolean;
}

interface BusinessPageInfo {
  id: number;
  businessTitle: string;
  avatarURL: string | null;
  verificationStatus: "pending" | "verified" | "rejected" | "suspended";
  totalFollowers: number;
}
```

---

## Frontend Implementation Example

### React Hook for Interactions

```typescript
// hooks/usePostInteractions.ts

interface InteractionContext {
  pageId?: number | null; // Active page context
}

export function usePostInteractions({ pageId }: InteractionContext = {}) {
  const token = useAuthToken();

  const likePost = async (postId: number) => {
    const body = pageId ? { pageID: pageId } : undefined;

    const response = await fetch(`/api/v1/feed/posts/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) throw new Error("Failed to like post");
    return response.json();
  };

  const commentOnPost = async (
    postId: number,
    content: string,
    parentId?: number
  ) => {
    const body: CommentCreate = {
      commentContent: content,
      parentCommentID: parentId || null,
      authorPageID: pageId || undefined,
    };

    const response = await fetch(`/api/v1/feed/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error("Failed to comment");
    return response.json();
  };

  const likeComment = async (commentId: number) => {
    const body = pageId ? { pageID: pageId } : undefined;

    const response = await fetch(`/api/v1/feed/comments/${commentId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) throw new Error("Failed to like comment");
    return response.json();
  };

  return { likePost, commentOnPost, likeComment };
}
```

### Usage in Components

```tsx
function PostActions({ post, activePageId }) {
  const { likePost, commentOnPost } = usePostInteractions({
    pageId: activePageId,
  });

  const handleLike = async () => {
    try {
      await likePost(post.id);
      // Update UI
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };

  const handleComment = async (content: string) => {
    try {
      const newComment = await commentOnPost(post.id, content);
      // Add comment to UI
    } catch (error) {
      console.error("Failed to comment:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLike}>
        {activePageId ? "🏢 Like as Page" : "❤️ Like"}
      </button>
      {/* Comment form */}
    </div>
  );
}
```

---

## Database Migration Required

Run the following migration to add the `pageID` column to `comment_likes`:

```bash
alembic revision --autogenerate -m "add_pageID_to_comment_likes"
alembic upgrade head
```

---

## Error Codes

| Status | Error                 | Description                                      |
| ------ | --------------------- | ------------------------------------------------ |
| 401    | Unauthorized          | Missing or invalid token                         |
| 403    | Forbidden             | User doesn't have permission to act as this page |
| 404    | Not Found             | Post, comment, or page not found                 |
| 500    | Internal Server Error | Server error                                     |

---

## Notes

1. **Separate Like Contexts**: A user can like a post as themselves AND as a business page they manage. These are tracked separately.

2. **Toggle Behavior**: Calling the like endpoint twice with the same context (user or page) will toggle the like on/off.

3. **Page Verification**: For comments, the page must be verified. For likes, any page member with appropriate role can like.

4. **Role Requirements**:
   - **Liking**: OWNER, ADMIN, or EDITOR
   - **Commenting**: OWNER or ADMIN only
