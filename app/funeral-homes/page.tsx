// app/funeral-homes/page.tsx
import Link from 'next/link';
import { MapPin, ShieldCheck, Star, ArrowRight } from 'lucide-react';

const provinces = [
  { name: "Gauteng", slug: "gauteng", count: 18, popular: true },
  { name: "KwaZulu-Natal", slug: "kwazulu-natal", count: 0, popular: false },
  { name: "Western Cape", slug: "western-cape", count: 0, popular: false },
  { name: "Eastern Cape", slug: "eastern-cape", count: 0, popular: false },
  { name: "Limpopo", slug: "limpopo", count: 0, popular: false },
];

const popularCities = [
  { name: "Johannesburg", province: "gauteng", slug: "johannesburg" },
  { name: "Soweto", province: "gauteng", slug: "soweto" },
  { name: "Pretoria", province: "gauteng", slug: "pretoria" },
  { name: "Katlehong", province: "gauteng", slug: "katlehong" },
  { name: "Tembisa", province: "gauteng", slug: "tembisa" },
];

export async function generateMetadata() {
  return {
    title: "Find Funeral Homes Across South Africa | LastRespect",
    description: "Browse verified funeral homes by province and city. Compare prices, services, and get urgent assistance nationwide.",
  };
}

export default function FuneralHomesDirectory() {
  return ( <>

      {/* Green Hero Section */}
      <section className="bg-[#0A3D2B] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-6">
            Find Funeral Homes
          </h1>
          <p className="text-xl text-emerald-100/90 max-w-2xl mx-auto">
            Discover trusted funeral services across South Africa. 
            Start by province or popular areas in Gauteng.
          </p>
        </div>
      </section>

      {/* Premium Ad Spots / Featured Placements */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-semibold">Premium & Featured Partners</h2>
            <Link href="/for-funeral-homes" className="text-emerald-700 font-medium flex items-center gap-2 hover:gap-3 transition">
              Sell Premium Placement <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Premium Card 1 */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-8 hover:shadow-xl transition group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">T</div>
                <div>
                  <p className="font-semibold text-xl">Thabong Funeral Services</p>
                  <p className="text-emerald-600">Soweto • Verified</p>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">R2,000 Off Burial Packages</h3>
              <p className="text-zinc-600 mb-6">For families in Soweto & surrounding areas</p>
              <button className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-medium hover:bg-emerald-800 transition">
                Claim Offer
              </button>
            </div>

            {/* Premium Card 2 */}
            <div className="bg-white border border-emerald-100 rounded-3xl p-8 hover:shadow-xl transition group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl">M</div>
                <div>
                  <p className="font-semibold text-xl">Martin's Funerals</p>
                  <p className="text-emerald-600">Johannesburg • National</p>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Free Transport (50km)</h3>
              <p className="text-zinc-600 mb-6">On all cremation packages this month</p>
              <button className="w-full bg-emerald-700 text-white py-4 rounded-2xl font-medium hover:bg-emerald-800 transition">
                Claim Benefit
              </button>
            </div>

            {/* Premium Card 3 - Selling Spot */}
            <div className="bg-white border border-amber-200 rounded-3xl p-8 hover:shadow-xl transition group relative overflow-hidden">
              <div className="absolute top-6 right-6 bg-amber-500 text-white text-xs px-4 py-1 rounded-full font-medium">
                Premium Spot Available
              </div>
              <div className="flex items-center gap-4 mb-6 opacity-50">
                <div className="w-14 h-14 bg-zinc-100 rounded-2xl flex items-center justify-center text-3xl">?</div>
                <div>
                  <p className="font-semibold text-xl">Your Funeral Home</p>
                  <p className="text-zinc-500">Featured Here</p>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-900">Stand Out & Get More Leads</h3>
              <p className="text-zinc-600 mb-8">Be seen first by families in your area.</p>
              <Link href="/for-funeral-homes" className="block text-center border-2 border-amber-600 text-amber-700 py-4 rounded-2xl font-medium hover:bg-amber-50 transition">
                Reserve This Spot
              </Link>
            </div>
          </div>
        </div>
      </section>
    <div className="max-w-7xl mx-auto px-4 py-12">


      {/* Browse by Province */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold mb-8 flex items-center gap-3">
          <MapPin className="w-8 h-8 text-emerald-600" /> Browse by Province
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provinces.map((province) => (
            <Link
              key={province.slug}
              href={`/funeral-homes/${province.slug}`}
              className="group bg-white border rounded-3xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-semibold group-hover:text-emerald-700 transition">{province.name}</h3>
                {province.popular && (
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Most Popular</span>
                )}
              </div>
              <div className="mt-auto text-sm text-zinc-500">
                {province.count > 0 ? `${province.count} homes listed` : "Coming soon"}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Areas in Gauteng (Phase 1 Focus) */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-semibold">Popular Areas in Gauteng</h2>
          <Link href="/funeral-homes/gauteng/johannesburg" className="text-emerald-700 hover:underline text-sm font-medium">
            View all in Gauteng →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularCities.map((city) => (
            <Link
              key={city.slug}
              href={`/funeral-homes/gauteng/${city.slug}`}
              className="bg-white border rounded-3xl p-8 hover:shadow-xl transition group"
            >
              <MapPin className="w-8 h-8 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-medium group-hover:text-emerald-700">{city.name}</h3>
              <p className="text-sm text-zinc-500 mt-1">Gauteng</p>
              <div className="mt-6 text-emerald-700 text-sm font-medium">Browse homes →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust & Quick Actions */}
      <div className="mt-20 bg-emerald-50 rounded-3xl p-12 text-center">
        <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold mb-3">All Homes Are Verified</h3>
        <p className="text-zinc-600 max-w-md mx-auto">
          We manually verify memberships, contact details, and service quality so you can trust every listing.
        </p>
        <Link 
          href="/get-help-now"
          className="mt-8 inline-block bg-emerald-700 text-white px-10 py-4 rounded-2xl font-medium hover:bg-emerald-800"
        >
          Need urgent help? Get matched now
        </Link>
      </div>
    </div> </>
  );
}