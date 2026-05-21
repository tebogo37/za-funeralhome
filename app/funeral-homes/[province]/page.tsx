// app/funeral-homes/[province]/page.tsx
import { funeralHomes } from '@/data/funeral-homes';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ province: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { province } = await params;
  const provinceName = province.charAt(0).toUpperCase() + province.slice(1);
  
  return {
    title: `Funeral Homes in ${provinceName} | LastRespect`,
    description: `Browse verified funeral homes in ${provinceName}.`,
  };
}

export default async function ProvincePage({ params }: Props) {
  const { province } = await params;
  const provinceName = province.charAt(0).toUpperCase() + province.slice(1);

  if (province.toLowerCase() !== 'gauteng') {
    notFound();
  }

  // Group homes by city and count them dynamically
  const cityGroups = funeralHomes.reduce((acc, home) => {
    if (home.province.toLowerCase() === province.toLowerCase()) {
      const cityKey = home.city.toLowerCase();
      if (!acc[cityKey]) {
        acc[cityKey] = {
          name: home.city,
          count: 0,
          slug: cityKey,
        };
      }
      acc[cityKey].count += 1;
    }
    return acc;
  }, {} as Record<string, { name: string; count: number; slug: string }>);

  const cities = Object.values(cityGroups).sort((a, b) => b.count - a.count);

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Dark Green Hero */}
      <section className="bg-[#0A3D2B] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
            Funeral Homes in {provinceName}
          </h1>
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto">
            Discover trusted and verified funeral service providers across {provinceName}.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-emerald-950 mb-3">Popular Cities & Areas</h2>
          <p className="text-zinc-600">Select a location to browse available homes</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/funeral-homes/gauteng/${city.slug}`}
              className="group bg-white border border-zinc-100 hover:border-emerald-200 p-10 rounded-3xl transition-all hover:shadow-xl hover:-translate-y-1 text-center"
            >
              <MapPin className="w-10 h-10 text-emerald-700 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold group-hover:text-emerald-700 transition-colors mb-1">
                {city.name}
              </h3>
              <p className="text-emerald-600 text-sm">{city.count} homes available</p>
            </Link>
          ))}
        </div>

        {cities.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No homes found in this province yet.
          </div>
        )}

        <div className="text-center mt-16">
          <Link 
            href="/funeral-homes"
            className="inline-flex items-center gap-3 text-emerald-700 hover:text-emerald-800 font-medium text-lg"
          >
            ← Browse All Provinces
          </Link>
        </div>
      </div>
    </div>
  );
}