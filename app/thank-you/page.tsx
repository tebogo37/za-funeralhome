// app/thank-you/page.tsx
import Link from 'next/link';
import { ArrowRight, Download, Heart } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center">
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-8">
          <Heart className="w-10 h-10 text-emerald-700" />
        </div>

        <h1 className="text-5xl font-semibold tracking-tighter text-emerald-950 mb-6">
          Thank You
        </h1>
        <p className="text-2xl text-zinc-600 mb-10">
          We’ve received your request.<br />
          A trusted funeral home near you will contact you shortly.
        </p>

        <div className="bg-white rounded-3xl p-10 mb-12 text-left">
          <p className="text-emerald-800 font-medium mb-6">While you wait, here are some helpful resources:</p>
          
          <div className="space-y-6">
            <Link href="/resources/checklist" className="flex items-start gap-5 group">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex-shrink-0 flex items-center justify-center">
                <Download className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-emerald-700">What To Do When Someone Dies in Gauteng</h3>
                <p className="text-sm text-zinc-600">Step-by-step checklist + important contacts</p>
              </div>
            </Link>

            <Link href="/resources/planning-workbook" className="flex items-start gap-5 group">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex-shrink-0 flex items-center justify-center">
                <Download className="w-6 h-6 text-emerald-700" />
              </div>
              <div>
                <h3 className="font-semibold group-hover:text-emerald-700">Free Funeral Planning Workbook</h3>
                <p className="text-sm text-zinc-600">Editable templates for wishes, budget, programs & more</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <Link 
            href="/funeral-homes"
            className="block w-full bg-emerald-700 text-white py-5 rounded-2xl font-medium hover:bg-emerald-800 transition"
          >
            Browse More Funeral Homes
          </Link>
          
          <Link 
            href="/"
            className="block w-full border border-zinc-300 py-5 rounded-2xl font-medium hover:bg-zinc-50 transition"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}