'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { STUDENT_MOCK, ENROLLED_COURSES, UPCOMING_TESTS, TEST_RESULTS, LIVE_CLASSES } from '@/lib/mock-data';
import Link from 'next/link';
import {
  BookOpen, Video, FileCheck2, BarChart3, TrendingUp, Clock,
  Award, CalendarCheck2, Bell, ChevronRight, PlayCircle, Target,
  Zap, Star, ArrowRight
} from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';
const BG = '#f8f9fc';

function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-xl ${className}`} />
  );
}

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    const clock = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => { clearTimeout(timer); clearInterval(clock); };
  }, []);

  const getGreeting = () => {
    const h = currentTime.getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatDate = () =>
    currentTime.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const upcomingLive = LIVE_CLASSES.filter(c => c.status === 'upcoming');

  const stats = [
    { label: 'Courses Enrolled', value: '3', sub: 'Active courses', icon: BookOpen, border: NAVY, bg: '#eef2ff' },
    { label: 'Lessons Completed', value: '142/340', sub: '41.7% complete', icon: FileCheck2, border: GOLD, bg: '#fffbeb' },
    { label: 'Avg Score', value: '72%', sub: 'Last 10 tests', icon: BarChart3, border: '#10b981', bg: '#ecfdf5' },
    { label: 'Current Rank', value: '#47', sub: 'Out of 1,240', icon: Award, border: '#f59e0b', bg: '#fffbeb' },
  ];

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="p-6 space-y-6" style={{ background: BG, minHeight: '100vh' }}>
          <SkeletonCard className="h-24 w-full" />
          <div className="grid grid-cols-4 gap-4">
            {[1,2,3,4].map(i => <SkeletonCard key={i} className="h-28" />)}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <SkeletonCard className="h-72" />
            <SkeletonCard className="h-72" />
          </div>
          <SkeletonCard className="h-48" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="p-6 space-y-6" style={{ background: BG, minHeight: '100vh' }}>

        {/* Welcome Header */}
        <div className="rounded-2xl p-6 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)` }}>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {getGreeting()}, {STUDENT_MOCK.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-blue-200 mt-1 text-sm">{formatDate()}</p>
            <div className="mt-3 flex items-center gap-4">
              <span className="flex items-center gap-1 text-sm" style={{ color: GOLD }}>
                <Clock size={14} /> {STUDENT_MOCK.nextClass}
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Bell size={16} className="text-yellow-300" />
              <span className="text-white text-sm font-medium">{STUDENT_MOCK.notifications} new notifications</span>
            </div>
            <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
              <Target size={16} className="text-green-300" />
              <span className="text-white text-sm">Profile {STUDENT_MOCK.profileCompletion}% complete</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-4"
              style={{ borderLeft: `4px solid ${s.border}` }}>
              <div className="rounded-lg p-2" style={{ background: s.bg }}>
                <s.icon size={22} style={{ color: s.border }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: NAVY }}>{s.value}</div>
                <div className="text-sm font-medium text-gray-700">{s.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* My Enrolled Courses */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: NAVY }}>My Enrolled Courses</h2>
              <Link href="/student/courses" className="text-sm font-medium flex items-center gap-1" style={{ color: GOLD }}>
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {ENROLLED_COURSES.map((c) => {
                const progressColor = c.progress >= 75 ? GOLD : NAVY;
                return (
                  <div key={c.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{c.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{c.instructor}</p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: progressColor }}>{c.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div className="h-2 rounded-full transition-all duration-500"
                        style={{ width: `${c.progress}%`, background: progressColor }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{c.completedLessons}/{c.totalLessons} lessons</span>
                      <Link href="/student/courses"
                        className="text-xs font-semibold px-3 py-1 rounded-full text-white flex items-center gap-1"
                        style={{ background: NAVY }}>
                        Continue <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Tests */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: NAVY }}>Upcoming Tests</h2>
              <Link href="/student/tests" className="text-sm font-medium flex items-center gap-1" style={{ color: GOLD }}>
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {UPCOMING_TESTS.map((t) => (
                <div key={t.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{t.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
                          style={{ background: NAVY_MID }}>{t.subject}</span>
                        <span className="text-xs text-gray-400">{t.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><CalendarCheck2 size={12} />
                      {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                    <span className="flex items-center gap-1"><Clock size={12} />{t.time}</span>
                    <span className="flex items-center gap-1"><Star size={12} />{t.duration}</span>
                  </div>
                  <Link href="/student/tests"
                    className="text-xs font-semibold px-3 py-1.5 rounded-full border w-full text-center block"
                    style={{ borderColor: GOLD, color: GOLD }}>
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's Live Classes */}
        {upcomingLive.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ color: NAVY }}>Today's Live Classes</h2>
              <Link href="/student/live-classes" className="text-sm font-medium flex items-center gap-1" style={{ color: GOLD }}>
                Schedule <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingLive.map((cls) => (
                <div key={cls.id} className="rounded-xl border border-green-100 p-4 bg-green-50 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 flex-shrink-0">
                    <Video size={18} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-800 leading-tight truncate">{cls.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{cls.instructor}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{cls.time}</span>
                      <span className="text-xs text-gray-400">· {cls.duration}</span>
                    </div>
                    <button className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-full bg-green-600 hover:bg-green-700 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Join Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Results */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold" style={{ color: NAVY }}>Recent Results</h2>
            <Link href="/student/results" className="text-sm font-medium flex items-center gap-1" style={{ color: GOLD }}>
              Full Analysis <ChevronRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Test</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Score</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-500 uppercase">%</th>
                  <th className="text-center py-2 px-3 text-xs font-semibold text-gray-500 uppercase">Rank</th>
                </tr>
              </thead>
              <tbody>
                {TEST_RESULTS.slice(0, 2).map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-3">
                      <div className="font-medium text-gray-700">{r.title}</div>
                      <div className="text-xs text-gray-400">{new Date(r.date).toLocaleDateString('en-IN')}</div>
                    </td>
                    <td className="py-3 px-3 text-center font-semibold" style={{ color: NAVY }}>{r.score}/{r.maxScore}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: r.percentage >= 70 ? '#dcfce7' : '#fef9c3', color: r.percentage >= 70 ? '#16a34a' : '#ca8a04' }}>
                        {r.percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-bold" style={{ color: GOLD }}>#{r.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Go to Courses', href: '/student/courses', icon: BookOpen, color: NAVY },
            { label: 'Take a Test', href: '/student/tests', icon: FileCheck2, color: '#7c3aed' },
            { label: 'Study Materials', href: '/student/study-materials', icon: TrendingUp, color: '#0891b2' },
            { label: 'View Results', href: '/student/results', icon: BarChart3, color: '#059669' },
          ].map((a) => (
            <Link key={a.label} href={a.href}
              className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${a.color}18` }}>
                <a.icon size={20} style={{ color: a.color }} />
              </div>
              <span className="font-semibold text-gray-700 text-sm group-hover:text-gray-900">{a.label}</span>
              <ChevronRight size={14} className="ml-auto text-gray-400" />
            </Link>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
