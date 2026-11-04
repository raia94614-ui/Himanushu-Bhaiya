/**
 * Rate limiting — in-memory for development, easily swappable for Redis/Upstash in production.
 * Uses sliding window algorithm.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory store (replace with Upstash Redis for production multi-instance deployments)
const store = new Map<string, RateLimitEntry>();

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (entry.resetAt < now) store.delete(key);
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  key: string; // e.g., `login:${ip}` or `otp:${phone}`
  limit: number; // max requests
  windowMs: number; // time window in milliseconds
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  retryAfterMs: number;
}

export function checkRateLimit(config: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  const entry = store.get(config.key);

  if (!entry || entry.resetAt < now) {
    // New window
    store.set(config.key, { count: 1, resetAt: now + config.windowMs });
    return {
      allowed: true,
      remaining: config.limit - 1,
      resetAt: now + config.windowMs,
      retryAfterMs: 0,
    };
  }

  if (entry.count >= config.limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfterMs: entry.resetAt - now,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: config.limit - entry.count,
    resetAt: entry.resetAt,
    retryAfterMs: 0,
  };
}

export function resetRateLimit(key: string): void {
  store.delete(key);
}

// Pre-configured rate limiters
export const RateLimiters = {
  login: (identifier: string) =>
    checkRateLimit({
      key: `login:${identifier}`,
      limit: 5,
      windowMs: 15 * 60 * 1000, // 5 attempts per 15 minutes
    }),

  otpSend: (phone: string) =>
    checkRateLimit({
      key: `otp-send:${phone}`,
      limit: 3,
      windowMs: 10 * 60 * 1000, // 3 OTPs per 10 minutes
    }),

  otpVerify: (phone: string) =>
    checkRateLimit({
      key: `otp-verify:${phone}`,
      limit: 5,
      windowMs: 10 * 60 * 1000, // 5 verify attempts per 10 minutes
    }),

  passwordReset: (identifier: string) =>
    checkRateLimit({
      key: `pwd-reset:${identifier}`,
      limit: 3,
      windowMs: 60 * 60 * 1000, // 3 attempts per hour
    }),

  totp: (userId: string) =>
    checkRateLimit({
      key: `totp:${userId}`,
      limit: 5,
      windowMs: 5 * 60 * 1000, // 5 TOTP attempts per 5 minutes
    }),

  api: (ip: string) =>
    checkRateLimit({
      key: `api:${ip}`,
      limit: 100,
      windowMs: 60 * 1000, // 100 API calls per minute
    }),
};
