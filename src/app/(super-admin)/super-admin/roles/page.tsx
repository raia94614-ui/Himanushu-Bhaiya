'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Shield, Users, GraduationCap, BookOpen, CheckCircle, XCircle, Download, Eye } from 'lucide-react';

const ROLES = [
  {
    key: 'SUPER_ADMIN',
    label: 'Super Admin',
    count: 1,
    description: 'Full system control, manage all users, settings and security.',
    color: '#c9a84c',
    bg: '#fdf8ee',
    border: '#c9a84c',
    icon: Shield,
  },
  {
    key: 'ADMIN',
    label: 'Admin',
    count: 4,
    description: 'Manage students, teachers, courses, reports and admissions.',
    color: '#0a1628',
    bg: '#e8edf5',
    border: '#1a3a6b',
    icon: Users,
  },
  {
    key: 'TEACHER',
    label: 'Teacher',
    count: 48,
    description: 'Upload study materials, manage courses and grade tests.',
    color: '#1a3a6b',
    bg: '#eef2fa',
    border: '#1a3a6b',
    icon: BookOpen,
  },
  {
    key: 'STUDENT',
    label: 'Student',
    count: 4795,
    description: 'Access courses, take tests, view results and attendance.',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#16a34a',
    icon: GraduationCap,
  },
];

interface Permission {
  feature: string;
  category: string;
  SUPER_ADMIN: boolean;
  ADMIN: boolean;
  TEACHER: boolean;
  STUDENT: boolean;
}

const PERMISSIONS: Permission[] = [
  { feature: 'Manage Admins', category: 'Administration', SUPER_ADMIN: true, ADMIN: false, TEACHER: false, STUDENT: false },
  { feature: 'Manage Students', category: 'Administration', SUPER_ADMIN: true, ADMIN: true, TEACHER: false, STUDENT: false },
  { feature: 'Manage Teachers', category: 'Administration', SUPER_ADMIN: true, ADMIN: true, TEACHER: false, STUDENT: false },
  { feature: 'Manage Courses', category: 'Courses', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: false },
  { feature: 'Upload Study Materials', category: 'Courses', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: false },
  { feature: 'View Study Materials', category: 'Courses', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: true },
  { feature: 'Manage Admissions', category: 'Admissions', SUPER_ADMIN: true, ADMIN: true, TEACHER: false, STUDENT: false },
  { feature: 'Apply for Admission', category: 'Admissions', SUPER_ADMIN: true, ADMIN: true, TEACHER: false, STUDENT: true },
  { feature: 'View Reports', category: 'Reports', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: false },
  { feature: 'Export Reports', category: 'Reports', SUPER_ADMIN: true, ADMIN: true, TEACHER: false, STUDENT: false },
  { feature: 'Create Tests', category: 'Tests', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: false },
  { feature: 'Attempt Tests', category: 'Tests', SUPER_ADMIN: false, ADMIN: false, TEACHER: false, STUDENT: true },
  { feature: 'View Test Results', category: 'Tests', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: true },
  { feature: 'Manage Announcements', category: 'Communication', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: false },
  { feature: 'View Announcements', category: 'Communication', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: true },
  { feature: 'Manage Fees', category: 'Finance', SUPER_ADMIN: true, ADMIN: true, TEACHER: false, STUDENT: false },
  { feature: 'View Fee Details', category: 'Finance', SUPER_ADMIN: true, ADMIN: true, TEACHER: false, STUDENT: true },
  { feature: 'View Audit Logs', category: 'Security', SUPER_ADMIN: true, ADMIN: false, TEACHER: false, STUDENT: false },
  { feature: 'Manage Security Settings', category: 'Security', SUPER_ADMIN: true, ADMIN: false, TEACHER: false, STUDENT: false },
  { feature: 'Manage Attendance', category: 'Academics', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: false },
  { feature: 'View Own Attendance', category: 'Academics', SUPER_ADMIN: true, ADMIN: true, TEACHER: true, STUDENT: true },
];

const ROLE_COLUMNS = ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'] as const;

const categories = [...new Set(PERMISSIONS.map(p => p.category))];

export default function RolesPage() {
  const [showMatrix, setShowMatrix] = useState(true);

  const handleExport = () => {
    const headers = ['Feature', 'Category', ...ROLE_COLUMNS].join(',');
    const rows = PERMISSIONS.map(p =>
      [p.feature, p.category, ...ROLE_COLUMNS.map(r => p[r] ? 'Yes' : 'No')].join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'permissions.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout role="super-admin">
      <div className="min-h-screen" style={{ background: '#f8f9fc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#0a1628' }}>Roles & Permissions</h1>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>Define what each role can access and perform</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMatrix(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all hover:shadow-md bg-white"
                style={{ borderColor: '#1a3a6b', color: '#1a3a6b' }}
              >
                <Eye className="w-4 h-4" /> {showMatrix ? 'Hide' : 'View'} Permission Matrix
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all hover:shadow-lg"
                style={{ background: '#c9a84c', color: '#0a1628' }}
              >
                <Download className="w-4 h-4" /> Export Permissions
              </button>
            </div>
          </div>

          {/* Role Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ROLES.map(role => (
              <div
                key={role.key}
                className="bg-white rounded-2xl p-6 shadow-sm border-2 hover:shadow-md transition-all"
                style={{ borderColor: role.border + '40' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl" style={{ background: role.bg }}>
                    <role.icon className="w-6 h-6" style={{ color: role.color }} />
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: role.bg, color: role.color }}>
                    {role.count.toLocaleString()} users
                  </span>
                </div>
                <h3 className="font-bold text-base mb-1" style={{ color: '#0a1628' }}>{role.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{role.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>Role Key</div>
                  <code className="text-xs font-mono font-bold" style={{ color: role.color }}>{role.key}</code>
                </div>
              </div>
            ))}
          </div>

          {/* Permission Matrix */}
          {showMatrix && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: '#0a1628' }}>
                <h2 className="font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: '#c9a84c' }} /> Full Permission Matrix
                </h2>
                <span className="text-xs" style={{ color: '#c9a84c' }}>{PERMISSIONS.length} permissions across {categories.length} categories</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: '#f8f9fc' }}>
                      <th className="px-5 py-3 text-left font-semibold text-xs uppercase tracking-wide" style={{ color: '#64748b', minWidth: 200 }}>Feature</th>
                      <th className="px-3 py-3 text-xs uppercase tracking-wide font-semibold" style={{ color: '#64748b' }}>Category</th>
                      {ROLES.map(r => (
                        <th key={r.key} className="px-4 py-3 text-center text-xs uppercase tracking-wide font-semibold" style={{ color: r.color }}>
                          {r.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PERMISSIONS.map((perm, i) => (
                      <tr key={perm.feature} className={`border-t border-gray-50 hover:bg-blue-50/30 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                        <td className="px-5 py-3 font-medium text-sm" style={{ color: '#0a1628' }}>{perm.feature}</td>
                        <td className="px-3 py-3">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: '#eef2fa', color: '#1a3a6b' }}>
                            {perm.category}
                          </span>
                        </td>
                        {ROLE_COLUMNS.map(role => (
                          <td key={role} className="px-4 py-3 text-center">
                            {perm[role] ? (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-50">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50">
                                <XCircle className="w-4 h-4 text-red-400" />
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}
