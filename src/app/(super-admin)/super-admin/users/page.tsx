'use client';

import React, { useState, useMemo } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Search, Filter, Eye, Edit2, UserX, Trash2, Download, CheckSquare, Square, ChevronDown } from 'lucide-react';

type Role = 'super_admin' | 'admin' | 'teacher' | 'student';
type Status = 'active' | 'inactive';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  created: string;
  lastActive: string;
  status: Status;
  selected: boolean;
}

const ROLE_META: Record<Role, { label: string; color: string; bg: string }> = {
  super_admin: { label: 'Super Admin', color: '#c9a84c', bg: '#fdf8ee' },
  admin: { label: 'Admin', color: '#dc2626', bg: '#fff5f5' },
  teacher: { label: 'Teacher', color: '#1a3a6b', bg: '#eef2fa' },
  student: { label: 'Student', color: '#16a34a', bg: '#f0fdf4' },
};

const MOCK_USERS: Omit<User, 'selected'>[] = [
  { id: 1, name: 'Himanshu Sir', email: 'himanshu@himanshuclasses.in', role: 'super_admin', created: '01 Jan 2023', lastActive: '1 min ago', status: 'active' },
  { id: 2, name: 'Rajesh Kumar', email: 'rajesh@himanshuclasses.in', role: 'admin', created: '12 Jan 2024', lastActive: '5 min ago', status: 'active' },
  { id: 3, name: 'Priya Sharma', email: 'priya@himanshuclasses.in', role: 'admin', created: '15 Mar 2024', lastActive: '1 hr ago', status: 'active' },
  { id: 4, name: 'Dr. Anil Gupta', email: 'anil.gupta@himanshuclasses.in', role: 'teacher', created: '03 Feb 2024', lastActive: '2 hrs ago', status: 'active' },
  { id: 5, name: 'Kavita Singh', email: 'kavita@himanshuclasses.in', role: 'teacher', created: '10 Feb 2024', lastActive: '3 hrs ago', status: 'active' },
  { id: 6, name: 'Rahul Mehra', email: 'rahul.mehra@student.in', role: 'student', created: '20 Jun 2024', lastActive: '30 min ago', status: 'active' },
  { id: 7, name: 'Pooja Yadav', email: 'pooja.y@student.in', role: 'student', created: '22 Jun 2024', lastActive: '1 hr ago', status: 'active' },
  { id: 8, name: 'Arjun Patel', email: 'arjun.p@student.in', role: 'student', created: '25 Jun 2024', lastActive: '2 days ago', status: 'inactive' },
  { id: 9, name: 'Sneha Tiwari', email: 'sneha.t@student.in', role: 'student', created: '01 Jul 2024', lastActive: '4 hrs ago', status: 'active' },
  { id: 10, name: 'Mohit Sharma', email: 'mohit.s@student.in', role: 'student', created: '05 Jul 2024', lastActive: '1 day ago', status: 'inactive' },
  { id: 11, name: 'Ananya Roy', email: 'ananya.r@student.in', role: 'student', created: '10 Jul 2024', lastActive: '5 hrs ago', status: 'active' },
  { id: 12, name: 'Vikas Joshi', email: 'vikas.j@student.in', role: 'student', created: '12 Jul 2024', lastActive: '6 hrs ago', status: 'active' },
  { id: 13, name: 'Shruti Mishra', email: 'shruti.m@student.in', role: 'student', created: '15 Jul 2024', lastActive: '20 min ago', status: 'active' },
  { id: 14, name: 'Deepak Rawat', email: 'deepak.r@student.in', role: 'student', created: '18 Jul 2024', lastActive: '3 days ago', status: 'inactive' },
  { id: 15, name: 'Manisha Gupta', email: 'manisha.g@student.in', role: 'student', created: '20 Jul 2024', lastActive: '2 hrs ago', status: 'active' },
  { id: 16, name: 'Prof. Suresh Nair', email: 'suresh.n@himanshuclasses.in', role: 'teacher', created: '15 Mar 2024', lastActive: '1 hr ago', status: 'active' },
  { id: 17, name: 'Ankit Verma', email: 'ankit@himanshuclasses.in', role: 'admin', created: '20 May 2024', lastActive: '3 hrs ago', status: 'active' },
  { id: 18, name: 'Ritu Panday', email: 'ritu.p@student.in', role: 'student', created: '25 Jul 2024', lastActive: '45 min ago', status: 'active' },
  { id: 19, name: 'Nikhil Bajpai', email: 'nikhil.b@student.in', role: 'student', created: '28 Jul 2024', lastActive: '10 min ago', status: 'active' },
  { id: 20, name: 'Sunita Devi', email: 'sunita@himanshuclasses.in', role: 'admin', created: '01 Aug 2024', lastActive: '1 day ago', status: 'inactive' },
];

export default function GlobalUsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS.map(u => ({ ...u, selected: false })));
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [bulkDeactivated, setBulkDeactivated] = useState(false);

  const filteredUsers = useMemo(() => users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    const matchStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  }), [users, search, roleFilter, statusFilter]);

  const selectedCount = users.filter(u => u.selected).length;

  const toggleSelect = (id: number) => setUsers(prev => prev.map(u => u.id === id ? { ...u, selected: !u.selected } : u));
  const toggleAll = () => {
    const allSelected = filteredUsers.every(u => u.selected);
    const ids = new Set(filteredUsers.map(u => u.id));
    setUsers(prev => prev.map(u => ids.has(u.id) ? { ...u, selected: !allSelected } : u));
  };

  const handleDeactivateSelected = () => {
    setUsers(prev => prev.map(u => u.selected ? { ...u, status: 'inactive', selected: false } : u));
    setBulkDeactivated(true);
    setTimeout(() => setBulkDeactivated(false), 2500);
  };

  const handleDeactivate = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleExport = () => {
    const selected = users.filter(u => u.selected);
    const list = selected.length > 0 ? selected : filteredUsers;
    const headers = ['Name', 'Email', 'Role', 'Created', 'Last Active', 'Status'].join(',');
    const rows = list.map(u => [u.name, u.email, u.role, u.created, u.lastActive, u.status].join(','));
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'users.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout role="super-admin">
      <div className="min-h-screen" style={{ background: '#f8f9fc' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#0a1628' }}>Global Users</h1>
              <p className="text-sm mt-1" style={{ color: '#64748b' }}>{MOCK_USERS.length} total users across all roles</p>
            </div>
            <button onClick={handleExport} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md" style={{ background: '#c9a84c', color: '#0a1628' }}>
              <Download className="w-4 h-4" /> Export Users
            </button>
          </div>

          {/* Bulk deactivation toast */}
          {bulkDeactivated && (
            <div className="px-5 py-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-sm font-semibold">
              Selected users have been deactivated.
            </div>
          )}

          {/* Bulk Actions */}
          {selectedCount > 0 && (
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 bg-white" style={{ borderColor: '#c9a84c' }}>
              <span className="text-sm font-semibold" style={{ color: '#0a1628' }}>{selectedCount} user{selectedCount > 1 ? 's' : ''} selected</span>
              <div className="flex-1" />
              <button
                onClick={handleDeactivateSelected}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: '#fee2e2', color: '#dc2626' }}
              >
                <UserX className="w-4 h-4" /> Deactivate Selected
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: '#eef2fa', color: '#1a3a6b' }}
              >
                <Download className="w-4 h-4" /> Export Selected
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-all bg-white"
                style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
                onFocus={e => (e.target.style.borderColor = '#c9a84c')}
                onBlur={e => (e.target.style.borderColor = '#e2e8f0')}
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border-2 text-sm font-medium outline-none bg-white"
                style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
              >
                <option value="all">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#94a3b8' }} />
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="appearance-none pl-4 pr-8 py-2.5 rounded-xl border-2 text-sm font-medium outline-none bg-white"
                style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: '#94a3b8' }} />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100" style={{ background: '#0a1628' }}>
              <h2 className="font-bold text-white">
                {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''} found
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: '#f8f9fc' }}>
                    <th className="px-4 py-3 text-left">
                      <button onClick={toggleAll} className="text-gray-400 hover:text-gray-600">
                        {filteredUsers.every(u => u.selected) && filteredUsers.length > 0
                          ? <CheckSquare className="w-4 h-4 text-amber-500" />
                          : <Square className="w-4 h-4" />}
                      </button>
                    </th>
                    {['Name', 'Email', 'Role', 'Created', 'Last Active', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide" style={{ color: '#64748b' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => {
                    const rm = ROLE_META[user.role];
                    return (
                      <tr key={user.id} className={`border-t border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                        <td className="px-4 py-3">
                          <button onClick={() => toggleSelect(user.id)}>
                            {user.selected
                              ? <CheckSquare className="w-4 h-4 text-amber-500" />
                              : <Square className="w-4 h-4 text-gray-300" />}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: rm.color }}>
                              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <span className="font-semibold text-sm" style={{ color: '#0a1628' }}>{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#64748b' }}>{user.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: rm.bg, color: rm.color }}>
                            {rm.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#94a3b8' }}>{user.created}</td>
                        <td className="px-4 py-3 text-xs" style={{ color: '#94a3b8' }}>{user.lastActive}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {user.status === 'active' ? '● Active' : '○ Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button title="View" className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                              <Eye className="w-3.5 h-3.5 text-blue-500" />
                            </button>
                            <button title="Edit Role" className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors">
                              <Edit2 className="w-3.5 h-3.5 text-amber-500" />
                            </button>
                            <button title="Deactivate" onClick={() => handleDeactivate(user.id)} className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors">
                              <UserX className="w-3.5 h-3.5 text-orange-500" />
                            </button>
                            <button title="Delete" onClick={() => handleDelete(user.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="py-16 text-center" style={{ color: '#94a3b8' }}>
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <div className="font-semibold">No users match your search</div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
