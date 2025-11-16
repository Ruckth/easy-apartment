import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Home, MapPin, User } from "lucide-react";

export interface RoomPlan {
  id: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  price: number;
  unitsAvailable: number;
}

export interface Apartment {
  id: string;
  name: string;
  location: string;
  images: string[];
  roomPlans: RoomPlan[];
}

interface ApartmentCardProps {
  apartment: Apartment;
}

export default function ApartmentCard({ apartment }: ApartmentCardProps) {
  const { name, location, images = [], roomPlans = [] } = apartment;
  
  // Handle empty roomPlans array
  if (!roomPlans || roomPlans.length === 0) {
    return (
      <Card className="w-full mx-auto overflow-hidden">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">No room plans available</p>
        </CardContent>
      </Card>
    );
  }
  const totalUnitsAvailable = roomPlans.reduce((sum, plan) => sum + plan.unitsAvailable, 0);

  return (
    <Card className="w-full mx-auto overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {images && images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-48 w-full">
                  <img
                    src={image}
                    alt={`${name} - View ${index + 1}`}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>
        
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              totalUnitsAvailable > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {totalUnitsAvailable > 0 ? `${totalUnitsAvailable} units` : 'No units'}
          </span>
        </div>
      </div>

      <CardHeader className="p-2 ">
        <CardTitle className="text-lg font-bold text-gray-900">
          {name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0 space-y-2">
        {/* Location */}
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-sm ">{location}</span>
        </div>
        {/* Room Plans */}
        <div className="space-y-2 pt-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Available Floor Plans</h4>
          {roomPlans.map((plan) => (
            <div key={plan.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
              <div className="flex-1">
                <div className="flex items-center text-sm text-gray-700">
                  <Home className="h-3 w-3 mr-1" />
                  <span className="font-medium">{plan.name}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {plan.bedrooms} bed • {plan.bathrooms} bath • {plan.sqft} sq ft
                </div>
              </div>
              <div className="text-right ml-2">
                <div className="text-sm font-semibold text-gray-900">
                  ${plan.price.toLocaleString()}
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <User className="h-3 w-3 mr-1" />
                  <span>{plan.unitsAvailable} left</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}