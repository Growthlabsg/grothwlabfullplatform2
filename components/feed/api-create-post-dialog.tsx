"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon,
  Video,
  FileText,
  Link as LinkIcon,
  X,
  Upload,
  Hash,
  Globe,
  Users,
  Lock,
  Plus,
  Building2,
} from "lucide-react";
import {
  useCreatePostMutation,
  useUploadFileMutation,
  useAddPostAttachmentMutation,
} from "@/lib/redux";
import { feedApi } from "@/lib/redux/feedApi";
import { PostAttachment, Post } from "@/lib/redux/feedApi";
import { useAuth } from "@/contexts/auth-context";
import { usePageContext } from "@/contexts/page-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/lib/redux";

interface CreatePostDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PendingFile {
  file: File;
  preview?: string;
  type: "image" | "video" | "document";
}

export function CreatePostDialog({
  trigger,
  open,
  onOpenChange,
}: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postVisibility, setPostVisibility] = useState<
    "PUBLIC" | "PRIVATE" | "CONNECTIONS"
  >("PUBLIC");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { activePage, isOperatingAsPage, activePageId } = usePageContext();
  const dispatch = useAppDispatch();

  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const [uploadFile] = useUploadFileMutation();
  const [addPostAttachment] = useAddPostAttachmentMutation();

  const isDialogOpen = open !== undefined ? open : isOpen;
  const setDialogOpen = onOpenChange || setIsOpen;

  const visibilityOptions = [
    {
      value: "PUBLIC",
      label: "Public",
      icon: Globe,
      description: "Anyone can see this post",
    },
    {
      value: "CONNECTIONS",
      label: "Connections",
      icon: Users,
      description: "Only your connections can see",
    },
    {
      value: "PRIVATE",
      label: "Private",
      icon: Lock,
      description: "Only you can see this post",
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newPendingFiles: PendingFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;

      let type: "image" | "video" | "document" = "document";
      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.startsWith("video/")) type = "video";

      const pendingFile: PendingFile = { file, type };

      // Create preview for images
      if (type === "image") {
        pendingFile.preview = URL.createObjectURL(file);
      }

      newPendingFiles.push(pendingFile);
    }

    setPendingFiles((prev) => [...prev, ...newPendingFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removePendingFile = (index: number) => {
    setPendingFiles((prev) => {
      const file = prev[index];
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const addHashtag = () => {
    const tag = hashtagInput.trim().replace(/^#/, "");
    if (tag && !hashtags.includes(tag) && hashtags.length < 10) {
      setHashtags([...hashtags, tag]);
      setHashtagInput("");
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!postContent.trim()) {
      toast.error("Post content is required");
      return;
    }

    setErrorMessage(null);
    const tempId = `temp-${Date.now()}`;
    const hasFiles = pendingFiles.length > 0;

    // Create optimistic post data
    const optimisticPost: Post = {
      id: Date.now(), // Temporary ID
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
      // Add page context if operating as page
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
      postContent,
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      viewsCount: 0,
      postVisibility: postVisibility.toLowerCase() as
        | "public"
        | "private"
        | "connections",
      postHashTags: hashtags,
      attachments: [],
      createdAt: new Date().toISOString(),
      isLiked: false,
      isSaved: false,
      isPending: true,
      pendingAttachments: hasFiles ? pendingFiles.length : 0,
    };

    // Close dialog immediately for better UX
    setDialogOpen(false);

    // Add optimistic post to feed cache
    const feedTypes = [
      "recommended",
      "following",
      "trending",
      "recent",
    ] as const;
    const patches: any[] = [];

    // Include pageId variations to match all possible cache keys
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
                // Check if post already exists to avoid duplicates
                if (!draft.posts.find((p) => p.id === optimisticPost.id)) {
                  draft.posts.unshift(optimisticPost);
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
      // Step 1: Create the post first (without attachments)
      // Build request object - only include authorPageID if operating as page
      const postRequest: Parameters<typeof createPost>[0] = {
        postContent,
        postVisibility: postVisibility.toLowerCase() as
          | "public"
          | "private"
          | "connections",
        postHashTags: hashtags,
        attachments: [], // We'll add attachments after
      };

      // Only add authorPageID if operating as a page
      if (isOperatingAsPage && activePageId) {
        postRequest.authorPageID = activePageId;
      }

      const createdPost = await createPost(postRequest).unwrap();

      // Update the optimistic post with real ID
      for (const pageId of [activePageId, null, undefined]) {
        for (const feed_type of feedTypes) {
          try {
            dispatch(
              feedApi.util.updateQueryData(
                "getFeed",
                { page: 1, limit: 10, feed_type, pageId },
                (draft) => {
                  const index = draft.posts.findIndex(
                    (p) => p.id === optimisticPost.id
                  );
                  if (index !== -1) {
                    draft.posts[index] = {
                      ...createdPost,
                      isPending: hasFiles,
                      pendingAttachments: hasFiles ? pendingFiles.length : 0,
                    };
                  }
                }
              )
            );
          } catch {
            // Skip
          }
        }
      }

      // Step 2: Upload files one by one and add as attachments
      if (hasFiles) {
        let uploadedCount = 0;

        for (const pendingFile of pendingFiles) {
          try {
            const formData = new FormData();
            formData.append("file", pendingFile.file);

            const uploadResult = await uploadFile(formData).unwrap();

            // Add attachment to the post
            await addPostAttachment({
              postId: createdPost.id,
              attachment: {
                postAttachmentType:
                  uploadResult.attachment_data.postAttachmentType.toLowerCase() as
                    | "image"
                    | "video"
                    | "document"
                    | "link",
                postAttachmentUrl:
                  uploadResult.attachment_data.postAttachmentUrl,
                postAttachmentTitle:
                  uploadResult.attachment_data.postAttachmentTitle,
                postAttachmentDescription:
                  uploadResult.attachment_data.postAttachmentDescription,
              },
            }).unwrap();

            uploadedCount++;

            // Update pending count in cache
            for (const pageId of [activePageId, null, undefined]) {
              for (const feed_type of feedTypes) {
                try {
                  dispatch(
                    feedApi.util.updateQueryData(
                      "getFeed",
                      { page: 1, limit: 10, feed_type, pageId },
                      (draft) => {
                        const post = draft.posts.find(
                          (p) => p.id === createdPost.id
                        );
                        if (post) {
                          post.pendingAttachments =
                            pendingFiles.length - uploadedCount;
                          if (post.pendingAttachments === 0) {
                            post.isPending = false;
                          }
                        }
                      }
                    )
                  );
                } catch {
                  // Skip
                }
              }
            }
          } catch (error) {
            console.error("Failed to upload file:", error);
            toast.error(`Failed to upload ${pendingFile.file.name}`);
          }
        }
      }

      // Mark post as complete
      for (const pageId of [activePageId, null, undefined]) {
        for (const feed_type of feedTypes) {
          try {
            dispatch(
              feedApi.util.updateQueryData(
                "getFeed",
                { page: 1, limit: 10, feed_type, pageId },
                (draft) => {
                  const post = draft.posts.find((p) => p.id === createdPost.id);
                  if (post) {
                    post.isPending = false;
                    post.pendingAttachments = 0;
                  }
                }
              )
            );
          } catch {
            // Skip
          }
        }
      }

      // Reset form
      setPostContent("");
      setHashtags([]);
      setHashtagInput("");
      setPendingFiles([]);
      setPostVisibility("PUBLIC");

      toast.success("Post created successfully!");
    } catch (error: any) {
      // Revert optimistic update
      patches.forEach((patch) => patch.undo());

      const message =
        error?.data?.detail || error?.message || "Failed to create post";
      setErrorMessage(message);
      toast.error(message);

      // Reopen dialog on error
      setDialogOpen(true);
    }
  };

  const selectedVisibility = visibilityOptions.find(
    (opt) => opt.value === postVisibility
  );
  const VisibilityIcon = selectedVisibility?.icon || Globe;

  // Get display info based on context
  const displayAvatar = isOperatingAsPage
    ? activePage?.avatarURL
    : user?.avatarURL;
  const displayName = isOperatingAsPage
    ? activePage?.businessTitle
    : `${user?.firstName} ${user?.lastName}`;
  const displayFallback = isOperatingAsPage
    ? activePage?.businessTitle?.[0] || "B"
    : `${user?.firstName?.[0]}${user?.lastName?.[0]}`;

  const defaultTrigger = (
    <Button
      className="w-full justify-start text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
      variant="ghost"
      data-testid="create-post-trigger"
    >
      <Avatar
        className={cn(
          "h-8 w-8 mr-3",
          isOperatingAsPage && "border-2 border-blue-500"
        )}
      >
        <AvatarImage src={displayAvatar} />
        <AvatarFallback>
          {isOperatingAsPage ? (
            <Building2 className="h-4 w-4" />
          ) : (
            displayFallback
          )}
        </AvatarFallback>
      </Avatar>
      Start a post{isOperatingAsPage ? ` as ${activePage?.businessTitle}` : ""}
      ...
    </Button>
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Upload Overlay - removed, we use optimistic updates now */}

        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Page Context Banner */}
          {isOperatingAsPage && activePage && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 flex items-center gap-3">
              <Building2 className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Posting as {activePage.businessTitle}
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  This post will appear from your business page
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                Page
              </Badge>
            </div>
          )}

          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <Avatar
              className={cn(
                "h-12 w-12",
                isOperatingAsPage && "border-2 border-blue-500"
              )}
            >
              <AvatarImage src={displayAvatar} />
              <AvatarFallback>
                {isOperatingAsPage ? (
                  <Building2 className="h-5 w-5" />
                ) : (
                  displayFallback
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-semibold">{displayName}</h4>
              <Select
                value={postVisibility}
                onValueChange={(value) =>
                  setPostVisibility(
                    value as "PUBLIC" | "PRIVATE" | "CONNECTIONS"
                  )
                }
              >
                <SelectTrigger className="w-full mt-1 h-10 focus:ring-0 focus:ring-offset-0 focus:outline-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="z-[9999]"
                  sideOffset={4}
                >
                  {visibilityOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <div>
                            <div className="font-medium text-sm text-start">
                              {option.label}
                            </div>
                            <div className="text-xs text-gray-500">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Post Content */}
          <Textarea
            placeholder="What do you want to talk about?"
            value={postContent}
            onChange={(e) => {
              setPostContent(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            className="min-h-[120px] resize-none border border-gray-200 dark:border-gray-700 p-4 text-lg placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none focus:border-gray-200 dark:focus:border-gray-700"
            maxLength={5000}
          />

          {/* Character Count */}
          <div className="text-right text-xs text-gray-500">
            {postContent.length}/5000
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center space-x-1"
                >
                  <span>#{tag}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeHashtag(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>

            {hashtags.length < 10 && (
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Add hashtag"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHashtag();
                      }
                    }}
                    className="pl-10 pr-4 py-2 border rounded-md w-full text-sm focus:outline-none focus:ring-0 focus:border-gray-200 dark:focus:border-gray-700"
                    maxLength={30}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addHashtag}
                  disabled={!hashtagInput.trim()}
                >
                  Add
                </Button>
              </div>
            )}
          </div>

          {/* Selected Files Preview */}
          {pendingFiles.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {pendingFiles.map((pendingFile, index) => (
                <Card key={index} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={() => removePendingFile(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <CardContent className="p-3">
                    {pendingFile.type === "image" && pendingFile.preview ? (
                      <img
                        src={pendingFile.preview}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : pendingFile.type === "video" ? (
                      <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded">
                        <Video className="h-8 w-8 text-gray-400" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 truncate">
                      {pendingFile.file.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-start space-x-2">
                <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errorMessage}
                </p>
              </div>
            </div>
          )}

          {/* Upload Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={pendingFiles.length >= 10}
                  className="flex items-center space-x-2"
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>Photo</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    fileInputRef.current?.setAttribute("accept", "video/*");
                    fileInputRef.current?.click();
                  }}
                  disabled={pendingFiles.length >= 10}
                  className="flex items-center space-x-2"
                >
                  <Video className="h-4 w-4" />
                  <span>Video</span>
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    fileInputRef.current?.setAttribute(
                      "accept",
                      ".pdf,.doc,.docx"
                    );
                    fileInputRef.current?.click();
                  }}
                  disabled={pendingFiles.length >= 10}
                  className="flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>Document</span>
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!postContent.trim() || isCreatingPost}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isCreatingPost ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Posting...</span>
                    </div>
                  ) : (
                    "Post"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
