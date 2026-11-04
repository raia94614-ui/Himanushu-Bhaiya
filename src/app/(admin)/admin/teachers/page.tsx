'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { FACULTY } from '@/lib/mock-data';
import {
  LayoutGrid, List, PlusCircle, X, Pencil, Eye, Mail, Phone, BookOpen, Users,
  ChevronUp, ChevronDown, Toggle,
} from 'lucide-react';

type ViewMode = 'cards' | 'table';

const SUBJECT_COLOR: Record<string, string> = {
  'General Studies, History': '#c9a84c',
  'Geography, Environment': '#10b981',
  'Polity, Governance': '#3b82f6',
  'Economy, Finance': '#8b5cf6',
  'Maths, Reasoning': '#f59e0b',
  'Current Affairs, IR': '#ef4444',
};

function getInitials(name: string) {
  return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
}

type SortKey = 'name' | 'subject' | 'experience';

export default function AdminTeachersPage() {
  const [view, setView] = useState<ViewMode>('cards');
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [activeTeachers, setActiveTeachers] = useState<Set<string>>(new Set(FACULTY.map(f => f.id)));
  const [form, setForm] = useState({ name: '', email: '', phone: '', qualification: '', subject: '', salary: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortBy === col
      ? sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 inline ml-1" /> : <ChevronDown className="w-3.5 h-3.5 inline ml-1" />
      : <ChevronUp className="w-3.5 h-3.5 inline ml-1 opacity-20" />;

  const toggleActive = (id: string) => {
    setActiveTeachers(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sortedFaculty = [...FACULTY].sort((a, b) => {
    const av = a[sortBy === 'experience' ? 'experience' : sortBy];
    const bv = b[sortBy === 'experience' ? 'experience' : sortBy];
    return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^\+?[0-9]{10,13}$/)) e.phone = 'Valid phone required';
    if (!form.subject.trim()) e.subject = 'Subject required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0a1628] tracking-tight">Teachers Management</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage faculty and their assignments</p>
          </div>
          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 gap-1">
              <button
                onClick={() => setView('cards')}
                className={`p-2 rounded-lg transition ${view === 'cards' ? 'bg-[#0a1628] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                title="Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('table')}
                className={`p-2 rounded-lg transition ${view === 'table' ? 'bg-[#0a1628] text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#1a3a6b] transition"
            >
              <PlusCircle className="w-4 h-4" />
              Add Teacher
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Faculty', value: '48', color: '#3b82f6' },
            { label: 'Active', value: '44', color: '#10b981' },
            { label: 'On Leave', value: '3', color: '#f59e0b' },
            { label: 'Inactive', value: '1', color: '#ef4444' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm" style={{ borderLeft: `3px solid ${s.color}` }}>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-2xl font-extrabold text-[#0a1628] mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Cards View */}
        {view === 'cards' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {FACULTY.map(f => {
              const isActive = activeTeachers.has(f.id);
              const color = SUBJECT_COLOR[f.subject] || '#0a1628';
              return (
                <div key={f.id} className={`bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition hover:shadow-md ${!isActive ? 'opacity-60 grayscale' : ''}`}>
                  <div className="h-2" style={{ background: color }} />
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-sm"
                        style={{ background: color }}
                      >
                        {getInitials(f.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-[#0a1628] text-sm leading-tight">{f.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{f.role}</p>
                        <div className="mt-1.5">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: color + '18', color }}>
                            {f.subject}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-lg p-2.5">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Experience</p>
                        <p className="text-sm font-bold text-[#0a1628] mt-0.5">{f.experience}</p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2.5">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Students</p>
                        <p className="text-sm font-bold text-[#0a1628] mt-0.5">{f.students}</p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{f.name.toLowerCase().replace(/\s+/g, '.').replace('dr.', 'dr')}@himanshuclasses.in</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>+91 98765 {String(40000 + parseInt(f.id) * 1111).slice(0, 5)}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition">
                        <Eye className="w-3.5 h-3.5" /> View Profile
                      </button>
                      <button className="flex-1 py-2 rounded-xl bg-[#0a1628] text-white text-xs font-semibold hover:bg-[#1a3a6b] flex items-center justify-center gap-1.5 transition">
                        <Pencil className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => toggleActive(f.id)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold transition ${isActive ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                        title={isActive ? 'Deactivate' : 'Activate'}
                      >
                        {isActive ? 'Off' : 'On'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Table View */}
        {view === 'table' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0a1628] text-white text-xs">
                    {[
                      { label: 'Name', key: 'name' },
                      { label: 'Subject', key: 'subject' },
                      { label: 'Experience', key: 'experience' },
                      { label: 'Students', key: null },
                      { label: 'Courses', key: null },
                      { label: 'Status', key: null },
                      { label: 'Actions', key: null },
                    ].map(col => (
                      <th
                        key={col.label}
                        className={`px-4 py-3 text-left font-semibold uppercase tracking-wider ${col.key ? 'cursor-pointer hover:bg-[#1a3a6b]' : ''}`}
                        onClick={() => col.key && handleSort(col.key as SortKey)}
                      >
                        {col.label}
                        {col.key && <SortIcon col={col.key as SortKey} />}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {sortedFaculty.map(f => {
                    const isActive = activeTeachers.has(f.id);
                    const color = SUBJECT_COLOR[f.subject] || '#0a1628';
                    return (
                      <tr key={f.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: color }}>
                              {getInitials(f.name)}
                            </div>
                            <div>
                              <div className="font-semibold text-[#0a1628] text-sm">{f.name}</div>
                              <div className="text-[11px] text-slate-400">{f.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: color + '18', color }}>
                            {f.subject}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 text-xs">{f.experience}</td>
                        <td className="px-4 py-3 text-slate-600 text-xs">{f.students}</td>
                        <td className="px-4 py-3 text-slate-600 text-xs">{f.specialization.length}</td>
                        <td className="px-4 py-3">
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <button className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition" title="View"><Eye className="w-4 h-4" /></button>
                            <button className="p-1.5 rounded-lg text-[#c9a84c] hover:bg-yellow-50 transition" title="Edit"><Pencil className="w-4 h-4" /></button>
                            <button
                              onClick={() => toggleActive(f.id)}
                              className={`p-1.5 rounded-lg transition ${isActive ? 'text-red-500 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}
                              title={isActive ? 'Deactivate' : 'Activate'}
                            >
                              <Toggle className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Teacher Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
              <h2 className="text-base font-bold text-[#0a1628]">Add New Teacher</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Full Name', field: 'name', type: 'text', placeholder: 'Dr. Full Name' },
                { label: 'Email Address', field: 'email', type: 'email', placeholder: 'teacher@himanshuclasses.in' },
                { label: 'Phone Number', field: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                { label: 'Qualification', field: 'qualification', type: 'text', placeholder: 'e.g. Ph.D. History, JNU' },
                { label: 'Subject / Department', field: 'subject', type: 'text', placeholder: 'e.g. General Studies, History' },
                { label: 'Monthly Salary (₹)', field: 'salary', type: 'number', placeholder: '60000' },
              ].map(f => (
                <div key={f.field}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.field as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [f.field]: e.target.value }))}
                    className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] ${errors[f.field] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                  />
                  {errors[f.field] && <p className="text-xs text-red-500 mt-1">{errors[f.field]}</p>}
                </div>
              ))}
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button
                onClick={() => { if (validate()) { setShowModal(false); setForm({ name: '', email: '', phone: '', qualification: '', subject: '', salary: '' }); setErrors({}); } }}
                className="flex-1 py-2.5 rounded-xl bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#1a3a6b] transition"
              >
                Add Teacher
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
