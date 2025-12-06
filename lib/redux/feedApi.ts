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

export interface Post {
  id: number;
  authorID: number;
  author: PostAuthor;
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
}

export interface Comment {
  id: number;
  postID: number;
  commentAuthorID: number;
  author: PostAuthor;
  commentContent: string;
  commentLikeCount: number;
  parentCommentID?: number;
  createdAt: string;
  updatedAt?: string;
  isLiked: boolean;
  replies: Comment[];
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
  total: number; // Total top-level comments
  totalAll: number; // Total all comments including replies
  page: number;
  limit: number;
  hasNext: boolean;
}

export interface CreatePostRequest {
  postContent: string;
  postVisibility?: "public" | "private" | "connections";
  postHashTags?: string[];
  attachments?: Omit<PostAttachment, "id">[];
}

export interface CreateCommentRequest {
  commentContent: string;
  parentCommentID?: number;
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
      }
    >({
      query: ({ page = 1, limit = 10, feed_type = "recommended" }) => ({
        url: "/v1/feed/",
        params: { page, limit, feed_type },
      }),
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

    // Like/Unlike post
    likePost: builder.mutation<{ message: string }, number>({
      query: (postId) => ({
        url: `/v1/feed/posts/${postId}/like`,
        method: "POST",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "Post", id: postId },
        "Feed",
      ],
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

    // Create comment
    createComment: builder.mutation<
      Comment,
      { postId: number; comment: CreateCommentRequest }
    >({
      query: ({ postId, comment }) => ({
        url: `/v1/feed/posts/${postId}/comments`,
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
        { type: "Post", id: postId },
        "Feed",
      ],
    }),

    // Upload file
    uploadFile: builder.mutation<FileUploadResponse, FormData>({
      query: (formData) => ({
        url: "/v1/feed/upload",
        method: "POST",
        body: formData,
        // Don't set Content-Type header for FormData, let browser set it with boundary
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

    // Save/Unsave post
    savePost: builder.mutation<{ message: string }, number>({
      query: (postId) => ({
        url: `/v1/feed/posts/${postId}/save`,
        method: "POST",
      }),
      invalidatesTags: (result, error, postId) => [
        { type: "Post", id: postId },
        "Feed",
      ],
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

    // Like/Unlike comment
    likeComment: builder.mutation<
      { message: string },
      { postId: number; commentId: number }
    >({
      query: ({ commentId }) => ({
        url: `/v1/feed/comments/${commentId}/like`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
  }),
  overrideExisting: false,
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
