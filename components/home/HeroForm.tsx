// components/home/HeroForm.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function HeroForm() {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const suburb = (formData.get('suburb') as string)?.trim();
    const serviceType = formData.get('serviceType') as string;
    const budget = formData.get('budget') as string;

    const params = new URLSearchParams();
    if (suburb) params.set('suburb', suburb);
    if (serviceType) params.set('serviceType', serviceType);
    if (budget) params.set('budget', budget);

    router.push(`/search-results?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="space-y-6" suppressHydrationWarning>
      <div>
        <label className="block text-sm text-zinc-600 mb-2">Your Suburb / Area</label>
        <input 
          name="suburb" 
          required 
          className="w-full px-6 py-4 border border-zinc-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg" 
          placeholder="Soweto, Mamelodi, Katlehong..." 
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-zinc-600 mb-2">Service Needed</label>
          <select name="serviceType" className="w-full px-6 py-4 border border-zinc-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg">
            <option value="">Any</option>
            <option value="Burial">Burial</option>
            <option value="Cremation">Cremation</option>
            <option value="Repatriation">Repatriation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-600 mb-2">Budget Range</label>
          <select name="budget" className="w-full px-6 py-4 border border-zinc-200 rounded-2xl focus:outline-none focus:border-emerald-600 text-lg">
            <option value="">Any</option>
            <option value="15000">Under R15,000</option>
            <option value="25000">R15,000 – R25,000</option>
            <option value="40000">R25,000 – R40,000</option>
          </select>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl font-medium text-lg transition mt-4"
      >
        Find Suitable Homes Now
      </button>
    </form>
  );
}