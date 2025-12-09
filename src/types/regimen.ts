export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: string;
  instructions: string;
}

export interface Regimen {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed';
  totalExercises: number;
  completedExercises: number;
  startDate?: string;
  endDate?: string;
  exercises: Exercise[];
}

export type RegimenTabType = 'not-started' | 'in-progress' | 'completed';