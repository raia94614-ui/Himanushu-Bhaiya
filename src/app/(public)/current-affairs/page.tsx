'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, BookOpen, ChevronRight, Mail, ArrowRight } from 'lucide-react';
import PublicLayout from '@/components/layout/PublicLayout';
import { CURRENT_AFFAIRS_ARTICLES } from '@/lib/mock-data';

// Extend articles with more mock data for a fuller page
const EXTRA_ARTICLES = [
  { id: '6', title: 'India Space Program: Chandrayaan-4 Mission Plans', date: '2026-10-15', category: 'Economy', tags: ['ISRO', 'Space', 'Technology'], readTime: '7 min', summary: 'An overview of India\'s upcoming lunar missions and the strategic importance of space exploration.', featured: false },
  { id: '7', title: 'Digital India: UPI Crosses 10 Billion Monthly Transactions', date: '2026-10-10', category: 'Polity & Governance', tags: ['UPI', 'FinTech', 'Digital India'], readTime: '6 min', summary: 'India\'s Unified Payments Interface becomes the world\'s largest real-time payment system.', featured: false },
  { id: '8', title: 'India\'s Arctic Policy: Strategic Interests and Challenges', date: '2026-10-05', category: 'International Relations', tags: ['Arctic', 'Geopolitics', 'India'], readTime: '11 min', summary: 'Analysis of India\'s engagement with the Arctic region and its implications for global diplomacy.', featured: false },
];

const ALL_ARTICLES = [...CURRENT_AFFAIRS_ARTICLES, ...EXTRA_ARTICLES];

const CATEGORIES = ['All', 'Economy', 'Polity & Governance', 'International Relations', 'Environment', 'Security'];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Economy': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  'Polity & Governance': { bg: '#ede9fe', text: '#5b21b6', border: '#c4b5fd' },
  'International Relations': { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
  'Environment': { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
  'Security': { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
};

function getCategoryStyle(category: string) {
  return CATEGORY_COLORS[category] || { bg: '#f1f5f9', text: '#475569', border: '#cbd5e1' };
}

export default function CurrentAffairsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = ALL_ARTICLES.filter((a) => (a as any).featured);
  const regular = ALL_ARTICLES.filter((a) => {
    const notFeatured = !(a as any).featured;
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    return notFeatured && matchCat;
  });

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="text-white py-20 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border"
            style={{ background: '#c9a84c22', borderColor: '#c9a84c44', color: '#c9a84c' }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Daily Current Affairs
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
            Current Affairs
          </h1>
          <p className="text-xl font-semibold mb-2" style={{ color: '#c9a84c' }}>
            Stay Updated, Stay Ahead
          </p>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Comprehensive daily current affairs coverage for UPSC, State PCS, SSC, Banking and all competitive exams.
          </p>
        </motion.div>
      </section>

      {/* Category Filter Tabs */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={
                  activeCategory === cat
                    ? { background: '#0a1628', color: 'white' }
                    : { background: '#f1f5f9', color: '#64748b' }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">
        {/* Featured Articles */}
        {activeCategory === 'All' && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-extrabold text-[#0a1628]">Featured Articles</h2>
              <div
                className="w-10 h-0.5 rounded-full"
                style={{ background: '#c9a84c' }}
              />
            </div>
            <div className="space-y-4">
              {featured.map((article, i) => {
                const catStyle = getCategoryStyle(article.category);
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex"
                  >
                    <div
                      className="w-1.5 shrink-0"
                      style={{ background: 'linear-gradient(180deg, #c9a84c, #0a1628)' }}
                    />
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border"
                          style={{ background: catStyle.bg, color: catStyle.text, borderColor: catStyle.border }}
                        >
                          {article.category}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </span>
                        <span className="text-xs text-slate-400">{article.date}</span>
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{ background: '#c9a84c22', color: '#c9a84c' }}
                        >
                          FEATURED
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-[#0a1628] mb-2 leading-snug">{article.title}</h3>
                      <p className="text-slate-500 text-sm mb-4 leading-relaxed">{article.summary}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                          {(article.tags || []).map((tag) => (
                            <span key={tag} className="text-[10px] text-slate-400 flex items-center gap-0.5">
                              <Tag className="w-2.5 h-2.5" /> {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg text-white transition-opacity hover:opacity-90"
                          style={{ background: '#0a1628' }}
                        >
                          Read Article <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        )}

        {/* Article Grid */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-extrabold text-[#0a1628]">
              {activeCategory === 'All' ? 'More Articles' : activeCategory}
            </h2>
            <div className="w-10 h-0.5 rounded-full" style={{ background: '#c9a84c' }} />
          </div>

          {regular.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">No articles in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {regular.map((article, i) => {
                const catStyle = getCategoryStyle(article.category);
                return (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border"
                        style={{ background: catStyle.bg, color: catStyle.text, borderColor: catStyle.border }}
                      >
                        {article.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-[#0a1628] text-sm leading-snug mb-2 flex-1">
                      {article.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                      <span className="text-[11px] text-slate-400">{article.date}</span>
                      <button
                        className="flex items-center gap-1 text-xs font-bold"
                        style={{ color: '#c9a84c' }}
                      >
                        Read Article <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* Newsletter Signup */}
        <section
          className="rounded-2xl p-8 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a3a6b 100%)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: '#c9a84c22', border: '2px solid #c9a84c44' }}
            >
              <Mail className="w-7 h-7" style={{ color: '#c9a84c' }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-2">Get Daily Current Affairs in Your Inbox</h2>
            <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
              Subscribe to our free daily newsletter and receive curated current affairs every morning at 7 AM.
            </p>
            {subscribed ? (
              <div
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold"
                style={{ background: '#c9a84c22', border: '1px solid #c9a84c44', color: '#c9a84c' }}
              >
                ✓ You're subscribed! Check your inbox.
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c9a84c]"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-[#0a1628] transition-opacity hover:opacity-90 shrink-0"
                  style={{ background: '#c9a84c' }}
                >
                  Subscribe Free
                </button>
              </div>
            )}
          </motion.div>
        </section>
      </div>
    </PublicLayout>
  );
}
