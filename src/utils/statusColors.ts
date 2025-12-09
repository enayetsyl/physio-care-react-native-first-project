export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    upcoming: "#007AFF",
    completed: "#34C759",
    cancelled: "#FF3B30",
    "in-progress": "#FF9500",
    "not-started": "#8E8E93",
    open: "#34C759",
    closed: "#8E8E93",
    pending: "#FF9500",
  };

  return statusMap[status.toLowerCase()] || "#8E8E93";
};

export const getPriorityColor = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    high: "#FF3B30",
    medium: "#FF9500",
    low: "#34C759",
  };

  return priorityMap[priority.toLowerCase()] || "#8E8E93";
};
