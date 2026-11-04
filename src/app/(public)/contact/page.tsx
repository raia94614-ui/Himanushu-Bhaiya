'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/common/EnquiryModal';
import { INSTITUTE_INFO, COURSES_DATA } from '@/lib/website-data';

export default function ContactPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: COURSES_DATA[0]?.title || '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setSubmitted(true);
    }
  };

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
              Get in Touch • Admission Helpdesk
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
              Contact Himanshu Classes Central Campus
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto' }}>
              We are open Monday to Sunday for in-person counseling, syllabus review, and scholarship guidance.
            </p>
          </div>
        </section>

        {/* Contact Content Grid */}
        <section className="hc-section">
          <div className="hc-container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="hc-grid-2">
              {/* Left Column: Campus Information */}
              <div>
                <span className="hc-badge">Head Office & Admissions</span>
                <h2 className="hc-section-title">Visit Our Dwarka Campus</h2>
                <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.8, marginBottom: '32px' }}>
                  Located just 2 minutes from Dwarka Sector 12 Metro Station. Easy parking and safe hostel accommodations nearby.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2457A7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '1rem', color: '#142B4A', display: 'block' }}>Main Campus Address</strong>
                      <span style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6 }}>{INSTITUTE_INFO.address}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={24} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '1rem', color: '#142B4A', display: 'block' }}>Helpline Numbers</strong>
                      <span style={{ fontSize: '0.9375rem', color: '#64748B', display: 'block' }}>Primary: <a href={`tel:${INSTITUTE_INFO.phone}`} style={{ color: '#2457A7', fontWeight: 700 }}>{INSTITUTE_INFO.phone}</a></span>
                      <span style={{ fontSize: '0.9375rem', color: '#64748B' }}>Alternate: {INSTITUTE_INFO.altPhone}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#EFF6FF', color: '#2457A7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '1rem', color: '#142B4A', display: 'block' }}>Official Email</strong>
                      <a href={`mailto:${INSTITUTE_INFO.email}`} style={{ fontSize: '0.9375rem', color: '#2457A7' }}>{INSTITUTE_INFO.email}</a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FEF3C7', color: '#D9A441', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Clock size={24} />
                    </div>
                    <div>
                      <strong style={{ fontSize: '1rem', color: '#142B4A', display: 'block' }}>Office Working Hours</strong>
                      <span style={{ fontSize: '0.9375rem', color: '#64748B' }}>Monday to Sunday: 8:00 AM – 8:30 PM (All 7 Days)</span>
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
                  </a>
                </div>
              </div>

              {/* Right Column: Direct Frontend Message Form */}
              <div
                className="hc-card"
                style={{
                  padding: '36px',
                  borderTop: '4px solid #142B4A'
                }}
              >
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Quick Message
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#142B4A', marginTop: '4px' }}>
                    Send an Enquiry Message
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
                    Our counselor will respond to your query within 2 hours.
                  </p>
                </div>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#142B4A', marginBottom: '8px' }}>
                      Message Received!
                    </h4>
                    <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                      Thank you, <strong>{formData.name}</strong>. In this frontend demo, your inquiry for <strong>{formData.course}</strong> has been simulated successfully.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="hc-btn-secondary"
                      style={{ padding: '10px 20px', fontSize: '0.875rem' }}
                    >
                      Send Another Query
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Your Full Name <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.9375rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                          Phone Number <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '0.9375rem',
                            outline: 'none',
                            backgroundColor: '#FFFFFF',
                            color: '#1E293B'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="priya@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '0.9375rem',
                            outline: 'none',
                            backgroundColor: '#FFFFFF',
                            color: '#1E293B'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Course Interested In
                      </label>
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.9375rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B'
                        }}
                      >
                        {COURSES_DATA.map((c) => (
                          <option key={c.id} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                        Your Question or Note
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Write your questions regarding batch dates, fees or hostel facilities..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '0.9375rem',
                          outline: 'none',
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B',
                          resize: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="hc-btn-primary"
                      style={{ width: '100%', padding: '14px', fontSize: '1rem', justifyContent: 'center', marginTop: '6px' }}
                    >
                      <Send size={18} />
                      <span>Submit Query to Admission Cell</span>
                    </button>
                  </form>
                )}
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
