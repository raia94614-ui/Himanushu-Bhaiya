'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ANNOUNCEMENTS } from '@/lib/mock-data';

const CATS = ['All', 'Admission', 'Event', 'Results', 'Material', 'Holiday'];
const CAT_COLORS: Record<string, string> = { Admission: '#0a1628', Event: '#8b5cf6', Results: '#22c55e', Material: '#3b82f6', Holiday: '#f97316' };

export default function AnnouncementsPage() {
  const [cat, setCat] = useState('All');
  const filtered = ANNOUNCEMENTS.filter(a => cat === 'All' || a.category === cat);
  return (
    <>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a6b)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-black text-white mb-4">News & Announcements</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#94a3b8' }}>Stay updated with the latest from Himanshu Classes</p>
        </div>
      </section>
      <section className="py-12" style={{ background: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={cat === c ? { background: '#0a1628', color: 'white' } : { background: 'white', color: '#64748b', border: '1px solid #e2e8f0' }}>
                {c}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filtered.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border hover:shadow-md transition-all"
                style={{ borderColor: '#e2e8f0', borderLeft: a.priority === 'high' ? '4px solid #c9a84c' : undefined }}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 text-center py-2 rounded-xl" style={{ background: '#f8f9fc' }}>
                    <div className="text-xl font-black" style={{ color: '#0a1628' }}>{new Date(a.date).getDate()}</div>
                    <div className="text-xs uppercase font-semibold" style={{ color: '#64748b' }}>{new Date(a.date).toLocaleString('default', { month: 'short' })}</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: CAT_COLORS[a.category] || '#0a1628' }}>{a.category}</span>
                      {a.priority === 'high' && <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c' }}>Important</span>}
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: '#0a1628' }}>{a.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{a.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
