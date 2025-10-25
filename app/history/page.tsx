'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SubDataGrid from '@/components/data-grid/sub-data-grid';

export default function History() {
    return (
        <div className="p-6 mx-auto">
            {/* Header section */}
            <div className="relative flex items-center justify-center mb-4">
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



            {/* Data grid */}
            <SubDataGrid />
        </div>
    );
}