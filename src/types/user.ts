export interface User {
  id?: string;
  name: string;
  mobile: string;
  email: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  weight?: number;
  height?: number;
  bloodGroup?: string;
}