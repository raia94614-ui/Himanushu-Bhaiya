'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Video,
  BookOpen,
  Calendar,
  Clock,
  Eye,
  Upload,
  ClipboardCheck,
  PenSquare,
  ChevronRight,
  Activity,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { TEACHER_MOCK, TEACHER_BATCHES } from '@/lib/mock-data';

const stats = [
  { label: 'Assigned Batches', value: TEACHER_MOCK.assignedBatches, icon: Users, suffix: '' },
  { label: 'Total Students', value: TEACHER_MOCK.totalStudents, icon: Users, suffix: '' },
  { label: 'Total Lectures', value: TEACHER_MOCK.totalLectures, icon: Video, suffix: '' },
  { label: 'Upcoming Classes', value: TEACHER_MOCK.upcomingClasses, icon: Calendar, suffix: '' },
];

const quickActions = [
  { label: 'Upload Material', icon: Upload, href: '/teacher/upload-material', color: '#c9a84c' },
  { label: 'Create Test', icon: PenSquare, href: '/teacher/create-test', color: '#3b82f6' },
  { label: 'Mark Attendance', icon: ClipboardCheck, href: '/teacher/attendance', color: '#10b981' },
  { label: 'View Students', icon: Eye, href: '/teacher/students', color: '#8b5cf6' },
];

export default function TeacherDashboardPage() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Welcome back, Dr. Priya Anand 👋
              </h1>
              <p className="text-slate-300 text-sm mt-1">{today}</p>
              <p className="text-xs mt-2 font-semibold" style={{ color: '#c9a84c' }}>
                Faculty ID: HC-FAC-2019-042
              </p>
            </div>
            <div
              className="rounded-xl px-5 py-3 text-center border"
              style={{ borderColor: '#c9a84c33', background: '#c9a84c18' }}
            >
              <p className="text-xs text-slate-400 font-medium">Next Class</p>
              <p className="text-sm font-bold" style={{ color: '#c9a84c' }}>
                Mon/Wed/Fri — 9:00 AM
              </p>
              <p className="text-xs text-slate-300 mt-0.5">Hall 1 · UPSC Foundation</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl p-5 text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0a1628 0%, #12204a 100%)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: '#c9a84c22' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: '#c9a84c' }} />
                  </div>
                </div>
                <p className="text-3xl font-extrabold" style={{ color: '#c9a84c' }}>
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Batches Table */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div
              className="px-6 py-4 border-b flex items-center justify-between"
              style={{ borderColor: '#e2e8f0' }}
            >
              <h2 className="font-bold text-base text-[#0a1628]">My Batches</h2>
              <a
                href="/teacher/batches"
                className="text-xs font-semibold flex items-center gap-1"
                style={{ color: '#c9a84c' }}
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Batch Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Course</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Students</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Schedule</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Room</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TEACHER_BATCHES.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-semibold text-[#0a1628] text-xs">{batch.name}</td>
                      <td className="px-4 py-4 text-slate-600 text-xs">{batch.course}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-bold text-[#0a1628] text-sm">{batch.students}</span>
                      </td>
                      <td className="px-4 py-4 text-slate-500 text-xs hidden md:table-cell">{batch.schedule}</td>
                      <td className="px-4 py-4 text-slate-500 text-xs hidden lg:table-cell">{batch.room}</td>
                      <td className="px-4 py-4 text-center">
                        <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {batch.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <a
                          href="/teacher/students"
                          className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90"
                          style={{ background: '#0a1628' }}
                        >
                          <Eye className="w-3 h-3" /> View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h2 className="font-bold text-base text-[#0a1628] mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" style={{ color: '#c9a84c' }} /> Recent Activity
              </h2>
              <ul className="space-y-4">
                {TEACHER_MOCK.recentActivity.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ background: '#c9a84c' }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#0a1628]">{item.action}</p>
                      <p className="text-xs text-slate-500">{item.detail}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h2 className="font-bold text-base text-[#0a1628] mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <a
                      key={action.label}
                      href={action.href}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-transparent hover:border-[#c9a84c]/30 transition-all group"
                      style={{ background: '#0a162808' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                        style={{ background: action.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">
                        {action.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
