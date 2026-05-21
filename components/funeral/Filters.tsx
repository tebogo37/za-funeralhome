// components/funeral/Filters.tsx
'use client';

import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface FiltersProps {
  currentMinPrice?: number;
  verifiedOnly: boolean;
  promotedOnly: boolean;
  featuredOnly: boolean;
}

export default function Filters({ 
  currentMinPrice, 
  verifiedOnly, 
  promotedOnly, 
  featuredOnly 
}: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border mb-10 flex flex-wrap gap-6 items-end">
      {/* Price Filter */}
      <div>
        <label className="block text-sm text-zinc-500 mb-1">Minimum Burial Price</label>
        <select 
          className="border rounded-xl px-4 py-2.5 bg-white w-52"
          value={currentMinPrice || ''}
          onChange={(e) => updateFilter('minPrice', e.target.value || null)}
        >
          <option value="">Any price</option>
          <option value="10000">R10,000+</option>
          <option value="15000">R15,000+</option>
          <option value="20000">R20,000+</option>
        </select>
      </div>

      {/* Promoted Filter */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={promotedOnly}
            onChange={(e) => updateFilter('promoted', e.target.checked ? 'true' : null)}
            className="w-5 h-5 accent-emerald-700"
          />
          <span className="text-sm">Promoted Only</span>
        </label>
      </div>

      {/* Featured Filter */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={featuredOnly}
            onChange={(e) => updateFilter('featured', e.target.checked ? 'true' : null)}
            className="w-5 h-5 accent-emerald-700"
          />
          <span className="text-sm">Featured Only</span>
        </label>
      </div>

      {/* Verified Filter */}
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="checkbox" 
            checked={verifiedOnly}
            onChange={(e) => updateFilter('verified', e.target.checked ? 'true' : null)}
            className="w-5 h-5 accent-emerald-700"
          />
          <span className="text-sm">Verified Only</span>
        </label>
      </div>

      <div className="ml-auto">
        <Link 
          href="/get-help-now"
          className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-2xl font-medium inline-block"
        >
          Get Matched Quotes Now
        </Link>
      </div>
    </div>
  );
}