"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Eye,
  Bookmark,
  BookmarkCheck,
  Send,
  Edit3,
  Trash2,
  Flag,
  Copy,
  ExternalLink,
  CornerDownRight,
  Building2,
  Repeat2,
  Mail,
  MessageSquare,
  Image,
  X,
  Plus,
  Link2,
  Check,
  Upload,
  Loader2,
  Globe,
  Users,
  Lock,
  Smartphone,
  FileText,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  useLikePostMutation,
  useGetPostCommentsQuery,
  useCreateCommentMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useSavePostMutation,
  useReportPostMutation,
  useRepostPostMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUploadFileMutation,
  useAddPostAttachmentMutation,
  feedApi,
  useAppDispatch,
} from "@/lib/redux";
import { Post as PostType, Comment, OriginalPost } from "@/lib/redux/feedApi";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { usePageContext } from "@/contexts/page-context";
import { cn, formatCount } from "@/lib/utils";
import { MediaSlider } from "./media-slider";

interface PostProps {
  post: PostType;
  onEdit?: (post: PostType) => void;
  onDelete?: (postId: number) => void;
}

interface CommentItemProps {
  comment: Comment;
  postId: number;
  postAuthorId: number; // To check if user can delete comment (post author can delete any comment)
  depth?: number;
}

// Comment skeleton loader
function CommentSkeleton() {
  return (
    <div className="flex space-x-3 animate-pulse">
      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-1" />
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  postId,
  postAuthorId,
  depth = 0,
}: CommentItemProps) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(depth < 1); // Only 1 level nesting
  const { user } = useAuth();
  const { activePage, isOperatingAsPage, activePageId } = usePageContext();
  const [createComment, { isLoading: isCreatingReply }] =
    useCreateCommentMutation();
  const [likeComment, { isLoading: isLikingComment }] =
    useLikeCommentMutation();
  const [deleteComment, { isLoading: isDeletingComment }] =
    useDeleteCommentMutation();

  const replies = comment.replies || [];

  // Check if current user can delete this comment
  // User can delete if: they are the comment author OR they are the post author
  const canDeleteComment =
    user?.id === comment.commentAuthorID || user?.id === postAuthorId;

  // Get display info based on context for reply
  const replyDisplayAvatar = isOperatingAsPage
    ? activePage?.avatarURL
    : undefined;
  const replyDisplayName = isOperatingAsPage
    ? activePage?.businessTitle
    : undefined;

  const handleReply = async () => {
    if (!replyText.trim()) return;

    try {
      // For 1-level nesting: if replying to a reply, use the parent's ID
      // This ensures all replies stay at the same level
      const parentId = comment.parentCommentID
        ? comment.parentCommentID
        : comment.id;

      await createComment({
        postId,
        comment: {
          commentContent: replyText,
          parentCommentID: parentId,
          // Include page context if operating as page
          authorPageID:
            isOperatingAsPage && activePageId ? activePageId : undefined,
          // For optimistic updates
          _pageInfo:
            isOperatingAsPage && activePage
              ? {
                  id: activePage.id,
                  businessTitle: activePage.businessTitle,
                  email: activePage.email || "",
                  avatarURL: activePage.avatarURL,
                  verificationStatus: activePage.verificationStatus,
                }
              : undefined,
        },
      }).unwrap();
      setReplyText("");
      setShowReply(false);
      toast.success("Reply posted successfully!");
    } catch (error) {
      toast.error("Failed to post reply");
    }
  };

  const handleLikeComment = async () => {
    try {
      await likeComment({
        postId,
        commentId: comment.id,
        // Include pageID if operating as a business page
        pageID: isOperatingAsPage && activePageId ? activePageId : undefined,
      }).unwrap();
    } catch (error) {
      toast.error("Failed to like comment");
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment({
        postId,
        commentId: comment.id,
      }).unwrap();
      toast.success("Comment deleted successfully!");
    } catch (error: any) {
      const message = error?.data?.detail || "Failed to delete comment";
      toast.error(message);
    }
  };

  // Get comment author display info (supports page authors)
  const commentAuthorAvatar =
    comment.authorPageID && comment.authorPage
      ? comment.authorPage.avatarURL
      : comment.author.avatarURL;
  const commentAuthorName =
    comment.authorPageID && comment.authorPage
      ? comment.authorPage.businessTitle
      : `${comment.author.firstName} ${comment.author.lastName}`;
  const isPageComment = !!comment.authorPageID;

  return (
    <div
      className={cn(
        "space-y-3",
        depth > 0 && "ml-6 border-l-2 border-gray-200 dark:border-gray-700 pl-4"
      )}
    >
      <div className="flex space-x-3">
        {depth > 0 && (
          <CornerDownRight className="h-4 w-4 text-gray-400 mt-2 flex-shrink-0" />
        )}
        <Avatar
          className={cn(
            "h-8 w-8 flex-shrink-0",
            isPageComment && "border-2 border-blue-500"
          )}
        >
          <AvatarImage src={commentAuthorAvatar} />
          <AvatarFallback>
            {isPageComment ? (
              <Building2 className="h-4 w-4" />
            ) : (
              <>
                {comment.author.firstName[0]}
                {comment.author.lastName[0]}
              </>
            )}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 min-w-0">
          <div
            className={cn(
              "bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-2",
              comment.isPending && "opacity-60"
            )}
          >
            <div className="flex items-center space-x-2 flex-wrap">
              <Link
                href={
                  isPageComment
                    ? `/business/${comment.authorPageID}`
                    : `/profile/${comment.commentAuthorID}`
                }
                className="font-semibold text-sm hover:underline hover:text-primary"
              >
                {commentAuthorName}
              </Link>
              {isPageComment && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-blue-100 text-blue-700"
                >
                  <Building2 className="h-3 w-3 mr-1" />
                  Page
                </Badge>
              )}
              {!isPageComment && comment.author.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>
              )}
              {comment.isPending && (
                <Badge variant="outline" className="text-xs">
                  Posting...
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-sm mt-1 break-words">{comment.commentContent}</p>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <button
              className={cn(
                "hover:text-gray-700 dark:hover:text-gray-300 flex items-center space-x-1",
                comment.isLiked && "text-red-500"
              )}
              onClick={handleLikeComment}
              disabled={isLikingComment || comment.isPending}
            >
              <Heart
                className={cn("h-3 w-3", comment.isLiked && "fill-current")}
              />
              <span>{comment.commentLikeCount}</span>
            </button>
            {!comment.isPending && (
              <button
                className="hover:text-gray-700 dark:hover:text-gray-300"
                onClick={() => setShowReply(!showReply)}
              >
                Reply
              </button>
            )}
            {canDeleteComment && !comment.isPending && (
              <button
                className="hover:text-red-500 text-gray-400"
                onClick={handleDeleteComment}
                disabled={isDeletingComment}
              >
                {isDeletingComment ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500" />
                ) : (
                  <Trash2 className="h-3 w-3" />
                )}
              </button>
            )}
            {replies.length > 0 && depth === 0 && (
              <button
                className="hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? "Hide" : "View"} {replies.length}{" "}
                {replies.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>
          {showReply && (
            <div className="mt-2 space-y-2">
              {isOperatingAsPage && (
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  Replying as{" "}
                  <span className="font-medium">
                    {activePage?.businessTitle}
                  </span>
                </div>
              )}
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-[80px] resize-none"
                />
                <div className="flex flex-col space-y-2">
                  <Button
                    size="sm"
                    onClick={handleReply}
                    disabled={!replyText.trim() || isCreatingReply}
                  >
                    {isCreatingReply ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-1" />
                        Reply
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowReply(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies - only 1 level deep */}
      {showReplies && replies.length > 0 && depth === 0 && (
        <div className="space-y-3">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              postAuthorId={postAuthorId}
              depth={1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Post({ post, onEdit, onDelete }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentsPage, setCommentsPage] = useState(1);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showRepostDialog, setShowRepostDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [editContent, setEditContent] = useState(post.postContent);
  const [editVisibility, setEditVisibility] = useState(post.postVisibility);
  const [editAttachments, setEditAttachments] = useState(
    post.attachments || []
  );
  const [repostCaption, setRepostCaption] = useState("");
  const [repostVisibility, setRepostVisibility] = useState<
    "public" | "connections" | "private"
  >("public");
  const [reportReason, setReportReason] = useState("");
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const [canUseNativeShare, setCanUseNativeShare] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const COMMENTS_PER_PAGE = 10;
  const MEDIA_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888";
  const { user } = useAuth();
  const { activePageId, activePage, isOperatingAsPage } = usePageContext();
  const dispatch = useAppDispatch();

  // Check for native share support on client side only
  useEffect(() => {
    setCanUseNativeShare(
      typeof navigator !== "undefined" && "share" in navigator
    );
  }, []);

  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [createComment, { isLoading: isCommenting }] =
    useCreateCommentMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [savePost, { isLoading: isSaving }] = useSavePostMutation();
  const [reportPost, { isLoading: isReporting }] = useReportPostMutation();
  const [repostPost, { isLoading: isReposting }] = useRepostPostMutation();
  const [uploadFile] = useUploadFileMutation();
  const [addPostAttachment] = useAddPostAttachmentMutation();

  const {
    data: commentsData,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
  } = useGetPostCommentsQuery(
    { postId: post.id, page: commentsPage, limit: COMMENTS_PER_PAGE },
    { skip: !showComments }
  );

  // Helper to get full URL for attachments
  const getFullUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${MEDIA_BASE_URL}${url}`;
  };

  // Extract comments and pagination info from response
  const comments = commentsData?.comments || [];
  const hasMoreComments = commentsData?.hasNext || false;
  const totalComments = commentsData?.total || 0;
  const totalAllComments = commentsData?.totalAll || 0;

  const handleLoadMoreComments = () => {
    setCommentsPage((prev) => prev + 1);
  };

  // Check if user owns this post (either as user or page)
  const isOwnPost = isOperatingAsPage
    ? post.authorPageID === activePageId
    : user?.id === post.authorID && !post.authorPageID;

  // For repost check - need to check ownership of original post too
  const isOwnOriginalPost =
    post.isRepost && post.originalPost
      ? isOperatingAsPage
        ? post.originalPost.authorPageID === activePageId
        : user?.id === post.originalPost.authorID &&
          !post.originalPost.authorPageID
      : isOwnPost;

  const handleLike = async () => {
    try {
      await likePost({
        postId: post.id,
        // Include pageID if operating as a business page
        pageID: isOperatingAsPage && activePageId ? activePageId : undefined,
      }).unwrap();
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      await createComment({
        postId: post.id,
        comment: {
          commentContent: commentText,
          authorPageID: activePageId || undefined,
          // For optimistic updates
          _pageInfo: activePage
            ? {
                id: activePage.id,
                businessTitle: activePage.businessTitle,
                email: activePage.email || "",
                avatarURL: activePage.avatarURL,
                verificationStatus: activePage.verificationStatus,
              }
            : undefined,
        },
      }).unwrap();
      setCommentText("");
      toast.success("Comment posted successfully!");
    } catch (error) {
      toast.error("Failed to post comment");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.id).unwrap();
      onDelete?.(post.id);
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const getPostUrl = () => {
    // Use the actual post ID for the URL
    // If this is a repost, link to the original post
    const targetPostId =
      post.isRepost && post.originalPostID ? post.originalPostID : post.id;
    return `${window.location.origin}/post/${targetPostId}`;
  };

  const handleShare = async () => {
    const postUrl = getPostUrl();
    const authorName =
      post.isRepost && post.originalPost
        ? `${post.originalPost.author.firstName} ${post.originalPost.author.lastName}`
        : `${post.author.firstName} ${post.author.lastName}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${authorName}`,
          text:
            post.isRepost && post.originalPost
              ? post.originalPost.postContent
              : post.postContent,
          url: postUrl,
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(postUrl);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      // User cancelled share or share failed - try clipboard
      if ((error as Error).name !== "AbortError") {
        await navigator.clipboard.writeText(postUrl);
        toast.success("Link copied to clipboard!");
      }
    }
  };

  const handleRepost = async () => {
    // For own posts or own original posts, don't allow repost
    if (isOwnOriginalPost) {
      toast.error("You cannot repost your own post");
      return;
    }
    setShowRepostDialog(true);
  };

  const handleConfirmRepost = async () => {
    // Get the actual post ID to repost (if this is a repost, repost the original)
    const targetPostId =
      post.isRepost && post.originalPostID ? post.originalPostID : post.id;

    // Get the original post data for the repost
    const originalPostData =
      post.isRepost && post.originalPost
        ? post.originalPost
        : {
            id: post.id,
            authorID: post.authorID,
            author: post.author,
            authorPageID: post.authorPageID,
            authorPage: post.authorPage,
            postContent: post.postContent,
            likesCount: post.likesCount,
            commentsCount: post.commentsCount,
            sharesCount: post.sharesCount || 0,
            viewsCount: post.viewsCount || 0,
            repostsCount: post.repostsCount || 0,
            postVisibility: post.postVisibility,
            postHashTags: post.postHashTags || [],
            attachments: post.attachments || [],
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
          };

    // Create optimistic repost
    const tempId = Date.now();
    const optimisticRepost: PostType = {
      id: tempId,
      authorID: user?.id || 0,
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
        headline: user?.headline || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      authorPageID:
        isOperatingAsPage && activePageId ? activePageId : undefined,
      authorPage:
        isOperatingAsPage && activePage
          ? {
              id: activePage.id,
              businessTitle: activePage.businessTitle,
              avatarURL: activePage.avatarURL,
              verificationStatus: activePage.verificationStatus,
            }
          : undefined,
      postContent: repostCaption.trim(),
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      viewsCount: 0,
      repostsCount: 0,
      postVisibility: repostVisibility,
      postHashTags: [],
      attachments: [],
      createdAt: new Date().toISOString(),
      isLiked: false,
      isSaved: false,
      isRepost: true,
      originalPostID: targetPostId,
      originalPost: originalPostData,
      isPending: true,
    };

    // Close dialog immediately for better UX
    setShowRepostDialog(false);
    setRepostCaption("");
    setRepostVisibility("public");

    // Add optimistic repost to feed cache
    const feedTypes = [
      "recommended",
      "following",
      "trending",
      "recent",
    ] as const;
    const patches: any[] = [];
    const pageIdVariations = [null, undefined, activePageId].filter(
      (v, i, arr) => arr.indexOf(v) === i
    );

    for (const feed_type of feedTypes) {
      for (const pageId of pageIdVariations) {
        try {
          const patch = dispatch(
            feedApi.util.updateQueryData(
              "getFeed",
              { page: 1, limit: 10, feed_type, pageId },
              (draft) => {
                if (!draft.posts.find((p) => p.id === optimisticRepost.id)) {
                  draft.posts.unshift(optimisticRepost);
                  draft.total += 1;
                }
              }
            )
          );
          patches.push(patch);
        } catch {
          // Query doesn't exist, skip
        }
      }
    }

    try {
      const createdRepost = await repostPost({
        postId: targetPostId,
        caption: repostCaption.trim() || undefined,
        visibility: repostVisibility,
        pageID: isOperatingAsPage && activePageId ? activePageId : undefined,
      }).unwrap();

      // Update the optimistic post with real data
      for (const feed_type of feedTypes) {
        for (const pageId of pageIdVariations) {
          try {
            dispatch(
              feedApi.util.updateQueryData(
                "getFeed",
                { page: 1, limit: 10, feed_type, pageId },
                (draft) => {
                  const index = draft.posts.findIndex((p) => p.id === tempId);
                  if (index !== -1) {
                    draft.posts[index] = { ...createdRepost, isPending: false };
                  }
                }
              )
            );
          } catch {
            // Skip
          }
        }
      }

      toast.success("Post reposted successfully!");
    } catch (error: any) {
      // Revert optimistic updates on error
      patches.forEach((patch) => patch.undo());
      const message = error?.data?.detail || "Failed to repost";
      toast.error(message);
    }
  };

  const handleSave = async () => {
    try {
      await savePost(post.id).unwrap();
      toast.success(post.isSaved ? "Post unsaved!" : "Post saved!");
    } catch (error) {
      toast.error("Failed to save post");
    }
  };

  const handleEditPost = async () => {
    if (!editContent.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    try {
      await updatePost({
        postId: post.id,
        post: {
          postContent: editContent.trim(),
          postVisibility: editVisibility,
          attachments: editAttachments.length > 0 ? editAttachments : [],
        },
      }).unwrap();

      setShowEditDialog(false);
      toast.success("Post updated successfully!");
    } catch (error: any) {
      const message = error?.data?.detail || "Failed to update post";
      toast.error(message);
    }
  };

  // Handle adding new attachment in edit dialog
  const handleAddAttachment = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file) return;

    if (editAttachments.length >= 10) {
      toast.error("Maximum 10 attachments allowed per post");
      return;
    }

    const maxSize = 50 * 1024 * 1024; // 50MB

    if (file.size > maxSize) {
      toast.error("File size must be less than 50MB");
      return;
    }

    // Determine file type
    let fileType: "image" | "video" | "document" = "document";
    if (file.type.startsWith("image/")) {
      fileType = "image";
    } else if (file.type.startsWith("video/")) {
      fileType = "video";
    }

    setIsUploadingAttachment(true);

    try {
      // Upload file first
      const formData = new FormData();
      formData.append("file", file);
      const uploadResult = await uploadFile(formData).unwrap();

      // Add attachment to the post
      const newAttachment = await addPostAttachment({
        postId: post.id,
        attachment: {
          postAttachmentType: fileType,
          postAttachmentUrl: uploadResult.url,
          postAttachmentTitle: file.name,
        },
      }).unwrap();

      // Update local state
      setEditAttachments((prev) => [...prev, newAttachment]);
      toast.success("Attachment added successfully!");
    } catch (error: any) {
      const message = error?.data?.detail || "Failed to upload attachment";
      toast.error(message);
    } finally {
      setIsUploadingAttachment(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleReport = async () => {
    if (!reportReason.trim() || reportReason.trim().length < 10) {
      toast.error(
        "Please provide a reason for reporting (at least 10 characters)"
      );
      return;
    }

    try {
      await reportPost({
        postId: post.id,
        reportingReason: reportReason,
        pageID: isOperatingAsPage && activePageId ? activePageId : undefined,
      }).unwrap();
      setShowReportDialog(false);
      setReportReason("");
      toast.success("Post reported successfully. We'll review it shortly.");
    } catch (error: any) {
      const message = error?.data?.detail || "Failed to report post";
      toast.error(message);
    }
  };

  const handleCopyLink = async () => {
    const postUrl = getPostUrl();
    await navigator.clipboard.writeText(postUrl);
    toast.success("Link copied to clipboard!");
  };

  // Social media share handlers
  const getShareText = () => {
    const authorName =
      post.isRepost && post.originalPost
        ? `${post.originalPost.author.firstName} ${post.originalPost.author.lastName}`
        : `${post.author.firstName} ${post.author.lastName}`;
    const content =
      post.isRepost && post.originalPost
        ? post.originalPost.postContent
        : post.postContent;
    return `Check out this post by ${authorName}: "${content?.slice(0, 100)}${
      content && content.length > 100 ? "..." : ""
    }"`;
  };

  const handleShareFacebook = () => {
    const postUrl = getPostUrl();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        postUrl
      )}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const handleShareTwitter = () => {
    const postUrl = getPostUrl();
    const text = getShareText();
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        postUrl
      )}&text=${encodeURIComponent(text)}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const handleShareLinkedIn = () => {
    const postUrl = getPostUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        postUrl
      )}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const handleShareWhatsApp = () => {
    const postUrl = getPostUrl();
    const text = getShareText();
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text + " " + postUrl)}`,
      "_blank"
    );
  };

  const handleShareTelegram = () => {
    const postUrl = getPostUrl();
    const text = getShareText();
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        postUrl
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleShareEmail = () => {
    const postUrl = getPostUrl();
    const authorName =
      post.isRepost && post.originalPost
        ? `${post.originalPost.author.firstName} ${post.originalPost.author.lastName}`
        : `${post.author.firstName} ${post.author.lastName}`;
    const subject = `Check out this post by ${authorName}`;
    const body = `${getShareText()}\n\n${postUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Card className={cn("w-full", post.isPending && "opacity-90")}>
      {/* Repost Indicator */}
      {post.isRepost && (
        <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 border-b bg-gray-50 dark:bg-gray-800/50">
          <Repeat2 className="h-4 w-4 text-green-600" />
          <Link
            href={
              post.authorPageID
                ? `/business/${post.authorPageID}`
                : `/profile/${post.authorID}`
            }
            className="font-medium hover:underline"
          >
            {post.authorPageID && post.authorPage
              ? post.authorPage.businessTitle
              : `${post.author.firstName} ${post.author.lastName}`}
          </Link>
          <span>reposted</span>
          <span className="text-xs">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </span>
        </div>
      )}

      {/* Repost Caption (if any) */}
      {post.isRepost && post.postContent && (
        <div className="px-4 py-3 border-b">
          <p className="text-sm">{post.postContent}</p>
        </div>
      )}

      {/* Pending Post Indicator */}
      {post.isPending && (
        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2 border-b">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>
            {post.pendingAttachments && post.pendingAttachments > 0
              ? `Uploading ${post.pendingAttachments} file${
                  post.pendingAttachments > 1 ? "s" : ""
                }...`
              : "Publishing..."}
          </span>
        </div>
      )}
      <CardHeader
        className={cn(
          "pb-4",
          post.isRepost &&
            post.originalPost &&
            "border rounded-lg mx-4 mt-4 bg-gray-50 dark:bg-gray-800/30"
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {/* Avatar - show original author if repost, else page/user */}
            <Link
              href={
                post.isRepost && post.originalPost
                  ? post.originalPost.authorPageID
                    ? `/business/${post.originalPost.authorPageID}`
                    : `/profile/${post.originalPost.authorID}`
                  : post.authorPageID && post.authorPage
                  ? `/business/${post.authorPageID}`
                  : `/profile/${post.authorID}`
              }
            >
              <Avatar
                className={cn(
                  "h-12 w-12",
                  (post.isRepost && post.originalPost?.authorPageID) ||
                    post.authorPageID
                    ? "border-2 border-blue-500"
                    : ""
                )}
              >
                <AvatarImage
                  src={
                    post.isRepost && post.originalPost
                      ? post.originalPost.authorPageID &&
                        post.originalPost.authorPage
                        ? post.originalPost.authorPage.avatarURL
                        : post.originalPost.author.avatarURL
                      : post.authorPageID && post.authorPage
                      ? post.authorPage.avatarURL
                      : post.author.avatarURL
                  }
                />
                <AvatarFallback>
                  {post.isRepost && post.originalPost ? (
                    post.originalPost.authorPageID ? (
                      <Building2 className="h-6 w-6" />
                    ) : (
                      <>
                        {post.originalPost.author.firstName[0]}
                        {post.originalPost.author.lastName[0]}
                      </>
                    )
                  ) : post.authorPageID && post.authorPage ? (
                    <Building2 className="h-6 w-6" />
                  ) : (
                    <>
                      {post.author.firstName[0]}
                      {post.author.lastName[0]}
                    </>
                  )}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Link
                  href={
                    post.isRepost && post.originalPost
                      ? post.originalPost.authorPageID
                        ? `/business/${post.originalPost.authorPageID}`
                        : `/profile/${post.originalPost.authorID}`
                      : post.authorPageID && post.authorPage
                      ? `/business/${post.authorPageID}`
                      : `/profile/${post.authorID}`
                  }
                  className="hover:underline"
                >
                  <h4 className="font-semibold">
                    {post.isRepost && post.originalPost
                      ? post.originalPost.authorPageID &&
                        post.originalPost.authorPage
                        ? post.originalPost.authorPage.businessTitle
                        : `${post.originalPost.author.firstName} ${post.originalPost.author.lastName}`
                      : post.authorPageID && post.authorPage
                      ? post.authorPage.businessTitle
                      : `${post.author.firstName} ${post.author.lastName}`}
                  </h4>
                </Link>
                {((post.isRepost && post.originalPost?.authorPageID) ||
                  (!post.isRepost && post.authorPageID && post.authorPage)) && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-700"
                  >
                    <Building2 className="h-3 w-3 mr-1" />
                    Page
                  </Badge>
                )}
                {/* Show verified badge for original author if repost, or post author if not */}
                {post.isRepost &&
                  post.originalPost &&
                  !post.originalPost.authorPageID &&
                  post.originalPost.author.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                {!post.isRepost &&
                  !post.authorPageID &&
                  post.author.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
              </div>
              {/* Show headline or posted by info */}
              {post.isRepost && post.originalPost ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.originalPost.author.headline || ""}
                </p>
              ) : post.authorPageID && post.authorPage ? (
                // For page posts, show the user as "posted by"
                <Link
                  href={`/profile/${post.authorID}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:underline flex items-center gap-1"
                >
                  Posted by {post.author.firstName} {post.author.lastName}
                </Link>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {post.author.headline}
                </p>
              )}
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(
                  new Date(
                    post.isRepost && post.originalPost
                      ? post.originalPost.createdAt
                      : post.createdAt
                  ),
                  { addSuffix: true }
                )}
              </p>
            </div>
          </div>

          {/* Only show dropdown menu if not viewing embedded repost content */}
          {!post.isRepost && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwnPost ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        setEditContent(post.postContent);
                        setEditVisibility(post.postVisibility);
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit post
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-red-600 dark:text-red-400"
                    >
                      {isDeleting ? (
                        <div className="animate-spin rounded-full h-4 w-4 mr-2 border-b-2 border-red-500" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-2" />
                      )}
                      {isDeleting ? "Deleting..." : "Delete post"}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleSave} disabled={isSaving}>
                      {post.isSaved ? (
                        <BookmarkCheck className="h-4 w-4 mr-2" />
                      ) : (
                        <Bookmark className="h-4 w-4 mr-2" />
                      )}
                      {post.isSaved ? "Unsave post" : "Save post"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleCopyLink}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setShowReportDialog(true)}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Report post
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Post Content */}
          <div className="space-y-3">
            {/* For reposts, show original post content; for regular posts, show post content */}
            {!post.isRepost && (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {post.postContent}
              </p>
            )}
            {post.isRepost && post.originalPost && (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {post.originalPost.postContent}
              </p>
            )}

            {/* Hashtags - show original post hashtags if repost */}
            {(post.isRepost && post.originalPost
              ? post.originalPost.postHashTags
              : post.postHashTags
            )?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {(post.isRepost && post.originalPost
                  ? post.originalPost.postHashTags
                  : post.postHashTags
                )?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-primary/20"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Attachments - show original post attachments if repost */}
            {((post.isRepost && post.originalPost
              ? post.originalPost.attachments
              : post.attachments
            )?.length > 0 ||
              (post.pendingAttachments ?? 0) > 0) && (
              <MediaSlider
                items={(
                  (post.isRepost && post.originalPost
                    ? post.originalPost.attachments
                    : post.attachments) || []
                ).map((attachment) => ({
                  id: attachment.id,
                  type: attachment.postAttachmentType,
                  url: attachment.postAttachmentUrl,
                  title: attachment.postAttachmentTitle,
                  description: attachment.postAttachmentDescription,
                }))}
                pendingCount={post.pendingAttachments || 0}
                className="mt-3"
              />
            )}
          </div>

          {/* Engagement Stats - show repost's own engagement */}
          <div className="flex items-center justify-between text-sm text-gray-500 py-2 border-y border-gray-200 dark:border-gray-800">
            <span>{formatCount(post.likesCount, "like")}</span>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowComments(true)}
                className="hover:text-gray-700 dark:hover:text-gray-300 hover:underline"
              >
                {formatCount(post.commentsCount, "comment")}
              </button>
              <span>{formatCount(post.repostsCount || 0, "repost")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
              className={cn(
                "flex-1",
                post.isLiked && "text-red-600 dark:text-red-400"
              )}
            >
              <Heart
                className={cn("h-4 w-4 mr-2", post.isLiked && "fill-current")}
              />
              Like
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="flex-1"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Comment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRepost}
              className="flex-1"
            >
              <Repeat2 className="h-4 w-4 mr-2" />
              Repost
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShareDialog(true)}
              className="flex-1"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="space-y-4 mt-4">
              {/* Add Comment */}
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      isOperatingAsPage
                        ? activePage?.avatarURL
                        : user?.avatarURL
                    }
                  />
                  <AvatarFallback>
                    {isOperatingAsPage
                      ? activePage?.businessTitle?.substring(0, 2).toUpperCase()
                      : `${user?.firstName?.[0]}${user?.lastName?.[0]}`}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  {isOperatingAsPage && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      Commenting as{" "}
                      <span className="font-medium">
                        {activePage?.businessTitle}
                      </span>
                    </div>
                  )}
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      onClick={handleComment}
                      disabled={!commentText.trim() || isCommenting}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              {commentsLoading && commentsPage === 1 ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <CommentSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Render top-level comments - the API returns nested replies */}
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      postId={post.id}
                      postAuthorId={post.authorID}
                    />
                  ))}

                  {/* Load More Comments Button */}
                  {hasMoreComments && (
                    <div className="text-center pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLoadMoreComments}
                        disabled={commentsFetching}
                        className="text-primary hover:text-primary/80"
                      >
                        {commentsFetching ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                            Loading...
                          </>
                        ) : (
                          `Load more comments (${comments.length} of ${
                            commentsData?.totalAll || commentsData?.total || 0
                          })`
                        )}
                      </Button>
                    </div>
                  )}

                  {comments.length === 0 && (
                    <p className="text-center text-sm text-gray-500 py-4">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      {/* Report Post Dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Post</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for reporting this post (10-500
              characters). Our team will review it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Describe why you're reporting this post..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value.slice(0, 500))}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {reportReason.length}/500 characters
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setReportReason("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReport}
              disabled={isReporting || reportReason.trim().length < 10}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isReporting ? "Reporting..." : "Report"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Repost Dialog */}
      <AlertDialog open={showRepostDialog} onOpenChange={setShowRepostDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Repost</AlertDialogTitle>
            <AlertDialogDescription>
              Share this post with your network. You can add an optional
              caption.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {isOperatingAsPage && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
              <Building2 className="h-4 w-4" />
              Reposting as{" "}
              <span className="font-medium">{activePage?.businessTitle}</span>
            </div>
          )}
          <div className="py-4 space-y-4">
            <Textarea
              placeholder="Add a caption (optional)..."
              value={repostCaption}
              onChange={(e) => setRepostCaption(e.target.value.slice(0, 1000))}
              className="min-h-[80px] resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {repostCaption.length}/1000 characters
            </p>

            {/* Visibility selector - styled like create post dialog */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Who can see this:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRepostVisibility("public")}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
                    repostVisibility === "public"
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  )}
                >
                  <Globe
                    className={cn(
                      "h-5 w-5",
                      repostVisibility === "public"
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="text-xs font-medium">Public</span>
                  <span className="text-[10px] text-muted-foreground text-center">
                    Anyone can see
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRepostVisibility("connections")}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
                    repostVisibility === "connections"
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  )}
                >
                  <Users
                    className={cn(
                      "h-5 w-5",
                      repostVisibility === "connections"
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="text-xs font-medium">Connections</span>
                  <span className="text-[10px] text-muted-foreground text-center">
                    Only connections
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRepostVisibility("private")}
                  className={cn(
                    "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all",
                    repostVisibility === "private"
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  )}
                >
                  <Lock
                    className={cn(
                      "h-5 w-5",
                      repostVisibility === "private"
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span className="text-xs font-medium">Private</span>
                  <span className="text-[10px] text-muted-foreground text-center">
                    Only you
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* Preview of original post */}
          <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={
                    post.isRepost && post.originalPost
                      ? post.originalPost.author.avatarURL
                      : post.author.avatarURL
                  }
                />
                <AvatarFallback className="text-xs">
                  {post.isRepost && post.originalPost
                    ? `${post.originalPost.author.firstName[0]}${post.originalPost.author.lastName[0]}`
                    : `${post.author.firstName[0]}${post.author.lastName[0]}`}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {post.isRepost && post.originalPost
                  ? `${post.originalPost.author.firstName} ${post.originalPost.author.lastName}`
                  : `${post.author.firstName} ${post.author.lastName}`}
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.isRepost && post.originalPost
                ? post.originalPost.postContent
                : post.postContent}
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setRepostCaption("");
                setRepostVisibility("public");
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRepost}
              disabled={isReposting}
              className="bg-primary hover:bg-primary/90"
            >
              {isReposting ? "Reposting..." : "Repost"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Post Dialog */}
      <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <AlertDialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Post</AlertDialogTitle>
            <AlertDialogDescription>
              Make changes to your post below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Textarea
                placeholder="What's on your mind?"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value.slice(0, 5000))}
                className="min-h-[150px] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {editContent.length}/5000 characters
              </p>
            </div>

            {/* Current Attachments */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Attachments ({editAttachments.length}/10):
                </span>
                {editAttachments.length < 10 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAttachment}
                  >
                    {isUploadingAttachment ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-1" />
                        Add
                      </>
                    )}
                  </Button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleAddAttachment}
                  className="hidden"
                />
              </div>
              {editAttachments.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {editAttachments.map((attachment, index) => (
                    <div
                      key={attachment.id || index}
                      className="relative group rounded-lg overflow-hidden border"
                    >
                      {attachment.postAttachmentType === "image" ? (
                        <img
                          src={getFullUrl(attachment.postAttachmentUrl)}
                          alt={attachment.postAttachmentTitle || "Attachment"}
                          className="w-full h-24 object-cover"
                        />
                      ) : attachment.postAttachmentType === "video" ? (
                        <video
                          src={getFullUrl(attachment.postAttachmentUrl)}
                          className="w-full h-24 object-cover"
                        />
                      ) : (
                        <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center">
                          <Link2 className="h-6 w-6 text-gray-400" />
                          <span className="text-xs text-gray-500 mt-1 px-2 truncate max-w-full">
                            {attachment.postAttachmentTitle || "Document"}
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setEditAttachments((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 border-2 border-dashed rounded-lg">
                  <Image className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No attachments yet
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Visibility:</span>
              <select
                value={editVisibility}
                onChange={(e) =>
                  setEditVisibility(
                    e.target.value as "public" | "private" | "connections"
                  )
                }
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring max-w-[200px]"
              >
                <option value="public">Public</option>
                <option value="connections">Connections Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setEditContent(post.postContent);
                setEditVisibility(post.postVisibility);
                setEditAttachments(post.attachments || []);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleEditPost}
              disabled={isUpdating || !editContent.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Share Dialog - Facebook Style */}
      <AlertDialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Share this post
            </AlertDialogTitle>
          </AlertDialogHeader>

          {/* Copy Link Section */}
          <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <input
              type="text"
              readOnly
              value={getPostUrl()}
              className="flex-1 bg-transparent text-sm truncate outline-none"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                handleCopyLink();
                setShowShareDialog(false);
              }}
              className="shrink-0"
            >
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </Button>
          </div>

          {/* Social Media Grid */}
          <div className="grid grid-cols-4 gap-3 py-4">
            {/* Facebook */}
            <button
              onClick={() => {
                handleShareFacebook();
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <span className="text-xs">Facebook</span>
            </button>

            {/* X/Twitter */}
            <button
              onClick={() => {
                handleShareTwitter();
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="text-xs">X</span>
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => {
                handleShareLinkedIn();
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span className="text-xs">LinkedIn</span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => {
                handleShareWhatsApp();
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="text-xs">WhatsApp</span>
            </button>

            {/* Telegram */}
            <button
              onClick={() => {
                handleShareTelegram();
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#0088cc] flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <span className="text-xs">Telegram</span>
            </button>

            {/* Email */}
            <button
              onClick={() => {
                handleShareEmail();
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs">Email</span>
            </button>

            {/* Reddit */}
            <button
              onClick={() => {
                const postUrl = getPostUrl();
                const text = post.postContent.slice(0, 100);
                window.open(
                  `https://reddit.com/submit?url=${encodeURIComponent(
                    postUrl
                  )}&title=${encodeURIComponent(text)}`,
                  "_blank"
                );
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#FF4500] flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              </div>
              <span className="text-xs">Reddit</span>
            </button>

            {/* Pinterest */}
            <button
              onClick={() => {
                const postUrl = getPostUrl();
                const description = post.postContent.slice(0, 200);
                const imageUrl = post.attachments?.[0]?.postAttachmentUrl || "";
                window.open(
                  `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                    postUrl
                  )}&description=${encodeURIComponent(
                    description
                  )}&media=${encodeURIComponent(imageUrl)}`,
                  "_blank"
                );
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-[#E60023] flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                </svg>
              </div>
              <span className="text-xs">Pinterest</span>
            </button>

            {/* SMS/Messages */}
            <button
              onClick={() => {
                const postUrl = getPostUrl();
                const text = `Check out this post: ${postUrl}`;
                window.open(`sms:?body=${encodeURIComponent(text)}`, "_self");
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs">Messages</span>
            </button>

            {/* Notes/Copy as Text */}
            <button
              onClick={() => {
                const postUrl = getPostUrl();
                const authorName = `${post.author.firstName} ${post.author.lastName}`;
                const textToCopy = `${post.postContent}\n\n— ${authorName}\n\n${postUrl}`;
                navigator.clipboard.writeText(textToCopy);
                toast.success("Post copied as text!");
                setShowShareDialog(false);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                <StickyNote className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs">Notes</span>
            </button>

            {/* More (Native Share) */}
            {canUseNativeShare && (
              <button
                onClick={() => {
                  handleShare();
                  setShowShareDialog(false);
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs">More Apps</span>
              </button>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
