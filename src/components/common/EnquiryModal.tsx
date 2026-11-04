'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, User, Phone, Mail, BookOpen, MessageSquare } from 'lucide-react';
import { COURSES_DATA } from '@/lib/website-data';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourse?: string;
}

export default function EnquiryModal({ isOpen, onClose, defaultCourse = '' }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: defaultCourse || COURSES_DATA[0]?.title || '',
    batchType: 'Classroom Foundation Batch',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.phone.trim() || !/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.course) errs.course = 'Please select a target examination course';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      course: COURSES_DATA[0]?.title || '',
      batchType: 'Classroom Foundation Batch',
      message: '',
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(20, 43, 74, 0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto'
      }}
      onClick={handleReset}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '18px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: 'min(90vh, 720px)',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto 0',
          boxShadow: '0 25px 50px -12px rgba(20, 43, 74, 0.25)',
          overflow: 'hidden',
          border: '1px solid #E2E8F0',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            backgroundColor: '#142B4A',
            color: '#FFFFFF',
            padding: '24px 28px',
            position: 'relative',
            borderBottom: '3px solid #D9A441'
          }}
        >
          <button
            onClick={handleReset}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '6px',
              color: '#CBD5E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s'
            }}
          >
            <X size={20} />
          </button>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#D9A441', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Admission Enquiry Form
          </div>
          <h3 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
            Book Free Counseling & Demo Class
          </h3>
          <p style={{ fontSize: '0.8125rem', color: '#94A3B8', marginTop: '4px' }}>
            Get expert preparation strategy, free syllabus booklet and batch timetable.
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#DCFCE7',
                  color: '#16A34A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}
              >
                <CheckCircle2 size={36} />
              </div>
              <h4 style={{ fontSize: '1.375rem', fontWeight: 800, color: '#142B4A', marginBottom: '8px' }}>
                Enquiry Registered Successfully!
              </h4>
              <p style={{ fontSize: '0.9375rem', color: '#64748B', lineHeight: 1.6, marginBottom: '20px' }}>
                Thank you, <strong>{formData.name}</strong>! Your demo enquiry for <strong>{formData.course}</strong> has been logged in this frontend preview.
              </p>
              <div
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '10px',
                  padding: '14px',
                  fontSize: '0.8125rem',
                  color: '#475569',
                  marginBottom: '24px'
                }}
              >
                ℹ️ <strong>Frontend Demo Note:</strong> No data is sent to any server or database. In a production build, our counselor would contact you at <strong>{formData.phone}</strong>.
              </div>
              <button
                onClick={handleReset}
                className="hc-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Done / Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Full Name */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                  Student Full Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: `1px solid ${errors.name ? '#EF4444' : '#CBD5E1'}`,
                      fontSize: '0.9375rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: '#1E293B'
                    }}
                  />
                  <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                </div>
                {errors.name && <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
              </div>

              {/* Phone & Email Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    Mobile Number <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '8px',
                        border: `1px solid ${errors.phone ? '#EF4444' : '#CBD5E1'}`,
                        fontSize: '0.9375rem',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#1E293B'
                      }}
                    />
                    <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                  {errors.phone && <span style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', display: 'block' }}>{errors.phone}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                    Email Address (Optional)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      placeholder="rahul@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.9375rem',
                        outline: 'none',
                        backgroundColor: '#FFFFFF',
                        color: '#1E293B'
                      }}
                    />
                    <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                  </div>
                </div>
              </div>

              {/* Target Course */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                  Target Exam / Course <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9375rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: '#1E293B',
                      appearance: 'none'
                    }}
                  >
                    {COURSES_DATA.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title} ({c.fee})
                      </option>
                    ))}
                  </select>
                  <BookOpen size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                </div>
              </div>

              {/* Batch Preference */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                  Preferred Learning Mode
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {['Classroom Foundation Batch', 'Weekend Professional Batch', 'Live Online Batch'].map((m) => (
                    <label
                      key={m}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8125rem',
                        color: '#1E293B',
                        cursor: 'pointer',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${formData.batchType === m ? '#2457A7' : '#E2E8F0'}`,
                        backgroundColor: formData.batchType === m ? '#EFF6FF' : '#FFFFFF'
                      }}
                    >
                      <input
                        type="radio"
                        name="batchType"
                        checked={formData.batchType === m}
                        onChange={() => setFormData({ ...formData, batchType: m })}
                        style={{ accentColor: '#2457A7' }}
                      />
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message / Query */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 700, color: '#1E293B', marginBottom: '6px' }}>
                  Your Query or Location
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    rows={3}
                    placeholder="Ask about hostel, batch timings, scholarships, etc."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9375rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      color: '#1E293B',
                      resize: 'none'
                    }}
                  />
                  <MessageSquare size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#94A3B8' }} />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="hc-btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px', justifyContent: 'center' }}
              >
                <Send size={18} />
                <span>Submit Free Admission Enquiry</span>
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94A3B8' }}>
                🔒 Your privacy is strictly protected. No spam or promotional calls.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
