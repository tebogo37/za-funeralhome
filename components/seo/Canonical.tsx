// components/SEO/Canonical.tsx
'use client';

import { usePathname } from 'next/navigation';

export default function Canonical() {
  const pathname = usePathname();
  
  // Base URL - Change this to your actual domain
  const baseUrl = 'https://www.safuneralhomes.co.za'; 
  
  const canonicalUrl = `${baseUrl}${pathname === '/' ? '' : pathname}`;

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}