// components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/funeral-homes', label: 'Find Funeral Homes' },
    { href: '/compare', label: 'Compare' },
    { href: '/get-help-now', label: 'Get Help Now' },
    { href: '/resources', label: 'Resources' },
    { href: '/for-funeral-homes', label: 'For Funeral Homes' },
  ];

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <div className="w-9 h-9 bg-emerald-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
              SA
            </div>
            <div>
              <h1 className="font-semibold text-lg sm:text-2xl tracking-tight text-emerald-950 leading-none">
                SA Funeral Homes
              </h1>
              <p className="text-xs text-emerald-600">South Africa Funeral Directory</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-emerald-700 transition text-zinc-700">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Mobile Burger */}
          <div className="flex items-center gap-3">
            {/* Call Us — hidden on very small screens */}
            <a
              href="tel:0112345678"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>

            {/* WhatsApp — hidden on mobile, visible md+ */}
            <a
              href="https://wa.me/27712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-emerald-700 text-white px-5 py-2.5 rounded-2xl text-sm font-medium hover:bg-emerald-800 transition"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>

            {/* Burger — visible below lg */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition text-zinc-700"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Mobile Slide-down Menu */}
      <div
        className={`fixed top-[69px] left-0 right-0 z-40 lg:hidden bg-white border-b shadow-xl transition-all duration-300 ${
          mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-4 py-3.5 rounded-2xl text-base font-medium text-zinc-800 hover:bg-emerald-50 hover:text-emerald-700 transition"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile action buttons */}
          <div className="mt-4 pt-4 border-t flex flex-col gap-3">
            <a
              href="tel:0112345678"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-emerald-700 text-emerald-700 font-medium text-base hover:bg-emerald-50 transition"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="w-5 h-5" /> Call Us Now
            </a>
            <a
              href="https://wa.me/27712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 text-white font-medium text-base hover:bg-emerald-800 transition"
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}