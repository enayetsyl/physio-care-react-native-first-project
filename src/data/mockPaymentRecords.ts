import { PaymentMethod, PaymentTransaction } from '../types/payment';

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    last4: '4321',
    bankName: 'HDFC Bank',
    isDefault: true,
  },
  {
    id: '2',
    type: 'upi',
    upiId: 'user@paytm',
    isDefault: false,
  },
  {
    id: '3',
    type: 'debit',
    last4: '8765',
    bankName: 'ICICI Bank',
    isDefault: false,
  },
];

export const mockPaymentTransactions: PaymentTransaction[] = [
  {
    id: '1',
    date: '2024-11-15',
    amount: 2500,
    description: 'Physiotherapy Session - Dr. Sarah Johnson',
    paymentMethod: 'Credit Card ****4321',
    status: 'success',
    type: 'debit',
  },
  {
    id: '2',
    date: '2024-11-10',
    amount: 100,
    description: 'Appointment Booking Fee',
    paymentMethod: 'UPI - user@paytm',
    status: 'success',
    type: 'debit',
  },
  {
    id: '3',
    date: '2024-11-05',
    amount: 2000,
    description: 'Physiotherapy Package - 5 Sessions',
    paymentMethod: 'Credit Card ****4321',
    status: 'success',
    type: 'debit',
  },
  {
    id: '4',
    date: '2024-10-28',
    amount: 1800,
    description: 'Consultation Fee - Dr. Mike Chen',
    paymentMethod: 'Debit Card ****8765',
    status: 'success',
    type: 'debit',
  },
];