import { type VariantProps } from 'class-variance-authority';
import { Badge } from '@/components/ui/badge';

export interface PaymentHistoryItem {
  month: string; // e.g., '2025-01' (Year-Month)
  status: 'Paid' | 'Pending' | 'Late' | 'Waived';
  amountPaid: string; // The amount paid for the month (should match the monthlyRent in Data)
  paymentDate: string; // Date of payment (optional if Pending)
}

export interface ResidencePaymentData {
  id: string; // Unique ID for the residence/lease
  unitNumber: string; // Apartment unit number, e.g., '101'
  tenantName: string; // Name of the resident/customer
  tenantPhone: string; // Phone number of the resident (replaces customerEmail)
  tenantAvatar: string; // Tenant's avatar (retained)
  totalAmountPaid: string; // The total amount paid for the lease (Sum of paymentHistory[].amountPaid)
  currentStatus: {
    label: string; // Current status of the unit (e.g., 'Occupied', 'Vacant', 'Lease Ending')
    variant: VariantProps<typeof Badge>['variant']; // For UI styling
  };
  paymentHistory: PaymentHistoryItem[]; // Detailed monthly payment records
}

export const residencePayments: ResidencePaymentData[] = [
  {
    id: '1',
    unitNumber: '101',
    tenantName: 'John Smith',
    tenantPhone: '(555) 123-4567',
    tenantAvatar: '1.png',
    totalAmountPaid: '$4,500.00', // Calculated: $1,500 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'primary',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,500.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,500.00', paymentDate: '2025-10-02' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,500.00', paymentDate: '' },
    ],
  },
  {
    id: '2',
    unitNumber: '102',
    tenantName: 'Sarah Johnson',
    tenantPhone: '(555) 234-5678',
    tenantAvatar: '2.png',
    totalAmountPaid: '$3,750.00', // Calculated: $1,250 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'info',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Late', amountPaid: '$1,250.00', paymentDate: '2025-09-05' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,250.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,250.00', paymentDate: '' },
    ],
  },
  {
    id: '3',
    unitNumber: '103',
    tenantName: 'Mike Davis',
    tenantPhone: '(555) 345-6789',
    tenantAvatar: '3.png',
    totalAmountPaid: '$5,400.00', // Calculated: $1,800 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'success',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,800.00', paymentDate: '2025-08-30' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,800.00', paymentDate: '2025-09-28' },
      { month: '2025-11', status: 'Paid', amountPaid: '$1,800.00', paymentDate: '2025-10-31' },
    ],
  },
  {
    id: '4',
    unitNumber: '201',
    tenantName: 'Emily Wilson',
    tenantPhone: '(555) 456-7890',
    tenantAvatar: '4.png',
    totalAmountPaid: '$4,200.00', // Calculated: $1,400 * 3
    currentStatus: {
      label: 'Vacant',
      variant: 'destructive',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Waived', amountPaid: '$1,400.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Waived', amountPaid: '$1,400.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Waived', amountPaid: '$1,400.00', paymentDate: '2025-11-01' },
    ],
  },
  {
    id: '5',
    unitNumber: '202',
    tenantName: 'David Brown',
    tenantPhone: '(555) 567-8901',
    tenantAvatar: '5.png',
    totalAmountPaid: '$3,300.00', // Calculated: $1,100 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'warning',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Pending', amountPaid: '$1,100.00', paymentDate: '' },
      { month: '2025-10', status: 'Late', amountPaid: '$1,100.00', paymentDate: '2025-10-04' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,100.00', paymentDate: '' },
    ],
  },
  {
    id: '6',
    unitNumber: '203',
    tenantName: 'Lisa Anderson',
    tenantPhone: '(555) 678-9012',
    tenantAvatar: '6.png',
    totalAmountPaid: '$4,050.00', // Calculated: $1,350 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'primary',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,350.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,350.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Late', amountPaid: '$1,350.00', paymentDate: '2025-11-03' },
    ],
  },
  {
    id: '7',
    unitNumber: '301',
    tenantName: 'Robert Taylor',
    tenantPhone: '(555) 789-0123',
    tenantAvatar: '7.png',
    totalAmountPaid: '$4,950.00', // Calculated: $1,650 * 3
    currentStatus: {
      label: 'Lease Ending',
      variant: 'info',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,650.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Pending', amountPaid: '$1,650.00', paymentDate: '' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,650.00', paymentDate: '' },
    ],
  },
  {
    id: '8',
    unitNumber: '302',
    tenantName: 'Jennifer Martinez',
    tenantPhone: '(555) 890-1234',
    tenantAvatar: '8.png',
    totalAmountPaid: '$3,150.00', // Calculated: $1,050 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'success',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,050.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,050.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Paid', amountPaid: '$1,050.00', paymentDate: '2025-11-01' },
    ],
  },
  {
    id: '9',
    unitNumber: '303',
    tenantName: 'Christopher Lee',
    tenantPhone: '(555) 901-2345',
    tenantAvatar: '9.png',
    totalAmountPaid: '$3,600.00', // Calculated: $1,200 * 3
    currentStatus: {
      label: 'Vacant',
      variant: 'destructive',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Waived', amountPaid: '$1,200.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Waived', amountPaid: '$1,200.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Waived', amountPaid: '$1,200.00', paymentDate: '2025-11-01' },
    ],
  },
  {
    id: '10',
    unitNumber: '401',
    tenantName: 'Amanda White',
    tenantPhone: '(555) 012-3456',
    tenantAvatar: '10.png',
    totalAmountPaid: '$5,100.00', // Calculated: $1,700 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'warning',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Late', amountPaid: '$1,700.00', paymentDate: '2025-09-06' },
      { month: '2025-10', status: 'Pending', amountPaid: '$1,700.00', paymentDate: '' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,700.00', paymentDate: '' },
    ],
  },
  {
    id: '11',
    unitNumber: '402',
    tenantName: 'Michael Garcia',
    tenantPhone: '(555) 111-2222',
    tenantAvatar: '11.png',
    totalAmountPaid: '$4,350.00', // Calculated: $1,450 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'primary',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,450.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,450.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Paid', amountPaid: '$1,450.00', paymentDate: '2025-11-01' },
    ],
  },
  {
    id: '12',
    unitNumber: '403',
    tenantName: 'Jessica Thompson',
    tenantPhone: '(555) 333-4444',
    tenantAvatar: '12.png',
    totalAmountPaid: '$3,450.00', // Calculated: $1,150 * 3
    currentStatus: {
      label: 'Lease Ending',
      variant: 'info',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,150.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,150.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,150.00', paymentDate: '' },
    ],
  },
  {
    id: '13',
    unitNumber: '501',
    tenantName: 'Daniel Rodriguez',
    tenantPhone: '(555) 555-6666',
    tenantAvatar: '13.png',
    totalAmountPaid: '$3,900.00', // Calculated: $1,300 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'success',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,300.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Paid', amountPaid: '$1,300.00', paymentDate: '2025-10-01' },
      { month: '2025-11', status: 'Paid', amountPaid: '$1,300.00', paymentDate: '2025-11-01' },
    ],
  },
  {
    id: '14',
    unitNumber: '502',
    tenantName: 'Ashley Clark',
    tenantPhone: '(555) 777-8888',
    tenantAvatar: '14.png',
    totalAmountPaid: '$4,650.00', // Calculated: $1,550 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'primary',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Paid', amountPaid: '$1,550.00', paymentDate: '2025-09-01' },
      { month: '2025-10', status: 'Late', amountPaid: '$1,550.00', paymentDate: '2025-10-05' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,550.00', paymentDate: '' },
    ],
  },
  {
    id: '15',
    unitNumber: '503',
    tenantName: 'Kevin Wilson',
    tenantPhone: '(555) 999-0000',
    tenantAvatar: '15.png',
    totalAmountPaid: '$3,000.00', // Calculated: $1,000 * 3
    currentStatus: {
      label: 'Occupied',
      variant: 'warning',
    },
    paymentHistory: [
      { month: '2025-09', status: 'Pending', amountPaid: '$1,000.00', paymentDate: '' },
      { month: '2025-10', status: 'Pending', amountPaid: '$1,000.00', paymentDate: '' },
      { month: '2025-11', status: 'Pending', amountPaid: '$1,000.00', paymentDate: '' },
    ],
  },
];


