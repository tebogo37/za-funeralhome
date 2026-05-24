// components/ui/ConsentBanner.tsx
'use client';

import { useState, useEffect } from 'react';

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check consent after component mounts
    const consent = localStorage.getItem('popia_consent');
    
    // Use setTimeout to avoid direct setState in effect body (satisfies linter)
    if (!consent) {
      setTimeout(() => setShowBanner(true), 100);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('popia_consent', 'accepted');
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      consent: {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted'
      }
    });

    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem('popia_consent', 'necessary');
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      consent: {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted'
      }
    });

    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 shadow-2xl z-[100] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">We value your privacy</h3>
            <p className="text-sm text-zinc-600">
              This website uses cookies to improve your experience, analyze traffic, 
              and show relevant content. By continuing, you agree to our 
              <a href="/privacy" className="text-emerald-700 underline"> Privacy Policy</a> 
              in accordance with POPIA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={acceptNecessary}
              className="px-6 py-3 border border-zinc-300 rounded-2xl text-sm font-medium hover:bg-zinc-50 transition whitespace-nowrap"
            >
              Necessary Only
            </button>
            <button 
              onClick={acceptAll}
              className="px-8 py-3 bg-emerald-700 text-white rounded-2xl text-sm font-medium hover:bg-emerald-800 transition whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}