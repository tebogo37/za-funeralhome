// lib/leads.ts
'use server';

import fs from 'fs';
import path from 'path';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

export type Lead = {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  suburb: string;
  serviceType: string;
  budget?: string;
  message?: string;
  source: string;
  url: string;
  trackingCode?: string;
  funeralHomeName?: string;
  status: 'new' | 'routed' | 'contacted';
};

export async function saveLead(leadData: Omit<Lead, 'id' | 'timestamp' | 'status'>): Promise<Lead> {
  const lead: Lead = {
    ...leadData,
    id: 'lead_' + Date.now().toString(36) + Math.random().toString(36).substr(2),
    timestamp: new Date().toISOString(),
    status: 'new',
  };

  // Ensure directory exists
  const dataDir = path.dirname(LEADS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  let leads: Lead[] = [];
  if (fs.existsSync(LEADS_FILE)) {
    const fileContent = fs.readFileSync(LEADS_FILE, 'utf8');
    leads = JSON.parse(fileContent);
  }

  leads.unshift(lead); // Newest first

  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));

  console.log('✅ Lead saved:', lead.id, 'Source:', lead.source);
  return lead;
}