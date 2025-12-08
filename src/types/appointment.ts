export type SessionType = 'in-person' | 'online';

export interface Center {
  id: string;
  name: string;
  address: string;
  city: string;
}

export interface Consultant {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  centerId: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface DateSlot {
  date: string;
  dayName: string;
  dayNumber: string;
  month: string;
  slots: TimeSlot[];
}