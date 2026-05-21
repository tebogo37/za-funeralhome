// app/for-funeral-homes/page.tsx
import Link from 'next/link';
import { Check, Users, TrendingUp, Star, Edit3 } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: "For Funeral Homes | List Your Business on LastRespect",
    description: "Join South Africa's growing funeral directory. Free basic listing + affordable upgrades to get more leads.",
  };
}

export default function ForFuneralHomes() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Basic business listing",
        "Contact details & services",
        "Location visibility",
        "Claim your existing listing"
      ],
      cta: "Claim Free Listing",
      popular: false
    },
    {
      name: "Starter",
      price: "R100/month",
      features: [
        "Everything in Basic",
        "Photo gallery (up to 6 photos)",
        "Featured on location pages",
        "Basic lead notifications"
      ],
      cta: "Start at R100/month",
      popular: true
    },
    {
      name: "Pro",
      price: "R250/month",
      features: [
        "Everything in Starter",
        "Unlimited photos",
        "Priority ranking",
        "Full lead access + analytics",
        "Verified badge + promotions"
      ],
      cta: "Go Pro - R250/month",
      popular: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-semibold tracking-tight mb-6">List Your Funeral Home</h1>
        <p className="text-2xl text-zinc-600 max-w-3xl mx-auto">
          Get discovered by more families in your area. Start free, upgrade when you're ready.
        </p>
      </div>

      {/* Quick Claim CTA */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 mb-16 text-center">
        <Edit3 className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold mb-4">Already have a listing?</h2>
        <p className="text-zinc-600 mb-8 max-w-md mx-auto">
          Claim and take full control of your profile. Add photos, update prices, and start receiving leads.
        </p>
        <Link 
          href="/for-funeral-homes/claim"
          className="inline-block bg-emerald-700 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-emerald-800 transition"
        >
          Claim My Listing Now
        </Link>
      </div>

      {/* Pricing Plans */}
      <div>
        <h2 className="text-3xl font-semibold text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white border rounded-3xl p-10 flex flex-col relative ${plan.popular ? 'ring-2 ring-emerald-600' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}

              <div className="text-center mb-10">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-emerald-700">{plan.price}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-12 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={plan.name === "Basic" ? "/for-funeral-homes/claim" : "#"}
                className={`block text-center py-4 rounded-2xl font-medium transition ${plan.popular 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50'}`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center text-sm text-zinc-500">
        All plans include WhatsApp lead notifications. Cancel anytime.
      </div>
    </div>
  );
}