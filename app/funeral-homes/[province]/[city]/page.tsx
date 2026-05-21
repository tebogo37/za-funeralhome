// app/funeral-homes/[province]/[city]/page.tsx
import { funeralHomes, type FuneralHome } from '@/data/funeral-homes';
import Link from 'next/link';
import Filters from '@/components/funeral/Filters';
import FuneralHomeCard from '@/components/funeral/FuneralHomeCard';

interface Props {
  params: Promise<{ province: string; city: string }>;
  searchParams: Promise<{ 
    minPrice?: string; 
    verified?: string;
    promoted?: string;
    featured?: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const cityName = resolvedParams.city.charAt(0).toUpperCase() + resolvedParams.city.slice(1);
  
  return {
    title: `Funeral Homes in ${cityName}, ${resolvedParams.province} | LastRespect`,
    description: `Find verified and promoted funeral homes in ${cityName}.`,
  };
}

export default async function LocationPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const { province, city } = resolvedParams;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  const minPrice = resolvedSearchParams.minPrice ? parseInt(resolvedSearchParams.minPrice) : undefined;
  const verifiedOnly = resolvedSearchParams.verified === 'true';
  const promotedOnly = resolvedSearchParams.promoted === 'true';
  const featuredOnly = resolvedSearchParams.featured === 'true';

  // Base filter: match province + (city OR suburb) - made more forgiving
  let filteredHomes: FuneralHome[] = funeralHomes.filter((home) => {
    const homeProvince = home.province.trim().toLowerCase();
    const urlProvince = province.trim().toLowerCase();
    
    const urlLocation = city.trim().toLowerCase();
    const homeCity = home.city.trim().toLowerCase();
    const homeSuburb = home.suburb.trim().toLowerCase();

    const provinceMatch = homeProvince === urlProvince;
    const locationMatch = homeCity === urlLocation || homeSuburb === urlLocation || 
                         homeCity.includes(urlLocation) || homeSuburb.includes(urlLocation);

    return provinceMatch && locationMatch;
  });

  // Apply user filters
  if (minPrice !== undefined) {
    filteredHomes = filteredHomes.filter(h => h.startingBurialPrice >= minPrice);
  }
  if (verifiedOnly) filteredHomes = filteredHomes.filter(h => h.verified);
  if (promotedOnly) filteredHomes = filteredHomes.filter(h => h.promoted);
  if (featuredOnly) filteredHomes = filteredHomes.filter(h => h.featured);

  // Smart sorting: Promoted → Featured → Verified → Others
  filteredHomes.sort((a, b) => {
    if (a.promoted !== b.promoted) return a.promoted ? -1 : 1;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.verified !== b.verified) return a.verified ? -1 : 1;
    return 0;
  });

  console.log(`📍 ${cityName} | Total homes shown: ${filteredHomes.length} / Total available: ${funeralHomes.length}`);

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-semibold tracking-tighter text-emerald-950 mb-4">
            Funeral Homes in {cityName}
          </h1>
          <p className="text-xl text-zinc-600">
            {filteredHomes.length} homes found • Trusted local providers
          </p>
        </div>

        <Filters 
          currentMinPrice={minPrice} 
          verifiedOnly={verifiedOnly}
          promotedOnly={promotedOnly}
          featuredOnly={featuredOnly}
        />

        {filteredHomes.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl text-zinc-500">No homes found matching your filters in {cityName}.</p>
            <p className="mt-4 text-sm">Try removing some filters above</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHomes.map((home) => (
              <FuneralHomeCard 
                key={home.id}
                home={home}
                province={province}
                city={city}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}