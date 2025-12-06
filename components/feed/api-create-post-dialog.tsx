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
} from "lucide-react";
import { useCreatePostMutation, useUploadFileMutation } from "@/lib/redux";
import { PostAttachment } from "@/lib/redux/feedApi";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CreatePostDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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
  const [attachments, setAttachments] = useState<Omit<PostAttachment, "id">[]>(
    []
  );
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();
  const [uploadFile] = useUploadFileMutation();

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadFile(formData).unwrap();

        setAttachments((prev) => [
          ...prev,
          {
            postAttachmentType:
              result.attachment_data.postAttachmentType.toLowerCase() as
                | "image"
                | "video"
                | "document"
                | "link",
            postAttachmentUrl: result.attachment_data.postAttachmentUrl,
            postAttachmentTitle: result.attachment_data.postAttachmentTitle,
            postAttachmentDescription:
              result.attachment_data.postAttachmentDescription,
          },
        ]);
      }

      toast.success("Files uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload files");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
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

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!postContent.trim()) {
      toast.error("Post content is required");
      return;
    }

    setErrorMessage(null);

    try {
      await createPost({
        postContent,
        postVisibility: postVisibility.toLowerCase() as
          | "public"
          | "private"
          | "connections",
        postHashTags: hashtags,
        attachments,
      }).unwrap();

      // Reset form
      setPostContent("");
      setHashtags([]);
      setHashtagInput("");
      setAttachments([]);
      setPostVisibility("PUBLIC");
      setDialogOpen(false);

      toast.success("Post created successfully!");
    } catch (error: any) {
      const message =
        error?.data?.detail || error?.message || "Failed to create post";
      setErrorMessage(message);
    }
  };

  const selectedVisibility = visibilityOptions.find(
    (opt) => opt.value === postVisibility
  );
  const VisibilityIcon = selectedVisibility?.icon || Globe;

  const defaultTrigger = (
    <Button
      className="w-full justify-start text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
      variant="ghost"
      data-testid="create-post-trigger"
    >
      <Avatar className="h-8 w-8 mr-3">
        <AvatarImage src={user?.avatarURL} />
        <AvatarFallback>
          {user?.firstName?.[0]}
          {user?.lastName?.[0]}
        </AvatarFallback>
      </Avatar>
      Start a post...
    </Button>
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Upload Overlay */}
        {isUploading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-3">
              <Upload className="h-10 w-10 animate-pulse text-primary" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Uploading files...
              </span>
            </div>
          </div>
        )}

        <DialogHeader>
          <DialogTitle>Create a post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.avatarURL} />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="font-semibold">
                {user?.firstName} {user?.lastName}
              </h4>
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

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {attachments.map((attachment, index) => (
                <Card key={index} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  <CardContent className="p-3">
                    {attachment.postAttachmentType === "image" ? (
                      <img
                        src={`http://localhost:8888${attachment.postAttachmentUrl}`}
                        alt={attachment.postAttachmentTitle || "Uploaded image"}
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : attachment.postAttachmentType === "video" ? (
                      <video
                        src={`http://localhost:8888${attachment.postAttachmentUrl}`}
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-32 bg-gray-100 dark:bg-gray-800 rounded">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                    {attachment.postAttachmentTitle && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 truncate">
                        {attachment.postAttachmentTitle}
                      </p>
                    )}
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
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading || attachments.length >= 10}
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
                  disabled={isUploading || attachments.length >= 10}
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
                  disabled={isUploading || attachments.length >= 10}
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
                  disabled={
                    !postContent.trim() || isCreatingPost || isUploading
                  }
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
