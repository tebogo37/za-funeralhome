// app/actions/send-lead.ts
'use server';

import { supabase } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';
import fs from 'fs';
import path from 'path';

type LeadData = {
  name: string;
  phone: string;
  suburb: string;
  service_type?: string;
  budget?: string;
  message?: string | null;
  source: string;
  url?: string;
  funeral_home_name?: string;
  offer_title?: string;
  tracking_code?: string;
};

export async function saveLeadAndNotify(formData: FormData) {
  const leadData: LeadData = {
    name: (formData.get('name') as string)?.trim() || '',
    phone: (formData.get('phone') as string)?.trim() || '',
    suburb: (formData.get('suburb') as string)?.trim() || '',
    service_type: (formData.get('serviceType') as string) || undefined,
    budget: (formData.get('budget') as string) || undefined,
    message: (formData.get('message') as string) || null,
    source: (formData.get('source') as string) || 'unknown',
    url: (formData.get('url') as string) || undefined,
    funeral_home_name: (formData.get('funeral_home_name') as string) || undefined,
    offer_title: (formData.get('offer_title') as string) || undefined,
    tracking_code: (formData.get('tracking_code') as string) || undefined,
  };

  // Validate required fields
  if (!leadData.name || !leadData.phone || !leadData.suburb) {
    console.error('❌ Missing required fields: name, phone or suburb');
    return { success: false, error: 'Missing required fields' };
  }

  // 1. Save to Supabase
  const { error: supabaseError } = await supabase.from('leads').insert([leadData]);

  if (supabaseError) {
    console.error('Supabase Error:', supabaseError);
  } else {
    console.log('✅ Lead saved to Supabase');
  }

  // 2. Save to Local File (Backup)
  try {
    const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');
    const dataDir = path.dirname(LEADS_FILE);

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    let leads: LeadData[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
      } catch {
        leads = [];
      }
    }

    const leadWithMeta = {
      ...leadData,
      id: 'lead_' + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      status: 'new' as const,
    };

    leads.unshift(leadWithMeta);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log('✅ Lead saved to local file');
  } catch (fileError) {
    console.error('❌ Local file save failed:', fileError);
  }

  // 3. Send Email via Brevo
  await sendLeadNotification(leadData);

  return { success: true };
}