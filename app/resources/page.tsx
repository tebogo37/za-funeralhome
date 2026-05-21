// app/resources/page.tsx
import Link from 'next/link';
import { Download, FileText, Calendar, ArrowRight } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Funeral Resources & Guides | LastRespect',
    description: 'Practical guides, checklists, and planning tools to support families during difficult times in Gauteng.',
  };
}

export default function ResourcesPage() {
  return (
    <div className="bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-semibold tracking-tighter text-emerald-950 mb-6">
            Resources & Support
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Compassionate guides and practical tools to help you navigate funeral arrangements with clarity.
          </p>
        </div>

        {/* Main Lead Magnets - Side by Side */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* What To Do When Someone Dies */}
          <Link 
            href="/resources/checklist"
            className="group bg-white border border-zinc-100 rounded-3xl p-10 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8">
              <Calendar className="w-8 h-8 text-emerald-700" />
            </div>
            <h2 className="text-3xl font-semibold mb-4 group-hover:text-emerald-700 transition">
              What To Do When Someone Dies in Gauteng
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-8">
              Step-by-step checklist covering immediate actions, required documents, who to call, and important timelines.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-700 font-medium group-hover:gap-3 transition">
              Download Free Checklist <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Funeral Planning Workbook */}
          <Link 
            href="/resources/planning-workbook"
            className="group bg-white border border-zinc-100 rounded-3xl p-10 hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8">
              <FileText className="w-8 h-8 text-emerald-700" />
            </div>
            <h2 className="text-3xl font-semibold mb-4 group-hover:text-emerald-700 transition">
              Free Funeral Planning Workbook
            </h2>
            <p className="text-zinc-600 text-lg leading-relaxed mb-8">
              Editable templates for final wishes, budget planning, funeral programs, readings, songs, guest list and more.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-700 font-medium group-hover:gap-3 transition">
              Get Editable Templates <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Other Resources */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-emerald-950 mb-8">More Helpful Guides</h3>
        </div>

        <div className="grid gap-8">
          {[
            {
              title: "Burial vs Cremation in South Africa",
              excerpt: "A compassionate comparison including costs, processes, and cultural considerations in Gauteng.",
              readTime: "8 min"
            },
            {
              title: "Funeral Costs in Gauteng 2026",
              excerpt: "Transparent breakdown of current pricing for burial, cremation, and full packages.",
              readTime: "10 min"
            },
            {
              title: "How to Choose a Funeral Home",
              excerpt: "Key questions to ask and important factors to consider when making this difficult decision.",
              readTime: "6 min"
            }
          ].map((resource, index) => (
            <Link 
              key={index}
              href="#"
              className="group bg-white border border-zinc-100 rounded-3xl p-10 hover:shadow-xl transition-all hover:-translate-y-1 flex justify-between items-start"
            >
              <div>
                <h3 className="text-2xl font-semibold group-hover:text-emerald-700 transition mb-3">
                  {resource.title}
                </h3>
                <p className="text-zinc-600 pr-12">{resource.excerpt}</p>
              </div>
              <div className="text-sm text-emerald-600 whitespace-nowrap pt-2">
                {resource.readTime} read →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}