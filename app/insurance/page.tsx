// app/insurance/page.tsx
import Link from 'next/link';
import { ShieldCheck, Users, Award, ArrowRight } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Funeral & Life Insurance South Africa | SA Funeral Homes',
    description: 'Compare the best funeral cover and life insurance plans in South Africa. Protect your family with affordable burial and life cover.',
  };
}

export default function InsurancePage() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      {/* Hero */}
      <section className="bg-[#0A3D2B] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
            Insurance That Protects Your Family
          </h1>
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto">
            Compare trusted funeral cover and life insurance plans from South Africa’s leading providers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Funeral Cover Card */}
          <Link 
            href="/funeral-cover"
            className="group bg-white border border-zinc-100 rounded-3xl p-12 hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8">
              <ShieldCheck className="w-10 h-10 text-emerald-700" />
            </div>
            <h2 className="text-3xl font-semibold mb-4 group-hover:text-emerald-700 transition">
              Funeral Cover
            </h2>
            <p className="text-zinc-600 text-lg mb-8">
              Burial and cremation insurance from R89/month. Compare Assupol, Hollard, Old Mutual and more.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-700 font-medium group-hover:gap-3 transition">
              Compare Funeral Plans <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* Life Cover Card */}
          <Link 
            href="/life-cover"
            className="group bg-white border border-zinc-100 rounded-3xl p-12 hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8">
              <Users className="w-10 h-10 text-emerald-700" />
            </div>
            <h2 className="text-3xl font-semibold mb-4 group-hover:text-emerald-700 transition">
              Life Cover
            </h2>
            <p className="text-zinc-600 text-lg mb-8">
              Comprehensive life insurance with substantial funeral benefits. Protect your loved ones fully.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-700 font-medium group-hover:gap-3 transition">
              Compare Life Cover Plans <ArrowRight className="w-5 h-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}