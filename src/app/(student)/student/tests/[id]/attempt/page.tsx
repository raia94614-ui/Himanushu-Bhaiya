'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Flag, CheckSquare, X, Clock, AlertTriangle } from 'lucide-react';

const NAVY = '#0a1628';
const GOLD = '#c9a84c';
const NAVY_MID = '#1a3a6b';

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: 'Which of the following events marked the beginning of the Indian National Movement?',
    options: [
      'Formation of the Indian National Congress in 1885',
      'Revolt of 1857',
      'Partition of Bengal in 1905',
      'Non-Cooperation Movement of 1920',
    ],
    subject: 'History',
  },
  {
    id: 2,
    text: 'The Directive Principles of State Policy in the Indian Constitution are borrowed from the constitution of:',
    options: ['USA', 'Ireland', 'UK', 'Canada'],
    subject: 'Polity',
  },
  {
    id: 3,
    text: 'Which Article of the Indian Constitution grants the Right to Constitutional Remedies?',
    options: ['Article 19', 'Article 21', 'Article 32', 'Article 44'],
    subject: 'Polity',
  },
  {
    id: 4,
    text: 'The Westerlies are winds that originate from:',
    options: [
      'Tropical High Pressure Belts',
      'Sub-Tropical High Pressure Belts',
      'Polar High Pressure Belts',
      'Sub-Polar Low Pressure Belts',
    ],
    subject: 'Geography',
  },
  {
    id: 5,
    text: 'Which of the following is NOT a Millennium Development Goal set by the United Nations?',
    options: [
      'Eradicate extreme poverty and hunger',
      'Achieve universal primary education',
      'Ensure equal pay for equal work globally',
      'Combat HIV/AIDS, malaria and other diseases',
    ],
    subject: 'International Relations',
  },
];

const TOTAL_QUESTIONS = 60;

function useCountdown(totalSeconds: number) {
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h, m, s, total: seconds };
}

export default function TestAttemptPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { h, m, s, total } = useCountdown(180 * 60);

  const question = MOCK_QUESTIONS[currentQ] || MOCK_QUESTIONS[0];
  const isLast = currentQ === MOCK_QUESTIONS.length - 1;
  const answeredCount = Object.keys(answers).length;

  function getQStatus(qIdx: number): 'current' | 'answered' | 'review' | 'unanswered' {
    if (qIdx === currentQ) return 'current';
    if (markedForReview.has(qIdx)) return 'review';
    if (answers[qIdx] !== undefined) return 'answered';
    return 'unanswered';
  }

  function qStatusStyle(status: ReturnType<typeof getQStatus>) {
    switch (status) {
      case 'current': return { background: GOLD, color: '#fff', fontWeight: 700 };
      case 'answered': return { background: '#16a34a', color: '#fff' };
      case 'review': return { background: '#7c3aed', color: '#fff' };
      default: return { background: '#f3f4f6', color: '#374151' };
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f8f9fc' }}>
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckSquare size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: NAVY }}>Test Submitted!</h2>
          <p className="text-gray-500 mb-1">GS Paper I Mock Test 8</p>
          <p className="text-gray-400 text-sm mb-6">Your answers have been recorded. Results will be published soon.</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-green-600">{answeredCount}</div>
              <div className="text-xs text-gray-500">Answered</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-purple-600">{markedForReview.size}</div>
              <div className="text-xs text-gray-500">Reviewed</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="text-2xl font-bold text-red-500">{TOTAL_QUESTIONS - answeredCount}</div>
              <div className="text-xs text-gray-500">Skipped</div>
            </div>
          </div>
          <a href="/student/tests" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm"
            style={{ background: NAVY }}>
            Back to Tests
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f0f4f8' }}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 shadow-sm z-20 sticky top-0"
        style={{ background: NAVY }}>
        <div>
          <div className="text-white font-bold text-sm">GS Paper I Mock Test 8</div>
          <div className="text-blue-300 text-xs">General Studies I — 250 Marks</div>
        </div>

        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${total < 600 ? 'bg-red-600 animate-pulse' : 'bg-white bg-opacity-10'}`}>
            <Clock size={16} className="text-yellow-300" />
            <span className="text-white font-bold text-lg tabular-nums">
              {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
            </span>
          </div>

          {/* Progress */}
          <div className="text-white text-sm font-medium">
            Q <span className="font-bold text-yellow-300">{currentQ + 1}</span>/{MOCK_QUESTIONS.length}
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white border border-red-400 hover:bg-red-600 transition-colors"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: Question Panel */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-3xl mx-auto">

            {/* Question */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: NAVY }}>
                  {currentQ + 1}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
                  {question.subject}
                </span>
                {markedForReview.has(currentQ) && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                    <Flag size={10} /> Marked for Review
                  </span>
                )}
              </div>
              <p className="text-gray-800 font-medium text-base leading-relaxed">{question.text}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((opt, i) => {
                const selected = answers[currentQ] === i;
                const letter = ['A', 'B', 'C', 'D'][i];
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: i }))}
                    className="w-full text-left flex items-start gap-4 p-4 rounded-xl border-2 transition-all hover:shadow-sm"
                    style={selected
                      ? { borderColor: GOLD, background: '#fffbeb' }
                      : { borderColor: '#e5e7eb', background: '#fff' }
                    }
                  >
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5"
                      style={selected
                        ? { background: GOLD, color: '#fff' }
                        : { background: '#f3f4f6', color: '#374151' }
                      }
                    >
                      {letter}
                    </span>
                    <span className={`text-sm ${selected ? 'font-semibold text-amber-800' : 'text-gray-700'}`}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentQ(q => Math.max(0, q - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                onClick={() => {
                  setMarkedForReview(prev => {
                    const next = new Set(prev);
                    if (next.has(currentQ)) next.delete(currentQ);
                    else next.add(currentQ);
                    return next;
                  });
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold transition-colors"
                style={markedForReview.has(currentQ)
                  ? { background: '#7c3aed', color: '#fff', borderColor: '#7c3aed' }
                  : { borderColor: '#7c3aed', color: '#7c3aed' }
                }
              >
                <Flag size={14} /> {markedForReview.has(currentQ) ? 'Unmark' : 'Mark for Review'}
              </button>

              <button
                onClick={() => {
                  if (!isLast) setCurrentQ(q => q + 1);
                  else setShowConfirm(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: isLast ? '#16a34a' : NAVY }}
              >
                {isLast ? 'Submit' : 'Save & Next'} <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Question Navigator */}
        <div className="w-72 border-l border-gray-200 bg-white overflow-y-auto flex-shrink-0 p-4">
          <h3 className="font-bold text-sm mb-3" style={{ color: NAVY }}>Question Navigator</h3>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mb-4 text-xs">
            {[
              { label: 'Current', bg: GOLD, color: '#fff' },
              { label: 'Answered', bg: '#16a34a', color: '#fff' },
              { label: 'Review', bg: '#7c3aed', color: '#fff' },
              { label: 'Not Visited', bg: '#f3f4f6', color: '#374151' },
            ].map(l => (
              <span key={l.label} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: l.bg }} />
                {l.label}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-6 gap-1.5">
            {Array.from({ length: TOTAL_QUESTIONS }, (_, i) => {
              const realIdx = i < MOCK_QUESTIONS.length ? i : -1;
              const status = realIdx >= 0 ? getQStatus(realIdx) : 'unanswered';
              const style = qStatusStyle(status);
              return (
                <button
                  key={i}
                  onClick={() => { if (realIdx >= 0) setCurrentQ(realIdx); }}
                  className="w-9 h-9 rounded-lg text-xs font-semibold transition-all hover:scale-110"
                  style={realIdx >= 0 ? style : { background: '#f9fafb', color: '#d1d5db', cursor: 'default' }}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <span>Answered</span>
              <span className="font-bold text-green-600">{answeredCount}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <span>For Review</span>
              <span className="font-bold text-purple-600">{markedForReview.size}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
              <span>Not Answered</span>
              <span className="font-bold text-red-500">{TOTAL_QUESTIONS - answeredCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: NAVY }}>Submit Test?</h3>
                <p className="text-gray-500 text-sm">This action cannot be undone.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center bg-green-50 rounded-xl py-3">
                <div className="text-xl font-bold text-green-600">{answeredCount}</div>
                <div className="text-xs text-gray-500">Answered</div>
              </div>
              <div className="text-center bg-purple-50 rounded-xl py-3">
                <div className="text-xl font-bold text-purple-600">{markedForReview.size}</div>
                <div className="text-xs text-gray-500">Review</div>
              </div>
              <div className="text-center bg-red-50 rounded-xl py-3">
                <div className="text-xl font-bold text-red-500">{TOTAL_QUESTIONS - answeredCount}</div>
                <div className="text-xs text-gray-500">Skipped</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => { setShowConfirm(false); setSubmitted(true); }}
                className="flex-1 py-3 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: '#dc2626' }}>
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
