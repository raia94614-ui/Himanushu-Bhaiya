'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Users, 
  BookOpen, 
  ShieldCheck
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/common/EnquiryModal';
import { COURSES_DATA } from '@/lib/website-data';

export default function CoursesPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Civil Services', 'State PCS', 'SSC & Central', 'Banking & Insurance', 'Defence', 'Teaching', 'School & College'];

  const filteredCourses = selectedCategory === 'All'
    ? COURSES_DATA
    : COURSES_DATA.filter(c => c.category === selectedCategory);

  const handleEnquiry = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setEnquiryOpen(true);
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* Page Banner Header */}
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
              Academic Catalog 2025-26
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
              Courses & Competitive Examination Programs
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto' }}>
              Structured, syllabus-centric training for UPSC CSE, HPAS, State PCS, SSC, Bank PO, NDA/CDS and Board Foundations.
            </p>
          </div>
        </section>

        {/* Filter Navigation Bar */}
        <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 0', position: 'sticky', top: '76px', zIndex: 10 }}>
          <div className="hc-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    backgroundColor: selectedCategory === cat ? '#142B4A' : '#F1F5F9',
                    color: selectedCategory === cat ? '#FFFFFF' : '#475569',
                    border: '1px solid',
                    borderColor: selectedCategory === cat ? '#142B4A' : '#E2E8F0',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Course Cards Grid */}
        <section className="hc-section">
          <div className="hc-container">
            <div className="hc-grid-2">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="hc-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '4px solid #142B4A'
                  }}
                >
                  {/* Header Area */}
                  <div style={{ padding: '28px 28px 16px 28px', borderBottom: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D9A441', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {course.category}
                      </span>
                      {course.badge && (
                        <span style={{ backgroundColor: '#FEF3C7', color: '#B47818', fontSize: '0.6875rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                          ★ {course.badge}
                        </span>
                      )}
                    </div>
                    <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#142B4A', lineHeight: 1.3 }}>
                      {course.title}
                    </h2>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '0.9375rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                      {course.description}
                    </p>

                    {/* Metadata Pill Box */}
                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '10px',
                        padding: '14px 18px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '12px',
                        border: '1px solid #E2E8F0',
                        marginBottom: '20px'
                      }}
                    >
                      <div>
                        <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Batch Duration</span>
                        <strong style={{ fontSize: '0.875rem', color: '#142B4A' }}>{course.duration}</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Admission Fee</span>
                        <strong style={{ fontSize: '0.9375rem', color: '#2457A7' }}>{course.fee}</strong>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.6875rem', color: '#64748B', display: 'block', textTransform: 'uppercase' }}>Eligibility</span>
                        <strong style={{ fontSize: '0.8125rem', color: '#142B4A' }}>{course.eligibility}</strong>
                      </div>
                    </div>

                    {/* Subjects Covered */}
                    <div style={{ marginBottom: '20px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        Curriculum Syllabus Overview:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {course.subjects.map((sub, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: '#EFF6FF',
                              color: '#2457A7',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              padding: '4px 10px',
                              borderRadius: '4px',
                              border: '1px solid #DBEAFE'
                            }}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Course Features */}
                    <div style={{ marginBottom: '24px', flex: 1 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        Batch Inclusions:
                      </span>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', color: '#64748B' }}>
                        {course.features.map((feat, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <CheckCircle2 size={14} style={{ color: '#16A34A', marginTop: '2px', flexShrink: 0 }} />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
                      <button
                        onClick={() => handleEnquiry(course.title)}
                        className="hc-btn-primary"
                        style={{ padding: '12px 18px', fontSize: '0.875rem' }}
                      >
                        <Sparkles size={16} />
                        <span>Enquire for This Batch</span>
                      </button>
                      <button
                        onClick={() => handleEnquiry(course.title)}
                        className="hc-btn-secondary"
                        style={{ padding: '11px 16px', fontSize: '0.875rem' }}
                      >
                        <span>Brochure PDF</span>
                      </button>
                    </div>
                  </div>
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
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
