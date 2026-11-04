'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileText,
  Trash2,
  Download,
  CheckCircle,
  CloudUpload,
  File,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const SUBJECTS = ['Geography', 'Environment', 'History', 'Polity', 'Economy', 'Current Affairs', 'CSAT'];
const BATCHES = ['UPSC Foundation — Batch A', 'UPSC Foundation — Batch B', 'State PCS Complete — Batch A', 'Weekend Crash Course'];
const MATERIAL_TYPES = ['PDF', 'Video', 'Notes', 'PPT', 'Audio'];

const RECENT_MATERIALS = [
  { id: 1, title: 'Climate Zones PDF', subject: 'Geography', date: '2026-11-01', downloads: 48, type: 'PDF' },
  { id: 2, title: 'Monsoon System Notes', subject: 'Geography', date: '2026-10-28', downloads: 62, type: 'Notes' },
  { id: 3, title: 'Indian Ocean Lecture', subject: 'Geography', date: '2026-10-25', downloads: 35, type: 'Video' },
  { id: 4, title: 'Biodiversity Hotspots', subject: 'Environment', date: '2026-10-22', downloads: 91, type: 'PDF' },
  { id: 5, title: 'Disaster Management', subject: 'Environment', date: '2026-10-18', downloads: 54, type: 'PDF' },
  { id: 6, title: 'CSAT Reasoning Tricks', subject: 'CSAT', date: '2026-10-15', downloads: 128, type: 'Notes' },
];

export default function UploadMaterialPage() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [batch, setBatch] = useState(BATCHES[0]);
  const [materialType, setMaterialType] = useState(MATERIAL_TYPES[0]);
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [materials, setMaterials] = useState(RECENT_MATERIALS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  };

  const handleUpload = () => {
    if (!title || !fileName) return;
    setUploading(true);
    setProgress(0);
    setUploaded(false);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setUploading(false);
        setUploaded(true);
        setTimeout(() => setUploaded(false), 3000);
      }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <DashboardLayout role="teacher">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#0a1628]">Upload Study Material</h1>
          <p className="text-slate-500 text-sm mt-1">Share resources with your students</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          <h2 className="font-bold text-base text-[#0a1628] border-b border-slate-100 pb-3">
            Material Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Climate Zones Complete PDF"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
              >
                {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Batch</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
              >
                {BATCHES.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Material Type</label>
              <div className="flex gap-2 flex-wrap">
                {MATERIAL_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setMaterialType(type)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all"
                    style={
                      materialType === type
                        ? { background: '#0a1628', color: 'white', borderColor: '#0a1628' }
                        : { background: 'white', color: '#64748b', borderColor: '#e2e8f0' }
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the material..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] bg-white resize-none"
            />
          </div>

          {/* Drag Drop Zone */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">File *</label>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:border-[#c9a84c] hover:bg-[#c9a84c]/5"
              style={{ borderColor: fileName ? '#c9a84c' : '#cbd5e1' }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setFileName(f.name);
                }}
              />
              {fileName ? (
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: '#c9a84c22' }}
                  >
                    <File className="w-6 h-6" style={{ color: '#c9a84c' }} />
                  </div>
                  <p className="font-semibold text-[#0a1628] text-sm">{fileName}</p>
                  <p className="text-xs text-slate-400">Click to change file</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: '#0a162810' }}
                  >
                    <CloudUpload className="w-7 h-7 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700 text-sm">Drag files here or click to browse</p>
                    <p className="text-xs text-slate-400 mt-1">PDF, Video, PPT, DOC up to 500MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {(uploading || progress > 0) && (
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                <span>Uploading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ background: 'linear-gradient(90deg, #0a1628, #c9a84c)' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {uploaded && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold"
            >
              <CheckCircle className="w-4 h-4" /> Material uploaded successfully!
            </motion.div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !title || !fileName}
            className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
            style={{ background: '#0a1628' }}
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload Material'}
          </button>
        </div>

        {/* Recently Uploaded */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-bold text-base text-[#0a1628]">Recently Uploaded Materials</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Downloads</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {materials.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-3.5 font-semibold text-[#0a1628] flex items-center gap-2">
                      <FileText className="w-4 h-4 shrink-0" style={{ color: '#c9a84c' }} />
                      {m.title}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{m.subject}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-600">{m.type}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 text-xs">{m.date}</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="flex items-center justify-center gap-1 text-slate-600">
                        <Download className="w-3.5 h-3.5" style={{ color: '#c9a84c' }} />
                        {m.downloads}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
