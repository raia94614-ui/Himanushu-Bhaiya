'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, CheckCircle, GraduationCap } from 'lucide-react';
import Link from 'next/link';

function getStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const STRENGTH_COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
const STRENGTH_LABELS = ['Weak', 'Fair', 'Good', 'Strong'];

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const strength = getStrength(password);

  const checks = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: 'Special character', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleReset = () => {
    if (strength < 3) { setError('Password is too weak.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1600);
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
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#0a1628' }}>
            <GraduationCap className="w-6 h-6" style={{ color: '#c9a84c' }} />
          </div>
          <span className="font-extrabold text-[#0a1628] text-lg">
            Himanshu <span style={{ color: '#c9a84c' }}>Classes</span>
          </span>
        </div>

        {success ? (
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </motion.div>
            <h2 className="text-xl font-extrabold text-[#0a1628] mb-2">Password Changed!</h2>
            <p className="text-slate-500 text-sm mb-8">
              Your password has been updated successfully. You can now log in with your new password.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: '#0a1628' }}
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold text-[#0a1628] mb-2">Reset Password</h1>
            <p className="text-slate-500 text-sm mb-6">Create a new secure password for your account.</p>

            <div className="space-y-4">
              {/* New Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPwd ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                  />
                  <button
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength Bars */}
                {password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-1.5 rounded-full transition-all"
                          style={{ background: i < strength ? STRENGTH_COLORS[strength - 1] : '#e2e8f0' }}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] font-semibold" style={{ color: STRENGTH_COLORS[strength - 1] || '#94a3b8' }}>
                      {password ? STRENGTH_LABELS[strength - 1] || 'Very Weak' : ''}
                    </p>
                  </div>
                )}
              </div>

              {/* Requirements Checklist */}
              {password && (
                <div className="grid grid-cols-2 gap-2">
                  {checks.map((c) => (
                    <div key={c.label} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: c.met ? '#d1fae5' : '#f1f5f9' }}
                      >
                        {c.met && <CheckCircle className="w-3 h-3 text-emerald-600" />}
                      </div>
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: c.met ? '#065f46' : '#94a3b8' }}
                      >
                        {c.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setError(''); }}
                    placeholder="Re-enter your password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                    style={{ borderColor: confirm && confirm !== password ? '#fca5a5' : '#e2e8f0' }}
                  />
                  <button
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {confirm && confirm !== password && (
                  <p className="text-[11px] text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              {error && <p className="text-xs text-red-500">{error}</p>}

              <button
                onClick={handleReset}
                disabled={loading || strength < 3 || password !== confirm}
                className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-50"
                style={{ background: '#0a1628' }}
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Resetting...</>
                ) : (
                  <><Lock className="w-4 h-4" /> Reset Password</>
                )}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
