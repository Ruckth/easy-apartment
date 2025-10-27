'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockApartments } from '@/components/mock-data/mock-market-data';
import ApartmentCard from '@/components/card/apartment-card';


export default function Market() {
    const totalApartments = mockApartments.length;
    const totalUnits = mockApartments.reduce(
        (sum, apt) => sum + apt.roomPlans.reduce((planSum, plan) => planSum + plan.unitsAvailable, 0),
        0
    );

    return (
        <div className="container mx-auto p-6">
            <div className="relative flex flex-col items-center justify-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-center">Find Your Perfect Apartment</h1>
                <p className="text-muted-foreground mt-2 text-center max-w-2xl">
                    Discover amazing apartments in the heart of New York City. From cozy studios to luxury penthouses, find your next home today.
                </p>
                <div className="absolute left-0">
                    <Link href="/">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6 text-sm text-muted-foreground">
                <span>{totalApartments} listings</span>
                <span>•</span>
                <span>{totalUnits} units available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-3">
                {mockApartments.map((apartment) => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                ))}
            </div>
        </div>
    );
}