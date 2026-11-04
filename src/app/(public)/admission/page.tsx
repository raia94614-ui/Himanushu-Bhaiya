'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { COURSES, INSTITUTE } from '@/lib/mock-data';

export default function AdmissionPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false); setSubmitted(true);
  };
  const steps = ['Choose Your Course', 'Fill the Enquiry Form', 'Counseling Call', 'Pay Fee & Get Access'];
  return (
    <>
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a6b)' }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: '#c9a84c' }}>Join Us</p>
          <h1 className="text-4xl font-black text-white mb-4">Begin Your Journey</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#94a3b8' }}>Take the first step towards your dream career in civil services</p>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-center mb-10" style={{ color: '#0a1628' }}>How to Apply</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mx-auto mb-4"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c46a)', color: '#0a1628' }}>{i + 1}</div>
                <p className="font-semibold text-sm" style={{ color: '#0a1628' }}>{step}</p>
                {i < steps.length - 1 && <div className="hidden md:block absolute" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-14" style={{ background: '#f8f9fc' }}>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border shadow-sm" style={{ borderColor: '#e2e8f0' }}>
              <h2 className="text-xl font-black mb-6" style={{ color: '#0a1628' }}>Enquiry Form</h2>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#0a1628' }}>Enquiry Submitted!</h3>
                  <p style={{ color: '#64748b' }}>Our counselor will call you within 24 hours. Thank you for your interest!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium block mb-1" style={{ color: '#0a1628' }}>Full Name *</label>
                      <input required type="text" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all focus:ring-2"
                        style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
                    </div>
                    <div>
                      <label className="text-sm font-medium block mb-1" style={{ color: '#0a1628' }}>Mobile Number *</label>
                      <input required type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border outline-none text-sm transition-all"
                        style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1" style={{ color: '#0a1628' }}>Email Address</label>
                    <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border outline-none text-sm"
                      style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1" style={{ color: '#0a1628' }}>Course Interest</label>
                    <select value={form.course} onChange={e => setForm(p => ({ ...p, course: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border outline-none text-sm"
                      style={{ borderColor: '#e2e8f0', color: form.course ? '#0a1628' : '#94a3b8' }}>
                      <option value="">Select a course</option>
                      {COURSES.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1" style={{ color: '#0a1628' }}>Message (Optional)</label>
                    <textarea rows={4} placeholder="Any specific questions or requirements..." value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border outline-none text-sm resize-none"
                      style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-lg disabled:opacity-70"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c46a)', color: '#0a1628' }}>
                    {loading ? <span className="animate-spin">⏳</span> : <ArrowRight size={18} />}
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e2e8f0' }}>
              <h3 className="font-bold mb-4" style={{ color: '#0a1628' }}>Contact Information</h3>
              {[
                { icon: Phone, text: INSTITUTE.phone, label: 'Call Us' },
                { icon: Mail, text: INSTITUTE.email, label: 'Email Us' },
                { icon: MapPin, text: INSTITUTE.address, label: 'Visit Us' },
              ].map(({ icon: Icon, text, label }) => (
                <div key={label} className="flex gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#f1f5f9' }}>
                    <Icon size={16} style={{ color: '#0a1628' }} />
                  </div>
                  <div><p className="text-xs font-semibold" style={{ color: '#64748b' }}>{label}</p><p className="text-sm font-medium" style={{ color: '#0a1628' }}>{text}</p></div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: '#e2e8f0' }}>
              <h3 className="font-bold mb-3" style={{ color: '#0a1628' }}>Why Join Us</h3>
              {['Expert UPSC/PCS faculty', 'Daily doubt sessions', 'Structured study plan', 'Mock test series', 'Interview preparation', 'Scholarship available'].map(b => (
                <p key={b} className="flex items-center gap-2 text-sm mb-2" style={{ color: '#64748b' }}>
                  <CheckCircle size={14} style={{ color: '#22c55e' }} /> {b}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
