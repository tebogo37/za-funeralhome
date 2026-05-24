// app/get-help-now/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { saveLeadAndNotify } from '@/app/actions/send-lead';

export default function GetHelpNow() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('source', 'get-help-now');
      formData.append('url', window.location.href);

      const result = await saveLeadAndNotify(formData);

      if (result.success) {
        setSubmitted(true);
        // After successful save
          if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
              event: 'lead_form_submit',
              form_source: 'get-help-now',
              suburb: formData.get('suburb'),
              service_type: formData.get('serviceType'),
            });
          }

      } else {
        setError('Something went wrong. Please try again or call us directly.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Network error. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Thank You</h1>
        <p className="text-lg sm:text-xl text-zinc-600 mb-10">
          Your request has been received.<br />
          A local funeral home will contact you shortly.
        </p>
        <Link href="/" className="text-emerald-700 underline text-base">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4 sm:mb-6">
          Get Help Right Now
        </h1>
        <p className="text-lg sm:text-xl text-zinc-600">
          Well connect you with suitable funeral homes in your area.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border p-6 sm:p-10 space-y-6">
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              name="name"
              required
              className="w-full px-5 py-3.5 border rounded-2xl focus:outline-none focus:border-emerald-600 text-base"
              placeholder="Thabo Mthembu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              name="phone"
              type="tel"
              required
              className="w-full px-5 py-3.5 border rounded-2xl focus:outline-none focus:border-emerald-600 text-base"
              placeholder="071 234 5678"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Suburb / Area</label>
          <input
            name="suburb"
            required
            className="w-full px-5 py-3.5 border rounded-2xl focus:outline-none focus:border-emerald-600 text-base"
            placeholder="Soweto"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Service Needed</label>
            <select
              name="serviceType"
              className="w-full px-5 py-3.5 border rounded-2xl focus:outline-none focus:border-emerald-600 text-base bg-white"
            >
              <option value="Burial">Burial</option>
              <option value="Cremation">Cremation</option>
              <option value="Repatriation">Repatriation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Approximate Budget</label>
            <select
              name="budget"
              className="w-full px-5 py-3.5 border rounded-2xl focus:outline-none focus:border-emerald-600 text-base bg-white"
            >
              <option value="">Any</option>
              <option value="Under R15,000">Under R15,000</option>
              <option value="R15,000 – R25,000">R15,000 – R25,000</option>
              <option value="R25,000 – R40,000">R25,000 – R40,000</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Additional Information (Optional)</label>
          <textarea
            name="message"
            rows={4}
            className="w-full px-5 py-3.5 border rounded-3xl focus:outline-none focus:border-emerald-600 text-base"
            placeholder="Need service within 48 hours..."
          />
        </div>

        <div className="bg-zinc-50 p-5 rounded-2xl text-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 flex-shrink-0" />
            <span className="text-zinc-600">
              I consent to my information being shared with selected funeral homes. My data will be handled
              in accordance with POPIA.
            </span>
          </label>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 sm:py-5 rounded-2xl font-medium text-base sm:text-lg transition"
        >
          {isSubmitting
            ? 'Submitting...'
            : 'Submit Request – Get Matched Within Minutes'}
        </button>

        {/* Fallback contact */}
        <p className="text-center text-sm text-zinc-500">
          Or call us directly:{' '}
          <a href="tel:0112345678" className="text-emerald-700 font-medium hover:underline">
            011 234 5678
          </a>
        </p>
      </form>
    </div>
  );
}