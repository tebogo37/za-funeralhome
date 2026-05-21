// components/funeral/FuneralHomeCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, MessageCircle, AlertCircle } from 'lucide-react';
import { FuneralHome } from '@/data/funeral-homes';

interface FuneralHomeCardProps {
  home: FuneralHome;
  province: string;
  city: string;
}

export default function FuneralHomeCard({ home, province, city }: FuneralHomeCardProps) {
  return (
    <Link 
      href={`/funeral-homes/${province.toLowerCase()}/${city.toLowerCase()}/${home.slug}`}
      className="group bg-white rounded-3xl overflow-hidden border hover:shadow-xl transition-all hover:-translate-y-1 block"
    >
      <div className="relative">
        <Image 
          src={home.imageUrl} 
          alt={home.name} 
          width={600} 
          height={300} 
          className="w-full h-56 object-cover"
        />
        
        {/* Badges Container - Stacked Top Right */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
          
          {/* Premium Badge (on top) */}
          {home.promoted && (
            <div className="bg-amber-500 text-white text-xs px-4 py-1 rounded-full font-medium shadow">
              Premium
            </div>
          )}

          {/* Verified Badge */}
          {home.isClaimed && (
            <div className="bg-emerald-600 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 shadow">
              ✓ Verified
            </div>
          )}

          {/* Claim Now Badge */}
          {!home.isClaimed && (
            <div className="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1 shadow">
              <AlertCircle className="w-3 h-3" />
              Claim Now
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-xl group-hover:text-emerald-700 transition-colors">{home.name}</h3>
        <p className="text-zinc-500 flex items-center gap-1 mt-1">
          <MapPin className="w-4 h-4" /> {home.suburb}
        </p>

        <div className="flex items-center gap-1 mt-4 text-amber-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
          <span className="text-zinc-600 text-sm ml-2">
            {home.rating} ({home.reviewCount})
          </span>
        </div>

        <div className="mt-5 text-emerald-700 font-semibold text-lg">
          Burial from R{home.startingBurialPrice.toLocaleString('en-ZA')}
        </div>

        <div className="mt-4 text-xs">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert(`Claiming ${home.name}...`);
            }}
            className="text-emerald-700 hover:underline font-medium"
          >
            Claim this listing →
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = `tel:${home.phone}`;
            }}
            className="flex-1 text-center border border-zinc-300 hover:border-zinc-400 py-3 rounded-2xl text-sm font-medium transition"
          >
            Call Now
          </button>

          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(`https://wa.me/${home.whatsapp.replace(/\D/g, '')}`, '_blank');
            }}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </button>
        </div>
      </div>
    </Link>
  );
}