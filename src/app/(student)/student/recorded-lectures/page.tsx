'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { RECORDED_LECTURES } from '@/lib/mock-data';
import { Search, Play, Eye, Clock, Filter, BookOpen } from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';
const BG = '#f8f9fc';

const subjectGradients: Record<string, string> = {
  History: 'linear-gradient(135deg, #78350f, #f59e0b)',
  Geography: 'linear-gradient(135deg, #064e3b, #10b981)',
  Polity: 'linear-gradient(135deg, #4c1d95, #8b5cf6)',
  Economy: 'linear-gradient(135deg, #1e3a5f, #3b82f6)',
  Science: 'linear-gradient(135deg, #7f1d1d, #ef4444)',
  Environment: 'linear-gradient(135deg, #14532d, #22c55e)',
};

function getGradient(subject: string) {
  return subjectGradients[subject] || `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`;
}

const SUBJECTS = ['All', 'History', 'Geography', 'Polity', 'Economy', 'Science', 'Environment'];

const EXTRA_LECTURES = [
  { id: '5', title: 'Modern History: Independence Movement', instructor: 'Dr. Himanshu Sharma', duration: '2h 30m', views: 6100, subject: 'History', date: '2026-10-08' },
  { id: '6', title: 'Monsoon System in India', instructor: 'Dr. Priya Anand', duration: '1h 20m', views: 2900, subject: 'Geography', date: '2026-10-05' },
  { id: '7', title: 'Directive Principles of State Policy', instructor: 'Rajesh Kumar Singh', duration: '1h 50m', views: 4300, subject: 'Polity', date: '2026-10-01' },
  { id: '8', title: 'RBI Functions & Monetary Policy', instructor: 'Meera Verma', duration: '1h 40m', views: 3200, subject: 'Economy', date: '2026-09-25' },
];

const ALL_LECTURES = [...RECORDED_LECTURES, ...EXTRA_LECTURES];

export default function RecordedLecturesPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = ALL_LECTURES.filter(l => {
    const matchSubject = subject === 'All' || l.subject === subject;
    const matchSearch = search === '' || l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.instructor.toLowerCase().includes(search.toLowerCase());
    return matchSubject && matchSearch;
  });

  return (
    <DashboardLayout role="student">
      <div className="p-6" style={{ background: BG, minHeight: '100vh' }}>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Recorded Lectures</h1>
          <p className="text-gray-500 text-sm mt-1">Watch lectures anytime, anywhere at your own pace</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search lectures by title or instructor..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="pl-8 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 appearance-none cursor-pointer"
              style={{ minWidth: '160px' }}
            >
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Subject Pill Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SUBJECTS.map(s => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={subject === s
                ? { background: NAVY, color: '#fff' }
                : { background: '#fff', color: '#6b7280', border: '1px solid #e5e7eb' }
              }
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-64" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No lectures found matching your search.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{filtered.length} lecture{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((l) => (
                <div key={l.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                  {/* Thumbnail */}
                  <div
                    className="relative h-40 cursor-pointer"
                    style={{ background: getGradient(l.subject) }}
                    onMouseEnter={() => setHoveredId(l.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-5xl font-black opacity-10">{l.subject[0]}</span>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock size={10} /> {l.duration}
                    </div>

                    {/* Play overlay on hover */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${hoveredId === l.id ? 'opacity-100' : 'opacity-0'}`}
                      style={{ background: 'rgba(0,0,0,0.3)' }}>
                      <div className="w-14 h-14 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                        <Play size={24} style={{ color: NAVY }} />
                      </div>
                    </div>

                    {/* Subject badge */}
                    <div className="absolute bottom-2 left-2">
                      <span className="text-xs font-semibold bg-black bg-opacity-50 text-white px-2 py-0.5 rounded-full">{l.subject}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 mb-1">{l.title}</h3>
                    <p className="text-xs text-gray-400 mb-2">{l.instructor}</p>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Eye size={11} /> {l.views.toLocaleString('en-IN')} views</span>
                      <span>{new Date(l.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>

                    <button className="w-full py-2 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                      style={{ background: NAVY }}>
                      <Play size={14} /> Watch Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
