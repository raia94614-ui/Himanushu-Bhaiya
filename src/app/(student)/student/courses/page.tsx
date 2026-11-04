'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ENROLLED_COURSES } from '@/lib/mock-data';
import Link from 'next/link';
import { BookOpen, Clock, CheckCircle, ArrowRight, Star, User } from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';
const BG = '#f8f9fc';

const subjectColors: Record<string, string> = {
  'UPSC CSE Foundation': '#1e40af',
  'Current Affairs Daily': '#b45309',
  'UPSC Mains Test Series': '#6d28d9',
};

const completedCourses = [
  {
    id: 'c1', title: 'Prelims Foundation — 2023', instructor: 'Dr. Himanshu Rai',
    progress: 100, totalLessons: 120, completedLessons: 120, lastAccessed: '6 months ago',
    tags: ['History', 'Polity', 'Geography'], color: '#065f46'
  },
];

export default function StudentCoursesPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const courses = activeTab === 'active' ? ENROLLED_COURSES : completedCourses;

  return (
    <DashboardLayout role="student">
      <div className="p-6" style={{ background: BG, minHeight: '100vh' }}>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: NAVY }}>My Courses</h1>
          <p className="text-gray-500 text-sm mt-1">Track your learning progress across all enrolled courses</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-1 p-1 rounded-xl w-fit mb-6" style={{ background: '#e5e7eb' }}>
          {(['active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-2 rounded-lg text-sm font-semibold transition-all capitalize"
              style={activeTab === tab
                ? { background: NAVY, color: '#fff' }
                : { background: 'transparent', color: '#6b7280' }
              }
            >
              {tab === 'active' ? 'Active Courses' : 'Completed'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-72" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-4">{courses.length} course{courses.length !== 1 ? 's' : ''} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => {
                const isGold = c.progress >= 75;
                const progressColor = c.progress === 100 ? '#10b981' : isGold ? GOLD : NAVY;
                const cardColor = subjectColors[c.title] || NAVY_MID;

                return (
                  <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group">
                    {/* Course Color Banner */}
                    <div className="h-3" style={{ background: `linear-gradient(90deg, ${cardColor}, ${GOLD})` }} />

                    <div className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 text-base leading-tight">{c.title}</h3>
                          <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-xs">
                            <User size={12} />
                            <span>{c.instructor}</span>
                          </div>
                        </div>
                        <span
                          className="ml-2 flex-shrink-0 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                          style={c.progress === 100
                            ? { background: '#dcfce7', color: '#16a34a' }
                            : { background: '#dbeafe', color: '#1d4ed8' }
                          }
                        >
                          {c.progress === 100 ? '✓ Completed' : 'Active'}
                        </span>
                      </div>

                      {/* Subject Tags */}
                      {'tags' in c && Array.isArray((c as any).tags) ? (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {(c as any).tags.map((tag: string) => (
                            <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{tag}</span>
                          ))}
                        </div>
                      ) : null}

                      {/* Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-bold" style={{ color: progressColor }}>{c.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full transition-all duration-700"
                            style={{ width: `${c.progress}%`, background: progressColor }}
                          />
                        </div>
                        <div className="flex items-center justify-between mt-1.5 text-xs text-gray-400">
                          <span>{c.completedLessons}/{c.totalLessons} lessons completed</span>
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> Last: {c.lastAccessed}
                          </span>
                        </div>
                      </div>

                      {/* Next lesson */}
                      {c.progress < 100 && 'nextLesson' in c && (
                        <div className="text-xs text-gray-500 mb-4 bg-blue-50 rounded-lg px-3 py-2">
                          <span className="font-medium text-blue-700">Next: </span>
                          {(c as any).nextLesson}
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        href="/student/courses"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ background: c.progress === 100 ? '#10b981' : NAVY }}
                      >
                        {c.progress === 100 ? (
                          <><CheckCircle size={14} /> Review Course</>
                        ) : (
                          <>Continue Learning <ArrowRight size={14} /></>
                        )}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Browse More Courses CTA */}
            {activeTab === 'active' && (
              <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)` }}>
                <BookOpen size={32} className="mx-auto mb-2 text-yellow-300" />
                <h3 className="text-white font-bold text-lg">Explore More Courses</h3>
                <p className="text-blue-200 text-sm mt-1 mb-4">Expand your preparation with additional courses and test series</p>
                <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{ background: GOLD, color: NAVY }}>
                  Browse Courses <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </>
        )}

      </div>
    </DashboardLayout>
  );
}
