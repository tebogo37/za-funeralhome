// lib/offer-leads.ts
'use server';

import fs from 'fs';
import path from 'path';

const OFFERS_LEADS_FILE = path.join(process.cwd(), 'data', 'offer-leads.json');

export type OfferLead = {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  suburb: string;
  offerId: string;
  offerTitle: string;
  providerName: string;
  message?: string;
  status: 'new' | 'contacted';
};

export async function saveOfferLead(leadData: Omit<OfferLead, 'id' | 'timestamp' | 'status'>) {
  const lead: OfferLead = {
    ...leadData,
    id: 'offerlead_' + Date.now().toString(36),
    timestamp: new Date().toISOString(),
    status: 'new',
  };

  const dataDir = path.dirname(OFFERS_LEADS_FILE);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  let leads: OfferLead[] = [];
  if (fs.existsSync(OFFERS_LEADS_FILE)) {
    leads = JSON.parse(fs.readFileSync(OFFERS_LEADS_FILE, 'utf8'));
  }

  leads.unshift(lead);
  fs.writeFileSync(OFFERS_LEADS_FILE, JSON.stringify(leads, null, 2));

  console.log('✅ Offer Lead saved:', lead.id, 'for', lead.offerTitle);
  return lead;
}