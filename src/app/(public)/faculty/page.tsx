'use client';

import React, { useState } from 'react';
import { FACULTY_DATA } from '@/lib/website-data';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/common/EnquiryModal';

export default function FacultyPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* Page Banner Header */}
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
              Academic Faculty Council
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
              Learn from India&apos;s Most Renowned Mentors
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto' }}>
              Our faculty members are authors, Ph.D. holders, and former civil service consultants who have shaped thousands of officers.
            </p>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="hc-section">
          <div className="hc-container">
            <div className="hc-grid-3">
              {FACULTY_DATA.map((fac) => (
                <div
                  key={fac.id}
                  className="hc-card"
                  style={{
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderTop: '4px solid #F59E0B'
                  }}
                >
                  {/* Faculty Crest Avatar */}
                  <div
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      backgroundColor: '#0F172A',
                      color: '#F59E0B',
                      border: '3px solid #F59E0B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.25rem',
                      fontWeight: 800,
                      marginBottom: '18px',
                      boxShadow: '0 8px 24px rgba(20, 43, 74, 0.15)'
                    }}
                  >
                    {fac.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  <h2 style={{ fontSize: '1.3125rem', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>
                    {fac.name}
                  </h2>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', marginBottom: '12px' }}>
                    {fac.designation}
                  </div>

                  {/* Subject Specialization Tag */}
                  <div
                    style={{
                      backgroundColor: '#EFF6FF',
                      color: '#1D4ED8',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: '1px solid #BFDBFE',
                      marginBottom: '16px',
                      width: '100%'
                    }}
                  >
                    {fac.subject}
                  </div>

                  {/* Details List */}
                  <div style={{ width: '100%', textAlign: 'left', marginBottom: '20px', fontSize: '0.8125rem', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <strong style={{ color: '#1E293B' }}>Academic Background:</strong> {fac.qualification}
                    </div>
                    <div>
                      <strong style={{ color: '#1E293B' }}>Teaching Tenure:</strong> {fac.experience}
                    </div>
                    <div>
                      <strong style={{ color: '#16A34A' }}>Mentored Selections:</strong> {fac.selections}
                    </div>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="hc-btn-primary"
                    style={{ width: '100%', padding: '10px', fontSize: '0.8125rem', justifyContent: 'center', marginTop: 'auto' }}
                  >
                    <span>Request Faculty Interaction</span>
                  </button>
                </div>
              ))}
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
