// app/life-cover/page.tsx
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Life Cover South Africa | Funeral + Life Insurance',
    description: 'Compare comprehensive life insurance plans that include funeral cover from South Africa’s leading insurers.',
  };
}

export default function LifeCoverPage() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link href="/insurance" className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800">
          <ArrowLeft className="w-4 h-4" /> Back to Insurance
        </Link>
      </div>

      <section className="bg-[#0A3D2B] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
            Life Cover with Funeral Benefits
          </h1>
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto">
            Protect your loved ones with comprehensive life insurance that includes substantial funeral cover.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-8">Coming Soon</h2>
          <p className="text-zinc-600 max-w-md mx-auto">
            We are currently building detailed comparisons for Life Cover products that include funeral benefits.
          </p>
          <Link href="/get-help-now" className="mt-8 inline-block bg-emerald-700 text-white px-10 py-4 rounded-2xl">
            Get Life & Funeral Cover Quotes
          </Link>
        </div>
      </section>
    </div>
  );
}