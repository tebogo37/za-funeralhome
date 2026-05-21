// app/funeral-cover/page.tsx
import Link from 'next/link';
import { ShieldCheck, Users, Award, ArrowRight, ArrowLeft } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Funeral Cover South Africa | Best Burial Insurance 2026',
    description: 'Compare the best funeral insurance and burial cover plans in South Africa from Assupol, Old Mutual, Hollard and more.',
  };
}

export default function FuneralCoverPage() {
  const providers = [
    {
      name: "Assupol",
      monthlyFrom: "R99",
      coverUpTo: "R100,000",
      waitingPeriod: "6 months",
      rating: 4.7,
      bestFor: "Best value family cover",
    },
    {
      name: "Old Mutual",
      monthlyFrom: "R149",
      coverUpTo: "R150,000",
      waitingPeriod: "12 months",
      rating: 4.5,
      bestFor: "Comprehensive benefits",
    },
    {
      name: "Hollard",
      monthlyFrom: "R89",
      coverUpTo: "R80,000",
      waitingPeriod: "6 months",
      rating: 4.4,
      bestFor: "Budget friendly",
    },
  ];

  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link href="/insurance" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800">
          <ArrowLeft className="w-4 h-4" /> Back to Insurance
        </Link>
      </div>

      <section className="bg-[#0A3D2B] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
            Funeral Cover & Burial Insurance
          </h1>
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto">
            Protect your family from the financial burden of a funeral. Compare South Africa’s top funeral cover plans.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl overflow-hidden shadow">
              <thead>
                <tr className="bg-emerald-950 text-white">
                  <th className="p-8 text-left">Provider</th>
                  <th className="p-8 text-center">Monthly From</th>
                  <th className="p-8 text-center">Max Cover</th>
                  <th className="p-8 text-center">Waiting Period</th>
                  <th className="p-8 text-center">Rating</th>
                  <th className="p-8 text-center">Best For</th>
                  <th className="p-8"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {providers.map((p, i) => (
                  <tr key={i} className="hover:bg-zinc-50">
                    <td className="p-8 font-semibold">{p.name}</td>
                    <td className="p-8 text-center font-semibold text-emerald-700">R{p.monthlyFrom}</td>
                    <td className="p-8 text-center">{p.coverUpTo}</td>
                    <td className="p-8 text-center">{p.waitingPeriod}</td>
                    <td className="p-8 text-center">{p.rating} ★</td>
                    <td className="p-8 text-center text-sm text-zinc-600">{p.bestFor}</td>
                    <td className="p-8 text-center">
                      <Link href="/get-help-now?source=funeral-cover" className="bg-emerald-700 text-white px-8 py-3 rounded-2xl hover:bg-emerald-800 transition">
                        Get Quote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}