'use client';

import React, { useState } from 'react';
import { 
  Download, 
  CheckCircle2, 
  Search 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryModal from '@/components/common/EnquiryModal';

const MATERIALS = [
  { id: '1', title: 'Indian Polity & Governance Summary Notes', category: 'UPSC / PCS', pages: '148 Pages', format: 'PDF Booklet', downloads: '42,000+' },
  { id: '2', title: 'Modern Indian History Timeline & Flowcharts', category: 'History', pages: '92 Pages', format: 'PDF Booklet', downloads: '38,500+' },
  { id: '3', title: 'Himachal Pradesh State GK & Economic Survey Compilation', category: 'HPAS Special', pages: '180 Pages', format: 'PDF Booklet', downloads: '29,000+' },
  { id: '4', title: 'Annual Current Affairs Compendium 2024-25', category: 'Current Affairs', pages: '220 Pages', format: 'PDF Magazine', downloads: '54,000+' },
  { id: '5', title: 'Quantitative Aptitude 100 Speed Formulas & Tricks', category: 'SSC & Banking', pages: '75 Pages', format: 'Formula Handbook', downloads: '61,000+' },
  { id: '6', title: 'Indian Economy Key Terms & Union Budget Simplified', category: 'Economy', pages: '110 Pages', format: 'PDF Booklet', downloads: '33,000+' },
  { id: '7', title: 'SSB Psychological Test Practice (TAT & WAT Sample Sets)', category: 'Defence', pages: '65 Pages', format: 'SSB Workbook', downloads: '18,500+' },
  { id: '8', title: 'Child Development & Pedagogy (CDP) Complete Theory', category: 'Teaching Exams', pages: '135 Pages', format: 'CTET Notes', downloads: '24,000+' },
];

export default function StudyMaterialsPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const filtered = MATERIALS.filter(m => 
    m.title.toLowerCase().includes(search.toLowerCase()) || 
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => setDownloadSuccess(null), 3000);
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
              Academic Resource Center
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
              Free Standard Study Material & Notes
            </h1>
            <p style={{ fontSize: '1.0625rem', color: '#CBD5E1', maxWidth: '640px', margin: '0 auto' }}>
              Handcrafted revision booklets, previous years solved papers, and monthly current affairs digests prepared by faculty scholars.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="hc-section">
          <div className="hc-container">
            {/* Search Bar */}
            <div style={{ maxWidth: '600px', margin: '0 auto 40px auto', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by topic, exam or subject (e.g. Polity, HPAS, Math)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 44px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9375rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(20, 43, 74, 0.05)'
                }}
              />
              <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            </div>

            {/* Notification alert for simulated download */}
            {downloadSuccess && (
              <div
                style={{
                  maxWidth: '600px',
                  margin: '0 auto 24px auto',
                  padding: '12px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#DCFCE7',
                  border: '1px solid #86EFAC',
                  color: '#166534',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <CheckCircle2 size={18} />
                <span>
                  Demo download started for <strong>{downloadSuccess}</strong> (Frontend simulation).
                </span>
              </div>
            )}

            {/* Grid */}
            <div className="hc-grid-2">
              {filtered.map((mat) => (
                <div
                  key={mat.id}
                  className="hc-card"
                  style={{
                    padding: '24px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span
                        style={{
                          backgroundColor: '#EFF6FF',
                          color: '#2457A7',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '6px'
                        }}
                      >
                        {mat.category}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
                        {mat.downloads} Downloads
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.1875rem', fontWeight: 800, color: '#142B4A', marginBottom: '8px' }}>
                      {mat.title}
                    </h3>

                    <div style={{ fontSize: '0.8125rem', color: '#64748B', marginBottom: '20px' }}>
                      Format: <strong>{mat.format}</strong> • Volume: <strong>{mat.pages}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', borderTop: '1px solid #F1F5F9', paddingTop: '16px' }}>
                    <button
                      onClick={() => handleDownload(mat.title)}
                      className="hc-btn-primary"
                      style={{ padding: '9px 18px', fontSize: '0.8125rem', flex: 1, justifyContent: 'center' }}
                    >
                      <Download size={15} />
                      <span>Free Download PDF</span>
                    </button>
                    <button
                      onClick={() => setEnquiryOpen(true)}
                      className="hc-btn-secondary"
                      style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
                    >
                      Hardcopy Request
                    </button>
                  </div>
                </div>
              ))}
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
