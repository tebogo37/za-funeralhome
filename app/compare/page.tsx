// app/compare/page.tsx
'use client';

import { useState } from 'react';
import { funeralHomes } from '@/data/funeral-homes';
import Image from 'next/image';
import { X, Star, MapPin } from 'lucide-react';

export default function ComparePage() {
  const [selectedHomes, setSelectedHomes] = useState<string[]>([]);

  const addToCompare = (id: string) => {
    if (selectedHomes.length >= 4) return;
    if (!selectedHomes.includes(id)) {
      setSelectedHomes([...selectedHomes, id]);
    }
  };

  const removeFromCompare = (id: string) => {
    setSelectedHomes(selectedHomes.filter(h => h !== id));
  };

  const selected = funeralHomes.filter(h => selectedHomes.includes(h.id));

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold tracking-tighter text-emerald-950 mb-4">
            Compare Funeral Homes
          </h1>
          <p className="text-xl text-zinc-600 max-w-md mx-auto">
            Make informed decisions by comparing services, pricing, and trust signals side by side.
          </p>
        </div>

        {/* Selection Area */}
        <div className="mb-16">
          <h3 className="font-medium text-emerald-950 mb-6 text-lg">Select homes to compare (up to 4)</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {funeralHomes.slice(0, 16).map((home) => (
              <button
                key={home.id}
                onClick={() => addToCompare(home.id)}
                disabled={selectedHomes.includes(home.id)}
                className={`p-6 border rounded-3xl text-left transition-all hover:shadow-md ${
                  selectedHomes.includes(home.id) 
                    ? 'bg-emerald-50 border-emerald-600' 
                    : 'hover:border-emerald-200'
                }`}
              >
                <div className="font-semibold text-base">{home.name}</div>
                <div className="text-sm text-zinc-500 mt-1">{home.suburb}, {home.city}</div>
                <div className="text-emerald-700 text-sm mt-3">
                  From R{home.startingBurialPrice.toLocaleString('en-ZA')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        {selected.length > 0 && (
          <div className="bg-white rounded-3xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b">
                    <th className="p-8 text-left font-medium text-zinc-500 w-56">Feature</th>
                    {selected.map((home) => (
                      <th key={home.id} className="p-8 text-center border-l">
                        <div className="flex justify-center mb-4">
                          <button 
                            onClick={() => removeFromCompare(home.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="font-semibold text-lg">{home.name}</div>
                        <div className="text-sm text-zinc-500">{home.suburb}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="p-8 font-medium text-zinc-600">Burial Starting Price</td>
                    {selected.map(home => (
                      <td key={home.id} className="p-8 text-center font-semibold text-emerald-700 text-xl border-l">
                        R{home.startingBurialPrice.toLocaleString('en-ZA')}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-8 font-medium text-zinc-600">Cremation Starting Price</td>
                    {selected.map(home => (
                      <td key={home.id} className="p-8 text-center border-l">
                        {home.startingCremationPrice 
                          ? `R${home.startingCremationPrice.toLocaleString('en-ZA')}` 
                          : '—'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-8 font-medium text-zinc-600">Services Offered</td>
                    {selected.map(home => (
                      <td key={home.id} className="p-8 text-sm border-l leading-relaxed">
                        {home.services.join(", ")}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-8 font-medium text-zinc-600">Rating</td>
                    {selected.map(home => (
                      <td key={home.id} className="p-8 text-center border-l">
                        <div className="flex justify-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-zinc-600 mt-1 block">{home.rating}</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-8 font-medium text-zinc-600">Years in Business</td>
                    {selected.map(home => (
                      <td key={home.id} className="p-8 text-center border-l font-medium">
                        {home.yearsInBusiness} years
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selected.length === 0 && (
          <div className="text-center py-32 text-zinc-400">
            <p className="text-2xl mb-4">No homes selected yet</p>
            <p className="text-lg">Click on homes above to start comparing</p>
          </div>
        )}
      </div>
    </div>
  );
}