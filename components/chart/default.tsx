'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { residencePayments } from '@/components/mock-data/mockData';
// --- 1. DATA PROCESSING ---

// Utility function to convert currency string to number (removes '$', ',', and parses)
const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
};

// Map the payment history into a chart data structure grouped by month
const processedChartData = residencePayments
  .flatMap(residence => residence.paymentHistory) // Flatten all payment history items
  .reduce((acc, item) => {
    const monthKey = item.month;
    const amount = parseCurrency(item.amountPaid);
    const status = item.status as 'Paid' | 'Pending' | 'Late' | 'Waived';

    // Find or create the monthly entry
    let monthEntry = acc.find(entry => entry.month === monthKey);
    if (!monthEntry) {
      monthEntry = { month: monthKey, Paid: 0, Pending: 0, Late: 0, Waived: 0 };
      acc.push(monthEntry);
    }

    // Accumulate the amount based on status
    monthEntry[status] += amount;

    return acc;
  }, [] as (Record<string, string | number> & { month: string, Paid: number, Pending: number, Late: number, Waived: number })[])
  .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()); // Sort chronologically

const chartData = processedChartData;

// --- 2. CONFIGURATION ---

const chartConfig = {
  Paid: {
    label: 'Paid',
    theme: {
      light: 'hsl(142 40% 45%)', // softer green
      dark: 'hsl(142 45% 55%)',
    },
  },
  Pending: {
    label: 'Pending',
    theme: {
      light: 'hsl(38 70% 55%)', // warm amber, less aggressive
      dark: 'hsl(38 65% 60%)',
    },
  },
  Late: {
    label: 'Late',
    theme: {
      light: 'hsl(0 65% 55%)', // muted red
      dark: 'hsl(0 70% 60%)',
    },
  },
  Waived: {
    label: 'Waived',
    theme: {
      light: 'hsl(217 65% 55%)', // calm blue
      dark: 'hsl(217 60% 65%)',
    },
  },
} satisfies ChartConfig;

// Get the keys for interaction
type ChartKey = keyof typeof chartConfig;


export default function ChartComponent() {
  const [activeChart, setActiveChart] = React.useState<ChartKey>('Paid');

  // --- 3. TOTALS CALCULATION ---
  const total = React.useMemo(
    () => {
      // Calculate total amount for each status across ALL months
      const totals: Record<ChartKey, number> = { Paid: 0, Pending: 0, Late: 0, Waived: 0 };

      chartData.forEach(month => {
        Object.keys(totals).forEach(key => {
          totals[key as ChartKey] += (month[key as ChartKey] as number);
        });
      });
      return totals;
    },
    [],
  );

  // Helper to format numbers as currency
  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'THB' });
  };

  // Get all available chart keys
  const chartKeys = Object.keys(chartConfig) as ChartKey[];

  // --- 4. RENDERING ---
  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Monthly Payment Summary</CardTitle>
          <CardDescription>Showing total revenue by payment status for all units</CardDescription>
        </div>
        <div className="flex">
          {chartKeys.map((key) => {
            return (
              <button
                key={key}
                data-active={activeChart === key}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(key)}
              >
                <span className="text-muted-foreground text-xs">{chartConfig[key].label}</span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {formatCurrency(total[key])}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              // Format the month key (e.g., '2025-09') to a short month name
              tickFormatter={(value) => {
                const [year, month] = value.split('-');
                const date = new Date(parseInt(year), parseInt(month) - 1);
                return date.toLocaleDateString('en-US', { month: 'short' });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: number) => formatCurrency(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="label"
                  labelFormatter={(value) => {
                    const [year, month] = String(value).split('-');
                    const date = new Date(parseInt(year), parseInt(month) - 1);
                    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                  }}
                  formatter={(value, name) => {
                    const numeric = typeof value === 'number' ? value : Number(value);
                    const labelKey = typeof name === 'string' ? (name as ChartKey) : (String(name) as ChartKey);
                    return [formatCurrency(numeric), chartConfig[labelKey].label as string];
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}