// app/funeral-homes/[province]/[city]/[slug]/page.tsx
import { funeralHomes, type FuneralHome } from '@/data/funeral-homes';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import ProfileSidebar from '@/components/funeral/ProfileSidebar';

interface Props {
  params: Promise<{ 
    province: string; 
    city: string; 
    slug: string 
  }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const home = funeralHomes.find(h => h.slug === resolvedParams.slug);
  
  if (!home) {
    return { title: 'Funeral Home Not Found | LastRespect' };
  }

  return {
    title: `${home.name} - Funeral Services in ${home.suburb}, ${home.city}`,
    description: `${home.shortDescription} Burial from R${home.startingBurialPrice}. Verified funeral home in ${home.city}, Gauteng.`,
  };
}

export default async function FuneralHomeProfile({ params }: Props) {
  const resolvedParams = await params;
  const { province, city, slug } = resolvedParams;

  const home = funeralHomes.find(h => h.slug === slug);

  if (!home) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold mb-4">Funeral Home Not Found</h1>
        <p className="text-zinc-600 mb-8">The funeral home you are looking for could not be found.</p>
        <Link 
          href={`/funeral-homes/${province}/${city}`}
          className="text-emerald-700 underline"
        >
          ← Back to {city} funeral homes
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Back Button */}
      <Link 
        href={`/funeral-homes/${province}/${city}`}
        className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 mb-8"
      >
        ← Back to {city} funeral homes
      </Link>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8">
          <div className="relative rounded-3xl overflow-hidden mb-8">
                <Image 
                    src={home.imageUrl} 
                    alt={home.name} 
                    width={1200} 
                    height={600} 
                    className="w-full h-auto object-cover"
                    priority
                />

                {/* Verified Badge - only when claimed */}
                {home.isClaimed && (
                    <div className="absolute top-6 right-6 bg-emerald-600 text-white px-5 py-2 rounded-full font-medium flex items-center gap-2">
                    <span>✓ Verified</span>
                    </div>
                )}

                {/* Claim Now Badge - when NOT claimed */}
                {!home.isClaimed && (
                    <div className="absolute top-6 right-6 bg-amber-500 text-white px-5 py-2 rounded-full font-medium flex items-center gap-2">
                    Claim This Listing
                    </div>
                )}
                </div>

          <h1 className="text-4xl font-semibold tracking-tight mb-2">{home.name}</h1>
          <p className="text-zinc-500 text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" /> {home.suburb}, {home.city}, {home.province}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-xl font-medium">{home.rating}</span>
            <span className="text-zinc-500">({home.reviewCount} reviews)</span>
          </div>

          <div className="mt-8 prose max-w-none text-zinc-700">
            <p className="text-lg leading-relaxed">{home.shortDescription}</p>
            <p className="mt-6">
              Established for {home.yearsInBusiness} years, {home.name} has been serving families in {home.suburb} and surrounding areas with dignity and care.
            </p>
          </div>

          {/* Services */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Services Offered</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {home.services.map((service, index) => (
                <div key={index} className="bg-white border rounded-2xl px-6 py-4 text-sm font-medium">
                  {service}
                </div>
              ))}
            </div>
          </div>

          {/* Memberships */}
          {home.memberships.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Memberships &amp; Affiliations</h2>
              <div className="flex gap-3">
                {home.memberships.map((m, i) => (
                  <span key={i} className="bg-emerald-100 text-emerald-800 px-5 py-2 rounded-full text-sm font-medium">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <ProfileSidebar home={home} />
        </div>
      </div>

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": home.name,
            "description": home.shortDescription,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": home.address,
              "addressLocality": home.suburb,
              "addressRegion": home.city,
              "addressCountry": "ZA"
            },
            "telephone": home.phone,
            "url": `https://yourdomain.com/funeral-homes/gauteng/${home.city.toLowerCase()}/${home.slug}`,
            "priceRange": `R${home.startingBurialPrice}`,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": home.rating,
              "reviewCount": home.reviewCount
            }
          })
        }}
      />
    </div>
  );
}