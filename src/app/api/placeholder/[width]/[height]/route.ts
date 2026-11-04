import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ width: string; height: string }> }
) {
  const { width, height } = await params;
  const w = parseInt(width) || 300;
  const h = parseInt(height) || 200;

  const svg = `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a1628;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a3a6b;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <circle cx="${w/2}" cy="${h/2 - 15}" r="${Math.min(w,h) * 0.18}" fill="#c9a84c" opacity="0.2"/>
      <text x="50%" y="${h/2 - 5}" font-family="system-ui, sans-serif" font-size="${Math.max(14, Math.floor(w * 0.05))}" font-weight="bold" fill="#e4c46a" text-anchor="middle" dominant-baseline="middle">
        Himanshu Classes
      </text>
      <text x="50%" y="${h/2 + 20}" font-family="system-ui, sans-serif" font-size="${Math.max(10, Math.floor(w * 0.03))}" fill="#94a3b8" text-anchor="middle" dominant-baseline="middle">
        ${w} × ${h}
      </text>
    </svg>
  `;

  return new NextResponse(svg.trim(), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
