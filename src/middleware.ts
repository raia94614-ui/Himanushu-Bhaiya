/**
 * Next.js Middleware — lightweight route protection + security headers.
 * Runs in Edge runtime — NO imports from iron-session heavy libs or Prisma.
 * Session cookie is read directly from the request for performance.
 */
import { NextRequest, NextResponse } from "next/server";

// Cookie name must match what iron-session uses in src/lib/session.ts
const SESSION_COOKIE = "hc_session";

// Public routes — no auth required
const PUBLIC_PREFIXES = [
  "/_next/",
  "/favicon",
  "/api/auth/login",
  "/api/auth/otp-request",
  "/api/auth/otp-verify",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
  "/api/enquiry",
  "/api/contact",
  "/api/placeholder",
];

const PUBLIC_EXACT = [
  "/",
  "/about",
  "/courses",
  "/faculty",
  "/results",
  "/contact",
  "/admission",
  "/login",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/otp-login",
  "/announcements",
  "/current-affairs",
  "/study-materials",
];

// Role level check — mirrors ROLE_HIERARCHY in the app
const ROLE_LEVELS: Record<string, number> = {
  STUDENT: 1,
  TEACHER: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
};

const ROLE_DASHBOARDS: Record<string, string> = {
  SUPER_ADMIN: "/super-admin/dashboard",
  ADMIN: "/admin/dashboard",
  TEACHER: "/teacher/dashboard",
  STUDENT: "/student/dashboard",
};

const PROTECTED_ROUTES: Array<{ prefix: string; minLevel: number }> = [
  { prefix: "/student", minLevel: 1 },
  { prefix: "/teacher", minLevel: 2 },
  { prefix: "/admin", minLevel: 3 },
  { prefix: "/super-admin", minLevel: 4 },
  { prefix: "/api/student", minLevel: 1 },
  { prefix: "/api/teacher", minLevel: 2 },
  { prefix: "/api/admin", minLevel: 3 },
  { prefix: "/api/super-admin", minLevel: 4 },
];

function addSecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; ")
  );
  if (process.env.NODE_ENV === "production") {
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  return res;
}

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_EXACT.some((p) => pathname === p)) return true;
  if (PUBLIC_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  if (pathname.startsWith("/courses/")) return true;
  if (pathname.match(/\.(png|jpg|jpeg|svg|ico|webp|css|js|woff|woff2)$/)) return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  addSecurityHeaders(response);

  if (isPublicPath(pathname)) return response;

  // Read session cookie — iron-session seals it, so we just check presence
  // Full verification (signature + decryption) happens in API routes and Server Actions
  const sessionCookie = request.cookies.get(SESSION_COOKIE);

  // 2FA semi-protected route
  if (pathname.startsWith("/verify-2fa") || pathname.startsWith("/api/auth/2fa")) {
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  // Check which protected route this is
  const matched = PROTECTED_ROUTES.find((r) => pathname.startsWith(r.prefix));
  if (!matched) return response;

  // No session → redirect to login
  if (!sessionCookie?.value) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // In the frontend-only phase we skip JWT/role parsing in middleware
  // Full role validation happens server-side in every API route
  // Just allow through if session cookie exists
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
