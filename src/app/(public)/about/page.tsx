'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  GraduationCap, 
  Award, 
  Users, 
  Clock, 
  Target,
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/common/EnquiryModal';
import { INSTITUTE_INFO } from '@/lib/website-data';

export default function AboutPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* Banner */}
        <section
          style={{
            backgroundColor: '#142B4A',
            color: '#FFFFFF',
            padding: '56px 0',
            borderBottom: '4px solid #D9A441',
            textAlign: 'center'
          }}
        >
          <div className="hc-container">
            <span
              style={{
                backgroundColor: 'rgba(217, 164, 65, 0.2)',
                color: '#D9A441',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Our Vision & Legacy
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
              18 Years of Building Nation Builders
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto' }}>
              From a dedicated classroom in 2008 to one of India&apos;s most reputed civil services preparatory academies.
            </p>
          </div>
        </section>

        {/* Story & Mission Section */}
        <section className="hc-section">
          <div className="hc-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '48px', alignItems: 'center' }} className="hc-grid-2">
              <div>
                <span className="hc-badge">History & Evolution</span>
                <h2 className="hc-section-title">The Himanshu Classes Philosophy</h2>
                <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '20px' }}>
                  Founded by <strong>Dr. Himanshu Rai</strong>, former civil services consultant and academician, Himanshu Classes was created with a single mission: to provide honest, rigorous, and result-oriented competitive coaching that eliminates commercial gimmicks.
                </p>
                <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '24px' }}>
                  We firmly believe that dedicated mentorship, structured learning, and daily answer writing practice can elevate any disciplined aspirant into top merit ranks.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '32px' }}>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '8px' }}>Our Mission</div>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
                      To democratize high-level civil services and competitive exam guidance for students across all backgrounds.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '8px' }}>Our Vision</div>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
                      To foster socially conscious, ethically upright, and academically brilliant administrators who serve India with distinction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Director Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '36px 28px',
                  border: '2px solid #D9A441',
                  boxShadow: '0 20px 40px rgba(20, 43, 74, 0.08)',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    backgroundColor: '#142B4A',
                    color: '#D9A441',
                    border: '3px solid #D9A441',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 800,
                    margin: '0 auto 16px auto'
                  }}
                >
                  HS
                </div>
                <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#142B4A' }}>Dr. Himanshu Rai</h3>
                <div style={{ fontSize: '0.8125rem', color: '#D9A441', fontWeight: 700, textTransform: 'uppercase', marginBottom: '14px' }}>
                  Founder, Director & Chief Mentor
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px' }}>
                  &ldquo;A coaching institute is not a factory. It is a sacred place of intellectual awakening where a student discovers their true leadership potential.&rdquo;
                </p>
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="hc-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Book Mentorship Call</span>
                  <ArrowRight size={16} />
                </button>
              </div>
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
