'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { PERFORMANCE_DATA, SUBJECT_WISE, TEST_RESULTS } from '@/lib/mock-data';
import { Award, BarChart3, Target, TrendingUp } from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';
const BG = '#f8f9fc';

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { label: 'Tests Given', value: '18', icon: BarChart3, color: NAVY, bg: '#dbeafe' },
    { label: 'Avg Score', value: '72%', icon: TrendingUp, color: '#7c3aed', bg: '#ede9fe' },
    { label: 'Best Score', value: '81%', icon: Award, color: GOLD, bg: '#fef3c7' },
    { label: 'Current Rank', value: '#47', icon: Target, color: '#10b981', bg: '#d1fae5' },
  ];

  const radarData = SUBJECT_WISE.map(s => ({ subject: s.subject, A: s.score, fullMark: 100 }));

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="p-6 space-y-6" style={{ background: BG, minHeight: '100vh' }}>
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-24" />)}
          </div>
          <div className="animate-pulse bg-gray-200 rounded-2xl h-72" />
          <div className="grid grid-cols-2 gap-6">
            <div className="animate-pulse bg-gray-200 rounded-2xl h-72" />
            <div className="animate-pulse bg-gray-200 rounded-2xl h-72" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="p-6 space-y-6" style={{ background: BG, minHeight: '100vh' }}>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>Results & Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">Track your performance trends and subject-wise strengths</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: s.bg }}>
                <s.icon size={24} style={{ color: s.color }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: NAVY }}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Area Chart: Performance Over Time */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-bold mb-1" style={{ color: NAVY }}>Score Trend Over Time</h2>
          <p className="text-sm text-gray-400 mb-4">Your score vs class average over the last 5 months</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NAVY_MID} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={NAVY_MID} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GOLD} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[40, 100]} />
              <Tooltip
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                formatter={(val: number, name: string) => [`${val}%`, name === 'score' ? 'Your Score' : 'Class Avg']}
              />
              <Area type="monotone" dataKey="score" stroke={NAVY_MID} strokeWidth={2.5} fill="url(#scoreGrad)" name="score" />
              <Area type="monotone" dataKey="average" stroke={GOLD} strokeWidth={2} fill="url(#avgGrad)" strokeDasharray="5 5" name="average" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-2 justify-center">
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-6 h-0.5 bg-blue-800 inline-block" /> Your Score
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-6 h-0.5 inline-block" style={{ background: GOLD }} /> Class Average
            </span>
          </div>
        </div>

        {/* Two Column: Radar + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Radar Chart: Subject-Wise */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-bold mb-1" style={{ color: NAVY }}>Subject-Wise Performance</h2>
            <p className="text-sm text-gray-400 mb-4">Strength distribution across subjects</p>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#6b7280' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#9ca3af' }} />
                <Radar name="Score" dataKey="A" stroke={NAVY_MID} fill={NAVY_MID} fillOpacity={0.35} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
            {/* Subject Score List */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {SUBJECT_WISE.map(s => (
                <div key={s.subject} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-600">{s.subject}</span>
                  <span className="text-xs font-bold" style={{ color: s.score >= 75 ? '#16a34a' : s.score >= 65 ? GOLD : '#ef4444' }}>
                    {s.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Test Results Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-bold mb-4" style={{ color: NAVY }}>Recent Test Results</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    {['Test Name', 'Date', 'Score', '%', 'Rank', 'Accuracy'].map(h => (
                      <th key={h} className="text-left py-2 px-2 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TEST_RESULTS.map((r, idx) => (
                    <tr key={r.id} className={`border-b border-gray-50 hover:bg-gray-50 ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                      <td className="py-3 px-2">
                        <div className="font-medium text-gray-700 text-xs leading-tight">{r.title}</div>
                      </td>
                      <td className="py-3 px-2 text-xs text-gray-400 whitespace-nowrap">
                        {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                      <td className="py-3 px-2 font-semibold text-xs" style={{ color: NAVY }}>{r.score}/{r.maxScore}</td>
                      <td className="py-3 px-2">
                        <span className="px-1.5 py-0.5 rounded text-xs font-bold"
                          style={{ background: r.percentage >= 70 ? '#dcfce7' : '#fef9c3', color: r.percentage >= 70 ? '#16a34a' : '#ca8a04' }}>
                          {r.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-2 font-bold text-xs" style={{ color: GOLD }}>#{r.rank}</td>
                      <td className="py-3 px-2 text-xs text-gray-600">{r.accuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
