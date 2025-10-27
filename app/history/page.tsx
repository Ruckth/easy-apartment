'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SubDataGrid from '@/components/data-grid/sub-data-grid';
import ChartComponent from '@/components/chart/default';

export default function CustomerHistory() {
  return (
    <div className="p-6 mx-auto">
      {/* Header section */}
      <div className="relative flex flex-col items-center justify-center mb-4">
        {/* Centered Title */}
        <h1 className="text-2xl font-semibold text-center">
          Customer History
        </h1>

        {/* Left-aligned Back button */}
        <div className="absolute left-0">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Payment Summary</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Overview of recent payments, statuses, and trends.
            </p>
            <ChartComponent />
          </div>
        </TabsContent>

        <TabsContent value="table">
          <div className="rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Payment Details</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed records of each month’s transactions.
            </p>
            <SubDataGrid />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
