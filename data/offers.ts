// data/offers.ts
export type Offer = {
  id: string;
  slug: string;
  title: string;
  providerName: string;
  providerSuburb: string;
  description: string;
  shortDescription: string;
  discount: string;
  validUntil: string;
  buttonText: string;
  imageUrl: string;
  isPremium: boolean;
};

export const offers: Offer[] = [
  {
    id: "offer-001",
    slug: "r2000-off-burial-packages",
    title: "R2,000 Off All Burial Packages",
    providerName: "Thabong Funeral Services",
    providerSuburb: "Soweto",
    description: "Exclusive R2,000 discount on all burial packages for families in Soweto, Diepkloof, Orlando West and surrounding areas. Includes basic coffin, transport within 50km, and tent & chairs.",
    shortDescription: "Valid for families in Soweto, Diepkloof & Orlando West",
    discount: "R2,000 Off",
    validUntil: "30 June 2026",
    buttonText: "Claim This Offer",
    imageUrl: "https://picsum.photos/id/1015/600/400",
    isPremium: true,
  },
  {
    id: "offer-002",
    slug: "free-transport-cremation",
    title: "Free Transport within 50km",
    providerName: "Martin's Funerals",
    providerSuburb: "Johannesburg",
    description: "Get free body transport within 50km radius on all cremation packages this month. Professional service with full support.",
    shortDescription: "On all cremation packages this month",
    discount: "Free Transport",
    validUntil: "31 May 2026",
    buttonText: "Claim This Benefit",
    imageUrl: "https://picsum.photos/id/107/600/400",
    isPremium: true,
  },
  {
    id: "offer-003",
    slug: "full-package-tombstone-discount",
    title: "Full Package + Tombstone Discount",
    providerName: "S3 Funeral Services",
    providerSuburb: "Soweto",
    description: "R3,500 discount when you book a complete funeral package including tombstone. Best value in Soweto.",
    shortDescription: "R3,500 discount on complete service",
    discount: "R3,500 Off",
    validUntil: "15 June 2026",
    buttonText: "View Premium Offer",
    imageUrl: "https://picsum.photos/id/201/600/400",
    isPremium: true,
  },
];