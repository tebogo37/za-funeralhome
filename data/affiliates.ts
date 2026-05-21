// data/affiliates.ts
export type AffiliateProgram = {
  id: string;
  company: string;
  category: string;
  commission: string;
  payoutType: string;
  network: string;
  link: string;
  notes: string;
};

export const affiliatePrograms: AffiliateProgram[] = [
  {
    id: "aff-001",
    company: "OfferForge",
    category: "Insurance & Funeral",
    commission: "CPA / Revenue Share",
    payoutType: "Weekly",
    network: "OfferForge",
    link: "https://offerforge.com",
    notes: "Multiple funeral & insurance offers available",
  },
  {
    id: "aff-002",
    company: "Assupol",
    category: "Funeral Cover",
    commission: "High CPA",
    payoutType: "Monthly",
    network: "Direct / OfferForge",
    link: "https://assupol.co.za",
    notes: "Strong funeral cover payouts",
  },
  // More can be added
];