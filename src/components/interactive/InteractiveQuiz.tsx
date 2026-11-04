'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Award,
  Sparkles
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Which Article of the Constitution of India provides for the establishment of a Public Service Commission for the Union and for each State?",
    options: ["Article 312", "Article 315", "Article 320", "Article 324"],
    correct: 1,
    explanation: "Article 315 of the Indian Constitution provides for the establishment of a Union Public Service Commission (UPSC) and State Public Service Commissions."
  },
  {
    id: 2,
    question: "Under which Five Year Plan was the National Development Council (NDC) set up in India?",
    options: ["First Five Year Plan", "Second Five Year Plan", "Third Five Year Plan", "Fourth Five Year Plan"],
    correct: 0,
    explanation: "The National Development Council (NDC) was established in August 1952 during the First Five Year Plan (1951-56)."
  },
  {
    id: 3,
    question: "Which of the following passes connects Himachal Pradesh (Lahaul Valley) with Ladakh?",
    options: ["Rohtang Pass", "Bara-lacha La", "Shipki La", "Jalori Pass"],
    correct: 1,
    explanation: "Bara-lacha La is a high mountain pass in the Zanskar range connecting Lahaul district in Himachal Pradesh to Ladakh."
  },
  {
    id: 4,
    question: "Which institution publishes the flagship 'World Economic Outlook' report?",
    options: ["World Bank", "International Monetary Fund (IMF)", "World Economic Forum (WEF)", "United Nations Development Programme (UNDP)"],
    correct: 1,
    explanation: "The World Economic Outlook (WEO) is an authoritative survey published biannually by the International Monetary Fund (IMF)."
  },
  {
    id: 5,
    question: "In the context of Indian History, who among the following was known by the title 'Devanampiya Piyadasi'?",
    options: ["Chandragupta Maurya", "Emperor Ashoka", "Kanishka", "Samudragupta"],
    correct: 1,
    explanation: "Emperor Ashoka used the imperial title 'Devanampiya Piyadasi' (Beloved of the Gods) in his stone rock and pillar edicts."
  }
];

export default function InteractiveQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = SAMPLE_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelectedOpt(idx);
    setShowAnswer(true);
    if (idx === q.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < SAMPLE_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setShowAnswer(false);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowAnswer(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 20px 45px rgba(20, 43, 74, 0.08)',
        overflow: 'hidden'
      }}
    >
      {/* Quiz Header */}
      <div
        style={{
          backgroundColor: '#142B4A',
          color: '#FFFFFF',
          padding: '20px 28px',
          borderBottom: '3px solid #D9A441',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: 'rgba(217, 164, 65, 0.2)',
              color: '#D9A441',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <HelpCircle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D9A441', textTransform: 'uppercase' }}>
              Daily Practice Test Series
            </div>
            <h3 style={{ fontSize: '1.1875rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              Live Prelims Diagnostic Quiz
            </h3>
          </div>
        </div>

        {!completed && (
          <span
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: '#CBD5E1',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 700
            }}
          >
            Question {currentIdx + 1} of {SAMPLE_QUESTIONS.length}
          </span>
        )}
      </div>

      {/* Quiz Body */}
      <div style={{ padding: '32px 28px' }}>
        {completed ? (
          <div style={{ textAlign: 'center', padding: '24px 12px' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: score >= 3 ? '#DCFCE7' : '#FEF3C7',
                color: score >= 3 ? '#16A34A' : '#D9A441',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px auto'
              }}
            >
              <Award size={36} />
            </div>

            <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#142B4A', marginBottom: '8px' }}>
              Quiz Completed! Score: {score} / {SAMPLE_QUESTIONS.length}
            </h4>
            <p style={{ fontSize: '0.9375rem', color: '#64748B', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              {score >= 4 
                ? "Outstanding! You possess strong conceptual foundations for Civil Services Prelims."
                : "Good attempt! Consistent revision of standard static GK will boost your Prelims accuracy."}
            </p>

            <button
              onClick={handleReset}
              className="hc-btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <RotateCcw size={16} />
              <span>Retry Diagnostic Quiz</span>
            </button>
          </div>
        ) : (
          <div>
            {/* Question Text */}
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: '#142B4A',
                lineHeight: 1.6,
                marginBottom: '24px'
              }}
            >
              {q.id}. {q.question}
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {q.options.map((opt, i) => {
                let borderCol = '#E2E8F0';
                let bgCol = '#FFFFFF';
                let textCol = '#1E293B';

                if (showAnswer) {
                  if (i === q.correct) {
                    borderCol = '#16A34A';
                    bgCol = '#DCFCE7';
                    textCol = '#166534';
                  } else if (i === selectedOpt) {
                    borderCol = '#EF4444';
                    bgCol = '#FEE2E2';
                    textCol = '#991B1B';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={showAnswer}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      border: `2px solid ${borderCol}`,
                      backgroundColor: bgCol,
                      color: textCol,
                      fontSize: '0.9375rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease',
                      cursor: showAnswer ? 'default' : 'pointer'
                    }}
                  >
                    <span>{String.fromCharCode(65 + i)}. {opt}</span>
                    {showAnswer && i === q.correct && (
                      <CheckCircle2 size={18} style={{ color: '#16A34A', flexShrink: 0 }} />
                    )}
                    {showAnswer && i === selectedOpt && i !== q.correct && (
                      <XCircle size={18} style={{ color: '#EF4444', flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Step */}
            {showAnswer && (
              <div
                style={{
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  border: '1px solid #BFDBFE',
                  marginBottom: '24px'
                }}
              >
                <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: '#2457A7', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Faculty Solution & Reference:
                </div>
                <p style={{ fontSize: '0.875rem', color: '#1E293B', lineHeight: 1.6, margin: 0 }}>
                  {q.explanation}
                </p>
              </div>
            )}

            {showAnswer && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleNext}
                  className="hc-btn-primary"
                  style={{ padding: '10px 24px', fontSize: '0.9375rem' }}
                >
                  <span>{currentIdx + 1 < SAMPLE_QUESTIONS.length ? 'Next Question' : 'View Final Score'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
