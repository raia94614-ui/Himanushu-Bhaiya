import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './styles/theme.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Himanshu Classes | India\'s Premier Coaching Institute',
  description: 'Join Himanshu Classes — India\'s leading coaching institute for UPSC, State PCS, HPAS, SSC, Banking, Defence & Tuition. 50,000+ students trained, 15,000+ selections.',
  keywords: 'Himanshu Classes, UPSC coaching, HPAS coaching, State PCS, SSC CGL, Banking PO, Defence CDS NDA, school tuition',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="/output.css" />
      </head>
      <body style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
