// app/actions/send-lead.ts
'use server';

import { supabase } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';

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
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    suburb: formData.get('suburb') as string,
    service_type: formData.get('serviceType') as string || undefined,
    budget: formData.get('budget') as string || undefined,
    message: formData.get('message') as string | null,
    source: formData.get('source') as string || 'unknown',
    url: formData.get('url') as string || undefined,
    funeral_home_name: formData.get('funeral_home_name') as string || undefined,
    offer_title: formData.get('offer_title') as string || undefined,
    tracking_code: formData.get('tracking_code') as string || undefined,
  };

  // Save to Supabase
  const { error } = await supabase.from('leads').insert([leadData]);

  if (error) {
    console.error('Supabase error:', error);
    return { success: false };
  }

  // Send email
  await sendLeadNotification(leadData);

  return { success: true };
}