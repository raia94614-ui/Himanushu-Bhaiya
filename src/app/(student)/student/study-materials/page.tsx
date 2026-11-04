'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { STUDY_MATERIALS_PUBLIC } from '@/lib/mock-data';
import { Download, Lock, FileText, Video, BookOpen, CheckCircle } from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';
const BG = '#f8f9fc';

const SUBJECTS = ['All', 'History', 'Geography', 'Polity', 'Economy', 'Science', 'Environment'];

const EXTRA_MATERIALS = [
  { id: '6', title: 'Environment & Ecology — Master Notes', subject: 'Environment', type: 'PDF', pages: 95, downloads: 22000, preview: true, free: true },
  { id: '7', title: 'Medieval History Comprehensive PDF', subject: 'History', type: 'PDF', pages: 180, downloads: 15000, preview: false, free: false },
  { id: '8', title: 'Geography Map Work Series', subject: 'Geography', type: 'Video', pages: null, duration: '4h 30m', downloads: 9800, preview: false, free: false },
  { id: '9', title: 'Indian Economy Budget Analysis 2026', subject: 'Economy', type: 'PDF', pages: 68, downloads: 18500, preview: false, free: false },
  { id: '10', title: 'Science & Technology — Space & Defence', subject: 'Science', type: 'PDF', pages: 72, downloads: 11200, preview: false, free: false },
  { id: '11', title: 'Polity — Constitutional Amendments Full List', subject: 'Polity', type: 'PDF', pages: 42, downloads: 31000, preview: false, free: false },
  { id: '12', title: 'Environment — National Parks & Biosphere', subject: 'Environment', type: 'PDF', pages: 55, downloads: 7600, preview: false, free: false },
];

const ALL_MATERIALS = [...STUDY_MATERIALS_PUBLIC, ...EXTRA_MATERIALS];

const subjectColors: Record<string, { bg: string; color: string }> = {
  History: { bg: '#fef3c7', color: '#b45309' },
  Geography: { bg: '#d1fae5', color: '#065f46' },
  Polity: { bg: '#ede9fe', color: '#7c3aed' },
  Economy: { bg: '#dbeafe', color: '#1e40af' },
  Science: { bg: '#fee2e2', color: '#991b1b' },
  Environment: { bg: '#d1fae5', color: '#065f46' },
  'Current Affairs': { bg: '#fff7ed', color: '#c2410c' },
};

function getBadge(subject: string) {
  return subjectColors[subject] || { bg: '#f3f4f6', color: '#374151' };
}

export default function StudyMaterialsPage() {
  const [loading, setLoading] = useState(true);
  const [activeSubject, setActiveSubject] = useState('All');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = ALL_MATERIALS.filter(m =>
    activeSubject === 'All' || m.subject === activeSubject
  );

  function handleDownload(id: string) {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setDownloaded(prev => new Set(prev).add(id));
    }, 1500);
  }

  return (
    <DashboardLayout role="student">
      <div className="p-6" style={{ background: BG, minHeight: '100vh' }}>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Study Materials</h1>
          <p className="text-gray-500 text-sm mt-1">Access notes, PDFs, and video resources for your preparation</p>
        </div>

        {/* Subject Tab Filter */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 rounded-2xl bg-white shadow-sm border border-gray-100 w-fit">
          {SUBJECTS.map(s => (
            <button
              key={s}
              onClick={() => setActiveSubject(s)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={activeSubject === s
                ? { background: NAVY, color: '#fff' }
                : { background: 'transparent', color: '#6b7280' }
              }
            >
              {s}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-52" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{filtered.length} material{filtered.length !== 1 ? 's' : ''} found</p>

            {/* Free items info */}
            <div className="mb-4 rounded-xl p-3 bg-blue-50 border border-blue-100 flex items-center gap-3">
              <BookOpen size={16} className="text-blue-600" />
              <span className="text-sm text-blue-700">
                <strong>Free materials</strong> are available for instant download. 🔒 Locked materials require a premium plan.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((m) => {
                const badge = getBadge(m.subject);
                const isDone = downloaded.has(m.id);
                const isLoading = downloading === m.id;
                const isFree = (m as any).free !== false;

                return (
                  <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all relative">
                    {/* Lock Overlay for Premium */}
                    {!isFree && (
                      <div className="absolute inset-0 z-10 rounded-2xl backdrop-blur-sm bg-white bg-opacity-80 flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <Lock size={22} className="text-gray-400" />
                        </div>
                        <div className="text-center px-4">
                          <p className="text-sm font-semibold text-gray-700">Premium Content</p>
                          <p className="text-xs text-gray-400 mt-0.5">Upgrade to access this material</p>
                        </div>
                        <button className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                          style={{ background: GOLD }}>
                          Upgrade Plan
                        </button>
                      </div>
                    )}

                    {/* Color Top Bar */}
                    <div className="h-1.5" style={{ background: `${badge.color}` }} />

                    <div className="p-4">
                      {/* Type icon + Subject */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: badge.bg, color: badge.color }}>{m.subject}</span>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: badge.bg }}>
                          {m.type === 'PDF' ? <FileText size={18} style={{ color: badge.color }} /> : <Video size={18} style={{ color: badge.color }} />}
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-2">{m.title}</h3>

                      {/* Meta */}
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span>{m.type}</span>
                        {(m as any).pages && <span>{(m as any).pages} pages</span>}
                        {(m as any).duration && <span>{(m as any).duration}</span>}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                        <Download size={11} /> {m.downloads.toLocaleString('en-IN')} downloads
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownload(m.id)}
                        disabled={isLoading || isDone}
                        className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                        style={isDone
                          ? { background: '#dcfce7', color: '#16a34a' }
                          : { background: NAVY, color: '#fff', opacity: isLoading ? 0.7 : 1 }
                        }
                      >
                        {isDone ? (
                          <><CheckCircle size={14} /> Downloaded</>
                        ) : isLoading ? (
                          <><span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" /> Downloading...</>
                        ) : (
                          <><Download size={14} /> Download</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
