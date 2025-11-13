export interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  isGroup: boolean;
  topic?: string;
  updatedAt: string;
  isArchived?: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  replyTo?: {
    sender: string;
    content: string;
  };
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  company?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  lastActive?: Date;
}

export type ConversationTopic = 'general' | 'business' | 'mentorship' | 'investment' | 'custom';

export interface ConnectionRequest {
  id: string;
  from: User;
  to: User;
  message: string;
  topic: ConversationTopic;
  customTopic?: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}
