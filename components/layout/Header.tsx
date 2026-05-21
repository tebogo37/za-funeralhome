// components/layout/Header.tsx
import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            SA
          </div>
          <div>
            <h1 className="font-semibold text-2xl tracking-tight text-emerald-950">SA Funeral Homes</h1>
            <p className="text-xs text-emerald-600 -mt-1">South Africa Funeral Directory</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-emerald-700 transition">Home</Link>
          <Link href="/funeral-homes" className="hover:text-emerald-700 transition">Find Funeral Homes</Link>
          <Link href="/compare" className="hover:text-emerald-700 transition">Compare</Link>
          <Link href="/get-help-now" className="hover:text-emerald-700 transition">Get Help Now</Link>
          <Link href="/resources" className="hover:text-emerald-700 transition">Resources</Link>
          <Link href="/for-funeral-homes" className="hover:text-emerald-700 transition">For Funeral Homes</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="tel:0112345678" className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800">
            <Phone className="w-4 h-4" /> Call Us
          </a>
          <a 
            href="https://wa.me/27712345678" 
            target="_blank"
            className="flex items-center gap-2 bg-emerald-700 text-white px-6 py-3 rounded-2xl text-sm font-medium hover:bg-emerald-800 transition"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}