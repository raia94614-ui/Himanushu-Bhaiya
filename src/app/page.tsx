'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Users, 
  BookOpen, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  Sparkles,
  ShieldCheck,
  Target,
  ChevronDown
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/common/EnquiryModal';
import ScholarshipCalculator from '@/components/interactive/ScholarshipCalculator';
import InteractiveQuiz from '@/components/interactive/InteractiveQuiz';
import CourseComparisonTable from '@/components/interactive/CourseComparisonTable';
import { 
  INSTITUTE_INFO, 
  COURSES_DATA, 
  FACULTY_DATA, 
  TOPPERS_DATA, 
  TESTIMONIALS_DATA, 
  GALLERY_DATA, 
  FAQ_DATA 
} from '@/lib/website-data';

export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState('All');

  const openEnquiryWithCourse = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setEnquiryOpen(true);
  };

  const categories = ['All', 'Civil Services', 'State PCS', 'SSC & Central', 'Banking & Insurance', 'Defence', 'School & College'];

  const filteredCourses = activeCategory === 'All' 
    ? COURSES_DATA 
    : COURSES_DATA.filter(c => c.category === activeCategory);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ── NAVBAR ── */}
      <Navbar onOpenEnquiry={() => setEnquiryOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* ── 1. PREMIUM HERO SECTION ── */}
        <section
          style={{
            backgroundColor: '#142B4A',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: '64px',
            paddingBottom: '80px',
            borderBottom: '4px solid #D9A441'
          }}
        >
          {/* Subtle geometric pattern background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.04,
              backgroundImage: 'radial-gradient(circle, #D9A441 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              pointerEvents: 'none'
            }}
          />

          <div className="hc-container" style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.15fr 0.85fr',
                gap: '56px',
                alignItems: 'center'
              }}
              className="hc-hero-grid"
            >
              {/* Left Column: Headline, Value Proposition, Action Buttons */}
              <div>
                {/* Prestige Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(217, 164, 65, 0.15)',
                    border: '1px solid rgba(217, 164, 65, 0.4)',
                    color: '#D9A441',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    marginBottom: '20px'
                  }}
                >
                  <Sparkles size={14} />
                  <span>Premier Institute for Civil Services & Competitive Excellence</span>
                </div>

                {/* Main Headline */}
                <h1
                  style={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    lineHeight: 1.18,
                    color: '#FFFFFF',
                    marginBottom: '20px',
                    letterSpacing: '-0.02em'
                  }}
                  className="hc-hero-title"
                >
                  Dedicated to Nation Building <br />
                  <span style={{ color: '#D9A441' }}>Shaping India&apos;s</span> Future Leaders
                </h1>

                {/* Subtitle Paragraph */}
                <p
                  style={{
                    fontSize: '1.125rem',
                    color: '#CBD5E1',
                    lineHeight: 1.7,
                    marginBottom: '32px',
                    maxWidth: '580px'
                  }}
                >
                  Prepare for <strong>UPSC, HPAS, State PCS, SSC, Banking & Defence</strong> with India&apos;s most disciplined faculty team, personalized mentorship, and comprehensive test series.
                </p>

                {/* Action CTA Buttons */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexWrap: 'wrap',
                    marginBottom: '40px'
                  }}
                >
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="hc-btn-gold"
                    style={{ padding: '14px 28px', fontSize: '1rem' }}
                  >
                    <Sparkles size={18} />
                    <span>Apply for Admission 2025-26</span>
                  </button>

                  <Link
                    href="/courses"
                    className="hc-btn-secondary"
                    style={{
                      padding: '13px 26px',
                      fontSize: '1rem',
                      backgroundColor: 'transparent',
                      color: '#FFFFFF',
                      borderColor: 'rgba(255,255,255,0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.color = '#142B4A';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#FFFFFF';
                    }}
                  >
                    <BookOpen size={18} />
                    <span>Explore All Courses</span>
                  </Link>
                </div>

                {/* Key Accreditations / Trust Indicators */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    flexWrap: 'wrap',
                    fontSize: '0.875rem',
                    color: '#94A3B8',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '24px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: '#16A34A' }} />
                    <span style={{ color: '#FFFFFF', fontWeight: 600 }}>15,000+ Final Selections</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: '#16A34A' }} />
                    <span style={{ color: '#FFFFFF', fontWeight: 600 }}>AIR 1 in UPSC & State Exams</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: '#16A34A' }} />
                    <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Offline & Hybrid Batches</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Card (Statistics & Spotlight) */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '36px 32px',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4)',
                  color: '#1E293B',
                  border: '1px solid #E2E8F0',
                  position: 'relative'
                }}
              >
                {/* Floating Top Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-16px',
                    right: '28px',
                    backgroundColor: '#D9A441',
                    color: '#142B4A',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 12px rgba(217, 164, 65, 0.35)'
                  }}
                >
                  ★ 18 YEARS OF EXCELLENCE
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Himanshu Classes Excellence Metrics
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#142B4A', marginTop: '4px' }}>
                    Proven Legacy of Ranks
                  </h3>
                </div>

                {/* 2x2 Highlight Metric Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    marginBottom: '24px'
                  }}
                >
                  <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#2457A7', lineHeight: 1 }}>50,000+</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginTop: '6px' }}>Students Mentored</div>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#D9A441', lineHeight: 1 }}>15,000+</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginTop: '6px' }}>Selections in Govt.</div>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#142B4A', lineHeight: 1 }}>45+</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginTop: '6px' }}>Expert Faculties</div>
                  </div>

                  <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '1.875rem', fontWeight: 900, color: '#16A34A', lineHeight: 1 }}>98.4%</div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748B', marginTop: '6px' }}>Recommendation Rate</div>
                  </div>
                </div>

                {/* Recent Star Spotlight */}
                <div
                  style={{
                    backgroundColor: '#EFF6FF',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    border: '1px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '20px'
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: '#2457A7',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.125rem',
                      flexShrink: 0
                    }}
                  >
                    1
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#142B4A' }}>
                      Aarav Sharma — All India Rank 1
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      UPSC Civil Services Examination 2024 (Foundation Batch)
                    </div>
                  </div>
                </div>

                {/* Quick Consultation CTA */}
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="hc-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Book Free 1-on-1 Strategy Session</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. TRUST & ACHIEVEMENTS STRIP ── */}
        <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '36px 0' }}>
          <div className="hc-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2457A7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#142B4A' }}>50,000+</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Total Students Enrolled</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#142B4A' }}>15,000+</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Selections in UPSC & PCS</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2457A7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#142B4A' }}>45+</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Permanent Expert Faculty</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#142B4A' }}>18+ Years</div>
                  <div style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>Of Academic Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. ABOUT INSTITUTE (MISSION & VISION) ── */}
        <section className="hc-section">
          <div className="hc-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }} className="hc-grid-2">
              <div>
                <span className="hc-badge">About Himanshu Classes</span>
                <h2 className="hc-section-title">
                  Dedicated to Creating Officers, <br />
                  <span style={{ color: '#2457A7' }}>Not Just Coaching Students</span>
                </h2>
                <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '20px' }}>
                  Founded in 2008 by Dr. Himanshu Rai, Himanshu Classes has stood at the pinnacle of competitive examination guidance in Northern India. We combine traditional academic discipline with state-of-the-art multimedia smart classrooms.
                </p>
                <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '28px' }}>
                  Our mission goes beyond clearing examinations — we develop administrative foresight, ethical integrity, and a deep commitment to public service in every aspirant.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      ✓
                    </div>
                    <div>
                      <strong style={{ color: '#142B4A', fontSize: '0.9375rem' }}>Personalized One-on-One Mentorship:</strong>
                      <span style={{ color: '#64748B', fontSize: '0.875rem' }}> Dedicated retired bureaucrats evaluate answers and conduct periodic reviews.</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      ✓
                    </div>
                    <div>
                      <strong style={{ color: '#142B4A', fontSize: '0.9375rem' }}>Comprehensive Standard Study Material:</strong>
                      <span style={{ color: '#64748B', fontSize: '0.875rem' }}> High quality printed and digital modules tailored to the latest exam pattern.</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      ✓
                    </div>
                    <div>
                      <strong style={{ color: '#142B4A', fontSize: '0.9375rem' }}>24x7 Silent Library & Computer Lab:</strong>
                      <span style={{ color: '#64748B', fontSize: '0.875rem' }}> In-house high-speed reading room with air conditioning and power backup.</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <Link href="/about" className="hc-btn-primary">
                    <span>Read Our Complete Journey</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Side Visual Block */}
              <div
                style={{
                  backgroundColor: '#142B4A',
                  color: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '40px 32px',
                  border: '3px solid #D9A441',
                  boxShadow: '0 20px 40px rgba(20, 43, 74, 0.15)',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Director&apos;s Message
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '16px' }}>
                  &ldquo;There is no shortcut to success. Only consistent discipline, guided preparation, and hard work deliver triumph.&rdquo;
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '24px' }}>
                  Competitive examinations test your endurance, character, and analytical prowess. At Himanshu Classes, our entire faculty works hand-in-hand with each student until the final merit list is achieved.
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      backgroundColor: '#D9A441',
                      color: '#142B4A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1.25rem'
                    }}
                  >
                    HS
                  </div>
                  <div>
                    <div style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#FFFFFF' }}>Dr. Himanshu Rai</div>
                    <div style={{ fontSize: '0.8125rem', color: '#D9A441' }}>Director & Chief Mentor • Ex-Civil Services Officer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. POPULAR COURSES & EXAMINATION PROGRAMS ── */}
        <section className="hc-section hc-section-alt" id="courses">
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">Our Programs</span>
              <h2 className="hc-section-title">Comprehensive Coaching Programs</h2>
              <p className="hc-section-desc">
                From prestigious Civil Services (UPSC, HPAS, State PCS) to Defence, Banking, SSC and School Foundations.
              </p>

              {/* Filter Tabs */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      backgroundColor: activeCategory === cat ? '#142B4A' : '#F1F5F9',
                      color: activeCategory === cat ? '#FFFFFF' : '#475569',
                      border: '1px solid',
                      borderColor: activeCategory === cat ? '#142B4A' : '#E2E8F0',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses Grid */}
            <div className="hc-grid-3">
              {filteredCourses.map((course) => (
                <div key={course.id} className="hc-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Card Header Banner */}
                  <div
                    style={{
                      backgroundColor: '#142B4A',
                      color: '#FFFFFF',
                      padding: '20px 24px',
                      borderBottom: '3px solid #D9A441',
                      position: 'relative'
                    }}
                  >
                    {course.badge && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '16px',
                          backgroundColor: '#D9A441',
                          color: '#142B4A',
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {course.badge}
                      </span>
                    )}
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase' }}>
                      {course.category}
                    </span>
                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px', lineHeight: 1.3 }}>
                      {course.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6, marginBottom: '18px' }}>
                      {course.description}
                    </p>

                    {/* Metadata Strip */}
                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '8px',
                        padding: '12px 14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.8125rem',
                        marginBottom: '18px',
                        border: '1px solid #E2E8F0'
                      }}
                    >
                      <div>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.6875rem' }}>Duration</span>
                        <strong style={{ color: '#142B4A' }}>{course.duration}</strong>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ color: '#64748B', display: 'block', fontSize: '0.6875rem' }}>Course Fee</span>
                        <strong style={{ color: '#2457A7', fontSize: '1rem' }}>{course.fee}</strong>
                      </div>
                    </div>

                    {/* Subjects Highlights */}
                    <div style={{ marginBottom: '20px', flex: 1 }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                        Subjects Covered:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {course.subjects.slice(0, 4).map((sub, i) => (
                          <span
                            key={i}
                            style={{
                              backgroundColor: '#EFF6FF',
                              color: '#2457A7',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              padding: '3px 8px',
                              borderRadius: '4px',
                              border: '1px solid #DBEAFE'
                            }}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <button
                        onClick={() => openEnquiryWithCourse(course.title)}
                        className="hc-btn-primary"
                        style={{ padding: '10px 14px', fontSize: '0.8125rem' }}
                      >
                        Enquire Now
                      </button>
                      <Link
                        href={`/courses`}
                        className="hc-btn-secondary"
                        style={{ padding: '9px 14px', fontSize: '0.8125rem', textAlign: 'center' }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link href="/courses" className="hc-btn-primary" style={{ padding: '14px 32px' }}>
                <span>Browse All Available Courses & Detailed Syllabus</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── ADVANCED SECTION A: INTERACTIVE SCHOLARSHIP CALCULATOR ── */}
        <section className="hc-section" style={{ backgroundColor: '#F1F5F9' }}>
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">Merit & Need Based Concessions</span>
              <h2 className="hc-section-title">Check Your Scholarship Eligibility</h2>
              <p className="hc-section-desc">
                Calculate your direct fee discount based on previous academic merit, competitive test percentiles, or special categories.
              </p>
            </div>

            <ScholarshipCalculator 
              onApplyScholarship={(course, scholarship) => {
                setSelectedCourse(`${course} (${scholarship})`);
                setEnquiryOpen(true);
              }}
            />
          </div>
        </section>

        {/* ── ADVANCED SECTION B: LIVE DIAGNOSTIC PRELIMS QUIZ ── */}
        <section className="hc-section hc-section-alt">
          <div className="hc-container" style={{ maxWidth: '840px' }}>
            <div className="hc-section-header">
              <span className="hc-badge">Knowledge Check</span>
              <h2 className="hc-section-title">Take a Quick 5-Question Prelims Test</h2>
              <p className="hc-section-desc">
                Experience the caliber of our daily classroom questions with immediate answers and faculty analytical explanations.
              </p>
            </div>

            <InteractiveQuiz />
          </div>
        </section>

        {/* ── ADVANCED SECTION C: SIDE-BY-SIDE COURSE COMPARISON ── */}
        <section className="hc-section">
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">Decision Matrix</span>
              <h2 className="hc-section-title">Compare Exam Programs & Batches</h2>
              <p className="hc-section-desc">
                Review class hours, test series counts, mentorship levels, and fee schedules to make an informed career decision.
              </p>
            </div>

            <CourseComparisonTable onSelectCourse={(title) => openEnquiryWithCourse(title)} />
          </div>
        </section>

        {/* ── 5. WHY CHOOSE US (PILLARS OF EXCELLENCE) ── */}
        <section className="hc-section hc-section-alt">
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">The Himanshu Advantage</span>
              <h2 className="hc-section-title">Why Top Rankers Choose Himanshu Classes</h2>
              <p className="hc-section-desc">
                A scientific, structured methodology refined over 18 years that turns aspirations into top merit lists.
              </p>
            </div>

            <div className="hc-grid-3">
              <div className="hc-card" style={{ padding: '32px 28px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2457A7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Users size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '10px' }}>
                  Ex-Bureaucrat & Ph.D. Faculty
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.7 }}>
                  Learn directly from former civil servants, NET JRF holders, and IITians with deep domain mastery who guide you through the real nuances of scoring high.
                </p>
              </div>

              <div className="hc-card" style={{ padding: '32px 28px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Target size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '10px' }}>
                  Daily Mains Answer Writing
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.7 }}>
                  Daily questions with rigorous evaluation within 48 hours, model topper copies, and line-by-line constructive feedback on presentation and articulation.
                </p>
              </div>

              <div className="hc-card" style={{ padding: '32px 28px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2457A7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <BookOpen size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '10px' }}>
                  Complete Study Kit
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.7 }}>
                  Crisp, updated, syllabus-mapped printed study modules, state-specific booklets, and monthly current affairs compilations with zero fluff.
                </p>
              </div>

              <div className="hc-card" style={{ padding: '32px 28px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Clock size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '10px' }}>
                  24x7 Silent Library & Lab
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.7 }}>
                  Air-conditioned silent study zone with high-speed internet, digital mock test terminal labs, and verified nearby hostel arrangements.
                </p>
              </div>

              <div className="hc-card" style={{ padding: '32px 28px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2457A7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Award size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '10px' }}>
                  Realistic Mock Interview Boards
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.7 }}>
                  Personality development sessions conducted by retired UPSC / State PSC Board chairpersons, psychologists, and senior IAS/IPS/Defence veterans.
                </p>
              </div>

              <div className="hc-card" style={{ padding: '32px 28px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <ShieldCheck size={26} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '10px' }}>
                  Recorded Lecture Backups
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.7 }}>
                  Missed a class due to illness or personal reasons? Access studio-grade 4K recordings of every session on our student portal with unlimited revisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. EXPERT FACULTY PROFILES ── */}
        <section className="hc-section" id="faculty">
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">Expert Faculty</span>
              <h2 className="hc-section-title">Learn from Distinguished Educators</h2>
              <p className="hc-section-desc">
                Passionate subject scholars who simplify complex conceptual doctrines into clear, memorable insights.
              </p>
            </div>

            <div className="hc-grid-3">
              {FACULTY_DATA.map((fac) => (
                <div key={fac.id} className="hc-card" style={{ textAlign: 'center', padding: '32px 24px' }}>
                  {/* Faculty Avatar */}
                  <div
                    style={{
                      width: '96px',
                      height: '96px',
                      borderRadius: '50%',
                      backgroundColor: '#142B4A',
                      color: '#D9A441',
                      border: '3px solid #D9A441',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 18px auto',
                      fontSize: '2rem',
                      fontWeight: 800,
                      boxShadow: '0 8px 20px rgba(20, 43, 74, 0.15)'
                    }}
                  >
                    {fac.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '4px' }}>
                    {fac.name}
                  </h3>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {fac.designation}
                  </div>

                  <div
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#2457A7',
                      backgroundColor: '#EFF6FF',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      display: 'inline-block',
                      marginBottom: '16px'
                    }}
                  >
                    {fac.subject}
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6, marginBottom: '14px' }}>
                    <strong>Qualification:</strong> {fac.qualification}
                  </p>

                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                    <span>{fac.experience}</span>
                    <span style={{ color: '#16A34A' }}>{fac.selections}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link href="/faculty" className="hc-btn-secondary">
                <span>View Complete Faculty List & Qualifications</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 7. TOPPERS & RESULTS HIGHLIGHTS ── */}
        <section className="hc-section hc-section-alt" id="results">
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">Results & Achievements</span>
              <h2 className="hc-section-title">Celebrating Our Hall of Fame</h2>
              <p className="hc-section-desc">
                Meet the proud rankers who trusted Himanshu Classes and secured top positions in Civil Services.
              </p>
            </div>

            <div className="hc-grid-3">
              {TOPPERS_DATA.map((topper) => (
                <div
                  key={topper.id}
                  className="hc-card"
                  style={{
                    padding: '28px',
                    position: 'relative',
                    borderTop: '4px solid #D9A441'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span
                      style={{
                        backgroundColor: '#D9A441',
                        color: '#142B4A',
                        fontWeight: 900,
                        fontSize: '0.9375rem',
                        padding: '4px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      {topper.rank}
                    </span>
                    <span style={{ fontSize: '0.8125rem', color: '#64748B', fontWeight: 600 }}>
                      {topper.year} Selection
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '4px' }}>
                    {topper.name}
                  </h3>
                  <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#2457A7', marginBottom: '2px' }}>
                    {topper.exam}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '16px' }}>
                    State: {topper.state} • Program: {topper.course}
                  </div>

                  <blockquote
                    style={{
                      fontSize: '0.875rem',
                      color: '#475569',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                      backgroundColor: '#F8FAFC',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      borderLeft: '3px solid #2457A7'
                    }}
                  >
                    &ldquo;{topper.testimonial}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <Link href="/results" className="hc-btn-primary">
                <span>View All 500+ UPSC & State PCS Selection Records</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 8. STUDENT TESTIMONIALS ── */}
        <section className="hc-section">
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">Student Reviews</span>
              <h2 className="hc-section-title">What Our Aspirants Say</h2>
              <p className="hc-section-desc">
                Authentic feedback from students who transformed their exam preparations with our classroom guidance.
              </p>
            </div>

            <div className="hc-grid-4">
              {TESTIMONIALS_DATA.map((t) => (
                <div key={t.id} className="hc-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', color: '#D9A441', gap: '3px', marginBottom: '14px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#D9A441" />
                    ))}
                  </div>

                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, flex: 1, marginBottom: '20px' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#142B4A' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#2457A7', fontWeight: 600 }}>{t.role}</div>
                    <div style={{ fontSize: '0.6875rem', color: '#64748B' }}>{t.exam}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. PHOTO GALLERY ── */}
        <section className="hc-section hc-section-alt" id="gallery">
          <div className="hc-container">
            <div className="hc-section-header">
              <span className="hc-badge">Campus Life</span>
              <h2 className="hc-section-title">Inside Himanshu Classes Campus</h2>
              <p className="hc-section-desc">
                Take a glimpse into our smart classrooms, interactive seminars, silent study library, and felicitation ceremonies.
              </p>
            </div>

            <div className="hc-grid-3">
              {GALLERY_DATA.map((item) => (
                <div key={item.id} className="hc-card" style={{ overflow: 'hidden' }}>
                  {/* Visual placeholder box */}
                  <div
                    style={{
                      height: '200px',
                      backgroundColor: '#142B4A',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      padding: '20px',
                      textAlign: 'center',
                      background: 'linear-gradient(135deg, #142B4A 0%, #2457A7 100%)'
                    }}
                  >
                    <BookOpen size={36} style={{ color: '#D9A441', marginBottom: '10px' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase' }}>
                      {item.category}
                    </span>
                    <strong style={{ fontSize: '1rem', marginTop: '4px' }}>{item.title}</strong>
                  </div>

                  <div style={{ padding: '16px 20px' }}>
                    <p style={{ fontSize: '0.8125rem', color: '#64748B', lineHeight: 1.6 }}>
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10. FAQ SECTION (ACCORDION) ── */}
        <section className="hc-section">
          <div className="hc-container" style={{ maxWidth: '840px' }}>
            <div className="hc-section-header">
              <span className="hc-badge">Got Questions?</span>
              <h2 className="hc-section-title">Frequently Asked Questions</h2>
              <p className="hc-section-desc">
                Clear answers to common questions about courses, class timings, hostels, and scholarships.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAQ_DATA.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        gap: '16px',
                        color: isOpen ? '#2457A7' : '#142B4A',
                        fontWeight: 700,
                        fontSize: '1rem'
                      }}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        size={20}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s',
                          flexShrink: 0,
                          color: isOpen ? '#2457A7' : '#94A3B8'
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: '0 24px 20px 24px',
                          fontSize: '0.9375rem',
                          color: '#475569',
                          lineHeight: 1.7,
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '14px'
                        }}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 11. CONTACT & FRONTEND-ONLY ADMISSION FORM ── */}
        <section className="hc-section hc-section-alt" id="contact" style={{ backgroundColor: '#142B4A', color: '#FFFFFF' }}>
          <div className="hc-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '56px',
                alignItems: 'center'
              }}
              className="hc-grid-2"
            >
              {/* Left Column: Direct Helpline & Campus Location */}
              <div>
                <span
                  style={{
                    backgroundColor: 'rgba(217,164,65,0.2)',
                    color: '#D9A441',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Visit Or Call Us
                </span>
                <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#FFFFFF', marginTop: '12px', marginBottom: '16px' }}>
                  Begin Your Preparation Journey with Confidence
                </h2>
                <p style={{ fontSize: '1rem', color: '#CBD5E1', lineHeight: 1.7, marginBottom: '32px' }}>
                  Walk into our central campus for personalized counseling and free diagnostic mock tests. Our counselors are available all 7 days.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(217,164,65,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D9A441', flexShrink: 0 }}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <div style={{ color: '#D9A441', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase' }}>Campus Address</div>
                      <div style={{ fontSize: '0.9375rem', color: '#FFFFFF', marginTop: '2px', lineHeight: 1.6 }}>{INSTITUTE_INFO.address}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(217,164,65,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D9A441', flexShrink: 0 }}>
                      <Phone size={22} />
                    </div>
                    <div>
                      <div style={{ color: '#D9A441', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase' }}>Direct Admission Helpline</div>
                      <div style={{ fontSize: '1.125rem', color: '#FFFFFF', fontWeight: 800, marginTop: '2px' }}>
                        <a href={`tel:${INSTITUTE_INFO.phone}`} style={{ color: '#FFFFFF' }}>{INSTITUTE_INFO.phone}</a>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Alternate: {INSTITUTE_INFO.altPhone}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(217,164,65,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D9A441', flexShrink: 0 }}>
                      <Mail size={22} />
                    </div>
                    <div>
                      <div style={{ color: '#D9A441', fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase' }}>Official Email</div>
                      <div style={{ fontSize: '0.9375rem', color: '#FFFFFF', marginTop: '2px' }}>
                        <a href={`mailto:${INSTITUTE_INFO.email}`} style={{ color: '#FFFFFF' }}>{INSTITUTE_INFO.email}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '36px' }}>
                  <a
                    href={INSTITUTE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#16A34A',
                      color: '#FFFFFF',
                      padding: '12px 24px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)'
                    }}
                  >
                    <span>Instant WhatsApp Counseling Support</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Right Column: Embedded Quick Enquiry Form */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#1E293B',
                  borderRadius: '20px',
                  padding: '36px 32px',
                  boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
                  border: '2px solid #D9A441'
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Fast Registration
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#142B4A', marginTop: '4px' }}>
                    Request Free Counseling Call
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: '#64748B', marginTop: '4px' }}>
                    Fill in your details below and our senior mentor will connect with you.
                  </p>
                </div>

                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="hc-btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '1rem', justifyContent: 'center' }}
                >
                  <Sparkles size={18} />
                  <span>Open Full Admission Form</span>
                </button>

                <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8125rem', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: '#16A34A' }} />
                    <span>Free syllabus PDF & 5-Year Question Trend Analysis</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: '#16A34A' }} />
                    <span>Invite for weekend offline seminar at Dwarka Campus</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} style={{ color: '#16A34A' }} />
                    <span>Scholarship eligibility test registration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <Footer />

      {/* ── INTERACTIVE ENQUIRY MODAL (FRONTEND DEMO) ── */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        defaultCourse={selectedCourse}
      />

      {/* Responsive Styles for Hero & Grids */}
      <style jsx>{`
        @media (max-width: 992px) {
          :global(.hc-hero-grid) {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          :global(.hc-hero-title) {
            font-size: 2.25rem !important;
          }
        }
        @media (max-width: 640px) {
          :global(.hc-hero-title) {
            font-size: 1.875rem !important;
          }
        }
      `}</style>
    </div>
  );
}
