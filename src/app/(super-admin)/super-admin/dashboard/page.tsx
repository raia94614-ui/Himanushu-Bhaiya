'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users, Shield, GraduationCap, BookOpen, Activity, Server,
  AlertTriangle, CheckCircle, XCircle, Eye, Settings, LogOut,
  UserPlus, FileText, RefreshCw, Cpu, HardDrive, MemoryStick,
  Clock, Lock, Unlock, ChevronRight
} from 'lucide-react';

const SYSTEM_STATS = [
  { label: 'Total Users', value: '5,247', icon: Users, color: '#0a1628', bg: '#e8edf5' },
  { label: 'Active Admins', value: '4', icon: Shield, color: '#c9a84c', bg: '#fdf8ee' },
  { label: 'Total Teachers', value: '48', icon: BookOpen, color: '#1a3a6b', bg: '#eef2fa' },
  { label: 'Total Students', value: '4,795', icon: GraduationCap, color: '#16a34a', bg: '#f0fdf4' },
  { label: 'Active Sessions', value: '234', icon: Activity, color: '#7c3aed', bg: '#f5f3ff' },
  { label: 'System Uptime', value: '99.97%', icon: Server, color: '#0891b2', bg: '#f0f9ff' },
];

const MOCK_ADMINS = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@himanshuclasses.in', lastLogin: '2 min ago', twoFA: true, active: true },
  { id: 2, name: 'Priya Sharma', email: 'priya@himanshuclasses.in', lastLogin: '1 hr ago', twoFA: true, active: true },
  { id: 3, name: 'Ankit Verma', email: 'ankit@himanshuclasses.in', lastLogin: '3 hrs ago', twoFA: false, active: true },
  { id: 4, name: 'Sunita Devi', email: 'sunita@himanshuclasses.in', lastLogin: '1 day ago', twoFA: true, active: false },
];

const AUDIT_LOG = [
  { icon: UserPlus, action: 'New student registered', user: 'System', time: '2 min ago', color: '#16a34a' },
  { icon: Shield, action: 'Admin login successful', user: 'Rajesh Kumar', time: '5 min ago', color: '#1a3a6b' },
  { icon: AlertTriangle, action: 'Failed login attempt', user: 'Unknown', time: '12 min ago', color: '#d97706' },
  { icon: Settings, action: 'System settings updated', user: 'Priya Sharma', time: '1 hr ago', color: '#c9a84c' },
  { icon: FileText, action: 'Report exported (PDF)', user: 'Ankit Verma', time: '2 hrs ago', color: '#0891b2' },
  { icon: XCircle, action: 'User account disabled', user: 'Rajesh Kumar', time: '3 hrs ago', color: '#dc2626' },
  { icon: Lock, action: '2FA enabled for admin', user: 'Sunita Devi', time: '5 hrs ago', color: '#7c3aed' },
  { icon: RefreshCw, action: 'Database backup completed', user: 'System', time: '6 hrs ago', color: '#0891b2' },
];

const HEALTH_METRICS = [
  { label: 'CPU Usage', value: 34, color: '#16a34a', icon: Cpu },
  { label: 'Memory Usage', value: 67, color: '#d97706', icon: MemoryStick },
  { label: 'Storage Usage', value: 45, color: '#0891b2', icon: HardDrive },
];

const QUICK_ACTIONS = [
  { label: 'Create Admin', icon: UserPlus, href: '/super-admin/admin-management', color: '#c9a84c' },
  { label: 'View All Logs', icon: FileText, href: '/super-admin/audit-logs', color: '#1a3a6b' },
  { label: 'Security Settings', icon: Shield, href: '/super-admin/security', color: '#dc2626' },
  { label: 'Revoke Sessions', icon: LogOut, href: '/super-admin/security', color: '#7c3aed' },
];

export default function SuperAdminDashboard() {
  const [adminToggles, setAdminToggles] = useState<Record<number, boolean>>(
    Object.fromEntries(MOCK_ADMINS.map(a => [a.id, a.active]))
  );

  return (
    <DashboardLayout role="super-admin">
      <div className="min-h-screen" style={{ background: '#f8f9fc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#0a1628' }}>Super Admin Control Panel</h1>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>
                Complete system oversight and management
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border shadow-sm bg-white">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-semibold text-green-700">All Systems Operational</span>
            </div>
          </div>

          {/* System Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SYSTEM_STATS.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl" style={{ background: stat.bg }}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="text-2xl font-bold" style={{ color: '#0a1628' }}>{stat.value}</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: '#94a3b8' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Security Alert Banner */}
          <div className="flex items-center gap-3 px-5 py-4 rounded-2xl border" style={{ background: '#fffbeb', borderColor: '#fbbf24' }}>
            <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: '#d97706' }} />
            <div className="flex-1">
              <span className="font-semibold text-sm" style={{ color: '#92400e' }}>Security Alert: </span>
              <span className="text-sm" style={{ color: '#92400e' }}>3 failed login attempts detected from IP 192.168.1.45 in the last 10 minutes.</span>
            </div>
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: '#d97706', color: '#fff' }}>
              Investigate
            </button>
          </div>

          {/* Two Column: Admin Table + Audit Log */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Admin Accounts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: '#0a1628' }}>
                <h2 className="font-bold text-white text-base flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: '#c9a84c' }} /> Admin Accounts
                </h2>
                <a href="/super-admin/admin-management" className="text-xs px-3 py-1 rounded-lg font-medium" style={{ background: '#c9a84c', color: '#0a1628' }}>Manage</a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#f8f9fc' }}>
                      <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide" style={{ color: '#64748b' }}>Admin</th>
                      <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide" style={{ color: '#64748b' }}>2FA</th>
                      <th className="px-4 py-3 text-center font-semibold text-xs uppercase tracking-wide" style={{ color: '#64748b' }}>Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_ADMINS.map((admin, i) => (
                      <tr key={admin.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-sm" style={{ color: '#0a1628' }}>{admin.name}</div>
                          <div className="text-xs" style={{ color: '#94a3b8' }}>{admin.email}</div>
                          <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#94a3b8' }}>
                            <Clock className="w-3 h-3" /> {admin.lastLogin}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {admin.twoFA ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                              <CheckCircle className="w-3 h-3" /> ON
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                              <AlertTriangle className="w-3 h-3" /> Off
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => setAdminToggles(prev => ({ ...prev, [admin.id]: !prev[admin.id] }))}
                            className="relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none"
                            style={{ background: adminToggles[admin.id] ? '#c9a84c' : '#e2e8f0' }}
                          >
                            <span
                              className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform"
                              style={{ transform: adminToggles[admin.id] ? 'translateX(22px)' : 'translateX(3px)' }}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Audit Log */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: '#0a1628' }}>
                <h2 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText className="w-4 h-4" style={{ color: '#c9a84c' }} /> Recent Audit Log
                </h2>
                <a href="/super-admin/audit-logs" className="text-xs px-3 py-1 rounded-lg font-medium" style={{ background: '#c9a84c', color: '#0a1628' }}>View All</a>
              </div>
              <div className="divide-y divide-gray-50">
                {AUDIT_LOG.map((entry, i) => (
                  <div key={i} className="flex items-start gap-3 px-5 py-3 hover:bg-gray-50 transition-colors">
                    <div className="p-1.5 rounded-lg mt-0.5 flex-shrink-0" style={{ background: entry.color + '15' }}>
                      <entry.icon className="w-4 h-4" style={{ color: entry.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: '#0a1628' }}>{entry.action}</div>
                      <div className="text-xs" style={{ color: '#94a3b8' }}>{entry.user} · {entry.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-base mb-5 flex items-center gap-2" style={{ color: '#0a1628' }}>
              <Activity className="w-5 h-5" style={{ color: '#c9a84c' }} /> System Health
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {HEALTH_METRICS.map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-4 h-4" style={{ color: metric.color }} />
                      <span className="text-sm font-semibold" style={{ color: '#0a1628' }}>{metric.label}</span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: metric.color }}>{metric.value}%</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#f1f5f9' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${metric.value}%`, background: metric.color }}
                    />
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>
                    {metric.value < 50 ? 'Healthy' : metric.value < 75 ? 'Moderate' : 'High'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-base mb-5 flex items-center gap-2" style={{ color: '#0a1628' }}>
              <ChevronRight className="w-5 h-5" style={{ color: '#c9a84c' }} /> Quick Actions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {QUICK_ACTIONS.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border-2 hover:shadow-md transition-all group"
                  style={{ borderColor: action.color + '30', background: action.color + '08' }}
                >
                  <div className="p-3 rounded-xl" style={{ background: action.color + '20' }}>
                    <action.icon className="w-6 h-6" style={{ color: action.color }} />
                  </div>
                  <span className="text-sm font-semibold text-center" style={{ color: '#0a1628' }}>{action.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
