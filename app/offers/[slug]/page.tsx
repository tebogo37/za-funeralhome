// app/offers/[slug]/page.tsx
import { offers } from '@/data/offers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import ClaimOfferButton from '@/components/offers/ClaimOfferButton';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const offer = offers.find(o => o.slug === slug);
  if (!offer) return { title: 'Offer Not Found' };

  return {
    title: `${offer.title} | SA Funeral Homes`,
    description: offer.description,
  };
}

export default async function OfferDetail({ params }: Props) {
  const { slug } = await params;
  const offer = offers.find(o => o.slug === slug);

  if (!offer) notFound();

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/offers" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to All Offers
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-96">
            <Image src={offer.imageUrl} alt={offer.title} fill className="object-cover" />
            {offer.isPremium && (
              <div className="absolute top-8 right-8 bg-amber-500 text-white px-6 py-2 rounded-full font-medium">
                Premium Offer
              </div>
            )}
          </div>

          <div className="p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl font-bold">
                {offer.providerName[0]}
              </div>
              <div>
                <p className="font-semibold text-2xl">{offer.providerName}</p>
                <p className="text-emerald-600">{offer.providerSuburb}</p>
              </div>
            </div>

            <h1 className="text-4xl font-semibold tracking-tighter mb-6">{offer.title}</h1>
            
            <div className="flex items-center gap-6 text-sm mb-10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Valid until {offer.validUntil}
              </div>
              <div className="text-emerald-600 font-medium">{offer.discount}</div>
            </div>

            <div className="prose max-w-none text-zinc-700 text-lg leading-relaxed mb-12">
              {offer.description}
            </div>

            <ClaimOfferButton offer={offer} />
          </div>
        </div>
      </div>
    </div>
  );
}