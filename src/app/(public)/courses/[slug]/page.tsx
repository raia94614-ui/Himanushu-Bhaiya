'use client';
import { COURSES } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, Users, Clock, CheckCircle, BookOpen, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = COURSES.find(c => c.slug === params.slug);
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  if (!course) return notFound();
  const discount = Math.round((1 - course.fee / course.originalFee) * 100);
  return (
    <div className="py-12" style={{ background: '#f8f9fc' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-sm" style={{ color: '#64748b' }}>
          <Link href="/" style={{ color: '#0a1628' }}>Home</Link> ›{' '}
          <Link href="/courses" style={{ color: '#0a1628' }}>Courses</Link> › {course.title}
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: '#e2e8f0' }}>
            <div className="h-56 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a6b)' }}>
              <div className="text-center">
                <BookOpen size={64} style={{ color: 'rgba(201,168,76,0.4)' }} className="mx-auto mb-4" />
                <h1 className="text-2xl font-black text-white">{course.title}</h1>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-sm" style={{ color: '#fbbf24' }}>
                    <Star size={14} fill="#fbbf24" /> {course.rating}
                  </span>
                  <span style={{ color: '#94a3b8' }}>•</span>
                  <span className="text-sm" style={{ color: '#94a3b8' }}>{course.reviews.toLocaleString()} reviews</span>
                  <span style={{ color: '#94a3b8' }}>•</span>
                  <span className="flex items-center gap-1 text-sm" style={{ color: '#94a3b8' }}>
                    <Users size={13} /> {course.students.toLocaleString()} students
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm mb-4" style={{ color: '#64748b' }}>Taught by <strong style={{ color: '#0a1628' }}>{course.teacher}</strong></p>
              <h2 className="font-bold text-lg mb-3" style={{ color: '#0a1628' }}>About this Course</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#64748b' }}>{course.description}</p>
              <h2 className="font-bold text-lg mb-3" style={{ color: '#0a1628' }}>What You Will Learn</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {course.highlights.map(h => (
                  <div key={h} className="flex items-start gap-2">
                    <CheckCircle size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} />
                    <span className="text-sm" style={{ color: '#1a202c' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Syllabus */}
          <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#e2e8f0' }}>
            <h2 className="font-bold text-lg mb-4" style={{ color: '#0a1628' }}>Course Syllabus</h2>
            {course.syllabus?.map((section, i) => (
              <div key={i} className="border rounded-xl mb-3 overflow-hidden" style={{ borderColor: '#e2e8f0' }}>
                <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left"
                  style={{ background: openIdx === i ? '#f8f9fc' : 'white' }}>
                  <span className="font-semibold text-sm" style={{ color: '#0a1628' }}>{section}</span>
                  <ChevronDown size={16} style={{ color: '#64748b', transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                </button>
                {openIdx === i && (
                  <div className="px-4 pb-4 text-sm" style={{ color: '#64748b' }}>
                    Comprehensive coverage of {section} with practice questions, previous year papers, and expert explanation videos.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-2xl border shadow-xl p-6" style={{ borderColor: '#e2e8f0' }}>
            <div className="mb-4">
              <span className="text-3xl font-black" style={{ color: '#0a1628' }}>₹{course.fee.toLocaleString('en-IN')}</span>
              <span className="text-lg line-through ml-3" style={{ color: '#94a3b8' }}>₹{course.originalFee.toLocaleString('en-IN')}</span>
              <span className="ml-2 text-sm font-bold px-2 py-0.5 rounded-md" style={{ background: '#f0fdf4', color: '#16a34a' }}>{discount}% OFF</span>
            </div>
            <Link href="/admission" className="block text-center py-3.5 rounded-xl font-bold mb-3 transition-all hover:shadow-lg hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c46a)', color: '#0a1628' }}>
              Enroll Now
            </Link>
            <Link href="/contact" className="block text-center py-3 rounded-xl font-semibold text-sm border-2 transition-all hover:bg-slate-50"
              style={{ borderColor: '#0a1628', color: '#0a1628' }}>
              Ask a Question
            </Link>
            <div className="mt-5 space-y-3 text-sm" style={{ color: '#64748b' }}>
              {[
                { label: 'Duration', value: course.duration },
                { label: 'Faculty', value: course.teacher },
                { label: 'Students', value: course.students.toLocaleString() },
                { label: 'Category', value: course.category },
                { label: 'Language', value: 'Hindi + English' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b" style={{ borderColor: '#f1f5f9' }}>
                  <span>{label}</span>
                  <span className="font-semibold" style={{ color: '#0a1628' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
