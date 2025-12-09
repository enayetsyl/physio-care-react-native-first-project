export interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit' | 'upi' | 'netbanking';
  last4?: string;
  bankName?: string;
  upiId?: string;
  isDefault: boolean;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  status: 'success' | 'pending' | 'failed';
  type: 'credit' | 'debit';
}