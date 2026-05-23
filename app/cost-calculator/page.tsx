// app/cost-calculator/page.tsx
'use client';

import { useState } from 'react';
import { saveLeadAndNotify } from '@/app/actions/send-lead';

export default function CostCalculator() {
  const [step, setStep] = useState<'intro' | 'calculator' | 'results'>('intro');
  const [leadInfo, setLeadInfo] = useState({ name: '', phone: '', suburb: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [calc, setCalc] = useState({
    serviceType: 'burial' as 'burial' | 'cremation',
    coffinTier: 'standard' as 'basic' | 'standard' | 'premium',
    peopleCount: 80,
    includeCow: false,
    includeTentChairs: true,
    includeCatering: true,
    transportDistance: 30,
  });

  const calculateEstimate = () => {
    let base = calc.serviceType === 'burial' ? 14500 : 8500;

    if (calc.coffinTier === 'standard') base += 3500;
    if (calc.coffinTier === 'premium') base += 7500;

    const cateringCost = Math.floor(calc.peopleCount / 10) * 850;
    const transportCost = calc.transportDistance > 20 ? (calc.transportDistance - 20) * 85 : 0;
    const tentCost = calc.includeTentChairs ? 3800 : 0;
    const cowCost = calc.includeCow ? 8500 : 0;

    return Math.round(base + cateringCost + transportCost + tentCost + cowCost);
  };

  const totalEstimate = calculateEstimate();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', leadInfo.name);
    formData.append('phone', leadInfo.phone);
    formData.append('suburb', leadInfo.suburb);
    formData.append('serviceType', calc.serviceType);
    formData.append('budget', `Around R${totalEstimate.toLocaleString('en-ZA')}`);
    formData.append('message', `Service: ${calc.serviceType}, People: ${calc.peopleCount}, Cow: ${calc.includeCow}, Tent: ${calc.includeTentChairs}`);
    formData.append('source', 'cost-calculator');
    formData.append('url', window.location.href);

    const result = await saveLeadAndNotify(formData);

    if (result.success) {
      alert("Thank you! Your estimate has been received. A funeral home will contact you shortly.");
      setStep('intro'); // Reset
    } else {
      alert("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-semibold tracking-tighter text-emerald-950 mb-4">
            Funeral Cost Calculator
          </h1>
          <p className="text-xl text-zinc-600">Get a realistic estimate based on current Gauteng prices</p>
        </div>

        {step === 'intro' && (
          <div className="bg-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to plan with clarity?</h2>
            <p className="text-lg text-zinc-600 mb-10 max-w-md mx-auto">
              Our calculator uses real pricing data from Gauteng funeral homes.
            </p>
            <button 
              onClick={() => setStep('calculator')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-12 py-5 rounded-2xl text-lg font-medium"
            >
              Start Calculator
            </button>
          </div>
        )}

        {step === 'calculator' && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-3xl font-semibold mb-10 text-center">Build Your Package</h2>

            <div className="space-y-10">
              <div>
                <label className="block text-sm font-medium mb-4">Service Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setCalc({...calc, serviceType: 'burial'})} 
                    className={`p-6 rounded-2xl border-2 transition ${calc.serviceType === 'burial' ? 'border-emerald-700 bg-emerald-50' : 'border-zinc-200'}`}>
                    Burial
                  </button>
                  <button onClick={() => setCalc({...calc, serviceType: 'cremation'})} 
                    className={`p-6 rounded-2xl border-2 transition ${calc.serviceType === 'cremation' ? 'border-emerald-700 bg-emerald-50' : 'border-zinc-200'}`}>
                    Cremation
                  </button>
                </div>
              </div>

              {/* Rest of your calculator UI remains the same */}
              {/* ... keep your existing calculator fields ... */}

            </div>

            <div className="mt-12 pt-8 border-t text-center">
              <p className="text-5xl font-bold text-emerald-700 mb-2">R{totalEstimate.toLocaleString('en-ZA')}</p>
              <p className="text-zinc-500">Estimated Total</p>
              <button 
                onClick={() => setStep('results')}
                className="mt-8 w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 rounded-2xl font-medium text-lg"
              >
                Get Personalized Quotes
              </button>
            </div>
          </div>
        )}

        {step === 'results' && (
          <div className="bg-white rounded-3xl shadow-xl p-12">
            <h2 className="text-3xl font-semibold text-center mb-10">Your Estimated Cost</h2>
            
            <div className="text-center mb-12">
              <div className="text-6xl font-bold text-emerald-700">R{totalEstimate.toLocaleString('en-ZA')}</div>
              <p className="text-zinc-500 mt-2">Realistic estimate based on current Gauteng prices</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto space-y-6">
              <h3 className="text-xl font-medium text-center mb-6">Get quotes from local homes</h3>
              
              <input 
                type="text" 
                placeholder="Full Name" 
                required 
                value={leadInfo.name} 
                onChange={(e) => setLeadInfo({...leadInfo, name: e.target.value})} 
                className="w-full px-6 py-4 border rounded-2xl" 
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                required 
                value={leadInfo.phone} 
                onChange={(e) => setLeadInfo({...leadInfo, phone: e.target.value})} 
                className="w-full px-6 py-4 border rounded-2xl" 
              />
              <input 
                type="text" 
                placeholder="Suburb" 
                required 
                value={leadInfo.suburb} 
                onChange={(e) => setLeadInfo({...leadInfo, suburb: e.target.value})} 
                className="w-full px-6 py-4 border rounded-2xl" 
              />

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-70 text-white py-5 rounded-2xl font-medium text-lg transition"
              >
                {isSubmitting ? "Submitting..." : "Send My Details → Get Real Quotes"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}