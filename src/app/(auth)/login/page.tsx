'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Phone, Mail, Lock, ArrowRight, Shield, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const [tab, setTab] = useState<'email' | 'otp'>('email');
  const [showPass, setShowPass] = useState(false);
  const [emailForm, setEmailForm] = useState({ email: '', password: '' });
  const [otpForm, setOtpForm] = useState({ phone: '', otp: '' });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    window.location.href = '/student/dashboard';
  };

  const handleSendOtp = async () => {
    if (!otpForm.phone) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setOtpSent(true);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...otpValues];
    next[i] = val;
    setOtpValues(next);
    if (val && i < 5) (document.getElementById(`otp-${i + 1}`) as HTMLInputElement)?.focus();
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    window.location.href = '/student/dashboard';
  };

  return (
    <div className="min-h-screen flex" style={{ background: '#f8f9fc' }}>
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 60%, #0f2448 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #c9a84c 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c46a)', color: '#0a1628' }}>HC</div>
            <div>
              <p className="text-white font-bold text-lg">Himanshu Classes</p>
              <p className="text-xs" style={{ color: '#c9a84c' }}>Premier Coaching Institute</p>
            </div>
          </div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Welcome Back,<br />
            <span style={{ color: '#c9a84c' }}>Achiever!</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: '#94a3b8' }}>
            Log in to access your courses, study materials, tests, and performance dashboard.
          </p>
          {[
            { label: '50,000+ Students Enrolled', icon: '🎓' },
            { label: '15,000+ Selections Achieved', icon: '🏆' },
            { label: 'Expert Faculty Support', icon: '👨‍🏫' },
            { label: '5,000+ Study Materials', icon: '📚' },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-3 mb-3">
              <span className="text-xl">{icon}</span>
              <p className="text-sm font-medium" style={{ color: '#cbd5e1' }}>{label}</p>
            </div>
          ))}
        </div>
        <div className="relative p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <p className="text-sm italic mb-3" style={{ color: '#94a3b8' }}>
            "Himanshu Classes transformed my preparation. The structured approach and mentorship helped me clear UPSC in my first attempt!"
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c46a)', color: '#0a1628' }}>AS</div>
            <div>
              <p className="text-white font-semibold text-sm">Aarav Sharma</p>
              <p className="text-xs" style={{ color: '#c9a84c' }}>AIR 1, UPSC CSE 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black"
              style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a6b)', color: '#c9a84c' }}>HC</div>
            <p className="font-bold text-lg" style={{ color: '#0a1628' }}>Himanshu Classes</p>
          </div>

          <h1 className="text-2xl font-black mb-2" style={{ color: '#0a1628' }}>Sign In to Your Account</h1>
          <p className="text-sm mb-8" style={{ color: '#64748b' }}>
            Don't have an account?{' '}
            <Link href="/admission" className="font-semibold hover:underline" style={{ color: '#c9a84c' }}>
              Contact Admin to Register
            </Link>
          </p>

          {/* Tab Switch */}
          <div className="flex p-1 rounded-xl mb-8" style={{ background: '#f1f5f9' }}>
            {[{ key: 'email', label: '📧 Email & Password' }, { key: 'otp', label: '📱 Mobile OTP' }].map(t => (
              <button key={t.key} onClick={() => setTab(t.key as 'email' | 'otp')}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                style={tab === t.key ? { background: '#0a1628', color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' } : { color: '#64748b' }}>
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {tab === 'email' ? (
              <motion.form key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0a1628' }}>Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                    <input required type="email" placeholder="your@email.com" value={emailForm.email}
                      onChange={e => setEmailForm(p => ({ ...p, email: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 outline-none text-sm transition-all"
                      style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
                      onFocus={e => e.target.style.borderColor = '#c9a84c'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-semibold" style={{ color: '#0a1628' }}>Password</label>
                    <Link href="/forgot-password" className="text-xs font-semibold hover:underline" style={{ color: '#c9a84c' }}>Forgot Password?</Link>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                    <input required type={showPass ? 'text' : 'password'} placeholder="Enter your password" value={emailForm.password}
                      onChange={e => setEmailForm(p => ({ ...p, password: e.target.value }))}
                      className="w-full pl-11 pr-11 py-3.5 rounded-xl border-2 outline-none text-sm transition-all"
                      style={{ borderColor: '#e2e8f0', color: '#0a1628' }}
                      onFocus={e => e.target.style.borderColor = '#c9a84c'}
                      onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:scale-[1.01] disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a6b)', color: 'white' }}>
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><ArrowRight size={16} /> Sign In</>}
                </button>
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t" style={{ borderColor: '#e2e8f0' }} /></div>
                  <div className="relative flex justify-center">
                    <span className="px-3 text-xs" style={{ background: '#f8f9fc', color: '#94a3b8' }}>Demo Credentials</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[{ role: 'Student', email: 'student@demo.com' }, { role: 'Admin', email: 'admin@demo.com' }].map(d => (
                    <button key={d.role} type="button"
                      onClick={() => setEmailForm({ email: d.email, password: 'Demo@123' })}
                      className="py-2 rounded-lg text-xs font-semibold border transition-all hover:bg-slate-50"
                      style={{ borderColor: '#e2e8f0', color: '#64748b' }}>
                      {d.role} Demo
                    </button>
                  ))}
                </div>
              </motion.form>
            ) : (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                {!otpSent ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold block mb-1.5" style={{ color: '#0a1628' }}>Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="px-3 py-3.5 rounded-xl border-2 text-sm font-semibold flex items-center"
                          style={{ borderColor: '#e2e8f0', color: '#0a1628', minWidth: 72 }}>🇮🇳 +91</div>
                        <div className="relative flex-1">
                          <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }} />
                          <input type="tel" placeholder="98765 43210" value={otpForm.phone}
                            onChange={e => setOtpForm(p => ({ ...p, phone: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 outline-none text-sm"
                            style={{ borderColor: '#e2e8f0', color: '#0a1628' }} />
                        </div>
                      </div>
                    </div>
                    <button onClick={handleSendOtp} disabled={loading || !otpForm.phone}
                      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-xl disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #0a1628, #1a3a6b)', color: 'white' }}>
                      {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send OTP'}
                    </button>
                    <p className="text-xs text-center" style={{ color: '#94a3b8' }}>
                      OTP will be sent via SMS. Standard rates apply.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div className="text-center p-4 rounded-xl" style={{ background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                      <CheckCircle size={20} className="mx-auto mb-1" style={{ color: '#22c55e' }} />
                      <p className="text-sm font-semibold" style={{ color: '#16a34a' }}>OTP sent to +91 {otpForm.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold block mb-3 text-center" style={{ color: '#0a1628' }}>Enter 6-digit OTP</label>
                      <div className="flex gap-2 justify-center">
                        {otpValues.map((val, i) => (
                          <input key={i} id={`otp-${i}`} type="text" inputMode="numeric" maxLength={1} value={val}
                            onChange={e => handleOtpChange(i, e.target.value)}
                            onKeyDown={e => { if (e.key === 'Backspace' && !val && i > 0) (document.getElementById(`otp-${i - 1}`) as HTMLInputElement)?.focus(); }}
                            className="w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition-all"
                            style={{ borderColor: val ? '#c9a84c' : '#e2e8f0', color: '#0a1628', background: val ? 'rgba(201,168,76,0.08)' : 'white' }} />
                        ))}
                      </div>
                      <p className="text-xs text-center mt-3" style={{ color: '#94a3b8' }}>
                        Expires in <span className="font-bold" style={{ color: '#ef4444' }}>09:45</span> •{' '}
                        <button type="button" className="font-semibold hover:underline" style={{ color: '#0a1628' }}
                          onClick={() => { setOtpSent(false); setOtpValues(['', '', '', '', '', '']); }}>Resend OTP</button>
                      </p>
                    </div>
                    <button type="submit" disabled={loading || otpValues.some(v => !v)}
                      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:shadow-xl disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #c9a84c, #e4c46a)', color: '#0a1628' }}>
                      {loading ? <div className="w-5 h-5 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" /> : 'Verify & Sign In'}
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 p-4 rounded-xl flex items-start gap-3" style={{ background: 'rgba(10,22,40,0.04)', border: '1px solid rgba(10,22,40,0.08)' }}>
            <Shield size={16} className="mt-0.5 flex-shrink-0" style={{ color: '#64748b' }} />
            <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>
              Your login is secured with industry-grade encryption. Sessions are monitored for suspicious activity. Admin accounts require mandatory 2FA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
