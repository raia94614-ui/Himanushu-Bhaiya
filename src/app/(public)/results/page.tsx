'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/common/EnquiryModal';
import { TOPPERS_DATA } from '@/lib/website-data';

export default function ResultsPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* Banner */}
        <section
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            padding: '56px 0',
            borderBottom: '4px solid #F59E0B',
            textAlign: 'center'
          }}
        >
          <div className="hc-container">
            <span
              style={{
                backgroundColor: 'rgba(217, 164, 65, 0.2)',
                color: '#F59E0B',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Excellence & Achievements
            </span>
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: 900,
                color: '#FFFFFF',
                marginTop: '12px',
                marginBottom: '12px'
              }}
            >
              15,000+ Government Officers & Top Rankers
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto' }}>
              From UPSC CSE AIR 1 to State Administrative Services Top Rankers, our students have led the nation across all major civil services.
            </p>
          </div>
        </section>

        {/* Highlight Stats Strip */}
        <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '28px 0' }}>
          <div className="hc-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#F59E0B' }}>12 Times</div>
                <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>All India Rank 1 in Exams</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1D4ED8' }}>850+</div>
                <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>UPSC CSE Civil Servants</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0F172A' }}>1,850+</div>
                <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>State PCS & HPAS Selections</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#16A34A' }}>12,300+</div>
                <div style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: 600 }}>SSC, Banking & Defence Officers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Toppers Cards Grid */}
        <section className="hc-section">
          <div className="hc-container">
            <div className="hc-grid-3">
              {TOPPERS_DATA.map((t) => (
                <div
                  key={t.id}
                  className="hc-card"
                  style={{
                    padding: '32px 28px',
                    borderTop: '4px solid #F59E0B',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span
                      style={{
                        backgroundColor: '#F59E0B',
                        color: '#0F172A',
                        fontWeight: 900,
                        fontSize: '1rem',
                        padding: '4px 14px',
                        borderRadius: '6px'
                      }}
                    >
                      {t.rank}
                    </span>
                    <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>
                      Year {t.year}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    {t.name}
                  </h2>
                  <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1D4ED8', marginBottom: '4px' }}>
                    {t.exam}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '20px' }}>
                    {t.state} • Batch: {t.course}
                  </div>

                  <blockquote
                    style={{
                      fontSize: '0.875rem',
                      color: '#475569',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                      backgroundColor: '#F8FAFC',
                      padding: '16px',
                      borderRadius: '10px',
                      borderLeft: '3px solid #1D4ED8',
                      flex: 1,
                      marginBottom: '20px'
                    }}
                  >
                    &ldquo;{t.testimonial}&rdquo;
                  </blockquote>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16A34A', fontSize: '0.75rem', fontWeight: 700 }}>
                    <CheckCircle2 size={14} />
                    <span>Verified Authentic Selection Record</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <button onClick={() => setEnquiryOpen(true)} className="hc-btn-primary" style={{ padding: '14px 32px' }}>
                <Sparkles size={18} />
                <span>Join Our Next Rankers Foundation Batch</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </div>
  );
}
