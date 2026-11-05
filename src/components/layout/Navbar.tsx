'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Mail, 
  Menu, 
  X, 
  ChevronDown, 
  GraduationCap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { INSTITUTE_INFO, COURSES_DATA } from '@/lib/website-data';

interface NavbarProps {
  onOpenEnquiry?: () => void;
}

export default function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Courses', href: '/courses', hasDropdown: true },
    { label: 'Faculty', href: '/faculty' },
    { label: 'Results', href: '/results' },
    { label: 'Study Material', href: '/study-materials' },
    { label: 'Gallery', href: '/#gallery' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const handleEnquiryClick = (e: React.MouseEvent) => {
    if (onOpenEnquiry) {
      e.preventDefault();
      onOpenEnquiry();
      setMobileMenuOpen(false);
    }
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* ── TOP NOTIFICATION & CONTACT BAR ── */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #0A192F 0%, #0F2A4A 100%)',
          color: '#E2E8F0',
          fontSize: '0.8125rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '8px',
          paddingBottom: '8px'
        }}
      >
        <div 
          className="hc-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          {/* Contact Details with smooth hover transition & pill effect */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href={`tel:${INSTITUTE_INFO.phone}`} 
              className="hc-topbar-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#F1F5F9',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.color = '#FDE68A';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#F1F5F9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Phone size={13} style={{ color: '#F59E0B', transition: 'transform 0.3s' }} />
              <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>{INSTITUTE_INFO.phone}</span>
            </a>

            <a 
              href={`mailto:${INSTITUTE_INFO.email}`} 
              className="hc-topbar-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#F1F5F9',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.2)';
                e.currentTarget.style.borderColor = '#F59E0B';
                e.currentTarget.style.color = '#FDE68A';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#F1F5F9';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Mail size={13} style={{ color: '#F59E0B', transition: 'transform 0.3s' }} />
              <span style={{ fontWeight: 600, letterSpacing: '0.02em' }}>{INSTITUTE_INFO.email}</span>
            </a>
          </div>

          {/* Announcement Ticker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F8FAFC' }}>
            <span 
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: '#F59E0B',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}
            >
              New Batch
            </span>
            <span style={{ fontSize: '0.8125rem', color: '#E2E8F0' }}>
              UPSC & HPAS 2025-26 Foundation Batch Admissions Open • 15% Early Bird Scholarship
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR (PREMIUM SLATE NAVY LOOK) ── */}
      <header
        style={{
          background: 'linear-gradient(180deg, #0A192F 0%, #0D223E 100%)',
          borderBottom: '2px solid rgba(245, 158, 11, 0.3)',
          boxShadow: scrolled 
            ? '0 12px 30px -5px rgba(0, 0, 0, 0.35)' 
            : '0 4px 16px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.25s ease'
        }}
      >
        <div 
          className="hc-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '76px'
          }}
        >
          {/* 1. LEFT: LOGO & INSTITUTE BRANDING */}
          <Link 
            href="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            {/* Emblem Crest */}
            <div 
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: '#0F2A4A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B',
                border: '2px solid #F59E0B',
                boxShadow: '0 4px 14px rgba(245, 158, 11, 0.25)',
                flexShrink: 0
              }}
            >
              <GraduationCap size={26} strokeWidth={2.2} />
            </div>

            {/* Name & Tagline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span 
                style={{
                  fontSize: '1.3125rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15
                }}
              >
                {INSTITUTE_INFO.name}
              </span>
              <span 
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: '#F59E0B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginTop: '2px'
                }}
              >
                Premier Coaching Institute • Estd. {INSTITUTE_INFO.established}
              </span>
            </div>
          </Link>

          {/* 2. CENTER: NAVIGATION LINKS (Desktop) - Perfectly Aligned */}
          <nav 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            className="hc-desktop-nav"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                    onMouseEnter={() => setCoursesDropdown(true)}
                    onMouseLeave={() => setCoursesDropdown(false)}
                  >
                    <Link
                      href={item.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        height: '40px',
                        padding: '0 14px',
                        borderRadius: '8px',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        lineHeight: 1,
                        color: isActive ? '#F59E0B' : '#E2E8F0',
                        backgroundColor: isActive ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                        border: isActive ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
                        transition: 'all 0.2s ease',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#F59E0B';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isActive ? '#F59E0B' : '#E2E8F0';
                        e.currentTarget.style.backgroundColor = isActive ? 'rgba(245, 158, 11, 0.15)' : 'transparent';
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: coursesDropdown ? 'rotate(180deg)' : 'none' }} />
                    </Link>

                    {/* Courses Dropdown Menu */}
                    {coursesDropdown && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '420px',
                          backgroundColor: '#0F2A4A',
                          borderRadius: '14px',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          padding: '12px',
                          marginTop: '6px',
                          display: 'grid',
                          gridTemplateColumns: '1fr',
                          gap: '6px',
                          zIndex: 200
                        }}
                      >
                        <div style={{ padding: '8px 10px', fontSize: '0.75rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          Featured Examination Programs
                        </div>
                        {COURSES_DATA.slice(0, 5).map((course) => (
                          <Link
                            key={course.id}
                            href={`/courses`}
                            onClick={() => setCoursesDropdown(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '10px',
                              borderRadius: '8px',
                              transition: 'background 0.15s ease',
                              textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF' }}>
                                {course.title.split('(')[0]}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                                {course.duration} • {course.fee}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                              View
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/courses"
                          onClick={() => setCoursesDropdown(false)}
                          style={{
                            marginTop: '6px',
                            padding: '10px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            color: '#F59E0B',
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px'
                          }}
                        >
                          Explore All Programs <ArrowRight size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '40px',
                    padding: '0 14px',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    lineHeight: 1,
                    color: isActive ? '#F59E0B' : '#E2E8F0',
                    backgroundColor: isActive ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F59E0B';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? '#F59E0B' : '#E2E8F0';
                    e.currentTarget.style.backgroundColor = isActive ? 'rgba(245, 158, 11, 0.15)' : 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT: CTA ACTION BUTTONS (Desktop) */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
            className="hc-desktop-actions"
          >
            {/* Call Now Button */}
            <a
              href={`tel:${INSTITUTE_INFO.phone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '42px',
                padding: '0 18px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#FFFFFF';
              }}
            >
              <Phone size={15} />
              <span>Call Now</span>
            </a>

            {/* Student Enquiry Button */}
            <button
              onClick={handleEnquiryClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                height: '42px',
                padding: '0 20px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                boxShadow: '0 4px 14px rgba(29, 78, 216, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(29, 78, 216, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(29, 78, 216, 0.4)';
              }}
            >
              <Sparkles size={15} style={{ color: '#FDE68A' }} />
              <span>Student Enquiry</span>
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              display: 'none',
              cursor: 'pointer'
            }}
            className="hc-mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER NAVIGATION MENU ── */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '116px',
            backgroundColor: 'rgba(10, 25, 47, 0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 99
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#0A192F',
              width: '100%',
              maxHeight: 'calc(100vh - 116px)',
              overflowY: 'auto',
              padding: '24px 20px',
              borderBottom: '2px solid #F59E0B',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: pathname === link.href ? '#F59E0B' : '#FFFFFF',
                    backgroundColor: pathname === link.href ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textDecoration: 'none'
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} style={{ color: '#F59E0B' }} />
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleEnquiryClick}
                style={{
                  width: '100%',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#FFFFFF',
                  background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={16} style={{ color: '#FDE68A' }} />
                <span>Student Admission Enquiry</span>
              </button>

              <a
                href={`tel:${INSTITUTE_INFO.phone}`}
                style={{
                  width: '100%',
                  height: '46px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderRadius: '10px',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  color: '#FFFFFF',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none'
                }}
              >
                <Phone size={16} style={{ color: '#F59E0B' }} />
                <span>Call Admission Helpline</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Media queries to show/hide mobile vs desktop nav */}
      <style jsx>{`
        @media (max-width: 1080px) {
          :global(.hc-desktop-nav) {
            display: none !important;
          }
          :global(.hc-desktop-actions) {
            display: none !important;
          }
          :global(.hc-mobile-toggle) {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
