"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  MessageSquare,
  Hash,
  Users,
  Search,
  Menu,
  X,
  Settings,
  Phone,
  Video,
  FileIcon,
  Shield,
  Pin,
  Bell,
  PanelLeft,
  PanelRight,
  Star,
  MessageCircle,
  Bookmark,
  HelpCircle,
  Info,
  PersonStanding,
  Volume2,
  VolumeX,
  Moon,
  BellOff,
  Minimize2,
  Maximize2,
  User,
  Mic,
  SquareMIcon as MicSquare,
  StopCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SecureFileSharing } from "./secure-file-sharing";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { useMobile } from "@/hooks/use-mobile";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

// Define all types needed for the communication hub
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: ChatUser;
  status: "sending" | "sent" | "delivered" | "read" | "failed";
  isEdited?: boolean;
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  role?: string;
  status?: "online" | "away" | "offline" | "busy";
}

interface Channel {
  id: string;
  name: string;
  unread: number;
  pinned: boolean;
  isArchived?: boolean;
  isMuted?: boolean;
  description?: string;
  members?: number;
  lastActivity?: Date;
  category?: string;
}

interface DirectMessage {
  id: string;
  name: string;
  avatar?: string;
  status?: "online" | "away" | "offline" | "busy";
  unread: number;
  isGroup?: boolean;
  members?: ChatUser[];
  lastMessage?: string;
  lastActivity?: Date;
  isPinned?: boolean;
}

interface NotificationSound {
  id: string;
  name: string;
  path: string;
}

interface NotificationSettings {
  enabled: boolean;
  muted: boolean;
  volume: number;
  sounds: {
    message: string;
    mention: string;
    call: string;
    system: string;
  };
  doNotDisturb: boolean;
  doNotDisturbSchedule: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    days: string[];
  };
}

interface CommunicationHubProps {
  onClose?: () => void;
  activeTab?: "messages" | "files";
  onTabChange?: (tab: "messages" | "files") => void;
  enableFileSharing?: boolean;
  securityLevels?: string[];
  className?: string;
}

export function CommunicationHub({
  onClose,
  activeTab = "messages",
  onTabChange,
  enableFileSharing = true,
  securityLevels = ["standard", "confidential", "restricted"],
  className,
}: CommunicationHubProps) {
  // Responsive state
  const { isMobile } = useMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [density, setDensity] = useState<"compact" | "comfortable">(
    "comfortable"
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<
    "channels" | "direct" | "calls" | "favorites"
  >("channels");
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [activeChannel, setActiveChannel] = useState<string | null>(null);
  const [activeDirectMessage, setActiveDirectMessage] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [showNotificationSettings, setShowNotificationSettings] =
    useState(false);
  const [showCallInterface, setShowCallInterface] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video">("audio");
  const [callParticipants, setCallParticipants] = useState<ChatUser[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingTimerRef = useRef<number | null>(null);

  // Notification sound settings
  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettings>({
      enabled: true,
      muted: false,
      volume: 0.5,
      sounds: {
        message: "default",
        mention: "ping",
        call: "bell",
        system: "subtle",
      },
      doNotDisturb: false,
      doNotDisturbSchedule: {
        enabled: false,
        startTime: "22:00",
        endTime: "08:00",
        days: [],
      },
    });

  // Audio elements for notification sounds
  const audioElementsRef = useRef<Record<string, HTMLAudioElement>>({});

  // Available notification sounds
  const notificationSounds: NotificationSound[] = [
    { id: "default", name: "Default", path: "/sounds/chime.mp3" },
    { id: "ping", name: "Ping", path: "/sounds/ping.mp3" },
    { id: "bell", name: "Bell", path: "/sounds/bell.mp3" },
    { id: "pop", name: "Pop", path: "/sounds/pop.mp3" },
    { id: "subtle", name: "Subtle", path: "/sounds/subtle.mp3" },
  ];

  // Mock current user
  const currentUser: ChatUser = {
    id: "user-123",
    name: "John Doe",
    avatar: "/placeholder.svg",
    email: "john.doe@example.com",
    status: "online",
    role: "Developer",
  };

  // Listen for container resize
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
        setContainerHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Handle mobile sidebar state
  useEffect(() => {
    setSidebarOpen(!isMobile);
    if (isMobile) {
      setSidebarCollapsed(false);
    }
  }, [isMobile]);

  // Initialize audio elements for notification sounds
  useEffect(() => {
    notificationSounds.forEach((sound) => {
      if (!audioElementsRef.current[sound.id]) {
        const audio = new Audio(sound.path);
        audio.volume = notificationSettings.volume;
        audioElementsRef.current[sound.id] = audio;
      }
    });

    return () => {
      // Clean up audio elements
      Object.values(audioElementsRef.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
      audioElementsRef.current = {};
    };
  }, []);

  // Update audio volume when settings change
  useEffect(() => {
    Object.values(audioElementsRef.current).forEach((audio) => {
      audio.volume = notificationSettings.volume;
    });
  }, [notificationSettings.volume]);

  // Check Do Not Disturb schedule
  useEffect(() => {
    if (!notificationSettings.doNotDisturbSchedule.enabled) return;

    const checkDoNotDisturb = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
      const currentTime = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      const isDayScheduled =
        notificationSettings.doNotDisturbSchedule.days.includes(currentDay);
      if (!isDayScheduled) return;

      const startTime = notificationSettings.doNotDisturbSchedule.startTime;
      const endTime = notificationSettings.doNotDisturbSchedule.endTime;

      // Check if current time is within the scheduled range
      const isInSchedule =
        startTime <= endTime
          ? currentTime >= startTime && currentTime <= endTime
          : currentTime >= startTime || currentTime <= endTime;

      if (isInSchedule && !notificationSettings.doNotDisturb) {
        setNotificationSettings((prev) => ({ ...prev, doNotDisturb: true }));
      } else if (!isInSchedule && notificationSettings.doNotDisturb) {
        setNotificationSettings((prev) => ({ ...prev, doNotDisturb: false }));
      }
    };

    checkDoNotDisturb();
    const interval = setInterval(checkDoNotDisturb, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [notificationSettings.doNotDisturbSchedule]);

  // Keyboard navigation helper
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, action: () => void) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        action();
      }
    },
    []
  );

  // Play notification sound
  const playSound = (type: "message" | "mention" | "call" | "system") => {
    if (
      !notificationSettings.enabled ||
      notificationSettings.muted ||
      notificationSettings.doNotDisturb
    )
      return;

    const soundId = notificationSettings.sounds[type];
    const audio = audioElementsRef.current[soundId];

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((err) => console.error("Failed to play sound:", err));
    }
  };

  // Toggle mute
  const toggleMute = () => {
    setNotificationSettings((prev) => ({ ...prev, muted: !prev.muted }));
  };

  // Toggle Do Not Disturb
  const toggleDoNotDisturb = () => {
    setNotificationSettings((prev) => ({
      ...prev,
      doNotDisturb: !prev.doNotDisturb,
    }));
  };

  // Set volume
  const setVolume = (volume: number) => {
    setNotificationSettings((prev) => ({ ...prev, volume }));
  };

  // Update sound for notification type
  const updateSoundForType = (
    type: "message" | "mention" | "call" | "system",
    soundId: string
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      sounds: {
        ...prev.sounds,
        [type]: soundId,
      },
    }));
  };

  // Update notification settings
  const updateNotificationSettings = (
    settings: Partial<NotificationSettings>
  ) => {
    setNotificationSettings((prev) => ({
      ...prev,
      ...settings,
    }));
  };

  // Start a call
  const startCall = (type: "audio" | "video", participant?: ChatUser) => {
    setCallType(type);

    if (participant) {
      setCallParticipants([participant]);
    } else if (activeDirectMessage) {
      const dm = directMessages.find((dm) => dm.id === activeDirectMessage);
      if (dm) {
        if (dm.isGroup && dm.members) {
          setCallParticipants(dm.members);
        } else {
          setCallParticipants([
            { id: dm.id, name: dm.name, avatar: dm.avatar, status: dm.status },
          ]);
        }
      }
    } else if (activeChannel) {
      const channel = channels.find((c) => c.id === activeChannel);
      if (channel) {
        // In a real app, you would fetch the channel members
        setCallParticipants([
          {
            id: "channel-member",
            name: channel.name,
            avatar: "/placeholder.svg",
          },
        ]);
      }
    }

    setShowCallInterface(true);
    playSound("call");
  };

  // End a call
  const endCall = () => {
    // Stop recording if active
    if (isRecording) {
      stopRecording();
    }

    setShowCallInterface(false);
    setCallParticipants([]);
  };

  // Toggle fullscreen for call interface
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Toggle recording
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Start recording
  const startRecording = () => {
    if (!showCallInterface) return;

    // Request permissions if needed
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: callType === "video" })
      .then((stream) => {
        try {
          // Create media recorder
          const options = { mimeType: "video/webm;codecs=vp9,opus" };
          const mediaRecorder = new MediaRecorder(stream, options);

          const chunks: Blob[] = [];
          mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, {
              type: callType === "video" ? "video/webm" : "audio/webm",
            });
            setRecordedBlobs([...recordedBlobs, blob]);

            // Create download link
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style.display = "none";
            a.href = url;

            // Create filename with date and participant name
            const now = new Date();
            const participantName = callParticipants[0]?.name || "call";
            const fileType = callType === "video" ? "video" : "audio";
            const fileName = `${fileType}-call-${participantName}-${format(
              now,
              "yyyy-MM-dd-HH-mm-ss"
            )}.webm`;

            a.download = fileName;
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          };

          // Start recording
          mediaRecorder.start(1000); // Collect data every second
          mediaRecorderRef.current = mediaRecorder;

          // Start recording timer
          setRecordingTime(0);
          const timer = setInterval(() => {
            setRecordingTime((prev) => prev + 1);
          }, 1000);
          recordingTimerRef.current = timer;

          setIsRecording(true);

          // Play notification sound
          playSound("system");
        } catch (err) {
          console.error("Error starting recording:", err);
          alert(
            "Recording failed to start. Your browser may not support this feature."
          );
        }
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
        alert(
          "Unable to access camera/microphone for recording. Please check permissions."
        );
      });
  };

  // Stop recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }

    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    setIsRecording(false);
    setRecordingTime(0);

    // Play notification sound
    playSound("system");
  };

  // Mock channels data with categories
  const channelCategories = [
    { id: "general", name: "General" },
    { id: "teams", name: "Teams" },
    { id: "projects", name: "Projects" },
  ];

  const channels: Channel[] = [
    {
      id: "general",
      name: "general",
      unread: 3,
      pinned: true,
      category: "general",
      members: 24,
      description: "General discussions for everyone",
    },
    {
      id: "announcements",
      name: "announcements",
      unread: 1,
      pinned: true,
      category: "general",
      members: 24,
      description: "Important announcements",
    },
    {
      id: "funding",
      name: "funding",
      unread: 0,
      pinned: false,
      category: "teams",
      members: 8,
      description: "Funding and financial discussions",
    },
    {
      id: "mentorship",
      name: "mentorship",
      unread: 0,
      pinned: false,
      category: "teams",
      members: 12,
      description: "Mentorship discussions and opportunities",
    },
    {
      id: "events",
      name: "events",
      unread: 0,
      pinned: false,
      category: "general",
      members: 20,
      description: "Upcoming events and meetups",
    },
    {
      id: "tech-stack",
      name: "tech-stack",
      unread: 2,
      pinned: false,
      category: "projects",
      members: 10,
      description: "Technical discussions",
    },
    {
      id: "design",
      name: "design",
      unread: 0,
      pinned: false,
      category: "projects",
      members: 6,
      description: "Design discussions and resources",
    },
    {
      id: "product",
      name: "product",
      unread: 0,
      pinned: false,
      category: "projects",
      members: 8,
      description: "Product development and roadmap",
    },
  ];

  // Mock direct messages
  const directMessages: DirectMessage[] = [
    {
      id: "sarah",
      name: "Sarah Chen",
      avatar: "/abstract-geometric-shapes.png",
      status: "online",
      unread: 2,
      lastMessage: "Looking forward to our meeting tomorrow!",
      lastActivity: new Date(),
      isPinned: true,
    },
    {
      id: "david",
      name: "David Wong",
      avatar: "/abstract-geometric-aw.png",
      status: "away",
      unread: 0,
      lastMessage: "I'll send you the presentation by EOD",
      lastActivity: new Date(Date.now() - 3600000),
      isPinned: false,
    },
    {
      id: "team-alpha",
      name: "Team Alpha",
      isGroup: true,
      unread: 5,
      lastMessage: "Alex: Let's meet to discuss the new roadmap",
      lastActivity: new Date(Date.now() - 1800000),
      isPinned: true,
      members: [
        {
          id: "alex",
          name: "Alex Smith",
          avatar: "/abstract-geometric-aw.png",
        },
        {
          id: "jane",
          name: "Jane Doe",
          avatar: "/professional-woman-diverse.png",
        },
        { id: "mike", name: "Mike Johnson", avatar: "/tech-professional.png" },
      ],
    },
    {
      id: "jane",
      name: "Jane Smith",
      avatar: "/professional-woman-diverse.png",
      status: "offline",
      unread: 0,
      lastMessage: "Thanks for your help yesterday!",
      lastActivity: new Date(Date.now() - 86400000),
      isPinned: false,
    },
    {
      id: "product-team",
      name: "Product Team",
      isGroup: true,
      unread: 0,
      lastMessage: "Maya: Updated product specs in the shared folder",
      lastActivity: new Date(Date.now() - 43200000),
      isPinned: false,
      members: [
        {
          id: "maya",
          name: "Maya Wong",
          avatar: "/marketing-professional.png",
        },
        {
          id: "sam",
          name: "Sam Lee",
          avatar: "/product-manager-brainstorm.png",
        },
        {
          id: "lisa",
          name: "Lisa Chen",
          avatar: "/professional-woman-diverse.png",
        },
      ],
    },
  ];

  // Filter channels based on search query and pinned status
  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = searchQuery
      ? channel.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesPinned = showPinnedOnly ? channel.pinned : true;
    return matchesSearch && matchesPinned;
  });

  // Filter direct messages based on search query and pinned status
  const filteredDirectMessages = directMessages.filter((dm) => {
    const matchesSearch = searchQuery
      ? dm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dm.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase()) ??
          false)
      : true;
    const matchesPinned = showPinnedOnly ? dm.isPinned ?? false : true;
    return matchesSearch && matchesPinned;
  });

  // Get the total unread count for display in tabs
  const getUnreadCount = (type: "channels" | "direct" | "calls") => {
    if (type === "channels") {
      return channels.reduce((sum, channel) => sum + channel.unread, 0);
    } else if (type === "direct") {
      return directMessages.reduce((sum, dm) => sum + dm.unread, 0);
    }
    return 0;
  };

  // Group channels by category
  const channelsByCategory = channelCategories.map((category) => ({
    ...category,
    channels: filteredChannels.filter(
      (channel) => channel.category === category.id
    ),
  }));

  // Create favorite items for the favorites view
  const favoriteItems = [
    ...channels
      .filter((c) => c.pinned)
      .map((c) => ({ ...c, type: "channel" as const })),
    ...directMessages
      .filter((d) => d.isPinned)
      .map((d) => ({ ...d, type: "direct" as const })),
  ];

  // Handle tab change
  const handleTabChange = (tab: "messages" | "files") => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  // Toggle channel selection
  const toggleChannel = (channelId: string) => {
    if (activeChannel === channelId) {
      setActiveChannel(null);
    } else {
      setActiveChannel(channelId);
      setActiveDirectMessage(null);
      if (isMobile) {
        setSidebarOpen(false);
      }
    }
  };

  // Toggle direct message selection
  const toggleDirectMessage = (dmId: string) => {
    if (activeDirectMessage === dmId) {
      setActiveDirectMessage(null);
    } else {
      setActiveDirectMessage(dmId);
      setActiveChannel(null);
      if (isMobile) {
        setSidebarOpen(false);
      }
    }
  };

  // Key down handler for search input
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setSearchQuery("");
    }
  };

  // Render a single channel item
  const renderChannelItem = (channel: Channel) => (
    <button
      key={channel.id}
      className={cn(
        "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        activeChannel === channel.id
          ? "bg-primary/10 text-primary"
          : "hover:bg-muted text-foreground",
        density === "compact" ? "py-1" : "py-1.5",
        "cursor-pointer"
      )}
      type="button"
      onClick={() => toggleChannel(channel.id)}
      onKeyDown={(e) => handleKeyDown(e, () => toggleChannel(channel.id))}
      aria-selected={activeChannel === channel.id}
      aria-label={`Channel ${channel.name}${
        channel.unread > 0 ? `, ${channel.unread} unread messages` : ""
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Hash
          className={cn(
            "h-4 w-4 flex-shrink-0",
            activeChannel === channel.id
              ? "text-primary"
              : "text-muted-foreground"
          )}
          aria-hidden="true"
        />
        <span className="truncate">{channel.name}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {channel.pinned && (
          <Pin
            className="h-3 w-3 text-muted-foreground opacity-60"
            aria-hidden="true"
          />
        )}
        {channel.unread > 0 && (
          <Badge
            variant="default"
            className="h-5 min-w-5 px-1 flex items-center justify-center text-xs"
          >
            {channel.unread}
          </Badge>
        )}
      </div>
    </button>
  );

  // Render a single direct message item
  const renderDirectMessageItem = (dm: DirectMessage) => (
    <button
      key={dm.id}
      className={cn(
        "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        activeDirectMessage === dm.id
          ? "bg-primary/10 text-primary"
          : "hover:bg-muted text-foreground",
        density === "compact" ? "py-1" : "py-1.5",
        "cursor-pointer"
      )}
      type="button"
      onClick={() => toggleDirectMessage(dm.id)}
      onKeyDown={(e) => handleKeyDown(e, () => toggleDirectMessage(dm.id))}
      aria-selected={activeDirectMessage === dm.id}
      aria-label={`${dm.isGroup ? "Group" : "Conversation with"} ${dm.name}${
        dm.unread > 0 ? `, ${dm.unread} unread messages` : ""
      }`}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        {dm.isGroup ? (
          <Users
            className={cn(
              "h-4 w-4 flex-shrink-0",
              activeDirectMessage === dm.id
                ? "text-primary"
                : "text-muted-foreground"
            )}
            aria-hidden="true"
          />
        ) : (
          <div className="relative flex-shrink-0">
            <Avatar
              className={cn(
                "h-5 w-5",
                density === "compact" ? "h-4 w-4" : "h-5 w-5"
              )}
            >
              <AvatarImage src={dm.avatar || "/placeholder.svg"} alt="" />
              <AvatarFallback>{dm.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {dm.status && (
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full border border-background",
                  dm.status === "online"
                    ? "bg-green-500"
                    : dm.status === "away"
                    ? "bg-yellow-500"
                    : dm.status === "busy"
                    ? "bg-red-500"
                    : "bg-gray-400"
                )}
                aria-hidden="true"
              />
            )}
          </div>
        )}
        <span className="truncate">{dm.name}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {dm.isPinned && (
          <Pin
            className="h-3 w-3 text-muted-foreground opacity-60"
            aria-hidden="true"
          />
        )}
        {dm.unread > 0 && (
          <Badge
            variant="default"
            className="h-5 min-w-5 px-1 flex items-center justify-center text-xs"
          >
            {dm.unread}
          </Badge>
        )}
      </div>
    </button>
  );

  // Render favorite item (either channel or direct message)
  const renderFavoriteItem = (
    item: (Channel & { type: "channel" }) | (DirectMessage & { type: "direct" })
  ) => {
    if (item.type === "channel") {
      return renderChannelItem(item);
    } else {
      return renderDirectMessageItem(item);
    }
  };

  // Render the sidebar content based on active view
  const renderSidebarContent = () => {
    switch (activeView) {
      case "channels":
        return (
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
              {channelsByCategory.map((category) => (
                <div key={category.id} className="mb-4">
                  <div className="px-2 mb-1">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                  <div className="space-y-0.5">
                    {category.channels.length > 0 ? (
                      category.channels.map(renderChannelItem)
                    ) : searchQuery ? (
                      <p className="text-xs text-muted-foreground px-2 py-1">
                        No channels found in this category
                      </p>
                    ) : null}
                  </div>
                </div>
              ))}

              {filteredChannels.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <MessageSquare
                    className="h-8 w-8 text-muted-foreground mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    No channels found
                  </p>
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search query"
                    >
                      <X className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        );

      case "direct":
        return (
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
              {filteredDirectMessages.length > 0 ? (
                <div className="space-y-0.5 px-2 py-2">
                  {filteredDirectMessages.map(renderDirectMessageItem)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <MessageCircle
                    className="h-8 w-8 text-muted-foreground mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    No messages found
                  </p>
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search query"
                    >
                      <X className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                      Clear search
                    </Button>
                  )}
                </div>
              )}
            </ScrollArea>
          </div>
        );

      case "calls":
        return (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center">
            <Phone
              className="h-10 w-10 text-muted-foreground mb-3"
              aria-hidden="true"
            />
            <h3 className="text-base font-medium mb-1">No recent calls</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start a new call with your team or contacts
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => startCall("audio")}>
                <Phone className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                Start call
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => startCall("video")}
              >
                <Video className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                Video call
              </Button>
            </div>
          </div>
        );

      case "favorites":
        return (
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-2">
              {favoriteItems.length > 0 ? (
                <div className="space-y-0.5 px-2 py-2">
                  {favoriteItems.map(renderFavoriteItem)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <Star
                    className="h-8 w-8 text-muted-foreground mb-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    No favorites yet
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pin channels or conversations to add them to your favorites
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        );

      default:
        return null;
    }
  };

  // Find active item details
  const activeChannelDetails = channels.find((c) => c.id === activeChannel);
  const activeDirectMessageDetails = directMessages.find(
    (d) => d.id === activeDirectMessage
  );

  // Render notification settings dialog
  const renderNotificationSettingsDialog = () => {
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    return (
      <Dialog
        open={showNotificationSettings}
        onOpenChange={setShowNotificationSettings}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notification Sound Settings
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="sounds" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sounds">
                <Volume2 className="mr-2 h-4 w-4" />
                Sounds
              </TabsTrigger>
              <TabsTrigger value="dnd">
                <Moon className="mr-2 h-4 w-4" />
                Do Not Disturb
              </TabsTrigger>
              <TabsTrigger value="advanced">
                <Bell className="mr-2 h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sounds" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notification-sounds"
                    checked={notificationSettings.enabled}
                    onCheckedChange={(checked) =>
                      updateNotificationSettings({ enabled: checked })
                    }
                  />
                  <Label htmlFor="notification-sounds">
                    Enable notification sounds
                  </Label>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMute}
                  className="flex items-center"
                >
                  {notificationSettings.muted ? (
                    <>
                      <BellOff className="mr-2 h-4 w-4" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <Bell className="mr-2 h-4 w-4" />
                      Mute
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">
                    Message notification sound
                  </Label>
                  <div className="mt-2">
                    <Select
                      value={notificationSettings.sounds.message}
                      onValueChange={(value) => {
                        updateSoundForType("message", value);
                        playSound("message");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sound" />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationSounds.map((sound) => (
                          <SelectItem key={sound.id} value={sound.id}>
                            {sound.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Mention notification sound
                  </Label>
                  <div className="mt-2">
                    <Select
                      value={notificationSettings.sounds.mention}
                      onValueChange={(value) => {
                        updateSoundForType("mention", value);
                        playSound("mention");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sound" />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationSounds.map((sound) => (
                          <SelectItem key={sound.id} value={sound.id}>
                            {sound.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    Call notification sound
                  </Label>
                  <div className="mt-2">
                    <Select
                      value={notificationSettings.sounds.call}
                      onValueChange={(value) => {
                        updateSoundForType("call", value);
                        playSound("call");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sound" />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationSounds.map((sound) => (
                          <SelectItem key={sound.id} value={sound.id}>
                            {sound.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">
                    System notification sound
                  </Label>
                  <div className="mt-2">
                    <Select
                      value={notificationSettings.sounds.system}
                      onValueChange={(value) => {
                        updateSoundForType("system", value);
                        playSound("system");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sound" />
                      </SelectTrigger>
                      <SelectContent>
                        {notificationSounds.map((sound) => (
                          <SelectItem key={sound.id} value={sound.id}>
                            {sound.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Volume</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <VolumeX className="h-4 w-4 text-muted-foreground" />
                    <Slider
                      value={[notificationSettings.volume]}
                      max={1}
                      step={0.01}
                      onValueChange={(value) => setVolume(value[0])}
                      disabled={notificationSettings.muted}
                      className={cn(notificationSettings.muted && "opacity-50")}
                    />
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => playSound("message")}>
                    Test Sound
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dnd" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium">Do Not Disturb</h3>
                  <p className="text-sm text-muted-foreground">
                    Mute all notifications when you need to focus
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.doNotDisturb}
                  onCheckedChange={toggleDoNotDisturb}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium">
                      Schedule Do Not Disturb
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Set up a regular schedule for Do Not Disturb mode
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.doNotDisturbSchedule.enabled}
                    onCheckedChange={(checked) => {
                      updateNotificationSettings({
                        doNotDisturbSchedule: {
                          ...notificationSettings.doNotDisturbSchedule,
                          enabled: checked,
                        },
                      });
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Start Time</Label>
                    <Input
                      type="time"
                      value={
                        notificationSettings.doNotDisturbSchedule.startTime
                      }
                      onChange={(e) => {
                        updateNotificationSettings({
                          doNotDisturbSchedule: {
                            ...notificationSettings.doNotDisturbSchedule,
                            startTime: e.target.value,
                          },
                        });
                      }}
                      className="mt-1"
                      disabled={
                        !notificationSettings.doNotDisturbSchedule.enabled
                      }
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium">End Time</Label>
                    <Input
                      type="time"
                      value={notificationSettings.doNotDisturbSchedule.endTime}
                      onChange={(e) => {
                        updateNotificationSettings({
                          doNotDisturbSchedule: {
                            ...notificationSettings.doNotDisturbSchedule,
                            endTime: e.target.value,
                          },
                        });
                      }}
                      className="mt-1"
                      disabled={
                        !notificationSettings.doNotDisturbSchedule.enabled
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Days</Label>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {daysOfWeek.map((day) => {
                      const isChecked =
                        notificationSettings.doNotDisturbSchedule.days.includes(
                          day
                        );
                      return (
                        <div key={day} className="flex items-center space-x-2">
                          <Switch
                            id={`day-${day}`}
                            checked={isChecked}
                            onCheckedChange={() => {
                              const newDays = isChecked
                                ? notificationSettings.doNotDisturbSchedule.days.filter(
                                    (d) => d !== day
                                  )
                                : [
                                    ...notificationSettings.doNotDisturbSchedule
                                      .days,
                                    day,
                                  ];

                              updateNotificationSettings({
                                doNotDisturbSchedule: {
                                  ...notificationSettings.doNotDisturbSchedule,
                                  days: newDays,
                                },
                              });
                            }}
                            disabled={
                              !notificationSettings.doNotDisturbSchedule.enabled
                            }
                          />
                          <Label htmlFor={`day-${day}`} className="text-sm">
                            {day.slice(0, 3)}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="p-4 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium">
                      Desktop Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Show notifications even when GrowthLab is in the
                      background
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium">Preview Messages</h3>
                    <p className="text-sm text-muted-foreground">
                      Show message content in notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-sm font-medium">
                      Sound for First Message Only
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Only play sound for the first message in a conversation
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  };

  // Render notification sound toggle
  const renderNotificationSoundToggle = () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            {notificationSettings.doNotDisturb ? (
              <Moon className="h-5 w-5" />
            ) : notificationSettings.muted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}

            {notificationSettings.doNotDisturb && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
              />
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-56">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Sound Settings</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotificationSettings(true)}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="flex items-center gap-2">
                <VolumeX className="h-4 w-4 text-muted-foreground" />
                <Slider
                  value={[notificationSettings.volume]}
                  max={1}
                  step={0.01}
                  onValueChange={(value) => setVolume(value[0])}
                  disabled={notificationSettings.muted}
                  className={cn(notificationSettings.muted && "opacity-50")}
                />
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="mute-toggle" className="text-sm">
                  Mute Sounds
                </Label>
                <Switch
                  id="mute-toggle"
                  checked={notificationSettings.muted}
                  onCheckedChange={toggleMute}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="dnd-toggle" className="text-sm">
                  Do Not Disturb
                </Label>
                <Switch
                  id="dnd-toggle"
                  checked={notificationSettings.doNotDisturb}
                  onCheckedChange={toggleDoNotDisturb}
                />
              </div>
            </div>

            <Button onClick={() => playSound("message")} className="w-full">
              <Bell className="mr-2 h-4 w-4" />
              Test Sound
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  // Render call interface
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const renderCallInterface = () => {
    if (!showCallInterface) return null;

    return (
      <div
        className={`fixed inset-0 z-50 bg-background flex flex-col ${
          isFullScreen
            ? "h-screen w-screen"
            : "h-[80vh] w-[80vw] max-w-4xl max-h-[600px] m-auto rounded-lg border shadow-lg"
        }`}
      >
        {/* Call header */}
        <div className="h-14 px-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-2">
            {callType === "video" ? (
              <Video className="h-5 w-5" />
            ) : (
              <Phone className="h-5 w-5" />
            )}
            <h2 className="text-lg font-semibold">
              {callParticipants[0]?.name || "Call"}
              {callParticipants.length > 1 && ` (${callParticipants.length})`}
            </h2>
            {isRecording && (
              <Badge
                variant="destructive"
                className="animate-pulse flex items-center gap-1"
              >
                <StopCircle className="h-3 w-3" />
                Recording {recordingTime > 0 && formatDuration(recordingTime)}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleFullScreen}>
              {isFullScreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Call content */}
        <div className="flex-1 flex">
          {/* Main call area */}
          <div className="flex-1 flex flex-col">
            {/* Video area */}
            <div className="flex-1 bg-gray-900 relative flex items-center justify-center">
              {callType === "video" ? (
                <div className="relative w-full h-full">
                  {/* Remote video (placeholder) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={callParticipants[0]?.avatar || "/placeholder.svg"}
                      alt={callParticipants[0]?.name || "Participant"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Self video (placeholder) */}
                  <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={callParticipants[0]?.avatar || "/placeholder.svg"}
                      alt={callParticipants[0]?.name || "Participant"}
                    />
                    <AvatarFallback>
                      {callParticipants[0]?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "?"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-medium">
                    {callParticipants[0]?.name || "Participant"}
                  </h3>
                  <p className="text-gray-400">
                    {callType === "video" ? "Video call" : "Audio call"}
                  </p>
                </div>
              )}
            </div>

            {/* Call controls */}
            <div className="py-4 px-6 border-t flex items-center justify-center gap-4 bg-background/95">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full shadow-sm"
              >
                <Mic className="h-5 w-5" />
              </Button>

              {callType === "video" && (
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-sm"
                >
                  <Video className="h-5 w-5" />
                </Button>
              )}

              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full"
              >
                <Volume2 className="h-5 w-5" />
              </Button>

              {/* Add Recording Button */}
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                className="h-12 w-12 rounded-full shadow-sm"
                onClick={toggleRecording}
              >
                {isRecording ? (
                  <StopCircle className="h-5 w-5" />
                ) : (
                  <MicSquare className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="destructive"
                size="icon"
                className="h-12 w-12 rounded-full"
                onClick={endCall}
              >
                <Phone className="h-5 w-5 rotate-135" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the messages tab content
  const renderMessagesTab = () => (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          "border-r flex flex-col overflow-hidden bg-background transition-all duration-300 ease-in-out z-20",
          sidebarOpen
            ? sidebarCollapsed
              ? "w-[72px] flex-shrink-0"
              : "w-[280px] flex-shrink-0 max-w-[75vw] md:max-w-[320px]"
            : "w-0 -translate-x-full",
          isMobile ? "absolute inset-y-0 left-0 shadow-lg h-full" : "relative"
        )}
      >
        {/* Sidebar header */}
        <div className="px-3 py-2 h-12 border-b flex items-center justify-between bg-background/95 backdrop-blur-sm">
          {!sidebarCollapsed ? (
            <h2 className="font-medium text-sm truncate">Messages</h2>
          ) : (
            <MessageSquare className="h-5 w-5 mx-auto" aria-hidden="true" />
          )}

          <div className="flex items-center gap-1">
            {!sidebarCollapsed && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPinnedOnly(!showPinnedOnly)}
                      className={cn(
                        "h-6 w-6 p-0 rounded-full",
                        showPinnedOnly ? "bg-muted text-primary" : ""
                      )}
                      aria-pressed={showPinnedOnly}
                      aria-label={
                        showPinnedOnly ? "Show all" : "Show pinned only"
                      }
                    >
                      <Star
                        className={cn(
                          "h-3.5 w-3.5",
                          showPinnedOnly ? "fill-primary/20 text-primary" : ""
                        )}
                        aria-hidden="true"
                      />
                      <VisuallyHidden>
                        {showPinnedOnly ? "Show all" : "Show pinned only"}
                      </VisuallyHidden>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {showPinnedOnly ? "Show all" : "Show pinned only"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {!isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="h-6 w-6 p-0 rounded-full"
                      aria-label={
                        sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                      }
                    >
                      {sidebarCollapsed ? (
                        <PanelRight
                          className="h-3.5 w-3.5"
                          aria-hidden="true"
                        />
                      ) : (
                        <PanelLeft className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      <VisuallyHidden>
                        {sidebarCollapsed
                          ? "Expand sidebar"
                          : "Collapse sidebar"}
                      </VisuallyHidden>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className="h-7 w-7 p-0 md:hidden"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        {/* Sidebar navigation */}
        {sidebarCollapsed ? (
          <div className="py-3 flex flex-col items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeView === "favorites" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setActiveView("favorites")}
                    aria-label="Favorites"
                    aria-pressed={activeView === "favorites"}
                  >
                    <Star
                      className={cn(
                        "h-5 w-5",
                        activeView === "favorites" ? "text-primary" : ""
                      )}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Favorites</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeView === "channels" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setActiveView("channels")}
                    aria-label="Channels"
                    aria-pressed={activeView === "channels"}
                  >
                    <Hash
                      className={cn(
                        "h-5 w-5",
                        activeView === "channels" ? "text-primary" : ""
                      )}
                      aria-hidden="true"
                    />
                    {getUnreadCount("channels") > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {getUnreadCount("channels")}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Channels</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeView === "direct" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setActiveView("direct")}
                    aria-label="Direct Messages"
                    aria-pressed={activeView === "direct"}
                  >
                    <MessageCircle
                      className={cn(
                        "h-5 w-5",
                        activeView === "direct" ? "text-primary" : ""
                      )}
                      aria-hidden="true"
                    />
                    {getUnreadCount("direct") > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                      >
                        {getUnreadCount("direct")}
                      </Badge>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Direct Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeView === "calls" ? "secondary" : "ghost"}
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={() => setActiveView("calls")}
                    aria-label="Calls"
                    aria-pressed={activeView === "calls"}
                  >
                    <Phone
                      className={cn(
                        "h-5 w-5",
                        activeView === "calls" ? "text-primary" : ""
                      )}
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Calls</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ) : (
          <>
            {/* Sidebar tabs */}
            <div className="p-1">
              <div className="flex justify-between gap-0.5">
                <Button
                  variant={activeView === "favorites" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-0.5 flex-1 min-w-0 text-[10px]"
                  onClick={() => setActiveView("favorites")}
                  aria-pressed={activeView === "favorites"}
                >
                  <Star
                    className="h-3 w-3 mr-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">Favs</span>
                </Button>
                <Button
                  variant={activeView === "channels" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-0.5 flex-1 min-w-0 text-[10px] relative"
                  onClick={() => setActiveView("channels")}
                  aria-pressed={activeView === "channels"}
                >
                  <Hash
                    className="h-3 w-3 mr-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">Chnls</span>
                  {getUnreadCount("channels") > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-3.5 w-3.5 p-0 flex items-center justify-center text-[8px]"
                    >
                      {getUnreadCount("channels")}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant={activeView === "direct" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-0.5 flex-1 min-w-0 text-[10px] relative"
                  onClick={() => setActiveView("direct")}
                  aria-pressed={activeView === "direct"}
                >
                  <MessageCircle
                    className="h-3 w-3 mr-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">DMs</span>
                  {getUnreadCount("direct") > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-3.5 w-3.5 p-0 flex items-center justify-center text-[8px]"
                    >
                      {getUnreadCount("direct")}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant={activeView === "calls" ? "secondary" : "ghost"}
                  size="sm"
                  className="h-8 px-0.5 flex-1 min-w-0 text-[10px]"
                  onClick={() => setActiveView("calls")}
                  aria-pressed={activeView === "calls"}
                >
                  <Phone
                    className="h-3 w-3 mr-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="truncate">Calls</span>
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="px-2 py-1 mb-1">
              <div className="relative">
                <Search
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  placeholder={`Search ${
                    activeView === "channels"
                      ? "channels"
                      : activeView === "direct"
                      ? "messages"
                      : activeView === "favorites"
                      ? "favorites"
                      : "calls"
                  }...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  className="pl-8 h-9 text-sm"
                  aria-label={`Search ${activeView}`}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Section Content */}
        {renderSidebarContent()}

        {/* User profile */}
        <div className="p-2 border-t mt-auto">
          <div className="flex items-center gap-2 rounded p-2 hover:bg-muted transition-colors">
            <Avatar
              className={cn(
                "flex-shrink-0",
                sidebarCollapsed ? "h-8 w-8 mx-auto" : "h-7 w-7"
              )}
            >
              <AvatarImage
                src={currentUser.avatar || "/placeholder.svg"}
                alt=""
              />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {!sidebarCollapsed && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {currentUser.name}
                  </p>
                  <div className="flex items-center">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-muted-foreground">
                      Online
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 rounded-full"
                      aria-label="User settings"
                    >
                      <Settings className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="flex items-center">
                      <PersonStanding
                        className="h-4 w-4 mr-2"
                        aria-hidden="true"
                      />
                      Profile settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center"
                      onClick={() => setShowNotificationSettings(true)}
                    >
                      <Bell className="h-4 w-4 mr-2" aria-hidden="true" />
                      Notification settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        setDensity(
                          density === "compact" ? "comfortable" : "compact"
                        )
                      }
                      className="flex items-center"
                    >
                      {density === "compact" ? (
                        <>
                          <PanelRight
                            className="h-4 w-4 mr-2"
                            aria-hidden="true"
                          />
                          Switch to comfortable
                        </>
                      ) : (
                        <>
                          <PanelLeft
                            className="h-4 w-4 mr-2"
                            aria-hidden="true"
                          />
                          Switch to compact
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center">
                      <HelpCircle className="h-4 w-4 mr-2" aria-hidden="true" />
                      Help & support
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Content header */}
        <div className="h-12 border-b flex items-center justify-between px-3 py-2 bg-background/95 backdrop-blur-sm min-w-0">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            {isMobile && !sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="h-7 w-7 p-0 mr-1 flex-shrink-0"
                aria-label="Open sidebar"
              >
                <Menu className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}

            {activeChannelDetails && (
              <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                <Hash
                  className="h-4 w-4 text-muted-foreground flex-shrink-0"
                  aria-hidden="true"
                />
                <h2 className="font-medium text-sm truncate">
                  {activeChannelDetails.name}
                </h2>
                <Badge
                  variant="outline"
                  className="ml-2 text-xs h-5 px-1.5 flex-shrink-0"
                >
                  <Users className="h-3 w-3 mr-1" aria-hidden="true" />
                  {activeChannelDetails.members}
                </Badge>
                <Badge
                  variant="outline"
                  className="hidden md:flex ml-1 text-xs h-5 px-1.5 flex-shrink-0"
                >
                  <Shield className="h-3 w-3 mr-1" aria-hidden="true" />
                  Encrypted
                </Badge>
              </div>
            )}

            {activeDirectMessageDetails && (
              <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                {activeDirectMessageDetails.isGroup ? (
                  <Users
                    className="h-4 w-4 text-muted-foreground flex-shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <Avatar className="h-6 w-6 flex-shrink-0">
                    <AvatarImage
                      src={
                        activeDirectMessageDetails.avatar || "/placeholder.svg"
                      }
                      alt=""
                    />
                    <AvatarFallback>
                      {activeDirectMessageDetails.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="min-w-0">
                  <h2 className="font-medium text-sm truncate">
                    {activeDirectMessageDetails.name}
                  </h2>
                  {!activeDirectMessageDetails.isGroup &&
                    activeDirectMessageDetails.status && (
                      <div className="flex items-center">
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full mr-1.5",
                            activeDirectMessageDetails.status === "online"
                              ? "bg-green-500"
                              : activeDirectMessageDetails.status === "away"
                              ? "bg-yellow-500"
                              : activeDirectMessageDetails.status === "busy"
                              ? "bg-red-500"
                              : "bg-gray-400"
                          )}
                          aria-hidden="true"
                        />
                        <span className="text-xs text-muted-foreground capitalize">
                          {activeDirectMessageDetails.status}
                        </span>
                      </div>
                    )}
                  {activeDirectMessageDetails.isGroup && (
                    <div className="flex items-center">
                      <span className="text-xs text-muted-foreground">
                        {activeDirectMessageDetails.members?.length} members
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {renderNotificationSoundToggle()}

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => startCall("audio")}
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    <VisuallyHidden>Start a call</VisuallyHidden>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start a call</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => startCall("video")}
                  >
                    <Video className="h-4 w-4" aria-hidden="true" />
                    <VisuallyHidden>Start a video call</VisuallyHidden>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Start a video call</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" aria-hidden="true" />
                    <VisuallyHidden>Search in conversation</VisuallyHidden>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search in conversation</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" aria-hidden="true" />
                    <VisuallyHidden>Conversation details</VisuallyHidden>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Conversation details</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Empty state or would contain messages */}
        <div className="flex-1 flex items-center justify-center p-4 w-full">
          <div className="text-center max-w-md w-full mx-auto">
            <div
              className="bg-muted/30 rounded-full p-4 inline-flex mx-auto mb-4"
              aria-hidden="true"
            >
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {activeChannel || activeDirectMessage
                ? "No messages yet"
                : "Select a conversation"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {activeChannel || activeDirectMessage
                ? "Start the conversation by sending a message"
                : "Choose a channel or direct message from the sidebar"}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-sm">
                <Shield className="h-4 w-4 mr-2" aria-hidden="true" />
                End-to-end encrypted
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Users className="h-4 w-4 mr-2" aria-hidden="true" />
                Private conversations
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Bookmark className="h-4 w-4 mr-2" aria-hidden="true" />
                Organized messages
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col h-full overflow-hidden bg-background border rounded-md shadow-sm max-h-[calc(100vh-2rem)] w-full",
        className
      )}
      style={
        {
          // Fluid typography scaling based on viewport width
          "--fluid-type-min": "0.875rem",
          "--fluid-type-max": "1rem",
          "--fluid-type-factor": "0.5vw",
          fontSize:
            "clamp(var(--fluid-type-min), calc(var(--fluid-type-min) + var(--fluid-type-factor)), var(--fluid-type-max))",
        } as React.CSSProperties
      }
    >
      {/* Main Tabs */}
      <Tabs
        value={currentTab}
        onValueChange={(value) =>
          handleTabChange(value as "messages" | "files")
        }
        className="w-full h-full flex flex-col"
      >
        <TabsList className="w-full px-1 pt-1 border-b">
          <TabsTrigger
            value="messages"
            className="flex-1 py-2 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            aria-label="Messages tab"
          >
            <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
            Messages
          </TabsTrigger>
          <TabsTrigger
            value="files"
            className="flex-1 py-2 data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            aria-label="Files tab"
          >
            <FileIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            Files
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="messages"
          className="flex-1 p-0 m-0 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
        >
          {renderMessagesTab()}
        </TabsContent>

        <TabsContent
          value="files"
          className="flex-1 p-0 m-0 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
        >
          <SecureFileSharing
            securityLevels={securityLevels}
            currentUser={currentUser}
          />
        </TabsContent>
      </Tabs>

      {/* Notification Settings Dialog */}
      {renderNotificationSettingsDialog()}

      {/* Call Interface */}
      {renderCallInterface()}
    </div>
  );
}
