import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataGrid, DataGridContainer } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import type { VariantProps } from 'class-variance-authority';
import { SquareMinus, SquarePlus, User } from 'lucide-react';

interface PaymentHistoryItem {
  month: string; // e.g., '2025-01' (Year-Month)
  status: 'Paid' | 'Pending' | 'Late' | 'Waived';
  amountPaid: string; // The amount paid for the month (should match the monthlyRent in Data)
  paymentDate: string; // Date of payment (optional if Pending)
}

interface ResidencePaymentData {
  id: string; // Unique ID for the residence/lease
  unitNumber: string; // Apartment unit number, e.g., '101'
  tenantName: string; // Name of the resident/customer
  tenantPhone: string; // Phone number of the resident (replaces customerEmail)
  tenantAvatar: string; // Tenant's avatar (retained)
  monthlyRent: string; // The standard monthly rent amount
  currentStatus: {
    label: string; // Current status of the unit (e.g., 'Occupied', 'Vacant', 'Lease Ending')
    variant: VariantProps<typeof Badge>['variant']; // For UI styling
  };
  paymentHistory: PaymentHistoryItem[]; // Detailed monthly payment records
}

const residencePayments: ResidencePaymentData[] = [
  {
    id: '1',
    unitNumber: '101',
    tenantName: 'John Smith',
    tenantPhone: '(555) 123-4567',
    tenantAvatar: '1.png',
    monthlyRent: '$1,500.00',
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
    monthlyRent: '$1,250.00',
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
    monthlyRent: '$1,800.00',
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
    monthlyRent: '$1,400.00',
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
    monthlyRent: '$1,100.00',
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
    monthlyRent: '$1,350.00',
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
    monthlyRent: '$1,650.00',
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
    monthlyRent: '$1,050.00',
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
    monthlyRent: '$1,200.00',
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
    monthlyRent: '$1,700.00',
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
    monthlyRent: '$1,450.00',
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
    monthlyRent: '$1,150.00',
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
    monthlyRent: '$1,300.00',
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
    monthlyRent: '$1,550.00',
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
    monthlyRent: '$1,000.00',
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

// Sub-table component for order items
function PaymentHistorySubTable({ items }: { items: PaymentHistoryItem[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5, // Show 5 items per page for sub-tables
  });

  // Columns now reflect PaymentHistoryItem structure
  const columns = useMemo<ColumnDef<PaymentHistoryItem>[]>(
    () => [
      {
        accessorKey: 'month',
        header: ({ column }) => <DataGridColumnHeader title="Month" column={column} />,
        cell: (info) => info.getValue() as string,
        enableSorting: true,
        size: 150,
      },
      {
        accessorKey: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Status" column={column} />,
        // Using Badge for status visualization, assuming the status values map to badge colors
        cell: (info) => {
          const status = info.getValue() as PaymentHistoryItem['status'];
          let variant: 'primary' | 'success' | 'warning' | 'destructive' = 'primary';
          if (status === 'Paid') variant = 'success';
          else if (status === 'Late') variant = 'destructive';
          else if (status === 'Pending') variant = 'warning';
          
          return (
            <Badge variant={variant} appearance="light">
              {status}
            </Badge>
          );
        },
        enableSorting: true,
        size: 150,
      },
      {
        accessorKey: 'amountPaid',
        header: ({ column }) => <DataGridColumnHeader title="Amount Paid" column={column} />,
        cell: (info) => info.getValue() as string,
        enableSorting: true,
        size: 150,  
      },
      {
        accessorKey: 'paymentDate',
        header: ({ column }) => <DataGridColumnHeader title="Payment Date" column={column} />,
        cell: (info) => info.getValue() as string,
        enableSorting: true,
        size: 150,
      },
    ],
    [],
  );

  const table = useReactTable({
    data: items,
    columns,
    pageCount: Math.ceil(items.length / pagination.pageSize),
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // Correctly use 'month' as the unique ID for payment history items
    getRowId: (row: PaymentHistoryItem) => row.month,
  });

  return (
    <div className="bg-muted/30 p-4">
      <DataGrid
        table={table}
        recordCount={items.length}
        tableLayout={{
          cellBorder: true,
          rowBorder: true,
          headerBackground: true,
          headerBorder: true,
        }}
      >
        <div className="w-full space-y-2.5">
          <div className="bg-card rounded-lg border border-muted-foreground/20">
            <DataGridContainer>
              <ScrollArea>
                <DataGridTable />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </DataGridContainer>
          </div>
          <DataGridPagination className="pb-1.5" />
        </div>
      </DataGrid>
    </div>
  );
}

// --- END OF FIXED SUB-TABLE COMPONENT ---

// --- START OF FIXED MAIN TABLE COMPONENT ---

export default function DataGridDemo() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expandedRows, setExpandedRows] = useState<ExpandedState>({});
  // Updated default column order to reflect new fields
  const [columnOrder, setColumnOrder] = useState<string[]>(['expand', 'unitNumber', 'tenantName', 'monthlyRent', 'currentStatus']);

  // Columns now reflect ResidencePaymentData structure
  const columns = useMemo<ColumnDef<ResidencePaymentData>[]>(
    () => [
      {
        id: 'expand',
        header: () => null,
        cell: ({ row }) => {
          return row.getCanExpand() ? (
            <Button onClick={row.getToggleExpandedHandler()} mode="icon" size="sm" variant="ghost">
              {row.getIsExpanded() ? <SquareMinus /> : <SquarePlus />}
            </Button>
          ) : null;
        },
        size: 25,
        enableResizing: false,
        meta: {
          // Pass the correct prop (paymentHistory) to the fixed sub-table component
          expandedContent: (row: ResidencePaymentData) => <PaymentHistorySubTable items={row.paymentHistory} />,
        },
      },
      {
        accessorKey: 'unitNumber',
        id: 'unitNumber',
        header: ({ column }) => <DataGridColumnHeader title="Unit" visibility={true} column={column} />,
        cell: (info) => info.getValue() as string,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        size: 100,
      },
      {
        accessorKey: 'tenantName',
        id: 'tenantName',
        header: ({ column }) => <DataGridColumnHeader title="Tenant" visibility={true} column={column} />,
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-8">
                <AvatarImage src={`/media/avatars/${row.original.tenantAvatar}`} alt={row.original.tenantName} />
                <AvatarFallback>{row.original.tenantName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-px">
                <div className="font-medium text-foreground">{row.original.tenantName}</div>
                {/* Use tenantPhone instead of customerEmail */}
                <div className="text-muted-foreground">{row.original.tenantPhone}</div>
              </div>
            </div>
          );
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        size: 200,
      },
      {
        accessorKey: 'paymentHistory',
        id: 'paymentHistoryCount',
        header: ({ column }) => <DataGridColumnHeader title="Payments" visibility={true} column={column} />,
        cell: ({ row }) => {
          const paymentHistory = row.original.paymentHistory;
          const historyCount = paymentHistory.length;
          return (
            <div
              className="text-sm font-medium text-foreground hover:text-primary cursor-pointer"
              onClick={() => row.getToggleExpandedHandler()()}
            >
              {historyCount} {historyCount === 1 ? 'month' : 'months'}
            </div>
          );
        },
        enableSorting: false, // Sorting by count is often less useful
        enableHiding: true,
        enableResizing: true,
        size: 120,
      },
      {
        accessorKey: 'monthlyRent',
        id: 'monthlyRent',
        header: ({ column }) => <DataGridColumnHeader title="Monthly Rent" visibility={true} column={column} />,
        cell: (info) => info.getValue() as string,
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        size: 130,
      },
      {
        accessorKey: 'currentStatus',
        id: 'currentStatus',
        header: ({ column }) => <DataGridColumnHeader title="Unit Status" visibility={true} column={column} />,
        cell: ({ row }) => {
          const status = row.original.currentStatus;
          return (
            <Badge variant={status.variant} appearance="light">
              {status.label}
            </Badge>
          );
        },
        enableSorting: true,
        enableHiding: true,
        enableResizing: true,
        size: 150,
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    // Use the new data array: residencePayments
    data: residencePayments,
    pageCount: Math.ceil((residencePayments?.length || 0) / pagination.pageSize),
    // Correct the row type for the main table
    getRowId: (row: ResidencePaymentData) => row.id,
    // Correct the check for row expansion to use paymentHistory
    getRowCanExpand: (row) => Boolean(row.original.paymentHistory && row.original.paymentHistory.length > 0),
    state: {
      pagination,
      sorting,
      expanded: expandedRows,
      columnOrder,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onExpandedChange: setExpandedRows,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    // Keep other row models
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={residencePayments?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsResizable: true,
        columnsMovable: true,
        columnsVisibility: true,
      }}
    >
      <div className="w-full space-y-2.5">
        <DataGridContainer>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </DataGridContainer>
        <DataGridPagination />
      </div>
    </DataGrid>
  );
}
