export interface Goal {
  id: string;
  name: string;
  duration: string; // e.g., "6 weeks"
  type: string; // e.g., "Strength", "Flexibility"
  progress: number; // 0-100 percentage
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'completed';
  targetDate?: string;
  lastUpdated?: string;
  current?: number;
  target?: number;
  unit?: string; // e.g., "kg", "degrees"
  latestAchievement?: string;
}

export type GoalTabType = 'active' | 'completed';