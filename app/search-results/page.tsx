// app/search-results/page.tsx
import { funeralHomes, type FuneralHome } from '@/data/funeral-homes';
import FuneralHomeCard from '@/components/funeral/FuneralHomeCard';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{
    suburb?: string;
    serviceType?: string;
    budget?: string;
  }>;
}

export default async function SearchResults({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const { suburb = '', serviceType = '', budget = '' } = resolvedSearchParams;

  let results: FuneralHome[] = funeralHomes;

  // Filter by suburb (city or suburb field)
  if (suburb) {
    const searchTerm = suburb.toLowerCase().trim();
    results = results.filter(home => 
      home.city.toLowerCase().includes(searchTerm) || 
      home.suburb.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by service type
  if (serviceType) {
    results = results.filter(home => 
      home.services.some(s => s.toLowerCase() === serviceType.toLowerCase())
    );
  }

  // Filter by budget (max budget)
  if (budget) {
    const maxBudget = parseInt(budget);
    if (!isNaN(maxBudget)) {
      results = results.filter(home => home.startingBurialPrice <= maxBudget);
    }
  }

  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tighter mb-3">
            Homes matching your criteria
          </h1>
          {suburb && <p className="text-xl text-zinc-600">in <strong>{suburb}</strong></p>}
        </div>

        {results.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl text-zinc-500">No homes found matching your criteria.</p>
            <Link href="/get-help-now" className="text-emerald-700 underline mt-6 inline-block">
              Try Get Help Now instead →
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((home) => (
              <FuneralHomeCard 
                key={home.id}
                home={home}
                province="gauteng"
                city={home.city.toLowerCase()}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}