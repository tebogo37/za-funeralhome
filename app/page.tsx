// app/page.tsx
import { funeralHomes } from '@/data/funeral-homes';
import HeroForm from '@/components/home/HeroForm';
import { offers } from '@/data/offers';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* ── Hero Section ─────────────────────────────────── */}
      <section
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{
          backgroundImage: "url('https://img.magnific.com/free-photo/front-view-little-grave-with-hourglass-candles-dark_179666-41685.jpg?t=st=1778613469~exp=1778617069~hmac=9c192b08798a6972757b2356f04f4a731eb4fd66606bd073e9f96e8c1b594583&w=2000')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark green overlay */}
        <div className="absolute inset-0 bg-[#0A3D2B]/75" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-20 relative z-10 w-full grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Hero Text */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-tight text-white mb-5">
              Dignified funeral<br className="hidden sm:block" /> services when<br className="hidden sm:block" /> it matters most.
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-emerald-100/90 max-w-lg mx-auto lg:mx-0 mb-8">
              Connecting Gauteng families with trusted, verified funeral homes —
              with care, transparency, and speed.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-white">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">✓</div>
                <span>20+ Verified Homes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">★</div>
                <span>Real Family Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">🛡️</div>
                <span>FIRA &amp; AFDA Members</span>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            <div className="bg-white rounded-3xl p-6 sm:p-10 text-zinc-900 shadow-2xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-emerald-950 mb-6 sm:mb-8">
                Get Help Right Now
              </h2>

              <HeroForm />

              <p className="text-center text-xs text-zinc-500 mt-5">
                Your information is protected • POPIA Compliant
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ────────────────────────────────────── */}
      <div className="bg-white py-5 border-b">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-zinc-600">
          <div>✅ 20+ Verified Homes in Gauteng</div>
          <div>✅ Real Reviews from Families</div>
          <div>✅ FIRA &amp; AFDA Members</div>
          <div>✅ Fast WhatsApp Responses</div>
        </div>
      </div>

      {/* ── Premium / Promoted Homes ─────────────────────── */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-emerald-950">
                Promoted &amp; Premium Homes
              </h2>
              <p className="text-zinc-600 mt-2 text-base sm:text-lg">
                Hand-picked partners with exclusive offers and priority service
              </p>
            </div>
            <Link
              href="/funeral-homes"
              className="text-emerald-700 font-medium flex items-center gap-2 hover:gap-3 transition text-sm sm:text-base shrink-0"
            >
              View all promoted homes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {funeralHomes
              .filter((h) => h.promoted)
              .slice(0, 6)
              .map((home) => (
                <Link
                  key={home.id}
                  href={`/funeral-homes/gauteng/${home.city.toLowerCase().replace(/\s+/g, '-')}/${home.slug}`}
                  className="group bg-white border border-amber-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 relative"
                >
                  <div className="relative h-56 sm:h-64">
                    <Image
                      src={home.imageUrl}
                      alt={home.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs px-4 py-1.5 rounded-full font-medium">
                      Premium
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <h3 className="font-semibold text-xl sm:text-2xl group-hover:text-emerald-700 transition">
                      {home.name}
                    </h3>
                    <p className="text-zinc-500 flex items-center gap-2 mt-2 text-sm">
                      <MapPin className="w-4 h-4 flex-shrink-0" /> {home.suburb}
                    </p>

                    <div className="mt-5 flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-semibold text-emerald-700">
                        R{home.startingBurialPrice.toLocaleString('en-ZA')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ── Popular Locations ─────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8 sm:mb-10">
            Popular Areas in Gauteng
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {['Soweto', 'Johannesburg', 'Pretoria', 'Katlehong', 'Tembisa'].map((area) => (
              <Link
                key={area}
                href={`/funeral-homes/gauteng/${area.toLowerCase()}`}
                className="group bg-zinc-50 hover:bg-white border border-zinc-200 p-5 sm:p-8 rounded-3xl transition"
              >
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 mb-3" />
                <h3 className="text-base sm:text-2xl font-medium group-hover:text-emerald-700">{area}</h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">Burial &amp; Cremation</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium Offers (dark bg section) ─────────────── */}
      <section
        className="py-16 sm:py-24 relative overflow-hidden"
        style={{
          backgroundImage: "url('https://img.magnific.com/free-photo/family-visiting-grave-loved-one_23-2149125580.jpg?t=st=1778613439~exp=1778617039~hmac=1aed414928f71f973ae80978103875abb7dd1ab67222c47651661c1efc940ab8&w=2000')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#0A3D2B]/85" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3 text-white">
              Featured &amp; Premium Offers
            </h2>
            <p className="text-emerald-100/80 text-base sm:text-lg">
              Handpicked trusted partners with exclusive deals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {offers.map((promo, index) => (
              <Link
                key={index}
                href={`/offers/${promo.slug}`}
                className="group relative bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/15 transition-all"
              >
                <div className="absolute top-5 right-5 sm:top-6 sm:right-6 text-xs bg-amber-400 text-emerald-950 px-3 py-1 rounded-full font-medium">
                  Premium
                </div>

                <div className="h-14 flex items-center mb-5">
                  <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
                    {promo.providerName[0]}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-base text-white">{promo.providerName}</p>
                    <p className="text-emerald-100/70 text-sm">{promo.providerSuburb}</p>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-white">{promo.title}</h3>
                <p className="text-emerald-100/80 mb-5 text-sm sm:text-base">{promo.shortDescription}</p>

                <div className="text-xs uppercase tracking-widest text-emerald-300 mb-1">Limited Time</div>
                <p className="text-rose-300 text-sm mb-6">Valid until {promo.validUntil}</p>

                <button className="w-full bg-white text-emerald-950 py-3.5 rounded-2xl font-medium hover:bg-emerald-100 transition text-sm sm:text-base">
                  View Premium Offer
                </button>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <Link
              href="/for-funeral-homes"
              className="text-emerald-300 hover:text-white inline-flex items-center gap-2 text-sm font-medium"
            >
              Become a Featured Partner • Sell Premium Placements Here
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-emerald-950 mb-4">
            How It Works
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg mb-12 sm:mb-16 max-w-md mx-auto">
            Simple steps to find the right funeral home during a difficult time.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
            {[
              { step: '1', title: 'Share Your Needs', desc: 'Tell us the location, service type and budget' },
              { step: '2', title: 'Get Matched Instantly', desc: 'Receive verified options from homes near you' },
              { step: '3', title: 'Compare &amp; Connect', desc: 'Review details, prices and contact directly' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 mx-auto bg-emerald-100 text-emerald-800 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl font-semibold mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-emerald-950">{item.title}</h3>
                <p className="text-zinc-600 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: item.desc }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'LastRespect',
            url: 'https://yourdomain.com',
            description: 'Funeral home directory and comparison platform for Gauteng',
            publisher: {
              '@type': 'Organization',
              name: 'LastRespect',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Johannesburg',
                addressRegion: 'Gauteng',
                addressCountry: 'ZA',
              },
            },
          }),
        }}
      />
    </>
  );
}