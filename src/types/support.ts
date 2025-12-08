export interface ChatConversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  avatar?: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: "open" | "closed" | "pending";
  createdAt: string;
  updatedAt: string;
  category: string;
  priority: "low" | "medium" | "high";
}

export type SupportActionType = "chat" | "video" | "tickets";
