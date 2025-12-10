import { baseApi } from "./baseApi";

// Types based on the Feed API documentation
export interface PostAuthor {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  avatarURL?: string;
  role: string;
  status: string;
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
  subscriptionTier: string;
  totalConnections: number;
  totalPosts: number;
  totalEngagement: number;
  createdAt: string;
  updatedAt: string;
}

export interface PostAttachment {
  id: number;
  postAttachmentType: "image" | "video" | "document" | "link";
  postAttachmentUrl: string;
  postAttachmentTitle?: string;
  postAttachmentDescription?: string;
}

// Page author info for posts/comments made by pages
export interface PostPageAuthor {
  id: number;
  businessTitle: string;
  email?: string;
  avatarURL?: string;
  verificationStatus: "pending" | "verified" | "rejected" | "suspended";
  totalFollowers?: number;
}

// Page author info for optimistic updates (internal use)
export interface PageAuthorInfo {
  id: number;
  businessTitle: string;
  email: string;
  avatarURL?: string;
  verificationStatus: "pending" | "verified" | "rejected" | "suspended";
}

export interface Post {
  id: number;
  authorID: number;
  author: PostAuthor;
  // Page context - present when post is made by a page
  authorPageID?: number;
  authorPage?: PostPageAuthor;
  postContent: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  postVisibility: "public" | "private" | "connections";
  postHashTags: string[];
  attachments: PostAttachment[];
  createdAt: string;
  updatedAt?: string;
  isLiked: boolean;
  isSaved: boolean;
  // For optimistic updates - pending state
  isPending?: boolean;
  pendingAttachments?: number;
}

export interface Comment {
  id: number;
  postID: number;
  commentAuthorID: number;
  author: PostAuthor;
  // Page context - present when comment is made by a page
  authorPageID?: number;
  authorPage?: PostPageAuthor;
  commentContent: string;
  commentLikeCount: number;
  parentCommentID?: number;
  createdAt: string;
  updatedAt?: string;
  isLiked: boolean;
  replies: Comment[];
  isPending?: boolean;
}

export interface FeedResponse {
  posts: Post[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  totalAll: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export interface CreatePostRequest {
  postContent: string;
  postVisibility?: "public" | "private" | "connections";
  postHashTags?: string[];
  attachments?: Omit<PostAttachment, "id">[];
  // Include to post as a business page
  authorPageID?: number;
}

export interface CreateCommentRequest {
  commentContent: string;
  parentCommentID?: number;
  // Include to comment as a business page
  authorPageID?: number;
  // For optimistic updates (not sent to server)
  _pageInfo?: PageAuthorInfo;
}

export interface FileUploadResponse {
  filename: string;
  original_filename: string;
  url: string;
  size: number;
  type: string;
  attachment_data: {
    postAttachmentType: "IMAGE" | "VIDEO" | "DOCUMENT" | "LINK";
    postAttachmentUrl: string;
    postAttachmentTitle: string;
    postAttachmentDescription?: string;
  };
}

// Feed API endpoints
export const feedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get feed
    getFeed: builder.query<
      FeedResponse,
      {
        page?: number;
        limit?: number;
        feed_type?: "recommended" | "following" | "trending" | "recent";
        pageId?: number | null; // Business page ID for page context
      }
    >({
      query: ({ page = 1, limit = 10, feed_type = "recommended", pageId }) => {
        // Build headers - only include X-Page-ID if pageId is a valid number
        const headers: Record<string, string> = {};
        if (pageId != null && pageId > 0) {
          headers["X-Page-ID"] = pageId.toString();
        }

        return {
          url: "/v1/feed/",
          params: { page, limit, feed_type },
          headers: Object.keys(headers).length > 0 ? headers : undefined,
        };
      },
      providesTags: ["Feed"],
    }),

    // Create post
    createPost: builder.mutation<Post, CreatePostRequest>({
      query: (post) => ({
        url: "/v1/feed/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Feed"],
    }),

    // Get specific post
    getPost: builder.query<Post, number>({
      query: (postId) => `/v1/feed/posts/${postId}`,
      providesTags: (result, error, postId) => [{ type: "Post", id: postId }],
    }),

    // Update post
    updatePost: builder.mutation<
      Post,
      { postId: number; post: Partial<CreatePostRequest> }
    >({
      query: ({ postId, post }) => ({
        url: `/v1/feed/posts/${postId}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        "Feed",
      ],
    }),

    // Delete post
    deletePost: builder.mutation<{ message: string }, number>({
      query: (postId) => ({
        url: `/v1/feed/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feed"],
    }),

    // Like/Unlike post with optimistic update
    likePost: builder.mutation<
      { message: string },
      { postId: number; pageID?: number | null }
    >({
      query: ({ postId, pageID }) => ({
        url: `/v1/feed/posts/${postId}/like`,
        method: "POST",
        // Include pageID in body if provided (to like as a business page)
        body: pageID ? { pageID } : undefined,
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled, getState }) {
        const state = getState();
        const patchResults: any[] = [];

        // Get all cached getFeed queries from the state
        const apiQueries = (state as any).api?.queries || {};
        const cachedQueryArgs: Array<{
          page: number;
          limit: number;
          feed_type: string;
          pageId?: number | null;
        }> = [];

        // Find all getFeed queries in the cache
        for (const [key, value] of Object.entries(apiQueries)) {
          if (key.startsWith("getFeed(") && (value as any)?.data) {
            try {
              const argsMatch = key.match(/getFeed\((.*)\)/);
              if (argsMatch && argsMatch[1]) {
                const args = JSON.parse(argsMatch[1]);
                cachedQueryArgs.push(args);
              }
            } catch {
              // Skip if parsing fails
            }
          }
        }

        // If no cached queries found, fall back to common patterns
        if (cachedQueryArgs.length === 0) {
          const feedTypes = [
            "recommended",
            "following",
            "trending",
            "recent",
          ] as const;
          const pageIds = [null, undefined];
          for (const feed_type of feedTypes) {
            for (const pageId of pageIds) {
              cachedQueryArgs.push({ page: 1, limit: 10, feed_type, pageId });
            }
          }
        }

        // Update all cached feed queries
        for (const args of cachedQueryArgs) {
          try {
            const patchResult = dispatch(
              feedApi.util.updateQueryData("getFeed", args as any, (draft) => {
                const post = draft.posts.find((p) => p.id === postId);
                if (post) {
                  post.isLiked = !post.isLiked;
                  post.likesCount += post.isLiked ? 1 : -1;
                }
              })
            );
            patchResults.push(patchResult);
          } catch {
            // Query doesn't exist, skip
          }
        }

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patch) => patch.undo());
        }
      },
    }),

    // Get post comments
    getPostComments: builder.query<
      CommentsResponse,
      { postId: number; page?: number; limit?: number }
    >({
      query: ({ postId, page = 1, limit = 20 }) => ({
        url: `/v1/feed/posts/${postId}/comments`,
        params: { page, limit },
      }),
      providesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),

    // Create comment with optimistic update
    createComment: builder.mutation<
      Comment,
      { postId: number; comment: CreateCommentRequest }
    >({
      query: ({ postId, comment }) => {
        // Remove _pageInfo from the body (it's only for optimistic updates)
        const { _pageInfo, ...commentBody } = comment;
        return {
          url: `/v1/feed/posts/${postId}/comments`,
          method: "POST",
          body: commentBody,
        };
      },
      async onQueryStarted(
        { postId, comment },
        { dispatch, queryFulfilled, getState }
      ) {
        const state = getState() as any;
        const user = state.auth?.user;
        const tempId = Date.now();

        const optimisticComment: Comment = {
          id: tempId,
          postID: postId,
          commentAuthorID: user?.id || 0,
          author: {
            id: user?.id || 0,
            firstName: user?.firstName || "You",
            lastName: user?.lastName || "",
            emailAddress: user?.emailAddress || "",
            avatarURL: user?.avatarURL,
            role: user?.role || "user",
            status: "active",
            isEmailVerified: true,
            isVerified: user?.isVerified || false,
            subscriptionTier: user?.subscriptionTier || "free",
            totalConnections: 0,
            totalPosts: 0,
            totalEngagement: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          commentContent: comment.commentContent,
          commentLikeCount: 0,
          parentCommentID: comment.parentCommentID,
          createdAt: new Date().toISOString(),
          isLiked: false,
          replies: [],
          isPending: true,
          // Include page info if commenting as a page
          authorPageID: comment.authorPageID,
          authorPage: comment._pageInfo,
        };

        // Update comments cache
        const patchResult = dispatch(
          feedApi.util.updateQueryData(
            "getPostComments",
            { postId, page: 1, limit: 10 },
            (draft) => {
              if (comment.parentCommentID) {
                // Find parent and add reply (1 level nesting only)
                const addReplyToParent = (comments: Comment[]): boolean => {
                  for (const c of comments) {
                    if (c.id === comment.parentCommentID) {
                      c.replies = c.replies || [];
                      c.replies.push(optimisticComment);
                      return true;
                    }
                    // If parent is a reply itself, add to parent's parent (flatten)
                    if (c.replies) {
                      for (const reply of c.replies) {
                        if (reply.id === comment.parentCommentID) {
                          // Add to same level as the reply
                          c.replies.push(optimisticComment);
                          return true;
                        }
                      }
                    }
                  }
                  return false;
                };
                addReplyToParent(draft.comments);
              } else {
                draft.comments.unshift(optimisticComment);
                draft.total += 1;
                draft.totalAll += 1;
              }
            }
          )
        );

        // Update post's comment count in feed
        const feedPatches: any[] = [];

        // Get all cached getFeed queries from the state
        const apiQueries = (state as any).api?.queries || {};
        const cachedQueryArgs: Array<{
          page: number;
          limit: number;
          feed_type: string;
          pageId?: number | null;
        }> = [];

        // Find all getFeed queries in the cache
        for (const [key, value] of Object.entries(apiQueries)) {
          if (key.startsWith("getFeed(") && (value as any)?.data) {
            try {
              const argsMatch = key.match(/getFeed\((.*)\)/);
              if (argsMatch && argsMatch[1]) {
                const args = JSON.parse(argsMatch[1]);
                cachedQueryArgs.push(args);
              }
            } catch {
              // Skip if parsing fails
            }
          }
        }

        // If no cached queries found, fall back to common patterns
        if (cachedQueryArgs.length === 0) {
          const feedTypes = [
            "recommended",
            "following",
            "trending",
            "recent",
          ] as const;
          const pageIds = [null, undefined];
          for (const feed_type of feedTypes) {
            for (const pageId of pageIds) {
              cachedQueryArgs.push({ page: 1, limit: 10, feed_type, pageId });
            }
          }
        }

        // Update all cached feed queries
        for (const args of cachedQueryArgs) {
          try {
            const patch = dispatch(
              feedApi.util.updateQueryData("getFeed", args as any, (draft) => {
                const post = draft.posts.find((p) => p.id === postId);
                if (post) {
                  post.commentsCount += 1;
                }
              })
            );
            feedPatches.push(patch);
          } catch {
            // Skip if query doesn't exist
          }
        }

        try {
          const { data: newComment } = await queryFulfilled;
          // Replace optimistic comment with real one
          dispatch(
            feedApi.util.updateQueryData(
              "getPostComments",
              { postId, page: 1, limit: 10 },
              (draft) => {
                const replaceInComments = (comments: Comment[]): boolean => {
                  for (let i = 0; i < comments.length; i++) {
                    const comment = comments[i];
                    if (!comment) continue;
                    if (comment.id === tempId) {
                      comments[i] = {
                        ...newComment,
                        isPending: false,
                        replies: comment.replies,
                      };
                      return true;
                    }
                    if (comment.replies && replaceInComments(comment.replies)) {
                      return true;
                    }
                  }
                  return false;
                };
                replaceInComments(draft.comments);
              }
            )
          );
        } catch {
          patchResult.undo();
          feedPatches.forEach((p) => p.undo());
        }
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),

    // Upload file
    uploadFile: builder.mutation<FileUploadResponse, FormData>({
      query: (formData) => ({
        url: "/v1/feed/upload",
        method: "POST",
        body: formData,
        prepareHeaders: (headers: { delete: (arg0: string) => void }) => {
          headers.delete("Content-Type");
          return headers;
        },
      }),
    }),

    // Add post attachment
    addPostAttachment: builder.mutation<
      PostAttachment,
      { postId: number; attachment: Omit<PostAttachment, "id"> }
    >({
      query: ({ postId, attachment }) => ({
        url: `/v1/feed/posts/${postId}/attachments`,
        method: "POST",
        body: attachment,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        "Feed",
      ],
    }),

    // Remove post attachment
    removePostAttachment: builder.mutation<
      { message: string },
      { postId: number; attachmentId: number }
    >({
      query: ({ postId, attachmentId }) => ({
        url: `/v1/feed/posts/${postId}/attachments/${attachmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Post", id: postId },
        "Feed",
      ],
    }),

    // Save/Unsave post with optimistic update
    savePost: builder.mutation<{ message: string }, number>({
      query: (postId) => ({
        url: `/v1/feed/posts/${postId}/save`,
        method: "POST",
      }),
      async onQueryStarted(postId, { dispatch, queryFulfilled }) {
        const patchResults: any[] = [];
        const feedTypes = [
          "recommended",
          "following",
          "trending",
          "recent",
        ] as const;

        for (const feed_type of feedTypes) {
          for (let page = 1; page <= 10; page++) {
            try {
              const patchResult = dispatch(
                feedApi.util.updateQueryData(
                  "getFeed",
                  { page, limit: 10, feed_type },
                  (draft) => {
                    const post = draft.posts.find((p) => p.id === postId);
                    if (post) {
                      post.isSaved = !post.isSaved;
                    }
                  }
                )
              );
              patchResults.push(patchResult);
            } catch {
              // Skip
            }
          }
        }

        try {
          await queryFulfilled;
        } catch {
          patchResults.forEach((patch) => patch.undo());
        }
      },
    }),

    // Report post
    reportPost: builder.mutation<
      { message: string },
      { postId: number; reason: string }
    >({
      query: ({ postId, reason }) => ({
        url: `/v1/feed/posts/${postId}/report`,
        method: "POST",
        body: { reason },
      }),
    }),

    // Like/Unlike comment with optimistic update
    likeComment: builder.mutation<
      { message: string },
      { postId: number; commentId: number; pageID?: number | null }
    >({
      query: ({ commentId, pageID }) => ({
        url: `/v1/feed/comments/${commentId}/like`,
        method: "POST",
        // Include pageID in body if provided (to like as a business page)
        body: pageID ? { pageID } : undefined,
      }),
      async onQueryStarted(
        { postId, commentId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          feedApi.util.updateQueryData(
            "getPostComments",
            { postId, page: 1, limit: 10 },
            (draft) => {
              const updateLike = (comments: Comment[]): boolean => {
                for (const c of comments) {
                  if (c.id === commentId) {
                    c.isLiked = !c.isLiked;
                    c.commentLikeCount += c.isLiked ? 1 : -1;
                    return true;
                  }
                  if (c.replies && updateLike(c.replies)) {
                    return true;
                  }
                }
                return false;
              };
              updateLike(draft.comments);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetFeedQuery,
  useCreatePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useUploadFileMutation,
  useAddPostAttachmentMutation,
  useRemovePostAttachmentMutation,
  useSavePostMutation,
  useReportPostMutation,
  useLikeCommentMutation,
} = feedApi;
