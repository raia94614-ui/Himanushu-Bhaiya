'use client';
import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { UPCOMING_TESTS, TEST_RESULTS } from '@/lib/mock-data';
import Link from 'next/link';
import { Clock, Award, BarChart3, Target, CheckCircle2, Calendar, ArrowRight, BookOpen } from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';
const BG = '#f8f9fc';

type Tab = 'upcoming' | 'ongoing' | 'completed';

function useCountdown(targetDate: string, targetTime: string) {
  const getSeconds = useCallback(() => {
    const now = new Date();
    const target = new Date(`${targetDate}T${convertTo24h(targetTime)}`);
    const diff = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
    return diff;
  }, [targetDate, targetTime]);

  const [seconds, setSeconds] = useState(getSeconds);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(getSeconds()), 1000);
    return () => clearInterval(interval);
  }, [getSeconds]);

  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return { d, h, m, s, total: seconds };
}

function convertTo24h(time: string) {
  const [t, meridiem] = time.split(' ');
  let [hours, minutes] = t.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}

function CountdownTimer({ date, time }: { date: string; time: string }) {
  const { d, h, m, s, total } = useCountdown(date, time);

  if (total === 0) return <span className="text-red-500 text-xs font-bold">Started / Expired</span>;

  return (
    <div className="flex items-center gap-1">
      {d > 0 && (
        <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#dbeafe', color: '#1e40af' }}>
          {d}d
        </span>
      )}
      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#fee2e2', color: '#b91c1c' }}>
        {String(h).padStart(2, '0')}h
      </span>
      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#fff7ed', color: '#c2410c' }}>
        {String(m).padStart(2, '0')}m
      </span>
      <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: '#f3f4f6', color: '#374151' }}>
        {String(s).padStart(2, '0')}s
      </span>
    </div>
  );
}

export default function TestsPage() {
  const [tab, setTab] = useState<Tab>('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { label: 'Tests Attempted', value: '18', icon: BookOpen, color: NAVY, bg: '#dbeafe' },
    { label: 'Avg Score', value: '72%', icon: BarChart3, color: '#7c3aed', bg: '#ede9fe' },
    { label: 'Best Rank', value: '#28', icon: Award, color: GOLD, bg: '#fef3c7' },
    { label: 'Accuracy', value: '79%', icon: Target, color: '#10b981', bg: '#d1fae5' },
  ];

  const subjectColors: Record<string, { bg: string; color: string }> = {
    'General Studies I': { bg: '#dbeafe', color: '#1e40af' },
    'CSAT': { bg: '#ede9fe', color: '#7c3aed' },
    'Essay': { bg: '#fef3c7', color: '#b45309' },
    'Polity': { bg: '#d1fae5', color: '#065f46' },
  };

  function getSubjectBadge(subject: string) {
    return subjectColors[subject] || { bg: '#f3f4f6', color: '#374151' };
  }

  return (
    <DashboardLayout role="student">
      <div className="p-6 space-y-6" style={{ background: BG, minHeight: '100vh' }}>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: NAVY }}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div>
          <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: '#e5e7eb' }}>
            {(['upcoming', 'ongoing', 'completed'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-6 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
                style={tab === t ? { background: NAVY, color: '#fff' } : { background: 'transparent', color: '#6b7280' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-36" />)}
          </div>
        ) : (
          <>
            {/* UPCOMING TAB */}
            {tab === 'upcoming' && (
              <div className="space-y-4">
                {UPCOMING_TESTS.map((t) => {
                  const badge = getSubjectBadge(t.subject);
                  return (
                    <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-gray-800">{t.title}</h3>
                            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                              style={{ background: badge.bg, color: badge.color }}>{t.subject}</span>
                            <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-600">{t.type}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1.5"><Calendar size={13} />
                              {new Date(t.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} at {t.time}
                            </span>
                            <span className="flex items-center gap-1.5"><Clock size={13} />{t.duration}</span>
                            <span className="flex items-center gap-1.5"><Award size={13} />{t.marks} marks</span>
                          </div>
                          <div className="mt-2">
                            <span className="text-xs text-gray-400">Starts in: </span>
                            <CountdownTimer date={t.date} time={t.time} />
                          </div>
                        </div>
                        <Link
                          href={`/student/tests/${t.id}/attempt`}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white flex-shrink-0 transition-opacity hover:opacity-90"
                          style={{ background: NAVY }}
                        >
                          Attempt Test <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ONGOING TAB */}
            {tab === 'ongoing' && (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <Clock size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 font-medium">No tests are currently in progress.</p>
                <p className="text-gray-400 text-sm mt-1">Check the upcoming tab to see scheduled tests.</p>
              </div>
            )}

            {/* COMPLETED TAB */}
            {tab === 'completed' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: NAVY }}>
                        {['Test Name', 'Date', 'Score', 'Percentage', 'Rank', 'Accuracy', 'Time Taken'].map(h => (
                          <th key={h} className="text-left py-3 px-4 text-white font-semibold text-xs uppercase tracking-wide whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TEST_RESULTS.map((r, idx) => (
                        <tr key={r.id} className={`border-b border-gray-50 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                          <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">{r.title}</td>
                          <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                            {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="py-3 px-4 font-bold" style={{ color: NAVY }}>{r.score}/{r.maxScore}</td>
                          <td className="py-3 px-4">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                              style={{ background: r.percentage >= 70 ? '#dcfce7' : '#fef9c3', color: r.percentage >= 70 ? '#16a34a' : '#ca8a04' }}>
                              {r.percentage}%
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold" style={{ color: GOLD }}>#{r.rank} <span className="text-gray-400 font-normal text-xs">/{r.totalStudents}</span></td>
                          <td className="py-3 px-4 text-gray-600">{r.accuracy}%</td>
                          <td className="py-3 px-4 text-gray-500">{r.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
