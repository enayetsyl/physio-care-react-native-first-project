export type SessionStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Exercise {
  id: string;
  name: string;
  weight?: string;
  sets?: number;
  reps?: number;
  duration?: string;
}

export interface Session {
  id: string;
  date: string; // ISO date string
  time: string; // e.g., "10:00 AM"
  type: 'In-Clinic' | 'Online';
  consultant: {
    id: string;
    name: string;
    specialty: string;
  };
  center?: {
    id: string;
    name: string;
  };
  status: SessionStatus;
  totalExercises: number;
  completedExercises: number;
  duration: string; // e.g., "45 minutes"
  exercises: Exercise[];
  notes?: string;
}