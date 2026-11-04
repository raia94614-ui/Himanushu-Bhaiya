'use client';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LIVE_CLASSES } from '@/lib/mock-data';
import { Video, Clock, User, Play, PlayCircle, Calendar, MonitorPlay } from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';
const BG = '#f8f9fc';

const subjectGradients: Record<string, string> = {
  History: 'linear-gradient(135deg, #b45309, #f59e0b)',
  Geography: 'linear-gradient(135deg, #065f46, #10b981)',
  Economy: 'linear-gradient(135deg, #1e40af, #3b82f6)',
  Polity: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
  default: `linear-gradient(135deg, ${NAVY}, ${NAVY_MID})`,
};

function getGradient(title: string): string {
  for (const key of Object.keys(subjectGradients)) {
    if (title.toLowerCase().includes(key.toLowerCase())) return subjectGradients[key];
  }
  return subjectGradients.default;
}

const weekSchedule = [
  { day: 'Monday', subject: 'History', instructor: 'Dr. Himanshu Sharma', time: '9:00 AM', room: 'Hall 1' },
  { day: 'Monday', subject: 'Economy', instructor: 'Meera Verma', time: '2:00 PM', room: 'Hall 3' },
  { day: 'Tuesday', subject: 'Geography', instructor: 'Dr. Priya Anand', time: '9:00 AM', room: 'Hall 2' },
  { day: 'Tuesday', subject: 'Polity', instructor: 'Rajesh Kumar Singh', time: '11:00 AM', room: 'Hall 1' },
  { day: 'Wednesday', subject: 'History', instructor: 'Dr. Himanshu Sharma', time: '9:00 AM', room: 'Hall 1' },
  { day: 'Wednesday', subject: 'Current Affairs', instructor: 'Dr. Kavita Rao', time: '4:00 PM', room: 'Online' },
  { day: 'Thursday', subject: 'CSAT', instructor: 'Ankit Malhotra', time: '10:00 AM', room: 'Hall 2' },
  { day: 'Friday', subject: 'Geography', instructor: 'Dr. Priya Anand', time: '9:00 AM', room: 'Hall 2' },
  { day: 'Saturday', subject: 'Essay Writing', instructor: 'Dr. Himanshu Sharma', time: '10:00 AM', room: 'Hall 1' },
];

export default function LiveClassesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const upcoming = LIVE_CLASSES.filter(c => c.status === 'upcoming');
  const completed = LIVE_CLASSES.filter(c => c.status === 'completed');
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const subjectBadgeColor: Record<string, { bg: string; color: string }> = {
    History: { bg: '#fef3c7', color: '#b45309' },
    Geography: { bg: '#d1fae5', color: '#065f46' },
    Economy: { bg: '#dbeafe', color: '#1e40af' },
    Polity: { bg: '#ede9fe', color: '#7c3aed' },
    CSAT: { bg: '#fce7f3', color: '#9d174d' },
    Essay: { bg: '#f0fdf4', color: '#15803d' },
    'Current Affairs': { bg: '#fff7ed', color: '#c2410c' },
  };

  function getBadge(subject: string) {
    for (const key of Object.keys(subjectBadgeColor)) {
      if (subject.toLowerCase().includes(key.toLowerCase())) return subjectBadgeColor[key];
    }
    return { bg: '#f3f4f6', color: '#374151' };
  }

  if (loading) {
    return (
      <DashboardLayout role="student">
        <div className="p-6 space-y-4" style={{ background: BG, minHeight: '100vh' }}>
          <div className="animate-pulse bg-gray-200 rounded-2xl h-32" />
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(i => <div key={i} className="animate-pulse bg-gray-200 rounded-2xl h-56" />)}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="student">
      <div className="p-6 space-y-8" style={{ background: BG, minHeight: '100vh' }}>

        {/* Hero Banner */}
        <div className="rounded-2xl p-7 flex items-center justify-between overflow-hidden relative"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY_MID} 100%)` }}>
          <div className="absolute right-0 top-0 w-64 h-full opacity-5">
            <MonitorPlay size={200} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-green-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Live Now
              </span>
            </div>
            <h1 className="text-3xl font-bold text-white">Today's Live Classes</h1>
            <p className="text-blue-200 mt-1">{today}</p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-white text-4xl font-bold">{upcoming.length}</div>
            <div className="text-blue-200 text-sm">Classes Scheduled</div>
          </div>
        </div>

        {/* Happening Now / Today */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xl font-bold" style={{ color: NAVY }}>Today's Upcoming Classes</h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
              {upcoming.length} scheduled
            </span>
          </div>
          {upcoming.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center text-gray-400 border border-gray-100">
              No upcoming classes scheduled for today.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {upcoming.map((cls) => (
                <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                  {/* Gradient Thumbnail */}
                  <div className="h-36 flex items-center justify-center relative"
                    style={{ background: getGradient(cls.title) }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white text-5xl font-black opacity-20">{cls.title[0]}</span>
                    </div>
                    <div className="relative z-10 text-center">
                      <PlayCircle size={48} className="text-white mx-auto opacity-90" />
                      <span className="flex items-center justify-center gap-1.5 mt-2 text-white text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Starts at {cls.time}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-base">{cls.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <User size={13} />
                      <span>{cls.instructor}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12} />{cls.duration}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} />
                        {new Date(cls.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-green-600 hover:bg-green-700 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Join Live Class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Completed Today */}
        {completed.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4" style={{ color: NAVY }}>Completed Today</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completed.map((cls) => (
                <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-start gap-4 opacity-80">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: getGradient(cls.title) }}>
                    <Video size={22} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-700">{cls.title}</h3>
                    <p className="text-xs text-gray-400">{cls.instructor} · {cls.time} · {cls.duration}</p>
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border"
                    style={{ borderColor: NAVY_MID, color: NAVY_MID }}>
                    <Play size={12} /> Recording
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* This Week's Schedule */}
        <section>
          <h2 className="text-xl font-bold mb-4" style={{ color: NAVY }}>This Week's Schedule</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: NAVY }}>
                    {['Day', 'Subject', 'Instructor', 'Time', 'Room'].map(h => (
                      <th key={h} className="text-left py-3 px-4 text-white font-semibold text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {weekSchedule.map((row, idx) => {
                    const badge = getBadge(row.subject);
                    return (
                      <tr key={idx} className={`border-b border-gray-50 hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="py-3 px-4 font-semibold text-gray-700">{row.day}</td>
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: badge.bg, color: badge.color }}>{row.subject}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{row.instructor}</td>
                        <td className="py-3 px-4 text-gray-600 font-medium">{row.time}</td>
                        <td className="py-3 px-4 text-gray-500">{row.room}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
