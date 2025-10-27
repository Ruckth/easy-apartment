import { useMemo, useState } from 'react';
// import Link from 'next/link';
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
import { SquareMinus, SquarePlus, User } from 'lucide-react';

import { PaymentHistoryItem, ResidencePaymentData, residencePayments } from '@/components/mock-data/mockData';



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
  const [columnOrder, setColumnOrder] = useState<string[]>(['expand', 'unitNumber', 'tenantName', 'totalAmountPaid', 'currentStatus']);

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
        accessorKey: 'totalAmountPaid',
        id: 'totalAmountPaid',
        header: ({ column }) => <DataGridColumnHeader title="Total Paid" visibility={true} column={column} />,
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
