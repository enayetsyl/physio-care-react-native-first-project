import { ClinicalRecord } from '../types/clinical';

export const mockClinicalRecords: ClinicalRecord[] = [
  {
    id: '1',
    visitSummary: 'Initial consultation for knee pain',
    consultantName: 'Dr. Sarah Johnson',
    centerName: 'City Physiotherapy Center',
    date: '2024-10-15',
    treatmentPlan: 'Strength training and flexibility exercises for 6 weeks',
    clinicalFeedback: 'Patient shows good progress with knee extension exercises',
    status: 'completed',
  },
  {
    id: '2',
    visitSummary: 'Follow-up for shoulder rehabilitation',
    consultantName: 'Dr. Mike Chen',
    centerName: 'Sports Medicine Clinic',
    date: '2024-11-01',
    treatmentPlan: 'Rotator cuff strengthening and posture correction',
    clinicalFeedback: 'Ongoing treatment with positive response to therapy',
    status: 'ongoing',
  },
  {
    id: '3',
    visitSummary: 'Back pain assessment',
    consultantName: 'Dr. Priya Sharma',
    centerName: 'Wellness Physiotherapy',
    date: '2024-09-20',
    treatmentPlan: 'Core strengthening and ergonomic advice',
    clinicalFeedback: 'Patient reported 60% reduction in pain levels',
    status: 'completed',
  },
];