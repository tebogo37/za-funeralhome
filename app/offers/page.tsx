// app/offers/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';
import { offers } from '@/data/offers';

export async function generateMetadata() {
  return {
    title: 'Premium Offers & Deals | SA Funeral Homes',
    description: 'Exclusive discounts and special offers from trusted funeral homes across South Africa.',
  };
}

    // After loading the offer
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
       event: 'offers_viewed',
  offer_count: offers.length
      });

      }

export default function OffersPage() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold tracking-tighter text-emerald-950 mb-6">
            Premium Offers & Deals
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Exclusive discounts and special packages from trusted funeral homes across South Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Link 
              key={offer.id}
              href={`/offers/${offer.slug}`}
              className="group bg-white border border-zinc-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <div className="relative h-64">
                <Image 
                  src={offer.imageUrl} 
                  alt={offer.title} 
                  fill 
                  className="object-cover transition-transform group-hover:scale-105 duration-500"
                />
                {offer.isPremium && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs px-4 py-1.5 rounded-full font-medium">
                    Premium Offer
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-xl font-bold">
                    {offer.providerName[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{offer.providerName}</p>
                    <p className="text-sm text-emerald-600">{offer.providerSuburb}</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-3 group-hover:text-emerald-700 transition">{offer.title}</h3>
                <p className="text-zinc-600 mb-6 line-clamp-3">{offer.shortDescription}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-rose-600 font-medium">Valid until {offer.validUntil}</div>
                  <div className="text-emerald-700 font-medium flex items-center gap-1 group-hover:gap-2 transition">
                    View Offer <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}