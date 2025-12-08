import { ChatConversation, SupportTicket } from "../types/support";

export const mockChatConversations: ChatConversation[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    lastMessage: "Please continue your exercises as prescribed",
    timestamp: "2024-12-08T14:30:00Z",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "PhysioCare Support",
    lastMessage: "Your appointment has been confirmed for tomorrow",
    timestamp: "2024-12-07T09:15:00Z",
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Dr. Michael Chen",
    lastMessage: "How are you feeling after the session?",
    timestamp: "2024-12-06T16:45:00Z",
    unreadCount: 1,
  },
  {
    id: "4",
    name: "Appointment Team",
    lastMessage: "Reminder: Your session is scheduled for today at 2 PM",
    timestamp: "2024-12-05T11:20:00Z",
    unreadCount: 0,
  },
];

export const mockSupportTickets: SupportTicket[] = [
  {
    id: "1",
    title: "Scheduling Physiotherapy",
    status: "closed",
    createdAt: "2024-11-15T10:00:00Z",
    updatedAt: "2024-11-20T14:30:00Z",
    category: "Appointments",
    priority: "medium",
  },
  {
    id: "2",
    title: "Cancelling Appointment",
    status: "open",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-08T11:15:00Z",
    category: "Appointments",
    priority: "high",
  },
  {
    id: "3",
    title: "Tips for Regimen List",
    status: "pending",
    createdAt: "2024-11-28T16:00:00Z",
    updatedAt: "2024-12-03T13:45:00Z",
    category: "Exercises",
    priority: "low",
  },
];
