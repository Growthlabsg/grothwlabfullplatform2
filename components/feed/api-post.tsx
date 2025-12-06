"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
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
} from "lucide-react";
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
  useSavePostMutation,
  useReportPostMutation,
  useLikeCommentMutation,
} from "@/lib/redux";
import { Post as PostType, Comment } from "@/lib/redux/feedApi";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { MediaSlider } from "./media-slider";

interface PostProps {
  post: PostType;
  onEdit?: (post: PostType) => void;
  onDelete?: (postId: number) => void;
}

interface CommentItemProps {
  comment: Comment;
  postId: number;
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

function CommentItem({ comment, postId, depth = 0 }: CommentItemProps) {
  const [replyText, setReplyText] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(depth < 1); // Only 1 level nesting
  const [createComment, { isLoading: isCreatingReply }] =
    useCreateCommentMutation();
  const [likeComment, { isLoading: isLikingComment }] =
    useLikeCommentMutation();

  const replies = comment.replies || [];

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
      await likeComment({ postId, commentId: comment.id }).unwrap();
    } catch (error) {
      toast.error("Failed to like comment");
    }
  };

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
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={comment.author.avatarURL} />
          <AvatarFallback>
            {comment.author.firstName[0]}
            {comment.author.lastName[0]}
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
              <span className="font-semibold text-sm">
                {comment.author.firstName} {comment.author.lastName}
              </span>
              {comment.author.isVerified && (
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
            <div className="flex space-x-2 mt-2">
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
                    <Send className="h-4 w-4" />
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const COMMENTS_PER_PAGE = 10;
  const { user } = useAuth();

  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [createComment, { isLoading: isCommenting }] =
    useCreateCommentMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const [savePost, { isLoading: isSaving }] = useSavePostMutation();
  const [reportPost, { isLoading: isReporting }] = useReportPostMutation();

  const {
    data: commentsData,
    isLoading: commentsLoading,
    isFetching: commentsFetching,
  } = useGetPostCommentsQuery(
    { postId: post.id, page: commentsPage, limit: COMMENTS_PER_PAGE },
    { skip: !showComments }
  );

  // Extract comments and pagination info from response
  const comments = commentsData?.comments || [];
  const hasMoreComments = commentsData?.hasNext || false;
  const totalComments = commentsData?.total || 0;
  const totalAllComments = commentsData?.totalAll || 0;

  const handleLoadMoreComments = () => {
    setCommentsPage((prev) => prev + 1);
  };

  const isOwnPost = user?.id === post.authorID;

  const handleLike = async () => {
    try {
      await likePost(post.id).unwrap();
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
      setShowDeleteDialog(false);
      onDelete?.(post.id);
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Post by ${post.author.firstName} ${post.author.lastName}`,
        text: post.postContent,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to copying to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
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

  const handleReport = async () => {
    if (!reportReason.trim()) {
      toast.error("Please provide a reason for reporting");
      return;
    }

    try {
      await reportPost({ postId: post.id, reason: reportReason }).unwrap();
      setShowReportDialog(false);
      setReportReason("");
      toast.success("Post reported successfully. We'll review it shortly.");
    } catch (error) {
      toast.error("Failed to report post");
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Card className={cn("w-full", post.isPending && "opacity-90")}>
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
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatarURL} />
              <AvatarFallback>
                {post.author.firstName[0]}
                {post.author.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">
                  {post.author.firstName} {post.author.lastName}
                </h4>
                {post.author.isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {post.author.headline}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}{" "}
                ·
                <Eye className="inline h-3 w-3 mx-1" />
                {post.viewsCount} views
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isOwnPost ? (
                <>
                  <DropdownMenuItem onClick={() => onEdit?.(post)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete post
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
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Post Content */}
          <div className="space-y-3">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {post.postContent}
            </p>

            {/* Hashtags */}
            {post.postHashTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.postHashTags.map((tag) => (
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

            {/* Attachments - Using MediaSlider */}
            {(post.attachments.length > 0 || post.pendingAttachments) && (
              <MediaSlider
                items={post.attachments.map((attachment) => ({
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

          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 py-2 border-y border-gray-200 dark:border-gray-800">
            <span>{post.likesCount} likes</span>
            <div className="flex space-x-4">
              <span>{post.commentsCount} comments</span>
              <span>{post.sharesCount} shares</span>
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
              onClick={handleShare}
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
                  <AvatarImage src={user?.avatarURL} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
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
                      Post
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Report Post Dialog */}
      <AlertDialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Report Post</AlertDialogTitle>
            <AlertDialogDescription>
              Please provide a reason for reporting this post. Our team will
              review it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Describe why you're reporting this post..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setReportReason("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReport}
              disabled={isReporting || !reportReason.trim()}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isReporting ? "Reporting..." : "Report"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
