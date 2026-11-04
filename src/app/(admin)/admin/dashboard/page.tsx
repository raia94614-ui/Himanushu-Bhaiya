'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { ADMIN_STATS, RECENT_ADMISSIONS, REVENUE_DATA, ENQUIRIES } from '@/lib/mock-data';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Users, GraduationCap, BookOpen, TrendingUp, DollarSign, FileText,
  AlertCircle, CheckCircle, UserPlus, PlusCircle, BarChart3, Phone,
} from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';

function formatINR(amount: number) {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

const STAT_CARDS = [
  {
    label: 'Total Students',
    value: '4,847',
    change: '+12.4%',
    up: true,
    icon: Users,
    border: '#3b82f6',
    bg: '#eff6ff',
    iconColor: '#3b82f6',
  },
  {
    label: 'Active Students',
    value: '3,921',
    change: '+8.2%',
    up: true,
    icon: GraduationCap,
    border: '#10b981',
    bg: '#ecfdf5',
    iconColor: '#10b981',
  },
  {
    label: 'Total Teachers',
    value: '48',
    change: '+4',
    up: true,
    icon: BookOpen,
    border: '#8b5cf6',
    bg: '#f5f3ff',
    iconColor: '#8b5cf6',
  },
  {
    label: 'Total Courses',
    value: '24',
    change: '+3',
    up: true,
    icon: FileText,
    border: '#f59e0b',
    bg: '#fffbeb',
    iconColor: '#f59e0b',
  },
  {
    label: 'Monthly Revenue',
    value: '₹42.8L',
    change: '+7.1%',
    up: true,
    icon: DollarSign,
    border: '#c9a84c',
    bg: '#fefce8',
    iconColor: '#c9a84c',
  },
  {
    label: 'Pending Enquiries',
    value: '127',
    change: '-14',
    up: false,
    icon: AlertCircle,
    border: '#ef4444',
    bg: '#fef2f2',
    iconColor: '#ef4444',
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-lg">
        <p className="text-xs font-semibold text-slate-600 mb-1">{label}</p>
        <p className="text-sm font-bold text-[#0a1628]">{formatINR(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboardPage() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }));
  }, []);

  const enquiryStatusColor: Record<string, string> = {
    New: 'bg-orange-100 text-orange-700 border border-orange-200',
    Contacted: 'bg-blue-100 text-blue-700 border border-blue-200',
    Enrolled: 'bg-green-100 text-green-700 border border-green-200',
  };

  const admissionStatusColor: Record<string, string> = {
    Active: 'bg-green-100 text-green-700 border border-green-200',
    Pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0a1628] tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Overview of all institute operations
              {lastUpdated && <span className="ml-2 text-xs text-slate-400">• Last updated: {lastUpdated}</span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              System Online
            </span>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {STAT_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
                style={{ borderLeft: `4px solid ${card.border}` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: card.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium truncate">{card.label}</p>
                  <p className="text-2xl font-extrabold text-[#0a1628] mt-0.5 tracking-tight">{card.value}</p>
                </div>
                <div className={`text-xs font-bold px-2 py-1 rounded-lg ${card.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {card.change}
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Area Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-[#0a1628]">Revenue Overview</h2>
              <p className="text-xs text-slate-500 mt-0.5">Monthly revenue trend (May – Nov 2026)</p>
            </div>
            <div className="flex items-center gap-1.5 bg-[#fef9ec] text-[#c9a84c] text-xs font-bold px-3 py-1.5 rounded-full border border-[#c9a84c]/30">
              <TrendingUp className="w-3.5 h-3.5" />
              +52.8% YTD
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GOLD} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke={GOLD}
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
                dot={{ fill: GOLD, r: 4, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: GOLD, stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Two-Column Tables */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Admissions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0a1628]">Recent Admissions</h2>
              <a href="/admin/admissions" className="text-xs text-[#c9a84c] font-semibold hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Course</th>
                    <th className="px-4 py-3 text-left font-semibold">Fee</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {RECENT_ADMISSIONS.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 font-medium text-[#0a1628] whitespace-nowrap">{a.name}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{a.course}</td>
                      <td className="px-4 py-3 text-slate-700 font-semibold text-xs">{formatINR(a.fee)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${admissionStatusColor[a.status] || 'bg-slate-100 text-slate-600'}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Enquiries */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#0a1628]">Recent Enquiries</h2>
              <a href="/admin/admissions" className="text-xs text-[#c9a84c] font-semibold hover:underline">View All</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Course</th>
                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                    <th className="px-4 py-3 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {ENQUIRIES.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#0a1628] text-sm whitespace-nowrap">{e.name}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" />{e.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{e.course}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{new Date(e.date).toLocaleDateString('en-IN')}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${enquiryStatusColor[e.status] || 'bg-slate-100 text-slate-600'}`}>
                          {e.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-sm font-bold text-[#0a1628] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Add Student', icon: UserPlus, href: '/admin/students', color: '#3b82f6', bg: '#eff6ff' },
              { label: 'Add Teacher', icon: GraduationCap, href: '/admin/teachers', color: '#8b5cf6', bg: '#f5f3ff' },
              { label: 'Create Course', icon: PlusCircle, href: '/admin/courses', color: '#10b981', bg: '#ecfdf5' },
              { label: 'View Reports', icon: BarChart3, href: '/admin/reports', color: '#c9a84c', bg: '#fefce8' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group text-center"
                  style={{ background: action.bg }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ background: action.color + '20' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: action.color }} />
                  </div>
                  <span className="text-xs font-semibold text-[#0a1628]">{action.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
