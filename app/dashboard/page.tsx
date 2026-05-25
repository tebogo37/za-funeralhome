// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  suburb: string;
  source: string;
  funeral_home_name?: string;
  status: 'new' | 'forwarded' | 'converted' | 'not_converted';
};

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

export default function LeadsDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

    if (dateFrom) query = query.gte('created_at', dateFrom);
    if (dateTo) query = query.lte('created_at', dateTo);

    const { data, error } = await query;

    if (error) console.error(error);
    else setLeads(data || []);
    setLoading(false);
  };

  // Stats
  const filteredLeads = leads.filter(lead => {
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    return matchesStatus && matchesSource;
  });

  const total = filteredLeads.length;
  const newLeads = filteredLeads.filter(l => l.status === 'new').length;
  const forwarded = filteredLeads.filter(l => l.status === 'forwarded').length;
  const converted = filteredLeads.filter(l => l.status === 'converted').length;

  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

  // Pie Data
  const statusData = [
    { name: 'New', value: newLeads, color: '#eab308' },
    { name: 'Forwarded', value: forwarded, color: '#3b82f6' },
    { name: 'Converted', value: converted, color: '#10b981' },
    { name: 'Not Converted', value: total - newLeads - forwarded - converted, color: '#ef4444' },
  ];

  const sourceData = Object.entries(
    filteredLeads.reduce((acc, l) => {
      acc[l.source] = (acc[l.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-semibold text-emerald-950">Leads Dashboard</h1>
          <button onClick={fetchLeads} className="bg-emerald-700 text-white px-6 py-3 rounded-2xl hover:bg-emerald-800">
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-3xl shadow mb-8 flex flex-wrap gap-6">
          <div>
            <label className="block text-sm text-zinc-500 mb-2">From</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border rounded-xl px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm text-zinc-500 mb-2">To</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border rounded-xl px-4 py-2" />
          </div>
          <div>
            <label className="block text-sm text-zinc-500 mb-2">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-xl px-4 py-2">
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="forwarded">Forwarded</option>
              <option value="converted">Converted</option>
              <option value="not_converted">Not Converted</option>
            </select>
          </div>
        </div>

        {/* Stats + Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 bg-white rounded-3xl shadow p-8">
            <h3 className="font-semibold text-xl mb-6">Conversion Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={80} outerRadius={120} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow p-8">
            <h3 className="font-semibold text-xl mb-6">Source Breakdown</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sourceData} cx="50%" cy="50%" outerRadius={110} dataKey="value" label>
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Full Leads Table */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <div className="p-8 border-b flex justify-between items-center">
            <h2 className="text-2xl font-semibold">All Leads ({total})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 border-b">
                  <th className="text-left p-6 font-medium">Date</th>
                  <th className="text-left p-6 font-medium">Name</th>
                  <th className="text-left p-6 font-medium">Phone</th>
                  <th className="text-left p-6 font-medium">Suburb</th>
                  <th className="text-left p-6 font-medium">Source</th>
                  <th className="text-left p-6 font-medium">Funeral Home</th>
                  <th className="text-left p-6 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-zinc-50">
                    <td className="p-6 text-sm text-zinc-500">
                      {new Date(lead.created_at).toLocaleDateString('en-ZA')}
                    </td>
                    <td className="p-6 font-medium">{lead.name}</td>
                    <td className="p-6">{lead.phone}</td>
                    <td className="p-6">{lead.suburb}</td>
                    <td className="p-6 text-sm capitalize">{lead.source}</td>
                    <td className="p-6 text-emerald-700 font-medium">
                      {lead.funeral_home_name || 'General'}
                    </td>
                    <td className="p-6">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                        className="bg-white border border-zinc-300 rounded-xl px-4 py-2 text-sm"
                      >
                        <option value="new">New</option>
                        <option value="forwarded">Forwarded</option>
                        <option value="converted">Converted</option>
                        <option value="not_converted">Not Converted</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}