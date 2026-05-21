// components/offers/ClaimOfferButton.tsx
'use client';

import { useState } from 'react';
import { Offer } from '@/data/offers';
import { saveOfferLead } from '@/lib/offer-leads';

interface ClaimOfferButtonProps {
  offer: Offer;
}

export default function ClaimOfferButton({ offer }: ClaimOfferButtonProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    await saveOfferLead({
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      suburb: formData.get('suburb') as string,
      offerId: offer.id,
      offerTitle: offer.title,
      providerName: offer.providerName,
      message: formData.get('message') as string || undefined,
    });

    setIsSubmitting(false);
    alert(`Thank you! Your claim for "${offer.title}" has been received. ${offer.providerName} will contact you shortly.`);
    setShowForm(false);
  };

  return (
    <>
      <button 
        onClick={() => setShowForm(true)}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-6 rounded-2xl font-medium text-xl transition"
      >
        Claim This Benefit
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-semibold">Claim This Offer</h2>
                  <p className="text-zinc-600 mt-1">{offer.title}</p>
                </div>
                <button onClick={() => setShowForm(false)} className="text-4xl text-zinc-400">×</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input name="name" required placeholder="Your Full Name" className="w-full px-6 py-4 border rounded-2xl" />
                <input name="phone" type="tel" required placeholder="Phone Number" className="w-full px-6 py-4 border rounded-2xl" />
                <input name="suburb" required placeholder="Your Suburb" className="w-full px-6 py-4 border rounded-2xl" />
                
                <textarea name="message" rows={4} placeholder="Any special request..." className="w-full px-6 py-4 border rounded-3xl" />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl font-medium text-lg"
                >
                  {isSubmitting ? "Submitting..." : "Claim This Offer"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}