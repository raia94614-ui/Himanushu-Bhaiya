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
          backgroundColor: '#142B4A',
          color: '#CBD5E1',
          fontSize: '0.8125rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '6px',
          paddingBottom: '6px'
        }}
      >
        <div 
          className="hc-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          {/* Contact Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a 
              href={`tel:${INSTITUTE_INFO.phone}`} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
            >
              <Phone size={13} style={{ color: '#D9A441' }} />
              <span>{INSTITUTE_INFO.phone}</span>
            </a>
            <a 
              href={`mailto:${INSTITUTE_INFO.email}`} 
              style={{ display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}
            >
              <Mail size={13} style={{ color: '#D9A441' }} />
              <span>{INSTITUTE_INFO.email}</span>
            </a>
          </div>

          {/* Announcement Ticker (English) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F8FAFC' }}>
            <span 
              style={{
                backgroundColor: 'rgba(217, 164, 65, 0.2)',
                color: '#D9A441',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.75rem',
                border: '1px solid rgba(217, 164, 65, 0.4)'
              }}
            >
              New Batch
            </span>
            <span style={{ fontSize: '0.8125rem' }}>
              UPSC & HPAS 2025-26 Foundation Batch Admissions Open • 15% Early Bird Scholarship
            </span>
          </div>
        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR ── */}
      <header
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          boxShadow: scrolled ? '0 10px 25px -5px rgba(20, 43, 74, 0.08)' : 'none',
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
                backgroundColor: '#142B4A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D9A441',
                border: '2px solid #D9A441',
                boxShadow: '0 4px 12px rgba(20, 43, 74, 0.15)',
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
                  color: '#142B4A',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15
                }}
              >
                {INSTITUTE_INFO.name}
              </span>
              <span 
                style={{
                  fontSize: '0.6875rem',
                  fontWeight: 600,
                  color: '#D9A441',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginTop: '2px'
                }}
              >
                Premier Coaching Institute • Estd. {INSTITUTE_INFO.established}
              </span>
            </div>
          </Link>

          {/* 2. CENTER: NAVIGATION LINKS (Desktop) */}
          <nav 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            className="hc-desktop-nav"
          >
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setCoursesDropdown(true)}
                    onMouseLeave={() => setCoursesDropdown(false)}
                  >
                    <Link
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.9375rem',
                        fontWeight: 600,
                        color: isActive ? '#2457A7' : '#1E293B',
                        backgroundColor: isActive ? '#F1F5F9' : 'transparent',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#2457A7')}
                      onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = '#1E293B')}
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
                          backgroundColor: '#FFFFFF',
                          borderRadius: '14px',
                          boxShadow: '0 20px 40px rgba(20, 43, 74, 0.12)',
                          border: '1px solid #E2E8F0',
                          padding: '12px',
                          marginTop: '4px',
                          display: 'grid',
                          gridTemplateColumns: '1fr',
                          gap: '6px'
                        }}
                      >
                        <div style={{ padding: '8px 10px', fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #F1F5F9' }}>
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
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#142B4A' }}>
                                {course.title.split('(')[0]}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                                {course.duration} • {course.fee}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2457A7', backgroundColor: '#EFF6FF', padding: '3px 8px', borderRadius: '4px' }}>
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
                            backgroundColor: '#F8FAFC',
                            color: '#2457A7',
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
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: isActive ? '#2457A7' : '#1E293B',
                    backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#2457A7')}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = '#1E293B')}
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
              className="hc-btn-secondary"
              style={{
                padding: '9px 16px',
                fontSize: '0.875rem'
              }}
            >
              <Phone size={15} />
              <span>Call Now</span>
            </a>

            {/* Student Enquiry Button */}
            <button
              onClick={handleEnquiryClick}
              className="hc-btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.875rem'
              }}
            >
              <Sparkles size={15} style={{ color: '#D9A441' }} />
              <span>Student Enquiry</span>
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              display: 'none',
              padding: '8px',
              borderRadius: '8px',
              color: '#142B4A',
              backgroundColor: '#F1F5F9'
            }}
            className="hc-mobile-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ── RESPONSIVE MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '76px',
            backgroundColor: 'rgba(20, 43, 74, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 99
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              width: '100%',
              maxHeight: 'calc(100vh - 76px)',
              overflowY: 'auto',
              padding: '24px 20px',
              borderBottom: '2px solid #D9A441',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
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
                    color: pathname === link.href ? '#2457A7' : '#142B4A',
                    backgroundColor: pathname === link.href ? '#EFF6FF' : '#F8FAFC',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} style={{ color: '#64748B' }} />
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleEnquiryClick}
                className="hc-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={16} />
                <span>Student Admission Enquiry</span>
              </button>

              <a
                href={`tel:${INSTITUTE_INFO.phone}`}
                className="hc-btn-secondary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Phone size={16} />
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
