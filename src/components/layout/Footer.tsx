'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { INSTITUTE_INFO, COURSES_DATA } from '@/lib/website-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#142B4A', color: '#CBD5E1', borderTop: '4px solid #D9A441' }}>
      {/* ── TOP HIGHLIGHT BANNER ── */}
      <div style={{ backgroundColor: '#0F2038', padding: '32px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="hc-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(217,164,65,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D9A441' }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.9375rem' }}>Government Recognized</div>
                <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Serving Aspirants Since {INSTITUTE_INFO.established}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(217,164,65,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D9A441' }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.9375rem' }}>{INSTITUTE_INFO.stats.selections} Selections</div>
                <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>Across Civil Services & State Exams</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '10px', backgroundColor: 'rgba(217,164,65,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D9A441' }}>
                <Clock size={24} />
              </div>
              <div>
                <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.9375rem' }}>7 Days Academic Support</div>
                <div style={{ fontSize: '0.8125rem', color: '#94A3B8' }}>8:00 AM to 8:30 PM Helpline</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER CONTENT ── */}
      <div style={{ padding: '64px 0 48px 0' }}>
        <div className="hc-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>
            {/* Col 1: Institute About */}
            <div style={{ gridColumn: 'span 1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#142B4A' }}>
                  <GraduationCap size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>{INSTITUTE_INFO.name}</span>
                  <div style={{ fontSize: '0.6875rem', color: '#D9A441', fontWeight: 600 }}>Estd. {INSTITUTE_INFO.established}</div>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#94A3B8', marginBottom: '20px' }}>
                {INSTITUTE_INFO.tagline}. Dedicated to delivering ethical, rigorous, and result-oriented coaching for Civil Services, State Administrative Services, and competitive examinations.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D9A441', fontSize: '0.8125rem', fontWeight: 600 }}>
                <CheckCircle2 size={16} />
                <span>{INSTITUTE_INFO.subTagline}</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', borderBottom: '2px solid #D9A441', display: 'inline-block', paddingBottom: '4px' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
                <li><Link href="/" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>Home</Link></li>
                <li><Link href="/about" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>About Institute</Link></li>
                <li><Link href="/courses" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>Courses & Programs</Link></li>
                <li><Link href="/faculty" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>Expert Faculty</Link></li>
                <li><Link href="/results" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>Results & Toppers</Link></li>
                <li><Link href="/study-materials" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>Free Study Material</Link></li>
                <li><Link href="/contact" style={{ color: '#CBD5E1', transition: 'color 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>Contact & Admissions</Link></li>
              </ul>
            </div>

            {/* Col 3: Popular Courses */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', borderBottom: '2px solid #D9A441', display: 'inline-block', paddingBottom: '4px' }}>
                Examination Courses
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
                {COURSES_DATA.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <Link href="/courses" style={{ color: '#CBD5E1', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#D9A441')} onMouseLeave={(e) => (e.currentTarget.style.color = '#CBD5E1')}>
                      <ArrowRight size={12} style={{ color: '#D9A441' }} />
                      <span>{c.title.split('(')[0]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact Information */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '20px', borderBottom: '2px solid #D9A441', display: 'inline-block', paddingBottom: '4px' }}>
                Campus Office
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.875rem', color: '#94A3B8' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <MapPin size={18} style={{ color: '#D9A441', flexShrink: 0, marginTop: '2px' }} />
                  <span>{INSTITUTE_INFO.address}</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Phone size={16} style={{ color: '#D9A441', flexShrink: 0 }} />
                  <a href={`tel:${INSTITUTE_INFO.phone}`} style={{ color: '#CBD5E1' }}>{INSTITUTE_INFO.phone}</a>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Mail size={16} style={{ color: '#D9A441', flexShrink: 0 }} />
                  <a href={`mailto:${INSTITUTE_INFO.email}`} style={{ color: '#CBD5E1' }}>{INSTITUTE_INFO.email}</a>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <a 
                    href={INSTITUTE_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#16A34A',
                      color: '#FFFFFF',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.8125rem'
                    }}
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM COPYRIGHT BAR ── */}
      <div style={{ backgroundColor: '#0B192C', padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8125rem', color: '#64748B' }}>
        <div className="hc-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            © {currentYear} {INSTITUTE_INFO.name}. All Rights Reserved. (Frontend Demo Edition)
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Admission</span>
            <span>•</span>
            <span>Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
