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
  ArrowRight,
  MapPin,
  Clock
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

  // Ticker content items for the infinite smooth marquee
  const tickerItems = [
    { icon: Phone, text: INSTITUTE_INFO.phone, isLink: true, href: `tel:${INSTITUTE_INFO.phone}` },
    { icon: Mail, text: INSTITUTE_INFO.email, isLink: true, href: `mailto:${INSTITUTE_INFO.email}` },
    { icon: Sparkles, text: 'UPSC & HPAS 2025-26 Foundation Batch Admissions Open' },
    { icon: Clock, text: 'Morning & Evening Batches • Hybrid Mode Available' },
    { icon: MapPin, text: INSTITUTE_INFO.address },
    { icon: Sparkles, text: 'Flat 15% Early Bird Scholarship for Merit Students' },
  ];

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* ── TOP CONTINUOUS MOVING TICKER / RUNNING MARQUEE ── */}
      <div 
        style={{
          background: 'linear-gradient(90deg, #07111E 0%, #0B1D33 50%, #07111E 100%)',
          color: '#E2E8F0',
          fontSize: '0.8125rem',
          borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <div className="hc-marquee-track">
          {/* Repeating array twice for continuous seamless loop */}
          {[...tickerItems, ...tickerItems].map((item, idx) => {
            const Icon = item.icon;
            if (item.isLink) {
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="hc-ticker-item"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    marginRight: '36px',
                    color: '#F1F5F9',
                    textDecoration: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <Icon size={13} style={{ color: '#F59E0B', flexShrink: 0 }} />
                  <span>{item.text}</span>
                  <span style={{ color: 'rgba(245, 158, 11, 0.5)', marginLeft: '18px' }}>•</span>
                </a>
              );
            }
            return (
              <span
                key={idx}
                className="hc-ticker-item"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  marginRight: '36px',
                  color: '#CBD5E1',
                  fontWeight: 500
                }}
              >
                <Icon size={13} style={{ color: '#F59E0B', flexShrink: 0 }} />
                <span>{item.text}</span>
                <span style={{ color: 'rgba(245, 158, 11, 0.5)', marginLeft: '18px' }}>•</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ── MAIN NAVIGATION BAR (PROPORTIONAL 100% CONTAINER WITH NO OVERFLOW) ── */}
      <header
        style={{
          background: 'linear-gradient(180deg, #0A192F 0%, #0D223E 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: scrolled 
            ? '0 12px 30px -5px rgba(0, 0, 0, 0.45)' 
            : '0 4px 16px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.25s ease'
        }}
      >
        <div 
          style={{
            maxWidth: '100%',
            paddingLeft: '20px',
            paddingRight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
            gap: '12px'
          }}
        >
          {/* 1. LEFT: LOGO & INSTITUTE BRANDING */}
          <Link 
            href="/" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              textDecoration: 'none',
              flexShrink: 0
            }}
          >
            {/* Emblem Crest */}
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#0F2A4A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F59E0B',
                border: '1.5px solid #F59E0B',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.25)',
                flexShrink: 0
              }}
            >
              <GraduationCap size={23} strokeWidth={2.2} />
            </div>

            {/* Name & Tagline */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span 
                style={{
                  fontSize: '1.1875rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap'
                }}
              >
                {INSTITUTE_INFO.name}
              </span>
              <span 
                style={{
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  color: '#F59E0B',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginTop: '2px',
                  whiteSpace: 'nowrap'
                }}
              >
                Premier Coaching • Estd. {INSTITUTE_INFO.established}
              </span>
            </div>
          </Link>

          {/* 2. CENTER: NAVIGATION LINKS (Compact and evenly spaced) */}
          <nav 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
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
                        gap: '3px',
                        height: '38px',
                        padding: '0 10px',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#F59E0B' : '#E2E8F0',
                        
                        transition: 'all 0.15s ease',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#F59E0B';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isActive ? '#F59E0B' : '#E2E8F0';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: coursesDropdown ? 'rotate(180deg)' : 'none' }} />
                    </Link>

                    {/* Courses Dropdown Menu */}
                    {coursesDropdown && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '400px',
                          backgroundColor: '#0F2A4A',
                          borderRadius: '12px',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
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
                              padding: '8px 10px',
                              borderRadius: '8px',
                              transition: 'background 0.15s ease',
                              textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <div>
                              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF' }}>
                                {course.title.split('(')[0]}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
                                {course.duration} • {course.fee}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                              View
                            </span>
                          </Link>
                        ))}
                        <Link
                          href="/courses"
                          onClick={() => setCoursesDropdown(false)}
                          style={{
                            marginTop: '4px',
                            padding: '8px',
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
                    height: '38px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#F59E0B' : '#E2E8F0',
                    
                    transition: 'all 0.15s ease',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F59E0B';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? '#F59E0B' : '#E2E8F0';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. RIGHT: CTA ACTION BUTTONS (Compact to prevent edge clipping) */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0
            }}
            className="hc-desktop-actions"
          >
            {/* Call Now Button */}
            <a
              href={`tel:${INSTITUTE_INFO.phone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
                whiteSpace: 'nowrap'
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
              <Phone size={13} />
              <span>Call Now</span>
            </a>

            {/* Student Enquiry Button */}
            <button
              onClick={handleEnquiryClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 15px',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                fontWeight: 700,
                color: '#FFFFFF',
                background: 'linear-gradient(135deg, #1D4ED8 0%, #2563EB 100%)',
                boxShadow: '0 4px 12px rgba(29, 78, 216, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(29, 78, 216, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(29, 78, 216, 0.4)';
              }}
            >
              <Sparkles size={13} style={{ color: '#FDE68A' }} />
              <span>Student Enquiry</span>
            </button>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '8px',
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
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER NAVIGATION MENU ── */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '104px',
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
              maxHeight: 'calc(100vh - 104px)',
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

      {/* Infinite Marquee Animation & Responsive Breakpoints */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .hc-marquee-track {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
        .hc-marquee-track:hover {
          animation-play-state: paused;
        }
        .hc-ticker-item:hover span {
          color: #F59E0B !important;
        }
        @media (max-width: 1220px) {
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
