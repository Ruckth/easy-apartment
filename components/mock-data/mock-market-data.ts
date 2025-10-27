import { type Apartment } from "../card/apartment-card";

export const mockApartments: Apartment[] = [
  {
    id: '1',
    name: 'Modern Downtown Loft',
    location: 'Downtown, New York City',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    ],
    roomPlans: [
      {
        id: '1a',
        name: '1BR Loft',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 800,
        price: 2800,
        unitsAvailable: 3
      },
      {
        id: '1b',
        name: '2BR Loft',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        price: 3200,
        unitsAvailable: 1
      }
    ]
  },
  {
    id: '2',
    name: 'Brooklyn Heights Residence',
    location: 'Brooklyn Heights, Brooklyn',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'
    ],
    roomPlans: [
      {
        id: '2a',
        name: 'Studio',
        bedrooms: 0,
        bathrooms: 1,
        sqft: 500,
        price: 1900,
        unitsAvailable: 2
      },
      {
        id: '2b',
        name: 'Junior 1BR',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 650,
        price: 2100,
        unitsAvailable: 4
      }
    ]
  },
  {
    id: '3',
    name: 'Luxury Penthouse Suite',
    location: 'Upper East Side, Manhattan',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=400&h=300&fit=crop'
    ],
    roomPlans: [
      {
        id: '3a',
        name: '2BR Penthouse',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1800,
        price: 7500,
        unitsAvailable: 0
      },
      {
        id: '3b',
        name: '3BR Penthouse',
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2500,
        price: 8500,
        unitsAvailable: 0
      }
    ]
  },
  {
    id: '4',
    name: 'Park Slope Garden Apartments',
    location: 'Park Slope, Brooklyn',
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&h=300&fit=crop'
    ],
    roomPlans: [
      {
        id: '4a',
        name: '1BR Garden',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 750,
        price: 2600,
        unitsAvailable: 2
      },
      {
        id: '4b',
        name: '1BR Duplex',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 900,
        price: 2800,
        unitsAvailable: 1
      }
    ]
  },
  {
    id: '5',
    name: 'DUMBO Warehouse Conversion',
    location: 'DUMBO, Brooklyn',
    images: [
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    ],
    roomPlans: [
      {
        id: '5a',
        name: '1BR Industrial',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 1000,
        price: 3500,
        unitsAvailable: 3
      },
      {
        id: '5b',
        name: '2BR Industrial',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1600,
        price: 4200,
        unitsAvailable: 2
      },
      {
        id: '5c',
        name: '2BR Loft',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1800,
        price: 4800,
        unitsAvailable: 1
      }
    ]
  },
  {
    id: '6',
    name: 'Midtown West High-Rise',
    location: 'Midtown West, Manhattan',
    images: [
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    ],
    roomPlans: [
      {
        id: '6a',
        name: 'Studio Plus',
        bedrooms: 0,
        bathrooms: 1,
        sqft: 600,
        price: 3200,
        unitsAvailable: 0
      },
      {
        id: '6b',
        name: '1BR High-Rise',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 900,
        price: 4500,
        unitsAvailable: 0
      },
      {
        id: '6c',
        name: '2BR High-Rise',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1400,
        price: 5600,
        unitsAvailable: 0
      }
    ]
  }
];