// components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white text-2xl font-semibold mb-4">SA Funeral Homes</h3>
          <p className="text-emerald-300 text-sm">Connecting families with trusted funeral services across South Africa.</p>
        </div>
        
        <div>
          <h4 className="font-medium mb-4 text-white">Platform</h4>
          <div className="space-y-2.5 text-sm">
            <Link href="/funeral-homes" className="block hover:text-white">Find Funeral Homes</Link>
            <Link href="/compare" className="block hover:text-white">Compare Homes</Link>
            <Link href="/get-help-now" className="block hover:text-white">Get Help Now</Link>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-white">Resources</h4>
          <div className="space-y-2.5 text-sm">
            <Link href="/resources" className="block hover:text-white">Funeral Guides</Link>
            <Link href="/resources" className="block hover:text-white">Costs & Planning</Link>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4 text-white">For Funeral Homes</h4>
          <div className="space-y-2.5 text-sm">
            <Link href="/for-funeral-homes" className="block hover:text-white">List Your Business</Link>
            <Link href="/for-funeral-homes" className="block hover:text-white">Claim Listing</Link>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-emerald-400 mt-16">
        © {new Date().getFullYear()} SA Funeral Homes. All rights reserved.
      </div>
    </footer>
  );
}