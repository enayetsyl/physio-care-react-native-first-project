export interface ClinicalRecord {
  id: string;
  visitSummary: string;
  consultantName: string;
  centerName: string;
  date: string;
  treatmentPlan: string;
  clinicalFeedback: string;
  status: 'completed' | 'ongoing';
}