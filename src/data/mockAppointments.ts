import { Center, Consultant, DateSlot } from '../types/appointment';

export const mockCenters: Center[] = [
  {
    id: '1',
    name: 'PhysioCare Central',
    address: '123 Healthcare Avenue',
    city: 'Mumbai'
  },
  {
    id: '2',
    name: 'PhysioCare West',
    address: '456 Wellness Street',
    city: 'Mumbai'
  },
  {
    id: '3',
    name: 'PhysioCare South',
    address: '789 Recovery Road',
    city: 'Mumbai'
  }
];

export const mockConsultants: Consultant[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Sports Physiotherapy',
    experience: '8 years',
    rating: 4.8,
    centerId: '1'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Orthopedic Physiotherapy',
    experience: '12 years',
    rating: 4.9,
    centerId: '1'
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    specialty: 'Neurological Physiotherapy',
    experience: '6 years',
    rating: 4.7,
    centerId: '2'
  },
  {
    id: '4',
    name: 'Dr. David Wilson',
    specialty: 'Sports Physiotherapy',
    experience: '10 years',
    rating: 4.6,
    centerId: '2'
  },
  {
    id: '5',
    name: 'Dr. Lisa Patel',
    specialty: 'Pediatric Physiotherapy',
    experience: '5 years',
    rating: 4.5,
    centerId: '3'
  }
];

// Mock available dates and time slots
export const mockDateSlots: DateSlot[] = [
  {
    date: '2024-12-10',
    dayName: 'Wed',
    dayNumber: '10',
    month: 'Dec',
    slots: [
      { id: '1', time: '09:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: false },
      { id: '3', time: '11:00 AM', available: true },
      { id: '4', time: '02:00 PM', available: true },
      { id: '5', time: '03:00 PM', available: false },
      { id: '6', time: '04:00 PM', available: true }
    ]
  },
  {
    date: '2024-12-11',
    dayName: 'Thu',
    dayNumber: '11',
    month: 'Dec',
    slots: [
      { id: '7', time: '09:00 AM', available: false },
      { id: '8', time: '10:00 AM', available: true },
      { id: '9', time: '11:00 AM', available: true },
      { id: '10', time: '02:00 PM', available: true },
      { id: '11', time: '03:00 PM', available: true },
      { id: '12', time: '04:00 PM', available: false }
    ]
  },
  {
    date: '2024-12-12',
    dayName: 'Fri',
    dayNumber: '12',
    month: 'Dec',
    slots: [
      { id: '13', time: '09:00 AM', available: true },
      { id: '14', time: '10:00 AM', available: true },
      { id: '15', time: '11:00 AM', available: false },
      { id: '16', time: '02:00 PM', available: true },
      { id: '17', time: '03:00 PM', available: true },
      { id: '18', time: '04:00 PM', available: true }
    ]
  }
];