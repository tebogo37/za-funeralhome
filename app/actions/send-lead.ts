// app/actions/send-lead.ts
'use server';

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

// Local file fallback — always save regardless of Supabase status
async function saveToFile(leadData: LeadData) {
  try {
    const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');
    const dataDir = path.dirname(LEADS_FILE);
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

    const lead = {
      ...leadData,
      id: 'lead_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    let leads: object[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        leads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
      } catch {
        leads = [];
      }
    }

    leads.unshift(lead);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log('✅ Lead saved to file:', lead.id);
    return lead;
  } catch (fileError) {
    console.error('❌ File save failed:', fileError);
    return null;
  }
}

// Supabase save — optional, gracefully degrades
async function saveToSupabase(leadData: LeadData): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase env vars not set — skipping Supabase save');
    return false;
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Supabase error:', response.status, errorText);
      return false;
    }

    console.log('✅ Lead saved to Supabase');
    return true;
  } catch (error) {
    console.error('❌ Supabase request failed:', error);
    return false;
  }
}

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
  if (!leadData.name || !leadData.phone) {
    console.error('❌ Missing required fields: name or phone');
    return { success: false, error: 'Missing required fields' };
  }

  // Always save to file as baseline
  const fileSave = await saveToFile(leadData);

  // Try Supabase (non-blocking fallback)
  const supabaseSaved = await saveToSupabase(leadData);

  // If neither worked, return failure
  if (!fileSave && !supabaseSaved) {
    console.error('❌ Both save methods failed');
    return { success: false, error: 'Could not save lead' };
  }

  // Send email notification (non-blocking)
  try {
    await sendLeadNotification(leadData);
  } catch (emailError) {
    // Don't fail the form submission if email fails
    console.error('❌ Email notification failed (non-fatal):', emailError);
  }

  return { success: true };
}