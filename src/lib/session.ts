/**
 * Session management using iron-session (encrypted, server-side validated cookies)
 * Sessions are also stored in DB for revocation capability.
 */
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { env } from "./env";
import { prisma } from "./prisma";
import { nanoid } from "nanoid";
import { Role } from "@prisma/client";

export interface SessionData {
  sessionId: string;
  userId: string;
  role: Role;
  email?: string;
  phone?: string;
  // 2FA tracking
  totpVerified: boolean;
  isPartialAuth: boolean; // true = passed password/OTP but not yet 2FA
}

export const SESSION_OPTIONS = {
  password: env.AUTH_SECRET || "fallback-dev-secret-32-characters-min!!",
  cookieName: "hc_session",
  cookieOptions: {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  },
};

export const SESSION_IDLE_TIMEOUT_MS = 1000 * 60 * 60 * 2; // 2 hours idle
export const SESSION_ABSOLUTE_EXPIRY_MS = 1000 * 60 * 60 * 24 * 7; // 7 days absolute

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, SESSION_OPTIONS);
}

/**
 * Creates a new session in DB and sets encrypted cookie.
 */
export async function createSession(params: {
  userId: string;
  role: Role;
  email?: string;
  phone?: string;
  ipAddress?: string;
  userAgent?: string;
  totpVerified?: boolean;
  isPartialAuth?: boolean;
}) {
  const token = nanoid(64);
  const expiresAt = new Date(Date.now() + SESSION_ABSOLUTE_EXPIRY_MS);

  const dbSession = await prisma.session.create({
    data: {
      userId: params.userId,
      token,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
      expiresAt,
    },
  });

  const ironSession = await getSession();
  ironSession.sessionId = dbSession.id;
  ironSession.userId = params.userId;
  ironSession.role = params.role;
  ironSession.email = params.email;
  ironSession.phone = params.phone;
  ironSession.totpVerified = params.totpVerified ?? false;
  ironSession.isPartialAuth = params.isPartialAuth ?? false;
  await ironSession.save();

  return dbSession;
}

/**
 * Validates the session against DB — checks expiry, revocation, and idle timeout.
 * Returns null if the session is invalid.
 */
export async function validateSession(): Promise<{
  session: IronSession<SessionData>;
  dbSession: { id: string; userId: string; expiresAt: Date; lastActiveAt: Date };
} | null> {
  const session = await getSession();
  if (!session.sessionId || !session.userId) return null;

  const dbSession = await prisma.session.findUnique({
    where: { id: session.sessionId },
  });

  if (!dbSession) return null;
  if (dbSession.isRevoked) return null;
  if (dbSession.expiresAt < new Date()) {
    await prisma.session.update({
      where: { id: dbSession.id },
      data: { isRevoked: true },
    });
    return null;
  }

  // Idle timeout check
  const idleSince = Date.now() - dbSession.lastActiveAt.getTime();
  if (idleSince > SESSION_IDLE_TIMEOUT_MS) {
    await prisma.session.update({
      where: { id: dbSession.id },
      data: { isRevoked: true },
    });
    return null;
  }

  // Update last active timestamp (rolling)
  await prisma.session.update({
    where: { id: dbSession.id },
    data: { lastActiveAt: new Date() },
  });

  return { session, dbSession };
}

/**
 * Revokes the current session (logout).
 */
export async function revokeSession() {
  const session = await getSession();
  if (session.sessionId) {
    await prisma.session
      .update({
        where: { id: session.sessionId },
        data: { isRevoked: true, revokedAt: new Date() },
      })
      .catch(() => {}); // ignore if already revoked
  }
  session.destroy();
}

/**
 * Revokes all sessions for a user (logout from all devices).
 */
export async function revokeAllSessions(userId: string) {
  await prisma.session.updateMany({
    where: { userId, isRevoked: false },
    data: { isRevoked: true, revokedAt: new Date() },
  });
}

/**
 * Get authenticated user from session, or return null.
 * Validates DB session validity.
 */
export async function getAuthenticatedUser() {
  const result = await validateSession();
  if (!result) return null;
  const { session } = result;

  // Partial auth = password/OTP done but 2FA pending
  if (session.isPartialAuth) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId, isActive: true },
    select: {
      id: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      emailVerified: true,
      studentProfile: true,
      teacherProfile: true,
    },
  });

  return user;
}
