import { Session } from '../types/session';

export const mockSessions: Session[] = [
  {
    id: '1',
    date: '2024-12-15',
    time: '10:00 AM',
    type: 'In-Clinic',
    consultant: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Sports Physiotherapy'
    },
    center: {
      id: '1',
      name: 'PhysioCare Central'
    },
    status: 'upcoming',
    totalExercises: 8,
    completedExercises: 0,
    duration: '45 minutes',
    exercises: [
      { id: '1', name: 'Knee Extension', weight: '5kg', sets: 3, reps: 10 },
      { id: '2', name: 'Hamstring Stretch', duration: '30 seconds', sets: 3 },
      { id: '3', name: 'Quadriceps Strengthening', weight: '10kg', sets: 3, reps: 12 },
      { id: '4', name: 'Balance Training', duration: '5 minutes' },
      { id: '5', name: 'Calf Raises', sets: 3, reps: 15 },
      { id: '6', name: 'Step-ups', sets: 3, reps: 10 },
      { id: '7', name: 'Wall Sit', duration: '20 seconds', sets: 3 },
      { id: '8', name: 'Ice Application', duration: '10 minutes' }
    ]
  },
  {
    id: '2',
    date: '2024-12-10',
    time: '02:00 PM',
    type: 'Online',
    consultant: {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Orthopedic Physiotherapy'
    },
    status: 'completed',
    totalExercises: 6,
    completedExercises: 6,
    duration: '30 minutes',
    exercises: [
      { id: '9', name: 'Shoulder Rotations', sets: 3, reps: 12 },
      { id: '10', name: 'Neck Stretches', duration: '20 seconds', sets: 3 },
      { id: '11', name: 'Posture Correction', duration: '5 minutes' },
      { id: '12', name: 'Resistance Band Pulls', sets: 3, reps: 10 },
      { id: '13', name: 'Breathing Exercises', duration: '2 minutes' },
      { id: '14', name: 'Heat Therapy', duration: '10 minutes' }
    ],
    notes: 'Patient showed good improvement in range of motion'
  },
  {
    id: '3',
    date: '2024-12-08',
    time: '11:00 AM',
    type: 'In-Clinic',
    consultant: {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialty: 'Neurological Physiotherapy'
    },
    center: {
      id: '2',
      name: 'PhysioCare West'
    },
    status: 'completed',
    totalExercises: 5,
    completedExercises: 4,
    duration: '60 minutes',
    exercises: [
      { id: '15', name: 'Gait Training', duration: '15 minutes' },
      { id: '16', name: 'Balance Exercises', duration: '10 minutes' },
      { id: '17', name: 'Coordination Drills', sets: 3, reps: 8 },
      { id: '18', name: 'Strength Training', weight: '3kg', sets: 3, reps: 10 },
      { id: '19', name: 'Functional Mobility', duration: '15 minutes' }
    ]
  },
  {
    id: '4',
    date: '2024-11-28',
    time: '09:00 AM',
    type: 'In-Clinic',
    consultant: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'Sports Physiotherapy'
    },
    center: {
      id: '1',
      name: 'PhysioCare Central'
    },
    status: 'cancelled',
    totalExercises: 7,
    completedExercises: 0,
    duration: '45 minutes',
    exercises: [
      { id: '20', name: 'Warm-up Exercises', duration: '5 minutes' },
      { id: '21', name: 'Resistance Training', weight: '8kg', sets: 3, reps: 12 },
      { id: '22', name: 'Flexibility Work', duration: '10 minutes' },
      { id: '23', name: 'Core Strengthening', sets: 3, reps: 15 },
      { id: '24', name: 'Cool-down Stretches', duration: '5 minutes' }
    ],
    notes: 'Cancelled due to patient illness'
  },
  {
    id: '5',
    date: '2024-12-20',
    time: '03:00 PM',
    type: 'Online',
    consultant: {
      id: '4',
      name: 'Dr. David Wilson',
      specialty: 'Sports Physiotherapy'
    },
    status: 'upcoming',
    totalExercises: 4,
    completedExercises: 0,
    duration: '30 minutes',
    exercises: [
      { id: '25', name: 'Injury Assessment', duration: '5 minutes' },
      { id: '26', name: 'Rehabilitation Exercises', sets: 3, reps: 10 },
      { id: '27', name: 'Progress Evaluation', duration: '10 minutes' },
      { id: '28', name: 'Home Exercise Plan', duration: '5 minutes' }
    ]
  }
];