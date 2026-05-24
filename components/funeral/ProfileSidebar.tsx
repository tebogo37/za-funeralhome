// components/funeral/ProfileSidebar.tsx
'use client';

import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { FuneralHome } from '@/data/funeral-homes';
import { saveLeadAndNotify } from '@/app/actions/send-lead';

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
    formData.append('source', 'single-profile-quote');
    formData.append('url', window.location.href);
    formData.append('funeral_home_name', home.name);
    formData.append('tracking_code', home.trackingCode || '');

    const result = await saveLeadAndNotify(formData);

    if (result.success) {
      alert(`Thank you! Your quote request has been sent to ${home.name}.`);
      setShowQuoteModal(false);
      // After successful save
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'quote_request',
            funeral_home: home.name,
            service_type: formData.get('serviceType'),
          });
        }
    } else {
      alert("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="bg-white border rounded-3xl p-8 sticky top-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {home.isClaimed && <div className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium">✓ Verified</div>}
        {home.promoted && <div className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">Premium</div>}
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
                <button onClick={() => setShowQuoteModal(false)} className="text-4xl text-zinc-400 hover:text-black">×</button>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <input name="name" required placeholder="Your Full Name" className="w-full px-6 py-4 border rounded-2xl" />
                <input name="phone" type="tel" required placeholder="Phone Number" className="w-full px-6 py-4 border rounded-2xl" />
                <input name="suburb" required placeholder="Your Suburb" className="w-full px-6 py-4 border rounded-2xl" />
                
                <select name="serviceType" className="w-full px-6 py-4 border rounded-2xl">
                  <option value="Burial">Burial</option>
                  <option value="Cremation">Cremation</option>
                  <option value="Repatriation">Repatriation</option>
                </select>

                <select name="budget" className="w-full px-6 py-4 border rounded-2xl">
                  <option value="">Any Budget</option>
                  <option value="Under R15,000">Under R15,000</option>
                  <option value="R15,000 – R25,000">R15,000 – R25,000</option>
                  <option value="R25,000 – R40,000">R25,000 – R40,000</option>
                </select>

                <textarea name="message" rows={4} placeholder="Any special request..." className="w-full px-6 py-4 border rounded-3xl" />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl font-medium text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}