'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  Users, Search, Download, Eye, Pencil, UserX, UserPlus, X, ChevronUp, ChevronDown,
} from 'lucide-react';

const COURSES_LIST = ['All', 'UPSC Foundation', 'SSC CGL', 'Bank PO', 'State PCS', 'Current Affairs'];
const STATUS_LIST = ['All', 'Active', 'Inactive'];

const MOCK_STUDENTS = [
  { id: 1, name: 'Arjun Mehta', roll: 'HC2024-UPSC-1247', course: 'UPSC Foundation', batch: 'Batch A', feeStatus: 'Paid', enrolled: '2024-09-01', status: 'Active' },
  { id: 2, name: 'Kavya Sharma', roll: 'HC2024-UPSC-1248', course: 'UPSC Foundation', batch: 'Batch B', feeStatus: 'Paid', enrolled: '2024-09-02', status: 'Active' },
  { id: 3, name: 'Ravi Kumar', roll: 'HC2024-SSC-0421', course: 'SSC CGL', batch: 'Batch A', feeStatus: 'Due', enrolled: '2024-09-05', status: 'Active' },
  { id: 4, name: 'Pooja Mishra', roll: 'HC2024-BANK-0312', course: 'Bank PO', batch: 'Batch C', feeStatus: 'Partial', enrolled: '2024-09-10', status: 'Active' },
  { id: 5, name: 'Arjun Singh', roll: 'HC2024-PCS-0198', course: 'State PCS', batch: 'Batch A', feeStatus: 'Paid', enrolled: '2024-09-12', status: 'Inactive' },
  { id: 6, name: 'Nisha Gupta', roll: 'HC2024-CA-0087', course: 'Current Affairs', batch: 'Batch B', feeStatus: 'Paid', enrolled: '2024-09-15', status: 'Active' },
  { id: 7, name: 'Rohan Verma', roll: 'HC2024-UPSC-1295', course: 'UPSC Foundation', batch: 'Batch A', feeStatus: 'Due', enrolled: '2024-09-18', status: 'Active' },
  { id: 8, name: 'Sunita Rao', roll: 'HC2024-SSC-0442', course: 'SSC CGL', batch: 'Batch B', feeStatus: 'Paid', enrolled: '2024-09-20', status: 'Active' },
  { id: 9, name: 'Deepak Jha', roll: 'HC2024-BANK-0334', course: 'Bank PO', batch: 'Batch A', feeStatus: 'Partial', enrolled: '2024-09-22', status: 'Active' },
  { id: 10, name: 'Meera Tiwari', roll: 'HC2024-UPSC-1312', course: 'UPSC Foundation', batch: 'Batch C', feeStatus: 'Paid', enrolled: '2024-09-25', status: 'Active' },
  { id: 11, name: 'Amit Pandey', roll: 'HC2024-PCS-0221', course: 'State PCS', batch: 'Batch B', feeStatus: 'Due', enrolled: '2024-09-28', status: 'Active' },
  { id: 12, name: 'Priya Singh', roll: 'HC2024-CA-0102', course: 'Current Affairs', batch: 'Batch A', feeStatus: 'Paid', enrolled: '2024-10-01', status: 'Active' },
  { id: 13, name: 'Vikram Yadav', roll: 'HC2024-UPSC-1340', course: 'UPSC Foundation', batch: 'Batch A', feeStatus: 'Paid', enrolled: '2024-10-03', status: 'Active' },
  { id: 14, name: 'Ananya Gupta', roll: 'HC2024-SSC-0478', course: 'SSC CGL', batch: 'Batch C', feeStatus: 'Partial', enrolled: '2024-10-05', status: 'Inactive' },
  { id: 15, name: 'Rahul Mishra', roll: 'HC2024-BANK-0356', course: 'Bank PO', batch: 'Batch B', feeStatus: 'Paid', enrolled: '2024-10-08', status: 'Active' },
];

const FEE_BADGE: Record<string, string> = {
  Paid: 'bg-green-100 text-green-700 border border-green-200',
  Due: 'bg-red-100 text-red-700 border border-red-200',
  Partial: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
};

const STATUS_BADGE: Record<string, string> = {
  Active: 'bg-green-50 text-green-700',
  Inactive: 'bg-slate-100 text-slate-500',
};

type SortKey = 'name' | 'roll' | 'course' | 'enrolled';

export default function AdminStudentsPage() {
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [exporting, setExporting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', batch: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) =>
    sortBy === col
      ? sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 inline ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 inline ml-0.5" />
      : <ChevronUp className="w-3.5 h-3.5 inline ml-0.5 opacity-20" />;

  const filtered = MOCK_STUDENTS
    .filter(s =>
      (search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase())) &&
      (courseFilter === 'All' || s.course === courseFilter) &&
      (statusFilter === 'All' || s.status === statusFilter)
    )
    .sort((a, b) => {
      const av = a[sortBy], bv = b[sortBy];
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^\+?[0-9]{10,13}$/)) e.phone = 'Valid phone required';
    if (!form.course) e.course = 'Course is required';
    if (!form.batch.trim()) e.batch = 'Batch is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 2000);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0a1628] tracking-tight">Students Management</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage all enrolled and inactive students</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {exporting ? 'Exporting...' : 'Export CSV'}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#1a3a6b] transition"
            >
              <UserPlus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: '4,847', color: '#3b82f6' },
            { label: 'Active Students', value: '3,921', color: '#10b981' },
            { label: 'New This Month', value: '134', color: '#c9a84c' },
            { label: 'Pending Fee', value: '89', color: '#ef4444' },
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
              placeholder="Search by name or roll number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] bg-slate-50"
            />
          </div>
          <select
            value={courseFilter}
            onChange={e => setCourseFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c] min-w-[160px]"
          >
            {COURSES_LIST.map(c => <option key={c}>{c}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#c9a84c] min-w-[120px]"
          >
            {STATUS_LIST.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0a1628] text-white text-xs">
                  {[
                    { label: 'Name', key: 'name' },
                    { label: 'Roll No', key: 'roll' },
                    { label: 'Course', key: 'course' },
                    { label: 'Batch', key: null },
                    { label: 'Fee Status', key: null },
                    { label: 'Enrolled', key: 'enrolled' },
                    { label: 'Status', key: null },
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
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#0a1628]">{s.name}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs font-mono">{s.roll}</td>
                    <td className="px-4 py-3 text-slate-700">{s.course}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{s.batch}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${FEE_BADGE[s.feeStatus]}`}>
                        {s.feeStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{new Date(s.enrolled).toLocaleDateString('en-IN')}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${STATUS_BADGE[s.status]}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition" title="View"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg text-[#c9a84c] hover:bg-yellow-50 transition" title="Edit"><Pencil className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition" title="Deactivate"><UserX className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-400 text-sm">
                      No students match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-500">
            Showing {filtered.length} of {MOCK_STUDENTS.length} students
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-[#0a1628]">Add New Student</h2>
              <button onClick={() => setShowModal(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Full Name', field: 'name', type: 'text', placeholder: 'Enter full name' },
                { label: 'Email Address', field: 'email', type: 'email', placeholder: 'example@email.com' },
                { label: 'Phone Number', field: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                { label: 'Batch', field: 'batch', type: 'text', placeholder: 'e.g. Batch A' },
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
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Course</label>
                <select
                  value={form.course}
                  onChange={e => setForm(prev => ({ ...prev, course: e.target.value }))}
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] ${errors.course ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                >
                  <option value="">Select a course</option>
                  {COURSES_LIST.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                </select>
                {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
              </div>
            </div>
            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { if (validate()) { setShowModal(false); setForm({ name: '', email: '', phone: '', course: '', batch: '' }); setErrors({}); } }}
                className="flex-1 py-2.5 rounded-xl bg-[#0a1628] text-white text-sm font-semibold hover:bg-[#1a3a6b] transition"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
