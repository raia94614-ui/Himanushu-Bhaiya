'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 w-full max-w-md"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: '#0a1628' }}
          >
            <GraduationCap className="w-6 h-6" style={{ color: '#c9a84c' }} />
          </div>
          <span className="font-extrabold text-[#0a1628] text-lg">
            Himanshu <span style={{ color: '#c9a84c' }}>Classes</span>
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="text-2xl font-extrabold text-[#0a1628] mb-2">Forgot Password?</h1>
              <p className="text-slate-500 text-sm mb-6">
                Enter your registered email address and we'll send you a reset link.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="your@email.com"
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c] bg-white"
                    />
                  </div>
                  {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
                </div>

                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-70"
                  style={{ background: '#0a1628' }}
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Reset Link</>
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0a1628] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </motion.div>

              <h2 className="text-xl font-extrabold text-[#0a1628] mb-2">Check Your Email!</h2>
              <p className="text-slate-500 text-sm mb-1">We've sent a password reset link to</p>
              <p className="font-bold text-[#0a1628] text-sm mb-6" style={{ color: '#c9a84c' }}>
                {email}
              </p>
              <p className="text-xs text-slate-400 mb-8">
                The link will expire in 15 minutes. Check your spam folder if you don't see it.
              </p>

              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: '#0a1628' }}
              >
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>

              <button
                onClick={() => { setSent(false); setEmail(''); }}
                className="block w-full mt-3 text-center text-xs font-semibold hover:underline"
                style={{ color: '#c9a84c' }}
              >
                Try a different email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
