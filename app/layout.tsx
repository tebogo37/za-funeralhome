// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MessageCircle } from 'lucide-react';
import Canonical from '@/components/seo/Canonical';
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'SA Funeral Homes | Funeral Services & Insurance South Africa',
  description: 'Find trusted funeral homes, compare burial & cremation services, and get funeral insurance quotes across South Africa. safuneralhomes.co.za',
  keywords: ['funeral homes south africa', 'burial services', 'cremation', 'funeral insurance', 'assupol', 'funeral cover'],
  openGraph: {
    title: 'SA Funeral Homes | Dignified Funeral Services',
    description: 'Connecting families with trusted funeral homes and insurance providers in South Africa.',
    url: 'https://safuneralhomes.co.za',
    siteName: 'SA Funeral Homes',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Canonical />

      </head>
      <body className="bg-zinc-50 text-zinc-900">
        <GoogleTagManager gtmId="GTM-5R3R4SCR" />
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Floating WhatsApp */}
        <a 
          href="https://wa.me/27712345678?text=Hi,%20I%20need%20urgent%20funeral%20help"
          target="_blank"
          className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20ba5a] transition z-50"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </body>
    </html>
  );
}