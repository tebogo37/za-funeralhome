// app/get-help-now/page.tsx
'use client';

import { useState } from 'react';
import { saveLead } from '@/lib/leads';

export default function GetHelpNow() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    await saveLead({
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      suburb: formData.get('suburb') as string,
      serviceType: formData.get('serviceType') as string,
      budget: formData.get('budget') as string || undefined,
      message: formData.get('message') as string || undefined,
      source: 'get-help-now',
      url: window.location.href,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold mb-6">Thank You</h1>
        <p className="text-xl text-zinc-600 mb-10">
          Your request has been received.<br />
          A local funeral home will contact you shortly.
        </p>
        <a href="/" className="text-emerald-700 underline">Return to Homepage</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16" suppressHydrationWarning>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-semibold tracking-tight mb-6">Get Help Right Now</h1>
        <p className="text-xl text-zinc-600">We’ll connect you with suitable funeral homes in your area.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border p-10 space-y-8" suppressHydrationWarning>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input name="name" required className="w-full px-6 py-4 border rounded-2xl" placeholder="Thabo Mthembu" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input name="phone" type="tel" required className="w-full px-6 py-4 border rounded-2xl" placeholder="071 234 5678" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Suburb / Area</label>
          <input name="suburb" required className="w-full px-6 py-4 border rounded-2xl" placeholder="Soweto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Service Needed</label>
            <select name="serviceType" className="w-full px-6 py-4 border rounded-2xl">
              <option value="Burial">Burial</option>
              <option value="Cremation">Cremation</option>
              <option value="Repatriation">Repatriation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Approximate Budget</label>
            <select name="budget" className="w-full px-6 py-4 border rounded-2xl">
              <option value="">Any</option>
              <option value="Under R15,000">Under R15,000</option>
              <option value="R15,000 – R25,000">R15,000 – R25,000</option>
              <option value="R25,000 – R40,000">R25,000 – R40,000</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Information (Optional)</label>
          <textarea name="message" rows={4} className="w-full px-6 py-4 border rounded-3xl" placeholder="Need service within 48 hours..."></textarea>
        </div>

        <div className="bg-zinc-50 p-6 rounded-2xl text-sm">
          <label className="flex items-start gap-3">
            <input type="checkbox" defaultChecked className="mt-1" />
            <span>I consent to my information being shared with selected funeral homes. My data will be handled in accordance with POPIA.</span>
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-70 text-white py-5 rounded-2xl font-medium text-lg transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Request – Get Matched Within Minutes"}
        </button>
      </form>
    </div>
  );
}