// components/funeral/ProfileSidebar.tsx
'use client';

import { useState } from 'react';
import { Phone, MessageCircle, Star } from 'lucide-react';
import { FuneralHome } from '@/data/funeral-homes';
import { saveLead } from '@/lib/leads';

interface ProfileSidebarProps {
  home: FuneralHome;
}

export default function ProfileSidebar({ home }: ProfileSidebarProps) {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      source: 'single-profile-quote',
      url: window.location.href,
      funeralHomeName: home.name,
      trackingCode: home.trackingCode,
    });

    setIsSubmitting(false);
    alert(`Thank you! Your quote request has been sent to ${home.name}. They will contact you shortly.`);
    setShowQuoteModal(false);
  };

  return (
    <div className="bg-white border rounded-3xl p-8 sticky top-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {home.isClaimed && (
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium">
            ✓ Verified
          </div>
        )}
        {!home.isClaimed && (
          <button className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-amber-200 transition">
            Claim This Listing
          </button>
        )}
        {home.promoted && (
          <div className="inline-flex items-center gap-1.5 bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            Premium
          </div>
        )}
      </div>

      <h3 className="font-semibold text-xl mb-6">Get In Touch</h3>

      <div className="space-y-4">
        {home.promoted && (
          <>
            <a href={`tel:${home.phone}`} className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-zinc-50 transition">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <div className="font-medium">Call Now</div>
                <div className="text-emerald-700">{home.phone}</div>
              </div>
            </a>

            <a href={`https://wa.me/${home.whatsapp.replace(/\D/g, '')}`} target="_blank" className="flex items-center gap-4 p-4 bg-emerald-700 text-white rounded-2xl hover:bg-emerald-800 transition">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium">WhatsApp</div>
                <div>{home.whatsapp}</div>
              </div>
            </a>
          </>
        )}

        <button 
          onClick={() => setShowQuoteModal(true)}
          className="w-full mt-4 bg-emerald-700 hover:bg-emerald-800 text-white py-4 rounded-2xl font-medium transition text-lg"
        >
          Get Personalized Quote
        </button>
      </div>

      {/* Pricing */}
      <div className="mt-10 pt-8 border-t">
        <h4 className="font-semibold mb-4">Pricing Starts From</h4>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-zinc-500">Burial Package</div>
            <div className="text-3xl font-semibold text-emerald-700">
              R{home.startingBurialPrice.toLocaleString('en-ZA')}
            </div>
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-semibold">Get Personalized Quote</h2>
                  <p className="text-zinc-600 mt-1">From <strong>{home.name}</strong></p>
                </div>
                <button 
                  onClick={() => setShowQuoteModal(false)}
                  className="text-4xl leading-none text-zinc-400 hover:text-zinc-600"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Your Name</label>
                  <input name="name" required className="w-full px-6 py-4 border rounded-2xl" placeholder="Thabo Mthembu" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Phone Number</label>
                  <input name="phone" type="tel" required className="w-full px-6 py-4 border rounded-2xl" placeholder="071 234 5678" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Suburb / Area</label>
                  <input name="suburb" required className="w-full px-6 py-4 border rounded-2xl" placeholder="Soweto" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Service Needed</label>
                    <select name="serviceType" className="w-full px-6 py-4 border rounded-2xl">
                      <option value="Burial">Burial</option>
                      <option value="Cremation">Cremation</option>
                      <option value="Repatriation">Repatriation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Approximate Budget</label>
                    <select name="budget" className="w-full px-6 py-4 border rounded-2xl">
                      <option value="">Any</option>
                      <option value="Under R15,000">Under R15,000</option>
                      <option value="R15,000 – R25,000">R15,000 – R25,000</option>
                      <option value="R25,000 – R40,000">R25,000 – R40,000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Additional Information (Optional)</label>
                  <textarea name="message" rows={4} className="w-full px-6 py-4 border rounded-3xl" placeholder="Need service within 48 hours..."></textarea>
                </div>

                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 text-sm">
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
          </div>
        </div>
      )}
    </div>
  );
}