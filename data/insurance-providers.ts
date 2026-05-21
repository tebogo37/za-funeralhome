// data/insurance-providers.ts
export type InsuranceProvider = {
  id: string;
  name: string;
  type: 'funeral' | 'life';
  monthlyFrom: number;
  maxCover: number;
  waitingPeriod: string;
  rating: number;
  bestFor: string;
  affiliateLink?: string;
  trackingCode: string;
};

export const insuranceProviders: InsuranceProvider[] = [
  {
    id: "ins-001",
    name: "Assupol",
    type: "funeral",
    monthlyFrom: 99,
    maxCover: 100000,
    waitingPeriod: "6 months",
    rating: 4.7,
    bestFor: "Affordable family funeral cover",
    trackingCode: "ASP-FUN-001",
  },
  {
    id: "ins-002",
    name: "Hollard",
    type: "funeral",
    monthlyFrom: 89,
    maxCover: 80000,
    waitingPeriod: "6 months",
    rating: 4.4,
    bestFor: "Budget funeral cover",
    trackingCode: "HOL-FUN-001",
  },
  {
    id: "ins-003",
    name: "Old Mutual",
    type: "life",
    monthlyFrom: 149,
    maxCover: 150000,
    waitingPeriod: "12 months",
    rating: 4.6,
    bestFor: "Life + Funeral bundle",
    trackingCode: "OML-LIF-001",
  },
  // Add more...
];