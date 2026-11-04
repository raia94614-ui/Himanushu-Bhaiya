'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Award,
  BookOpen
} from 'lucide-react';
import { COURSES_DATA } from '@/lib/website-data';

interface ScholarshipCalculatorProps {
  onApplyScholarship: (course: string, scholarship: string) => void;
}

export default function ScholarshipCalculator({ onApplyScholarship }: ScholarshipCalculatorProps) {
  const [selectedCourseId, setSelectedCourseId] = useState(COURSES_DATA[0].id);
  const [qualScore, setQualScore] = useState('85'); // % score
  const [category, setCategory] = useState('Merit');
  const [attempts, setAttempts] = useState('1st Attempt');

  const course = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];

  // Raw fee number
  const rawFee = parseInt(course.fee.replace(/[^\d]/g, '')) || 50000;

  // Calculate scholarship percentage based on frontend logic
  let discountPct = 10;
  const scoreNum = parseFloat(qualScore) || 0;

  if (scoreNum >= 90) discountPct += 20;
  else if (scoreNum >= 80) discountPct += 15;
  else if (scoreNum >= 70) discountPct += 10;

  if (category === 'Defence Ward' || category === 'Single Girl Child') discountPct += 10;
  if (category === 'EWS') discountPct += 10;

  // Cap at 45%
  if (discountPct > 45) discountPct = 45;

  const discountAmount = Math.round((rawFee * discountPct) / 100);
  const netPayable = rawFee - discountAmount;

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '2px solid #D9A441',
        boxShadow: '0 20px 45px rgba(20, 43, 74, 0.1)',
        overflow: 'hidden'
      }}
    >
      {/* Header Strip */}
      <div
        style={{
          backgroundColor: '#142B4A',
          color: '#FFFFFF',
          padding: '24px 28px',
          borderBottom: '3px solid #D9A441',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: 'rgba(217, 164, 65, 0.2)',
              color: '#D9A441',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Calculator size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D9A441', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Interactive Assessment
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              National Scholarship & Fee Estimator
            </h3>
          </div>
        </div>

        <span
          style={{
            backgroundColor: '#D9A441',
            color: '#142B4A',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 800
          }}
        >
          UP TO 45% SCHOLARSHIP
        </span>
      </div>

      {/* Calculator Body */}
      <div style={{ padding: '32px 28px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '36px',
            alignItems: 'center'
          }}
          className="hc-calc-grid"
        >
          {/* Controls Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Select Target Program */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                1. Select Target Examination Course:
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  color: '#1E293B',
                  fontWeight: 600
                }}
              >
                {COURSES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.fee})
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Score Slider / Input */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B' }}>
                  2. Graduation / 12th Marks (Score %):
                </label>
                <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#2457A7' }}>
                  {qualScore}% Marks
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="98"
                step="1"
                value={qualScore}
                onChange={(e) => setQualScore(e.target.value)}
                style={{
                  width: '100%',
                  accentColor: '#2457A7',
                  cursor: 'pointer'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', color: '#94A3B8', marginTop: '2px' }}>
                <span>50% Minimum</span>
                <span>75% Good</span>
                <span>90%+ Excellence Award</span>
              </div>
            </div>

            {/* Special Category */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                3. Concession Category (If Applicable):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {['Merit', 'Defence Ward', 'Single Girl Child', 'EWS'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      border: `1px solid ${category === cat ? '#2457A7' : '#E2E8F0'}`,
                      backgroundColor: category === cat ? '#EFF6FF' : '#FFFFFF',
                      color: category === cat ? '#2457A7' : '#475569',
                      textAlign: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Outcome Result Card */}
          <div
            style={{
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              padding: '24px 28px',
              border: '2px dashed #CBD5E1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Award size={20} style={{ color: '#D9A441' }} />
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#142B4A', textTransform: 'uppercase' }}>
                  Scholarship Estimation Result
                </span>
              </div>

              {/* Discount Percentage Badge */}
              <div
                style={{
                  backgroundColor: '#DCFCE7',
                  color: '#166534',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #86EFAC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '16px'
                }}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>Eligible Scholarship:</span>
                <strong style={{ fontSize: '1.25rem', fontWeight: 900 }}>{discountPct}% OFF</strong>
              </div>

              {/* Price Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: '#475569', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Standard Course Fee:</span>
                  <span style={{ textDecoration: 'line-through', color: '#94A3B8' }}>{course.fee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A', fontWeight: 600 }}>
                  <span>Scholarship Waiver:</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: 800, color: '#142B4A', paddingTop: '6px' }}>
                  <span>Net Estimated Fee:</span>
                  <span style={{ color: '#2457A7' }}>₹{netPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ fontSize: '0.75rem', color: '#64748B', lineHeight: 1.5, marginBottom: '20px' }}>
                *Includes complete study material kit, test series, answer writing evaluation and reading library pass.
              </div>
            </div>

            <button
              onClick={() => onApplyScholarship(course.title, `${discountPct}% Scholarship Waiver`)}
              className="hc-btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              <Sparkles size={16} />
              <span>Claim This Scholarship</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.hc-calc-grid) {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
