'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, Download, ChevronLeft, ChevronRight, CheckCircle, XCircle, AlertTriangle, Filter } from 'lucide-react';

type ActionType = 'LOGIN' | 'LOGOUT' | 'CREATE_USER' | 'DELETE_USER' | 'UPDATE_COURSE' | 'VIEW_REPORT' | 'RESET_2FA' | 'EXPORT_DATA' | 'UPDATE_SETTINGS' | 'REVOKE_SESSION';
type LogStatus = 'SUCCESS' | 'FAILED' | 'WARNING';

interface AuditEntry {
  id: number;
  timestamp: string;
  user: string;
  role: string;
  action: ActionType;
  resource: string;
  ip: string;
  status: LogStatus;
}

const ACTION_COLORS: Record<ActionType, string> = {
  LOGIN: '#16a34a',
  LOGOUT: '#64748b',
  CREATE_USER: '#1a3a6b',
  DELETE_USER: '#dc2626',
  UPDATE_COURSE: '#c9a84c',
  VIEW_REPORT: '#0891b2',
  RESET_2FA: '#7c3aed',
  EXPORT_DATA: '#d97706',
  UPDATE_SETTINGS: '#0a1628',
  REVOKE_SESSION: '#dc2626',
};

const MOCK_LOGS: AuditEntry[] = [
  { id: 1, timestamp: '2026-11-02 08:42:11', user: 'Rajesh Kumar', role: 'Admin', action: 'LOGIN', resource: 'Auth System', ip: '192.168.1.10', status: 'SUCCESS' },
  { id: 2, timestamp: '2026-11-02 08:35:04', user: 'Unknown', role: '-', action: 'LOGIN', resource: 'Auth System', ip: '192.168.1.45', status: 'FAILED' },
  { id: 3, timestamp: '2026-11-02 08:30:22', user: 'Unknown', role: '-', action: 'LOGIN', resource: 'Auth System', ip: '192.168.1.45', status: 'FAILED' },
  { id: 4, timestamp: '2026-11-02 08:22:50', user: 'Priya Sharma', role: 'Admin', action: 'CREATE_USER', resource: 'Student #4796', ip: '10.0.0.5', status: 'SUCCESS' },
  { id: 5, timestamp: '2026-11-02 08:15:33', user: 'Ankit Verma', role: 'Admin', action: 'VIEW_REPORT', resource: 'Monthly Report Oct', ip: '10.0.0.8', status: 'SUCCESS' },
  { id: 6, timestamp: '2026-11-02 08:10:18', user: 'Priya Sharma', role: 'Admin', action: 'EXPORT_DATA', resource: 'Student List CSV', ip: '10.0.0.5', status: 'WARNING' },
  { id: 7, timestamp: '2026-11-02 07:55:09', user: 'Himanshu Sir', role: 'Super Admin', action: 'UPDATE_SETTINGS', resource: 'System Config', ip: '10.0.0.1', status: 'SUCCESS' },
  { id: 8, timestamp: '2026-11-02 07:40:44', user: 'Rajesh Kumar', role: 'Admin', action: 'RESET_2FA', resource: 'Admin #3', ip: '192.168.1.10', status: 'SUCCESS' },
  { id: 9, timestamp: '2026-11-02 07:30:20', user: 'Himanshu Sir', role: 'Super Admin', action: 'REVOKE_SESSION', resource: 'All Sessions', ip: '10.0.0.1', status: 'SUCCESS' },
  { id: 10, timestamp: '2026-11-02 07:20:11', user: 'Dr. Anil Gupta', role: 'Teacher', action: 'UPDATE_COURSE', resource: 'Physics Batch 2024', ip: '10.0.0.15', status: 'SUCCESS' },
  { id: 11, timestamp: '2026-11-02 07:10:05', user: 'Kavita Singh', role: 'Teacher', action: 'VIEW_REPORT', resource: 'Test Results Nov', ip: '10.0.0.16', status: 'SUCCESS' },
  { id: 12, timestamp: '2026-11-02 06:55:30', user: 'Sunita Devi', role: 'Admin', action: 'LOGOUT', resource: 'Auth System', ip: '10.0.0.9', status: 'SUCCESS' },
  { id: 13, timestamp: '2026-11-02 06:40:17', user: 'Unknown', role: '-', action: 'LOGIN', resource: 'Auth System', ip: '203.45.67.89', status: 'FAILED' },
  { id: 14, timestamp: '2026-11-02 06:25:44', user: 'Priya Sharma', role: 'Admin', action: 'DELETE_USER', resource: 'Inactive Student #102', ip: '10.0.0.5', status: 'SUCCESS' },
  { id: 15, timestamp: '2026-11-02 06:10:23', user: 'Himanshu Sir', role: 'Super Admin', action: 'CREATE_USER', resource: 'New Admin Account', ip: '10.0.0.1', status: 'SUCCESS' },
  { id: 16, timestamp: '2026-11-02 05:55:02', user: 'Ankit Verma', role: 'Admin', action: 'UPDATE_COURSE', resource: 'Math Batch 2024', ip: '10.0.0.8', status: 'WARNING' },
  { id: 17, timestamp: '2026-11-02 05:40:18', user: 'Rajesh Kumar', role: 'Admin', action: 'EXPORT_DATA', resource: 'Audit Logs Oct', ip: '192.168.1.10', status: 'SUCCESS' },
  { id: 18, timestamp: '2026-11-02 05:25:09', user: 'Himanshu Sir', role: 'Super Admin', action: 'RESET_2FA', resource: 'Admin Ankit Verma', ip: '10.0.0.1', status: 'SUCCESS' },
  { id: 19, timestamp: '2026-11-02 04:55:34', user: 'Prof. Suresh Nair', role: 'Teacher', action: 'UPDATE_COURSE', resource: 'Chemistry Module 3', ip: '10.0.0.20', status: 'SUCCESS' },
  { id: 20, timestamp: '2026-11-02 04:30:50', user: 'Priya Sharma', role: 'Admin', action: 'VIEW_REPORT', resource: 'Fee Collection Oct', ip: '10.0.0.5', status: 'SUCCESS' },
  { id: 21, timestamp: '2026-11-02 03:45:22', user: 'System', role: 'System', action: 'EXPORT_DATA', resource: 'DB Backup', ip: '127.0.0.1', status: 'SUCCESS' },
  { id: 22, timestamp: '2026-11-02 03:00:11', user: 'Himanshu Sir', role: 'Super Admin', action: 'UPDATE_SETTINGS', resource: 'Security Policy', ip: '10.0.0.1', status: 'SUCCESS' },
  { id: 23, timestamp: '2026-11-02 02:15:08', user: 'Unknown', role: '-', action: 'LOGIN', resource: 'Auth System', ip: '185.23.44.12', status: 'FAILED' },
  { id: 24, timestamp: '2026-11-02 01:30:44', user: 'Rajesh Kumar', role: 'Admin', action: 'CREATE_USER', resource: 'Student #4795', ip: '192.168.1.10', status: 'SUCCESS' },
  { id: 25, timestamp: '2026-11-02 00:45:19', user: 'Priya Sharma', role: 'Admin', action: 'REVOKE_SESSION', resource: 'Inactive User Sessions', ip: '10.0.0.5', status: 'SUCCESS' },
];

const STATUS_META: Record<LogStatus, { color: string; bg: string; icon: React.FC<any> }> = {
  SUCCESS: { color: '#16a34a', bg: '#f0fdf4', icon: CheckCircle },
  FAILED: { color: '#dc2626', bg: '#fff5f5', icon: XCircle },
  WARNING: { color: '#d97706', bg: '#fffbeb', icon: AlertTriangle },
};

const PAGE_SIZE = 10;

export default function AuditLogsPage() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => MOCK_LOGS.filter(l => {
    const matchUser = l.user.toLowerCase().includes(userSearch.toLowerCase());
    const matchAction = actionFilter === 'all' || l.action === actionFilter;
    return matchUser && matchAction;
  }), [userSearch, actionFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleExport = () => {
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'IP Address', 'Status'].join(',');
    const rows = filtered.map(l => [l.timestamp, l.user, l.role, l.action, l.resource, l.ip, l.status].join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'audit-logs.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout role="super-admin">
      <div className="min-h-screen" style={{ background: '#f8f9fc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#0a1628' }}>Audit Logs</h1>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>Complete system activity and security audit trail</p>
            </div>
            <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md" style={{ background: '#c9a84c', color: '#0a1628' }}>
              <Download className="w-4 h-4" /> Export Logs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Events', value: MOCK_LOGS.length, color: '#0a1628' },
              { label: 'Successful', value: MOCK_LOGS.filter(l => l.status === 'SUCCESS').length, color: '#16a34a' },
              { label: 'Failed', value: MOCK_LOGS.filter(l => l.status === 'FAILED').length, color: '#dc2626' },
              { label: 'Warnings', value: MOCK_LOGS.filter(l => l.status === 'WARNING').length, color: '#d97706' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Date From</label>
                <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                  className="px-3 py-2 rounded-xl border-2 text-sm outline-none bg-white"
                  style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Date To</label>
                <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                  className="px-3 py-2 rounded-xl border-2 text-sm outline-none bg-white"
                  style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
              </div>
              <div className="flex-1 min-w-48">
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Search User</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }} />
                  <input type="text" placeholder="Filter by user..." value={userSearch} onChange={e => setUserSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border-2 text-sm outline-none bg-white"
                    style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Action Type</label>
                <select value={actionFilter} onChange={e => { setActionFilter(e.target.value); setPage(1); }}
                  className="px-3 py-2 rounded-xl border-2 text-sm outline-none bg-white"
                  style={{ borderColor: '#e2e8f0', color: '#0a1628' }}>
                  <option value="all">All Actions</option>
                  {Object.keys(ACTION_COLORS).map(a => <option key={a} value={a}>{a.replace('_', ' ')}</option>)}
                </select>
              </div>
              <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold" style={{ background: '#c9a84c', color: '#0a1628' }}>
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between" style={{ background: '#0a1628' }}>
              <h2 className="font-bold text-white">Audit Trail</h2>
              <span className="text-xs" style={{ color: '#c9a84c' }}>{filtered.length} records</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#f8f9fc' }}>
                    {['Timestamp', 'User', 'Role', 'Action', 'Resource', 'IP Address', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide whitespace-nowrap" style={{ color: '#64748b' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((log, i) => {
                    const sm = STATUS_META[log.status];
                    return (
                      <tr key={log.id} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                        <td className="px-4 py-3 font-mono text-xs whitespace-nowrap" style={{ color: '#64748b' }}>{log.timestamp}</td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-sm whitespace-nowrap" style={{ color: '#0a1628' }}>{log.user}</div>
                        </td>
                        <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#94a3b8' }}>{log.role}</td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                            style={{ background: ACTION_COLORS[log.action] + '15', color: ACTION_COLORS[log.action] }}>
                            {log.action.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs max-w-36 truncate" style={{ color: '#64748b' }}>{log.resource}</td>
                        <td className="px-4 py-3 font-mono text-xs whitespace-nowrap" style={{ color: '#94a3b8' }}>{log.ip}</td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                            style={{ background: sm.bg, color: sm.color }}>
                            <sm.icon className="w-3 h-3" /> {log.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between" style={{ background: '#f8f9fc' }}>
              <span className="text-sm" style={{ color: '#64748b' }}>
                Page <strong>{page}</strong> of <strong>{totalPages}</strong> · Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold border-2 disabled:opacity-40 transition-colors"
                  style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className="w-9 h-9 rounded-xl text-sm font-bold border-2 transition-colors"
                    style={{
                      borderColor: page === p ? '#c9a84c' : '#e2e8f0',
                      background: page === p ? '#c9a84c' : '#fff',
                      color: page === p ? '#0a1628' : '#64748b',
                    }}>
                    {p}
                  </button>
                ))}
                {totalPages > 5 && <span style={{ color: '#94a3b8' }}>…{totalPages}</span>}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold border-2 disabled:opacity-40 transition-colors"
                  style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
