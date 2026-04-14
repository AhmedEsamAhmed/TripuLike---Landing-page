export type TravelType = 'Budget' | 'Mid' | 'Luxury'

export type PlannerItem = {
  id: string
  name: string
  location: string
  category: 'Activity Idea' | 'Experience Idea'
  providerServiceType: 'Tour Guide' | 'Activity Operator' | 'Driver / Airport Transfer' | 'Translator'
  durationHours: number
  cost: number
  image: string
  description: string
}

export type ServiceTypeOption = {
  id: 'tour-guide' | 'activity-operator' | 'driver-transfer' | 'translator'
  label: 'Tour Guide' | 'Activity Operator' | 'Driver / Airport Transfer' | 'Translator'
  icon: string
  detail: string
}

export const interestOptions = [
  'Food',
  'Nature',
  'Culture',
  'Shopping',
  'Adventure',
  'Family',
]

export const durationOptions = [3, 5, 7, 10]

export const serviceTypeOptions: ServiceTypeOption[] = [
  {
    id: 'tour-guide',
    label: 'Tour Guide',
    icon: '🧭',
    detail: 'Local guide for daily plans, context, and navigation support.',
  },
  {
    id: 'activity-operator',
    label: 'Activity Operator',
    icon: '🏄',
    detail: 'Operators for island trips, water adventures, and local experiences.',
  },
  {
    id: 'driver-transfer',
    label: 'Driver / Airport Transfer',
    icon: '🚐',
    detail: 'Airport pickup plus daily city transport based on your itinerary.',
  },
  {
    id: 'translator',
    label: 'Translator',
    icon: '🗣️',
    detail: 'Translation support for communication during selected activities.',
  },
]

export const plannerCatalog: PlannerItem[] = [
  {
    id: 'kl-photo-1',
    name: 'KL Photo Stop + City Walk',
    location: 'Kuala Lumpur',
    category: 'Activity Idea',
    providerServiceType: 'Tour Guide',
    durationHours: 2,
    cost: 80,
    image: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=800&q=80',
    description: 'Request a local guide to curate landmark photo stops and route timing.',
  },
  {
    id: 'kl-batu-1',
    name: 'Batu Caves Visit with Guided Route',
    location: 'Kuala Lumpur',
    category: 'Experience Idea',
    providerServiceType: 'Tour Guide',
    durationHours: 3,
    cost: 95,
    image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&w=800&q=80',
    description: 'Request a guided visit with temple context and efficient transfer timing.',
  },
  {
    id: 'kl-food-1',
    name: 'Street Food Night Trail',
    location: 'Kuala Lumpur',
    category: 'Experience Idea',
    providerServiceType: 'Tour Guide',
    durationHours: 3,
    cost: 65,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    description: 'Request a guide-led tasting route with flexible stops.',
  },
  {
    id: 'lang-island-1',
    name: 'Island Hopping Experience',
    location: 'Langkawi',
    category: 'Activity Idea',
    providerServiceType: 'Activity Operator',
    durationHours: 3,
    cost: 120,
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
    description: 'Request an operator for island timing, stops, and boat coordination.',
  },
  {
    id: 'lang-snorkel-1',
    name: 'Scuba / Snorkeling Experience',
    location: 'Langkawi',
    category: 'Experience Idea',
    providerServiceType: 'Activity Operator',
    durationHours: 4,
    cost: 150,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'Request a certified operator with equipment and safety support.',
  },
  {
    id: 'tioman-water-1',
    name: 'Water Adventure Day Plan',
    location: 'Tioman Island',
    category: 'Experience Idea',
    providerServiceType: 'Activity Operator',
    durationHours: 6,
    cost: 180,
    image: 'https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=800&q=80',
    description: 'Request multi-activity operator support for a full water adventure day.',
  },
  {
    id: 'pen-cultural-1',
    name: 'Cultural Tour with Local Context',
    location: 'Penang',
    category: 'Activity Idea',
    providerServiceType: 'Tour Guide',
    durationHours: 4,
    cost: 90,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    description: 'Request a curated cultural route with storytelling and local recommendations.',
  },
  {
    id: 'nature-day-1',
    name: 'Nature Day Trip',
    location: 'Cameron Highlands',
    category: 'Activity Idea',
    providerServiceType: 'Tour Guide',
    durationHours: 4,
    cost: 140,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    description: 'Request guide and route planning for a flexible nature-focused day.',
  },
  {
    id: 'airport-transfer-1',
    name: 'Airport Transfer Arrangement',
    location: 'Kuala Lumpur',
    category: 'Activity Idea',
    providerServiceType: 'Driver / Airport Transfer',
    durationHours: 1,
    cost: 55,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    description: 'Request pickup coordination, luggage support, and arrival timing coverage.',
  },
  {
    id: 'city-transport-1',
    name: 'Daily City Transport Plan',
    location: 'Kuala Lumpur',
    category: 'Experience Idea',
    providerServiceType: 'Driver / Airport Transfer',
    durationHours: 8,
    cost: 220,
    image: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=800&q=80',
    description: 'Request a daily driver plan aligned to activity timing and locations.',
  },
  {
    id: 'translator-1',
    name: 'On-Demand Trip Translator Support',
    location: 'Kuala Lumpur + Penang',
    category: 'Experience Idea',
    providerServiceType: 'Translator',
    durationHours: 4,
    cost: 130,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    description: 'Request translator support during bookings, activities, and provider coordination.',
  },
]

export const supplierOffers = [
  {
    id: 'offer-1',
    supplier: 'Azlan Local Guide Network',
    providerType: 'Tour Guide',
    adjustmentPercent: -12,
    perks: 'Private planning call and on-ground trip guidance',
  },
  {
    id: 'offer-2',
    supplier: 'BlueWave Activity Ops',
    providerType: 'Activity Operator',
    adjustmentPercent: -5,
    perks: 'Safety gear, flexible slots, and weather backup options',
  },
  {
    id: 'offer-3',
    supplier: 'DriveMate Malaysia',
    providerType: 'Driver / Airport Transfer',
    adjustmentPercent: 2,
    perks: 'Airport transfer and full-day transport coordination',
  },
  {
    id: 'offer-4',
    supplier: 'LinguaTrip Assist',
    providerType: 'Translator',
    adjustmentPercent: 4,
    perks: 'English-Arabic travel translation for activities and logistics',
  },
]
