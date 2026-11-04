'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { COURSES, FACULTY } from '@/lib/mock-data';
import {
  Search, PlusCircle, X, Pencil, Archive, Trash2, ChevronUp, ChevronDown,
  BookOpen, Users, ToggleLeft, ToggleRight,
} from 'lucide-react';

const CATEGORIES = ['All', 'UPSC', 'State PCS', 'SSC', 'Banking', 'Current Affairs'];

type SortKey = 'title' | 'students' | 'fee';

function formatFee(n: number) {
  return `₹${(n / 1000).toFixed(0)}K`;
}

export default function AdminCoursesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [published, setPublished] = useState<Set<string>>(new Set(COURSES.map(c => c.id)));
  const [form, setForm] = useState({ title: '', category: '', duration: '', fee: '', teacher: '', description: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortBy === col
      ? sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 inline ml-1" /> : <ChevronDown className="w-3.5 h-3.5 inline ml-1" />
      : <ChevronUp className="w-3.5 h-3.5 inline ml-1 opacity-20" />;

  const filtered = COURSES
    .filter(c =>
      (category === 'All' || c.category === category) &&
      (search === '' || c.title.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'students') return sortDir === 'asc' ? a.students - b.students : b.students - a.students;
      if (sortBy === 'fee') return sortDir === 'asc' ? a.fee - b.fee : b.fee - a.fee;
      return sortDir === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    });

  const CATEGORY_COLOR: Record<string, string> = {
    'UPSC': '#3b82f6',
    'State PCS': '#8b5cf6',
    'SSC': '#f59e0b',
    'Banking': '#10b981',
    'Current Affairs': '#ef4444',
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title required';
    if (!form.category) e.category = 'Category required';
    if (!form.fee || isNaN(Number(form.fee))) e.fee = 'Valid fee required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0a1628] tracking-tight">Courses Management</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage all courses, visibility and assignments</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#1a3a6b] transition self-start"
          >
            <PlusCircle className="w-4 h-4" />
            Add Course
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Courses', value: '24', color: '#3b82f6' },
            { label: 'Active', value: '20', color: '#10b981' },
            { label: 'Draft', value: '3', color: '#f59e0b' },
            { label: 'Archived', value: '1', color: '#94a3b8' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm" style={{ borderLeft: `3px solid ${s.color}` }}>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-2xl font-extrabold text-[#0a1628] mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] bg-slate-50"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c] min-w-[160px]"
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0a1628] text-white text-xs">
                  {[
                    { label: 'Course', key: 'title' },
                    { label: 'Category', key: null },
                    { label: 'Students', key: 'students' },
                    { label: 'Fee', key: 'fee' },
                    { label: 'Teacher', key: null },
                    { label: 'Status', key: null },
                    { label: 'Published', key: null },
                    { label: 'Actions', key: null },
                  ].map(col => (
                    <th
                      key={col.label}
                      className={`px-4 py-3 text-left font-semibold uppercase tracking-wider ${col.key ? 'cursor-pointer hover:bg-[#1a3a6b] select-none' : ''}`}
                      onClick={() => col.key && handleSort(col.key as SortKey)}
                    >
                      {col.label}
                      {col.key && <SortIcon col={col.key as SortKey} />}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(c => {
                  const isPub = published.has(c.id);
                  const color = CATEGORY_COLOR[c.category] || '#0a1628';
                  return (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '18' }}>
                            <BookOpen className="w-4.5 h-4.5" style={{ color }} />
                          </div>
                          <div>
                            <div className="font-semibold text-[#0a1628] text-sm leading-tight">{c.title}</div>
                            <div className="text-[11px] text-slate-400">{c.duration}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: color + '18', color }}>
                          {c.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-slate-700 text-xs">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {c.students.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#0a1628] text-xs">{formatFee(c.fee)}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{c.teacher}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isPub ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {isPub ? 'Active' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setPublished(prev => { const next = new Set(prev); next.has(c.id) ? next.delete(c.id) : next.add(c.id); return next; })}
                          className="flex items-center gap-1 text-xs font-semibold transition"
                          style={{ color: isPub ? '#10b981' : '#94a3b8' }}
                        >
                          {isPub
                            ? <ToggleRight className="w-6 h-6" />
                            : <ToggleLeft className="w-6 h-6" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button className="p-1.5 rounded-lg text-[#c9a84c] hover:bg-yellow-50 transition" title="Edit"><Pencil className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition" title="Archive"><Archive className="w-4 h-4" /></button>
                          <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition" title="Delete"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="px-4 py-12 text-center text-slate-400 text-sm">No courses match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500">
            Showing {filtered.length} of {COURSES.length} courses
          </div>
        </div>
      </div>

      {/* Add Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-base font-bold text-[#0a1628]">Add New Course</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    placeholder="e.g. UPSC CSE Foundation 2026"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] ${errors.title ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] ${errors.category ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                  {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 12 Months"
                    value={form.duration}
                    onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Fee (₹)</label>
                  <input
                    type="number"
                    placeholder="85000"
                    value={form.fee}
                    onChange={e => setForm(p => ({ ...p, fee: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] ${errors.fee ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors.fee && <p className="text-xs text-red-500 mt-1">{errors.fee}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Teacher</label>
                  <select
                    value={form.teacher}
                    onChange={e => setForm(p => ({ ...p, teacher: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                  >
                    <option value="">Select teacher</option>
                    {FACULTY.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                  <textarea
                    placeholder="Brief course description..."
                    value={form.description}
                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button
                onClick={() => { if (validate()) { setShowModal(false); setForm({ title: '', category: '', duration: '', fee: '', teacher: '', description: '' }); setErrors({}); } }}
                className="flex-1 py-2.5 rounded-xl bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#1a3a6b] transition"
              >
                Create Course
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
