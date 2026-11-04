'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, GraduationCap, CheckCircle, Lock } from 'lucide-react';

export default function Verify2FAPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [useRecovery, setUseRecovery] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 text-white"
        style={{ background: 'linear-gradient(160deg, #0a1628 0%, #1a3a6b 100%)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: '#c9a84c' }}
          >
            <GraduationCap className="w-6 h-6 text-[#0a1628]" />
          </div>
          <span className="font-extrabold text-lg">
            Himanshu <span style={{ color: '#c9a84c' }}>Classes</span>
          </span>
        </div>

        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
            style={{ background: '#c9a84c22', border: '2px solid #c9a84c44' }}
          >
            <ShieldCheck className="w-12 h-12" style={{ color: '#c9a84c' }} />
          </motion.div>
          <h1 className="text-3xl font-extrabold mb-4">Two-Factor Authentication</h1>
          <p className="text-slate-300 text-sm leading-relaxed max-w-xs">
            Your account is protected with an additional layer of security. Enter your authenticator code to continue.
          </p>
          <div
            className="mt-8 p-4 rounded-xl text-left w-full max-w-xs"
            style={{ background: '#c9a84c18', border: '1px solid #c9a84c33' }}
          >
            <p className="text-xs font-semibold" style={{ color: '#c9a84c' }}>🔒 Security Notice</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Never share your OTP with anyone. Himanshu Classes will never ask for your verification code.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-500">© 2026 Himanshu Classes. Secured Portal.</p>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-[#f8f9fc] p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 w-full max-w-md"
        >
          {success ? (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </motion.div>
              <h2 className="text-xl font-extrabold text-[#0a1628] mb-2">Verified!</h2>
              <p className="text-slate-500 text-sm">Redirecting to your dashboard...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6 lg:hidden">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: '#0a1628' }}
                >
                  <GraduationCap className="w-5 h-5" style={{ color: '#c9a84c' }} />
                </div>
                <span className="font-extrabold text-[#0a1628]">Himanshu Classes</span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-extrabold text-[#0a1628]">Enter Authenticator Code</h2>
                <p className="text-slate-500 text-sm mt-2">
                  Open your <strong>Google Authenticator</strong> or <strong>Microsoft Authenticator</strong> app and enter the 6-digit code.
                </p>
              </div>

              {!useRecovery ? (
                <>
                  <div className="flex gap-2 justify-center mb-6">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { inputRefs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 focus:outline-none transition-all"
                        style={{
                          borderColor: digit ? '#0a1628' : '#e2e8f0',
                          background: digit ? '#0a162808' : 'white',
                        }}
                      />
                    ))}
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 text-center mb-4">{error}</p>
                  )}

                  <button
                    onClick={handleVerify}
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-opacity disabled:opacity-70"
                    style={{ background: '#0a1628' }}
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Verifying...</>
                    ) : (
                      <><Lock className="w-4 h-4" /> Verify Code</>
                    )}
                  </button>

                  <button
                    onClick={() => setUseRecovery(true)}
                    className="w-full mt-3 text-center text-xs font-semibold hover:underline"
                    style={{ color: '#c9a84c' }}
                  >
                    Use Recovery Code instead
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Recovery Code</label>
                    <textarea
                      value={recoveryCode}
                      onChange={(e) => setRecoveryCode(e.target.value)}
                      placeholder="Enter your recovery code..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#c9a84c] resize-none"
                    />
                  </div>
                  <button
                    className="w-full py-3 rounded-xl font-bold text-white text-sm"
                    style={{ background: '#0a1628' }}
                    onClick={handleVerify}
                  >
                    Verify Recovery Code
                  </button>
                  <button
                    onClick={() => setUseRecovery(false)}
                    className="w-full mt-3 text-center text-xs font-semibold hover:underline"
                    style={{ color: '#c9a84c' }}
                  >
                    Back to Authenticator Code
                  </button>
                </>
              )}

              <div
                className="mt-6 p-3 rounded-xl text-xs text-slate-500 flex items-start gap-2"
                style={{ background: '#f8f9fc', border: '1px solid #e2e8f0' }}
              >
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
                <span>This portal uses Time-based One-Time Passwords (TOTP). Your code refreshes every 30 seconds.</span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
