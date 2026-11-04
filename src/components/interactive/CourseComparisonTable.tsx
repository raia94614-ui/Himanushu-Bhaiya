'use client';

import React, { useState } from 'react';
import { 
  Check, 
  HelpCircle, 
  ArrowRight, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { COURSES_DATA } from '@/lib/website-data';

interface CourseComparisonTableProps {
  onSelectCourse: (courseTitle: string) => void;
}

export default function CourseComparisonTable({ onSelectCourse }: CourseComparisonTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(['upsc-cse', 'hpas-complete', 'ssc-cgl-chsl']);

  const comparisonFeatures = [
    { label: 'Target Career', key: 'career', values: { 'upsc-cse': 'IAS, IPS, IFS, IRS', 'hpas-complete': 'HAS, HPPS, Tehsildar', 'state-pcs': 'SDM, DSP, BDO', 'ssc-cgl-chsl': 'Inspectors, ASO, Tax Asst', 'banking-complete': 'SBI/IBPS PO & Clerk', 'defence-nda-cds-afcat': 'Lieutenants, Flying Officers' } },
    { label: 'Duration', key: 'duration', values: { 'upsc-cse': '12 Months', 'hpas-complete': '9 Months', 'state-pcs': '10 Months', 'ssc-cgl-chsl': '6 Months', 'banking-complete': '5 Months', 'defence-nda-cds-afcat': '6 Months' } },
    { label: 'Classes / Week', key: 'classes', values: { 'upsc-cse': '6 Days (3-4 Hrs)', 'hpas-complete': '6 Days (3 Hrs)', 'state-pcs': '6 Days (3 Hrs)', 'ssc-cgl-chsl': '5 Days (2.5 Hrs)', 'banking-complete': '5 Days (2.5 Hrs)', 'defence-nda-cds-afcat': '6 Days (3.5 Hrs)' } },
    { label: 'Test Series Included', key: 'tests', values: { 'upsc-cse': '50 Mock Tests + Evaluated Mains', 'hpas-complete': '35 Tests + HP GK Special', 'state-pcs': '40 State Mock Tests', 'ssc-cgl-chsl': '150 Computer Lab Tests', 'banking-complete': '120 Full Speed Tests', 'defence-nda-cds-afcat': '45 Tests + SSB Psychology' } },
    { label: 'One-on-One Mentorship', key: 'mentor', values: { 'upsc-cse': 'Yes (Ex-IAS Panel)', 'hpas-complete': 'Yes (State Rankers)', 'state-pcs': 'Yes (Senior Faculty)', 'ssc-cgl-chsl': 'Weekly Doubt Cell', 'banking-complete': 'Weekly Doubt Cell', 'defence-nda-cds-afcat': 'Yes (Col. Sanjeev Varma)' } },
    { label: 'Course Fee', key: 'fee', values: { 'upsc-cse': '₹85,000', 'hpas-complete': '₹62,000', 'state-pcs': '₹58,000', 'ssc-cgl-chsl': '₹28,000', 'banking-complete': '₹25,000', 'defence-nda-cds-afcat': '₹32,000' } }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 45px rgba(20, 43, 74, 0.08)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          backgroundColor: '#142B4A',
          color: '#FFFFFF',
          padding: '20px 28px',
          borderBottom: '3px solid #D9A441',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D9A441', textTransform: 'uppercase' }}>
            Curriculum Matrix
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
            Side-by-Side Course Comparison
          </h3>
        </div>

        <span style={{ fontSize: '0.8125rem', color: '#CBD5E1' }}>
          Evaluate duration, test series, and mentorship features
        </span>
      </div>

      <div style={{ overflowX: 'auto', padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
              <th style={{ padding: '14px 16px', color: '#64748B', fontSize: '0.8125rem', textTransform: 'uppercase', fontWeight: 800 }}>Feature Parameter</th>
              {selectedIds.map(id => {
                const c = COURSES_DATA.find(item => item.id === id);
                return (
                  <th key={id} style={{ padding: '14px 16px', color: '#142B4A', fontSize: '0.9375rem', fontWeight: 800 }}>
                    {c?.title.split('(')[0]}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                <td style={{ padding: '14px 16px', fontWeight: 700, fontSize: '0.875rem', color: '#1E293B' }}>
                  {row.label}
                </td>
                {selectedIds.map(id => (
                  <td key={id} style={{ padding: '14px 16px', fontSize: '0.875rem', color: row.key === 'fee' ? '#2457A7' : '#475569', fontWeight: row.key === 'fee' ? 800 : 500 }}>
                    {/* @ts-ignore */}
                    {row.values[id] || 'N/A'}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td style={{ padding: '20px 16px' }}></td>
              {selectedIds.map(id => {
                const c = COURSES_DATA.find(item => item.id === id);
                return (
                  <td key={id} style={{ padding: '20px 16px' }}>
                    <button
                      onClick={() => c && onSelectCourse(c.title)}
                      className="hc-btn-primary"
                      style={{ width: '100%', padding: '9px 14px', fontSize: '0.8125rem', justifyContent: 'center' }}
                    >
                      <span>Choose Program</span>
                      <ArrowRight size={14} />
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
