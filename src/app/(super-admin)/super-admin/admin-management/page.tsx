'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Shield, ShieldCheck, AlertTriangle, Plus, X, Eye, RefreshCw,
  UserX, LogOut, Users, Clock, CheckCircle, XCircle, ChevronDown
} from 'lucide-react';

interface Admin {
  id: number;
  name: string;
  email: string;
  createdDate: string;
  lastLogin: string;
  twoFA: boolean;
  sessions: number;
  status: 'active' | 'disabled';
}

const MOCK_ADMINS: Admin[] = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh@himanshuclasses.in', createdDate: '12 Jan 2024', lastLogin: '2 min ago', twoFA: true, sessions: 2, status: 'active' },
  { id: 2, name: 'Priya Sharma', email: 'priya@himanshuclasses.in', createdDate: '15 Mar 2024', lastLogin: '1 hr ago', twoFA: true, sessions: 1, status: 'active' },
  { id: 3, name: 'Ankit Verma', email: 'ankit@himanshuclasses.in', createdDate: '20 May 2024', lastLogin: '3 hrs ago', twoFA: false, sessions: 0, status: 'active' },
  { id: 4, name: 'Sunita Devi', email: 'sunita@himanshuclasses.in', createdDate: '01 Aug 2024', lastLogin: '1 day ago', twoFA: true, sessions: 1, status: 'disabled' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@himanshuclasses.in', createdDate: '10 Sep 2024', lastLogin: '2 days ago', twoFA: false, sessions: 0, status: 'active' },
];

interface CreateAdminForm {
  name: string;
  email: string;
  phone: string;
  require2FA: boolean;
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>(MOCK_ADMINS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmDisable, setShowConfirmDisable] = useState<number | null>(null);
  const [showSessionsFor, setShowSessionsFor] = useState<number | null>(null);
  const [formSaved, setFormSaved] = useState(false);
  const [form, setForm] = useState<CreateAdminForm>({ name: '', email: '', phone: '', require2FA: true });

  const handleCreate = () => {
    if (!form.name || !form.email) return;
    const newAdmin: Admin = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      createdDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastLogin: 'Never',
      twoFA: form.require2FA,
      sessions: 0,
      status: 'active',
    };
    setAdmins(prev => [newAdmin, ...prev]);
    setShowCreateModal(false);
    setFormSaved(true);
    setForm({ name: '', email: '', phone: '', require2FA: true });
    setTimeout(() => setFormSaved(false), 3000);
  };

  const handleDisable = (id: number) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'disabled' : 'active' } : a));
    setShowConfirmDisable(null);
  };

  const handleReset2FA = (id: number) => {
    setAdmins(prev => prev.map(a => a.id === id ? { ...a, twoFA: false } : a));
  };

  const handleBulkRevoke = () => {
    setAdmins(prev => prev.map(a => ({ ...a, sessions: 0 })));
  };

  return (
    <DashboardLayout role="super-admin">
      <div className="min-h-screen" style={{ background: '#f8f9fc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#0a1628' }}>Admin Management</h1>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>Manage admin accounts, sessions and permissions</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBulkRevoke}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all hover:shadow-md"
                style={{ borderColor: '#dc2626', color: '#dc2626', background: '#fff5f5' }}
              >
                <LogOut className="w-4 h-4" /> Bulk Revoke Sessions
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all hover:shadow-lg"
                style={{ background: '#c9a84c', color: '#0a1628' }}
              >
                <Plus className="w-4 h-4" /> Create Admin
              </button>
            </div>
          </div>

          {/* Success toast */}
          {formSaved && (
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold">
              <CheckCircle className="w-4 h-4" /> Admin account created successfully!
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Admins', value: admins.length, color: '#0a1628' },
              { label: 'Active', value: admins.filter(a => a.status === 'active').length, color: '#16a34a' },
              { label: '2FA Enabled', value: admins.filter(a => a.twoFA).length, color: '#1a3a6b' },
              { label: 'Active Sessions', value: admins.reduce((s, a) => s + a.sessions, 0), color: '#c9a84c' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-sm font-medium mt-1" style={{ color: '#94a3b8' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#0a1628' }}>
              <h2 className="font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: '#c9a84c' }} /> Admin Accounts
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#f8f9fc' }}>
                    {['Name', 'Email', 'Created Date', 'Last Login', '2FA Status', 'Sessions', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide" style={{ color: '#64748b' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin, i) => (
                    <tr key={admin.id} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#1a3a6b' }}>
                            {admin.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="font-semibold" style={{ color: '#0a1628' }}>{admin.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#64748b' }}>{admin.email}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#64748b' }}>{admin.createdDate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-xs" style={{ color: '#94a3b8' }}>
                          <Clock className="w-3 h-3" /> {admin.lastLogin}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {admin.twoFA ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                            <ShieldCheck className="w-3.5 h-3.5" /> Enabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                            <AlertTriangle className="w-3.5 h-3.5" /> Not Setup
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setShowSessionsFor(showSessionsFor === admin.id ? null : admin.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors"
                          style={{ background: admin.sessions > 0 ? '#eef2fa' : '#f1f5f9', color: admin.sessions > 0 ? '#1a3a6b' : '#94a3b8' }}
                        >
                          <Eye className="w-3.5 h-3.5" /> {admin.sessions} active
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${admin.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {admin.status === 'active' ? '● Active' : '● Disabled'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReset2FA(admin.id)}
                            title="Reset 2FA"
                            className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors"
                          >
                            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                          </button>
                          <button
                            onClick={() => setShowConfirmDisable(admin.id)}
                            title={admin.status === 'active' ? 'Disable Account' : 'Enable Account'}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <UserX className="w-3.5 h-3.5 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* Create Admin Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-7 py-5 flex items-center justify-between" style={{ background: '#0a1628' }}>
              <h2 className="font-bold text-white text-lg flex items-center gap-2">
                <Plus className="w-5 h-5" style={{ color: '#c9a84c' }} /> Create Admin Account
              </h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1.5 rounded-full hover:bg-white/20 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-7 space-y-5">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'e.g. Rahul Gupta' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'admin@himanshuclasses.in' },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: '#0a1628' }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={(form as any)[field.key]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all"
                    style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
                    onFocus={e => (e.target.style.borderColor = '#c9a84c')}
                    onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
                  />
                </div>
              ))}
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: '#f8f9fc' }}>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#0a1628' }}>Require 2FA</div>
                  <div className="text-xs" style={{ color: '#94a3b8' }}>Mandatory two-factor authentication</div>
                </div>
                <button
                  onClick={() => setForm(prev => ({ ...prev, require2FA: !prev.require2FA }))}
                  className="relative inline-flex h-6 w-12 items-center rounded-full transition-colors"
                  style={{ background: form.require2FA ? '#c9a84c' : '#e2e8f0' }}
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                    style={{ transform: form.require2FA ? 'translateX(28px)' : 'translateX(4px)' }} />
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 rounded-xl font-semibold text-sm border-2" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                  Cancel
                </button>
                <button onClick={handleCreate} className="flex-1 py-3 rounded-xl font-bold text-sm shadow-md" style={{ background: '#c9a84c', color: '#0a1628' }}>
                  Create Admin
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Disable Dialog */}
      {showConfirmDisable !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7 text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: '#fee2e2' }}>
              <UserX className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#0a1628' }}>
              {admins.find(a => a.id === showConfirmDisable)?.status === 'active' ? 'Disable Account?' : 'Enable Account?'}
            </h3>
            <p className="text-sm mb-6" style={{ color: '#64748b' }}>
              This will {admins.find(a => a.id === showConfirmDisable)?.status === 'active' ? 'revoke all sessions and disable' : 'restore access to'} the admin account.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirmDisable(null)} className="flex-1 py-3 rounded-xl font-semibold text-sm border-2" style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                Cancel
              </button>
              <button onClick={() => handleDisable(showConfirmDisable!)} className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: '#dc2626', color: '#fff' }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
